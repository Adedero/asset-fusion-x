import { _ as __nuxt_component_0 } from './my-page-BmNXHC6r.mjs';
import { j as useConfirm, g as useToast, b as _sfc_main$a, k as _sfc_main$d, h as _sfc_main$4 } from './server.mjs';
import { _ as __nuxt_component_5, a as __nuxt_component_6, b as __nuxt_component_7, c as __nuxt_component_8, d as __nuxt_component_9$1, e as __nuxt_component_1 } from './v-table-cell-BRZ0KuYt.mjs';
import { _ as _sfc_main$2 } from './Badge-4IrPO892.mjs';
import { _ as _sfc_main$3 } from './Form-BhNutJZb.mjs';
import { _ as _sfc_main$5 } from './FormField-DYdB-maE.mjs';
import { _ as _sfc_main$6 } from './Input-CFyDl-v5.mjs';
import { _ as _sfc_main$7 } from './Switch-1YWsssdB.mjs';
import { defineComponent, ref, withAsyncContext, computed, mergeProps, unref, withCtx, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, createVNode, isRef, createCommentVNode, useModel, watch, withModifiers, mergeModels, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { c as currencySchema } from '../_/currency.mjs';
import { a8 as normalizeException } from '../_/nitro.mjs';
import { u as useFetch } from './fetch-DepCZJYO.mjs';
import './fetch-error-alert-Cos-JGNP.mjs';
import './Alert-9mK7K0n2.mjs';
import 'reka-ui';
import 'vue-router';
import 'better-auth/vue';
import 'better-auth/client/plugins';
import 'tailwindcss/colors';
import '@iconify/vue';
import '@vueuse/core';
import 'tailwind-variants';
import '@iconify/utils/lib/css/icon';
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
import 'zod';
import '@vue/shared';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "currency-manager",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    currency: {}
  }, {
    "open": { type: Boolean, ...{ default: false } },
    "openModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["done"], ["update:open"]),
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const toast = useToast();
    const isEditing = computed(() => !!__props.currency);
    const open = useModel(__props, "open");
    const state = ref(Object.assign({}, __props.currency));
    watch(
      () => __props.currency,
      (value) => {
        if (value) {
          state.value = { ...value };
        } else {
          state.value = {};
        }
      },
      { immediate: true }
    );
    const handleSubmit = async (event) => {
      if (__props.currency) {
        if (state.value.rate !== __props.currency.rate) {
          state.value.rateUpdatedAt = (/* @__PURE__ */ new Date()).toISOString();
        }
      } else {
        state.value.rateUpdatedAt = (/* @__PURE__ */ new Date()).toISOString();
      }
      try {
        if (isEditing.value && !state.value.id) {
          throw new Error("Missing currency ID for editing");
        }
        let message = "";
        if (isEditing.value) {
          const res = await $fetch(`/api/admin/currencies/${state.value.id}`, {
            method: "PUT",
            body: event.data
          });
          message = res.message;
        } else {
          const res = await $fetch(`/api/admin/currencies`, {
            method: "POST",
            body: event.data
          });
          message = res.message;
        }
        toast.add({
          color: "success",
          title: "Success",
          description: message
        });
        emit("done");
        open.value = false;
      } catch (e) {
        toast.add({
          color: "error",
          title: "Error",
          description: normalizeException(e).message
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtModal = _sfc_main$4;
      const _component_NuxtForm = _sfc_main$3;
      const _component_NuxtFormField = _sfc_main$5;
      const _component_NuxtInput = _sfc_main$6;
      const _component_NuxtSwitch = _sfc_main$7;
      const _component_NuxtButton = _sfc_main$a;
      _push(ssrRenderComponent(_component_NuxtModal, mergeProps({
        open: open.value,
        "onUpdate:open": ($event) => open.value = $event,
        title: `${unref(isEditing) ? "Edit" : "New"} Currency`,
        dismissible: false
      }, _attrs), {
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtForm, {
              state: unref(state),
              schema: unref(currencySchema),
              onSubmit: handleSubmit
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="grid md:grid-cols-2 gap-x-2 gap-y-5"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_NuxtFormField, {
                    name: "name",
                    label: "Name",
                    required: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_NuxtInput, {
                          modelValue: unref(state).name,
                          "onUpdate:modelValue": ($event) => unref(state).name = $event,
                          class: "w-full"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_NuxtInput, {
                            modelValue: unref(state).name,
                            "onUpdate:modelValue": ($event) => unref(state).name = $event,
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_NuxtFormField, {
                    name: "symbol",
                    label: "Symbol",
                    required: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_NuxtInput, {
                          modelValue: unref(state).symbol,
                          "onUpdate:modelValue": ($event) => unref(state).symbol = $event,
                          class: "w-full"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_NuxtInput, {
                            modelValue: unref(state).symbol,
                            "onUpdate:modelValue": ($event) => unref(state).symbol = $event,
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_NuxtFormField, {
                    name: "allowDeposit",
                    class: "border border-accented rounded-lg p-4 md:col-span-2"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex items-center justify-between gap-2"${_scopeId3}><p${_scopeId3}>Allow deposits with this currency</p>`);
                        _push4(ssrRenderComponent(_component_NuxtSwitch, {
                          modelValue: unref(state).allowDeposit,
                          "onUpdate:modelValue": ($event) => unref(state).allowDeposit = $event
                        }, null, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex items-center justify-between gap-2" }, [
                            createVNode("p", null, "Allow deposits with this currency"),
                            createVNode(_component_NuxtSwitch, {
                              modelValue: unref(state).allowDeposit,
                              "onUpdate:modelValue": ($event) => unref(state).allowDeposit = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_NuxtFormField, {
                    name: "allowWithdrawal",
                    class: "border border-accented rounded-lg p-4 md:col-span-2"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex items-center justify-between gap-2"${_scopeId3}><p${_scopeId3}>Allow withdrawals with this currency</p>`);
                        _push4(ssrRenderComponent(_component_NuxtSwitch, {
                          modelValue: unref(state).allowWithdrawal,
                          "onUpdate:modelValue": ($event) => unref(state).allowWithdrawal = $event
                        }, null, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex items-center justify-between gap-2" }, [
                            createVNode("p", null, "Allow withdrawals with this currency"),
                            createVNode(_component_NuxtSwitch, {
                              modelValue: unref(state).allowWithdrawal,
                              "onUpdate:modelValue": ($event) => unref(state).allowWithdrawal = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_NuxtFormField, {
                    name: "rate",
                    label: `Rate (1 ${unref(state).symbol || "CUR"} to USD)`,
                    required: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_NuxtInput, {
                          modelValue: unref(state).rate,
                          "onUpdate:modelValue": ($event) => unref(state).rate = $event,
                          class: "w-full"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_NuxtInput, {
                            modelValue: unref(state).rate,
                            "onUpdate:modelValue": ($event) => unref(state).rate = $event,
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_NuxtFormField, {
                    name: "withdrawalCharge",
                    label: "Withdrawal Charge (USD)"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_NuxtInput, {
                          modelValue: unref(state).withdrawalCharge,
                          "onUpdate:modelValue": ($event) => unref(state).withdrawalCharge = $event,
                          class: "w-full"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_NuxtInput, {
                            modelValue: unref(state).withdrawalCharge,
                            "onUpdate:modelValue": ($event) => unref(state).withdrawalCharge = $event,
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_NuxtFormField, {
                    name: "automaticallyUpdateRate",
                    class: "border border-accented rounded-lg p-4 md:col-span-2"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex items-center justify-between gap-2"${_scopeId3}><p${_scopeId3}>Automatically update rate</p>`);
                        _push4(ssrRenderComponent(_component_NuxtSwitch, {
                          modelValue: unref(state).automaticallyUpdateRate,
                          "onUpdate:modelValue": ($event) => unref(state).automaticallyUpdateRate = $event
                        }, null, _parent4, _scopeId3));
                        _push4(`</div><p class="text-xs text-muted mt-1"${_scopeId3}> If checked, the current rate will be automatically fetched and updated every 24 hours </p>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex items-center justify-between gap-2" }, [
                            createVNode("p", null, "Automatically update rate"),
                            createVNode(_component_NuxtSwitch, {
                              modelValue: unref(state).automaticallyUpdateRate,
                              "onUpdate:modelValue": ($event) => unref(state).automaticallyUpdateRate = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("p", { class: "text-xs text-muted mt-1" }, " If checked, the current rate will be automatically fetched and updated every 24 hours ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_NuxtFormField, {
                    name: "walletAddress",
                    label: "Wallet Address for Deposits",
                    required: "",
                    class: "md:col-span-2"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_NuxtInput, {
                          modelValue: unref(state).walletAddress,
                          "onUpdate:modelValue": ($event) => unref(state).walletAddress = $event,
                          class: "w-full"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_NuxtInput, {
                            modelValue: unref(state).walletAddress,
                            "onUpdate:modelValue": ($event) => unref(state).walletAddress = $event,
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_NuxtFormField, {
                    name: "walletAddressNetwork",
                    label: "Wallet Address Network (optional)",
                    class: "md:col-span-2"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_NuxtInput, {
                          modelValue: unref(state).walletAddressNetwork,
                          "onUpdate:modelValue": ($event) => unref(state).walletAddressNetwork = $event,
                          class: "w-full"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_NuxtInput, {
                            modelValue: unref(state).walletAddressNetwork,
                            "onUpdate:modelValue": ($event) => unref(state).walletAddressNetwork = $event,
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_NuxtFormField, {
                    name: "image",
                    label: "Image URL (optional)",
                    class: "md:col-span-2"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_NuxtInput, {
                          modelValue: unref(state).image,
                          "onUpdate:modelValue": ($event) => unref(state).image = $event,
                          class: "w-full"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_NuxtInput, {
                            modelValue: unref(state).image,
                            "onUpdate:modelValue": ($event) => unref(state).image = $event,
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="flex items-center justify-end gap-2 md:col-span-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_NuxtButton, {
                    color: "neutral",
                    variant: "soft",
                    label: "Cancel",
                    onClick: ($event) => open.value = false
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_NuxtButton, {
                    type: "submit",
                    label: "Submit",
                    "loading-auto": ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "grid md:grid-cols-2 gap-x-2 gap-y-5" }, [
                      createVNode(_component_NuxtFormField, {
                        name: "name",
                        label: "Name",
                        required: ""
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_NuxtInput, {
                            modelValue: unref(state).name,
                            "onUpdate:modelValue": ($event) => unref(state).name = $event,
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_NuxtFormField, {
                        name: "symbol",
                        label: "Symbol",
                        required: ""
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_NuxtInput, {
                            modelValue: unref(state).symbol,
                            "onUpdate:modelValue": ($event) => unref(state).symbol = $event,
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_NuxtFormField, {
                        name: "allowDeposit",
                        class: "border border-accented rounded-lg p-4 md:col-span-2"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "flex items-center justify-between gap-2" }, [
                            createVNode("p", null, "Allow deposits with this currency"),
                            createVNode(_component_NuxtSwitch, {
                              modelValue: unref(state).allowDeposit,
                              "onUpdate:modelValue": ($event) => unref(state).allowDeposit = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_NuxtFormField, {
                        name: "allowWithdrawal",
                        class: "border border-accented rounded-lg p-4 md:col-span-2"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "flex items-center justify-between gap-2" }, [
                            createVNode("p", null, "Allow withdrawals with this currency"),
                            createVNode(_component_NuxtSwitch, {
                              modelValue: unref(state).allowWithdrawal,
                              "onUpdate:modelValue": ($event) => unref(state).allowWithdrawal = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_NuxtFormField, {
                        name: "rate",
                        label: `Rate (1 ${unref(state).symbol || "CUR"} to USD)`,
                        required: ""
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_NuxtInput, {
                            modelValue: unref(state).rate,
                            "onUpdate:modelValue": ($event) => unref(state).rate = $event,
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }, 8, ["label"]),
                      createVNode(_component_NuxtFormField, {
                        name: "withdrawalCharge",
                        label: "Withdrawal Charge (USD)"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_NuxtInput, {
                            modelValue: unref(state).withdrawalCharge,
                            "onUpdate:modelValue": ($event) => unref(state).withdrawalCharge = $event,
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_NuxtFormField, {
                        name: "automaticallyUpdateRate",
                        class: "border border-accented rounded-lg p-4 md:col-span-2"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "flex items-center justify-between gap-2" }, [
                            createVNode("p", null, "Automatically update rate"),
                            createVNode(_component_NuxtSwitch, {
                              modelValue: unref(state).automaticallyUpdateRate,
                              "onUpdate:modelValue": ($event) => unref(state).automaticallyUpdateRate = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("p", { class: "text-xs text-muted mt-1" }, " If checked, the current rate will be automatically fetched and updated every 24 hours ")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_NuxtFormField, {
                        name: "walletAddress",
                        label: "Wallet Address for Deposits",
                        required: "",
                        class: "md:col-span-2"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_NuxtInput, {
                            modelValue: unref(state).walletAddress,
                            "onUpdate:modelValue": ($event) => unref(state).walletAddress = $event,
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_NuxtFormField, {
                        name: "walletAddressNetwork",
                        label: "Wallet Address Network (optional)",
                        class: "md:col-span-2"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_NuxtInput, {
                            modelValue: unref(state).walletAddressNetwork,
                            "onUpdate:modelValue": ($event) => unref(state).walletAddressNetwork = $event,
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_NuxtFormField, {
                        name: "image",
                        label: "Image URL (optional)",
                        class: "md:col-span-2"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_NuxtInput, {
                            modelValue: unref(state).image,
                            "onUpdate:modelValue": ($event) => unref(state).image = $event,
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "flex items-center justify-end gap-2 md:col-span-2" }, [
                        createVNode(_component_NuxtButton, {
                          color: "neutral",
                          variant: "soft",
                          label: "Cancel",
                          onClick: ($event) => open.value = false
                        }, null, 8, ["onClick"]),
                        createVNode(_component_NuxtButton, {
                          type: "submit",
                          label: "Submit",
                          "loading-auto": ""
                        })
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_NuxtForm, {
                state: unref(state),
                schema: unref(currencySchema),
                onSubmit: withModifiers(handleSubmit, ["prevent"])
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "grid md:grid-cols-2 gap-x-2 gap-y-5" }, [
                    createVNode(_component_NuxtFormField, {
                      name: "name",
                      label: "Name",
                      required: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_NuxtInput, {
                          modelValue: unref(state).name,
                          "onUpdate:modelValue": ($event) => unref(state).name = $event,
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_NuxtFormField, {
                      name: "symbol",
                      label: "Symbol",
                      required: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_NuxtInput, {
                          modelValue: unref(state).symbol,
                          "onUpdate:modelValue": ($event) => unref(state).symbol = $event,
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_NuxtFormField, {
                      name: "allowDeposit",
                      class: "border border-accented rounded-lg p-4 md:col-span-2"
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex items-center justify-between gap-2" }, [
                          createVNode("p", null, "Allow deposits with this currency"),
                          createVNode(_component_NuxtSwitch, {
                            modelValue: unref(state).allowDeposit,
                            "onUpdate:modelValue": ($event) => unref(state).allowDeposit = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_NuxtFormField, {
                      name: "allowWithdrawal",
                      class: "border border-accented rounded-lg p-4 md:col-span-2"
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex items-center justify-between gap-2" }, [
                          createVNode("p", null, "Allow withdrawals with this currency"),
                          createVNode(_component_NuxtSwitch, {
                            modelValue: unref(state).allowWithdrawal,
                            "onUpdate:modelValue": ($event) => unref(state).allowWithdrawal = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_NuxtFormField, {
                      name: "rate",
                      label: `Rate (1 ${unref(state).symbol || "CUR"} to USD)`,
                      required: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_NuxtInput, {
                          modelValue: unref(state).rate,
                          "onUpdate:modelValue": ($event) => unref(state).rate = $event,
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }, 8, ["label"]),
                    createVNode(_component_NuxtFormField, {
                      name: "withdrawalCharge",
                      label: "Withdrawal Charge (USD)"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_NuxtInput, {
                          modelValue: unref(state).withdrawalCharge,
                          "onUpdate:modelValue": ($event) => unref(state).withdrawalCharge = $event,
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_NuxtFormField, {
                      name: "automaticallyUpdateRate",
                      class: "border border-accented rounded-lg p-4 md:col-span-2"
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex items-center justify-between gap-2" }, [
                          createVNode("p", null, "Automatically update rate"),
                          createVNode(_component_NuxtSwitch, {
                            modelValue: unref(state).automaticallyUpdateRate,
                            "onUpdate:modelValue": ($event) => unref(state).automaticallyUpdateRate = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("p", { class: "text-xs text-muted mt-1" }, " If checked, the current rate will be automatically fetched and updated every 24 hours ")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_NuxtFormField, {
                      name: "walletAddress",
                      label: "Wallet Address for Deposits",
                      required: "",
                      class: "md:col-span-2"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_NuxtInput, {
                          modelValue: unref(state).walletAddress,
                          "onUpdate:modelValue": ($event) => unref(state).walletAddress = $event,
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_NuxtFormField, {
                      name: "walletAddressNetwork",
                      label: "Wallet Address Network (optional)",
                      class: "md:col-span-2"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_NuxtInput, {
                          modelValue: unref(state).walletAddressNetwork,
                          "onUpdate:modelValue": ($event) => unref(state).walletAddressNetwork = $event,
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_NuxtFormField, {
                      name: "image",
                      label: "Image URL (optional)",
                      class: "md:col-span-2"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_NuxtInput, {
                          modelValue: unref(state).image,
                          "onUpdate:modelValue": ($event) => unref(state).image = $event,
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "flex items-center justify-end gap-2 md:col-span-2" }, [
                      createVNode(_component_NuxtButton, {
                        color: "neutral",
                        variant: "soft",
                        label: "Cancel",
                        onClick: ($event) => open.value = false
                      }, null, 8, ["onClick"]),
                      createVNode(_component_NuxtButton, {
                        type: "submit",
                        label: "Submit",
                        "loading-auto": ""
                      })
                    ])
                  ])
                ]),
                _: 1
              }, 8, ["state", "schema"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/currency-manager.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_9 = Object.assign(_sfc_main$1, { __name: "AdminCurrencyManager" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "currencies",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { confirmAsync } = useConfirm();
    const toast = useToast();
    const open = ref(false);
    const { data, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/currencies",
      "$yqq_r_tyak"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const selected = ref(null);
    const state = computed(() => {
      return (data.value ?? []).sort((a, b) => a.name.localeCompare(b.name)).map((currency, index) => ({
        id: currency.id,
        sn: index + 1,
        image: currency.image,
        symbol: currency.symbol,
        name: currency.name,
        rate: currency.rate,
        deposit: currency.allowDeposit ? "allowed" : "not allowed",
        withdrawal: currency.allowWithdrawal ? "allowed" : "not allowed",
        withdrawalCharge: `$${currency.withdrawalCharge}`,
        walletAddress: currency.walletAddress || "N/A",
        walletAddressNetwork: currency.walletAddressNetwork || "N/A"
      }));
    });
    const headers = [
      "#",
      "",
      "Symbol",
      "Name",
      "Rate (USD)",
      "Deposits",
      "Withdrawals",
      "Withdrawal Charge",
      "Wallet Address",
      "Network",
      "Actions"
    ];
    const handleItemEdit = (id) => {
      selected.value = data.value?.find((currency) => currency.id === id) || null;
      if (!selected.value) {
        return;
      }
      open.value = true;
    };
    const handleCurrencyUpdate = () => {
      selected.value = null;
      refresh();
    };
    const handleNewItem = () => {
      selected.value = null;
      open.value = true;
    };
    const deleteItem = async (id) => {
      const ask = await confirmAsync({
        title: "Delete Currency",
        description: "Are you sure you want to delete this currency?",
        acceptProps: { color: "error", label: "Delete" }
      });
      if (!ask) {
        return;
      }
      try {
        const { message } = await $fetch(`/api/admin/currencies/${id}`, {
          method: "DELETE"
        });
        toast.add({
          color: "success",
          title: "Success",
          description: message
        });
        refresh();
      } catch (error2) {
        toast.add({
          color: "error",
          title: "Error",
          description: normalizeException(error2).message
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MyPage = __nuxt_component_0;
      const _component_NuxtButton = _sfc_main$a;
      const _component_VTable = __nuxt_component_5;
      const _component_VTableHeader = __nuxt_component_6;
      const _component_VTableRow = __nuxt_component_7;
      const _component_VTableHead = __nuxt_component_8;
      const _component_VTableBody = __nuxt_component_9$1;
      const _component_NuxtAvatar = _sfc_main$d;
      const _component_NuxtBadge = _sfc_main$2;
      const _component_AdminCurrencyManager = __nuxt_component_9;
      _push(ssrRenderComponent(_component_MyPage, mergeProps({
        error: unref(error),
        onRefresh: () => unref(refresh)()
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-10"${_scopeId}><div class="flex items-center justify-between gap-5"${_scopeId}><h1 class="text-3xl font-semibold"${_scopeId}>Currencies</h1><div${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtButton, {
              label: "New",
              icon: "lucide:plus",
              onClick: handleNewItem
            }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
            if (unref(data)) {
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
                          ssrRenderList(unref(state), (item) => {
                            _push4(ssrRenderComponent(_component_VTableRow, {
                              key: item.name
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(__nuxt_component_1, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(item.sn)}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(item.sn), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(__nuxt_component_1, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent(_component_NuxtAvatar, {
                                          src: item.image ?? void 0,
                                          alt: item.name,
                                          size: "md"
                                        }, null, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          createVNode(_component_NuxtAvatar, {
                                            src: item.image ?? void 0,
                                            alt: item.name,
                                            size: "md"
                                          }, null, 8, ["src", "alt"])
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(__nuxt_component_1, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(item.symbol)}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(item.symbol), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(__nuxt_component_1, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(item.name)}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(item.name), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(__nuxt_component_1, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(item.rate)}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(item.rate), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(__nuxt_component_1, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent(_component_NuxtBadge, {
                                          label: item.deposit,
                                          color: item.deposit === "allowed" ? "primary" : "error",
                                          variant: "soft"
                                        }, null, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          createVNode(_component_NuxtBadge, {
                                            label: item.deposit,
                                            color: item.deposit === "allowed" ? "primary" : "error",
                                            variant: "soft"
                                          }, null, 8, ["label", "color"])
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(__nuxt_component_1, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent(_component_NuxtBadge, {
                                          label: item.withdrawal,
                                          color: item.withdrawal === "allowed" ? "primary" : "error",
                                          variant: "soft"
                                        }, null, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          createVNode(_component_NuxtBadge, {
                                            label: item.withdrawal,
                                            color: item.withdrawal === "allowed" ? "primary" : "error",
                                            variant: "soft"
                                          }, null, 8, ["label", "color"])
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(__nuxt_component_1, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(item.withdrawalCharge)}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(item.withdrawalCharge), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(__nuxt_component_1, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(item.walletAddress)}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(item.walletAddress), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(__nuxt_component_1, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(item.walletAddressNetwork)}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(item.walletAddressNetwork), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(__nuxt_component_1, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`<div class="flex items-center gap-2"${_scopeId5}>`);
                                        _push6(ssrRenderComponent(_component_NuxtButton, {
                                          label: "Edit",
                                          variant: "soft",
                                          size: "sm",
                                          onClick: ($event) => handleItemEdit(item.id)
                                        }, null, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(_component_NuxtButton, {
                                          label: "Delete",
                                          color: "error",
                                          variant: "soft",
                                          size: "sm",
                                          "loading-auto": "",
                                          onClick: ($event) => deleteItem(item.id)
                                        }, null, _parent6, _scopeId5));
                                        _push6(`</div>`);
                                      } else {
                                        return [
                                          createVNode("div", { class: "flex items-center gap-2" }, [
                                            createVNode(_component_NuxtButton, {
                                              label: "Edit",
                                              variant: "soft",
                                              size: "sm",
                                              onClick: ($event) => handleItemEdit(item.id)
                                            }, null, 8, ["onClick"]),
                                            createVNode(_component_NuxtButton, {
                                              label: "Delete",
                                              color: "error",
                                              variant: "soft",
                                              size: "sm",
                                              "loading-auto": "",
                                              onClick: ($event) => deleteItem(item.id)
                                            }, null, 8, ["onClick"])
                                          ])
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode(__nuxt_component_1, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(item.sn), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(__nuxt_component_1, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_NuxtAvatar, {
                                          src: item.image ?? void 0,
                                          alt: item.name,
                                          size: "md"
                                        }, null, 8, ["src", "alt"])
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(__nuxt_component_1, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(item.symbol), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(__nuxt_component_1, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(item.name), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(__nuxt_component_1, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(item.rate), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(__nuxt_component_1, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_NuxtBadge, {
                                          label: item.deposit,
                                          color: item.deposit === "allowed" ? "primary" : "error",
                                          variant: "soft"
                                        }, null, 8, ["label", "color"])
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(__nuxt_component_1, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_NuxtBadge, {
                                          label: item.withdrawal,
                                          color: item.withdrawal === "allowed" ? "primary" : "error",
                                          variant: "soft"
                                        }, null, 8, ["label", "color"])
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(__nuxt_component_1, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(item.withdrawalCharge), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(__nuxt_component_1, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(item.walletAddress), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(__nuxt_component_1, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(item.walletAddressNetwork), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(__nuxt_component_1, null, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "flex items-center gap-2" }, [
                                          createVNode(_component_NuxtButton, {
                                            label: "Edit",
                                            variant: "soft",
                                            size: "sm",
                                            onClick: ($event) => handleItemEdit(item.id)
                                          }, null, 8, ["onClick"]),
                                          createVNode(_component_NuxtButton, {
                                            label: "Delete",
                                            color: "error",
                                            variant: "soft",
                                            size: "sm",
                                            "loading-auto": "",
                                            onClick: ($event) => deleteItem(item.id)
                                          }, null, 8, ["onClick"])
                                        ])
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
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(state), (item) => {
                              return openBlock(), createBlock(_component_VTableRow, {
                                key: item.name
                              }, {
                                default: withCtx(() => [
                                  createVNode(__nuxt_component_1, null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(item.sn), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(__nuxt_component_1, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_NuxtAvatar, {
                                        src: item.image ?? void 0,
                                        alt: item.name,
                                        size: "md"
                                      }, null, 8, ["src", "alt"])
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(__nuxt_component_1, null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(item.symbol), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(__nuxt_component_1, null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(item.name), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(__nuxt_component_1, null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(item.rate), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(__nuxt_component_1, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_NuxtBadge, {
                                        label: item.deposit,
                                        color: item.deposit === "allowed" ? "primary" : "error",
                                        variant: "soft"
                                      }, null, 8, ["label", "color"])
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(__nuxt_component_1, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_NuxtBadge, {
                                        label: item.withdrawal,
                                        color: item.withdrawal === "allowed" ? "primary" : "error",
                                        variant: "soft"
                                      }, null, 8, ["label", "color"])
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(__nuxt_component_1, null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(item.withdrawalCharge), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(__nuxt_component_1, null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(item.walletAddress), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(__nuxt_component_1, null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(item.walletAddressNetwork), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(__nuxt_component_1, null, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "flex items-center gap-2" }, [
                                        createVNode(_component_NuxtButton, {
                                          label: "Edit",
                                          variant: "soft",
                                          size: "sm",
                                          onClick: ($event) => handleItemEdit(item.id)
                                        }, null, 8, ["onClick"]),
                                        createVNode(_component_NuxtButton, {
                                          label: "Delete",
                                          color: "error",
                                          variant: "soft",
                                          size: "sm",
                                          "loading-auto": "",
                                          onClick: ($event) => deleteItem(item.id)
                                        }, null, 8, ["onClick"])
                                      ])
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
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(state), (item) => {
                            return openBlock(), createBlock(_component_VTableRow, {
                              key: item.name
                            }, {
                              default: withCtx(() => [
                                createVNode(__nuxt_component_1, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(item.sn), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(__nuxt_component_1, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_NuxtAvatar, {
                                      src: item.image ?? void 0,
                                      alt: item.name,
                                      size: "md"
                                    }, null, 8, ["src", "alt"])
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(__nuxt_component_1, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(item.symbol), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(__nuxt_component_1, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(item.name), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(__nuxt_component_1, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(item.rate), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(__nuxt_component_1, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_NuxtBadge, {
                                      label: item.deposit,
                                      color: item.deposit === "allowed" ? "primary" : "error",
                                      variant: "soft"
                                    }, null, 8, ["label", "color"])
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(__nuxt_component_1, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_NuxtBadge, {
                                      label: item.withdrawal,
                                      color: item.withdrawal === "allowed" ? "primary" : "error",
                                      variant: "soft"
                                    }, null, 8, ["label", "color"])
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(__nuxt_component_1, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(item.withdrawalCharge), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(__nuxt_component_1, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(item.walletAddress), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(__nuxt_component_1, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(item.walletAddressNetwork), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(__nuxt_component_1, null, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "flex items-center gap-2" }, [
                                      createVNode(_component_NuxtButton, {
                                        label: "Edit",
                                        variant: "soft",
                                        size: "sm",
                                        onClick: ($event) => handleItemEdit(item.id)
                                      }, null, 8, ["onClick"]),
                                      createVNode(_component_NuxtButton, {
                                        label: "Delete",
                                        color: "error",
                                        variant: "soft",
                                        size: "sm",
                                        "loading-auto": "",
                                        onClick: ($event) => deleteItem(item.id)
                                      }, null, 8, ["onClick"])
                                    ])
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
              _push2(ssrRenderComponent(_component_AdminCurrencyManager, {
                open: unref(open),
                "onUpdate:open": ($event) => isRef(open) ? open.value = $event : null,
                currency: unref(selected),
                onDone: handleCurrencyUpdate
              }, null, _parent2, _scopeId));
              _push2(`</section>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-10" }, [
                createVNode("div", { class: "flex items-center justify-between gap-5" }, [
                  createVNode("h1", { class: "text-3xl font-semibold" }, "Currencies"),
                  createVNode("div", null, [
                    createVNode(_component_NuxtButton, {
                      label: "New",
                      icon: "lucide:plus",
                      onClick: handleNewItem
                    })
                  ])
                ]),
                unref(data) ? (openBlock(), createBlock("section", { key: 0 }, [
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
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(state), (item) => {
                            return openBlock(), createBlock(_component_VTableRow, {
                              key: item.name
                            }, {
                              default: withCtx(() => [
                                createVNode(__nuxt_component_1, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(item.sn), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(__nuxt_component_1, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_NuxtAvatar, {
                                      src: item.image ?? void 0,
                                      alt: item.name,
                                      size: "md"
                                    }, null, 8, ["src", "alt"])
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(__nuxt_component_1, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(item.symbol), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(__nuxt_component_1, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(item.name), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(__nuxt_component_1, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(item.rate), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(__nuxt_component_1, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_NuxtBadge, {
                                      label: item.deposit,
                                      color: item.deposit === "allowed" ? "primary" : "error",
                                      variant: "soft"
                                    }, null, 8, ["label", "color"])
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(__nuxt_component_1, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_NuxtBadge, {
                                      label: item.withdrawal,
                                      color: item.withdrawal === "allowed" ? "primary" : "error",
                                      variant: "soft"
                                    }, null, 8, ["label", "color"])
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(__nuxt_component_1, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(item.withdrawalCharge), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(__nuxt_component_1, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(item.walletAddress), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(__nuxt_component_1, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(item.walletAddressNetwork), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(__nuxt_component_1, null, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "flex items-center gap-2" }, [
                                      createVNode(_component_NuxtButton, {
                                        label: "Edit",
                                        variant: "soft",
                                        size: "sm",
                                        onClick: ($event) => handleItemEdit(item.id)
                                      }, null, 8, ["onClick"]),
                                      createVNode(_component_NuxtButton, {
                                        label: "Delete",
                                        color: "error",
                                        variant: "soft",
                                        size: "sm",
                                        "loading-auto": "",
                                        onClick: ($event) => deleteItem(item.id)
                                      }, null, 8, ["onClick"])
                                    ])
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
                  createVNode(_component_AdminCurrencyManager, {
                    open: unref(open),
                    "onUpdate:open": ($event) => isRef(open) ? open.value = $event : null,
                    currency: unref(selected),
                    onDone: handleCurrencyUpdate
                  }, null, 8, ["open", "onUpdate:open", "currency"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/currencies.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=currencies-DYewFAEH.mjs.map
