import { _ as __nuxt_component_0, b as useRuntimeConfig } from './server.mjs';
import { _ as _sfc_main$2 } from './Separator-CASM5IPY.mjs';
import { defineComponent, withCtx, createTextVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import _sfc_main$1 from './sign-in-form-aqHXmSWh.mjs';
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
import 'cron';
import 'decimal.js';
import 'node:process';
import 'node:url';
import '@prisma/client/runtime/library';
import 'nodemailer';
import 'dotenv';
import 'better-auth';
import 'better-auth/adapters/prisma';
import 'better-auth/plugins';
import '@iconify/utils';
import 'consola';
import 'ipx';
import 'vue-router';
import 'better-auth/vue';
import 'better-auth/client/plugins';
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
import './fetch-error-alert-Bcg5pKlj.mjs';
import './Alert-BqT4iGv1.mjs';
import './Form-CN89EuEL.mjs';
import './FormField-VKcmi1Hz.mjs';
import './Input-BKsvNLhE.mjs';
import './password-D6D0QNxS.mjs';
import './Checkbox-U0HjhKnj.mjs';
import '../_/schemas.mjs';
import 'zod';
import './auth.store-DTpRpa90.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const runtimeConfig = useRuntimeConfig();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_NuxtSeparator = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 class="text-lg font-semibold">Sign In</h1><div class="text-sm text-muted"> Don&#39;t have an account? `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "text-primary font-semibold hover:underline",
        to: { name: "sign-up" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Sign up `);
          } else {
            return [
              createTextVNode(" Sign up ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(` instead. </div><div class="my-5">`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`</div><div>`);
      _push(ssrRenderComponent(_component_NuxtSeparator, { class: "my-5" }, null, _parent));
      _push(`<p class="text-xs text-muted"> By using ${ssrInterpolate(unref(runtimeConfig).public.appName)}, you admit to having read and agreed to our `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "font-medium text-primary hover:underline",
        target: "_blank",
        to: "/legal/terms-of-use"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` terms of use `);
          } else {
            return [
              createTextVNode(" terms of use ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(` and `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "font-medium text-primary hover:underline",
        target: "_blank",
        to: "/legal/privacy-policy"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` privacy policy `);
          } else {
            return [
              createTextVNode(" privacy policy ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/(auth)/sign-in/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-Dj_72ZFE.mjs.map
