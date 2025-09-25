import { _ as __nuxt_component_0 } from './my-page-Dw4zNgfd.mjs';
import { _ as _sfc_main$2 } from './ButtonGroup-T7Qtmuf5.mjs';
import { k as useConfirm, h as useToast, c as _sfc_main$9, i as _sfc_main$4 } from './server.mjs';
import { _ as _sfc_main$3 } from './Input-B1DxjQAN.mjs';
import { _ as _sfc_main$5 } from './Form-DdXRn9kz.mjs';
import { _ as _sfc_main$6 } from './FormField-Bf2-6ur1.mjs';
import { defineComponent, ref, computed, withAsyncContext, mergeProps, unref, withCtx, isRef, createVNode, createTextVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, createCommentVNode, mergeModels, useModel, watch, withModifiers, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { f as financialAccountSchema } from '../_/financial-accounts.mjs';
import { a6 as normalizeException } from '../nitro/nitro.mjs';
import { r as round } from '../_/round.mjs';
import { _ as __nuxt_component_5, a as __nuxt_component_6, b as __nuxt_component_7, c as __nuxt_component_8, d as __nuxt_component_9, e as __nuxt_component_10 } from './v-table-cell-CQh1yRdh.mjs';
import { _ as __nuxt_component_11 } from './simple-paginator-CUjeetHH.mjs';
import { t as toDollar } from './to-dollar-DdS_9tlH.mjs';
import { useDateFormat } from '@vueuse/core';
import { u as useFetch } from './fetch-C-iVS2Yi.mjs';
import './fetch-error-alert-CvQmwViY.mjs';
import './Alert-CE1HvRCd.mjs';
import 'reka-ui';
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
import 'fs';
import 'winston';
import 'node:url';
import '@prisma/client/runtime/client';
import '@prisma/adapter-pg';
import 'nodemailer';
import 'better-auth';
import 'better-auth/adapters/prisma';
import 'better-auth/plugins';
import '@iconify/utils';
import 'consola';
import 'ipx';
import 'zod';
import './_plugin-vue_export-helper-1tPrXgE0.mjs';
import '@vue/shared';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "financial-account-editor",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    account: {}
  }, {
    "open": { type: Boolean, ...{ default: false } },
    "openModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["done"], ["update:open"]),
  setup(__props, { emit: __emit }) {
    const toast = useToast();
    const open = useModel(__props, "open");
    const emit = __emit;
    const state = ref({ ...__props.account });
    watch(
      () => __props.account,
      (newValue) => {
        state.value = { ...newValue };
      }
    );
    const handleSubmit = async (event) => {
      const { data } = event;
      try {
        const { message } = await $fetch(
          `/api/admin/financial-accounts/${__props.account.id}`,
          {
            method: "PUT",
            body: {
              name: data.name,
              balance: round(data.balance, 2)
            }
          }
        );
        emit("done");
        open.value = false;
        toast.add({
          color: "success",
          title: "Success",
          description: message
        });
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
      const _component_NuxtForm = _sfc_main$5;
      const _component_NuxtFormField = _sfc_main$6;
      const _component_NuxtInput = _sfc_main$3;
      const _component_NuxtButton = _sfc_main$9;
      _push(ssrRenderComponent(_component_NuxtModal, mergeProps({
        open: open.value,
        "onUpdate:open": ($event) => open.value = $event,
        title: "Edit Financial Account",
        dismissible: false
      }, _attrs), {
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtForm, {
              state: unref(state),
              schema: unref(financialAccountSchema),
              onSubmit: handleSubmit
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="space-y-5"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_NuxtFormField, {
                    name: "name",
                    label: "Account Name",
                    required: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
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
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_NuxtFormField, {
                    name: "balance",
                    label: "Account Balance",
                    required: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_NuxtInput, {
                          modelValue: unref(state).balance,
                          "onUpdate:modelValue": ($event) => unref(state).balance = $event,
                          modelModifiers: { number: true },
                          orientation: "vertical",
                          class: "w-full"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_NuxtInput, {
                            modelValue: unref(state).balance,
                            "onUpdate:modelValue": ($event) => unref(state).balance = $event,
                            modelModifiers: { number: true },
                            orientation: "vertical",
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="flex items-center justify-end gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_NuxtButton, {
                    color: "neutral",
                    variant: "soft",
                    label: "Cancel",
                    onClick: ($event) => open.value = false
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_NuxtButton, {
                    type: "submit",
                    label: "Submit",
                    "loading-auto": ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "space-y-5" }, [
                      createVNode(_component_NuxtFormField, {
                        name: "name",
                        label: "Account Name",
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
                        name: "balance",
                        label: "Account Balance",
                        required: ""
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_NuxtInput, {
                            modelValue: unref(state).balance,
                            "onUpdate:modelValue": ($event) => unref(state).balance = $event,
                            modelModifiers: { number: true },
                            orientation: "vertical",
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "flex items-center justify-end gap-2" }, [
                        createVNode(_component_NuxtButton, {
                          color: "neutral",
                          variant: "soft",
                          label: "Cancel",
                          onClick: ($event) => open.value = false
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
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_NuxtForm, {
                state: unref(state),
                schema: unref(financialAccountSchema),
                onSubmit: withModifiers(handleSubmit, ["prevent"])
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "space-y-5" }, [
                    createVNode(_component_NuxtFormField, {
                      name: "name",
                      label: "Account Name",
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
                      name: "balance",
                      label: "Account Balance",
                      required: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_NuxtInput, {
                          modelValue: unref(state).balance,
                          "onUpdate:modelValue": ($event) => unref(state).balance = $event,
                          modelModifiers: { number: true },
                          orientation: "vertical",
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "flex items-center justify-end gap-2" }, [
                      createVNode(_component_NuxtButton, {
                        color: "neutral",
                        variant: "soft",
                        label: "Cancel",
                        onClick: ($event) => open.value = false
                      }, null, 8, ["onClick"]),
                      createVNode(_component_NuxtButton, {
                        type: "submit",
                        label: "Submit",
                        "loading-auto": ""
                      })
                    ])
                  ])
                ]),
                _: 1
              }, 8, ["state", "schema"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/financial-account-editor.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_4 = Object.assign(_sfc_main$1, { __name: "AdminFinancialAccountEditor" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "financial-accounts",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { confirmAsync } = useConfirm();
    const toast = useToast();
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
      data: accounts,
      error,
      refresh
    } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/admin/financial-accounts", { query }, "$TykdxnFRJh")), __temp = await __temp, __restore(), __temp);
    const allLoaded = computed(() => {
      return accounts.value ? accounts.value.length < limit.value : false;
    });
    const open = ref(false);
    const selected = ref(null);
    const headers = [
      "#",
      "Name",
      "Creator",
      "Email",
      "Status",
      "Type",
      "Ownership",
      "Account Balance",
      "Created",
      "Actions"
    ];
    const handleItemEdit = (id) => {
      selected.value = accounts.value?.find((acc) => acc.id === id) || null;
      if (!selected.value) {
        return;
      }
      open.value = true;
    };
    const deleteItem = async (id) => {
      const ask = await confirmAsync({
        title: "Delete Financial Account",
        description: "Are you sure you want to delete this financial account?",
        acceptProps: { color: "error", label: "Delete" }
      });
      if (!ask) {
        return;
      }
      try {
        const { message } = await $fetch(`/api/admin/financial-accounts/${id}`, {
          method: "DELETE"
        });
        toast.add({
          color: "success",
          title: "Success",
          description: message
        });
        refresh();
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
      const _component_NuxtButtonGroup = _sfc_main$2;
      const _component_NuxtButton = _sfc_main$9;
      const _component_NuxtInput = _sfc_main$3;
      const _component_AdminFinancialAccountEditor = __nuxt_component_4;
      const _component_VTable = __nuxt_component_5;
      const _component_VTableHeader = __nuxt_component_6;
      const _component_VTableRow = __nuxt_component_7;
      const _component_VTableHead = __nuxt_component_8;
      const _component_VTableBody = __nuxt_component_9;
      const _component_VTableCell = __nuxt_component_10;
      const _component_NuxtSimplePaginator = __nuxt_component_11;
      _push(ssrRenderComponent(_component_MyPage, mergeProps({
        error: unref(error),
        onRefresh: () => unref(refresh)()
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<section class="space-y-10"${_scopeId}><div class="flex items-end justify-between gap-5 flex-wrap"${_scopeId}><h1 class="text-3xl font-semibold"${_scopeId}>Financial Accounts</h1><div${_scopeId}>`);
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
            _push2(`</div></div>`);
            if (unref(accounts)) {
              _push2(`<div${_scopeId}>`);
              if (unref(selected)) {
                _push2(`<div${_scopeId}>`);
                _push2(ssrRenderComponent(_component_AdminFinancialAccountEditor, {
                  open: unref(open),
                  "onUpdate:open": ($event) => isRef(open) ? open.value = $event : null,
                  account: unref(selected),
                  onDone: () => unref(refresh)()
                }, null, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
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
                          ssrRenderList(unref(accounts), (account, index) => {
                            _push4(ssrRenderComponent(_component_VTableRow, {
                              key: account.id
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
                                        _push6(`${ssrInterpolate(account.name)}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(account.name), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(_component_VTableCell, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(account.creator.name)}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(account.creator.name), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(_component_VTableCell, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(account.creator.email)}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(account.creator.email), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(_component_VTableCell, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(account.status)}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(account.status), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(_component_VTableCell, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(account.type)}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(account.type), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(_component_VTableCell, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(account.ownership)}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(account.ownership), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(_component_VTableCell, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(account.balance))}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(account.balance)), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(_component_VTableCell, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(unref(useDateFormat)(account.createdAt, "YYYY-MMM-DD hh:mm aa"))}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(unref(useDateFormat)(account.createdAt, "YYYY-MMM-DD hh:mm aa")), 1)
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
                                          variant: "soft",
                                          size: "sm",
                                          onClick: ($event) => handleItemEdit(account.id)
                                        }, null, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(_component_NuxtButton, {
                                          label: "Delete",
                                          color: "error",
                                          variant: "soft",
                                          size: "sm",
                                          "loading-auto": "",
                                          onClick: ($event) => deleteItem(account.id)
                                        }, null, _parent6, _scopeId5));
                                        _push6(`</div>`);
                                      } else {
                                        return [
                                          createVNode("div", { class: "flex items-center gap-2" }, [
                                            createVNode(_component_NuxtButton, {
                                              label: "Edit",
                                              variant: "soft",
                                              size: "sm",
                                              onClick: ($event) => handleItemEdit(account.id)
                                            }, null, 8, ["onClick"]),
                                            createVNode(_component_NuxtButton, {
                                              label: "Delete",
                                              color: "error",
                                              variant: "soft",
                                              size: "sm",
                                              "loading-auto": "",
                                              onClick: ($event) => deleteItem(account.id)
                                            }, null, 8, ["onClick"])
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
                                        createTextVNode(toDisplayString(account.name), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_VTableCell, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(account.creator.name), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_VTableCell, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(account.creator.email), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_VTableCell, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(account.status), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_VTableCell, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(account.type), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_VTableCell, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(account.ownership), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_VTableCell, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(account.balance)), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_VTableCell, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(unref(useDateFormat)(account.createdAt, "YYYY-MMM-DD hh:mm aa")), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_VTableCell, null, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "flex items-center gap-2" }, [
                                          createVNode(_component_NuxtButton, {
                                            label: "Edit",
                                            variant: "soft",
                                            size: "sm",
                                            onClick: ($event) => handleItemEdit(account.id)
                                          }, null, 8, ["onClick"]),
                                          createVNode(_component_NuxtButton, {
                                            label: "Delete",
                                            color: "error",
                                            variant: "soft",
                                            size: "sm",
                                            "loading-auto": "",
                                            onClick: ($event) => deleteItem(account.id)
                                          }, null, 8, ["onClick"])
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
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(accounts), (account, index) => {
                              return openBlock(), createBlock(_component_VTableRow, {
                                key: account.id
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
                                      createTextVNode(toDisplayString(account.name), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_VTableCell, null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(account.creator.name), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_VTableCell, null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(account.creator.email), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_VTableCell, null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(account.status), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_VTableCell, null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(account.type), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_VTableCell, null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(account.ownership), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_VTableCell, null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(account.balance)), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_VTableCell, null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(unref(useDateFormat)(account.createdAt, "YYYY-MMM-DD hh:mm aa")), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_VTableCell, null, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "flex items-center gap-2" }, [
                                        createVNode(_component_NuxtButton, {
                                          label: "Edit",
                                          variant: "soft",
                                          size: "sm",
                                          onClick: ($event) => handleItemEdit(account.id)
                                        }, null, 8, ["onClick"]),
                                        createVNode(_component_NuxtButton, {
                                          label: "Delete",
                                          color: "error",
                                          variant: "soft",
                                          size: "sm",
                                          "loading-auto": "",
                                          onClick: ($event) => deleteItem(account.id)
                                        }, null, 8, ["onClick"])
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
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(accounts), (account, index) => {
                            return openBlock(), createBlock(_component_VTableRow, {
                              key: account.id
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
                                    createTextVNode(toDisplayString(account.name), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(account.creator.name), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(account.creator.email), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(account.status), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(account.type), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(account.ownership), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(account.balance)), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(unref(useDateFormat)(account.createdAt, "YYYY-MMM-DD hh:mm aa")), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "flex items-center gap-2" }, [
                                      createVNode(_component_NuxtButton, {
                                        label: "Edit",
                                        variant: "soft",
                                        size: "sm",
                                        onClick: ($event) => handleItemEdit(account.id)
                                      }, null, 8, ["onClick"]),
                                      createVNode(_component_NuxtButton, {
                                        label: "Delete",
                                        color: "error",
                                        variant: "soft",
                                        size: "sm",
                                        "loading-auto": "",
                                        onClick: ($event) => deleteItem(account.id)
                                      }, null, 8, ["onClick"])
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
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</section>`);
          } else {
            return [
              createVNode("section", { class: "space-y-10" }, [
                createVNode("div", { class: "flex items-end justify-between gap-5 flex-wrap" }, [
                  createVNode("h1", { class: "text-3xl font-semibold" }, "Financial Accounts"),
                  createVNode("div", null, [
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
                    })
                  ])
                ]),
                unref(accounts) ? (openBlock(), createBlock("div", { key: 0 }, [
                  unref(selected) ? (openBlock(), createBlock("div", { key: 0 }, [
                    createVNode(_component_AdminFinancialAccountEditor, {
                      open: unref(open),
                      "onUpdate:open": ($event) => isRef(open) ? open.value = $event : null,
                      account: unref(selected),
                      onDone: () => unref(refresh)()
                    }, null, 8, ["open", "onUpdate:open", "account", "onDone"])
                  ])) : createCommentVNode("", true),
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
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(accounts), (account, index) => {
                            return openBlock(), createBlock(_component_VTableRow, {
                              key: account.id
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
                                    createTextVNode(toDisplayString(account.name), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(account.creator.name), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(account.creator.email), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(account.status), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(account.type), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(account.ownership), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(account.balance)), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(unref(useDateFormat)(account.createdAt, "YYYY-MMM-DD hh:mm aa")), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_VTableCell, null, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "flex items-center gap-2" }, [
                                      createVNode(_component_NuxtButton, {
                                        label: "Edit",
                                        variant: "soft",
                                        size: "sm",
                                        onClick: ($event) => handleItemEdit(account.id)
                                      }, null, 8, ["onClick"]),
                                      createVNode(_component_NuxtButton, {
                                        label: "Delete",
                                        color: "error",
                                        variant: "soft",
                                        size: "sm",
                                        "loading-auto": "",
                                        onClick: ($event) => deleteItem(account.id)
                                      }, null, 8, ["onClick"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/financial-accounts.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=financial-accounts-CsbhBBdy.mjs.map
