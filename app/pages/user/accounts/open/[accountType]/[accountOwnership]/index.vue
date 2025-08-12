<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import z from "zod";
import { accountRoles } from "~/data/account";
import normalizeException from "~~/shared/helpers/normalize-exception";

definePageMeta({
  layout: "user",
});
const route = useRoute();
const accountType = route.params?.accountType?.toString();
const accountOwnership = route.params?.accountOwnership?.toString();

const schema = z.object({
  accountName: z.string().min(3, { message: "Account name is required." }),
  jointOwnershipRole: z.string().optional(),
  jointOwnership: z
    .number()
    .nonnegative({ message: "Ownership cannot be negative" })
    .max(100, { message: "Ownership cannot be more than 100%" })
    .optional(),
});

type Schema = z.infer<typeof schema>;

const state = reactive<Schema>({
  accountName: "",
});

function reset() {
  state.accountName = "";
}

const error = ref<Error | null>(null);
async function onSubmit(event: FormSubmitEvent<Schema>) {
  error.value = null;
  try {
    await $fetch("/api/user/financial-accounts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        ...event.data,
        jointOwnershipRole: event.data.jointOwnershipRole
          ? toCase(event.data.jointOwnershipRole, "snake")
          : undefined,
        accountType,
        accountOwnership,
      },
    });
    reset();
    await navigateTo("/user/accounts");
  } catch (err) {
    error.value = normalizeException(err);
  }
}

onMounted(async () => {
  if (accountType !== "personal" && accountType !== "business") {
    await navigateTo("/users/accounts/open");
    return;
  }

  if (accountOwnership !== "single" && accountOwnership !== "joint") {
    await navigateTo("/users/accounts/open");
    return;
  }
});
</script>

<template>
  <div v-if="accountOwnership && accountType" class="fluid">
    <div class="fluid flex-center">
      <NuxtCard class="md:w-96">
        <template #header>
          <h1 class="text-2xl font-semibold mb-2">Open your account</h1>

          <div class="flex items-center gap-2">
            <NuxtBadge size="lg" :label="accountOwnership" variant="soft" />
            <NuxtBadge
              size="lg"
              :label="accountType"
              variant="soft"
              color="error"
            />
          </div>
        </template>

        <FetchErrorAlert v-if="error" :message="error.message" class="mb-4" />

        <NuxtForm :schema :state class="space-y-4" @submit.prevent="onSubmit">
          <NuxtFormField
            label="Account Name"
            name="accountName"
            description="Enter a name for your account"
          >
            <NuxtInput v-model="state.accountName" size="lg" class="w-full" />
          </NuxtFormField>

          <NuxtFormField
            v-if="accountOwnership === 'joint'"
            name="jointOwnershipRole"
            label="Role"
            description="Enter your specific role"
          >
            <NuxtSelect
              v-model="state.jointOwnershipRole"
              :items="accountRoles"
              size="lg"
              class="w-full"
            />
          </NuxtFormField>

          <NuxtFormField
            v-if="accountOwnership === 'joint'"
            name="jointOwnership"
            label="Ownership"
            description="The percentage of this account you own"
          >
            <NuxtInputNumber
              v-model="state.jointOwnership"
              :min="1"
              :max="100"
              size="lg"
              class="w-full"
            />
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
      </NuxtCard>
    </div>
  </div>
</template>
