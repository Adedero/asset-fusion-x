<script setup lang="ts">
import type { BadgeProps } from "@nuxt/ui";
import careers from "~/data/main/careers";

definePageMeta({
  layout: "main",
});

const { appName } = useRuntimeConfig().public;

const randomColor = (): BadgeProps["color"] => {
  const colors = ["primary", "error", "warning", "success"];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex] as BadgeProps["color"];
};
</script>

<template>
  <main>
    <div class="grid *:[grid-column:1/2] *:[grid-row:1/2]">
      <div class="flex flex-col items-center justify-center z-10">
        <div
          class="max-w-[32rem] text-center p-4 bg-slate-700/30 border border-white/30 backdrop-blur-[5px] rounded-xl"
        >
          <h1 class="text-6xl font-medium">Careers</h1>

          <div class="mt-5">
            <p>There is a place for everyone of value at {{ appName }}.</p>
          </div>
        </div>
      </div>

      <div class="h-96">
        <NuxtImg
          placeholder
          src="/img/pages/about/careers.jpg"
          class="h-full w-full object-cover"
        />
      </div>
    </div>

    <div class="py-12 flex items-center justify-center">
      <div class="max-w-[30rem]">
        <NuxtAlert
          color="warning"
          variant="subtle"
          icon="lucide:triangle-alert"
          title="Important"
          :description="`Please, be advised that ${appName} is not taking any applications
            at this time. Do check back later, as this page is regularly
            updated. Thank you.`"
        />
      </div>
    </div>

    <div>
      <div class="space-y-12 max-w-6xl mx-auto pt-8 pb-16 px-4 sm:px-6 lg:px-8">
        <div class="text-center space-y-8">
          <h1 class="text-2xl font-bold sm:text-6xl">Join Our Team</h1>
          <p class="text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Help us revolutionize investing at {{ appName }}. We're building the
            future of wealth management and looking for passionate individuals
            to join our mission.
          </p>
          <div class="w-24 h-1 bg-blue-500 mx-auto rounded-full" />
        </div>
        <div class="bg-slate-800 rounded-2xl p-8">
          <h2 class="text-2xl font-bold text-center mb-8">
            Why Work at {{ appName }}?
          </h2>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="item in careers.whyWork"
              :key="item.title"
              class="bg-gradient-to-b from-primary-500/10 border border-white/20 p-6 rounded-xl shadow-sm"
            >
              <NuxtIcon
                :name="item.icon"
                :class="`text-4xl ${item.color} mb-4`"
              />
              <h3 class="text-xl font-semibold mb-3">{{ item.title }}</h3>
              <p class="text-slate-300">{{ item.description }}</p>
            </div>
          </div>
        </div>

        <div class="space-y-8">
          <h2 class="text-2xl font-bold text-tertiary-500 text-center">
            Open Positions
          </h2>
          <div class="space-y-4">
            <NuxtCard
              v-for="item in careers.openPositions"
              :key="item.title"
              variant="solid"
            >
              <div>
                <p class="text-lg font-semibold">{{ item.title }}</p>
                <p class="text-muted">{{ item.description }}</p>
              </div>

              <template #footer>
                <div class="flex items-center gap-4 justify-between">
                  <div class="flex flex-wrap gap-2">
                    <NuxtBadge
                      v-for="tag in item.tags"
                      :key="tag.label"
                      :label="tag.label"
                      :color="randomColor()"
                      variant="subtle"
                    />
                  </div>

                  <NuxtButton
                    :to="item.href"
                    label="Apply Now"
                    class="text-white"
                  />
                </div>
              </template>
            </NuxtCard>
          </div>
        </div>

        <div class="bg-slate-900 rounded-2xl p-8 text-white">
          <h2 class="text-3xl font-bold text-center mb-8">
            Benefits &amp; Perks
          </h2>
          <div class="grid md:grid-cols-2 gap-6">
            <ul class="space-y-3">
              <li
                v-for="item in careers.perksList_1"
                :key="item"
                class="flex items-center gap-3"
              >
                <NuxtIcon name="lucide:check-circle" class="text-green-400" />
                <p>{{ item }}</p>
              </li>
            </ul>

            <ul class="space-y-3">
              <li
                v-for="item in careers.perksList_2"
                :key="item"
                class="flex items-center gap-3"
              >
                <NuxtIcon name="lucide:check-circle" class="text-green-400" />
                <p>{{ item }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div>
      <MainCtaBanner />
    </div>
  </main>
</template>
