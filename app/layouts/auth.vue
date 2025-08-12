<script setup lang="ts">
import { NuxtCard } from "#components";
import ColorModeToggler from "~/components/color-mode-toggler.vue";

const runtimeConfig = useRuntimeConfig();
</script>

<template>
  <div>
    <NuxtLoadingIndicator />
    <div class="min-h-[calc(100dvh-5rem)] flex-center">
      <div class="w-full max-w-96 my-20">
        <NuxtCard>
          <template #header>
            <NuxtCard
              class="w-fit"
              variant="subtle"
              :ui="{ body: 'p-2.5 sm:p-2.5' }"
            >
              <AppLogo size="32" />
            </NuxtCard>
          </template>
          <div>
            <NuxtPage />
          </div>
        </NuxtCard>
      </div>
    </div>

    <footer>
      <NuxtSeparator class="my-5" />
      <div class="flex items-center gap-1 justify-between flex-wrap px-5 pb-5">
        <div class="flex items-center gap-1">
          <div class="flex items-center gap-2">
            <AppLogo size="24" />
            <p class="font-semibold">{{ runtimeConfig.public.appName }}</p>
          </div>
          <p>
            &copy; {{ runtimeConfig.public.appCopyrightYear }}. All rights
            reserved
          </p>
        </div>

        <div class="flex items-center justify-end gap-4 text-sm">
          <p class="text-primary hover:underline">Privacy Policy</p>
          <p class="text-primary hover:underline">Terms of Use</p>
          <ColorModeToggler />
        </div>
      </div>
    </footer>
  </div>
</template>
