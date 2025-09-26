import { _ as __nuxt_component_14 } from './fetch-error-alert-NIQ5BlkS.mjs';
import { _ as _sfc_main$1 } from './Form-BhNutJZb.mjs';
import { _ as _sfc_main$2 } from './FormField-CZNrbocD.mjs';
import { _ as __nuxt_component_3 } from './password-Lu-ozsVx.mjs';
import { R as useRoute, c as _sfc_main$a, h as _sfc_main$4, i as authClient } from './server.mjs';
import { defineComponent, reactive, ref, unref, withCtx, createVNode, createTextVNode, isRef, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { a3 as normalizeException } from '../nitro/nitro.mjs';
import { b as ResetPasswordSchema } from '../_/schemas.mjs';
import './Alert-CKjxjhE_.mjs';
import 'reka-ui';
import '@vueuse/core';
import './Input-DzWaUazq.mjs';
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
import 'decimal.js';
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
import 'zod';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "reset-password-form",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const token = route.query.token?.toString();
    const state = reactive({
      password: "",
      confirmPassword: ""
    });
    function reset() {
      state.password = "";
      state.confirmPassword = "";
    }
    const error = ref(null);
    const open = ref(false);
    async function onSubmit(event) {
      error.value = null;
      if (!token) {
        error.value = new Error("Invalid or expired token. Try again later.");
        return;
      }
      const { password } = event.data;
      await authClient.resetPassword(
        {
          newPassword: password,
          token
        },
        {
          onError(ctx) {
            error.value = normalizeException(ctx.error);
          },
          onSuccess() {
            reset();
            open.value = true;
          }
        }
      );
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_FetchErrorAlert = __nuxt_component_14;
      const _component_NuxtForm = _sfc_main$1;
      const _component_NuxtFormField = _sfc_main$2;
      const _component_NuxtPassword = __nuxt_component_3;
      const _component_NuxtButton = _sfc_main$a;
      const _component_NuxtModal = _sfc_main$4;
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
        schema: unref(ResetPasswordSchema),
        state: unref(state),
        class: "space-y-4",
        onSubmit
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtFormField, {
              label: "New Password",
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
            _push2(ssrRenderComponent(_component_NuxtFormField, {
              label: "Confirm New Password",
              name: "confirmPassword"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_NuxtPassword, {
                    modelValue: unref(state).confirmPassword,
                    "onUpdate:modelValue": ($event) => unref(state).confirmPassword = $event,
                    size: "lg",
                    class: "w-full"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_NuxtPassword, {
                      modelValue: unref(state).confirmPassword,
                      "onUpdate:modelValue": ($event) => unref(state).confirmPassword = $event,
                      size: "lg",
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_NuxtButton, {
              type: "submit",
              class: "mt-2 w-full flex-center",
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
          } else {
            return [
              createVNode(_component_NuxtFormField, {
                label: "New Password",
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
              createVNode(_component_NuxtFormField, {
                label: "Confirm New Password",
                name: "confirmPassword"
              }, {
                default: withCtx(() => [
                  createVNode(_component_NuxtPassword, {
                    modelValue: unref(state).confirmPassword,
                    "onUpdate:modelValue": ($event) => unref(state).confirmPassword = $event,
                    size: "lg",
                    class: "w-full"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
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
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtModal, {
        open: unref(open),
        "onUpdate:open": ($event) => isRef(open) ? open.value = $event : null,
        title: "Success",
        close: false,
        dismissible: false,
        ui: { footer: "justify-end" }
      }, {
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-3"${_scopeId}><p${_scopeId}> Your password has been reset successfully! Sign in now to continue. </p></div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-3" }, [
                createVNode("p", null, " Your password has been reset successfully! Sign in now to continue. ")
              ])
            ];
          }
        }),
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtButton, {
              to: { name: "sign-in" },
              label: "Sign in",
              "trailing-icon": "lucide-circle-arrow-right"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_NuxtButton, {
                to: { name: "sign-in" },
                label: "Sign in",
                "trailing-icon": "lucide-circle-arrow-right"
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/(auth)/reset-password/reset-password-form.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=reset-password-form-CHF33NcN.mjs.map
