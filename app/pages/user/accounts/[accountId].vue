<script setup lang="ts">
import type { BreadcrumbItem } from "@nuxt/ui";
import { getNavList } from "./nav-list";

definePageMeta({
  layout: "user",
  breadcrumb: [
    {
      label: "Accounts",
      to: "/user/accounts",
    },
  ] as BreadcrumbItem[],
});

const accountId = useRouteData().getParams("accountId");

const { data, error, refresh } = await useFetch(
  `/api/user/financial-accounts/${accountId}`,
  {
    key: () => `user-financial-account-${accountId}-pick`,
    pick: ["id", "name", "type", "ownership", "status", "businessProfile"],
  },
);

const accountName = computed(() => data.value?.name ?? "");

provide("currentAccount", {
  accountName: accountName.value,
  refreshAccount: refresh,
});

const items = computed(() => (data.value ? getNavList(data.value) : []));

const open = ref(
  data.value?.type === "business" && !data.value?.businessProfile,
);
</script>

<template>
  <MyPage :error>
    <div v-if="data" class="h-full">
      <header class="flex flex-wrap gap-x-4 gap-y-1">
        <h1 class="text-4xl font-semibold">{{ data.name }}</h1>

        <div class="space-x-2">
          <NuxtBadge variant="soft" :label="data.ownership" />
          <NuxtBadge variant="soft" color="error" :label="data.type" />
          <NuxtBadge
            variant="soft"
            :color="getAccountStatusBadgeColor(data.status)"
            :label="data.status"
          />
        </div>
      </header>

      <nav class="mt-4 mb-6">
        <NuxtNavbar :items />
      </nav>

      <div class="lg:flex-grow lg:overflow-y-auto lg:p-0.5">
        <NuxtPage />
      </div>
    </div>

    <NuxtModal
      v-model:open="open"
      title="Business Account Alert"
      :dismissible="false"
      :close="false"
    >
      <template #body>
        <div class="space-y-4">
          <p>
            You must complete your business account profile in other to make use
            of this business account.
          </p>
          <div class="flex justify-end">
            <NuxtButton
              :to="`/user/accounts/${accountId}/business-profile`"
              label="Proceed"
              @click="open = false"
            />
          </div>
        </div>
      </template>
    </NuxtModal>
  </MyPage>
</template>
