import { _ as __nuxt_component_1 } from './currency-select-euKeACJO.mjs';
import { e as _sfc_main$d, b as useRuntimeConfig, c as _sfc_main$7, i as useToast } from './server.mjs';
import { _ as _sfc_main$4 } from './Card-HL6icAYQ.mjs';
import { _ as _sfc_main$1$1, a as _sfc_main$5 } from './FormField-CzZJ1-Wb.mjs';
import { _ as __nuxt_component_14 } from './fetch-error-alert-B3Gd_w4n.mjs';
import { _ as _sfc_main$6 } from './InputNumber-DfQ_yysT.mjs';
import { _ as _sfc_main$8 } from './Modal-DefLStPx.mjs';
import { _ as _sfc_main$9 } from './Badge-q_8fq56_.mjs';
import { _ as _sfc_main$a } from './Alert-CXdXSwrA.mjs';
import { defineComponent, ref, mergeProps, unref, isRef, withCtx, createVNode, toDisplayString, reactive, createTextVNode, createBlock, createCommentVNode, openBlock, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';
import { a5 as normalizeException } from '../nitro/nitro.mjs';
import { _ as _sfc_main$b } from './Input-BtIiAvs7.mjs';
import { _ as _sfc_main$c } from './ButtonGroup-BGlqjy3A.mjs';
import { t as toDollar } from './to-dollar-DdS_9tlH.mjs';
import z from 'zod';
import { u as useRouteData } from './use-route-data-1tNFDvd7.mjs';
import 'reka-ui';
import '@vueuse/core';
import './fetch-DztuJ_5C.mjs';
import '@vue/shared';
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

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "deposit-creator",
  __ssrInlineRender: true,
  props: {
    transaction: {},
    buttonProps: { default: () => ({
      size: "lg",
      label: "Submit"
    }) }
  },
  setup(__props) {
    useToast();
    const loading = ref(false);
    ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtButton = _sfc_main$7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full cursor-pointer" }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, () => {
        _push(ssrRenderComponent(_component_NuxtButton, mergeProps(_ctx.buttonProps, { loading: unref(loading) }), null, _parent));
      }, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/user/deposit-creator.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_8 = Object.assign(_sfc_main$3, { __name: "UserDepositCreator" });
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "text-copy-button",
  __ssrInlineRender: true,
  props: {
    text: { default: "" },
    resetAfter: { default: 3e3 },
    color: { default: "neutral" },
    variant: { default: "soft" },
    size: { default: "lg" },
    icon: { default: "lucide:clipboard" },
    label: { default: () => void 0 }
  },
  setup(__props) {
    const buttonIcon = ref(__props.icon);
    const copy = async () => {
      return;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtButton = _sfc_main$7;
      ssrRenderSlot(_ctx.$slots, "default", { copy }, () => {
        _push(ssrRenderComponent(_component_NuxtButton, {
          color: _ctx.color,
          size: _ctx.size,
          variant: _ctx.variant,
          label: _ctx.label,
          icon: unref(buttonIcon),
          onClick: copy
        }, null, _parent));
      }, _push, _parent);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/text-copy-button.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_11 = Object.assign(_sfc_main$2, { __name: "TextCopyButton" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "deposit-form",
  __ssrInlineRender: true,
  props: {
    currency: {}
  },
  setup(__props) {
    const { minDepositAmount, maxDepositAmount } = useRuntimeConfig().public;
    const accountId = useRouteData().getParams("accountId");
    const schema = z.object({
      amount: z.number({ message: "Amount is required" }).min(minDepositAmount, {
        message: `Amount must be at least ${toDollar(minDepositAmount)}`
      }).max(maxDepositAmount, {
        message: `Amount must not be more than ${toDollar(maxDepositAmount)}`
      })
    });
    const state = reactive({
      amount: 0
    });
    const reset = () => {
      state.amount = 0;
    };
    const transaction = ref(null);
    const open = ref(false);
    const depositInitError = ref(null);
    const handleFormSubmit = async (event) => {
      const { amount } = event.data;
      if (__props.currency.symbol === "WIRE") {
        transaction.value = {
          financialAccountId: accountId,
          amount: amount / (__props.currency.rate ?? 1),
          currency: "USD",
          USDAmount: amount,
          rate: __props.currency.rate,
          type: "deposit"
        };
        open.value = true;
        return;
      }
      try {
        const data = await $fetch("/api/user/transactions/init-deposit", {
          query: { symbol: __props.currency.symbol, amount }
        });
        transaction.value = {
          financialAccountId: accountId,
          amount: data.currencyDepositAmount,
          currency: data.currency.symbol,
          USDAmount: amount,
          rate: data.currency.rate,
          type: "deposit"
        };
        open.value = true;
        reset();
      } catch (error) {
        depositInitError.value = normalizeException(error);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtForm = _sfc_main$1$1;
      const _component_FetchErrorAlert = __nuxt_component_14;
      const _component_NuxtFormField = _sfc_main$5;
      const _component_NuxtInputNumber = _sfc_main$6;
      const _component_NuxtButton = _sfc_main$7;
      const _component_NuxtModal = _sfc_main$8;
      const _component_NuxtBadge = _sfc_main$9;
      const _component_NuxtAlert = _sfc_main$a;
      const _component_UserDepositCreator = __nuxt_component_8;
      const _component_NuxtInput = _sfc_main$b;
      const _component_NuxtButtonGroup = _sfc_main$c;
      const _component_TextCopyButton = __nuxt_component_11;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_NuxtForm, {
        state: unref(state),
        schema: unref(schema),
        onSubmit: handleFormSubmit
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-4"${_scopeId}>`);
            if (unref(depositInitError)) {
              _push2(`<div${_scopeId}>`);
              _push2(ssrRenderComponent(_component_FetchErrorAlert, {
                message: unref(depositInitError).message
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_component_NuxtFormField, {
              name: "amount",
              label: "Enter the deposit amount",
              description: `Min: ${("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(unref(minDepositAmount))} Max: ${("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(
                unref(maxDepositAmount)
              )}`
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_NuxtInputNumber, {
                    modelValue: unref(state).amount,
                    "onUpdate:modelValue": ($event) => unref(state).amount = $event,
                    "step-snapping": false,
                    "format-options": {
                      style: "currency",
                      currency: "USD",
                      currencyDisplay: "symbol",
                      currencySign: "standard",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    },
                    min: unref(minDepositAmount),
                    max: unref(maxDepositAmount),
                    size: "lg",
                    class: "w-full"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_NuxtInputNumber, {
                      modelValue: unref(state).amount,
                      "onUpdate:modelValue": ($event) => unref(state).amount = $event,
                      "step-snapping": false,
                      "format-options": {
                        style: "currency",
                        currency: "USD",
                        currencyDisplay: "symbol",
                        currencySign: "standard",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      },
                      min: unref(minDepositAmount),
                      max: unref(maxDepositAmount),
                      size: "lg",
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "min", "max"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_NuxtButton, {
              type: "submit",
              class: "mt-2",
              size: "lg",
              icon: "i-lucide-check-circle",
              "loading-auto": ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Submit `);
                } else {
                  return [
                    createTextVNode(" Submit ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-4" }, [
                unref(depositInitError) ? (openBlock(), createBlock("div", { key: 0 }, [
                  createVNode(_component_FetchErrorAlert, {
                    message: unref(depositInitError).message
                  }, null, 8, ["message"])
                ])) : createCommentVNode("", true),
                createVNode(_component_NuxtFormField, {
                  name: "amount",
                  label: "Enter the deposit amount",
                  description: `Min: ${("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(unref(minDepositAmount))} Max: ${("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(
                    unref(maxDepositAmount)
                  )}`
                }, {
                  default: withCtx(() => [
                    createVNode(_component_NuxtInputNumber, {
                      modelValue: unref(state).amount,
                      "onUpdate:modelValue": ($event) => unref(state).amount = $event,
                      "step-snapping": false,
                      "format-options": {
                        style: "currency",
                        currency: "USD",
                        currencyDisplay: "symbol",
                        currencySign: "standard",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      },
                      min: unref(minDepositAmount),
                      max: unref(maxDepositAmount),
                      size: "lg",
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "min", "max"])
                  ]),
                  _: 1
                }, 8, ["description"]),
                createVNode(_component_NuxtButton, {
                  type: "submit",
                  class: "mt-2",
                  size: "lg",
                  icon: "i-lucide-check-circle",
                  "loading-auto": ""
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Submit ")
                  ]),
                  _: 1
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtModal, {
        open: unref(open),
        "onUpdate:open": ($event) => isRef(open) ? open.value = $event : null,
        dismissible: false,
        title: "Deposit Request",
        description: "Review the details of your deposit request."
      }, {
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(transaction)) {
              _push2(`<div${_scopeId}>`);
              if (_ctx.currency.symbol === "WIRE") {
                _push2(`<div class="space-y-4"${_scopeId}><header class="flex-col-center gap-1"${_scopeId}><p class="card-title"${_scopeId}>Amount</p><h3 class="text-center text-3xl font-semibold font-geist-mono"${_scopeId}>${ssrInterpolate(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(unref(transaction).USDAmount))}</h3>`);
                _push2(ssrRenderComponent(_component_NuxtBadge, {
                  label: _ctx.currency.name,
                  variant: "soft"
                }, null, _parent2, _scopeId));
                _push2(`</header><p class="text-sm text-center"${_scopeId}> You are about to make a deposit of ${ssrInterpolate(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(unref(transaction).USDAmount))} via wire transfer. </p>`);
                _push2(ssrRenderComponent(_component_NuxtAlert, {
                  variant: "soft",
                  description: "The deposit account details will be sent to your email address, and your account will be credited once the deposit has been confirmed."
                }, null, _parent2, _scopeId));
                _push2(`<div class="flex gap-2 justify-end"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_NuxtButton, {
                  label: "Cancel",
                  color: "neutral",
                  variant: "soft",
                  size: "lg",
                  icon: "lucide-circle-x",
                  onClick: ($event) => open.value = false
                }, null, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_UserDepositCreator, {
                  transaction: unref(transaction),
                  "button-props": {
                    size: "lg",
                    label: "Proceed",
                    trailingIcon: "i-lucide-circle-arrow-right"
                  }
                }, null, _parent2, _scopeId));
                _push2(`</div></div>`);
              } else {
                _push2(`<div class="space-y-4"${_scopeId}><header class="flex-col-center gap-1"${_scopeId}><p class="card-title"${_scopeId}>Amount</p><h3 class="text-center text-3xl font-semibold font-geist-mono"${_scopeId}>${ssrInterpolate(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(unref(transaction).USDAmount))}</h3>`);
                _push2(ssrRenderComponent(_component_NuxtBadge, {
                  label: _ctx.currency.name,
                  variant: "soft"
                }, null, _parent2, _scopeId));
                _push2(`</header><div class="grid grid-cols-2 gap-4"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_NuxtFormField, { label: "Currency" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_NuxtInput, {
                        value: unref(transaction).currency,
                        readonly: "",
                        size: "lg",
                        class: "w-full"
                      }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_NuxtInput, {
                          value: unref(transaction).currency,
                          readonly: "",
                          size: "lg",
                          class: "w-full"
                        }, null, 8, ["value"])
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_NuxtFormField, {
                  label: `Rate: 1 ${unref(transaction).currency} to USD`
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_NuxtInput, {
                        value: unref(transaction).rate,
                        readonly: "",
                        size: "lg",
                        class: "w-full"
                      }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_NuxtInput, {
                          value: unref(transaction).rate,
                          readonly: "",
                          size: "lg",
                          class: "w-full"
                        }, null, 8, ["value"])
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_NuxtFormField, {
                  class: "col-span-2",
                  label: `Deposit amount in ${unref(transaction).currency}`
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_NuxtButtonGroup, { class: "w-full" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_component_NuxtInput, {
                              value: unref(transaction).amount,
                              readonly: "",
                              size: "lg",
                              class: "w-full"
                            }, null, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(_component_TextCopyButton, {
                              text: unref(transaction).amount,
                              variant: "outline"
                            }, null, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(_component_NuxtInput, {
                                value: unref(transaction).amount,
                                readonly: "",
                                size: "lg",
                                class: "w-full"
                              }, null, 8, ["value"]),
                              createVNode(_component_TextCopyButton, {
                                text: unref(transaction).amount,
                                variant: "outline"
                              }, null, 8, ["text"])
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_NuxtButtonGroup, { class: "w-full" }, {
                          default: withCtx(() => [
                            createVNode(_component_NuxtInput, {
                              value: unref(transaction).amount,
                              readonly: "",
                              size: "lg",
                              class: "w-full"
                            }, null, 8, ["value"]),
                            createVNode(_component_TextCopyButton, {
                              text: unref(transaction).amount,
                              variant: "outline"
                            }, null, 8, ["text"])
                          ]),
                          _: 1
                        })
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`</div>`);
                _push2(ssrRenderComponent(_component_NuxtAlert, {
                  variant: "soft",
                  description: `Send exactly ${unref(transaction).amount} ${unref(transaction).currency} to the wallet address provided below. Your account will be credited once the deposit has been confirmed.`
                }, null, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_NuxtFormField, { label: "Wallet address" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_NuxtButtonGroup, { class: "w-full" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_component_NuxtInput, {
                              value: _ctx.currency.walletAddress,
                              size: "lg",
                              class: "w-full"
                            }, null, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(_component_TextCopyButton, {
                              text: _ctx.currency.walletAddress,
                              variant: "outline"
                            }, null, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(_component_NuxtInput, {
                                value: _ctx.currency.walletAddress,
                                size: "lg",
                                class: "w-full"
                              }, null, 8, ["value"]),
                              createVNode(_component_TextCopyButton, {
                                text: _ctx.currency.walletAddress,
                                variant: "outline"
                              }, null, 8, ["text"])
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_NuxtButtonGroup, { class: "w-full" }, {
                          default: withCtx(() => [
                            createVNode(_component_NuxtInput, {
                              value: _ctx.currency.walletAddress,
                              size: "lg",
                              class: "w-full"
                            }, null, 8, ["value"]),
                            createVNode(_component_TextCopyButton, {
                              text: _ctx.currency.walletAddress,
                              variant: "outline"
                            }, null, 8, ["text"])
                          ]),
                          _: 1
                        })
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_NuxtFormField, { label: "Wallet address network" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_NuxtButtonGroup, { class: "w-full" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_component_NuxtInput, {
                              value: _ctx.currency.walletAddressNetwork,
                              size: "lg",
                              class: "w-full"
                            }, null, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(_component_TextCopyButton, {
                              text: _ctx.currency.walletAddressNetwork,
                              variant: "outline"
                            }, null, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(_component_NuxtInput, {
                                value: _ctx.currency.walletAddressNetwork,
                                size: "lg",
                                class: "w-full"
                              }, null, 8, ["value"]),
                              createVNode(_component_TextCopyButton, {
                                text: _ctx.currency.walletAddressNetwork,
                                variant: "outline"
                              }, null, 8, ["text"])
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_NuxtButtonGroup, { class: "w-full" }, {
                          default: withCtx(() => [
                            createVNode(_component_NuxtInput, {
                              value: _ctx.currency.walletAddressNetwork,
                              size: "lg",
                              class: "w-full"
                            }, null, 8, ["value"]),
                            createVNode(_component_TextCopyButton, {
                              text: _ctx.currency.walletAddressNetwork,
                              variant: "outline"
                            }, null, 8, ["text"])
                          ]),
                          _: 1
                        })
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`<div class="flex gap-2 justify-end"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_NuxtButton, {
                  label: "Cancel",
                  color: "neutral",
                  variant: "soft",
                  size: "lg",
                  icon: "lucide-circle-x",
                  onClick: ($event) => open.value = false
                }, null, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_UserDepositCreator, {
                  transaction: unref(transaction),
                  "button-props": {
                    size: "lg",
                    label: "Proceed",
                    trailingIcon: "i-lucide-circle-arrow-right"
                  }
                }, null, _parent2, _scopeId));
                _push2(`</div></div>`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(transaction) ? (openBlock(), createBlock("div", { key: 0 }, [
                _ctx.currency.symbol === "WIRE" ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "space-y-4"
                }, [
                  createVNode("header", { class: "flex-col-center gap-1" }, [
                    createVNode("p", { class: "card-title" }, "Amount"),
                    createVNode("h3", { class: "text-center text-3xl font-semibold font-geist-mono" }, toDisplayString(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(unref(transaction).USDAmount)), 1),
                    createVNode(_component_NuxtBadge, {
                      label: _ctx.currency.name,
                      variant: "soft"
                    }, null, 8, ["label"])
                  ]),
                  createVNode("p", { class: "text-sm text-center" }, " You are about to make a deposit of " + toDisplayString(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(unref(transaction).USDAmount)) + " via wire transfer. ", 1),
                  createVNode(_component_NuxtAlert, {
                    variant: "soft",
                    description: "The deposit account details will be sent to your email address, and your account will be credited once the deposit has been confirmed."
                  }),
                  createVNode("div", { class: "flex gap-2 justify-end" }, [
                    createVNode(_component_NuxtButton, {
                      label: "Cancel",
                      color: "neutral",
                      variant: "soft",
                      size: "lg",
                      icon: "lucide-circle-x",
                      onClick: ($event) => open.value = false
                    }, null, 8, ["onClick"]),
                    createVNode(_component_UserDepositCreator, {
                      transaction: unref(transaction),
                      "button-props": {
                        size: "lg",
                        label: "Proceed",
                        trailingIcon: "i-lucide-circle-arrow-right"
                      }
                    }, null, 8, ["transaction"])
                  ])
                ])) : (openBlock(), createBlock("div", {
                  key: 1,
                  class: "space-y-4"
                }, [
                  createVNode("header", { class: "flex-col-center gap-1" }, [
                    createVNode("p", { class: "card-title" }, "Amount"),
                    createVNode("h3", { class: "text-center text-3xl font-semibold font-geist-mono" }, toDisplayString(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(unref(transaction).USDAmount)), 1),
                    createVNode(_component_NuxtBadge, {
                      label: _ctx.currency.name,
                      variant: "soft"
                    }, null, 8, ["label"])
                  ]),
                  createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                    createVNode(_component_NuxtFormField, { label: "Currency" }, {
                      default: withCtx(() => [
                        createVNode(_component_NuxtInput, {
                          value: unref(transaction).currency,
                          readonly: "",
                          size: "lg",
                          class: "w-full"
                        }, null, 8, ["value"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_NuxtFormField, {
                      label: `Rate: 1 ${unref(transaction).currency} to USD`
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_NuxtInput, {
                          value: unref(transaction).rate,
                          readonly: "",
                          size: "lg",
                          class: "w-full"
                        }, null, 8, ["value"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    createVNode(_component_NuxtFormField, {
                      class: "col-span-2",
                      label: `Deposit amount in ${unref(transaction).currency}`
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_NuxtButtonGroup, { class: "w-full" }, {
                          default: withCtx(() => [
                            createVNode(_component_NuxtInput, {
                              value: unref(transaction).amount,
                              readonly: "",
                              size: "lg",
                              class: "w-full"
                            }, null, 8, ["value"]),
                            createVNode(_component_TextCopyButton, {
                              text: unref(transaction).amount,
                              variant: "outline"
                            }, null, 8, ["text"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["label"])
                  ]),
                  createVNode(_component_NuxtAlert, {
                    variant: "soft",
                    description: `Send exactly ${unref(transaction).amount} ${unref(transaction).currency} to the wallet address provided below. Your account will be credited once the deposit has been confirmed.`
                  }, null, 8, ["description"]),
                  createVNode(_component_NuxtFormField, { label: "Wallet address" }, {
                    default: withCtx(() => [
                      createVNode(_component_NuxtButtonGroup, { class: "w-full" }, {
                        default: withCtx(() => [
                          createVNode(_component_NuxtInput, {
                            value: _ctx.currency.walletAddress,
                            size: "lg",
                            class: "w-full"
                          }, null, 8, ["value"]),
                          createVNode(_component_TextCopyButton, {
                            text: _ctx.currency.walletAddress,
                            variant: "outline"
                          }, null, 8, ["text"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_NuxtFormField, { label: "Wallet address network" }, {
                    default: withCtx(() => [
                      createVNode(_component_NuxtButtonGroup, { class: "w-full" }, {
                        default: withCtx(() => [
                          createVNode(_component_NuxtInput, {
                            value: _ctx.currency.walletAddressNetwork,
                            size: "lg",
                            class: "w-full"
                          }, null, 8, ["value"]),
                          createVNode(_component_TextCopyButton, {
                            text: _ctx.currency.walletAddressNetwork,
                            variant: "outline"
                          }, null, 8, ["text"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "flex gap-2 justify-end" }, [
                    createVNode(_component_NuxtButton, {
                      label: "Cancel",
                      color: "neutral",
                      variant: "soft",
                      size: "lg",
                      icon: "lucide-circle-x",
                      onClick: ($event) => open.value = false
                    }, null, 8, ["onClick"]),
                    createVNode(_component_UserDepositCreator, {
                      transaction: unref(transaction),
                      "button-props": {
                        size: "lg",
                        label: "Proceed",
                        trailingIcon: "i-lucide-circle-arrow-right"
                      }
                    }, null, 8, ["transaction"])
                  ])
                ]))
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/user/deposit-form.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_3 = Object.assign(_sfc_main$1, { __name: "UserDepositForm" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "deposit",
  __ssrInlineRender: true,
  setup(__props) {
    const selectedCurrency = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UserCurrencySelect = __nuxt_component_1;
      const _component_NuxtIcon = _sfc_main$d;
      const _component_NuxtCard = _sfc_main$4;
      const _component_UserDepositForm = __nuxt_component_3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full h-full md:flex space-x-4 space-y-4 md:space-y-0" }, _attrs))}><div class="h-full max-h-96 md:max-h-[34rem] md:flex-shrink-0 overflow-y-auto w-full md:w-72 border rounded-md border-muted p-4"><header class="mb-4"><p class="card-title">Select medium</p></header>`);
      _push(ssrRenderComponent(_component_UserCurrencySelect, {
        modelValue: unref(selectedCurrency),
        "onUpdate:modelValue": ($event) => isRef(selectedCurrency) ? selectedCurrency.value = $event : null
      }, null, _parent));
      _push(`</div><div class="h-full overflow-y-auto md:flex-grow p-0.5">`);
      if (!unref(selectedCurrency)) {
        _push(`<div class="h-60 fluid flex-col-center gap-4">`);
        _push(ssrRenderComponent(_component_NuxtIcon, {
          name: "lucide-coins",
          size: "6rem",
          class: "text-muted"
        }, null, _parent));
        _push(`<p class="card-title">Select a deposit medium</p></div>`);
      } else {
        _push(ssrRenderComponent(_component_NuxtCard, null, {
          header: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<p class="text-xl font-semibold"${_scopeId}>${ssrInterpolate(unref(selectedCurrency).symbol)} Deposit </p>`);
            } else {
              return [
                createVNode("p", { class: "text-xl font-semibold" }, toDisplayString(unref(selectedCurrency).symbol) + " Deposit ", 1)
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UserDepositForm, { currency: unref(selectedCurrency) }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", null, [
                  createVNode(_component_UserDepositForm, { currency: unref(selectedCurrency) }, null, 8, ["currency"])
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/user/accounts/[accountId]/deposit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=deposit-HQeOMXci.mjs.map
