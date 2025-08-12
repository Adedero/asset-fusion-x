<script setup lang="ts">
import type { BreadcrumbItem } from "@nuxt/ui";

definePageMeta({
  layout: "user",
  breadcrumb: [
    {
      label: "Get An Advisor",
    },
  ] as BreadcrumbItem[],
});
</script>

<template>
  <div>Contact Page</div>
</template>
