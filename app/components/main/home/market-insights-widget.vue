<script setup lang="ts">
const widget = useTemplateRef("widget");

onMounted(() => {
  if (import.meta.client) {
    if (!widget.value) return;

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.async = true;
    script.defer = true;
    script.innerHTML = JSON.stringify({
      allow_symbol_change: true,
      calendar: false,
      details: false,
      hide_side_toolbar: true,
      hide_top_toolbar: false,
      hide_legend: false,
      hide_volume: false,
      hotlist: false,
      interval: "D",
      locale: "en",
      save_image: true,
      style: "1",
      symbol: "BITSTAMP:BTCUSD",
      theme: "light",
      timezone: "Etc/UTC",
      backgroundColor: "#ffffff",
      gridColor: "rgba(46, 46, 46, 0.06)",
      watchlist: [],
      withdateranges: false,
      compareSymbols: [],
      studies: [],
      autosize: true,
    });

    widget.value.appendChild(script);
  }
});
</script>

<template>
  <div>
    <div
      class="tradingview-widget-container"
      style="height: 550px; width: 100%"
    >
      <div
        ref="widget"
        class="tradingview-widget-container__widget"
        style="height: calc(100% - 32px); width: 100%"
      />

      <div class="tradingview-widget-copyright">
        <a
          href="https://www.tradingview.com/"
          rel="noopener nofollow"
          target="_blank"
        >
          <span class="blue-text">Track all markets on TradingView</span>
        </a>
      </div>
    </div>
  </div>
</template>
