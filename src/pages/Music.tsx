import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Play, Shuffle } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import NightRoom from "@/components/NightRoom";
import PageHead from "@/components/PageHead";
import { ym, formatDuration, type LikedTrack } from "@/lib/data";

const hoursText = (ms: number) => {
  const m = Math.round(ms / 60000);
  return `${Math.floor(m / 60)} h ${String(m % 60).padStart(2, "0")} min`;
};

const Music = () => {
  const tracks = ym.ok ? ym.likedTracks : [];
  const [current, setCurrent] = useState<LikedTrack | undefined>(tracks[0]);
  const [playing, setPlaying] = useState<LikedTrack | null>(null);
  const [artist, setArtist] = useState<string | null>(null);

  useEffect(() => {
    const prev = document.title;
    document.title = "Music — Denis Muratbaev";
    return () => { document.title = prev; };
  }, []);

  const { topArtists, totalMs } = useMemo(() => {
    const count = new Map<string, number>();
    tracks.forEach((t) => t.artists.forEach((a) => count.set(a, (count.get(a) ?? 0) + 1)));
    return {
      topArtists: [...count.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, 8),
      totalMs: tracks.reduce((sum, t) => sum + t.durationMs, 0),
    };
  }, [tracks]);

  if (!tracks.length || !current) return null;

  const visible = artist ? tracks.filter((t) => t.artists.includes(artist)) : tracks;
  const play = (t: LikedTrack) => { setCurrent(t); setPlaying(t); };
  const shuffle = () => {
    const pool = visible.filter((t) => t.id !== current.id);
    if (pool.length) play(pool[Math.floor(Math.random() * pool.length)]);
  };

  const facts: [string, string][] = [
    [ym.totalLikedTracks.toLocaleString("en-US"), "liked tracks in total"],
    [String(tracks.length), "newest likes on the wall"],
    [hoursText(totalMs), "of music on the wall"],
    [topArtists[0][0], `most often · ${topArtists[0][1]} tracks`],
  ];

  return (
    <>
      <PageHead kicker={`Music · ${ym.totalLikedTracks.toLocaleString("en-US")} liked tracks`} lede="What plays while the tests run. Pick a record from the wall and it goes into the cassette deck.">
        Night <em>shift</em>
      </PageHead>

      <main>
        <div className="night">
          <NightRoom track={{ title: current.title, artist: current.artists.join(", ") }} />
          <div className="deck">
            <div className="deck-now">
              <span className="ch-no">In the deck</span>
              <b>{current.title}</b>
              <span>{current.artists.join(", ")} · {formatDuration(current.durationMs)}</span>
            </div>
            <div className="deck-actions">
              <button className="btn btn-paper" onClick={() => setPlaying(current)}>
                <Play size={14} fill="currentColor" strokeWidth={1.5} /> Play
              </button>
              <button className="btn btn-ghost" onClick={shuffle}>
                <Shuffle size={14} strokeWidth={1.5} /> Shuffle
              </button>
            </div>
          </div>
        </div>

        <dl className="music-facts">
          {facts.map(([value, label]) => (
            <div key={label}>
              <dd>{value}</dd>
              <dt>{label}</dt>
            </div>
          ))}
        </dl>

        <div className="wall-head">
          <h2>The wall</h2>
          <div className="chips" role="group" aria-label="Filter by artist">
            <button className={!artist ? "on" : ""} onClick={() => setArtist(null)}>All</button>
            {topArtists.map(([name, n]) => (
              <button key={name} className={artist === name ? "on" : ""} onClick={() => setArtist(artist === name ? null : name)}>
                {name} <span>{n}</span>
              </button>
            ))}
          </div>
        </div>

        <ul className="wall">
          {visible.map((t) => (
            <li key={t.id}>
              <button className={t.id === current.id ? "on" : ""} onClick={() => play(t)} aria-label={`Play ${t.title}, ${t.artists.join(", ")}`}>
                <span className="cover">
                  {t.cover ? <img src={t.cover} alt="" width={200} height={200} loading="lazy" /> : <span className="no-cover" />}
                  <span className="cover-play"><Play size={18} fill="currentColor" strokeWidth={1.5} /></span>
                </span>
                <span className="wall-title">{t.title}</span>
                <span className="wall-artist">{t.artists.join(", ")}</span>
              </button>
            </li>
          ))}
        </ul>
      </main>

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
    </>
  );
};

export default Music;
