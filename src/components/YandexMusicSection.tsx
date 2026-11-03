import { useState } from "react";
import { ArrowUpRight, Play } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Chapter from "./Chapter";
import { PlateMoon } from "./Drawings";
import NightRoom from "./NightRoom";
import { ym, formatDuration, type LikedTrack } from "@/lib/data";

/* Chapter 05: a lo-fi room at night, the liked tracks on the side */
const YandexMusicSection = () => {
  const [playing, setPlaying] = useState<LikedTrack | null>(null);

  if (!ym.ok || !ym.likedTracks.length) return null;

  return (
    <section id="music">
      <Chapter
        n={5}
        title="Night shift"
        sub="What plays while tests run"
        genre="a lo-fi room"
        plate="var(--night)"
        dark
        drawing={<PlateMoon />}
      />
      <div className="chapter-body">
        <div className="night">
          <NightRoom track={{ title: ym.likedTracks[0].title, artist: ym.likedTracks[0].artists.join(", ") }} />
          <div className="night-list">
            <div className="ch-no">Side A · {ym.totalLikedTracks.toLocaleString("en-US")} liked tracks</div>
            <h3>On repeat</h3>
            <ul>
              {ym.likedTracks.slice(0, 8).map((t) => (
                <li key={t.id}>
                  <button onClick={() => setPlaying(t)}>
                    {t.cover ? <img src={t.cover} alt="" width={40} height={40} loading="lazy" /> : <span className="no-cover" />}
                    <span className="t">
                      {t.title}
                      <span>{t.artists.join(", ")}</span>
                    </span>
                    <span className="dur">{formatDuration(t.durationMs)}</span>
                    <Play className="play" size={14} strokeWidth={1.5} fill="currentColor" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Dialog open={!!playing} onOpenChange={(o) => !o && setPlaying(null)}>
        {playing && (
          <DialogContent className="player">
            <div className="player-head">
              {playing.cover && <img src={playing.cover} alt="" width={48} height={48} />}
              <div>
                <DialogTitle className="player-title">{playing.title}</DialogTitle>
                <div className="player-artist">{playing.artists.join(", ")}</div>
              </div>
            </div>
            <iframe
              className="player-frame"
              src={`https://music.yandex.ru/iframe/#track/${playing.id}/${playing.albumId || ""}`}
              allow="autoplay *; encrypted-media *; fullscreen *"
              title="Yandex Music player"
            />
            <a className="player-link" href={`https://music.yandex.ru/track/${playing.id}`} target="_blank" rel="noopener noreferrer">
              Open in Yandex Music <ArrowUpRight size={14} strokeWidth={1.5} />
            </a>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
};

export default YandexMusicSection;
