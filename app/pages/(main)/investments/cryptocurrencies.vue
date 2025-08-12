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
        heading="Cryptocurrencies"
        subheading="Tap into the decentralized financial revolution. Understand how crypto works, how it's evolving, and how AssetFusionX simplifies your path into this exciting world."
        bg-image="/img/pages/investments/cryptocurrencies.jpg" />
    </div>

    <!-- INTRODUCTION TO CRYPTO -->
    <section class="py-20 px-12">
      <div class="w-full grid grid-cols-2 gap-12">
        <div>
          <h2 class="text-3xl font-semibold text-tertiary-500 mb-6">
            What is Cryptocurrency?
          </h2>
          <p class="text-slate-300 mb-4">
            Cryptocurrency is a form of digital asset designed to work as a
            medium of exchange through a decentralized network. Unlike
            traditional money, it's not controlled by any government or
            institution. Instead, it's powered by blockchain technology—a public
            ledger that records every transaction transparently and immutably.
          </p>
          <p class="text-slate-400">
            Bitcoin, the first cryptocurrency, sparked a revolution. Since then,
            thousands of digital assets have emerged, each offering unique use
            cases, from programmable contracts to decentralized finance (DeFi).
          </p>
        </div>
        <NuxtImg
          placeholder
          src="/img/pages/investments/what-is-cryptocurrency.png"
          alt="Explaining Crypto"
          class="block rounded-xl shadow-lg" />
      </div>
    </section>

    <!-- TIMELINE -->
    <section class="py-20 px-12">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl font-semibold text-primary-500 mb-10">
          Evolution of Cryptocurrency
        </h2>
        <ol class="relative border-l border-slate-700">
          <li class="mb-10 ml-6 relative">
            <span
              class="absolute w-4 h-4 bg-tertiary-500 rounded-full -left-8 top-2" />
            <h3 class="text-lg font-semibold text-slate-100">
              2009 - Bitcoin is Born
            </h3>
            <p class="text-slate-400">
              Satoshi Nakamoto releases the Bitcoin whitepaper, ushering in
              decentralized digital currency.
            </p>
          </li>
          <li class="mb-10 ml-6 relative">
            <span
              class="absolute w-4 h-4 bg-tertiary-500 rounded-full -left-8 top-2" />
            <h3 class="text-lg font-semibold text-slate-100">
              2015 - Ethereum Launches
            </h3>
            <p class="text-slate-400">
              Vitalik Buterin introduces smart contracts, changing how we build
              applications on the blockchain.
            </p>
          </li>
          <li class="mb-10 ml-6 relative">
            <span
              class="absolute w-4 h-4 bg-tertiary-500 rounded-full -left-8 top-2" />
            <h3 class="text-lg font-semibold text-slate-100">
              2020+ - DeFi & NFT Boom
            </h3>
            <p class="text-slate-400">
              Crypto moves beyond currency into decentralized lending, staking,
              collectibles, and more.
            </p>
          </li>
        </ol>
      </div>
    </section>

    <!-- WHY BLOCKCHAIN -->
    <section class="py-20 px-12 bg-slate-900">
      <div class="max-w-6xl mx-auto text-center">
        <h2 class="text-3xl font-semibold text-tertiary-500 mb-10">
          Why Blockchain Matters
        </h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-slate-800 p-6 rounded-2xl shadow-md">
            <div class="flex items-center justify-center mb-4">
              <NuxtIcon name="lucide:view" class="text-3xl text-tertiary-500" />
            </div>
            <h3 class="text-xl font-medium text-slate-100 mb-2">
              Transparency
            </h3>
            <p class="text-slate-400">
              Anyone can verify transactions, ensuring trust without centralized
              control.
            </p>
          </div>
          <div class="bg-slate-800 p-6 rounded-2xl shadow-md">
            <div class="flex items-center justify-center mb-4">
              <NuxtIcon
                name="lucide:lock-keyhole"
                class="text-3xl text-tertiary-500" />
            </div>
            <h3 class="text-xl font-medium text-slate-100 mb-2">Security</h3>
            <p class="text-slate-400">
              Decentralized networks and cryptography ensure data can't be
              tampered with.
            </p>
          </div>
          <div class="bg-slate-800 p-6 rounded-2xl shadow-md">
            <div class="flex items-center justify-center mb-4">
              <NuxtIcon
                name="lucide:person-standing"
                class="text-3xl text-tertiary-500" />
            </div>
            <h3 class="text-xl font-medium text-slate-100 mb-2">
              Accessibility
            </h3>
            <p class="text-slate-400">
              Open to anyone with an internet connection—bank the unbanked,
              globally.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ASSETFUSIONX INTEGRATION -->
    <section class="py-20 pl-12">
      <div class="mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="text-3xl font-semibold text-tertiary-500 mb-4">
            Crypto Investing with {{ appName }}
          </h2>
          <p class="text-slate-300 mb-4">
            {{ appName }} bridges the gap between you and the crypto universe.
            No keys to manage, no exchanges to navigate—just seamless exposure
            to high-growth digital assets.
          </p>
          <p class="text-slate-400">
            Our platform curates diversified crypto portfolios, manages
            volatility through algorithmic balancing, and ensures your capital
            is working smartly with automated reallocation, staking rewards, and
            real-time analytics.
          </p>
        </div>
        <NuxtImg
          placeholder
          src="/img/pages/investments/crypto-dashboard.png"
          :alt="`${appName} Crypto Dashboard`"
          class="rounded-l-xl shadow-lg h-96 object-cover object-top-right" />
      </div>
    </section>

    <!-- USE CASES -->
    <section class="py-20 px-12">
      <div class="max-w-6xl mx-auto text-center">
        <h2 class="text-3xl font-semibold text-tertiary-500 mb-10">
          Real-World Crypto Use Cases
        </h2>
        <div class="grid md:grid-cols-2 gap-8 text-left">
          <div class="bg-slate-800 p-6 rounded-xl">
            <h3 class="text-lg font-semibold mb-2">Cross-Border Payments</h3>
            <p class="text-slate-400">
              Send money globally in seconds with near-zero fees—no banks, no
              delays.
            </p>
          </div>
          <div class="bg-slate-800 p-6 rounded-xl">
            <h3 class="text-lg font-semibold mb-2">Stablecoins for Saving</h3>
            <p class="text-slate-400">
              Hedge against inflation with stablecoins pegged to fiat currencies
              like USDT and USDC.
            </p>
          </div>
          <div class="bg-slate-800 p-6 rounded-xl">
            <h3 class="text-lg font-semibold mb-2">Decentralized Lending</h3>
            <p class="text-slate-400">
              Earn interest or take out loans—all without credit checks or
              intermediaries.
            </p>
          </div>
          <div class="bg-slate-800 p-6 rounded-xl">
            <h3 class="text-lg font-semibold mb-2">
              NFTs and Digital Identity
            </h3>
            <p class="text-slate-400">
              Create, own, and trade digital assets—from art to
              certifications—with blockchain proof.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- TRUST + FAQ -->
    <section class="py-20 px-12">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-3xl font-semibold text-primary-500 mb-6 text-center">
          Your Trust, Secured
        </h2>
        <p class="text-slate-400 text-center mb-12">
          {{ appName }} partners with regulated custodians, employs
          military-grade encryption, and follows the highest standards in
          compliance and auditing.
        </p>
        <div class="space-y-6">
          <details class="bg-slate-800 p-4 rounded-xl">
            <summary class="cursor-pointer text-tertiary-500 font-medium">
              Do I need to manage my own wallet?
            </summary>
            <p class="text-slate-400 mt-2">
              No. {{ appName }} handles custody and wallet management, so you
              don't need to worry about private keys.
            </p>
          </details>
          <details class="bg-slate-800 p-4 rounded-xl">
            <summary class="cursor-pointer text-tertiary-500 font-medium">
              Is crypto too volatile?
            </summary>
            <p class="text-slate-400 mt-2">
              While volatility exists, our portfolios are diversified and
              actively rebalanced to manage risk while targeting returns.
            </p>
          </details>
          <details class="bg-slate-800 p-4 rounded-xl">
            <summary class="cursor-pointer text-tertiary-500 font-medium">
              Can I track my performance?
            </summary>
            <p class="text-slate-400 mt-2">
              Yes. Our dashboard provides real-time insights into portfolio
              performance, allocation, and profit/loss data.
            </p>
          </details>
        </div>
      </div>
    </section>

    <div>
      <MainCtaBanner />
    </div>
  </div>
</template>
