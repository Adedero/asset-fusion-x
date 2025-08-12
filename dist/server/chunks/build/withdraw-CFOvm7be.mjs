import { _ as __nuxt_component_0 } from './my-page-Cgd-8gXO.mjs';
import { _ as __nuxt_component_1 } from './currency-select-euKeACJO.mjs';
import { e as _sfc_main$d, c as _sfc_main$7$1, i as useToast } from './server.mjs';
import { _ as _sfc_main$4 } from './Card-HL6icAYQ.mjs';
import { _ as _sfc_main$1$1, a as _sfc_main$7 } from './FormField-CzZJ1-Wb.mjs';
import { _ as __nuxt_component_14 } from './fetch-error-alert-B3Gd_w4n.mjs';
import { t as toDollar } from './to-dollar-DdS_9tlH.mjs';
import { defineComponent, withAsyncContext, ref, mergeProps, unref, withCtx, isRef, createVNode, toDisplayString, createBlock, createCommentVNode, openBlock, reactive, computed, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttrs, ssrRenderSlot } from 'vue/server-renderer';
import { u as useFetch } from './fetch-DztuJ_5C.mjs';
import { _ as _sfc_main$6 } from './Badge-q_8fq56_.mjs';
import { _ as _sfc_main$5 } from './Alert-CXdXSwrA.mjs';
import { _ as _sfc_main$8 } from './InputNumber-DfQ_yysT.mjs';
import { _ as _sfc_main$9 } from './Input-BtIiAvs7.mjs';
import { _ as _sfc_main$a } from './Textarea-Q-Qlg_DC.mjs';
import { _ as _sfc_main$b } from './Modal-DefLStPx.mjs';
import { a6 as normalizeException } from '../nitro/nitro.mjs';
import z from 'zod';
import { u as useRouteData } from './use-route-data-1tNFDvd7.mjs';
import 'reka-ui';
import '@vueuse/core';
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
import '@vue/shared';

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "account-balance",
  __ssrInlineRender: true,
  props: {
    accountId: {},
    class: { default: "" }
  },
  emits: ["update"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const { pending, data, error, refresh } = useFetch(
      `/api/user/financial-accounts/${__props.accountId}`,
      {
        pick: ["balance"]
      },
      "$_MLRSPwAOe"
    );
    const update = async () => {
      await refresh();
      emit("update", data.value?.balance ?? 0);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtIcon = _sfc_main$d;
      const _component_FetchErrorAlert = __nuxt_component_14;
      const _component_NuxtButton = _sfc_main$7$1;
      if (unref(pending)) {
        _push(`<div${ssrRenderAttrs(_attrs)}>`);
        _push(ssrRenderComponent(_component_NuxtIcon, {
          name: "lucide-loader",
          class: "animate animate-spin"
        }, null, _parent));
        _push(`</div>`);
      } else if (unref(error)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex-col-center gap-2" }, _attrs))}>`);
        _push(ssrRenderComponent(_component_FetchErrorAlert, { message: "Failed to get account balance" }, null, _parent));
        _push(ssrRenderComponent(_component_NuxtButton, {
          label: "Retry",
          size: "sm",
          color: "error",
          variant: "soft",
          onClick: update
        }, null, _parent));
        _push(`</div>`);
      } else if (unref(data)) {
        _push(`<p${ssrRenderAttrs(mergeProps({ class: __props.class }, _attrs))}>${ssrInterpolate(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(unref(data).balance))}</p>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/user/account-balance.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main$3, { __name: "UserAccountBalance" });
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "withdrawal-creator",
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
      const _component_NuxtButton = _sfc_main$7$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "cursor-pointer" }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, () => {
        _push(ssrRenderComponent(_component_NuxtButton, mergeProps(_ctx.buttonProps, { loading: unref(loading) }), null, _parent));
      }, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/user/withdrawal-creator.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_11 = Object.assign(_sfc_main$2, { __name: "UserWithdrawalCreator" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "withdrawal-form",
  __ssrInlineRender: true,
  props: {
    currency: {}
  },
  setup(__props) {
    const accountId = useRouteData().getParams("accountId");
    const accountBalance = ref(0);
    const schema = z.object({
      amount: z.number({ message: "Amount is required" }),
      walletAddress: z.string({ message: "Invalid wallet address" }).optional(),
      walletAddressNetwork: z.string({ message: "Invalid wallet address network" }).optional(),
      accountNumber: z.string({ message: "Invalid account number" }).optional(),
      bank: z.string({ message: "Invalid bank" }).optional(),
      description: z.string({ message: "Invalid description" }).optional()
    });
    const state = reactive({
      amount: 0
    });
    const hasEnoughBalance = computed(() => {
      return accountBalance.value > 0 && accountBalance.value - state.amount >= (__props.currency.withdrawalCharge ?? 0);
    });
    const disabled = computed(() => {
      if (__props.currency.symbol === "WIRE") {
        return !state.amount || !state.bank || !state.accountNumber;
      }
      return !state.amount || !state.walletAddress;
    });
    const reset = () => {
      state.amount = 0;
      state.bank = void 0;
      state.accountNumber = void 0;
      state.walletAddress = void 0;
      state.walletAddressNetwork = void 0;
      state.description = void 0;
    };
    const transaction = ref(null);
    const open = ref(false);
    const withdrawalInitError = ref(null);
    const handleFormSubmit = async (event) => {
      const { amount } = event.data;
      if (!amount || !hasEnoughBalance.value || disabled.value) {
        return;
      }
      if (__props.currency.symbol === "WIRE") {
        transaction.value = {
          financialAccountId: accountId,
          amount: amount / (__props.currency.rate ?? 1),
          currency: "USD",
          USDAmount: amount,
          rate: __props.currency.rate,
          type: "withdrawal",
          charges: __props.currency.withdrawalCharge ?? 0,
          bank: state.bank,
          accountNumber: state.accountNumber,
          description: state.description
        };
        open.value = true;
        return;
      }
      try {
        const data = await $fetch("/api/user/transactions/init-withdrawal", {
          query: { symbol: __props.currency.symbol, amount }
        });
        transaction.value = {
          financialAccountId: accountId,
          amount: data.currencyDepositAmount,
          currency: data.currency.symbol,
          USDAmount: amount,
          rate: data.currency.rate,
          type: "withdrawal",
          charges: __props.currency.withdrawalCharge,
          withdrawalWalletAddress: state.walletAddress,
          withdrawalWalletAddressNetwork: state.walletAddressNetwork,
          description: state.description
        };
        open.value = true;
        reset();
      } catch (error) {
        withdrawalInitError.value = normalizeException(error);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtForm = _sfc_main$1$1;
      const _component_FetchErrorAlert = __nuxt_component_14;
      const _component_UserAccountBalance = __nuxt_component_2;
      const _component_NuxtBadge = _sfc_main$6;
      const _component_NuxtAlert = _sfc_main$5;
      const _component_NuxtFormField = _sfc_main$7;
      const _component_NuxtInputNumber = _sfc_main$8;
      const _component_NuxtInput = _sfc_main$9;
      const _component_NuxtTextarea = _sfc_main$a;
      const _component_NuxtButton = _sfc_main$7$1;
      const _component_NuxtModal = _sfc_main$b;
      const _component_UserWithdrawalCreator = __nuxt_component_11;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_NuxtForm, {
        state: unref(state),
        schema: unref(schema),
        onSubmit: handleFormSubmit
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-4"${_scopeId}>`);
            if (unref(withdrawalInitError)) {
              _push2(`<div${_scopeId}>`);
              _push2(ssrRenderComponent(_component_FetchErrorAlert, {
                message: unref(withdrawalInitError).message
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="flex-col-center gap-2 fluid"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UserAccountBalance, {
              ref: "account-balance-component",
              "account-id": unref(accountId),
              class: "text-3xl font-medium font-geist-mono",
              onUpdate: (balance) => accountBalance.value = balance
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_NuxtBadge, {
              label: "Account Balance",
              variant: "outline"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            if (!unref(hasEnoughBalance)) {
              _push2(ssrRenderComponent(_component_NuxtAlert, {
                color: "error",
                variant: "soft",
                description: "You do not have sufficient balance to complete this transaction."
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="grid md:grid-cols-2 gap-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtFormField, {
              name: "amount",
              label: "Enter the deposit amount",
              required: "",
              description: `Charges: ${("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(
                _ctx.currency.withdrawalCharge ?? 0
              )}`,
              class: "md:col-span-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_NuxtInputNumber, {
                    modelValue: unref(state).amount,
                    "onUpdate:modelValue": ($event) => unref(state).amount = $event,
                    "format-options": {
                      style: "currency",
                      currency: "USD",
                      currencyDisplay: "symbol",
                      currencySign: "standard",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    },
                    size: "lg",
                    class: "w-full"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_NuxtInputNumber, {
                      modelValue: unref(state).amount,
                      "onUpdate:modelValue": ($event) => unref(state).amount = $event,
                      "format-options": {
                        style: "currency",
                        currency: "USD",
                        currencyDisplay: "symbol",
                        currencySign: "standard",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      },
                      size: "lg",
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (_ctx.currency.symbol !== "WIRE") {
              _push2(ssrRenderComponent(_component_NuxtFormField, {
                name: "walletAddress",
                label: "Wallet address",
                required: ""
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_NuxtInput, {
                      modelValue: unref(state).walletAddress,
                      "onUpdate:modelValue": ($event) => unref(state).walletAddress = $event,
                      size: "lg",
                      class: "w-full"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_NuxtInput, {
                        modelValue: unref(state).walletAddress,
                        "onUpdate:modelValue": ($event) => unref(state).walletAddress = $event,
                        size: "lg",
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (_ctx.currency.symbol !== "WIRE") {
              _push2(ssrRenderComponent(_component_NuxtFormField, {
                name: "walletAddressNetwork",
                label: "Wallet address network"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_NuxtInput, {
                      modelValue: unref(state).walletAddressNetwork,
                      "onUpdate:modelValue": ($event) => unref(state).walletAddressNetwork = $event,
                      size: "lg",
                      class: "w-full"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_NuxtInput, {
                        modelValue: unref(state).walletAddressNetwork,
                        "onUpdate:modelValue": ($event) => unref(state).walletAddressNetwork = $event,
                        size: "lg",
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (_ctx.currency.symbol === "WIRE") {
              _push2(ssrRenderComponent(_component_NuxtFormField, {
                name: "bank",
                label: "Bank name",
                required: ""
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_NuxtInput, {
                      modelValue: unref(state).bank,
                      "onUpdate:modelValue": ($event) => unref(state).bank = $event,
                      size: "lg",
                      class: "w-full"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_NuxtInput, {
                        modelValue: unref(state).bank,
                        "onUpdate:modelValue": ($event) => unref(state).bank = $event,
                        size: "lg",
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (_ctx.currency.symbol === "WIRE") {
              _push2(ssrRenderComponent(_component_NuxtFormField, {
                name: "accountNumber",
                label: "Account number",
                required: ""
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_NuxtInput, {
                      modelValue: unref(state).accountNumber,
                      "onUpdate:modelValue": ($event) => unref(state).accountNumber = $event,
                      size: "lg",
                      class: "w-full"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_NuxtInput, {
                        modelValue: unref(state).accountNumber,
                        "onUpdate:modelValue": ($event) => unref(state).accountNumber = $event,
                        size: "lg",
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_component_NuxtFormField, {
              name: "description",
              label: "Description",
              description: "Add an optional description to your withdrawal request",
              class: "md:col-span-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_NuxtTextarea, {
                    modelValue: unref(state).description,
                    "onUpdate:modelValue": ($event) => unref(state).description = $event,
                    size: "lg",
                    class: "w-full",
                    rows: 3
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_NuxtTextarea, {
                      modelValue: unref(state).description,
                      "onUpdate:modelValue": ($event) => unref(state).description = $event,
                      size: "lg",
                      class: "w-full",
                      rows: 3
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_component_NuxtButton, {
              type: "submit",
              class: "mt-2",
              size: "lg",
              icon: "i-lucide-check-circle",
              "loading-auto": "",
              disabled: !unref(hasEnoughBalance) || unref(disabled)
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
                unref(withdrawalInitError) ? (openBlock(), createBlock("div", { key: 0 }, [
                  createVNode(_component_FetchErrorAlert, {
                    message: unref(withdrawalInitError).message
                  }, null, 8, ["message"])
                ])) : createCommentVNode("", true),
                createVNode("div", { class: "flex-col-center gap-2 fluid" }, [
                  createVNode(_component_UserAccountBalance, {
                    ref: "account-balance-component",
                    "account-id": unref(accountId),
                    class: "text-3xl font-medium font-geist-mono",
                    onUpdate: (balance) => accountBalance.value = balance
                  }, null, 8, ["account-id", "onUpdate"]),
                  createVNode(_component_NuxtBadge, {
                    label: "Account Balance",
                    variant: "outline"
                  })
                ]),
                !unref(hasEnoughBalance) ? (openBlock(), createBlock(_component_NuxtAlert, {
                  key: 1,
                  color: "error",
                  variant: "soft",
                  description: "You do not have sufficient balance to complete this transaction."
                })) : createCommentVNode("", true),
                createVNode("div", { class: "grid md:grid-cols-2 gap-4" }, [
                  createVNode(_component_NuxtFormField, {
                    name: "amount",
                    label: "Enter the deposit amount",
                    required: "",
                    description: `Charges: ${("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(
                      _ctx.currency.withdrawalCharge ?? 0
                    )}`,
                    class: "md:col-span-2"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_NuxtInputNumber, {
                        modelValue: unref(state).amount,
                        "onUpdate:modelValue": ($event) => unref(state).amount = $event,
                        "format-options": {
                          style: "currency",
                          currency: "USD",
                          currencyDisplay: "symbol",
                          currencySign: "standard",
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        },
                        size: "lg",
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }, 8, ["description"]),
                  _ctx.currency.symbol !== "WIRE" ? (openBlock(), createBlock(_component_NuxtFormField, {
                    key: 0,
                    name: "walletAddress",
                    label: "Wallet address",
                    required: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_NuxtInput, {
                        modelValue: unref(state).walletAddress,
                        "onUpdate:modelValue": ($event) => unref(state).walletAddress = $event,
                        size: "lg",
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  _ctx.currency.symbol !== "WIRE" ? (openBlock(), createBlock(_component_NuxtFormField, {
                    key: 1,
                    name: "walletAddressNetwork",
                    label: "Wallet address network"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_NuxtInput, {
                        modelValue: unref(state).walletAddressNetwork,
                        "onUpdate:modelValue": ($event) => unref(state).walletAddressNetwork = $event,
                        size: "lg",
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  _ctx.currency.symbol === "WIRE" ? (openBlock(), createBlock(_component_NuxtFormField, {
                    key: 2,
                    name: "bank",
                    label: "Bank name",
                    required: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_NuxtInput, {
                        modelValue: unref(state).bank,
                        "onUpdate:modelValue": ($event) => unref(state).bank = $event,
                        size: "lg",
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  _ctx.currency.symbol === "WIRE" ? (openBlock(), createBlock(_component_NuxtFormField, {
                    key: 3,
                    name: "accountNumber",
                    label: "Account number",
                    required: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_NuxtInput, {
                        modelValue: unref(state).accountNumber,
                        "onUpdate:modelValue": ($event) => unref(state).accountNumber = $event,
                        size: "lg",
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  createVNode(_component_NuxtFormField, {
                    name: "description",
                    label: "Description",
                    description: "Add an optional description to your withdrawal request",
                    class: "md:col-span-2"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_NuxtTextarea, {
                        modelValue: unref(state).description,
                        "onUpdate:modelValue": ($event) => unref(state).description = $event,
                        size: "lg",
                        class: "w-full",
                        rows: 3
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  })
                ]),
                createVNode(_component_NuxtButton, {
                  type: "submit",
                  class: "mt-2",
                  size: "lg",
                  icon: "i-lucide-check-circle",
                  "loading-auto": "",
                  disabled: !unref(hasEnoughBalance) || unref(disabled)
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Submit ")
                  ]),
                  _: 1
                }, 8, ["disabled"])
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
        title: "Withdrawal Request",
        description: "Review the details of your withdrawal request."
      }, {
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(transaction)) {
              _push2(`<div${_scopeId}><div class="space-y-4"${_scopeId}><header class="flex-col-center gap-1"${_scopeId}><p class="card-title"${_scopeId}>Amount</p><h3 class="text-center text-3xl font-semibold font-geist-mono"${_scopeId}>${ssrInterpolate(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(unref(transaction).USDAmount))}</h3>`);
              _push2(ssrRenderComponent(_component_NuxtBadge, {
                label: _ctx.currency.name,
                variant: "soft"
              }, null, _parent2, _scopeId));
              _push2(`<p class="text-muted text-sm text-center mt-2"${_scopeId}> Charges: ${ssrInterpolate(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(unref(transaction).charges))}</p></header><div class="grid md:grid-cols-2 gap-4"${_scopeId}>`);
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
                class: "md:col-span-2",
                label: `Withdrawal amount in ${unref(transaction).currency}`
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_NuxtInput, {
                      value: unref(transaction).amount,
                      readonly: "",
                      size: "lg",
                      class: "w-full"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_NuxtInput, {
                        value: unref(transaction).amount,
                        readonly: "",
                        size: "lg",
                        class: "w-full"
                      }, null, 8, ["value"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_NuxtAlert, {
                class: "md:col-span-2",
                variant: "soft",
                description: `${unref(transaction).amount} ${unref(transaction).currency} will be sent to your provided account details within 24 hours.`
              }, null, _parent2, _scopeId));
              if (_ctx.currency.symbol === "WIRE") {
                _push2(`<div class="contents"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_NuxtFormField, { label: "Bank" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_NuxtInput, {
                        value: unref(transaction).bank,
                        size: "lg",
                        class: "w-full",
                        readonly: ""
                      }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_NuxtInput, {
                          value: unref(transaction).bank,
                          size: "lg",
                          class: "w-full",
                          readonly: ""
                        }, null, 8, ["value"])
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_NuxtFormField, { label: "Account number" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_NuxtInput, {
                        value: unref(transaction).accountNumber,
                        size: "lg",
                        class: "w-full",
                        readonly: ""
                      }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_NuxtInput, {
                          value: unref(transaction).accountNumber,
                          size: "lg",
                          class: "w-full",
                          readonly: ""
                        }, null, 8, ["value"])
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                _push2(`<div class="contents"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_NuxtFormField, { label: "Wallet address" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_NuxtInput, {
                        value: unref(transaction).withdrawalWalletAddress,
                        size: "lg",
                        class: "w-full",
                        readonly: ""
                      }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_NuxtInput, {
                          value: unref(transaction).withdrawalWalletAddress,
                          size: "lg",
                          class: "w-full",
                          readonly: ""
                        }, null, 8, ["value"])
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_NuxtFormField, { label: "Wallet address network" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_NuxtInput, {
                        value: unref(transaction).withdrawalWalletAddressNetwork,
                        size: "lg",
                        class: "w-full",
                        readonly: ""
                      }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_NuxtInput, {
                          value: unref(transaction).withdrawalWalletAddressNetwork,
                          size: "lg",
                          class: "w-full",
                          readonly: ""
                        }, null, 8, ["value"])
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`</div>`);
              }
              if (unref(transaction).description) {
                _push2(ssrRenderComponent(_component_NuxtFormField, {
                  label: "Description",
                  class: "md:col-span-2"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_NuxtTextarea, {
                        value: unref(transaction).description,
                        size: "lg",
                        class: "w-full resize-none",
                        readonly: ""
                      }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_NuxtTextarea, {
                          value: unref(transaction).description,
                          size: "lg",
                          class: "w-full resize-none",
                          readonly: ""
                        }, null, 8, ["value"])
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="w-full flex gap-2 justify-end"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_NuxtButton, {
                label: "Cancel",
                color: "neutral",
                variant: "soft",
                size: "lg",
                icon: "lucide-circle-x",
                onClick: ($event) => open.value = false
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UserWithdrawalCreator, {
                transaction: unref(transaction),
                "button-props": {
                  size: "lg",
                  label: "Proceed",
                  trailingIcon: "i-lucide-circle-arrow-right"
                }
              }, null, _parent2, _scopeId));
              _push2(`</div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(transaction) ? (openBlock(), createBlock("div", { key: 0 }, [
                createVNode("div", { class: "space-y-4" }, [
                  createVNode("header", { class: "flex-col-center gap-1" }, [
                    createVNode("p", { class: "card-title" }, "Amount"),
                    createVNode("h3", { class: "text-center text-3xl font-semibold font-geist-mono" }, toDisplayString(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(unref(transaction).USDAmount)), 1),
                    createVNode(_component_NuxtBadge, {
                      label: _ctx.currency.name,
                      variant: "soft"
                    }, null, 8, ["label"]),
                    createVNode("p", { class: "text-muted text-sm text-center mt-2" }, " Charges: " + toDisplayString(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(unref(transaction).charges)), 1)
                  ]),
                  createVNode("div", { class: "grid md:grid-cols-2 gap-4" }, [
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
                      class: "md:col-span-2",
                      label: `Withdrawal amount in ${unref(transaction).currency}`
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_NuxtInput, {
                          value: unref(transaction).amount,
                          readonly: "",
                          size: "lg",
                          class: "w-full"
                        }, null, 8, ["value"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    createVNode(_component_NuxtAlert, {
                      class: "md:col-span-2",
                      variant: "soft",
                      description: `${unref(transaction).amount} ${unref(transaction).currency} will be sent to your provided account details within 24 hours.`
                    }, null, 8, ["description"]),
                    _ctx.currency.symbol === "WIRE" ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "contents"
                    }, [
                      createVNode(_component_NuxtFormField, { label: "Bank" }, {
                        default: withCtx(() => [
                          createVNode(_component_NuxtInput, {
                            value: unref(transaction).bank,
                            size: "lg",
                            class: "w-full",
                            readonly: ""
                          }, null, 8, ["value"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_NuxtFormField, { label: "Account number" }, {
                        default: withCtx(() => [
                          createVNode(_component_NuxtInput, {
                            value: unref(transaction).accountNumber,
                            size: "lg",
                            class: "w-full",
                            readonly: ""
                          }, null, 8, ["value"])
                        ]),
                        _: 1
                      })
                    ])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "contents"
                    }, [
                      createVNode(_component_NuxtFormField, { label: "Wallet address" }, {
                        default: withCtx(() => [
                          createVNode(_component_NuxtInput, {
                            value: unref(transaction).withdrawalWalletAddress,
                            size: "lg",
                            class: "w-full",
                            readonly: ""
                          }, null, 8, ["value"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_NuxtFormField, { label: "Wallet address network" }, {
                        default: withCtx(() => [
                          createVNode(_component_NuxtInput, {
                            value: unref(transaction).withdrawalWalletAddressNetwork,
                            size: "lg",
                            class: "w-full",
                            readonly: ""
                          }, null, 8, ["value"])
                        ]),
                        _: 1
                      })
                    ])),
                    unref(transaction).description ? (openBlock(), createBlock(_component_NuxtFormField, {
                      key: 2,
                      label: "Description",
                      class: "md:col-span-2"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_NuxtTextarea, {
                          value: unref(transaction).description,
                          size: "lg",
                          class: "w-full resize-none",
                          readonly: ""
                        }, null, 8, ["value"])
                      ]),
                      _: 1
                    })) : createCommentVNode("", true)
                  ]),
                  createVNode("div", { class: "w-full flex gap-2 justify-end" }, [
                    createVNode(_component_NuxtButton, {
                      label: "Cancel",
                      color: "neutral",
                      variant: "soft",
                      size: "lg",
                      icon: "lucide-circle-x",
                      onClick: ($event) => open.value = false
                    }, null, 8, ["onClick"]),
                    createVNode(_component_UserWithdrawalCreator, {
                      transaction: unref(transaction),
                      "button-props": {
                        size: "lg",
                        label: "Proceed",
                        trailingIcon: "i-lucide-circle-arrow-right"
                      }
                    }, null, 8, ["transaction"])
                  ])
                ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/user/withdrawal-form.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_4 = Object.assign(_sfc_main$1, { __name: "UserWithdrawalForm" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "withdraw",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/settings", {
      key: "settings"
    }, "$e0BQhje86s")), __temp = await __temp, __restore(), __temp);
    const selectedCurrency = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MyPage = __nuxt_component_0;
      const _component_UserCurrencySelect = __nuxt_component_1;
      const _component_NuxtIcon = _sfc_main$d;
      const _component_NuxtCard = _sfc_main$4;
      const _component_UserWithdrawalForm = __nuxt_component_4;
      const _component_NuxtAlert = _sfc_main$5;
      _push(ssrRenderComponent(_component_MyPage, mergeProps({
        error: unref(error),
        onRefresh: ($event) => unref(refresh)()
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(data)) {
              _push2(`<div${_scopeId}>`);
              if (unref(data).allowWithdrawals) {
                _push2(`<div class="w-full h-full md:flex space-x-4 space-y-4 md:space-y-0"${_scopeId}><div class="h-full max-h-96 md:max-h-[34rem] md:flex-shrink-0 overflow-y-auto w-full md:w-72 border rounded-md border-muted p-4"${_scopeId}><header class="mb-4"${_scopeId}><p class="card-title"${_scopeId}>Select medium</p></header>`);
                _push2(ssrRenderComponent(_component_UserCurrencySelect, {
                  modelValue: unref(selectedCurrency),
                  "onUpdate:modelValue": ($event) => isRef(selectedCurrency) ? selectedCurrency.value = $event : null,
                  "only-withdrawal-currencies": true
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="h-full overflow-y-auto md:flex-grow p-0.5"${_scopeId}>`);
                if (!unref(selectedCurrency)) {
                  _push2(`<div class="h-60 fluid flex-col-center gap-4"${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_NuxtIcon, {
                    name: "lucide-coins",
                    size: "6rem",
                    class: "text-muted"
                  }, null, _parent2, _scopeId));
                  _push2(`<p class="card-title"${_scopeId}>Select a withdrawal medium</p></div>`);
                } else {
                  _push2(ssrRenderComponent(_component_NuxtCard, null, {
                    header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`<p class="text-xl font-semibold"${_scopeId2}>${ssrInterpolate(unref(selectedCurrency).symbol)} Withdrawal </p>`);
                      } else {
                        return [
                          createVNode("p", { class: "text-xl font-semibold" }, toDisplayString(unref(selectedCurrency).symbol) + " Withdrawal ", 1)
                        ];
                      }
                    }),
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`<div${_scopeId2}>`);
                        _push3(ssrRenderComponent(_component_UserWithdrawalForm, { currency: unref(selectedCurrency) }, null, _parent3, _scopeId2));
                        _push3(`</div>`);
                      } else {
                        return [
                          createVNode("div", null, [
                            createVNode(_component_UserWithdrawalForm, { currency: unref(selectedCurrency) }, null, 8, ["currency"])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent2, _scopeId));
                }
                _push2(`</div></div>`);
              } else {
                _push2(`<div${_scopeId}>`);
                _push2(ssrRenderComponent(_component_NuxtAlert, {
                  color: "error",
                  variant: "subtle",
                  icon: "lucide-alert-circle",
                  title: "Withdrawal Alert",
                  description: "Withdrawal are not allowed at this time. Please, check back later."
                }, null, _parent2, _scopeId));
                _push2(`</div>`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(data) ? (openBlock(), createBlock("div", { key: 0 }, [
                unref(data).allowWithdrawals ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "w-full h-full md:flex space-x-4 space-y-4 md:space-y-0"
                }, [
                  createVNode("div", { class: "h-full max-h-96 md:max-h-[34rem] md:flex-shrink-0 overflow-y-auto w-full md:w-72 border rounded-md border-muted p-4" }, [
                    createVNode("header", { class: "mb-4" }, [
                      createVNode("p", { class: "card-title" }, "Select medium")
                    ]),
                    createVNode(_component_UserCurrencySelect, {
                      modelValue: unref(selectedCurrency),
                      "onUpdate:modelValue": ($event) => isRef(selectedCurrency) ? selectedCurrency.value = $event : null,
                      "only-withdrawal-currencies": true
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "h-full overflow-y-auto md:flex-grow p-0.5" }, [
                    !unref(selectedCurrency) ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "h-60 fluid flex-col-center gap-4"
                    }, [
                      createVNode(_component_NuxtIcon, {
                        name: "lucide-coins",
                        size: "6rem",
                        class: "text-muted"
                      }),
                      createVNode("p", { class: "card-title" }, "Select a withdrawal medium")
                    ])) : (openBlock(), createBlock(_component_NuxtCard, { key: 1 }, {
                      header: withCtx(() => [
                        createVNode("p", { class: "text-xl font-semibold" }, toDisplayString(unref(selectedCurrency).symbol) + " Withdrawal ", 1)
                      ]),
                      default: withCtx(() => [
                        createVNode("div", null, [
                          createVNode(_component_UserWithdrawalForm, { currency: unref(selectedCurrency) }, null, 8, ["currency"])
                        ])
                      ]),
                      _: 1
                    }))
                  ])
                ])) : (openBlock(), createBlock("div", { key: 1 }, [
                  createVNode(_component_NuxtAlert, {
                    color: "error",
                    variant: "subtle",
                    icon: "lucide-alert-circle",
                    title: "Withdrawal Alert",
                    description: "Withdrawal are not allowed at this time. Please, check back later."
                  })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/user/accounts/[accountId]/withdraw.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=withdraw-CFOvm7be.mjs.map
