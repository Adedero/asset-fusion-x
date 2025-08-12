<script setup lang="ts">
import reasons from "~/data/why-choose-us-reasons";

const { appName } = useRuntimeConfig().public;
</script>

<template>
  <div class="px-12 pt-4 pb-12">
    <div class="text-5xl">
      <h2>Why choose</h2>
      <h2 class="text-tertiary-500">{{ appName }}?</h2>
    </div>

    <div class="mt-6 grid grid-cols-3 gap-5">
      <div class="col-span-2">
        <p class="text-slate-300 w-[80%]">
          {{ appName }} gives you control over where your money goes — and then
          takes care of everything else. No market stress, no trading screens,
          just solid results.
        </p>

        <div class="mt-4">
          <div class="bg-slate-700 rounded-xl overflow-hidden">
            <!-- Video -->
            <video
              src="/vid/animation-02.mp4"
              autoplay
              muted
              loop
              class="w-full h-[28rem] object-cover"
            >
              Your browser does not support the video tag
            </video>
          </div>
        </div>
      </div>

      <div class="col-span-1 grid gap-4">
        <div
          v-for="reason in reasons"
          :key="reason.label"
          class="border border-slate-300/20 bg-slate-700/30 backdrop-blur-lg p-4 rounded-xl"
        >
          <header class="flex items-center gap-2">
            <div
              class="bg-slate-700 rounded-lg p-2 w-8 h-8 grid place-content-center"
            >
              <NuxtIcon :name="reason.icon" />
            </div>
            <p class="font-semibold">{{ reason.label }}</p>
          </header>

          <div class="text-sm mt-2 text-slate-300">
            {{ reason.description }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
