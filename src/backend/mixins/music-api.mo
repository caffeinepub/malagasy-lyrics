import Types "../types/music";
import Common "../types/common";
import MusicLib "../lib/music";
import List "mo:core/List";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import Stripe "mo:caffeineai-stripe/stripe";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import Runtime "mo:core/Runtime";

mixin (
  tracks    : List.List<Types.TrackEntry>,
  nextId    : { var val : Nat },
  purchases : List.List<Types.PurchaseRecord>,
  stripeConfig : { var val : ?Stripe.StripeConfiguration },
) {

  // ── Track management ────────────────────────────────────────────────────────

  func sortByOrder(views : List.List<Types.TrackView>, order : Types.SortOrder) {
    views.sortInPlace(func(a, b) = compareViews(a, b, order));
  };

  func compareViews(a : Types.TrackView, b : Types.TrackView, order : Types.SortOrder) : {#less; #equal; #greater} {
    switch (order) {
      case (#newest) {
        if (a.createdAt > b.createdAt) #less
        else if (a.createdAt < b.createdAt) #greater
        else #equal;
      };
      case (#oldest) {
        if (a.createdAt < b.createdAt) #less
        else if (a.createdAt > b.createdAt) #greater
        else #equal;
      };
      case (#titleAsc)  { Text.compare(a.title, b.title) };
      case (#titleDesc) { Text.compare(b.title, a.title) };
      case (#priceAsc) {
        if (a.priceUSD < b.priceUSD) #less
        else if (a.priceUSD > b.priceUSD) #greater
        else #equal;
      };
      case (#priceDesc) {
        if (a.priceUSD > b.priceUSD) #less
        else if (a.priceUSD < b.priceUSD) #greater
        else #equal;
      };
    };
  };

  /// List all published tracks, optionally filtered/sorted.
  public query func listTracks(params : ?Types.MusicSearchParams) : async [Types.TrackView] {
    let filtered = switch (params) {
      case null {
        tracks.filter(func(t) = t.published);
      };
      case (?p) {
        tracks.filter(func(t) = t.published and t.matchesSearch(p));
      };
    };
    let views = filtered.map<Types.TrackEntry, Types.TrackView>(func(t) = t.toView());
    switch (params) {
      case (?(p)) {
        switch (p.sortOrder) {
          case (?order) sortByOrder(views, order);
          case null {};
        };
      };
      case null {};
    };
    views.toArray();
  };

  /// Get a single track by id and increment its view count (update call).
  public func getTrack(id : Types.TrackId) : async ?Types.TrackView {
    switch (tracks.findIndex(func(t) = t.id == id)) {
      case null null;
      case (?idx) {
        let entry = tracks.at(idx);
        entry.viewCount += 1;
        ?(entry.toView());
      };
    };
  };

  /// Search published tracks by params.
  public query func searchTracks(params : Types.MusicSearchParams) : async [Types.TrackView] {
    let filtered = tracks.filter(func(t) = t.published and t.matchesSearch(params));
    let views = filtered.map<Types.TrackEntry, Types.TrackView>(func(t) = t.toView());
    switch (params.sortOrder) {
      case (?order) sortByOrder(views, order);
      case null {};
    };
    views.toArray();
  };

  /// List all tracks belonging to a specific seller (including drafts).
  public query func listSellerTracks(sellerId : Common.UserId) : async [Types.TrackView] {
    tracks
      .filter(func(t) = Principal.equal(t.sellerId, sellerId))
      .map<Types.TrackEntry, Types.TrackView>(func(t) = t.toView())
      .toArray();
  };

  /// Publish a new track for sale (authenticated).
  public shared ({ caller }) func publishTrack(input : Types.TrackInput) : async Types.TrackId {
    if (caller.isAnonymous()) Runtime.trap("Authentication required");
    let id = nextId.val;
    nextId.val += 1;
    tracks.add(MusicLib.new(id, input, caller, Time.now()));
    id;
  };

  /// Unpublish a track (owner only).
  public shared ({ caller }) func unpublishTrack(id : Types.TrackId) : async () {
    switch (tracks.findIndex(func(t) = t.id == id)) {
      case null Runtime.trap("Track not found");
      case (?idx) {
        let entry = tracks.at(idx);
        if (not Principal.equal(entry.sellerId, caller)) Runtime.trap("Unauthorized");
        tracks.put(idx, { entry with published = false; var viewCount = entry.viewCount });
      };
    };
  };

  /// Re-publish a track (owner only).
  public shared ({ caller }) func republishTrack(id : Types.TrackId) : async () {
    switch (tracks.findIndex(func(t) = t.id == id)) {
      case null Runtime.trap("Track not found");
      case (?idx) {
        let entry = tracks.at(idx);
        if (not Principal.equal(entry.sellerId, caller)) Runtime.trap("Unauthorized");
        tracks.put(idx, { entry with published = true; var viewCount = entry.viewCount });
      };
    };
  };

  /// Edit track metadata (owner only).
  public shared ({ caller }) func editTrack(id : Types.TrackId, input : Types.TrackInput) : async () {
    switch (tracks.findIndex(func(t) = t.id == id)) {
      case null Runtime.trap("Track not found");
      case (?idx) {
        let entry = tracks.at(idx);
        if (not Principal.equal(entry.sellerId, caller)) Runtime.trap("Unauthorized");
        tracks.put(idx, {
          entry with
          title      = input.title;
          artist     = input.artist;
          album      = input.album;
          priceUSD   = input.priceUSD;
          audioFile  = input.audioFile;
          coverImage = input.coverImage;
          sellerName = input.sellerName;
          var viewCount = entry.viewCount;
        });
      };
    };
  };

  /// Build a ShoppingItem for a track (used by createCheckoutSession in main).
  public func buildTrackShoppingItem(trackId : Types.TrackId) : async Stripe.ShoppingItem {
    let entry = switch (tracks.find(func(t) = t.id == trackId)) {
      case null Runtime.trap("Track not found");
      case (?e) e;
    };
    if (not entry.published) Runtime.trap("Track is not available for purchase");
    let priceInCents : Nat = (entry.priceUSD * 100.0).toInt().toNat();
    {
      currency           = "usd";
      productName        = entry.title;
      productDescription = entry.artist # " — " # entry.album;
      priceInCents;
      quantity           = 1;
    };
  };

  /// Record a completed purchase (called after session confirmation).
  public shared ({ caller }) func recordTrackPurchase(sessionId : Text, trackId : Types.TrackId) : async () {
    if (caller.isAnonymous()) Runtime.trap("Authentication required");
    let alreadyRecorded = purchases.find(func(p) = p.sessionId == sessionId);
    switch (alreadyRecorded) {
      case (?_) Runtime.trap("Purchase already recorded");
      case null {
        purchases.add({
          sessionId;
          trackId;
          buyerId = caller;
          paidAt  = Time.now();
        });
      };
    };
  };

  /// List all purchases made by a buyer.
  public query func listPurchases(buyerId : Common.UserId) : async [Types.PurchaseRecord] {
    purchases
      .filter(func(p) = Principal.equal(p.buyerId, buyerId))
      .toArray();
  };
};
