import { _ as __nuxt_component_0, a as __nuxt_component_11 } from './color-mode-toggler-CmVQ4U3G.mjs';
import { _ as __nuxt_component_3 } from './app-logo-h2drnef0.mjs';
import { h as __nuxt_component_12, b as useRuntimeConfig } from './server.mjs';
import { _ as _sfc_main$2 } from './Separator-C2D_H5pj.mjs';
import { defineComponent, unref, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { _ as _sfc_main$1 } from './Card-HL6icAYQ.mjs';
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
  __name: "auth",
  __ssrInlineRender: true,
  setup(__props) {
    const runtimeConfig = useRuntimeConfig();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLoadingIndicator = __nuxt_component_0;
      const _component_AppLogo = __nuxt_component_3;
      const _component_NuxtPage = __nuxt_component_12;
      const _component_NuxtSeparator = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_NuxtLoadingIndicator, null, null, _parent));
      _push(`<div class="min-h-[calc(100dvh-5rem)] flex-center"><div class="w-full max-w-96 my-20">`);
      _push(ssrRenderComponent(unref(_sfc_main$1), null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$1), {
              class: "w-fit",
              variant: "subtle",
              ui: { body: "p-2.5 sm:p-2.5" }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_AppLogo, { size: "32" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_AppLogo, { size: "32" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$1), {
                class: "w-fit",
                variant: "subtle",
                ui: { body: "p-2.5 sm:p-2.5" }
              }, {
                default: withCtx(() => [
                  createVNode(_component_AppLogo, { size: "32" })
                ]),
                _: 1
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtPage, null, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", null, [
                createVNode(_component_NuxtPage)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><footer>`);
      _push(ssrRenderComponent(_component_NuxtSeparator, { class: "my-5" }, null, _parent));
      _push(`<div class="flex items-center gap-1 justify-between flex-wrap px-5 pb-5"><div class="flex items-center gap-1"><div class="flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_AppLogo, { size: "24" }, null, _parent));
      _push(`<p class="font-semibold">${ssrInterpolate(unref(runtimeConfig).public.appName)}</p></div><p> © ${ssrInterpolate(unref(runtimeConfig).public.appCopyrightYear)}. All rights reserved </p></div><div class="flex items-center justify-end gap-4 text-sm"><p class="text-primary hover:underline">Privacy Policy</p><p class="text-primary hover:underline">Terms of Use</p>`);
      _push(ssrRenderComponent(__nuxt_component_11, null, null, _parent));
      _push(`</div></div></footer></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/auth.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=auth-hK5uQ01u.mjs.map
