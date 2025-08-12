<script setup lang="ts">
const { accountId, class: itemClass = "" } = defineProps<{
  accountId: string;
  class?: string;
}>();

const emit = defineEmits<{
  update: [number];
}>();

const { pending, data, error, refresh } = useFetch(
  `/api/user/financial-accounts/${accountId}`,
  {
    pick: ["balance"],
  },
);

const update = async () => {
  await refresh();
  emit("update", data.value?.balance ?? 0);
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

  <p v-else-if="data" :class="itemClass">{{ toDollar(data.balance) }}</p>
</template>
