import { _ as __nuxt_component_0 } from './my-page-Cu0txfPp.mjs';
import { _ as _sfc_main$2 } from './Select-BLUNCmBz.mjs';
import { c as _sfc_main$a, g as useToast, h as _sfc_main$4$1 } from './server.mjs';
import { _ as _sfc_main$3 } from './Badge-DE6iRalv.mjs';
import { _ as _sfc_main$6 } from './FormField-CZNrbocD.mjs';
import { _ as _sfc_main$7 } from './Textarea-De01UuLM.mjs';
import { t as toDollar } from './to-dollar-DdS_9tlH.mjs';
import { defineComponent, ref, computed, withAsyncContext, mergeProps, unref, withCtx, isRef, createTextVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, createVNode, createCommentVNode, mergeModels, useModel, watch, withDirectives, vShow, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderStyle } from 'vue/server-renderer';
import { a5 as normalizeException } from '../nitro/nitro.mjs';
import { _ as __nuxt_component_5, a as __nuxt_component_6, b as __nuxt_component_7, c as __nuxt_component_8, d as __nuxt_component_9, e as __nuxt_component_1 } from './v-table-cell-BRZ0KuYt.mjs';
import { _ as _sfc_main$4 } from './Popover-uBQI4sYf.mjs';
import { _ as _sfc_main$5 } from './Separator-BYgM1HCW.mjs';
import { _ as _sfc_main$8 } from './Input-CVv-L3LC.mjs';
import { _ as __nuxt_component_11 } from './simple-paginator-BuVvJljo.mjs';
import { useDateFormat } from '@vueuse/core';
import { u as useFetch } from './fetch-CGkSb6cH.mjs';
import './fetch-error-alert-NIQ5BlkS.mjs';
import './Alert-CKjxjhE_.mjs';
import 'reka-ui';
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
import './_plugin-vue_export-helper-1tPrXgE0.mjs';
import 'reka-ui/namespaced';
import '@vue/shared';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "transaction-manager",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    transaction: {}
  }, {
    "open": { type: Boolean, ...{ default: false } },
    "openModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["done"], ["update:open"]),
  setup(__props, { emit: __emit }) {
    const toast = useToast();
    const emit = __emit;
    const open = useModel(__props, "open");
    const txn = ref({ ...__props.transaction });
    watch(
      () => __props.transaction,
      (newValue) => txn.value = { ...newValue }
    );
    const statuses = ["pending", "successfull", "failed"];
    const updateTransaction = async () => {
      const initialStatus = __props.transaction.status;
      const currentStatus = txn.value.status;
      if (initialStatus === "pending" && currentStatus === "pending") {
        return;
      }
      if (currentStatus === "failed" && !txn.value.failReason) {
        toast.add({
          title: "Error",
          description: "Reason for failure is required",
          color: "error"
        });
        return;
      }
      if (initialStatus === "successfull" || initialStatus === "failed") {
        toast.add({
          title: "Error",
          description: `Transaction cannot be updated because it is already marked as ${initialStatus}`,
          color: "error"
        });
        return;
      }
      if (currentStatus === "failed") {
        txn.value.failReason = txn.value.failReason.trim();
        txn.value.failedAt = (/* @__PURE__ */ new Date()).toISOString();
        txn.value.approvedAt = null;
      }
      if (currentStatus === "successfull") {
        txn.value.failReason = null;
        txn.value.failedAt = null;
        txn.value.approvedAt = (/* @__PURE__ */ new Date()).toISOString();
      }
      try {
        const res = await $fetch(`/api/admin/transactions/${__props.transaction.id}`, {
          method: "PUT",
          body: txn.value
        });
        emit("done");
        toast.add({
          title: "Success",
          description: res.message,
          color: "success"
        });
        open.value = false;
        txn.value = { ...__props.transaction };
      } catch (error) {
        toast.add({
          title: "Error",
          description: normalizeException(error).message,
          color: "error"
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtModal = _sfc_main$4$1;
      const _component_NuxtBadge = _sfc_main$3;
      const _component_NuxtFormField = _sfc_main$6;
      const _component_NuxtSelect = _sfc_main$2;
      const _component_NuxtTextarea = _sfc_main$7;
      const _component_NuxtButton = _sfc_main$a;
      _push(ssrRenderComponent(_component_NuxtModal, mergeProps({
        open: open.value,
        "onUpdate:open": ($event) => open.value = $event,
        title: `Manage ${__props.transaction.type} transaction`
      }, _attrs), {
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.transaction.type === "deposit" || __props.transaction.type === "withdrawal") {
              _push2(`<div${_scopeId}><div class="space-y-3"${_scopeId}><p class="text-center text-2xl font-semibold font-mono"${_scopeId}>${ssrInterpolate(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(__props.transaction.USDAmount))}</p><div class="flex-center"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_NuxtBadge, {
                label: `Current status: ${__props.transaction.status}`,
                color: "neutral",
                variant: "subtle"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
              _push2(ssrRenderComponent(_component_NuxtFormField, { label: "Update Transaction Status" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_NuxtSelect, {
                      modelValue: unref(txn).status,
                      "onUpdate:modelValue": ($event) => unref(txn).status = $event,
                      items: statuses,
                      class: "w-full"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_NuxtSelect, {
                        modelValue: unref(txn).status,
                        "onUpdate:modelValue": ($event) => unref(txn).status = $event,
                        items: statuses,
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_NuxtFormField, {
                style: unref(txn).status === "failed" ? null : { display: "none" },
                label: "Reason for Failure"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_NuxtTextarea, {
                      modelValue: unref(txn).failReason,
                      "onUpdate:modelValue": ($event) => unref(txn).failReason = $event,
                      autoresize: "",
                      "max-rows": 2,
                      class: "w-full resize-none"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_NuxtTextarea, {
                        modelValue: unref(txn).failReason,
                        "onUpdate:modelValue": ($event) => unref(txn).failReason = $event,
                        autoresize: "",
                        "max-rows": 2,
                        class: "w-full resize-none"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<div style="${ssrRenderStyle(__props.transaction.status === "pending" && unref(txn).status !== "pending" ? null : { display: "none" })}"${_scopeId}><p class="text-sm text-error-500"${_scopeId}> You are about to update the transaction status to ${ssrInterpolate(unref(txn).status)}. This cannot be undone. </p></div><div class="flex justify-end"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_NuxtButton, {
                label: "Submit",
                "loading-auto": "",
                onClick: updateTransaction
              }, null, _parent2, _scopeId));
              _push2(`</div></div></div>`);
            } else {
              _push2(`<div${_scopeId}><p class="text-center font-semibold text-muted"${_scopeId}> Transaction status cannot be updated </p></div>`);
            }
          } else {
            return [
              __props.transaction.type === "deposit" || __props.transaction.type === "withdrawal" ? (openBlock(), createBlock("div", { key: 0 }, [
                createVNode("div", { class: "space-y-3" }, [
                  createVNode("p", { class: "text-center text-2xl font-semibold font-mono" }, toDisplayString(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(__props.transaction.USDAmount)), 1),
                  createVNode("div", { class: "flex-center" }, [
                    createVNode(_component_NuxtBadge, {
                      label: `Current status: ${__props.transaction.status}`,
                      color: "neutral",
                      variant: "subtle"
                    }, null, 8, ["label"])
                  ]),
                  createVNode(_component_NuxtFormField, { label: "Update Transaction Status" }, {
                    default: withCtx(() => [
                      createVNode(_component_NuxtSelect, {
                        modelValue: unref(txn).status,
                        "onUpdate:modelValue": ($event) => unref(txn).status = $event,
                        items: statuses,
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  withDirectives(createVNode(_component_NuxtFormField, { label: "Reason for Failure" }, {
                    default: withCtx(() => [
                      createVNode(_component_NuxtTextarea, {
                        modelValue: unref(txn).failReason,
                        "onUpdate:modelValue": ($event) => unref(txn).failReason = $event,
                        autoresize: "",
                        "max-rows": 2,
                        class: "w-full resize-none"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }, 512), [
                    [vShow, unref(txn).status === "failed"]
                  ]),
                  withDirectives(createVNode("div", null, [
                    createVNode("p", { class: "text-sm text-error-500" }, " You are about to update the transaction status to " + toDisplayString(unref(txn).status) + ". This cannot be undone. ", 1)
                  ], 512), [
                    [
                      vShow,
                      __props.transaction.status === "pending" && unref(txn).status !== "pending"
                    ]
                  ]),
                  createVNode("div", { class: "flex justify-end" }, [
                    createVNode(_component_NuxtButton, {
                      label: "Submit",
                      "loading-auto": "",
                      onClick: updateTransaction
                    })
                  ])
                ])
              ])) : (openBlock(), createBlock("div", { key: 1 }, [
                createVNode("p", { class: "text-center font-semibold text-muted" }, " Transaction status cannot be updated ")
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/transaction-manager.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main$1, { __name: "AdminTransactionManager" });
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
      //"transfer",
      "investment",
      "profit"
    ];
    const statuses = [
      "all",
      "pending",
      "successfull",
      "failed"
      /* "reversed" */
    ];
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
      status,
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
      "Date",
      "Actions"
    ];
    const open = ref(false);
    const selected = ref(null);
    const handleItemSelect = (txn) => {
      selected.value = txn;
      open.value = true;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MyPage = __nuxt_component_0;
      const _component_NuxtSelect = _sfc_main$2;
      const _component_AdminTransactionManager = __nuxt_component_2;
      const _component_VTable = __nuxt_component_5;
      const _component_VTableHeader = __nuxt_component_6;
      const _component_VTableRow = __nuxt_component_7;
      const _component_VTableHead = __nuxt_component_8;
      const _component_VTableBody = __nuxt_component_9;
      const _component_VTableCell = __nuxt_component_1;
      const _component_NuxtBadge = _sfc_main$3;
      const _component_NuxtPopover = _sfc_main$4;
      const _component_NuxtButton = _sfc_main$a;
      const _component_NuxtSeparator = _sfc_main$5;
      const _component_NuxtFormField = _sfc_main$6;
      const _component_NuxtTextarea = _sfc_main$7;
      const _component_NuxtInput = _sfc_main$8;
      const _component_NuxtSimplePaginator = __nuxt_component_11;
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
              if (unref(selected)) {
                _push2(`<div${_scopeId}>`);
                _push2(ssrRenderComponent(_component_AdminTransactionManager, {
                  open: unref(open),
                  "onUpdate:open": ($event) => isRef(open) ? open.value = $event : null,
                  transaction: unref(selected),
                  onDone: () => unref(refresh)()
                }, null, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(ssrRenderComponent(_component_VTable, {
                loading: unref(status) === "pending"
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
                                  _push5(ssrRenderComponent(_component_VTableCell, { class: "flex items-center gap-2" }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent(_component_NuxtPopover, { ui: { content: "max-h-96 overflow-y-auto" } }, {
                                          content: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`<div${_scopeId6}><header class="p-5 w-72"${_scopeId6}><h2 class="font-semibold"${_scopeId6}>More</h2></header>`);
                                              _push7(ssrRenderComponent(_component_NuxtSeparator, null, null, _parent7, _scopeId6));
                                              _push7(`<div class="p-5 space-y-2.5"${_scopeId6}>`);
                                              if (txn.description) {
                                                _push7(ssrRenderComponent(_component_NuxtFormField, { label: "Description" }, {
                                                  default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                    if (_push8) {
                                                      _push8(ssrRenderComponent(_component_NuxtTextarea, {
                                                        value: txn.description,
                                                        rows: 3,
                                                        disabled: "",
                                                        class: "resize-none w-full"
                                                      }, null, _parent8, _scopeId7));
                                                    } else {
                                                      return [
                                                        createVNode(_component_NuxtTextarea, {
                                                          value: txn.description,
                                                          rows: 3,
                                                          disabled: "",
                                                          class: "resize-none w-full"
                                                        }, null, 8, ["value"])
                                                      ];
                                                    }
                                                  }),
                                                  _: 2
                                                }, _parent7, _scopeId6));
                                              } else {
                                                _push7(`<!---->`);
                                              }
                                              if (txn.depositWalletAddress) {
                                                _push7(ssrRenderComponent(_component_NuxtFormField, { label: "Deposit Wallet Address" }, {
                                                  default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                    if (_push8) {
                                                      _push8(ssrRenderComponent(_component_NuxtInput, {
                                                        value: txn.depositWalletAddress,
                                                        disabled: "",
                                                        class: "w-full"
                                                      }, null, _parent8, _scopeId7));
                                                    } else {
                                                      return [
                                                        createVNode(_component_NuxtInput, {
                                                          value: txn.depositWalletAddress,
                                                          disabled: "",
                                                          class: "w-full"
                                                        }, null, 8, ["value"])
                                                      ];
                                                    }
                                                  }),
                                                  _: 2
                                                }, _parent7, _scopeId6));
                                              } else {
                                                _push7(`<!---->`);
                                              }
                                              if (txn.depositWalletAddressNetwork) {
                                                _push7(ssrRenderComponent(_component_NuxtFormField, { label: "Deposit Wallet Address Network" }, {
                                                  default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                    if (_push8) {
                                                      _push8(ssrRenderComponent(_component_NuxtInput, {
                                                        value: txn.depositWalletAddressNetwork,
                                                        disabled: "",
                                                        class: "w-full"
                                                      }, null, _parent8, _scopeId7));
                                                    } else {
                                                      return [
                                                        createVNode(_component_NuxtInput, {
                                                          value: txn.depositWalletAddressNetwork,
                                                          disabled: "",
                                                          class: "w-full"
                                                        }, null, 8, ["value"])
                                                      ];
                                                    }
                                                  }),
                                                  _: 2
                                                }, _parent7, _scopeId6));
                                              } else {
                                                _push7(`<!---->`);
                                              }
                                              if (txn.withdrawalWalletAddress) {
                                                _push7(ssrRenderComponent(_component_NuxtFormField, { label: "Withdrawal Wallet Address" }, {
                                                  default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                    if (_push8) {
                                                      _push8(ssrRenderComponent(_component_NuxtInput, {
                                                        value: txn.withdrawalWalletAddress,
                                                        disabled: "",
                                                        class: "w-full"
                                                      }, null, _parent8, _scopeId7));
                                                    } else {
                                                      return [
                                                        createVNode(_component_NuxtInput, {
                                                          value: txn.withdrawalWalletAddress,
                                                          disabled: "",
                                                          class: "w-full"
                                                        }, null, 8, ["value"])
                                                      ];
                                                    }
                                                  }),
                                                  _: 2
                                                }, _parent7, _scopeId6));
                                              } else {
                                                _push7(`<!---->`);
                                              }
                                              if (txn.withdrawalWalletAddressNetwork) {
                                                _push7(ssrRenderComponent(_component_NuxtFormField, { label: "Withdrawal Wallet Address Network" }, {
                                                  default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                    if (_push8) {
                                                      _push8(ssrRenderComponent(_component_NuxtInput, {
                                                        value: txn.withdrawalWalletAddressNetwork,
                                                        disabled: "",
                                                        class: "w-full"
                                                      }, null, _parent8, _scopeId7));
                                                    } else {
                                                      return [
                                                        createVNode(_component_NuxtInput, {
                                                          value: txn.withdrawalWalletAddressNetwork,
                                                          disabled: "",
                                                          class: "w-full"
                                                        }, null, 8, ["value"])
                                                      ];
                                                    }
                                                  }),
                                                  _: 2
                                                }, _parent7, _scopeId6));
                                              } else {
                                                _push7(`<!---->`);
                                              }
                                              if (txn.bank) {
                                                _push7(ssrRenderComponent(_component_NuxtFormField, { label: "Bank Name" }, {
                                                  default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                    if (_push8) {
                                                      _push8(ssrRenderComponent(_component_NuxtInput, {
                                                        value: txn.bank,
                                                        disabled: "",
                                                        class: "w-full"
                                                      }, null, _parent8, _scopeId7));
                                                    } else {
                                                      return [
                                                        createVNode(_component_NuxtInput, {
                                                          value: txn.bank,
                                                          disabled: "",
                                                          class: "w-full"
                                                        }, null, 8, ["value"])
                                                      ];
                                                    }
                                                  }),
                                                  _: 2
                                                }, _parent7, _scopeId6));
                                              } else {
                                                _push7(`<!---->`);
                                              }
                                              if (txn.bankAccount) {
                                                _push7(ssrRenderComponent(_component_NuxtFormField, { label: "Bank Account Number" }, {
                                                  default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                    if (_push8) {
                                                      _push8(ssrRenderComponent(_component_NuxtInput, {
                                                        value: txn.bankAccount,
                                                        disabled: "",
                                                        class: "w-full"
                                                      }, null, _parent8, _scopeId7));
                                                    } else {
                                                      return [
                                                        createVNode(_component_NuxtInput, {
                                                          value: txn.bankAccount,
                                                          disabled: "",
                                                          class: "w-full"
                                                        }, null, 8, ["value"])
                                                      ];
                                                    }
                                                  }),
                                                  _: 2
                                                }, _parent7, _scopeId6));
                                              } else {
                                                _push7(`<!---->`);
                                              }
                                              if (txn.approvedAt) {
                                                _push7(ssrRenderComponent(_component_NuxtFormField, { label: "Approved At" }, {
                                                  default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                    if (_push8) {
                                                      _push8(ssrRenderComponent(_component_NuxtInput, {
                                                        value: unref(useDateFormat)(
                                                          txn.approvedAt,
                                                          "YYYY-MMM-DD hh:mm aa"
                                                        ).value,
                                                        disabled: "",
                                                        class: "w-full"
                                                      }, null, _parent8, _scopeId7));
                                                    } else {
                                                      return [
                                                        createVNode(_component_NuxtInput, {
                                                          value: unref(useDateFormat)(
                                                            txn.approvedAt,
                                                            "YYYY-MMM-DD hh:mm aa"
                                                          ).value,
                                                          disabled: "",
                                                          class: "w-full"
                                                        }, null, 8, ["value"])
                                                      ];
                                                    }
                                                  }),
                                                  _: 2
                                                }, _parent7, _scopeId6));
                                              } else {
                                                _push7(`<!---->`);
                                              }
                                              if (txn.failedAt) {
                                                _push7(ssrRenderComponent(_component_NuxtFormField, { label: "Failed At" }, {
                                                  default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                    if (_push8) {
                                                      _push8(ssrRenderComponent(_component_NuxtInput, {
                                                        value: unref(useDateFormat)(
                                                          txn.failedAt,
                                                          "YYYY-MMM-DD hh:mm aa"
                                                        ).value,
                                                        disabled: "",
                                                        class: "w-full"
                                                      }, null, _parent8, _scopeId7));
                                                    } else {
                                                      return [
                                                        createVNode(_component_NuxtInput, {
                                                          value: unref(useDateFormat)(
                                                            txn.failedAt,
                                                            "YYYY-MMM-DD hh:mm aa"
                                                          ).value,
                                                          disabled: "",
                                                          class: "w-full"
                                                        }, null, 8, ["value"])
                                                      ];
                                                    }
                                                  }),
                                                  _: 2
                                                }, _parent7, _scopeId6));
                                              } else {
                                                _push7(`<!---->`);
                                              }
                                              if (txn.failReason) {
                                                _push7(ssrRenderComponent(_component_NuxtFormField, { label: "Reason for failure" }, {
                                                  default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                    if (_push8) {
                                                      _push8(ssrRenderComponent(_component_NuxtTextarea, {
                                                        value: txn.failReason,
                                                        rows: 3,
                                                        disabled: "",
                                                        class: "resize-none w-full"
                                                      }, null, _parent8, _scopeId7));
                                                    } else {
                                                      return [
                                                        createVNode(_component_NuxtTextarea, {
                                                          value: txn.failReason,
                                                          rows: 3,
                                                          disabled: "",
                                                          class: "resize-none w-full"
                                                        }, null, 8, ["value"])
                                                      ];
                                                    }
                                                  }),
                                                  _: 2
                                                }, _parent7, _scopeId6));
                                              } else {
                                                _push7(`<!---->`);
                                              }
                                              _push7(`</div></div>`);
                                            } else {
                                              return [
                                                createVNode("div", null, [
                                                  createVNode("header", { class: "p-5 w-72" }, [
                                                    createVNode("h2", { class: "font-semibold" }, "More")
                                                  ]),
                                                  createVNode(_component_NuxtSeparator),
                                                  createVNode("div", { class: "p-5 space-y-2.5" }, [
                                                    txn.description ? (openBlock(), createBlock(_component_NuxtFormField, {
                                                      key: 0,
                                                      label: "Description"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode(_component_NuxtTextarea, {
                                                          value: txn.description,
                                                          rows: 3,
                                                          disabled: "",
                                                          class: "resize-none w-full"
                                                        }, null, 8, ["value"])
                                                      ]),
                                                      _: 2
                                                    }, 1024)) : createCommentVNode("", true),
                                                    txn.depositWalletAddress ? (openBlock(), createBlock(_component_NuxtFormField, {
                                                      key: 1,
                                                      label: "Deposit Wallet Address"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode(_component_NuxtInput, {
                                                          value: txn.depositWalletAddress,
                                                          disabled: "",
                                                          class: "w-full"
                                                        }, null, 8, ["value"])
                                                      ]),
                                                      _: 2
                                                    }, 1024)) : createCommentVNode("", true),
                                                    txn.depositWalletAddressNetwork ? (openBlock(), createBlock(_component_NuxtFormField, {
                                                      key: 2,
                                                      label: "Deposit Wallet Address Network"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode(_component_NuxtInput, {
                                                          value: txn.depositWalletAddressNetwork,
                                                          disabled: "",
                                                          class: "w-full"
                                                        }, null, 8, ["value"])
                                                      ]),
                                                      _: 2
                                                    }, 1024)) : createCommentVNode("", true),
                                                    txn.withdrawalWalletAddress ? (openBlock(), createBlock(_component_NuxtFormField, {
                                                      key: 3,
                                                      label: "Withdrawal Wallet Address"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode(_component_NuxtInput, {
                                                          value: txn.withdrawalWalletAddress,
                                                          disabled: "",
                                                          class: "w-full"
                                                        }, null, 8, ["value"])
                                                      ]),
                                                      _: 2
                                                    }, 1024)) : createCommentVNode("", true),
                                                    txn.withdrawalWalletAddressNetwork ? (openBlock(), createBlock(_component_NuxtFormField, {
                                                      key: 4,
                                                      label: "Withdrawal Wallet Address Network"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode(_component_NuxtInput, {
                                                          value: txn.withdrawalWalletAddressNetwork,
                                                          disabled: "",
                                                          class: "w-full"
                                                        }, null, 8, ["value"])
                                                      ]),
                                                      _: 2
                                                    }, 1024)) : createCommentVNode("", true),
                                                    txn.bank ? (openBlock(), createBlock(_component_NuxtFormField, {
                                                      key: 5,
                                                      label: "Bank Name"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode(_component_NuxtInput, {
                                                          value: txn.bank,
                                                          disabled: "",
                                                          class: "w-full"
                                                        }, null, 8, ["value"])
                                                      ]),
                                                      _: 2
                                                    }, 1024)) : createCommentVNode("", true),
                                                    txn.bankAccount ? (openBlock(), createBlock(_component_NuxtFormField, {
                                                      key: 6,
                                                      label: "Bank Account Number"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode(_component_NuxtInput, {
                                                          value: txn.bankAccount,
                                                          disabled: "",
                                                          class: "w-full"
                                                        }, null, 8, ["value"])
                                                      ]),
                                                      _: 2
                                                    }, 1024)) : createCommentVNode("", true),
                                                    txn.approvedAt ? (openBlock(), createBlock(_component_NuxtFormField, {
                                                      key: 7,
                                                      label: "Approved At"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode(_component_NuxtInput, {
                                                          value: unref(useDateFormat)(
                                                            txn.approvedAt,
                                                            "YYYY-MMM-DD hh:mm aa"
                                                          ).value,
                                                          disabled: "",
                                                          class: "w-full"
                                                        }, null, 8, ["value"])
                                                      ]),
                                                      _: 2
                                                    }, 1024)) : createCommentVNode("", true),
                                                    txn.failedAt ? (openBlock(), createBlock(_component_NuxtFormField, {
                                                      key: 8,
                                                      label: "Failed At"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode(_component_NuxtInput, {
                                                          value: unref(useDateFormat)(
                                                            txn.failedAt,
                                                            "YYYY-MMM-DD hh:mm aa"
                                                          ).value,
                                                          disabled: "",
                                                          class: "w-full"
                                                        }, null, 8, ["value"])
                                                      ]),
                                                      _: 2
                                                    }, 1024)) : createCommentVNode("", true),
                                                    txn.failReason ? (openBlock(), createBlock(_component_NuxtFormField, {
                                                      key: 9,
                                                      label: "Reason for failure"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode(_component_NuxtTextarea, {
                                                          value: txn.failReason,
                                                          rows: 3,
                                                          disabled: "",
                                                          class: "resize-none w-full"
                                                        }, null, 8, ["value"])
                                                      ]),
                                                      _: 2
                                                    }, 1024)) : createCommentVNode("", true)
                                                  ])
                                                ])
                                              ];
                                            }
                                          }),
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent(_component_NuxtButton, {
                                                label: "More",
                                                icon: "lucide:ellipsis-vertical",
                                                color: "neutral",
                                                variant: "outline",
                                                size: "sm"
                                              }, null, _parent7, _scopeId6));
                                            } else {
                                              return [
                                                createVNode(_component_NuxtButton, {
                                                  label: "More",
                                                  icon: "lucide:ellipsis-vertical",
                                                  color: "neutral",
                                                  variant: "outline",
                                                  size: "sm"
                                                })
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(_component_NuxtButton, {
                                          label: "Edit",
                                          icon: "lucide:file-edit",
                                          variant: "soft",
                                          size: "sm",
                                          onClick: ($event) => handleItemSelect(txn)
                                        }, null, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          createVNode(_component_NuxtPopover, { ui: { content: "max-h-96 overflow-y-auto" } }, {
                                            content: withCtx(() => [
                                              createVNode("div", null, [
                                                createVNode("header", { class: "p-5 w-72" }, [
                                                  createVNode("h2", { class: "font-semibold" }, "More")
                                                ]),
                                                createVNode(_component_NuxtSeparator),
                                                createVNode("div", { class: "p-5 space-y-2.5" }, [
                                                  txn.description ? (openBlock(), createBlock(_component_NuxtFormField, {
                                                    key: 0,
                                                    label: "Description"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(_component_NuxtTextarea, {
                                                        value: txn.description,
                                                        rows: 3,
                                                        disabled: "",
                                                        class: "resize-none w-full"
                                                      }, null, 8, ["value"])
                                                    ]),
                                                    _: 2
                                                  }, 1024)) : createCommentVNode("", true),
                                                  txn.depositWalletAddress ? (openBlock(), createBlock(_component_NuxtFormField, {
                                                    key: 1,
                                                    label: "Deposit Wallet Address"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(_component_NuxtInput, {
                                                        value: txn.depositWalletAddress,
                                                        disabled: "",
                                                        class: "w-full"
                                                      }, null, 8, ["value"])
                                                    ]),
                                                    _: 2
                                                  }, 1024)) : createCommentVNode("", true),
                                                  txn.depositWalletAddressNetwork ? (openBlock(), createBlock(_component_NuxtFormField, {
                                                    key: 2,
                                                    label: "Deposit Wallet Address Network"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(_component_NuxtInput, {
                                                        value: txn.depositWalletAddressNetwork,
                                                        disabled: "",
                                                        class: "w-full"
                                                      }, null, 8, ["value"])
                                                    ]),
                                                    _: 2
                                                  }, 1024)) : createCommentVNode("", true),
                                                  txn.withdrawalWalletAddress ? (openBlock(), createBlock(_component_NuxtFormField, {
                                                    key: 3,
                                                    label: "Withdrawal Wallet Address"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(_component_NuxtInput, {
                                                        value: txn.withdrawalWalletAddress,
                                                        disabled: "",
                                                        class: "w-full"
                                                      }, null, 8, ["value"])
                                                    ]),
                                                    _: 2
                                                  }, 1024)) : createCommentVNode("", true),
                                                  txn.withdrawalWalletAddressNetwork ? (openBlock(), createBlock(_component_NuxtFormField, {
                                                    key: 4,
                                                    label: "Withdrawal Wallet Address Network"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(_component_NuxtInput, {
                                                        value: txn.withdrawalWalletAddressNetwork,
                                                        disabled: "",
                                                        class: "w-full"
                                                      }, null, 8, ["value"])
                                                    ]),
                                                    _: 2
                                                  }, 1024)) : createCommentVNode("", true),
                                                  txn.bank ? (openBlock(), createBlock(_component_NuxtFormField, {
                                                    key: 5,
                                                    label: "Bank Name"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(_component_NuxtInput, {
                                                        value: txn.bank,
                                                        disabled: "",
                                                        class: "w-full"
                                                      }, null, 8, ["value"])
                                                    ]),
                                                    _: 2
                                                  }, 1024)) : createCommentVNode("", true),
                                                  txn.bankAccount ? (openBlock(), createBlock(_component_NuxtFormField, {
                                                    key: 6,
                                                    label: "Bank Account Number"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(_component_NuxtInput, {
                                                        value: txn.bankAccount,
                                                        disabled: "",
                                                        class: "w-full"
                                                      }, null, 8, ["value"])
                                                    ]),
                                                    _: 2
                                                  }, 1024)) : createCommentVNode("", true),
                                                  txn.approvedAt ? (openBlock(), createBlock(_component_NuxtFormField, {
                                                    key: 7,
                                                    label: "Approved At"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(_component_NuxtInput, {
                                                        value: unref(useDateFormat)(
                                                          txn.approvedAt,
                                                          "YYYY-MMM-DD hh:mm aa"
                                                        ).value,
                                                        disabled: "",
                                                        class: "w-full"
                                                      }, null, 8, ["value"])
                                                    ]),
                                                    _: 2
                                                  }, 1024)) : createCommentVNode("", true),
                                                  txn.failedAt ? (openBlock(), createBlock(_component_NuxtFormField, {
                                                    key: 8,
                                                    label: "Failed At"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(_component_NuxtInput, {
                                                        value: unref(useDateFormat)(
                                                          txn.failedAt,
                                                          "YYYY-MMM-DD hh:mm aa"
                                                        ).value,
                                                        disabled: "",
                                                        class: "w-full"
                                                      }, null, 8, ["value"])
                                                    ]),
                                                    _: 2
                                                  }, 1024)) : createCommentVNode("", true),
                                                  txn.failReason ? (openBlock(), createBlock(_component_NuxtFormField, {
                                                    key: 9,
                                                    label: "Reason for failure"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(_component_NuxtTextarea, {
                                                        value: txn.failReason,
                                                        rows: 3,
                                                        disabled: "",
                                                        class: "resize-none w-full"
                                                      }, null, 8, ["value"])
                                                    ]),
                                                    _: 2
                                                  }, 1024)) : createCommentVNode("", true)
                                                ])
                                              ])
                                            ]),
                                            default: withCtx(() => [
                                              createVNode(_component_NuxtButton, {
                                                label: "More",
                                                icon: "lucide:ellipsis-vertical",
                                                color: "neutral",
                                                variant: "outline",
                                                size: "sm"
                                              })
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_NuxtButton, {
                                            label: "Edit",
                                            icon: "lucide:file-edit",
                                            variant: "soft",
                                            size: "sm",
                                            onClick: ($event) => handleItemSelect(txn)
                                          }, null, 8, ["onClick"])
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
                                    }, 1024),
                                    createVNode(_component_VTableCell, { class: "flex items-center gap-2" }, {
                                      default: withCtx(() => [
                                        createVNode(_component_NuxtPopover, { ui: { content: "max-h-96 overflow-y-auto" } }, {
                                          content: withCtx(() => [
                                            createVNode("div", null, [
                                              createVNode("header", { class: "p-5 w-72" }, [
                                                createVNode("h2", { class: "font-semibold" }, "More")
                                              ]),
                                              createVNode(_component_NuxtSeparator),
                                              createVNode("div", { class: "p-5 space-y-2.5" }, [
                                                txn.description ? (openBlock(), createBlock(_component_NuxtFormField, {
                                                  key: 0,
                                                  label: "Description"
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(_component_NuxtTextarea, {
                                                      value: txn.description,
                                                      rows: 3,
                                                      disabled: "",
                                                      class: "resize-none w-full"
                                                    }, null, 8, ["value"])
                                                  ]),
                                                  _: 2
                                                }, 1024)) : createCommentVNode("", true),
                                                txn.depositWalletAddress ? (openBlock(), createBlock(_component_NuxtFormField, {
                                                  key: 1,
                                                  label: "Deposit Wallet Address"
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(_component_NuxtInput, {
                                                      value: txn.depositWalletAddress,
                                                      disabled: "",
                                                      class: "w-full"
                                                    }, null, 8, ["value"])
                                                  ]),
                                                  _: 2
                                                }, 1024)) : createCommentVNode("", true),
                                                txn.depositWalletAddressNetwork ? (openBlock(), createBlock(_component_NuxtFormField, {
                                                  key: 2,
                                                  label: "Deposit Wallet Address Network"
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(_component_NuxtInput, {
                                                      value: txn.depositWalletAddressNetwork,
                                                      disabled: "",
                                                      class: "w-full"
                                                    }, null, 8, ["value"])
                                                  ]),
                                                  _: 2
                                                }, 1024)) : createCommentVNode("", true),
                                                txn.withdrawalWalletAddress ? (openBlock(), createBlock(_component_NuxtFormField, {
                                                  key: 3,
                                                  label: "Withdrawal Wallet Address"
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(_component_NuxtInput, {
                                                      value: txn.withdrawalWalletAddress,
                                                      disabled: "",
                                                      class: "w-full"
                                                    }, null, 8, ["value"])
                                                  ]),
                                                  _: 2
                                                }, 1024)) : createCommentVNode("", true),
                                                txn.withdrawalWalletAddressNetwork ? (openBlock(), createBlock(_component_NuxtFormField, {
                                                  key: 4,
                                                  label: "Withdrawal Wallet Address Network"
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(_component_NuxtInput, {
                                                      value: txn.withdrawalWalletAddressNetwork,
                                                      disabled: "",
                                                      class: "w-full"
                                                    }, null, 8, ["value"])
                                                  ]),
                                                  _: 2
                                                }, 1024)) : createCommentVNode("", true),
                                                txn.bank ? (openBlock(), createBlock(_component_NuxtFormField, {
                                                  key: 5,
                                                  label: "Bank Name"
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(_component_NuxtInput, {
                                                      value: txn.bank,
                                                      disabled: "",
                                                      class: "w-full"
                                                    }, null, 8, ["value"])
                                                  ]),
                                                  _: 2
                                                }, 1024)) : createCommentVNode("", true),
                                                txn.bankAccount ? (openBlock(), createBlock(_component_NuxtFormField, {
                                                  key: 6,
                                                  label: "Bank Account Number"
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(_component_NuxtInput, {
                                                      value: txn.bankAccount,
                                                      disabled: "",
                                                      class: "w-full"
                                                    }, null, 8, ["value"])
                                                  ]),
                                                  _: 2
                                                }, 1024)) : createCommentVNode("", true),
                                                txn.approvedAt ? (openBlock(), createBlock(_component_NuxtFormField, {
                                                  key: 7,
                                                  label: "Approved At"
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(_component_NuxtInput, {
                                                      value: unref(useDateFormat)(
                                                        txn.approvedAt,
                                                        "YYYY-MMM-DD hh:mm aa"
                                                      ).value,
                                                      disabled: "",
                                                      class: "w-full"
                                                    }, null, 8, ["value"])
                                                  ]),
                                                  _: 2
                                                }, 1024)) : createCommentVNode("", true),
                                                txn.failedAt ? (openBlock(), createBlock(_component_NuxtFormField, {
                                                  key: 8,
                                                  label: "Failed At"
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(_component_NuxtInput, {
                                                      value: unref(useDateFormat)(
                                                        txn.failedAt,
                                                        "YYYY-MMM-DD hh:mm aa"
                                                      ).value,
                                                      disabled: "",
                                                      class: "w-full"
                                                    }, null, 8, ["value"])
                                                  ]),
                                                  _: 2
                                                }, 1024)) : createCommentVNode("", true),
                                                txn.failReason ? (openBlock(), createBlock(_component_NuxtFormField, {
                                                  key: 9,
                                                  label: "Reason for failure"
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(_component_NuxtTextarea, {
                                                      value: txn.failReason,
                                                      rows: 3,
                                                      disabled: "",
                                                      class: "resize-none w-full"
                                                    }, null, 8, ["value"])
                                                  ]),
                                                  _: 2
                                                }, 1024)) : createCommentVNode("", true)
                                              ])
                                            ])
                                          ]),
                                          default: withCtx(() => [
                                            createVNode(_component_NuxtButton, {
                                              label: "More",
                                              icon: "lucide:ellipsis-vertical",
                                              color: "neutral",
                                              variant: "outline",
                                              size: "sm"
                                            })
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_NuxtButton, {
                                          label: "Edit",
                                          icon: "lucide:file-edit",
                                          variant: "soft",
                                          size: "sm",
                                          onClick: ($event) => handleItemSelect(txn)
                                        }, null, 8, ["onClick"])
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
                                  }, 1024),
                                  createVNode(_component_VTableCell, { class: "flex items-center gap-2" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_NuxtPopover, { ui: { content: "max-h-96 overflow-y-auto" } }, {
                                        content: withCtx(() => [
                                          createVNode("div", null, [
                                            createVNode("header", { class: "p-5 w-72" }, [
                                              createVNode("h2", { class: "font-semibold" }, "More")
                                            ]),
                                            createVNode(_component_NuxtSeparator),
                                            createVNode("div", { class: "p-5 space-y-2.5" }, [
                                              txn.description ? (openBlock(), createBlock(_component_NuxtFormField, {
                                                key: 0,
                                                label: "Description"
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(_component_NuxtTextarea, {
                                                    value: txn.description,
                                                    rows: 3,
                                                    disabled: "",
                                                    class: "resize-none w-full"
                                                  }, null, 8, ["value"])
                                                ]),
                                                _: 2
                                              }, 1024)) : createCommentVNode("", true),
                                              txn.depositWalletAddress ? (openBlock(), createBlock(_component_NuxtFormField, {
                                                key: 1,
                                                label: "Deposit Wallet Address"
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(_component_NuxtInput, {
                                                    value: txn.depositWalletAddress,
                                                    disabled: "",
                                                    class: "w-full"
                                                  }, null, 8, ["value"])
                                                ]),
                                                _: 2
                                              }, 1024)) : createCommentVNode("", true),
                                              txn.depositWalletAddressNetwork ? (openBlock(), createBlock(_component_NuxtFormField, {
                                                key: 2,
                                                label: "Deposit Wallet Address Network"
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(_component_NuxtInput, {
                                                    value: txn.depositWalletAddressNetwork,
                                                    disabled: "",
                                                    class: "w-full"
                                                  }, null, 8, ["value"])
                                                ]),
                                                _: 2
                                              }, 1024)) : createCommentVNode("", true),
                                              txn.withdrawalWalletAddress ? (openBlock(), createBlock(_component_NuxtFormField, {
                                                key: 3,
                                                label: "Withdrawal Wallet Address"
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(_component_NuxtInput, {
                                                    value: txn.withdrawalWalletAddress,
                                                    disabled: "",
                                                    class: "w-full"
                                                  }, null, 8, ["value"])
                                                ]),
                                                _: 2
                                              }, 1024)) : createCommentVNode("", true),
                                              txn.withdrawalWalletAddressNetwork ? (openBlock(), createBlock(_component_NuxtFormField, {
                                                key: 4,
                                                label: "Withdrawal Wallet Address Network"
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(_component_NuxtInput, {
                                                    value: txn.withdrawalWalletAddressNetwork,
                                                    disabled: "",
                                                    class: "w-full"
                                                  }, null, 8, ["value"])
                                                ]),
                                                _: 2
                                              }, 1024)) : createCommentVNode("", true),
                                              txn.bank ? (openBlock(), createBlock(_component_NuxtFormField, {
                                                key: 5,
                                                label: "Bank Name"
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(_component_NuxtInput, {
                                                    value: txn.bank,
                                                    disabled: "",
                                                    class: "w-full"
                                                  }, null, 8, ["value"])
                                                ]),
                                                _: 2
                                              }, 1024)) : createCommentVNode("", true),
                                              txn.bankAccount ? (openBlock(), createBlock(_component_NuxtFormField, {
                                                key: 6,
                                                label: "Bank Account Number"
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(_component_NuxtInput, {
                                                    value: txn.bankAccount,
                                                    disabled: "",
                                                    class: "w-full"
                                                  }, null, 8, ["value"])
                                                ]),
                                                _: 2
                                              }, 1024)) : createCommentVNode("", true),
                                              txn.approvedAt ? (openBlock(), createBlock(_component_NuxtFormField, {
                                                key: 7,
                                                label: "Approved At"
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(_component_NuxtInput, {
                                                    value: unref(useDateFormat)(
                                                      txn.approvedAt,
                                                      "YYYY-MMM-DD hh:mm aa"
                                                    ).value,
                                                    disabled: "",
                                                    class: "w-full"
                                                  }, null, 8, ["value"])
                                                ]),
                                                _: 2
                                              }, 1024)) : createCommentVNode("", true),
                                              txn.failedAt ? (openBlock(), createBlock(_component_NuxtFormField, {
                                                key: 8,
                                                label: "Failed At"
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(_component_NuxtInput, {
                                                    value: unref(useDateFormat)(
                                                      txn.failedAt,
                                                      "YYYY-MMM-DD hh:mm aa"
                                                    ).value,
                                                    disabled: "",
                                                    class: "w-full"
                                                  }, null, 8, ["value"])
                                                ]),
                                                _: 2
                                              }, 1024)) : createCommentVNode("", true),
                                              txn.failReason ? (openBlock(), createBlock(_component_NuxtFormField, {
                                                key: 9,
                                                label: "Reason for failure"
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(_component_NuxtTextarea, {
                                                    value: txn.failReason,
                                                    rows: 3,
                                                    disabled: "",
                                                    class: "resize-none w-full"
                                                  }, null, 8, ["value"])
                                                ]),
                                                _: 2
                                              }, 1024)) : createCommentVNode("", true)
                                            ])
                                          ])
                                        ]),
                                        default: withCtx(() => [
                                          createVNode(_component_NuxtButton, {
                                            label: "More",
                                            icon: "lucide:ellipsis-vertical",
                                            color: "neutral",
                                            variant: "outline",
                                            size: "sm"
                                          })
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(_component_NuxtButton, {
                                        label: "Edit",
                                        icon: "lucide:file-edit",
                                        variant: "soft",
                                        size: "sm",
                                        onClick: ($event) => handleItemSelect(txn)
                                      }, null, 8, ["onClick"])
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
                                }, 1024),
                                createVNode(_component_VTableCell, { class: "flex items-center gap-2" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_NuxtPopover, { ui: { content: "max-h-96 overflow-y-auto" } }, {
                                      content: withCtx(() => [
                                        createVNode("div", null, [
                                          createVNode("header", { class: "p-5 w-72" }, [
                                            createVNode("h2", { class: "font-semibold" }, "More")
                                          ]),
                                          createVNode(_component_NuxtSeparator),
                                          createVNode("div", { class: "p-5 space-y-2.5" }, [
                                            txn.description ? (openBlock(), createBlock(_component_NuxtFormField, {
                                              key: 0,
                                              label: "Description"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(_component_NuxtTextarea, {
                                                  value: txn.description,
                                                  rows: 3,
                                                  disabled: "",
                                                  class: "resize-none w-full"
                                                }, null, 8, ["value"])
                                              ]),
                                              _: 2
                                            }, 1024)) : createCommentVNode("", true),
                                            txn.depositWalletAddress ? (openBlock(), createBlock(_component_NuxtFormField, {
                                              key: 1,
                                              label: "Deposit Wallet Address"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(_component_NuxtInput, {
                                                  value: txn.depositWalletAddress,
                                                  disabled: "",
                                                  class: "w-full"
                                                }, null, 8, ["value"])
                                              ]),
                                              _: 2
                                            }, 1024)) : createCommentVNode("", true),
                                            txn.depositWalletAddressNetwork ? (openBlock(), createBlock(_component_NuxtFormField, {
                                              key: 2,
                                              label: "Deposit Wallet Address Network"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(_component_NuxtInput, {
                                                  value: txn.depositWalletAddressNetwork,
                                                  disabled: "",
                                                  class: "w-full"
                                                }, null, 8, ["value"])
                                              ]),
                                              _: 2
                                            }, 1024)) : createCommentVNode("", true),
                                            txn.withdrawalWalletAddress ? (openBlock(), createBlock(_component_NuxtFormField, {
                                              key: 3,
                                              label: "Withdrawal Wallet Address"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(_component_NuxtInput, {
                                                  value: txn.withdrawalWalletAddress,
                                                  disabled: "",
                                                  class: "w-full"
                                                }, null, 8, ["value"])
                                              ]),
                                              _: 2
                                            }, 1024)) : createCommentVNode("", true),
                                            txn.withdrawalWalletAddressNetwork ? (openBlock(), createBlock(_component_NuxtFormField, {
                                              key: 4,
                                              label: "Withdrawal Wallet Address Network"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(_component_NuxtInput, {
                                                  value: txn.withdrawalWalletAddressNetwork,
                                                  disabled: "",
                                                  class: "w-full"
                                                }, null, 8, ["value"])
                                              ]),
                                              _: 2
                                            }, 1024)) : createCommentVNode("", true),
                                            txn.bank ? (openBlock(), createBlock(_component_NuxtFormField, {
                                              key: 5,
                                              label: "Bank Name"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(_component_NuxtInput, {
                                                  value: txn.bank,
                                                  disabled: "",
                                                  class: "w-full"
                                                }, null, 8, ["value"])
                                              ]),
                                              _: 2
                                            }, 1024)) : createCommentVNode("", true),
                                            txn.bankAccount ? (openBlock(), createBlock(_component_NuxtFormField, {
                                              key: 6,
                                              label: "Bank Account Number"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(_component_NuxtInput, {
                                                  value: txn.bankAccount,
                                                  disabled: "",
                                                  class: "w-full"
                                                }, null, 8, ["value"])
                                              ]),
                                              _: 2
                                            }, 1024)) : createCommentVNode("", true),
                                            txn.approvedAt ? (openBlock(), createBlock(_component_NuxtFormField, {
                                              key: 7,
                                              label: "Approved At"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(_component_NuxtInput, {
                                                  value: unref(useDateFormat)(
                                                    txn.approvedAt,
                                                    "YYYY-MMM-DD hh:mm aa"
                                                  ).value,
                                                  disabled: "",
                                                  class: "w-full"
                                                }, null, 8, ["value"])
                                              ]),
                                              _: 2
                                            }, 1024)) : createCommentVNode("", true),
                                            txn.failedAt ? (openBlock(), createBlock(_component_NuxtFormField, {
                                              key: 8,
                                              label: "Failed At"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(_component_NuxtInput, {
                                                  value: unref(useDateFormat)(
                                                    txn.failedAt,
                                                    "YYYY-MMM-DD hh:mm aa"
                                                  ).value,
                                                  disabled: "",
                                                  class: "w-full"
                                                }, null, 8, ["value"])
                                              ]),
                                              _: 2
                                            }, 1024)) : createCommentVNode("", true),
                                            txn.failReason ? (openBlock(), createBlock(_component_NuxtFormField, {
                                              key: 9,
                                              label: "Reason for failure"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(_component_NuxtTextarea, {
                                                  value: txn.failReason,
                                                  rows: 3,
                                                  disabled: "",
                                                  class: "resize-none w-full"
                                                }, null, 8, ["value"])
                                              ]),
                                              _: 2
                                            }, 1024)) : createCommentVNode("", true)
                                          ])
                                        ])
                                      ]),
                                      default: withCtx(() => [
                                        createVNode(_component_NuxtButton, {
                                          label: "More",
                                          icon: "lucide:ellipsis-vertical",
                                          color: "neutral",
                                          variant: "outline",
                                          size: "sm"
                                        })
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_NuxtButton, {
                                      label: "Edit",
                                      icon: "lucide:file-edit",
                                      variant: "soft",
                                      size: "sm",
                                      onClick: ($event) => handleItemSelect(txn)
                                    }, null, 8, ["onClick"])
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
                  unref(selected) ? (openBlock(), createBlock("div", { key: 0 }, [
                    createVNode(_component_AdminTransactionManager, {
                      open: unref(open),
                      "onUpdate:open": ($event) => isRef(open) ? open.value = $event : null,
                      transaction: unref(selected),
                      onDone: () => unref(refresh)()
                    }, null, 8, ["open", "onUpdate:open", "transaction", "onDone"])
                  ])) : createCommentVNode("", true),
                  createVNode(_component_VTable, {
                    loading: unref(status) === "pending"
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
                                }, 1024),
                                createVNode(_component_VTableCell, { class: "flex items-center gap-2" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_NuxtPopover, { ui: { content: "max-h-96 overflow-y-auto" } }, {
                                      content: withCtx(() => [
                                        createVNode("div", null, [
                                          createVNode("header", { class: "p-5 w-72" }, [
                                            createVNode("h2", { class: "font-semibold" }, "More")
                                          ]),
                                          createVNode(_component_NuxtSeparator),
                                          createVNode("div", { class: "p-5 space-y-2.5" }, [
                                            txn.description ? (openBlock(), createBlock(_component_NuxtFormField, {
                                              key: 0,
                                              label: "Description"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(_component_NuxtTextarea, {
                                                  value: txn.description,
                                                  rows: 3,
                                                  disabled: "",
                                                  class: "resize-none w-full"
                                                }, null, 8, ["value"])
                                              ]),
                                              _: 2
                                            }, 1024)) : createCommentVNode("", true),
                                            txn.depositWalletAddress ? (openBlock(), createBlock(_component_NuxtFormField, {
                                              key: 1,
                                              label: "Deposit Wallet Address"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(_component_NuxtInput, {
                                                  value: txn.depositWalletAddress,
                                                  disabled: "",
                                                  class: "w-full"
                                                }, null, 8, ["value"])
                                              ]),
                                              _: 2
                                            }, 1024)) : createCommentVNode("", true),
                                            txn.depositWalletAddressNetwork ? (openBlock(), createBlock(_component_NuxtFormField, {
                                              key: 2,
                                              label: "Deposit Wallet Address Network"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(_component_NuxtInput, {
                                                  value: txn.depositWalletAddressNetwork,
                                                  disabled: "",
                                                  class: "w-full"
                                                }, null, 8, ["value"])
                                              ]),
                                              _: 2
                                            }, 1024)) : createCommentVNode("", true),
                                            txn.withdrawalWalletAddress ? (openBlock(), createBlock(_component_NuxtFormField, {
                                              key: 3,
                                              label: "Withdrawal Wallet Address"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(_component_NuxtInput, {
                                                  value: txn.withdrawalWalletAddress,
                                                  disabled: "",
                                                  class: "w-full"
                                                }, null, 8, ["value"])
                                              ]),
                                              _: 2
                                            }, 1024)) : createCommentVNode("", true),
                                            txn.withdrawalWalletAddressNetwork ? (openBlock(), createBlock(_component_NuxtFormField, {
                                              key: 4,
                                              label: "Withdrawal Wallet Address Network"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(_component_NuxtInput, {
                                                  value: txn.withdrawalWalletAddressNetwork,
                                                  disabled: "",
                                                  class: "w-full"
                                                }, null, 8, ["value"])
                                              ]),
                                              _: 2
                                            }, 1024)) : createCommentVNode("", true),
                                            txn.bank ? (openBlock(), createBlock(_component_NuxtFormField, {
                                              key: 5,
                                              label: "Bank Name"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(_component_NuxtInput, {
                                                  value: txn.bank,
                                                  disabled: "",
                                                  class: "w-full"
                                                }, null, 8, ["value"])
                                              ]),
                                              _: 2
                                            }, 1024)) : createCommentVNode("", true),
                                            txn.bankAccount ? (openBlock(), createBlock(_component_NuxtFormField, {
                                              key: 6,
                                              label: "Bank Account Number"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(_component_NuxtInput, {
                                                  value: txn.bankAccount,
                                                  disabled: "",
                                                  class: "w-full"
                                                }, null, 8, ["value"])
                                              ]),
                                              _: 2
                                            }, 1024)) : createCommentVNode("", true),
                                            txn.approvedAt ? (openBlock(), createBlock(_component_NuxtFormField, {
                                              key: 7,
                                              label: "Approved At"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(_component_NuxtInput, {
                                                  value: unref(useDateFormat)(
                                                    txn.approvedAt,
                                                    "YYYY-MMM-DD hh:mm aa"
                                                  ).value,
                                                  disabled: "",
                                                  class: "w-full"
                                                }, null, 8, ["value"])
                                              ]),
                                              _: 2
                                            }, 1024)) : createCommentVNode("", true),
                                            txn.failedAt ? (openBlock(), createBlock(_component_NuxtFormField, {
                                              key: 8,
                                              label: "Failed At"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(_component_NuxtInput, {
                                                  value: unref(useDateFormat)(
                                                    txn.failedAt,
                                                    "YYYY-MMM-DD hh:mm aa"
                                                  ).value,
                                                  disabled: "",
                                                  class: "w-full"
                                                }, null, 8, ["value"])
                                              ]),
                                              _: 2
                                            }, 1024)) : createCommentVNode("", true),
                                            txn.failReason ? (openBlock(), createBlock(_component_NuxtFormField, {
                                              key: 9,
                                              label: "Reason for failure"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(_component_NuxtTextarea, {
                                                  value: txn.failReason,
                                                  rows: 3,
                                                  disabled: "",
                                                  class: "resize-none w-full"
                                                }, null, 8, ["value"])
                                              ]),
                                              _: 2
                                            }, 1024)) : createCommentVNode("", true)
                                          ])
                                        ])
                                      ]),
                                      default: withCtx(() => [
                                        createVNode(_component_NuxtButton, {
                                          label: "More",
                                          icon: "lucide:ellipsis-vertical",
                                          color: "neutral",
                                          variant: "outline",
                                          size: "sm"
                                        })
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_NuxtButton, {
                                      label: "Edit",
                                      icon: "lucide:file-edit",
                                      variant: "soft",
                                      size: "sm",
                                      onClick: ($event) => handleItemSelect(txn)
                                    }, null, 8, ["onClick"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/transactions.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=transactions-DEsYbBrJ.mjs.map
