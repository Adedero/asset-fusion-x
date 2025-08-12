import { _ as __nuxt_component_2 } from './navbar-BE8GNa4e.mjs';
import { h as __nuxt_component_12 } from './server.mjs';
import { defineComponent, ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { u as useAuthStore } from './auth.store-VvkDhiyP.mjs';
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
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const authStore = useAuthStore();
    const items = ref([
      { label: "Overview", to: "/user/profile" },
      { label: "KYC", to: "/user/profile/kyc" }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtNavbar = __nuxt_component_2;
      const _component_NuxtPage = __nuxt_component_12;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full space-y-4" }, _attrs))}><header><h1 class="text-4xl font-semibold"> Hi, ${ssrInterpolate(unref(authStore).user.value?.name.split(" ")[0])}</h1></header><nav>`);
      _push(ssrRenderComponent(_component_NuxtNavbar, { items: unref(items) }, null, _parent));
      _push(`</nav><div>`);
      _push(ssrRenderComponent(_component_NuxtPage, null, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/user/profile/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CweRvF0W.mjs.map
