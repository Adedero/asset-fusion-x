import { _ as _sfc_main$a } from './Badge-q_8fq56_.mjs';
import { b as useRuntimeConfig, c as _sfc_main$7$1, d as __nuxt_component_0$1$1, e as _sfc_main$d } from './server.mjs';
import { defineComponent, useTemplateRef, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderStyle } from 'vue/server-renderer';
import { _ as __nuxt_component_1$1 } from './partner-list-DFKrSRN0.mjs';
import { E as publicAssetsURL } from '../nitro/nitro.mjs';
import { _ as __nuxt_component_3$1 } from './app-logo-h2drnef0.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import { _ as __nuxt_component_1$2 } from './cta-banner-DdIrk4Vz.mjs';
import 'reka-ui';
import 'vue-router';
import 'tailwindcss/colors';
import '@iconify/vue';
import '@vueuse/core';
import 'tailwind-variants';
import '@iconify/utils/lib/css/icon';
import 'perfect-debounce';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
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
import 'vue-fast-marquee';

function useTypewriter(elementRef, options = {}) {
  const defaultOptions = {
    speed: 50,
    loop: void 0,
    pause: 2e3,
    textPause: 2e3
  };
  const mergedOptions = { ...defaultOptions, ...options };
  let timeoutId = null;
  function getTextsFromElement(el) {
    if (el.dataset.text) {
      try {
        if (el.dataset.text.includes("|")) {
          return el.dataset.text.split("|").map((t) => t.trim());
        }
        const parsed = JSON.parse(el.dataset.text);
        return Array.isArray(parsed) ? parsed : [el.dataset.text];
      } catch {
        return el.dataset.text.includes("|") ? el.dataset.text.split("|").map((t) => t.trim()) : [el.dataset.text];
      }
    }
    const textAttrs = [];
    let i = 0;
    while (el.dataset[`text${i}`] !== void 0) {
      textAttrs.push(el.dataset[`text${i}`]);
      i++;
    }
    if (textAttrs.length > 0) return textAttrs;
    return [el.textContent || ""];
  }
  function typeText(el, text, i) {
    if (i < text.length) {
      if (i === 0) el.innerHTML = "";
      el.innerHTML += text.charAt(i);
      timeoutId = setTimeout(
        () => typeText(el, text, i + 1),
        mergedOptions.speed
      );
    } else {
      handleNextText(el);
    }
  }
  function handleNextText(el) {
    const state = el._typewriterState;
    const nextTextIndex = state.currentTextIndex + 1;
    if (nextTextIndex < state.texts.length) {
      state.currentTextIndex = nextTextIndex;
      timeoutId = setTimeout(() => {
        typeText(el, state.texts[nextTextIndex] || "", 0);
      }, mergedOptions.textPause);
    } else {
      handleLoop(el);
    }
  }
  function handleLoop(el) {
    const state = el._typewriterState;
    if (mergedOptions.loop === void 0 || state.currentLoop < mergedOptions.loop - 1) {
      state.currentLoop++;
      state.currentTextIndex = 0;
      timeoutId = setTimeout(() => {
        typeText(el, state.texts[0] || "", 0);
      }, mergedOptions.pause);
    }
  }
  function init() {
    const el = elementRef.value;
    if (!el) return;
    const texts = getTextsFromElement(el);
    if (!el.dataset.originalTexts) {
      el.dataset.originalTexts = JSON.stringify(texts);
    }
    el._typewriterState = {
      currentLoop: 0,
      currentTextIndex: 0,
      texts
    };
    typeText(el, texts[0] || "", 0);
  }
  function restart() {
    const el = elementRef.value;
    if (el && el._typewriterState) {
      el._typewriterState.currentLoop = 0;
      el._typewriterState.currentTextIndex = 0;
      init();
    }
  }
  function stop() {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  }
  return {
    restart,
    stop
  };
}
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "hero",
  __ssrInlineRender: true,
  setup(__props) {
    const config = useRuntimeConfig();
    const typewriter = useTemplateRef("typewriter");
    useTypewriter(typewriter);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtBadge = _sfc_main$a;
      const _component_NuxtButton = _sfc_main$7$1;
      const _component_NuxtImg = __nuxt_component_0$1$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-2 gap-5 px-8 pt-20 items-center" }, _attrs))}><div class="space-y-4">`);
      _push(ssrRenderComponent(_component_NuxtBadge, {
        color: "neutral",
        variant: "subtle",
        icon: "lucide:command",
        label: "Your best partner for wealth growth",
        class: "rounded-full py-1.5 px-3"
      }, null, _parent));
      _push(`<div class="h-60 grid items-end"><h1${ssrRenderAttr("data-text", `Grow your wealth with expert-managed investments. | Choose your investment. We handle the rest. | Multiply your assets with our solid investment plans. | Everything made ridiculously easy with ${unref(config).public.appName}.`)} class="text-6xl"> Grow your wealth with expert-managed investments. </h1></div><p class="text-slate-300">${ssrInterpolate(unref(config).public.appName)} lets you pick from curated investment opportunities. You choose where to put your money — we do the work, and you enjoy the returns. </p><div class="flex items-center gap-4">`);
      _push(ssrRenderComponent(_component_NuxtButton, {
        to: "/sign-in",
        icon: "lucide:rocket",
        label: "Get Started",
        size: "lg",
        class: "rounded-full text-white"
      }, null, _parent));
      _push(ssrRenderComponent(_component_NuxtButton, {
        to: "/about/story",
        icon: "lucide:message-circle-question",
        label: "About Us",
        size: "lg",
        variant: "link"
      }, null, _parent));
      _push(`</div></div><div class="grid">`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        placeholder: "",
        src: "/img/buildings.gif",
        class: "rounded-2xl"
      }, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/main/home/hero.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const __nuxt_component_0$1 = Object.assign(_sfc_main$9, { __name: "MainHomeHero" });
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "market-insights-widget",
  __ssrInlineRender: true,
  setup(__props) {
    useTemplateRef("widget");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="tradingview-widget-container" style="${ssrRenderStyle({ "height": "550px", "width": "100%" })}"><div class="tradingview-widget-container__widget" style="${ssrRenderStyle({ "height": "calc(100% - 32px)", "width": "100%" })}"></div><div class="tradingview-widget-copyright"><a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"><span class="blue-text">Track all markets on TradingView</span></a></div></div></div>`);
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/main/home/market-insights-widget.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main$8, { __name: "MainHomeMarketInsightsWidget" });
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "market-insights",
  __ssrInlineRender: true,
  setup(__props) {
    const config = useRuntimeConfig();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtButton = _sfc_main$7$1;
      const _component_MainHomeMarketInsightsWidget = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "px-16 py-12" }, _attrs))}><div class="grid gap-10 grid-cols-5"><div class="col-span-2"><p class="text-5xl text-tertiary-500 my-10">Market Insights</p><p class="mt-2"> The global financial landscape is rapidly evolving, and digital assets are at the forefront of this transformation. Stay ahead with real-time insights, expert analysis, and the latest trends in cryptocurrency, stocks, and alternative investments. ${ssrInterpolate(unref(config).public.appName)} empowers you to make informed decisions in a dynamic market environment. </p><div class="flex items-center gap-4 mt-10">`);
      _push(ssrRenderComponent(_component_NuxtButton, {
        to: "/resources/market-insights",
        icon: "lucide:lightbulb",
        size: "lg",
        label: "Learn More",
        class: "rounded-full text-white"
      }, null, _parent));
      _push(ssrRenderComponent(_component_NuxtButton, {
        to: "/sign-up",
        icon: "lucide:user-round-check",
        label: "Get An Advisor",
        size: "lg",
        variant: "link"
      }, null, _parent));
      _push(`</div></div><div class="col-span-3 bg-muted">`);
      _push(ssrRenderComponent(_component_MainHomeMarketInsightsWidget, null, null, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/main/home/market-insights.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main$7, { __name: "MainHomeMarketInsights" });
const investmentOptions = [
  {
    icon: "lucide:trending-up",
    name: "Stocks",
    description: "Own a piece of leading companies and benefit from growth and dividends."
  },
  {
    icon: "lucide:bitcoin",
    name: "Cryptocurrencies",
    description: "Dive into the future of finance with decentralized digital assets."
  },
  {
    icon: "lucide:dollar-sign",
    name: "Forex",
    description: "Trade global currencies and capitalize on exchange rate movements."
  },
  {
    icon: "lucide:building",
    name: "REITs",
    description: "Invest in real estate portfolios without direct property ownership."
  },
  {
    icon: "lucide:factory",
    name: "Commodities",
    description: "Hedge against inflation and invest in essential raw materials like gold and oil."
  },
  {
    icon: "lucide:scale",
    name: "Bonds",
    description: "Secure stable returns and preserve capital with government and corporate debt."
  },
  {
    icon: "lucide:git-fork",
    name: "Derivatives",
    description: "Utilize advanced contracts for hedging or amplifying market exposure."
  }
];
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "investment-options",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtIcon = _sfc_main$d;
      const _component_NuxtImg = __nuxt_component_0$1$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "px-12 pt-4 pb-12 grid grid-cols-5 items-center gap-5" }, _attrs))}><div class="gap-5 col-span-3 overflow-y-hidden"><div class="grid grid-cols-2 items-center gap-2 w-full"><!--[-->`);
      ssrRenderList(unref(investmentOptions), (option) => {
        _push(`<div class="p-4 bg-slate-800/50 border border-slate-700 bg-gradient-t-b from-primary/50 rounded-xl"><header class="flex items-center gap-2"><div class="w-8 h-8 border border-tertiary-500/50 bg-gradient-to-b from-primary-500/40 rounded-lg grid place-content-center">`);
        _push(ssrRenderComponent(_component_NuxtIcon, {
          name: option.icon
        }, null, _parent));
        _push(`</div><p class="font-semibold">${ssrInterpolate(option.name)}</p></header><div class="mt-2 text-sm"><p class="truncate">${ssrInterpolate(option.description)}</p></div></div>`);
      });
      _push(`<!--]--></div></div><div class="pt-4 pb-12 col-span-2"><div class="text-5xl"><h2>Investment Options</h2></div><div class="mt-6"><p class="text-slate-300"> Browse our carefully designed investment tracks. Choose what fits your goals — from low-risk growth to aggressive returns — and let us do the rest. </p></div><div class="mt-6">`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        src: "/img/investment.gif",
        placeholder: "",
        class: "rounded-xl h-48 object-cover"
      }, null, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/main/home/investment-options.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __nuxt_component_3 = Object.assign(_sfc_main$6, { __name: "MainHomeInvestmentOptions" });
const _imports_0$1 = publicAssetsURL("/vid/animation-02.mp4");
const reasons = [
  {
    label: "You pick. We execute.",
    description: "Select from expertly vetted investment tracks. Once you choose, we manage everything — from allocation to optimization — for maximum growth.",
    icon: "lucide:check-circle"
  },
  {
    label: "Reliable returns",
    description: "Our investment teams and systems are built to reduce risk and deliver steady profits. Your money doesn't sit idle — it works for you.",
    icon: "lucide:trending-up"
  },
  {
    label: "No hassle, no guesswork",
    description: "Forget about reading market news or managing trades. We keep you updated with performance reports while we handle the heavy lifting.",
    icon: "lucide:bar-chart-2"
  }
];
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "why-choose-us",
  __ssrInlineRender: true,
  setup(__props) {
    const { appName } = useRuntimeConfig().public;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtIcon = _sfc_main$d;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "px-12 pt-4 pb-12" }, _attrs))}><div class="text-5xl"><h2>Why choose</h2><h2 class="text-tertiary-500">${ssrInterpolate(unref(appName))}?</h2></div><div class="mt-6 grid grid-cols-3 gap-5"><div class="col-span-2"><p class="text-slate-300 w-[80%]">${ssrInterpolate(unref(appName))} gives you control over where your money goes — and then takes care of everything else. No market stress, no trading screens, just solid results. </p><div class="mt-4"><div class="bg-slate-700 rounded-xl overflow-hidden"><video${ssrRenderAttr("src", _imports_0$1)} autoplay muted loop class="w-full h-[28rem] object-cover"> Your browser does not support the video tag </video></div></div></div><div class="col-span-1 grid gap-4"><!--[-->`);
      ssrRenderList(unref(reasons), (reason) => {
        _push(`<div class="border border-slate-300/20 bg-slate-700/30 backdrop-blur-lg p-4 rounded-xl"><header class="flex items-center gap-2"><div class="bg-slate-700 rounded-lg p-2 w-8 h-8 grid place-content-center">`);
        _push(ssrRenderComponent(_component_NuxtIcon, {
          name: reason.icon
        }, null, _parent));
        _push(`</div><p class="font-semibold">${ssrInterpolate(reason.label)}</p></header><div class="text-sm mt-2 text-slate-300">${ssrInterpolate(reason.description)}</div></div>`);
      });
      _push(`<!--]--></div></div></div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/main/home/why-choose-us.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_4 = Object.assign(_sfc_main$5, { __name: "MainHomeWhyChooseUs" });
const _imports_0 = publicAssetsURL("/vid/animation-01.mp4");
const features = [
  {
    label: "Curated investment tracks",
    description: "Our team designs smart, transparent investment routes. Pick the one that aligns with your risk appetite and timeline.",
    icon: "lucide:folder-open"
  },
  {
    label: "Automated execution",
    description: "We handle allocation, rebalancing, and monitoring — all powered by data and managed by experts.",
    icon: "lucide:cpu"
  },
  {
    label: "Performance insights",
    description: "You stay informed with clear, digestible updates about your portfolio's growth and trajectory.",
    icon: "lucide:line-chart"
  },
  {
    label: "Risk-adjusted growth models",
    description: "Our algorithms adapt your investment performance to your chosen risk level — ensuring you're not overexposed while maximizing your upside.",
    icon: "lucide:shield-check"
  }
];
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "features",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtIcon = _sfc_main$d;
      const _component_AppLogo = __nuxt_component_3$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "px-12 pt-4 pb-12" }, _attrs))}><div class="text-5xl"><h2>Advanced Trading</h2><h2 class="text-tertiary-500">Features &amp; Tools</h2></div><div class="mt-8 grid grid-cols-2 gap-5"><div><ul class="grid gap-6"><!--[-->`);
      ssrRenderList(unref(features), (feature) => {
        _push(`<li><div class="flex items-center gap-4"><div>`);
        _push(ssrRenderComponent(_component_NuxtIcon, {
          name: feature.icon
        }, null, _parent));
        _push(`</div><div><p class="font-semibold">${ssrInterpolate(feature.label)}</p><p class="text-slate-300 text-sm">${ssrInterpolate(feature.description)}</p></div></div></li>`);
      });
      _push(`<!--]--></ul></div><div class="rounded-xl bg-slate-800 p-2 grid grid-cols-2 gap-2"><div class="cursor-context-menu col-span-1 bg-slate-700/30 p-4 rounded-xl"><h4>My Sales</h4><div class="mt-3 space-y-1"><p class="text-sm text-slate-300">Investment Gain</p><p class="text-3xl font-semibold">$2,491.34</p></div></div><div class="cursor-context-menu col-span-1 bg-slate-700/30 p-4 rounded-xl grid"><header class="flex items-center gap-4 justify-between"><p class="text-slate-300">Profile</p><div class="flex items-center gap-2"><p class="font-medium">98e3...6eb4</p>`);
      _push(ssrRenderComponent(_component_NuxtIcon, { name: "lucide:copy" }, null, _parent));
      _push(`</div></header><div class="mt-3 flex items-end gap-2 justify-between"><div class="aspect-square p-2 border border-tertiary/20 bg-gradient-to-b from-primary-500/30 overflow-hidden rounded-full">`);
      _push(ssrRenderComponent(_component_AppLogo, { size: "28" }, null, _parent));
      _push(`</div><button class="flex items-center gap-2 bg-primary rounded-full px-5 py-2">`);
      _push(ssrRenderComponent(_component_NuxtIcon, { name: "lucide:circle-arrow-right" }, null, _parent));
      _push(`<p>AssetFusionX</p></button></div></div><div class="cursor-context-menu col-span-2 bg-slate-700/30 rounded-xl"><video autoplay muted loop${ssrRenderAttr("src", _imports_0)} class="w-full h-60 object-cover rounded-xl"> Your browser does not support the video tag </video></div></div></div></div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/main/home/features.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_5 = Object.assign(_sfc_main$4, { __name: "MainHomeFeatures" });
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "cryptocurrency-market-widget",
  __ssrInlineRender: true,
  setup(__props) {
    useTemplateRef("widget");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="tradingview-widget-container"><div class="tradingview-widget-container__widget"></div><div class="tradingview-widget-copyright"><a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"><span class="blue-text">Track all markets on TradingView</span></a></div></div></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/main/home/cryptocurrency-market-widget.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main$3, { __name: "MainHomeCryptocurrencyMarketWidget" });
const _sfc_main$2 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_MainHomeCryptocurrencyMarketWidget = __nuxt_component_0;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "px-16 py-12" }, _attrs))}><p class="text-5xl text-center text-tertiary-500 my-10"> Cryptocurrency Market </p>`);
  _push(ssrRenderComponent(_component_MainHomeCryptocurrencyMarketWidget, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/main/home/cryptocurrency-market.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_6 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender]]), { __name: "MainHomeCryptocurrencyMarket" });
const customers = [
  {
    label: "Business Owners & Executives",
    description: "Let your idle capital work harder while you focus on running your business.",
    image: "/img/customers/executives.jpg"
  },
  {
    label: "Private Clients",
    description: "Build generational wealth through strategic hands-off investing.",
    image: "/img/customers/private-clients.jpg"
  },
  {
    label: "Retirees & Pre-retirees",
    description: "Enjoy peace of mind with options built for stability and consistent returns.",
    image: "/img/customers/retirees.jpg"
  },
  {
    label: "Smart Investors",
    description: "If you know the value of compounding, we'll help your capital do more.",
    image: "/img/customers/investors.jpg"
  },
  {
    label: "New to investing?",
    description: "We simplify the complex. Choose a plan, fund it, and watch it grow.",
    image: "/img/customers/new-to-investing.jpg"
  }
];
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "who-we-serve",
  __ssrInlineRender: true,
  setup(__props) {
    const { appName } = useRuntimeConfig().public;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtImg = __nuxt_component_0$1$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "px-12 pt-4 pb-12" }, _attrs))}><div class="text-5xl w-fit space-y-2"><h2>Who We Serve</h2><div class="h-0.5 rounded-full w-[80%] bg-tertiary"></div></div><div class="mt-6"><p class="text-base text-slate-300 w-1/2"> Whether you&#39;re planning ahead, growing your wealth, or diversifying your portfolio, ${ssrInterpolate(unref(appName))} makes investing accessible and effective. </p><div class="mt-6 grid grid-cols-5 gap-5 place-content-center"><!--[-->`);
      ssrRenderList(unref(customers), (customer) => {
        _push(`<div class="bg-slate-700 rounded-xl overflow-hidden flex h-96 group relative"><div class="absolute z-10 bottom-2.5 left-1/2 -translate-x-1/2 p-4 w-[90%] bg-slate-800/40 border border-white/20 backdrop-blur-md rounded-xl transition-all duration-300 opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 cursor-context-menu"><p class="font-semibold text-sm">${ssrInterpolate(customer.label)}</p><p class="text-slate-100 text-sm mt-3">${ssrInterpolate(customer.description)}</p></div><div class="w-full h-full saturate-0 group-hover:saturate-100 duration-300 transition-all">`);
        _push(ssrRenderComponent(_component_NuxtImg, {
          src: customer.image,
          placeholder: "",
          class: "h-full w-full object-cover"
        }, null, _parent));
        _push(`</div></div>`);
      });
      _push(`<!--]--></div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/main/home/who-we-serve.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_7 = Object.assign(_sfc_main$1, { __name: "MainHomeWhoWeServe" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MainHomeHero = __nuxt_component_0$1;
      const _component_MainPartnerList = __nuxt_component_1$1;
      const _component_MainHomeMarketInsights = __nuxt_component_2;
      const _component_MainHomeInvestmentOptions = __nuxt_component_3;
      const _component_MainHomeWhyChooseUs = __nuxt_component_4;
      const _component_MainHomeFeatures = __nuxt_component_5;
      const _component_MainHomeCryptocurrencyMarket = __nuxt_component_6;
      const _component_MainHomeWhoWeServe = __nuxt_component_7;
      const _component_MainCtaBanner = __nuxt_component_1$2;
      _push(`<div${ssrRenderAttrs(_attrs)}><div>`);
      _push(ssrRenderComponent(_component_MainHomeHero, null, null, _parent));
      _push(`</div><div>`);
      _push(ssrRenderComponent(_component_MainPartnerList, null, null, _parent));
      _push(`</div><div>`);
      _push(ssrRenderComponent(_component_MainHomeMarketInsights, null, null, _parent));
      _push(`</div><div>`);
      _push(ssrRenderComponent(_component_MainHomeInvestmentOptions, null, null, _parent));
      _push(`</div><div>`);
      _push(ssrRenderComponent(_component_MainHomeWhyChooseUs, null, null, _parent));
      _push(`</div><div>`);
      _push(ssrRenderComponent(_component_MainHomeFeatures, null, null, _parent));
      _push(`</div><div>`);
      _push(ssrRenderComponent(_component_MainHomeCryptocurrencyMarket, null, null, _parent));
      _push(`</div><div>`);
      _push(ssrRenderComponent(_component_MainHomeWhoWeServe, null, null, _parent));
      _push(`</div><div>`);
      _push(ssrRenderComponent(_component_MainCtaBanner, null, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CycDW_RA.mjs.map
