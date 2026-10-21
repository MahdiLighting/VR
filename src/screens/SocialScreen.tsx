import { MessageCircle, Video, Users, Circle, Plus, Phone } from "lucide-react";
import Panel from "@/components/Panel";
import { friends } from "@/data/vrContent";

const statusColor: Record<string, string> = {
  online: "#34d399",
  "in-app": "#38bdf8",
  away: "#f59e0b",
  offline: "#64748b",
};

const statusLabel: Record<string, string> = {
  online: "Online",
  "in-app": "In an experience",
  away: "Away",
  offline: "Offline",
};

export default function SocialScreen() {
  const active = friends.filter((f) => f.status !== "offline");
  const offline = friends.filter((f) => f.status === "offline");

  return (
    <Panel title="Social" width="max-w-3xl">
      {/* Active friends */}
      <div className="mb-5">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-medium text-white/70">
            Active · <span className="text-white/40">{active.length}</span>
          </p>
          <button className="flex items-center gap-1.5 rounded-full bg-sky-500/20 px-3 py-1 text-xs font-medium text-sky-300 transition hover:bg-sky-500/30">
            <Plus size={12} /> Invite
          </button>
        </div>
        <div className="space-y-2">
          {active.map((f) => (
            <div
              key={f.id}
              className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 transition hover:bg-white/10"
            >
              <div className="relative">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{ background: `linear-gradient(135deg, ${f.color}, ${f.color}88)` }}
                >
                  {f.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <Circle
                  size={10}
                  className="absolute bottom-0 right-0 fill-current"
                  style={{ color: statusColor[f.status] }}
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">{f.name}</p>
                <p className="text-xs text-white/50">
                  {f.activity ?? statusLabel[f.status]}
                </p>
              </div>
              <div className="flex items-center gap-1.5 opacity-0 transition group-hover:opacity-100">
                <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white/80 transition hover:bg-sky-500 hover:text-white" title="Message">
                  <MessageCircle size={14} />
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white/80 transition hover:bg-emerald-500 hover:text-white" title="Join voice">
                  <Phone size={14} />
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white/80 transition hover:bg-violet-500 hover:text-white" title="Join in VR">
                  <Video size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Party */}
      <div className="mb-5 rounded-2xl border border-violet-400/20 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 p-4">
        <div className="flex items-center gap-2">
          <Users size={16} className="text-violet-300" />
          <p className="text-sm font-semibold text-white">Start a Party</p>
        </div>
        <p className="mt-1 text-xs text-white/60">
          Invite up to 8 friends into a shared VR space. Watch, play, or just hang out together.
        </p>
        <button className="mt-3 rounded-xl bg-violet-500 px-4 py-2 text-xs font-semibold text-white transition hover:bg-violet-400">
          Create Party
        </button>
      </div>

      {/* Offline */}
      <div>
        <p className="mb-2 text-sm font-medium text-white/50">Offline · {offline.length}</p>
        <div className="space-y-1.5">
          {offline.map((f) => (
            <div key={f.id} className="flex items-center gap-3 rounded-xl px-3 py-2 opacity-50">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white"
                style={{ background: `linear-gradient(135deg, ${f.color}, ${f.color}88)` }}
              >
                {f.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <p className="text-sm text-white/70">{f.name}</p>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}
