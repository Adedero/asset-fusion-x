import { _ as __nuxt_component_0 } from './my-page-Cgd-8gXO.mjs';
import { _ as _sfc_main$1 } from './Badge-q_8fq56_.mjs';
import { _ as __nuxt_component_2 } from './navbar-BE8GNa4e.mjs';
import { h as __nuxt_component_12, c as _sfc_main$7 } from './server.mjs';
import { _ as _sfc_main$2 } from './Modal-DefLStPx.mjs';
import { defineComponent, withAsyncContext, computed, provide, ref, mergeProps, unref, withCtx, isRef, createVNode, createBlock, createCommentVNode, openBlock, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { getNavList } from './nav-list-ceUvdrXM.mjs';
import { u as useRouteData } from './use-route-data-1tNFDvd7.mjs';
import { u as useFetch } from './fetch-DztuJ_5C.mjs';
import './fetch-error-alert-B3Gd_w4n.mjs';
import './Alert-CXdXSwrA.mjs';
import 'reka-ui';
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
import '@vue/shared';

const getAccountStatusBadgeColor = (status) => {
  if (status === "active") return "success";
  if (status === "dormant") return "warning";
  if (status === "cloded") return "error";
  return "primary";
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[accountId]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const accountId = useRouteData().getParams("accountId");
    const { data, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `/api/user/financial-accounts/${accountId}`,
      {
        key: () => `user-financial-account-${accountId}-pick`,
        pick: ["id", "name", "type", "ownership", "status", "businessProfile"]
      },
      "$wT4OGm8hB0"
    )), __temp = await __temp, __restore(), __temp);
    const accountName = computed(() => data.value?.name ?? "");
    provide("currentAccount", {
      accountName: accountName.value,
      refreshAccount: refresh
    });
    const items = computed(() => data.value ? getNavList(data.value) : []);
    const open = ref(
      data.value?.type === "business" && !data.value?.businessProfile
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MyPage = __nuxt_component_0;
      const _component_NuxtBadge = _sfc_main$1;
      const _component_NuxtNavbar = __nuxt_component_2;
      const _component_NuxtPage = __nuxt_component_12;
      const _component_NuxtModal = _sfc_main$2;
      const _component_NuxtButton = _sfc_main$7;
      _push(ssrRenderComponent(_component_MyPage, mergeProps({ error: unref(error) }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(data)) {
              _push2(`<div class="h-full"${_scopeId}><header class="flex flex-wrap gap-x-4 gap-y-1"${_scopeId}><h1 class="text-4xl font-semibold"${_scopeId}>${ssrInterpolate(unref(data).name)}</h1><div class="space-x-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_NuxtBadge, {
                variant: "soft",
                label: unref(data).ownership
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_NuxtBadge, {
                variant: "soft",
                color: "error",
                label: unref(data).type
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_NuxtBadge, {
                variant: "soft",
                color: ("getAccountStatusBadgeColor" in _ctx ? _ctx.getAccountStatusBadgeColor : unref(getAccountStatusBadgeColor))(unref(data).status),
                label: unref(data).status
              }, null, _parent2, _scopeId));
              _push2(`</div></header><nav class="mt-4 mb-6"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_NuxtNavbar, { items: unref(items) }, null, _parent2, _scopeId));
              _push2(`</nav><div class="lg:flex-grow lg:overflow-y-auto lg:p-0.5"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_NuxtPage, null, null, _parent2, _scopeId));
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_component_NuxtModal, {
              open: unref(open),
              "onUpdate:open": ($event) => isRef(open) ? open.value = $event : null,
              title: "Business Account Alert",
              dismissible: false,
              close: false
            }, {
              body: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="space-y-4"${_scopeId2}><p${_scopeId2}> You must complete your business account profile in other to make use of this business account. </p><div class="flex justify-end"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_NuxtButton, {
                    to: `/user/accounts/${unref(accountId)}/business-profile`,
                    label: "Proceed",
                    onClick: ($event) => open.value = false
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "space-y-4" }, [
                      createVNode("p", null, " You must complete your business account profile in other to make use of this business account. "),
                      createVNode("div", { class: "flex justify-end" }, [
                        createVNode(_component_NuxtButton, {
                          to: `/user/accounts/${unref(accountId)}/business-profile`,
                          label: "Proceed",
                          onClick: ($event) => open.value = false
                        }, null, 8, ["to", "onClick"])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              unref(data) ? (openBlock(), createBlock("div", {
                key: 0,
                class: "h-full"
              }, [
                createVNode("header", { class: "flex flex-wrap gap-x-4 gap-y-1" }, [
                  createVNode("h1", { class: "text-4xl font-semibold" }, toDisplayString(unref(data).name), 1),
                  createVNode("div", { class: "space-x-2" }, [
                    createVNode(_component_NuxtBadge, {
                      variant: "soft",
                      label: unref(data).ownership
                    }, null, 8, ["label"]),
                    createVNode(_component_NuxtBadge, {
                      variant: "soft",
                      color: "error",
                      label: unref(data).type
                    }, null, 8, ["label"]),
                    createVNode(_component_NuxtBadge, {
                      variant: "soft",
                      color: ("getAccountStatusBadgeColor" in _ctx ? _ctx.getAccountStatusBadgeColor : unref(getAccountStatusBadgeColor))(unref(data).status),
                      label: unref(data).status
                    }, null, 8, ["color", "label"])
                  ])
                ]),
                createVNode("nav", { class: "mt-4 mb-6" }, [
                  createVNode(_component_NuxtNavbar, { items: unref(items) }, null, 8, ["items"])
                ]),
                createVNode("div", { class: "lg:flex-grow lg:overflow-y-auto lg:p-0.5" }, [
                  createVNode(_component_NuxtPage)
                ])
              ])) : createCommentVNode("", true),
              createVNode(_component_NuxtModal, {
                open: unref(open),
                "onUpdate:open": ($event) => isRef(open) ? open.value = $event : null,
                title: "Business Account Alert",
                dismissible: false,
                close: false
              }, {
                body: withCtx(() => [
                  createVNode("div", { class: "space-y-4" }, [
                    createVNode("p", null, " You must complete your business account profile in other to make use of this business account. "),
                    createVNode("div", { class: "flex justify-end" }, [
                      createVNode(_component_NuxtButton, {
                        to: `/user/accounts/${unref(accountId)}/business-profile`,
                        label: "Proceed",
                        onClick: ($event) => open.value = false
                      }, null, 8, ["to", "onClick"])
                    ])
                  ])
                ]),
                _: 1
              }, 8, ["open", "onUpdate:open"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/user/accounts/[accountId].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_accountId_-CClpZ9De.mjs.map
