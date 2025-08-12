<script setup lang="ts">
import { useWindowScroll } from "@vueuse/core";
import mainLinks from "~/data/main/main-links";

const config = useRuntimeConfig();

const targetScrollHeight = 150;

const { y } = useWindowScroll();

const classes = computed(() => {
  if (y.value >= targetScrollHeight) {
    return {
      header: "bg-slate-700/40 backdrop-blur-xl border border-slate-200/30",
      wrapper: "gap-x-12",
    };
  } else {
    return {
      header: "bg-slate-800 backdrop-blur-none border border-transparent",
      wrapper: "gap-x-40",
    };
  }
});
</script>

<template>
  <div class="p-3 grid place-content-center">
    <div
      :class="classes.header"
      class="duration-200 ease-linear transition-all p-2 rounded-full w-fit"
    >
      <div
        :class="classes.wrapper"
        class="w-full h-9 flex items-center justify-between transition-all duration-200"
      >
        <NuxtLink to="/">
          <div class="flex items-center gap-2">
            <AppLogo size="24" />
            <p class="font-bold">{{ config.public.appName }}</p>
          </div>
        </NuxtLink>

        <div class="flex items-center gap-4">
          <NuxtNavigationMenu :items="mainLinks" :ui="{ root: 'gap-1' }" />

          <NuxtButton
            size="lg"
            icon="lucide:trending-up"
            to="/sign-up"
            label="Get An Advisor"
            class="shrink-0 rounded-full text-white"
          />
        </div>
      </div>
    </div>
  </div>
</template>
