<script setup lang="ts">
import customers from "~/data/main/customers";

const { appName } = useRuntimeConfig().public;
</script>

<template>
  <div class="px-12 pt-4 pb-12">
    <div class="text-5xl w-fit space-y-2">
      <h2>Who We Serve</h2>
      <div class="h-0.5 rounded-full w-[80%] bg-tertiary" />
    </div>

    <div class="mt-6">
      <p class="text-base text-slate-300 w-1/2">
        Whether you're planning ahead, growing your wealth, or diversifying your
        portfolio, {{ appName }} makes investing accessible and effective.
      </p>

      <div class="mt-6 grid grid-cols-5 gap-5 place-content-center">
        <div
          v-for="customer in customers"
          :key="customer.label"
          class="bg-slate-700 rounded-xl overflow-hidden flex h-96 group relative"
        >
          <div
            class="absolute z-10 bottom-2.5 left-1/2 -translate-x-1/2 p-4 w-[90%] bg-slate-800/40 border border-white/20 backdrop-blur-md rounded-xl transition-all duration-300 opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 cursor-context-menu"
          >
            <p class="font-semibold text-sm">{{ customer.label }}</p>
            <p class="text-slate-100 text-sm mt-3">
              {{ customer.description }}
            </p>
          </div>

          <div
            class="w-full h-full saturate-0 group-hover:saturate-100 duration-300 transition-all"
          >
            <NuxtImg
              :src="customer.image"
              placeholder
              class="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
