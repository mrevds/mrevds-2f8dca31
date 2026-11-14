import type { LikedTrack } from "@/lib/data";
import { CloudSeaBg, FireflyForestBg, LanternPathBg, LighthouseBg, StarLakeBg } from "./scenes";
import { CandySkyBg, EmberMountainsBg, GlassReefBg, HighwayBg, NeonCityBg, PanelBlocksBg, PixelArcadeBg, VelvetLoungeBg } from "./scenes2";

/* Thirteen universes behind the door. A song goes to the first universe whose pattern matches the
   Yandex genre of its album ("rusrap", "foreignrap", "indie", "phonk", ...); anything unmatched
   washes up at the lighthouse. Each universe shows its songs as its own kind of thing. */

export type Kind =
  | "neon" | "window" | "taillight" | "coin" | "balloon" | "firefly" | "ember"
  | "vinyl" | "star" | "skylantern" | "lantern" | "jelly" | "bottle";

export type Universe = {
  id: string;
  kind: Kind;
  title: string;
  jp: string;
  genres: string;
  thing: string;
  text: string;
  match: RegExp | null;
  Bg: () => JSX.Element;
};

export const UNIVERSES: Universe[] = [
  {
    id: "highway", kind: "taillight", title: "Midnight Highway", jp: "真夜中の高速", genres: "phonk & trap", thing: "tail lights",
    match: /phonk|trap|drift/,
    text: "An empty road at three in the morning, cowbell in the speakers. Every pair of red lights ahead is a song you can catch up with.",
    Bg: HighwayBg,
  },
  {
    id: "blocks", kind: "window", title: "Panel Blocks", jp: "団地", genres: "Russian rap", thing: "lit windows",
    match: /rusrap|ruhiphop/,
    text: "Nine-storey blocks under a winter sky. Behind every lit window someone plays a track too loud for the thin walls.",
    Bg: PanelBlocksBg,
  },
  {
    id: "neon", kind: "neon", title: "Neon Avenue", jp: "ネオン通り", genres: "hip-hop & foreign rap", thing: "neon signs",
    match: /rap|hip.?hop|grime|drill/,
    text: "A city that never switched off. Every sign on the avenue hums with a verse, and some of them flicker when the bass hits.",
    Bg: NeonCityBg,
  },
  {
    id: "arcade", kind: "coin", title: "Pixel Arcade", jp: "ゲームセンター", genres: "electronic & dance", thing: "coins",
    match: /electr|house|techno|trance|dnb|drum|dubstep|edm|dance|bass|club|videogame|game|chip/,
    text: "Insert coin. A world drawn in eight bits, where every track is a spinning coin and the high score is how long you keep dancing.",
    Bg: PixelArcadeBg,
  },
  {
    id: "reef", kind: "jelly", title: "Glass Reef", jp: "硝子の珊瑚礁", genres: "post-punk & dark wave", thing: "jellyfish",
    match: /post.?punk|darkwave|coldwave|goth|witch|wave|synthpop/,
    text: "Cold water, slow light. The songs drift through the reef as jellyfish, pulsing in time with a drum machine somewhere far above.",
    Bg: GlassReefBg,
  },
  {
    id: "ember", kind: "ember", title: "Ember Mountains", jp: "火の山", genres: "rock & metal", thing: "embers",
    match: /metal|rock|punk|core|grunge|emo/,
    text: "Black peaks cut in wood, fire underneath. The songs fly up out of the crater as sparks: loud, bright and over too soon.",
    Bg: EmberMountainsBg,
  },
  {
    id: "forest", kind: "firefly", title: "The Firefly Forest", jp: "蛍の森", genres: "indie & alternative", thing: "fireflies",
    match: /indie|alternative|shoegaze|dream/,
    text: "Under the cedars the songs won’t stay still. They drift between the trunks like fireflies. Catch one and it plays.",
    Bg: FireflyForestBg,
  },
  {
    id: "lounge", kind: "vinyl", title: "Velvet Lounge", jp: "ベルベットの間", genres: "R&B, soul, funk & jazz", thing: "records",
    match: /rnb|r&b|soul|funk|disco|jazz|blues|lounge/,
    text: "Gold lines, red velvet and a band that plays past closing time. The songs turn slowly on the wall as records.",
    Bg: VelvetLoungeBg,
  },
  {
    id: "clouds", kind: "skylantern", title: "The Sea of Clouds", jp: "雲の海", genres: "lo-fi & chill", thing: "sky lanterns",
    match: /lo.?fi|chill|downtempo|trip|relax/,
    text: "Above the clouds a whale swims slowly west. The songs rise past it as sky lanterns, lighter than the night.",
    Bg: CloudSeaBg,
  },
  {
    id: "lake", kind: "star", title: "The Lake of Stars", jp: "星の湖", genres: "soundtracks, classical & ambient", thing: "stars",
    match: /classical|soundtrack|film|tvseries|animated|ambient|newage|instrumental|meditation|piano|score/,
    text: "The lake is so calm it keeps a second sky. These songs are pinned up there as constellations, and the water remembers each one.",
    Bg: StarLakeBg,
  },
  {
    id: "lanterns", kind: "lantern", title: "The Lantern Path", jp: "提灯の道", genres: "folk, world & estrada", thing: "lanterns",
    match: /folk|world|ethnic|bard|estrada|shanson|local|country|reggae|latin|african|eastern|uzbek|asian/,
    text: "A path through a field of red spider lilies, and someone has hung a paper lantern for every song that sounds like somewhere.",
    Bg: LanternPathBg,
  },
  {
    id: "candy", kind: "balloon", title: "Candy Sky", jp: "綿菓子の空", genres: "pop", thing: "balloons",
    match: /pop|kids|disney/,
    text: "A sky cut out of pastel paper. The songs float up as balloons; pull a string and one comes down to play.",
    Bg: CandySkyBg,
  },
  {
    id: "lighthouse", kind: "bottle", title: "The Lighthouse", jp: "灯台", genres: "everything else", thing: "bottles",
    match: null,
    text: "At the end of the world a lighthouse keeper collects every song that fits nowhere else. The tide brings them back in bottles, and the light at home stays on.",
    Bg: LighthouseBg,
  },
];

const LIGHTHOUSE = UNIVERSES.length - 1;

export const universeOf = (genre?: string | null) => {
  if (!genre) return LIGHTHOUSE;
  const g = genre.toLowerCase();
  const i = UNIVERSES.findIndex((u) => u.match?.test(g));
  return i < 0 ? LIGHTHOUSE : i;
};

export type Placed = { universe: Universe; tracks: LikedTrack[] };

/* Group by genre, biggest universes first, the lighthouse always last.
   Data fetched before genres were saved has none: then the songs are shared out in order,
   so the page still shows every universe, and `byGenre` tells the captions not to name genres. */
export const placeTracks = (tracks: LikedTrack[]): { placed: Placed[]; byGenre: boolean } => {
  const byGenre = tracks.some((t) => t.genre);
  const buckets: LikedTrack[][] = UNIVERSES.map(() => []);
  if (byGenre) {
    tracks.forEach((t) => buckets[universeOf(t.genre)].push(t));
  } else {
    const per = Math.ceil(tracks.length / UNIVERSES.length);
    tracks.forEach((t, i) => buckets[Math.min(UNIVERSES.length - 1, Math.floor(i / per))].push(t));
  }
  const placed = UNIVERSES.map((universe, i) => ({ universe, tracks: buckets[i] })).filter((p) => p.tracks.length);
  const end = placed.filter((p) => p.universe.id === "lighthouse");
  const rest = placed.filter((p) => p.universe.id !== "lighthouse").sort((a, b) => b.tracks.length - a.tracks.length);
  return { placed: [...rest, ...end], byGenre };
};
