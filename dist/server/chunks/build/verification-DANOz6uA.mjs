import { _ as _sfc_main$1 } from './Card-HL6icAYQ.mjs';
import { _ as __nuxt_component_3 } from './app-logo-h2drnef0.mjs';
import { _ as _sfc_main$2 } from './Alert-CXdXSwrA.mjs';
import { M as useRoute, n as navigateTo } from './server.mjs';
import { defineComponent, mergeProps, withCtx, createVNode, unref, createBlock, openBlock, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import 'reka-ui';
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
  __name: "verification",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const error = route.query.error?.toString();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtCard = _sfc_main$1;
      const _component_AppLogo = __nuxt_component_3;
      const _component_NuxtAlert = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex-center h-full" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_NuxtCard, { class: "w-full max-w-96" }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtCard, {
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
            _push2(`<div${_scopeId}>`);
            if (unref(error)) {
              _push2(`<div${_scopeId}>`);
              _push2(ssrRenderComponent(_component_NuxtAlert, {
                color: "error",
                variant: "subtle",
                icon: "lucide-circle-x",
                title: "Validation Failed",
                description: "Invalid or expired token. Please, try again later.",
                orientation: "horizontal",
                actions: [
                  {
                    label: "Retry",
                    icon: "lucide-refresh-cw",
                    onClick: () => {
                      ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))({ name: "user-change-email" });
                    },
                    color: "error",
                    class: "py-2"
                  }
                ]
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<div${_scopeId}>`);
              _push2(ssrRenderComponent(_component_NuxtAlert, {
                variant: "subtle",
                icon: "lucide-check-circle",
                title: "Validation Successful",
                description: "Your email has been changed successfully.",
                orientation: "horizontal",
                actions: [
                  {
                    label: "Continue",
                    trailingIcon: "lucide-circle-arrow-right",
                    onClick: () => {
                      ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))({ name: "sign-in" });
                    },
                    class: "py-2"
                  }
                ]
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode(_component_NuxtCard, {
                class: "w-fit",
                variant: "subtle",
                ui: { body: "p-2.5 sm:p-2.5" }
              }, {
                default: withCtx(() => [
                  createVNode(_component_AppLogo, { size: "32" })
                ]),
                _: 1
              }),
              createVNode("div", null, [
                unref(error) ? (openBlock(), createBlock("div", { key: 0 }, [
                  createVNode(_component_NuxtAlert, {
                    color: "error",
                    variant: "subtle",
                    icon: "lucide-circle-x",
                    title: "Validation Failed",
                    description: "Invalid or expired token. Please, try again later.",
                    orientation: "horizontal",
                    actions: [
                      {
                        label: "Retry",
                        icon: "lucide-refresh-cw",
                        onClick: () => {
                          ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))({ name: "user-change-email" });
                        },
                        color: "error",
                        class: "py-2"
                      }
                    ]
                  }, null, 8, ["actions"])
                ])) : (openBlock(), createBlock("div", { key: 1 }, [
                  createVNode(_component_NuxtAlert, {
                    variant: "subtle",
                    icon: "lucide-check-circle",
                    title: "Validation Successful",
                    description: "Your email has been changed successfully.",
                    orientation: "horizontal",
                    actions: [
                      {
                        label: "Continue",
                        trailingIcon: "lucide-circle-arrow-right",
                        onClick: () => {
                          ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))({ name: "sign-in" });
                        },
                        class: "py-2"
                      }
                    ]
                  }, null, 8, ["actions"])
                ]))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/user/change-email/verification.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=verification-DANOz6uA.mjs.map
