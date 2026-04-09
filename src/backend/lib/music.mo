import Types "../types/music";
import Common "../types/common";
import Storage "mo:caffeineai-object-storage/Storage";
import List "mo:core/List";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Principal "mo:core/Principal";

module {

  /// Construct a new TrackEntry from input and metadata.
  public func new(
    id        : Types.TrackId,
    input     : Types.TrackInput,
    sellerId  : Common.UserId,
    createdAt : Common.Timestamp,
  ) : Types.TrackEntry {
    {
      id;
      title      = input.title;
      artist     = input.artist;
      album      = input.album;
      priceUSD   = input.priceUSD;
      audioFile  = input.audioFile;
      coverImage = input.coverImage;
      published  = true;
      sellerId;
      sellerName = input.sellerName;
      createdAt;
      var viewCount = 0;
    };
  };

  /// Project a mutable TrackEntry to its immutable shared view.
  public func toView(self : Types.TrackEntry) : Types.TrackView {
    {
      id         = self.id;
      title      = self.title;
      artist     = self.artist;
      album      = self.album;
      priceUSD   = self.priceUSD;
      audioFile  = self.audioFile;
      coverImage = self.coverImage;
      published  = self.published;
      sellerId   = self.sellerId;
      sellerName = self.sellerName;
      createdAt  = self.createdAt;
      viewCount  = self.viewCount;
    };
  };

  /// Return true if the track matches the given search parameters.
  public func matchesSearch(self : Types.TrackEntry, params : Types.MusicSearchParams) : Bool {
    let textMatch = switch (params.searchText) {
      case null true;
      case (?t) {
        if (t == "") true
        else {
          let needle = t.toLower();
          self.title.toLower().contains(#text needle) or
          self.artist.toLower().contains(#text needle) or
          self.album.toLower().contains(#text needle);
        };
      };
    };

    let artistMatch = switch (params.artist) {
      case null true;
      case (?a) self.artist.toLower() == a.toLower();
    };

    textMatch and artistMatch;
  };

  /// Compare two tracks for the given sort order.
  public func compare(a : Types.TrackEntry, b : Types.TrackEntry, order : Types.SortOrder) : {#less; #equal; #greater} {
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

  /// Seed sample tracks. Returns the next available id after seeding.
  public func seedSamples(tracks : List.List<Types.TrackEntry>, startId : Nat) : Nat {
    let anon = Principal.anonymous();
    let t    = Time.now();

    // Placeholder blobs — real uploads come from the frontend
    let emptyBlob : Storage.ExternalBlob = "" : Blob;

    type Seed = {
      title      : Text;
      artist     : Text;
      album      : Text;
      priceUSD   : Float;
      sellerName : Text;
      createdAt  : Common.Timestamp;
    };

    let seeds : [Seed] = [
      {
        title      = "Raha Mbola Izy";
        artist     = "Rossy";
        album      = "Moramorà";
        priceUSD   = 1.99;
        sellerName = "Rossy Official";
        createdAt  = t - 6_000_000_000_000;
      },
      {
        title      = "Iray Ihany";
        artist     = "Tarika Sammy";
        album      = "Faneva";
        priceUSD   = 1.49;
        sellerName = "Tarika Sammy Records";
        createdAt  = t - 5_000_000_000_000;
      },
      {
        title      = "Tsy Misy Mahalala";
        artist     = "Mahaleo";
        album      = "Mahaleo Live";
        priceUSD   = 2.49;
        sellerName = "Mahaleo";
        createdAt  = t - 4_000_000_000_000;
      },
      {
        title      = "Ry Tanindrazana";
        artist     = "Rossy";
        album      = "Salegy";
        priceUSD   = 0.99;
        sellerName = "Rossy Official";
        createdAt  = t - 3_000_000_000_000;
      },
    ];

    var id = startId;
    for (s in seeds.values()) {
      tracks.add({
        id;
        title      = s.title;
        artist     = s.artist;
        album      = s.album;
        priceUSD   = s.priceUSD;
        audioFile  = emptyBlob;
        coverImage = emptyBlob;
        published  = true;
        sellerId   = anon;
        sellerName = s.sellerName;
        createdAt  = s.createdAt;
        var viewCount = 0;
      });
      id += 1;
    };
    id;
  };
};
