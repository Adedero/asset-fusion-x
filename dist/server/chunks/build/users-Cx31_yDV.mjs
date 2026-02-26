import { _ as __nuxt_component_0 } from './my-page-BmNXHC6r.mjs';
import { _ as _sfc_main$3 } from './FieldGroup-CbIMy4e7.mjs';
import { g as useToast, j as useConfirm, i as authClient, b as _sfc_main$a, h as _sfc_main$4$1 } from './server.mjs';
import { _ as _sfc_main$4 } from './Input-CFyDl-v5.mjs';
import { _ as _sfc_main$7 } from './Form-BhNutJZb.mjs';
import { _ as _sfc_main$8 } from './FormField-DYdB-maE.mjs';
import { _ as _sfc_main$6 } from './Select-CTZfWeQw.mjs';
import { defineComponent, ref, computed, withAsyncContext, watch, mergeProps, unref, withCtx, isRef, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, createCommentVNode, useModel, reactive, withModifiers, mergeModels, useTemplateRef, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderStyle, ssrRenderSlot } from 'vue/server-renderer';
import z from 'zod';
import { a as PasswordSchema } from '../_/schemas.mjs';
import { _ as __nuxt_component_5, a as __nuxt_component_6, b as __nuxt_component_7, c as __nuxt_component_8, d as __nuxt_component_9, e as __nuxt_component_1 } from './v-table-cell-BRZ0KuYt.mjs';
import { _ as _sfc_main$5 } from './Badge-4IrPO892.mjs';
import { _ as __nuxt_component_11 } from './simple-paginator-CXvXMgvV.mjs';
import { useAsyncState, useDateFormat } from '@vueuse/core';
import { u as useAuthStore } from './auth.store-VvkDhiyP.mjs';
import './fetch-error-alert-Cos-JGNP.mjs';
import './Alert-9mK7K0n2.mjs';
import 'reka-ui';
import '../_/nitro.mjs';
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
import './_plugin-vue_export-helper-1tPrXgE0.mjs';

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
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
      const _component_NuxtForm = _sfc_main$7;
      const _component_NuxtFormField = _sfc_main$8;
      const _component_NuxtInput = _sfc_main$4;
      const _component_NuxtSelect = _sfc_main$6;
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
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/user-manager.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_4 = Object.assign(_sfc_main$2, { __name: "AdminUserManager" });
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
const __nuxt_component_12 = Object.assign(_sfc_main$1, { __name: "NuxtInPlace" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "users",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const authStore = useAuthStore();
    const toast = useToast();
    const { confirmAsync } = useConfirm();
    const open = ref(false);
    const search = ref("");
    const limit = ref(20);
    const page = ref(0);
    const offset = computed(() => page.value * limit.value);
    const query = computed(() => ({
      searchValue: search.value,
      searchField: "name",
      searchOperator: "contains",
      limit: limit.value,
      offset: offset.value,
      sortBy: "name",
      sortDirection: "asc"
    }));
    const { state, error, isLoading, executeImmediate } = useAsyncState(
      listUsers,
      null
    );
    async function listUsers(queryParam) {
      const res = await authClient.admin.listUsers({ query: queryParam });
      if (res.error) {
        throw new Error(res.error.message);
      }
      return res.data;
    }
    [__temp, __restore] = withAsyncContext(() => executeImmediate(query.value)), await __temp, __restore();
    watch(query, (newValue) => executeImmediate(newValue));
    const allLoaded = computed(
      () => (state.value?.users.length ?? 0) < limit.value
    );
    const headers = [
      "#",
      "Name",
      "Role",
      "Email",
      "Email Verified",
      "Banned",
      "Created",
      "Actions"
    ];
    const selectedUser = ref(null);
    const selectUser = (user) => {
      {
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
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MyPage = __nuxt_component_0;
      const _component_NuxtFieldGroup = _sfc_main$3;
      const _component_NuxtButton = _sfc_main$a;
      const _component_NuxtInput = _sfc_main$4;
      const _component_AdminUserManager = __nuxt_component_4;
      const _component_VTable = __nuxt_component_5;
      const _component_VTableHeader = __nuxt_component_6;
      const _component_VTableRow = __nuxt_component_7;
      const _component_VTableHead = __nuxt_component_8;
      const _component_VTableBody = __nuxt_component_9;
      const _component_VTableCell = __nuxt_component_1;
      const _component_NuxtBadge = _sfc_main$5;
      const _component_NuxtInPlace = __nuxt_component_12;
      const _component_NuxtSelect = _sfc_main$6;
      const _component_NuxtSimplePaginator = __nuxt_component_11;
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
            if (unref(state)?.users) {
              _push2(`<section class="mt-5"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_AdminUserManager, {
                open: unref(open),
                "onUpdate:open": ($event) => isRef(open) ? open.value = $event : null,
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
                          ssrRenderList(unref(state).users, (user) => {
                            _push4(ssrRenderComponent(_component_VTableRow, {
                              key: user.id
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(_component_VTableCell, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(user.id)}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(user.id), 1)
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
                                        _push6(ssrRenderComponent(_component_NuxtBadge, {
                                          label: user.banned ? "Yes" : "No",
                                          color: user.banned ? "error" : "success",
                                          variant: "subtle"
                                        }, null, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          createVNode(_component_NuxtBadge, {
                                            label: user.banned ? "Yes" : "No",
                                            color: user.banned ? "error" : "success",
                                            variant: "subtle"
                                          }, null, 8, ["label", "color"])
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
                                        createTextVNode(toDisplayString(user.id), 1)
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
                                        createVNode(_component_NuxtBadge, {
                                          label: user.banned ? "Yes" : "No",
                                          color: user.banned ? "error" : "success",
                                          variant: "subtle"
                                        }, null, 8, ["label", "color"])
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
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(state).users, (user) => {
                              return openBlock(), createBlock(_component_VTableRow, {
                                key: user.id
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_VTableCell, null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(user.id), 1)
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
                                      createVNode(_component_NuxtBadge, {
                                        label: user.banned ? "Yes" : "No",
                                        color: user.banned ? "error" : "success",
                                        variant: "subtle"
                                      }, null, 8, ["label", "color"])
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
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(state).users, (user) => {
                            return openBlock(), createBlock(_component_VTableRow, {
                              key: user.id
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(user.id), 1)
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
                                    createVNode(_component_NuxtBadge, {
                                      label: user.banned ? "Yes" : "No",
                                      color: user.banned ? "error" : "success",
                                      variant: "subtle"
                                    }, null, 8, ["label", "color"])
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
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(state).users, (user) => {
                            return openBlock(), createBlock(_component_VTableRow, {
                              key: user.id
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(user.id), 1)
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
                                    createVNode(_component_NuxtBadge, {
                                      label: user.banned ? "Yes" : "No",
                                      color: user.banned ? "error" : "success",
                                      variant: "subtle"
                                    }, null, 8, ["label", "color"])
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
//# sourceMappingURL=users-Cx31_yDV.mjs.map
