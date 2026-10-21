import { useState } from "react";
import {
  Wifi,
  Bluetooth,
  Sun,
  Volume2,
  Eye,
  Shield,
  Accessibility,
  Image,
  User,
  ChevronRight,
  Power,
} from "lucide-react";
import Panel from "@/components/Panel";
import { useVR } from "@/store/vrContext";
import { environments } from "@/data/vrContent";

function Toggle({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`relative h-6 w-11 rounded-full transition ${on ? "bg-sky-500" : "bg-white/15"}`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${on ? "left-5" : "left-0.5"}`}
      />
    </button>
  );
}

function Row({
  icon: Icon,
  label,
  desc,
  children,
}: {
  icon: typeof Wifi;
  label: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/5 p-3.5">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white/80">
        <Icon size={18} />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-white">{label}</p>
        <p className="text-xs text-white/50">{desc}</p>
      </div>
      {children}
    </div>
  );
}

const sections = [
  { id: "network", label: "Network", icon: Wifi },
  { id: "display", label: "Display & Comfort", icon: Sun },
  { id: "environment", label: "Environment", icon: Image },
  { id: "guardian", label: "Guardian", icon: Shield },
  { id: "accessibility", label: "Accessibility", icon: Accessibility },
  { id: "profile", label: "Profile", icon: User },
];

export default function SettingsScreen() {
  const { wifi, toggleWifi, bluetooth, toggleBluetooth, volume, setVolume, brightness, setBrightness, comfortMode, toggleComfort, passthrough, togglePassthrough, environment, setEnvironment } = useVR();
  const [section, setSection] = useState<string>("network");

  return (
    <Panel title="Settings" width="max-w-3xl">
      <div className="flex gap-4">
        {/* Section nav */}
        <div className="hidden w-44 flex-shrink-0 sm:block">
          <div className="space-y-1">
            {sections.map((s) => {
              const Icon = s.icon;
              return (
                <button
                  key={s.id}
                  onClick={() => setSection(s.id)}
                  className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm transition ${
                    section === s.id ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon size={15} />
                  {s.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section content */}
        <div className="flex-1 space-y-2.5">
          {section === "network" && (
            <>
              <Row icon={Wifi} label="Wi-Fi" desc={wifi ? "Connected to Vista-5G" : "Off"}>
                <Toggle on={wifi} onClick={toggleWifi} />
              </Row>
              <Row icon={Bluetooth} label="Bluetooth" desc={bluetooth ? "Controllers paired" : "Off"}>
                <Toggle on={bluetooth} onClick={toggleBluetooth} />
              </Row>
            </>
          )}

          {section === "display" && (
            <>
              <Row icon={Sun} label="Brightness" desc={`${brightness}%`}>
                <input
                  type="range"
                  min={20}
                  max={100}
                  value={brightness}
                  onChange={(e) => setBrightness(Number(e.target.value))}
                  className="vr-slider w-28"
                />
              </Row>
              <Row icon={Volume2} label="Volume" desc={`${volume}%`}>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="vr-slider w-28"
                />
              </Row>
              <Row icon={Eye} label="Passthrough" desc={passthrough ? "See your surroundings" : "Fully immersive"}>
                <Toggle on={passthrough} onClick={togglePassthrough} />
              </Row>
              <Row icon={Shield} label="Comfort Mode" desc={comfortMode ? "Reduced motion & snap turns" : "Standard motion"}>
                <Toggle on={comfortMode} onClick={toggleComfort} />
              </Row>
            </>
          )}

          {section === "environment" && (
            <div>
              <p className="mb-3 text-sm text-white/60">Choose your virtual home:</p>
              <div className="grid grid-cols-2 gap-3">
                {environments.map((env) => (
                  <button
                    key={env.id}
                    onClick={() => setEnvironment(env.id)}
                    className={`group relative overflow-hidden rounded-2xl border transition ${
                      environment === env.id ? "border-sky-400 ring-2 ring-sky-400/40" : "border-white/10 hover:border-white/25"
                    }`}
                  >
                    <div className="aspect-video overflow-hidden">
                      <img src={env.sky} alt={env.name} className="h-full w-full object-cover transition group-hover:scale-110" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-0 p-3 text-left">
                      <p className="text-sm font-semibold text-white">{env.name}</p>
                      <p className="text-[10px] text-white/60">{env.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {section === "guardian" && (
            <div className="rounded-2xl border border-white/8 bg-white/5 p-5">
              <Shield size={28} className="mb-2 text-emerald-400" />
              <p className="text-sm font-semibold text-white">Boundary Setup</p>
              <p className="mt-1 text-xs text-white/60">
                Draw a safe play area around you. The boundary glows when you approach its edge.
              </p>
              <div className="mt-4 rounded-xl border border-dashed border-emerald-400/30 bg-emerald-500/5 p-6 text-center">
                <div className="mx-auto mb-2 h-24 w-24 rounded-full border-2 border-emerald-400/40" />
                <p className="text-xs text-white/50">Standing area · 1.5m × 1.5m</p>
              </div>
              <button className="mt-4 w-full rounded-xl bg-emerald-500 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-400">
                Redraw Boundary
              </button>
            </div>
          )}

          {section === "accessibility" && (
            <>
              <Row icon={Eye} label="Text Size" desc="Adjust system-wide text scale">
                <div className="flex gap-1">
                  {["S", "M", "L"].map((s, i) => (
                    <button key={s} className={`rounded-lg px-2.5 py-1 text-xs ${i === 1 ? "bg-sky-500 text-white" : "bg-white/10 text-white/60"}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </Row>
              <Row icon={Accessibility} label="Color Contrast" desc="High contrast mode">
                <Toggle on={false} onClick={() => {}} />
              </Row>
              <Row icon={Volume2} label="Audio Descriptions" desc="Narrate interface elements">
                <Toggle on={false} onClick={() => {}} />
              </Row>
            </>
          )}

          {section === "profile" && (
            <div className="rounded-2xl border border-white/8 bg-white/5 p-5">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-xl font-bold text-white shadow-lg">
                  E
                </div>
                <div>
                  <p className="text-lg font-bold text-white">Explorer</p>
                  <p className="text-sm text-white/50">explorer@vista.os</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-xl bg-white/5 p-3">
                  <p className="text-lg font-bold text-white">42</p>
                  <p className="text-[10px] text-white/50">Apps</p>
                </div>
                <div className="rounded-xl bg-white/5 p-3">
                  <p className="text-lg font-bold text-white">128h</p>
                  <p className="text-[10px] text-white/50">In VR</p>
                </div>
                <div className="rounded-xl bg-white/5 p-3">
                  <p className="text-lg font-bold text-white">7</p>
                  <p className="text-[10px] text-white/50">Friends</p>
                </div>
              </div>
              <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-rose-400/30 bg-rose-500/10 py-2.5 text-sm font-medium text-rose-300 transition hover:bg-rose-500/20">
                <Power size={15} /> Sign Out
              </button>
            </div>
          )}

          {/* Mobile section selector */}
          <div className="flex gap-1.5 overflow-x-auto sm:hidden">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => setSection(s.id)}
                className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs ${section === s.id ? "bg-sky-500 text-white" : "bg-white/5 text-white/60"}`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Panel>
  );
}
