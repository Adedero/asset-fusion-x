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
  //"transfer",
  "investment",
  "profit"
];
const statuses = ["all", "pending", "successfull", "failed" /* "reversed" */];
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
  status,
  refresh
} = await useFetch("/api/admin/transactions", { query });

export type TransactionItem = NonNullable<typeof transactions.value>[number];

const allLoaded = computed<boolean>(() => {
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
  "Date",
  "Actions"
];

const open = ref<boolean>(false);
const selected = ref<TransactionItem | null>(null);

const handleItemSelect = (txn: TransactionItem) => {
  selected.value = txn;
  open.value = true;
};
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
        <div v-if="selected">
          <AdminTransactionManager
            v-model:open="open"
            :transaction="selected"
            @done="() => refresh()"
          />
        </div>

        <VTable :loading="status === 'pending'">
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
              <VTableCell class="flex items-center gap-2">
                <NuxtPopover :ui="{ content: 'max-h-96 overflow-y-auto' }">
                  <NuxtButton
                    label="More"
                    icon="lucide:ellipsis-vertical"
                    color="neutral"
                    variant="outline"
                    size="sm"
                  />

                  <template #content>
                    <div>
                      <header class="p-5 w-72">
                        <h2 class="font-semibold">More</h2>
                      </header>
                      <NuxtSeparator />
                      <div class="p-5 space-y-2.5">
                        <NuxtFormField v-if="txn.description" label="Description">
                          <NuxtTextarea :value="txn.description" :rows="3" disabled class="resize-none w-full" />
                        </NuxtFormField>

                        <NuxtFormField v-if="txn.depositWalletAddress" label="Deposit Wallet Address">
                          <NuxtInput :value="txn.depositWalletAddress" disabled class="w-full" />
                        </NuxtFormField>

                        <NuxtFormField v-if="txn.depositWalletAddressNetwork" label="Deposit Wallet Address Network">
                          <NuxtInput :value="txn.depositWalletAddressNetwork" disabled class="w-full" />
                        </NuxtFormField>

                        <NuxtFormField v-if="txn.withdrawalWalletAddress" label="Withdrawal Wallet Address">
                          <NuxtInput :value="txn.withdrawalWalletAddress" disabled class="w-full" />
                        </NuxtFormField>

                        <NuxtFormField v-if="txn.withdrawalWalletAddressNetwork" label="Withdrawal Wallet Address Network">
                          <NuxtInput :value="txn.withdrawalWalletAddressNetwork" disabled class="w-full" />
                        </NuxtFormField>

                        <NuxtFormField v-if="txn.bank" label="Bank Name">
                          <NuxtInput :value="txn.bank" disabled class="w-full" />
                        </NuxtFormField>

                        <NuxtFormField v-if="txn.bankAccount" label="Bank Account Number">
                          <NuxtInput :value="txn.bankAccount" disabled class="w-full" />
                        </NuxtFormField>

                        <NuxtFormField v-if="txn.approvedAt" label="Approved At">
                          <NuxtInput :value="useDateFormat(txn.approvedAt, 'YYYY-MMM-DD hh:mm aa').value" disabled class="w-full" />
                        </NuxtFormField>

                        <NuxtFormField v-if="txn.failedAt" label="Failed At">
                          <NuxtInput :value="useDateFormat(txn.failedAt, 'YYYY-MMM-DD hh:mm aa').value" disabled class="w-full" />
                        </NuxtFormField>
                        
                        <NuxtFormField v-if="txn.failReason" label="Reason for failure">
                          <NuxtTextarea :value="txn.failReason" :rows="3" disabled class="resize-none w-full" />
                        </NuxtFormField>
                      </div>
                    </div>
                  </template>
                </NuxtPopover>

                <NuxtButton
                  label="Edit"
                  icon="lucide:file-edit"
                  variant="soft"
                  size="sm"
                  @click="handleItemSelect(txn)"
                />
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
