import { _ as _sfc_main$1 } from './Card-HL6icAYQ.mjs';
import { _ as __nuxt_component_3$1 } from './app-logo-h2drnef0.mjs';
import { _ as _sfc_main$1$1, a as _sfc_main$2 } from './FormField-CzZJ1-Wb.mjs';
import { _ as __nuxt_component_14 } from './fetch-error-alert-B3Gd_w4n.mjs';
import { _ as __nuxt_component_3 } from './password-DSn7MFs0.mjs';
import { i as useToast, c as _sfc_main$7, n as navigateTo } from './server.mjs';
import { defineComponent, reactive, ref, mergeProps, withCtx, unref, createVNode, createBlock, createCommentVNode, openBlock, withModifiers, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import z from 'zod';
import { a as authClient } from './auth-ClryBvqZ.mjs';
import { a as PasswordSchema } from '../_/schemas.mjs';
import 'reka-ui';
import '@vueuse/core';
import './Alert-CXdXSwrA.mjs';
import './Input-BtIiAvs7.mjs';
import '../nitro/nitro.mjs';
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
import 'better-auth/vue';
import 'better-auth/client/plugins';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const toast = useToast();
    const schema = z.object({
      currentPassword: z.string({ message: "Enter your old password" }).nonempty({ message: "Password is required" }),
      password: PasswordSchema,
      confirmPassword: z.string({ message: "Confirm your password" })
    }).refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"]
    });
    const state = reactive({
      currentPassword: "",
      password: "",
      confirmPassword: ""
    });
    const errorMessage = ref("");
    const handleSubmit = async (event) => {
      const { currentPassword, password } = event.data;
      await authClient.changePassword(
        {
          newPassword: password,
          currentPassword,
          revokeOtherSessions: true
        },
        {
          onError: (ctx) => {
            errorMessage.value = ctx.error.message;
          },
          onSuccess: () => {
            toast.add({
              color: "success",
              title: "Success",
              description: "Password changed successfully"
            });
            navigateTo("/sign-in");
          }
        }
      );
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtCard = _sfc_main$1;
      const _component_AppLogo = __nuxt_component_3$1;
      const _component_NuxtForm = _sfc_main$1$1;
      const _component_FetchErrorAlert = __nuxt_component_14;
      const _component_NuxtFormField = _sfc_main$2;
      const _component_NuxtPassword = __nuxt_component_3;
      const _component_NuxtButton = _sfc_main$7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex-center h-full" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_NuxtCard, { class: "w-full max-w-96" }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtCard, {
              class: "w-fit",
              variant: "subtle",
              ui: { body: "p-2.5 sm:p-2.5" }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_AppLogo, { size: "32" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_AppLogo, { size: "32" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_NuxtCard, {
                class: "w-fit",
                variant: "subtle",
                ui: { body: "p-2.5 sm:p-2.5" }
              }, {
                default: withCtx(() => [
                  createVNode(_component_AppLogo, { size: "32" })
                ]),
                _: 1
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtForm, {
              state: unref(state),
              schema: unref(schema),
              class: "space-y-4",
              onSubmit: handleSubmit
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p class="text-xl font-semibold"${_scopeId2}>Change Password</p>`);
                  if (unref(errorMessage)) {
                    _push3(ssrRenderComponent(_component_FetchErrorAlert, { message: unref(errorMessage) }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(ssrRenderComponent(_component_NuxtFormField, {
                    name: "currentPassword",
                    label: "Current Password",
                    description: "Enter your current password",
                    class: "w-full"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_NuxtPassword, {
                          modelValue: unref(state).currentPassword,
                          "onUpdate:modelValue": ($event) => unref(state).currentPassword = $event,
                          class: "w-full"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_NuxtPassword, {
                            modelValue: unref(state).currentPassword,
                            "onUpdate:modelValue": ($event) => unref(state).currentPassword = $event,
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_NuxtFormField, {
                    name: "password",
                    label: "Password",
                    description: "Enter your new password",
                    class: "w-full"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_NuxtPassword, {
                          modelValue: unref(state).password,
                          "onUpdate:modelValue": ($event) => unref(state).password = $event,
                          class: "w-full"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_NuxtPassword, {
                            modelValue: unref(state).password,
                            "onUpdate:modelValue": ($event) => unref(state).password = $event,
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_NuxtFormField, {
                    name: "confirmPassword",
                    label: "Confirm Password",
                    description: "Verify your password so you're sure",
                    class: "w-full"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_NuxtPassword, {
                          modelValue: unref(state).confirmPassword,
                          "onUpdate:modelValue": ($event) => unref(state).confirmPassword = $event,
                          class: "w-full"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_NuxtPassword, {
                            modelValue: unref(state).confirmPassword,
                            "onUpdate:modelValue": ($event) => unref(state).confirmPassword = $event,
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_NuxtButton, {
                    class: "w-full flex-center",
                    type: "submit",
                    label: "Submit",
                    "loading-auto": "",
                    "trailing-icon": "i-lucide-circle-arrow-right"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("p", { class: "text-xl font-semibold" }, "Change Password"),
                    unref(errorMessage) ? (openBlock(), createBlock(_component_FetchErrorAlert, {
                      key: 0,
                      message: unref(errorMessage)
                    }, null, 8, ["message"])) : createCommentVNode("", true),
                    createVNode(_component_NuxtFormField, {
                      name: "currentPassword",
                      label: "Current Password",
                      description: "Enter your current password",
                      class: "w-full"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_NuxtPassword, {
                          modelValue: unref(state).currentPassword,
                          "onUpdate:modelValue": ($event) => unref(state).currentPassword = $event,
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_NuxtFormField, {
                      name: "password",
                      label: "Password",
                      description: "Enter your new password",
                      class: "w-full"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_NuxtPassword, {
                          modelValue: unref(state).password,
                          "onUpdate:modelValue": ($event) => unref(state).password = $event,
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_NuxtFormField, {
                      name: "confirmPassword",
                      label: "Confirm Password",
                      description: "Verify your password so you're sure",
                      class: "w-full"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_NuxtPassword, {
                          modelValue: unref(state).confirmPassword,
                          "onUpdate:modelValue": ($event) => unref(state).confirmPassword = $event,
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode("div", null, [
                      createVNode(_component_NuxtButton, {
                        class: "w-full flex-center",
                        type: "submit",
                        label: "Submit",
                        "loading-auto": "",
                        "trailing-icon": "i-lucide-circle-arrow-right"
                      })
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
                schema: unref(schema),
                class: "space-y-4",
                onSubmit: withModifiers(handleSubmit, ["prevent"])
              }, {
                default: withCtx(() => [
                  createVNode("p", { class: "text-xl font-semibold" }, "Change Password"),
                  unref(errorMessage) ? (openBlock(), createBlock(_component_FetchErrorAlert, {
                    key: 0,
                    message: unref(errorMessage)
                  }, null, 8, ["message"])) : createCommentVNode("", true),
                  createVNode(_component_NuxtFormField, {
                    name: "currentPassword",
                    label: "Current Password",
                    description: "Enter your current password",
                    class: "w-full"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_NuxtPassword, {
                        modelValue: unref(state).currentPassword,
                        "onUpdate:modelValue": ($event) => unref(state).currentPassword = $event,
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_NuxtFormField, {
                    name: "password",
                    label: "Password",
                    description: "Enter your new password",
                    class: "w-full"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_NuxtPassword, {
                        modelValue: unref(state).password,
                        "onUpdate:modelValue": ($event) => unref(state).password = $event,
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_NuxtFormField, {
                    name: "confirmPassword",
                    label: "Confirm Password",
                    description: "Verify your password so you're sure",
                    class: "w-full"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_NuxtPassword, {
                        modelValue: unref(state).confirmPassword,
                        "onUpdate:modelValue": ($event) => unref(state).confirmPassword = $event,
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode("div", null, [
                    createVNode(_component_NuxtButton, {
                      class: "w-full flex-center",
                      type: "submit",
                      label: "Submit",
                      "loading-auto": "",
                      "trailing-icon": "i-lucide-circle-arrow-right"
                    })
                  ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/user/change-password/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DwRo7LAq.mjs.map
