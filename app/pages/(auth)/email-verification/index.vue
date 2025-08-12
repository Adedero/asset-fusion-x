<script setup lang="ts">
import { useAsyncState } from "@vueuse/core";
import { authClient } from "~/lib/auth";

definePageMeta({
  layout: "auth",
});

const runtimeConfig = useRuntimeConfig();
const route = useRoute();
const toast = useToast();

const email = route.query.email?.toString();
const decodedEmail = ref<string>(atob(email ?? ""));

const { state, executeImmediate: sendEmail } = useAsyncState(async function () {
  return await authClient.sendVerificationEmail(
    {
      email: decodedEmail.value,
      callbackURL: "/token-validation",
    },
    {
      onSuccess: () => {
        toast.add({
          color: "success",
          title: "Success",
          description: "Email sent successfully",
        });
      },
    },
  );
}, null);

onMounted(() => {
  if (!decodedEmail.value) {
    throw createError({
      statusCode: 400,
      statusMessage:
        "We could not verifiy your email due to incomplete data. Try signing up again.",
      fatal: true,
    });
  }
});
</script>

<template>
  <div>
    <h1 class="text-lg font-semibold">Verify Your Email</h1>
    <div class="text-sm text-muted">
      You must verify your email address to continue on
      {{ runtimeConfig.public.appName }}.
    </div>

    <div class="my-5">
      <div v-if="state?.error">
        <FetchErrorAlert
          :message="state?.error?.message ?? state?.error?.statusText"
          show-retry
          @retry="sendEmail()"
        />
      </div>

      <div v-else>
        <div>
          <p v-if="decodedEmail" class="flex items-center gap-1 flex-wrap">
            Email: <b>{{ maskEmail(decodedEmail) }}</b>
            <NuxtLink :to="{ name: 'sign-up' }">
              <NuxtButton
                color="warning"
                icon="i-lucide-circle-alert"
                label="Not my email"
                size="sm"
                variant="link"
                class="ml-1"
              />
            </NuxtLink>
          </p>

          <NuxtAlert
            variant="subtle"
            description="A verification link has been sent to your email. Click on it to
              verify your account."
            icon="lucide-circle-alert"
            class="mt-4"
          />
        </div>

        <div class="mt-4 flex items-center gap-3 justify-between">
          <p class="text-muted text-sm">Didn't receive the email?</p>
          <NuxtButton loading-auto label="Resend" @click="sendEmail()" />
        </div>
      </div>
    </div>

    <div>
      <NuxtSeparator class="my-5" />
      <p class="text-xs text-muted">
        Are you experiencing any issues?
        <NuxtLink class="link" :to="{ name: 'contact' }">
          Contact us.
        </NuxtLink>
      </p>
    </div>
  </div>
</template>
