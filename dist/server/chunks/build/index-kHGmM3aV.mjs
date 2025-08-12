import { _ as __nuxt_component_0 } from './my-page-Cgd-8gXO.mjs';
import { M as useRoute, O as useRouter, _ as __nuxt_component_0$1, e as _sfc_main$d } from './server.mjs';
import { _ as _sfc_main$1 } from './Card-HL6icAYQ.mjs';
import { _ as _sfc_main$2 } from './Badge-q_8fq56_.mjs';
import { _ as _sfc_main$3 } from './Pagination-DeQhw8WG.mjs';
import { _ as __nuxt_component_6 } from './empty-icon-BnDpoaPH.mjs';
import { g as getTransactionIcon, b as getTransactionStatusBadgeColor } from './transaction-BkPO0uYy.mjs';
import { t as toCase } from './to-case-ChuH9uWD.mjs';
import { t as toDollar } from './to-dollar-DdS_9tlH.mjs';
import { defineComponent, computed, withAsyncContext, mergeProps, unref, withCtx, createVNode, toDisplayString, isRef, createBlock, createCommentVNode, openBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { useDateFormat } from '@vueuse/core';
import { u as useRouteData } from './use-route-data-1tNFDvd7.mjs';
import { u as useFetch } from './fetch-DztuJ_5C.mjs';
import './fetch-error-alert-B3Gd_w4n.mjs';
import './Alert-CXdXSwrA.mjs';
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
import 'tailwind-variants';
import '@iconify/utils/lib/css/icon';
import 'perfect-debounce';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import '@vue/shared';

const limit = 20;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const accountId = useRouteData().getParams("accountId");
    const route = useRoute();
    const router = useRouter();
    const page = computed({
      get: () => Number(route.query.page || 1),
      set: (val) => {
        router.replace({ query: { ...route.query, page: val } });
      }
    });
    const query = computed(() => ({ page: page.value, limit }));
    const { data: account, error: accountError } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `/api/user/financial-accounts/${accountId}`,
      {
        pick: ["totalTransactions"]
      },
      "$pneasDBAR_"
    )), __temp = await __temp, __restore(), __temp);
    const {
      data: transactions,
      error,
      refresh
    } = useFetch(`/api/user/financial-accounts/${accountId}/transactions`, {
      query
    }, "$EPleqEOQOq");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MyPage = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_NuxtCard = _sfc_main$1;
      const _component_NuxtIcon = _sfc_main$d;
      const _component_NuxtBadge = _sfc_main$2;
      const _component_NuxtPagination = _sfc_main$3;
      const _component_EmptyIcon = __nuxt_component_6;
      _push(ssrRenderComponent(_component_MyPage, mergeProps({
        error: unref(error) || unref(accountError),
        onRefresh: ($event) => unref(refresh)()
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(account) && unref(transactions)) {
              _push2(`<div${_scopeId}>`);
              if (unref(transactions).length) {
                _push2(`<div class="mb-4"${_scopeId}><div class="space-y-4"${_scopeId}><!--[-->`);
                ssrRenderList(unref(transactions), (txn) => {
                  _push2(ssrRenderComponent(_component_NuxtLink, {
                    key: txn.id,
                    to: `/user/accounts/${unref(accountId)}/transactions/${txn.id}`,
                    class: "block"
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(ssrRenderComponent(_component_NuxtCard, { class: "cursor-pointer" }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(`<div class="flex flex-wrap gap-4"${_scopeId3}><div class="grid-center"${_scopeId3}><div class="grid-center aspect-square p-1.5 bg-primary-50 text-primary rounded-full"${_scopeId3}>`);
                              _push4(ssrRenderComponent(_component_NuxtIcon, {
                                name: ("getTransactionIcon" in _ctx ? _ctx.getTransactionIcon : unref(getTransactionIcon))(txn.type),
                                size: "1.5rem"
                              }, null, _parent4, _scopeId3));
                              _push4(`</div></div><div${_scopeId3}><p${_scopeId3}>${ssrInterpolate(txn.description ?? ("toCase" in _ctx ? _ctx.toCase : unref(toCase))(txn.type, "sentence"))}</p><p class="text-xs text-muted"${_scopeId3}>${ssrInterpolate(unref(useDateFormat)(txn.createdAt, "MMM DD, YYYY"))} at ${ssrInterpolate(unref(useDateFormat)(txn.createdAt, "hh:mm aa"))}</p></div><div class="ml-auto flex flex-col items-end"${_scopeId3}><p class="font-semibold"${_scopeId3}><span${_scopeId3}>${ssrInterpolate(txn.type === "deposit" ? "+" : "-")}</span><span${_scopeId3}>${ssrInterpolate(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(txn.USDAmount))}</span></p>`);
                              _push4(ssrRenderComponent(_component_NuxtBadge, {
                                color: ("getTransactionStatusBadgeColor" in _ctx ? _ctx.getTransactionStatusBadgeColor : unref(getTransactionStatusBadgeColor))(txn.status),
                                label: txn.status,
                                variant: "subtle"
                              }, null, _parent4, _scopeId3));
                              _push4(`</div></div>`);
                            } else {
                              return [
                                createVNode("div", { class: "flex flex-wrap gap-4" }, [
                                  createVNode("div", { class: "grid-center" }, [
                                    createVNode("div", { class: "grid-center aspect-square p-1.5 bg-primary-50 text-primary rounded-full" }, [
                                      createVNode(_component_NuxtIcon, {
                                        name: ("getTransactionIcon" in _ctx ? _ctx.getTransactionIcon : unref(getTransactionIcon))(txn.type),
                                        size: "1.5rem"
                                      }, null, 8, ["name"])
                                    ])
                                  ]),
                                  createVNode("div", null, [
                                    createVNode("p", null, toDisplayString(txn.description ?? ("toCase" in _ctx ? _ctx.toCase : unref(toCase))(txn.type, "sentence")), 1),
                                    createVNode("p", { class: "text-xs text-muted" }, toDisplayString(unref(useDateFormat)(txn.createdAt, "MMM DD, YYYY")) + " at " + toDisplayString(unref(useDateFormat)(txn.createdAt, "hh:mm aa")), 1)
                                  ]),
                                  createVNode("div", { class: "ml-auto flex flex-col items-end" }, [
                                    createVNode("p", { class: "font-semibold" }, [
                                      createVNode("span", null, toDisplayString(txn.type === "deposit" ? "+" : "-"), 1),
                                      createVNode("span", null, toDisplayString(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(txn.USDAmount)), 1)
                                    ]),
                                    createVNode(_component_NuxtBadge, {
                                      color: ("getTransactionStatusBadgeColor" in _ctx ? _ctx.getTransactionStatusBadgeColor : unref(getTransactionStatusBadgeColor))(txn.status),
                                      label: txn.status,
                                      variant: "subtle"
                                    }, null, 8, ["color", "label"])
                                  ])
                                ])
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                      } else {
                        return [
                          createVNode(_component_NuxtCard, { class: "cursor-pointer" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex flex-wrap gap-4" }, [
                                createVNode("div", { class: "grid-center" }, [
                                  createVNode("div", { class: "grid-center aspect-square p-1.5 bg-primary-50 text-primary rounded-full" }, [
                                    createVNode(_component_NuxtIcon, {
                                      name: ("getTransactionIcon" in _ctx ? _ctx.getTransactionIcon : unref(getTransactionIcon))(txn.type),
                                      size: "1.5rem"
                                    }, null, 8, ["name"])
                                  ])
                                ]),
                                createVNode("div", null, [
                                  createVNode("p", null, toDisplayString(txn.description ?? ("toCase" in _ctx ? _ctx.toCase : unref(toCase))(txn.type, "sentence")), 1),
                                  createVNode("p", { class: "text-xs text-muted" }, toDisplayString(unref(useDateFormat)(txn.createdAt, "MMM DD, YYYY")) + " at " + toDisplayString(unref(useDateFormat)(txn.createdAt, "hh:mm aa")), 1)
                                ]),
                                createVNode("div", { class: "ml-auto flex flex-col items-end" }, [
                                  createVNode("p", { class: "font-semibold" }, [
                                    createVNode("span", null, toDisplayString(txn.type === "deposit" ? "+" : "-"), 1),
                                    createVNode("span", null, toDisplayString(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(txn.USDAmount)), 1)
                                  ]),
                                  createVNode(_component_NuxtBadge, {
                                    color: ("getTransactionStatusBadgeColor" in _ctx ? _ctx.getTransactionStatusBadgeColor : unref(getTransactionStatusBadgeColor))(txn.status),
                                    label: txn.status,
                                    variant: "subtle"
                                  }, null, 8, ["color", "label"])
                                ])
                              ])
                            ]),
                            _: 2
                          }, 1024)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                });
                _push2(`<!--]--></div><div class="mt-4 flex-center"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_NuxtPagination, {
                  page: unref(page),
                  "onUpdate:page": ($event) => isRef(page) ? page.value = $event : null,
                  total: unref(account).totalTransactions,
                  "items-per-page": limit,
                  "show-edges": ""
                }, null, _parent2, _scopeId));
                _push2(`</div></div>`);
              } else {
                _push2(`<div${_scopeId}>`);
                _push2(ssrRenderComponent(_component_EmptyIcon, { label: "No transactions" }, null, _parent2, _scopeId));
                _push2(`</div>`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(account) && unref(transactions) ? (openBlock(), createBlock("div", { key: 0 }, [
                unref(transactions).length ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "mb-4"
                }, [
                  createVNode("div", { class: "space-y-4" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(transactions), (txn) => {
                      return openBlock(), createBlock(_component_NuxtLink, {
                        key: txn.id,
                        to: `/user/accounts/${unref(accountId)}/transactions/${txn.id}`,
                        class: "block"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_NuxtCard, { class: "cursor-pointer" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex flex-wrap gap-4" }, [
                                createVNode("div", { class: "grid-center" }, [
                                  createVNode("div", { class: "grid-center aspect-square p-1.5 bg-primary-50 text-primary rounded-full" }, [
                                    createVNode(_component_NuxtIcon, {
                                      name: ("getTransactionIcon" in _ctx ? _ctx.getTransactionIcon : unref(getTransactionIcon))(txn.type),
                                      size: "1.5rem"
                                    }, null, 8, ["name"])
                                  ])
                                ]),
                                createVNode("div", null, [
                                  createVNode("p", null, toDisplayString(txn.description ?? ("toCase" in _ctx ? _ctx.toCase : unref(toCase))(txn.type, "sentence")), 1),
                                  createVNode("p", { class: "text-xs text-muted" }, toDisplayString(unref(useDateFormat)(txn.createdAt, "MMM DD, YYYY")) + " at " + toDisplayString(unref(useDateFormat)(txn.createdAt, "hh:mm aa")), 1)
                                ]),
                                createVNode("div", { class: "ml-auto flex flex-col items-end" }, [
                                  createVNode("p", { class: "font-semibold" }, [
                                    createVNode("span", null, toDisplayString(txn.type === "deposit" ? "+" : "-"), 1),
                                    createVNode("span", null, toDisplayString(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(txn.USDAmount)), 1)
                                  ]),
                                  createVNode(_component_NuxtBadge, {
                                    color: ("getTransactionStatusBadgeColor" in _ctx ? _ctx.getTransactionStatusBadgeColor : unref(getTransactionStatusBadgeColor))(txn.status),
                                    label: txn.status,
                                    variant: "subtle"
                                  }, null, 8, ["color", "label"])
                                ])
                              ])
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1032, ["to"]);
                    }), 128))
                  ]),
                  createVNode("div", { class: "mt-4 flex-center" }, [
                    createVNode(_component_NuxtPagination, {
                      page: unref(page),
                      "onUpdate:page": ($event) => isRef(page) ? page.value = $event : null,
                      total: unref(account).totalTransactions,
                      "items-per-page": limit,
                      "show-edges": ""
                    }, null, 8, ["page", "onUpdate:page", "total"])
                  ])
                ])) : (openBlock(), createBlock("div", { key: 1 }, [
                  createVNode(_component_EmptyIcon, { label: "No transactions" })
                ]))
              ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/user/accounts/[accountId]/transactions/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-kHGmM3aV.mjs.map
