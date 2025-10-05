<script setup lang="ts">
import z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";
import normalizeException from "~~/shared/helpers/normalize-exception";

const toast = useToast();

const { terminationFee, investmentId } = defineProps<{
  terminationFee: number;
  investmentId: string;
}>();

const emit = defineEmits<{
  done: [];
}>();

const schema = z.object({
  terminationFee: z
    .number("Invalid termination fee")
    .min(0, "Termination fee must be at least 0"),
});

type Schema = z.infer<typeof schema>;

const state = reactive<Schema>({
  terminationFee
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
  <NuxtForm :state :schema @submit.prevent="handleSubmit">
    <NuxtFormField name="terminationFee" label="New Termination Fee" required>
      <NuxtFieldGroup class="w-full max-w-72">
        <NuxtInputNumber
          v-model="state.terminationFee"
          :step-snapping="false"
          :format-options="{
            style: 'currency',
            currency: 'USD',
            currencyDisplay: 'symbol',
            currencySign: 'standard',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          }"
          orientation="vertical"
          class="w-full"
        />
        <NuxtButton type="submit" label="Update" loading-auto />
      </NuxtFieldGroup>
    </NuxtFormField>
  </NuxtForm>
</template>
