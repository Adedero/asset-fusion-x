<script setup lang="ts">
import z from "zod";
import { EmailSchema } from "~~/shared/schemas";
import type { FormSubmitEvent } from "@nuxt/ui";
import { authClient } from "~/lib/auth";
import normalizeException from "~~/shared/helpers/normalize-exception";

definePageMeta({
  layout: "auth",
});

const runtimeConfig = useRuntimeConfig();

/**
 * Success modal
 */
const open = ref<boolean>(false);

const Schema = z.object({ email: EmailSchema });
type SchemaType = z.infer<typeof Schema>;

const state = reactive<SchemaType>({ email: "" });

function reset() {
  state.email = "";
}

const error = ref<Error | null>(null);
async function onSubmit(event: FormSubmitEvent<SchemaType>) {
  error.value = null;

  await authClient.requestPasswordReset(
    {
      email: event.data.email,
      redirectTo: "/reset-password",
    },
    {
      onError(ctx) {
        error.value = normalizeException(ctx.error);
      },
      onSuccess() {
        reset();
        open.value = true;
      },
    },
  );
}
</script>

<template>
  <div>
    <h1 class="text-lg font-semibold">Forgot Password</h1>
    <div class="text-sm text-muted">
      If you've forgotten your password, we can help you recover your
      {{ runtimeConfig.public.appName }} account.
    </div>

    <div class="my-5">
      <div v-if="error" class="mb-3">
        <FetchErrorAlert :message="error.message" />
      </div>

      <NuxtForm
        :schema="Schema"
        :state="state"
        class="space-y-4"
        @submit.prevent="onSubmit"
      >
        <NuxtFormField label="Email" name="email">
          <NuxtInput v-model="state.email" size="lg" class="w-full" />
        </NuxtFormField>

        <NuxtButton
          type="submit"
          class="mt-2 w-full flex-center"
          size="lg"
          icon="i-lucide-check-circle"
          loading-auto
          label="Submit"
        />
      </NuxtForm>
    </div>

    <div>
      <NuxtSeparator class="my-5" />
      <p class="text-sm text-muted">
        Go back to
        <NuxtLink class="link" :to="{ name: 'sign-in' }"> sign in. </NuxtLink>
      </p>
    </div>

    <NuxtModal v-model:open="open" title="Password reset request">
      <template #body>
        <div class="space-y-3">
          <p>
            Click the link that has been sent to your email address to complete
            the password recovery process.
          </p>

          <NuxtAlert
            variant="subtle"
            color="info"
            icon="i-lucide-triangle-alert"
            :ui="{
              description: 'text-[0.8rem]',
            }"
            :description="`If you do not see an email, you may not have an ${runtimeConfig.public.appName} account.`"
          />
        </div>
      </template>
    </NuxtModal>
  </div>
</template>
