<script setup lang="ts">
import type { ProfitDistribution } from "~~/server/generated/prisma/enums";
import { profitDistribution } from "~~/shared/data/enum-maps";

const profitCycle = defineModel<ProfitDistribution>();
</script>

<template>
  <NuxtSelect v-model="profitCycle" :items="profitDistribution" label-key="name" v-bind="$attrs" />
</template>
