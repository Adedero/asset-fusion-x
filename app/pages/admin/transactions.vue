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
      label: "Transactions"
    }
  ]
});

const page = ref<number>(0);
const limit = ref<number>(10);
const selectedType = ref<string>("all");
const selectedStatus = ref<string>("all");
const types = [
  "all",
  "deposit",
  "withdrawal",
  "transfer",
  "investment",
  "profit"
];
const statuses = ["all", "pending", "successfull", "reversed", "failed"];
const query = computed(() => {
  const params = new URLSearchParams();
  params.set("limit", limit.value.toString());
  params.set("page", page.value.toString());
  if (selectedType.value !== "all") {
    params.set("type", selectedType.value);
  }
  if (selectedStatus.value !== "all") {
    params.set("status", selectedStatus.value);
  }
  return Object.fromEntries(params.entries());
});

const {
  data: transactions,
  error,
  refresh
} = await useFetch("/api/admin/transactions", { query });

const allLoaded = computed(() => {
  return transactions.value ? transactions.value.length < limit.value : false;
});

const headers = [
  "#",
  "Status",
  "User",
  "Account Name",
  "Type",
  "Amount (USD)",
  "Currency",
  "Amount (CUR)",
  "Rate (USD)",
  "Charges (USD)",
  "Date"
];

/*  initiator: string;
    financialAccountName: string;
    financialAccount: undefined;
    id: string;
    amount: number;
    currency: string;
    USDAmount: number;
    rate: number;
    charges: number;
    type: TransactionType;
    status: TransactionStatus;
    createdAt: Date; */
</script>

<template>
  <MyPage :error @refresh="() => refresh()">
    <div>
      <div class="flex items-center justify-between gap-2 flex-wrap">
        <h1 class="text-3xl font-semibold">Transactions</h1>

        <div
          class="flex w-full md:w-fit items-end justify-end md:justify-normal gap-2"
        >
          <div class="flex flex-col md:items-end gap-1">
            <p class="text-xs font-semibold">Type</p>
            <NuxtSelect
              v-model="selectedType"
              :items="types"
              size="sm"
              class="w-28"
            />
          </div>
          <div class="flex flex-col md:items-end gap-1">
            <p class="text-xs font-semibold">Status</p>
            <NuxtSelect
              v-model="selectedStatus"
              :items="statuses"
              size="sm"
              class="w-28"
            />
          </div>
        </div>
      </div>

      <section v-if="transactions">
        <VTable>
          <VTableHeader>
            <VTableRow>
              <VTableHead v-for="header in headers" :key="header">
                {{ header }}
              </VTableHead>
            </VTableRow>
          </VTableHeader>

          <VTableBody>
            <VTableRow v-for="(txn, i) in transactions" :key="txn.id">
              <VTableCell>{{ i + 1 + page * limit }}</VTableCell>
              <VTableCell>
                <NuxtBadge
                  :label="txn.status"
                  :color="getTxnStatusBadgeColor(txn.status)"
                  variant="subtle"
                  size="sm"
                />
              </VTableCell>
              <VTableCell>{{ txn.initiator }}</VTableCell>
              <VTableCell>{{ txn.financialAccountName }}</VTableCell>
              <VTableCell>
                <NuxtBadge
                  :label="txn.type"
                  :color="getTxnTypeBadgeColor(txn.type)"
                  variant="subtle"
                  size="sm"
                />
              </VTableCell>
              <VTableCell>{{ txn.USDAmount }}</VTableCell>
              <VTableCell>{{ txn.currency }}</VTableCell>
              <VTableCell>{{ txn.amount }}</VTableCell>
              <VTableCell>{{ txn.rate }}</VTableCell>
              <VTableCell>{{ txn.charges }}</VTableCell>
              <VTableCell>
                {{ useDateFormat(txn.createdAt, "YYYY-MMM-DD hh:mm aa") }}
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
