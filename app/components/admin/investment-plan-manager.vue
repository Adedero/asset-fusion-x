<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import type {
  InvestmentPlan,
  ProfitDistribution
} from "~~/server/generated/prisma/client";
import { investmentPlanSchema } from "~~/shared/schemas/investment-plan";
import type { InvestmentPlanInput } from "~~/shared/schemas/investment-plan";
import type { Serialize } from "~~/types";
import getPercentagePeriodicReturn from "~~/shared/utils/get-percentage-periodic-return";
import normalizeException from "~~/shared/helpers/normalize-exception";
import round from "~~/shared/helpers/round";

interface Props {
  plan: Serialize<InvestmentPlan> | null;
}

const { plan } = defineProps<Props>();

const emit = defineEmits<{
  done: [];
}>();

const toast = useToast();

const isEditing = computed(() => !!plan);
const open = defineModel<boolean>("open", { default: false });
const state = ref<Partial<Serialize<InvestmentPlan>>>({ ...plan });

const exampleAmount = ref<number>(state.value.minimumDeposit || 0);
const exampleTotalReturns = computed(() => {
  if (
    !state.value.percentageTotalReturn ||
    !state.value.minimumDeposit ||
    state.value.percentageTotalReturn <= 0 ||
    state.value.minimumDeposit <= 0
  ) {
    return 0;
  }
  return (exampleAmount.value * state.value.percentageTotalReturn) / 100;
});

watch(
  () => plan,
  (newPlan) => {
    state.value = { ...(newPlan ?? undefined) };
  },
  { immediate: true }
);

watchEffect(() => {
  if (state.value.profitDistribution && state.value.duration) {
    state.value.duration = alignDurationToCycle(
      state.value.profitDistribution,
      state.value.duration
    );

    if (state.value.percentageTotalReturn) {
      state.value.percentagePeriodicReturn = round(
        getPercentagePeriodicReturn({
          percentageTotalReturn: state.value.percentageTotalReturn,
          duration: state.value.duration,
          profitDistribution: state.value.profitDistribution
        }),
        2
      );
    }
  }
  if (state.value.minimumDeposit) {
    exampleAmount.value = state.value.minimumDeposit;
  }
});

function alignDurationToCycle(
  distr: ProfitDistribution,
  duration: number
): number {
  if (!duration || duration <= 0) return 0;

  const divisorMap: Record<ProfitDistribution, number> = {
    daily: 1,
    weekly: 7,
    bi_weekly: 14,
    monthly: 30
  };

  const divisor = divisorMap[distr] ?? 1;

  const remainder = duration % divisor;
  if (remainder === 0) return duration;

  const down = duration - remainder;
  const up = down + divisor;

  return remainder >= divisor / 2 ? up : down;
}

const handleSubmit = async (event: FormSubmitEvent<InvestmentPlanInput>) => {
  try {
    if (isEditing.value && !state.value.id) {
      throw new Error("Missing plan ID for editing");
    }
    let message: string = "";
    if (isEditing.value) {
      const res = await $fetch(
        `/api/admin/investment-plans/${state.value.id}`,
        {
          method: "PUT",
          body: event.data
        }
      );
      message = res.message;
    } else {
      const res = await $fetch(`/api/admin/investment-plans`, {
        method: "POST",
        body: event.data
      });
      message = res.message;
    }
    toast.add({
      color: "success",
      title: "Success",
      description: message
    });
    emit("done");
    open.value = false;
  } catch (e) {
    toast.add({
      color: "error",
      title: "Error",
      description: normalizeException(e).message
    });
  }
};
</script>

<template>
  <NuxtModal
    v-model:open="open"
    :title="`${isEditing ? 'Edit' : 'New'} Investment Plan`"
    :dismissible="false"
  >
    <template #body>
      <NuxtForm
        :state
        :schema="investmentPlanSchema"
        @submit.prevent="handleSubmit"
      >
        <div class="grid md:grid-cols-2 gap-x-2 gap-y-5">
          <NuxtFormField name="name" label="Name" required>
            <NuxtInput v-model="state.name" class="w-full" />
          </NuxtFormField>

          <NuxtFormField name="category" label="Category" required>
            <InvestmentPlanCategorySelect
              v-model="state.category"
              class="w-full"
            />
          </NuxtFormField>

          <NuxtFormField
            name="minimumDeposit"
            label="Minimum Deposit $"
            required
          >
            <NuxtInputNumber
              v-model="state.minimumDeposit"
              orientation="vertical"
              class="w-full"
            />
          </NuxtFormField>

          <NuxtFormField
            name="maximumDeposit"
            label="Maximum Deposit $"
            required
          >
            <NuxtInputNumber
              v-model="state.maximumDeposit"
              orientation="vertical"
              class="w-full"
            />
          </NuxtFormField>

          <NuxtFormField name="duration" label="Duration (in days)" required>
            <NuxtInputNumber
              v-model="state.duration"
              orientation="vertical"
              class="w-full"
            />
          </NuxtFormField>

          <NuxtFormField
            name="terminationFee"
            label="Termination Fee $"
            required
          >
            <NuxtInputNumber
              v-model="state.terminationFee"
              orientation="vertical"
              class="w-full"
            />
          </NuxtFormField>

          <NuxtFormField
            name="percentageTotalReturn"
            label="Total Returns (in %)"
            required
          >
            <NuxtInputNumber
              v-model="state.percentageTotalReturn"
              orientation="vertical"
              class="w-full"
            />
          </NuxtFormField>

          <NuxtFormField
            name="profitDistribution"
            label="Profit Distribution Cycle"
            required
          >
            <ProfitDistributionCycleSelect
              v-model="state.profitDistribution"
              class="w-full"
            />
          </NuxtFormField>

          <div class="flex items-center justify-end gap-2 md:col-span-2">
            <NuxtButton
              color="neutral"
              variant="soft"
              label="Cancel"
              @click="open = false"
            />
            <NuxtButton type="submit" label="Submit" loading-auto />
          </div>
        </div>
      </NuxtForm>
    </template>

    <template #footer>
      <div class="w-full">
        <div>
          <p class="font-semibold text-sm">Profit Calculator</p>
          <small class="text-muted">
            Edit the total returns to see how much profit the client makes
          </small>
        </div>

        <div class="mt-2 grid md:grid-cols-2 gap-x-2 w-full">
          <NuxtFormField label="Investment Amount">
            <NuxtInputNumber
              v-model="exampleAmount"
              :min="state.minimumDeposit || 0"
              :max="state.maximumDeposit || 0"
              orientation="vertical"
              class="w-full"
            />
          </NuxtFormField>

          <NuxtFormField label="Total Returns">
            <NuxtInput
              readonly
              :value="`$${exampleTotalReturns}`"
              class="w-full"
            />
          </NuxtFormField>
        </div>
      </div>
    </template>
  </NuxtModal>
</template>
