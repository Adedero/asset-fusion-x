import { _ as __nuxt_component_0 } from './loader-CegSv3fP.mjs';
import { _ as __nuxt_component_14 } from './fetch-error-alert-Cos-JGNP.mjs';
import { _ as _sfc_main$4 } from './Badge-4IrPO892.mjs';
import { _ as _sfc_main$5 } from './Separator-s2cjcbon.mjs';
import { _ as _sfc_main$6 } from './Form-BhNutJZb.mjs';
import { _ as _sfc_main$7 } from './FormField-DYdB-maE.mjs';
import { _ as _sfc_main$8 } from './FieldGroup-CbIMy4e7.mjs';
import { _ as _sfc_main$9 } from './Select-lVF_caSC.mjs';
import { n as navigateTo, g as useToast, b as _sfc_main$a, j as useConfirm } from './server.mjs';
import { _ as _sfc_main$b } from './Checkbox-B9D0p2uY.mjs';
import { _ as _sfc_main$c } from './Textarea-CmXluAOQ.mjs';
import { _ as _sfc_main$d } from './Alert-9mK7K0n2.mjs';
import { t as toDollar } from './to-dollar-DdS_9tlH.mjs';
import { defineComponent, unref, computed, reactive, mergeProps, withCtx, createVNode, createTextVNode, toDisplayString, withDirectives, vShow, openBlock, createBlock, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderStyle } from 'vue/server-renderer';
import z from 'zod';
import { a8 as normalizeException } from '../_/nitro.mjs';
import { _ as _sfc_main$e } from './InputNumber-B8pnVdzm.mjs';
import { _ as _sfc_main$f } from './Input-CFyDl-v5.mjs';
import { g as getInvestmentStatusBadgeColor } from './investment-CJjcSFHl.mjs';
import { u as useRouteData } from './use-route-data-zpNPSzN0.mjs';
import { u as useFetch } from './fetch-CMVOWH-m.mjs';
import './_plugin-vue_export-helper-1tPrXgE0.mjs';
import 'reka-ui';
import '@vueuse/core';
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
import '@vue/shared';

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "investment-status-updater",
  __ssrInlineRender: true,
  props: {
    status: {},
    investmentId: {},
    terminationFee: {}
  },
  emits: ["done"],
  setup(__props, { emit: __emit }) {
    const toast = useToast();
    const emit = __emit;
    const disabled = computed(() => __props.status === "terminated" || __props.status === "closed");
    const statuses = ["open", "paused", "terminated"];
    const schema = z.object({
      status: z.enum(statuses, "Invalid investment status"),
      applyTerminationFee: z.boolean(),
      terminatedReason: z.string("Invalid termination reason").optional(),
      pausedReason: z.string("Invalid pause reason").optional()
    });
    const state = reactive({
      status: __props.status,
      applyTerminationFee: true
    });
    const handleSubmit = async (event) => {
      try {
        const res = await $fetch(`/api/admin/investments/${__props.investmentId}`, {
          method: "PUT",
          body: event.data
        });
        emit("done");
        toast.add({
          color: "success",
          title: "Success",
          description: res.message
        });
      } catch (error) {
        toast.add({
          color: "error",
          title: "Error",
          description: normalizeException(error).message
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtForm = _sfc_main$6;
      const _component_NuxtFormField = _sfc_main$7;
      const _component_NuxtFieldGroup = _sfc_main$8;
      const _component_NuxtSelect = _sfc_main$9;
      const _component_NuxtButton = _sfc_main$a;
      const _component_NuxtCheckbox = _sfc_main$b;
      const _component_NuxtTextarea = _sfc_main$c;
      const _component_NuxtAlert = _sfc_main$d;
      _push(ssrRenderComponent(_component_NuxtForm, mergeProps({
        state: unref(state),
        schema: unref(schema),
        disabled: unref(disabled),
        onSubmit: handleSubmit
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtFormField, {
              name: "status",
              label: "New Status",
              required: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_NuxtFieldGroup, { class: "w-full max-w-72" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_NuxtSelect, {
                          modelValue: unref(state).status,
                          "onUpdate:modelValue": ($event) => unref(state).status = $event,
                          items: statuses,
                          class: "w-full"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_NuxtButton, {
                          type: "submit",
                          label: "Update",
                          "loading-auto": "",
                          disabled: unref(disabled)
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_NuxtSelect, {
                            modelValue: unref(state).status,
                            "onUpdate:modelValue": ($event) => unref(state).status = $event,
                            items: statuses,
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_component_NuxtButton, {
                            type: "submit",
                            label: "Update",
                            "loading-auto": "",
                            disabled: unref(disabled)
                          }, null, 8, ["disabled"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_NuxtFieldGroup, { class: "w-full max-w-72" }, {
                      default: withCtx(() => [
                        createVNode(_component_NuxtSelect, {
                          modelValue: unref(state).status,
                          "onUpdate:modelValue": ($event) => unref(state).status = $event,
                          items: statuses,
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_component_NuxtButton, {
                          type: "submit",
                          label: "Update",
                          "loading-auto": "",
                          disabled: unref(disabled)
                        }, null, 8, ["disabled"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="space-y-4" style="${ssrRenderStyle(__props.status !== "terminated" && unref(state).status === "terminated" ? null : { display: "none" })}"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtFormField, { name: "applyTerminationFee" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-center gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_NuxtCheckbox, {
                    modelValue: unref(state).applyTerminationFee,
                    "onUpdate:modelValue": ($event) => unref(state).applyTerminationFee = $event
                  }, null, _parent3, _scopeId2));
                  _push3(`<p${_scopeId2}> Apply <b${_scopeId2}>${ssrInterpolate(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(__props.terminationFee))}</b> Termination Fee </p></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center gap-2" }, [
                      createVNode(_component_NuxtCheckbox, {
                        modelValue: unref(state).applyTerminationFee,
                        "onUpdate:modelValue": ($event) => unref(state).applyTerminationFee = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode("p", null, [
                        createTextVNode(" Apply "),
                        createVNode("b", null, toDisplayString(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(__props.terminationFee)), 1),
                        createTextVNode(" Termination Fee ")
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_NuxtFormField, {
              name: "terminatedReason",
              label: "Reason for termination"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_NuxtTextarea, {
                    modelValue: unref(state).terminatedReason,
                    "onUpdate:modelValue": ($event) => unref(state).terminatedReason = $event,
                    "max-rows": 3,
                    autoresize: "",
                    class: "w-full"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_NuxtTextarea, {
                      modelValue: unref(state).terminatedReason,
                      "onUpdate:modelValue": ($event) => unref(state).terminatedReason = $event,
                      "max-rows": 3,
                      autoresize: "",
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="space-y-4" style="${ssrRenderStyle(__props.status !== "paused" && unref(state).status === "paused" ? null : { display: "none" })}"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtFormField, {
              name: "pausedReason",
              label: "Reason for the pause"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_NuxtTextarea, {
                    modelValue: unref(state).pausedReason,
                    "onUpdate:modelValue": ($event) => unref(state).pausedReason = $event,
                    "max-rows": 3,
                    autoresize: "",
                    class: "w-full"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_NuxtTextarea, {
                      modelValue: unref(state).pausedReason,
                      "onUpdate:modelValue": ($event) => unref(state).pausedReason = $event,
                      "max-rows": 3,
                      autoresize: "",
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="mt-3"${_scopeId}>`);
            if (unref(disabled)) {
              _push2(ssrRenderComponent(_component_NuxtAlert, {
                title: `Investment ${__props.status}`,
                description: `The investment status cannot be updated as it has been ${__props.status}.`,
                color: "error",
                variant: "subtle",
                icon: "lucide:circle-x"
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (__props.status !== "terminated" && unref(state).status === "terminated") {
              _push2(ssrRenderComponent(_component_NuxtAlert, {
                title: "Warning",
                description: "Once terminated, the investment status can no longer be updated!",
                color: "warning",
                variant: "subtle",
                icon: "lucide:triangle-alert"
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-4" }, [
                createVNode(_component_NuxtFormField, {
                  name: "status",
                  label: "New Status",
                  required: ""
                }, {
                  default: withCtx(() => [
                    createVNode(_component_NuxtFieldGroup, { class: "w-full max-w-72" }, {
                      default: withCtx(() => [
                        createVNode(_component_NuxtSelect, {
                          modelValue: unref(state).status,
                          "onUpdate:modelValue": ($event) => unref(state).status = $event,
                          items: statuses,
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_component_NuxtButton, {
                          type: "submit",
                          label: "Update",
                          "loading-auto": "",
                          disabled: unref(disabled)
                        }, null, 8, ["disabled"])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                withDirectives(createVNode("div", { class: "space-y-4" }, [
                  createVNode(_component_NuxtFormField, { name: "applyTerminationFee" }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "flex items-center gap-2" }, [
                        createVNode(_component_NuxtCheckbox, {
                          modelValue: unref(state).applyTerminationFee,
                          "onUpdate:modelValue": ($event) => unref(state).applyTerminationFee = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("p", null, [
                          createTextVNode(" Apply "),
                          createVNode("b", null, toDisplayString(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(__props.terminationFee)), 1),
                          createTextVNode(" Termination Fee ")
                        ])
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_NuxtFormField, {
                    name: "terminatedReason",
                    label: "Reason for termination"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_NuxtTextarea, {
                        modelValue: unref(state).terminatedReason,
                        "onUpdate:modelValue": ($event) => unref(state).terminatedReason = $event,
                        "max-rows": 3,
                        autoresize: "",
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  })
                ], 512), [
                  [vShow, __props.status !== "terminated" && unref(state).status === "terminated"]
                ]),
                withDirectives(createVNode("div", { class: "space-y-4" }, [
                  createVNode(_component_NuxtFormField, {
                    name: "pausedReason",
                    label: "Reason for the pause"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_NuxtTextarea, {
                        modelValue: unref(state).pausedReason,
                        "onUpdate:modelValue": ($event) => unref(state).pausedReason = $event,
                        "max-rows": 3,
                        autoresize: "",
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  })
                ], 512), [
                  [vShow, __props.status !== "paused" && unref(state).status === "paused"]
                ])
              ]),
              createVNode("div", { class: "mt-3" }, [
                unref(disabled) ? (openBlock(), createBlock(_component_NuxtAlert, {
                  key: 0,
                  title: `Investment ${__props.status}`,
                  description: `The investment status cannot be updated as it has been ${__props.status}.`,
                  color: "error",
                  variant: "subtle",
                  icon: "lucide:circle-x"
                }, null, 8, ["title", "description"])) : createCommentVNode("", true),
                __props.status !== "terminated" && unref(state).status === "terminated" ? (openBlock(), createBlock(_component_NuxtAlert, {
                  key: 1,
                  title: "Warning",
                  description: "Once terminated, the investment status can no longer be updated!",
                  color: "warning",
                  variant: "subtle",
                  icon: "lucide:triangle-alert"
                })) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/investment-status-updater.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_4 = Object.assign(_sfc_main$3, { __name: "AdminInvestmentStatusUpdater" });
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "investment-termination-fee-updater",
  __ssrInlineRender: true,
  props: {
    terminationFee: {},
    investmentId: {}
  },
  emits: ["done"],
  setup(__props, { emit: __emit }) {
    const toast = useToast();
    const emit = __emit;
    const schema = z.object({
      terminationFee: z.number("Invalid termination fee").min(0, "Termination fee must be at least 0")
    });
    const state = reactive({
      terminationFee: __props.terminationFee
    });
    const handleSubmit = async (event) => {
      try {
        const res = await $fetch(`/api/admin/investments/${__props.investmentId}`, {
          method: "PUT",
          body: event.data
        });
        emit("done");
        toast.add({
          color: "success",
          title: "Success",
          description: res.message
        });
      } catch (error) {
        toast.add({
          color: "error",
          title: "Error",
          description: normalizeException(error).message
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtForm = _sfc_main$6;
      const _component_NuxtFormField = _sfc_main$7;
      const _component_NuxtFieldGroup = _sfc_main$8;
      const _component_NuxtInputNumber = _sfc_main$e;
      const _component_NuxtButton = _sfc_main$a;
      _push(ssrRenderComponent(_component_NuxtForm, mergeProps({
        state: unref(state),
        schema: unref(schema),
        onSubmit: handleSubmit
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtFormField, {
              name: "terminationFee",
              label: "New Termination Fee",
              required: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_NuxtFieldGroup, { class: "w-full max-w-72" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_NuxtInputNumber, {
                          modelValue: unref(state).terminationFee,
                          "onUpdate:modelValue": ($event) => unref(state).terminationFee = $event,
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
                          class: "w-full"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_NuxtButton, {
                          type: "submit",
                          label: "Update",
                          "loading-auto": ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_NuxtInputNumber, {
                            modelValue: unref(state).terminationFee,
                            "onUpdate:modelValue": ($event) => unref(state).terminationFee = $event,
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
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_component_NuxtButton, {
                            type: "submit",
                            label: "Update",
                            "loading-auto": ""
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_NuxtFieldGroup, { class: "w-full max-w-72" }, {
                      default: withCtx(() => [
                        createVNode(_component_NuxtInputNumber, {
                          modelValue: unref(state).terminationFee,
                          "onUpdate:modelValue": ($event) => unref(state).terminationFee = $event,
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
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_component_NuxtButton, {
                          type: "submit",
                          label: "Update",
                          "loading-auto": ""
                        })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_NuxtFormField, {
                name: "terminationFee",
                label: "New Termination Fee",
                required: ""
              }, {
                default: withCtx(() => [
                  createVNode(_component_NuxtFieldGroup, { class: "w-full max-w-72" }, {
                    default: withCtx(() => [
                      createVNode(_component_NuxtInputNumber, {
                        modelValue: unref(state).terminationFee,
                        "onUpdate:modelValue": ($event) => unref(state).terminationFee = $event,
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
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_component_NuxtButton, {
                        type: "submit",
                        label: "Update",
                        "loading-auto": ""
                      })
                    ]),
                    _: 1
                  })
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
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/investment-termination-fee-updater.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_5 = Object.assign(_sfc_main$2, { __name: "AdminInvestmentTerminationFeeUpdater" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "investment-deleter",
  __ssrInlineRender: true,
  props: {
    investmentId: {}
  },
  emits: ["done"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const toast = useToast();
    const { confirmAsync } = useConfirm();
    const schema = z.object({
      command: z.literal("delete investment", "Wrong command")
    });
    const state = reactive({});
    const handleSubmit = async () => {
      const ask = await confirmAsync({
        title: "Delete Investment",
        description: "Are you sure you want to delete this investment? This cannot be undone.",
        acceptProps: {
          color: "error",
          label: "Delete"
        }
      });
      if (!ask) {
        return;
      }
      try {
        const res = await $fetch(`/api/admin/investments/${__props.investmentId}`, {
          method: "DELETE"
        });
        emit("done");
        toast.add({
          color: "success",
          title: "Success",
          description: res.message
        });
      } catch (error) {
        toast.add({
          color: "error",
          title: "Error",
          description: normalizeException(error).message
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtForm = _sfc_main$6;
      const _component_NuxtFormField = _sfc_main$7;
      const _component_NuxtFieldGroup = _sfc_main$8;
      const _component_NuxtInput = _sfc_main$f;
      const _component_NuxtButton = _sfc_main$a;
      _push(ssrRenderComponent(_component_NuxtForm, mergeProps({
        state: unref(state),
        schema: unref(schema),
        onSubmit: handleSubmit
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtFormField, {
              name: "command",
              label: "Write the command 'delete investment' to proceed"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_NuxtFieldGroup, { class: "w-full max-w-72" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_NuxtInput, {
                          modelValue: unref(state).command,
                          "onUpdate:modelValue": ($event) => unref(state).command = $event,
                          class: "w-full"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_NuxtButton, {
                          type: "submit",
                          label: "Delete",
                          color: "error",
                          "loading-auto": ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_NuxtInput, {
                            modelValue: unref(state).command,
                            "onUpdate:modelValue": ($event) => unref(state).command = $event,
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_component_NuxtButton, {
                            type: "submit",
                            label: "Delete",
                            color: "error",
                            "loading-auto": ""
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_NuxtFieldGroup, { class: "w-full max-w-72" }, {
                      default: withCtx(() => [
                        createVNode(_component_NuxtInput, {
                          modelValue: unref(state).command,
                          "onUpdate:modelValue": ($event) => unref(state).command = $event,
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_component_NuxtButton, {
                          type: "submit",
                          label: "Delete",
                          color: "error",
                          "loading-auto": ""
                        })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_NuxtFormField, {
                name: "command",
                label: "Write the command 'delete investment' to proceed"
              }, {
                default: withCtx(() => [
                  createVNode(_component_NuxtFieldGroup, { class: "w-full max-w-72" }, {
                    default: withCtx(() => [
                      createVNode(_component_NuxtInput, {
                        modelValue: unref(state).command,
                        "onUpdate:modelValue": ($event) => unref(state).command = $event,
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_component_NuxtButton, {
                        type: "submit",
                        label: "Delete",
                        color: "error",
                        "loading-auto": ""
                      })
                    ]),
                    _: 1
                  })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/investment-deleter.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_6 = Object.assign(_sfc_main$1, { __name: "AdminInvestmentDeleter" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "settings",
  __ssrInlineRender: true,
  setup(__props) {
    const investmentId = useRouteData().getParams("investmentId");
    const { data, error, pending, refresh } = useFetch(
      `/api/admin/investments/${investmentId}`,
      "$oV2CVjezzV"
      /* nuxt-injected */
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLoader = __nuxt_component_0;
      const _component_FetchErrorAlert = __nuxt_component_14;
      const _component_NuxtBadge = _sfc_main$4;
      const _component_NuxtSeparator = _sfc_main$5;
      const _component_AdminInvestmentStatusUpdater = __nuxt_component_4;
      const _component_AdminInvestmentTerminationFeeUpdater = __nuxt_component_5;
      const _component_AdminInvestmentDeleter = __nuxt_component_6;
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
        _push(`</div><p class="text-sm text-primary-500">${ssrInterpolate(unref(data).category)}</p></header><div class="mt-8 space-y-10"><section><h3 class="text-xl"> Status: <span class="font-geist-mono font-semibold">${ssrInterpolate(unref(data).status)}</span></h3>`);
        _push(ssrRenderComponent(_component_NuxtSeparator, { class: "my-2" }, null, _parent));
        _push(`<div class="mt-4">`);
        _push(ssrRenderComponent(_component_AdminInvestmentStatusUpdater, {
          "investment-id": unref(data).id,
          "termination-fee": unref(data).terminationFee,
          status: unref(data).status,
          onDone: () => unref(refresh)()
        }, null, _parent));
        _push(`</div></section><section><h3 class="text-xl"> Termination Fee: <span class="font-geist-mono font-semibold">${ssrInterpolate(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(unref(data).terminationFee))}</span></h3>`);
        _push(ssrRenderComponent(_component_NuxtSeparator, { class: "my-2" }, null, _parent));
        _push(`<div class="mt-4">`);
        _push(ssrRenderComponent(_component_AdminInvestmentTerminationFeeUpdater, {
          "investment-id": unref(data).id,
          "termination-fee": unref(data).terminationFee,
          onDone: () => unref(refresh)()
        }, null, _parent));
        _push(`</div></section><section><h3 class="text-xl text-error">Delete Investment</h3>`);
        _push(ssrRenderComponent(_component_NuxtSeparator, {
          class: "my-2",
          color: "error"
        }, null, _parent));
        _push(`<div class="mt-4">`);
        _push(ssrRenderComponent(_component_AdminInvestmentDeleter, {
          "investment-id": unref(data).id,
          onDone: () => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/admin/investments")
        }, null, _parent));
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/investments/[investmentId]/settings.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=settings-BSsEhhVM.mjs.map
