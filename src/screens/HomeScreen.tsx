import { Play, Clock, Star, Sparkles, ArrowRight } from "lucide-react";
import Panel from "@/components/Panel";
import { useVR } from "@/store/vrContext";
import { apps, environments } from "@/data/vrContent";

export default function HomeScreen() {
  const { setScreen, setEnvironment, environment } = useVR();
  const recent = apps.filter((a) => a.lastOpened).slice(0, 4);
  const currentEnv = environments.find((e) => e.id === environment)!;

  return (
    <Panel title="Home" width="max-w-4xl">
      {/* Greeting */}
      <div className="mb-6 rounded-2xl border border-white/10 bg-gradient-to-r from-sky-500/10 to-indigo-500/10 p-5">
        <div className="flex items-center gap-2 text-sky-300">
          <Sparkles size={16} />
          <span className="text-xs font-medium uppercase tracking-wider">Welcome back</span>
        </div>
        <h3 className="mt-1 text-2xl font-bold text-white">Good to see you, Explorer</h3>
        <p className="mt-1 text-sm text-white/60">
          You're in <span className="text-white/90">{currentEnv.name}</span>. Pick up where you left off or discover
          something new.
        </p>
      </div>

      {/* Continue */}
      <div className="mb-6">
        <div className="mb-3 flex items-center gap-2 text-sm font-medium text-white/70">
          <Clock size={15} /> Continue
        </div>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {recent.map((app) => (
            <button
              key={app.id}
              className="group relative overflow-hidden rounded-2xl border border-white/10 text-left transition hover:border-white/25 hover:scale-[1.03]"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={app.image}
                  alt={app.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-sm font-semibold text-white">{app.name}</p>
                <p className="text-[10px] text-white/60">{app.lastOpened}</p>
              </div>
              <div className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 opacity-0 backdrop-blur-md transition group-hover:opacity-100">
                <Play size={14} className="text-white" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
        <button
          onClick={() => setScreen("library")}
          className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 text-left transition hover:bg-white/10"
        >
          <div>
            <p className="text-sm font-semibold text-white">Your Library</p>
            <p className="text-xs text-white/50">{apps.length} experiences</p>
          </div>
          <ArrowRight size={18} className="text-white/40 transition group-hover:translate-x-1 group-hover:text-white" />
        </button>
        <button
          onClick={() => setScreen("store")}
          className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 text-left transition hover:bg-white/10"
        >
          <div>
            <p className="text-sm font-semibold text-white">Browse Store</p>
            <p className="text-xs text-white/50">New arrivals</p>
          </div>
          <ArrowRight size={18} className="text-white/40 transition group-hover:translate-x-1 group-hover:text-white" />
        </button>
        <button
          onClick={() => setScreen("social")}
          className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 text-left transition hover:bg-white/10"
        >
          <div>
            <p className="text-sm font-semibold text-white">Friends Online</p>
            <p className="text-xs text-white/50">3 active now</p>
          </div>
          <ArrowRight size={18} className="text-white/40 transition group-hover:translate-x-1 group-hover:text-white" />
        </button>
      </div>

      {/* Environment switcher */}
      <div className="mt-6">
        <div className="mb-3 flex items-center gap-2 text-sm font-medium text-white/70">
          <Star size={15} /> Your Environment
        </div>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {environments.map((env) => (
            <button
              key={env.id}
              onClick={() => setEnvironment(env.id)}
              className={`group relative overflow-hidden rounded-2xl border transition ${
                environment === env.id ? "border-sky-400 ring-2 ring-sky-400/40" : "border-white/10 hover:border-white/25"
              }`}
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={env.sky}
                  alt={env.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-2.5">
                <p className="text-xs font-semibold text-white">{env.name}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </Panel>
  );
}
