import { useState } from "react";
import { Star, Download, ArrowLeft, Check } from "lucide-react";
import Panel from "@/components/Panel";
import { storeItems, storeCategories, type StoreItem } from "@/data/vrContent";

export default function StoreScreen() {
  const [cat, setCat] = useState("Featured");
  const [selected, setSelected] = useState<StoreItem | null>(null);

  const list = cat === "Featured" ? storeItems : storeItems.filter((i) => i.category === cat);

  if (selected) {
    return (
      <Panel title={selected.name} width="max-w-3xl">
        <button
          onClick={() => setSelected(null)}
          className="mb-4 flex items-center gap-1.5 text-sm text-white/60 transition hover:text-white"
        >
          <ArrowLeft size={15} /> Back to store
        </button>

        <div className="overflow-hidden rounded-2xl border border-white/10">
          <div className="relative aspect-[16/8] overflow-hidden">
            <img src={selected.image} alt={selected.name} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-0 left-0 p-5">
              <div
                className="mb-2 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-medium text-white"
                style={{ background: `${selected.color}66` }}
              >
                {selected.category}
              </div>
              <h3 className="text-2xl font-bold text-white">{selected.name}</h3>
              <p className="text-sm text-white/60">by {selected.developer}</p>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1">
            <Star size={15} className="fill-amber-400 text-amber-400" />
            <span className="text-sm font-semibold text-white">{selected.rating}</span>
          </div>
          <div className="h-4 w-px bg-white/15" />
          <span className="text-sm text-white/60">Compatible: {selected.compatible.join(" · ")}</span>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-white/70">{selected.description}</p>

        <div className="mt-4 grid grid-cols-2 gap-3">
          {selected.screenshots.map((s, i) => (
            <div key={i} className="overflow-hidden rounded-xl border border-white/10">
              <img src={s} alt={`Screenshot ${i + 1}`} className="aspect-video w-full object-cover" />
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-3">
          <button
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl py-3 text-sm font-bold text-white shadow-lg transition hover:scale-[1.02]"
            style={{ background: `linear-gradient(135deg, ${selected.color}, ${selected.color}aa)` }}
          >
            {selected.free ? (
              <>
                <Download size={16} /> Get — Free
              </>
            ) : (
              <>
                <Check size={16} /> Buy — {selected.price}
              </>
            )}
          </button>
          <button className="rounded-2xl border border-white/15 px-5 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10">
            Wishlist
          </button>
        </div>
        <p className="mt-2 text-center text-[10px] text-white/30">
          Simulated store — no real purchases are processed.
        </p>
      </Panel>
    );
  }

  return (
    <Panel title="Store" width="max-w-4xl">
      <div className="mb-4 flex flex-wrap gap-2">
        {storeCategories.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
              cat === c ? "bg-emerald-500 text-white" : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Featured banner */}
      {cat === "Featured" && (
        <button
          onClick={() => setSelected(storeItems[0])}
          className="group relative mb-4 block w-full overflow-hidden rounded-2xl border border-white/10 text-left"
        >
          <div className="relative aspect-[16/7] overflow-hidden">
            <img
              src={storeItems[0].image}
              alt={storeItems[0].name}
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 p-5">
            <span className="rounded-full bg-emerald-500/80 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
              Featured
            </span>
            <h3 className="mt-2 text-2xl font-bold text-white">{storeItems[0].name}</h3>
            <p className="mt-1 max-w-md text-sm text-white/70">{storeItems[0].description}</p>
          </div>
        </button>
      )}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((item) => (
          <button
            key={item.id}
            onClick={() => setSelected(item)}
            className="group relative overflow-hidden rounded-2xl border border-white/10 text-left transition hover:border-white/25 hover:scale-[1.02]"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-3.5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-white">{item.name}</p>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    item.free ? "bg-emerald-500/80 text-white" : "bg-white/20 text-white backdrop-blur-md"
                  }`}
                >
                  {item.free ? "Free" : item.price}
                </span>
              </div>
              <div className="mt-0.5 flex items-center gap-1">
                <Star size={10} className="fill-amber-400 text-amber-400" />
                <span className="text-[10px] text-white/60">{item.rating}</span>
                <span className="text-[10px] text-white/40"> · {item.category}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </Panel>
  );
}
