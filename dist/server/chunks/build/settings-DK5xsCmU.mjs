import { _ as _sfc_main$1 } from './Card-HL6icAYQ.mjs';
import { _ as _sfc_main$1$1, a as _sfc_main$2 } from './FormField-CzZJ1-Wb.mjs';
import { _ as _sfc_main$3 } from './ButtonGroup-BGlqjy3A.mjs';
import { _ as _sfc_main$4 } from './Input-BtIiAvs7.mjs';
import { i as useToast, c as _sfc_main$7 } from './server.mjs';
import { defineComponent, ref, inject, reactive, mergeProps, withCtx, unref, createVNode, withModifiers, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import z from 'zod';
import { a5 as normalizeException } from '../nitro/nitro.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "settings",
  __ssrInlineRender: true,
  setup(__props) {
    const accountId = useRouteData().getParams("accountId");
    const injected = ref(
      inject("currentAccount", { accountName: "", refreshAccount: async () => {
      } })
    );
    const toast = useToast();
    const schema = z.object({
      accountName: z.string("Account name is required").nonempty("Account name is required").refine((value) => {
        return value !== injected.value.accountName;
      }, "Account name not changed")
    });
    const state = reactive({
      accountName: ""
    });
    const handleSubmit = async (event) => {
      const { accountName } = event.data;
      try {
        await $fetch(`/api/user/financial-accounts/${accountId}`, {
          method: "put",
          body: { name: accountName }
        });
        toast.add({
          color: "success",
          title: "Success",
          description: "Account name changed successfully"
        });
        injected.value.accountName = accountName;
        injected.value.refreshAccount();
      } catch (error) {
        toast.add({
          color: "error",
          title: "Error",
          description: normalizeException(error).message
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtCard = _sfc_main$1;
      const _component_NuxtForm = _sfc_main$1$1;
      const _component_NuxtFormField = _sfc_main$2;
      const _component_NuxtButtonGroup = _sfc_main$3;
      const _component_NuxtInput = _sfc_main$4;
      const _component_NuxtButton = _sfc_main$7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-4" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_NuxtCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtForm, {
              state: unref(state),
              schema: unref(schema),
              onSubmit: handleSubmit
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_NuxtFormField, {
                    label: "Change account name",
                    description: `Current account name: ${unref(injected).accountName}`,
                    name: "accountName"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_NuxtButtonGroup, { class: "w-full" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_NuxtInput, {
                                modelValue: unref(state).accountName,
                                "onUpdate:modelValue": ($event) => unref(state).accountName = $event,
                                class: "flex-1"
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_NuxtButton, {
                                type: "submit",
                                label: "Submit",
                                icon: "i-lucide-circle-check",
                                "loading-auto": ""
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_NuxtInput, {
                                  modelValue: unref(state).accountName,
                                  "onUpdate:modelValue": ($event) => unref(state).accountName = $event,
                                  class: "flex-1"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                createVNode(_component_NuxtButton, {
                                  type: "submit",
                                  label: "Submit",
                                  icon: "i-lucide-circle-check",
                                  "loading-auto": ""
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_NuxtButtonGroup, { class: "w-full" }, {
                            default: withCtx(() => [
                              createVNode(_component_NuxtInput, {
                                modelValue: unref(state).accountName,
                                "onUpdate:modelValue": ($event) => unref(state).accountName = $event,
                                class: "flex-1"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                              createVNode(_component_NuxtButton, {
                                type: "submit",
                                label: "Submit",
                                icon: "i-lucide-circle-check",
                                "loading-auto": ""
                              })
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_NuxtFormField, {
                      label: "Change account name",
                      description: `Current account name: ${unref(injected).accountName}`,
                      name: "accountName"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_NuxtButtonGroup, { class: "w-full" }, {
                          default: withCtx(() => [
                            createVNode(_component_NuxtInput, {
                              modelValue: unref(state).accountName,
                              "onUpdate:modelValue": ($event) => unref(state).accountName = $event,
                              class: "flex-1"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(_component_NuxtButton, {
                              type: "submit",
                              label: "Submit",
                              icon: "i-lucide-circle-check",
                              "loading-auto": ""
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["description"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_NuxtForm, {
                state: unref(state),
                schema: unref(schema),
                onSubmit: withModifiers(handleSubmit, ["prevent"])
              }, {
                default: withCtx(() => [
                  createVNode(_component_NuxtFormField, {
                    label: "Change account name",
                    description: `Current account name: ${unref(injected).accountName}`,
                    name: "accountName"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_NuxtButtonGroup, { class: "w-full" }, {
                        default: withCtx(() => [
                          createVNode(_component_NuxtInput, {
                            modelValue: unref(state).accountName,
                            "onUpdate:modelValue": ($event) => unref(state).accountName = $event,
                            class: "flex-1"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_component_NuxtButton, {
                            type: "submit",
                            label: "Submit",
                            icon: "i-lucide-circle-check",
                            "loading-auto": ""
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["description"])
                ]),
                _: 1
              }, 8, ["state", "schema"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/user/accounts/[accountId]/settings.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=settings-DK5xsCmU.mjs.map
