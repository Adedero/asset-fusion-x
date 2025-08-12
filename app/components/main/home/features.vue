<script setup lang="ts">
import features from "~/data/main/features";
</script>

<template>
  <div class="px-12 pt-4 pb-12">
    <div class="text-5xl">
      <h2>Advanced Trading</h2>
      <h2 class="text-tertiary-500">Features & Tools</h2>
    </div>

    <div class="mt-8 grid grid-cols-2 gap-5">
      <div>
        <ul class="grid gap-6">
          <li v-for="feature in features" :key="feature.label">
            <div class="flex items-center gap-4">
              <div>
                <NuxtIcon :name="feature.icon" />
              </div>

              <div>
                <p class="font-semibold">{{ feature.label }}</p>
                <p class="text-slate-300 text-sm">{{ feature.description }}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="rounded-xl bg-slate-800 p-2 grid grid-cols-2 gap-2">
        <div
          class="cursor-context-menu col-span-1 bg-slate-700/30 p-4 rounded-xl"
        >
          <h4>My Sales</h4>
          <div class="mt-3 space-y-1">
            <p class="text-sm text-slate-300">Investment Gain</p>
            <p class="text-3xl font-semibold">$2,491.34</p>
          </div>
        </div>

        <div
          class="cursor-context-menu col-span-1 bg-slate-700/30 p-4 rounded-xl grid"
        >
          <header class="flex items-center gap-4 justify-between">
            <p class="text-slate-300">Profile</p>
            <div class="flex items-center gap-2">
              <p class="font-medium">98e3...6eb4</p>
              <NuxtIcon name="lucide:copy" />
            </div>
          </header>
          <div class="mt-3 flex items-end gap-2 justify-between">
            <div
              class="aspect-square p-2 border border-tertiary/20 bg-gradient-to-b from-primary-500/30 overflow-hidden rounded-full"
            >
              <AppLogo size="28" />
            </div>
            <button
              class="flex items-center gap-2 bg-primary rounded-full px-5 py-2"
            >
              <NuxtIcon name="lucide:circle-arrow-right" />
              <p>AssetFusionX</p>
            </button>
          </div>
        </div>

        <div class="cursor-context-menu col-span-2 bg-slate-700/30 rounded-xl">
          <video
            autoplay
            muted
            loop
            src="/vid/animation-01.mp4"
            class="w-full h-60 object-cover rounded-xl"
          >
            Your browser does not support the video tag
          </video>
        </div>
      </div>
    </div>
  </div>
</template>
