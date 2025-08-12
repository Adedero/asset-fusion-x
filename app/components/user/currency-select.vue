<script setup lang="ts">
import type { RadioGroupValue, RadioGroupItem } from "@nuxt/ui";
import type { Currency } from "~~/server/generated/prisma/client";
import normalizeException from "~~/shared/helpers/normalize-exception";
import type { Serialize } from "~~/types";

interface Props {
  onlyWithdrawalCurrencies?: boolean;
}

const { onlyWithdrawalCurrencies = false } = defineProps<Props>();

const { pending, data, error, refresh } = await useFetch("/api/currencies", {
  key: "currencies",
});

const err = computed(() =>
  error.value ? normalizeException(error.value) : null,
);

const items = computed<RadioGroupItem[]>(() => {
  const filter = onlyWithdrawalCurrencies
    ? data.value?.filter((currency) => currency.allowWithdrawal === true)
    : data.value;

  const formatted = filter
    ? filter.map((currency) => ({
        label: currency.symbol,
        value: currency.symbol,
        description: currency.name,
      }))
    : [];

  return formatted;
});

const value = ref<RadioGroupValue>("");

const currency = defineModel<Serialize<Currency> | null>({ default: null });

watch(value, (newValue) => {
  currency.value =
    data.value?.find((currency) => currency.symbol === newValue) ?? null;
});
</script>

<template>
  <div class="fluid">
    <div v-if="pending" class="grid gap-2">
      <NuxtSkeleton v-for="i in 4" :key="i" class="h-16" />
    </div>

    <div v-else-if="err" class="flex flex-col gap-2 justify-center">
      <NuxtAlert
        class="w-full"
        color="error"
        variant="subtle"
        :description="err.message"
      />
      <NuxtButton
        class="flex-center"
        color="error"
        variant="soft"
        label="Retry"
        @click="refresh()"
      />
    </div>

    <div v-else-if="data">
      <NuxtRadioGroup
        v-model="value"
        color="primary"
        variant="card"
        :items="items"
      />
    </div>
  </div>
</template>
