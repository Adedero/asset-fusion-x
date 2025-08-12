<script setup lang="ts">
import { useLocalStorage, useToggle } from "@vueuse/core";

const openSm = useLocalStorage<boolean>("sidebar-sm", false);
const openLarge = useLocalStorage<boolean>("sidebar-lg", false);
const toggle = useToggle(openLarge);

function handleWindowResize(event: Event) {
  event.preventDefault();
  openSm.value = false;
}

onMounted(() => {
  window.addEventListener("resize", handleWindowResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleWindowResize);
});
</script>

<template>
  <div class="h-screen w-screen flex relative min-w-0">
    <!-- Slideover for small screens -->
    <div>
      <NuxtSlideover
        v-model:open="openSm"
        side="left"
        :ui="{ content: 'w-80' }"
      >
        <template #header>
          <slot name="header" />
        </template>

        <template #body>
          <slot name="content" />
        </template>

        <template #footer>
          <slot name="footer" />
        </template>
      </NuxtSlideover>
    </div>

    <ClientOnly>
      <aside
        class="hidden overflow-hidden lg:flex lg:flex-col overlay flex-shrink-0 h-screen border-r border-r-default bg-muted/50 transition-[width] duration-200"
        :class="{
          'w-[19rem] *:opacity-100': openLarge,
          'w-0 *:opacity-0': !openLarge,
        }"
      >
        <header class="gap-1.5 p-4 sm:px-6 min-h-16">
          <slot name="header" />
        </header>

        <div class="flex-shrink-o flex-grow overflow-y-auto p-4 sm:px-6">
          <slot name="content" />
        </div>

        <footer class="flex items-center gap-1.5 p-4 sm:px-6 min-h-16">
          <slot name="footer" />
        </footer>
      </aside>
    </ClientOnly>

    <div class="flex-grow h-screen grid grid-rows-[repeat(14,minmax(0,1fr))]">
      <header
        class="flex items-center gap-4 border-b border-b-default px-4 py-3 rows-span-1"
      >
        <div class="w-fit">
          <NuxtButton
            size="sm"
            color="neutral"
            icon="lucide-panel-left"
            variant="ghost"
            class="lg:hidden"
            @click="openSm = true"
          />

          <NuxtButton
            size="sm"
            color="neutral"
            icon="lucide-panel-left"
            variant="ghost"
            class="hidden lg:flex"
            @click="toggle()"
          />
        </div>

        <div class="flex-shrink-o flex-grow">
          <slot name="body-header" />
        </div>
      </header>

      <section class="row-span-13 p-4 overflow-y-auto">
        <slot name="body" />
      </section>
    </div>
  </div>
</template>
