<script setup lang="ts">
import type { KycStatus } from "~~/server/generated/prisma/enums";
import normalizeException from "~~/shared/helpers/normalize-exception";

const toast = useToast();

export interface SelectedProfile {
  id: string;
  fullName: string;
  image: string | null;
  kycStatus: KycStatus | null;
}
interface Props {
  profile: SelectedProfile;
}

const { profile } = defineProps<Props>();
const emit = defineEmits<{
  done: [];
}>();

const state = ref(profile.kycStatus ?? "pending");
const open = defineModel<boolean>("open", { default: false });
const items: KycStatus[] = ["pending", "rejected", "resubmit", "verified"];

const handleSubmit = async () => {
  try {
    const { message } = await $fetch(`/api/admin/kyc-data/${profile.id}`, {
      method: "PUT",
      body: { status: state.value }
    });
    toast.add({
      color: "success",
      title: "Success",
      description: message
    });
    open.value = false;
    emit("done");
  } catch (error) {
    toast.add({
      color: "error",
      title: "Error",
      description: normalizeException(error).message
    });
  }
};
</script>

<template>
  <NuxtModal v-model:open="open" title="Update KYC Status" :dismissible="false">
    <template #body>
      <div>
        <div class="space-y-5">
          <div class="flex-col-center gap-2">
            <NuxtAvatar
              :src="profile.image ?? undefined"
              :alt="profile.fullName"
              size="3xl"
            />
            <p class="text-center font-semibold">{{ profile.fullName }}</p>
          </div>

          <div v-if="profile.kycStatus" class="space-y-5">
            <NuxtFormField label="Kyc Status">
              <NuxtSelect v-model="state" :items class="w-full" />
            </NuxtFormField>

            <div class="flex items-center justify-end gap-2">
              <NuxtButton
                label="Cancel"
                color="neutral"
                variant="soft"
                @click="open = false"
              />

              <NuxtButton
                label="Submit"
                :disabled="profile.kycStatus === state"
                loading-auto
                @click="handleSubmit"
              />
            </div>
          </div>

          <div v-else>
            <p class="text-center text-muted">
              This user has not uploaded their ID for KYC verification.
            </p>
          </div>
        </div>
      </div>
    </template>
  </NuxtModal>
</template>
