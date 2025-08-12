<script setup lang="ts">
import type { BreadcrumbItem } from "@nuxt/ui";
import ImageChanger from "../components/image-changer.vue";
import NameChanger from "../components/name-changer.vue";
import ProfileEditor from "../components/profile-editor.vue";

definePageMeta({
  layout: "user",
  name: "",
  breadcrumb: [
    {
      label: "Profile",
    },
  ] as BreadcrumbItem[],
});
</script>

<template>
  <div class="h-full flex flex-col md:flex-row items-start gap-4 p-0.5">
    <!-- Name, image, and email -->
    <div class="w-full shrink-0 md:w-80 space-y-4">
      <NuxtCard>
        <div>
          <ImageChanger />

          <small class="block text-center mt-1">Click to edit</small>
        </div>
      </NuxtCard>

      <NuxtCard>
        <div class="w-full flex-col-center md:block">
          <NameChanger />
        </div>
      </NuxtCard>
    </div>

    <NuxtCard class="w-full">
      <template #header>
        <p class="card-title">Profile</p>
      </template>
      <div class="w-full">
        <ProfileEditor />
      </div>
    </NuxtCard>
  </div>
</template>
