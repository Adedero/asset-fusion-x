<script setup lang="ts">
import type { BreadcrumbItem } from "@nuxt/ui";

definePageMeta({
  layout: "user",
  breadcrumb: [
    {
      label: "Change email",
      to: "/change-email",
    },
    {
      label: "Verification",
    },
  ] as BreadcrumbItem[],
});

const route = useRoute();

const error = route.query.error?.toString();
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

        <div>
          <div v-if="error">
            <NuxtAlert
              color="error"
              variant="subtle"
              icon="lucide-circle-x"
              title="Validation Failed"
              description="Invalid or expired token. Please, try again later."
              orientation="horizontal"
              :actions="[
                {
                  label: 'Retry',
                  icon: 'lucide-refresh-cw',
                  onClick: () => {
                    navigateTo({ name: 'user-change-email' });
                  },
                  color: 'error',
                  class: 'py-2',
                },
              ]"
            />
          </div>

          <div v-else>
            <NuxtAlert
              variant="subtle"
              icon="lucide-check-circle"
              title="Validation Successful"
              description="Your email has been changed successfully."
              orientation="horizontal"
              :actions="[
                {
                  label: 'Continue',
                  trailingIcon: 'lucide-circle-arrow-right',
                  onClick: () => {
                    navigateTo({ name: 'sign-in' });
                  },
                  class: 'py-2',
                },
              ]"
            />
          </div>
        </div>
      </template>
    </NuxtCard>
  </div>
</template>
