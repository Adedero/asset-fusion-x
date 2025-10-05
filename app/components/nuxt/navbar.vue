<script setup lang="ts">
interface Props {
  items: NavbarItem[];
  variant?: "block" | "underline";
}

const { items, variant = "block" } = defineProps<Props>();
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
      v-if="variant === 'block'"
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

    <div
      v-else-if="variant === 'underline'"
      class="w-full border-b border-b-default flex gap-x-2 overflow-x-auto"
    >
      <NuxtLink
        v-for="item in items"
        :key="item.label"
        :to="item.default ? $route.fullPath : item.to"
        class="text-sm text-muted hover:text-default hover:bg-muted px-3 py-2 rounded-md border-b-2 border-transparent whitespace-nowrap transition-colors min-w-0"
        exact-active-class="border-b-primary text-primary-500 rounded-none"
      >
        {{ item.label }}
      </NuxtLink>
    </div>
  </div>
</template>
