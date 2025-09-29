import { _ as __nuxt_component_0 } from './my-page-Cu0txfPp.mjs';
import { _ as _sfc_main$2 } from './FieldGroup-CbIMy4e7.mjs';
import { c as _sfc_main$a, k as _sfc_main$d, g as useToast, h as _sfc_main$4$1 } from './server.mjs';
import { _ as _sfc_main$3 } from './Input-CVv-L3LC.mjs';
import { _ as __nuxt_component_5, a as __nuxt_component_6, b as __nuxt_component_7, c as __nuxt_component_8, d as __nuxt_component_9, e as __nuxt_component_10 } from './v-table-cell-CB8LFlWB.mjs';
import { _ as _sfc_main$4 } from './Badge-DE6iRalv.mjs';
import { _ as __nuxt_component_11 } from './simple-paginator-CqEBrD2O.mjs';
import { _ as _sfc_main$5 } from './FormField-CZNrbocD.mjs';
import { _ as _sfc_main$6 } from './Select-BLUNCmBz.mjs';
import { defineComponent, ref, computed, withAsyncContext, mergeProps, unref, withCtx, isRef, createVNode, createTextVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, createCommentVNode, mergeModels, useModel, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { a3 as normalizeException } from '../nitro/nitro.mjs';
import { u as useAuthStore } from './auth.store-VvkDhiyP.mjs';
import { u as useFetch } from './fetch-CGkSb6cH.mjs';
import './fetch-error-alert-NIQ5BlkS.mjs';
import './Alert-CKjxjhE_.mjs';
import 'reka-ui';
import 'vue-router';
import 'better-auth/vue';
import 'better-auth/client/plugins';
import 'tailwindcss/colors';
import '@iconify/vue';
import '@vueuse/core';
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
import './_plugin-vue_export-helper-1tPrXgE0.mjs';
import '@vue/shared';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "kyc-editor",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    profile: {}
  }, {
    "open": { type: Boolean, ...{ default: false } },
    "openModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["done"], ["update:open"]),
  setup(__props, { emit: __emit }) {
    const toast = useToast();
    const emit = __emit;
    const state = ref(__props.profile.kycStatus ?? "pending");
    const open = useModel(__props, "open");
    const items = ["pending", "rejected", "resubmit", "verified"];
    const handleSubmit = async () => {
      try {
        const { message } = await $fetch(`/api/admin/kyc-data/${__props.profile.id}`, {
          method: "PUT",
          body: { status: state.value }
        });
        toast.add({
          color: "success",
          title: "Success",
          description: message
        });
        open.value = false;
        emit("done");
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
      const _component_NuxtAvatar = _sfc_main$d;
      const _component_NuxtFormField = _sfc_main$5;
      const _component_NuxtSelect = _sfc_main$6;
      const _component_NuxtButton = _sfc_main$a;
      _push(ssrRenderComponent(_component_NuxtModal, mergeProps({
        open: open.value,
        "onUpdate:open": ($event) => open.value = $event,
        title: "Update KYC Status",
        dismissible: false
      }, _attrs), {
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}><div class="space-y-5"${_scopeId}><div class="flex-col-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtAvatar, {
              src: __props.profile.image ?? void 0,
              alt: __props.profile.fullName,
              size: "3xl"
            }, null, _parent2, _scopeId));
            _push2(`<p class="text-center font-semibold"${_scopeId}>${ssrInterpolate(__props.profile.fullName)}</p></div>`);
            if (__props.profile.kycStatus) {
              _push2(`<div class="space-y-5"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_NuxtFormField, { label: "Kyc Status" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_NuxtSelect, {
                      modelValue: unref(state),
                      "onUpdate:modelValue": ($event) => isRef(state) ? state.value = $event : null,
                      items,
                      class: "w-full"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_NuxtSelect, {
                        modelValue: unref(state),
                        "onUpdate:modelValue": ($event) => isRef(state) ? state.value = $event : null,
                        items,
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<div class="flex items-center justify-end gap-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_NuxtButton, {
                label: "Cancel",
                color: "neutral",
                variant: "soft",
                onClick: ($event) => open.value = false
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_NuxtButton, {
                label: "Submit",
                disabled: __props.profile.kycStatus === unref(state),
                "loading-auto": "",
                onClick: handleSubmit
              }, null, _parent2, _scopeId));
              _push2(`</div></div>`);
            } else {
              _push2(`<div${_scopeId}><p class="text-center text-muted"${_scopeId}> This user has not uploaded their ID for KYC verification. </p></div>`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", null, [
                createVNode("div", { class: "space-y-5" }, [
                  createVNode("div", { class: "flex-col-center gap-2" }, [
                    createVNode(_component_NuxtAvatar, {
                      src: __props.profile.image ?? void 0,
                      alt: __props.profile.fullName,
                      size: "3xl"
                    }, null, 8, ["src", "alt"]),
                    createVNode("p", { class: "text-center font-semibold" }, toDisplayString(__props.profile.fullName), 1)
                  ]),
                  __props.profile.kycStatus ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "space-y-5"
                  }, [
                    createVNode(_component_NuxtFormField, { label: "Kyc Status" }, {
                      default: withCtx(() => [
                        createVNode(_component_NuxtSelect, {
                          modelValue: unref(state),
                          "onUpdate:modelValue": ($event) => isRef(state) ? state.value = $event : null,
                          items,
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "flex items-center justify-end gap-2" }, [
                      createVNode(_component_NuxtButton, {
                        label: "Cancel",
                        color: "neutral",
                        variant: "soft",
                        onClick: ($event) => open.value = false
                      }, null, 8, ["onClick"]),
                      createVNode(_component_NuxtButton, {
                        label: "Submit",
                        disabled: __props.profile.kycStatus === unref(state),
                        "loading-auto": "",
                        onClick: handleSubmit
                      }, null, 8, ["disabled"])
                    ])
                  ])) : (openBlock(), createBlock("div", { key: 1 }, [
                    createVNode("p", { class: "text-center text-muted" }, " This user has not uploaded their ID for KYC verification. ")
                  ]))
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/kyc-editor.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_13 = Object.assign(_sfc_main$1, { __name: "AdminKycEditor" });
function getKycStatusBadgeColor(status) {
  switch (status) {
    case "pending":
      return "primary";
    case "verified":
      return "success";
    case "rejected":
      return "error";
    case "resubmit":
      return "warning";
    case null:
    default:
      return "neutral";
  }
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "kyc-data",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const authStore = useAuthStore();
    const page = ref(0);
    const limit = ref(20);
    const search = ref();
    const query = computed(() => {
      const searchParams = new URLSearchParams();
      searchParams.set("page", page.value.toString());
      searchParams.set("limit", limit.value.toString());
      if (search.value) {
        searchParams.set("search", search.value.toLowerCase());
      }
      return Object.fromEntries(searchParams.entries());
    });
    const {
      data: profiles,
      error,
      refresh
    } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/admin/kyc-data", { query }, "$b79b1tKRde")), __temp = await __temp, __restore(), __temp);
    const allLoaded = computed(() => {
      return profiles.value ? profiles.value.length < limit.value : false;
    });
    const selectedProfile = ref(null);
    const open = ref(false);
    const handleProfileSelect = (id) => {
      selectedProfile.value = profiles.value?.find((profile) => profile.id === id) ?? null;
      if (selectedProfile.value) {
        open.value = true;
      }
    };
    const headers = ["#", "", "Name", "Email", "KYC Status", "ID Type", "Actions"];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MyPage = __nuxt_component_0;
      const _component_NuxtFieldGroup = _sfc_main$2;
      const _component_NuxtButton = _sfc_main$a;
      const _component_NuxtInput = _sfc_main$3;
      const _component_VTable = __nuxt_component_5;
      const _component_VTableHeader = __nuxt_component_6;
      const _component_VTableRow = __nuxt_component_7;
      const _component_VTableHead = __nuxt_component_8;
      const _component_VTableBody = __nuxt_component_9;
      const _component_VTableCell = __nuxt_component_10;
      const _component_NuxtAvatar = _sfc_main$d;
      const _component_NuxtBadge = _sfc_main$4;
      const _component_NuxtSimplePaginator = __nuxt_component_11;
      const _component_AdminKycEditor = __nuxt_component_13;
      _push(ssrRenderComponent(_component_MyPage, mergeProps({
        error: unref(error),
        onRefresh: () => unref(refresh)()
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<section class="space-y-10"${_scopeId}><div class="flex items-end justify-between gap-5 flex-wrap"${_scopeId}><h1 class="text-3xl font-semibold"${_scopeId}>KYC Data</h1><div${_scopeId}>`);
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
            _push2(`</div></div>`);
            if (unref(profiles)) {
              _push2(`<div${_scopeId}>`);
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
                          ssrRenderList(unref(profiles), (profile, index) => {
                            _push4(ssrRenderComponent(_component_VTableRow, {
                              key: profile.id
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(_component_VTableCell, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(index + 1 + unref(page) * unref(limit))}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(index + 1 + unref(page) * unref(limit)), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(_component_VTableCell, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent(_component_NuxtAvatar, {
                                          src: profile.image ?? void 0,
                                          alt: profile.fullName,
                                          size: "md"
                                        }, null, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          createVNode(_component_NuxtAvatar, {
                                            src: profile.image ?? void 0,
                                            alt: profile.fullName,
                                            size: "md"
                                          }, null, 8, ["src", "alt"])
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(_component_VTableCell, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`<div class="flex items-center gap-1"${_scopeId5}><p${_scopeId5}>${ssrInterpolate(profile.fullName)}</p>`);
                                        if (profile.userId === unref(authStore).user.value?.id) {
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
                                            createVNode("p", null, toDisplayString(profile.fullName), 1),
                                            profile.userId === unref(authStore).user.value?.id ? (openBlock(), createBlock(_component_NuxtBadge, {
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
                                        _push6(`${ssrInterpolate(profile.email)}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(profile.email), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(_component_VTableCell, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent(_component_NuxtBadge, {
                                          label: profile.kycStatus ?? "not submitted",
                                          color: ("getKycStatusBadgeColor" in _ctx ? _ctx.getKycStatusBadgeColor : unref(getKycStatusBadgeColor))(profile.kycStatus ?? null),
                                          variant: "subtle"
                                        }, null, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          createVNode(_component_NuxtBadge, {
                                            label: profile.kycStatus ?? "not submitted",
                                            color: ("getKycStatusBadgeColor" in _ctx ? _ctx.getKycStatusBadgeColor : unref(getKycStatusBadgeColor))(profile.kycStatus ?? null),
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
                                        _push6(`${ssrInterpolate(profile.governmentIdType ?? "n/a")}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(profile.governmentIdType ?? "n/a"), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(_component_VTableCell, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`<div class="flex items-center gap-2"${_scopeId5}>`);
                                        _push6(ssrRenderComponent(_component_NuxtButton, {
                                          label: "Edit",
                                          icon: "lucide:file-edit",
                                          variant: "soft",
                                          size: "sm",
                                          onClick: ($event) => handleProfileSelect(profile.id ?? "")
                                        }, null, _parent6, _scopeId5));
                                        if (profile.governmentId) {
                                          _push6(`<a${ssrRenderAttr("href", profile.governmentId ?? void 0)} download${_scopeId5}>`);
                                          _push6(ssrRenderComponent(_component_NuxtButton, {
                                            label: "Download",
                                            icon: "lucide:download",
                                            color: "neutral",
                                            variant: "outline",
                                            size: "sm",
                                            class: "pointer-none"
                                          }, null, _parent6, _scopeId5));
                                          _push6(`</a>`);
                                        } else {
                                          _push6(`<!---->`);
                                        }
                                        _push6(`</div>`);
                                      } else {
                                        return [
                                          createVNode("div", { class: "flex items-center gap-2" }, [
                                            createVNode(_component_NuxtButton, {
                                              label: "Edit",
                                              icon: "lucide:file-edit",
                                              variant: "soft",
                                              size: "sm",
                                              onClick: ($event) => handleProfileSelect(profile.id ?? "")
                                            }, null, 8, ["onClick"]),
                                            profile.governmentId ? (openBlock(), createBlock("a", {
                                              key: 0,
                                              href: profile.governmentId ?? void 0,
                                              download: ""
                                            }, [
                                              createVNode(_component_NuxtButton, {
                                                label: "Download",
                                                icon: "lucide:download",
                                                color: "neutral",
                                                variant: "outline",
                                                size: "sm",
                                                class: "pointer-none"
                                              })
                                            ], 8, ["href"])) : createCommentVNode("", true)
                                          ])
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode(_component_VTableCell, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(index + 1 + unref(page) * unref(limit)), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_VTableCell, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_NuxtAvatar, {
                                          src: profile.image ?? void 0,
                                          alt: profile.fullName,
                                          size: "md"
                                        }, null, 8, ["src", "alt"])
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_VTableCell, null, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "flex items-center gap-1" }, [
                                          createVNode("p", null, toDisplayString(profile.fullName), 1),
                                          profile.userId === unref(authStore).user.value?.id ? (openBlock(), createBlock(_component_NuxtBadge, {
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
                                        createTextVNode(toDisplayString(profile.email), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_VTableCell, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_NuxtBadge, {
                                          label: profile.kycStatus ?? "not submitted",
                                          color: ("getKycStatusBadgeColor" in _ctx ? _ctx.getKycStatusBadgeColor : unref(getKycStatusBadgeColor))(profile.kycStatus ?? null),
                                          variant: "subtle"
                                        }, null, 8, ["label", "color"])
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_VTableCell, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(profile.governmentIdType ?? "n/a"), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_VTableCell, null, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "flex items-center gap-2" }, [
                                          createVNode(_component_NuxtButton, {
                                            label: "Edit",
                                            icon: "lucide:file-edit",
                                            variant: "soft",
                                            size: "sm",
                                            onClick: ($event) => handleProfileSelect(profile.id ?? "")
                                          }, null, 8, ["onClick"]),
                                          profile.governmentId ? (openBlock(), createBlock("a", {
                                            key: 0,
                                            href: profile.governmentId ?? void 0,
                                            download: ""
                                          }, [
                                            createVNode(_component_NuxtButton, {
                                              label: "Download",
                                              icon: "lucide:download",
                                              color: "neutral",
                                              variant: "outline",
                                              size: "sm",
                                              class: "pointer-none"
                                            })
                                          ], 8, ["href"])) : createCommentVNode("", true)
                                        ])
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
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(profiles), (profile, index) => {
                              return openBlock(), createBlock(_component_VTableRow, {
                                key: profile.id
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_VTableCell, null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(index + 1 + unref(page) * unref(limit)), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_VTableCell, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_NuxtAvatar, {
                                        src: profile.image ?? void 0,
                                        alt: profile.fullName,
                                        size: "md"
                                      }, null, 8, ["src", "alt"])
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_VTableCell, null, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "flex items-center gap-1" }, [
                                        createVNode("p", null, toDisplayString(profile.fullName), 1),
                                        profile.userId === unref(authStore).user.value?.id ? (openBlock(), createBlock(_component_NuxtBadge, {
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
                                      createTextVNode(toDisplayString(profile.email), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_VTableCell, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_NuxtBadge, {
                                        label: profile.kycStatus ?? "not submitted",
                                        color: ("getKycStatusBadgeColor" in _ctx ? _ctx.getKycStatusBadgeColor : unref(getKycStatusBadgeColor))(profile.kycStatus ?? null),
                                        variant: "subtle"
                                      }, null, 8, ["label", "color"])
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_VTableCell, null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(profile.governmentIdType ?? "n/a"), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_VTableCell, null, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "flex items-center gap-2" }, [
                                        createVNode(_component_NuxtButton, {
                                          label: "Edit",
                                          icon: "lucide:file-edit",
                                          variant: "soft",
                                          size: "sm",
                                          onClick: ($event) => handleProfileSelect(profile.id ?? "")
                                        }, null, 8, ["onClick"]),
                                        profile.governmentId ? (openBlock(), createBlock("a", {
                                          key: 0,
                                          href: profile.governmentId ?? void 0,
                                          download: ""
                                        }, [
                                          createVNode(_component_NuxtButton, {
                                            label: "Download",
                                            icon: "lucide:download",
                                            color: "neutral",
                                            variant: "outline",
                                            size: "sm",
                                            class: "pointer-none"
                                          })
                                        ], 8, ["href"])) : createCommentVNode("", true)
                                      ])
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
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(profiles), (profile, index) => {
                            return openBlock(), createBlock(_component_VTableRow, {
                              key: profile.id
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(index + 1 + unref(page) * unref(limit)), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_NuxtAvatar, {
                                      src: profile.image ?? void 0,
                                      alt: profile.fullName,
                                      size: "md"
                                    }, null, 8, ["src", "alt"])
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "flex items-center gap-1" }, [
                                      createVNode("p", null, toDisplayString(profile.fullName), 1),
                                      profile.userId === unref(authStore).user.value?.id ? (openBlock(), createBlock(_component_NuxtBadge, {
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
                                    createTextVNode(toDisplayString(profile.email), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_NuxtBadge, {
                                      label: profile.kycStatus ?? "not submitted",
                                      color: ("getKycStatusBadgeColor" in _ctx ? _ctx.getKycStatusBadgeColor : unref(getKycStatusBadgeColor))(profile.kycStatus ?? null),
                                      variant: "subtle"
                                    }, null, 8, ["label", "color"])
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(profile.governmentIdType ?? "n/a"), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "flex items-center gap-2" }, [
                                      createVNode(_component_NuxtButton, {
                                        label: "Edit",
                                        icon: "lucide:file-edit",
                                        variant: "soft",
                                        size: "sm",
                                        onClick: ($event) => handleProfileSelect(profile.id ?? "")
                                      }, null, 8, ["onClick"]),
                                      profile.governmentId ? (openBlock(), createBlock("a", {
                                        key: 0,
                                        href: profile.governmentId ?? void 0,
                                        download: ""
                                      }, [
                                        createVNode(_component_NuxtButton, {
                                          label: "Download",
                                          icon: "lucide:download",
                                          color: "neutral",
                                          variant: "outline",
                                          size: "sm",
                                          class: "pointer-none"
                                        })
                                      ], 8, ["href"])) : createCommentVNode("", true)
                                    ])
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
              _push2(`<div${_scopeId}>`);
              _push2(ssrRenderComponent(_component_NuxtSimplePaginator, {
                page: unref(page),
                "onUpdate:page": ($event) => isRef(page) ? page.value = $event : null,
                rows: unref(limit),
                "all-loaded": unref(allLoaded)
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
              if (unref(selectedProfile)) {
                _push2(`<div${_scopeId}>`);
                _push2(ssrRenderComponent(_component_AdminKycEditor, {
                  open: unref(open),
                  "onUpdate:open": ($event) => isRef(open) ? open.value = $event : null,
                  profile: unref(selectedProfile),
                  onDone: () => {
                    selectedProfile.value = null;
                    unref(refresh)();
                  }
                }, null, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</section>`);
          } else {
            return [
              createVNode("section", { class: "space-y-10" }, [
                createVNode("div", { class: "flex items-end justify-between gap-5 flex-wrap" }, [
                  createVNode("h1", { class: "text-3xl font-semibold" }, "KYC Data"),
                  createVNode("div", null, [
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
                    })
                  ])
                ]),
                unref(profiles) ? (openBlock(), createBlock("div", { key: 0 }, [
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
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(profiles), (profile, index) => {
                            return openBlock(), createBlock(_component_VTableRow, {
                              key: profile.id
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(index + 1 + unref(page) * unref(limit)), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_NuxtAvatar, {
                                      src: profile.image ?? void 0,
                                      alt: profile.fullName,
                                      size: "md"
                                    }, null, 8, ["src", "alt"])
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "flex items-center gap-1" }, [
                                      createVNode("p", null, toDisplayString(profile.fullName), 1),
                                      profile.userId === unref(authStore).user.value?.id ? (openBlock(), createBlock(_component_NuxtBadge, {
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
                                    createTextVNode(toDisplayString(profile.email), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_NuxtBadge, {
                                      label: profile.kycStatus ?? "not submitted",
                                      color: ("getKycStatusBadgeColor" in _ctx ? _ctx.getKycStatusBadgeColor : unref(getKycStatusBadgeColor))(profile.kycStatus ?? null),
                                      variant: "subtle"
                                    }, null, 8, ["label", "color"])
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(profile.governmentIdType ?? "n/a"), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "flex items-center gap-2" }, [
                                      createVNode(_component_NuxtButton, {
                                        label: "Edit",
                                        icon: "lucide:file-edit",
                                        variant: "soft",
                                        size: "sm",
                                        onClick: ($event) => handleProfileSelect(profile.id ?? "")
                                      }, null, 8, ["onClick"]),
                                      profile.governmentId ? (openBlock(), createBlock("a", {
                                        key: 0,
                                        href: profile.governmentId ?? void 0,
                                        download: ""
                                      }, [
                                        createVNode(_component_NuxtButton, {
                                          label: "Download",
                                          icon: "lucide:download",
                                          color: "neutral",
                                          variant: "outline",
                                          size: "sm",
                                          class: "pointer-none"
                                        })
                                      ], 8, ["href"])) : createCommentVNode("", true)
                                    ])
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
                  }),
                  createVNode("div", null, [
                    createVNode(_component_NuxtSimplePaginator, {
                      page: unref(page),
                      "onUpdate:page": ($event) => isRef(page) ? page.value = $event : null,
                      rows: unref(limit),
                      "all-loaded": unref(allLoaded)
                    }, null, 8, ["page", "onUpdate:page", "rows", "all-loaded"])
                  ]),
                  unref(selectedProfile) ? (openBlock(), createBlock("div", { key: 0 }, [
                    createVNode(_component_AdminKycEditor, {
                      open: unref(open),
                      "onUpdate:open": ($event) => isRef(open) ? open.value = $event : null,
                      profile: unref(selectedProfile),
                      onDone: () => {
                        selectedProfile.value = null;
                        unref(refresh)();
                      }
                    }, null, 8, ["open", "onUpdate:open", "profile", "onDone"])
                  ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/kyc-data.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=kyc-data-Ba32ssaX.mjs.map
