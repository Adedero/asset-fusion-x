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
      label: "Documents",
    },
  ] as BreadcrumbItem[],
});
</script>

<template>
  <div class="grid gap-4 grid-cols-[repeat(auto-fit,minmax(20rem,1fr))]">
    <div v-for="i in 5" :key="i">
      <NuxtCard>
        <div class="space-y-1">
          <p class="card-title">Government ID</p>

          <div>
            <div class="flex items-center gap-2">
              <div>
                <img src="/img/icons/pdf.svg" alt="document" width="28" />
              </div>

              <p class="text-sm font-medium">7233445454353535.pdf</p>
            </div>
          </div>

          <div class="flex items-center gap-2 justify-end">
            <NuxtButton
              size="sm"
              label="Download"
              color="neutral"
              variant="outline"
              icon="i-lucide-download"
            />
          </div>
        </div>
      </NuxtCard>
    </div>
  </div>
</template>
