<script setup lang="ts">
import type { ButtonProps } from "@nuxt/ui";
import type { TransactionInit } from "./deposit-form.vue";
import normalizeException from "~~/shared/helpers/normalize-exception";

interface Props {
  transaction: TransactionInit;
  buttonProps?: ButtonProps;
}

const {
  transaction,
  buttonProps = {
    size: "lg",
    label: "Submit",
  },
} = defineProps<Props>();

const toast = useToast();

const loading = ref<boolean>(false);
const error = ref<Error | null>(null);

const createTransaction = async () => {
  error.value = null;
  loading.value = true;

  try {
    const data = await $fetch("/api/user/transactions/deposit", {
      method: "POST",
      body: transaction,
    });
    toast.add({
      color: "success",
      title: "Success",
      description: data.message,
    });
    setTimeout(() => {
      navigateTo(
        `/user/accounts/${transaction.financialAccountId}/transactions`,
      );
    }, 2000);
  } catch (err) {
    error.value = normalizeException(err);
    toast.add({
      color: "error",
      title: error.value.name ?? "Eror",
      description: error.value.message,
    });
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="w-full cursor-pointer" @click="createTransaction">
    <slot>
      <NuxtButton v-bind="buttonProps" :loading />
    </slot>
  </div>
</template>
