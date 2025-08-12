<script setup lang="ts">
interface Props {
  heading: string;
  subheading: string;
  bgImage: string;
}

defineProps<Props>();
</script>

<template>
  <div class="grid *:[grid-column:1/2] *:[grid-row:1/2]">
    <div class="flex flex-col items-center justify-center z-10">
      <div
        class="max-w-[35rem] text-center p-4 bg-slate-700/30 border border-white/30 backdrop-blur-[5px] rounded-xl">
        <h1 class="text-6xl font-medium">{{ heading }}</h1>

        <div class="mt-5">
          <p>
            {{ subheading }}
          </p>
        </div>
      </div>
    </div>

    <div class="h-96">
      <NuxtImg
        placeholder
        :src="bgImage"
        class="h-full w-full object-cover brightness-50" />
    </div>
  </div>
</template>
