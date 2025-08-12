import { _ as _sfc_main$1 } from './Collapsible-P-6QItT2.mjs';
import { i as useToast, c as _sfc_main$7 } from './server.mjs';
import { _ as _sfc_main$1$1, a as _sfc_main$2 } from './FormField-CzZJ1-Wb.mjs';
import { _ as _sfc_main$3 } from './Input-BtIiAvs7.mjs';
import { defineComponent, ref, computed, reactive, mergeProps, unref, isRef, withCtx, createVNode, createTextVNode, withModifiers, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import z from 'zod';
import { u as useAuthStore } from './auth.store-VvkDhiyP.mjs';
import { a5 as normalizeException } from '../nitro/nitro.mjs';
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
  __name: "name-changer",
  __ssrInlineRender: true,
  setup(__props) {
    const authStore = useAuthStore();
    const toast = useToast();
    const open = ref(false);
    const user = computed(() => authStore.user.value);
    const schema = z.object({
      name: z.string().min(1, "Name is required")
    });
    const state = reactive({
      name: ""
    });
    function reset() {
      state.name = "";
    }
    const error = ref(null);
    async function onSubmit(event) {
      error.value = null;
      try {
        const data = await $fetch("/api/user", {
          method: "PUT",
          body: JSON.stringify({ name: event.data.name }),
          headers: {
            "Content-Type": "application/json"
          }
        });
        reset();
        authStore.setUser({ ...authStore.user.value, name: data.name });
        open.value = false;
      } catch (err) {
        error.value = normalizeException(err);
        toast.add({
          title: "Error",
          description: error.value.message || "Failed to update name",
          color: "error"
        });
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtCollapsible = _sfc_main$1;
      const _component_NuxtButton = _sfc_main$7;
      const _component_NuxtForm = _sfc_main$1$1;
      const _component_NuxtFormField = _sfc_main$2;
      const _component_NuxtInput = _sfc_main$3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full space-y-2" }, _attrs))}>`);
      if (unref(user)) {
        _push(`<p class="card-title">${ssrInterpolate(unref(user).name)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_NuxtCollapsible, {
        open: unref(open),
        "onUpdate:open": ($event) => isRef(open) ? open.value = $event : null,
        class: "flex flex-col gap-4 w-full"
      }, {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtForm, {
              schema: unref(schema),
              state: unref(state),
              class: "space-y-3",
              onSubmit
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_NuxtFormField, {
                    label: "Full name",
                    name: "name"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_NuxtInput, {
                          modelValue: unref(state).name,
                          "onUpdate:modelValue": ($event) => unref(state).name = $event,
                          size: "lg",
                          class: "w-full"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_NuxtInput, {
                            modelValue: unref(state).name,
                            "onUpdate:modelValue": ($event) => unref(state).name = $event,
                            size: "lg",
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
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
                      label: "Full name",
                      name: "name"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_NuxtInput, {
                          modelValue: unref(state).name,
                          "onUpdate:modelValue": ($event) => unref(state).name = $event,
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
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_NuxtForm, {
                schema: unref(schema),
                state: unref(state),
                class: "space-y-3",
                onSubmit: withModifiers(onSubmit, ["prevent"])
              }, {
                default: withCtx(() => [
                  createVNode(_component_NuxtFormField, {
                    label: "Full name",
                    name: "name"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_NuxtInput, {
                        modelValue: unref(state).name,
                        "onUpdate:modelValue": ($event) => unref(state).name = $event,
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
                ]),
                _: 1
              }, 8, ["schema", "state"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtButton, {
              class: "group w-full",
              label: "Change name",
              color: "neutral",
              size: "lg",
              variant: "subtle",
              "trailing-icon": "i-lucide-chevron-down",
              ui: {
                trailingIcon: "group-data-[state=open]:rotate-180 transition-transform duration-200"
              },
              block: ""
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_NuxtButton, {
                class: "group w-full",
                label: "Change name",
                color: "neutral",
                size: "lg",
                variant: "subtle",
                "trailing-icon": "i-lucide-chevron-down",
                ui: {
                  trailingIcon: "group-data-[state=open]:rotate-180 transition-transform duration-200"
                },
                block: ""
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(user)) {
        _push(`<div class="mt-6"><p class="card-title">${ssrInterpolate(unref(user).email)}</p>`);
        _push(ssrRenderComponent(_component_NuxtButton, {
          class: "mt-2 w-full",
          label: "Change email",
          color: "neutral",
          variant: "subtle",
          "trailing-icon": "i-lucide-arrow-up-right",
          block: "",
          to: "/user/change-email"
        }, null, _parent));
        _push(`</div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/user/profile/components/name-changer.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=name-changer-DzQ8xqDV.mjs.map
