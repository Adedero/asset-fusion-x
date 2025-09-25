<script setup lang="ts">
import type { TransactionStatus } from "~~/server/generated/prisma/enums";
import type { TransactionItem } from "~/pages/admin/transactions.vue";
import normalizeException from "~~/shared/helpers/normalize-exception";

const toast = useToast();

const { transaction } = defineProps<{
  transaction: TransactionItem;
}>();

const emit = defineEmits<{
  done: [];
}>();

const open = defineModel<boolean>("open", { default: false });

const txn = ref({ ...transaction });
watch(
  () => transaction,
  (newValue) => (txn.value = { ...newValue })
);

const statuses: TransactionStatus[] = ["pending", "successfull", "failed"];

const updateTransaction = async () => {
  const initialStatus = transaction.status;
  const currentStatus = txn.value.status;

  if (initialStatus === "pending" && currentStatus === "pending") {
    return;
  }

  if (currentStatus === "failed" && !txn.value.failReason) {
    toast.add({
      title: "Error",
      description: "Reason for failure is required",
      color: "error"
    });
    return;
  }

  if (initialStatus === "successfull" || initialStatus === "failed") {
    toast.add({
      title: "Error",
      description: `Transaction cannot be updated because it is already marked as ${initialStatus}`,
      color: "error"
    });
    return;
  }

  if (currentStatus === "failed") {
    txn.value.failReason = txn.value.failReason!.trim();
    txn.value.failedAt = new Date().toISOString();
    txn.value.approvedAt = null;
  }

  if (currentStatus === "successfull") {
    txn.value.failReason = null;
    txn.value.failedAt = null;
    txn.value.approvedAt = new Date().toISOString();
  }

  try {
    const res = await $fetch(`/api/admin/transactions/${transaction.id}`, {
      method: "PUT",
      body: txn.value
    });
    emit("done");
    toast.add({
      title: "Success",
      description: res.message,
      color: "success"
    });
    open.value = false;
    txn.value = { ...transaction };
  } catch (error) {
    toast.add({
      title: "Error",
      description: normalizeException(error).message,
      color: "error"
    });
  }
};
</script>

<template>
  <NuxtModal
    v-model:open="open"
    :title="`Manage ${transaction.type} transaction`"
  >
    <template #body>
      <div
        v-if="
          transaction.type === 'deposit' || transaction.type === 'withdrawal'
        "
      >
        <div class="space-y-3">
          <p class="text-center text-2xl font-semibold font-mono">
            {{ toDollar(transaction.USDAmount) }}
          </p>
          <div class="flex-center">
            <NuxtBadge
              :label="`Current status: ${transaction.status}`"
              color="neutral"
              variant="subtle"
            />
          </div>

          <NuxtFormField label="Update Transaction Status">
            <NuxtSelect v-model="txn.status" :items="statuses" class="w-full" />
          </NuxtFormField>

          <NuxtFormField
            v-show="txn.status === 'failed'"
            label="Reason for Failure"
          >
            <NuxtTextarea
              v-model="txn.failReason"
              autoresize
              :max-rows="2"
              class="w-full resize-none"
            />
          </NuxtFormField>

          <div
            v-show="
              transaction.status === 'pending' && txn.status !== 'pending'
            "
          >
            <p class="text-sm text-error-500">
              You are about to update the transaction status to
              {{ txn.status }}. This cannot be undone.
            </p>
          </div>

          <div class="flex justify-end">
            <NuxtButton
              label="Submit"
              loading-auto
              @click="updateTransaction"
            />
          </div>
        </div>
      </div>

      <div v-else>
        <p class="text-center font-semibold text-muted">
          Transaction status cannot be updated
        </p>
      </div>
    </template>
  </NuxtModal>
</template>
