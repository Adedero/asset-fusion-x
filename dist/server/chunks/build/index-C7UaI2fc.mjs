import { _ as __nuxt_component_14 } from './fetch-error-alert-B3Gd_w4n.mjs';
import { _ as _sfc_main$1, a as _sfc_main$2 } from './FormField-CzZJ1-Wb.mjs';
import { _ as _sfc_main$3 } from './Input-BtIiAvs7.mjs';
import { b as useRuntimeConfig, c as _sfc_main$7, _ as __nuxt_component_0 } from './server.mjs';
import { _ as _sfc_main$4 } from './Separator-C2D_H5pj.mjs';
import { _ as _sfc_main$5 } from './Modal-DefLStPx.mjs';
import { _ as _sfc_main$6 } from './Alert-CXdXSwrA.mjs';
import { defineComponent, ref, reactive, unref, withCtx, createVNode, createTextVNode, isRef, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import z from 'zod';
import { E as EmailSchema } from '../_/schemas.mjs';
import { a as authClient } from './auth-ClryBvqZ.mjs';
import { a6 as normalizeException } from '../nitro/nitro.mjs';
import '@vueuse/core';
import 'reka-ui';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const runtimeConfig = useRuntimeConfig();
    const open = ref(false);
    const Schema = z.object({ email: EmailSchema });
    const state = reactive({ email: "" });
    function reset() {
      state.email = "";
    }
    const error = ref(null);
    async function onSubmit(event) {
      error.value = null;
      await authClient.requestPasswordReset(
        {
          email: event.data.email,
          redirectTo: "/reset-password"
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
      const _component_NuxtInput = _sfc_main$3;
      const _component_NuxtButton = _sfc_main$7;
      const _component_NuxtSeparator = _sfc_main$4;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_NuxtModal = _sfc_main$5;
      const _component_NuxtAlert = _sfc_main$6;
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 class="text-lg font-semibold">Forgot Password</h1><div class="text-sm text-muted"> If you&#39;ve forgotten your password, we can help you recover your ${ssrInterpolate(unref(runtimeConfig).public.appName)} account. </div><div class="my-5">`);
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
        schema: unref(Schema),
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
            _push2(ssrRenderComponent(_component_NuxtButton, {
              type: "submit",
              class: "mt-2 w-full flex-center",
              size: "lg",
              icon: "i-lucide-check-circle",
              "loading-auto": "",
              label: "Submit"
            }, null, _parent2, _scopeId));
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
              createVNode(_component_NuxtButton, {
                type: "submit",
                class: "mt-2 w-full flex-center",
                size: "lg",
                icon: "i-lucide-check-circle",
                "loading-auto": "",
                label: "Submit"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div>`);
      _push(ssrRenderComponent(_component_NuxtSeparator, { class: "my-5" }, null, _parent));
      _push(`<p class="text-sm text-muted"> Go back to `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "link",
        to: { name: "sign-in" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` sign in. `);
          } else {
            return [
              createTextVNode(" sign in. ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p></div>`);
      _push(ssrRenderComponent(_component_NuxtModal, {
        open: unref(open),
        "onUpdate:open": ($event) => isRef(open) ? open.value = $event : null,
        title: "Password reset request"
      }, {
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-3"${_scopeId}><p${_scopeId}> Click the link that has been sent to your email address to complete the password recovery process. </p>`);
            _push2(ssrRenderComponent(_component_NuxtAlert, {
              variant: "subtle",
              color: "info",
              icon: "i-lucide-triangle-alert",
              ui: {
                description: "text-[0.8rem]"
              },
              description: `If you do not see an email, you may not have an ${unref(runtimeConfig).public.appName} account.`
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-3" }, [
                createVNode("p", null, " Click the link that has been sent to your email address to complete the password recovery process. "),
                createVNode(_component_NuxtAlert, {
                  variant: "subtle",
                  color: "info",
                  icon: "i-lucide-triangle-alert",
                  ui: {
                    description: "text-[0.8rem]"
                  },
                  description: `If you do not see an email, you may not have an ${unref(runtimeConfig).public.appName} account.`
                }, null, 8, ["description"])
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/(auth)/forgot-password/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-C7UaI2fc.mjs.map
