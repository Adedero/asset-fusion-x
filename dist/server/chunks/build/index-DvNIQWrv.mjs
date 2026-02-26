import { _ as _sfc_main$2 } from './Separator-s2cjcbon.mjs';
import { defineComponent, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import _sfc_main$1 from './sign-up-form-D71ozQJx.mjs';
import { _ as __nuxt_component_0, c as useRuntimeConfig } from './server.mjs';
import 'reka-ui';
import '@vueuse/core';
import './fetch-error-alert-Cos-JGNP.mjs';
import './Alert-9mK7K0n2.mjs';
import './Form-BhNutJZb.mjs';
import './FormField-DYdB-maE.mjs';
import './Input-CFyDl-v5.mjs';
import './password-DN_7PSUp.mjs';
import '../_/schemas.mjs';
import 'zod';
import '../_/nitro.mjs';
import 'node:path';
import 'fs/promises';
import 'axios';
import 'path';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'cron';
import 'node:process';
import 'node:url';
import '@prisma/client/runtime/library';
import 'nodemailer';
import 'dotenv';
import 'node:fs';
import 'better-auth';
import 'better-auth/adapters/prisma';
import 'better-auth/plugins';
import '@iconify/utils';
import 'node:crypto';
import 'consola';
import 'vue-router';
import 'better-auth/vue';
import 'better-auth/client/plugins';
import 'tailwindcss/colors';
import '@iconify/vue';
import 'tailwind-variants';
import '@iconify/utils/lib/css/icon';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const runtimeConfig = useRuntimeConfig();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtSeparator = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 class="text-lg font-semibold">Sign Up</h1><div class="text-sm text-muted"> Already got an account? `);
      _push(ssrRenderComponent(unref(__nuxt_component_0), {
        class: "text-primary font-semibold hover:underline",
        to: { name: "sign-in" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Sign in `);
          } else {
            return [
              createTextVNode(" Sign in ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(` instead. </div><div class="my-5">`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`</div><div>`);
      _push(ssrRenderComponent(_component_NuxtSeparator, { class: "my-5" }, null, _parent));
      _push(`<p class="text-xs text-muted"> By creating an account with ${ssrInterpolate(unref(runtimeConfig).public.appName)}, you admit to having read and agreed to our `);
      _push(ssrRenderComponent(unref(__nuxt_component_0), {
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
      _push(ssrRenderComponent(unref(__nuxt_component_0), {
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/(auth)/sign-up/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DvNIQWrv.mjs.map
