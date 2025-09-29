<script setup lang="ts">
import { useAuthStore } from "~/stores/auth.store";

const config = useRuntimeConfig();

const typewriter = useTemplateRef("typewriter");

useTypewriter(typewriter);

const authStore = useAuthStore();
</script>

<template>
  <div class="grid grid-cols-2 gap-5 px-8 pt-20 items-center">
    <div class="space-y-4">
      <NuxtBadge
        color="neutral"
        variant="subtle"
        icon="lucide:command"
        label="Your best partner for wealth growth"
        class="rounded-full py-1.5 px-3"
      />

      <div class="h-60 grid items-end">
        <h1
          ref="typewriter"
          :data-text="`Grow your wealth with expert-managed investments. | Choose your investment. We handle the rest. | Multiply your assets with our solid investment plans. | Everything made ridiculously easy with ${config.public.appName}.`"
          class="text-6xl"
        >
          Grow your wealth with expert-managed investments.
        </h1>
      </div>

      <p class="text-slate-300">
        {{ config.public.appName }} lets you pick from curated investment
        opportunities. You choose where to put your money — we do the work, and
        you enjoy the returns.
      </p>

      <div class="flex items-center gap-4 text-white">
        <NuxtButton
          v-if="!authStore.user.value"
          to="/sign-in"
          icon="lucide:rocket"
          label="Get Started"
          size="lg"
          class="rounded-full text-white"
        />

        <NuxtButton
          v-else
          icon="lucide:rocket"
          :label="`Continue on ${config.public.appName}`"
          size="lg"
          class="rounded-full text-white"
          @click="() => navigateToDashboard(authStore.user.value?.role)"
        />

        <NuxtButton
          to="/about/story"
          icon="lucide:message-circle-question"
          label="About Us"
          size="lg"
          variant="link"
        />
      </div>
    </div>
    <div class="grid">
      <img src="/img/buildings.gif" class="rounded-2xl" />
    </div>
  </div>
</template>
