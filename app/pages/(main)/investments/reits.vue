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
        heading="Real Estate Investment Trusts"
        subheading="Real Estate Investment Trusts"
        bg-image="https://media.licdn.com/dms/image/v2/D4E12AQEVjYE_Sjn80Q/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1718720950634?e=2147483647&v=beta&t=YxEtG9gm6Jd8YlMads3DBQD8bM84b_J6ON_crAPgfTM" />
    </div>

    <div class="min-h-screen flex flex-col items-center py-16">
      <div class="max-w-6xl mx-auto px-4">
        <section
          class="relative h-[600px] w-full rounded-xl overflow-hidden mb-20 shadow-2xl">
          <NuxtImg
            placeholder
            src="https://i.redd.it/etdaqu8j2gw31.jpg"
            alt="Modern City Skyline"
            class="absolute inset-0 w-full h-full object-cover brightness-75" />
          <div
            class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
          <div
            class="relative z-10 flex flex-col items-center justify-center h-full text-center px-8">
            <h1 class="text-4xl font-extrabold text-white mb-6 leading-tight">
              Investing in Bricks and Mortar, Without the Hassle: Welcome to
              REITs
            </h1>
            <p class="text-base text-slate-300 mb-8 max-w-3xl">
              Unlock the power of real estate investment without the
              complexities of direct property ownership. Real Estate Investment
              Trusts (REITs) offer a unique pathway to passive income and
              portfolio diversification.
            </p>
            <div
              class="mt-8 p-4 bg-slate-800/70 rounded-lg shadow-xl border border-white/30 backdrop-blur-sm">
              <p class="text-base text-slate-200">
                REITs are companies that own, operate, or finance
                income-generating real estate. They allow anyone to invest in
                portfolios of large-scale properties in the same way they invest
                in other industries – through the purchase of stock.
              </p>
            </div>
          </div>
        </section>

        <section class="mb-20 py-16 px-16">
          <h2 class="text-4xl font-bold text-tertiary-500 mb-12 text-center">
            REITs: Your Share in a Real Estate Empire
          </h2>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div class="space-y-6">
              <p class="text-base text-slate-300 leading-relaxed">
                Imagine owning a piece of a sprawling shopping mall, a bustling
                office complex, a high-tech data center, or even a portfolio of
                luxury apartments, all without the burdens of property
                management, maintenance, or tenant issues. That's precisely what
                Real Estate Investment Trusts (REITs) enable.
              </p>
              <p class="text-base text-slate-300 leading-relaxed">
                Structured much like mutual funds, REITs pool money from
                numerous investors to buy, manage, and often develop real
                estate. Their unique structure requires them to distribute at
                least 90% of their taxable income to shareholders annually in
                the form of dividends. This makes them particularly attractive
                for passive income generation.
              </p>
              <ul
                class="list-disc list-inside text-slate-300 text-base space-y-2">
                <li>
                  <span class="text-primary-500 font-semibold"
                    >Accessibility:</span
                  >
                  Invest in large-scale real estate with a small capital outlay,
                  just like buying stock.
                </li>
                <li>
                  <span class="text-primary-500 font-semibold"
                    >Diversification:</span
                  >
                  Gain exposure to a variety of property types and geographical
                  locations.
                </li>
                <li>
                  <span class="text-primary-500 font-semibold">Liquidity:</span>
                  Unlike physical property, REIT shares can be bought and sold
                  easily on major stock exchanges.
                </li>
              </ul>
            </div>
            <div
              class="relative w-full h-96 rounded-lg overflow-hidden shadow-lg border border-primary-500">
              <NuxtImg
                placeholder
                src="/img/pages/investments/property-types.jpg"
                alt="Diverse Property Types in a City"
                class="absolute inset-0 w-full h-full object-cover" />
              <div
                class="absolute inset-0 bg-gradient-to-bl from-slate-900 via-transparent to-transparent opacity-70" />
            </div>
          </div>
        </section>

        <section class="mb-20 px-16">
          <h2 class="text-4xl font-bold text-primary-500 mb-12 text-center">
            The Compelling Advantages of REIT Investments
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div
              class="p-8 bg-slate-800 rounded-lg shadow-xl border border-white/30 transition-transform duration-300 hover:scale-105">
              <div class="relative w-full h-48 rounded-md overflow-hidden mb-6">
                <NuxtImg
                  placeholder
                  src="https://static.vecteezy.com/system/resources/thumbnails/046/434/272/large/a-man-in-business-clothes-with-dollars-cash-in-hands-profits-savings-stack-of-dollars-dollars-in-man-s-hands-success-motivation-financial-flows-wealth-stack-of-dollars-video.jpg"
                  alt="Flowing Cash into Hand"
                  class="absolute inset-0 w-full h-full object-cover" />
              </div>
              <h3 class="text-2xl font-semibold text-slate-200 mb-4">
                High Dividend Yields
              </h3>
              <p class="text-base text-slate-400">
                Due to the requirement to distribute 90% of their taxable
                income, REITs are known for their attractive dividend yields.
                This makes them a powerful engine for generating consistent
                passive income, often higher than what you might find in many
                other dividend-paying stocks.
              </p>
            </div>
            <div
              class="p-8 bg-slate-800 rounded-lg shadow-xl border border-white/30 transition-transform duration-300 hover:scale-105">
              <div class="relative w-full h-48 rounded-md overflow-hidden mb-6">
                <NuxtImg
                  placeholder
                  src="https://media.privateequityinternational.com/uploads/2023/05/GettyImages-1399211832.jpg"
                  alt="Diversified Investment Portfolio"
                  class="absolute inset-0 w-full h-full object-cover" />
              </div>
              <h3 class="text-2xl font-semibold text-slate-200 mb-4">
                Portfolio Diversification
              </h3>
              <p class="text-base text-slate-400">
                Adding REITs to your portfolio can significantly enhance
                diversification. Real estate performance often correlates
                differently with other asset classes like stocks and bonds,
                providing a valuable hedge against market volatility and
                improving risk-adjusted returns.
              </p>
            </div>
            <div
              class="p-8 bg-slate-800 rounded-lg shadow-xl border border-white/30 transition-transform duration-300 hover:scale-105">
              <div class="relative w-full h-48 rounded-md overflow-hidden mb-6">
                <NuxtImg
                  placeholder
                  src="https://static.vecteezy.com/system/resources/previews/047/072/105/non_2x/an-illustration-depicting-financial-growth-with-a-colorful-bar-graph-that-ascends-upward-symbolizing-profitability-and-success-free-vector.jpg"
                  alt="Financial Growth Chart"
                  class="absolute inset-0 w-full h-full object-cover" />
              </div>
              <h3 class="text-2xl font-semibold text-slate-200 mb-4">
                Long-Term Growth Potential
              </h3>
              <p class="text-base text-slate-400">
                Beyond dividends, REITs offer the potential for capital
                appreciation as the value of their underlying properties
                increases over time. This dual benefit of income and growth
                makes them a robust component of a long-term investment
                strategy.
              </p>
            </div>
          </div>
        </section>

        <section class="mb-20 py-16 px-16">
          <h2 class="text-4xl font-bold text-tertiary-500 mb-12 text-center">
            Exploring the Diverse Landscape of REITs
          </h2>
          <p
            class="text-base text-slate-300 mb-8 text-center max-w-4xl mx-auto">
            REITs specialize in various types of real estate, each offering
            exposure to different sectors of the economy and unique market
            dynamics.
          </p>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div
              class="flex items-start bg-slate-900 p-6 rounded-lg shadow-md border border-primary-500">
              <span class="text-5xl text-tertiary-500 mr-4">&#127970;</span>
              <div>
                <h3 class="text-2xl font-semibold text-slate-200 mb-2">
                  Equity REITs
                </h3>
                <p class="text-base text-slate-400">
                  These are the most common type, owning and operating
                  income-producing real estate. They generate revenue primarily
                  through rents collected from their properties. Examples
                  include residential, retail, office, industrial, and
                  healthcare REITs.
                </p>
              </div>
            </div>
            <div
              class="flex items-start bg-slate-900 p-6 rounded-lg shadow-md border border-primary-500">
              <span class="text-5xl text-tertiary-500 mr-4">&#128176;</span>
              <div>
                <h3 class="text-2xl font-semibold text-slate-200 mb-2">
                  Mortgage REITs (mREITs)
                </h3>
                <p class="text-base text-slate-400">
                  Unlike equity REITs, mREITs don't own physical property.
                  Instead, they provide financing for income-producing real
                  estate by purchasing or originating mortgages and
                  mortgage-backed securities (MBS). Their income is generated
                  primarily from the net interest margin on their investments.
                </p>
              </div>
            </div>
            <div
              class="flex items-start bg-slate-900 p-6 rounded-lg shadow-md border border-primary-500">
              <span class="text-5xl text-tertiary-500 mr-4">&#127757;</span>
              <div>
                <h3 class="text-2xl font-semibold text-slate-200 mb-2">
                  Hybrid REITs
                </h3>
                <p class="text-base text-slate-400">
                  These REITs combine the strategies of both equity and mortgage
                  REITs, investing in both physical properties and
                  mortgage-backed securities. They aim to balance the income
                  generation from rents with the interest income from mortgage
                  investments.
                </p>
              </div>
            </div>
            <div
              class="flex items-start bg-slate-900 p-6 rounded-lg shadow-md border border-primary-500">
              <span class="text-5xl text-tertiary-500 mr-4">&#128221;</span>
              <div>
                <h3 class="text-2xl font-semibold text-slate-200 mb-2">
                  Specialized REITs
                </h3>
                <p class="text-base text-slate-400">
                  These focus on niche real estate sectors, such as data
                  centers, timberland, infrastructure (e.g., cell towers), or
                  correctional facilities. They offer unique exposure to
                  specialized markets driven by specific economic trends.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section class="mb-20 px-16">
          <h2 class="text-4xl font-bold text-primary-500 mb-12 text-center">
            Effortless Real Estate Income through REITs
          </h2>
          <p
            class="text-base text-slate-300 mb-8 text-center max-w-4xl mx-auto">
            The primary appeal of REITs for passive income lies in their
            mandatory dividend distributions and ease of investment. They offer
            a hands-off approach to benefiting from real estate.
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div
              class="bg-slate-800 p-8 rounded-lg shadow-xl border border-white/30 transition-transform duration-300 hover:scale-105 flex flex-col items-center text-center">
              <div class="relative w-full h-60 rounded-md overflow-hidden mb-6">
                <NuxtImg
                  placeholder
                  src="https://media.ycharts.com/charts/5d736df38b7799ac03ce90651946ab17.png"
                  alt="Dividend Payment Chart"
                  class="absolute inset-0 w-full h-full object-cover" />
              </div>
              <h3 class="text-2xl font-semibold text-slate-200 mb-4">
                Consistent Dividend Payouts
              </h3>
              <p class="text-base text-slate-400">
                REITs are legally obligated to distribute a significant portion
                of their earnings as dividends, making them a consistent source
                of passive income. These dividends are typically paid quarterly,
                providing a regular cash flow directly to investors.
              </p>
            </div>
            <div
              class="bg-slate-800 p-8 rounded-lg shadow-xl border border-white/30 transition-transform duration-300 hover:scale-105 flex flex-col items-center text-center">
              <div class="relative w-full h-60 rounded-md overflow-hidden mb-6">
                <NuxtImg
                  placeholder
                  src="https://imageio.forbes.com/specials-images/imageserve/602d905bdf32d435107355f1/Stock-market/960x0.jpg?height=473&width=711&fit=bounds"
                  alt="Automated Investment Strategy"
                  class="absolute inset-0 w-full h-full object-cover" />
              </div>
              <h3 class="text-2xl font-semibold text-slate-200 mb-4">
                Liquidity & Professional Management
              </h3>
              <p class="text-base text-slate-400">
                Unlike direct property investments, REITs offer liquidity; you
                can buy or sell shares easily. Furthermore, professional
                management teams handle all aspects of property acquisition,
                management, and tenant relations, providing a completely
                hands-off investment experience for you.
              </p>
            </div>
          </div>
        </section>

        <section class="py-16 px-16 text-center">
          <h2 class="text-4xl font-bold text-primary-500 mb-8">
            Unlocking Real Estate Riches with {{ appName }}
          </h2>
          <p class="text-base text-slate-300 mb-10 max-w-4xl mx-auto">
            At {{ appName }}, we believe everyone should have access to the
            wealth-building potential of real estate. We make investing in REITs
            simple, smart, and a powerful source of passive income for your
            portfolio.
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
            <div class="flex flex-col items-center">
              <NuxtImg
                placeholder
                src="https://firaallreviews.com/wp-content/uploads/2023/01/REIT-Analyst-1024x457.png"
                alt="Financial Analyst Reviewing REITs"
                class="w-full h-64 object-cover rounded-lg mb-6 shadow-md border border-primary-500" />
              <h3 class="text-2xl font-semibold text-slate-200 mb-4">
                Curated REIT Portfolios
              </h3>
              <p class="text-base text-slate-400">
                {{ appName }} identifies and selects top-performing REITs
                across diverse sectors and geographies. Our expertly curated
                portfolios are designed to maximize dividend income and capital
                appreciation, providing you with optimized exposure to the
                dynamic real estate market without the need for extensive
                research.
              </p>
            </div>
            <div class="flex flex-col items-center">
              <NuxtImg
                placeholder
                src="https://cdn.corporatefinanceinstitute.com/assets/trading-platform.jpg"
                alt="Seamless Online Investment Platform"
                class="w-full h-64 object-cover rounded-lg mb-6 shadow-md border border-primary-500" />
              <h3 class="text-2xl font-semibold text-slate-200 mb-4">
                Streamlined Real Estate Income
              </h3>
              <p class="text-base text-slate-400">
                Through {{ appName }}, investing in REITs and receiving your
                passive income is seamless. Our intuitive platform handles all
                the complexities, from investment selection to dividend
                distribution, ensuring a truly hands-off experience. You gain
                access to a professionally managed real estate portfolio,
                designed to provide consistent, passive returns.
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
