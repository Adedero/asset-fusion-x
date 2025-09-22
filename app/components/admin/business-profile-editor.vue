<script setup lang="ts">
import type { BusinessProfile } from "~/pages/admin/business-profile.vue";
import normalizeException from "~~/shared/helpers/normalize-exception";

const toast = useToast();

const { profile } = defineProps<{
  profile: BusinessProfile;
}>();

const emit = defineEmits<{
  done: [];
}>();

const open = defineModel<boolean>("open", { default: false });
const approvalStatus = ref<string>(
  profile.approved ? "approved" : "not approved"
);
const approved = computed<boolean>(() =>
  approvalStatus.value === "approved" ? true : false
);

const handleProfileUpdate = async () => {
  try {
    const { message } = await $fetch(
      `/api/admin/business-profiles/${profile.id}`,
      {
        method: "PUT",
        body: { approved: approved.value }
      }
    );
    emit("done");
    toast.add({
      color: "success",
      title: "Success",
      description: message
    });
    open.value = false;
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
  <NuxtModal
    v-model:open="open"
    title="Edit Business Profile"
    :dismissible="false"
  >
    <template #body>
      <div>
        <div class="grid md:grid-cols-2 gap-2.5">
          <NuxtFormField label="Business name">
            <NuxtInput
              readonly
              :value="profile.financialAccountName"
              class="w-full"
            />
          </NuxtFormField>

          <NuxtFormField label="Business Created On">
            <NuxtInput
              readonly
              :value="`${profile.creationMonth}, ${profile.creationYear}`"
              class="w-full"
            />
          </NuxtFormField>

          <NuxtFormField label="Address" class="md:col-span-2">
            <NuxtInput readonly :value="profile.address" class="w-full" />
          </NuxtFormField>
        </div>

        <NuxtSeparator class="my-5" />

        <div>
          <p class="font-semibold text-sm">Documents</p>

          <div class="mt-2.5 grid gap-2.5 md:grid-cols-2">
            <NuxtFormField label="Business Certificate">
              <a
                v-if="profile.certificate"
                :href="profile.certificate"
                download
              >
                <NuxtButton
                  label="Download"
                  trailing-icon="lucide:download"
                  color="neutral"
                  variant="subtle"
                  block
                  class="pointer-none"
                />
              </a>

              <p v-else class="text-error-500">Not submitted</p>
            </NuxtFormField>

            <NuxtFormField label="Proof of Address">
              <a
                v-if="profile.proofOfAddress"
                :href="profile.proofOfAddress"
                download
              >
                <NuxtButton
                  label="Download"
                  trailing-icon="lucide:download"
                  color="neutral"
                  variant="subtle"
                  block
                  class="pointer-none"
                />
              </a>

              <p v-else class="text-error-500">Not submitted</p>
            </NuxtFormField>
          </div>
        </div>

        <NuxtSeparator class="my-5" />

        <div>
          <p class="font-semibold text-sm">Business Aproval</p>

          <div class="mt-2.5 grid gap-2.5">
            <NuxtFormField label="Approve Business Profile">
              <NuxtSelect
                v-model="approvalStatus"
                :items="['approved', 'not approved']"
                class="w-full"
              />
            </NuxtFormField>

            <div class="flex items-center gap-2 justify-end">
              <NuxtButton
                label="Cancel"
                color="neutral"
                variant="soft"
                @click="open = false"
              />
              <NuxtButton
                label="Submit"
                :disabled="approved === profile.approved"
                loading-auto
                @click="handleProfileUpdate"
              />
            </div>
          </div>
        </div>
      </div>
    </template>
  </NuxtModal>
</template>
