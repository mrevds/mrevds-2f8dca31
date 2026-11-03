import wakaJson from "@/data/wakatime.json";
import ymJson from "@/data/yandex-music.json";
import lcJson from "@/data/leetcode.json";

export type WakaItem = { name: string; percent: number; text: string };
export type WakaData = {
  ok: boolean;
  fetchedAt: string | null;
  totalSeconds?: number;
  humanReadableTotal?: string;
  languages?: WakaItem[];
  editors?: WakaItem[];
  operatingSystems?: WakaItem[];
  allTime?: string | null;
  allTimeLanguages?: WakaItem[];
  allTimeEditors?: WakaItem[];
  allTimeOS?: WakaItem[];
};

export type LikedTrack = {
  id: string;
  title: string;
  artists: string[];
  cover: string | null;
  albumTitle: string | null;
  albumId: number | null;
  durationMs: number;
};

export type YMData = {
  ok: boolean;
  fetchedAt: string | null;
  likedTracks: LikedTrack[];
  totalLikedTracks: number;
};

type ByLevel = { all: number; easy: number; medium: number; hard: number };
export type LCData = {
  ok: boolean;
  fetchedAt: string | null;
  username: string;
  solved: ByLevel;
  total: ByLevel;
  languages: { name: string; solved: number }[];
  tags: { name: string; solved: number }[];
  recent: { title: string; slug: string; at: number; lang: string }[];
};

export const waka = wakaJson as WakaData;
export const ym = ymJson as YMData;
export const lc = lcJson as LCData;

/* "1,266 hrs 42 mins" → "1,266 h"; "45 mins" → "45 min" */
export const shortHours = (text?: string | null) => {
  if (!text) return "";
  const h = text.match(/([\d,]+)\s*hrs?/);
  if (h) return `${h[1]} h`;
  const m = text.match(/(\d+)\s*mins?/);
  return m ? `${m[1]} min` : text;
};

/* prefer the last 7 days when WakaTime has them, otherwise all time */
export const wakaView = () => {
  const recent = (waka.totalSeconds ?? 0) > 0 && !!waka.languages?.length;
  return {
    languages: (recent ? waka.languages : waka.allTimeLanguages) ?? [],
    editors: (recent ? waka.editors : waka.allTimeEditors) ?? [],
    os: (recent ? waka.operatingSystems : waka.allTimeOS) ?? [],
    allTime: shortHours(waka.allTime),
    recentTotal: recent ? shortHours(waka.humanReadableTotal) : null,
    period: recent ? "last 7 days" : "all time",
  };
};

export const formatDate = (iso: string | null) =>
  iso ? new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "";

export const formatDuration = (ms: number) => {
  const s = Math.floor(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};
