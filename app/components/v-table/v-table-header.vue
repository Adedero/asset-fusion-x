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
  <thead
    v-if="props"
    class="relative border-b-2 border-b-default [&_th]:py-4 [&_th]:px-4"
    :class="props.stickyHeader ? 'sticky top-0' : ''"
  >
    <slot />
  </thead>
</template>
