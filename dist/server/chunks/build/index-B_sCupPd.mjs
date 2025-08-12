import { M as useRoute, _ as __nuxt_component_0, e as _sfc_main$d } from './server.mjs';
import { _ as _sfc_main$1 } from './Card-HL6icAYQ.mjs';
import { t as toCase } from './to-case-ChuH9uWD.mjs';
import { defineComponent, mergeProps, unref, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
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
    const route = useRoute();
    const accountType = route.params?.accountType?.toString();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_NuxtCard = _sfc_main$1;
      const _component_NuxtIcon = _sfc_main$d;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "fluid flex-center" }, _attrs))}><div class="flex-col-center gap-4"><h1 class="text-4xl font-semibold">${ssrInterpolate(("toCase" in _ctx ? _ctx.toCase : unref(toCase))(unref(accountType) ?? "", "sentence"))} Account </h1><p class="card-title">Select your account ownership type.</p><div class="grid sm:grid-cols-2 w-full gap-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/user/accounts/open/${unref(accountType)}/single`
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtCard, { class: "cursor-pointer group hover:shadow-md transition-shadow" }, {
              footer: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<small class="block text-center"${_scopeId2}> You are the sole owner of this account. </small>`);
                } else {
                  return [
                    createVNode("small", { class: "block text-center" }, " You are the sole owner of this account. ")
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex-col-center gap-4"${_scopeId2}><div class="text-muted text-4xl p-3 rounded-full border-2 border-muted aspect-square flex-center transition-colors group-hover:text-primary group-hover:border-primary"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_NuxtIcon, { name: "lucide:user" }, null, _parent3, _scopeId2));
                  _push3(`</div><p class="text-medium text-muted transition-colors group-hover:text-primary"${_scopeId2}> Single </p></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex-col-center gap-4" }, [
                      createVNode("div", { class: "text-muted text-4xl p-3 rounded-full border-2 border-muted aspect-square flex-center transition-colors group-hover:text-primary group-hover:border-primary" }, [
                        createVNode(_component_NuxtIcon, { name: "lucide:user" })
                      ]),
                      createVNode("p", { class: "text-medium text-muted transition-colors group-hover:text-primary" }, " Single ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_NuxtCard, { class: "cursor-pointer group hover:shadow-md transition-shadow" }, {
                footer: withCtx(() => [
                  createVNode("small", { class: "block text-center" }, " You are the sole owner of this account. ")
                ]),
                default: withCtx(() => [
                  createVNode("div", { class: "flex-col-center gap-4" }, [
                    createVNode("div", { class: "text-muted text-4xl p-3 rounded-full border-2 border-muted aspect-square flex-center transition-colors group-hover:text-primary group-hover:border-primary" }, [
                      createVNode(_component_NuxtIcon, { name: "lucide:user" })
                    ]),
                    createVNode("p", { class: "text-medium text-muted transition-colors group-hover:text-primary" }, " Single ")
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/user/accounts/open/${unref(accountType)}/joint`
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtCard, { class: "cursor-pointer group hover:shadow-md transition-shadow" }, {
              footer: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<small class="block text-center"${_scopeId2}> You are one of the owners of this account. </small>`);
                } else {
                  return [
                    createVNode("small", { class: "block text-center" }, " You are one of the owners of this account. ")
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex-col-center gap-4"${_scopeId2}><div class="text-muted text-4xl p-3 rounded-full border-2 border-muted aspect-square flex-center transition-colors group-hover:text-primary group-hover:border-primary"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_NuxtIcon, { name: "lucide:users" }, null, _parent3, _scopeId2));
                  _push3(`</div><p class="text-medium text-muted transition-colors group-hover:text-primary"${_scopeId2}> Joint </p></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex-col-center gap-4" }, [
                      createVNode("div", { class: "text-muted text-4xl p-3 rounded-full border-2 border-muted aspect-square flex-center transition-colors group-hover:text-primary group-hover:border-primary" }, [
                        createVNode(_component_NuxtIcon, { name: "lucide:users" })
                      ]),
                      createVNode("p", { class: "text-medium text-muted transition-colors group-hover:text-primary" }, " Joint ")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_NuxtCard, { class: "cursor-pointer group hover:shadow-md transition-shadow" }, {
                footer: withCtx(() => [
                  createVNode("small", { class: "block text-center" }, " You are one of the owners of this account. ")
                ]),
                default: withCtx(() => [
                  createVNode("div", { class: "flex-col-center gap-4" }, [
                    createVNode("div", { class: "text-muted text-4xl p-3 rounded-full border-2 border-muted aspect-square flex-center transition-colors group-hover:text-primary group-hover:border-primary" }, [
                      createVNode(_component_NuxtIcon, { name: "lucide:users" })
                    ]),
                    createVNode("p", { class: "text-medium text-muted transition-colors group-hover:text-primary" }, " Joint ")
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/user/accounts/open/[accountType]/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-B_sCupPd.mjs.map
