<script setup lang="ts">
import { useDateFormat } from "@vueuse/core";
import type {
  InvestmentStatus,
  Profit
} from "~~/server/generated/prisma/client";
import normalizeException from "~~/shared/helpers/normalize-exception";
import type { Serialize } from "~~/types";

const { profit, investmentStatus, next } = defineProps<{
  profit: Serialize<Profit>;
  investmentStatus: InvestmentStatus;
  next: boolean;
}>();

const emit = defineEmits<{
  done: [];
}>();

const toast = useToast();

const state = ref({ ...profit });

const updateProfit = async () => {
  if (!state.value.actualAmount) return;
  if (state.value.actualAmount === profit.actualAmount) return;

  try {
    const res = await $fetch(`/api/admin/profits/${profit.id}`, {
      method: "PUT",
      body: {
        actualAmount: state.value.actualAmount
      }
    });
    emit("done");
    toast.add({
      color: "success",
      title: "Success",
      description: res.message
    });
  } catch (err) {
    toast.add({
      color: "error",
      title: "Error",
      description: normalizeException(err).message
    });
  }
};
</script>

<template>
  <VTableRow>
    <VTableCell>{{ state.number }}</VTableCell>
    <VTableCell>
      <NuxtBadge
        :label="state.actualAmount >= state.intendedAmount ? 'Profit' : 'Loss'"
        variant="subtle"
        :color="
          state.actualAmount >= state.intendedAmount ? 'success' : 'error'
        "
      />
    </VTableCell>
    <VTableCell>{{ toDollar(state.intendedAmount) }}</VTableCell>
    <VTableCell>
      <div v-if="investmentStatus === 'open' || investmentStatus === 'paused'">
        <p v-if="state.isDistributed">
          {{ toDollar(state.actualAmount) }}
        </p>
        <div v-else>
          <div class="flex items-start gap-1">
            <NuxtInputNumber
              v-model="state.actualAmount"
              :step-snapping="false"
              :format-options="{
                style: 'currency',
                currency: 'USD',
                currencyDisplay: 'symbol',
                currencySign: 'standard',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              }"
              orientation="vertical"
              class="w-32"
            />
            <div class="flex items-center gap-1">
              <NuxtButton
                color="neutral"
                variant="subtle"
                icon="lucide:x"
                @click="state.actualAmount = profit.actualAmount"
              />
              <NuxtButton
                icon="lucide:check"
                loading-auto
                @click="updateProfit"
              />
            </div>
          </div>
        </div>
      </div>

      <div v-else>
        {{ toDollar(state.actualAmount) }}
      </div>
    </VTableCell>
    <VTableCell>
      <p v-if="state.isDistributed">Yes</p>
      <div v-else class="flex items-center gap-2">
        <span>No</span>
        <NuxtBadge v-show="next" label="Next payment" color="error" variant="soft" />
      </div>
    </VTableCell>
    <VTableCell>
      <p v-if="state.distributedAt">
        {{ useDateFormat(state.distributedAt, "MMM DD, YYYY hh:mm aa") }}
      </p>
      <p v-else>Not available</p>
    </VTableCell>
  </VTableRow>
</template>
