import "@nuxt/types";
import type { Bridge } from "./Bridge";

declare module "#app" {
  interface NuxtApp {
    $setupBridge: (callback: (bridge: Bridge) => void) => void;
  }
}

declare module "#vue" {
  interface ComponentCustomProperties {
    $setupBridge: (callback: (bridge: Bridge) => void) => void;
  }
}
