import { _ as __nuxt_component_0 } from './loader-CegSv3fP.mjs';
import { _ as __nuxt_component_14 } from './fetch-error-alert-NIQ5BlkS.mjs';
import { _ as _sfc_main$2 } from './Badge-DE6iRalv.mjs';
import { _ as _sfc_main$3 } from './Card-CcnC6q6H.mjs';
import { _ as _sfc_main$4 } from './Separator-BYgM1HCW.mjs';
import { _ as __nuxt_component_5, a as __nuxt_component_6, b as __nuxt_component_7, c as __nuxt_component_8, d as __nuxt_component_9, e as __nuxt_component_1 } from './v-table-cell-BRZ0KuYt.mjs';
import { _ as _sfc_main$5 } from './InputNumber-D2i2SBzX.mjs';
import { g as useToast, c as _sfc_main$a } from './server.mjs';
import { t as toDollar } from './to-dollar-DdS_9tlH.mjs';
import { defineComponent, computed, unref, withCtx, createVNode, toDisplayString, withDirectives, vShow, createBlock, openBlock, createTextVNode, Fragment, renderList, ref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderStyle, ssrRenderList } from 'vue/server-renderer';
import { useDateFormat } from '@vueuse/core';
import { a5 as normalizeException, k as round } from '../nitro/nitro.mjs';
import { g as getInvestmentStatusBadgeColor } from './investment-CJjcSFHl.mjs';
import { u as useRouteData } from './use-route-data-zpNPSzN0.mjs';
import { u as useFetch } from './fetch-CGkSb6cH.mjs';
import './_plugin-vue_export-helper-1tPrXgE0.mjs';
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
import '@vue/shared';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "investment-profit-row",
  __ssrInlineRender: true,
  props: {
    profit: {},
    investmentStatus: {},
    next: { type: Boolean }
  },
  emits: ["done"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const toast = useToast();
    const state = ref({ ...__props.profit });
    const updateProfit = async () => {
      if (!state.value.actualAmount) return;
      if (state.value.actualAmount === __props.profit.actualAmount) return;
      try {
        const res = await $fetch(`/api/admin/profits/${__props.profit.id}`, {
          method: "PUT",
          body: {
            actualAmount: state.value.actualAmount
          }
        });
        emit("done");
        toast.add({
          color: "success",
          title: "Success",
          description: res.message
        });
      } catch (err) {
        toast.add({
          color: "error",
          title: "Error",
          description: normalizeException(err).message
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_VTableRow = __nuxt_component_7;
      const _component_VTableCell = __nuxt_component_1;
      const _component_NuxtBadge = _sfc_main$2;
      const _component_NuxtInputNumber = _sfc_main$5;
      const _component_NuxtButton = _sfc_main$a;
      _push(ssrRenderComponent(_component_VTableRow, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_VTableCell, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(state).number)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(state).number), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_VTableCell, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_NuxtBadge, {
                    label: unref(state).actualAmount >= unref(state).intendedAmount ? "Profit" : "Loss",
                    variant: "subtle",
                    color: unref(state).actualAmount >= unref(state).intendedAmount ? "success" : "error"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_NuxtBadge, {
                      label: unref(state).actualAmount >= unref(state).intendedAmount ? "Profit" : "Loss",
                      variant: "subtle",
                      color: unref(state).actualAmount >= unref(state).intendedAmount ? "success" : "error"
                    }, null, 8, ["label", "color"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_VTableCell, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(unref(state).intendedAmount))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(unref(state).intendedAmount)), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_VTableCell, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (__props.investmentStatus === "open" || __props.investmentStatus === "paused") {
                    _push3(`<div${_scopeId2}>`);
                    if (unref(state).isDistributed) {
                      _push3(`<p${_scopeId2}>${ssrInterpolate(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(unref(state).actualAmount))}</p>`);
                    } else {
                      _push3(`<div${_scopeId2}><div class="flex items-start gap-1"${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_NuxtInputNumber, {
                        modelValue: unref(state).actualAmount,
                        "onUpdate:modelValue": ($event) => unref(state).actualAmount = $event,
                        "step-snapping": false,
                        "format-options": {
                          style: "currency",
                          currency: "USD",
                          currencyDisplay: "symbol",
                          currencySign: "standard",
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        },
                        orientation: "vertical",
                        class: "w-32"
                      }, null, _parent3, _scopeId2));
                      _push3(`<div class="flex items-center gap-1"${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_NuxtButton, {
                        color: "neutral",
                        variant: "subtle",
                        icon: "lucide:x",
                        onClick: ($event) => unref(state).actualAmount = __props.profit.actualAmount
                      }, null, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_NuxtButton, {
                        icon: "lucide:check",
                        "loading-auto": "",
                        onClick: updateProfit
                      }, null, _parent3, _scopeId2));
                      _push3(`</div></div></div>`);
                    }
                    _push3(`</div>`);
                  } else {
                    _push3(`<div${_scopeId2}>${ssrInterpolate(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(unref(state).actualAmount))}</div>`);
                  }
                } else {
                  return [
                    __props.investmentStatus === "open" || __props.investmentStatus === "paused" ? (openBlock(), createBlock("div", { key: 0 }, [
                      unref(state).isDistributed ? (openBlock(), createBlock("p", { key: 0 }, toDisplayString(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(unref(state).actualAmount)), 1)) : (openBlock(), createBlock("div", { key: 1 }, [
                        createVNode("div", { class: "flex items-start gap-1" }, [
                          createVNode(_component_NuxtInputNumber, {
                            modelValue: unref(state).actualAmount,
                            "onUpdate:modelValue": ($event) => unref(state).actualAmount = $event,
                            "step-snapping": false,
                            "format-options": {
                              style: "currency",
                              currency: "USD",
                              currencyDisplay: "symbol",
                              currencySign: "standard",
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                            },
                            orientation: "vertical",
                            class: "w-32"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode("div", { class: "flex items-center gap-1" }, [
                            createVNode(_component_NuxtButton, {
                              color: "neutral",
                              variant: "subtle",
                              icon: "lucide:x",
                              onClick: ($event) => unref(state).actualAmount = __props.profit.actualAmount
                            }, null, 8, ["onClick"]),
                            createVNode(_component_NuxtButton, {
                              icon: "lucide:check",
                              "loading-auto": "",
                              onClick: updateProfit
                            })
                          ])
                        ])
                      ]))
                    ])) : (openBlock(), createBlock("div", { key: 1 }, toDisplayString(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(unref(state).actualAmount)), 1))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_VTableCell, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (unref(state).isDistributed) {
                    _push3(`<p${_scopeId2}>Yes</p>`);
                  } else {
                    _push3(`<div class="flex items-center gap-2"${_scopeId2}><span${_scopeId2}>No</span>`);
                    _push3(ssrRenderComponent(_component_NuxtBadge, {
                      style: __props.next ? null : { display: "none" },
                      label: "Next payment",
                      color: "error",
                      variant: "soft"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  }
                } else {
                  return [
                    unref(state).isDistributed ? (openBlock(), createBlock("p", { key: 0 }, "Yes")) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "flex items-center gap-2"
                    }, [
                      createVNode("span", null, "No"),
                      withDirectives(createVNode(_component_NuxtBadge, {
                        label: "Next payment",
                        color: "error",
                        variant: "soft"
                      }, null, 512), [
                        [vShow, __props.next]
                      ])
                    ]))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_VTableCell, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (unref(state).distributedAt) {
                    _push3(`<p${_scopeId2}>${ssrInterpolate(unref(useDateFormat)(unref(state).distributedAt, "MMM DD, YYYY hh:mm aa"))}</p>`);
                  } else {
                    _push3(`<p${_scopeId2}>Not available</p>`);
                  }
                } else {
                  return [
                    unref(state).distributedAt ? (openBlock(), createBlock("p", { key: 0 }, toDisplayString(unref(useDateFormat)(unref(state).distributedAt, "MMM DD, YYYY hh:mm aa")), 1)) : (openBlock(), createBlock("p", { key: 1 }, "Not available"))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_VTableCell, null, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(state).number), 1)
                ]),
                _: 1
              }),
              createVNode(_component_VTableCell, null, {
                default: withCtx(() => [
                  createVNode(_component_NuxtBadge, {
                    label: unref(state).actualAmount >= unref(state).intendedAmount ? "Profit" : "Loss",
                    variant: "subtle",
                    color: unref(state).actualAmount >= unref(state).intendedAmount ? "success" : "error"
                  }, null, 8, ["label", "color"])
                ]),
                _: 1
              }),
              createVNode(_component_VTableCell, null, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(unref(state).intendedAmount)), 1)
                ]),
                _: 1
              }),
              createVNode(_component_VTableCell, null, {
                default: withCtx(() => [
                  __props.investmentStatus === "open" || __props.investmentStatus === "paused" ? (openBlock(), createBlock("div", { key: 0 }, [
                    unref(state).isDistributed ? (openBlock(), createBlock("p", { key: 0 }, toDisplayString(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(unref(state).actualAmount)), 1)) : (openBlock(), createBlock("div", { key: 1 }, [
                      createVNode("div", { class: "flex items-start gap-1" }, [
                        createVNode(_component_NuxtInputNumber, {
                          modelValue: unref(state).actualAmount,
                          "onUpdate:modelValue": ($event) => unref(state).actualAmount = $event,
                          "step-snapping": false,
                          "format-options": {
                            style: "currency",
                            currency: "USD",
                            currencyDisplay: "symbol",
                            currencySign: "standard",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          },
                          orientation: "vertical",
                          class: "w-32"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("div", { class: "flex items-center gap-1" }, [
                          createVNode(_component_NuxtButton, {
                            color: "neutral",
                            variant: "subtle",
                            icon: "lucide:x",
                            onClick: ($event) => unref(state).actualAmount = __props.profit.actualAmount
                          }, null, 8, ["onClick"]),
                          createVNode(_component_NuxtButton, {
                            icon: "lucide:check",
                            "loading-auto": "",
                            onClick: updateProfit
                          })
                        ])
                      ])
                    ]))
                  ])) : (openBlock(), createBlock("div", { key: 1 }, toDisplayString(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(unref(state).actualAmount)), 1))
                ]),
                _: 1
              }),
              createVNode(_component_VTableCell, null, {
                default: withCtx(() => [
                  unref(state).isDistributed ? (openBlock(), createBlock("p", { key: 0 }, "Yes")) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "flex items-center gap-2"
                  }, [
                    createVNode("span", null, "No"),
                    withDirectives(createVNode(_component_NuxtBadge, {
                      label: "Next payment",
                      color: "error",
                      variant: "soft"
                    }, null, 512), [
                      [vShow, __props.next]
                    ])
                  ]))
                ]),
                _: 1
              }),
              createVNode(_component_VTableCell, null, {
                default: withCtx(() => [
                  unref(state).distributedAt ? (openBlock(), createBlock("p", { key: 0 }, toDisplayString(unref(useDateFormat)(unref(state).distributedAt, "MMM DD, YYYY hh:mm aa")), 1)) : (openBlock(), createBlock("p", { key: 1 }, "Not available"))
                ]),
                _: 1
              })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/investment-profit-row.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_10 = Object.assign(_sfc_main$1, { __name: "AdminInvestmentProfitRow" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "profits",
  __ssrInlineRender: true,
  setup(__props) {
    const investmentId = useRouteData().getParams("investmentId");
    const { data, error, pending, refresh } = useFetch(
      `/api/admin/investments/${investmentId}`,
      "$1Bg_DyAZuv"
    );
    const lastProfitAmount = computed(() => {
      if (!data.value) return 0;
      return data.value.profits.find(
        (profit) => profit.number === data.value?.profitCount
      )?.actualAmount ?? 0;
    });
    const actualProfit = computed(
      () => data.value?.profits.reduce((acc, curr) => acc + curr.actualAmount, 0) ?? 0
    );
    const headers = [
      "#",
      "Status",
      "Calculated Profit",
      "Actual Profit",
      "Already Paid",
      "Paid At"
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLoader = __nuxt_component_0;
      const _component_FetchErrorAlert = __nuxt_component_14;
      const _component_NuxtBadge = _sfc_main$2;
      const _component_NuxtCard = _sfc_main$3;
      const _component_NuxtSeparator = _sfc_main$4;
      const _component_VTable = __nuxt_component_5;
      const _component_VTableHeader = __nuxt_component_6;
      const _component_VTableRow = __nuxt_component_7;
      const _component_VTableHead = __nuxt_component_8;
      const _component_VTableBody = __nuxt_component_9;
      const _component_AdminInvestmentProfitRow = __nuxt_component_10;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      if (unref(pending)) {
        _push(`<div class="flex-center p-5">`);
        _push(ssrRenderComponent(_component_NuxtLoader, null, null, _parent));
        _push(`</div>`);
      } else if (unref(error)) {
        _push(`<div class="w-full">`);
        _push(ssrRenderComponent(_component_FetchErrorAlert, {
          message: unref(normalizeException)(unref(error)).message,
          "show-retry": "",
          onRetry: () => unref(refresh)()
        }, null, _parent));
        _push(`</div>`);
      } else if (unref(data)) {
        _push(`<div><header><p class="text-xs font-semibold text-muted"> Investment ID: ${ssrInterpolate(unref(data).id)}</p><div class="flex items-center gap-2"><h1 class="text-3xl">${ssrInterpolate(unref(data).investmentName)}</h1>`);
        _push(ssrRenderComponent(_component_NuxtBadge, {
          label: unref(data).status,
          color: ("getInvestmentStatusBadgeColor" in _ctx ? _ctx.getInvestmentStatusBadgeColor : unref(getInvestmentStatusBadgeColor))(unref(data).status),
          variant: "subtle"
        }, null, _parent));
        _push(`</div><p class="text-sm text-primary-500">${ssrInterpolate(unref(data).category)}</p></header><div class="mt-6 space-y-4"><p class="text-muted"> Deposit: <span class="text-default text-lg font-geist-mono font-semibold">${ssrInterpolate(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(unref(data).deposit))}</span></p><div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">`);
        _push(ssrRenderComponent(_component_NuxtCard, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div${_scopeId}><p class="text-sm text-muted font-semibold"${_scopeId}>Current Profit</p><p class="text-2xl font-semibold font-geist-mono"${_scopeId}>${ssrInterpolate(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(unref(data).totalProfit))}</p></div><small${_scopeId}>${ssrInterpolate(unref(round)(unref(data).totalProfit / unref(data).deposit * 100))}% of deposit </small>`);
            } else {
              return [
                createVNode("div", null, [
                  createVNode("p", { class: "text-sm text-muted font-semibold" }, "Current Profit"),
                  createVNode("p", { class: "text-2xl font-semibold font-geist-mono" }, toDisplayString(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(unref(data).totalProfit)), 1)
                ]),
                createVNode("small", null, toDisplayString(unref(round)(unref(data).totalProfit / unref(data).deposit * 100)) + "% of deposit ", 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtCard, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div${_scopeId}><p class="text-sm text-muted font-semibold"${_scopeId}> Total Profit Expected by Client </p><p class="text-2xl font-semibold font-geist-mono"${_scopeId}>${ssrInterpolate(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(unref(data).deposit * (unref(data).totalReturn / 100)))}</p></div><small${_scopeId}>${ssrInterpolate(unref(data).totalReturn)}% of deposit </small>`);
            } else {
              return [
                createVNode("div", null, [
                  createVNode("p", { class: "text-sm text-muted font-semibold" }, " Total Profit Expected by Client "),
                  createVNode("p", { class: "text-2xl font-semibold font-geist-mono" }, toDisplayString(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(unref(data).deposit * (unref(data).totalReturn / 100))), 1)
                ]),
                createVNode("small", null, toDisplayString(unref(data).totalReturn) + "% of deposit ", 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtCard, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div${_scopeId}><p class="text-sm text-muted font-semibold"${_scopeId}>Actual Total Profit</p><p class="text-2xl font-semibold font-geist-mono"${_scopeId}>${ssrInterpolate(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(unref(actualProfit)))}</p></div><small${_scopeId}>${ssrInterpolate(unref(round)(unref(actualProfit) / unref(data).deposit * 100))}% of deposit </small>`);
            } else {
              return [
                createVNode("div", null, [
                  createVNode("p", { class: "text-sm text-muted font-semibold" }, "Actual Total Profit"),
                  createVNode("p", { class: "text-2xl font-semibold font-geist-mono" }, toDisplayString(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(unref(actualProfit))), 1)
                ]),
                createVNode("small", null, toDisplayString(unref(round)(unref(actualProfit) / unref(data).deposit * 100)) + "% of deposit ", 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtCard, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div${_scopeId}><p class="text-sm text-muted font-semibold"${_scopeId}> Investment Return Status </p><p class="${ssrRenderClass([unref(actualProfit) > unref(data).deposit ? "text-success" : "text-error", "text-2xl font-semibold font-geist-mono"])}"${_scopeId}>${ssrInterpolate(unref(actualProfit) > unref(data).deposit ? "Profit" : "Loss")}</p></div><small${_scopeId}>${ssrInterpolate(unref(actualProfit) > unref(data).deposit ? "Investment is in profit" : "Investment is in loss")}</small>`);
            } else {
              return [
                createVNode("div", null, [
                  createVNode("p", { class: "text-sm text-muted font-semibold" }, " Investment Return Status "),
                  createVNode("p", {
                    class: ["text-2xl font-semibold font-geist-mono", unref(actualProfit) > unref(data).deposit ? "text-success" : "text-error"]
                  }, toDisplayString(unref(actualProfit) > unref(data).deposit ? "Profit" : "Loss"), 3)
                ]),
                createVNode("small", null, toDisplayString(unref(actualProfit) > unref(data).deposit ? "Investment is in profit" : "Investment is in loss"), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtCard, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div${_scopeId}><p class="text-sm text-muted font-semibold"${_scopeId}>Days Completed</p><div${_scopeId}><span class="text-2xl font-semibold font-geist-mono"${_scopeId}>${ssrInterpolate(unref(data).daysCompleted)}</span><span${_scopeId}> out of </span><span class="text-2xl font-semibold font-geist-mono"${_scopeId}>${ssrInterpolate(unref(data).duration)}</span><span${_scopeId}> days </span></div></div><small${_scopeId}>${ssrInterpolate(unref(round)(unref(data).daysCompleted / unref(data).duration * 100))}% complete </small>`);
            } else {
              return [
                createVNode("div", null, [
                  createVNode("p", { class: "text-sm text-muted font-semibold" }, "Days Completed"),
                  createVNode("div", null, [
                    createVNode("span", { class: "text-2xl font-semibold font-geist-mono" }, toDisplayString(unref(data).daysCompleted), 1),
                    createVNode("span", null, " out of "),
                    createVNode("span", { class: "text-2xl font-semibold font-geist-mono" }, toDisplayString(unref(data).duration), 1),
                    createVNode("span", null, " days ")
                  ])
                ]),
                createVNode("small", null, toDisplayString(unref(round)(unref(data).daysCompleted / unref(data).duration * 100)) + "% complete ", 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtCard, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div${_scopeId}><p class="text-sm text-muted font-semibold"${_scopeId}> Profit Distribution Cycle </p><p class="text-2xl font-semibold font-geist-mono"${_scopeId}>${ssrInterpolate(unref(data).profitDistribution)}</p></div><small style="${ssrRenderStyle(unref(data).profitDistribution === "daily" ? null : { display: "none" })}"${_scopeId}> Every day </small><small style="${ssrRenderStyle(unref(data).profitDistribution === "weekly" ? null : { display: "none" })}"${_scopeId}> Every 7 days </small><small style="${ssrRenderStyle(unref(data).profitDistribution === "bi_weekly" ? null : { display: "none" })}"${_scopeId}> Every 14 days </small><small style="${ssrRenderStyle(unref(data).profitDistribution === "monthly" ? null : { display: "none" })}"${_scopeId}> Every 30 days </small>`);
            } else {
              return [
                createVNode("div", null, [
                  createVNode("p", { class: "text-sm text-muted font-semibold" }, " Profit Distribution Cycle "),
                  createVNode("p", { class: "text-2xl font-semibold font-geist-mono" }, toDisplayString(unref(data).profitDistribution), 1)
                ]),
                withDirectives(createVNode("small", null, " Every day ", 512), [
                  [vShow, unref(data).profitDistribution === "daily"]
                ]),
                withDirectives(createVNode("small", null, " Every 7 days ", 512), [
                  [vShow, unref(data).profitDistribution === "weekly"]
                ]),
                withDirectives(createVNode("small", null, " Every 14 days ", 512), [
                  [vShow, unref(data).profitDistribution === "bi_weekly"]
                ]),
                withDirectives(createVNode("small", null, " Every 30 days ", 512), [
                  [vShow, unref(data).profitDistribution === "monthly"]
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtCard, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div${_scopeId}><p class="text-sm text-muted font-semibold"${_scopeId}> Number of Distributions </p><p class="text-2xl font-semibold font-geist-mono"${_scopeId}>${ssrInterpolate(unref(data).profitCount)}</p></div><small${_scopeId}> Profit yieled ${ssrInterpolate(unref(data).profitCount)} times </small>`);
            } else {
              return [
                createVNode("div", null, [
                  createVNode("p", { class: "text-sm text-muted font-semibold" }, " Number of Distributions "),
                  createVNode("p", { class: "text-2xl font-semibold font-geist-mono" }, toDisplayString(unref(data).profitCount), 1)
                ]),
                createVNode("small", null, " Profit yieled " + toDisplayString(unref(data).profitCount) + " times ", 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtCard, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div${_scopeId}><p class="text-sm text-muted font-semibold"${_scopeId}>Last Profit</p><p class="text-2xl font-semibold font-geist-mono"${_scopeId}>${ssrInterpolate(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(unref(lastProfitAmount)))}</p></div>`);
              if (unref(data).lastProfitDistributedAt) {
                _push2(`<small${_scopeId}>${ssrInterpolate(unref(useDateFormat)(
                  unref(data).lastProfitDistributedAt,
                  "MMM DD, YYYY hh:mm aa"
                ))}</small>`);
              } else {
                _push2(`<small${_scopeId}>No Profit Distributed</small>`);
              }
            } else {
              return [
                createVNode("div", null, [
                  createVNode("p", { class: "text-sm text-muted font-semibold" }, "Last Profit"),
                  createVNode("p", { class: "text-2xl font-semibold font-geist-mono" }, toDisplayString(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(unref(lastProfitAmount))), 1)
                ]),
                unref(data).lastProfitDistributedAt ? (openBlock(), createBlock("small", { key: 0 }, toDisplayString(unref(useDateFormat)(
                  unref(data).lastProfitDistributedAt,
                  "MMM DD, YYYY hh:mm aa"
                )), 1)) : (openBlock(), createBlock("small", { key: 1 }, "No Profit Distributed"))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><section class="mt-10"><h3 class="text-xl">Profits</h3>`);
        _push(ssrRenderComponent(_component_NuxtSeparator, { class: "my-2" }, null, _parent));
        _push(`<div class="mt-4">`);
        _push(ssrRenderComponent(_component_VTable, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_VTableHeader, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_VTableRow, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<!--[-->`);
                          ssrRenderList(headers, (header) => {
                            _push4(ssrRenderComponent(_component_VTableHead, { key: header }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(header)}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(header), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          });
                          _push4(`<!--]-->`);
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
                    }, _parent3, _scopeId2));
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
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_VTableBody, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<!--[-->`);
                    ssrRenderList(unref(data).profits, (profit) => {
                      _push3(ssrRenderComponent(_component_AdminInvestmentProfitRow, {
                        key: profit.id,
                        profit,
                        "investment-status": unref(data).status,
                        next: profit.number - unref(data).profitCount === 1,
                        onDone: () => unref(refresh)()
                      }, null, _parent3, _scopeId2));
                    });
                    _push3(`<!--]-->`);
                  } else {
                    return [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(data).profits, (profit) => {
                        return openBlock(), createBlock(_component_AdminInvestmentProfitRow, {
                          key: profit.id,
                          profit,
                          "investment-status": unref(data).status,
                          next: profit.number - unref(data).profitCount === 1,
                          onDone: () => unref(refresh)()
                        }, null, 8, ["profit", "investment-status", "next", "onDone"]);
                      }), 128))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
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
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(data).profits, (profit) => {
                      return openBlock(), createBlock(_component_AdminInvestmentProfitRow, {
                        key: profit.id,
                        profit,
                        "investment-status": unref(data).status,
                        next: profit.number - unref(data).profitCount === 1,
                        onDone: () => unref(refresh)()
                      }, null, 8, ["profit", "investment-status", "next", "onDone"]);
                    }), 128))
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></section></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/investments/[investmentId]/profits.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=profits-BJ_sTIpk.mjs.map
