import { _ as _sfc_main$1 } from './Card-HL6icAYQ.mjs';
import { c as _sfc_main$7 } from './server.mjs';
import { defineComponent, ref, mergeProps, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
import { D as publicAssetsURL } from '../nitro/nitro.mjs';
import 'reka-ui';
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

const _imports_0 = publicAssetsURL("/img/icons/pdf.svg");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "documents",
  __ssrInlineRender: true,
  setup(__props) {
    ref("0021351082");
    ref("Eli and Lulu");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtCard = _sfc_main$1;
      const _component_NuxtButton = _sfc_main$7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid gap-4 grid-cols-[repeat(auto-fit,minmax(20rem,1fr))]" }, _attrs))}><!--[-->`);
      ssrRenderList(5, (i) => {
        _push(`<div>`);
        _push(ssrRenderComponent(_component_NuxtCard, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="space-y-1"${_scopeId}><p class="card-title"${_scopeId}>Government ID</p><div${_scopeId}><div class="flex items-center gap-2"${_scopeId}><div${_scopeId}><img${ssrRenderAttr("src", _imports_0)} alt="document" width="28"${_scopeId}></div><p class="text-sm font-medium"${_scopeId}>7233445454353535.pdf</p></div></div><div class="flex items-center gap-2 justify-end"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_NuxtButton, {
                size: "sm",
                label: "Download",
                color: "neutral",
                variant: "outline",
                icon: "i-lucide-download"
              }, null, _parent2, _scopeId));
              _push2(`</div></div>`);
            } else {
              return [
                createVNode("div", { class: "space-y-1" }, [
                  createVNode("p", { class: "card-title" }, "Government ID"),
                  createVNode("div", null, [
                    createVNode("div", { class: "flex items-center gap-2" }, [
                      createVNode("div", null, [
                        createVNode("img", {
                          src: _imports_0,
                          alt: "document",
                          width: "28"
                        })
                      ]),
                      createVNode("p", { class: "text-sm font-medium" }, "7233445454353535.pdf")
                    ])
                  ]),
                  createVNode("div", { class: "flex items-center gap-2 justify-end" }, [
                    createVNode(_component_NuxtButton, {
                      size: "sm",
                      label: "Download",
                      color: "neutral",
                      variant: "outline",
                      icon: "i-lucide-download"
                    })
                  ])
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/user/accounts/[accountId]/documents.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=documents-CvRt33wk.mjs.map
