<script setup lang="ts">
export interface VTableProps {
  size?: "sm" | "md" | "lg";
  hover?: boolean;
  stickyHeader?: boolean;
}

const {
  size = "sm",
  hover = false,
  stickyHeader = false
} = defineProps<VTableProps>();

provide("v-table-props", {
  size,
  hover,
  stickyHeader
});

const tableClass = computed(() => {
  const base = "w-full whitespace-nowrap";
  const sizeClass = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg"
  }[size];

  return `${base} ${sizeClass}`;
});
</script>

<template>
  <div class="overflow-auto relative">
    <table border="collapse" :class="tableClass" v-bind="$attrs">
      <slot />
    </table>
  </div>
</template>
