<script setup lang="ts">
import type { UserWithRole } from "better-auth/plugins";
import type { FormSubmitEvent } from "@nuxt/ui";
import {
  BanUserSchema,
  banDurations,
  type BanUserSchemaType
} from "~~/shared/schemas";
import normalizeException from "~~/shared/helpers/normalize-exception";
import { authClient } from "~/lib/auth";

const { user } = defineProps<{
  user: UserWithRole | null;
}>();
const emit = defineEmits<{
  done: [];
}>();
const open = defineModel<boolean>("open", { default: false });
const toast = useToast();

const state = reactive<BanUserSchemaType>({
  reason: "",
  duration: "permanent",
  banIp: false,
  ipAddress: ""
});

function reset() {
  state.reason = "";
  state.duration = "permanent";
  state.banIp = false;
  state.ipAddress = "";
}

watch(
  () => [open.value, user?.id] as const,
  async ([isOpen, userId]) => {
    reset();
    if (!isOpen || !userId) return;

    const res = await authClient.admin.listUserSessions({ userId });
    const sessions = res.data?.sessions ?? [];
    const latest = [...sessions].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )[0];
    state.ipAddress = latest?.ipAddress ?? "";
  }
);

const handleSubmit = async (event: FormSubmitEvent<BanUserSchemaType>) => {
  if (!user) return;

  try {
    await $fetch(`/api/admin/users/${user.id}/ban`, {
      method: "POST",
      body: event.data
    });
    emit("done");
    toast.add({
      color: "success",
      title: "Success",
      description: "User banned successfully"
    });
    open.value = false;
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
  <NuxtModal v-model:open="open" title="Ban User" :dismissible="false">
    <template #body="{ close }">
      <NuxtForm
        :state
        :schema="BanUserSchema"
        class="space-y-4"
        @submit.prevent="handleSubmit"
      >
        <NuxtFormField name="reason" label="Reason" required>
          <NuxtTextarea
            v-model="state.reason"
            :max-rows="4"
            autoresize
            class="w-full"
            placeholder="Why is this user being banned?"
          />
        </NuxtFormField>

        <NuxtFormField name="duration" label="Duration" required>
          <NuxtSelect
            v-model="state.duration"
            :items="banDurations"
            class="w-full"
          />
        </NuxtFormField>

        <NuxtFormField name="banIp">
          <div class="flex items-center gap-2">
            <NuxtCheckbox v-model="state.banIp" />
            <p>Also ban this user's IP address</p>
          </div>
        </NuxtFormField>

        <NuxtFormField
          v-if="state.banIp"
          name="ipAddress"
          label="IP Address"
          required
        >
          <NuxtInput v-model="state.ipAddress" class="w-full" />
        </NuxtFormField>

        <div class="flex items-center justify-end gap-2">
          <NuxtButton
            color="neutral"
            variant="soft"
            label="Cancel"
            @click="close"
          />
          <NuxtButton
            type="submit"
            color="error"
            label="Ban User"
            loading-auto
          />
        </div>
      </NuxtForm>
    </template>
  </NuxtModal>
</template>
