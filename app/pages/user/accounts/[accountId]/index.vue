<script setup lang="ts">
import { useDateFormat } from "@vueuse/core";

const accountId = useRouteData().getParams("accountId");

const { data, error } = await useFetch(
  `/api/user/financial-accounts/${accountId}`,
  {
    key: `user-financial-account-${accountId}`,
  },
);
</script>

<template>
  <MyPage :error>
    <div v-if="data" class="space-y-4">
      <div
        class="grid gap-4 md:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] xl:grid-cols-4"
      >
        <NuxtCard class="bg-primary text-white">
          <header>
            <p class="card-title text-white">Account Balance</p>
          </header>

          <div class="mt-2 text-2xl font-semibold font-geist-mono">
            {{ toDollar(data.balance) }}
          </div>

          <footer class="mt-2">
            <NuxtBadge
              color="neutral"
              variant="soft"
              class="mr-2 dark:bg-white dark:text-primary"
              icon="lucide-wallet"
            />
            <small>Withdrawable amount</small>
          </footer>
        </NuxtCard>

        <NuxtCard>
          <header>
            <p class="card-title">Investment Profits</p>
          </header>

          <div class="mt-2 text-2xl font-semibold font-geist-mono">
            {{ toDollar(data.totalProfit) }}
          </div>

          <footer class="mt-2">
            <NuxtBadge
              color="success"
              variant="soft"
              class="mr-2"
              icon="lucide-flower-2"
            />
            <small class="text-muted"
              >From {{ data.activeInvestmentCount }} investments</small
            >
          </footer>
        </NuxtCard>

        <NuxtCard>
          <header>
            <p class="card-title">Last Profit</p>
          </header>

          <div class="mt-2 text-2xl font-semibold font-geist-mono">
            {{ toDollar(data.lastProfit?.USDAmount ?? 0) }}
          </div>

          <footer class="mt-2">
            <NuxtBadge
              color="success"
              variant="soft"
              class="mr-2"
              icon="lucide-hand-coins"
            />
            <small v-if="data.lastProfit?.createdAt" class="text-muted">
              {{
                useDateFormat(
                  data.lastProfit.createdAt,
                  "MMM DD, YYYY | hh:mm aa",
                )
              }}
            </small>
            <small v-else class="text-muted">Not available</small>
          </footer>
        </NuxtCard>

        <NuxtCard>
          <header>
            <p class="card-title">Last Transaction</p>
          </header>

          <div class="mt-2 text-2xl font-semibold font-geist-mono">
            {{ toDollar(data.lastTransaction?.USDAmount ?? 0) }}
          </div>

          <footer class="mt-2">
            <NuxtBadge
              :color="
                data.lastTransaction
                  ? getTransactionBadgeColor(data.lastTransaction?.type)
                  : 'error'
              "
              variant="soft"
              class="mr-2"
              :icon="
                data.lastTransaction
                  ? getTransactionIcon(data.lastTransaction.type)
                  : 'lucide-x'
              "
            />
            <small class="text-muted">
              {{
                toCase(
                  data.lastTransaction?.type ?? "not available",
                  "sentence",
                )
              }}
            </small>
          </footer>
        </NuxtCard>
      </div>

      <div>
        <NuxtCard>
          <div>
            <div class="flex flex-wrap items-center gap-2 justify-between mb-4">
              <div>
                <p class="card-title">Statistics</p>
                <p class="text-xs">Overview of account transactions</p>
              </div>

              <div
                v-if="data.status === 'active'"
                class="flex flex-wrap items-center gap-2"
              >
                <NuxtButton
                  :to="`/user/accounts/${accountId}/deposit`"
                  icon="i-lucide-circle-arrow-down"
                  label="Deposit"
                />
                <NuxtButton
                  :to="`/user/accounts/${accountId}/withdraw`"
                  icon="i-lucide-circle-arrow-up"
                  label="Withdraw"
                  color="neutral"
                  variant="outline"
                />
                <!-- <NuxtButton
                  icon="i-lucide-circle-arrow-right"
                  label="Transfer"
                  color="neutral"
                  variant="outline"
                /> -->
              </div>
            </div>

            <div>
              <UserAccountStatisticsChart />
            </div>
          </div>
        </NuxtCard>
      </div>

      <div class="pb-4">
        <NuxtCard>
          <div
            class="flex flex-col md:flex-row md:items-end justify-between gap-x-4 gap-y-6"
          >
            <div class="space-y-2">
              <div class="border-2 border-muted rounded-md px-2 py-1 w-fit">
                <p class="card-title text-base!">{{ data.name }}</p>
              </div>
              <p class="font-geist-mono text-xl font-medium">
                {{ data.number }}
              </p>
              <p class="text-sm text-muted">
                Opened on
                <b>{{ useDateFormat(data.createdAt, "MMMM DD, YYYY") }}</b> by
                <b>{{ data.creator?.name ?? "unknown" }}</b>
              </p>

              <div v-if="data.status === 'dormant'" class="space-x-2 mt-4">
                <NuxtButton
                  size="sm"
                  variant="soft"
                  label="Re-activate"
                  icon="i-lucide-redo-2"
                />

                <!--  <NuxtButton
                  size="sm"
                  variant="outline"
                  color="neutral"
                  label="Dowbload data"
                  icon="i-lucide-download" /> -->
              </div>
            </div>

            <div class="flex flex-col md:items-end">
              <p class="card-title mb-2">Account users</p>
              <NuxtAvatarGroup size="xl">
                <NuxtAvatar
                  v-for="user in [data.primaryUser, ...data.users]"
                  :key="user?.id"
                  :src="user?.image ?? undefined"
                  :alt="user?.name"
                />
              </NuxtAvatarGroup>
              <p v-if="data.users.length === 1" class="text-sm text-muted ml-2">
                You and {{ data.users[0]?.name ?? "1 other" }}
              </p>
              <p
                v-else-if="data.users.length > 1"
                class="text-sm text-muted ml-2"
              >
                You and {{ data.users.length }} others
              </p>
              <p v-else class="text-sm text-muted ml-2">You</p>
            </div>
          </div>
        </NuxtCard>
      </div>
    </div>
  </MyPage>
</template>
