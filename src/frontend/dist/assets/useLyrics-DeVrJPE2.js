import { u as useActor, a as useQuery, b as useMutation, c as createActor } from "./backend-kJniYQbd.js";
import { i as useQueryClient } from "./index-DTMN0Tcy.js";
const SAMPLE_LYRICS = [
  {
    id: 1n,
    title: "Izy irery",
    artist: "D'Gary",
    album: "Malagasy Guitar",
    year: 1993,
    genre: "Tsapiky",
    lyrics: "Tomany, hitako ny masonao tomany,\nTsy kivy aho, fa mbola mitady fitiavana...\n\nTomany, hitako ny tropha soya hapo,\nTsy kivy aho, fa mbola kitady fitiavana,\nTsy kernani, fa mbola mitmana...",
    contributor: "Tsiry R.",
    contributorId: "",
    createdAt: BigInt(Date.now() - 864e5),
    updatedAt: BigInt(Date.now() - 864e5)
  },
  {
    id: 2n,
    title: "Aho hitaho tmalanai",
    artist: "Jaojoby",
    album: "Salegy",
    year: 1998,
    genre: "Salegy",
    lyrics: "Aho hitaho tmalanai,\nNy fo mahafaly,\nMirindra ny hira,\nManambara ny fitiavana...",
    contributor: "Nivo M.",
    contributorId: "",
    createdAt: BigInt(Date.now() - 1728e5),
    updatedAt: BigInt(Date.now() - 1728e5)
  },
  {
    id: 3n,
    title: "Yanisɔ chiltaana",
    artist: "Erick Manana",
    album: "Hira Gasy",
    year: 2001,
    genre: "Hira Gasy",
    lyrics: "Yanisɔ chiltaana, ny tany malala,\nFaritra manankarena, soa izay hita,\nMalagasy ny foko, tsy havela ho very...",
    contributor: "Ranja T.",
    contributorId: "",
    createdAt: BigInt(Date.now() - 2592e5),
    updatedAt: BigInt(Date.now() - 2592e5)
  },
  {
    id: 4n,
    title: "Karv.am syehato",
    artist: "Rajery",
    album: "Valiha Sessions",
    year: 2005,
    genre: "Valiha",
    lyrics: "Karv.am syehato, ny zava-maneno,\nValiha miteny, ny fon'ny Malagasy,\nFihirana mamy, mahafinaritra...",
    contributor: "Haja L.",
    contributorId: "",
    createdAt: BigInt(Date.now() - 3456e5),
    updatedAt: BigInt(Date.now() - 3456e5)
  },
  {
    id: 5n,
    title: "Tsy kivy",
    artist: "Mahaleo",
    album: "Feon'ny Mahaleo",
    year: 1990,
    genre: "Folk",
    lyrics: "Tsy kivy na dia sarotra aza,\nMitohy ny diako eo amin'ny lalana,\nNy fanantenana no mampijoro...",
    contributor: "Soa R.",
    contributorId: "",
    createdAt: BigInt(Date.now() - 432e6),
    updatedAt: BigInt(Date.now() - 432e6)
  },
  {
    id: 6n,
    title: "Manina ny tanindrazana",
    artist: "Tarika Sammy",
    album: "Roots",
    year: 1994,
    genre: "Folk",
    lyrics: "Manina ny tanindrazana,\nFaritra malalaka, soa ny tany,\nMiarahaba ny mpiray tanindrazana...",
    contributor: "Kanto M.",
    contributorId: "",
    createdAt: BigInt(Date.now() - 5184e5),
    updatedAt: BigInt(Date.now() - 5184e5)
  }
];
function useLyrics() {
  const { actor, isFetching } = useActor(createActor);
  const backend = actor;
  return useQuery({
    queryKey: ["lyrics"],
    queryFn: async () => {
      if (!(backend == null ? void 0 : backend.listLyrics)) return SAMPLE_LYRICS;
      try {
        const result = await backend.listLyrics();
        return result.length ? result : SAMPLE_LYRICS;
      } catch {
        return SAMPLE_LYRICS;
      }
    },
    enabled: !isFetching,
    staleTime: 3e4
  });
}
function useLyric(id) {
  const { actor, isFetching } = useActor(createActor);
  const backend = actor;
  return useQuery({
    queryKey: ["lyric", id.toString()],
    queryFn: async () => {
      if (!(backend == null ? void 0 : backend.getLyric)) {
        return SAMPLE_LYRICS.find((l) => l.id === id);
      }
      try {
        const result = await backend.getLyric(id);
        return result ?? void 0;
      } catch {
        return SAMPLE_LYRICS.find((l) => l.id === id);
      }
    },
    enabled: !isFetching && id !== void 0,
    staleTime: 3e4
  });
}
function useSearchLyrics(params) {
  const { actor, isFetching } = useActor(createActor);
  const backend = actor;
  return useQuery({
    queryKey: ["lyrics", "search", params],
    queryFn: async () => {
      const q = params.query.toLowerCase().trim();
      if (!(backend == null ? void 0 : backend.searchLyrics)) {
        if (!q && !params.artist && !params.genre) return SAMPLE_LYRICS;
        return SAMPLE_LYRICS.filter(
          (l) => {
            var _a;
            return (!q || l.title.toLowerCase().includes(q) || l.artist.toLowerCase().includes(q) || l.lyrics.toLowerCase().includes(q)) && (!params.artist || l.artist.toLowerCase().includes(params.artist.toLowerCase())) && (!params.genre || ((_a = l.genre) == null ? void 0 : _a.toLowerCase().includes(params.genre.toLowerCase())));
          }
        );
      }
      try {
        return await backend.searchLyrics(params);
      } catch {
        return SAMPLE_LYRICS;
      }
    },
    enabled: !isFetching,
    staleTime: 15e3
  });
}
function useArtists() {
  const { actor, isFetching } = useActor(createActor);
  const backend = actor;
  return useQuery({
    queryKey: ["artists"],
    queryFn: async () => {
      if (!(backend == null ? void 0 : backend.listArtists)) {
        return buildArtistMap(SAMPLE_LYRICS);
      }
      try {
        const raw = await backend.listArtists();
        if (Array.isArray(raw) && raw.length > 0 && typeof raw[0] === "string") {
          return raw.map((name) => ({ name, songCount: 0 }));
        }
        return raw;
      } catch {
        return buildArtistMap(SAMPLE_LYRICS);
      }
    },
    enabled: !isFetching,
    staleTime: 6e4
  });
}
function useSubmitLyric() {
  const { actor } = useActor(createActor);
  const backend = actor;
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input) => {
      if (!(backend == null ? void 0 : backend.submitLyric)) {
        return {
          ...input,
          id: BigInt(Date.now()),
          contributor: "",
          contributorId: "",
          createdAt: BigInt(Date.now()),
          updatedAt: BigInt(Date.now())
        };
      }
      return await backend.submitLyric(input);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["lyrics"] });
      qc.invalidateQueries({ queryKey: ["artists"] });
    }
  });
}
function useUpdateLyric() {
  const { actor } = useActor(createActor);
  const backend = actor;
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, input }) => {
      if (!(backend == null ? void 0 : backend.updateLyric)) {
        return {
          ...input,
          id,
          contributor: "",
          contributorId: "",
          createdAt: BigInt(Date.now()),
          updatedAt: BigInt(Date.now())
        };
      }
      return await backend.updateLyric(id, input);
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["lyrics"] });
      qc.invalidateQueries({ queryKey: ["lyric", data.id.toString()] });
    }
  });
}
function buildArtistMap(lyrics) {
  const map = {};
  for (const l of lyrics) {
    map[l.artist] = (map[l.artist] ?? 0) + 1;
  }
  return Object.entries(map).map(([name, songCount]) => ({ name, songCount }));
}
export {
  useSearchLyrics as a,
  useArtists as b,
  useLyric as c,
  useSubmitLyric as d,
  useUpdateLyric as e,
  useLyrics as u
};
