<script setup lang="ts">
import type { NuxtError } from "#app";

const { error } = defineProps<{
  error: NuxtError;
}>();

const message = computed(
  () => error.statusMessage || error.message || "An unexpected error occurred"
);

const handleClearError = () => clearError({ redirect: "/" });
</script>

<template>
  <div class="w-full min-h-screen flex-center bg-default">
    <div class="max-w-[28rem] w-full px-6 text-center space-y-4">
      <p class="text-6xl font-bold text-muted">{{ error.statusCode }}</p>
      <p class="text-lg">{{ message }}</p>
      <NuxtButton
        label="Go to homepage"
        icon="lucide:house"
        @click="handleClearError"
      />
    </div>
  </div>
</template>
