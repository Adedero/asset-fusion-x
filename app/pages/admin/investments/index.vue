<script setup lang="ts">
import { useDateFormat } from "@vueuse/core";

definePageMeta({
  layout: "user",
  breadcrumb: [
    {
      label: "Dashboard",
      to: "/admin"
    },
    {
      label: "Investments"
    }
  ]
});

const page = ref<number>(0);
const limit = ref<number>(10);
const selectedStatus = ref<string>("all");
const selectedCategory = ref<string>("all");
const selectedDistribution = ref<string>("all");

const statuses = ["all", "open", "closed", "paused", "terminated"];
const categories = [
  "all",
  "forex",
  "stocks",
  "real_estate",
  "bonds",
  "commodities",
  "cryptocurrencies",
  "derivatives"
];
const distributions = ["all", "daily", "weekly", "bi_weekly", "monthly"];

const query = computed(() => {
  const params = new URLSearchParams();
  params.set("limit", limit.value.toString());
  params.set("page", page.value.toString());
  if (selectedStatus.value !== "all") {
    params.set("status", selectedStatus.value);
  }
  if (selectedCategory.value !== "all") {
    params.set("category", selectedCategory.value);
  }
  if (selectedDistribution.value !== "all") {
    params.set("distribution", selectedDistribution.value);
  }
  return Object.fromEntries(params.entries());
});

export type InvestmentItem = NonNullable<typeof data.value>[number];

const { data, error, status, refresh } = await useFetch(
  "/api/admin/investments",
  { query }
);

const allLoaded = computed<boolean>(() => {
  return data.value ? data.value.length < limit.value : false;
});

const headers = [
  "#",
  "User",
  "Investment",
  "Category",
  "Status",
  "Account Name",
  "Deposit",
  "Expected Return",
  "Current Return",
  "Distribtion",
  "Duration (days)",
  "Days Completed",
  "Created"
];

const handleSelect = (inv: InvestmentItem) => {
  navigateTo(`/admin/investments/${inv.id}`);
};
</script>

<template>
  <MyPage :error @refresh="() => refresh()">
    <div>
      <div class="flex items-center justify-between gap-2 flex-wrap">
        <h1 class="text-3xl font-semibold">Investments</h1>

        <div
          class="flex w-full md:w-fit items-end justify-end md:justify-normal gap-2"
        >
          <div class="flex flex-col md:items-end gap-1">
            <p class="text-xs font-semibold">Status</p>
            <NuxtSelect
              v-model="selectedStatus"
              :items="statuses"
              size="sm"
              class="w-28"
            />
          </div>
          <div class="flex flex-col md:items-end gap-1">
            <p class="text-xs font-semibold">Category</p>
            <NuxtSelect
              v-model="selectedCategory"
              :items="categories"
              size="sm"
              class="w-28"
            />
          </div>
          <div class="flex flex-col md:items-end gap-1">
            <p class="text-xs font-semibold">Distribution</p>
            <NuxtSelect
              v-model="selectedDistribution"
              :items="distributions"
              size="sm"
              class="w-28"
            />
          </div>
        </div>
      </div>

      <section v-if="data">
        <VTable :loading="status === 'pending'" hover>
          <VTableHeader>
            <VTableRow>
              <VTableHead v-for="header in headers" :key="header">
                {{ header }}
              </VTableHead>
            </VTableRow>
          </VTableHeader>

          <VTableBody>
            <VTableRow v-for="(inv, i) in data" :key="inv.id" @click="handleSelect(inv)">
              <VTableCell>{{ i + 1 + page * limit }}</VTableCell>
              <VTableCell>{{ inv.investorName }}</VTableCell>
              <VTableCell>{{ inv.investmentName }}</VTableCell>
              <VTableCell>{{ inv.category }}</VTableCell>
              <VTableCell>{{ inv.status }}</VTableCell>
              <VTableCell>{{ inv.financialAccountName }}</VTableCell>
              <VTableCell>{{ toDollar(inv.deposit) }}</VTableCell>
              <VTableCell>
                {{ toDollar((inv.totalReturn / 100) * inv.deposit) }}
              </VTableCell>
              <VTableCell>{{ toDollar(inv.totalProfit) }}</VTableCell>
              <VTableCell>{{ inv.profitDistribution }}</VTableCell>
              <VTableCell>{{ inv.duration }}</VTableCell>
              <VTableCell>{{ inv.daysCompleted }}</VTableCell>
              <VTableCell>
                {{ useDateFormat(inv.createdAt, "YYYY-MMM-DD hh:mm aa") }}
              </VTableCell>
            </VTableRow>
          </VTableBody>
        </VTable>

        <div class="mt-2 border-t border-t-default">
          <NuxtSimplePaginator
            v-model:page="page"
            :rows="limit"
            :all-loaded="allLoaded"
          />
        </div>
      </section>
    </div>
  </MyPage>
</template>
