import { _ as __nuxt_component_0 } from './my-page-CoHUY04l.mjs';
import { _ as _sfc_main$2 } from './ButtonGroup-CbRySP2Z.mjs';
import { c as _sfc_main$9, h as useToast, i as _sfc_main$4$1 } from './server.mjs';
import { _ as _sfc_main$3 } from './Input-DMpCMAbY.mjs';
import { _ as _sfc_main$4 } from './Select-nlK-7hat.mjs';
import { _ as __nuxt_component_5, a as __nuxt_component_6, b as __nuxt_component_7, c as __nuxt_component_8, d as __nuxt_component_9, e as __nuxt_component_10 } from './v-table-cell-DotqdMk0.mjs';
import { _ as _sfc_main$5 } from './Badge-De7_XYLl.mjs';
import { _ as __nuxt_component_12 } from './simple-paginator-BpbokSEJ.mjs';
import { _ as _sfc_main$6 } from './FormField-Bfbsx5sy.mjs';
import { _ as _sfc_main$7 } from './Separator-C2D_H5pj.mjs';
import { defineComponent, ref, computed, withAsyncContext, mergeProps, unref, withCtx, isRef, createVNode, createTextVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, createCommentVNode, mergeModels, useModel, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { a5 as normalizeException } from '../nitro/nitro.mjs';
import { u as useFetch } from './fetch-Bc0FIvxO.mjs';
import './fetch-error-alert-B3Gd_w4n.mjs';
import './Alert-CXdXSwrA.mjs';
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
import 'node:url';
import 'better-auth';
import 'better-auth/adapters/prisma';
import '@prisma/client/runtime/client';
import '@prisma/adapter-pg';
import 'better-auth/plugins';
import 'nodemailer';
import '@iconify/utils';
import 'consola';
import 'ipx';
import './_plugin-vue_export-helper-1tPrXgE0.mjs';
import '@vue/shared';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "business-profile-editor",
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
    const open = useModel(__props, "open");
    const approvalStatus = ref(
      __props.profile.approved ? "approved" : "not approved"
    );
    const approved = computed(
      () => approvalStatus.value === "approved" ? true : false
    );
    const handleProfileUpdate = async () => {
      try {
        const { message } = await $fetch(
          `/api/admin/business-profiles/${__props.profile.id}`,
          {
            method: "PUT",
            body: { approved: approved.value }
          }
        );
        emit("done");
        toast.add({
          color: "success",
          title: "Success",
          description: message
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
      const _component_NuxtFormField = _sfc_main$6;
      const _component_NuxtInput = _sfc_main$3;
      const _component_NuxtSeparator = _sfc_main$7;
      const _component_NuxtButton = _sfc_main$9;
      const _component_NuxtSelect = _sfc_main$4;
      _push(ssrRenderComponent(_component_NuxtModal, mergeProps({
        open: open.value,
        "onUpdate:open": ($event) => open.value = $event,
        title: "Edit Business Profile",
        dismissible: false
      }, _attrs), {
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}><div class="grid md:grid-cols-2 gap-2.5"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtFormField, { label: "Business name" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_NuxtInput, {
                    readonly: "",
                    value: _ctx.profile.financialAccountName,
                    class: "w-full"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_NuxtInput, {
                      readonly: "",
                      value: _ctx.profile.financialAccountName,
                      class: "w-full"
                    }, null, 8, ["value"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_NuxtFormField, { label: "Business Created On" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_NuxtInput, {
                    readonly: "",
                    value: `${_ctx.profile.creationMonth}, ${_ctx.profile.creationYear}`,
                    class: "w-full"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_NuxtInput, {
                      readonly: "",
                      value: `${_ctx.profile.creationMonth}, ${_ctx.profile.creationYear}`,
                      class: "w-full"
                    }, null, 8, ["value"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_NuxtFormField, {
              label: "Address",
              class: "md:col-span-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_NuxtInput, {
                    readonly: "",
                    value: _ctx.profile.address,
                    class: "w-full"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_NuxtInput, {
                      readonly: "",
                      value: _ctx.profile.address,
                      class: "w-full"
                    }, null, 8, ["value"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_component_NuxtSeparator, { class: "my-5" }, null, _parent2, _scopeId));
            _push2(`<div${_scopeId}><p class="font-semibold text-sm"${_scopeId}>Documents</p><div class="mt-2.5 grid gap-2.5 md:grid-cols-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtFormField, { label: "Business Certificate" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (_ctx.profile.certificate) {
                    _push3(`<a${ssrRenderAttr("href", _ctx.profile.certificate)} download${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_NuxtButton, {
                      label: "Download",
                      "trailing-icon": "lucide:download",
                      color: "neutral",
                      variant: "subtle",
                      block: "",
                      class: "pointer-none"
                    }, null, _parent3, _scopeId2));
                    _push3(`</a>`);
                  } else {
                    _push3(`<p class="text-error-500"${_scopeId2}>Not submitted</p>`);
                  }
                } else {
                  return [
                    _ctx.profile.certificate ? (openBlock(), createBlock("a", {
                      key: 0,
                      href: _ctx.profile.certificate,
                      download: ""
                    }, [
                      createVNode(_component_NuxtButton, {
                        label: "Download",
                        "trailing-icon": "lucide:download",
                        color: "neutral",
                        variant: "subtle",
                        block: "",
                        class: "pointer-none"
                      })
                    ], 8, ["href"])) : (openBlock(), createBlock("p", {
                      key: 1,
                      class: "text-error-500"
                    }, "Not submitted"))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_NuxtFormField, { label: "Proof of Address" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (_ctx.profile.proofOfAddress) {
                    _push3(`<a${ssrRenderAttr("href", _ctx.profile.proofOfAddress)} download${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_NuxtButton, {
                      label: "Download",
                      "trailing-icon": "lucide:download",
                      color: "neutral",
                      variant: "subtle",
                      block: "",
                      class: "pointer-none"
                    }, null, _parent3, _scopeId2));
                    _push3(`</a>`);
                  } else {
                    _push3(`<p class="text-error-500"${_scopeId2}>Not submitted</p>`);
                  }
                } else {
                  return [
                    _ctx.profile.proofOfAddress ? (openBlock(), createBlock("a", {
                      key: 0,
                      href: _ctx.profile.proofOfAddress,
                      download: ""
                    }, [
                      createVNode(_component_NuxtButton, {
                        label: "Download",
                        "trailing-icon": "lucide:download",
                        color: "neutral",
                        variant: "subtle",
                        block: "",
                        class: "pointer-none"
                      })
                    ], 8, ["href"])) : (openBlock(), createBlock("p", {
                      key: 1,
                      class: "text-error-500"
                    }, "Not submitted"))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
            _push2(ssrRenderComponent(_component_NuxtSeparator, { class: "my-5" }, null, _parent2, _scopeId));
            _push2(`<div${_scopeId}><p class="font-semibold text-sm"${_scopeId}>Business Aproval</p><div class="mt-2.5 grid gap-2.5"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtFormField, { label: "Approve Business Profile" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_NuxtSelect, {
                    modelValue: unref(approvalStatus),
                    "onUpdate:modelValue": ($event) => isRef(approvalStatus) ? approvalStatus.value = $event : null,
                    items: ["approved", "not approved"],
                    class: "w-full"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_NuxtSelect, {
                      modelValue: unref(approvalStatus),
                      "onUpdate:modelValue": ($event) => isRef(approvalStatus) ? approvalStatus.value = $event : null,
                      items: ["approved", "not approved"],
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="flex items-center gap-2 justify-end"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtButton, {
              label: "Cancel",
              color: "neutral",
              variant: "soft",
              onClick: ($event) => open.value = false
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_NuxtButton, {
              label: "Submit",
              disabled: unref(approved) === _ctx.profile.approved,
              "loading-auto": "",
              onClick: handleProfileUpdate
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div></div>`);
          } else {
            return [
              createVNode("div", null, [
                createVNode("div", { class: "grid md:grid-cols-2 gap-2.5" }, [
                  createVNode(_component_NuxtFormField, { label: "Business name" }, {
                    default: withCtx(() => [
                      createVNode(_component_NuxtInput, {
                        readonly: "",
                        value: _ctx.profile.financialAccountName,
                        class: "w-full"
                      }, null, 8, ["value"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_NuxtFormField, { label: "Business Created On" }, {
                    default: withCtx(() => [
                      createVNode(_component_NuxtInput, {
                        readonly: "",
                        value: `${_ctx.profile.creationMonth}, ${_ctx.profile.creationYear}`,
                        class: "w-full"
                      }, null, 8, ["value"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_NuxtFormField, {
                    label: "Address",
                    class: "md:col-span-2"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_NuxtInput, {
                        readonly: "",
                        value: _ctx.profile.address,
                        class: "w-full"
                      }, null, 8, ["value"])
                    ]),
                    _: 1
                  })
                ]),
                createVNode(_component_NuxtSeparator, { class: "my-5" }),
                createVNode("div", null, [
                  createVNode("p", { class: "font-semibold text-sm" }, "Documents"),
                  createVNode("div", { class: "mt-2.5 grid gap-2.5 md:grid-cols-2" }, [
                    createVNode(_component_NuxtFormField, { label: "Business Certificate" }, {
                      default: withCtx(() => [
                        _ctx.profile.certificate ? (openBlock(), createBlock("a", {
                          key: 0,
                          href: _ctx.profile.certificate,
                          download: ""
                        }, [
                          createVNode(_component_NuxtButton, {
                            label: "Download",
                            "trailing-icon": "lucide:download",
                            color: "neutral",
                            variant: "subtle",
                            block: "",
                            class: "pointer-none"
                          })
                        ], 8, ["href"])) : (openBlock(), createBlock("p", {
                          key: 1,
                          class: "text-error-500"
                        }, "Not submitted"))
                      ]),
                      _: 1
                    }),
                    createVNode(_component_NuxtFormField, { label: "Proof of Address" }, {
                      default: withCtx(() => [
                        _ctx.profile.proofOfAddress ? (openBlock(), createBlock("a", {
                          key: 0,
                          href: _ctx.profile.proofOfAddress,
                          download: ""
                        }, [
                          createVNode(_component_NuxtButton, {
                            label: "Download",
                            "trailing-icon": "lucide:download",
                            color: "neutral",
                            variant: "subtle",
                            block: "",
                            class: "pointer-none"
                          })
                        ], 8, ["href"])) : (openBlock(), createBlock("p", {
                          key: 1,
                          class: "text-error-500"
                        }, "Not submitted"))
                      ]),
                      _: 1
                    })
                  ])
                ]),
                createVNode(_component_NuxtSeparator, { class: "my-5" }),
                createVNode("div", null, [
                  createVNode("p", { class: "font-semibold text-sm" }, "Business Aproval"),
                  createVNode("div", { class: "mt-2.5 grid gap-2.5" }, [
                    createVNode(_component_NuxtFormField, { label: "Approve Business Profile" }, {
                      default: withCtx(() => [
                        createVNode(_component_NuxtSelect, {
                          modelValue: unref(approvalStatus),
                          "onUpdate:modelValue": ($event) => isRef(approvalStatus) ? approvalStatus.value = $event : null,
                          items: ["approved", "not approved"],
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "flex items-center gap-2 justify-end" }, [
                      createVNode(_component_NuxtButton, {
                        label: "Cancel",
                        color: "neutral",
                        variant: "soft",
                        onClick: ($event) => open.value = false
                      }, null, 8, ["onClick"]),
                      createVNode(_component_NuxtButton, {
                        label: "Submit",
                        disabled: unref(approved) === _ctx.profile.approved,
                        "loading-auto": "",
                        onClick: handleProfileUpdate
                      }, null, 8, ["disabled"])
                    ])
                  ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/business-profile-editor.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_13 = Object.assign(_sfc_main$1, { __name: "AdminBusinessProfileEditor" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "business-profiles",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const page = ref(0);
    const limit = ref(20);
    const search = ref();
    const approvalFilter = ref("not approved");
    const query = computed(() => {
      const searchParams = new URLSearchParams();
      searchParams.set("page", page.value.toString());
      searchParams.set("limit", limit.value.toString());
      if (search.value) {
        searchParams.set("search", search.value.toLowerCase());
      }
      if (approvalFilter.value !== "all") {
        searchParams.set(
          "approved",
          approvalFilter.value === "approved" ? "true" : ""
        );
      }
      return Object.fromEntries(searchParams.entries());
    });
    const {
      data: profiles,
      error,
      refresh
    } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/admin/business-profiles", { query }, "$9yPXkwp8si")), __temp = await __temp, __restore(), __temp);
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
    const headers = [
      "#",
      "Business Name",
      "Approved",
      "Address",
      "Business Created",
      "Actions"
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MyPage = __nuxt_component_0;
      const _component_NuxtButtonGroup = _sfc_main$2;
      const _component_NuxtButton = _sfc_main$9;
      const _component_NuxtInput = _sfc_main$3;
      const _component_NuxtSelect = _sfc_main$4;
      const _component_VTable = __nuxt_component_5;
      const _component_VTableHeader = __nuxt_component_6;
      const _component_VTableRow = __nuxt_component_7;
      const _component_VTableHead = __nuxt_component_8;
      const _component_VTableBody = __nuxt_component_9;
      const _component_VTableCell = __nuxt_component_10;
      const _component_NuxtBadge = _sfc_main$5;
      const _component_NuxtSimplePaginator = __nuxt_component_12;
      const _component_AdminBusinessProfileEditor = __nuxt_component_13;
      _push(ssrRenderComponent(_component_MyPage, mergeProps({
        error: unref(error),
        onRefresh: () => unref(refresh)()
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<section class="space-y-10"${_scopeId}><div class="flex items-end justify-between gap-5 flex-wrap"${_scopeId}><h1 class="text-3xl font-semibold"${_scopeId}>Business Profiles</h1><div class="flex items-end gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtButtonGroup, null, {
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
            _push2(`<div class="flex flex-col items-end gap-1"${_scopeId}><p class="text-xs font-semibold"${_scopeId}>Approval status</p>`);
            _push2(ssrRenderComponent(_component_NuxtSelect, {
              modelValue: unref(approvalFilter),
              "onUpdate:modelValue": ($event) => isRef(approvalFilter) ? approvalFilter.value = $event : null,
              items: ["all", "approved", "not approved"],
              class: "w-36"
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div>`);
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
                                        _push6(`${ssrInterpolate(profile.financialAccountName)}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(profile.financialAccountName), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(_component_VTableCell, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent(_component_NuxtBadge, {
                                          label: profile.approved ? "Yes" : "No",
                                          color: profile.approved ? "success" : "error",
                                          variant: "subtle"
                                        }, null, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          createVNode(_component_NuxtBadge, {
                                            label: profile.approved ? "Yes" : "No",
                                            color: profile.approved ? "success" : "error",
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
                                        _push6(`${ssrInterpolate(profile.address)}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(profile.address), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(_component_VTableCell, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(`${profile.creationMonth}, ${profile.creationYear}`)}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(`${profile.creationMonth}, ${profile.creationYear}`), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(_component_VTableCell, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent(_component_NuxtButton, {
                                          label: "More",
                                          icon: "lucide:ellipsis-vertical",
                                          color: "neutral",
                                          variant: "outline",
                                          size: "sm",
                                          onClick: ($event) => handleProfileSelect(profile.id ?? "")
                                        }, null, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          createVNode(_component_NuxtButton, {
                                            label: "More",
                                            icon: "lucide:ellipsis-vertical",
                                            color: "neutral",
                                            variant: "outline",
                                            size: "sm",
                                            onClick: ($event) => handleProfileSelect(profile.id ?? "")
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
                                        createTextVNode(toDisplayString(index + 1 + unref(page) * unref(limit)), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_VTableCell, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(profile.financialAccountName), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_VTableCell, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_NuxtBadge, {
                                          label: profile.approved ? "Yes" : "No",
                                          color: profile.approved ? "success" : "error",
                                          variant: "subtle"
                                        }, null, 8, ["label", "color"])
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_VTableCell, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(profile.address), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_VTableCell, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(`${profile.creationMonth}, ${profile.creationYear}`), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_VTableCell, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_NuxtButton, {
                                          label: "More",
                                          icon: "lucide:ellipsis-vertical",
                                          color: "neutral",
                                          variant: "outline",
                                          size: "sm",
                                          onClick: ($event) => handleProfileSelect(profile.id ?? "")
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
                                      createTextVNode(toDisplayString(profile.financialAccountName), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_VTableCell, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_NuxtBadge, {
                                        label: profile.approved ? "Yes" : "No",
                                        color: profile.approved ? "success" : "error",
                                        variant: "subtle"
                                      }, null, 8, ["label", "color"])
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_VTableCell, null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(profile.address), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_VTableCell, null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(`${profile.creationMonth}, ${profile.creationYear}`), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_VTableCell, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_NuxtButton, {
                                        label: "More",
                                        icon: "lucide:ellipsis-vertical",
                                        color: "neutral",
                                        variant: "outline",
                                        size: "sm",
                                        onClick: ($event) => handleProfileSelect(profile.id ?? "")
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
                                    createTextVNode(toDisplayString(profile.financialAccountName), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_NuxtBadge, {
                                      label: profile.approved ? "Yes" : "No",
                                      color: profile.approved ? "success" : "error",
                                      variant: "subtle"
                                    }, null, 8, ["label", "color"])
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(profile.address), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(`${profile.creationMonth}, ${profile.creationYear}`), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_NuxtButton, {
                                      label: "More",
                                      icon: "lucide:ellipsis-vertical",
                                      color: "neutral",
                                      variant: "outline",
                                      size: "sm",
                                      onClick: ($event) => handleProfileSelect(profile.id ?? "")
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
              _push2(`<div class="mt-2 border-t border-t-default"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_NuxtSimplePaginator, {
                page: unref(page),
                "onUpdate:page": ($event) => isRef(page) ? page.value = $event : null,
                rows: unref(limit),
                "all-loaded": unref(allLoaded)
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
              if (unref(selectedProfile)) {
                _push2(`<div${_scopeId}>`);
                _push2(ssrRenderComponent(_component_AdminBusinessProfileEditor, {
                  open: unref(open),
                  "onUpdate:open": ($event) => isRef(open) ? open.value = $event : null,
                  profile: unref(selectedProfile),
                  onDone: () => {
                    unref(refresh)();
                    selectedProfile.value = null;
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
                  createVNode("h1", { class: "text-3xl font-semibold" }, "Business Profiles"),
                  createVNode("div", { class: "flex items-end gap-2" }, [
                    createVNode(_component_NuxtButtonGroup, null, {
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
                    createVNode("div", { class: "flex flex-col items-end gap-1" }, [
                      createVNode("p", { class: "text-xs font-semibold" }, "Approval status"),
                      createVNode(_component_NuxtSelect, {
                        modelValue: unref(approvalFilter),
                        "onUpdate:modelValue": ($event) => isRef(approvalFilter) ? approvalFilter.value = $event : null,
                        items: ["all", "approved", "not approved"],
                        class: "w-36"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ])
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
                                    createTextVNode(toDisplayString(profile.financialAccountName), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_NuxtBadge, {
                                      label: profile.approved ? "Yes" : "No",
                                      color: profile.approved ? "success" : "error",
                                      variant: "subtle"
                                    }, null, 8, ["label", "color"])
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(profile.address), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(`${profile.creationMonth}, ${profile.creationYear}`), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_NuxtButton, {
                                      label: "More",
                                      icon: "lucide:ellipsis-vertical",
                                      color: "neutral",
                                      variant: "outline",
                                      size: "sm",
                                      onClick: ($event) => handleProfileSelect(profile.id ?? "")
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
                  }),
                  createVNode("div", { class: "mt-2 border-t border-t-default" }, [
                    createVNode(_component_NuxtSimplePaginator, {
                      page: unref(page),
                      "onUpdate:page": ($event) => isRef(page) ? page.value = $event : null,
                      rows: unref(limit),
                      "all-loaded": unref(allLoaded)
                    }, null, 8, ["page", "onUpdate:page", "rows", "all-loaded"])
                  ]),
                  unref(selectedProfile) ? (openBlock(), createBlock("div", { key: 0 }, [
                    createVNode(_component_AdminBusinessProfileEditor, {
                      open: unref(open),
                      "onUpdate:open": ($event) => isRef(open) ? open.value = $event : null,
                      profile: unref(selectedProfile),
                      onDone: () => {
                        unref(refresh)();
                        selectedProfile.value = null;
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/business-profiles.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=business-profiles-1yhCQkyf.mjs.map
