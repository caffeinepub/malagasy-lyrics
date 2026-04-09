import Types "../types/music";
import Common "../types/common";
import Storage "mo:caffeineai-object-storage/Storage";
import Text "mo:core/Text";

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


};
