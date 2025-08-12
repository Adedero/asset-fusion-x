<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import z from "zod";
import type { Currency } from "~~/server/generated/prisma/client";
import type { TransactionType } from "~~/server/generated/prisma/enums";
import normalizeException from "~~/shared/helpers/normalize-exception";
import type { Serialize } from "~~/types";

const { currency } = defineProps<{ currency: Serialize<Currency> }>();

const { minDepositAmount, maxDepositAmount } = useRuntimeConfig().public;

const accountId = useRouteData().getParams("accountId");

const schema = z.object({
  amount: z
    .number({ message: "Amount is required" })
    .min(minDepositAmount, {
      message: `Amount must be at least ${toDollar(minDepositAmount)}`,
    })
    .max(maxDepositAmount, {
      message: `Amount must not be more than ${toDollar(maxDepositAmount)}`,
    }),
});
type Schema = z.infer<typeof schema>;

const state = reactive<Schema>({
  amount: 0,
});

const reset = () => {
  state.amount = 0;
};

const transaction = ref<TransactionInit | null>(null);

export interface TransactionInit {
  financialAccountId: string;
  amount: number;
  currency: string;
  USDAmount: number;
  rate: number;
  type: TransactionType;
}

const open = ref<boolean>(false);

const depositInitError = ref<Error | null>(null);

const handleFormSubmit = async (event: FormSubmitEvent<Schema>) => {
  const { amount } = event.data;

  if (currency.symbol === "WIRE") {
    transaction.value = {
      financialAccountId: accountId,
      amount: amount / (currency.rate ?? 1),
      currency: "USD",
      USDAmount: amount,
      rate: currency.rate,
      type: "deposit",
    };
    open.value = true;
    return;
  }
  try {
    const data = await $fetch("/api/user/transactions/init-deposit", {
      query: { symbol: currency.symbol, amount },
    });
    transaction.value = {
      financialAccountId: accountId,
      amount: data.currencyDepositAmount,
      currency: data.currency.symbol,
      USDAmount: amount,
      rate: data.currency.rate,
      type: "deposit",
    };
    open.value = true;
    reset();
  } catch (error) {
    depositInitError.value = normalizeException(error);
  }
};

// Create transaction
</script>

<template>
  <div>
    <NuxtForm :state :schema @submit.prevent="handleFormSubmit">
      <div class="space-y-4">
        <div v-if="depositInitError">
          <FetchErrorAlert :message="depositInitError.message" />
        </div>

        <NuxtFormField
          name="amount"
          label="Enter the deposit amount"
          :description="`Min: ${toDollar(minDepositAmount)} Max: ${toDollar(
            maxDepositAmount,
          )}`"
        >
          <NuxtInputNumber
            v-model="state.amount"
            :step-snapping="false"
            :format-options="{
              style: 'currency',
              currency: 'USD',
              currencyDisplay: 'symbol',
              currencySign: 'standard',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }"
            :min="minDepositAmount"
            :max="maxDepositAmount"
            size="lg"
            class="w-full"
          />
        </NuxtFormField>

        <NuxtButton
          type="submit"
          class="mt-2"
          size="lg"
          icon="i-lucide-check-circle"
          loading-auto
        >
          Submit
        </NuxtButton>
      </div>
    </NuxtForm>

    <NuxtModal
      v-model:open="open"
      :dismissible="false"
      title="Deposit Request"
      description="Review the details of your deposit request."
    >
      <template #body>
        <div v-if="transaction">
          <div v-if="currency.symbol === 'WIRE'" class="space-y-4">
            <header class="flex-col-center gap-1">
              <p class="card-title">Amount</p>
              <h3 class="text-center text-3xl font-semibold font-geist-mono">
                {{ toDollar(transaction.USDAmount) }}
              </h3>
              <NuxtBadge :label="currency.name" variant="soft" />
            </header>

            <p class="text-sm text-center">
              You are about to make a deposit of
              {{ toDollar(transaction.USDAmount) }} via wire transfer.
            </p>

            <NuxtAlert
              variant="soft"
              description="The deposit account details will be sent to your email address, and your account will be credited once the deposit has been confirmed."
            />

            <div class="flex gap-2 justify-end">
              <NuxtButton
                label="Cancel"
                color="neutral"
                variant="soft"
                size="lg"
                icon="lucide-circle-x"
                @click="open = false"
              />
              <UserDepositCreator
                :transaction
                :button-props="{
                  size: 'lg',
                  label: 'Proceed',
                  trailingIcon: 'i-lucide-circle-arrow-right',
                }"
              />
            </div>
          </div>

          <div v-else class="space-y-4">
            <header class="flex-col-center gap-1">
              <p class="card-title">Amount</p>
              <h3 class="text-center text-3xl font-semibold font-geist-mono">
                {{ toDollar(transaction.USDAmount) }}
              </h3>
              <NuxtBadge :label="currency.name" variant="soft" />
            </header>

            <div class="grid grid-cols-2 gap-4">
              <NuxtFormField label="Currency">
                <NuxtInput
                  :value="transaction.currency"
                  readonly
                  size="lg"
                  class="w-full"
                />
              </NuxtFormField>

              <NuxtFormField :label="`Rate: 1 ${transaction.currency} to USD`">
                <NuxtInput
                  :value="transaction.rate"
                  readonly
                  size="lg"
                  class="w-full"
                />
              </NuxtFormField>

              <NuxtFormField
                class="col-span-2"
                :label="`Deposit amount in ${transaction.currency}`"
              >
                <NuxtButtonGroup class="w-full">
                  <NuxtInput
                    :value="transaction.amount"
                    readonly
                    size="lg"
                    class="w-full"
                  />
                  <TextCopyButton
                    :text="transaction.amount"
                    variant="outline"
                  />
                </NuxtButtonGroup>
              </NuxtFormField>
            </div>

            <NuxtAlert
              variant="soft"
              :description="`Send exactly ${transaction.amount} ${transaction.currency} to the wallet address provided below. Your account will be credited once the deposit has been confirmed.`"
            />

            <NuxtFormField label="Wallet address">
              <NuxtButtonGroup class="w-full">
                <NuxtInput
                  :value="currency.walletAddress"
                  size="lg"
                  class="w-full"
                />
                <TextCopyButton
                  :text="currency.walletAddress"
                  variant="outline"
                />
              </NuxtButtonGroup>
            </NuxtFormField>

            <NuxtFormField label="Wallet address network">
              <NuxtButtonGroup class="w-full">
                <NuxtInput
                  :value="currency.walletAddressNetwork"
                  size="lg"
                  class="w-full"
                />
                <TextCopyButton
                  :text="currency.walletAddressNetwork"
                  variant="outline"
                />
              </NuxtButtonGroup>
            </NuxtFormField>

            <div class="flex gap-2 justify-end">
              <NuxtButton
                label="Cancel"
                color="neutral"
                variant="soft"
                size="lg"
                icon="lucide-circle-x"
                @click="open = false"
              />

              <UserDepositCreator
                :transaction
                :button-props="{
                  size: 'lg',
                  label: 'Proceed',
                  trailingIcon: 'i-lucide-circle-arrow-right',
                }"
              />
            </div>
          </div>
        </div>
      </template>
    </NuxtModal>
  </div>
</template>
