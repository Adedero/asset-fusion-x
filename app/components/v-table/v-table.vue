<script setup lang="ts">
export interface VTableProps {
  size?: "sm" | "md" | "lg";
  hover?: boolean;
  stickyHeader?: boolean;
  loading?: boolean;
  loaderType?: "spinner" | "carousel";
}

const {
  size = "sm",
  hover = false,
  stickyHeader = false,
  loading = false,
  loaderType = "carousel"
} = defineProps<VTableProps>();

provide("v-table-props", {
  size,
  hover,
  stickyHeader,
  loading,
  loaderType
});

const tableClass = computed(() => {
  const base = "w-full whitespace-nowrap relative";
  const sizeClass = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg"
  }[size];

  return `${base} ${sizeClass}`;
});
</script>

<template>
  <div class="relative">
    <VTableLoader />
    <div class="overflow-auto">
      <table border="collapse" :class="tableClass" v-bind="$attrs">
        <slot />
      </table>
    </div>
  </div>
</template>
