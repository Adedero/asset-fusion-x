<script setup lang="ts">
import type { BreadcrumbItem } from "@nuxt/ui";
import type { NavbarItem } from "~/components/nuxt/navbar.vue";

definePageMeta({
  layout: "user",
  breadcrumb: [
    {
      label: "Accounts",
    },
  ] as BreadcrumbItem[],
});

const items: NavbarItem[] = [
  {
    label: "Accounts",
    to: "/user/accounts",
  },
  {
    label: "Requests",
    to: "/user/accounts/join-requests",
  },
];
</script>

<template>
  <div>
    <h1 class="text-4xl font-semibold">Accounts</h1>

    <div class="my-4">
      <NuxtNavbar :items />
    </div>

    <div class="lg:p-0.5">
      <NuxtPage />
    </div>
  </div>
</template>
