<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import z from "zod";
import type { Currency } from "~~/server/generated/prisma/client";
import type { TransactionType } from "~~/server/generated/prisma/enums";
import normalizeException from "~~/shared/helpers/normalize-exception";
import type { Serialize } from "~~/types";

const { currency } = defineProps<{ currency: Serialize<Currency> }>();

const accountId = useRouteData().getParams("accountId");
const accountBalance = ref<number>(0);

const schema = z.object({
  amount: z.number({ message: "Amount is required" }),
  walletAddress: z.string({ message: "Invalid wallet address" }).optional(),
  walletAddressNetwork: z
    .string({ message: "Invalid wallet address network" })
    .optional(),
  accountNumber: z.string({ message: "Invalid account number" }).optional(),
  bank: z.string({ message: "Invalid bank" }).optional(),
  description: z.string({ message: "Invalid description" }).optional(),
});
type Schema = z.infer<typeof schema>;

const state = reactive<Schema>({
  amount: 0,
});

const hasEnoughBalance = computed<boolean>(() => {
  return (
    accountBalance.value > 0 &&
    accountBalance.value - state.amount >= (currency.withdrawalCharge ?? 0)
  );
});

const disabled = computed<boolean>(() => {
  if (currency.symbol === "WIRE") {
    return !state.amount || !state.bank || !state.accountNumber;
  }
  return !state.amount || !state.walletAddress;
});

const reset = () => {
  state.amount = 0;
  state.bank = undefined;
  state.accountNumber = undefined;
  state.walletAddress = undefined;
  state.walletAddressNetwork = undefined;
  state.description = undefined;
};

const transaction = ref<TransactionInit | null>(null);

export interface TransactionInit {
  financialAccountId: string;
  amount: number;
  currency: string;
  USDAmount: number;
  rate: number;
  type: TransactionType;
  charges: number;
  description?: string;
  bank?: string;
  accountNumber?: string;
  withdrawalWalletAddress?: string;
  withdrawalWalletAddressNetwork?: string;
}

const open = ref<boolean>(false);

const withdrawalInitError = ref<Error | null>(null);

const handleFormSubmit = async (event: FormSubmitEvent<Schema>) => {
  const { amount } = event.data;

  if (!amount || !hasEnoughBalance.value || disabled.value) {
    return;
  }

  if (currency.symbol === "WIRE") {
    transaction.value = {
      financialAccountId: accountId,
      amount: amount / (currency.rate ?? 1),
      currency: "USD",
      USDAmount: amount,
      rate: currency.rate,
      type: "withdrawal",
      charges: currency.withdrawalCharge ?? 0,
      bank: state.bank,
      accountNumber: state.accountNumber,
      description: state.description,
    };
    open.value = true;
    return;
  }

  try {
    const data = await $fetch("/api/user/transactions/init-withdrawal", {
      query: { symbol: currency.symbol, amount },
    });
    transaction.value = {
      financialAccountId: accountId,
      amount: data.currencyDepositAmount,
      currency: data.currency.symbol,
      USDAmount: amount,
      rate: data.currency.rate,
      type: "withdrawal",
      charges: currency.withdrawalCharge,
      withdrawalWalletAddress: state.walletAddress,
      withdrawalWalletAddressNetwork: state.walletAddressNetwork,
      description: state.description,
    };
    open.value = true;
    reset();
  } catch (error) {
    withdrawalInitError.value = normalizeException(error);
  }
};
</script>

<template>
  <div>
    <NuxtForm :state :schema @submit.prevent="handleFormSubmit">
      <div class="space-y-4">
        <div v-if="withdrawalInitError">
          <FetchErrorAlert :message="withdrawalInitError.message" />
        </div>

        <div class="flex-col-center gap-2 fluid">
          <UserAccountBalance
            ref="account-balance-component"
            :account-id="accountId"
            class="text-3xl font-medium font-geist-mono"
            @update="(balance) => (accountBalance = balance)"
          />
          <NuxtBadge label="Account Balance" variant="outline" />
        </div>

        <NuxtAlert
          v-if="!hasEnoughBalance"
          color="error"
          variant="soft"
          description="You do not have sufficient balance to complete this transaction."
        />

        <div class="grid md:grid-cols-2 gap-4">
          <NuxtFormField
            name="amount"
            label="Enter the deposit amount"
            required
            :description="`Charges: ${toDollar(
              currency.withdrawalCharge ?? 0,
            )}`"
            class="md:col-span-2"
          >
            <NuxtInputNumber
              v-model="state.amount"
              :format-options="{
                style: 'currency',
                currency: 'USD',
                currencyDisplay: 'symbol',
                currencySign: 'standard',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }"
              size="lg"
              class="w-full"
            />
          </NuxtFormField>

          <NuxtFormField
            v-if="currency.symbol !== 'WIRE'"
            name="walletAddress"
            label="Wallet address"
            required
          >
            <NuxtInput v-model="state.walletAddress" size="lg" class="w-full" />
          </NuxtFormField>

          <NuxtFormField
            v-if="currency.symbol !== 'WIRE'"
            name="walletAddressNetwork"
            label="Wallet address network"
          >
            <NuxtInput
              v-model="state.walletAddressNetwork"
              size="lg"
              class="w-full"
            />
          </NuxtFormField>

          <NuxtFormField
            v-if="currency.symbol === 'WIRE'"
            name="bank"
            label="Bank name"
            required
          >
            <NuxtInput v-model="state.bank" size="lg" class="w-full" />
          </NuxtFormField>

          <NuxtFormField
            v-if="currency.symbol === 'WIRE'"
            name="accountNumber"
            label="Account number"
            required
          >
            <NuxtInput v-model="state.accountNumber" size="lg" class="w-full" />
          </NuxtFormField>

          <NuxtFormField
            name="description"
            label="Description"
            description="Add an optional description to your withdrawal request"
            class="md:col-span-2"
          >
            <NuxtTextarea
              v-model="state.description"
              size="lg"
              class="w-full"
              :rows="3"
            />
          </NuxtFormField>
        </div>

        <NuxtButton
          type="submit"
          class="mt-2"
          size="lg"
          icon="i-lucide-check-circle"
          loading-auto
          :disabled="!hasEnoughBalance || disabled"
        >
          Submit
        </NuxtButton>
      </div>
    </NuxtForm>

    <NuxtModal
      v-model:open="open"
      :dismissible="false"
      title="Withdrawal Request"
      description="Review the details of your withdrawal request."
    >
      <template #body>
        <div v-if="transaction">
          <!-- <div v-if="currency.symbol === 'WIRE'" class="space-y-4">
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
              description="The deposit account details will be sent to your email address, and your account will be credited once the deposit has been confirmed." />

            <div class="flex gap-2 justify-end">
              <NuxtButton
                label="Cancel"
                color="neutral"
                variant="soft"
                size="lg"
                icon="lucide-circle-x"
                @click="open = false" />
              <UserWithdrawalCreator
                :transaction
                :button-props="{
                  size: 'lg',
                  label: 'Proceed',
                  trailingIcon: 'i-lucide-circle-arrow-right',
                }" />
            </div>
          </div> -->

          <div class="space-y-4">
            <header class="flex-col-center gap-1">
              <p class="card-title">Amount</p>
              <h3 class="text-center text-3xl font-semibold font-geist-mono">
                {{ toDollar(transaction.USDAmount) }}
              </h3>
              <NuxtBadge :label="currency.name" variant="soft" />

              <p class="text-muted text-sm text-center mt-2">
                Charges: {{ toDollar(transaction.charges) }}
              </p>
            </header>

            <div class="grid md:grid-cols-2 gap-4">
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
                class="md:col-span-2"
                :label="`Withdrawal amount in ${transaction.currency}`"
              >
                <NuxtInput
                  :value="transaction.amount"
                  readonly
                  size="lg"
                  class="w-full"
                />
              </NuxtFormField>

              <NuxtAlert
                class="md:col-span-2"
                variant="soft"
                :description="`${transaction.amount} ${transaction.currency} will be sent to your provided account details within 24 hours.`"
              />

              <div v-if="currency.symbol === 'WIRE'" class="contents">
                <NuxtFormField label="Bank">
                  <NuxtInput
                    :value="transaction.bank"
                    size="lg"
                    class="w-full"
                    readonly
                  />
                </NuxtFormField>

                <NuxtFormField label="Account number">
                  <NuxtInput
                    :value="transaction.accountNumber"
                    size="lg"
                    class="w-full"
                    readonly
                  />
                </NuxtFormField>
              </div>

              <div v-else class="contents">
                <NuxtFormField label="Wallet address">
                  <NuxtInput
                    :value="transaction.withdrawalWalletAddress"
                    size="lg"
                    class="w-full"
                    readonly
                  />
                </NuxtFormField>

                <NuxtFormField label="Wallet address network">
                  <NuxtInput
                    :value="transaction.withdrawalWalletAddressNetwork"
                    size="lg"
                    class="w-full"
                    readonly
                  />
                </NuxtFormField>
              </div>

              <NuxtFormField
                v-if="transaction.description"
                label="Description"
                class="md:col-span-2"
              >
                <NuxtTextarea
                  :value="transaction.description"
                  size="lg"
                  class="w-full resize-none"
                  readonly
                />
              </NuxtFormField>
            </div>

            <div class="w-full flex gap-2 justify-end">
              <NuxtButton
                label="Cancel"
                color="neutral"
                variant="soft"
                size="lg"
                icon="lucide-circle-x"
                @click="open = false"
              />

              <UserWithdrawalCreator
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
