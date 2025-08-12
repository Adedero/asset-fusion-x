<script setup lang="ts">
interface Props {
  accountCount?: number;
}

const { accountCount = 0 } = defineProps<Props>();

const runtimeConfig = useRuntimeConfig();

const open = ref<boolean>(false);

const { data, error, pending, execute } = useFetch("/api/user/profile", {
  key: "user-profile",
  immediate: false,
});

async function openAccount() {
  if (accountCount && accountCount === runtimeConfig.public.maxAccounts) {
    error.value = new Error(
      `You cannot create more than ${runtimeConfig.public.maxAccounts} accounts.`
    );
    error.value.name = "Max accounts reached";
    open.value = true;
    return;
  }

  await execute();

  if (data.value?.profile?.kycStatus === "verified") {
    await navigateTo({ name: "user-accounts-open" });
    return;
  }

  open.value = true;
}
</script>

<template>
  <div>
    <div class="w-fit cursor-pointer" @click="openAccount">
      <slot :loading="pending">
        <NuxtButton
          label="Open an account"
          icon="i-lucide-plus"
          color="neutral"
          variant="outline"
          :loading="pending" />
      </slot>
    </div>

    <NuxtModal
      v-model:open="open"
      title="Account Opening Request"
      class="max-w-[28rem]">
      <template #body>
        <div>
          <div v-if="error">
            <FetchErrorAlert
              :title="error?.name"
              :message="error?.message"
              should-retry
              @retry="execute()" />
          </div>

          <div v-else-if="!data?.profile" class="space-y-4">
            <p>To create an account, you need to update your profile.</p>
            <div class="flex justify-end">
              <NuxtButton
                to="/user/profile"
                label="Update profile"
                color="neutral"
                variant="outline" />
            </div>
          </div>

          <div v-else>
            <div v-if="!data.profile.kycStatus" class="space-y-4">
              <p>
                Sorry, you cannot open an account at this time because your KYC
                data has not been submitted.
              </p>

              <div class="flex justify-end">
                <NuxtButton
                  to="/user/profile/kyc"
                  label="Submit KYC data"
                  color="neutral"
                  variant="outline" />
              </div>
            </div>

            <div v-else-if="data.profile.kycStatus === 'pending'">
              Sorry, you cannot open an account at this time because your KYC
              document is still being verified. Try again later
            </div>

            <div
              v-else-if="data.profile.kycStatus === 'rejected'"
              class="space-y-4">
              <p>
                Sorry, you cannot open an account at this time because your KYC
                data has been rejected. Please contact us to know more.
              </p>

              <div class="flex justify-end">
                <NuxtButton
                  to="/user/contact"
                  label="Contact us"
                  color="neutral"
                  variant="outline" />
              </div>
            </div>

            <div
              v-else-if="data.profile.kycStatus === 'resubmit'"
              class="space-y-4">
              <p>
                Sorry, you cannot open an account at this time because your KYC
                data needs to be resubmitted.
              </p>

              <div class="flex justify-end">
                <NuxtButton
                  to="/user/profile/kyc"
                  label="Resubmit KYC data"
                  color="neutral"
                  variant="outline" />
              </div>
            </div>
          </div>
        </div>
      </template>
    </NuxtModal>
  </div>
</template>
