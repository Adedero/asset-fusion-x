<script setup lang="ts">
import { today, getLocalTimeZone } from "@internationalized/date";
import type { BreadcrumbItem, TableColumn } from "@nuxt/ui";
import { useDateFormat } from "@vueuse/core";
import toDollar from "~/utils/to-dollar";

const localDate = today(getLocalTimeZone());

definePageMeta({
  layout: "user",
  breadcrumb: [
    {
      label: "Dashboard",
    },
  ] as BreadcrumbItem[],
});

const { data, error, refresh } = await useFetch("/api/user/pages/dashboard", {
  key: "user-dashboard",
});

type Transaction = NonNullable<
  (typeof data)["value"]
>["recentTransactions"][number];

const transactionColumns: TableColumn<Transaction>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      const id: string = row.getValue("id") || "";
      return id.length > 5 ? id.slice(0, 5) + "..." : id;
    },
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "currency",
    header: "Currency",
  },
  {
    accessorKey: "USDAmount",
    header: "USD Amount",
    cell: ({ row }) => toDollar(row.getValue("USDAmount")),
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) =>
      useDateFormat(row.getValue("createdAt"), "MMM/DD/YYYY hh:mm aa").value,
  },
];
</script>

<template>
  <MyPage :error @refresh="refresh()">
    <div v-if="data" class="w-full lg:h-full gap-4 lg:flex pb-4">
      <div class="w-full lg:min-w-0 lg:h-full lg:overflow-y-auto lg:flex-grow">
        <div class="w-full max-h-full space-y-4 p-0.5">
          <!-- Dashboard Cards -->
          <div
            class="grid gap-4 md:grid-cols-[repeat(auto-fit,minmax(250px,1fr))]"
          >
            <NuxtCard class="bg-primary text-white">
              <header>
                <p class="card-title text-white">Account Balance</p>
              </header>

              <div class="mt-2 text-2xl font-semibold font-geist-mono">
                {{ toDollar(data.totalBalance) }}
              </div>

              <footer class="mt-2">
                <NuxtBadge
                  color="neutral"
                  variant="soft"
                  class="mr-2 dark:bg-white dark:text-primary"
                  icon="lucide-wallet"
                />
                <small>From {{ data.activeAccounts }} accounts</small>
              </footer>
            </NuxtCard>

            <NuxtCard>
              <header>
                <p class="card-title">Profit</p>
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
                  >From {{ data.activeInvestments }} investments</small
                >
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
                <div v-if="data.lastTransaction">
                  <NuxtBadge
                    :color="getTransactionBadgeColor(data.lastTransaction.type)"
                    variant="soft"
                    class="mr-2"
                    :icon="getTransactionIcon(data.lastTransaction.type)"
                  />
                  <small class="text-muted">
                    {{ data.lastTransaction.status }}
                    {{ data.lastTransaction.type }}
                  </small>
                </div>

                <div v-else>
                  <NuxtBadge
                    color="neutral"
                    variant="soft"
                    class="mr-2"
                    icon="lucide-alert-triangle"
                  />
                  <small class="text-muted">Not available</small>
                </div>
              </footer>
            </NuxtCard>
          </div>

          <!-- Recent Transactions -->
          <div class="w-full py-0.5">
            <NuxtCard class="w-full">
              <template #header>
                <div>
                  <p class="card-title">Recent Transactions</p>
                </div>
              </template>

              <div
                v-if="data.recentTransactions.length < 1"
                class="fluid flex-center text-muted"
              >
                <EmptyIcon label="No transactions" size="100px" />
              </div>

              <NuxtTable
                v-else
                :data="data.recentTransactions"
                :columns="transactionColumns"
                style="min-width: 0"
              />
            </NuxtCard>
          </div>
        </div>
      </div>

      <div class="lg:h-full lg:overflow-y-auto lg:flex-shrink-0 lg:w-96">
        <div class="mt-3 space-y-4 lg:mt-0 w-full p-0.5">
          <NuxtCard>
            <NuxtCalendar :default-value="localDate" />
          </NuxtCard>

          <NuxtCard>
            <template #header>
              <div class="flex items-center gap-2 justify-between">
                <p class="card-title">Recent Notifications</p>
                <NuxtButton
                  to="/user/notifications"
                  size="sm"
                  variant="outline"
                  color="neutral"
                  label="More"
                  trailing-icon="lucide-arrow-up-right"
                />
              </div>
            </template>

            <div
              v-if="data.notifications.length < 1"
              class="fluid flex-center text-muted"
            >
              <EmptyIcon label="No notifications" size="100px" />
            </div>

            <div v-else class="space-y-2">
              <NuxtCard
                v-for="notification in data.notifications"
                :key="notification.id"
              >
                <div class="flex gap-2 md:gap-4">
                  <div class="flex-grow">
                    <div class="text-sm">
                      <div
                        v-if="!notification.isRead"
                        class="flex items-center gap-4 justify-between mb-1"
                      >
                        <NuxtBadge
                          size="sm"
                          color="success"
                          variant="soft"
                          label="New"
                        />
                      </div>

                      <p class="font-semibold">
                        {{ notification.title }}
                      </p>
                      <p v-if="notification.bodyType === 'string'">
                        {{ notification.body }}
                      </p>

                      <!-- eslint-disable-next-line vue/no-v-html -->
                      <div v-else v-html="notification.body" />

                      <footer
                        class="mt-2 flex items-center gap-4 justify-between"
                      >
                        <div class="flex items-center gap-1">
                          <NuxtIcon name="lucide:clock" class="text-muted" />
                          <p class="text-xs text-muted">
                            {{
                              useDateFormat(
                                notification.createdAt,
                                "MMM DD, YYYY",
                              )
                            }}
                            at
                            {{
                              useDateFormat(notification.createdAt, "hh:mm aa")
                            }}
                          </p>
                        </div>
                      </footer>
                    </div>
                  </div>
                </div>
              </NuxtCard>
            </div>
          </NuxtCard>
        </div>
      </div>
    </div>
  </MyPage>
</template>
