import type { Bridge } from "~/types/Bridge";

export default defineNuxtPlugin((nuxtApp) => {
  const setupIosBridge = (callback: any) => {
    if (window.WKWebViewJavascriptBridge) {
      return callback(window.WKWebViewJavascriptBridge);
    }
    if (window.WKWVJBCallbacks) return window.WKWVJBCallbacks.push(callback);
    window.WKWVJBCallbacks = [callback];
    window.webkit?.messageHandlers?.iOS_Native_InjectJavascript?.postMessage(
      null,
    );
  };

  const setupAndroidBridge = (callback: any) => {
    if (window.WKWebViewJavascriptBridge) {
      return callback(window.WKWebViewJavascriptBridge);
    }
    if (window.WKWVJBCallbacks) {
      window.WKWVJBCallbacks.push(callback);
    } else {
      window.WKWVJBCallbacks = [callback];
    }
    window.InjectJavascript?.init();
  };

  const setupBridge = (callback: (bridge: Bridge) => void) => {
    const device = useDevice();
    if (device.isIos) setupIosBridge(callback);
    else if (device.isAndroid) setupAndroidBridge(callback);
  };

  nuxtApp.provide("setupBridge", setupBridge);
});

declare global {
  interface Window {
    webkit: any;
    InjectJavascript: any;
    WKWebViewJavascriptBridge: any;
    WKWVJBCallbacks: any;
  }
}
