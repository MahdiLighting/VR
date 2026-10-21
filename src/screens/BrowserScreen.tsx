import { useState } from "react";
import { ArrowLeft, ArrowRight, RotateCw, Lock, Star, Plus } from "lucide-react";
import Panel from "@/components/Panel";

const bookmarks = [
  { name: "Vista Search", url: "vista://search", color: "#38bdf8" },
  { name: "Spatial YouTube", url: "spatial.video", color: "#ef4444" },
  { name: "Immersive News", url: "vrnews.io", color: "#34d399" },
  { name: "3D Maps", url: "maps.vr", color: "#f97316" },
  { name: "Skybox Gallery", url: "skybox.gallery", color: "#a78bfa" },
];

const trending = [
  "Best VR games 2026",
  "Spatial computing guide",
  "WebXR experiments",
  "Hand tracking tutorials",
  "VR fitness routines",
];

export default function BrowserScreen() {
  const [url, setUrl] = useState("vista://home");
  const [input, setInput] = useState(url);

  return (
    <Panel title="Browser" width="max-w-4xl">
      {/* Address bar */}
      <div className="mb-4 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-2">
        <button className="flex h-8 w-8 items-center justify-center rounded-lg text-white/50 transition hover:bg-white/10 hover:text-white">
          <ArrowLeft size={15} />
        </button>
        <button className="flex h-8 w-8 items-center justify-center rounded-lg text-white/50 transition hover:bg-white/10 hover:text-white">
          <ArrowRight size={15} />
        </button>
        <button className="flex h-8 w-8 items-center justify-center rounded-lg text-white/50 transition hover:bg-white/10 hover:text-white">
          <RotateCw size={14} />
        </button>
        <div className="flex flex-1 items-center gap-2 rounded-xl bg-black/30 px-3 py-1.5">
          <Lock size={12} className="text-emerald-400" />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && setUrl(input)}
            className="flex-1 bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
            placeholder="Search or enter address"
          />
        </div>
      </div>

      {/* New tab page */}
      <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-sky-500/8 to-transparent p-6 text-center">
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-indigo-500 shadow-lg">
          <span className="text-xl font-bold text-white">V</span>
        </div>
        <h3 className="text-lg font-semibold text-white">Spatial Browser</h3>
        <p className="mt-1 text-sm text-white/50">Browse the immersive web in 360 degrees.</p>

        <div className="mx-auto mt-4 flex max-w-md items-center gap-2 rounded-2xl border border-white/10 bg-black/30 px-4 py-2.5">
          <input
            className="flex-1 bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
            placeholder="Search the spatial web..."
          />
          <button className="rounded-xl bg-sky-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-sky-400">
            Go
          </button>
        </div>

        <div className="mt-3 flex flex-wrap justify-center gap-2">
          {trending.map((t) => (
            <button
              key={t}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/60 transition hover:bg-white/10 hover:text-white"
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Bookmarks */}
      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-sm font-medium text-white/70">Bookmarks</p>
          <button className="flex items-center gap-1 text-xs text-sky-400 transition hover:text-sky-300">
            <Plus size={12} /> Add
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {bookmarks.map((b) => (
            <button
              key={b.name}
              onClick={() => {
                setUrl(b.url);
                setInput(b.url);
              }}
              className="group flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-3 transition hover:bg-white/10"
            >
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold text-white transition group-hover:scale-110"
                style={{ background: `${b.color}55` }}
              >
                {b.name[0]}
              </div>
              <span className="text-[11px] font-medium text-white/80">{b.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-1 text-[10px] text-white/30">
        <Star size={10} /> Simulated browser — no real network requests are made.
      </div>
    </Panel>
  );
}
