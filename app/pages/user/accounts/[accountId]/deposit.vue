<script setup lang="ts">
import type { Currency } from "~~/server/generated/prisma/client";
import type { Serialize } from "~~/types";

definePageMeta({
  layout: "user",
});

const selectedCurrency = ref<Serialize<Currency> | null>(null);
</script>

<template>
  <div class="w-full h-full md:flex space-x-4 space-y-4 md:space-y-0">
    <div
      class="h-full max-h-96 md:max-h-[34rem] md:flex-shrink-0 overflow-y-auto w-full md:w-72 border rounded-md border-muted p-4"
    >
      <header class="mb-4">
        <p class="card-title">Select medium</p>
      </header>

      <UserCurrencySelect v-model="selectedCurrency" />
    </div>

    <div class="h-full overflow-y-auto md:flex-grow p-0.5">
      <div v-if="!selectedCurrency" class="h-60 fluid flex-col-center gap-4">
        <NuxtIcon name="lucide-coins" size="6rem" class="text-muted" />
        <p class="card-title">Select a deposit medium</p>
      </div>

      <NuxtCard v-else>
        <template #header>
          <p class="text-xl font-semibold">
            {{ selectedCurrency.symbol }} Deposit
          </p>
        </template>
        <div>
          <UserDepositForm :currency="selectedCurrency" />
        </div>
      </NuxtCard>
    </div>
  </div>
</template>
