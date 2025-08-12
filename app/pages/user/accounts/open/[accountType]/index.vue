<script setup lang="ts">
import type { BreadcrumbItem } from "@nuxt/ui";

const route = useRoute();
const accountType = route.params?.accountType?.toString();

definePageMeta({
  layout: "user",
  breadcrumb: [
    {
      label: "Accounts",
      to: "/user/accounts",
    },
    {
      label: "Open",
      to: "/user/accounts/open",
    },
    {
      label: "Account type",
    },
  ] as BreadcrumbItem[],
});

onMounted(async () => {
  if (accountType !== "personal" && accountType !== "business") {
    await navigateTo("/users/accounts/open");
    return;
  }
});
</script>

<template>
  <div class="fluid flex-center">
    <div class="flex-col-center gap-4">
      <h1 class="text-4xl font-semibold">
        {{ toCase(accountType ?? "", "sentence") }} Account
      </h1>
      <p class="card-title">Select your account ownership type.</p>
      <div class="grid sm:grid-cols-2 w-full gap-4">
        <NuxtLink :to="`/user/accounts/open/${accountType}/single`">
          <NuxtCard
            class="cursor-pointer group hover:shadow-md transition-shadow"
          >
            <div class="flex-col-center gap-4">
              <div
                class="text-muted text-4xl p-3 rounded-full border-2 border-muted aspect-square flex-center transition-colors group-hover:text-primary group-hover:border-primary"
              >
                <NuxtIcon name="lucide:user" />
              </div>
              <p
                class="text-medium text-muted transition-colors group-hover:text-primary"
              >
                Single
              </p>
            </div>

            <template #footer>
              <small class="block text-center">
                You are the sole owner of this account.
              </small>
            </template>
          </NuxtCard>
        </NuxtLink>

        <NuxtLink :to="`/user/accounts/open/${accountType}/joint`">
          <NuxtCard
            class="cursor-pointer group hover:shadow-md transition-shadow"
          >
            <div class="flex-col-center gap-4">
              <div
                class="text-muted text-4xl p-3 rounded-full border-2 border-muted aspect-square flex-center transition-colors group-hover:text-primary group-hover:border-primary"
              >
                <NuxtIcon name="lucide:users" />
              </div>
              <p
                class="text-medium text-muted transition-colors group-hover:text-primary"
              >
                Joint
              </p>
            </div>

            <template #footer>
              <small class="block text-center">
                You are one of the owners of this account.
              </small>
            </template>
          </NuxtCard>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
