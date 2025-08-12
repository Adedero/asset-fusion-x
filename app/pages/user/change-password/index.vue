<script setup lang="ts">
import type { BreadcrumbItem, FormSubmitEvent } from "@nuxt/ui";
import z from "zod";
import { authClient } from "~/lib/auth";
import { PasswordSchema } from "~~/shared/schemas";

definePageMeta({
  layout: "user",
  breadcrumb: [
    {
      label: "Change password",
    },
  ] as BreadcrumbItem[],
});

const toast = useToast();

const schema = z
  .object({
    currentPassword: z
      .string({ message: "Enter your old password" })
      .nonempty({ message: "Password is required" }),
    password: PasswordSchema,
    confirmPassword: z.string({ message: "Confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type Schema = z.infer<typeof schema>;

const state = reactive<Schema>({
  currentPassword: "",
  password: "",
  confirmPassword: "",
});

const errorMessage = ref<string>("");

const handleSubmit = async (event: FormSubmitEvent<Schema>) => {
  const { currentPassword, password } = event.data;

  await authClient.changePassword(
    {
      newPassword: password,
      currentPassword,
      revokeOtherSessions: true,
    },
    {
      onError: (ctx) => {
        errorMessage.value = ctx.error.message;
      },
      onSuccess: () => {
        toast.add({
          color: "success",
          title: "Success",
          description: "Password changed successfully",
        });

        navigateTo("/sign-in");
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
        <p class="text-xl font-semibold">Change Password</p>

        <FetchErrorAlert v-if="errorMessage" :message="errorMessage" />

        <NuxtFormField
          name="currentPassword"
          label="Current Password"
          description="Enter your current password"
          class="w-full"
        >
          <NuxtPassword v-model="state.currentPassword" class="w-full" />
        </NuxtFormField>

        <NuxtFormField
          name="password"
          label="Password"
          description="Enter your new password"
          class="w-full"
        >
          <NuxtPassword v-model="state.password" class="w-full" />
        </NuxtFormField>

        <NuxtFormField
          name="confirmPassword"
          label="Confirm Password"
          description="Verify your password so you're sure"
          class="w-full"
        >
          <NuxtPassword v-model="state.confirmPassword" class="w-full" />
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
