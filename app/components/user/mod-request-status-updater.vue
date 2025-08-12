<script setup lang="ts">
import type { ButtonProps } from "@nuxt/ui";
import normalizeException from "~~/shared/helpers/normalize-exception";

interface Props {
  status: "accepted" | "rejected";
  accountId: string;
  modRequestId: string;
  approvalId: string;
  buttonLabel?: ButtonProps["label"];
  buttonColor?: ButtonProps["color"];
  buttonVariant?: ButtonProps["variant"];
  buttonSize?: ButtonProps["size"];
}

const emit = defineEmits<{
  done: [success: boolean];
}>();

const toast = useToast();

const {
  accountId,
  modRequestId,
  approvalId,
  status,
  buttonLabel = "Accept",
  buttonColor = "primary",
  buttonVariant = "solid",
  buttonSize = "sm",
} = defineProps<Props>();

const { error, data, execute } = useFetch(
  `/api/user/financial-accounts/${accountId}/mod-requests/${modRequestId}`,
  {
    method: "put",
    immediate: false,
    query: {
      status,
      approvalId,
    },
  },
);

const update = async (close: () => void) => {
  await execute();
  if (data.value) {
    toast.add({
      color: "success",
      description: data.value.message,
    });

    close();
    emit("done", true);
    return;
  }

  if (error.value) {
    toast.add({
      color: "error",
      description: normalizeException(error.value).message,
    });

    emit("done", false);
  }
};
</script>

<template>
  <NuxtModal
    :title="status === 'accepted' ? 'Accept request' : 'Reject request'"
    :dismissible="false"
  >
    <NuxtButton
      :size="buttonSize"
      :color="buttonColor"
      :variant="buttonVariant"
      :label="buttonLabel"
    />

    <template #body="{ close }">
      <div class="space-y-4">
        <p>Are you sure you want to proceed? This action cannot be undone</p>

        <div class="flex items-center justify-end gap-2">
          <NuxtButton
            color="neutral"
            variant="soft"
            label="Cancel"
            @click="close()"
          />

          <NuxtButton label="Proceed" loading-auto @click="update(close)" />
        </div>
      </div>
    </template>
  </NuxtModal>
</template>
