import { Suspense, lazy } from "react";
import { AnimatePresence } from "framer-motion";
import { VRProvider, useVR } from "@/store/vrContext";
import StatusBar from "@/components/StatusBar";
import Dock from "@/components/Dock";
import QuickSettings from "@/components/QuickSettings";
import ModeIndicator, { GazeCursor, Notification } from "@/components/ModeIndicator";
import HomeScreen from "@/screens/HomeScreen";
import LibraryScreen from "@/screens/LibraryScreen";
import StoreScreen from "@/screens/StoreScreen";
import BrowserScreen from "@/screens/BrowserScreen";
import SocialScreen from "@/screens/SocialScreen";
import SettingsScreen from "@/screens/SettingsScreen";

const VRScene = lazy(() => import("@/components/VRScene"));

function ScreenContainer() {
  const { currentScreen } = useVR();

  return (
    <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center px-4 pb-24 pt-20">
      <AnimatePresence mode="wait">
        <div key={currentScreen} className="flex w-full items-center justify-center">
          {currentScreen === "home" && <HomeScreen />}
          {currentScreen === "library" && <LibraryScreen />}
          {currentScreen === "store" && <StoreScreen />}
          {currentScreen === "browser" && <BrowserScreen />}
          {currentScreen === "social" && <SocialScreen />}
          {currentScreen === "settings" && <SettingsScreen />}
        </div>
      </AnimatePresence>
    </div>
  );
}

function VRApp() {
  const { brightness, passthrough, environment } = useVR();

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* 3D environment */}
      <div className="absolute inset-0">
        <Suspense fallback={<div className="h-full w-full bg-slate-950" />}>
          <VRScene environment={environment} />
        </Suspense>
      </div>

      {/* Brightness overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10 bg-black transition-opacity"
        style={{ opacity: (100 - brightness) / 200 }}
      />

      {/* Passthrough tint */}
      {passthrough && <div className="pointer-events-none absolute inset-0 z-10 bg-black/40 backdrop-blur-sm" />}

      {/* UI Layer */}
      <StatusBar />
      <ScreenContainer />
      <Dock />
      <QuickSettings />
      <Notification />
      <ModeIndicator />
      <GazeCursor />
    </div>
  );
}

export default function App() {
  return (
    <VRProvider>
      <VRApp />
    </VRProvider>
  );
}
