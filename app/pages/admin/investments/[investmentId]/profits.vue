<script setup lang="ts">
import normalizeException from "~~/shared/helpers/normalize-exception";
import round from "~~/shared/utils/round";
import { useDateFormat } from "@vueuse/core";

const investmentId = useRouteData().getParams("investmentId");

const { data, error, pending, refresh } = useFetch(
  `/api/admin/investments/${investmentId}`
);
const lastProfitAmount = computed(() => {
  if (!data.value) return 0;
  return (
    data.value.profits.find(
      (profit) => profit.number === data.value?.profitCount
    )?.actualAmount ?? 0
  );
});

const actualProfit = computed(
  () =>
    data.value?.profits.reduce((acc, curr) => acc + curr.actualAmount, 0) ?? 0
);

const headers = [
  "#",
  "Status",
  "Calculated Profit",
  "Actual Profit",
  "Already Paid",
  "Paid At"
];
</script>

<template>
  <div>
    <div v-if="pending" class="flex-center p-5">
      <NuxtLoader />
    </div>

    <div v-else-if="error" class="w-full">
      <FetchErrorAlert
        :message="normalizeException(error).message"
        show-retry
        @retry="() => refresh()"
      />
    </div>

    <div v-else-if="data">
      <header>
        <p class="text-xs font-semibold text-muted">
          Investment ID: {{ data.id }}
        </p>
        <div class="flex items-center gap-2">
          <h1 class="text-3xl">{{ data.investmentName }}</h1>
          <NuxtBadge
            :label="data.status"
            :color="getInvestmentStatusBadgeColor(data.status)"
            variant="subtle"
          />
        </div>
        <p class="text-sm text-primary-500">
          {{ data.category }}
        </p>
      </header>

      <div class="mt-6 space-y-4">
        <p class="text-muted">
          Deposit:
          <span class="text-default text-lg font-geist-mono font-semibold">
            {{ toDollar(data.deposit) }}
          </span>
        </p>
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <NuxtCard>
            <div>
              <p class="text-sm text-muted font-semibold">Current Profit</p>
              <p class="text-2xl font-semibold font-geist-mono">
                {{ toDollar(data.totalProfit) }}
              </p>
            </div>
            <small>
              {{ round((data.totalProfit / data.deposit) * 100) }}% of deposit
            </small>
          </NuxtCard>

          <NuxtCard>
            <div>
              <p class="text-sm text-muted font-semibold">
                Total Profit Expected by Client
              </p>
              <p class="text-2xl font-semibold font-geist-mono">
                {{ toDollar(data.deposit * (data.totalReturn / 100)) }}
              </p>
            </div>
            <small> {{ data.totalReturn }}% of deposit </small>
          </NuxtCard>

          <NuxtCard>
            <div>
              <p class="text-sm text-muted font-semibold">Actual Total Profit</p>
              <p class="text-2xl font-semibold font-geist-mono">
                {{ toDollar(actualProfit) }}
              </p>
            </div>
            <small>
              {{ round((actualProfit / data.deposit) * 100) }}% of deposit
            </small>
          </NuxtCard>

          <NuxtCard>
            <div>
              <p class="text-sm text-muted font-semibold">
                Investment Return Status
              </p>
              <p class="text-2xl font-semibold font-geist-mono" :class="actualProfit > data.deposit ? 'text-success' : 'text-error'">
                {{ actualProfit > data.deposit ? "Profit" : "Loss" }}
              </p>
            </div>
            <small>
              {{
                actualProfit > data.deposit
                  ? "Investment is in profit"
                  : "Investment is in loss"
              }}
            </small>
          </NuxtCard>

          <NuxtCard>
            <div>
              <p class="text-sm text-muted font-semibold">Days Completed</p>
              <div>
                <span class="text-2xl font-semibold font-geist-mono">
                  {{ data.daysCompleted }}
                </span>
                <span> out of </span>
                <span class="text-2xl font-semibold font-geist-mono">
                  {{ data.duration }}
                </span>
                <span> days </span>
              </div>
            </div>
            <small>
              {{ round((data.daysCompleted / data.duration) * 100) }}% complete
            </small>
          </NuxtCard>

          <NuxtCard>
            <div>
              <p class="text-sm text-muted font-semibold">
                Profit Distribution Cycle
              </p>
              <p class="text-2xl font-semibold font-geist-mono">
                {{ data.profitDistribution }}
              </p>
            </div>
            <small v-show="data.profitDistribution === 'daily'">
              Every day
            </small>
            <small v-show="data.profitDistribution === 'weekly'">
              Every 7 days
            </small>
            <small v-show="data.profitDistribution === 'bi_weekly'">
              Every 14 days
            </small>
            <small v-show="data.profitDistribution === 'monthly'">
              Every 30 days
            </small>
          </NuxtCard>

          <NuxtCard>
            <div>
              <p class="text-sm text-muted font-semibold">
                Number of Distributions
              </p>
              <p class="text-2xl font-semibold font-geist-mono">
                {{ data.profitCount }}
              </p>
            </div>
            <small> Profit yieled {{ data.profitCount }} times </small>
          </NuxtCard>

          <NuxtCard>
            <div>
              <p class="text-sm text-muted font-semibold">Last Profit</p>
              <p class="text-2xl font-semibold font-geist-mono">
                {{ toDollar(lastProfitAmount) }}
              </p>
            </div>
            <small v-if="data.lastProfitDistributedAt">
              {{
                useDateFormat(
                  data.lastProfitDistributedAt,
                  "MMM DD, YYYY hh:mm aa"
                )
              }}
            </small>
            <small v-else>No Profit Distributed</small>
          </NuxtCard>
        </div>

        <section class="mt-10">
          <h3 class="text-xl">Profits</h3>
          <NuxtSeparator class="my-2" />

          <div class="mt-4">
            <VTable>
              <VTableHeader>
                <VTableRow>
                  <VTableHead v-for="header in headers" :key="header">
                    {{ header }}
                  </VTableHead>
                </VTableRow>
              </VTableHeader>

              <VTableBody>
                <AdminInvestmentProfitRow
                  v-for="profit in data.profits"
                  :key="profit.id"
                  :profit
                  :investment-status="data.status"
                  :next="profit.number - data.profitCount === 1"
                  @done="() => refresh()"
                />
              </VTableBody>
            </VTable>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
