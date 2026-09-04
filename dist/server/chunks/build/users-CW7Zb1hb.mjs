import { _ as __nuxt_component_0 } from './my-page-D-1fCn2X.mjs';
import { _ as _sfc_main$4 } from './FieldGroup-CARSobbR.mjs';
import { e as useToast, h as useConfirm, g as authClient, a as _sfc_main$a, f as _sfc_main$4$1 } from './server.mjs';
import { _ as _sfc_main$5 } from './Input-D-obAiG7.mjs';
import { _ as _sfc_main$6 } from './FormField-BuvMUjfY.mjs';
import { _ as _sfc_main$7 } from './Select-xAvxLs4-.mjs';
import { _ as _sfc_main$b } from './Form-bNvz49n8.mjs';
import { defineComponent, ref, computed, watch, withAsyncContext, mergeProps, unref, withCtx, isRef, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, createCommentVNode, useModel, reactive, withModifiers, mergeModels, useTemplateRef, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderStyle, ssrRenderSlot } from 'vue/server-renderer';
import z from 'zod';
import { d as PasswordSchema, a as BanUserSchema, e as banDurations } from '../_/schemas.mjs';
import { _ as _sfc_main$c } from './Textarea-DNKj0TkT.mjs';
import { _ as _sfc_main$d } from './Checkbox-BsvL1gEi.mjs';
import { a8 as normalizeException } from '../_/nitro.mjs';
import { _ as __nuxt_component_5, a as __nuxt_component_6, b as __nuxt_component_7$1, c as __nuxt_component_8$1, d as __nuxt_component_9, e as __nuxt_component_1 } from './v-table-cell-D3OgOQeO.mjs';
import { _ as __nuxt_component_11 } from './text-copy-button-D8zQ88_8.mjs';
import { _ as _sfc_main$8 } from './Badge-Cc8D9XvB.mjs';
import { _ as _sfc_main$9 } from './Tooltip-DezAoIQv.mjs';
import { _ as __nuxt_component_11$1 } from './simple-paginator-BzPX9la4.mjs';
import { useAsyncState, useDateFormat } from '@vueuse/core';
import { u as useAuthStore } from './auth.store--OUEo9hs.mjs';
import { a as useRequestHeaders } from './ssr-CXDHmH_F.mjs';
import './fetch-error-alert-3QlR-5z-.mjs';
import './Alert-Dos-p4_r.mjs';
import 'reka-ui';
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
import '@better-auth/core/utils';
import 'better-auth';
import 'better-auth/adapters/prisma';
import 'better-auth/plugins';
import '@iconify/utils';
import 'node:crypto';
import 'consola';
import './_plugin-vue_export-helper-1tPrXgE0.mjs';
import './Kbd-DKcZkr-0.mjs';

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "user-manager",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    user: { default: null }
  }, {
    "open": { type: Boolean, ...{ default: false } },
    "openModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["done"], ["update:open"]),
  setup(__props, { emit: __emit }) {
    const toast = useToast();
    const emit = __emit;
    const open = useModel(__props, "open");
    const isEditing = computed(() => !!__props.user);
    const roles = ["user", "admin"];
    const state = reactive(__props.user ?? {});
    const schema = z.object({
      name: z.string("Invalid name").nonempty("Name is required"),
      email: z.email("Invalid email"),
      role: z.enum(["user", "admin"], "Invalid role"),
      password: PasswordSchema
    });
    const handleSubmit = async (event) => {
      const { data } = event;
      await authClient.admin.createUser(data, {
        onSuccess() {
          emit("done");
          toast.add({
            color: "success",
            title: "Success",
            description: "User created successfully"
          });
          open.value = false;
        },
        onError(ctx) {
          toast.add({
            color: "error",
            title: "Error",
            description: ctx.error.message
          });
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtModal = _sfc_main$4$1;
      const _component_NuxtForm = _sfc_main$b;
      const _component_NuxtFormField = _sfc_main$6;
      const _component_NuxtInput = _sfc_main$5;
      const _component_NuxtSelect = _sfc_main$7;
      const _component_NuxtButton = _sfc_main$a;
      _push(ssrRenderComponent(_component_NuxtModal, mergeProps({
        open: open.value,
        "onUpdate:open": ($event) => open.value = $event,
        title: unref(isEditing) ? "Edit User" : "New User",
        dismissible: false
      }, _attrs), {
        body: withCtx(({ close }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtForm, {
              state: unref(state),
              schema: unref(schema),
              onSubmit: handleSubmit
            }, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="grid md:grid-cols-2 gap-3"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_NuxtFormField, {
                    name: "name",
                    label: "Name",
                    required: ""
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
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
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_NuxtFormField, {
                    name: "role",
                    label: "Role",
                    required: ""
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_NuxtSelect, {
                          modelValue: unref(state).role,
                          "onUpdate:modelValue": ($event) => unref(state).role = $event,
                          items: roles,
                          class: "w-full"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_NuxtSelect, {
                            modelValue: unref(state).role,
                            "onUpdate:modelValue": ($event) => unref(state).role = $event,
                            items: roles,
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_NuxtFormField, {
                    name: "email",
                    label: "Email",
                    required: "",
                    class: "md:col-span-2"
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_NuxtInput, {
                          modelValue: unref(state).email,
                          "onUpdate:modelValue": ($event) => unref(state).email = $event,
                          class: "w-full"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_NuxtInput, {
                            modelValue: unref(state).email,
                            "onUpdate:modelValue": ($event) => unref(state).email = $event,
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_NuxtFormField, {
                    name: "password",
                    label: "Password",
                    required: "",
                    class: "md:col-span-2"
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_NuxtInput, {
                          modelValue: unref(state).password,
                          "onUpdate:modelValue": ($event) => unref(state).password = $event,
                          class: "w-full"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_NuxtInput, {
                            modelValue: unref(state).password,
                            "onUpdate:modelValue": ($event) => unref(state).password = $event,
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(`<div class="flex items-center justify-end gap-2 md:col-span-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_NuxtButton, {
                    color: "neutral",
                    variant: "soft",
                    label: "Cancel",
                    onClick: close
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_NuxtButton, {
                    type: "submit",
                    label: "Submit",
                    "loading-auto": ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "grid md:grid-cols-2 gap-3" }, [
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
                        name: "role",
                        label: "Role",
                        required: ""
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_NuxtSelect, {
                            modelValue: unref(state).role,
                            "onUpdate:modelValue": ($event) => unref(state).role = $event,
                            items: roles,
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_NuxtFormField, {
                        name: "email",
                        label: "Email",
                        required: "",
                        class: "md:col-span-2"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_NuxtInput, {
                            modelValue: unref(state).email,
                            "onUpdate:modelValue": ($event) => unref(state).email = $event,
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_NuxtFormField, {
                        name: "password",
                        label: "Password",
                        required: "",
                        class: "md:col-span-2"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_NuxtInput, {
                            modelValue: unref(state).password,
                            "onUpdate:modelValue": ($event) => unref(state).password = $event,
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
                          onClick: close
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
              _: 2
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", null, [
                createVNode(_component_NuxtForm, {
                  state: unref(state),
                  schema: unref(schema),
                  onSubmit: withModifiers(handleSubmit, ["prevent"])
                }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "grid md:grid-cols-2 gap-3" }, [
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
                        name: "role",
                        label: "Role",
                        required: ""
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_NuxtSelect, {
                            modelValue: unref(state).role,
                            "onUpdate:modelValue": ($event) => unref(state).role = $event,
                            items: roles,
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_NuxtFormField, {
                        name: "email",
                        label: "Email",
                        required: "",
                        class: "md:col-span-2"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_NuxtInput, {
                            modelValue: unref(state).email,
                            "onUpdate:modelValue": ($event) => unref(state).email = $event,
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_NuxtFormField, {
                        name: "password",
                        label: "Password",
                        required: "",
                        class: "md:col-span-2"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_NuxtInput, {
                            modelValue: unref(state).password,
                            "onUpdate:modelValue": ($event) => unref(state).password = $event,
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
                          onClick: close
                        }, null, 8, ["onClick"]),
                        createVNode(_component_NuxtButton, {
                          type: "submit",
                          label: "Submit",
                          "loading-auto": ""
                        })
                      ])
                    ])
                  ]),
                  _: 2
                }, 1032, ["state", "schema"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/user-manager.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_7 = Object.assign(_sfc_main$3, { __name: "AdminUserManager" });
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ban-user-modal",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    user: {}
  }, {
    "open": { type: Boolean, ...{ default: false } },
    "openModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["done"], ["update:open"]),
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const open = useModel(__props, "open");
    const toast = useToast();
    const state = reactive({
      reason: "",
      duration: "permanent",
      banIp: false,
      ipAddress: ""
    });
    function reset() {
      state.reason = "";
      state.duration = "permanent";
      state.banIp = false;
      state.ipAddress = "";
    }
    watch(
      () => [open.value, __props.user?.id],
      async ([isOpen, userId]) => {
        reset();
        if (!isOpen || !userId) return;
        const res = await authClient.admin.listUserSessions({ userId });
        const sessions = res.data?.sessions ?? [];
        const latest = [...sessions].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )[0];
        state.ipAddress = latest?.ipAddress ?? "";
      }
    );
    const handleSubmit = async (event) => {
      if (!__props.user) return;
      try {
        await $fetch(`/api/admin/users/${__props.user.id}/ban`, {
          method: "POST",
          body: event.data
        });
        emit("done");
        toast.add({
          color: "success",
          title: "Success",
          description: "User banned successfully"
        });
        open.value = false;
      } catch (error) {
        toast.add({
          color: "error",
          title: "Error",
          description: normalizeException(error).message
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtModal = _sfc_main$4$1;
      const _component_NuxtForm = _sfc_main$b;
      const _component_NuxtFormField = _sfc_main$6;
      const _component_NuxtTextarea = _sfc_main$c;
      const _component_NuxtSelect = _sfc_main$7;
      const _component_NuxtCheckbox = _sfc_main$d;
      const _component_NuxtInput = _sfc_main$5;
      const _component_NuxtButton = _sfc_main$a;
      _push(ssrRenderComponent(_component_NuxtModal, mergeProps({
        open: open.value,
        "onUpdate:open": ($event) => open.value = $event,
        title: "Ban User",
        dismissible: false
      }, _attrs), {
        body: withCtx(({ close }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtForm, {
              state: unref(state),
              schema: unref(BanUserSchema),
              class: "space-y-4",
              onSubmit: handleSubmit
            }, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_NuxtFormField, {
                    name: "reason",
                    label: "Reason",
                    required: ""
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_NuxtTextarea, {
                          modelValue: unref(state).reason,
                          "onUpdate:modelValue": ($event) => unref(state).reason = $event,
                          "max-rows": 4,
                          autoresize: "",
                          class: "w-full",
                          placeholder: "Why is this user being banned?"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_NuxtTextarea, {
                            modelValue: unref(state).reason,
                            "onUpdate:modelValue": ($event) => unref(state).reason = $event,
                            "max-rows": 4,
                            autoresize: "",
                            class: "w-full",
                            placeholder: "Why is this user being banned?"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_NuxtFormField, {
                    name: "duration",
                    label: "Duration",
                    required: ""
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_NuxtSelect, {
                          modelValue: unref(state).duration,
                          "onUpdate:modelValue": ($event) => unref(state).duration = $event,
                          items: unref(banDurations),
                          class: "w-full"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_NuxtSelect, {
                            modelValue: unref(state).duration,
                            "onUpdate:modelValue": ($event) => unref(state).duration = $event,
                            items: unref(banDurations),
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_NuxtFormField, { name: "banIp" }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex items-center gap-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_NuxtCheckbox, {
                          modelValue: unref(state).banIp,
                          "onUpdate:modelValue": ($event) => unref(state).banIp = $event
                        }, null, _parent4, _scopeId3));
                        _push4(`<p${_scopeId3}>Also ban this user&#39;s IP address</p></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            createVNode(_component_NuxtCheckbox, {
                              modelValue: unref(state).banIp,
                              "onUpdate:modelValue": ($event) => unref(state).banIp = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode("p", null, "Also ban this user's IP address")
                          ])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  if (unref(state).banIp) {
                    _push3(ssrRenderComponent(_component_NuxtFormField, {
                      name: "ipAddress",
                      label: "IP Address",
                      required: ""
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_NuxtInput, {
                            modelValue: unref(state).ipAddress,
                            "onUpdate:modelValue": ($event) => unref(state).ipAddress = $event,
                            class: "w-full"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_NuxtInput, {
                              modelValue: unref(state).ipAddress,
                              "onUpdate:modelValue": ($event) => unref(state).ipAddress = $event,
                              class: "w-full"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<div class="flex items-center justify-end gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_NuxtButton, {
                    color: "neutral",
                    variant: "soft",
                    label: "Cancel",
                    onClick: close
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_NuxtButton, {
                    type: "submit",
                    color: "error",
                    label: "Ban User",
                    "loading-auto": ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode(_component_NuxtFormField, {
                      name: "reason",
                      label: "Reason",
                      required: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_NuxtTextarea, {
                          modelValue: unref(state).reason,
                          "onUpdate:modelValue": ($event) => unref(state).reason = $event,
                          "max-rows": 4,
                          autoresize: "",
                          class: "w-full",
                          placeholder: "Why is this user being banned?"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_NuxtFormField, {
                      name: "duration",
                      label: "Duration",
                      required: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_NuxtSelect, {
                          modelValue: unref(state).duration,
                          "onUpdate:modelValue": ($event) => unref(state).duration = $event,
                          items: unref(banDurations),
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_NuxtFormField, { name: "banIp" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex items-center gap-2" }, [
                          createVNode(_component_NuxtCheckbox, {
                            modelValue: unref(state).banIp,
                            "onUpdate:modelValue": ($event) => unref(state).banIp = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode("p", null, "Also ban this user's IP address")
                        ])
                      ]),
                      _: 1
                    }),
                    unref(state).banIp ? (openBlock(), createBlock(_component_NuxtFormField, {
                      key: 0,
                      name: "ipAddress",
                      label: "IP Address",
                      required: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_NuxtInput, {
                          modelValue: unref(state).ipAddress,
                          "onUpdate:modelValue": ($event) => unref(state).ipAddress = $event,
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    createVNode("div", { class: "flex items-center justify-end gap-2" }, [
                      createVNode(_component_NuxtButton, {
                        color: "neutral",
                        variant: "soft",
                        label: "Cancel",
                        onClick: close
                      }, null, 8, ["onClick"]),
                      createVNode(_component_NuxtButton, {
                        type: "submit",
                        color: "error",
                        label: "Ban User",
                        "loading-auto": ""
                      })
                    ])
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_NuxtForm, {
                state: unref(state),
                schema: unref(BanUserSchema),
                class: "space-y-4",
                onSubmit: withModifiers(handleSubmit, ["prevent"])
              }, {
                default: withCtx(() => [
                  createVNode(_component_NuxtFormField, {
                    name: "reason",
                    label: "Reason",
                    required: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_NuxtTextarea, {
                        modelValue: unref(state).reason,
                        "onUpdate:modelValue": ($event) => unref(state).reason = $event,
                        "max-rows": 4,
                        autoresize: "",
                        class: "w-full",
                        placeholder: "Why is this user being banned?"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_NuxtFormField, {
                    name: "duration",
                    label: "Duration",
                    required: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_NuxtSelect, {
                        modelValue: unref(state).duration,
                        "onUpdate:modelValue": ($event) => unref(state).duration = $event,
                        items: unref(banDurations),
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_NuxtFormField, { name: "banIp" }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "flex items-center gap-2" }, [
                        createVNode(_component_NuxtCheckbox, {
                          modelValue: unref(state).banIp,
                          "onUpdate:modelValue": ($event) => unref(state).banIp = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode("p", null, "Also ban this user's IP address")
                      ])
                    ]),
                    _: 1
                  }),
                  unref(state).banIp ? (openBlock(), createBlock(_component_NuxtFormField, {
                    key: 0,
                    name: "ipAddress",
                    label: "IP Address",
                    required: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_NuxtInput, {
                        modelValue: unref(state).ipAddress,
                        "onUpdate:modelValue": ($event) => unref(state).ipAddress = $event,
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
                  createVNode("div", { class: "flex items-center justify-end gap-2" }, [
                    createVNode(_component_NuxtButton, {
                      color: "neutral",
                      variant: "soft",
                      label: "Cancel",
                      onClick: close
                    }, null, 8, ["onClick"]),
                    createVNode(_component_NuxtButton, {
                      type: "submit",
                      color: "error",
                      label: "Ban User",
                      "loading-auto": ""
                    })
                  ])
                ]),
                _: 2
              }, 1032, ["state", "schema"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/ban-user-modal.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_8 = Object.assign(_sfc_main$2, { __name: "AdminBanUserModal" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "in-place",
  __ssrInlineRender: true,
  props: {
    trigger: { default: "click" }
  },
  setup(__props) {
    const isOpen = ref(false);
    useTemplateRef("el");
    function close() {
      isOpen.value = false;
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div style="${ssrRenderStyle(!unref(isOpen) ? null : { display: "none" })}">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div><div style="${ssrRenderStyle(unref(isOpen) ? null : { display: "none" })}">`);
      ssrRenderSlot(_ctx.$slots, "in-place", { close }, null, _push, _parent);
      _push(`</div><!--]-->`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/nuxt/in-place.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_17 = Object.assign(_sfc_main$1, { __name: "NuxtInPlace" });
const FETCH_LIMIT = 1e3;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "users",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const authStore = useAuthStore();
    const toast = useToast();
    const { confirmAsync } = useConfirm();
    const ssrRequestHeaders = useRequestHeaders(["cookie"]);
    const open = ref(false);
    const banOpen = ref(false);
    const filtersOpen = ref(false);
    const search = ref("");
    const limit = ref(20);
    const page = ref(0);
    const offset = computed(() => page.value * limit.value);
    const roleFilterOptions = [
      { label: "All", value: "all" },
      { label: "Users", value: "user" },
      { label: "Admins", value: "admin" }
    ];
    const statusFilterOptions = [
      { label: "All", value: "all" },
      { label: "Banned", value: "banned" },
      { label: "Not Banned", value: "not-banned" }
    ];
    const roleFilter = ref("all");
    const statusFilter = ref("all");
    watch([roleFilter, statusFilter], () => {
      page.value = 0;
    });
    const query = computed(() => ({
      searchValue: search.value,
      searchField: "name",
      searchOperator: "contains",
      limit: FETCH_LIMIT,
      sortBy: "name",
      sortDirection: "asc"
    }));
    const { state, error, isLoading, executeImmediate } = useAsyncState(
      listUsers,
      null
    );
    async function listUsers(queryParam) {
      const res = await authClient.admin.listUsers(
        { query: queryParam },
        { headers: ssrRequestHeaders }
      );
      if (res.error) {
        throw new Error(res.error.message);
      }
      return res.data;
    }
    [__temp, __restore] = withAsyncContext(() => executeImmediate(query.value)), await __temp, __restore();
    watch(query, (newValue) => executeImmediate(newValue));
    const filteredUsers = computed(() => {
      const users = state.value?.users ?? [];
      return users.filter((user) => {
        if (roleFilter.value !== "all" && user.role !== roleFilter.value) {
          return false;
        }
        if (statusFilter.value === "banned" && !user.banned) return false;
        if (statusFilter.value === "not-banned" && user.banned) return false;
        return true;
      });
    });
    const paginatedUsers = computed(
      () => filteredUsers.value.slice(offset.value, offset.value + limit.value)
    );
    const allLoaded = computed(
      () => offset.value + limit.value >= filteredUsers.value.length
    );
    const headers = [
      "#",
      "ID",
      "Name",
      "Role",
      "Email",
      "Email Verified",
      "Banned",
      "Created",
      "Actions"
    ];
    const truncateId = (id) => id.length > 5 ? `${id.slice(0, 5)}…` : id;
    const selectedUser = ref(null);
    const selectUser = (user) => {
      if (typeof user === "string") {
        selectedUser.value = state.value?.users.find((u) => u.id === user) ?? null;
      } else {
        selectedUser.value = user;
      }
    };
    const changeUserRole = async (id, role, close) => {
      const confirm = await confirmAsync({
        title: "Change Role",
        description: "Are you sure you want to change this user's role?"
      });
      if (!confirm) {
        close();
        return;
      }
      await authClient.admin.setRole(
        {
          userId: id,
          role
        },
        {
          onError(ctx) {
            toast.add({
              color: "error",
              title: "Error",
              description: ctx.error.message
            });
          },
          onSuccess() {
            toast.add({
              color: "success",
              title: "Success",
              description: "Role changed successfully"
            });
            executeImmediate(query.value);
            close();
          }
        }
      );
    };
    const changeEmailVerified = async (id, verified, close) => {
      const confirm = await confirmAsync({
        title: "Change Email Verification Status",
        description: "Are you sure you want to change this user's email verification status?"
      });
      if (!confirm) {
        close();
        return;
      }
      await authClient.admin.updateUser(
        {
          userId: id,
          data: { emailVerified: verified }
        },
        {
          onError(ctx) {
            toast.add({
              color: "error",
              title: "Error",
              description: ctx.error.message
            });
          },
          onSuccess() {
            toast.add({
              color: "success",
              title: "Success",
              description: "Email verification status changed successfully"
            });
            close();
            executeImmediate(query.value);
          }
        }
      );
    };
    const deleteUser = async (id) => {
      const confirm = await confirmAsync({
        title: "Delete User",
        description: "Are you sure you want to proceed? This action cannot be undone.",
        acceptProps: { color: "error", label: "Delete" }
      });
      if (!confirm) {
        return;
      }
      await authClient.admin.removeUser(
        { userId: id },
        {
          onError(ctx) {
            toast.add({
              color: "error",
              title: "Error",
              description: ctx.error.message
            });
          },
          onSuccess() {
            toast.add({
              color: "success",
              title: "Success",
              description: "User deleted successfully"
            });
            executeImmediate(query.value);
          }
        }
      );
    };
    const unbanUser = async (id) => {
      const confirm = await confirmAsync({
        title: "Unban User",
        description: "Are you sure you want to unban this user? Any IP address banned alongside them will also be unbanned."
      });
      if (!confirm) {
        return;
      }
      try {
        await $fetch(`/api/admin/users/${id}/unban`, { method: "POST" });
        toast.add({
          color: "success",
          title: "Success",
          description: "User unbanned successfully"
        });
        executeImmediate(query.value);
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
      const _component_NuxtFieldGroup = _sfc_main$4;
      const _component_NuxtButton = _sfc_main$a;
      const _component_NuxtInput = _sfc_main$5;
      const _component_NuxtModal = _sfc_main$4$1;
      const _component_NuxtFormField = _sfc_main$6;
      const _component_NuxtSelect = _sfc_main$7;
      const _component_AdminUserManager = __nuxt_component_7;
      const _component_AdminBanUserModal = __nuxt_component_8;
      const _component_VTable = __nuxt_component_5;
      const _component_VTableHeader = __nuxt_component_6;
      const _component_VTableRow = __nuxt_component_7$1;
      const _component_VTableHead = __nuxt_component_8$1;
      const _component_VTableBody = __nuxt_component_9;
      const _component_VTableCell = __nuxt_component_1;
      const _component_TextCopyButton = __nuxt_component_11;
      const _component_NuxtBadge = _sfc_main$8;
      const _component_NuxtInPlace = __nuxt_component_17;
      const _component_NuxtTooltip = _sfc_main$9;
      const _component_NuxtSimplePaginator = __nuxt_component_11$1;
      _push(ssrRenderComponent(_component_MyPage, mergeProps({
        error: unref(error),
        onRefresh: () => unref(executeImmediate)(unref(query))
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}><header class="flex items-center gap-2 justify-between flex-wrap"${_scopeId}><h1 class="text-3xl font-semibold"${_scopeId}>Users</h1><div class="flex items-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtFieldGroup, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_NuxtButton, {
                    icon: "lucide:search",
                    color: "neutral",
                    variant: "outline"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_NuxtInput, {
                    modelValue: unref(search),
                    "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
                    placeholder: "Search..."
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_NuxtButton, {
                      icon: "lucide:search",
                      color: "neutral",
                      variant: "outline"
                    }),
                    createVNode(_component_NuxtInput, {
                      modelValue: unref(search),
                      "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
                      placeholder: "Search..."
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_NuxtButton, {
              label: "Filters",
              icon: "lucide:list-filter",
              color: "neutral",
              variant: "outline",
              onClick: () => {
                filtersOpen.value = true;
              }
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_NuxtButton, {
              label: "New",
              icon: "lucide:plus",
              onClick: ($event) => {
                {
                  selectUser(null);
                  open.value = true;
                }
              }
            }, null, _parent2, _scopeId));
            _push2(`</div></header>`);
            _push2(ssrRenderComponent(_component_NuxtModal, {
              open: unref(filtersOpen),
              "onUpdate:open": ($event) => isRef(filtersOpen) ? filtersOpen.value = $event : null,
              title: "Filter Users"
            }, {
              body: withCtx(({ close }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="space-y-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_NuxtFormField, { label: "Role" }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_NuxtSelect, {
                          modelValue: unref(roleFilter),
                          "onUpdate:modelValue": ($event) => isRef(roleFilter) ? roleFilter.value = $event : null,
                          items: roleFilterOptions,
                          class: "w-full"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_NuxtSelect, {
                            modelValue: unref(roleFilter),
                            "onUpdate:modelValue": ($event) => isRef(roleFilter) ? roleFilter.value = $event : null,
                            items: roleFilterOptions,
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_NuxtFormField, { label: "Status" }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_NuxtSelect, {
                          modelValue: unref(statusFilter),
                          "onUpdate:modelValue": ($event) => isRef(statusFilter) ? statusFilter.value = $event : null,
                          items: statusFilterOptions,
                          class: "w-full"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_NuxtSelect, {
                            modelValue: unref(statusFilter),
                            "onUpdate:modelValue": ($event) => isRef(statusFilter) ? statusFilter.value = $event : null,
                            items: statusFilterOptions,
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(`<div class="flex justify-end"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_NuxtButton, {
                    label: "Done",
                    onClick: close
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "space-y-4" }, [
                      createVNode(_component_NuxtFormField, { label: "Role" }, {
                        default: withCtx(() => [
                          createVNode(_component_NuxtSelect, {
                            modelValue: unref(roleFilter),
                            "onUpdate:modelValue": ($event) => isRef(roleFilter) ? roleFilter.value = $event : null,
                            items: roleFilterOptions,
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_NuxtFormField, { label: "Status" }, {
                        default: withCtx(() => [
                          createVNode(_component_NuxtSelect, {
                            modelValue: unref(statusFilter),
                            "onUpdate:modelValue": ($event) => isRef(statusFilter) ? statusFilter.value = $event : null,
                            items: statusFilterOptions,
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "flex justify-end" }, [
                        createVNode(_component_NuxtButton, {
                          label: "Done",
                          onClick: close
                        }, null, 8, ["onClick"])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (unref(state)?.users) {
              _push2(`<section class="mt-5"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_AdminUserManager, {
                open: unref(open),
                "onUpdate:open": ($event) => isRef(open) ? open.value = $event : null,
                user: unref(selectedUser),
                onDone: () => unref(executeImmediate)(unref(query))
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_AdminBanUserModal, {
                open: unref(banOpen),
                "onUpdate:open": ($event) => isRef(banOpen) ? banOpen.value = $event : null,
                user: unref(selectedUser),
                onDone: () => unref(executeImmediate)(unref(query))
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_VTable, { loading: unref(isLoading) }, {
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
                          ssrRenderList(unref(paginatedUsers), (user, index) => {
                            _push4(ssrRenderComponent(_component_VTableRow, {
                              key: user.id
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(_component_VTableCell, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(unref(offset) + index + 1)}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(unref(offset) + index + 1), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(_component_VTableCell, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`<div class="flex items-center gap-1"${_scopeId5}><span${_scopeId5}>${ssrInterpolate(truncateId(user.id))}</span>`);
                                        _push6(ssrRenderComponent(_component_TextCopyButton, {
                                          text: user.id,
                                          size: "xs",
                                          variant: "ghost",
                                          icon: "lucide:copy"
                                        }, null, _parent6, _scopeId5));
                                        _push6(`</div>`);
                                      } else {
                                        return [
                                          createVNode("div", { class: "flex items-center gap-1" }, [
                                            createVNode("span", null, toDisplayString(truncateId(user.id)), 1),
                                            createVNode(_component_TextCopyButton, {
                                              text: user.id,
                                              size: "xs",
                                              variant: "ghost",
                                              icon: "lucide:copy"
                                            }, null, 8, ["text"])
                                          ])
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(_component_VTableCell, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`<div class="flex items-center gap-1"${_scopeId5}><p${_scopeId5}>${ssrInterpolate(user.name)}</p>`);
                                        if (user.id === unref(authStore).user.value?.id) {
                                          _push6(ssrRenderComponent(_component_NuxtBadge, {
                                            label: "you",
                                            color: "error",
                                            variant: "subtle",
                                            size: "sm"
                                          }, null, _parent6, _scopeId5));
                                        } else {
                                          _push6(`<!---->`);
                                        }
                                        _push6(`</div>`);
                                      } else {
                                        return [
                                          createVNode("div", { class: "flex items-center gap-1" }, [
                                            createVNode("p", null, toDisplayString(user.name), 1),
                                            user.id === unref(authStore).user.value?.id ? (openBlock(), createBlock(_component_NuxtBadge, {
                                              key: 0,
                                              label: "you",
                                              color: "error",
                                              variant: "subtle",
                                              size: "sm"
                                            })) : createCommentVNode("", true)
                                          ])
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(_component_VTableCell, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        if (unref(authStore).user.value?.id === user.id) {
                                          _push6(ssrRenderComponent(_component_NuxtBadge, {
                                            label: user.role,
                                            color: user.role === "admin" ? "success" : "primary",
                                            variant: "subtle"
                                          }, null, _parent6, _scopeId5));
                                        } else {
                                          _push6(ssrRenderComponent(_component_NuxtInPlace, { trigger: "dblclick" }, {
                                            "in-place": withCtx(({ close }, _push7, _parent7, _scopeId6) => {
                                              if (_push7) {
                                                _push7(ssrRenderComponent(_component_NuxtFieldGroup, null, {
                                                  default: withCtx((_6, _push8, _parent8, _scopeId7) => {
                                                    if (_push8) {
                                                      _push8(ssrRenderComponent(_component_NuxtSelect, {
                                                        "default-value": user.role,
                                                        items: ["user", "admin"],
                                                        size: "sm",
                                                        class: "w-20",
                                                        "onUpdate:modelValue": ($event) => changeUserRole(user.id, $event, close)
                                                      }, null, _parent8, _scopeId7));
                                                      _push8(ssrRenderComponent(_component_NuxtButton, {
                                                        icon: "lucide:x",
                                                        color: "neutral",
                                                        variant: "subtle",
                                                        size: "sm",
                                                        onClick: close
                                                      }, null, _parent8, _scopeId7));
                                                    } else {
                                                      return [
                                                        createVNode(_component_NuxtSelect, {
                                                          "default-value": user.role,
                                                          items: ["user", "admin"],
                                                          size: "sm",
                                                          class: "w-20",
                                                          "onUpdate:modelValue": ($event) => changeUserRole(user.id, $event, close)
                                                        }, null, 8, ["default-value", "onUpdate:modelValue"]),
                                                        createVNode(_component_NuxtButton, {
                                                          icon: "lucide:x",
                                                          color: "neutral",
                                                          variant: "subtle",
                                                          size: "sm",
                                                          onClick: close
                                                        }, null, 8, ["onClick"])
                                                      ];
                                                    }
                                                  }),
                                                  _: 2
                                                }, _parent7, _scopeId6));
                                              } else {
                                                return [
                                                  createVNode(_component_NuxtFieldGroup, null, {
                                                    default: withCtx(() => [
                                                      createVNode(_component_NuxtSelect, {
                                                        "default-value": user.role,
                                                        items: ["user", "admin"],
                                                        size: "sm",
                                                        class: "w-20",
                                                        "onUpdate:modelValue": ($event) => changeUserRole(user.id, $event, close)
                                                      }, null, 8, ["default-value", "onUpdate:modelValue"]),
                                                      createVNode(_component_NuxtButton, {
                                                        icon: "lucide:x",
                                                        color: "neutral",
                                                        variant: "subtle",
                                                        size: "sm",
                                                        onClick: close
                                                      }, null, 8, ["onClick"])
                                                    ]),
                                                    _: 2
                                                  }, 1024)
                                                ];
                                              }
                                            }),
                                            default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                              if (_push7) {
                                                _push7(ssrRenderComponent(_component_NuxtBadge, {
                                                  label: user.role,
                                                  color: user.role === "admin" ? "success" : "primary",
                                                  variant: "subtle"
                                                }, null, _parent7, _scopeId6));
                                              } else {
                                                return [
                                                  createVNode(_component_NuxtBadge, {
                                                    label: user.role,
                                                    color: user.role === "admin" ? "success" : "primary",
                                                    variant: "subtle"
                                                  }, null, 8, ["label", "color"])
                                                ];
                                              }
                                            }),
                                            _: 2
                                          }, _parent6, _scopeId5));
                                        }
                                      } else {
                                        return [
                                          unref(authStore).user.value?.id === user.id ? (openBlock(), createBlock(_component_NuxtBadge, {
                                            key: 0,
                                            label: user.role,
                                            color: user.role === "admin" ? "success" : "primary",
                                            variant: "subtle"
                                          }, null, 8, ["label", "color"])) : (openBlock(), createBlock(_component_NuxtInPlace, {
                                            key: 1,
                                            trigger: "dblclick"
                                          }, {
                                            "in-place": withCtx(({ close }) => [
                                              createVNode(_component_NuxtFieldGroup, null, {
                                                default: withCtx(() => [
                                                  createVNode(_component_NuxtSelect, {
                                                    "default-value": user.role,
                                                    items: ["user", "admin"],
                                                    size: "sm",
                                                    class: "w-20",
                                                    "onUpdate:modelValue": ($event) => changeUserRole(user.id, $event, close)
                                                  }, null, 8, ["default-value", "onUpdate:modelValue"]),
                                                  createVNode(_component_NuxtButton, {
                                                    icon: "lucide:x",
                                                    color: "neutral",
                                                    variant: "subtle",
                                                    size: "sm",
                                                    onClick: close
                                                  }, null, 8, ["onClick"])
                                                ]),
                                                _: 2
                                              }, 1024)
                                            ]),
                                            default: withCtx(() => [
                                              createVNode(_component_NuxtBadge, {
                                                label: user.role,
                                                color: user.role === "admin" ? "success" : "primary",
                                                variant: "subtle"
                                              }, null, 8, ["label", "color"])
                                            ]),
                                            _: 2
                                          }, 1024))
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(_component_VTableCell, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(user.email)}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(user.email), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(_component_VTableCell, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent(_component_NuxtInPlace, null, {
                                          "in-place": withCtx(({ close }, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent(_component_NuxtFieldGroup, null, {
                                                default: withCtx((_6, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(ssrRenderComponent(_component_NuxtSelect, {
                                                      "default-value": user.emailVerified,
                                                      items: [true, false],
                                                      size: "sm",
                                                      class: "w-20",
                                                      "onUpdate:modelValue": ($event) => changeEmailVerified(user.id, $event, close)
                                                    }, null, _parent8, _scopeId7));
                                                    _push8(ssrRenderComponent(_component_NuxtButton, {
                                                      icon: "lucide:x",
                                                      color: "neutral",
                                                      variant: "subtle",
                                                      size: "sm",
                                                      onClick: close
                                                    }, null, _parent8, _scopeId7));
                                                  } else {
                                                    return [
                                                      createVNode(_component_NuxtSelect, {
                                                        "default-value": user.emailVerified,
                                                        items: [true, false],
                                                        size: "sm",
                                                        class: "w-20",
                                                        "onUpdate:modelValue": ($event) => changeEmailVerified(user.id, $event, close)
                                                      }, null, 8, ["default-value", "onUpdate:modelValue"]),
                                                      createVNode(_component_NuxtButton, {
                                                        icon: "lucide:x",
                                                        color: "neutral",
                                                        variant: "subtle",
                                                        size: "sm",
                                                        onClick: close
                                                      }, null, 8, ["onClick"])
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                            } else {
                                              return [
                                                createVNode(_component_NuxtFieldGroup, null, {
                                                  default: withCtx(() => [
                                                    createVNode(_component_NuxtSelect, {
                                                      "default-value": user.emailVerified,
                                                      items: [true, false],
                                                      size: "sm",
                                                      class: "w-20",
                                                      "onUpdate:modelValue": ($event) => changeEmailVerified(user.id, $event, close)
                                                    }, null, 8, ["default-value", "onUpdate:modelValue"]),
                                                    createVNode(_component_NuxtButton, {
                                                      icon: "lucide:x",
                                                      color: "neutral",
                                                      variant: "subtle",
                                                      size: "sm",
                                                      onClick: close
                                                    }, null, 8, ["onClick"])
                                                  ]),
                                                  _: 2
                                                }, 1024)
                                              ];
                                            }
                                          }),
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent(_component_NuxtBadge, {
                                                label: user.emailVerified.toString(),
                                                color: user.emailVerified ? "success" : "error",
                                                variant: "subtle"
                                              }, null, _parent7, _scopeId6));
                                            } else {
                                              return [
                                                createVNode(_component_NuxtBadge, {
                                                  label: user.emailVerified.toString(),
                                                  color: user.emailVerified ? "success" : "error",
                                                  variant: "subtle"
                                                }, null, 8, ["label", "color"])
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          createVNode(_component_NuxtInPlace, null, {
                                            "in-place": withCtx(({ close }) => [
                                              createVNode(_component_NuxtFieldGroup, null, {
                                                default: withCtx(() => [
                                                  createVNode(_component_NuxtSelect, {
                                                    "default-value": user.emailVerified,
                                                    items: [true, false],
                                                    size: "sm",
                                                    class: "w-20",
                                                    "onUpdate:modelValue": ($event) => changeEmailVerified(user.id, $event, close)
                                                  }, null, 8, ["default-value", "onUpdate:modelValue"]),
                                                  createVNode(_component_NuxtButton, {
                                                    icon: "lucide:x",
                                                    color: "neutral",
                                                    variant: "subtle",
                                                    size: "sm",
                                                    onClick: close
                                                  }, null, 8, ["onClick"])
                                                ]),
                                                _: 2
                                              }, 1024)
                                            ]),
                                            default: withCtx(() => [
                                              createVNode(_component_NuxtBadge, {
                                                label: user.emailVerified.toString(),
                                                color: user.emailVerified ? "success" : "error",
                                                variant: "subtle"
                                              }, null, 8, ["label", "color"])
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(_component_VTableCell, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        if (user.banned) {
                                          _push6(ssrRenderComponent(_component_NuxtTooltip, {
                                            text: user.banReason || "No reason given"
                                          }, {
                                            default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                              if (_push7) {
                                                _push7(ssrRenderComponent(_component_NuxtBadge, {
                                                  label: "Yes",
                                                  color: "error",
                                                  variant: "subtle"
                                                }, null, _parent7, _scopeId6));
                                              } else {
                                                return [
                                                  createVNode(_component_NuxtBadge, {
                                                    label: "Yes",
                                                    color: "error",
                                                    variant: "subtle"
                                                  })
                                                ];
                                              }
                                            }),
                                            _: 2
                                          }, _parent6, _scopeId5));
                                        } else {
                                          _push6(ssrRenderComponent(_component_NuxtBadge, {
                                            label: "No",
                                            color: "success",
                                            variant: "subtle"
                                          }, null, _parent6, _scopeId5));
                                        }
                                      } else {
                                        return [
                                          user.banned ? (openBlock(), createBlock(_component_NuxtTooltip, {
                                            key: 0,
                                            text: user.banReason || "No reason given"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(_component_NuxtBadge, {
                                                label: "Yes",
                                                color: "error",
                                                variant: "subtle"
                                              })
                                            ]),
                                            _: 1
                                          }, 8, ["text"])) : (openBlock(), createBlock(_component_NuxtBadge, {
                                            key: 1,
                                            label: "No",
                                            color: "success",
                                            variant: "subtle"
                                          }))
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(_component_VTableCell, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(unref(useDateFormat)(user.createdAt, "YYYY-MMM-DD"))}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(unref(useDateFormat)(user.createdAt, "YYYY-MMM-DD")), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(_component_VTableCell, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        if (user.id !== unref(authStore).user.value?.id) {
                                          _push6(`<div class="flex items-center gap-2"${_scopeId5}>`);
                                          if (user.banned) {
                                            _push6(ssrRenderComponent(_component_NuxtButton, {
                                              label: "Unban",
                                              color: "success",
                                              variant: "soft",
                                              size: "sm",
                                              "loading-auto": "",
                                              onClick: ($event) => unbanUser(user.id)
                                            }, null, _parent6, _scopeId5));
                                          } else {
                                            _push6(ssrRenderComponent(_component_NuxtButton, {
                                              label: "Ban",
                                              color: "warning",
                                              variant: "soft",
                                              size: "sm",
                                              onClick: ($event) => {
                                                {
                                                  selectUser(user);
                                                  banOpen.value = true;
                                                }
                                              }
                                            }, null, _parent6, _scopeId5));
                                          }
                                          _push6(ssrRenderComponent(_component_NuxtButton, {
                                            label: "Delete",
                                            color: "error",
                                            variant: "soft",
                                            size: "sm",
                                            "loading-auto": "",
                                            onClick: ($event) => deleteUser(user.id)
                                          }, null, _parent6, _scopeId5));
                                          _push6(`</div>`);
                                        } else {
                                          _push6(`<!---->`);
                                        }
                                      } else {
                                        return [
                                          user.id !== unref(authStore).user.value?.id ? (openBlock(), createBlock("div", {
                                            key: 0,
                                            class: "flex items-center gap-2"
                                          }, [
                                            user.banned ? (openBlock(), createBlock(_component_NuxtButton, {
                                              key: 0,
                                              label: "Unban",
                                              color: "success",
                                              variant: "soft",
                                              size: "sm",
                                              "loading-auto": "",
                                              onClick: ($event) => unbanUser(user.id)
                                            }, null, 8, ["onClick"])) : (openBlock(), createBlock(_component_NuxtButton, {
                                              key: 1,
                                              label: "Ban",
                                              color: "warning",
                                              variant: "soft",
                                              size: "sm",
                                              onClick: ($event) => {
                                                {
                                                  selectUser(user);
                                                  banOpen.value = true;
                                                }
                                              }
                                            }, null, 8, ["onClick"])),
                                            createVNode(_component_NuxtButton, {
                                              label: "Delete",
                                              color: "error",
                                              variant: "soft",
                                              size: "sm",
                                              "loading-auto": "",
                                              onClick: ($event) => deleteUser(user.id)
                                            }, null, 8, ["onClick"])
                                          ])) : createCommentVNode("", true)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode(_component_VTableCell, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(unref(offset) + index + 1), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_VTableCell, null, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "flex items-center gap-1" }, [
                                          createVNode("span", null, toDisplayString(truncateId(user.id)), 1),
                                          createVNode(_component_TextCopyButton, {
                                            text: user.id,
                                            size: "xs",
                                            variant: "ghost",
                                            icon: "lucide:copy"
                                          }, null, 8, ["text"])
                                        ])
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_VTableCell, null, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "flex items-center gap-1" }, [
                                          createVNode("p", null, toDisplayString(user.name), 1),
                                          user.id === unref(authStore).user.value?.id ? (openBlock(), createBlock(_component_NuxtBadge, {
                                            key: 0,
                                            label: "you",
                                            color: "error",
                                            variant: "subtle",
                                            size: "sm"
                                          })) : createCommentVNode("", true)
                                        ])
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_VTableCell, null, {
                                      default: withCtx(() => [
                                        unref(authStore).user.value?.id === user.id ? (openBlock(), createBlock(_component_NuxtBadge, {
                                          key: 0,
                                          label: user.role,
                                          color: user.role === "admin" ? "success" : "primary",
                                          variant: "subtle"
                                        }, null, 8, ["label", "color"])) : (openBlock(), createBlock(_component_NuxtInPlace, {
                                          key: 1,
                                          trigger: "dblclick"
                                        }, {
                                          "in-place": withCtx(({ close }) => [
                                            createVNode(_component_NuxtFieldGroup, null, {
                                              default: withCtx(() => [
                                                createVNode(_component_NuxtSelect, {
                                                  "default-value": user.role,
                                                  items: ["user", "admin"],
                                                  size: "sm",
                                                  class: "w-20",
                                                  "onUpdate:modelValue": ($event) => changeUserRole(user.id, $event, close)
                                                }, null, 8, ["default-value", "onUpdate:modelValue"]),
                                                createVNode(_component_NuxtButton, {
                                                  icon: "lucide:x",
                                                  color: "neutral",
                                                  variant: "subtle",
                                                  size: "sm",
                                                  onClick: close
                                                }, null, 8, ["onClick"])
                                              ]),
                                              _: 2
                                            }, 1024)
                                          ]),
                                          default: withCtx(() => [
                                            createVNode(_component_NuxtBadge, {
                                              label: user.role,
                                              color: user.role === "admin" ? "success" : "primary",
                                              variant: "subtle"
                                            }, null, 8, ["label", "color"])
                                          ]),
                                          _: 2
                                        }, 1024))
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_VTableCell, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(user.email), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_VTableCell, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_NuxtInPlace, null, {
                                          "in-place": withCtx(({ close }) => [
                                            createVNode(_component_NuxtFieldGroup, null, {
                                              default: withCtx(() => [
                                                createVNode(_component_NuxtSelect, {
                                                  "default-value": user.emailVerified,
                                                  items: [true, false],
                                                  size: "sm",
                                                  class: "w-20",
                                                  "onUpdate:modelValue": ($event) => changeEmailVerified(user.id, $event, close)
                                                }, null, 8, ["default-value", "onUpdate:modelValue"]),
                                                createVNode(_component_NuxtButton, {
                                                  icon: "lucide:x",
                                                  color: "neutral",
                                                  variant: "subtle",
                                                  size: "sm",
                                                  onClick: close
                                                }, null, 8, ["onClick"])
                                              ]),
                                              _: 2
                                            }, 1024)
                                          ]),
                                          default: withCtx(() => [
                                            createVNode(_component_NuxtBadge, {
                                              label: user.emailVerified.toString(),
                                              color: user.emailVerified ? "success" : "error",
                                              variant: "subtle"
                                            }, null, 8, ["label", "color"])
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_VTableCell, null, {
                                      default: withCtx(() => [
                                        user.banned ? (openBlock(), createBlock(_component_NuxtTooltip, {
                                          key: 0,
                                          text: user.banReason || "No reason given"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(_component_NuxtBadge, {
                                              label: "Yes",
                                              color: "error",
                                              variant: "subtle"
                                            })
                                          ]),
                                          _: 1
                                        }, 8, ["text"])) : (openBlock(), createBlock(_component_NuxtBadge, {
                                          key: 1,
                                          label: "No",
                                          color: "success",
                                          variant: "subtle"
                                        }))
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_VTableCell, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(unref(useDateFormat)(user.createdAt, "YYYY-MMM-DD")), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_VTableCell, null, {
                                      default: withCtx(() => [
                                        user.id !== unref(authStore).user.value?.id ? (openBlock(), createBlock("div", {
                                          key: 0,
                                          class: "flex items-center gap-2"
                                        }, [
                                          user.banned ? (openBlock(), createBlock(_component_NuxtButton, {
                                            key: 0,
                                            label: "Unban",
                                            color: "success",
                                            variant: "soft",
                                            size: "sm",
                                            "loading-auto": "",
                                            onClick: ($event) => unbanUser(user.id)
                                          }, null, 8, ["onClick"])) : (openBlock(), createBlock(_component_NuxtButton, {
                                            key: 1,
                                            label: "Ban",
                                            color: "warning",
                                            variant: "soft",
                                            size: "sm",
                                            onClick: ($event) => {
                                              {
                                                selectUser(user);
                                                banOpen.value = true;
                                              }
                                            }
                                          }, null, 8, ["onClick"])),
                                          createVNode(_component_NuxtButton, {
                                            label: "Delete",
                                            color: "error",
                                            variant: "soft",
                                            size: "sm",
                                            "loading-auto": "",
                                            onClick: ($event) => deleteUser(user.id)
                                          }, null, 8, ["onClick"])
                                        ])) : createCommentVNode("", true)
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
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(paginatedUsers), (user, index) => {
                              return openBlock(), createBlock(_component_VTableRow, {
                                key: user.id
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_VTableCell, null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(unref(offset) + index + 1), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_VTableCell, null, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "flex items-center gap-1" }, [
                                        createVNode("span", null, toDisplayString(truncateId(user.id)), 1),
                                        createVNode(_component_TextCopyButton, {
                                          text: user.id,
                                          size: "xs",
                                          variant: "ghost",
                                          icon: "lucide:copy"
                                        }, null, 8, ["text"])
                                      ])
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_VTableCell, null, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "flex items-center gap-1" }, [
                                        createVNode("p", null, toDisplayString(user.name), 1),
                                        user.id === unref(authStore).user.value?.id ? (openBlock(), createBlock(_component_NuxtBadge, {
                                          key: 0,
                                          label: "you",
                                          color: "error",
                                          variant: "subtle",
                                          size: "sm"
                                        })) : createCommentVNode("", true)
                                      ])
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_VTableCell, null, {
                                    default: withCtx(() => [
                                      unref(authStore).user.value?.id === user.id ? (openBlock(), createBlock(_component_NuxtBadge, {
                                        key: 0,
                                        label: user.role,
                                        color: user.role === "admin" ? "success" : "primary",
                                        variant: "subtle"
                                      }, null, 8, ["label", "color"])) : (openBlock(), createBlock(_component_NuxtInPlace, {
                                        key: 1,
                                        trigger: "dblclick"
                                      }, {
                                        "in-place": withCtx(({ close }) => [
                                          createVNode(_component_NuxtFieldGroup, null, {
                                            default: withCtx(() => [
                                              createVNode(_component_NuxtSelect, {
                                                "default-value": user.role,
                                                items: ["user", "admin"],
                                                size: "sm",
                                                class: "w-20",
                                                "onUpdate:modelValue": ($event) => changeUserRole(user.id, $event, close)
                                              }, null, 8, ["default-value", "onUpdate:modelValue"]),
                                              createVNode(_component_NuxtButton, {
                                                icon: "lucide:x",
                                                color: "neutral",
                                                variant: "subtle",
                                                size: "sm",
                                                onClick: close
                                              }, null, 8, ["onClick"])
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ]),
                                        default: withCtx(() => [
                                          createVNode(_component_NuxtBadge, {
                                            label: user.role,
                                            color: user.role === "admin" ? "success" : "primary",
                                            variant: "subtle"
                                          }, null, 8, ["label", "color"])
                                        ]),
                                        _: 2
                                      }, 1024))
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_VTableCell, null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(user.email), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_VTableCell, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_NuxtInPlace, null, {
                                        "in-place": withCtx(({ close }) => [
                                          createVNode(_component_NuxtFieldGroup, null, {
                                            default: withCtx(() => [
                                              createVNode(_component_NuxtSelect, {
                                                "default-value": user.emailVerified,
                                                items: [true, false],
                                                size: "sm",
                                                class: "w-20",
                                                "onUpdate:modelValue": ($event) => changeEmailVerified(user.id, $event, close)
                                              }, null, 8, ["default-value", "onUpdate:modelValue"]),
                                              createVNode(_component_NuxtButton, {
                                                icon: "lucide:x",
                                                color: "neutral",
                                                variant: "subtle",
                                                size: "sm",
                                                onClick: close
                                              }, null, 8, ["onClick"])
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ]),
                                        default: withCtx(() => [
                                          createVNode(_component_NuxtBadge, {
                                            label: user.emailVerified.toString(),
                                            color: user.emailVerified ? "success" : "error",
                                            variant: "subtle"
                                          }, null, 8, ["label", "color"])
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_VTableCell, null, {
                                    default: withCtx(() => [
                                      user.banned ? (openBlock(), createBlock(_component_NuxtTooltip, {
                                        key: 0,
                                        text: user.banReason || "No reason given"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_NuxtBadge, {
                                            label: "Yes",
                                            color: "error",
                                            variant: "subtle"
                                          })
                                        ]),
                                        _: 1
                                      }, 8, ["text"])) : (openBlock(), createBlock(_component_NuxtBadge, {
                                        key: 1,
                                        label: "No",
                                        color: "success",
                                        variant: "subtle"
                                      }))
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_VTableCell, null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(unref(useDateFormat)(user.createdAt, "YYYY-MMM-DD")), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_VTableCell, null, {
                                    default: withCtx(() => [
                                      user.id !== unref(authStore).user.value?.id ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "flex items-center gap-2"
                                      }, [
                                        user.banned ? (openBlock(), createBlock(_component_NuxtButton, {
                                          key: 0,
                                          label: "Unban",
                                          color: "success",
                                          variant: "soft",
                                          size: "sm",
                                          "loading-auto": "",
                                          onClick: ($event) => unbanUser(user.id)
                                        }, null, 8, ["onClick"])) : (openBlock(), createBlock(_component_NuxtButton, {
                                          key: 1,
                                          label: "Ban",
                                          color: "warning",
                                          variant: "soft",
                                          size: "sm",
                                          onClick: ($event) => {
                                            {
                                              selectUser(user);
                                              banOpen.value = true;
                                            }
                                          }
                                        }, null, 8, ["onClick"])),
                                        createVNode(_component_NuxtButton, {
                                          label: "Delete",
                                          color: "error",
                                          variant: "soft",
                                          size: "sm",
                                          "loading-auto": "",
                                          onClick: ($event) => deleteUser(user.id)
                                        }, null, 8, ["onClick"])
                                      ])) : createCommentVNode("", true)
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
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(paginatedUsers), (user, index) => {
                            return openBlock(), createBlock(_component_VTableRow, {
                              key: user.id
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(unref(offset) + index + 1), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "flex items-center gap-1" }, [
                                      createVNode("span", null, toDisplayString(truncateId(user.id)), 1),
                                      createVNode(_component_TextCopyButton, {
                                        text: user.id,
                                        size: "xs",
                                        variant: "ghost",
                                        icon: "lucide:copy"
                                      }, null, 8, ["text"])
                                    ])
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "flex items-center gap-1" }, [
                                      createVNode("p", null, toDisplayString(user.name), 1),
                                      user.id === unref(authStore).user.value?.id ? (openBlock(), createBlock(_component_NuxtBadge, {
                                        key: 0,
                                        label: "you",
                                        color: "error",
                                        variant: "subtle",
                                        size: "sm"
                                      })) : createCommentVNode("", true)
                                    ])
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    unref(authStore).user.value?.id === user.id ? (openBlock(), createBlock(_component_NuxtBadge, {
                                      key: 0,
                                      label: user.role,
                                      color: user.role === "admin" ? "success" : "primary",
                                      variant: "subtle"
                                    }, null, 8, ["label", "color"])) : (openBlock(), createBlock(_component_NuxtInPlace, {
                                      key: 1,
                                      trigger: "dblclick"
                                    }, {
                                      "in-place": withCtx(({ close }) => [
                                        createVNode(_component_NuxtFieldGroup, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_NuxtSelect, {
                                              "default-value": user.role,
                                              items: ["user", "admin"],
                                              size: "sm",
                                              class: "w-20",
                                              "onUpdate:modelValue": ($event) => changeUserRole(user.id, $event, close)
                                            }, null, 8, ["default-value", "onUpdate:modelValue"]),
                                            createVNode(_component_NuxtButton, {
                                              icon: "lucide:x",
                                              color: "neutral",
                                              variant: "subtle",
                                              size: "sm",
                                              onClick: close
                                            }, null, 8, ["onClick"])
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ]),
                                      default: withCtx(() => [
                                        createVNode(_component_NuxtBadge, {
                                          label: user.role,
                                          color: user.role === "admin" ? "success" : "primary",
                                          variant: "subtle"
                                        }, null, 8, ["label", "color"])
                                      ]),
                                      _: 2
                                    }, 1024))
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(user.email), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_NuxtInPlace, null, {
                                      "in-place": withCtx(({ close }) => [
                                        createVNode(_component_NuxtFieldGroup, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_NuxtSelect, {
                                              "default-value": user.emailVerified,
                                              items: [true, false],
                                              size: "sm",
                                              class: "w-20",
                                              "onUpdate:modelValue": ($event) => changeEmailVerified(user.id, $event, close)
                                            }, null, 8, ["default-value", "onUpdate:modelValue"]),
                                            createVNode(_component_NuxtButton, {
                                              icon: "lucide:x",
                                              color: "neutral",
                                              variant: "subtle",
                                              size: "sm",
                                              onClick: close
                                            }, null, 8, ["onClick"])
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ]),
                                      default: withCtx(() => [
                                        createVNode(_component_NuxtBadge, {
                                          label: user.emailVerified.toString(),
                                          color: user.emailVerified ? "success" : "error",
                                          variant: "subtle"
                                        }, null, 8, ["label", "color"])
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    user.banned ? (openBlock(), createBlock(_component_NuxtTooltip, {
                                      key: 0,
                                      text: user.banReason || "No reason given"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_NuxtBadge, {
                                          label: "Yes",
                                          color: "error",
                                          variant: "subtle"
                                        })
                                      ]),
                                      _: 1
                                    }, 8, ["text"])) : (openBlock(), createBlock(_component_NuxtBadge, {
                                      key: 1,
                                      label: "No",
                                      color: "success",
                                      variant: "subtle"
                                    }))
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(unref(useDateFormat)(user.createdAt, "YYYY-MMM-DD")), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    user.id !== unref(authStore).user.value?.id ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "flex items-center gap-2"
                                    }, [
                                      user.banned ? (openBlock(), createBlock(_component_NuxtButton, {
                                        key: 0,
                                        label: "Unban",
                                        color: "success",
                                        variant: "soft",
                                        size: "sm",
                                        "loading-auto": "",
                                        onClick: ($event) => unbanUser(user.id)
                                      }, null, 8, ["onClick"])) : (openBlock(), createBlock(_component_NuxtButton, {
                                        key: 1,
                                        label: "Ban",
                                        color: "warning",
                                        variant: "soft",
                                        size: "sm",
                                        onClick: ($event) => {
                                          {
                                            selectUser(user);
                                            banOpen.value = true;
                                          }
                                        }
                                      }, null, 8, ["onClick"])),
                                      createVNode(_component_NuxtButton, {
                                        label: "Delete",
                                        color: "error",
                                        variant: "soft",
                                        size: "sm",
                                        "loading-auto": "",
                                        onClick: ($event) => deleteUser(user.id)
                                      }, null, 8, ["onClick"])
                                    ])) : createCommentVNode("", true)
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1024);
                          }), 128))
                        ]),
                        _: 2
                      }, 1024)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<div class="mt-2 border-t border-t-default"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_NuxtSimplePaginator, {
                page: unref(page),
                "onUpdate:page": ($event) => isRef(page) ? page.value = $event : null,
                rows: unref(limit),
                "all-loaded": unref(allLoaded)
              }, null, _parent2, _scopeId));
              _push2(`</div></section>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", null, [
                createVNode("header", { class: "flex items-center gap-2 justify-between flex-wrap" }, [
                  createVNode("h1", { class: "text-3xl font-semibold" }, "Users"),
                  createVNode("div", { class: "flex items-center gap-2" }, [
                    createVNode(_component_NuxtFieldGroup, null, {
                      default: withCtx(() => [
                        createVNode(_component_NuxtButton, {
                          icon: "lucide:search",
                          color: "neutral",
                          variant: "outline"
                        }),
                        createVNode(_component_NuxtInput, {
                          modelValue: unref(search),
                          "onUpdate:modelValue": ($event) => isRef(search) ? search.value = $event : null,
                          placeholder: "Search..."
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_NuxtButton, {
                      label: "Filters",
                      icon: "lucide:list-filter",
                      color: "neutral",
                      variant: "outline",
                      onClick: () => {
                        filtersOpen.value = true;
                      }
                    }, null, 8, ["onClick"]),
                    createVNode(_component_NuxtButton, {
                      label: "New",
                      icon: "lucide:plus",
                      onClick: ($event) => {
                        {
                          selectUser(null);
                          open.value = true;
                        }
                      }
                    }, null, 8, ["onClick"])
                  ])
                ]),
                createVNode(_component_NuxtModal, {
                  open: unref(filtersOpen),
                  "onUpdate:open": ($event) => isRef(filtersOpen) ? filtersOpen.value = $event : null,
                  title: "Filter Users"
                }, {
                  body: withCtx(({ close }) => [
                    createVNode("div", { class: "space-y-4" }, [
                      createVNode(_component_NuxtFormField, { label: "Role" }, {
                        default: withCtx(() => [
                          createVNode(_component_NuxtSelect, {
                            modelValue: unref(roleFilter),
                            "onUpdate:modelValue": ($event) => isRef(roleFilter) ? roleFilter.value = $event : null,
                            items: roleFilterOptions,
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_NuxtFormField, { label: "Status" }, {
                        default: withCtx(() => [
                          createVNode(_component_NuxtSelect, {
                            modelValue: unref(statusFilter),
                            "onUpdate:modelValue": ($event) => isRef(statusFilter) ? statusFilter.value = $event : null,
                            items: statusFilterOptions,
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "flex justify-end" }, [
                        createVNode(_component_NuxtButton, {
                          label: "Done",
                          onClick: close
                        }, null, 8, ["onClick"])
                      ])
                    ])
                  ]),
                  _: 1
                }, 8, ["open", "onUpdate:open"]),
                unref(state)?.users ? (openBlock(), createBlock("section", {
                  key: 0,
                  class: "mt-5"
                }, [
                  createVNode(_component_AdminUserManager, {
                    open: unref(open),
                    "onUpdate:open": ($event) => isRef(open) ? open.value = $event : null,
                    user: unref(selectedUser),
                    onDone: () => unref(executeImmediate)(unref(query))
                  }, null, 8, ["open", "onUpdate:open", "user", "onDone"]),
                  createVNode(_component_AdminBanUserModal, {
                    open: unref(banOpen),
                    "onUpdate:open": ($event) => isRef(banOpen) ? banOpen.value = $event : null,
                    user: unref(selectedUser),
                    onDone: () => unref(executeImmediate)(unref(query))
                  }, null, 8, ["open", "onUpdate:open", "user", "onDone"]),
                  createVNode(_component_VTable, { loading: unref(isLoading) }, {
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
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(paginatedUsers), (user, index) => {
                            return openBlock(), createBlock(_component_VTableRow, {
                              key: user.id
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(unref(offset) + index + 1), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "flex items-center gap-1" }, [
                                      createVNode("span", null, toDisplayString(truncateId(user.id)), 1),
                                      createVNode(_component_TextCopyButton, {
                                        text: user.id,
                                        size: "xs",
                                        variant: "ghost",
                                        icon: "lucide:copy"
                                      }, null, 8, ["text"])
                                    ])
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "flex items-center gap-1" }, [
                                      createVNode("p", null, toDisplayString(user.name), 1),
                                      user.id === unref(authStore).user.value?.id ? (openBlock(), createBlock(_component_NuxtBadge, {
                                        key: 0,
                                        label: "you",
                                        color: "error",
                                        variant: "subtle",
                                        size: "sm"
                                      })) : createCommentVNode("", true)
                                    ])
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    unref(authStore).user.value?.id === user.id ? (openBlock(), createBlock(_component_NuxtBadge, {
                                      key: 0,
                                      label: user.role,
                                      color: user.role === "admin" ? "success" : "primary",
                                      variant: "subtle"
                                    }, null, 8, ["label", "color"])) : (openBlock(), createBlock(_component_NuxtInPlace, {
                                      key: 1,
                                      trigger: "dblclick"
                                    }, {
                                      "in-place": withCtx(({ close }) => [
                                        createVNode(_component_NuxtFieldGroup, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_NuxtSelect, {
                                              "default-value": user.role,
                                              items: ["user", "admin"],
                                              size: "sm",
                                              class: "w-20",
                                              "onUpdate:modelValue": ($event) => changeUserRole(user.id, $event, close)
                                            }, null, 8, ["default-value", "onUpdate:modelValue"]),
                                            createVNode(_component_NuxtButton, {
                                              icon: "lucide:x",
                                              color: "neutral",
                                              variant: "subtle",
                                              size: "sm",
                                              onClick: close
                                            }, null, 8, ["onClick"])
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ]),
                                      default: withCtx(() => [
                                        createVNode(_component_NuxtBadge, {
                                          label: user.role,
                                          color: user.role === "admin" ? "success" : "primary",
                                          variant: "subtle"
                                        }, null, 8, ["label", "color"])
                                      ]),
                                      _: 2
                                    }, 1024))
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(user.email), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_NuxtInPlace, null, {
                                      "in-place": withCtx(({ close }) => [
                                        createVNode(_component_NuxtFieldGroup, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_NuxtSelect, {
                                              "default-value": user.emailVerified,
                                              items: [true, false],
                                              size: "sm",
                                              class: "w-20",
                                              "onUpdate:modelValue": ($event) => changeEmailVerified(user.id, $event, close)
                                            }, null, 8, ["default-value", "onUpdate:modelValue"]),
                                            createVNode(_component_NuxtButton, {
                                              icon: "lucide:x",
                                              color: "neutral",
                                              variant: "subtle",
                                              size: "sm",
                                              onClick: close
                                            }, null, 8, ["onClick"])
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ]),
                                      default: withCtx(() => [
                                        createVNode(_component_NuxtBadge, {
                                          label: user.emailVerified.toString(),
                                          color: user.emailVerified ? "success" : "error",
                                          variant: "subtle"
                                        }, null, 8, ["label", "color"])
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    user.banned ? (openBlock(), createBlock(_component_NuxtTooltip, {
                                      key: 0,
                                      text: user.banReason || "No reason given"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_NuxtBadge, {
                                          label: "Yes",
                                          color: "error",
                                          variant: "subtle"
                                        })
                                      ]),
                                      _: 1
                                    }, 8, ["text"])) : (openBlock(), createBlock(_component_NuxtBadge, {
                                      key: 1,
                                      label: "No",
                                      color: "success",
                                      variant: "subtle"
                                    }))
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(unref(useDateFormat)(user.createdAt, "YYYY-MMM-DD")), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    user.id !== unref(authStore).user.value?.id ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "flex items-center gap-2"
                                    }, [
                                      user.banned ? (openBlock(), createBlock(_component_NuxtButton, {
                                        key: 0,
                                        label: "Unban",
                                        color: "success",
                                        variant: "soft",
                                        size: "sm",
                                        "loading-auto": "",
                                        onClick: ($event) => unbanUser(user.id)
                                      }, null, 8, ["onClick"])) : (openBlock(), createBlock(_component_NuxtButton, {
                                        key: 1,
                                        label: "Ban",
                                        color: "warning",
                                        variant: "soft",
                                        size: "sm",
                                        onClick: ($event) => {
                                          {
                                            selectUser(user);
                                            banOpen.value = true;
                                          }
                                        }
                                      }, null, 8, ["onClick"])),
                                      createVNode(_component_NuxtButton, {
                                        label: "Delete",
                                        color: "error",
                                        variant: "soft",
                                        size: "sm",
                                        "loading-auto": "",
                                        onClick: ($event) => deleteUser(user.id)
                                      }, null, 8, ["onClick"])
                                    ])) : createCommentVNode("", true)
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1024);
                          }), 128))
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    _: 2
                  }, 1032, ["loading"]),
                  createVNode("div", { class: "mt-2 border-t border-t-default" }, [
                    createVNode(_component_NuxtSimplePaginator, {
                      page: unref(page),
                      "onUpdate:page": ($event) => isRef(page) ? page.value = $event : null,
                      rows: unref(limit),
                      "all-loaded": unref(allLoaded)
                    }, null, 8, ["page", "onUpdate:page", "rows", "all-loaded"])
                  ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/users.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=users-CW7Zb1hb.mjs.map
