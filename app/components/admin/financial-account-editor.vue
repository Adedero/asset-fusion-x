<script setup lang="ts">
import type { FinancialAccountItem } from "~/pages/admin/financial-accounts.vue";
import { financialAccountSchema } from "~~/shared/schemas/financial-accounts";
import type { FinancialAccountInput } from "~~/shared/schemas/financial-accounts";
import type { FormSubmitEvent } from "@nuxt/ui";
import normalizeException from "~~/shared/helpers/normalize-exception";
import round from "~~/shared/helpers/round";

const toast = useToast();

const open = defineModel<boolean>("open", { default: false });
const { account } = defineProps<{
  account: FinancialAccountItem;
}>();

const emit = defineEmits<{
  done: [];
}>();

const state = ref({ ...account });

watch(
  () => account,
  (newValue) => {
    state.value = { ...newValue };
  }
);

const handleSubmit = async (event: FormSubmitEvent<FinancialAccountInput>) => {
  const { data } = event;
  try {
    const { message } = await $fetch(
      `/api/admin/financial-accounts/${account.id}`,
      {
        method: "PUT",
        body: {
          name: data.name,
          balance: round(data.balance, 2)
        }
      }
    );
    emit("done");
    open.value = false;
    toast.add({
      color: "success",
      title: "Success",
      description: message
    });
  } catch (error) {
    toast.add({
      color: "error",
      title: "Error",
      description: normalizeException(error).message
    });
  }
};
</script>

<template>
  <NuxtModal
    v-model:open="open"
    title="Edit Financial Account"
    :dismissible="false"
  >
    <template #body>
      <NuxtForm
        :state
        :schema="financialAccountSchema"
        @submit.prevent="handleSubmit"
      >
        <div class="space-y-5">
          <NuxtFormField name="name" label="Account Name" required>
            <NuxtInput v-model="state.name" class="w-full" />
          </NuxtFormField>

          <NuxtFormField name="balance" label="Account Balance" required>
            <NuxtInput
              v-model.number="state.balance"
              orientation="vertical"
              class="w-full"
            />
          </NuxtFormField>

          <div class="flex items-center justify-end gap-2">
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
