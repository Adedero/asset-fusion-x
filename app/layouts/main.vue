<script setup lang="ts">
import { useSessionStorage } from "@vueuse/core";
import { LoaderInitial, LoaderRouter } from "#components";

useHead({
  meta: [{ name: "viewport", content: "" }],
  htmlAttrs: { class: "dark" },
});

const nuxtApp = useNuxtApp();

const hasSeenLoader = useSessionStorage("seen-loader", false);
const Loader = computed(() => {
  return hasSeenLoader.value ? LoaderRouter : LoaderInitial;
});

const loading = ref(true);

nuxtApp.hook("page:start", () => {
  loading.value = true;
});

nuxtApp.hook("page:finish", () => {
  setTimeout(() => {
    loading.value = false;
    hasSeenLoader.value = true;
  }, 2000);
});

</script>

<template>
  <main>
    <component :is="Loader" v-if="loading" />

    <header class="sticky top-0 z-50">
      <MainHeader />
    </header>

    <NuxtPage />

    <footer>
      <MainFooter />
    </footer>
  </main>
</template>
