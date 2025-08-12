<script setup lang="ts">
import type { BadgeProps } from "@nuxt/ui";
import { useDateFormat } from "@vueuse/core";

definePageMeta({
  layout: "user",
});

const [accountId, investmentId] = useRouteData().getParams([
  "accountId",
  "investmentId",
]);

const { data, error, refresh } = await useFetch(
  `/api/user/financial-accounts/${accountId}/investments/${investmentId}`,
);

const investment = computed(() => {
  return {
    ...data.value?.investment,
    lastProfit: data.value?.investment.transactions[0],
  };
});

const cards = computed(() => {
  if (!investment.value) return [];

  let statusDescription: string = "";
  const noData = "No data available";

  switch (investment.value.status) {
    case "open":
      statusDescription = investment.value.createdAt
        ? `Opened at ${date(investment.value.createdAt!)}`
        : noData;
      break;
    case "closed":
      statusDescription = investment.value.closedAt
        ? `Closed at ${date(investment.value.closedAt!)}`
        : noData;
      break;
    case "paused":
      statusDescription = investment.value.pausedAt
        ? `Paused at ${date(investment.value.pausedAt!)}`
        : noData;
      break;
    case "terminated":
      statusDescription = investment.value.terminatedAt
        ? `Terminated at ${date(investment.value.terminatedAt!)}`
        : noData;
      break;
    default:
      statusDescription = noData;
      break;
  }

  function date(value: string) {
    return useDateFormat(value, "MMM-DD-YYYY hh:mm aa").value;
  }

  return [
    {
      label: "Deposit Amount",
      value: toDollar(investment.value.deposit ?? 0),
      description: "Investment capital",
      icon: "lucide:coins",
      badgeColor: "neutral",
      class: "bg-primary-500 text-white",
    },
    {
      label: "Expected Profit",
      value: toDollar(
        ((investment.value.totalReturn ?? 0) / 100) *
          (investment.value.deposit ?? 0),
      ),
      description: `${
        (investment.value.totalReturn ?? 0) - 100
      }% total returns`,
      icon: "lucide:coins",
      badgeColor: "primary",
    },
    {
      label: "Current Profit",
      value: toDollar(investment.value.totalProfit ?? 0),
      description: `Distributed ${toCase(
        investment.value.profitDistribution ?? "",
        "lower",
      )}`,
      icon: "lucide:flower",
      badgeColor: "success",
    },
    {
      label: "Last Profit",
      value: toDollar(investment.value.lastProfit?.USDAmount ?? 0),
      description: investment.value.lastProfit?.createdAt
        ? useDateFormat(
            investment.value.lastProfit?.createdAt,
            "MMM-DD-YYYY, hh:mm aa",
          ).value
        : `No profit yet`,
      icon: "lucide:hand-coins",
      badgeColor: "error",
    },
    {
      label: "Duration",
      value: `${investment.value.daysCompleted}/${investment.value.duration}`,
      suffix: "days",
      description: "Days completed",
      icon: "lucide:clock",
      badgeColor: "primary",
    },
    {
      label: "Status",
      value: toCase(investment.value.status ?? "", "sentence"),
      description: statusDescription,
      icon: "lucide:info",
      badgeColor: "warning",
    },
  ];
});
</script>

<template>
  <MyPage :error @refresh="refresh()">
    <div v-if="investment" class="mb-4">
      <header class="flex items-center gap-4 justify-between">
        <div class="space-y-2">
          <NuxtBadge
            :label="toCase(investment.category ?? '', 'sentence')"
            color="neutral"
            variant="outline"
          />

          <div class="flex flex-wrap gap-2">
            <h1 class="text-2xl font-semibold">
              {{ investment.investmentName }}
            </h1>

            <NuxtBadge
              :label="investment.status"
              :color="getInvestmentStatusBadgeColor(investment.status ?? '')"
              :icon="getInvestmentStatusIcon(investment.status ?? '')"
              variant="subtle"
            />

            <NuxtModal
              title="Investment Details"
              :description="investment.investmentName"
              :dismissible="false"
            >
              <NuxtButton
                label="More"
                size="sm"
                variant="subtle"
                trailing-icon="lucide:ellipsis"
              />

              <template #body>
                <div class="space-y-4">
                  <header class="flex-col-center gap-1">
                    <p class="text-2xl font-semibold">
                      {{ investment.investmentName }}
                    </p>
                    <p class="capitalize card-title">
                      {{ toCase(investment.category ?? "", "sentence") }}
                    </p>
                    <NuxtBadge
                      :label="toCase(investment.status ?? '', 'lower')"
                      :color="
                        getInvestmentStatusBadgeColor(investment.status ?? '')
                      "
                      :icon="getInvestmentStatusIcon(investment.status ?? '')"
                      variant="subtle"
                    />
                    <p class="text-xs mt-2">
                      Opened
                      {{
                        useDateFormat(
                          investment.createdAt,
                          "MMM-DD-YYYY, hh:mm aa",
                        )
                      }}
                    </p>
                  </header>

                  <div>
                    <div v-if="investment.pausedAt">
                      <p class="card-title">Paused on</p>
                      <p>
                        {{
                          useDateFormat(
                            investment.pausedAt,
                            "MMM-DD-YYYY, hh:mm aa",
                          )
                        }}
                      </p>
                    </div>

                    <div v-if="investment.pausedReason">
                      <p class="card-title">Reason for pause</p>
                      <p>
                        {{ investment.pausedReason }}
                      </p>
                    </div>

                    <div v-if="investment.closedAt">
                      <p class="card-title">Closed on</p>
                      <p>
                        {{
                          useDateFormat(
                            investment.closedAt,
                            "MMM-DD-YYYY, hh:mm aa",
                          )
                        }}
                      </p>
                    </div>

                    <div v-if="investment.closedReason">
                      <p class="card-title">Reason for closure</p>
                      <p>
                        {{ investment.closedReason }}
                      </p>
                    </div>

                    <div v-if="investment.terminatedAt">
                      <p class="card-title">Terminated on</p>
                      <p>
                        {{
                          useDateFormat(
                            investment.terminatedAt,
                            "MMM-DD-YYYY, hh:mm aa",
                          )
                        }}
                      </p>
                    </div>

                    <div v-if="investment.terminatedReason">
                      <p class="card-title">Reason for termination</p>
                      <p>
                        {{ investment.terminatedReason }}
                      </p>
                    </div>
                  </div>
                </div>
              </template>
            </NuxtModal>
          </div>

          <div class="flex items-center gap-2">
            <NuxtAvatar
              :src="investment.investor?.user?.image ?? undefined"
              :alt="investment.investor?.user?.name"
              size="lg"
            />
            <div>
              <p class="text-xs text-muted">Created by</p>
              <p class="card-title">{{ investment.investor?.user?.name }}</p>
            </div>
          </div>
        </div>
      </header>

      <div class="mt-6 space-y-4">
        <div
          class="grid gap-4 md:grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] xl:grid-cols-3"
        >
          <NuxtCard v-for="card in cards" :key="card.label" :class="card.class">
            <header>
              <p class="card-title" :class="card.class ? 'text-white' : ''">
                {{ card.label }}
              </p>
            </header>

            <div class="mt-2 text-2xl font-semibold font-geist-mono">
              {{ card.value }}
              <span v-if="card.suffix" class="text-sm">
                {{ card.suffix }}
              </span>
            </div>

            <footer class="mt-2">
              <NuxtBadge
                :color="card.badgeColor as BadgeProps['color']"
                variant="soft"
                class="mr-2 dark:bg-white dark:text-primary"
                :icon="card.icon"
              />

              <small>{{ card.description }}</small>
            </footer>
          </NuxtCard>
        </div>

        <UserInvestmentProfits
          v-if="investmentId"
          :investment-id="investmentId"
          :profit-count="investment.profitCount ?? 10000"
        />
      </div>
    </div>
  </MyPage>
</template>
