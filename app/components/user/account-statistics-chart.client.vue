<script setup lang="ts">
import { useDateFormat } from "@vueuse/core";
import normalizeException from "~~/shared/helpers/normalize-exception";

const accountId = useRouteData().getParams("accountId");

const {
  pending,
  data: transactions,
  error,
  refresh,
} = useFetch(`/api/user/financial-accounts/${accountId}/transactions`, {
  query: { limit: 100 },
});

const categories = {
  deposit: { name: "Deposits", color: "#3b82f6" },
  withdrawal: { name: "Withdrawals", color: "#ef4444" },
  // transfer: { name: "Transfers", color: "#f59e0b" },
  investment: { name: "Investments", color: "#8b5cf6" },
  profit: { name: "Profits", color: "#10b981" },
};

const chartData = computed(() => {
  if (!transactions.value) return [];

  // Step 1: Create a key like "W9: Tue"
  const formatted = transactions.value.map((txn) => {
    const weekNum = getWeek(txn.createdAt);
    const dayName = useDateFormat(txn.createdAt, "ddd").value; // e.g., Tue
    return {
      ...txn,
      weekDayKey: `W${weekNum}: ${dayName}`,
    };
  });

  // Step 2: Group by that key
  const grouped = formatted.reduce<Record<string, typeof formatted>>(
    (acc, txn) => {
      acc[txn.weekDayKey] ??= [];
      acc[txn.weekDayKey]?.push(txn);
      return acc;
    },
    {},
  );

  // Step 3: Aggregate totals per category
  return Object.entries(grouped).map(([weekDayKey, txns]) => {
    const totals: Record<string, number> = {};
    for (const type of Object.keys(categories)) {
      totals[type] = 0;
    }
    for (const txn of txns) {
      if (totals[txn.type] !== undefined) {
        totals[txn.type]! += txn.USDAmount;
      }
    }
    return { day: weekDayKey, ...totals };
  });
});

const yAxes = Object.keys(categories);
const xFormatter = (i: number) => chartData.value[i]?.day ?? "";
const yFormatter = (val: number) => `$${val.toLocaleString()}`;
</script>

<template>
  <ClientOnly>
    <div v-if="pending">
      <NuxtSkeleton class="w-full h-[300px]" />
    </div>

    <div v-else-if="error">
      <FetchErrorAlert
        :message="normalizeException(error).message"
        show-retry
        @retry="refresh()"
      />
    </div>

    <div v-else-if="transactions">
      <BarChart
        v-if="transactions.length"
        :data="chartData"
        :height="300"
        :categories="categories"
        :y-axis="yAxes as unknown as 'day'[]"
        :group-padding="0.1"
        :bar-padding="0.2"
        :x-num-ticks="6"
        :radius="4"
        :x-formatter="xFormatter"
        :y-formatter="yFormatter"
        :legend-position="LegendPosition.Top"
        :hide-legend="false"
        :y-grid-line="true"
      />

      <div v-else>
        <EmptyIcon label="No data" />
      </div>
    </div>

    <template #fallback>
      <NuxtSkeleton class="w-full h-[300px]" />
    </template>
  </ClientOnly>
</template>
