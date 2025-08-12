<script setup lang="ts">
import partners from "~/data/main/partners";
</script>

<template>
  <div class="my-16 py-8 bg-white">
    <NuxtMarquee auto-fill pause-on-hover>
      <div
        v-for="partner in partners"
        :key="partner.name"
        class="flex items-center gap-2 brightness-150 transition-transform saturate-0 hover:saturate-100 hover:scale-110 hover:brightness-100 mx-10"
      >
        <NuxtImg :src="partner.image" :alt="partner.name" width="100" />
      </div>
    </NuxtMarquee>
  </div>
</template>
