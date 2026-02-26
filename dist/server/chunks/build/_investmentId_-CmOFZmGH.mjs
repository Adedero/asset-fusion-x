import { _ as __nuxt_component_0 } from './navbar-Bc4duh39.mjs';
import { m as __nuxt_component_12 } from './server.mjs';
import { defineComponent, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { u as useRouteData } from './use-route-data-zpNPSzN0.mjs';
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
import 'reka-ui';
import '@vueuse/core';
import 'tailwind-variants';
import '@iconify/utils/lib/css/icon';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[investmentId]",
  __ssrInlineRender: true,
  setup(__props) {
    const investmentId = useRouteData().getParams("investmentId");
    const items = [
      {
        label: "Overview",
        to: `/admin/investments/${investmentId}`
      },
      {
        label: "Profits",
        to: `/admin/investments/${investmentId}/profits`
      },
      {
        label: "Settings",
        to: `/admin/investments/${investmentId}/settings`
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtNavbar = __nuxt_component_0;
      const _component_NuxtPage = __nuxt_component_12;
      _push(`<div${ssrRenderAttrs(_attrs)}><header>`);
      _push(ssrRenderComponent(_component_NuxtNavbar, {
        items,
        variant: "underline"
      }, null, _parent));
      _push(`</header><div class="pt-5">`);
      _push(ssrRenderComponent(_component_NuxtPage, null, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/investments/[investmentId].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_investmentId_-CmOFZmGH.mjs.map
