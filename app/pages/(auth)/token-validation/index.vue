<script setup lang="ts">
definePageMeta({
  layout: "auth",
});

const route = useRoute();

const error = route.query.error?.toString();
</script>

<template>
  <div>
    <h1 class="text-lg font-semibold">Token Validation</h1>

    <div class="my-5">
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
                navigateTo({ name: 'sign-in' });
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
          description="Your account has been verified successfully."
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
  </div>
</template>
