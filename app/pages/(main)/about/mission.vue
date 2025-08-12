<script setup lang="ts">
definePageMeta({
  layout: "main",
});

const { appName } = useRuntimeConfig().public;
</script>

<template>
  <main>
    <div class="grid *:[grid-column:1/2] *:[grid-row:1/2]">
      <div class="flex flex-col items-center justify-center z-10">
        <div
          class="max-w-[32rem] text-center p-4 bg-slate-700/30 border border-white/30 backdrop-blur-[5px] rounded-xl"
        >
          <h1 class="text-6xl font-medium">Mission, Vision & Values</h1>

          <div class="mt-5">
            <p>
              At {{ appName }}, we exist to democratize wealth building and make
              sophisticated investment strategies accessible to everyone,
              regardless of their financial background or expertise level.
            </p>
          </div>
        </div>
      </div>

      <div class="h-96">
        <NuxtImg
          placeholder
          src="/img/pages/about/mission.jpg"
          class="h-full w-full object-cover brightness-50"
        />
      </div>
    </div>

    <div>
      <div class="min-h-screen bg-slate-900 text-slate-100">
        <div class="space-y-12 max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div class="bg-slate-800 rounded-2xl p-8 border border-slate-700">
            <div class="text-center space-y-6">
              <NuxtIcon
                name="lucide:target"
                class="text-6xl text-tertiary-500 mx-auto"
              />
              <h2 class="text-xl font-bold text-slate-50">
                Empowering Financial Freedom
              </h2>
              <p class="text-slate-300 max-w-2xl mx-auto">
                We believe that building wealth shouldn't be a privilege
                reserved for the financial elite. Our mission is to level the
                playing field by providing intelligent, automated investment
                management that works tirelessly to grow your assets while you
                focus on what matters most to you.
              </p>
            </div>
          </div>
          <div class="space-y-8">
            <h2 class="text-xl font-bold text-slate-50 text-center">
              Our Vision for the Future
            </h2>
            <div class="grid md:grid-cols-2 gap-8">
              <div class="space-y-4">
                <h3 class="text-xl font-semibold text-tertiary-500">
                  A World Without Investment Barriers
                </h3>
                <p class="text-slate-300 leading-relaxed">
                  We envision a future where anyone, regardless of their
                  starting capital or financial knowledge, can access the same
                  sophisticated investment strategies that were once exclusive
                  to institutional investors and the wealthy.
                </p>
              </div>
              <div class="space-y-4">
                <h3 class="text-xl font-semibold text-tertiary-500">
                  Technology-Driven Transparency
                </h3>
                <p class="text-slate-300 leading-relaxed">
                  By leveraging artificial intelligence and machine learning,
                  we're building a platform that not only delivers superior
                  returns but does so with complete transparency, giving you
                  real-time insights into every decision made with your money.
                </p>
              </div>
            </div>
          </div>
          <div class="space-y-8">
            <h2 class="text-xl font-bold text-slate-50 text-center">
              Our Core Values
            </h2>
            <div class="grid md:grid-cols-3 gap-6">
              <div
                class="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-tertiary-500 transition-colors"
              >
                <NuxtIcon
                  name="lucide:eye"
                  class="text-xl text-tertiary-500 mb-4"
                />
                <h3 class="font-semibold text-slate-50 mb-3">
                  Radical Transparency
                </h3>
                <p class="text-slate-300 text-sm">
                  Every fee, every trade, every algorithm decision is visible to
                  you. No black boxes, no hidden agendas — just clear, honest
                  communication about your investments.
                </p>
              </div>
              <div
                class="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-tertiary-500 transition-colors"
              >
                <NuxtIcon
                  name="lucide:users"
                  class="text-xl text-tertiary-500 mb-4"
                />
                <h3 class="font-semibold text-slate-50 mb-3">
                  Client-First Approach
                </h3>
                <p class="text-slate-300 text-sm">
                  Your success is our success. We align our interests with yours
                  through performance-based fees and a genuine commitment to
                  growing your wealth.
                </p>
              </div>
              <div
                class="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-tertiary-500 transition-colors"
              >
                <NuxtIcon
                  name="lucide:zap"
                  class="text-xl text-tertiary-500 mb-4"
                />
                <h3 class="font-semibold text-slate-50 mb-3">
                  Continuous Innovation
                </h3>
                <p class="text-slate-300 text-sm">
                  We constantly evolve our technology and strategies, staying
                  ahead of market trends to deliver the best possible outcomes
                  for our investors.
                </p>
              </div>
            </div>
          </div>
          <div
            class="bg-gradient-to-r from-slate-800 to-slate-700 rounded-2xl p-8 border border-slate-600"
          >
            <h2 class="text-xl font-bold text-slate-50 mb-6 text-center">
              What Drives Us Every Day
            </h2>
            <div class="space-y-6">
              <div class="flex items-start space-x-4">
                <NuxtIcon
                  name="lucide:heart"
                  class="text-2xl text-tertiary-500 mt-1 flex-shrink-0"
                />
                <div>
                  <h3 class="font-semibold text-tertiary-500 mb-2">
                    Passion for Financial Justice
                  </h3>
                  <p class="text-slate-300">
                    We're frustrated by a financial system that favors the
                    already wealthy. Every feature we build, every algorithm we
                    refine, is designed to give regular people the same
                    advantages that institutional investors have enjoyed for
                    decades.
                  </p>
                </div>
              </div>
              <div class="flex items-start space-x-4">
                <NuxtIcon
                  name="lucide:trending-up"
                  class="text-2xl text-tertiary-500 mt-1 flex-shrink-0"
                />
                <div>
                  <h3 class="font-semibold text-tertiary-500 mb-2">
                    Obsession with Performance
                  </h3>
                  <p class="text-slate-300">
                    We're not satisfied with market-average returns. Our team
                    works around the clock to identify opportunities, optimize
                    strategies, and deliver results that exceed your
                    expectations and help you achieve your financial goals
                    faster.
                  </p>
                </div>
              </div>
              <div class="flex items-start space-x-4">
                <NuxtIcon
                  name="lucide:shield"
                  class="text-2xl text-tertiary-500 mt-1 flex-shrink-0"
                />
                <div>
                  <h3 class="font-semibold text-tertiary-500 mb-2">
                    Unwavering Commitment to Security
                  </h3>
                  <p class="text-slate-300">
                    Your trust is sacred to us. We implement military-grade
                    security measures, maintain full regulatory compliance, and
                    treat your financial data with the highest level of
                    protection and confidentiality.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="text-center space-y-8">
            <h2 class="text-xl font-bold text-slate-50">
              The {{ appName }} Promise
            </h2>
            <div
              class="bg-slate-800 rounded-2xl p-8 border border-slate-700 max-w-3xl mx-auto"
            >
              <p class="text-slate-300 leading-relaxed mb-6">
                We promise to treat your money as if it were our own. To be
                transparent in all our dealings. To constantly innovate and
                improve. To put your interests first, always.
              </p>
              <p class="text-tertiary-500 font-semibold">
                Your financial success is not just our business — it's our
                mission.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div>
      <MainCtaBanner />
    </div>
  </main>
</template>
