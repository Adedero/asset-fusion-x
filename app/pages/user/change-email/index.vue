<script setup lang="ts">
import type { BreadcrumbItem, FormSubmitEvent } from "@nuxt/ui";
import z from "zod";
import { authClient } from "~/lib/auth";

definePageMeta({
  layout: "user",
  breadcrumb: [
    {
      label: "Change email",
    },
  ] as BreadcrumbItem[],
});

const schema = z.object({
  email: z.email({ message: "Invalid email" }),
});

type Schema = z.infer<typeof schema>;

const state = reactive<Schema>({
  email: "",
});

const errorMessage = ref<string>();
const successMessage = ref<string>();

const handleSubmit = async (event: FormSubmitEvent<Schema>) => {
  const { email } = event.data;
  errorMessage.value = undefined;
  successMessage.value = undefined;

  await authClient.changeEmail(
    {
      newEmail: email,
      callbackURL: "/change-email/verification",
    },
    {
      onError: (ctx) => {
        errorMessage.value = ctx.error.message;
      },
      onSuccess: () => {
        successMessage.value =
          "A link has been sent to your current email. Click on the link to continue.";
      },
    },
  );
};
</script>

<template>
  <div class="flex-center h-full">
    <NuxtCard class="w-full max-w-96">
      <template #header>
        <NuxtCard
          class="w-fit"
          variant="subtle"
          :ui="{ body: 'p-2.5 sm:p-2.5' }"
        >
          <AppLogo size="32" />
        </NuxtCard>
      </template>

      <NuxtForm :state :schema class="space-y-4" @submit.prevent="handleSubmit">
        <p class="text-xl font-semibold">Change Email</p>

        <FetchErrorAlert v-if="errorMessage" :message="errorMessage" />

        <NuxtAlert
          v-else-if="successMessage"
          title="Successful"
          :description="successMessage"
          color="success"
          variant="subtle"
        />

        <NuxtFormField
          name="email"
          label="New Email"
          description="Enter your new email"
          class="w-full"
        >
          <NuxtInput v-model="state.email" class="w-full" />
        </NuxtFormField>

        <div>
          <NuxtButton
            class="w-full flex-center"
            type="submit"
            label="Submit"
            loading-auto
            trailing-icon="i-lucide-circle-arrow-right"
          />
        </div>
      </NuxtForm>
    </NuxtCard>
  </div>
</template>
