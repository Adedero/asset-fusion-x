import { _ as _sfc_main$1 } from './Card-HL6icAYQ.mjs';
import { _ as _sfc_main$6 } from './Badge-q_8fq56_.mjs';
import { _ as __nuxt_component_14 } from './fetch-error-alert-B3Gd_w4n.mjs';
import { _ as _sfc_main$1$1, a as _sfc_main$2 } from './FormField-CzZJ1-Wb.mjs';
import { _ as _sfc_main$3 } from './Input-BtIiAvs7.mjs';
import { _ as _sfc_main$4 } from './Select-CrSzJZds.mjs';
import { _ as _sfc_main$5 } from './InputNumber-DfQ_yysT.mjs';
import { M as useRoute, c as _sfc_main$7, n as navigateTo } from './server.mjs';
import { defineComponent, reactive, ref, unref, mergeProps, withCtx, createVNode, createTextVNode, createBlock, createCommentVNode, openBlock, withModifiers, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import z from 'zod';
import { a as accountRoles } from './account-DSHVo1jr.mjs';
import { a5 as normalizeException } from '../nitro/nitro.mjs';
import { t as toCase } from './to-case-ChuH9uWD.mjs';
import 'reka-ui';
import './Alert-CXdXSwrA.mjs';
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
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const accountType = route.params?.accountType?.toString();
    const accountOwnership = route.params?.accountOwnership?.toString();
    const schema = z.object({
      accountName: z.string().min(3, { message: "Account name is required." }),
      jointOwnershipRole: z.string().optional(),
      jointOwnership: z.number().nonnegative({ message: "Ownership cannot be negative" }).max(100, { message: "Ownership cannot be more than 100%" }).optional()
    });
    const state = reactive({
      accountName: ""
    });
    function reset() {
      state.accountName = "";
    }
    const error = ref(null);
    async function onSubmit(event) {
      error.value = null;
      try {
        await $fetch("/api/user/financial-accounts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: {
            ...event.data,
            jointOwnershipRole: event.data.jointOwnershipRole ? toCase(event.data.jointOwnershipRole, "snake") : void 0,
            accountType,
            accountOwnership
          }
        });
        reset();
        await navigateTo("/user/accounts");
      } catch (err) {
        error.value = normalizeException(err);
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtCard = _sfc_main$1;
      const _component_NuxtBadge = _sfc_main$6;
      const _component_FetchErrorAlert = __nuxt_component_14;
      const _component_NuxtForm = _sfc_main$1$1;
      const _component_NuxtFormField = _sfc_main$2;
      const _component_NuxtInput = _sfc_main$3;
      const _component_NuxtSelect = _sfc_main$4;
      const _component_NuxtInputNumber = _sfc_main$5;
      const _component_NuxtButton = _sfc_main$7;
      if (unref(accountOwnership) && unref(accountType)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "fluid" }, _attrs))}><div class="fluid flex-center">`);
        _push(ssrRenderComponent(_component_NuxtCard, { class: "md:w-96" }, {
          header: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<h1 class="text-2xl font-semibold mb-2"${_scopeId}>Open your account</h1><div class="flex items-center gap-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_NuxtBadge, {
                size: "lg",
                label: unref(accountOwnership),
                variant: "soft"
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_NuxtBadge, {
                size: "lg",
                label: unref(accountType),
                variant: "soft",
                color: "error"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              return [
                createVNode("h1", { class: "text-2xl font-semibold mb-2" }, "Open your account"),
                createVNode("div", { class: "flex items-center gap-2" }, [
                  createVNode(_component_NuxtBadge, {
                    size: "lg",
                    label: unref(accountOwnership),
                    variant: "soft"
                  }, null, 8, ["label"]),
                  createVNode(_component_NuxtBadge, {
                    size: "lg",
                    label: unref(accountType),
                    variant: "soft",
                    color: "error"
                  }, null, 8, ["label"])
                ])
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (unref(error)) {
                _push2(ssrRenderComponent(_component_FetchErrorAlert, {
                  message: unref(error).message,
                  class: "mb-4"
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(ssrRenderComponent(_component_NuxtForm, {
                schema: unref(schema),
                state: unref(state),
                class: "space-y-4",
                onSubmit
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_NuxtFormField, {
                      label: "Account Name",
                      name: "accountName",
                      description: "Enter a name for your account"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_NuxtInput, {
                            modelValue: unref(state).accountName,
                            "onUpdate:modelValue": ($event) => unref(state).accountName = $event,
                            size: "lg",
                            class: "w-full"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_NuxtInput, {
                              modelValue: unref(state).accountName,
                              "onUpdate:modelValue": ($event) => unref(state).accountName = $event,
                              size: "lg",
                              class: "w-full"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    if (unref(accountOwnership) === "joint") {
                      _push3(ssrRenderComponent(_component_NuxtFormField, {
                        name: "jointOwnershipRole",
                        label: "Role",
                        description: "Enter your specific role"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_component_NuxtSelect, {
                              modelValue: unref(state).jointOwnershipRole,
                              "onUpdate:modelValue": ($event) => unref(state).jointOwnershipRole = $event,
                              items: unref(accountRoles),
                              size: "lg",
                              class: "w-full"
                            }, null, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(_component_NuxtSelect, {
                                modelValue: unref(state).jointOwnershipRole,
                                "onUpdate:modelValue": ($event) => unref(state).jointOwnershipRole = $event,
                                items: unref(accountRoles),
                                size: "lg",
                                class: "w-full"
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                    if (unref(accountOwnership) === "joint") {
                      _push3(ssrRenderComponent(_component_NuxtFormField, {
                        name: "jointOwnership",
                        label: "Ownership",
                        description: "The percentage of this account you own"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_component_NuxtInputNumber, {
                              modelValue: unref(state).jointOwnership,
                              "onUpdate:modelValue": ($event) => unref(state).jointOwnership = $event,
                              min: 1,
                              max: 100,
                              size: "lg",
                              class: "w-full"
                            }, null, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(_component_NuxtInputNumber, {
                                modelValue: unref(state).jointOwnership,
                                "onUpdate:modelValue": ($event) => unref(state).jointOwnership = $event,
                                min: 1,
                                max: 100,
                                size: "lg",
                                class: "w-full"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(ssrRenderComponent(_component_NuxtButton, {
                      type: "submit",
                      class: "mt-2 w-full flex-center",
                      size: "lg",
                      icon: "i-lucide-check-circle",
                      "loading-auto": ""
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Submit `);
                        } else {
                          return [
                            createTextVNode(" Submit ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_NuxtFormField, {
                        label: "Account Name",
                        name: "accountName",
                        description: "Enter a name for your account"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_NuxtInput, {
                            modelValue: unref(state).accountName,
                            "onUpdate:modelValue": ($event) => unref(state).accountName = $event,
                            size: "lg",
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      unref(accountOwnership) === "joint" ? (openBlock(), createBlock(_component_NuxtFormField, {
                        key: 0,
                        name: "jointOwnershipRole",
                        label: "Role",
                        description: "Enter your specific role"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_NuxtSelect, {
                            modelValue: unref(state).jointOwnershipRole,
                            "onUpdate:modelValue": ($event) => unref(state).jointOwnershipRole = $event,
                            items: unref(accountRoles),
                            size: "lg",
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                        ]),
                        _: 1
                      })) : createCommentVNode("", true),
                      unref(accountOwnership) === "joint" ? (openBlock(), createBlock(_component_NuxtFormField, {
                        key: 1,
                        name: "jointOwnership",
                        label: "Ownership",
                        description: "The percentage of this account you own"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_NuxtInputNumber, {
                            modelValue: unref(state).jointOwnership,
                            "onUpdate:modelValue": ($event) => unref(state).jointOwnership = $event,
                            min: 1,
                            max: 100,
                            size: "lg",
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      })) : createCommentVNode("", true),
                      createVNode(_component_NuxtButton, {
                        type: "submit",
                        class: "mt-2 w-full flex-center",
                        size: "lg",
                        icon: "i-lucide-check-circle",
                        "loading-auto": ""
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Submit ")
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
                unref(error) ? (openBlock(), createBlock(_component_FetchErrorAlert, {
                  key: 0,
                  message: unref(error).message,
                  class: "mb-4"
                }, null, 8, ["message"])) : createCommentVNode("", true),
                createVNode(_component_NuxtForm, {
                  schema: unref(schema),
                  state: unref(state),
                  class: "space-y-4",
                  onSubmit: withModifiers(onSubmit, ["prevent"])
                }, {
                  default: withCtx(() => [
                    createVNode(_component_NuxtFormField, {
                      label: "Account Name",
                      name: "accountName",
                      description: "Enter a name for your account"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_NuxtInput, {
                          modelValue: unref(state).accountName,
                          "onUpdate:modelValue": ($event) => unref(state).accountName = $event,
                          size: "lg",
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    unref(accountOwnership) === "joint" ? (openBlock(), createBlock(_component_NuxtFormField, {
                      key: 0,
                      name: "jointOwnershipRole",
                      label: "Role",
                      description: "Enter your specific role"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_NuxtSelect, {
                          modelValue: unref(state).jointOwnershipRole,
                          "onUpdate:modelValue": ($event) => unref(state).jointOwnershipRole = $event,
                          items: unref(accountRoles),
                          size: "lg",
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    unref(accountOwnership) === "joint" ? (openBlock(), createBlock(_component_NuxtFormField, {
                      key: 1,
                      name: "jointOwnership",
                      label: "Ownership",
                      description: "The percentage of this account you own"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_NuxtInputNumber, {
                          modelValue: unref(state).jointOwnership,
                          "onUpdate:modelValue": ($event) => unref(state).jointOwnership = $event,
                          min: 1,
                          max: 100,
                          size: "lg",
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    createVNode(_component_NuxtButton, {
                      type: "submit",
                      class: "mt-2 w-full flex-center",
                      size: "lg",
                      icon: "i-lucide-check-circle",
                      "loading-auto": ""
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Submit ")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["schema", "state"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/user/accounts/open/[accountType]/[accountOwnership]/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CR0A27Hv.mjs.map
