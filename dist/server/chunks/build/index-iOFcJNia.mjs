import { _ as _sfc_main$1 } from './Card-HL6icAYQ.mjs';
import { defineComponent, mergeProps, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import _sfc_main$2 from './image-changer-IPm2ICaU.mjs';
import _sfc_main$3 from './name-changer-DzQ8xqDV.mjs';
import _sfc_main$4 from './profile-editor-DKO0mc0p.mjs';
import 'reka-ui';
import './server.mjs';
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
import '@vueuse/core';
import 'tailwind-variants';
import '@iconify/utils/lib/css/icon';
import 'perfect-debounce';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import './DropdownMenu-j3t5Akwl.mjs';
import 'reka-ui/namespaced';
import './Kbd-B4jx-Km7.mjs';
import './Modal-DefLStPx.mjs';
import './ButtonGroup-BGlqjy3A.mjs';
import './Input-BtIiAvs7.mjs';
import './initials-LMkSR82P.mjs';
import './auth.store-VvkDhiyP.mjs';
import './fetch-DztuJ_5C.mjs';
import '@vue/shared';
import './Collapsible-P-6QItT2.mjs';
import './FormField-CzZJ1-Wb.mjs';
import 'zod';
import './my-page-Cgd-8gXO.mjs';
import './fetch-error-alert-B3Gd_w4n.mjs';
import './Alert-CXdXSwrA.mjs';
import './SelectMenu-7R98CtYf.mjs';
import '../_/schemas.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtCard = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-full flex flex-col md:flex-row items-start gap-4 p-0.5" }, _attrs))}><div class="w-full shrink-0 md:w-80 space-y-4">`);
      _push(ssrRenderComponent(_component_NuxtCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, null, null, _parent2, _scopeId));
            _push2(`<small class="block text-center mt-1"${_scopeId}>Click to edit</small></div>`);
          } else {
            return [
              createVNode("div", null, [
                createVNode(_sfc_main$2),
                createVNode("small", { class: "block text-center mt-1" }, "Click to edit")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="w-full flex-col-center md:block"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, null, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "w-full flex-col-center md:block" }, [
                createVNode(_sfc_main$3)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_NuxtCard, { class: "w-full" }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p class="card-title"${_scopeId}>Profile</p>`);
          } else {
            return [
              createVNode("p", { class: "card-title" }, "Profile")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="w-full"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$4, null, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "w-full" }, [
                createVNode(_sfc_main$4)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/user/profile/index/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-iOFcJNia.mjs.map
