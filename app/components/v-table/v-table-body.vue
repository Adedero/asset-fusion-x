<script setup lang="ts">
import type { VTableProps } from "./v-table.vue";

const props = inject<VTableProps>("v-table-props");

onMounted(() => {
  if (!props) {
    throw new Error("v-table-body must be used within a v-table");
  }
});
</script>

<template>
  <tbody
    v-if="props"
    :class="[
      '[&_td]:py-4 [&_td]:px-4',
      'divide-y divide-default',
      'text-muted',
      props.hover ? '[&_tr:hover]:bg-muted [&_tr]:cursor-pointer' : ''
    ]"
  >
    <slot />
  </tbody>
</template>
