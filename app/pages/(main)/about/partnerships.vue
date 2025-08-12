<script setup lang="ts">
definePageMeta({
  layout: "main",
});
</script>

<template>
  <main>
    <div class="grid *:[grid-column:1/2] *:[grid-row:1/2]">
      <div class="flex flex-col items-center justify-center z-10">
        <div
          class="max-w-[32rem] text-center p-4 bg-slate-700/30 border border-white/50 backdrop-blur-[5px] rounded-xl"
        >
          <p class="text-6xl font-medium">Partnerships</p>

          <div class="mt-5">
            <p>Together, We Build the Future of Wealth Management.</p>
          </div>
        </div>
      </div>

      <div class="h-96">
        <NuxtImg
          placeholder
          src="/img/pages/about/partnerships.jpg"
          class="h-full w-full object-cover"
        />
      </div>
    </div>

    <div>
      <div class="max-w-5xl mx-auto pt-12 px-4 sm:px-6 lg:px-8 space-y-12">
        <div class="text-center space-y-4">
          <h1 class="mt-8 text-2xl font-extrabold text-tertiary-500">
            Partnerships that Power Progress
          </h1>
          <p class="text-slate-300 max-w-3xl mx-auto">
            At AssetFusionX, we know that meaningful innovation doesn't happen
            in isolation. Our platform is built on a foundation of deep
            collaboration with leading technology providers, financial
            institutions, and data intelligence firms who share our vision for
            frictionless investing and responsible wealth creation.
          </p>
        </div>
        <blockquote class="flex items-center justify-center w-full">
          <div
            class="max-w-[28rem] bg-slate-800 rounded-lg p-6 border border-white/10 text-slate-200 italic text-center"
          >
            “The strength of our platform is a reflection of the extraordinary
            partners who help us imagine what's possible and bring it to life.”
          </div>
        </blockquote>
      </div>
    </div>

    <MainPartnerList />

    <div class="px-12 pb-12 space-y-6">
      <p class="text-xl font-semibold text-tertiary-500">
        What We Look for in a Partner
      </p>

      <NuxtSeparator />

      <ul class="grid gap-4">
        <li class="flex items-center gap-2">
          <NuxtIcon class="text-green-500" name="lucide:badge-check" />
          <p>Technological innovation that aligns with scalable architecture</p>
        </li>

        <li class="flex items-center gap-2">
          <NuxtIcon class="text-green-500" name="lucide:badge-check" />
          <p>Commitment to security, compliance, and transparency</p>
        </li>

        <li class="flex items-center gap-2">
          <NuxtIcon class="text-green-500" name="lucide:badge-check" />
          <p>Shared mission for empowering users financially</p>
        </li>

        <li class="flex items-center gap-2">
          <NuxtIcon class="text-green-500" name="lucide:badge-check" />
          <p>Deep expertise and proven success in their respective domains</p>
        </li>
      </ul>
    </div>

    <div>
      <MainCtaBanner color="neutral" />
    </div>
  </main>
</template>
