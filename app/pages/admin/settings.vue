<script setup lang="ts">
import type { BreadcrumbItem, FormSubmitEvent } from "@nuxt/ui";
import type { Settings } from "~~/server/generated/prisma/client";
import { SettingsSchema } from "~~/shared/zod";
import type { z } from "zod";
import normalizeException from "~~/shared/helpers/normalize-exception";

definePageMeta({
  layout: "user",
  breadcrumb: [
    {
      label: "Settings"
    }
  ] as BreadcrumbItem[]
});

const toast = useToast();

const { data, error, refresh } = await useFetch("/api/settings");

const initial = computed<Partial<Settings>>(() => ({ ...data.value }));

const state = reactive<Partial<Settings>>({
  ...initial.value
});

const hasChanged = computed(() => {
  return JSON.stringify(initial.value) !== JSON.stringify(state);
});

const handleSubmit = async (
  event: FormSubmitEvent<z.infer<typeof SettingsSchema>>
) => {
  try {
    const { message } = await $fetch("/api/admin/settings", {
      method: "PUT",
      body: event.data
    });
    await refresh();
    toast.add({ color: "success", title: "Success", description: message });
  } catch (err) {
    toast.add({
      color: "error",
      title: "Error",
      description: normalizeException(err).message
    });
  }
};
</script>

<template>
  <MyPage :error @refresh="() => refresh()">
    <div>
      <div class="flex items-center justify-between">
        <h1 class="text-3xl font-semibold">Settings</h1>
      </div>

      <section class="mt-5">
        <NuxtForm
          :state
          :schema="SettingsSchema"
          class="space-y-5"
          @submit.prevent="handleSubmit"
        >
          <div class="fixed top-20 right-5">
            <NuxtButton
              type="submit"
              label="Save"
              icon="lucide:save"
              :disabled="!hasChanged"
              loading-auto
            />
          </div>

          <NuxtCard>
            <NuxtFormField name="allowWithdrawals">
              <div class="flex items-center gap-5 justify-between">
                <div>
                  <p class="font-semibold">Allow Withdrawals</p>
                  <p class="text-muted">
                    Enable or disable withdrawals across the platform.
                  </p>
                </div>

                <NuxtSwitch v-model="state.allowWithdrawals" />
              </div>
            </NuxtFormField>
          </NuxtCard>
        </NuxtForm>
      </section>
    </div>
  </MyPage>
</template>
