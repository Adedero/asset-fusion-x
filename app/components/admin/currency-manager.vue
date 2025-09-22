<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import type { Currency } from "~~/server/generated/prisma/client";
import { currencySchema } from "~~/shared/schemas/currency";
import type { CurrencyInput } from "~~/shared/schemas/currency";
import type { Serialize } from "~~/types";
import normalizeException from "~~/shared/helpers/normalize-exception";

interface Props {
  currency: Serialize<Currency> | null;
}

const { currency } = defineProps<Props>();

const emit = defineEmits<{
  done: [];
}>();

const toast = useToast();

const isEditing = computed(() => !!currency);
const open = defineModel<boolean>("open", { default: false });
const state = ref<Partial<Serialize<Currency>>>(Object.assign({}, currency));

watch(
  () => currency,
  (value) => {
    if (value) {
      state.value = { ...value };
    } else {
      state.value = {};
    }
  },
  { immediate: true }
);

const handleSubmit = async (event: FormSubmitEvent<CurrencyInput>) => {
  if (currency) {
    if (state.value.rate !== currency.rate) {
      state.value.rateUpdatedAt = new Date().toISOString();
    }
  } else {
    state.value.rateUpdatedAt = new Date().toISOString();
  }

  try {
    if (isEditing.value && !state.value.id) {
      throw new Error("Missing currency ID for editing");
    }
    let message: string = "";
    if (isEditing.value) {
      const res = await $fetch(`/api/admin/currencies/${state.value.id}`, {
        method: "PUT",
        body: event.data
      });
      message = res.message;
    } else {
      const res = await $fetch(`/api/admin/currencies`, {
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
    :title="`${isEditing ? 'Edit' : 'New'} Currency`"
    :dismissible="false"
  >
    <template #body>
      {{ state.rate }} {{ currency?.rate }}
      <NuxtForm :state :schema="currencySchema" @submit.prevent="handleSubmit">
        <div class="grid md:grid-cols-2 gap-x-2 gap-y-5">
          <NuxtFormField name="allowWithdrawal" class="md:col-span-2">
            <NuxtSwitch
              v-model="state.allowWithdrawal"
              label="Allow withdrawal with this currency"
            />
          </NuxtFormField>

          <NuxtFormField name="name" label="Name" required>
            <NuxtInput v-model="state.name" class="w-full" />
          </NuxtFormField>

          <NuxtFormField name="symbol" label="Symbol" required>
            <NuxtInput v-model="state.symbol" class="w-full" />
          </NuxtFormField>

          <NuxtFormField
            name="rate"
            :label="`Rate (1 ${state.symbol || 'CUR'} to USD)`"
            required
            class="md:col-span-2"
          >
            <NuxtInput v-model="state.rate" class="w-full" />
          </NuxtFormField>

          <NuxtFormField
            name="walletAddress"
            label="Wallet Address for Deposits"
            required
            class="md:col-span-2"
          >
            <NuxtInput v-model="state.walletAddress" class="w-full" />
          </NuxtFormField>

          <NuxtFormField
            name="walletAddressNetwork"
            label="Wallet Address Network (optional)"
            class="md:col-span-2"
          >
            <NuxtInput v-model="state.walletAddressNetwork" class="w-full" />
          </NuxtFormField>

          <NuxtFormField name="image" label="Image URL" class="md:col-span-2">
            <NuxtInput v-model="state.image" class="w-full" />
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
  </NuxtModal>
</template>
