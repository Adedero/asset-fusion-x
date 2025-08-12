<script setup lang="ts">
const config = useRuntimeConfig();
</script>

<template>
  <div class="px-16 py-12">
    <div class="grid gap-10 grid-cols-5">
      <div class="col-span-2">
        <p class="text-5xl text-tertiary-500 my-10">Market Insights</p>
        <p class="mt-2">
          The global financial landscape is rapidly evolving, and digital assets
          are at the forefront of this transformation. Stay ahead with real-time
          insights, expert analysis, and the latest trends in cryptocurrency,
          stocks, and alternative investments.
          {{ config.public.appName }} empowers you to make informed decisions in
          a dynamic market environment.
        </p>

        <div class="flex items-center gap-4 mt-10">
          <NuxtButton
            to="/resources/market-insights"
            icon="lucide:lightbulb"
            size="lg"
            label="Learn More"
            class="rounded-full text-white"
          />

          <NuxtButton
            to="/sign-up"
            icon="lucide:user-round-check"
            label="Get An Advisor"
            size="lg"
            variant="link"
          />
        </div>
      </div>

      <div class="col-span-3 bg-muted">
        <!-- TradingView Widget BEGIN -->
        <MainHomeMarketInsightsWidget />
        <!-- TradingView Widget END -->
      </div>
    </div>
  </div>
</template>
