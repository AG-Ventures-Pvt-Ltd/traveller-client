import { useDevice } from "../hooks/useDevice";
import { createContext, useContext } from "react";
import { DeviceInfo } from "../types";

const DeviceContext = createContext<DeviceInfo | null>(null);

export function DeviceProvider({ children }: { children: React.ReactNode }) {
  const device = useDevice();
  return <DeviceContext.Provider value={device}>{children}</DeviceContext.Provider>;
}

export function useDeviceContext() {
  const ctx = useContext(DeviceContext);
  if (!ctx) throw new Error("useDeviceContext must be used within DeviceProvider");
  return ctx;
}