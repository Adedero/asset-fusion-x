<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import { authClient } from "~/lib/auth";
import { LoginSchema } from "~~/shared/schemas";
import type { LoginSchemaType } from "~~/shared/schemas";
import normalizeException from "~~/shared/helpers/normalize-exception";
import { useAuthStore } from "~/stores/auth.store";

const runtimeConfig = useRuntimeConfig();
const route = useRoute();
const authStore = useAuthStore();

const state = reactive<LoginSchemaType>({
  email: "",
  password: "",
  rememberMe: true,
});

function reset() {
  state.email = "";
  state.password = "";
  state.rememberMe = true;
}

const error = ref<Error | null>(null);

async function onSubmit(event: FormSubmitEvent<LoginSchemaType>) {
  error.value = null;

  const encodedEmail = btoa(event.data.email);

  await authClient.signIn.email(event.data, {
    onError(ctx) {
      error.value = normalizeException(ctx.error);
    },
    async onSuccess() {
      reset();
      const sessionData = await authClient.getSession();

      if (!sessionData.data) {
        throw createError({
          status: 500,
          statusMessage: runtimeConfig.public.defaultErrorMsg,
          fatal: true,
        });
      }

      authStore.setSession(sessionData.data.session);
      authStore.setUser(sessionData.data.user);

      const { redirect } = route.query;

      if (redirect) {
        await navigateTo(redirect.toString());
        return;
      }

      if (!sessionData.data?.user.emailVerified) {
        await navigateTo({
          name: "email-verification",
          query: { email: encodedEmail },
        });
        return;
      }
      const role = sessionData.data?.user.role;
      if (!role) {
        throw createError({
          status: 500,
          statusMessage: runtimeConfig.public.defaultErrorMsg,
          fatal: true,
        });
      }

      if (role === "admin") {
        console.log(role);
        return;
      }

      if (role === "user") {
        await navigateTo("/user");
        return;
      }
    },
  });
}
</script>

<template>
  <div>
    <div v-if="error" class="mb-3">
      <FetchErrorAlert :message="error.message" />
    </div>

    <NuxtForm
      :schema="LoginSchema"
      :state="state"
      class="space-y-4"
      @submit.prevent="onSubmit"
    >
      <NuxtFormField label="Email" name="email">
        <NuxtInput v-model="state.email" size="lg" class="w-full" />
      </NuxtFormField>

      <NuxtFormField label="Password" name="password">
        <NuxtPassword v-model="state.password" size="lg" class="w-full" />
      </NuxtFormField>

      <div class="flex items-center gap-2 justify-between">
        <NuxtFormField name="rememberMe">
          <NuxtCheckbox v-model="state.rememberMe" label="Remember me" />
        </NuxtFormField>

        <NuxtLink to="/forgot-password" class="link text-sm"
          >Forgot password</NuxtLink
        >
      </div>

      <NuxtButton
        type="submit"
        class="mt-2 w-full flex-center"
        size="lg"
        icon="i-lucide-log-in"
        loading-auto
      >
        Submit
      </NuxtButton>
    </NuxtForm>
  </div>
</template>
