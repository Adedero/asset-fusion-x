import { _ as __nuxt_component_0 } from './my-page-BfvFQYC3.mjs';
import { _ as _sfc_main$1 } from './Form-CN89EuEL.mjs';
import { h as useToast, c as _sfc_main$a } from './server.mjs';
import { _ as _sfc_main$2 } from './Card-HL6icAYQ.mjs';
import { _ as _sfc_main$3 } from './FormField-VKcmi1Hz.mjs';
import { _ as _sfc_main$4 } from './Switch-BnglWgng.mjs';
import { defineComponent, withAsyncContext, computed, reactive, mergeProps, unref, withCtx, createVNode, withModifiers, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { S as SettingsSchema } from '../_/index.mjs';
import { a7 as normalizeException } from '../nitro/nitro.mjs';
import { u as useFetch } from './fetch-C-iVS2Yi.mjs';
import './fetch-error-alert-Bcg5pKlj.mjs';
import './Alert-BqT4iGv1.mjs';
import 'reka-ui';
import '@vueuse/core';
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
import 'ipx';
import 'zod';
import '@vue/shared';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "settings",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const toast = useToast();
    const { data, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/settings", "$ZSD9n5rcvX")), __temp = await __temp, __restore(), __temp);
    const initial = computed(() => ({ ...data.value }));
    const state = reactive({
      ...initial.value
    });
    const hasChanged = computed(() => {
      return JSON.stringify(initial.value) !== JSON.stringify(state);
    });
    const handleSubmit = async (event) => {
      try {
        const { message } = await $fetch("/api/admin/settings", {
          method: "PUT",
          body: event.data
        });
        await refresh();
        toast.add({ color: "success", title: "Success", description: message });
      } catch (err) {
        toast.add({
          color: "error",
          title: "Error",
          description: normalizeException(err).message
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MyPage = __nuxt_component_0;
      const _component_NuxtForm = _sfc_main$1;
      const _component_NuxtButton = _sfc_main$a;
      const _component_NuxtCard = _sfc_main$2;
      const _component_NuxtFormField = _sfc_main$3;
      const _component_NuxtSwitch = _sfc_main$4;
      _push(ssrRenderComponent(_component_MyPage, mergeProps({
        error: unref(error),
        onRefresh: () => unref(refresh)()
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}><div class="flex items-center justify-between"${_scopeId}><h1 class="text-3xl font-semibold"${_scopeId}>Settings</h1></div><section class="mt-5"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtForm, {
              state: unref(state),
              schema: unref(SettingsSchema),
              class: "space-y-5",
              onSubmit: handleSubmit
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="fixed top-20 right-5"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_NuxtButton, {
                    type: "submit",
                    label: "Save",
                    icon: "lucide:save",
                    disabled: !unref(hasChanged),
                    "loading-auto": ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(_component_NuxtCard, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_NuxtFormField, { name: "allowWithdrawals" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="flex items-center gap-5 justify-between"${_scopeId4}><div${_scopeId4}><p class="font-semibold"${_scopeId4}>Allow Withdrawals</p><p class="text-muted"${_scopeId4}> Enable or disable withdrawals across the platform. </p></div>`);
                              _push5(ssrRenderComponent(_component_NuxtSwitch, {
                                modelValue: unref(state).allowWithdrawals,
                                "onUpdate:modelValue": ($event) => unref(state).allowWithdrawals = $event
                              }, null, _parent5, _scopeId4));
                              _push5(`</div>`);
                            } else {
                              return [
                                createVNode("div", { class: "flex items-center gap-5 justify-between" }, [
                                  createVNode("div", null, [
                                    createVNode("p", { class: "font-semibold" }, "Allow Withdrawals"),
                                    createVNode("p", { class: "text-muted" }, " Enable or disable withdrawals across the platform. ")
                                  ]),
                                  createVNode(_component_NuxtSwitch, {
                                    modelValue: unref(state).allowWithdrawals,
                                    "onUpdate:modelValue": ($event) => unref(state).allowWithdrawals = $event
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_NuxtFormField, { name: "allowWithdrawals" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex items-center gap-5 justify-between" }, [
                                createVNode("div", null, [
                                  createVNode("p", { class: "font-semibold" }, "Allow Withdrawals"),
                                  createVNode("p", { class: "text-muted" }, " Enable or disable withdrawals across the platform. ")
                                ]),
                                createVNode(_component_NuxtSwitch, {
                                  modelValue: unref(state).allowWithdrawals,
                                  "onUpdate:modelValue": ($event) => unref(state).allowWithdrawals = $event
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ])
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
                    createVNode("div", { class: "fixed top-20 right-5" }, [
                      createVNode(_component_NuxtButton, {
                        type: "submit",
                        label: "Save",
                        icon: "lucide:save",
                        disabled: !unref(hasChanged),
                        "loading-auto": ""
                      }, null, 8, ["disabled"])
                    ]),
                    createVNode(_component_NuxtCard, null, {
                      default: withCtx(() => [
                        createVNode(_component_NuxtFormField, { name: "allowWithdrawals" }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "flex items-center gap-5 justify-between" }, [
                              createVNode("div", null, [
                                createVNode("p", { class: "font-semibold" }, "Allow Withdrawals"),
                                createVNode("p", { class: "text-muted" }, " Enable or disable withdrawals across the platform. ")
                              ]),
                              createVNode(_component_NuxtSwitch, {
                                modelValue: unref(state).allowWithdrawals,
                                "onUpdate:modelValue": ($event) => unref(state).allowWithdrawals = $event
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ])
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
            }, _parent2, _scopeId));
            _push2(`</section></div>`);
          } else {
            return [
              createVNode("div", null, [
                createVNode("div", { class: "flex items-center justify-between" }, [
                  createVNode("h1", { class: "text-3xl font-semibold" }, "Settings")
                ]),
                createVNode("section", { class: "mt-5" }, [
                  createVNode(_component_NuxtForm, {
                    state: unref(state),
                    schema: unref(SettingsSchema),
                    class: "space-y-5",
                    onSubmit: withModifiers(handleSubmit, ["prevent"])
                  }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "fixed top-20 right-5" }, [
                        createVNode(_component_NuxtButton, {
                          type: "submit",
                          label: "Save",
                          icon: "lucide:save",
                          disabled: !unref(hasChanged),
                          "loading-auto": ""
                        }, null, 8, ["disabled"])
                      ]),
                      createVNode(_component_NuxtCard, null, {
                        default: withCtx(() => [
                          createVNode(_component_NuxtFormField, { name: "allowWithdrawals" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex items-center gap-5 justify-between" }, [
                                createVNode("div", null, [
                                  createVNode("p", { class: "font-semibold" }, "Allow Withdrawals"),
                                  createVNode("p", { class: "text-muted" }, " Enable or disable withdrawals across the platform. ")
                                ]),
                                createVNode(_component_NuxtSwitch, {
                                  modelValue: unref(state).allowWithdrawals,
                                  "onUpdate:modelValue": ($event) => unref(state).allowWithdrawals = $event
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["state", "schema"])
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
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/settings.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=settings-p62Cprjt.mjs.map
