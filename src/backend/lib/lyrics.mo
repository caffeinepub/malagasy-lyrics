import Types "../types/lyrics";
import List "mo:core/List";
import Text "mo:core/Text";

module {
  public type LyricEntry = Types.LyricEntry;
  public type LyricInput = Types.LyricInput;
  public type SearchParams = Types.SearchParams;
  public type SortOrder = Types.SortOrder;

  public func new(
    id : Types.LyricId,
    input : LyricInput,
    contributorId : Types.UserId,
    contributorName : Text,
    submittedAt : Types.Timestamp,
  ) : LyricEntry {
    {
      id;
      title = input.title;
      artist = input.artist;
      album = input.album;
      yearReleased = input.yearReleased;
      lyrics = input.lyrics;
      notes = input.notes;
      contributorId;
      contributorName;
      submittedAt;
      viewCount = 0;
    };
  };

  public func update(self : LyricEntry, input : LyricInput) : LyricEntry {
    {
      self with
      title = input.title;
      artist = input.artist;
      album = input.album;
      yearReleased = input.yearReleased;
      lyrics = input.lyrics;
      notes = input.notes;
    };
  };

  public func incrementViewCount(self : LyricEntry) : LyricEntry {
    { self with viewCount = self.viewCount + 1 };
  };

  public func matchesSearch(self : LyricEntry, params : SearchParams) : Bool {
    let textMatch = if (params.searchText == "") {
      true;
    } else {
      let needle = params.searchText.toLower();
      self.title.toLower().contains(#text needle) or
      self.artist.toLower().contains(#text needle) or
      self.lyrics.toLower().contains(#text needle);
    };

    let artistMatch = switch (params.artistFilter) {
      case null true;
      case (?a) self.artist.toLower() == a.toLower();
    };

    let yearMatch = switch (params.yearFilter) {
      case null true;
      case (?y) self.yearReleased == y;
    };

    textMatch and artistMatch and yearMatch;
  };

  public func compare(sortOrder : SortOrder, a : LyricEntry, b : LyricEntry) : { #less; #equal; #greater } {
    switch (sortOrder) {
      case (#mostRecent) {
        if (a.submittedAt > b.submittedAt) #less
        else if (a.submittedAt < b.submittedAt) #greater
        else #equal;
      };
      case (#mostViewed) {
        if (a.viewCount > b.viewCount) #less
        else if (a.viewCount < b.viewCount) #greater
        else #equal;
      };
      case (#alphabetical) {
        Text.compare(a.title, b.title);
      };
    };
  };


};
