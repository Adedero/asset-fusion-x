import { _ as _sfc_main$2 } from './Separator-DwcB_Qjm.mjs';
import { l as __nuxt_component_2$1 } from './server.mjs';
import { defineComponent, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import _sfc_main$1 from './reset-password-form-Cwb4-YsC.mjs';
import 'reka-ui';
import '@vueuse/core';
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
import '@better-auth/core/utils';
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
import './fetch-error-alert-3QlR-5z-.mjs';
import './Alert-Dos-p4_r.mjs';
import './Form-bNvz49n8.mjs';
import './FormField-BuvMUjfY.mjs';
import './password-CubMJa5o.mjs';
import './Input-D-obAiG7.mjs';
import '../_/schemas.mjs';
import 'zod';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtSeparator = _sfc_main$2;
      const _component_NuxtLink = __nuxt_component_2$1;
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 class="text-lg font-semibold">Reset Password</h1><div class="my-5">`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`</div><div>`);
      _push(ssrRenderComponent(_component_NuxtSeparator, { class: "my-5" }, null, _parent));
      _push(`<p class="text-xs text-muted"> Are you experiencing any issues? `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "link text-xs!",
        to: { name: "contact" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Contact us. `);
          } else {
            return [
              createTextVNode(" Contact us. ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/(auth)/reset-password/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DMSzrEtO.mjs.map
