<script setup lang="ts">
import round from "~~/shared/utils/round";

const { accountId } = defineProps<{
  accountId: string;
}>();

interface Balance {
  balance: number;
  dividend: number;
}

const emit = defineEmits<{
  update: [Balance | null];
}>();

const { pending, data, error, refresh } = useFetch(
  `/api/user/financial-accounts/${accountId}`,
  {
    pick: ["balance", "primaryUser"]
  }
);

const balance = computed<Balance | null>(() => {
  if (!data.value) return null;

  return {
    balance: data.value.balance,
    dividend: round(
      data.value.balance * ((data.value.primaryUser?.ownership ?? 0) / 100)
    )
  };
});

const update = async () => {
  await refresh();
  emit("update", balance.value);
};

onMounted(async () => {
  await update();
});
</script>

<template>
  <div v-if="pending">
    <NuxtIcon name="lucide-loader" class="animate animate-spin" />
  </div>

  <div v-else-if="error" class="flex-col-center gap-2">
    <FetchErrorAlert message="Failed to get account balance" />
    <NuxtButton
      label="Retry"
      size="sm"
      color="error"
      variant="soft"
      @click="update"
    />
  </div>

  <slot v-else-if="balance" :balance />
</template>
