<script setup lang="ts">
import type { BreadcrumbItem } from "@nuxt/ui";
import type { InvestmentPlan } from "~~/server/generated/prisma/client";
import {
  investmentPlanCategoryMap,
  profitDistributionMap
} from "~~/shared/data/enum-maps";
import normalizeException from "~~/shared/helpers/normalize-exception";
import type { Serialize } from "~~/types";

definePageMeta({
  layout: "user",
  breadcrumb: [
    {
      label: "Manage Investment Plans"
    }
  ] as BreadcrumbItem[]
});

const { confirmAsync } = useConfirm();
const toast = useToast();

const open = ref<boolean>(false);

const { data, error, refresh } = await useFetch("/api/investment-plans");

const selected = ref<Serialize<InvestmentPlan> | null>(null);
const state = computed(() => {
  return (data.value ?? [])
    .sort((a, b) => {
      if (a.category === b.category) {
        return a.name.localeCompare(b.name);
      }
      return a.category.localeCompare(b.category);
    })
    .map((plan, index) => ({
      id: plan.id,
      sn: index + 1,
      name: plan.name,
      category: investmentPlanCategoryMap[plan.category] || plan.category,
      minDeposit: `$${plan.minimumDeposit.toLocaleString()}`,
      maxDeposit: `$${plan.maximumDeposit.toLocaleString()}`,
      return: `${plan.percentagePeriodicReturn}%`,
      duration: `${plan.duration} days`,
      profitDistribution:
        profitDistributionMap[plan.profitDistribution] ||
        plan.profitDistribution,
      terminationFee: `$${plan.terminationFee.toLocaleString()}`
    }));
});

const headers = [
  "#",
  "Name",
  "Category",
  "Min. Deposit",
  "Max. Deposit",
  "Return",
  "Duration",
  "Profit Distr.",
  "Termination Fee",
  "Actions"
];

const handleItemEdit = (id: string) => {
  selected.value = data.value?.find((plan) => plan.id === id) || null;
  if (!selected.value) {
    return;
  }
  open.value = true;
};

const deleteItem = async (id: string) => {
  const ask = await confirmAsync({
    title: "Delete Investment Plan",
    description: "Are you sure you want to delete this investment plan?",
    acceptProps: { color: "error", label: "Delete" }
  });

  if (!ask) {
    return;
  }

  try {
    const { message } = await $fetch(`/api/admin/investment-plans/${id}`, {
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
        <h1 class="text-3xl font-semibold">Investment Plans</h1>

        <div>
          <NuxtButton
            label="New"
            icon="lucide:plus"
            @click="
              () => {
                selected = null;
                open = true;
              }
            "
          />
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
              <template v-for="(value, key) in item" :key="key">
                <VTableCell v-show="key !== 'id'">
                  {{ value }}
                </VTableCell>
              </template>
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

        <AdminInvestmentPlanManager
          v-model:open="open"
          :plan="selected"
          @done="
            () => {
              refresh();
              selected = null;
            }
          "
        />
      </section>
    </div>
  </MyPage>
</template>
