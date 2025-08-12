import { b as useRuntimeConfig, d as __nuxt_component_0$1, e as _sfc_main$d } from './server.mjs';
import { _ as __nuxt_component_1 } from './cta-banner-DdIrk4Vz.mjs';
import { defineComponent, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import '../nitro/nitro.mjs';
import 'node:path';
import 'fs/promises';
import 'axios';
import 'path';
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
  __name: "track-record",
  __ssrInlineRender: true,
  setup(__props) {
    const { appName } = useRuntimeConfig().public;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtImg = __nuxt_component_0$1;
      const _component_NuxtIcon = _sfc_main$d;
      const _component_MainCtaBanner = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex flex-col items-center py-16" }, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><section class="relative w-full h-[450px] overflow-hidden rounded-lg mb-20 flex items-center justify-center text-center">`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        placeholder: "",
        src: "https://emialliance.com/wp-content/uploads/2017/06/Track_Record_Picture.jpg",
        alt: "Abstract financial graph showing an upward trend",
        class: "absolute inset-0 w-full h-full object-cover brightness-50"
      }, null, _parent));
      _push(`<div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div><div class="relative z-10 p-8"><h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary-200 leading-tight mb-6 animate-fade-in-up">Our Proven Path: ${ssrInterpolate(unref(appName))}&#39;s Track Record</h1><p class="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto animate-fade-in-up delay-200">Consistency, growth, and trust define our performance. Discover the results that speak for themselves and reflect our commitment to your financial success.</p></div></section><section class="mb-20 py-12 px-8 bg-slate-800 rounded-lg shadow-inner border border-white/30"><h2 class="text-3xl font-bold text-tertiary-500 mb-10 text-center">Consistent Performance, Real Impact</h2><p class="text-base text-slate-300 mb-8 text-center max-w-4xl mx-auto">At ${ssrInterpolate(unref(appName))}, our track record is built on a foundation of intelligent strategies and disciplined execution. We consistently strive to deliver strong performance across diversified portfolios, helping our users achieve their passive income and wealth-building objectives. While past performance is not a guarantee of future results, our history demonstrates our ability to navigate market conditions and remain focused on long-term growth.</p><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"><div class="p-6 bg-slate-900 rounded-lg shadow-lg border border-primary-500 flex flex-col items-center text-center"><div class="text-5xl text-primary-500 mb-4">`);
      _push(ssrRenderComponent(_component_NuxtIcon, { name: "lucide-line-chart" }, null, _parent));
      _push(`</div><h3 class="text-xl font-semibold text-slate-200 mb-2">Steady Portfolio Growth</h3><p class="text-base text-slate-400">Our carefully constructed, diversified portfolios have demonstrated consistent upward trajectories over time, reflecting effective risk management and strategic asset allocation.</p></div><div class="p-6 bg-slate-900 rounded-lg shadow-lg border border-primary-500 flex flex-col items-center text-center"><div class="text-5xl text-primary-500 mb-4">`);
      _push(ssrRenderComponent(_component_NuxtIcon, { name: "lucide-hand-coins" }, null, _parent));
      _push(`</div><h3 class="text-xl font-semibold text-slate-200 mb-2">Reliable Passive Income</h3><p class="text-base text-slate-400">Many of our clients experience consistent payouts, demonstrating the effectiveness of our income-focused investment options in generating a steady stream of passive income.</p></div><div class="p-6 bg-slate-900 rounded-lg shadow-lg border border-primary-500 flex flex-col items-center text-center"><div class="text-5xl text-primary-500 mb-4">`);
      _push(ssrRenderComponent(_component_NuxtIcon, { name: "lucide-shield-check" }, null, _parent));
      _push(`</div><h3 class="text-xl font-semibold text-slate-200 mb-2">Resilience in Volatility</h3><p class="text-base text-slate-400">Our strategic asset allocation and rebalancing have helped portfolios maintain stability and recover effectively during periods of market volatility, protecting capital.</p></div></div></section><section class="mb-20 py-12 px-8"><h2 class="text-3xl font-bold text-tertiary-500 mb-10 text-center">The Engines of Our Success</h2><p class="text-base text-slate-300 mb-8 text-center max-w-4xl mx-auto">Our track record is a testament to the robust combination of technology, expertise, and a client-centric philosophy that defines ${ssrInterpolate(unref(appName))}.</p><div class="flex flex-wrap justify-center gap-8 mt-12"><div class="w-full md:w-1/3 p-6 bg-slate-800 rounded-lg shadow-md border border-white/30 text-center"><h3 class="text-xl font-semibold text-slate-200 mb-2">Intelligent Algorithms</h3><p class="text-base text-slate-400">Our advanced algorithms power smart asset allocation and dynamic rebalancing, constantly optimizing your portfolio for performance and risk.</p></div><div class="w-full md:w-1/3 p-6 bg-slate-800 rounded-lg shadow-md border border-white/30 text-center"><h3 class="text-xl font-semibold text-slate-200 mb-2">Expert Oversight</h3><p class="text-base text-slate-400">Behind the technology is a team of financial experts providing strategic insights and ensuring our methods remain cutting-edge and compliant.</p></div><div class="w-full md:w-1/3 p-6 bg-slate-800 rounded-lg shadow-md border border-white/30 text-center"><h3 class="text-xl font-semibold text-slate-200 mb-2">Diversification Core</h3><p class="text-base text-slate-400">We prioritize broad diversification across asset classes and geographies to mitigate risk and capture growth opportunities globally.</p></div></div></section><div>`);
      _push(ssrRenderComponent(_component_MainCtaBanner, { color: "primary" }, null, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/(main)/impact/track-record.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=track-record-42WhW-d5.mjs.map
