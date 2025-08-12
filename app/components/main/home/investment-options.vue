<script setup lang="ts">
import investmentOptions from "~/data/main/investment-options";
</script>

<template>
  <div class="px-12 pt-4 pb-12 grid grid-cols-5 items-center gap-5">
    <div class="gap-5 col-span-3 overflow-y-hidden">
      <div class="grid grid-cols-2 items-center gap-2 w-full">
        <div
          v-for="option in investmentOptions"
          :key="option.name"
          class="p-4 bg-slate-800/50 border border-slate-700 bg-gradient-t-b from-primary/50 rounded-xl"
        >
          <header class="flex items-center gap-2">
            <div
              class="w-8 h-8 border border-tertiary-500/50 bg-gradient-to-b from-primary-500/40 rounded-lg grid place-content-center"
            >
              <NuxtIcon :name="option.icon" />
            </div>
            <p class="font-semibold">{{ option.name }}</p>
          </header>

          <div class="mt-2 text-sm">
            <p class="truncate">{{ option.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="pt-4 pb-12 col-span-2">
      <div class="text-5xl">
        <h2>Investment Options</h2>
      </div>

      <div class="mt-6">
        <p class="text-slate-300">
          Browse our carefully designed investment tracks. Choose what fits your
          goals — from low-risk growth to aggressive returns — and let us do the
          rest.
        </p>
      </div>

      <div class="mt-6">
        <NuxtImg
          src="/img/investment.gif"
          placeholder
          class="rounded-xl h-48 object-cover"
        />
      </div>
    </div>
  </div>
</template>
