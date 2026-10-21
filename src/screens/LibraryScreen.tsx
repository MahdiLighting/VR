import { useState } from "react";
import { Search, Star, Play, Heart } from "lucide-react";
import Panel from "@/components/Panel";
import { apps, appCategories } from "@/data/vrContent";

export default function LibraryScreen() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");

  const filtered = apps.filter((a) => {
    const matchQ = a.name.toLowerCase().includes(query.toLowerCase());
    if (!matchQ) return false;
    if (cat === "All") return true;
    if (cat === "Recently Opened") return !!a.lastOpened;
    if (cat === "Favorites") return !!a.favorite;
    return a.category === cat;
  });

  return (
    <Panel title="Library" width="max-w-4xl">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search your library..."
            className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-9 pr-3 text-sm text-white placeholder:text-white/40 focus:border-sky-400/50 focus:outline-none focus:ring-1 focus:ring-sky-400/30"
          />
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {appCategories.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
              cat === c ? "bg-sky-500 text-white" : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((app) => (
          <div
            key={app.id}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:border-white/20 hover:bg-white/10"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={app.image}
                alt={app.name}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div
                className="absolute left-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-md"
                style={{ background: `${app.color}66` }}
              >
                {app.category}
              </div>
              {app.favorite && (
                <div className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/40 backdrop-blur-md">
                  <Heart size={13} className="fill-rose-400 text-rose-400" />
                </div>
              )}
            </div>
            <div className="p-3.5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">{app.name}</p>
                  <div className="mt-0.5 flex items-center gap-1">
                    <Star size={11} className="fill-amber-400 text-amber-400" />
                    <span className="text-[11px] text-white/60">{app.rating}</span>
                    {app.lastOpened && <span className="text-[10px] text-white/40"> · {app.lastOpened}</span>}
                  </div>
                </div>
              </div>
              <button
                className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-semibold text-white transition group-hover:shadow-lg"
                style={{ background: `${app.color}33`, boxShadow: `0 0 0 1px ${app.color}44` }}
              >
                <Play size={13} /> Launch
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-12 text-center text-sm text-white/40">No experiences match your search.</div>
      )}
    </Panel>
  );
}
