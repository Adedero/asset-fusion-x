import { _ as __nuxt_component_14 } from './fetch-error-alert-B3Gd_w4n.mjs';
import { _ as _sfc_main$1, a as _sfc_main$2 } from './FormField-CzZJ1-Wb.mjs';
import { _ as _sfc_main$3 } from './Input-BtIiAvs7.mjs';
import { _ as __nuxt_component_3 } from './password-DSn7MFs0.mjs';
import { _ as _sfc_main$4 } from './Checkbox-CDtcWyCq.mjs';
import { M as useRoute, _ as __nuxt_component_0, c as _sfc_main$7, N as createError, b as useRuntimeConfig, n as navigateTo } from './server.mjs';
import { defineComponent, reactive, ref, unref, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { a as authClient } from './auth-ClryBvqZ.mjs';
import { L as LoginSchema } from '../_/schemas.mjs';
import { a6 as normalizeException } from '../nitro/nitro.mjs';
import { u as useAuthStore } from './auth.store-VvkDhiyP.mjs';
import './Alert-CXdXSwrA.mjs';
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
import 'better-auth/vue';
import 'better-auth/client/plugins';
import 'zod';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "sign-in-form",
  __ssrInlineRender: true,
  setup(__props) {
    const runtimeConfig = useRuntimeConfig();
    const route = useRoute();
    const authStore = useAuthStore();
    const state = reactive({
      email: "",
      password: "",
      rememberMe: true
    });
    function reset() {
      state.email = "";
      state.password = "";
      state.rememberMe = true;
    }
    const error = ref(null);
    async function onSubmit(event) {
      error.value = null;
      const encodedEmail = btoa(event.data.email);
      await authClient.signIn.email(event.data, {
        onError(ctx) {
          error.value = normalizeException(ctx.error);
        },
        async onSuccess() {
          reset();
          const sessionData = await authClient.getSession();
          if (!sessionData.data) {
            throw createError({
              status: 500,
              statusMessage: runtimeConfig.public.defaultErrorMsg,
              fatal: true
            });
          }
          authStore.setSession(sessionData.data.session);
          authStore.setUser(sessionData.data.user);
          const { redirect } = route.query;
          if (redirect) {
            await navigateTo(redirect.toString());
            return;
          }
          if (!sessionData.data?.user.emailVerified) {
            await navigateTo({
              name: "email-verification",
              query: { email: encodedEmail }
            });
            return;
          }
          const role = sessionData.data?.user.role;
          if (!role) {
            throw createError({
              status: 500,
              statusMessage: runtimeConfig.public.defaultErrorMsg,
              fatal: true
            });
          }
          if (role === "admin") {
            console.log(role);
            return;
          }
          if (role === "user") {
            await navigateTo("/user");
            return;
          }
        }
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_FetchErrorAlert = __nuxt_component_14;
      const _component_NuxtForm = _sfc_main$1;
      const _component_NuxtFormField = _sfc_main$2;
      const _component_NuxtInput = _sfc_main$3;
      const _component_NuxtPassword = __nuxt_component_3;
      const _component_NuxtCheckbox = _sfc_main$4;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_NuxtButton = _sfc_main$7;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      if (unref(error)) {
        _push(`<div class="mb-3">`);
        _push(ssrRenderComponent(_component_FetchErrorAlert, {
          message: unref(error).message
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_NuxtForm, {
        schema: unref(LoginSchema),
        state: unref(state),
        class: "space-y-4",
        onSubmit
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtFormField, {
              label: "Email",
              name: "email"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_NuxtInput, {
                    modelValue: unref(state).email,
                    "onUpdate:modelValue": ($event) => unref(state).email = $event,
                    size: "lg",
                    class: "w-full"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_NuxtInput, {
                      modelValue: unref(state).email,
                      "onUpdate:modelValue": ($event) => unref(state).email = $event,
                      size: "lg",
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_NuxtFormField, {
              label: "Password",
              name: "password"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_NuxtPassword, {
                    modelValue: unref(state).password,
                    "onUpdate:modelValue": ($event) => unref(state).password = $event,
                    size: "lg",
                    class: "w-full"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_NuxtPassword, {
                      modelValue: unref(state).password,
                      "onUpdate:modelValue": ($event) => unref(state).password = $event,
                      size: "lg",
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="flex items-center gap-2 justify-between"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtFormField, { name: "rememberMe" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_NuxtCheckbox, {
                    modelValue: unref(state).rememberMe,
                    "onUpdate:modelValue": ($event) => unref(state).rememberMe = $event,
                    label: "Remember me"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_NuxtCheckbox, {
                      modelValue: unref(state).rememberMe,
                      "onUpdate:modelValue": ($event) => unref(state).rememberMe = $event,
                      label: "Remember me"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/forgot-password",
              class: "link text-sm"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Forgot password`);
                } else {
                  return [
                    createTextVNode("Forgot password")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_component_NuxtButton, {
              type: "submit",
              class: "mt-2 w-full flex-center",
              size: "lg",
              icon: "i-lucide-log-in",
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
          } else {
            return [
              createVNode(_component_NuxtFormField, {
                label: "Email",
                name: "email"
              }, {
                default: withCtx(() => [
                  createVNode(_component_NuxtInput, {
                    modelValue: unref(state).email,
                    "onUpdate:modelValue": ($event) => unref(state).email = $event,
                    size: "lg",
                    class: "w-full"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_NuxtFormField, {
                label: "Password",
                name: "password"
              }, {
                default: withCtx(() => [
                  createVNode(_component_NuxtPassword, {
                    modelValue: unref(state).password,
                    "onUpdate:modelValue": ($event) => unref(state).password = $event,
                    size: "lg",
                    class: "w-full"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode("div", { class: "flex items-center gap-2 justify-between" }, [
                createVNode(_component_NuxtFormField, { name: "rememberMe" }, {
                  default: withCtx(() => [
                    createVNode(_component_NuxtCheckbox, {
                      modelValue: unref(state).rememberMe,
                      "onUpdate:modelValue": ($event) => unref(state).rememberMe = $event,
                      label: "Remember me"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 1
                }),
                createVNode(_component_NuxtLink, {
                  to: "/forgot-password",
                  class: "link text-sm"
                }, {
                  default: withCtx(() => [
                    createTextVNode("Forgot password")
                  ]),
                  _: 1
                })
              ]),
              createVNode(_component_NuxtButton, {
                type: "submit",
                class: "mt-2 w-full flex-center",
                size: "lg",
                icon: "i-lucide-log-in",
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
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/(auth)/sign-in/sign-in-form.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=sign-in-form-pI9j8RnX.mjs.map
