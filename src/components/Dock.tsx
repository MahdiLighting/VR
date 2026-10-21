import { Home, Library, ShoppingBag, Globe, Users, Settings, X } from "lucide-react";
import { useVR } from "@/store/vrContext";
import type { ScreenId } from "@/types";
import { motion, AnimatePresence } from "framer-motion";

interface DockItem {
  id: ScreenId;
  label: string;
  icon: typeof Home;
  color: string;
}

const items: DockItem[] = [
  { id: "home", label: "Home", icon: Home, color: "#38bdf8" },
  { id: "library", label: "Library", icon: Library, color: "#a78bfa" },
  { id: "store", label: "Store", icon: ShoppingBag, color: "#34d399" },
  { id: "browser", label: "Browser", icon: Globe, color: "#f97316" },
  { id: "social", label: "Social", icon: Users, color: "#f472b6" },
  { id: "settings", label: "Settings", icon: Settings, color: "#fb7185" },
];

export default function Dock() {
  const { dockOpen, setDockOpen, setScreen, currentScreen } = useVR();

  return (
    <AnimatePresence>
      {dockOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 26 }}
          className="pointer-events-auto absolute bottom-6 left-1/2 z-40 -translate-x-1/2"
        >
          <div className="relative flex items-center gap-1 rounded-[28px] border border-white/15 bg-black/50 p-2 shadow-2xl backdrop-blur-2xl">
            <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-gradient-to-b from-white/10 to-transparent" />
            {items.map((item) => {
              const active = currentScreen === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setScreen(item.id)}
                  className="group relative flex w-[68px] flex-col items-center gap-1.5 rounded-2xl px-2 py-3 transition"
                >
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl transition-all duration-200 ${
                      active ? "scale-105 shadow-lg" : "group-hover:scale-110"
                    }`}
                    style={{
                      background: active
                        ? `linear-gradient(135deg, ${item.color}, ${item.color}88)`
                        : "rgba(255,255,255,0.06)",
                      boxShadow: active ? `0 0 24px ${item.color}66` : "none",
                    }}
                  >
                    <Icon size={20} className="text-white" />
                  </div>
                  <span
                    className={`text-[10px] font-medium transition ${
                      active ? "text-white" : "text-white/50 group-hover:text-white/80"
                    }`}
                  >
                    {item.label}
                  </span>
                  {active && (
                    <motion.div
                      layoutId="dock-dot"
                      className="absolute -bottom-0.5 h-1 w-1 rounded-full bg-white"
                    />
                  )}
                </button>
              );
            })}
            <div className="mx-1 h-12 w-px bg-white/10" />
            <button
              onClick={() => setDockOpen(false)}
              className="flex h-11 w-11 items-center justify-center rounded-2xl text-white/60 transition hover:bg-white/10 hover:text-white"
              title="Close menu"
            >
              <X size={18} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
