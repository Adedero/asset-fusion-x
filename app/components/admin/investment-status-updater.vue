<script setup lang="ts">
import z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";
import normalizeException from "~~/shared/helpers/normalize-exception";

const toast = useToast();

const { status, investmentId, terminationFee } = defineProps<{
  status: string;
  investmentId: string;
  terminationFee: number;
}>();

const emit = defineEmits<{
  done: [];
}>();

const disabled = computed(() => status === "terminated" || status === "closed");

const statuses = ["open", "paused", "terminated"];

const schema = z.object({
  status: z.enum(statuses, "Invalid investment status"),
  applyTerminationFee: z.boolean(),
  terminatedReason: z.string("Invalid termination reason").optional(),
  pausedReason: z.string("Invalid pause reason").optional()
});

type Schema = z.infer<typeof schema>;

const state = reactive<Schema>({
  status,
  applyTerminationFee: true
});

const handleSubmit = async (event: FormSubmitEvent<Schema>) => {
  try {
    const res = await $fetch(`/api/admin/investments/${investmentId}`, {
      method: "PUT",
      body: event.data
    });
    emit("done");
    toast.add({
      color: "success",
      title: "Success",
      description: res.message
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
  <NuxtForm :state :schema :disabled @submit.prevent="handleSubmit">
    <div class="space-y-4">
      <NuxtFormField name="status" label="New Status" required>
        <NuxtFieldGroup class="w-full max-w-72">
          <NuxtSelect v-model="state.status" :items="statuses" class="w-full" />
          <NuxtButton type="submit" label="Update" loading-auto :disabled />
        </NuxtFieldGroup>
      </NuxtFormField>

      <div
        v-show="status !== 'terminated' && state.status === 'terminated'"
        class="space-y-4"
      >
        <NuxtFormField name="applyTerminationFee">
          <div class="flex items-center gap-2">
            <NuxtCheckbox v-model="state.applyTerminationFee" />
            <p>
              Apply <b>{{ toDollar(terminationFee) }}</b> Termination Fee
            </p>
          </div>
        </NuxtFormField>

        <NuxtFormField name="terminatedReason" label="Reason for termination">
          <NuxtTextarea
            v-model="state.terminatedReason"
            :max-rows="3"
            autoresize
            class="w-full"
          />
        </NuxtFormField>
      </div>

      <div
        v-show="status !== 'paused' && state.status === 'paused'"
        class="space-y-4"
      >
        <NuxtFormField name="pausedReason" label="Reason for the pause">
          <NuxtTextarea
            v-model="state.pausedReason"
            :max-rows="3"
            autoresize
            class="w-full"
          />
        </NuxtFormField>
      </div>
    </div>

    <div class="mt-3">
      <NuxtAlert
        v-if="disabled"
        :title="`Investment ${status}`"
        :description="`The investment status cannot be updated as it has been ${status}.`"
        color="error"
        variant="subtle"
        icon="lucide:circle-x"
      />

      <NuxtAlert
        v-if="status !== 'terminated' && state.status === 'terminated'"
        title="Warning"
        description="Once terminated, the investment status can no longer be updated!"
        color="warning"
        variant="subtle"
        icon="lucide:triangle-alert"
      />
    </div>
  </NuxtForm>
</template>
