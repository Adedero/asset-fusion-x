<script setup lang="ts">
import type { BreadcrumbItem } from "@nuxt/ui";

definePageMeta({
  layout: "user",
  breadcrumb: [
    {
      label: "Accounts",
      to: "/user/accounts",
    },
    {
      label: "Open",
    },
  ] as BreadcrumbItem[],
});
</script>

<template>
  <div class="fluid flex-center">
    <div class="flex-col-center gap-4">
      <p class="card-title">Select your account type.</p>
      <div class="grid sm:grid-cols-2 w-full gap-4">
        <NuxtLink to="/user/accounts/open/personal">
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
                Personal
              </p>
            </div>

            <template #footer>
              <small class="block text-center"
                >Open an account for yourself.</small
              >
            </template>
          </NuxtCard>
        </NuxtLink>

        <NuxtLink to="/user/accounts/open/business">
          <NuxtCard
            class="cursor-pointer group hover:shadow-md transition-shadow"
          >
            <div class="flex-col-center gap-4">
              <div
                class="text-muted text-4xl p-3 rounded-full border-2 border-muted aspect-square flex-center transition-colors group-hover:text-primary group-hover:border-primary"
              >
                <NuxtIcon name="lucide:briefcase-business" />
              </div>
              <p
                class="text-medium text-muted transition-colors group-hover:text-primary"
              >
                Business
              </p>
            </div>

            <template #footer>
              <small class="block text-center"
                >Open an account for your business.</small
              >
            </template>
          </NuxtCard>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
