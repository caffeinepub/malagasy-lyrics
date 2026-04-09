import Types "../types/lyrics";
import List "mo:core/List";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Principal "mo:core/Principal";

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

  public func seedSamples(lyrics : List.List<LyricEntry>, startId : Nat) : Nat {
    let adminId = Principal.anonymous();
    let t = Time.now();

    type SeedRecord = {
      title : Text;
      artist : Text;
      album : Text;
      yearReleased : Nat;
      lyrics : Text;
      notes : Text;
      viewCount : Nat;
      submittedAt : Types.Timestamp;
    };

    let seeds : [SeedRecord] = [
      {
        title = "Raha Mbola Izy";
        artist = "Rossy";
        album = "Moramorà";
        yearReleased = 1994;
        lyrics = "Raha mbola izy tsy tonga\nManiry ny foko maniry\nMiandry ny alina lasa\nKo izay no ahitana azy\n\nMba hifanena aminy indray\nHiroso hiara-mandeha\nNy fiainana mifandray\nEo am-pototry ny ora";
        notes = "Classic Rossy ballad from the Moramorà album";
        viewCount = 120;
        submittedAt = t - 6_000_000_000_000;
      },
      {
        title = "Iray Ihany";
        artist = "Tarika Sammy";
        album = "Faneva";
        yearReleased = 1987;
        lyrics = "Iray ihany ny fo amiko\nIray ihany ny ain'ny soa\nTsy misy hafa afa-tsy ianao\nVondron'ny foko tsy miova\n\nMirona aminao foana\nTsy misy hafa mahasolo\nTaniko malala indrindra\nMalagasy tsy mivadika";
        notes = "Iconic Tarika Sammy song celebrating Malagasy unity";
        viewCount = 98;
        submittedAt = t - 5_500_000_000_000;
      },
      {
        title = "Ampela Manao Reggae";
        artist = "Dama";
        album = "Gasy Reggae";
        yearReleased = 2001;
        lyrics = "Ampela manao reggae\nMandihy eo am-parihy\nSamy mifaly daholo\nEo am-potoan'ny andro\n\nJoy sy firavoravoana\nMiaraka miara-mifaly\nZatovo sy antilahy\nSamy maneno fo iray";
        notes = "Reggae-influenced Malagasy song by Dama";
        viewCount = 74;
        submittedAt = t - 5_000_000_000_000;
      },
      {
        title = "Tsy Misy Mahalala";
        artist = "Mahaleo";
        album = "Mahaleo Live";
        yearReleased = 1998;
        lyrics = "Tsy misy mahalala ny ho avy\nTsy misy mahafantatra ny tolakandro\nFa ny andro lasa dia tsy miverina\nHaka ho an'ny fiainana\n\nNandihy sy nifaly isika\nNihira sy niara-naneno\nEfa lasa ny alina\nFa ny maraina mbola tsy tonga";
        notes = "Philosophical song by legendary group Mahaleo";
        viewCount = 211;
        submittedAt = t - 4_500_000_000_000;
      },
      {
        title = "Malaika";
        artist = "Bessa";
        album = "Gasy Classics";
        yearReleased = 2005;
        lyrics = "Malaika kely tsara\nMitsikitsiky aminay\nSoa ny fiainana aminao\nSoa ny andro miaraka\n\nHiara-mandeha amin'ny lala\nHiara-mihira amin'ny fo\nTsy misy mahalova antsika\nRaha miray fo isika";
        notes = "Beautiful love ballad in traditional Malagasy style";
        viewCount = 55;
        submittedAt = t - 4_000_000_000_000;
      },
      {
        title = "Ry Tanindrazana";
        artist = "Rossy";
        album = "Salegy";
        yearReleased = 1992;
        lyrics = "Ry tanindrazana malala o\nTahionao izahay rehetra\nHiaro sy hiambina antsika\nEo am-potoan'ny andro\n\nTaniko malala indrindra\nVontoatiny sy ombiasy\nNy fomba sy ny fanahy\nMalagasy tsy mivadika";
        notes = "Patriotic salegy song honoring the Malagasy homeland";
        viewCount = 187;
        submittedAt = t - 3_500_000_000_000;
      },
    ];

    var id = startId;
    for (s in seeds.values()) {
      lyrics.add({
        id;
        title = s.title;
        artist = s.artist;
        album = s.album;
        yearReleased = s.yearReleased;
        lyrics = s.lyrics;
        notes = s.notes;
        contributorId = adminId;
        contributorName = "Admin";
        submittedAt = s.submittedAt;
        viewCount = s.viewCount;
      });
      id += 1;
    };
    id;
  };
};
