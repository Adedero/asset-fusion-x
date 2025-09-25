<script setup lang="ts">
import type { VTableProps } from "./v-table.vue";

const props = inject<VTableProps>("v-table-props");

onMounted(() => {
  if (!props) {
    throw new Error("v-table-header must be used within a v-table");
  }
});
</script>

<template>
  <template v-if="props?.loading && props?.loaderType === 'carousel'">
    <div class="absolute top-0 left-0 w-full h-full z-10">
      <div class="w-full mt-[3.25rem] h-[2.5px] bg-primary-100 overflow-hidden">
        <div class="h-full bg-primary-500 animate-carousel" />
      </div>
    </div>
  </template>

  <template v-if="props?.loading && props?.loaderType === 'spinner'">
    <div
      class="absolute top-0 left-0 w-full h-full z-10 bg-muted/10 backdrop-blur-xs flex-center"
    >
      <NuxtIcon
        name="lucide:loader-2"
        size="3rem"
        class="animate-spin text-primary"
      />
    </div>
    <!-- put your spinner here -->
  </template>
</template>

<style scoped>
@keyframes carousel {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.animate-carousel {
  animation: carousel 1.5s linear infinite;
}
</style>
