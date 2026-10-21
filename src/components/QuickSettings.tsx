import { motion, AnimatePresence } from "framer-motion";
import {
  Wifi,
  Bluetooth,
  Sun,
  Volume2,
  Eye,
  Shield,
  X,
  Headphones,
  Cast,
  Moon,
} from "lucide-react";
import { useVR } from "@/store/vrContext";
import { environments } from "@/data/vrContent";

function QuickToggle({
  icon: Icon,
  label,
  on,
  onClick,
  color = "#38bdf8",
}: {
  icon: typeof Wifi;
  label: string;
  on: boolean;
  onClick: () => void;
  color?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1.5 rounded-2xl border p-3 transition ${
        on ? "border-white/20" : "border-white/8 bg-white/5"
      }`}
      style={on ? { background: `${color}22`, boxShadow: `inset 0 0 0 1px ${color}44` } : {}}
    >
      <Icon size={18} className={on ? "text-white" : "text-white/50"} style={on ? { color } : undefined} />
      <span className={`text-[10px] font-medium ${on ? "text-white" : "text-white/50"}`}>{label}</span>
    </button>
  );
}

export default function QuickSettings() {
  const {
    quickSettingsOpen,
    toggleQuickSettings,
    wifi,
    toggleWifi,
    bluetooth,
    toggleBluetooth,
    passthrough,
    togglePassthrough,
    comfortMode,
    toggleComfort,
    volume,
    setVolume,
    brightness,
    setBrightness,
    environment,
    setEnvironment,
  } = useVR();

  return (
    <AnimatePresence>
      {quickSettingsOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={toggleQuickSettings} />
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            className="pointer-events-auto absolute right-4 top-16 z-50 w-80 rounded-3xl border border-white/12 bg-slate-950/90 p-4 shadow-2xl backdrop-blur-2xl"
          >
            <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-b from-white/8 to-transparent" />
            <div className="relative">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-semibold text-white">Quick Settings</p>
                <button onClick={toggleQuickSettings} className="text-white/50 transition hover:text-white">
                  <X size={16} />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <QuickToggle icon={Wifi} label="Wi-Fi" on={wifi} onClick={toggleWifi} color="#38bdf8" />
                <QuickToggle icon={Bluetooth} label="Bluetooth" on={bluetooth} onClick={toggleBluetooth} color="#a78bfa" />
                <QuickToggle icon={Eye} label="Passthrough" on={passthrough} onClick={togglePassthrough} color="#34d399" />
                <QuickToggle icon={Shield} label="Guardian" on={true} onClick={() => {}} color="#f59e0b" />
                <QuickToggle icon={Moon} label="Comfort" on={comfortMode} onClick={toggleComfort} color="#fb7185" />
                <QuickToggle icon={Cast} label="Cast" on={false} onClick={() => {}} color="#f97316" />
              </div>

              <div className="mt-4 space-y-3">
                <div className="rounded-2xl border border-white/8 bg-white/5 p-3">
                  <div className="mb-2 flex items-center gap-2">
                    <Sun size={14} className="text-amber-400" />
                    <span className="text-xs font-medium text-white">Brightness</span>
                    <span className="ml-auto text-xs text-white/40">{brightness}%</span>
                  </div>
                  <input
                    type="range"
                    min={20}
                    max={100}
                    value={brightness}
                    onChange={(e) => setBrightness(Number(e.target.value))}
                    className="vr-slider w-full"
                  />
                </div>
                <div className="rounded-2xl border border-white/8 bg-white/5 p-3">
                  <div className="mb-2 flex items-center gap-2">
                    <Volume2 size={14} className="text-sky-400" />
                    <span className="text-xs font-medium text-white">Volume</span>
                    <span className="ml-auto text-xs text-white/40">{volume}%</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className="vr-slider w-full"
                  />
                </div>
              </div>

              <div className="mt-3">
                <p className="mb-2 text-xs font-medium text-white/60">Environment</p>
                <div className="grid grid-cols-4 gap-2">
                  {environments.map((env) => (
                    <button
                      key={env.id}
                      onClick={() => setEnvironment(env.id)}
                      className={`overflow-hidden rounded-lg border transition ${
                        environment === env.id ? "border-sky-400 ring-1 ring-sky-400/40" : "border-white/10"
                      }`}
                    >
                      <div className="aspect-square overflow-hidden">
                        <img src={env.sky} alt={env.name} className="h-full w-full object-cover" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2 rounded-xl border border-white/8 bg-white/5 px-3 py-2">
                <Headphones size={14} className="text-white/60" />
                <span className="text-xs text-white/70">Audio output: Built-in speakers</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
