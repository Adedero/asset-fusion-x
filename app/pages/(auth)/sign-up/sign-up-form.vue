<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import { authClient } from "~/lib/auth";
import { RegisterSchema } from "~~/shared/schemas";
import type { RegisterSchemaType } from "~~/shared/schemas";
import normalizeException from "~~/shared/helpers/normalize-exception";

const state = reactive<RegisterSchemaType>({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
});

function reset() {
  state.name = "";
  state.email = "";
  state.password = "";
  state.confirmPassword = "";
}

const error = ref<Error | null>(null);

async function onSubmit(event: FormSubmitEvent<RegisterSchemaType>) {
  error.value = null;

  const { name, email, password } = event.data;

  await authClient.signUp.email(
    { name, email, password },
    {
      onError(ctx) {
        error.value = normalizeException(ctx.error);
      },
      async onSuccess() {
        reset();
        navigateTo({
          name: "email-verification",
          query: { email: btoa(email) },
        });
      },
    },
  );
}
</script>

<template>
  <div>
    <div v-if="error" class="mb-3">
      <FetchErrorAlert :message="error.message" />
    </div>

    <NuxtForm
      :schema="RegisterSchema"
      :state="state"
      class="space-y-4"
      @submit.prevent="onSubmit"
    >
      <NuxtFormField label="Full Name" name="name">
        <NuxtInput v-model="state.name" size="lg" class="w-full" />
      </NuxtFormField>

      <NuxtFormField label="Email" name="email">
        <NuxtInput v-model="state.email" size="lg" class="w-full" />
      </NuxtFormField>

      <NuxtFormField label="Password" name="password">
        <NuxtPassword v-model="state.password" size="lg" class="w-full" />
      </NuxtFormField>

      <NuxtFormField label="Confirm Password" name="confirmPassword">
        <NuxtPassword
          v-model="state.confirmPassword"
          size="lg"
          class="w-full"
        />
      </NuxtFormField>

      <NuxtButton
        type="submit"
        class="mt-2 w-full flex-center"
        size="lg"
        icon="i-lucide-user-round-plus"
        loading-auto
      >
        Submit
      </NuxtButton>
    </NuxtForm>
  </div>
</template>
