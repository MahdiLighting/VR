import type { EnvironmentId } from "@/data/vrContent";

export type ScreenId = "home" | "library" | "store" | "browser" | "social" | "settings";

export interface VRState {
  currentScreen: ScreenId;
  environment: EnvironmentId;
  dockOpen: boolean;
  quickSettingsOpen: boolean;
  vrMode: boolean;
  volume: number;
  brightness: number;
  wifi: boolean;
  bluetooth: boolean;
  passthrough: boolean;
  comfortMode: boolean;
}
