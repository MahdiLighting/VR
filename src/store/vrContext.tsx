import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { VRState, ScreenId } from "@/types";
import { environments, type EnvironmentId } from "@/data/vrContent";

interface VRContextValue extends VRState {
  setScreen: (s: ScreenId) => void;
  toggleDock: () => void;
  setDockOpen: (v: boolean) => void;
  toggleQuickSettings: () => void;
  setEnvironment: (e: EnvironmentId) => void;
  setVolume: (v: number) => void;
  setBrightness: (v: number) => void;
  toggleWifi: () => void;
  toggleBluetooth: () => void;
  togglePassthrough: () => void;
  toggleComfort: () => void;
}

const VRContext = createContext<VRContextValue | null>(null);

export function VRProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<VRState>({
    currentScreen: "home",
    environment: "mountains",
    dockOpen: true,
    quickSettingsOpen: false,
    vrMode: false,
    volume: 65,
    brightness: 80,
    wifi: true,
    bluetooth: true,
    passthrough: false,
    comfortMode: false,
  });

  const setScreen = useCallback((s: ScreenId) => setState((p) => ({ ...p, currentScreen: s, dockOpen: false })), []);
  const toggleDock = useCallback(() => setState((p) => ({ ...p, dockOpen: !p.dockOpen })), []);
  const setDockOpen = useCallback((v: boolean) => setState((p) => ({ ...p, dockOpen: v })), []);
  const toggleQuickSettings = useCallback(() => setState((p) => ({ ...p, quickSettingsOpen: !p.quickSettingsOpen })), []);
  const setEnvironment = useCallback((e: EnvironmentId) => setState((p) => ({ ...p, environment: e })), []);
  const setVolume = useCallback((v: number) => setState((p) => ({ ...p, volume: v })), []);
  const setBrightness = useCallback((v: number) => setState((p) => ({ ...p, brightness: v })), []);
  const toggleWifi = useCallback(() => setState((p) => ({ ...p, wifi: !p.wifi })), []);
  const toggleBluetooth = useCallback(() => setState((p) => ({ ...p, bluetooth: !p.bluetooth })), []);
  const togglePassthrough = useCallback(() => setState((p) => ({ ...p, passthrough: !p.passthrough })), []);
  const toggleComfort = useCallback(() => setState((p) => ({ ...p, comfortMode: !p.comfortMode })), []);

  const value: VRContextValue = {
    ...state,
    setScreen,
    toggleDock,
    setDockOpen,
    toggleQuickSettings,
    setEnvironment,
    setVolume,
    setBrightness,
    toggleWifi,
    toggleBluetooth,
    togglePassthrough,
    toggleComfort,
  };

  return <VRContext.Provider value={value}>{children}</VRContext.Provider>;
}

export function useVR() {
  const ctx = useContext(VRContext);
  if (!ctx) throw new Error("useVR must be used within VRProvider");
  return ctx;
}


