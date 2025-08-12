<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import z from "zod";
import normalizeException from "~~/shared/helpers/normalize-exception";

const accountId = useRouteData().getParams("accountId");
const injected = ref(
  inject<{
    accountName: string;
    refreshAccount: () => Promise<void>;
  }>("currentAccount", { accountName: "", refreshAccount: async () => {} }),
);

const toast = useToast();

const schema = z.object({
  accountName: z
    .string("Account name is required")
    .nonempty("Account name is required")
    .refine((value) => {
      return value !== injected.value.accountName;
    }, "Account name not changed"),
});

type Schema = z.infer<typeof schema>;

const state = reactive<Schema>({
  accountName: "",
});

const handleSubmit = async (event: FormSubmitEvent<Schema>) => {
  const { accountName } = event.data;
  try {
    await $fetch(`/api/user/financial-accounts/${accountId}`, {
      method: "put",
      body: { name: accountName },
    });
    toast.add({
      color: "success",
      title: "Success",
      description: "Account name changed successfully",
    });
    injected.value.accountName = accountName;
    injected.value.refreshAccount();
  } catch (error) {
    toast.add({
      color: "error",
      title: "Error",
      description: normalizeException(error).message,
    });
  }
};

/* const toggling = ref<boolean>(false);
const autosign = ref<boolean>()
const toggleAutosign = async (value: boolean) => {
  toggling.value = true;
  try {
    console.log(value)
  } catch (error) {
     toast.add({
      color: "error",
      title: "Error",
      description: normalizeException(error).message,
    });
  } finally {
    toggling.value = false;
  }
} */
</script>

<template>
  <div class="space-y-4">
    <NuxtCard>
      <NuxtForm :state :schema @submit.prevent="handleSubmit">
        <NuxtFormField
          label="Change account name"
          :description="`Current account name: ${injected.accountName}`"
          name="accountName"
        >
          <NuxtButtonGroup class="w-full">
            <NuxtInput v-model="state.accountName" class="flex-1" />

            <NuxtButton
              type="submit"
              label="Submit"
              icon="i-lucide-circle-check"
              loading-auto
            />
          </NuxtButtonGroup>
        </NuxtFormField>
      </NuxtForm>
    </NuxtCard>

    <!-- <NuxtCard>
      <div class="flex items-center gap-4 justify-between">
        <div>
          <p class="card-title">Auto-signing</p>
          <p class="text-xs text-muted">
            If this is enabled, your digital signature will automatically be
            added in the transactions made by other joint account partners.
          </p>
        </div>

        <NuxtSwitch v-model="autosign" :loading="toggling" @change="toggleAutosign" />
      </div>
    </NuxtCard> -->
  </div>
</template>
