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
        heading="Bonds (Fixed Income)"
        subheading="Discover the foundational role of bonds in investment portfolios, offering predictability and a reliable source of passive income. Learn how these debt instruments can fortify your financial future."
        bg-image="/img/pages/investments/bonds.jpg" />
    </div>

    <div
      class="min-h-screen flex flex-col justify-center items-center py-16 px-4">
      <div class="max-w-6xl mx-auto">
        <section class="mb-20 text-center px-16">
          <p class="text-base">
            Bonds are essentially loans made by an investor to a borrower
            (typically a corporation or government). When you buy a bond, you
            are lending money to the issuer, who, in return, promises to pay you
            back the principal amount (face value) on a specific date (maturity
            date) and usually pays you regular interest payments along the way.
            These interest payments are known as coupon payments, and they form
            the basis of passive income for bondholders.
          </p>

          <div class="relative w-full h-96 overflow-hidden mt-16">
            <NuxtImg
              placeholder
              src="/img/pages/investments/bond-certificate.jpg"
              alt="Bond Certificates and Financial Charts"
              class="absolute inset-0 w-full h-full object-cover" />
            <div
              class="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-90" />
            <div class="absolute inset-0 flex items-end justify-center pb-8">
              <p class="text-slate-200 text-base">
                Bonds are a cornerstone of stable investing, providing
                consistent income and capital preservation.
              </p>
            </div>
          </div>
        </section>

        <section class="mb-20 py-12 px-16">
          <h2 class="text-4xl font-bold text-tertiary-500 mb-8 text-center">
            Demystifying Bonds: The Core Concepts
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p class="text-base text-slate-300 leading-relaxed mb-6">
                Think of a bond as an I.O.U. certificate. Governments issue
                bonds to fund public projects like infrastructure or defense,
                while corporations issue them to finance expansions, research,
                or operational needs. Unlike stocks, which represent ownership
                in a company, bonds represent debt. This makes them generally
                less volatile than stocks, offering a different risk-reward
                profile.
              </p>
              <p class="text-base text-slate-300 leading-relaxed mb-6">
                Key characteristics of a bond include its face value (the amount
                repaid at maturity), coupon rate (the interest rate paid),
                maturity date (when the principal is repaid), and issuer (who
                borrowed the money). Understanding these elements is crucial to
                evaluating a bond's potential return and risk.
              </p>
              <ul
                class="list-disc list-inside text-slate-300 text-base space-y-2">
                <li>
                  <span class="text-primary-500 font-semibold"
                    >Fixed Income:</span
                  >
                  Bonds typically provide predictable income streams through
                  regular interest payments.
                </li>
                <li>
                  <span class="text-primary-500 font-semibold"
                    >Capital Preservation:</span
                  >
                  At maturity, the investor usually receives their initial
                  investment back, making bonds attractive for preserving
                  capital.
                </li>
                <li>
                  <span class="text-primary-500 font-semibold"
                    >Lower Volatility:</span
                  >
                  Generally, bonds are less susceptible to wild price swings
                  compared to stocks.
                </li>
              </ul>
            </div>
            <div
              class="relative w-full h-80 rounded-lg overflow-hidden shadow-lg">
              <NuxtImg
                placeholder
                src="/img/pages/investments/financial-documents-and-calculator.jpg"
                alt="Financial Documents and Calculator"
                class="absolute inset-0 w-full h-full object-cover" />
              <div
                class="absolute inset-0 bg-gradient-to-tr from-slate-900 via-transparent to-transparent opacity-70" />
            </div>
          </div>
        </section>

        <section class="mb-20 px-16">
          <h2 class="text-4xl font-bold text-primary-500 mb-12 text-center">
            Why Bonds Are a Pillar of Prudent Investing
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div
              class="bg-slate-800 p-8 rounded-lg shadow-xl border border-white/30 hover:scale-105 transition-transform duration-300">
              <div class="relative w-full h-48 rounded-md overflow-hidden mb-6">
                <NuxtImg
                  placeholder
                  src="/img/pages/investments/steady-income-flow.jpg"
                  alt="Steady Flow of Income"
                  class="absolute inset-0 w-full h-full object-cover" />
              </div>
              <h3 class="text-2xl font-semibold text-slate-200 mb-4">
                Consistent Income Stream
              </h3>
              <p class="text-base text-slate-400">
                One of the primary attractions of bonds is their ability to
                provide a predictable and steady stream of income. The fixed
                interest payments (coupons) can be a reliable source of passive
                income, making them ideal for retirees or those seeking
                consistent cash flow from their investments.
              </p>
            </div>
            <div
              class="bg-slate-800 p-8 rounded-lg shadow-xl border border-white/30 hover:scale-105 transition-transform duration-300">
              <div class="relative w-full h-48 rounded-md overflow-hidden mb-6">
                <NuxtImg
                  placeholder
                  src="/img/pages/investments/diversified-portfolio.jpg"
                  alt="Portfolio Diversification Chart"
                  class="absolute inset-0 w-full h-full object-cover" />
              </div>
              <h3 class="text-2xl font-semibold text-slate-200 mb-4">
                Risk Mitigation & Diversification
              </h3>
              <p class="text-base text-slate-400">
                Bonds generally have a low correlation with stocks, meaning they
                often perform differently under varying market conditions.
                Adding bonds to a stock-heavy portfolio can help reduce overall
                portfolio volatility and risk, providing a cushion during equity
                market downturns.
              </p>
            </div>
            <div
              class="bg-slate-800 p-8 rounded-lg shadow-xl border border-white/30 hover:scale-105 transition-transform duration-300">
              <div class="relative w-full h-48 rounded-md overflow-hidden mb-6">
                <NuxtImg
                  placeholder
                  src="/img/pages/investments/financial-stability.jpg"
                  alt="Financial Stability Concept"
                  class="absolute inset-0 w-full h-full object-cover" />
              </div>
              <h3 class="text-2xl font-semibold text-slate-200 mb-4">
                Capital Preservation
              </h3>
              <p class="text-base text-slate-400">
                For investors prioritizing the safety of their principal, bonds
                are often a preferred choice. When held to maturity, the issuer
                is obligated to return the initial investment, making them a
                relatively safe haven for capital compared to more volatile
                asset classes.
              </p>
            </div>
          </div>
        </section>

        <section class="mb-20 py-12 px-16">
          <h2 class="text-4xl font-bold text-tertiary-500 mb-8 text-center">
            Navigating the Diverse World of Bonds
          </h2>
          <p
            class="text-base text-slate-300 mb-8 text-center max-w-4xl mx-auto">
            The bond market offers a variety of instruments, each with its own
            characteristics, risks, and potential returns. Understanding the
            different types helps in making informed investment decisions.
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div class="space-y-8">
              <div class="flex items-start">
                <span class="text-5xl text-primary-500 mr-4">&#127919;</span>
                <div>
                  <h3 class="text-2xl font-semibold text-slate-200 mb-2">
                    Government Bonds
                  </h3>
                  <p class="text-base text-slate-400">
                    Issued by national governments (e.g., U.S. Treasuries, UK
                    Gilts), these are generally considered the safest bonds due
                    to the backing of the issuing government's taxing power.
                    They are often used as a benchmark for other interest rates.
                  </p>
                </div>
              </div>
              <div class="flex items-start">
                <span class="text-5xl text-primary-500 mr-4">&#127970;</span>
                <div>
                  <h3 class="text-2xl font-semibold text-slate-200 mb-2">
                    Corporate Bonds
                  </h3>
                  <p class="text-base text-slate-400">
                    Issued by companies to raise capital, these bonds carry a
                    higher risk than government bonds but typically offer higher
                    interest rates to compensate investors for that increased
                    risk. Their creditworthiness varies depending on the issuing
                    company's financial health.
                  </p>
                </div>
              </div>
              <div class="flex items-start">
                <span class="text-5xl text-primary-500 mr-4">&#127752;</span>
                <div>
                  <h3 class="text-2xl font-semibold text-slate-200 mb-2">
                    Municipal Bonds ("Munis")
                  </h3>
                  <p class="text-base text-slate-400">
                    Issued by state and local governments to finance public
                    projects, municipal bonds often offer tax-exempt interest
                    income, making them particularly attractive to investors in
                    higher tax brackets. Their safety depends on the financial
                    stability of the issuing municipality.
                  </p>
                </div>
              </div>
            </div>
            <div
              class="relative w-full h-96 rounded-lg overflow-hidden shadow-lg">
              <NuxtImg
                placeholder
                src="https://img.freepik.com/premium-photo/dynamic-financial-charts-graphs-blue-grid-3d-rendering_670147-69830.jpg"
                alt="Diverse Financial Graphs"
                class="absolute inset-0 w-full h-full object-cover" />
              <div
                class="absolute inset-0 bg-gradient-to-l from-slate-900 via-transparent to-transparent opacity-80" />
            </div>
          </div>
        </section>

        <section class="mb-20 px-16">
          <h2 class="text-4xl font-bold text-primary-500 mb-12 text-center">
            Building Passive Income Through Bond Investments
          </h2>
          <p
            class="text-base text-slate-300 mb-8 text-center max-w-4xl mx-auto">
            While direct bond purchases are an option, several accessible
            investment vehicles allow you to generate passive income from bonds
            without the need for extensive market knowledge or direct
            management.
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div
              class="bg-slate-800 p-8 rounded-lg shadow-xl border border-white/30 hover:scale-105 transition-transform duration-300 flex flex-col items-center text-center">
              <div class="relative w-full h-60 rounded-md overflow-hidden mb-6">
                <NuxtImg
                  placeholder
                  src="https://get.ycharts.com/wp-content/uploads/2021/12/SP-500-vs-Bloomberg-Bond-Aggregate-vs-10-Year.png"
                  alt="Bond ETF Chart"
                  class="absolute inset-0 w-full h-full object-cover" />
              </div>
              <h3 class="text-2xl font-semibold text-slate-200 mb-4">
                Bond ETFs and Mutual Funds
              </h3>
              <p class="text-base text-slate-400">
                Exchange Traded Funds (ETFs) and mutual funds that invest in
                bonds provide instant diversification across a basket of bonds.
                This allows investors to gain exposure to various bond types,
                maturities, and issuers with a single investment, simplifying
                the process of earning passive income from bond interest
                payments.
              </p>
            </div>
            <div
              class="bg-slate-800 p-8 rounded-lg shadow-xl border border-white/30 hover:scale-105 transition-transform duration-300 flex flex-col items-center text-center">
              <div class="relative w-full h-60 rounded-md overflow-hidden mb-6">
                <NuxtImg
                  placeholder
                  src="https://www.idfcfirstbank.com/content/dam/idfcfirstbank/images/blog/finance/what-is-portfolio-management-717x404.jpg"
                  alt="Professional Portfolio Management"
                  class="absolute inset-0 w-full h-full object-cover" />
              </div>
              <h3 class="text-2xl font-semibold text-slate-200 mb-4">
                Managed Bond Portfolios
              </h3>
              <p class="text-base text-slate-400">
                For a truly hands-off approach, professional financial managers
                can construct and manage a bond portfolio on your behalf. These
                managed accounts aim to optimize yield and mitigate risk
                according to your financial goals, providing a seamless way to
                generate consistent passive income from bonds.
              </p>
            </div>
          </div>
        </section>

        <section class="py-16 px-16 bg-slate-800 text-center">
          <h2 class="text-4xl font-bold text-primary-500 mb-8">
            Secure Your Future with Bonds through {{ appName }}
          </h2>
          <p class="text-base text-slate-300 mb-10 max-w-4xl mx-auto">
            At {{ appName }}, we emphasize the importance of a balanced
            portfolio, and bonds are a crucial component for achieving stability
            and generating reliable passive income. We simplify your access to
            the bond market, ensuring your investments are secure and fruitful.
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
            <div class="flex flex-col items-center">
              <NuxtImg
                placeholder
                src="https://cdn.corporatefinanceinstitute.com/assets/financial-advisor.jpg"
                alt="Financial Advisor Discussing Bonds"
                class="w-full h-64 object-cover rounded-lg mb-6 shadow-md border border-primary-500" />
              <h3 class="text-2xl font-semibold text-slate-200 mb-4">
                Optimized Bond Portfolio Creation
              </h3>
              <p class="text-base text-slate-400">
                {{ appName }} leverages advanced analytics and expert insights
                to identify high-quality bonds and bond funds that align with
                your risk tolerance and income goals. We construct diversified
                bond portfolios designed to provide steady returns and act as a
                buffer against market fluctuations, ensuring a reliable stream
                of passive income.
              </p>
            </div>
            <div class="flex flex-col items-center">
              <NuxtImg
                placeholder
                src="https://thumbs.dreamstime.com/b/explore-concept-passive-income-which-allows-individuals-to-earn-money-regularly-minimal-involvement-understand-how-373589819.jpg"
                alt="Secure Digital Platform"
                class="w-full h-64 object-cover rounded-lg mb-6 shadow-md border border-primary-500" />
              <h3 class="text-2xl font-semibold text-slate-200 mb-4">
                Effortless Passive Income Generation
              </h3>
              <p class="text-base text-slate-400">
                With {{ appName }}, you don't need to become a bond market
                expert. Our platform handles the intricacies of bond selection,
                purchase, and management. We focus on delivering consistent
                interest payments directly to you, making it simple to achieve
                your passive income aspirations through the stability of bonds.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>

    <div>
      <MainCtaBanner />
    </div>
  </div>
</template>
