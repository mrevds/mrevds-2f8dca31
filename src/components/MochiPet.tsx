import { useCallback, useEffect, useRef, useState } from "react";
import MochiFace, { type MochiMood } from "./MochiFace";

type Area = "ground" | "wall-l" | "wall-r" | "ceiling" | "air";

const rand = (min: number, max: number) => Math.random() * (max - min) + min;
const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const nextTarget = (area: Area): { x: number; y: number; area: Area } => {
  const r = Math.random();
  if (area === "ground") {
    if (r < 0.7) return { x: rand(5, 90), y: rand(82, 88), area: "ground" };
    if (r < 0.85) return { x: rand(2, 6), y: rand(15, 80), area: "wall-l" };
    return { x: rand(88, 94), y: rand(15, 80), area: "wall-r" };
  }
  if (area === "wall-l") {
    if (r < 0.5) return { x: rand(2, 6), y: rand(15, 80), area: "wall-l" };
    if (r < 0.75) return { x: rand(5, 30), y: rand(82, 88), area: "ground" };
    return { x: rand(5, 40), y: rand(2, 8), area: "ceiling" };
  }
  if (area === "wall-r") {
    if (r < 0.5) return { x: rand(88, 94), y: rand(15, 80), area: "wall-r" };
    if (r < 0.75) return { x: rand(70, 95), y: rand(82, 88), area: "ground" };
    return { x: rand(60, 95), y: rand(2, 8), area: "ceiling" };
  }
  if (area === "ceiling") {
    if (r < 0.5) return { x: rand(5, 90), y: rand(2, 8), area: "ceiling" };
    if (r < 0.75) return { x: rand(2, 6), y: rand(15, 60), area: "wall-l" };
    return { x: rand(88, 94), y: rand(15, 60), area: "wall-r" };
  }
  return { x: rand(5, 90), y: rand(82, 88), area: "ground" };
};

interface ShimejiState {
  x: number; y: number; area: Area; mood: MochiMood; flip: boolean;
}

const MochiPet = () => {
  const lookRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ active: boolean; ox: number; oy: number }>({ active: false, ox: 0, oy: 0 });
  const [st, setSt] = useState<ShimejiState>(() => ({
    x: 50, y: 86, area: "ground", mood: "genki", flip: false,
  }));
  const [action, setAction] = useState<string>("idle");

  const move = useCallback(() => {
    setSt((prev) => {
      const t = nextTarget(prev.area);
      return { x: t.x, y: t.y, area: t.area, mood: prev.mood, flip: t.x < prev.x };
    });
    setAction("walk");
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const roll = Math.random();
      if (roll < 0.5) { move(); timer = setTimeout(tick, rand(2000, 4500)); }
      else if (roll < 0.7) { setAction("idle"); setSt((p) => ({ ...p, mood: pick(["genki", "happy", "surprised"]) })); timer = setTimeout(tick, rand(1500, 3500)); }
      else if (roll < 0.85) { setAction("sleep"); setSt((p) => ({ ...p, mood: "sleepy" })); timer = setTimeout(tick, rand(2000, 4000)); }
      else { setAction("wave"); setSt((p) => ({ ...p, mood: "happy" })); timer = setTimeout(tick, 1500); }
    };
    timer = setTimeout(tick, rand(1000, 3000));
    return () => clearTimeout(timer);
  }, [move]);

  /* mouse proximity — look at cursor */
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = lookRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dist = Math.sqrt(dx * dx + (e.clientY - cy) * (e.clientY - cy));
      if (dist < 130) {
        el.style.setProperty("--lx", `${Math.max(-8, Math.min(8, dx / 15))}px`);
        el.style.setProperty("--ly", `${Math.max(-6, Math.min(6, (e.clientY - cy) / 15))}px`);
      } else {
        el.style.removeProperty("--lx");
        el.style.removeProperty("--ly");
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  /* click */
  const handleClick = () => {
    setSt((prev) => ({ ...prev, mood: "surprised" }));
    setAction("idle");
    const el = lookRef.current?.querySelector(".mochi-pet-anim") as HTMLElement | null;
    if (el) { el.style.transform = "scale(1.3) rotate(-12deg)"; setTimeout(() => { el.style.transform = ""; }, 350); }
    setTimeout(() => setSt((prev) => ({ ...prev, mood: "genki" })), 800);
  };

  /* drag */
  const handleMouseDown = (e: React.MouseEvent) => {
    const r = lookRef.current?.getBoundingClientRect();
    if (!r) return;
    dragRef.current = { active: true, ox: e.clientX - r.left, oy: e.clientY - r.top };
  };
  useEffect(() => {
    const onUp = () => { dragRef.current.active = false; };
    const onMove = (e: MouseEvent) => {
      if (!dragRef.current.active) return;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      setSt((prev) => ({
        ...prev,
        x: Math.max(1, Math.min(95, ((e.clientX - dragRef.current.ox) / vw) * 100)),
        y: Math.max(1, Math.min(90, ((e.clientY - dragRef.current.oy) / vh) * 100)),
        area: "air",
      }));
      setAction("idle");
    };
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mousemove", onMove);
    return () => { window.removeEventListener("mouseup", onUp); window.removeEventListener("mousemove", onMove); };
  }, []);

  const isEdge = st.area === "ground" || st.area === "wall-l" || st.area === "wall-r" || st.area === "ceiling";

  return (
    <div
      className={`mochi-pet ${isEdge ? "pet-edge" : "pet-air"}`}
      style={{ left: `${st.x}vw`, top: `${st.y}vh` }}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
    >
      <div ref={lookRef} className="mochi-pet-look" data-flip={st.flip ? "1" : "0"}>
        <div className={`mochi-pet-anim pet-ani-${action}`}>
          <MochiFace mood={st.mood} size={48} blink={st.mood !== "sleepy"} antenna={false} />
          {action === "wave" && <span className="pet-bubble">✦ hi!</span>}
          {action === "sleep" && <span className="pet-bubble pet-zzz">💤</span>}
        </div>
      </div>
    </div>
  );
};

export default MochiPet;
