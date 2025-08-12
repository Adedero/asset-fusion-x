<script setup lang="ts">
import type { BreadcrumbItem } from "@nuxt/ui";

const accountId = ref<string>("0021351082");
const accountName = ref<string>("Eli and Lulu");

definePageMeta({
  layout: "user",
  breadcrumb: [
    {
      label: "Accounts",
      to: "/user/accounts",
    },
    {
      label: accountName,
      to: `/user/accounts/${accountId.value}`,
    },
    {
      label: "Transfer",
    },
  ] as BreadcrumbItem[],
});
</script>

<template>
  <div>Transfer</div>
</template>
