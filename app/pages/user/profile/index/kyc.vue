<script setup lang="ts">
import type { BreadcrumbItem } from "@nuxt/ui";
import normalizeException from "~~/shared/helpers/normalize-exception";

definePageMeta({
  layout: "user",
  breadcrumb: [
    {
      label: "Profile",
      to: "/user/profile",
    },
    {
      label: "KYC",
    },
  ] as BreadcrumbItem[],
});

const toast = useToast();

const { data, error, refresh } = await useFetch("/api/user/profile", {
  key: "user-profile",
});

const idTypes = ["International passport", "National ID", "Driving license"];

const state = reactive({
  governmentId: "",
  governmentIdType: "",
  governmentIdExt: "",
});

const uploadError = ref<Error | null>(null);
const uploading = ref<boolean>(false);

async function updateKyc() {
  // Validate all fields are non-empty
  const emptyKey = Object.keys(state).find(
    (key) => !(state as Record<string, string>)[key]?.length,
  );

  if (emptyKey) {
    uploadError.value = new Error(`Missing required field: ${emptyKey}`);
    return;
  }

  // Convert user-friendly label to enum-friendly value
  const governmentIdType = state.governmentIdType
    .toLowerCase()
    .replace(/\s+/g, "_");

  uploading.value = true;
  uploadError.value = null;

  try {
    await $fetch("/api/user/profile/kyc", {
      method: "PUT",
      body: { ...state, governmentIdType },
      headers: {
        "Content-Type": "application/json",
      },
    });

    await refresh();
  } catch (err) {
    uploadError.value = normalizeException(err);
  } finally {
    uploading.value = false;
  }
}

function onFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (!file) return;
  if (!file.type.startsWith("image/") && file.type !== "application/pdf") {
    toast.add({
      title: "Invalid file type",
      description: "Please select an image or a PDF file.",
      color: "error",
    });
    return;
  }

  //Check file size. file should not be more than 2mb
  if (file.size > 2 * 1024 * 1024) {
    toast.add({
      title: "File too large",
      description: "Please select an image file smaller than 2MB.",
      color: "error",
    });
    return;
  }

  state.governmentIdExt = file.name.split(".").pop()?.toLowerCase() || "";

  const reader = new FileReader();
  reader.onload = () => {
    state.governmentId = reader.result as string;
  };
  reader.readAsDataURL(file);
}

function downloadDocument() {
  if (!data.value?.profile?.governmentId) return;
  const link = document.createElement("a");
  link.style.display = "none";
  link.style.position = "absolute";
  link.href = data.value.profile.governmentId;
  link.download = `USER_ID.${data.value.profile.governmentIdExt}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
</script>

<template>
  <MyPage :error @retry="refresh()">
    <div v-if="data">
      <div v-if="!data.profile" class="fluid flex-center">
        <NuxtCard>
          <NuxtAlert
            title="KYC Verification"
            description="Please update your profile to continue"
            icon="i-lucide-alert-circle"
            class="md:w-[30rem]"
            variant="subtle"
            :ui="{
              actions: 'justify-end',
            }"
            :actions="[
              {
                label: 'Proceed',
                size: 'md',
                onClick: () => {
                  navigateTo('/user/profile');
                },
              },
            ]"
          />
        </NuxtCard>
      </div>

      <div v-else-if="!data.profile.kycStatus" class="fluid flex-center">
        <NuxtCard class="max-w-[30rem]">
          <template #header>
            <p class="card-title">Upload a valid government-issued ID</p>
          </template>

          <div class="space-y-4">
            <FetchErrorAlert
              v-if="uploadError"
              :title="uploadError.name"
              :message="uploadError.message"
            />

            <div class="space-y-4">
              <NuxtSelect
                v-model="state.governmentIdType"
                :items="idTypes"
                size="lg"
                placeholder="Select ID type"
                class="w-full"
              />

              <NuxtInput
                type="file"
                size="lg"
                class="w-full"
                accept="image/*,.pdf"
                @change="onFileChange"
              />

              <NuxtButton
                size="lg"
                label="Submit"
                icon="i-lucide-check-circle"
                :loading="uploading"
                @click="updateKyc"
              />
            </div>

            <div>
              <NuxtAlert
                :ui="{ description: 'text-xs' }"
                variant="soft"
                description="Uploaded ID must be in image or PDF format and should not exceed 2MB"
              />
            </div>
          </div>
        </NuxtCard>
      </div>

      <div
        v-else-if="data.profile.kycStatus === 'pending'"
        class="fluid flex-center"
      >
        <NuxtCard class="max-w-[30rem]">
          <NuxtAlert
            title="KYC Verification"
            description="Your data is still being validated. Check again later."
            icon="i-lucide-alert-circle"
            variant="subtle"
            :ui="{
              actions: 'justify-end',
            }"
            :actions="[
              {
                label: 'Donwload',
                size: 'md',
                onClick: () => {
                  downloadDocument();
                },
              },
            ]"
          />
        </NuxtCard>
      </div>

      <div
        v-else-if="data.profile.kycStatus === 'rejected'"
        class="fluid flex-center"
      >
        <NuxtCard class="max-w-[30rem]">
          <NuxtAlert
            title="KYC Verification"
            description="Your KYC data has been rejected. Please contact us for more information."
            icon="i-lucide-alert-triangle"
            color="error"
            variant="subtle"
            :ui="{
              actions: 'justify-end',
            }"
            :actions="[
              {
                label: 'Contact us',
                size: 'md',
                color: 'error',
                onClick: () => {
                  navigateTo('/user/contact');
                },
              },
            ]"
          />
        </NuxtCard>
      </div>

      <div
        v-else-if="data.profile.kycStatus === 'resubmit'"
        class="fluid flex-center"
      >
        <NuxtCard class="max-w-[30rem]">
          <template #header>
            <p class="card-title">Upload a valid government-issued ID</p>
          </template>

          <div class="space-y-4">
            <FetchErrorAlert
              v-if="uploadError"
              :title="uploadError.name"
              :message="uploadError.message"
            />

            <div class="space-y-4">
              <NuxtSelect
                v-model="state.governmentIdType"
                :items="idTypes"
                size="lg"
                placeholder="Select ID type"
                class="w-full"
              />

              <NuxtInput
                type="file"
                size="lg"
                class="w-full"
                accept="image/*,.pdf"
                @change="onFileChange"
              />

              <NuxtButton
                size="lg"
                label="Submit"
                icon="i-lucide-check-circle"
                :loading="uploading"
                @click="updateKyc"
              />
            </div>

            <div>
              <NuxtAlert
                :ui="{ description: 'text-xs' }"
                variant="soft"
                description="Uploaded ID must be in image or PDF format and should not exceed 2MB"
              />
            </div>
          </div>

          <template #footer>
            <NuxtAlert
              title="KYC Verification"
              description="We could not complete your verification. Please resubmit your data."
              icon="i-lucide-alert-circle"
              variant="subtle"
              color="error"
            />
          </template>
        </NuxtCard>
      </div>

      <div
        v-else-if="data.profile.kycStatus === 'verified'"
        class="fluid flex-center"
      >
        <NuxtCard class="md:w-[30rem]">
          <NuxtAlert
            title="KYC Verification"
            description="Your data has been verified."
            icon="i-lucide-alert-circle"
            variant="subtle"
            :ui="{
              actions: 'justify-end',
            }"
            :actions="[
              {
                label: 'Donwload',
                size: 'md',
                onClick: () => {
                  downloadDocument();
                },
              },
            ]"
          />
        </NuxtCard>
      </div>
    </div>
  </MyPage>
</template>
