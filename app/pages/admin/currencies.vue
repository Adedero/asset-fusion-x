<script setup lang="ts">
import type { BreadcrumbItem } from "@nuxt/ui";
import VTableCell from "~/components/v-table/v-table-cell.vue";
import type { Currency } from "~~/server/generated/prisma/client";
import normalizeException from "~~/shared/helpers/normalize-exception";
import type { Serialize } from "~~/types";

definePageMeta({
  layout: "user",
  breadcrumb: [
    {
      label: "Manage Currencies"
    }
  ] as BreadcrumbItem[]
});

const { confirmAsync } = useConfirm();
const toast = useToast();

const open = ref<boolean>(false);

const { data, error, refresh } = await useFetch("/api/currencies");

const selected = ref<Serialize<Currency> | null>(null);
const state = computed(() => {
  return (data.value ?? [])
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((currency, index) => ({
      id: currency.id,
      sn: index + 1,
      image: currency.image,
      symbol: currency.symbol,
      name: currency.name,
      rate: currency.rate,
      withdrawal: currency.allowWithdrawal ? "allowed" : "not allowed",
      withdrawalCharge: `$${currency.withdrawalCharge}`,
      walletAddress: currency.walletAddress || "N/A",
      walletAddressNetwork: currency.walletAddressNetwork || "N/A"
    }));
});

const headers = [
  "#",
  "",
  "Symbol",
  "Name",
  "Rate (USD)",
  "Withdrawal",
  "Withdrawal Charge",
  "Wallet Address",
  "Network",
  "Actions"
];

const handleItemEdit = (id: string) => {
  selected.value = data.value?.find((currency) => currency.id === id) || null;
  if (!selected.value) {
    return;
  }
  open.value = true;
};

const handleCurrencyUpdate = () => {
  selected.value = null;
  refresh();
};

const handleNewItem = () => {
  selected.value = null;
  open.value = true;
};

const deleteItem = async (id: string) => {
  const ask = await confirmAsync({
    title: "Delete Currency",
    description: "Are you sure you want to delete this currency?",
    acceptProps: { color: "error", label: "Delete" }
  });

  if (!ask) {
    return;
  }

  try {
    const { message } = await $fetch(`/api/admin/currencies/${id}`, {
      method: "DELETE"
    });
    toast.add({
      color: "success",
      title: "Success",
      description: message
    });
    refresh();
  } catch (error) {
    toast.add({
      color: "error",
      title: "Error",
      description: normalizeException(error).message
    });
  }
};
</script>

<template>
  <MyPage :error @refresh="() => refresh()">
    <div class="space-y-10">
      <div class="flex items-center justify-between gap-5">
        <h1 class="text-3xl font-semibold">Currencies</h1>

        <div>
          <NuxtButton label="New" icon="lucide:plus" @click="handleNewItem" />
        </div>
      </div>

      <section v-if="data">
        <VTable>
          <VTableHeader>
            <VTableRow>
              <VTableHead v-for="header in headers" :key="header">
                {{ header }}
              </VTableHead>
            </VTableRow>
          </VTableHeader>

          <VTableBody>
            <VTableRow v-for="item in state" :key="item.name">
              <VTableCell>{{ item.sn }}</VTableCell>
              <VTableCell>
                <NuxtAvatar
                  :src="item.image ?? undefined"
                  :alt="item.name"
                  size="md"
                />
              </VTableCell>
              <VTableCell>{{ item.symbol }}</VTableCell>
              <VTableCell>{{ item.name }}</VTableCell>
              <VTableCell>{{ item.rate }}</VTableCell>
              <VTableCell>
                <NuxtBadge
                  :label="item.withdrawal"
                  :color="item.withdrawal === 'allowed' ? 'primary' : 'error'"
                  variant="soft"
                />
              </VTableCell>
              <VTableCell>{{ item.withdrawalCharge }}</VTableCell>
              <VTableCell>{{ item.walletAddress }}</VTableCell>
              <VTableCell>{{ item.walletAddressNetwork }}</VTableCell>
              <VTableCell>
                <div class="flex items-center gap-2">
                  <NuxtButton
                    label="Edit"
                    variant="soft"
                    size="sm"
                    @click="handleItemEdit(item.id)"
                  />
                  <NuxtButton
                    label="Delete"
                    color="error"
                    variant="soft"
                    size="sm"
                    loading-auto
                    @click="deleteItem(item.id)"
                  />
                </div>
              </VTableCell>
            </VTableRow>
          </VTableBody>
        </VTable>

        <AdminCurrencyManager
          v-model:open="open"
          :currency="selected"
          @done="handleCurrencyUpdate"
        />
      </section>
    </div>
  </MyPage>
</template>
