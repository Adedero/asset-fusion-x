<script setup lang="ts">
import type { NavbarItem } from "~/components/nuxt/navbar.vue";
import { useAuthStore } from "~/stores/auth.store";

const authStore = useAuthStore();

const items = ref<NavbarItem[]>([
  { label: "Overview", to: "/user/profile" },
  { label: "KYC", to: "/user/profile/kyc" },
]);
</script>

<template>
  <div class="h-full space-y-4">
    <header>
      <h1 class="text-4xl font-semibold">
        Hi, {{ authStore.user.value?.name.split(" ")[0] }}
      </h1>
    </header>

    <nav>
      <NuxtNavbar :items />
    </nav>

    <div>
      <NuxtPage />
    </div>
  </div>
</template>
