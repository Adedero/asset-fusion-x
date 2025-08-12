<script setup lang="ts">
interface Props {
  items: NavbarItem[];
}

const { items } = defineProps<Props>();
</script>

<script lang="ts">
export interface NavbarItem {
  label: string;
  default?: boolean;
  to?: string;
}
</script>

<template>
  <div>
    <div
      class="p-1.5 w-fit bg-elevated/70 rounded-md flex flex-wrap items-center gap-x-2 gap-y-1"
    >
      <NuxtLink
        v-for="item in items"
        :key="item.label"
        :to="item.default ? $route.fullPath : item.to"
        class="px-2 py-1.5 rounded-md text-sm font-semibold text-muted/70 transition-colors min-w-0"
        exact-active-class="bg-default shadow-sm text-muted!"
      >
        {{ item.label }}
      </NuxtLink>
    </div>
  </div>
</template>
