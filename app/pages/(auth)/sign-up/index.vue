<script setup lang="ts">
import { NuxtLink } from "#components";
import SignUpForm from "./sign-up-form.vue";

definePageMeta({
  layout: "auth",
});

const runtimeConfig = useRuntimeConfig();
</script>

<template>
  <div>
    <h1 class="text-lg font-semibold">Sign Up</h1>
    <div class="text-sm text-muted">
      Already got an account?
      <NuxtLink
        class="text-primary font-semibold hover:underline"
        :to="{ name: 'sign-in' }"
      >
        Sign in
      </NuxtLink>
      instead.
    </div>

    <div class="my-5">
      <SignUpForm />
    </div>

    <div>
      <NuxtSeparator class="my-5" />
      <p class="text-xs text-muted">
        By creating an account with {{ runtimeConfig.public.appName }}, you
        admit to having read and agreed to our
        <NuxtLink
          class="font-medium text-primary hover:underline"
          target="_blank"
          to="/legal/terms-of-use"
        >
          terms of use
        </NuxtLink>
        and
        <NuxtLink
          class="font-medium text-primary hover:underline"
          target="_blank"
          to="/legal/privacy-policy"
        >
          privacy policy
        </NuxtLink>
      </p>
    </div>
  </div>
</template>
