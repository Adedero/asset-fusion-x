<script setup lang="ts">
const widget = useTemplateRef("widget");

onMounted(() => {
  if (import.meta.client) {
    if (!widget.value) return;

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-screener.js";
    script.async = true;
    script.defer = true;
    script.innerHTML = JSON.stringify({
      defaultColumn: "overview",
      screener_type: "crypto_mkt",
      displayCurrency: "USD",
      colorTheme: "light",
      isTransparent: false,
      locale: "en",
      width: "100%",
      height: 500,
    });

    widget.value.appendChild(script);
  }
});
</script>

<template>
  <div>
    <div class="tradingview-widget-container">
      <div ref="widget" class="tradingview-widget-container__widget" />
      <div class="tradingview-widget-copyright">
        <a
          href="https://www.tradingview.com/"
          rel="noopener nofollow"
          target="_blank"
          ><span class="blue-text">Track all markets on TradingView</span></a
        >
      </div>
    </div>
  </div>
</template>
