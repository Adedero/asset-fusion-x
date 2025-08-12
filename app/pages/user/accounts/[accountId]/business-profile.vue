<script setup lang="ts">
import months from "~/data/months";
import { BusinessProfileSchema } from "~~/shared/schemas";
import type { BusinessProfileSchemaType } from "~~/shared/schemas";
import type { FormSubmitEvent } from "@nuxt/ui";
import type { CustomFile } from "~/components/nuxt/simple-file-input.vue";
import normalizeException from "~~/shared/helpers/normalize-exception";

const accountId = useRouteData().getParams("accountId");

const toast = useToast();

const { data, error, refresh } = await useFetch(
  `/api/user/financial-accounts/${accountId}/business-profile`,
  {
    key: "financial-account-business-profile",
  },
);

const state = reactive<BusinessProfileSchemaType>({
  address: data.value?.profile?.address ?? "",
  creationMonth: data.value?.profile?.creationMonth ?? "January",
  creationYear: data.value?.profile?.creationYear ?? new Date().getFullYear(),
});

const documents = reactive<{
  proofOfAddress: CustomFile[];
  certificate: CustomFile[];
}>({
  proofOfAddress: [],
  certificate: [],
});

const handleSubmit = async (
  event: FormSubmitEvent<BusinessProfileSchemaType>,
) => {
  await upload(event.data);
};

const uploading = ref<boolean>(false);
const uploadError = ref<Error | null>(null);

async function upload(validatedData?: BusinessProfileSchemaType) {
  const payload = {
    ...validatedData,
    proofOfAddress:
      data.value?.profile?.proofOfAddress || documents.proofOfAddress[0]?.url,
    proofOfAddressExt:
      data.value?.profile?.proofOfAddressExt ||
      documents.proofOfAddress[0]?.ext,
    certificate:
      data.value?.profile?.certificate || documents.certificate[0]?.url,
    certificateExt:
      data.value?.profile?.certificateExt || documents.certificate[0]?.ext,
  };
  uploadError.value = null;
  uploading.value = true;
  try {
    await $fetch(`/api/user/financial-accounts/${accountId}/business-profile`, {
      method: "PUT",
      body: payload,
    });

    refresh();

    documents.proofOfAddress = [];
    documents.certificate = [];

    toast.add({
      color: "success",
      title: "Success",
      description: "Business profile updated successfully.",
    });
  } catch (err) {
    uploadError.value = normalizeException(err);
  } finally {
    uploading.value = false;
  }
}

async function uploadDocuments() {
  await upload();
}
</script>

<template>
  <MyPage :error @retry="refresh()">
    <div v-if="data" class="flex justify-center fluid pb-4">
      <div class="md:w-96">
        <NuxtAlert
          v-if="data.profile && !data.profile.approved"
          class="mb-4"
          variant="subtle"
          title="Approval status"
          description="Your business profile is awaiting approval."
        />

        <NuxtAlert
          v-if="data.profile && data.profile.approved"
          class="mb-4"
          variant="subtle"
          title="Approval status"
          description="Your business profile has been approved."
        />

        <FetchErrorAlert
          v-if="uploadError"
          :title="uploadError.name"
          :message="uploadError.message"
          class="mb-4"
        />

        <NuxtForm
          :state
          :schema="BusinessProfileSchema"
          class="grid gap-4 md:grid-cols-2"
          @submit.prevent="handleSubmit"
        >
          <h3 class="text-2xl font-medium">Business Info</h3>

          <NuxtFormField
            name="address"
            label="Business address"
            class="w-full md:col-span-2"
          >
            <NuxtInput v-model="state.address" size="lg" class="w-full" />
          </NuxtFormField>

          <NuxtFormField
            name="creationMonth"
            label="Month of creation"
            class="w-full"
          >
            <NuxtSelectMenu
              v-model="state.creationMonth"
              :items="months.map((month) => month.long)"
              size="lg"
              class="w-full"
            />
          </NuxtFormField>

          <NuxtFormField
            name="creationYear"
            label="Year of creation"
            class="w-full"
          >
            <NuxtInputNumber
              v-model="state.creationYear"
              :min="1000"
              :max="new Date().getFullYear()"
              :format-options="{
                useGrouping: false,
              }"
              size="lg"
              class="w-full"
            />
          </NuxtFormField>

          <div>
            <NuxtButton
              type="submit"
              size="lg"
              icon="lucide-circle-check"
              label="Submit"
              loading-auto
            />
          </div>
        </NuxtForm>

        <NuxtSeparator class="my-8" />

        <div class="grid gap-4">
          <h3 class="text-2xl font-medium">Documents</h3>

          <div
            v-if="data.profile?.proofOfAddress || data.profile?.certificate"
            class="flex flex-wrap gap-2 justify-end"
          >
            <a
              v-if="data.profile?.proofOfAddress"
              :href="data.profile.proofOfAddress"
              :download="`${accountId}-PROOF_OF_ADDRESS.${data.profile?.proofOfAddressExt}`"
            >
              <NuxtButton
                label="Proof of address"
                icon="lucide-download"
                size="sm"
                color="neutral"
                variant="outline"
              />
            </a>

            <a
              v-if="data.profile?.certificate"
              :href="data.profile.certificate"
              :download="`${accountId}-BUSINESS_CERTIFICATE.${data.profile?.certificateExt}`"
            >
              <NuxtButton
                label="Certificate"
                icon="lucide-download"
                size="sm"
                color="neutral"
                variant="outline"
              />
            </a>
          </div>

          <div v-else>
            <NuxtAlert
              class="mb-4"
              color="warning"
              variant="subtle"
              description="No documents submitted yet. Upload your documents to complete your business profile."
            />
          </div>

          <NuxtSimpleFileInput
            v-model="documents.proofOfAddress"
            label="Proof of address"
            description="Image or PDF files not more than 2MB"
            class="w-full"
            input-class="w-full"
            :accept="['image/*', 'application/pdf']"
            :max-file-size="2 * 1024 * 1024"
            :force-constraints="true"
          />

          <NuxtSimpleFileInput
            v-model="documents.certificate"
            label="Business certificate"
            description="Image or PDF files not more than 2MB"
            class="w-full"
            input-class="w-full"
            :accept="['image/*', 'application/pdf']"
            :max-file-size="2 * 1024 * 1024"
            :force-constraints="true"
          />

          <div>
            <NuxtButton
              type="submit"
              size="lg"
              icon="lucide-circle-check"
              label="Submit"
              :loading="uploading"
              :disabled="
                !documents.proofOfAddress.length &&
                !documents.certificate.length
              "
              @click="uploadDocuments"
            />
          </div>
        </div>
      </div>
    </div>
  </MyPage>
</template>
