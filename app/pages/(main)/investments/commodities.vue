<script setup lang="ts">
definePageMeta({
  layout: "main",
});

const { appName } = useRuntimeConfig().public;
</script>

<template>
  <div>
    <div>
      <MainPageHero
        heading="Commodities"
        subheading="Explore the fundamental building blocks of the global economy and discover how investing in commodities can diversify your portfolio and offer unique opportunities for growth"
        bg-image="/img/pages/investments/commodities.webp" />
    </div>
    <div
      class="min-h-screen flex flex-col justify-center items-center py-16 px-4">
      <div class="mx-auto">
        <section class="px-16 mb-20 text-center">
          <p class="text-base mb-10">
            Commodities are raw materials or primary agricultural products that
            can be bought and sold, such as oil, gold, silver, grains, and
            livestock. They are the essential inputs for virtually every product
            and service we consume. Unlike manufactured goods, commodities are
            standardized and interchangeable, meaning a barrel of crude oil from
            Saudi Arabia is essentially the same as a barrel from Texas, making
            them ideal for global trading.
          </p>

          <div class="relative w-full h-[38rem] overflow-hidden mb-12">
            <NuxtImg
              placeholder
              src="/img/pages/investments/commodity-types.svg"
              alt="Various Commodities"
              class="absolute inset-0 w-full h-full object-cover" />
            <div
              class="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-90" />
            <div class="absolute inset-0 flex items-end justify-center pb-8">
              <p class="text-slate-200 text-base">
                From the food on our tables to the energy that powers our world,
                commodities are everywhere.
              </p>
            </div>
          </div>
        </section>

        <section class="mb-20 py-12 px-8">
          <h2 class="text-4xl font-bold text-tertiary-500 mb-8 text-center">
            Understanding the Essence of Commodities
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p class="text-base text-slate-300 leading-relaxed mb-6">
                Commodities are broadly categorized into two main groups:
                <b>hard commodities</b> and <b>soft commodities</b>. Hard
                commodities are natural resources that must be mined or
                extracted, such as gold, oil, and natural gas. They are finite
                and often subject to geopolitical influences and supply chain
                disruptions.
              </p>
              <p class="text-base text-slate-300 leading-relaxed mb-6">
                Soft commodities, on the other hand, are agricultural products
                or livestock, like wheat, corn, coffee, sugar, and cattle. Their
                prices are heavily influenced by weather patterns, crop yields,
                and global demand. Both types of commodities play a vital role
                in global trade and investment.
              </p>
              <ul
                class="list-disc list-inside text-slate-300 text-base space-y-2">
                <li>
                  <span class="text-primary-500 font-semibold"
                    >Tangible Assets:</span
                  >
                  Unlike stocks or bonds, commodities are physical goods with
                  intrinsic value.
                </li>
                <li>
                  <span class="text-primary-500 font-semibold"
                    >Global Market:</span
                  >
                  Traded worldwide on exchanges, providing continuous
                  opportunities.
                </li>
                <li>
                  <span class="text-primary-500 font-semibold"
                    >Inflation Hedge:</span
                  >
                  Historically, commodities can offer protection against rising
                  inflation.
                </li>
              </ul>
            </div>
            <div
              class="relative w-full h-[30rem] rounded-lg overflow-hidden shadow-lg">
              <NuxtImg
                placeholder
                src="/img/pages/investments/grains.jpg"
                alt="Gold Bars and Grains"
                class="absolute inset-0 w-full h-full object-cover" />
              <div
                class="absolute inset-0 bg-gradient-to-tr from-slate-900 via-transparent to-transparent opacity-70" />
            </div>
          </div>
        </section>

        <section class="mb-20 px-16">
          <h2 class="text-4xl font-bold text-tertiary-500 mb-12 text-center">
            The Allure of Commodities in Your Portfolio
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div
              class="bg-slate-800 p-8 rounded-lg shadow-xl border border-white/30 hover:scale-105 transition-transform duration-300">
              <h3 class="text-2xl font-semibold text-slate-200 mb-4">
                Portfolio Diversification
              </h3>
              <p class="text-base text-slate-400">
                Commodities often move independently of traditional financial
                assets like stocks and bonds. This low correlation makes them an
                excellent tool for diversifying your investment portfolio,
                potentially reducing overall risk and enhancing returns,
                especially during periods of market volatility.
              </p>
            </div>
            <div
              class="bg-slate-800 p-8 rounded-lg shadow-xl border border-white/30 hover:scale-105 transition-transform duration-300">
              <h3 class="text-2xl font-semibold text-slate-200 mb-4">
                Inflation Hedge
              </h3>
              <p class="text-base text-slate-400">
                When inflation rises, the cost of raw materials typically
                increases, which in turn drives up commodity prices. This makes
                commodities a valuable hedge against inflation, helping to
                preserve your purchasing power when the value of fiat currencies
                might be eroding.
              </p>
            </div>
            <div
              class="bg-slate-800 p-8 rounded-lg shadow-xl border border-white/30 hover:scale-105 transition-transform duration-300">
              <h3 class="text-2xl font-semibold text-slate-200 mb-4">
                Demand-Supply Dynamics
              </h3>
              <p class="text-base text-slate-400">
                Commodity prices are fundamentally driven by global supply and
                demand. Factors like population growth, industrialization,
                technological advancements, and geopolitical events can
                significantly impact prices, creating opportunities for those
                who understand these dynamics.
              </p>
            </div>
          </div>
        </section>

        <section class="mb-20 py-12 px-8">
          <h2 class="text-4xl font-bold text-tertiary-500 mb-8 text-center">
            Exploring Key Commodity Categories
          </h2>
          <p
            class="text-base text-slate-300 mb-8 text-center max-w-4xl mx-auto">
            The commodities market is vast and varied, offering exposure to
            different sectors of the global economy. Here are some of the most
            commonly traded categories:
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div class="space-y-8">
              <div class="flex items-start">
                <span class="text-5xl text-primary-500 mr-4">&#128665;</span>
                <div>
                  <h3 class="text-2xl font-semibold text-slate-200 mb-2">
                    Energy Commodities
                  </h3>
                  <p class="text-base text-slate-400">
                    Crude oil, natural gas, gasoline, and heating oil are
                    essential for transportation, electricity generation, and
                    industrial production. Their prices are volatile, reacting
                    to global supply disruptions, political tensions, and
                    economic growth forecasts.
                  </p>
                </div>
              </div>
              <div class="flex items-start">
                <span class="text-5xl text-primary-500 mr-4">&#128176;</span>
                <div>
                  <h3 class="text-2xl font-semibold text-slate-200 mb-2">
                    Precious Metals
                  </h3>
                  <p class="text-base text-slate-400">
                    Gold, silver, platinum, and palladium are often considered
                    "safe-haven" assets during times of economic uncertainty or
                    inflation. Gold, in particular, has a long history as a
                    store of value and a hedge against currency devaluation.
                  </p>
                </div>
              </div>
              <div class="flex items-start">
                <span class="text-5xl text-primary-500 mr-4">&#127806;</span>
                <div>
                  <h3 class="text-2xl font-semibold text-slate-200 mb-2">
                    Agricultural Commodities
                  </h3>
                  <p class="text-base text-slate-400">
                    Wheat, corn, soybeans, coffee, sugar, and cotton are vital
                    for food production and various industries. Prices are
                    influenced by weather, crop yields, government policies, and
                    global demand for food and biofuels.
                  </p>
                </div>
              </div>
            </div>
            <div
              class="relative w-full h-[38rem] rounded-lg overflow-hidden shadow-lg">
              <NuxtImg
                placeholder
                src="/img/pages/investments/commodity-types.jpg"
                alt="Various Commodity Samples"
                class="absolute inset-0 w-full h-full object-cover" />
              <div
                class="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
            </div>
          </div>
        </section>

        <section class="mb-20 px-16">
          <h2 class="text-4xl font-bold text-tertiary-500 mb-12 text-center">
            Generating Passive Income from Commodities
          </h2>
          <p
            class="text-base text-slate-300 mb-8 text-center max-w-4xl mx-auto">
            While direct commodity trading can be complex, there are accessible
            avenues to gain passive exposure and potentially generate income
            from these essential assets without deep market expertise.
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div
              class="bg-slate-800 p-8 rounded-lg shadow-xl border border-white/30 hover:scale-105 transition-transform duration-300 flex flex-col items-center text-center">
              <div class="relative w-full h-72 rounded-md overflow-hidden mb-6">
                <NuxtImg
                  placeholder
                  src="/img/pages/investments/commodity-etfs.webp"
                  alt="Commodity Exchange Traded Funds"
                  class="absolute inset-0 w-full h-full object-cover" />
              </div>
              <h3 class="text-2xl font-semibold text-slate-200 mb-4">
                Commodity ETFs and ETNs
              </h3>
              <p class="text-base text-slate-400">
                Exchange Traded Funds (ETFs) and Exchange Traded Notes (ETNs)
                offer a convenient way to invest in a basket of commodities or a
                single commodity without directly owning the physical asset.
                These funds are traded on stock exchanges and track the
                performance of specific commodity indices or prices, providing
                diversification and liquidity.
              </p>
            </div>
            <div
              class="bg-slate-800 p-8 rounded-lg shadow-xl border border-white/30 hover:scale-105 transition-transform duration-300 flex flex-col items-center text-center">
              <div class="relative w-full h-72 rounded-md overflow-hidden mb-6">
                <NuxtImg
                  placeholder
                  src="/img/pages/investments/mining-commodity.jpg"
                  alt="Mining Company Stocks"
                  class="absolute inset-0 w-full h-full object-cover" />
              </div>
              <h3 class="text-2xl font-semibold text-slate-200 mb-4">
                Commodity-Related Stocks
              </h3>
              <p class="text-base text-slate-400">
                Investing in companies involved in the production, processing,
                or transportation of commodities can also offer exposure. For
                example, shares in oil companies, mining firms, or agricultural
                businesses often correlate with the performance of their
                underlying commodities, providing an indirect way to benefit
                from commodity price movements.
              </p>
            </div>
          </div>
        </section>

        <section class="py-16 px-16 bg-slate-800 text-center">
          <h2 class="text-4xl font-bold text-tertiary-500 mb-8">
            Navigating the Commodity Markets with {{ appName }}
          </h2>
          <p class="text-base text-slate-300 mb-10 max-w-4xl mx-auto">
            At {{ appName }}, we recognize the unique advantages commodities
            can bring to a well-rounded investment portfolio. We simplify access
            to this often-complex market, helping you harness its potential for
            passive income generation.
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
            <div class="flex flex-col items-center">
              <NuxtImg
                placeholder
                src="/img/pages/investments/investment-analyst.png"
                alt="Investment Analyst"
                class="w-full h-64 object-cover rounded-lg mb-6 shadow-md border border-primary-500" />
              <h3 class="text-2xl font-semibold text-slate-200 mb-4">
                Strategic Commodity Exposure
              </h3>
              <p class="text-base text-slate-400">
                {{ appName }} provides curated investment options that offer
                exposure to key commodity sectors. Our strategies are designed
                to capture growth opportunities while mitigating risks inherent
                in raw material markets. We identify the most promising avenues
                for commodity investment, from energy to precious metals and
                agriculture, to align with your passive income goals.
              </p>
            </div>
            <div class="flex flex-col items-center">
              <NuxtImg
                placeholder
                src="/img/pages/investments/automated-investment-platform.jpg"
                alt="Automated Investment Platform"
                class="w-full h-64 object-cover rounded-lg mb-6 shadow-md border border-primary-500" />
              <h3 class="text-2xl font-semibold text-slate-200 mb-4">
                Effortless Portfolio Integration
              </h3>
              <p class="text-base text-slate-400">
                {{ appName }} integrates commodity investments seamlessly into
                your broader passive income portfolio. Our platform handles the
                research, selection, and management, allowing you to benefit
                from commodity price movements without actively trading. We make
                investing in these fundamental assets simple and accessible for
                everyone.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>

    <div>
      <MainCtaBanner color="neutral" />
    </div>
  </div>
</template>
