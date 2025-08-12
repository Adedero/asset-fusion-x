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
          class="text-white max-w-[32rem] text-center p-4 bg-slate-700/30 border border-white/30 backdrop-blur-[5px] rounded-xl"
        >
          <h1 class="text-6xl font-medium">Our Story</h1>
          <div class="mt-5">
            <p>
              Revolutionizing investment management through intelligent
              automation, transparent processes, and unwavering commitment to
              our clients' financial success.
            </p>
          </div>
        </div>
      </div>
      <div class="h-96">
        <NuxtImg
          placeholder
          src="/img/pages/about/about-us.jpg"
          class="h-full w-full object-cover"
        />
      </div>
    </div>
    <div>
      <div class="space-y-10 max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <p class="mt-4 text-lg">
          {{ appName }} was born out of a vision to simplify the world of
          investing and make smart asset management accessible to everyone,
          regardless of financial background or expertise.
        </p>
        <NuxtImg
          placeholder
          src="/img/pages/about/our-journey.jpg"
          alt="Founders collaborating in early days"
          class="w-full rounded-lg shadow-lg"
        />
        <div class="space-y-6">
          <h2 class="text-2xl font-bold text-tertiary-500">
            A Platform Built on Trust
          </h2>
          <p>
            At our core, we believe that great investment opportunities
            shouldn't be locked behind complex jargon or exclusive financial
            clubs. That's why {{ appName }} does the hard work for you —
            analyzing trends, selecting promising assets, and delivering returns
            without the stress of self-managed portfolios.
          </p>
        </div>
        <div
          class="bg-gradient-to-b from-primary-500/10 border border-white/10 rounded-lg p-8"
        >
          <h2 class="text-2xl font-bold mb-6">Our Mission &amp; Core Values</h2>
          <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-3">
              <h3 class="text-lg font-semibold text-tertiary-500">
                Transparency First
              </h3>
              <p class="text-slate-300">
                Every decision, every trade, every fee is clearly communicated.
                No hidden costs, no surprise charges, no unclear performance
                metrics.
              </p>
            </div>
            <div class="space-y-3">
              <h3 class="text-lg font-semibold text-tertiary-500">
                Innovation Through Technology
              </h3>
              <p class="text-slate-300">
                Leveraging cutting-edge AI and machine learning to identify
                opportunities that traditional analysis might miss.
              </p>
            </div>
          </div>
        </div>
        <div class="space-y-4">
          <h2 class="text-2xl text-tertiary-500 font-bold">
            From Startup to Scalable Impact
          </h2>
          <p>
            We started small — a passionate group of investment analysts,
            developers, and financial advisors frustrated with outdated, clunky
            platforms. Our first version was simple, but the mission was clear:
            remove friction, unlock performance. Today, we power hundreds of
            investment decisions daily and support a growing global user base.
          </p>
          <p>
            From onboarding to payout, everything is streamlined. You choose
            your focus — we handle everything else. That's the
            {{ appName }} promise.
          </p>
        </div>
        <div class="bg-slate-800 rounded-lg p-8 text-white">
          <h2 class="text-2xl font-bold text-center mb-8">Our Track Record</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div class="text-3xl font-bold text-blue-400">$50M+</div>
              <div class="text-sm text-slate-300">Assets Under Management</div>
            </div>
            <div>
              <div class="text-3xl font-bold text-green-400">15.2%</div>
              <div class="text-sm text-slate-300">Average Annual Return</div>
            </div>
            <div>
              <div class="text-3xl font-bold text-purple-400">2,500+</div>
              <div class="text-sm text-slate-300">Active Investors</div>
            </div>
            <div>
              <div class="text-3xl font-bold text-yellow-400">24/7</div>
              <div class="text-sm text-slate-300">Market Monitoring</div>
            </div>
          </div>
        </div>
        <div class="space-y-6">
          <h2 class="text-2xl text-tertiary-500 font-bold">
            Powered by Advanced Technology
          </h2>
          <p class="text-slate-300">
            {{ appName }} employs sophisticated algorithms and real-time market
            analysis to make investment decisions. Our proprietary risk
            assessment models continuously monitor market conditions,
            automatically adjusting portfolios to protect your investments while
            maximizing growth opportunities.
          </p>
          <div class="grid md:grid-cols-3 gap-6 mt-6">
            <div class="bg-white p-6 rounded-lg shadow-md border">
              <h3 class="font-semibold text-slate-800 mb-3">
                AI-Driven Analysis
              </h3>
              <p class="text-sm text-slate-600">
                Machine learning models process thousands of data points to
                identify emerging market trends and investment opportunities.
              </p>
            </div>
            <div class="bg-white p-6 rounded-lg shadow-md border">
              <h3 class="font-semibold text-slate-800 mb-3">Risk Management</h3>
              <p class="text-sm text-slate-600">
                Dynamic portfolio rebalancing and stop-loss mechanisms protect
                your capital during market volatility.
              </p>
            </div>
            <div class="bg-white p-6 rounded-lg shadow-md border">
              <h3 class="font-semibold text-slate-800 mb-3">
                Real-Time Execution
              </h3>
              <p class="text-sm text-slate-600">
                Lightning-fast trade execution ensures you never miss market
                opportunities or face unnecessary delays.
              </p>
            </div>
          </div>
        </div>
        <div class="bg-slate-800 rounded-lg p-6 mt-10">
          <h2 class="flex items-center gap-1 text-xl font-semibold text-white">
            <NuxtIcon name="lucide:badge-check" class="text-green-400" />Why
            People Trust Us
          </h2>
          <ul class="list-disc list-inside mt-4 space-y-2 text-slate-300">
            <li>
              Fully managed investments tailored to your risk tolerance and
              goals
            </li>
            <li>Transparent performance tracking and regular profit payouts</li>
            <li>Global asset diversification without the complexity</li>
            <li>Built-in risk protection and smart capital deployment</li>
            <li>SEC-compliant operations with full regulatory oversight</li>
            <li>24/7 customer support and dedicated account management</li>
          </ul>
        </div>
        <NuxtImg
          placeholder
          src="/img/pages/about/team-at-work.jpg"
          alt="Team at work"
          class="w-full rounded-lg shadow-xl mt-8"
        />
        <div class="border-t border-t-white/20 pt-8 mt-8">
          <h2 class="text-xl font-bold text-tertiary-500 mb-4">
            Security &amp; Compliance
          </h2>
          <p class="text-slate-300 mb-4">
            {{ appName }} maintains the highest standards of security and
            regulatory compliance. Your funds are protected by industry-leading
            encryption, segregated accounts, and comprehensive insurance
            coverage.
          </p>
          <div class="flex flex-wrap gap-4 text-sm text-slate-500">
            <span class="flex items-center gap-1">
              <NuxtIcon name="lucide:shield-check" />SEC Registered
            </span>
            <span class="flex items-center gap-1">
              <NuxtIcon name="lucide:lock" />Bank-Level Security
            </span>
            <span class="flex items-center gap-1">
              <NuxtIcon name="lucide:umbrella" />SIPC Insured
            </span>
          </div>
        </div>
      </div>
    </div>

    <div>
      <MainCtaBanner color="neutral" />
    </div>
  </main>
</template>
