import { useEffect, useState } from "react";
import { Wifi, WifiOff, BatteryMedium, ChevronDown, User, Bell } from "lucide-react";
import { useVR } from "@/store/vrContext";

function formatTime(d: Date) {
  let h = d.getHours();
  const m = d.getMinutes().toString().padStart(2, "0");
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return { time: `${h}:${m}`, ampm };
}

export default function StatusBar() {
  const { wifi, toggleWifi, toggleQuickSettings, setScreen, toggleDock } = useVR();
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000 * 10);
    return () => clearInterval(id);
  }, []);

  const { time, ampm } = formatTime(now);
  const battery = 78;

  return (
    <div className="pointer-events-none absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-3">
      <div className="pointer-events-auto flex items-center gap-3 rounded-2xl border border-white/10 bg-black/30 px-4 py-2 backdrop-blur-xl">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-sky-400 to-indigo-500 text-sm font-bold text-white shadow-lg">
          V
        </div>
        <span className="text-sm font-medium tracking-wide text-white/90">VistaOS</span>
        <span className="ml-1 rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-white/60">
          Preview
        </span>
      </div>

      <div className="pointer-events-auto flex items-center gap-2 rounded-2xl border border-white/10 bg-black/30 px-3 py-2 backdrop-blur-xl">
        <div className="flex items-baseline gap-1 px-2">
          <span className="text-sm font-semibold tabular-nums text-white">{time}</span>
          <span className="text-[10px] text-white/50">{ampm}</span>
        </div>
        <div className="h-5 w-px bg-white/15" />
        <button
          onClick={toggleWifi}
          className="flex h-7 w-7 items-center justify-center rounded-lg text-white/80 transition hover:bg-white/10"
          title="Wi-Fi"
        >
          {wifi ? <Wifi size={15} /> : <WifiOff size={15} className="text-rose-400" />}
        </button>
        <div className="flex items-center gap-1.5 px-1">
          <BatteryMedium size={16} className="text-white/80" />
          <span className="text-[11px] font-medium tabular-nums text-white/80">{battery}%</span>
        </div>
        <div className="h-5 w-px bg-white/15" />
        <button
          onClick={toggleQuickSettings}
          className="flex h-7 w-7 items-center justify-center rounded-lg text-white/80 transition hover:bg-white/10"
          title="Quick settings"
        >
          <ChevronDown size={16} />
        </button>
        <button
          onClick={() => setScreen("settings")}
          className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-md transition hover:scale-105"
          title="Profile"
        >
          <User size={14} />
        </button>
      </div>

      <div className="pointer-events-auto flex items-center gap-2">
        <button
          className="flex h-9 w-9 items-center justify-center rounded-2xl border border-white/10 bg-black/30 text-white/80 backdrop-blur-xl transition hover:bg-white/10"
          title="Notifications"
        >
          <Bell size={15} />
        </button>
        <button
          onClick={toggleDock}
          className="flex h-9 items-center gap-2 rounded-2xl border border-white/10 bg-black/30 px-3 text-white/80 backdrop-blur-xl transition hover:bg-white/10"
          title="Universal menu"
        >
          <span className="text-xs font-medium">Menu</span>
        </button>
      </div>
    </div>
  );
}
