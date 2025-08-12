import { d as __nuxt_component_0$1, e as _sfc_main$d } from './server.mjs';
import { _ as __nuxt_component_1 } from './partner-list-DFKrSRN0.mjs';
import { _ as _sfc_main$1 } from './Separator-C2D_H5pj.mjs';
import { _ as __nuxt_component_1$1 } from './cta-banner-DdIrk4Vz.mjs';
import { defineComponent, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
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
import 'vue-fast-marquee';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "partnerships",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtImg = __nuxt_component_0$1;
      const _component_MainPartnerList = __nuxt_component_1;
      const _component_NuxtSeparator = _sfc_main$1;
      const _component_NuxtIcon = _sfc_main$d;
      const _component_MainCtaBanner = __nuxt_component_1$1;
      _push(`<main${ssrRenderAttrs(_attrs)}><div class="grid *:[grid-column:1/2] *:[grid-row:1/2]"><div class="flex flex-col items-center justify-center z-10"><div class="max-w-[32rem] text-center p-4 bg-slate-700/30 border border-white/50 backdrop-blur-[5px] rounded-xl"><p class="text-6xl font-medium">Partnerships</p><div class="mt-5"><p>Together, We Build the Future of Wealth Management.</p></div></div></div><div class="h-96">`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        placeholder: "",
        src: "/img/pages/about/partnerships.jpg",
        class: "h-full w-full object-cover"
      }, null, _parent));
      _push(`</div></div><div><div class="max-w-5xl mx-auto pt-12 px-4 sm:px-6 lg:px-8 space-y-12"><div class="text-center space-y-4"><h1 class="mt-8 text-2xl font-extrabold text-tertiary-500"> Partnerships that Power Progress </h1><p class="text-slate-300 max-w-3xl mx-auto"> At AssetFusionX, we know that meaningful innovation doesn&#39;t happen in isolation. Our platform is built on a foundation of deep collaboration with leading technology providers, financial institutions, and data intelligence firms who share our vision for frictionless investing and responsible wealth creation. </p></div><blockquote class="flex items-center justify-center w-full"><div class="max-w-[28rem] bg-slate-800 rounded-lg p-6 border border-white/10 text-slate-200 italic text-center"> “The strength of our platform is a reflection of the extraordinary partners who help us imagine what&#39;s possible and bring it to life.” </div></blockquote></div></div>`);
      _push(ssrRenderComponent(_component_MainPartnerList, null, null, _parent));
      _push(`<div class="px-12 pb-12 space-y-6"><p class="text-xl font-semibold text-tertiary-500"> What We Look for in a Partner </p>`);
      _push(ssrRenderComponent(_component_NuxtSeparator, null, null, _parent));
      _push(`<ul class="grid gap-4"><li class="flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_NuxtIcon, {
        class: "text-green-500",
        name: "lucide:badge-check"
      }, null, _parent));
      _push(`<p>Technological innovation that aligns with scalable architecture</p></li><li class="flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_NuxtIcon, {
        class: "text-green-500",
        name: "lucide:badge-check"
      }, null, _parent));
      _push(`<p>Commitment to security, compliance, and transparency</p></li><li class="flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_NuxtIcon, {
        class: "text-green-500",
        name: "lucide:badge-check"
      }, null, _parent));
      _push(`<p>Shared mission for empowering users financially</p></li><li class="flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_NuxtIcon, {
        class: "text-green-500",
        name: "lucide:badge-check"
      }, null, _parent));
      _push(`<p>Deep expertise and proven success in their respective domains</p></li></ul></div><div>`);
      _push(ssrRenderComponent(_component_MainCtaBanner, { color: "neutral" }, null, _parent));
      _push(`</div></main>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/(main)/about/partnerships.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=partnerships-C2OVBF3i.mjs.map
