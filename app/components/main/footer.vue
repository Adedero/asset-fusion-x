<script setup lang="ts">
import mainLinks from "~/data/main/main-links";

const { appName } = useRuntimeConfig().public;

const selectedRoutes = mainLinks.value.slice(0, -1);
</script>

<template>
  <div class="px-8 py-10 bg-slate-900">
    <div class="grid grid-cols-4 gap-5">
      <div class="">
        <a href="/">
          <div class="flex items-center gap-2">
            <AppLogo size="40" />
            <p class="font-bold text-2xl">{{ appName }}</p>
          </div>
        </a>

        <p class="text-slate-300 mt-4 text-xs">
          Empowering you with advanced investment solutions.
        </p>

        <div class="mt-4">
          <div>
            <NuxtButton
              to="/sign-up"
              label="Take The Leap"
              trailing-icon="lucide:circle-arrow-right"
              size="lg"
              class="text-white rounded-full"
            />
          </div>
        </div>
      </div>

      <div id="footer" class="col-span-3 grid grid-cols-4 gap-5 text-xs">
        <div v-for="route in selectedRoutes" :key="route.label">
          <h6 class="font-bold uppercase">{{ route.label }}</h6>
          <ul class="mt-2 grid gap-1">
            <li v-for="childRoute in route.children" :key="childRoute.label">
              <a :href="childRoute.to" class="hover:underline">
                {{ childRoute.label }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <NuxtSeparator class="my-5" />

    <div class="flex items-center gap-3 justify-between text-xs text-slate-300">
      <p>© 2023 {{ appName }}. All rights reserved.</p>

      <div class="grid grid-cols-2 gap-4">
        <NuxtLink
          to="/legal/privacy-policy"
          class="hover:text-white hover:underline"
        >
          Privacy Policy
        </NuxtLink>

        <NuxtLink
          to="/legal/terms-of-use"
          class="hover:text-white hover:underline"
        >
          Terms of Use
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
