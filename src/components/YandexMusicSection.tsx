import { useState } from "react";
import ym from "@/data/yandex-music.json";
import { Dialog, DialogContent } from "@/components/ui/dialog";

type LikedTrack = {
  id: string;
  title: string;
  artists: string[];
  cover: string | null;
  albumTitle: string | null;
  albumId: number | null;
  durationMs: number;
};

type YMData = {
  ok: boolean;
  fetchedAt: string | null;
  user: { uid: number; login: string; displayName: string } | null;
  likedTracks: LikedTrack[];
  likedTracksCount: number | null;
  totalLikedTracks: number;
};

const data = ym as YMData;

function formatDuration(ms: number) {
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${String(sec).padStart(2, "0")}`;
}

const YandexMusicSection = () => {
  const [playing, setPlaying] = useState<LikedTrack | null>(null);

  if (!data.ok || !data.likedTracks.length) return null;

  return (
    <section className="block reveal" id="music">
      <div className="eyebrow">
        <span className="num">04</span> · my tunes · おんがく
      </div>
      <h2>
        What I <span className="accent">listen</span> to
        <span className="jp">きいてる おんがく</span>
      </h2>

      <div className="ym-stats">
        <div className="ym-stat" style={{ background: "var(--sakura)" }}>
          <div className="ym-stat-num">{data.likedTracks.length}+</div>
          <div className="ym-stat-label">recently liked</div>
        </div>
        <div className="ym-stat" style={{ background: "var(--taro)" }}>
          <div className="ym-stat-num">{data.totalLikedTracks}</div>
          <div className="ym-stat-label">total liked</div>
        </div>
      </div>

      <div className="ym-section-head">
        <span className="ym-section-title">liked tracks</span>
        <span className="ym-section-jp">すきな きょく</span>
      </div>

      <div className="ym-like-scroll">
        {data.likedTracks.map((t) => (
          <button
            className="ym-like-card"
            key={t.id}
            onClick={() => setPlaying(t)}
          >
            {t.cover ? (
              <img className="ym-like-cover" src={t.cover} alt="" loading="lazy" />
            ) : (
              <div className="ym-like-cover ym-like-cover-fallback">♪</div>
            )}
            <div className="ym-like-play-overlay">▶</div>
            <div className="ym-like-body">
              <div className="ym-like-title">{t.title}</div>
              <div className="ym-like-artists">{t.artists.join(", ")}</div>
              <div className="ym-like-meta">
                {t.albumTitle && <span>{t.albumTitle}</span>}
                <span className="ym-like-dur">{formatDuration(t.durationMs)}</span>
              </div>
            </div>
            <div className="ym-like-heart">♡</div>
          </button>
        ))}
      </div>

      <Dialog open={!!playing} onOpenChange={(o) => !o && setPlaying(null)}>
        {playing && (
          <DialogContent className="ym-player-dialog">
            <div className="ym-player-info">
              {playing.cover && (
                <img className="ym-player-cover-sm" src={playing.cover} alt="" />
              )}
              <div>
                <div className="ym-player-title">{playing.title}</div>
                <div className="ym-player-artists">{playing.artists.join(" · ")}</div>
              </div>
            </div>
            <iframe
              className="ym-player-iframe"
              src={`https://music.yandex.ru/iframe/#track/${playing.id}/${playing.albumId || ""}`}
              allow="autoplay *; encrypted-media *; fullscreen *"
              title="Yandex Music Player"
            />
            <div className="ym-player-foot">
              <a
                href={`https://music.yandex.ru/track/${playing.id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                открыть в яндекс музыке ↗
              </a>
            </div>
          </DialogContent>
        )}
      </Dialog>

      {data.fetchedAt && (
        <div className="ym-foot">
          // {data.totalLikedTracks} liked tracks · synced from yandex music ·{" "}
          {new Date(data.fetchedAt).toLocaleDateString("en-GB")}
        </div>
      )}
    </section>
  );
};

export default YandexMusicSection;
