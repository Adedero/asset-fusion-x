<script setup lang="ts">
import type { BreadcrumbItem, FormSubmitEvent } from "@nuxt/ui";
import z from "zod";
import { v4 as UUID } from "uuid";
import normalizeException from "~~/shared/helpers/normalize-exception";

definePageMeta({
  layout: "user",
  breadcrumb: [
    {
      label: "Investment Plans",
    },
  ] as BreadcrumbItem[],
});

const toast = useToast();

const { data, error, refresh } = await useFetch("/api/investment-plans", {
  key: "investment-plans",
});

type InvestmentPlan = NonNullable<(typeof data)["value"]>[number];

const groupByFields: Array<{ label: string; value: keyof InvestmentPlan }> = [
  { label: "Category", value: "category" },
  { label: "Interest cycle", value: "profitDistribution" },
];
const sortByFields: Array<{ label: string; value: keyof InvestmentPlan }> = [
  { label: "Name", value: "name" },
  { label: "Duration", value: "duration" },
  { label: "Min. deposit", value: "minimumDeposit" },
  { label: "Max. deposit", value: "maximumDeposit" },
];
const orders: Array<"asc" | "desc"> = ["asc", "desc"];

const selectedGroupByField = ref<keyof InvestmentPlan>("category");
const selectedSortByField = ref<keyof InvestmentPlan>("minimumDeposit");
const selectedOrder = ref<"asc" | "desc">("asc");

const formattedInvestmentPlans = computed(() => {
  if (!data.value) return [];
  const grouped = groupBy(data.value, selectedGroupByField.value);
  const sortedGroups = Object.entries(grouped).map(([groupName, plans]) => ({
    group: groupName,
    items: sortBy(plans, selectedSortByField.value, selectedOrder.value),
  }));
  return sortedGroups;
});

// Investment flow
// Get accounts
const {
  pending: loadingAccounts,
  data: accounts,
  error: accountsError,
  execute: getAccounts,
} = useFetch("/api/user/financial-accounts", {
  key: "user-financial-accounts-non-immediate",
  immediate: false,
});

const financialAccounts = computed(() =>
  accounts.value?.financialAccounts?.map((account) => ({
    label: account.name,
    value: account.id,
  })),
);

const open = ref<boolean>(false);

const selectedPlan = ref<InvestmentPlan | null>(null);
const selectPlan = (plan: InvestmentPlan) => {
  selectedPlan.value = plan;
  open.value = true;
  getAccounts();
};

const schema = computed(() => {
  const min = selectedPlan.value?.minimumDeposit ?? 0;
  const max = selectedPlan.value?.maximumDeposit ?? 100000;

  return z.object({
    accountId: z
      .string({ message: "Select an account" })
      .nonempty({ message: "Select an account" }),
    amount: z
      .number({ message: "Amount is required" })
      .min(min, { message: `Amount must be at least ${toDollar(min)}` })
      .max(max, {
        message: `Amount must be not be more than ${toDollar(max)}`,
      }),
  });
});

type Schema = z.infer<(typeof schema)["value"]>;

const state = reactive<Schema>({
  accountId: "",
  amount: 0.0,
});

const reset = () => {
  state.accountId = "";
  state.amount = 0.0;
};

const selectedAccount = computed(() =>
  accounts.value?.financialAccounts?.find(
    (account) => state.accountId === account.id,
  ),
);

const handleModalClose = () => {
  selectedPlan.value = null;
  reset();
  open.value = false;
};

const investmentError = ref<Error | null>(null);

const handleSubmit = async (event: FormSubmitEvent<Schema>) => {
  const investorId = selectedAccount.value?.primaryUser?.accountUserId;

  if (!investorId || !selectedPlan.value) return;

  const { accountId, amount } = event.data;

  if (selectedAccount.value.balance < amount) return;

  const body = {
    id: UUID(),
    financialAccountId: accountId,
    investorId,
    deposit: amount,
    investmentName: selectedPlan.value.name,
    totalProfit: 0,
    profitCount: 0,
    status: "open",
    category: selectedPlan.value.category,
    duration: selectedPlan.value.duration,
    daysCompleted: 0,
    totalReturn: selectedPlan.value.percentageTotalReturn,
    periodicReturn: selectedPlan.value.percentagePeriodicReturn,
    profitDistribution: selectedPlan.value.profitDistribution,
    terminationFee: selectedPlan.value.terminationFee,
    closedAt: null,
    closedReason: null,
    pausedAt: null,
    pausedReason: null,
    terminatedAt: null,
    terminatedReason: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  try {
    const { investment, message } = await $fetch(
      `/api/user/financial-accounts/${accountId}/investments`,
      {
        method: "post",
        body,
      },
    );
    toast.add({
      color: "success",
      title: "Success",
      description: message,
    });
    await navigateTo(
      `/user/accounts/${investment.financialAccountId}/investments/${investment.id}`,
    );
  } catch (error) {
    investmentError.value = normalizeException(error);
  }
};
</script>

<template>
  <MyPage :error @refresh="refresh()">
    <div v-if="data">
      <header class="flex items-center justify-end flex-wrap gap-x-4 gap-y-2">
        <div class="space-y-1">
          <p class="text-right md:text-left text-xs font-semibold">Group by</p>
          <NuxtSelect
            v-model="selectedGroupByField"
            :items="groupByFields"
            size="sm"
            class="w-28 md:w-32"
          />
        </div>

        <div class="space-y-1">
          <p class="text-right md:text-left text-xs font-semibold">Sort by</p>
          <div class="flex items-center gap-2">
            <NuxtSelect
              v-model="selectedSortByField"
              :items="sortByFields"
              size="sm"
              class="w-[7.5rem]"
            />

            <NuxtSelect
              v-model="selectedOrder"
              :items="orders"
              size="sm"
              class="w-[4.5rem]"
            />
          </div>
        </div>
      </header>
      <div v-if="data.length" class="mt-4 space-y-12">
        <div v-for="group in formattedInvestmentPlans" :key="group.group">
          <header
            class="bg-muted py-1 px-2 rounded font-semibold text-primary mb-4"
          >
            {{ toCase(group.group, "sentence") }}
          </header>
          <div
            class="grid grid-cols-[repeat(auto-fill,minmax(18rem,1fr))] gap-4"
          >
            <NuxtCard v-for="plan in group.items" :key="plan.id">
              <template #header>
                <div>
                  <div>
                    <p class="card-title">{{ plan.name }}</p>
                    <NuxtBadge
                      variant="soft"
                      :color="
                        getInvestmentPlanCategoryBadgeColor(plan.category)
                      "
                      :label="toCase(plan.category, 'lower')"
                    />
                  </div>

                  <div class="mt-2">
                    <p class="font-geist-mono text-3xl font-semibold">
                      {{ toDollar(plan.minimumDeposit) }}
                    </p>
                    <p class="text-sm">Minimum Deposit</p>
                  </div>
                </div>
              </template>

              <div>
                <ul class="space-y-4 mb-4 text-[0.9rem]">
                  <li class="flex items-center gap-2">
                    <NuxtIcon name="lucide-circle-check" />
                    <p class="font-semibold">
                      {{ toDollar(plan.maximumDeposit) }}
                    </p>
                    <p>maximum deposit</p>
                  </li>

                  <li class="flex items-center gap-2">
                    <NuxtIcon name="lucide-circle-check" />
                    <p class="font-semibold">
                      {{ plan.duration }}
                    </p>
                    <p>days term</p>
                  </li>

                  <li class="flex items-center gap-2">
                    <NuxtIcon name="lucide-circle-check" />
                    <p class="font-semibold">
                      {{ plan.percentagePeriodicReturn }}%
                    </p>
                    <p>
                      {{ toCase(plan.profitDistribution, "lower") }} interest
                    </p>
                  </li>

                  <li class="flex items-center gap-2">
                    <NuxtIcon name="lucide-circle-check" />
                    <p class="font-semibold">
                      {{ plan.percentageTotalReturn - 100 }}%
                    </p>
                    <p>total return</p>
                  </li>
                </ul>

                <NuxtButton
                  label="Invest now"
                  class="w-full justify-center"
                  @click="selectPlan(plan)"
                />
              </div>
            </NuxtCard>
          </div>
        </div>
      </div>

      <div v-else>
        <EmptyIcon label="No investment plans" />
      </div>

      <NuxtModal
        v-model:open="open"
        :title="`${toCase(selectedPlan?.category ?? 'unknown', 'sentence')}`"
        :description="selectedPlan?.name"
        :dismissible="false"
      >
        <template #body>
          <div v-if="selectedPlan" class="space-y-4">
            <div class="text-center">
              <p class="text-sm">Minimum deposit</p>
              <p class="text-lg font-geist-mono font-semibold">
                {{ toDollar(selectedPlan.minimumDeposit) }}
              </p>
            </div>

            <div v-if="selectedAccount" class="flex-col-center gap-y-2">
              <p class="font-geist-mono text-4xl font-medium">
                {{ toDollar(selectedAccount.balance) }}
              </p>

              <NuxtBadge
                color="neutral"
                variant="outline"
                label="Account balance"
              />

              <NuxtAlert
                v-if="selectedAccount.balance < selectedPlan.minimumDeposit"
                color="error"
                variant="soft"
                description="You do not have sufficient balance to complete this investment"
              />
            </div>

            <FetchErrorAlert
              v-if="investmentError"
              :message="investmentError.message"
            />

            <div v-if="loadingAccounts" class="flex-center">
              <NuxtIcon
                name="lucide-loader"
                size="2rem"
                class="animate animate-spin"
              />
            </div>

            <div v-else-if="accountsError">
              <FetchErrorAlert
                message="Failed to get accounts"
                show-retry
                @retry="getAccounts()"
              />
            </div>

            <NuxtForm
              v-else-if="accounts"
              :state
              :schema
              class="space-y-4"
              @submit.prevent="handleSubmit"
            >
              <NuxtFormField
                name="accountId"
                label="Your accounts"
                description="Select one of your accounts to continue with this investment"
                class="w-full"
              >
                <NuxtSelect
                  v-model="state.accountId"
                  :items="financialAccounts"
                  placeholder="Select account"
                  class="w-full"
                />
              </NuxtFormField>

              <NuxtFormField
                name="amount"
                label="Deposit amount"
                class="w-full"
              >
                <NuxtInputNumber
                  v-model="state.amount"
                  :step-snapping="false"
                  :min="selectedPlan.minimumDeposit"
                  :max="selectedAccount?.balance"
                  :format-options="{
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }"
                  class="w-full"
                />
              </NuxtFormField>

              <div class="flex items-center justify-end gap-2">
                <NuxtButton
                  label="Cancel"
                  color="neutral"
                  variant="soft"
                  @click="handleModalClose"
                />

                <NuxtButton type="submit" loading-auto label="Invest" />
              </div>
            </NuxtForm>
          </div>
        </template>
      </NuxtModal>
    </div>
  </MyPage>
</template>
