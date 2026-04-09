import Common "common";

module {
  public type LyricId = Common.LyricId;
  public type Timestamp = Common.Timestamp;
  public type UserId = Common.UserId;

  public type SortOrder = {
    #mostRecent;
    #mostViewed;
    #alphabetical;
  };

  public type LyricEntry = {
    id : LyricId;
    title : Text;
    artist : Text;
    album : Text;
    yearReleased : Nat;
    lyrics : Text;
    notes : Text;
    contributorId : UserId;
    contributorName : Text;
    submittedAt : Timestamp;
    viewCount : Nat;
  };

  public type LyricInput = {
    title : Text;
    artist : Text;
    album : Text;
    yearReleased : Nat;
    lyrics : Text;
    notes : Text;
  };

  public type SearchParams = {
    searchText : Text;
    artistFilter : ?Text;
    yearFilter : ?Nat;
    sortOrder : SortOrder;
  };
};
