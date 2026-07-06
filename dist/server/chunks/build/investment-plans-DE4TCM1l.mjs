import { _ as __nuxt_component_0 } from './my-page-BonBzHpX.mjs';
import { j as useConfirm, g as useToast, b as _sfc_main$a, h as _sfc_main$4 } from './server.mjs';
import { _ as __nuxt_component_5, a as __nuxt_component_6$1, b as __nuxt_component_7, c as __nuxt_component_8$1, d as __nuxt_component_9, e as __nuxt_component_1 } from './v-table-cell-BRZ0KuYt.mjs';
import { _ as _sfc_main$8 } from './Form-BhNutJZb.mjs';
import { _ as _sfc_main$5 } from './FormField-DYdB-maE.mjs';
import { _ as _sfc_main$7 } from './Input-CFyDl-v5.mjs';
import { _ as _sfc_main$9 } from './SelectMenu-B4rLEdXH.mjs';
import { defineComponent, ref, withAsyncContext, computed, mergeProps, unref, withCtx, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, createVNode, withDirectives, vShow, isRef, createCommentVNode, useModel, watch, watchEffect, withModifiers, mergeModels, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { _ as _sfc_main$6 } from './InputNumber-B8pnVdzm.mjs';
import { _ as _sfc_main$b } from './Select-lVF_caSC.mjs';
import { t as toDollar } from './to-dollar-DdS_9tlH.mjs';
import { i as investmentPlanSchema } from '../_/investment-plan.mjs';
import { a8 as normalizeException, ab as getPercentagePeriodicReturn } from '../_/nitro.mjs';
import { r as round } from '../_/round.mjs';
import { u as useFetch } from './fetch-CMVOWH-m.mjs';
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

const investmentPlanCategories = [
  { name: "Forex", value: "forex" },
  { name: "Real Estate", value: "real_estate" },
  { name: "Commodities", value: "commodities" },
  { name: "Stocks", value: "stocks" },
  { name: "Bonds", value: "bonds" },
  { name: "Cryptocurrencies", value: "cryptocurrencies" },
  { name: "Derivatives", value: "derivatives" }
];
const investmentPlanCategoryMap = {
  forex: "Forex",
  real_estate: "Real Estate",
  commodities: "Commodities",
  stocks: "Stocks",
  bonds: "Bonds",
  cryptocurrencies: "Cryptocurrencies",
  derivatives: "Derivatives"
};
const profitDistribution = [
  { name: "Daily", value: "daily" },
  { name: "Weekly", value: "weekly" },
  { name: "Bi-weekly", value: "bi_weekly" },
  { name: "Monthly", value: "monthly" }
];
const profitDistributionMap = {
  daily: "Daily",
  weekly: "Weekly",
  bi_weekly: "Bi-weekly",
  monthly: "Monthly"
};

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "investment-plan-category-select",
  __ssrInlineRender: true,
  props: {
    "modelValue": {},
    "modelModifiers": {}
  },
  emits: ["update:modelValue"],
  setup(__props) {
    const modelValue = useModel(__props, "modelValue");
    const selected = ref(
      investmentPlanCategories.find((item) => item.value === modelValue.value) ?? void 0
    );
    watch(
      selected,
      (newVal) => {
        modelValue.value = newVal?.value;
      },
      { immediate: true }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtSelectMenu = _sfc_main$9;
      _push(ssrRenderComponent(_component_NuxtSelectMenu, mergeProps({
        modelValue: unref(selected),
        "onUpdate:modelValue": ($event) => isRef(selected) ? selected.value = $event : null,
        items: unref(investmentPlanCategories),
        "label-key": "name"
      }, _ctx.$attrs, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/investment-plan-category-select.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_4 = Object.assign(_sfc_main$3, { __name: "InvestmentPlanCategorySelect" });
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "profit-distribution-cycle-select",
  __ssrInlineRender: true,
  props: {
    "modelValue": {},
    "modelModifiers": {}
  },
  emits: ["update:modelValue"],
  setup(__props) {
    const profitCycle = useModel(__props, "modelValue");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtSelect = _sfc_main$b;
      _push(ssrRenderComponent(_component_NuxtSelect, mergeProps({
        modelValue: profitCycle.value,
        "onUpdate:modelValue": ($event) => profitCycle.value = $event,
        items: unref(profitDistribution),
        "label-key": "name"
      }, _ctx.$attrs, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/profit-distribution-cycle-select.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_6 = Object.assign(_sfc_main$2, { __name: "ProfitDistributionCycleSelect" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "investment-plan-manager",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    plan: {}
  }, {
    "open": { type: Boolean, ...{ default: false } },
    "openModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["done"], ["update:open"]),
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const toast = useToast();
    const isEditing = computed(() => !!__props.plan);
    const open = useModel(__props, "open");
    const state = ref({ ...__props.plan });
    const exampleAmount = ref(state.value.minimumDeposit || 0);
    const exampleTotalReturns = computed(() => {
      if (!state.value.percentageTotalReturn || !state.value.minimumDeposit || state.value.percentageTotalReturn <= 0 || state.value.minimumDeposit <= 0) {
        return 0;
      }
      return exampleAmount.value * state.value.percentageTotalReturn / 100;
    });
    watch(
      () => __props.plan,
      (newPlan) => {
        state.value = { ...newPlan ?? void 0 };
      },
      { immediate: true }
    );
    watchEffect(() => {
      if (state.value.profitDistribution && state.value.duration) {
        state.value.duration = alignDurationToCycle(
          state.value.profitDistribution,
          state.value.duration
        );
        if (state.value.percentageTotalReturn) {
          state.value.percentagePeriodicReturn = round(
            getPercentagePeriodicReturn({
              percentageTotalReturn: state.value.percentageTotalReturn,
              duration: state.value.duration,
              profitDistribution: state.value.profitDistribution
            }),
            2
          );
        }
      }
      if (state.value.minimumDeposit) {
        exampleAmount.value = state.value.minimumDeposit;
      }
    });
    function alignDurationToCycle(distr, duration) {
      if (!duration || duration <= 0) return 0;
      const divisorMap = {
        daily: 1,
        weekly: 7,
        bi_weekly: 14,
        monthly: 30
      };
      const divisor = divisorMap[distr] ?? 1;
      const remainder = duration % divisor;
      if (remainder === 0) return duration;
      const down = duration - remainder;
      const up = down + divisor;
      return remainder >= divisor / 2 ? up : down;
    }
    const handleSubmit = async (event) => {
      try {
        if (isEditing.value && !state.value.id) {
          throw new Error("Missing plan ID for editing");
        }
        let message = "";
        if (isEditing.value) {
          const res = await $fetch(
            `/api/admin/investment-plans/${state.value.id}`,
            {
              method: "PUT",
              body: event.data
            }
          );
          message = res.message;
        } else {
          const res = await $fetch(`/api/admin/investment-plans`, {
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
      const _component_NuxtForm = _sfc_main$8;
      const _component_NuxtFormField = _sfc_main$5;
      const _component_NuxtInput = _sfc_main$7;
      const _component_InvestmentPlanCategorySelect = __nuxt_component_4;
      const _component_NuxtInputNumber = _sfc_main$6;
      const _component_ProfitDistributionCycleSelect = __nuxt_component_6;
      const _component_NuxtButton = _sfc_main$a;
      _push(ssrRenderComponent(_component_NuxtModal, mergeProps({
        open: open.value,
        "onUpdate:open": ($event) => open.value = $event,
        title: `${unref(isEditing) ? "Edit" : "New"} Investment Plan`,
        dismissible: false
      }, _attrs), {
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtForm, {
              state: unref(state),
              schema: unref(investmentPlanSchema),
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
                    name: "category",
                    label: "Category",
                    required: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_InvestmentPlanCategorySelect, {
                          modelValue: unref(state).category,
                          "onUpdate:modelValue": ($event) => unref(state).category = $event,
                          class: "w-full"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_InvestmentPlanCategorySelect, {
                            modelValue: unref(state).category,
                            "onUpdate:modelValue": ($event) => unref(state).category = $event,
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_NuxtFormField, {
                    name: "minimumDeposit",
                    label: "Minimum Deposit $",
                    required: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_NuxtInputNumber, {
                          modelValue: unref(state).minimumDeposit,
                          "onUpdate:modelValue": ($event) => unref(state).minimumDeposit = $event,
                          orientation: "vertical",
                          class: "w-full"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_NuxtInputNumber, {
                            modelValue: unref(state).minimumDeposit,
                            "onUpdate:modelValue": ($event) => unref(state).minimumDeposit = $event,
                            orientation: "vertical",
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_NuxtFormField, {
                    name: "maximumDeposit",
                    label: "Maximum Deposit $",
                    required: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_NuxtInputNumber, {
                          modelValue: unref(state).maximumDeposit,
                          "onUpdate:modelValue": ($event) => unref(state).maximumDeposit = $event,
                          orientation: "vertical",
                          class: "w-full"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_NuxtInputNumber, {
                            modelValue: unref(state).maximumDeposit,
                            "onUpdate:modelValue": ($event) => unref(state).maximumDeposit = $event,
                            orientation: "vertical",
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_NuxtFormField, {
                    name: "duration",
                    label: "Duration (in days)",
                    required: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_NuxtInputNumber, {
                          modelValue: unref(state).duration,
                          "onUpdate:modelValue": ($event) => unref(state).duration = $event,
                          orientation: "vertical",
                          class: "w-full"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_NuxtInputNumber, {
                            modelValue: unref(state).duration,
                            "onUpdate:modelValue": ($event) => unref(state).duration = $event,
                            orientation: "vertical",
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_NuxtFormField, {
                    name: "terminationFee",
                    label: "Termination Fee $",
                    required: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_NuxtInputNumber, {
                          modelValue: unref(state).terminationFee,
                          "onUpdate:modelValue": ($event) => unref(state).terminationFee = $event,
                          orientation: "vertical",
                          class: "w-full"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_NuxtInputNumber, {
                            modelValue: unref(state).terminationFee,
                            "onUpdate:modelValue": ($event) => unref(state).terminationFee = $event,
                            orientation: "vertical",
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_NuxtFormField, {
                    name: "percentageTotalReturn",
                    label: "Total Returns (in %)",
                    required: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_NuxtInputNumber, {
                          modelValue: unref(state).percentageTotalReturn,
                          "onUpdate:modelValue": ($event) => unref(state).percentageTotalReturn = $event,
                          orientation: "vertical",
                          class: "w-full"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_NuxtInputNumber, {
                            modelValue: unref(state).percentageTotalReturn,
                            "onUpdate:modelValue": ($event) => unref(state).percentageTotalReturn = $event,
                            orientation: "vertical",
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_NuxtFormField, {
                    name: "profitDistribution",
                    label: "Profit Distribution Cycle",
                    required: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_ProfitDistributionCycleSelect, {
                          modelValue: unref(state).profitDistribution,
                          "onUpdate:modelValue": ($event) => unref(state).profitDistribution = $event,
                          class: "w-full"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_ProfitDistributionCycleSelect, {
                            modelValue: unref(state).profitDistribution,
                            "onUpdate:modelValue": ($event) => unref(state).profitDistribution = $event,
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
                        name: "category",
                        label: "Category",
                        required: ""
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_InvestmentPlanCategorySelect, {
                            modelValue: unref(state).category,
                            "onUpdate:modelValue": ($event) => unref(state).category = $event,
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_NuxtFormField, {
                        name: "minimumDeposit",
                        label: "Minimum Deposit $",
                        required: ""
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_NuxtInputNumber, {
                            modelValue: unref(state).minimumDeposit,
                            "onUpdate:modelValue": ($event) => unref(state).minimumDeposit = $event,
                            orientation: "vertical",
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_NuxtFormField, {
                        name: "maximumDeposit",
                        label: "Maximum Deposit $",
                        required: ""
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_NuxtInputNumber, {
                            modelValue: unref(state).maximumDeposit,
                            "onUpdate:modelValue": ($event) => unref(state).maximumDeposit = $event,
                            orientation: "vertical",
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_NuxtFormField, {
                        name: "duration",
                        label: "Duration (in days)",
                        required: ""
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_NuxtInputNumber, {
                            modelValue: unref(state).duration,
                            "onUpdate:modelValue": ($event) => unref(state).duration = $event,
                            orientation: "vertical",
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_NuxtFormField, {
                        name: "terminationFee",
                        label: "Termination Fee $",
                        required: ""
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_NuxtInputNumber, {
                            modelValue: unref(state).terminationFee,
                            "onUpdate:modelValue": ($event) => unref(state).terminationFee = $event,
                            orientation: "vertical",
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_NuxtFormField, {
                        name: "percentageTotalReturn",
                        label: "Total Returns (in %)",
                        required: ""
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_NuxtInputNumber, {
                            modelValue: unref(state).percentageTotalReturn,
                            "onUpdate:modelValue": ($event) => unref(state).percentageTotalReturn = $event,
                            orientation: "vertical",
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_NuxtFormField, {
                        name: "profitDistribution",
                        label: "Profit Distribution Cycle",
                        required: ""
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_ProfitDistributionCycleSelect, {
                            modelValue: unref(state).profitDistribution,
                            "onUpdate:modelValue": ($event) => unref(state).profitDistribution = $event,
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
                schema: unref(investmentPlanSchema),
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
                      name: "category",
                      label: "Category",
                      required: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_InvestmentPlanCategorySelect, {
                          modelValue: unref(state).category,
                          "onUpdate:modelValue": ($event) => unref(state).category = $event,
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_NuxtFormField, {
                      name: "minimumDeposit",
                      label: "Minimum Deposit $",
                      required: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_NuxtInputNumber, {
                          modelValue: unref(state).minimumDeposit,
                          "onUpdate:modelValue": ($event) => unref(state).minimumDeposit = $event,
                          orientation: "vertical",
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_NuxtFormField, {
                      name: "maximumDeposit",
                      label: "Maximum Deposit $",
                      required: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_NuxtInputNumber, {
                          modelValue: unref(state).maximumDeposit,
                          "onUpdate:modelValue": ($event) => unref(state).maximumDeposit = $event,
                          orientation: "vertical",
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_NuxtFormField, {
                      name: "duration",
                      label: "Duration (in days)",
                      required: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_NuxtInputNumber, {
                          modelValue: unref(state).duration,
                          "onUpdate:modelValue": ($event) => unref(state).duration = $event,
                          orientation: "vertical",
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_NuxtFormField, {
                      name: "terminationFee",
                      label: "Termination Fee $",
                      required: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_NuxtInputNumber, {
                          modelValue: unref(state).terminationFee,
                          "onUpdate:modelValue": ($event) => unref(state).terminationFee = $event,
                          orientation: "vertical",
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_NuxtFormField, {
                      name: "percentageTotalReturn",
                      label: "Total Returns (in %)",
                      required: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_NuxtInputNumber, {
                          modelValue: unref(state).percentageTotalReturn,
                          "onUpdate:modelValue": ($event) => unref(state).percentageTotalReturn = $event,
                          orientation: "vertical",
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_NuxtFormField, {
                      name: "profitDistribution",
                      label: "Profit Distribution Cycle",
                      required: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_ProfitDistributionCycleSelect, {
                          modelValue: unref(state).profitDistribution,
                          "onUpdate:modelValue": ($event) => unref(state).profitDistribution = $event,
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
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="w-full"${_scopeId}><div${_scopeId}><p class="font-semibold text-sm"${_scopeId}>Profit Calculator</p><small class="text-muted"${_scopeId}> Edit the total returns to see how much profit the client makes </small></div><div class="mt-2 grid md:grid-cols-2 gap-x-2 w-full"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtFormField, { label: "Investment Amount" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_NuxtInputNumber, {
                    modelValue: unref(exampleAmount),
                    "onUpdate:modelValue": ($event) => isRef(exampleAmount) ? exampleAmount.value = $event : null,
                    min: unref(state).minimumDeposit || 0,
                    max: unref(state).maximumDeposit || 0,
                    orientation: "vertical",
                    class: "w-full"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_NuxtInputNumber, {
                      modelValue: unref(exampleAmount),
                      "onUpdate:modelValue": ($event) => isRef(exampleAmount) ? exampleAmount.value = $event : null,
                      min: unref(state).minimumDeposit || 0,
                      max: unref(state).maximumDeposit || 0,
                      orientation: "vertical",
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "min", "max"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_NuxtFormField, { label: "Total Returns" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_NuxtInput, {
                    readonly: "",
                    value: ("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(unref(exampleTotalReturns)),
                    class: "w-full"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_NuxtInput, {
                      readonly: "",
                      value: ("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(unref(exampleTotalReturns)),
                      class: "w-full"
                    }, null, 8, ["value"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "w-full" }, [
                createVNode("div", null, [
                  createVNode("p", { class: "font-semibold text-sm" }, "Profit Calculator"),
                  createVNode("small", { class: "text-muted" }, " Edit the total returns to see how much profit the client makes ")
                ]),
                createVNode("div", { class: "mt-2 grid md:grid-cols-2 gap-x-2 w-full" }, [
                  createVNode(_component_NuxtFormField, { label: "Investment Amount" }, {
                    default: withCtx(() => [
                      createVNode(_component_NuxtInputNumber, {
                        modelValue: unref(exampleAmount),
                        "onUpdate:modelValue": ($event) => isRef(exampleAmount) ? exampleAmount.value = $event : null,
                        min: unref(state).minimumDeposit || 0,
                        max: unref(state).maximumDeposit || 0,
                        orientation: "vertical",
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "min", "max"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_NuxtFormField, { label: "Total Returns" }, {
                    default: withCtx(() => [
                      createVNode(_component_NuxtInput, {
                        readonly: "",
                        value: ("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(unref(exampleTotalReturns)),
                        class: "w-full"
                      }, null, 8, ["value"])
                    ]),
                    _: 1
                  })
                ])
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/investment-plan-manager.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_8 = Object.assign(_sfc_main$1, { __name: "AdminInvestmentPlanManager" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "investment-plans",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { confirmAsync } = useConfirm();
    const toast = useToast();
    const open = ref(false);
    const { data, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/investment-plans",
      "$wdToGKb1p-"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const selected = ref(null);
    const state = computed(() => {
      return (data.value ?? []).sort((a, b) => {
        if (a.category === b.category) {
          return a.name.localeCompare(b.name);
        }
        return a.category.localeCompare(b.category);
      }).map((plan, index) => ({
        id: plan.id,
        sn: index + 1,
        name: plan.name,
        category: investmentPlanCategoryMap[plan.category] || plan.category,
        minDeposit: `$${plan.minimumDeposit.toLocaleString()}`,
        maxDeposit: `$${plan.maximumDeposit.toLocaleString()}`,
        return: `${plan.percentageTotalReturn}%`,
        duration: `${plan.duration} days`,
        profitDistribution: profitDistributionMap[plan.profitDistribution] || plan.profitDistribution,
        terminationFee: `$${plan.terminationFee.toLocaleString()}`
      }));
    });
    const headers = [
      "#",
      "Name",
      "Category",
      "Min. Deposit",
      "Max. Deposit",
      "Return",
      "Duration",
      "Profit Distr.",
      "Termination Fee",
      "Actions"
    ];
    const handleItemEdit = (id) => {
      selected.value = data.value?.find((plan) => plan.id === id) || null;
      if (!selected.value) {
        return;
      }
      open.value = true;
    };
    const deleteItem = async (id) => {
      const ask = await confirmAsync({
        title: "Delete Investment Plan",
        description: "Are you sure you want to delete this investment plan?",
        acceptProps: { color: "error", label: "Delete" }
      });
      if (!ask) {
        return;
      }
      try {
        const { message } = await $fetch(`/api/admin/investment-plans/${id}`, {
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
      const _component_VTableHeader = __nuxt_component_6$1;
      const _component_VTableRow = __nuxt_component_7;
      const _component_VTableHead = __nuxt_component_8$1;
      const _component_VTableBody = __nuxt_component_9;
      const _component_VTableCell = __nuxt_component_1;
      const _component_AdminInvestmentPlanManager = __nuxt_component_8;
      _push(ssrRenderComponent(_component_MyPage, mergeProps({
        error: unref(error),
        onRefresh: () => unref(refresh)()
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-10"${_scopeId}><div class="flex items-center justify-between gap-5"${_scopeId}><h1 class="text-3xl font-semibold"${_scopeId}>Investment Plans</h1><div${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtButton, {
              label: "New",
              icon: "lucide:plus",
              onClick: () => {
                selected.value = null;
                open.value = true;
              }
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
                                  _push5(`<!--[-->`);
                                  ssrRenderList(item, (value, key) => {
                                    _push5(ssrRenderComponent(_component_VTableCell, {
                                      style: key !== "id" ? null : { display: "none" }
                                    }, {
                                      default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                        if (_push6) {
                                          _push6(`${ssrInterpolate(value)}`);
                                        } else {
                                          return [
                                            createTextVNode(toDisplayString(value), 1)
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent5, _scopeId4));
                                  });
                                  _push5(`<!--]-->`);
                                  _push5(ssrRenderComponent(_component_VTableCell, null, {
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
                                    (openBlock(true), createBlock(Fragment, null, renderList(item, (value, key) => {
                                      return withDirectives((openBlock(), createBlock(_component_VTableCell, { key }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(value), 1)
                                        ]),
                                        _: 2
                                      }, 1536)), [
                                        [vShow, key !== "id"]
                                      ]);
                                    }), 128)),
                                    createVNode(_component_VTableCell, null, {
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
                                  (openBlock(true), createBlock(Fragment, null, renderList(item, (value, key) => {
                                    return withDirectives((openBlock(), createBlock(_component_VTableCell, { key }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(value), 1)
                                      ]),
                                      _: 2
                                    }, 1536)), [
                                      [vShow, key !== "id"]
                                    ]);
                                  }), 128)),
                                  createVNode(_component_VTableCell, null, {
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
                                (openBlock(true), createBlock(Fragment, null, renderList(item, (value, key) => {
                                  return withDirectives((openBlock(), createBlock(_component_VTableCell, { key }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(value), 1)
                                    ]),
                                    _: 2
                                  }, 1536)), [
                                    [vShow, key !== "id"]
                                  ]);
                                }), 128)),
                                createVNode(_component_VTableCell, null, {
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
              _push2(ssrRenderComponent(_component_AdminInvestmentPlanManager, {
                open: unref(open),
                "onUpdate:open": ($event) => isRef(open) ? open.value = $event : null,
                plan: unref(selected),
                onDone: () => {
                  unref(refresh)();
                  selected.value = null;
                }
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
                  createVNode("h1", { class: "text-3xl font-semibold" }, "Investment Plans"),
                  createVNode("div", null, [
                    createVNode(_component_NuxtButton, {
                      label: "New",
                      icon: "lucide:plus",
                      onClick: () => {
                        selected.value = null;
                        open.value = true;
                      }
                    }, null, 8, ["onClick"])
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
                                (openBlock(true), createBlock(Fragment, null, renderList(item, (value, key) => {
                                  return withDirectives((openBlock(), createBlock(_component_VTableCell, { key }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(value), 1)
                                    ]),
                                    _: 2
                                  }, 1536)), [
                                    [vShow, key !== "id"]
                                  ]);
                                }), 128)),
                                createVNode(_component_VTableCell, null, {
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
                  createVNode(_component_AdminInvestmentPlanManager, {
                    open: unref(open),
                    "onUpdate:open": ($event) => isRef(open) ? open.value = $event : null,
                    plan: unref(selected),
                    onDone: () => {
                      unref(refresh)();
                      selected.value = null;
                    }
                  }, null, 8, ["open", "onUpdate:open", "plan", "onDone"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/investment-plans.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=investment-plans-DE4TCM1l.mjs.map
