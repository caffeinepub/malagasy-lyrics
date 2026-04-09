import Storage "mo:caffeineai-object-storage/Storage";
import Common "common";

module {
  public type TrackId = Nat;

  public type SortOrder = {
    #newest;
    #oldest;
    #titleAsc;
    #titleDesc;
    #priceAsc;
    #priceDesc;
  };

  public type MusicSearchParams = {
    searchText : ?Text;
    artist     : ?Text;
    sortOrder  : ?SortOrder;
  };

  public type TrackInput = {
    title         : Text;
    artist        : Text;
    album         : Text;
    priceUSD      : Float;
    audioFile     : Storage.ExternalBlob;
    coverImage    : Storage.ExternalBlob;
    sellerName    : Text;
  };

  public type TrackEntry = {
    id            : TrackId;
    title         : Text;
    artist        : Text;
    album         : Text;
    priceUSD      : Float;
    audioFile     : Storage.ExternalBlob;
    coverImage    : Storage.ExternalBlob;
    published     : Bool;
    sellerId      : Common.UserId;
    sellerName    : Text;
    createdAt     : Common.Timestamp;
    var viewCount : Nat;
  };

  public type TrackView = {
    id         : TrackId;
    title      : Text;
    artist     : Text;
    album      : Text;
    priceUSD   : Float;
    audioFile  : Storage.ExternalBlob;
    coverImage : Storage.ExternalBlob;
    published  : Bool;
    sellerId   : Common.UserId;
    sellerName : Text;
    createdAt  : Common.Timestamp;
    viewCount  : Nat;
  };

  public type PurchaseRecord = {
    sessionId : Text;
    trackId   : TrackId;
    buyerId   : Common.UserId;
    paidAt    : Common.Timestamp;
  };
};
