<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import {
  BannedIpSchema,
  banDurations,
  type BannedIpSchemaType
} from "~~/shared/schemas";
import normalizeException from "~~/shared/helpers/normalize-exception";

const emit = defineEmits<{
  done: [];
}>();
const open = defineModel<boolean>("open", { default: false });
const toast = useToast();

const state = reactive<BannedIpSchemaType>({
  ipAddress: "",
  reason: "",
  duration: "permanent"
});

function reset() {
  state.ipAddress = "";
  state.reason = "";
  state.duration = "permanent";
}

watch(open, (isOpen) => {
  if (isOpen) reset();
});

const handleSubmit = async (event: FormSubmitEvent<BannedIpSchemaType>) => {
  try {
    await $fetch("/api/admin/banned-ips", {
      method: "POST",
      body: event.data
    });
    emit("done");
    toast.add({
      color: "success",
      title: "Success",
      description: "IP address banned successfully"
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
  <NuxtModal v-model:open="open" title="Ban IP Address" :dismissible="false">
    <template #body="{ close }">
      <NuxtForm
        :state
        :schema="BannedIpSchema"
        class="space-y-4"
        @submit.prevent="handleSubmit"
      >
        <NuxtFormField name="ipAddress" label="IP Address" required>
          <NuxtInput
            v-model="state.ipAddress"
            class="w-full"
            placeholder="e.g. 203.0.113.5"
          />
        </NuxtFormField>

        <NuxtFormField name="reason" label="Reason" required>
          <NuxtTextarea
            v-model="state.reason"
            :max-rows="4"
            autoresize
            class="w-full"
          />
        </NuxtFormField>

        <NuxtFormField name="duration" label="Duration" required>
          <NuxtSelect
            v-model="state.duration"
            :items="banDurations"
            class="w-full"
          />
        </NuxtFormField>

        <div class="flex items-center justify-end gap-2">
          <NuxtButton
            color="neutral"
            variant="soft"
            label="Cancel"
            @click="close"
          />
          <NuxtButton type="submit" color="error" label="Ban IP" loading-auto />
        </div>
      </NuxtForm>
    </template>
  </NuxtModal>
</template>
