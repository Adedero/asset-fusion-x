import { _ as __nuxt_component_0 } from './my-page-D-1fCn2X.mjs';
import { h as useConfirm, e as useToast, a as _sfc_main$a, f as _sfc_main$4 } from './server.mjs';
import { _ as _sfc_main$3 } from './Form-bNvz49n8.mjs';
import { _ as _sfc_main$5 } from './FormField-BuvMUjfY.mjs';
import { _ as _sfc_main$6 } from './Input-D-obAiG7.mjs';
import { _ as _sfc_main$7 } from './Textarea-DNKj0TkT.mjs';
import { _ as _sfc_main$8 } from './Select-xAvxLs4-.mjs';
import { defineComponent, ref, withAsyncContext, mergeProps, unref, withCtx, isRef, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, createVNode, createCommentVNode, useModel, reactive, watch, withModifiers, mergeModels, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { B as BannedIpSchema, e as banDurations } from '../_/schemas.mjs';
import { a8 as normalizeException } from '../_/nitro.mjs';
import { _ as __nuxt_component_5, a as __nuxt_component_6, b as __nuxt_component_7, c as __nuxt_component_8, d as __nuxt_component_9, e as __nuxt_component_1 } from './v-table-cell-D3OgOQeO.mjs';
import { _ as _sfc_main$2 } from './Badge-Cc8D9XvB.mjs';
import { useDateFormat } from '@vueuse/core';
import { u as useFetch } from './fetch-CSk15cWP.mjs';
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
import 'zod';
import './_plugin-vue_export-helper-1tPrXgE0.mjs';
import '@vue/shared';
import './ssr-CXDHmH_F.mjs';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "banned-ip-modal",
  __ssrInlineRender: true,
  props: {
    "open": { type: Boolean, ...{ default: false } },
    "openModifiers": {}
  },
  emits: /* @__PURE__ */ mergeModels(["done"], ["update:open"]),
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const open = useModel(__props, "open");
    const toast = useToast();
    const state = reactive({
      ipAddress: "",
      reason: "",
      duration: "permanent"
    });
    function reset() {
      state.ipAddress = "";
      state.reason = "";
      state.duration = "permanent";
    }
    watch(open, (isOpen) => {
      if (isOpen) reset();
    });
    const handleSubmit = async (event) => {
      try {
        await $fetch("/api/admin/banned-ips", {
          method: "POST",
          body: event.data
        });
        emit("done");
        toast.add({
          color: "success",
          title: "Success",
          description: "IP address banned successfully"
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
      const _component_NuxtModal = _sfc_main$4;
      const _component_NuxtForm = _sfc_main$3;
      const _component_NuxtFormField = _sfc_main$5;
      const _component_NuxtInput = _sfc_main$6;
      const _component_NuxtTextarea = _sfc_main$7;
      const _component_NuxtSelect = _sfc_main$8;
      const _component_NuxtButton = _sfc_main$a;
      _push(ssrRenderComponent(_component_NuxtModal, mergeProps({
        open: open.value,
        "onUpdate:open": ($event) => open.value = $event,
        title: "Ban IP Address",
        dismissible: false
      }, _attrs), {
        body: withCtx(({ close }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtForm, {
              state: unref(state),
              schema: unref(BannedIpSchema),
              class: "space-y-4",
              onSubmit: handleSubmit
            }, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
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
                          class: "w-full",
                          placeholder: "e.g. 203.0.113.5"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_NuxtInput, {
                            modelValue: unref(state).ipAddress,
                            "onUpdate:modelValue": ($event) => unref(state).ipAddress = $event,
                            class: "w-full",
                            placeholder: "e.g. 203.0.113.5"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
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
                          class: "w-full"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_NuxtTextarea, {
                            modelValue: unref(state).reason,
                            "onUpdate:modelValue": ($event) => unref(state).reason = $event,
                            "max-rows": 4,
                            autoresize: "",
                            class: "w-full"
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
                    label: "Ban IP",
                    "loading-auto": ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode(_component_NuxtFormField, {
                      name: "ipAddress",
                      label: "IP Address",
                      required: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_NuxtInput, {
                          modelValue: unref(state).ipAddress,
                          "onUpdate:modelValue": ($event) => unref(state).ipAddress = $event,
                          class: "w-full",
                          placeholder: "e.g. 203.0.113.5"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
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
                          class: "w-full"
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
                        label: "Ban IP",
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
                schema: unref(BannedIpSchema),
                class: "space-y-4",
                onSubmit: withModifiers(handleSubmit, ["prevent"])
              }, {
                default: withCtx(() => [
                  createVNode(_component_NuxtFormField, {
                    name: "ipAddress",
                    label: "IP Address",
                    required: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_NuxtInput, {
                        modelValue: unref(state).ipAddress,
                        "onUpdate:modelValue": ($event) => unref(state).ipAddress = $event,
                        class: "w-full",
                        placeholder: "e.g. 203.0.113.5"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
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
                        class: "w-full"
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
                      label: "Ban IP",
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/banned-ip-modal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main$1, { __name: "AdminBannedIpModal" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "banned-ips",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { confirmAsync } = useConfirm();
    const toast = useToast();
    const open = ref(false);
    const { data, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/admin/banned-ips",
      "$VoDzGw65Qg"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const headers = [
      "IP Address",
      "Reason",
      "Linked User",
      "Expires",
      "Created",
      "Actions"
    ];
    const isExpired = (expiresAt) => !!expiresAt && new Date(expiresAt).getTime() < Date.now();
    const removeBan = async (id) => {
      const confirm = await confirmAsync({
        title: "Remove IP Ban",
        description: "Are you sure you want to unban this IP address?",
        acceptProps: { color: "error", label: "Remove" }
      });
      if (!confirm) return;
      try {
        await $fetch(`/api/admin/banned-ips/${id}`, { method: "DELETE" });
        toast.add({
          color: "success",
          title: "Success",
          description: "IP address unbanned successfully"
        });
        refresh();
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
      const _component_NuxtButton = _sfc_main$a;
      const _component_AdminBannedIpModal = __nuxt_component_2;
      const _component_VTable = __nuxt_component_5;
      const _component_VTableHeader = __nuxt_component_6;
      const _component_VTableRow = __nuxt_component_7;
      const _component_VTableHead = __nuxt_component_8;
      const _component_VTableBody = __nuxt_component_9;
      const _component_VTableCell = __nuxt_component_1;
      const _component_NuxtBadge = _sfc_main$2;
      _push(ssrRenderComponent(_component_MyPage, mergeProps({
        error: unref(error),
        onRefresh: () => unref(refresh)()
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}><header class="flex items-center gap-2 justify-between flex-wrap"${_scopeId}><h1 class="text-3xl font-semibold"${_scopeId}>Banned IPs</h1>`);
            _push2(ssrRenderComponent(_component_NuxtButton, {
              label: "Ban IP",
              icon: "lucide:plus",
              onClick: ($event) => open.value = true
            }, null, _parent2, _scopeId));
            _push2(`</header>`);
            if (unref(data)) {
              _push2(`<section class="mt-5"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_AdminBannedIpModal, {
                open: unref(open),
                "onUpdate:open": ($event) => isRef(open) ? open.value = $event : null,
                onDone: () => unref(refresh)()
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_VTable, null, {
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
                          ssrRenderList(unref(data), (ban) => {
                            _push4(ssrRenderComponent(_component_VTableRow, {
                              key: ban.id
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(_component_VTableCell, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(ban.ipAddress)}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(ban.ipAddress), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(_component_VTableCell, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(ban.reason)}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(ban.reason), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(_component_VTableCell, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        if (ban.user) {
                                          _push6(`<div${_scopeId5}><p${_scopeId5}>${ssrInterpolate(ban.user.name)}</p><p class="text-sm text-muted"${_scopeId5}>${ssrInterpolate(ban.user.email)}</p></div>`);
                                        } else {
                                          _push6(`<span${_scopeId5}>—</span>`);
                                        }
                                      } else {
                                        return [
                                          ban.user ? (openBlock(), createBlock("div", { key: 0 }, [
                                            createVNode("p", null, toDisplayString(ban.user.name), 1),
                                            createVNode("p", { class: "text-sm text-muted" }, toDisplayString(ban.user.email), 1)
                                          ])) : (openBlock(), createBlock("span", { key: 1 }, "—"))
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(_component_VTableCell, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        if (!ban.expiresAt) {
                                          _push6(ssrRenderComponent(_component_NuxtBadge, {
                                            label: "Permanent",
                                            color: "neutral",
                                            variant: "subtle"
                                          }, null, _parent6, _scopeId5));
                                        } else {
                                          _push6(`<div class="flex items-center gap-2"${_scopeId5}><span${_scopeId5}>${ssrInterpolate(unref(useDateFormat)(ban.expiresAt, "YYYY-MMM-DD"))}</span>`);
                                          if (isExpired(ban.expiresAt)) {
                                            _push6(ssrRenderComponent(_component_NuxtBadge, {
                                              label: "Expired",
                                              color: "warning",
                                              variant: "subtle"
                                            }, null, _parent6, _scopeId5));
                                          } else {
                                            _push6(`<!---->`);
                                          }
                                          _push6(`</div>`);
                                        }
                                      } else {
                                        return [
                                          !ban.expiresAt ? (openBlock(), createBlock(_component_NuxtBadge, {
                                            key: 0,
                                            label: "Permanent",
                                            color: "neutral",
                                            variant: "subtle"
                                          })) : (openBlock(), createBlock("div", {
                                            key: 1,
                                            class: "flex items-center gap-2"
                                          }, [
                                            createVNode("span", null, toDisplayString(unref(useDateFormat)(ban.expiresAt, "YYYY-MMM-DD")), 1),
                                            isExpired(ban.expiresAt) ? (openBlock(), createBlock(_component_NuxtBadge, {
                                              key: 0,
                                              label: "Expired",
                                              color: "warning",
                                              variant: "subtle"
                                            })) : createCommentVNode("", true)
                                          ]))
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(_component_VTableCell, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(unref(useDateFormat)(ban.createdAt, "YYYY-MMM-DD"))}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(unref(useDateFormat)(ban.createdAt, "YYYY-MMM-DD")), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(_component_VTableCell, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent(_component_NuxtButton, {
                                          label: "Remove",
                                          color: "error",
                                          variant: "soft",
                                          size: "sm",
                                          "loading-auto": "",
                                          onClick: ($event) => removeBan(ban.id)
                                        }, null, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          createVNode(_component_NuxtButton, {
                                            label: "Remove",
                                            color: "error",
                                            variant: "soft",
                                            size: "sm",
                                            "loading-auto": "",
                                            onClick: ($event) => removeBan(ban.id)
                                          }, null, 8, ["onClick"])
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode(_component_VTableCell, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(ban.ipAddress), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_VTableCell, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(ban.reason), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_VTableCell, null, {
                                      default: withCtx(() => [
                                        ban.user ? (openBlock(), createBlock("div", { key: 0 }, [
                                          createVNode("p", null, toDisplayString(ban.user.name), 1),
                                          createVNode("p", { class: "text-sm text-muted" }, toDisplayString(ban.user.email), 1)
                                        ])) : (openBlock(), createBlock("span", { key: 1 }, "—"))
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_VTableCell, null, {
                                      default: withCtx(() => [
                                        !ban.expiresAt ? (openBlock(), createBlock(_component_NuxtBadge, {
                                          key: 0,
                                          label: "Permanent",
                                          color: "neutral",
                                          variant: "subtle"
                                        })) : (openBlock(), createBlock("div", {
                                          key: 1,
                                          class: "flex items-center gap-2"
                                        }, [
                                          createVNode("span", null, toDisplayString(unref(useDateFormat)(ban.expiresAt, "YYYY-MMM-DD")), 1),
                                          isExpired(ban.expiresAt) ? (openBlock(), createBlock(_component_NuxtBadge, {
                                            key: 0,
                                            label: "Expired",
                                            color: "warning",
                                            variant: "subtle"
                                          })) : createCommentVNode("", true)
                                        ]))
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_VTableCell, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(unref(useDateFormat)(ban.createdAt, "YYYY-MMM-DD")), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_VTableCell, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_NuxtButton, {
                                          label: "Remove",
                                          color: "error",
                                          variant: "soft",
                                          size: "sm",
                                          "loading-auto": "",
                                          onClick: ($event) => removeBan(ban.id)
                                        }, null, 8, ["onClick"])
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
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(data), (ban) => {
                              return openBlock(), createBlock(_component_VTableRow, {
                                key: ban.id
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_VTableCell, null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(ban.ipAddress), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_VTableCell, null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(ban.reason), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_VTableCell, null, {
                                    default: withCtx(() => [
                                      ban.user ? (openBlock(), createBlock("div", { key: 0 }, [
                                        createVNode("p", null, toDisplayString(ban.user.name), 1),
                                        createVNode("p", { class: "text-sm text-muted" }, toDisplayString(ban.user.email), 1)
                                      ])) : (openBlock(), createBlock("span", { key: 1 }, "—"))
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_VTableCell, null, {
                                    default: withCtx(() => [
                                      !ban.expiresAt ? (openBlock(), createBlock(_component_NuxtBadge, {
                                        key: 0,
                                        label: "Permanent",
                                        color: "neutral",
                                        variant: "subtle"
                                      })) : (openBlock(), createBlock("div", {
                                        key: 1,
                                        class: "flex items-center gap-2"
                                      }, [
                                        createVNode("span", null, toDisplayString(unref(useDateFormat)(ban.expiresAt, "YYYY-MMM-DD")), 1),
                                        isExpired(ban.expiresAt) ? (openBlock(), createBlock(_component_NuxtBadge, {
                                          key: 0,
                                          label: "Expired",
                                          color: "warning",
                                          variant: "subtle"
                                        })) : createCommentVNode("", true)
                                      ]))
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_VTableCell, null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(unref(useDateFormat)(ban.createdAt, "YYYY-MMM-DD")), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_VTableCell, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_NuxtButton, {
                                        label: "Remove",
                                        color: "error",
                                        variant: "soft",
                                        size: "sm",
                                        "loading-auto": "",
                                        onClick: ($event) => removeBan(ban.id)
                                      }, null, 8, ["onClick"])
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
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(data), (ban) => {
                            return openBlock(), createBlock(_component_VTableRow, {
                              key: ban.id
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(ban.ipAddress), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(ban.reason), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    ban.user ? (openBlock(), createBlock("div", { key: 0 }, [
                                      createVNode("p", null, toDisplayString(ban.user.name), 1),
                                      createVNode("p", { class: "text-sm text-muted" }, toDisplayString(ban.user.email), 1)
                                    ])) : (openBlock(), createBlock("span", { key: 1 }, "—"))
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    !ban.expiresAt ? (openBlock(), createBlock(_component_NuxtBadge, {
                                      key: 0,
                                      label: "Permanent",
                                      color: "neutral",
                                      variant: "subtle"
                                    })) : (openBlock(), createBlock("div", {
                                      key: 1,
                                      class: "flex items-center gap-2"
                                    }, [
                                      createVNode("span", null, toDisplayString(unref(useDateFormat)(ban.expiresAt, "YYYY-MMM-DD")), 1),
                                      isExpired(ban.expiresAt) ? (openBlock(), createBlock(_component_NuxtBadge, {
                                        key: 0,
                                        label: "Expired",
                                        color: "warning",
                                        variant: "subtle"
                                      })) : createCommentVNode("", true)
                                    ]))
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(unref(useDateFormat)(ban.createdAt, "YYYY-MMM-DD")), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_NuxtButton, {
                                      label: "Remove",
                                      color: "error",
                                      variant: "soft",
                                      size: "sm",
                                      "loading-auto": "",
                                      onClick: ($event) => removeBan(ban.id)
                                    }, null, 8, ["onClick"])
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1024);
                          }), 128))
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</section>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", null, [
                createVNode("header", { class: "flex items-center gap-2 justify-between flex-wrap" }, [
                  createVNode("h1", { class: "text-3xl font-semibold" }, "Banned IPs"),
                  createVNode(_component_NuxtButton, {
                    label: "Ban IP",
                    icon: "lucide:plus",
                    onClick: ($event) => open.value = true
                  }, null, 8, ["onClick"])
                ]),
                unref(data) ? (openBlock(), createBlock("section", {
                  key: 0,
                  class: "mt-5"
                }, [
                  createVNode(_component_AdminBannedIpModal, {
                    open: unref(open),
                    "onUpdate:open": ($event) => isRef(open) ? open.value = $event : null,
                    onDone: () => unref(refresh)()
                  }, null, 8, ["open", "onUpdate:open", "onDone"]),
                  createVNode(_component_VTable, null, {
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
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(data), (ban) => {
                            return openBlock(), createBlock(_component_VTableRow, {
                              key: ban.id
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(ban.ipAddress), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(ban.reason), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    ban.user ? (openBlock(), createBlock("div", { key: 0 }, [
                                      createVNode("p", null, toDisplayString(ban.user.name), 1),
                                      createVNode("p", { class: "text-sm text-muted" }, toDisplayString(ban.user.email), 1)
                                    ])) : (openBlock(), createBlock("span", { key: 1 }, "—"))
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    !ban.expiresAt ? (openBlock(), createBlock(_component_NuxtBadge, {
                                      key: 0,
                                      label: "Permanent",
                                      color: "neutral",
                                      variant: "subtle"
                                    })) : (openBlock(), createBlock("div", {
                                      key: 1,
                                      class: "flex items-center gap-2"
                                    }, [
                                      createVNode("span", null, toDisplayString(unref(useDateFormat)(ban.expiresAt, "YYYY-MMM-DD")), 1),
                                      isExpired(ban.expiresAt) ? (openBlock(), createBlock(_component_NuxtBadge, {
                                        key: 0,
                                        label: "Expired",
                                        color: "warning",
                                        variant: "subtle"
                                      })) : createCommentVNode("", true)
                                    ]))
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(unref(useDateFormat)(ban.createdAt, "YYYY-MMM-DD")), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_NuxtButton, {
                                      label: "Remove",
                                      color: "error",
                                      variant: "soft",
                                      size: "sm",
                                      "loading-auto": "",
                                      onClick: ($event) => removeBan(ban.id)
                                    }, null, 8, ["onClick"])
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1024);
                          }), 128))
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/banned-ips.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=banned-ips-DAxuANW2.mjs.map
