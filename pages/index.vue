<template>
  <div class="w-full h-screen flex flex-col justify-center items-center gap-6">
    <h1 class="font-bold text-xl">Demo</h1>
    <UButton @click="callToNative">Call To Native</UButton>
    <div>
      <h2>Reference</h2>
      <ul class="pl-10 list-disc">
        <li>
          <a
            href="https://github.com/Lision/WKWebViewJavascriptBridge"
            target="_blank"
            class="underline decoration-solid"
          >
            Swift: Lision/WKWebViewJavascriptBridge
          </a>
        </li>
        <li>
          <a
            href="https://github.com/RDSunhy/WebViewJavascriptBridge"
            target="_blank"
            class="underline decoration-solid"
          >
            Kotlin: RDSunhy/WebViewJavascriptBridge
          </a>
        </li>
        <li>
          <a
            href="https://github.com/SethyRung/DemoAndroidBridgeKotlin"
            target="_blank"
            class="underline decoration-solid"
          >
            Demo Android Bridge (Kotlin)
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { $setupBridge } = useNuxtApp();
const toast = useToast();

if (import.meta.client) {
  $setupBridge((bridge) => {
    bridge.registerHandler("jsHandler", function (data, responseCallback) {
      console.log("native data:", data);
      toast.add({ title: "native data:", description: JSON.stringify(data) });
      responseCallback({
        msg: "I have received your data",
      });
    });
  });
}

const callToNative = () => {
  $setupBridge((bridge) => {
    bridge.callHandler("nativeHandler", { key1: "value1" }, (responseData) => {
      console.log("JS received response:", responseData);
      toast.add({
        title: "JS received response:",
        description: JSON.stringify(responseData),
      });
    });
  });
  if (!window.WKWebViewJavascriptBridge)
    toast.add({
      icon: "i-heroicons-exclamation-circle-16-solid",
      color: "red",
      title: "This button only works in the native app (WebView).",
    });
};
</script>
