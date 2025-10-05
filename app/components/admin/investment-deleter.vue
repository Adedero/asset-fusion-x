<script setup lang="ts">
import z from "zod";
import normalizeException from "~~/shared/helpers/normalize-exception";

const { investmentId } = defineProps<{
  investmentId: string;
}>();

const emit = defineEmits<{
  done: [];
}>();

const toast = useToast();
const { confirmAsync } = useConfirm();

const schema = z.object({
  command: z.literal("delete investment", "Wrong command")
});

type Schema = z.infer<typeof schema>;

const state = reactive<Partial<Schema>>({});

const handleSubmit = async () => {
  const ask = await confirmAsync({
    title: "Delete Investment",
    description:
      "Are you sure you want to delete this investment? This cannot be undone.",
    acceptProps: {
      color: "error",
      label: "Delete"
    }
  });

  if (!ask) {
    return;
  }
  try {
    const res = await $fetch(`/api/admin/investments/${investmentId}`, {
      method: "DELETE"
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
    <NuxtFormField
      name="command"
      label="Write the command 'delete investment' to proceed"
    >
      <NuxtFieldGroup class="w-full max-w-72">
        <NuxtInput v-model="state.command" class="w-full" />
        <NuxtButton type="submit" label="Delete" color="error" loading-auto />
      </NuxtFieldGroup>
    </NuxtFormField>
  </NuxtForm>
</template>
