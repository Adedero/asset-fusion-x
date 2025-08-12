<script setup lang="ts">
import z from "zod";
import { useAuthStore } from "~/stores/auth.store";
import type { FormSubmitEvent } from "@nuxt/ui";
import normalizeException from "~~/shared/helpers/normalize-exception";

const authStore = useAuthStore();
const toast = useToast();
const open = ref<boolean>(false);

const user = computed(() => authStore.user.value);

const schema = z.object({
  name: z.string().min(1, "Name is required"),
});

type Schema = z.infer<typeof schema>;

const state = reactive<Schema>({
  name: "",
});
function reset() {
  state.name = "";
}

const error = ref<Error | null>(null);

async function onSubmit(event: FormSubmitEvent<Schema>) {
  error.value = null;
  try {
    const data = await $fetch("/api/user", {
      method: "PUT",
      body: JSON.stringify({ name: event.data.name }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    reset();
    authStore.setUser({ ...authStore.user.value!, name: data.name });
    open.value = false;
  } catch (err) {
    error.value = normalizeException(err);
    toast.add({
      title: "Error",
      description: error.value.message || "Failed to update name",
      color: "error",
    });
  }
}
</script>

<template>
  <div class="w-full space-y-2">
    <p v-if="user" class="card-title">{{ user.name }}</p>

    <NuxtCollapsible v-model:open="open" class="flex flex-col gap-4 w-full">
      <NuxtButton
        class="group w-full"
        label="Change name"
        color="neutral"
        size="lg"
        variant="subtle"
        trailing-icon="i-lucide-chevron-down"
        :ui="{
          trailingIcon:
            'group-data-[state=open]:rotate-180 transition-transform duration-200',
        }"
        block
      />

      <template #content>
        <NuxtForm
          :schema="schema"
          :state="state"
          class="space-y-3"
          @submit.prevent="onSubmit"
        >
          <NuxtFormField label="Full name" name="name">
            <NuxtInput v-model="state.name" size="lg" class="w-full" />
          </NuxtFormField>

          <NuxtButton
            type="submit"
            class="mt-2 w-full flex-center"
            size="lg"
            icon="i-lucide-check-circle"
            loading-auto
          >
            Submit
          </NuxtButton>
        </NuxtForm>
      </template>
    </NuxtCollapsible>

    <div v-if="user" class="mt-6">
      <p class="card-title">{{ user.email }}</p>

      <NuxtButton
        class="mt-2 w-full"
        label="Change email"
        color="neutral"
        variant="subtle"
        trailing-icon="i-lucide-arrow-up-right"
        block
        to="/user/change-email"
      />
    </div>
  </div>
</template>
