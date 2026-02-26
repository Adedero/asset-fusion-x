import { _ as __nuxt_component_0 } from './my-page-BmNXHC6r.mjs';
import { _ as _sfc_main$1 } from './Select-CTZfWeQw.mjs';
import { _ as __nuxt_component_5, a as __nuxt_component_6, b as __nuxt_component_7, c as __nuxt_component_8, d as __nuxt_component_9, e as __nuxt_component_1 } from './v-table-cell-BRZ0KuYt.mjs';
import { _ as __nuxt_component_11 } from './simple-paginator-CXvXMgvV.mjs';
import { t as toDollar } from './to-dollar-DdS_9tlH.mjs';
import { defineComponent, ref, computed, withAsyncContext, mergeProps, unref, withCtx, isRef, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, createVNode, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { useDateFormat } from '@vueuse/core';
import { u as useFetch } from './fetch-DepCZJYO.mjs';
import { n as navigateTo } from './server.mjs';
import './fetch-error-alert-Cos-JGNP.mjs';
import './Alert-9mK7K0n2.mjs';
import 'reka-ui';
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
import './_plugin-vue_export-helper-1tPrXgE0.mjs';
import '@vue/shared';
import 'vue-router';
import 'better-auth/vue';
import 'better-auth/client/plugins';
import 'tailwindcss/colors';
import '@iconify/vue';
import 'tailwind-variants';
import '@iconify/utils/lib/css/icon';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const page = ref(0);
    const limit = ref(10);
    const selectedStatus = ref("all");
    const selectedCategory = ref("all");
    const selectedDistribution = ref("all");
    const statuses = ["all", "open", "closed", "paused", "terminated"];
    const categories = [
      "all",
      "forex",
      "stocks",
      "real_estate",
      "bonds",
      "commodities",
      "cryptocurrencies",
      "derivatives"
    ];
    const distributions = ["all", "daily", "weekly", "bi_weekly", "monthly"];
    const query = computed(() => {
      const params = new URLSearchParams();
      params.set("limit", limit.value.toString());
      params.set("page", page.value.toString());
      if (selectedStatus.value !== "all") {
        params.set("status", selectedStatus.value);
      }
      if (selectedCategory.value !== "all") {
        params.set("category", selectedCategory.value);
      }
      if (selectedDistribution.value !== "all") {
        params.set("distribution", selectedDistribution.value);
      }
      return Object.fromEntries(params.entries());
    });
    const { data, error, status, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/admin/investments",
      { query },
      "$SQkCOGK4cQ"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const allLoaded = computed(() => {
      return data.value ? data.value.length < limit.value : false;
    });
    const headers = [
      "#",
      "User",
      "Investment",
      "Category",
      "Status",
      "Account Name",
      "Deposit",
      "Expected Return",
      "Current Return",
      "Distribtion",
      "Duration (days)",
      "Days Completed",
      "Created"
    ];
    const handleSelect = (inv) => {
      navigateTo(`/admin/investments/${inv.id}`);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MyPage = __nuxt_component_0;
      const _component_NuxtSelect = _sfc_main$1;
      const _component_VTable = __nuxt_component_5;
      const _component_VTableHeader = __nuxt_component_6;
      const _component_VTableRow = __nuxt_component_7;
      const _component_VTableHead = __nuxt_component_8;
      const _component_VTableBody = __nuxt_component_9;
      const _component_VTableCell = __nuxt_component_1;
      const _component_NuxtSimplePaginator = __nuxt_component_11;
      _push(ssrRenderComponent(_component_MyPage, mergeProps({
        error: unref(error),
        onRefresh: () => unref(refresh)()
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}><div class="flex items-center justify-between gap-2 flex-wrap"${_scopeId}><h1 class="text-3xl font-semibold"${_scopeId}>Investments</h1><div class="flex w-full md:w-fit items-end justify-end md:justify-normal gap-2"${_scopeId}><div class="flex flex-col md:items-end gap-1"${_scopeId}><p class="text-xs font-semibold"${_scopeId}>Status</p>`);
            _push2(ssrRenderComponent(_component_NuxtSelect, {
              modelValue: unref(selectedStatus),
              "onUpdate:modelValue": ($event) => isRef(selectedStatus) ? selectedStatus.value = $event : null,
              items: statuses,
              size: "sm",
              class: "w-28"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-col md:items-end gap-1"${_scopeId}><p class="text-xs font-semibold"${_scopeId}>Category</p>`);
            _push2(ssrRenderComponent(_component_NuxtSelect, {
              modelValue: unref(selectedCategory),
              "onUpdate:modelValue": ($event) => isRef(selectedCategory) ? selectedCategory.value = $event : null,
              items: categories,
              size: "sm",
              class: "w-28"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-col md:items-end gap-1"${_scopeId}><p class="text-xs font-semibold"${_scopeId}>Distribution</p>`);
            _push2(ssrRenderComponent(_component_NuxtSelect, {
              modelValue: unref(selectedDistribution),
              "onUpdate:modelValue": ($event) => isRef(selectedDistribution) ? selectedDistribution.value = $event : null,
              items: distributions,
              size: "sm",
              class: "w-28"
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div>`);
            if (unref(data)) {
              _push2(`<section${_scopeId}>`);
              _push2(ssrRenderComponent(_component_VTable, {
                loading: unref(status) === "pending",
                hover: ""
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_VTableHeader, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_VTableRow, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<!--[-->`);
                                ssrRenderList(headers, (header) => {
                                  _push5(ssrRenderComponent(_component_VTableHead, { key: header }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(header)}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(header), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                });
                                _push5(`<!--]-->`);
                              } else {
                                return [
                                  (openBlock(), createBlock(Fragment, null, renderList(headers, (header) => {
                                    return createVNode(_component_VTableHead, { key: header }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(header), 1)
                                      ]),
                                      _: 2
                                    }, 1024);
                                  }), 64))
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_VTableRow, null, {
                              default: withCtx(() => [
                                (openBlock(), createBlock(Fragment, null, renderList(headers, (header) => {
                                  return createVNode(_component_VTableHead, { key: header }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(header), 1)
                                    ]),
                                    _: 2
                                  }, 1024);
                                }), 64))
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_VTableBody, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<!--[-->`);
                          ssrRenderList(unref(data), (inv, i) => {
                            _push4(ssrRenderComponent(_component_VTableRow, {
                              key: inv.id,
                              onClick: ($event) => handleSelect(inv)
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(_component_VTableCell, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(i + 1 + unref(page) * unref(limit))}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(i + 1 + unref(page) * unref(limit)), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(_component_VTableCell, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(inv.investorName)}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(inv.investorName), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(_component_VTableCell, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(inv.investmentName)}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(inv.investmentName), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(_component_VTableCell, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(inv.category)}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(inv.category), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(_component_VTableCell, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(inv.status)}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(inv.status), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(_component_VTableCell, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(inv.financialAccountName)}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(inv.financialAccountName), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(_component_VTableCell, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(inv.deposit))}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(inv.deposit)), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(_component_VTableCell, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(inv.totalReturn / 100 * inv.deposit))}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(inv.totalReturn / 100 * inv.deposit)), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(_component_VTableCell, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(inv.totalProfit))}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(inv.totalProfit)), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(_component_VTableCell, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(inv.profitDistribution)}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(inv.profitDistribution), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(_component_VTableCell, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(inv.duration)}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(inv.duration), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(_component_VTableCell, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(inv.daysCompleted)}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(inv.daysCompleted), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(_component_VTableCell, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(unref(useDateFormat)(inv.createdAt, "YYYY-MMM-DD hh:mm aa"))}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(unref(useDateFormat)(inv.createdAt, "YYYY-MMM-DD hh:mm aa")), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode(_component_VTableCell, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(i + 1 + unref(page) * unref(limit)), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_VTableCell, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(inv.investorName), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_VTableCell, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(inv.investmentName), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_VTableCell, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(inv.category), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_VTableCell, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(inv.status), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_VTableCell, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(inv.financialAccountName), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_VTableCell, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(inv.deposit)), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_VTableCell, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(inv.totalReturn / 100 * inv.deposit)), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_VTableCell, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(inv.totalProfit)), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_VTableCell, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(inv.profitDistribution), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_VTableCell, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(inv.duration), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_VTableCell, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(inv.daysCompleted), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_VTableCell, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(unref(useDateFormat)(inv.createdAt, "YYYY-MMM-DD hh:mm aa")), 1)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          });
                          _push4(`<!--]-->`);
                        } else {
                          return [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(data), (inv, i) => {
                              return openBlock(), createBlock(_component_VTableRow, {
                                key: inv.id,
                                onClick: ($event) => handleSelect(inv)
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_VTableCell, null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(i + 1 + unref(page) * unref(limit)), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_VTableCell, null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(inv.investorName), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_VTableCell, null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(inv.investmentName), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_VTableCell, null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(inv.category), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_VTableCell, null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(inv.status), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_VTableCell, null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(inv.financialAccountName), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_VTableCell, null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(inv.deposit)), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_VTableCell, null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(inv.totalReturn / 100 * inv.deposit)), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_VTableCell, null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(inv.totalProfit)), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_VTableCell, null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(inv.profitDistribution), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_VTableCell, null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(inv.duration), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_VTableCell, null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(inv.daysCompleted), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_VTableCell, null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(unref(useDateFormat)(inv.createdAt, "YYYY-MMM-DD hh:mm aa")), 1)
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1032, ["onClick"]);
                            }), 128))
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_VTableHeader, null, {
                        default: withCtx(() => [
                          createVNode(_component_VTableRow, null, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(Fragment, null, renderList(headers, (header) => {
                                return createVNode(_component_VTableHead, { key: header }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(header), 1)
                                  ]),
                                  _: 2
                                }, 1024);
                              }), 64))
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_VTableBody, null, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(data), (inv, i) => {
                            return openBlock(), createBlock(_component_VTableRow, {
                              key: inv.id,
                              onClick: ($event) => handleSelect(inv)
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(i + 1 + unref(page) * unref(limit)), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(inv.investorName), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(inv.investmentName), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(inv.category), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(inv.status), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(inv.financialAccountName), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(inv.deposit)), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(inv.totalReturn / 100 * inv.deposit)), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(inv.totalProfit)), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(inv.profitDistribution), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(inv.duration), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(inv.daysCompleted), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(unref(useDateFormat)(inv.createdAt, "YYYY-MMM-DD hh:mm aa")), 1)
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1032, ["onClick"]);
                          }), 128))
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<div class="mt-2 border-t border-t-default"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_NuxtSimplePaginator, {
                page: unref(page),
                "onUpdate:page": ($event) => isRef(page) ? page.value = $event : null,
                rows: unref(limit),
                "all-loaded": unref(allLoaded)
              }, null, _parent2, _scopeId));
              _push2(`</div></section>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", null, [
                createVNode("div", { class: "flex items-center justify-between gap-2 flex-wrap" }, [
                  createVNode("h1", { class: "text-3xl font-semibold" }, "Investments"),
                  createVNode("div", { class: "flex w-full md:w-fit items-end justify-end md:justify-normal gap-2" }, [
                    createVNode("div", { class: "flex flex-col md:items-end gap-1" }, [
                      createVNode("p", { class: "text-xs font-semibold" }, "Status"),
                      createVNode(_component_NuxtSelect, {
                        modelValue: unref(selectedStatus),
                        "onUpdate:modelValue": ($event) => isRef(selectedStatus) ? selectedStatus.value = $event : null,
                        items: statuses,
                        size: "sm",
                        class: "w-28"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "flex flex-col md:items-end gap-1" }, [
                      createVNode("p", { class: "text-xs font-semibold" }, "Category"),
                      createVNode(_component_NuxtSelect, {
                        modelValue: unref(selectedCategory),
                        "onUpdate:modelValue": ($event) => isRef(selectedCategory) ? selectedCategory.value = $event : null,
                        items: categories,
                        size: "sm",
                        class: "w-28"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "flex flex-col md:items-end gap-1" }, [
                      createVNode("p", { class: "text-xs font-semibold" }, "Distribution"),
                      createVNode(_component_NuxtSelect, {
                        modelValue: unref(selectedDistribution),
                        "onUpdate:modelValue": ($event) => isRef(selectedDistribution) ? selectedDistribution.value = $event : null,
                        items: distributions,
                        size: "sm",
                        class: "w-28"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ])
                  ])
                ]),
                unref(data) ? (openBlock(), createBlock("section", { key: 0 }, [
                  createVNode(_component_VTable, {
                    loading: unref(status) === "pending",
                    hover: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_VTableHeader, null, {
                        default: withCtx(() => [
                          createVNode(_component_VTableRow, null, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(Fragment, null, renderList(headers, (header) => {
                                return createVNode(_component_VTableHead, { key: header }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(header), 1)
                                  ]),
                                  _: 2
                                }, 1024);
                              }), 64))
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_VTableBody, null, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(data), (inv, i) => {
                            return openBlock(), createBlock(_component_VTableRow, {
                              key: inv.id,
                              onClick: ($event) => handleSelect(inv)
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(i + 1 + unref(page) * unref(limit)), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(inv.investorName), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(inv.investmentName), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(inv.category), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(inv.status), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(inv.financialAccountName), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(inv.deposit)), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(inv.totalReturn / 100 * inv.deposit)), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(inv.totalProfit)), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(inv.profitDistribution), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(inv.duration), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(inv.daysCompleted), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(unref(useDateFormat)(inv.createdAt, "YYYY-MMM-DD hh:mm aa")), 1)
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1032, ["onClick"]);
                          }), 128))
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["loading"]),
                  createVNode("div", { class: "mt-2 border-t border-t-default" }, [
                    createVNode(_component_NuxtSimplePaginator, {
                      page: unref(page),
                      "onUpdate:page": ($event) => isRef(page) ? page.value = $event : null,
                      rows: unref(limit),
                      "all-loaded": unref(allLoaded)
                    }, null, 8, ["page", "onUpdate:page", "rows", "all-loaded"])
                  ])
                ])) : createCommentVNode("", true)
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/investments/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-C-ojBGVg.mjs.map
