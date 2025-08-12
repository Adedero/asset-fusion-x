import { _ as __nuxt_component_0 } from './my-page-Cgd-8gXO.mjs';
import { _ as _sfc_main$1 } from './Card-HL6icAYQ.mjs';
import { _ as _sfc_main$2 } from './Badge-q_8fq56_.mjs';
import { c as _sfc_main$7, a as __nuxt_component_4, j as _sfc_main$a } from './server.mjs';
import { _ as _sfc_main$3 } from './AvatarGroup-Bhlzbbqz.mjs';
import { t as toDollar } from './to-dollar-DdS_9tlH.mjs';
import { g as getTransactionIcon, a as getTransactionBadgeColor } from './transaction-BkPO0uYy.mjs';
import { t as toCase } from './to-case-ChuH9uWD.mjs';
import { defineComponent, withAsyncContext, mergeProps, unref, withCtx, createVNode, toDisplayString, createBlock, openBlock, createCommentVNode, Fragment, renderList, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const accountId = useRouteData().getParams("accountId");
    const { data, error } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `/api/user/financial-accounts/${accountId}`,
      {
        key: `user-financial-account-${accountId}`
      },
      "$orKJHnOHsU"
    )), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MyPage = __nuxt_component_0;
      const _component_NuxtCard = _sfc_main$1;
      const _component_NuxtBadge = _sfc_main$2;
      const _component_NuxtButton = _sfc_main$7;
      const _component_UserAccountStatisticsChart = __nuxt_component_4;
      const _component_NuxtAvatarGroup = _sfc_main$3;
      const _component_NuxtAvatar = _sfc_main$a;
      _push(ssrRenderComponent(_component_MyPage, mergeProps({ error: unref(error) }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(data)) {
              _push2(`<div class="space-y-4"${_scopeId}><div class="grid gap-4 md:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] xl:grid-cols-4"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_NuxtCard, { class: "bg-primary text-white" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<header${_scopeId2}><p class="card-title text-white"${_scopeId2}>Account Balance</p></header><div class="mt-2 text-2xl font-semibold font-geist-mono"${_scopeId2}>${ssrInterpolate(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(unref(data).balance))}</div><footer class="mt-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_NuxtBadge, {
                      color: "neutral",
                      variant: "soft",
                      class: "mr-2 dark:bg-white dark:text-primary",
                      icon: "lucide-wallet"
                    }, null, _parent3, _scopeId2));
                    _push3(`<small${_scopeId2}>Withdrawable amount</small></footer>`);
                  } else {
                    return [
                      createVNode("header", null, [
                        createVNode("p", { class: "card-title text-white" }, "Account Balance")
                      ]),
                      createVNode("div", { class: "mt-2 text-2xl font-semibold font-geist-mono" }, toDisplayString(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(unref(data).balance)), 1),
                      createVNode("footer", { class: "mt-2" }, [
                        createVNode(_component_NuxtBadge, {
                          color: "neutral",
                          variant: "soft",
                          class: "mr-2 dark:bg-white dark:text-primary",
                          icon: "lucide-wallet"
                        }),
                        createVNode("small", null, "Withdrawable amount")
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_NuxtCard, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<header${_scopeId2}><p class="card-title"${_scopeId2}>Investment Profits</p></header><div class="mt-2 text-2xl font-semibold font-geist-mono"${_scopeId2}>${ssrInterpolate(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(unref(data).totalProfit))}</div><footer class="mt-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_NuxtBadge, {
                      color: "success",
                      variant: "soft",
                      class: "mr-2",
                      icon: "lucide-flower-2"
                    }, null, _parent3, _scopeId2));
                    _push3(`<small class="text-muted"${_scopeId2}>From ${ssrInterpolate(unref(data).activeInvestmentCount)} investments</small></footer>`);
                  } else {
                    return [
                      createVNode("header", null, [
                        createVNode("p", { class: "card-title" }, "Investment Profits")
                      ]),
                      createVNode("div", { class: "mt-2 text-2xl font-semibold font-geist-mono" }, toDisplayString(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(unref(data).totalProfit)), 1),
                      createVNode("footer", { class: "mt-2" }, [
                        createVNode(_component_NuxtBadge, {
                          color: "success",
                          variant: "soft",
                          class: "mr-2",
                          icon: "lucide-flower-2"
                        }),
                        createVNode("small", { class: "text-muted" }, "From " + toDisplayString(unref(data).activeInvestmentCount) + " investments", 1)
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_NuxtCard, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<header${_scopeId2}><p class="card-title"${_scopeId2}>Last Profit</p></header><div class="mt-2 text-2xl font-semibold font-geist-mono"${_scopeId2}>${ssrInterpolate(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(unref(data).lastProfit?.USDAmount ?? 0))}</div><footer class="mt-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_NuxtBadge, {
                      color: "success",
                      variant: "soft",
                      class: "mr-2",
                      icon: "lucide-hand-coins"
                    }, null, _parent3, _scopeId2));
                    if (unref(data).lastProfit?.createdAt) {
                      _push3(`<small class="text-muted"${_scopeId2}>${ssrInterpolate(unref(useDateFormat)(
                        unref(data).lastProfit.createdAt,
                        "MMM DD, YYYY | hh:mm aa"
                      ))}</small>`);
                    } else {
                      _push3(`<small class="text-muted"${_scopeId2}>Not available</small>`);
                    }
                    _push3(`</footer>`);
                  } else {
                    return [
                      createVNode("header", null, [
                        createVNode("p", { class: "card-title" }, "Last Profit")
                      ]),
                      createVNode("div", { class: "mt-2 text-2xl font-semibold font-geist-mono" }, toDisplayString(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(unref(data).lastProfit?.USDAmount ?? 0)), 1),
                      createVNode("footer", { class: "mt-2" }, [
                        createVNode(_component_NuxtBadge, {
                          color: "success",
                          variant: "soft",
                          class: "mr-2",
                          icon: "lucide-hand-coins"
                        }),
                        unref(data).lastProfit?.createdAt ? (openBlock(), createBlock("small", {
                          key: 0,
                          class: "text-muted"
                        }, toDisplayString(unref(useDateFormat)(
                          unref(data).lastProfit.createdAt,
                          "MMM DD, YYYY | hh:mm aa"
                        )), 1)) : (openBlock(), createBlock("small", {
                          key: 1,
                          class: "text-muted"
                        }, "Not available"))
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_NuxtCard, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<header${_scopeId2}><p class="card-title"${_scopeId2}>Last Transaction</p></header><div class="mt-2 text-2xl font-semibold font-geist-mono"${_scopeId2}>${ssrInterpolate(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(unref(data).lastTransaction?.USDAmount ?? 0))}</div><footer class="mt-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_NuxtBadge, {
                      color: unref(data).lastTransaction ? ("getTransactionBadgeColor" in _ctx ? _ctx.getTransactionBadgeColor : unref(getTransactionBadgeColor))(unref(data).lastTransaction?.type) : "error",
                      variant: "soft",
                      class: "mr-2",
                      icon: unref(data).lastTransaction ? ("getTransactionIcon" in _ctx ? _ctx.getTransactionIcon : unref(getTransactionIcon))(unref(data).lastTransaction.type) : "lucide-x"
                    }, null, _parent3, _scopeId2));
                    _push3(`<small class="text-muted"${_scopeId2}>${ssrInterpolate(("toCase" in _ctx ? _ctx.toCase : unref(toCase))(
                      unref(data).lastTransaction?.type ?? "not available",
                      "sentence"
                    ))}</small></footer>`);
                  } else {
                    return [
                      createVNode("header", null, [
                        createVNode("p", { class: "card-title" }, "Last Transaction")
                      ]),
                      createVNode("div", { class: "mt-2 text-2xl font-semibold font-geist-mono" }, toDisplayString(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(unref(data).lastTransaction?.USDAmount ?? 0)), 1),
                      createVNode("footer", { class: "mt-2" }, [
                        createVNode(_component_NuxtBadge, {
                          color: unref(data).lastTransaction ? ("getTransactionBadgeColor" in _ctx ? _ctx.getTransactionBadgeColor : unref(getTransactionBadgeColor))(unref(data).lastTransaction?.type) : "error",
                          variant: "soft",
                          class: "mr-2",
                          icon: unref(data).lastTransaction ? ("getTransactionIcon" in _ctx ? _ctx.getTransactionIcon : unref(getTransactionIcon))(unref(data).lastTransaction.type) : "lucide-x"
                        }, null, 8, ["color", "icon"]),
                        createVNode("small", { class: "text-muted" }, toDisplayString(("toCase" in _ctx ? _ctx.toCase : unref(toCase))(
                          unref(data).lastTransaction?.type ?? "not available",
                          "sentence"
                        )), 1)
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div><div${_scopeId}>`);
              _push2(ssrRenderComponent(_component_NuxtCard, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div${_scopeId2}><div class="flex flex-wrap items-center gap-2 justify-between mb-4"${_scopeId2}><div${_scopeId2}><p class="card-title"${_scopeId2}>Statistics</p><p class="text-xs"${_scopeId2}>Overview of account transactions</p></div>`);
                    if (unref(data).status === "active") {
                      _push3(`<div class="flex flex-wrap items-center gap-2"${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_NuxtButton, {
                        to: `/user/accounts/${unref(accountId)}/deposit`,
                        icon: "i-lucide-circle-arrow-down",
                        label: "Deposit"
                      }, null, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_NuxtButton, {
                        to: `/user/accounts/${unref(accountId)}/withdraw`,
                        icon: "i-lucide-circle-arrow-up",
                        label: "Withdraw",
                        color: "neutral",
                        variant: "outline"
                      }, null, _parent3, _scopeId2));
                      _push3(`</div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div><div${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_UserAccountStatisticsChart, null, null, _parent3, _scopeId2));
                    _push3(`</div></div>`);
                  } else {
                    return [
                      createVNode("div", null, [
                        createVNode("div", { class: "flex flex-wrap items-center gap-2 justify-between mb-4" }, [
                          createVNode("div", null, [
                            createVNode("p", { class: "card-title" }, "Statistics"),
                            createVNode("p", { class: "text-xs" }, "Overview of account transactions")
                          ]),
                          unref(data).status === "active" ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "flex flex-wrap items-center gap-2"
                          }, [
                            createVNode(_component_NuxtButton, {
                              to: `/user/accounts/${unref(accountId)}/deposit`,
                              icon: "i-lucide-circle-arrow-down",
                              label: "Deposit"
                            }, null, 8, ["to"]),
                            createVNode(_component_NuxtButton, {
                              to: `/user/accounts/${unref(accountId)}/withdraw`,
                              icon: "i-lucide-circle-arrow-up",
                              label: "Withdraw",
                              color: "neutral",
                              variant: "outline"
                            }, null, 8, ["to"])
                          ])) : createCommentVNode("", true)
                        ]),
                        createVNode("div", null, [
                          createVNode(_component_UserAccountStatisticsChart)
                        ])
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div><div class="pb-4"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_NuxtCard, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="flex flex-col md:flex-row md:items-end justify-between gap-x-4 gap-y-6"${_scopeId2}><div class="space-y-2"${_scopeId2}><div class="border-2 border-muted rounded-md px-2 py-1 w-fit"${_scopeId2}><p class="card-title text-base!"${_scopeId2}>${ssrInterpolate(unref(data).name)}</p></div><p class="font-geist-mono text-xl font-medium"${_scopeId2}>${ssrInterpolate(unref(data).number)}</p><p class="text-sm text-muted"${_scopeId2}> Opened on <b${_scopeId2}>${ssrInterpolate(unref(useDateFormat)(unref(data).createdAt, "MMMM DD, YYYY"))}</b> by <b${_scopeId2}>${ssrInterpolate(unref(data).creator?.name ?? "unknown")}</b></p>`);
                    if (unref(data).status === "dormant") {
                      _push3(`<div class="space-x-2 mt-4"${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_NuxtButton, {
                        size: "sm",
                        variant: "soft",
                        label: "Re-activate",
                        icon: "i-lucide-redo-2"
                      }, null, _parent3, _scopeId2));
                      _push3(`</div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div><div class="flex flex-col md:items-end"${_scopeId2}><p class="card-title mb-2"${_scopeId2}>Account users</p>`);
                    _push3(ssrRenderComponent(_component_NuxtAvatarGroup, { size: "xl" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<!--[-->`);
                          ssrRenderList([unref(data).primaryUser, ...unref(data).users], (user) => {
                            _push4(ssrRenderComponent(_component_NuxtAvatar, {
                              key: user?.id,
                              src: user?.image ?? void 0,
                              alt: user?.name
                            }, null, _parent4, _scopeId3));
                          });
                          _push4(`<!--]-->`);
                        } else {
                          return [
                            (openBlock(true), createBlock(Fragment, null, renderList([unref(data).primaryUser, ...unref(data).users], (user) => {
                              return openBlock(), createBlock(_component_NuxtAvatar, {
                                key: user?.id,
                                src: user?.image ?? void 0,
                                alt: user?.name
                              }, null, 8, ["src", "alt"]);
                            }), 128))
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    if (unref(data).users.length === 1) {
                      _push3(`<p class="text-sm text-muted ml-2"${_scopeId2}> You and ${ssrInterpolate(unref(data).users[0]?.name ?? "1 other")}</p>`);
                    } else if (unref(data).users.length > 1) {
                      _push3(`<p class="text-sm text-muted ml-2"${_scopeId2}> You and ${ssrInterpolate(unref(data).users.length)} others </p>`);
                    } else {
                      _push3(`<p class="text-sm text-muted ml-2"${_scopeId2}>You</p>`);
                    }
                    _push3(`</div></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "flex flex-col md:flex-row md:items-end justify-between gap-x-4 gap-y-6" }, [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode("div", { class: "border-2 border-muted rounded-md px-2 py-1 w-fit" }, [
                            createVNode("p", { class: "card-title text-base!" }, toDisplayString(unref(data).name), 1)
                          ]),
                          createVNode("p", { class: "font-geist-mono text-xl font-medium" }, toDisplayString(unref(data).number), 1),
                          createVNode("p", { class: "text-sm text-muted" }, [
                            createTextVNode(" Opened on "),
                            createVNode("b", null, toDisplayString(unref(useDateFormat)(unref(data).createdAt, "MMMM DD, YYYY")), 1),
                            createTextVNode(" by "),
                            createVNode("b", null, toDisplayString(unref(data).creator?.name ?? "unknown"), 1)
                          ]),
                          unref(data).status === "dormant" ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "space-x-2 mt-4"
                          }, [
                            createVNode(_component_NuxtButton, {
                              size: "sm",
                              variant: "soft",
                              label: "Re-activate",
                              icon: "i-lucide-redo-2"
                            })
                          ])) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "flex flex-col md:items-end" }, [
                          createVNode("p", { class: "card-title mb-2" }, "Account users"),
                          createVNode(_component_NuxtAvatarGroup, { size: "xl" }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList([unref(data).primaryUser, ...unref(data).users], (user) => {
                                return openBlock(), createBlock(_component_NuxtAvatar, {
                                  key: user?.id,
                                  src: user?.image ?? void 0,
                                  alt: user?.name
                                }, null, 8, ["src", "alt"]);
                              }), 128))
                            ]),
                            _: 1
                          }),
                          unref(data).users.length === 1 ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-muted ml-2"
                          }, " You and " + toDisplayString(unref(data).users[0]?.name ?? "1 other"), 1)) : unref(data).users.length > 1 ? (openBlock(), createBlock("p", {
                            key: 1,
                            class: "text-sm text-muted ml-2"
                          }, " You and " + toDisplayString(unref(data).users.length) + " others ", 1)) : (openBlock(), createBlock("p", {
                            key: 2,
                            class: "text-sm text-muted ml-2"
                          }, "You"))
                        ])
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(data) ? (openBlock(), createBlock("div", {
                key: 0,
                class: "space-y-4"
              }, [
                createVNode("div", { class: "grid gap-4 md:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] xl:grid-cols-4" }, [
                  createVNode(_component_NuxtCard, { class: "bg-primary text-white" }, {
                    default: withCtx(() => [
                      createVNode("header", null, [
                        createVNode("p", { class: "card-title text-white" }, "Account Balance")
                      ]),
                      createVNode("div", { class: "mt-2 text-2xl font-semibold font-geist-mono" }, toDisplayString(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(unref(data).balance)), 1),
                      createVNode("footer", { class: "mt-2" }, [
                        createVNode(_component_NuxtBadge, {
                          color: "neutral",
                          variant: "soft",
                          class: "mr-2 dark:bg-white dark:text-primary",
                          icon: "lucide-wallet"
                        }),
                        createVNode("small", null, "Withdrawable amount")
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_NuxtCard, null, {
                    default: withCtx(() => [
                      createVNode("header", null, [
                        createVNode("p", { class: "card-title" }, "Investment Profits")
                      ]),
                      createVNode("div", { class: "mt-2 text-2xl font-semibold font-geist-mono" }, toDisplayString(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(unref(data).totalProfit)), 1),
                      createVNode("footer", { class: "mt-2" }, [
                        createVNode(_component_NuxtBadge, {
                          color: "success",
                          variant: "soft",
                          class: "mr-2",
                          icon: "lucide-flower-2"
                        }),
                        createVNode("small", { class: "text-muted" }, "From " + toDisplayString(unref(data).activeInvestmentCount) + " investments", 1)
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_NuxtCard, null, {
                    default: withCtx(() => [
                      createVNode("header", null, [
                        createVNode("p", { class: "card-title" }, "Last Profit")
                      ]),
                      createVNode("div", { class: "mt-2 text-2xl font-semibold font-geist-mono" }, toDisplayString(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(unref(data).lastProfit?.USDAmount ?? 0)), 1),
                      createVNode("footer", { class: "mt-2" }, [
                        createVNode(_component_NuxtBadge, {
                          color: "success",
                          variant: "soft",
                          class: "mr-2",
                          icon: "lucide-hand-coins"
                        }),
                        unref(data).lastProfit?.createdAt ? (openBlock(), createBlock("small", {
                          key: 0,
                          class: "text-muted"
                        }, toDisplayString(unref(useDateFormat)(
                          unref(data).lastProfit.createdAt,
                          "MMM DD, YYYY | hh:mm aa"
                        )), 1)) : (openBlock(), createBlock("small", {
                          key: 1,
                          class: "text-muted"
                        }, "Not available"))
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_NuxtCard, null, {
                    default: withCtx(() => [
                      createVNode("header", null, [
                        createVNode("p", { class: "card-title" }, "Last Transaction")
                      ]),
                      createVNode("div", { class: "mt-2 text-2xl font-semibold font-geist-mono" }, toDisplayString(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(unref(data).lastTransaction?.USDAmount ?? 0)), 1),
                      createVNode("footer", { class: "mt-2" }, [
                        createVNode(_component_NuxtBadge, {
                          color: unref(data).lastTransaction ? ("getTransactionBadgeColor" in _ctx ? _ctx.getTransactionBadgeColor : unref(getTransactionBadgeColor))(unref(data).lastTransaction?.type) : "error",
                          variant: "soft",
                          class: "mr-2",
                          icon: unref(data).lastTransaction ? ("getTransactionIcon" in _ctx ? _ctx.getTransactionIcon : unref(getTransactionIcon))(unref(data).lastTransaction.type) : "lucide-x"
                        }, null, 8, ["color", "icon"]),
                        createVNode("small", { class: "text-muted" }, toDisplayString(("toCase" in _ctx ? _ctx.toCase : unref(toCase))(
                          unref(data).lastTransaction?.type ?? "not available",
                          "sentence"
                        )), 1)
                      ])
                    ]),
                    _: 1
                  })
                ]),
                createVNode("div", null, [
                  createVNode(_component_NuxtCard, null, {
                    default: withCtx(() => [
                      createVNode("div", null, [
                        createVNode("div", { class: "flex flex-wrap items-center gap-2 justify-between mb-4" }, [
                          createVNode("div", null, [
                            createVNode("p", { class: "card-title" }, "Statistics"),
                            createVNode("p", { class: "text-xs" }, "Overview of account transactions")
                          ]),
                          unref(data).status === "active" ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "flex flex-wrap items-center gap-2"
                          }, [
                            createVNode(_component_NuxtButton, {
                              to: `/user/accounts/${unref(accountId)}/deposit`,
                              icon: "i-lucide-circle-arrow-down",
                              label: "Deposit"
                            }, null, 8, ["to"]),
                            createVNode(_component_NuxtButton, {
                              to: `/user/accounts/${unref(accountId)}/withdraw`,
                              icon: "i-lucide-circle-arrow-up",
                              label: "Withdraw",
                              color: "neutral",
                              variant: "outline"
                            }, null, 8, ["to"])
                          ])) : createCommentVNode("", true)
                        ]),
                        createVNode("div", null, [
                          createVNode(_component_UserAccountStatisticsChart)
                        ])
                      ])
                    ]),
                    _: 1
                  })
                ]),
                createVNode("div", { class: "pb-4" }, [
                  createVNode(_component_NuxtCard, null, {
                    default: withCtx(() => [
                      createVNode("div", { class: "flex flex-col md:flex-row md:items-end justify-between gap-x-4 gap-y-6" }, [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode("div", { class: "border-2 border-muted rounded-md px-2 py-1 w-fit" }, [
                            createVNode("p", { class: "card-title text-base!" }, toDisplayString(unref(data).name), 1)
                          ]),
                          createVNode("p", { class: "font-geist-mono text-xl font-medium" }, toDisplayString(unref(data).number), 1),
                          createVNode("p", { class: "text-sm text-muted" }, [
                            createTextVNode(" Opened on "),
                            createVNode("b", null, toDisplayString(unref(useDateFormat)(unref(data).createdAt, "MMMM DD, YYYY")), 1),
                            createTextVNode(" by "),
                            createVNode("b", null, toDisplayString(unref(data).creator?.name ?? "unknown"), 1)
                          ]),
                          unref(data).status === "dormant" ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "space-x-2 mt-4"
                          }, [
                            createVNode(_component_NuxtButton, {
                              size: "sm",
                              variant: "soft",
                              label: "Re-activate",
                              icon: "i-lucide-redo-2"
                            })
                          ])) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "flex flex-col md:items-end" }, [
                          createVNode("p", { class: "card-title mb-2" }, "Account users"),
                          createVNode(_component_NuxtAvatarGroup, { size: "xl" }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList([unref(data).primaryUser, ...unref(data).users], (user) => {
                                return openBlock(), createBlock(_component_NuxtAvatar, {
                                  key: user?.id,
                                  src: user?.image ?? void 0,
                                  alt: user?.name
                                }, null, 8, ["src", "alt"]);
                              }), 128))
                            ]),
                            _: 1
                          }),
                          unref(data).users.length === 1 ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-muted ml-2"
                          }, " You and " + toDisplayString(unref(data).users[0]?.name ?? "1 other"), 1)) : unref(data).users.length > 1 ? (openBlock(), createBlock("p", {
                            key: 1,
                            class: "text-sm text-muted ml-2"
                          }, " You and " + toDisplayString(unref(data).users.length) + " others ", 1)) : (openBlock(), createBlock("p", {
                            key: 2,
                            class: "text-sm text-muted ml-2"
                          }, "You"))
                        ])
                      ])
                    ]),
                    _: 1
                  })
                ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/user/accounts/[accountId]/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BK1neBTO.mjs.map
