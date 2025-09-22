<script setup lang="ts">
import type { InvestmentPlanCategory } from "~~/server/generated/prisma/enums";
import { investmentPlanCategories } from "~~/shared/data/enum-maps";

type Item = (typeof investmentPlanCategories)[number];

const modelValue = defineModel<InvestmentPlanCategory>();

const selected = ref<Item | undefined>(
  investmentPlanCategories.find((item) => item.value === modelValue.value) ?? undefined
);

watch(
  selected,
  (newVal) => {
    modelValue.value = newVal?.value;
  },
  { immediate: true }
);
</script>

<template>
  <NuxtSelectMenu
    v-model="selected"
    :items="investmentPlanCategories"
    label-key="name"
    v-bind="$attrs"
  />
</template>
