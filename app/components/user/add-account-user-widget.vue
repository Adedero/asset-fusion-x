<script setup lang="ts">
import type { ButtonProps, FormSubmitEvent } from "@nuxt/ui";
import { accountRoles } from "~/data/account";
import normalizeException from "~~/shared/helpers/normalize-exception";
import { JointAccountRequestSchema } from "~~/shared/schemas";
import type { JointAccountRequestSchemaType } from "~~/shared/schemas";

interface Props {
  accountId: string;
  buttonProps?: ButtonProps;
}

const {
  accountId,
  buttonProps = {
    icon: "i-lucide-user-round-plus",
    label: "Add partner",
    color: "neutral",
    variant: "outline",
  },
} = defineProps<Props>();

const open = ref<boolean>(false);

const state = reactive<JointAccountRequestSchemaType>({
  recipientName: "",
  recipientEmail: "",
  role: "co-owner",
  ownership: 0,
});

const reset = () => {
  state.recipientName = "";
  state.recipientEmail = "";
  state.role = "co-owner";
  state.ownership = 0;
};

const { refresh } = useFetch(
  `/api/user/financial-accounts/${accountId}/join-requests`,
  {
    key: "account-join-requests",
  },
);

const loading = ref<boolean>(false);
const error = ref<Error | null>(null);

const handleSubmit = async (
  event: FormSubmitEvent<JointAccountRequestSchemaType>,
) => {
  const body = {
    ...event.data,
    role: toCase(event.data.role, "snake"),
  };

  error.value = null;
  loading.value = true;

  try {
    await $fetch(`/api/user/financial-accounts/${accountId}/join-requests`, {
      method: "post",
      body,
    });
    await refresh();
    reset();
    open.value = false;
  } catch (err) {
    error.value = normalizeException(err);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <NuxtModal
    v-model:open="open"
    title="Joint Account Request"
    description="Send a request to user you want to be part of this account."
  >
    <NuxtButton v-bind="buttonProps" />

    <template #body="{ close }">
      <NuxtForm
        :state
        :schema="JointAccountRequestSchema"
        class="grid gap-4 md:grid-cols-2"
        @submit.prevent="handleSubmit"
      >
        <FetchErrorAlert
          v-if="error"
          :message="error.message"
          class="md:col-span-2"
        />

        <NuxtFormField
          name="recipientName"
          label="Name"
          required
          class="md:col-span-2"
        >
          <NuxtInput v-model="state.recipientName" class="w-full" />
        </NuxtFormField>

        <NuxtFormField
          name="recipientEmail"
          label="Email"
          required
          class="md:col-span-2"
        >
          <NuxtInput v-model="state.recipientEmail" class="w-full" />
        </NuxtFormField>

        <NuxtFormField name="role" label="Role" required>
          <NuxtSelect
            v-model="state.role"
            :items="accountRoles"
            class="w-full"
          />
        </NuxtFormField>

        <NuxtFormField name="ownership" label="Ownership (%)" required>
          <NuxtInputNumber
            v-model="state.ownership"
            :min="0"
            :max="100"
            class="w-full"
          />
        </NuxtFormField>

        <NuxtFormField
          name="description"
          label="Description"
          class="md:col-span-2"
        >
          <NuxtTextarea
            v-model="state.description"
            class="w-full resize-none"
          />
        </NuxtFormField>

        <div class="flex items-center justify-end gap-2 md:col-span-2">
          <NuxtButton
            type="button"
            label="Cancel"
            icon="lucide-circle-x"
            color="neutral"
            variant="soft"
            @click="close()"
          />
          <NuxtButton
            type="submit"
            label="Submit"
            icon="lucide-circle-check"
            loading-auto
          />
        </div>
      </NuxtForm>
    </template>
  </NuxtModal>
</template>
