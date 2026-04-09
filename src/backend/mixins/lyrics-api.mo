import Types "../types/lyrics";
import LyricsLib "../lib/lyrics";
import List "mo:core/List";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Set "mo:core/Set";
import Text "mo:core/Text";
import Array "mo:core/Array";

mixin (lyrics : List.List<Types.LyricEntry>, nextId : { var val : Nat }) {

  private func sortedEntries(entries : List.List<Types.LyricEntry>, sortOrder : Types.SortOrder) : [Types.LyricEntry] {
    let arr = entries.toArray();
    arr.sort<Types.LyricEntry>(func(a, b) = LyricsLib.compare(sortOrder, a, b));
  };

  /// Returns all lyrics sorted by submission date (most recent first)
  public query func listLyrics() : async [Types.LyricEntry] {
    sortedEntries(lyrics, #mostRecent);
  };

  /// Returns a single lyric entry by ID and increments its view count
  public func getLyric(id : Types.LyricId) : async ?Types.LyricEntry {
    switch (lyrics.findIndex(func(e : Types.LyricEntry) : Bool = e.id == id)) {
      case null null;
      case (?idx) {
        let entry = lyrics.at(idx);
        let updated = entry.incrementViewCount();
        lyrics.put(idx, updated);
        ?updated;
      };
    };
  };

  /// Searches lyrics by title, artist, or lyric content with optional filters and sort
  public query func searchLyrics(params : Types.SearchParams) : async [Types.LyricEntry] {
    let matched = lyrics.filter(func(e : Types.LyricEntry) : Bool = e.matchesSearch(params));
    sortedEntries(matched, params.sortOrder);
  };

  /// Submits a new lyric entry; caller must be authenticated
  public shared ({ caller }) func submitLyric(input : Types.LyricInput) : async Types.LyricId {
    if (caller.isAnonymous()) {
      Runtime.trap("Authentication required to submit lyrics");
    };
    let id = nextId.val;
    let entry = LyricsLib.new(id, input, caller, caller.toText(), Time.now());
    lyrics.add(entry);
    nextId.val := id + 1;
    id;
  };

  /// Updates an existing lyric entry; only the original contributor may edit
  public shared ({ caller }) func updateLyric(id : Types.LyricId, input : Types.LyricInput) : async Bool {
    if (caller.isAnonymous()) {
      Runtime.trap("Authentication required to update lyrics");
    };
    switch (lyrics.findIndex(func(e : Types.LyricEntry) : Bool = e.id == id)) {
      case null false;
      case (?idx) {
        let entry = lyrics.at(idx);
        if (not Principal.equal(entry.contributorId, caller)) {
          Runtime.trap("Not authorized: only the original contributor can edit this lyric");
        };
        lyrics.put(idx, entry.update(input));
        true;
      };
    };
  };

  /// Returns all distinct artist names for filtering
  public query func listArtists() : async [Text] {
    let artistSet = Set.empty<Text>();
    lyrics.forEach(func(e : Types.LyricEntry) {
      artistSet.add(e.artist);
    });
    artistSet.toArray().sort<Text>();
  };
};
