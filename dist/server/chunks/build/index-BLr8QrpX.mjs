import { _ as __nuxt_component_0 } from './my-page-Cu0txfPp.mjs';
import { _ as _sfc_main$1 } from './Card-CcnC6q6H.mjs';
import { _ as _sfc_main$2 } from './Badge-DE6iRalv.mjs';
import { _ as __nuxt_component_6 } from './empty-icon-BnDpoaPH.mjs';
import { _ as _sfc_main$3 } from './Table-CdgEzrWp.mjs';
import { _ as _sfc_main$4 } from './Calendar-CmfQy2-S.mjs';
import { d as _sfc_main$f, c as _sfc_main$a } from './server.mjs';
import { g as getTransactionIcon, a as getTransactionBadgeColor } from './transaction-BkPO0uYy.mjs';
import { defineComponent, withAsyncContext, mergeProps, unref, withCtx, createVNode, toDisplayString, createBlock, openBlock, createCommentVNode, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { today, getLocalTimeZone } from '@internationalized/date';
import { useDateFormat } from '@vueuse/core';
import { t as toDollar } from './to-dollar-DdS_9tlH.mjs';
import { u as useFetch } from './fetch-MrHZ0gIG.mjs';
import './fetch-error-alert-NIQ5BlkS.mjs';
import './Alert-CKjxjhE_.mjs';
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
import 'cron';
import 'decimal.js';
import 'node:process';
import 'node:url';
import '@prisma/client/runtime/library';
import 'nodemailer';
import 'dotenv';
import 'better-auth';
import 'better-auth/adapters/prisma';
import 'better-auth/plugins';
import '@iconify/utils';
import 'consola';
import '@tanstack/vue-table';
import 'reka-ui/namespaced';
import 'vue-router';
import 'better-auth/vue';
import 'better-auth/client/plugins';
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
    const localDate = today(getLocalTimeZone());
    const { data, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/user/pages/dashboard", {
      key: "user-dashboard"
    }, "$ZFj1pjJ4hi")), __temp = await __temp, __restore(), __temp);
    const transactionColumns = [
      {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }) => {
          const id = row.getValue("id") || "";
          return id.length > 5 ? id.slice(0, 5) + "..." : id;
        }
      },
      {
        accessorKey: "type",
        header: "Type"
      },
      {
        accessorKey: "currency",
        header: "Currency"
      },
      {
        accessorKey: "USDAmount",
        header: "USD Amount",
        cell: ({ row }) => toDollar(row.getValue("USDAmount"))
      },
      {
        accessorKey: "status",
        header: "Status"
      },
      {
        accessorKey: "createdAt",
        header: "Date",
        cell: ({ row }) => useDateFormat(row.getValue("createdAt"), "MMM/DD/YYYY hh:mm aa").value
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MyPage = __nuxt_component_0;
      const _component_NuxtCard = _sfc_main$1;
      const _component_NuxtBadge = _sfc_main$2;
      const _component_EmptyIcon = __nuxt_component_6;
      const _component_NuxtTable = _sfc_main$3;
      const _component_NuxtCalendar = _sfc_main$4;
      const _component_NuxtButton = _sfc_main$a;
      const _component_NuxtIcon = _sfc_main$f;
      _push(ssrRenderComponent(_component_MyPage, mergeProps({
        error: unref(error),
        onRefresh: () => unref(refresh)()
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(data)) {
              _push2(`<div class="w-full lg:h-full gap-4 lg:flex pb-4"${_scopeId}><div class="w-full lg:min-w-0 lg:h-full lg:overflow-y-auto lg:flex-grow"${_scopeId}><div class="w-full max-h-full space-y-4 p-0.5"${_scopeId}><div class="grid gap-4 md:grid-cols-[repeat(auto-fit,minmax(250px,1fr))]"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_NuxtCard, { class: "bg-primary text-white" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<header${_scopeId2}><p class="card-title text-white"${_scopeId2}>Account Balance</p></header><div class="mt-2 text-2xl font-semibold font-geist-mono"${_scopeId2}>${ssrInterpolate(unref(toDollar)(unref(data).totalBalance))}</div><footer class="mt-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_NuxtBadge, {
                      color: "neutral",
                      variant: "soft",
                      class: "mr-2 dark:bg-white dark:text-primary",
                      icon: "lucide-wallet"
                    }, null, _parent3, _scopeId2));
                    _push3(`<small${_scopeId2}>From ${ssrInterpolate(unref(data).activeAccounts)} accounts</small></footer>`);
                  } else {
                    return [
                      createVNode("header", null, [
                        createVNode("p", { class: "card-title text-white" }, "Account Balance")
                      ]),
                      createVNode("div", { class: "mt-2 text-2xl font-semibold font-geist-mono" }, toDisplayString(unref(toDollar)(unref(data).totalBalance)), 1),
                      createVNode("footer", { class: "mt-2" }, [
                        createVNode(_component_NuxtBadge, {
                          color: "neutral",
                          variant: "soft",
                          class: "mr-2 dark:bg-white dark:text-primary",
                          icon: "lucide-wallet"
                        }),
                        createVNode("small", null, "From " + toDisplayString(unref(data).activeAccounts) + " accounts", 1)
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_NuxtCard, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<header${_scopeId2}><p class="card-title"${_scopeId2}>Profit</p></header><div class="mt-2 text-2xl font-semibold font-geist-mono"${_scopeId2}>${ssrInterpolate(unref(toDollar)(unref(data).totalProfit))}</div><footer class="mt-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_NuxtBadge, {
                      color: "success",
                      variant: "soft",
                      class: "mr-2",
                      icon: "lucide-flower-2"
                    }, null, _parent3, _scopeId2));
                    _push3(`<small class="text-muted"${_scopeId2}>From ${ssrInterpolate(unref(data).activeInvestments)} investments</small></footer>`);
                  } else {
                    return [
                      createVNode("header", null, [
                        createVNode("p", { class: "card-title" }, "Profit")
                      ]),
                      createVNode("div", { class: "mt-2 text-2xl font-semibold font-geist-mono" }, toDisplayString(unref(toDollar)(unref(data).totalProfit)), 1),
                      createVNode("footer", { class: "mt-2" }, [
                        createVNode(_component_NuxtBadge, {
                          color: "success",
                          variant: "soft",
                          class: "mr-2",
                          icon: "lucide-flower-2"
                        }),
                        createVNode("small", { class: "text-muted" }, "From " + toDisplayString(unref(data).activeInvestments) + " investments", 1)
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_NuxtCard, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<header${_scopeId2}><p class="card-title"${_scopeId2}>Last Transaction</p></header><div class="mt-2 text-2xl font-semibold font-geist-mono"${_scopeId2}>${ssrInterpolate(unref(toDollar)(unref(data).lastTransaction?.USDAmount ?? 0))}</div><footer class="mt-2"${_scopeId2}>`);
                    if (unref(data).lastTransaction) {
                      _push3(`<div${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_NuxtBadge, {
                        color: ("getTransactionBadgeColor" in _ctx ? _ctx.getTransactionBadgeColor : unref(getTransactionBadgeColor))(unref(data).lastTransaction.type),
                        variant: "soft",
                        class: "mr-2",
                        icon: ("getTransactionIcon" in _ctx ? _ctx.getTransactionIcon : unref(getTransactionIcon))(unref(data).lastTransaction.type)
                      }, null, _parent3, _scopeId2));
                      _push3(`<small class="text-muted"${_scopeId2}>${ssrInterpolate(unref(data).lastTransaction.status)} ${ssrInterpolate(unref(data).lastTransaction.type)}</small></div>`);
                    } else {
                      _push3(`<div${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_NuxtBadge, {
                        color: "neutral",
                        variant: "soft",
                        class: "mr-2",
                        icon: "lucide-alert-triangle"
                      }, null, _parent3, _scopeId2));
                      _push3(`<small class="text-muted"${_scopeId2}>Not available</small></div>`);
                    }
                    _push3(`</footer>`);
                  } else {
                    return [
                      createVNode("header", null, [
                        createVNode("p", { class: "card-title" }, "Last Transaction")
                      ]),
                      createVNode("div", { class: "mt-2 text-2xl font-semibold font-geist-mono" }, toDisplayString(unref(toDollar)(unref(data).lastTransaction?.USDAmount ?? 0)), 1),
                      createVNode("footer", { class: "mt-2" }, [
                        unref(data).lastTransaction ? (openBlock(), createBlock("div", { key: 0 }, [
                          createVNode(_component_NuxtBadge, {
                            color: ("getTransactionBadgeColor" in _ctx ? _ctx.getTransactionBadgeColor : unref(getTransactionBadgeColor))(unref(data).lastTransaction.type),
                            variant: "soft",
                            class: "mr-2",
                            icon: ("getTransactionIcon" in _ctx ? _ctx.getTransactionIcon : unref(getTransactionIcon))(unref(data).lastTransaction.type)
                          }, null, 8, ["color", "icon"]),
                          createVNode("small", { class: "text-muted" }, toDisplayString(unref(data).lastTransaction.status) + " " + toDisplayString(unref(data).lastTransaction.type), 1)
                        ])) : (openBlock(), createBlock("div", { key: 1 }, [
                          createVNode(_component_NuxtBadge, {
                            color: "neutral",
                            variant: "soft",
                            class: "mr-2",
                            icon: "lucide-alert-triangle"
                          }),
                          createVNode("small", { class: "text-muted" }, "Not available")
                        ]))
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div><div class="w-full py-0.5"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_NuxtCard, { class: "w-full" }, {
                header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div${_scopeId2}><p class="card-title"${_scopeId2}>Recent Transactions</p></div>`);
                  } else {
                    return [
                      createVNode("div", null, [
                        createVNode("p", { class: "card-title" }, "Recent Transactions")
                      ])
                    ];
                  }
                }),
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (unref(data).recentTransactions.length < 1) {
                      _push3(`<div class="fluid flex-center text-muted"${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_EmptyIcon, {
                        label: "No transactions",
                        size: "100px"
                      }, null, _parent3, _scopeId2));
                      _push3(`</div>`);
                    } else {
                      _push3(ssrRenderComponent(_component_NuxtTable, {
                        data: unref(data).recentTransactions,
                        columns: transactionColumns,
                        style: { "min-width": "0" }
                      }, null, _parent3, _scopeId2));
                    }
                  } else {
                    return [
                      unref(data).recentTransactions.length < 1 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "fluid flex-center text-muted"
                      }, [
                        createVNode(_component_EmptyIcon, {
                          label: "No transactions",
                          size: "100px"
                        })
                      ])) : (openBlock(), createBlock(_component_NuxtTable, {
                        key: 1,
                        data: unref(data).recentTransactions,
                        columns: transactionColumns,
                        style: { "min-width": "0" }
                      }, null, 8, ["data"]))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div></div></div><div class="lg:h-full lg:overflow-y-auto lg:flex-shrink-0 lg:w-96"${_scopeId}><div class="mt-3 space-y-4 lg:mt-0 w-full p-0.5"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_NuxtCard, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_NuxtCalendar, { "default-value": unref(localDate) }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_NuxtCalendar, { "default-value": unref(localDate) }, null, 8, ["default-value"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_NuxtCard, null, {
                header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="flex items-center gap-2 justify-between"${_scopeId2}><p class="card-title"${_scopeId2}>Recent Notifications</p>`);
                    _push3(ssrRenderComponent(_component_NuxtButton, {
                      to: "/user/notifications",
                      size: "sm",
                      variant: "outline",
                      color: "neutral",
                      label: "More",
                      "trailing-icon": "lucide-arrow-up-right"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "flex items-center gap-2 justify-between" }, [
                        createVNode("p", { class: "card-title" }, "Recent Notifications"),
                        createVNode(_component_NuxtButton, {
                          to: "/user/notifications",
                          size: "sm",
                          variant: "outline",
                          color: "neutral",
                          label: "More",
                          "trailing-icon": "lucide-arrow-up-right"
                        })
                      ])
                    ];
                  }
                }),
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (unref(data).notifications.length < 1) {
                      _push3(`<div class="fluid flex-center text-muted"${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_EmptyIcon, {
                        label: "No notifications",
                        size: "100px"
                      }, null, _parent3, _scopeId2));
                      _push3(`</div>`);
                    } else {
                      _push3(`<div class="space-y-2"${_scopeId2}><!--[-->`);
                      ssrRenderList(unref(data).notifications, (notification) => {
                        _push3(ssrRenderComponent(_component_NuxtCard, {
                          key: notification.id
                        }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(`<div class="flex gap-2 md:gap-4"${_scopeId3}><div class="flex-grow"${_scopeId3}><div class="text-sm"${_scopeId3}>`);
                              if (!notification.isRead) {
                                _push4(`<div class="flex items-center gap-4 justify-between mb-1"${_scopeId3}>`);
                                _push4(ssrRenderComponent(_component_NuxtBadge, {
                                  size: "sm",
                                  color: "success",
                                  variant: "soft",
                                  label: "New"
                                }, null, _parent4, _scopeId3));
                                _push4(`</div>`);
                              } else {
                                _push4(`<!---->`);
                              }
                              _push4(`<p class="font-semibold"${_scopeId3}>${ssrInterpolate(notification.title)}</p>`);
                              if (notification.bodyType === "string") {
                                _push4(`<p${_scopeId3}>${ssrInterpolate(notification.body)}</p>`);
                              } else {
                                _push4(`<div${_scopeId3}>${notification.body ?? ""}</div>`);
                              }
                              _push4(`<footer class="mt-2 flex items-center gap-4 justify-between"${_scopeId3}><div class="flex items-center gap-1"${_scopeId3}>`);
                              _push4(ssrRenderComponent(_component_NuxtIcon, {
                                name: "lucide:clock",
                                class: "text-muted"
                              }, null, _parent4, _scopeId3));
                              _push4(`<p class="text-xs text-muted"${_scopeId3}>${ssrInterpolate(unref(useDateFormat)(
                                notification.createdAt,
                                "MMM DD, YYYY"
                              ))} at ${ssrInterpolate(unref(useDateFormat)(notification.createdAt, "hh:mm aa"))}</p></div></footer></div></div></div>`);
                            } else {
                              return [
                                createVNode("div", { class: "flex gap-2 md:gap-4" }, [
                                  createVNode("div", { class: "flex-grow" }, [
                                    createVNode("div", { class: "text-sm" }, [
                                      !notification.isRead ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "flex items-center gap-4 justify-between mb-1"
                                      }, [
                                        createVNode(_component_NuxtBadge, {
                                          size: "sm",
                                          color: "success",
                                          variant: "soft",
                                          label: "New"
                                        })
                                      ])) : createCommentVNode("", true),
                                      createVNode("p", { class: "font-semibold" }, toDisplayString(notification.title), 1),
                                      notification.bodyType === "string" ? (openBlock(), createBlock("p", { key: 1 }, toDisplayString(notification.body), 1)) : (openBlock(), createBlock("div", {
                                        key: 2,
                                        innerHTML: notification.body
                                      }, null, 8, ["innerHTML"])),
                                      createVNode("footer", { class: "mt-2 flex items-center gap-4 justify-between" }, [
                                        createVNode("div", { class: "flex items-center gap-1" }, [
                                          createVNode(_component_NuxtIcon, {
                                            name: "lucide:clock",
                                            class: "text-muted"
                                          }),
                                          createVNode("p", { class: "text-xs text-muted" }, toDisplayString(unref(useDateFormat)(
                                            notification.createdAt,
                                            "MMM DD, YYYY"
                                          )) + " at " + toDisplayString(unref(useDateFormat)(notification.createdAt, "hh:mm aa")), 1)
                                        ])
                                      ])
                                    ])
                                  ])
                                ])
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                      });
                      _push3(`<!--]--></div>`);
                    }
                  } else {
                    return [
                      unref(data).notifications.length < 1 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "fluid flex-center text-muted"
                      }, [
                        createVNode(_component_EmptyIcon, {
                          label: "No notifications",
                          size: "100px"
                        })
                      ])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "space-y-2"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(data).notifications, (notification) => {
                          return openBlock(), createBlock(_component_NuxtCard, {
                            key: notification.id
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex gap-2 md:gap-4" }, [
                                createVNode("div", { class: "flex-grow" }, [
                                  createVNode("div", { class: "text-sm" }, [
                                    !notification.isRead ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "flex items-center gap-4 justify-between mb-1"
                                    }, [
                                      createVNode(_component_NuxtBadge, {
                                        size: "sm",
                                        color: "success",
                                        variant: "soft",
                                        label: "New"
                                      })
                                    ])) : createCommentVNode("", true),
                                    createVNode("p", { class: "font-semibold" }, toDisplayString(notification.title), 1),
                                    notification.bodyType === "string" ? (openBlock(), createBlock("p", { key: 1 }, toDisplayString(notification.body), 1)) : (openBlock(), createBlock("div", {
                                      key: 2,
                                      innerHTML: notification.body
                                    }, null, 8, ["innerHTML"])),
                                    createVNode("footer", { class: "mt-2 flex items-center gap-4 justify-between" }, [
                                      createVNode("div", { class: "flex items-center gap-1" }, [
                                        createVNode(_component_NuxtIcon, {
                                          name: "lucide:clock",
                                          class: "text-muted"
                                        }),
                                        createVNode("p", { class: "text-xs text-muted" }, toDisplayString(unref(useDateFormat)(
                                          notification.createdAt,
                                          "MMM DD, YYYY"
                                        )) + " at " + toDisplayString(unref(useDateFormat)(notification.createdAt, "hh:mm aa")), 1)
                                      ])
                                    ])
                                  ])
                                ])
                              ])
                            ]),
                            _: 2
                          }, 1024);
                        }), 128))
                      ]))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(data) ? (openBlock(), createBlock("div", {
                key: 0,
                class: "w-full lg:h-full gap-4 lg:flex pb-4"
              }, [
                createVNode("div", { class: "w-full lg:min-w-0 lg:h-full lg:overflow-y-auto lg:flex-grow" }, [
                  createVNode("div", { class: "w-full max-h-full space-y-4 p-0.5" }, [
                    createVNode("div", { class: "grid gap-4 md:grid-cols-[repeat(auto-fit,minmax(250px,1fr))]" }, [
                      createVNode(_component_NuxtCard, { class: "bg-primary text-white" }, {
                        default: withCtx(() => [
                          createVNode("header", null, [
                            createVNode("p", { class: "card-title text-white" }, "Account Balance")
                          ]),
                          createVNode("div", { class: "mt-2 text-2xl font-semibold font-geist-mono" }, toDisplayString(unref(toDollar)(unref(data).totalBalance)), 1),
                          createVNode("footer", { class: "mt-2" }, [
                            createVNode(_component_NuxtBadge, {
                              color: "neutral",
                              variant: "soft",
                              class: "mr-2 dark:bg-white dark:text-primary",
                              icon: "lucide-wallet"
                            }),
                            createVNode("small", null, "From " + toDisplayString(unref(data).activeAccounts) + " accounts", 1)
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_NuxtCard, null, {
                        default: withCtx(() => [
                          createVNode("header", null, [
                            createVNode("p", { class: "card-title" }, "Profit")
                          ]),
                          createVNode("div", { class: "mt-2 text-2xl font-semibold font-geist-mono" }, toDisplayString(unref(toDollar)(unref(data).totalProfit)), 1),
                          createVNode("footer", { class: "mt-2" }, [
                            createVNode(_component_NuxtBadge, {
                              color: "success",
                              variant: "soft",
                              class: "mr-2",
                              icon: "lucide-flower-2"
                            }),
                            createVNode("small", { class: "text-muted" }, "From " + toDisplayString(unref(data).activeInvestments) + " investments", 1)
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_NuxtCard, null, {
                        default: withCtx(() => [
                          createVNode("header", null, [
                            createVNode("p", { class: "card-title" }, "Last Transaction")
                          ]),
                          createVNode("div", { class: "mt-2 text-2xl font-semibold font-geist-mono" }, toDisplayString(unref(toDollar)(unref(data).lastTransaction?.USDAmount ?? 0)), 1),
                          createVNode("footer", { class: "mt-2" }, [
                            unref(data).lastTransaction ? (openBlock(), createBlock("div", { key: 0 }, [
                              createVNode(_component_NuxtBadge, {
                                color: ("getTransactionBadgeColor" in _ctx ? _ctx.getTransactionBadgeColor : unref(getTransactionBadgeColor))(unref(data).lastTransaction.type),
                                variant: "soft",
                                class: "mr-2",
                                icon: ("getTransactionIcon" in _ctx ? _ctx.getTransactionIcon : unref(getTransactionIcon))(unref(data).lastTransaction.type)
                              }, null, 8, ["color", "icon"]),
                              createVNode("small", { class: "text-muted" }, toDisplayString(unref(data).lastTransaction.status) + " " + toDisplayString(unref(data).lastTransaction.type), 1)
                            ])) : (openBlock(), createBlock("div", { key: 1 }, [
                              createVNode(_component_NuxtBadge, {
                                color: "neutral",
                                variant: "soft",
                                class: "mr-2",
                                icon: "lucide-alert-triangle"
                              }),
                              createVNode("small", { class: "text-muted" }, "Not available")
                            ]))
                          ])
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode("div", { class: "w-full py-0.5" }, [
                      createVNode(_component_NuxtCard, { class: "w-full" }, {
                        header: withCtx(() => [
                          createVNode("div", null, [
                            createVNode("p", { class: "card-title" }, "Recent Transactions")
                          ])
                        ]),
                        default: withCtx(() => [
                          unref(data).recentTransactions.length < 1 ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "fluid flex-center text-muted"
                          }, [
                            createVNode(_component_EmptyIcon, {
                              label: "No transactions",
                              size: "100px"
                            })
                          ])) : (openBlock(), createBlock(_component_NuxtTable, {
                            key: 1,
                            data: unref(data).recentTransactions,
                            columns: transactionColumns,
                            style: { "min-width": "0" }
                          }, null, 8, ["data"]))
                        ]),
                        _: 1
                      })
                    ])
                  ])
                ]),
                createVNode("div", { class: "lg:h-full lg:overflow-y-auto lg:flex-shrink-0 lg:w-96" }, [
                  createVNode("div", { class: "mt-3 space-y-4 lg:mt-0 w-full p-0.5" }, [
                    createVNode(_component_NuxtCard, null, {
                      default: withCtx(() => [
                        createVNode(_component_NuxtCalendar, { "default-value": unref(localDate) }, null, 8, ["default-value"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_NuxtCard, null, {
                      header: withCtx(() => [
                        createVNode("div", { class: "flex items-center gap-2 justify-between" }, [
                          createVNode("p", { class: "card-title" }, "Recent Notifications"),
                          createVNode(_component_NuxtButton, {
                            to: "/user/notifications",
                            size: "sm",
                            variant: "outline",
                            color: "neutral",
                            label: "More",
                            "trailing-icon": "lucide-arrow-up-right"
                          })
                        ])
                      ]),
                      default: withCtx(() => [
                        unref(data).notifications.length < 1 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "fluid flex-center text-muted"
                        }, [
                          createVNode(_component_EmptyIcon, {
                            label: "No notifications",
                            size: "100px"
                          })
                        ])) : (openBlock(), createBlock("div", {
                          key: 1,
                          class: "space-y-2"
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(data).notifications, (notification) => {
                            return openBlock(), createBlock(_component_NuxtCard, {
                              key: notification.id
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "flex gap-2 md:gap-4" }, [
                                  createVNode("div", { class: "flex-grow" }, [
                                    createVNode("div", { class: "text-sm" }, [
                                      !notification.isRead ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "flex items-center gap-4 justify-between mb-1"
                                      }, [
                                        createVNode(_component_NuxtBadge, {
                                          size: "sm",
                                          color: "success",
                                          variant: "soft",
                                          label: "New"
                                        })
                                      ])) : createCommentVNode("", true),
                                      createVNode("p", { class: "font-semibold" }, toDisplayString(notification.title), 1),
                                      notification.bodyType === "string" ? (openBlock(), createBlock("p", { key: 1 }, toDisplayString(notification.body), 1)) : (openBlock(), createBlock("div", {
                                        key: 2,
                                        innerHTML: notification.body
                                      }, null, 8, ["innerHTML"])),
                                      createVNode("footer", { class: "mt-2 flex items-center gap-4 justify-between" }, [
                                        createVNode("div", { class: "flex items-center gap-1" }, [
                                          createVNode(_component_NuxtIcon, {
                                            name: "lucide:clock",
                                            class: "text-muted"
                                          }),
                                          createVNode("p", { class: "text-xs text-muted" }, toDisplayString(unref(useDateFormat)(
                                            notification.createdAt,
                                            "MMM DD, YYYY"
                                          )) + " at " + toDisplayString(unref(useDateFormat)(notification.createdAt, "hh:mm aa")), 1)
                                        ])
                                      ])
                                    ])
                                  ])
                                ])
                              ]),
                              _: 2
                            }, 1024);
                          }), 128))
                        ]))
                      ]),
                      _: 1
                    })
                  ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/user/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BLr8QrpX.mjs.map
