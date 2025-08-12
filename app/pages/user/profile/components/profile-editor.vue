<script setup lang="ts">
import { ProfileSchema } from "~~/shared/schemas";
import type { ProfileSchemaType } from "~~/shared/schemas";
import type { FormSubmitEvent } from "@nuxt/ui";
import countries from "~/data/countries";
import normalizeException from "~~/shared/helpers/normalize-exception";

const toast = useToast();
const open = ref<boolean>(false);

const { data, error, refresh } = await useFetch("/api/user/profile", {
  key: "user-profile",
});

const state = reactive<ProfileSchemaType>({
  address: data.value?.profile?.address || "",
  postalCode: data.value?.profile?.postalCode || "",
  city: data.value?.profile?.city || "",
  state: data.value?.profile?.state || "",
  country: data.value?.profile?.country || "United States",
});

const initialState = ref<string>(JSON.stringify(state));

const disabled = computed(() => initialState.value === JSON.stringify(state));

const formattedCountries = countries.map((country) => country.name);

async function onSubmit(event: FormSubmitEvent<ProfileSchemaType>) {
  try {
    const data = await $fetch("/api/user/profile", {
      method: "PUT",
      body: event.data,
      headers: {
        "Content-Type": "application/json",
      },
    });

    state.address = data.profile.address ?? "";
    state.postalCode = data.profile.postalCode ?? "";
    state.city = data.profile.city ?? "";
    state.state = data.profile.state ?? "";
    state.country = data.profile.country ?? "";

    initialState.value = JSON.stringify(state);

    if (!data.profile.kycStatus) {
      open.value = true;
    }

    refresh();
  } catch (err) {
    error.value = normalizeException(err);
    toast.add({
      title: "Error",
      description: error.value.message || "Failed to update profile",
      color: "error",
    });
  }
}
</script>

<template>
  <MyPage :error @retry="refresh()">
    <NuxtForm
      :schema="ProfileSchema"
      :state="state"
      class="grid gap-3 md:grid-cols-2 w-full"
      @submit.prevent="onSubmit"
    >
      <NuxtFormField label="Address" name="address" class="col-span-2">
        <NuxtInput v-model="state.address" size="lg" class="w-full" />
      </NuxtFormField>

      <NuxtFormField label="Post code" name="postalCode">
        <NuxtInput v-model="state.postalCode" size="lg" class="w-full" />
      </NuxtFormField>

      <NuxtFormField label="City" name="city">
        <NuxtInput v-model="state.city" size="lg" class="w-full" />
      </NuxtFormField>

      <NuxtFormField label="State/Region" name="state">
        <NuxtInput v-model="state.state" size="lg" class="w-full" />
      </NuxtFormField>

      <NuxtFormField label="Country" name="country">
        <NuxtSelectMenu
          v-model="state.country"
          :items="formattedCountries"
          size="lg"
          class="w-full"
        />
      </NuxtFormField>

      <NuxtButton
        type="submit"
        class="mt-2 w-full flex-center"
        size="lg"
        icon="i-lucide-check-circle"
        :disabled
        loading-auto
      >
        Submit
      </NuxtButton>
    </NuxtForm>

    <NuxtModal
      v-model:open="open"
      title="KYC Verification"
      class="max-w-[32rem]"
    >
      <template #body>
        <div>
          <p>Your profile has been updated.</p>
          <p>
            Do you want to proceed with the KYC verification? You need to
            complete this step to open an account
          </p>
        </div>
      </template>

      <template #footer>
        <div class="w-full flex items-center justify-end gap-2">
          <NuxtButton
            label="Cancel"
            color="neutral"
            variant="outline"
            @click="open = false"
          />
          <NuxtButton label="Proceed" to="/user/profile/kyc" />
        </div>
      </template>
    </NuxtModal>
  </MyPage>
</template>
