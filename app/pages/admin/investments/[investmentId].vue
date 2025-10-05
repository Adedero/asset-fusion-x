<script setup lang="ts">
definePageMeta({
  layout: "user",
   breadcrumb: [
    {
      label: "Dashboard",
      to: "/admin"
    },
    {
      label: "Investments",
      to: "/admin/investments"
    },
    {
      label: "Investment"
    }
  ]
});

const investmentId = useRouteData().getParams("investmentId")

const items = [
  {
    label: "Overview",
    to: `/admin/investments/${investmentId}`
  },
  {
    label: "Profits",
    to: `/admin/investments/${investmentId}/profits`
  },
  {
    label: "Settings",
    to: `/admin/investments/${investmentId}/settings`
  },
]
</script>

<template>
  <div>
    <header>
      <NuxtNavbar :items variant="underline" />
    </header>

    <div class="pt-5">
      <NuxtPage />
    </div>
  </div>
</template>