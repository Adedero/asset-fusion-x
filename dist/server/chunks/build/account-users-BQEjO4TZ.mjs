import { _ as __nuxt_component_0 } from './my-page-Cgd-8gXO.mjs';
import { _ as _sfc_main$4 } from './Card-HL6icAYQ.mjs';
import { c as _sfc_main$7, i as useToast, j as _sfc_main$a$1 } from './server.mjs';
import { _ as _sfc_main$5 } from './Table-Bs0dxICt.mjs';
import { _ as _sfc_main$6 } from './Modal-DefLStPx.mjs';
import { _ as __nuxt_component_14 } from './fetch-error-alert-B3Gd_w4n.mjs';
import { defineComponent, withAsyncContext, mergeProps, unref, withCtx, createVNode, createBlock, createCommentVNode, openBlock, computed, ref, isRef, reactive, withModifiers, h, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { a5 as normalizeException } from '../nitro/nitro.mjs';
import { u as useRouteData } from './use-route-data-1tNFDvd7.mjs';
import { u as useFetch } from './fetch-DztuJ_5C.mjs';
import { t as toCase } from './to-case-ChuH9uWD.mjs';
import { a as _sfc_main$8, _ as _sfc_main$1$1 } from './FormField-CzZJ1-Wb.mjs';
import { _ as _sfc_main$9 } from './Input-BtIiAvs7.mjs';
import { _ as _sfc_main$a } from './Select-CrSzJZds.mjs';
import { _ as _sfc_main$b } from './InputNumber-DfQ_yysT.mjs';
import { _ as _sfc_main$c } from './Textarea-Q-Qlg_DC.mjs';
import { a as accountRoles } from './account-DSHVo1jr.mjs';
import { J as JointAccountRequestSchema } from '../_/schemas.mjs';
import { useDateFormat } from '@vueuse/core';
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
import '@tanstack/vue-table';
import './Alert-CXdXSwrA.mjs';
import '@vue/shared';
import 'zod';

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "current-users",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const accountId = useRouteData().getParams("accountId");
    const { pending, data, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `/api/user/financial-accounts/${accountId}/account-users`,
      {
        key: "account-current-users"
      },
      "$I09Lj1pvkj"
    )), __temp = await __temp, __restore(), __temp);
    const items = computed(() => {
      return data.value?.map((item) => {
        return {
          image: item.user?.image,
          name: item.user?.name,
          email: item.user?.email,
          role: item.role,
          ownership: item.ownership
        };
      }) ?? [];
    });
    const Avatar = _sfc_main$a$1;
    const columns = [
      {
        accessorKey: "image",
        header: "",
        cell: ({ row }) => {
          const name = row.getValue("name");
          const image = row.getValue("image");
          return h(Avatar, { size: "lg", alt: name, src: image });
        }
      },
      {
        accessorKey: "name",
        header: "Name"
      },
      {
        accessorKey: "email",
        header: "Email"
      },
      {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => toCase(row.getValue("role"), "sentence")
      },
      {
        accessorKey: "ownership",
        header: "Ownership",
        cell: ({ row }) => `${row.getValue("ownership")}%`
      }
    ];
    const selectedUser = ref(null);
    const open = ref(false);
    const handleSelect = async (row) => {
      selectedUser.value = data.value?.find((item) => item.user.email === row.getValue("email")) ?? null;
      if (selectedUser.value) open.value = true;
    };
    const removeError = ref(null);
    const removeUser = async (accountUserId, close) => {
      removeError.value = null;
      try {
        await $fetch(
          `/api/user/financial-accounts/${accountId}/account-user/${accountUserId}`,
          { method: "delete" }
        );
        await refresh();
        close();
      } catch (e) {
        removeError.value = normalizeException(e);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MyPage = __nuxt_component_0;
      const _component_NuxtTable = _sfc_main$5;
      const _component_NuxtModal = _sfc_main$6;
      const _component_FetchErrorAlert = __nuxt_component_14;
      const _component_NuxtButton = _sfc_main$7;
      _push(ssrRenderComponent(_component_MyPage, mergeProps({
        error: unref(error),
        onRefresh: ($event) => unref(refresh)()
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtTable, {
              data: unref(items),
              columns,
              loading: unref(pending),
              style: { "min-width": "0" },
              onSelect: handleSelect
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_NuxtModal, {
              open: unref(open),
              "onUpdate:open": [
                ($event) => isRef(open) ? open.value = $event : null,
                (value) => value === false ? removeError.value = null : removeError.value = unref(removeError)
              ],
              title: "Remove User"
            }, {
              body: withCtx(({ close }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (unref(selectedUser)) {
                    _push3(`<div class="space-y-4"${_scopeId2}><p${_scopeId2}>Do you want to remove this user from this account?</p>`);
                    if (unref(removeError)) {
                      _push3(ssrRenderComponent(_component_FetchErrorAlert, {
                        message: unref(removeError).message
                      }, null, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`<div class="flex items-center justify-end gap-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_NuxtButton, {
                      label: "Cancel",
                      color: "neutral",
                      variant: "soft",
                      onClick: ($event) => close()
                    }, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_NuxtButton, {
                      label: "Proceed",
                      color: "error",
                      "loading-auto": "",
                      onClick: ($event) => removeUser(unref(selectedUser).id, close)
                    }, null, _parent3, _scopeId2));
                    _push3(`</div></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    unref(selectedUser) ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "space-y-4"
                    }, [
                      createVNode("p", null, "Do you want to remove this user from this account?"),
                      unref(removeError) ? (openBlock(), createBlock(_component_FetchErrorAlert, {
                        key: 0,
                        message: unref(removeError).message
                      }, null, 8, ["message"])) : createCommentVNode("", true),
                      createVNode("div", { class: "flex items-center justify-end gap-2" }, [
                        createVNode(_component_NuxtButton, {
                          label: "Cancel",
                          color: "neutral",
                          variant: "soft",
                          onClick: ($event) => close()
                        }, null, 8, ["onClick"]),
                        createVNode(_component_NuxtButton, {
                          label: "Proceed",
                          color: "error",
                          "loading-auto": "",
                          onClick: ($event) => removeUser(unref(selectedUser).id, close)
                        }, null, 8, ["onClick"])
                      ])
                    ])) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_NuxtTable, {
                data: unref(items),
                columns,
                loading: unref(pending),
                style: { "min-width": "0" },
                onSelect: handleSelect
              }, null, 8, ["data", "loading"]),
              createVNode(_component_NuxtModal, {
                open: unref(open),
                "onUpdate:open": [
                  ($event) => isRef(open) ? open.value = $event : null,
                  (value) => value === false ? removeError.value = null : removeError.value = unref(removeError)
                ],
                title: "Remove User"
              }, {
                body: withCtx(({ close }) => [
                  unref(selectedUser) ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "space-y-4"
                  }, [
                    createVNode("p", null, "Do you want to remove this user from this account?"),
                    unref(removeError) ? (openBlock(), createBlock(_component_FetchErrorAlert, {
                      key: 0,
                      message: unref(removeError).message
                    }, null, 8, ["message"])) : createCommentVNode("", true),
                    createVNode("div", { class: "flex items-center justify-end gap-2" }, [
                      createVNode(_component_NuxtButton, {
                        label: "Cancel",
                        color: "neutral",
                        variant: "soft",
                        onClick: ($event) => close()
                      }, null, 8, ["onClick"]),
                      createVNode(_component_NuxtButton, {
                        label: "Proceed",
                        color: "error",
                        "loading-auto": "",
                        onClick: ($event) => removeUser(unref(selectedUser).id, close)
                      }, null, 8, ["onClick"])
                    ])
                  ])) : createCommentVNode("", true)
                ]),
                _: 1
              }, 8, ["open", "onUpdate:open"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/user/financial-account/current-users.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main$3, { __name: "UserFinancialAccountCurrentUsers" });
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "add-account-user-widget",
  __ssrInlineRender: true,
  props: {
    accountId: {},
    buttonProps: { default: () => ({
      icon: "i-lucide-user-round-plus",
      label: "Add partner",
      color: "neutral",
      variant: "outline"
    }) }
  },
  setup(__props) {
    const open = ref(false);
    const state = reactive({
      recipientName: "",
      recipientEmail: "",
      role: "co-owner",
      ownership: 0
    });
    const reset = () => {
      state.recipientName = "";
      state.recipientEmail = "";
      state.role = "co-owner";
      state.ownership = 0;
    };
    const { refresh } = useFetch(
      `/api/user/financial-accounts/${__props.accountId}/join-requests`,
      {
        key: "account-join-requests"
      },
      "$vaZ6MdCeNF"
    );
    const loading = ref(false);
    const error = ref(null);
    const handleSubmit = async (event) => {
      const body = {
        ...event.data,
        role: toCase(event.data.role, "snake")
      };
      error.value = null;
      loading.value = true;
      try {
        await $fetch(`/api/user/financial-accounts/${__props.accountId}/join-requests`, {
          method: "post",
          body
        });
        await refresh();
        reset();
        open.value = false;
      } catch (err) {
        error.value = normalizeException(err);
      } finally {
        loading.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtModal = _sfc_main$6;
      const _component_NuxtButton = _sfc_main$7;
      const _component_NuxtForm = _sfc_main$1$1;
      const _component_FetchErrorAlert = __nuxt_component_14;
      const _component_NuxtFormField = _sfc_main$8;
      const _component_NuxtInput = _sfc_main$9;
      const _component_NuxtSelect = _sfc_main$a;
      const _component_NuxtInputNumber = _sfc_main$b;
      const _component_NuxtTextarea = _sfc_main$c;
      _push(ssrRenderComponent(_component_NuxtModal, mergeProps({
        open: unref(open),
        "onUpdate:open": ($event) => isRef(open) ? open.value = $event : null,
        title: "Joint Account Request",
        description: "Send a request to user you want to be part of this account."
      }, _attrs), {
        body: withCtx(({ close }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtForm, {
              state: unref(state),
              schema: unref(JointAccountRequestSchema),
              class: "grid gap-4 md:grid-cols-2",
              onSubmit: handleSubmit
            }, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (unref(error)) {
                    _push3(ssrRenderComponent(_component_FetchErrorAlert, {
                      message: unref(error).message,
                      class: "md:col-span-2"
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(ssrRenderComponent(_component_NuxtFormField, {
                    name: "recipientName",
                    label: "Name",
                    required: "",
                    class: "md:col-span-2"
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_NuxtInput, {
                          modelValue: unref(state).recipientName,
                          "onUpdate:modelValue": ($event) => unref(state).recipientName = $event,
                          class: "w-full"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_NuxtInput, {
                            modelValue: unref(state).recipientName,
                            "onUpdate:modelValue": ($event) => unref(state).recipientName = $event,
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_NuxtFormField, {
                    name: "recipientEmail",
                    label: "Email",
                    required: "",
                    class: "md:col-span-2"
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_NuxtInput, {
                          modelValue: unref(state).recipientEmail,
                          "onUpdate:modelValue": ($event) => unref(state).recipientEmail = $event,
                          class: "w-full"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_NuxtInput, {
                            modelValue: unref(state).recipientEmail,
                            "onUpdate:modelValue": ($event) => unref(state).recipientEmail = $event,
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
                          items: unref(accountRoles),
                          class: "w-full"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_NuxtSelect, {
                            modelValue: unref(state).role,
                            "onUpdate:modelValue": ($event) => unref(state).role = $event,
                            items: unref(accountRoles),
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_NuxtFormField, {
                    name: "ownership",
                    label: "Ownership (%)",
                    required: ""
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_NuxtInputNumber, {
                          modelValue: unref(state).ownership,
                          "onUpdate:modelValue": ($event) => unref(state).ownership = $event,
                          min: 0,
                          max: 100,
                          class: "w-full"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_NuxtInputNumber, {
                            modelValue: unref(state).ownership,
                            "onUpdate:modelValue": ($event) => unref(state).ownership = $event,
                            min: 0,
                            max: 100,
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_NuxtFormField, {
                    name: "description",
                    label: "Description",
                    class: "md:col-span-2"
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_NuxtTextarea, {
                          modelValue: unref(state).description,
                          "onUpdate:modelValue": ($event) => unref(state).description = $event,
                          class: "w-full resize-none"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_NuxtTextarea, {
                            modelValue: unref(state).description,
                            "onUpdate:modelValue": ($event) => unref(state).description = $event,
                            class: "w-full resize-none"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(`<div class="flex items-center justify-end gap-2 md:col-span-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_NuxtButton, {
                    type: "button",
                    label: "Cancel",
                    icon: "lucide-circle-x",
                    color: "neutral",
                    variant: "soft",
                    onClick: ($event) => close()
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_NuxtButton, {
                    type: "submit",
                    label: "Submit",
                    icon: "lucide-circle-check",
                    "loading-auto": ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    unref(error) ? (openBlock(), createBlock(_component_FetchErrorAlert, {
                      key: 0,
                      message: unref(error).message,
                      class: "md:col-span-2"
                    }, null, 8, ["message"])) : createCommentVNode("", true),
                    createVNode(_component_NuxtFormField, {
                      name: "recipientName",
                      label: "Name",
                      required: "",
                      class: "md:col-span-2"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_NuxtInput, {
                          modelValue: unref(state).recipientName,
                          "onUpdate:modelValue": ($event) => unref(state).recipientName = $event,
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_NuxtFormField, {
                      name: "recipientEmail",
                      label: "Email",
                      required: "",
                      class: "md:col-span-2"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_NuxtInput, {
                          modelValue: unref(state).recipientEmail,
                          "onUpdate:modelValue": ($event) => unref(state).recipientEmail = $event,
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
                          items: unref(accountRoles),
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_NuxtFormField, {
                      name: "ownership",
                      label: "Ownership (%)",
                      required: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_NuxtInputNumber, {
                          modelValue: unref(state).ownership,
                          "onUpdate:modelValue": ($event) => unref(state).ownership = $event,
                          min: 0,
                          max: 100,
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_NuxtFormField, {
                      name: "description",
                      label: "Description",
                      class: "md:col-span-2"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_NuxtTextarea, {
                          modelValue: unref(state).description,
                          "onUpdate:modelValue": ($event) => unref(state).description = $event,
                          class: "w-full resize-none"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "flex items-center justify-end gap-2 md:col-span-2" }, [
                      createVNode(_component_NuxtButton, {
                        type: "button",
                        label: "Cancel",
                        icon: "lucide-circle-x",
                        color: "neutral",
                        variant: "soft",
                        onClick: ($event) => close()
                      }, null, 8, ["onClick"]),
                      createVNode(_component_NuxtButton, {
                        type: "submit",
                        label: "Submit",
                        icon: "lucide-circle-check",
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
                schema: unref(JointAccountRequestSchema),
                class: "grid gap-4 md:grid-cols-2",
                onSubmit: withModifiers(handleSubmit, ["prevent"])
              }, {
                default: withCtx(() => [
                  unref(error) ? (openBlock(), createBlock(_component_FetchErrorAlert, {
                    key: 0,
                    message: unref(error).message,
                    class: "md:col-span-2"
                  }, null, 8, ["message"])) : createCommentVNode("", true),
                  createVNode(_component_NuxtFormField, {
                    name: "recipientName",
                    label: "Name",
                    required: "",
                    class: "md:col-span-2"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_NuxtInput, {
                        modelValue: unref(state).recipientName,
                        "onUpdate:modelValue": ($event) => unref(state).recipientName = $event,
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_NuxtFormField, {
                    name: "recipientEmail",
                    label: "Email",
                    required: "",
                    class: "md:col-span-2"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_NuxtInput, {
                        modelValue: unref(state).recipientEmail,
                        "onUpdate:modelValue": ($event) => unref(state).recipientEmail = $event,
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
                        items: unref(accountRoles),
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_NuxtFormField, {
                    name: "ownership",
                    label: "Ownership (%)",
                    required: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_NuxtInputNumber, {
                        modelValue: unref(state).ownership,
                        "onUpdate:modelValue": ($event) => unref(state).ownership = $event,
                        min: 0,
                        max: 100,
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_NuxtFormField, {
                    name: "description",
                    label: "Description",
                    class: "md:col-span-2"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_NuxtTextarea, {
                        modelValue: unref(state).description,
                        "onUpdate:modelValue": ($event) => unref(state).description = $event,
                        class: "w-full resize-none"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "flex items-center justify-end gap-2 md:col-span-2" }, [
                    createVNode(_component_NuxtButton, {
                      type: "button",
                      label: "Cancel",
                      icon: "lucide-circle-x",
                      color: "neutral",
                      variant: "soft",
                      onClick: ($event) => close()
                    }, null, 8, ["onClick"]),
                    createVNode(_component_NuxtButton, {
                      type: "submit",
                      label: "Submit",
                      icon: "lucide-circle-check",
                      "loading-auto": ""
                    })
                  ])
                ]),
                _: 2
              }, 1032, ["state", "schema"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtButton, _ctx.buttonProps, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_NuxtButton, _ctx.buttonProps, null, 16)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/user/add-account-user-widget.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_3 = Object.assign(_sfc_main$2, { __name: "UserAddAccountUserWidget" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "requested-account-users",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const accountId = useRouteData().getParams("accountId");
    const toast = useToast();
    const open = ref(false);
    const { pending, data, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `/api/user/financial-accounts/${accountId}/join-requests`,
      {
        key: "account-join-requests"
      },
      "$HIwgFaUpZf"
    )), __temp = await __temp, __restore(), __temp);
    const items = computed(() => {
      return data.value?.map((item) => {
        return {
          name: item.recipientName,
          email: item.recipientEmail,
          role: item.role,
          ownership: item.ownership,
          requestedBy: item.creator?.name,
          requestDate: item.createdAt
        };
      }) ?? [];
    });
    const columns = [
      {
        accessorKey: "name",
        header: "Name"
      },
      {
        accessorKey: "email",
        header: "Email"
      },
      {
        accessorKey: "role",
        header: "Role"
      },
      {
        accessorKey: "ownership",
        header: "Ownership",
        cell: ({ row }) => `${row.getValue("ownership")}%`
      },
      {
        accessorKey: "requestedBy",
        header: "Requested By"
      },
      {
        accessorKey: "requestDate",
        header: "Request Date",
        cell: ({ row }) => useDateFormat(row.getValue("requestDate"), "MMM DD, YYYY hh:mm aa").value
      }
    ];
    const selectedUser = ref(null);
    const handleSelect = (row) => {
      selectedUser.value = data.value?.find((item) => item.recipientEmail === row.getValue("email")) ?? null;
      if (!selectedUser.value) {
        return;
      }
      open.value = true;
    };
    const cancelError = ref(null);
    async function cancelRequest(userRequest, close) {
      try {
        await $fetch(`/api/user/join-requests/${userRequest.id}`, {
          method: "delete"
        });
        await refresh();
        close();
      } catch (err) {
        cancelError.value = normalizeException(err);
      }
    }
    const reminderError = ref(null);
    async function sendReminder(userRequest, close) {
      try {
        await $fetch(`/api/user/join-requests/${userRequest.id}/send-reminder`, {
          method: "post"
        });
        toast.add({
          color: "success",
          title: "Success",
          description: "Reminder sent successfully"
        });
        await refresh();
        close();
      } catch (err) {
        reminderError.value = normalizeException(err);
      }
    }
    const handleOpen = (value) => {
      if (value === false) {
        cancelError.value = null;
        reminderError.value = null;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MyPage = __nuxt_component_0;
      const _component_NuxtTable = _sfc_main$5;
      const _component_NuxtModal = _sfc_main$6;
      const _component_FetchErrorAlert = __nuxt_component_14;
      const _component_NuxtFormField = _sfc_main$8;
      const _component_NuxtInput = _sfc_main$9;
      const _component_NuxtButton = _sfc_main$7;
      _push(ssrRenderComponent(_component_MyPage, mergeProps({
        error: unref(error),
        onRefresh: ($event) => unref(refresh)()
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtTable, {
              data: unref(items),
              columns,
              loading: unref(pending),
              style: { "min-width": "0" },
              onSelect: handleSelect
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_NuxtModal, {
              open: unref(open),
              "onUpdate:open": [($event) => isRef(open) ? open.value = $event : null, handleOpen],
              title: "Joint Account Request"
            }, {
              body: withCtx(({ close }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (unref(selectedUser)) {
                    _push3(`<div class="space-y-8"${_scopeId2}>`);
                    if (unref(cancelError) || unref(reminderError)) {
                      _push3(ssrRenderComponent(_component_FetchErrorAlert, {
                        message: unref(cancelError)?.message || unref(reminderError)?.message
                      }, null, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`<div${_scopeId2}><h3 class="text-2xl font-medium"${_scopeId2}>User Info</h3><div class="grid gap-4 md:grid-cols-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_NuxtFormField, {
                      label: "Name",
                      class: "md:col-span-2"
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_NuxtInput, {
                            value: unref(selectedUser).recipientName,
                            readonly: "",
                            class: "w-full"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_NuxtInput, {
                              value: unref(selectedUser).recipientName,
                              readonly: "",
                              class: "w-full"
                            }, null, 8, ["value"])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_NuxtFormField, {
                      label: "Email",
                      class: "md:col-span-2"
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_NuxtInput, {
                            value: unref(selectedUser).recipientEmail,
                            readonly: "",
                            class: "w-full"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_NuxtInput, {
                              value: unref(selectedUser).recipientEmail,
                              readonly: "",
                              class: "w-full"
                            }, null, 8, ["value"])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_NuxtFormField, { label: "Role" }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_NuxtInput, {
                            value: ("toCase" in _ctx ? _ctx.toCase : unref(toCase))(unref(selectedUser).role, "sentence"),
                            readonly: "",
                            class: "w-full"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_NuxtInput, {
                              value: ("toCase" in _ctx ? _ctx.toCase : unref(toCase))(unref(selectedUser).role, "sentence"),
                              readonly: "",
                              class: "w-full"
                            }, null, 8, ["value"])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_NuxtFormField, { label: "Ownership" }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_NuxtInput, {
                            value: unref(selectedUser).ownership + "%",
                            readonly: "",
                            class: "w-full"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_NuxtInput, {
                              value: unref(selectedUser).ownership + "%",
                              readonly: "",
                              class: "w-full"
                            }, null, 8, ["value"])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_NuxtFormField, { label: "Requested By" }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_NuxtInput, {
                            value: unref(selectedUser).creator.name,
                            readonly: "",
                            class: "w-full"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_NuxtInput, {
                              value: unref(selectedUser).creator.name,
                              readonly: "",
                              class: "w-full"
                            }, null, 8, ["value"])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_NuxtFormField, { label: "Request Date" }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_NuxtInput, {
                            value: unref(useDateFormat)(
                              unref(selectedUser).createdAt,
                              "MMM DD, YYYY hh:mm aa"
                            ).value,
                            readonly: "",
                            class: "w-full"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_NuxtInput, {
                              value: unref(useDateFormat)(
                                unref(selectedUser).createdAt,
                                "MMM DD, YYYY hh:mm aa"
                              ).value,
                              readonly: "",
                              class: "w-full"
                            }, null, 8, ["value"])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`</div></div><div class="space-y-2"${_scopeId2}><h3 class="text-2xl font-medium"${_scopeId2}>Reminder</h3><div class="grid gap-4 md:grid-cols-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_NuxtFormField, { label: "Reminders Sent" }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_NuxtInput, {
                            value: unref(selectedUser).reminderCount,
                            readonly: "",
                            class: "w-full"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_NuxtInput, {
                              value: unref(selectedUser).reminderCount,
                              readonly: "",
                              class: "w-full"
                            }, null, 8, ["value"])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_NuxtFormField, { label: "Last reminder sent at" }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_NuxtInput, {
                            value: unref(selectedUser).lastReminderAt ? unref(useDateFormat)(
                              unref(selectedUser).lastReminderAt,
                              "MMM DD, YYYY hh:mm aa"
                            ).value : "No reminders sent yet",
                            readonly: "",
                            class: "w-full"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_NuxtInput, {
                              value: unref(selectedUser).lastReminderAt ? unref(useDateFormat)(
                                unref(selectedUser).lastReminderAt,
                                "MMM DD, YYYY hh:mm aa"
                              ).value : "No reminders sent yet",
                              readonly: "",
                              class: "w-full"
                            }, null, 8, ["value"])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`</div><div class="flex justify-end mt-8 gap-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_NuxtButton, {
                      label: "Cancel request",
                      color: "error",
                      variant: "soft",
                      icon: "lucide-circle-x",
                      "loading-auto": "",
                      onClick: ($event) => cancelRequest(unref(selectedUser), close)
                    }, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_NuxtButton, {
                      label: "Send reminder",
                      icon: "lucide-clock",
                      "loading-auto": "",
                      onClick: ($event) => sendReminder(unref(selectedUser), close)
                    }, null, _parent3, _scopeId2));
                    _push3(`</div></div></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    unref(selectedUser) ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "space-y-8"
                    }, [
                      unref(cancelError) || unref(reminderError) ? (openBlock(), createBlock(_component_FetchErrorAlert, {
                        key: 0,
                        message: unref(cancelError)?.message || unref(reminderError)?.message
                      }, null, 8, ["message"])) : createCommentVNode("", true),
                      createVNode("div", null, [
                        createVNode("h3", { class: "text-2xl font-medium" }, "User Info"),
                        createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                          createVNode(_component_NuxtFormField, {
                            label: "Name",
                            class: "md:col-span-2"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_NuxtInput, {
                                value: unref(selectedUser).recipientName,
                                readonly: "",
                                class: "w-full"
                              }, null, 8, ["value"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_NuxtFormField, {
                            label: "Email",
                            class: "md:col-span-2"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_NuxtInput, {
                                value: unref(selectedUser).recipientEmail,
                                readonly: "",
                                class: "w-full"
                              }, null, 8, ["value"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_NuxtFormField, { label: "Role" }, {
                            default: withCtx(() => [
                              createVNode(_component_NuxtInput, {
                                value: ("toCase" in _ctx ? _ctx.toCase : unref(toCase))(unref(selectedUser).role, "sentence"),
                                readonly: "",
                                class: "w-full"
                              }, null, 8, ["value"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_NuxtFormField, { label: "Ownership" }, {
                            default: withCtx(() => [
                              createVNode(_component_NuxtInput, {
                                value: unref(selectedUser).ownership + "%",
                                readonly: "",
                                class: "w-full"
                              }, null, 8, ["value"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_NuxtFormField, { label: "Requested By" }, {
                            default: withCtx(() => [
                              createVNode(_component_NuxtInput, {
                                value: unref(selectedUser).creator.name,
                                readonly: "",
                                class: "w-full"
                              }, null, 8, ["value"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_NuxtFormField, { label: "Request Date" }, {
                            default: withCtx(() => [
                              createVNode(_component_NuxtInput, {
                                value: unref(useDateFormat)(
                                  unref(selectedUser).createdAt,
                                  "MMM DD, YYYY hh:mm aa"
                                ).value,
                                readonly: "",
                                class: "w-full"
                              }, null, 8, ["value"])
                            ]),
                            _: 1
                          })
                        ])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode("h3", { class: "text-2xl font-medium" }, "Reminder"),
                        createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                          createVNode(_component_NuxtFormField, { label: "Reminders Sent" }, {
                            default: withCtx(() => [
                              createVNode(_component_NuxtInput, {
                                value: unref(selectedUser).reminderCount,
                                readonly: "",
                                class: "w-full"
                              }, null, 8, ["value"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_NuxtFormField, { label: "Last reminder sent at" }, {
                            default: withCtx(() => [
                              createVNode(_component_NuxtInput, {
                                value: unref(selectedUser).lastReminderAt ? unref(useDateFormat)(
                                  unref(selectedUser).lastReminderAt,
                                  "MMM DD, YYYY hh:mm aa"
                                ).value : "No reminders sent yet",
                                readonly: "",
                                class: "w-full"
                              }, null, 8, ["value"])
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("div", { class: "flex justify-end mt-8 gap-2" }, [
                          createVNode(_component_NuxtButton, {
                            label: "Cancel request",
                            color: "error",
                            variant: "soft",
                            icon: "lucide-circle-x",
                            "loading-auto": "",
                            onClick: ($event) => cancelRequest(unref(selectedUser), close)
                          }, null, 8, ["onClick"]),
                          createVNode(_component_NuxtButton, {
                            label: "Send reminder",
                            icon: "lucide-clock",
                            "loading-auto": "",
                            onClick: ($event) => sendReminder(unref(selectedUser), close)
                          }, null, 8, ["onClick"])
                        ])
                      ])
                    ])) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_NuxtTable, {
                data: unref(items),
                columns,
                loading: unref(pending),
                style: { "min-width": "0" },
                onSelect: handleSelect
              }, null, 8, ["data", "loading"]),
              createVNode(_component_NuxtModal, {
                open: unref(open),
                "onUpdate:open": [($event) => isRef(open) ? open.value = $event : null, handleOpen],
                title: "Joint Account Request"
              }, {
                body: withCtx(({ close }) => [
                  unref(selectedUser) ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "space-y-8"
                  }, [
                    unref(cancelError) || unref(reminderError) ? (openBlock(), createBlock(_component_FetchErrorAlert, {
                      key: 0,
                      message: unref(cancelError)?.message || unref(reminderError)?.message
                    }, null, 8, ["message"])) : createCommentVNode("", true),
                    createVNode("div", null, [
                      createVNode("h3", { class: "text-2xl font-medium" }, "User Info"),
                      createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                        createVNode(_component_NuxtFormField, {
                          label: "Name",
                          class: "md:col-span-2"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_NuxtInput, {
                              value: unref(selectedUser).recipientName,
                              readonly: "",
                              class: "w-full"
                            }, null, 8, ["value"])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_NuxtFormField, {
                          label: "Email",
                          class: "md:col-span-2"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_NuxtInput, {
                              value: unref(selectedUser).recipientEmail,
                              readonly: "",
                              class: "w-full"
                            }, null, 8, ["value"])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_NuxtFormField, { label: "Role" }, {
                          default: withCtx(() => [
                            createVNode(_component_NuxtInput, {
                              value: ("toCase" in _ctx ? _ctx.toCase : unref(toCase))(unref(selectedUser).role, "sentence"),
                              readonly: "",
                              class: "w-full"
                            }, null, 8, ["value"])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_NuxtFormField, { label: "Ownership" }, {
                          default: withCtx(() => [
                            createVNode(_component_NuxtInput, {
                              value: unref(selectedUser).ownership + "%",
                              readonly: "",
                              class: "w-full"
                            }, null, 8, ["value"])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_NuxtFormField, { label: "Requested By" }, {
                          default: withCtx(() => [
                            createVNode(_component_NuxtInput, {
                              value: unref(selectedUser).creator.name,
                              readonly: "",
                              class: "w-full"
                            }, null, 8, ["value"])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_NuxtFormField, { label: "Request Date" }, {
                          default: withCtx(() => [
                            createVNode(_component_NuxtInput, {
                              value: unref(useDateFormat)(
                                unref(selectedUser).createdAt,
                                "MMM DD, YYYY hh:mm aa"
                              ).value,
                              readonly: "",
                              class: "w-full"
                            }, null, 8, ["value"])
                          ]),
                          _: 1
                        })
                      ])
                    ]),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode("h3", { class: "text-2xl font-medium" }, "Reminder"),
                      createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                        createVNode(_component_NuxtFormField, { label: "Reminders Sent" }, {
                          default: withCtx(() => [
                            createVNode(_component_NuxtInput, {
                              value: unref(selectedUser).reminderCount,
                              readonly: "",
                              class: "w-full"
                            }, null, 8, ["value"])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_NuxtFormField, { label: "Last reminder sent at" }, {
                          default: withCtx(() => [
                            createVNode(_component_NuxtInput, {
                              value: unref(selectedUser).lastReminderAt ? unref(useDateFormat)(
                                unref(selectedUser).lastReminderAt,
                                "MMM DD, YYYY hh:mm aa"
                              ).value : "No reminders sent yet",
                              readonly: "",
                              class: "w-full"
                            }, null, 8, ["value"])
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode("div", { class: "flex justify-end mt-8 gap-2" }, [
                        createVNode(_component_NuxtButton, {
                          label: "Cancel request",
                          color: "error",
                          variant: "soft",
                          icon: "lucide-circle-x",
                          "loading-auto": "",
                          onClick: ($event) => cancelRequest(unref(selectedUser), close)
                        }, null, 8, ["onClick"]),
                        createVNode(_component_NuxtButton, {
                          label: "Send reminder",
                          icon: "lucide-clock",
                          "loading-auto": "",
                          onClick: ($event) => sendReminder(unref(selectedUser), close)
                        }, null, 8, ["onClick"])
                      ])
                    ])
                  ])) : createCommentVNode("", true)
                ]),
                _: 1
              }, 8, ["open", "onUpdate:open"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/user/financial-account/requested-account-users.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_4 = Object.assign(_sfc_main$1, { __name: "UserFinancialAccountRequestedAccountUsers" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "account-users",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const accountId = useRouteData().getParams("accountId");
    const { data, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `/api/user/financial-accounts/${accountId}`,
      {
        pick: ["id", "name", "type", "ownership", "status"]
      },
      "$Hqs5qXUbjr"
    )), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MyPage = __nuxt_component_0;
      const _component_NuxtCard = _sfc_main$4;
      const _component_UserFinancialAccountCurrentUsers = __nuxt_component_2;
      const _component_UserAddAccountUserWidget = __nuxt_component_3;
      const _component_UserFinancialAccountRequestedAccountUsers = __nuxt_component_4;
      _push(ssrRenderComponent(_component_MyPage, mergeProps({
        error: unref(error),
        onRefresh: ($event) => unref(refresh)()
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-8"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtCard, null, {
              header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p class="card-title"${_scopeId2}>Account Owners</p>`);
                } else {
                  return [
                    createVNode("p", { class: "card-title" }, "Account Owners")
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UserFinancialAccountCurrentUsers, null, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", null, [
                      createVNode(_component_UserFinancialAccountCurrentUsers)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (unref(data)?.ownership === "joint") {
              _push2(ssrRenderComponent(_component_NuxtCard, null, {
                header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="flex items-center gap-4 justify-between"${_scopeId2}><div${_scopeId2}><p class="card-title"${_scopeId2}>Pending Requests</p><small${_scopeId2}> These users are yet to accept the joint account request </small></div>`);
                    _push3(ssrRenderComponent(_component_UserAddAccountUserWidget, { "account-id": unref(accountId) }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "flex items-center gap-4 justify-between" }, [
                        createVNode("div", null, [
                          createVNode("p", { class: "card-title" }, "Pending Requests"),
                          createVNode("small", null, " These users are yet to accept the joint account request ")
                        ]),
                        createVNode(_component_UserAddAccountUserWidget, { "account-id": unref(accountId) }, null, 8, ["account-id"])
                      ])
                    ];
                  }
                }),
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_UserFinancialAccountRequestedAccountUsers, null, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    return [
                      createVNode("div", null, [
                        createVNode(_component_UserFinancialAccountRequestedAccountUsers)
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-8" }, [
                createVNode(_component_NuxtCard, null, {
                  header: withCtx(() => [
                    createVNode("p", { class: "card-title" }, "Account Owners")
                  ]),
                  default: withCtx(() => [
                    createVNode("div", null, [
                      createVNode(_component_UserFinancialAccountCurrentUsers)
                    ])
                  ]),
                  _: 1
                }),
                unref(data)?.ownership === "joint" ? (openBlock(), createBlock(_component_NuxtCard, { key: 0 }, {
                  header: withCtx(() => [
                    createVNode("div", { class: "flex items-center gap-4 justify-between" }, [
                      createVNode("div", null, [
                        createVNode("p", { class: "card-title" }, "Pending Requests"),
                        createVNode("small", null, " These users are yet to accept the joint account request ")
                      ]),
                      createVNode(_component_UserAddAccountUserWidget, { "account-id": unref(accountId) }, null, 8, ["account-id"])
                    ])
                  ]),
                  default: withCtx(() => [
                    createVNode("div", null, [
                      createVNode(_component_UserFinancialAccountRequestedAccountUsers)
                    ])
                  ]),
                  _: 1
                })) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/user/accounts/[accountId]/account-users.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=account-users-BQEjO4TZ.mjs.map
