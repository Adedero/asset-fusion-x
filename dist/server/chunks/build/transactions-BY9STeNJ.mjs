import { _ as __nuxt_component_0 } from './my-page-CoHUY04l.mjs';
import { _ as _sfc_main$1 } from './Select-nlK-7hat.mjs';
import { _ as __nuxt_component_5, a as __nuxt_component_6, b as __nuxt_component_7, c as __nuxt_component_8, d as __nuxt_component_9, e as __nuxt_component_10 } from './v-table-cell-DotqdMk0.mjs';
import { _ as _sfc_main$2 } from './Badge-De7_XYLl.mjs';
import { _ as __nuxt_component_12 } from './simple-paginator-BpbokSEJ.mjs';
import { defineComponent, ref, computed, withAsyncContext, mergeProps, unref, withCtx, isRef, createTextVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, createVNode, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { useDateFormat } from '@vueuse/core';
import { u as useFetch } from './fetch-Bc0FIvxO.mjs';
import './fetch-error-alert-B3Gd_w4n.mjs';
import './Alert-CXdXSwrA.mjs';
import 'reka-ui';
import './server.mjs';
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
import '@prisma/client/runtime/client';
import '@prisma/adapter-pg';
import 'better-auth/plugins';
import 'nodemailer';
import '@iconify/utils';
import 'consola';
import 'ipx';
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
import './_plugin-vue_export-helper-1tPrXgE0.mjs';
import '@vue/shared';

function getTxnStatusBadgeColor(status) {
  switch (status) {
    case "pending":
      return "primary";
    case "successfull":
      return "success";
    case "reversed":
      return "warning";
    case "failed":
      return "error";
    default:
      return "neutral";
  }
}
function getTxnTypeBadgeColor(type) {
  switch (type) {
    case "profi":
    case "investment":
      return "success";
    case "withdrawal":
    case "transfer":
      return "error";
    case "deposit":
      return "primary";
    default:
      return "neutral";
  }
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "transactions",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const page = ref(0);
    const limit = ref(10);
    const selectedType = ref("all");
    const selectedStatus = ref("all");
    const types = [
      "all",
      "deposit",
      "withdrawal",
      "transfer",
      "investment",
      "profit"
    ];
    const statuses = ["all", "pending", "successfull", "reversed", "failed"];
    const query = computed(() => {
      const params = new URLSearchParams();
      params.set("limit", limit.value.toString());
      params.set("page", page.value.toString());
      if (selectedType.value !== "all") {
        params.set("type", selectedType.value);
      }
      if (selectedStatus.value !== "all") {
        params.set("status", selectedStatus.value);
      }
      return Object.fromEntries(params.entries());
    });
    const {
      data: transactions,
      error,
      refresh
    } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/admin/transactions", { query }, "$2BQp_HNj4o")), __temp = await __temp, __restore(), __temp);
    const allLoaded = computed(() => {
      return transactions.value ? transactions.value.length < limit.value : false;
    });
    const headers = [
      "#",
      "Status",
      "User",
      "Account Name",
      "Type",
      "Amount (USD)",
      "Currency",
      "Amount (CUR)",
      "Rate (USD)",
      "Charges (USD)",
      "Date"
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MyPage = __nuxt_component_0;
      const _component_NuxtSelect = _sfc_main$1;
      const _component_VTable = __nuxt_component_5;
      const _component_VTableHeader = __nuxt_component_6;
      const _component_VTableRow = __nuxt_component_7;
      const _component_VTableHead = __nuxt_component_8;
      const _component_VTableBody = __nuxt_component_9;
      const _component_VTableCell = __nuxt_component_10;
      const _component_NuxtBadge = _sfc_main$2;
      const _component_NuxtSimplePaginator = __nuxt_component_12;
      _push(ssrRenderComponent(_component_MyPage, mergeProps({
        error: unref(error),
        onRefresh: () => unref(refresh)()
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}><div class="flex items-center justify-between gap-2 flex-wrap"${_scopeId}><h1 class="text-3xl font-semibold"${_scopeId}>Transactions</h1><div class="flex w-full md:w-fit items-end justify-end md:justify-normal gap-2"${_scopeId}><div class="flex flex-col md:items-end gap-1"${_scopeId}><p class="text-xs font-semibold"${_scopeId}>Type</p>`);
            _push2(ssrRenderComponent(_component_NuxtSelect, {
              modelValue: unref(selectedType),
              "onUpdate:modelValue": ($event) => isRef(selectedType) ? selectedType.value = $event : null,
              items: types,
              size: "sm",
              class: "w-28"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-col md:items-end gap-1"${_scopeId}><p class="text-xs font-semibold"${_scopeId}>Status</p>`);
            _push2(ssrRenderComponent(_component_NuxtSelect, {
              modelValue: unref(selectedStatus),
              "onUpdate:modelValue": ($event) => isRef(selectedStatus) ? selectedStatus.value = $event : null,
              items: statuses,
              size: "sm",
              class: "w-28"
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div>`);
            if (unref(transactions)) {
              _push2(`<section${_scopeId}>`);
              _push2(ssrRenderComponent(_component_VTable, null, {
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
                          ssrRenderList(unref(transactions), (txn, i) => {
                            _push4(ssrRenderComponent(_component_VTableRow, {
                              key: txn.id
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
                                        _push6(ssrRenderComponent(_component_NuxtBadge, {
                                          label: txn.status,
                                          color: ("getTxnStatusBadgeColor" in _ctx ? _ctx.getTxnStatusBadgeColor : unref(getTxnStatusBadgeColor))(txn.status),
                                          variant: "subtle",
                                          size: "sm"
                                        }, null, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          createVNode(_component_NuxtBadge, {
                                            label: txn.status,
                                            color: ("getTxnStatusBadgeColor" in _ctx ? _ctx.getTxnStatusBadgeColor : unref(getTxnStatusBadgeColor))(txn.status),
                                            variant: "subtle",
                                            size: "sm"
                                          }, null, 8, ["label", "color"])
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(_component_VTableCell, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(txn.initiator)}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(txn.initiator), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(_component_VTableCell, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(txn.financialAccountName)}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(txn.financialAccountName), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(_component_VTableCell, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent(_component_NuxtBadge, {
                                          label: txn.type,
                                          color: ("getTxnTypeBadgeColor" in _ctx ? _ctx.getTxnTypeBadgeColor : unref(getTxnTypeBadgeColor))(txn.type),
                                          variant: "subtle",
                                          size: "sm"
                                        }, null, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          createVNode(_component_NuxtBadge, {
                                            label: txn.type,
                                            color: ("getTxnTypeBadgeColor" in _ctx ? _ctx.getTxnTypeBadgeColor : unref(getTxnTypeBadgeColor))(txn.type),
                                            variant: "subtle",
                                            size: "sm"
                                          }, null, 8, ["label", "color"])
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(_component_VTableCell, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(txn.USDAmount)}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(txn.USDAmount), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(_component_VTableCell, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(txn.currency)}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(txn.currency), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(_component_VTableCell, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(txn.amount)}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(txn.amount), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(_component_VTableCell, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(txn.rate)}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(txn.rate), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(_component_VTableCell, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(txn.charges)}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(txn.charges), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(_component_VTableCell, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(unref(useDateFormat)(txn.createdAt, "YYYY-MMM-DD hh:mm aa"))}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(unref(useDateFormat)(txn.createdAt, "YYYY-MMM-DD hh:mm aa")), 1)
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
                                        createVNode(_component_NuxtBadge, {
                                          label: txn.status,
                                          color: ("getTxnStatusBadgeColor" in _ctx ? _ctx.getTxnStatusBadgeColor : unref(getTxnStatusBadgeColor))(txn.status),
                                          variant: "subtle",
                                          size: "sm"
                                        }, null, 8, ["label", "color"])
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_VTableCell, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(txn.initiator), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_VTableCell, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(txn.financialAccountName), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_VTableCell, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_NuxtBadge, {
                                          label: txn.type,
                                          color: ("getTxnTypeBadgeColor" in _ctx ? _ctx.getTxnTypeBadgeColor : unref(getTxnTypeBadgeColor))(txn.type),
                                          variant: "subtle",
                                          size: "sm"
                                        }, null, 8, ["label", "color"])
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_VTableCell, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(txn.USDAmount), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_VTableCell, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(txn.currency), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_VTableCell, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(txn.amount), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_VTableCell, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(txn.rate), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_VTableCell, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(txn.charges), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_VTableCell, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(unref(useDateFormat)(txn.createdAt, "YYYY-MMM-DD hh:mm aa")), 1)
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
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(transactions), (txn, i) => {
                              return openBlock(), createBlock(_component_VTableRow, {
                                key: txn.id
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
                                      createVNode(_component_NuxtBadge, {
                                        label: txn.status,
                                        color: ("getTxnStatusBadgeColor" in _ctx ? _ctx.getTxnStatusBadgeColor : unref(getTxnStatusBadgeColor))(txn.status),
                                        variant: "subtle",
                                        size: "sm"
                                      }, null, 8, ["label", "color"])
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_VTableCell, null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(txn.initiator), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_VTableCell, null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(txn.financialAccountName), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_VTableCell, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_NuxtBadge, {
                                        label: txn.type,
                                        color: ("getTxnTypeBadgeColor" in _ctx ? _ctx.getTxnTypeBadgeColor : unref(getTxnTypeBadgeColor))(txn.type),
                                        variant: "subtle",
                                        size: "sm"
                                      }, null, 8, ["label", "color"])
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_VTableCell, null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(txn.USDAmount), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_VTableCell, null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(txn.currency), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_VTableCell, null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(txn.amount), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_VTableCell, null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(txn.rate), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_VTableCell, null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(txn.charges), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_VTableCell, null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(unref(useDateFormat)(txn.createdAt, "YYYY-MMM-DD hh:mm aa")), 1)
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1024);
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
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(transactions), (txn, i) => {
                            return openBlock(), createBlock(_component_VTableRow, {
                              key: txn.id
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
                                    createVNode(_component_NuxtBadge, {
                                      label: txn.status,
                                      color: ("getTxnStatusBadgeColor" in _ctx ? _ctx.getTxnStatusBadgeColor : unref(getTxnStatusBadgeColor))(txn.status),
                                      variant: "subtle",
                                      size: "sm"
                                    }, null, 8, ["label", "color"])
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(txn.initiator), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(txn.financialAccountName), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_NuxtBadge, {
                                      label: txn.type,
                                      color: ("getTxnTypeBadgeColor" in _ctx ? _ctx.getTxnTypeBadgeColor : unref(getTxnTypeBadgeColor))(txn.type),
                                      variant: "subtle",
                                      size: "sm"
                                    }, null, 8, ["label", "color"])
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(txn.USDAmount), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(txn.currency), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(txn.amount), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(txn.rate), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(txn.charges), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(unref(useDateFormat)(txn.createdAt, "YYYY-MMM-DD hh:mm aa")), 1)
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1024);
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
                  createVNode("h1", { class: "text-3xl font-semibold" }, "Transactions"),
                  createVNode("div", { class: "flex w-full md:w-fit items-end justify-end md:justify-normal gap-2" }, [
                    createVNode("div", { class: "flex flex-col md:items-end gap-1" }, [
                      createVNode("p", { class: "text-xs font-semibold" }, "Type"),
                      createVNode(_component_NuxtSelect, {
                        modelValue: unref(selectedType),
                        "onUpdate:modelValue": ($event) => isRef(selectedType) ? selectedType.value = $event : null,
                        items: types,
                        size: "sm",
                        class: "w-28"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "flex flex-col md:items-end gap-1" }, [
                      createVNode("p", { class: "text-xs font-semibold" }, "Status"),
                      createVNode(_component_NuxtSelect, {
                        modelValue: unref(selectedStatus),
                        "onUpdate:modelValue": ($event) => isRef(selectedStatus) ? selectedStatus.value = $event : null,
                        items: statuses,
                        size: "sm",
                        class: "w-28"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ])
                  ])
                ]),
                unref(transactions) ? (openBlock(), createBlock("section", { key: 0 }, [
                  createVNode(_component_VTable, null, {
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
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(transactions), (txn, i) => {
                            return openBlock(), createBlock(_component_VTableRow, {
                              key: txn.id
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
                                    createVNode(_component_NuxtBadge, {
                                      label: txn.status,
                                      color: ("getTxnStatusBadgeColor" in _ctx ? _ctx.getTxnStatusBadgeColor : unref(getTxnStatusBadgeColor))(txn.status),
                                      variant: "subtle",
                                      size: "sm"
                                    }, null, 8, ["label", "color"])
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(txn.initiator), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(txn.financialAccountName), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_NuxtBadge, {
                                      label: txn.type,
                                      color: ("getTxnTypeBadgeColor" in _ctx ? _ctx.getTxnTypeBadgeColor : unref(getTxnTypeBadgeColor))(txn.type),
                                      variant: "subtle",
                                      size: "sm"
                                    }, null, 8, ["label", "color"])
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(txn.USDAmount), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(txn.currency), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(txn.amount), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(txn.rate), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(txn.charges), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(unref(useDateFormat)(txn.createdAt, "YYYY-MMM-DD hh:mm aa")), 1)
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1024);
                          }), 128))
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/transactions.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=transactions-BY9STeNJ.mjs.map
