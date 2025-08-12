import { b as useRuntimeConfig, d as __nuxt_component_0$1, e as _sfc_main$d } from './server.mjs';
import { _ as __nuxt_component_1 } from './cta-banner-DdIrk4Vz.mjs';
import { defineComponent, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import '../nitro/nitro.mjs';
import 'node:path';
import 'fs/promises';
import 'path';
import 'fs';
import 'winston';
import 'axios';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:crypto';
import 'node:url';
import 'better-auth';
import 'better-auth/adapters/prisma';
import 'node:process';
import '@prisma/client/runtime/library';
import 'better-auth/plugins';
import 'nodemailer';
import '@iconify/utils';
import 'consola';
import 'ipx';
import 'vue-router';
import 'tailwindcss/colors';
import '@iconify/vue';
import 'reka-ui';
import '@vueuse/core';
import 'tailwind-variants';
import '@iconify/utils/lib/css/icon';
import 'perfect-debounce';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "story",
  __ssrInlineRender: true,
  setup(__props) {
    const { appName } = useRuntimeConfig().public;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtImg = __nuxt_component_0$1;
      const _component_NuxtIcon = _sfc_main$d;
      const _component_MainCtaBanner = __nuxt_component_1;
      _push(`<main${ssrRenderAttrs(_attrs)}><div class="grid *:[grid-column:1/2] *:[grid-row:1/2]"><div class="flex flex-col items-center justify-center z-10"><div class="text-white max-w-[32rem] text-center p-4 bg-slate-700/30 border border-white/30 backdrop-blur-[5px] rounded-xl"><h1 class="text-6xl font-medium">Our Story</h1><div class="mt-5"><p> Revolutionizing investment management through intelligent automation, transparent processes, and unwavering commitment to our clients&#39; financial success. </p></div></div></div><div class="h-96">`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        placeholder: "",
        src: "/img/pages/about/about-us.jpg",
        class: "h-full w-full object-cover"
      }, null, _parent));
      _push(`</div></div><div><div class="space-y-10 max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8"><p class="mt-4 text-lg">${ssrInterpolate(unref(appName))} was born out of a vision to simplify the world of investing and make smart asset management accessible to everyone, regardless of financial background or expertise. </p>`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        placeholder: "",
        src: "/img/pages/about/our-journey.jpg",
        alt: "Founders collaborating in early days",
        class: "w-full rounded-lg shadow-lg"
      }, null, _parent));
      _push(`<div class="space-y-6"><h2 class="text-2xl font-bold text-tertiary-500"> A Platform Built on Trust </h2><p> At our core, we believe that great investment opportunities shouldn&#39;t be locked behind complex jargon or exclusive financial clubs. That&#39;s why ${ssrInterpolate(unref(appName))} does the hard work for you — analyzing trends, selecting promising assets, and delivering returns without the stress of self-managed portfolios. </p></div><div class="bg-gradient-to-b from-primary-500/10 border border-white/10 rounded-lg p-8"><h2 class="text-2xl font-bold mb-6">Our Mission &amp; Core Values</h2><div class="grid md:grid-cols-2 gap-6"><div class="space-y-3"><h3 class="text-lg font-semibold text-tertiary-500"> Transparency First </h3><p class="text-slate-300"> Every decision, every trade, every fee is clearly communicated. No hidden costs, no surprise charges, no unclear performance metrics. </p></div><div class="space-y-3"><h3 class="text-lg font-semibold text-tertiary-500"> Innovation Through Technology </h3><p class="text-slate-300"> Leveraging cutting-edge AI and machine learning to identify opportunities that traditional analysis might miss. </p></div></div></div><div class="space-y-4"><h2 class="text-2xl text-tertiary-500 font-bold"> From Startup to Scalable Impact </h2><p> We started small — a passionate group of investment analysts, developers, and financial advisors frustrated with outdated, clunky platforms. Our first version was simple, but the mission was clear: remove friction, unlock performance. Today, we power hundreds of investment decisions daily and support a growing global user base. </p><p> From onboarding to payout, everything is streamlined. You choose your focus — we handle everything else. That&#39;s the ${ssrInterpolate(unref(appName))} promise. </p></div><div class="bg-slate-800 rounded-lg p-8 text-white"><h2 class="text-2xl font-bold text-center mb-8">Our Track Record</h2><div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"><div><div class="text-3xl font-bold text-blue-400">$50M+</div><div class="text-sm text-slate-300">Assets Under Management</div></div><div><div class="text-3xl font-bold text-green-400">15.2%</div><div class="text-sm text-slate-300">Average Annual Return</div></div><div><div class="text-3xl font-bold text-purple-400">2,500+</div><div class="text-sm text-slate-300">Active Investors</div></div><div><div class="text-3xl font-bold text-yellow-400">24/7</div><div class="text-sm text-slate-300">Market Monitoring</div></div></div></div><div class="space-y-6"><h2 class="text-2xl text-tertiary-500 font-bold"> Powered by Advanced Technology </h2><p class="text-slate-300">${ssrInterpolate(unref(appName))} employs sophisticated algorithms and real-time market analysis to make investment decisions. Our proprietary risk assessment models continuously monitor market conditions, automatically adjusting portfolios to protect your investments while maximizing growth opportunities. </p><div class="grid md:grid-cols-3 gap-6 mt-6"><div class="bg-white p-6 rounded-lg shadow-md border"><h3 class="font-semibold text-slate-800 mb-3"> AI-Driven Analysis </h3><p class="text-sm text-slate-600"> Machine learning models process thousands of data points to identify emerging market trends and investment opportunities. </p></div><div class="bg-white p-6 rounded-lg shadow-md border"><h3 class="font-semibold text-slate-800 mb-3">Risk Management</h3><p class="text-sm text-slate-600"> Dynamic portfolio rebalancing and stop-loss mechanisms protect your capital during market volatility. </p></div><div class="bg-white p-6 rounded-lg shadow-md border"><h3 class="font-semibold text-slate-800 mb-3"> Real-Time Execution </h3><p class="text-sm text-slate-600"> Lightning-fast trade execution ensures you never miss market opportunities or face unnecessary delays. </p></div></div></div><div class="bg-slate-800 rounded-lg p-6 mt-10"><h2 class="flex items-center gap-1 text-xl font-semibold text-white">`);
      _push(ssrRenderComponent(_component_NuxtIcon, {
        name: "lucide:badge-check",
        class: "text-green-400"
      }, null, _parent));
      _push(`Why People Trust Us </h2><ul class="list-disc list-inside mt-4 space-y-2 text-slate-300"><li> Fully managed investments tailored to your risk tolerance and goals </li><li>Transparent performance tracking and regular profit payouts</li><li>Global asset diversification without the complexity</li><li>Built-in risk protection and smart capital deployment</li><li>SEC-compliant operations with full regulatory oversight</li><li>24/7 customer support and dedicated account management</li></ul></div>`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        placeholder: "",
        src: "/img/pages/about/team-at-work.jpg",
        alt: "Team at work",
        class: "w-full rounded-lg shadow-xl mt-8"
      }, null, _parent));
      _push(`<div class="border-t border-t-white/20 pt-8 mt-8"><h2 class="text-xl font-bold text-tertiary-500 mb-4"> Security &amp; Compliance </h2><p class="text-slate-300 mb-4">${ssrInterpolate(unref(appName))} maintains the highest standards of security and regulatory compliance. Your funds are protected by industry-leading encryption, segregated accounts, and comprehensive insurance coverage. </p><div class="flex flex-wrap gap-4 text-sm text-slate-500"><span class="flex items-center gap-1">`);
      _push(ssrRenderComponent(_component_NuxtIcon, { name: "lucide:shield-check" }, null, _parent));
      _push(`SEC Registered </span><span class="flex items-center gap-1">`);
      _push(ssrRenderComponent(_component_NuxtIcon, { name: "lucide:lock" }, null, _parent));
      _push(`Bank-Level Security </span><span class="flex items-center gap-1">`);
      _push(ssrRenderComponent(_component_NuxtIcon, { name: "lucide:umbrella" }, null, _parent));
      _push(`SIPC Insured </span></div></div></div></div><div>`);
      _push(ssrRenderComponent(_component_MainCtaBanner, { color: "neutral" }, null, _parent));
      _push(`</div></main>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/(main)/about/story.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=story-DvdhyNqj.mjs.map
