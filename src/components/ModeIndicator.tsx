import { useEffect, useState } from "react";
import { Eye, MousePointer, Headset } from "lucide-react";

export default function ModeIndicator() {
  const [vrSupported, setVrSupported] = useState(false);

  useEffect(() => {
    const nav = navigator as Navigator & { xr?: { isSessionSupported(s: string): Promise<boolean> } };
    if (nav.xr?.isSessionSupported) {
      nav.xr.isSessionSupported("immersive-vr").then(setVrSupported).catch(() => setVrSupported(false));
    }
  }, []);

  return (
    <div className="pointer-events-none absolute bottom-4 right-4 z-40">
      <div
        className={`flex items-center gap-2 rounded-2xl border px-3 py-2 backdrop-blur-xl ${
          vrSupported ? "border-emerald-400/30 bg-emerald-500/10" : "border-amber-400/30 bg-amber-500/10"
        }`}
      >
        {vrSupported ? (
          <>
            <Headset size={14} className="text-emerald-400" />
            <span className="text-xs font-medium text-emerald-300">Headset VR Ready</span>
          </>
        ) : (
          <>
            <MousePointer size={14} className="text-amber-400" />
            <span className="text-xs font-medium text-amber-300">Simulated Preview</span>
          </>
        )}
      </div>
    </div>
  );
}

export function GazeCursor() {
  const [pos, setPos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <div
      className="pointer-events-none fixed z-50 h-6 w-6 -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
      style={{ left: pos.x, top: pos.y }}
    >
      <div className="absolute inset-0 rounded-full border-2 border-sky-400/60" />
      <div className="absolute inset-2 rounded-full bg-sky-400/40" />
      <div className="absolute inset-[10px] rounded-full bg-white" />
    </div>
  );
}

export function Notification() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 3000);
    const h = setTimeout(() => setShow(false), 8000);
    return () => {
      clearTimeout(t);
      clearTimeout(h);
    };
  }, []);

  if (!show) return null;

  return (
    <div className="pointer-events-none absolute right-4 top-20 z-40">
      <div className="flex items-center gap-3 rounded-2xl border border-white/12 bg-black/50 px-4 py-3 backdrop-blur-xl">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500/20">
          <Eye size={16} className="text-sky-400" />
        </div>
        <div>
          <p className="text-xs font-semibold text-white">Welcome to VistaOS</p>
          <p className="text-[10px] text-white/50">Move your cursor to explore the spatial interface.</p>
        </div>
      </div>
    </div>
  );
}
