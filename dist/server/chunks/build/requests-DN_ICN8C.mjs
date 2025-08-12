import { _ as __nuxt_component_0 } from './my-page-Cgd-8gXO.mjs';
import { _ as _sfc_main$2 } from './Card-HL6icAYQ.mjs';
import { c as _sfc_main$7, j as _sfc_main$a, i as useToast } from './server.mjs';
import { _ as _sfc_main$3 } from './Collapsible-P-6QItT2.mjs';
import { _ as _sfc_main$4 } from './Badge-q_8fq56_.mjs';
import { _ as __nuxt_component_6 } from './empty-icon-BnDpoaPH.mjs';
import { _ as _sfc_main$5 } from './Separator-C2D_H5pj.mjs';
import { _ as _sfc_main$6 } from './Modal-DefLStPx.mjs';
import { defineComponent, withAsyncContext, mergeProps, unref, withCtx, createVNode, createBlock, openBlock, Fragment, renderList, toDisplayString, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { a6 as normalizeException } from '../nitro/nitro.mjs';
import { u as useFetch } from './fetch-DztuJ_5C.mjs';
import { t as toCase } from './to-case-ChuH9uWD.mjs';
import { t as toDollar } from './to-dollar-DdS_9tlH.mjs';
import { useDateFormat } from '@vueuse/core';
import { u as useAuthStore } from './auth.store-VvkDhiyP.mjs';
import { u as useRouteData } from './use-route-data-1tNFDvd7.mjs';
import './fetch-error-alert-B3Gd_w4n.mjs';
import './Alert-CXdXSwrA.mjs';
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
import '@vue/shared';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "mod-request-status-updater",
  __ssrInlineRender: true,
  props: {
    status: {},
    accountId: {},
    modRequestId: {},
    approvalId: {},
    buttonLabel: { default: "Accept" },
    buttonColor: { default: "primary" },
    buttonVariant: { default: "solid" },
    buttonSize: { default: "sm" }
  },
  emits: ["done"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const toast = useToast();
    const { error, data, execute } = useFetch(
      `/api/user/financial-accounts/${__props.accountId}/mod-requests/${__props.modRequestId}`,
      {
        method: "put",
        immediate: false,
        query: {
          status: __props.status,
          approvalId: __props.approvalId
        }
      },
      "$8pU5T_Gm_R"
    );
    const update = async (close) => {
      await execute();
      if (data.value) {
        toast.add({
          color: "success",
          description: data.value.message
        });
        close();
        emit("done", true);
        return;
      }
      if (error.value) {
        toast.add({
          color: "error",
          description: normalizeException(error.value).message
        });
        emit("done", false);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtModal = _sfc_main$6;
      const _component_NuxtButton = _sfc_main$7;
      _push(ssrRenderComponent(_component_NuxtModal, mergeProps({
        title: _ctx.status === "accepted" ? "Accept request" : "Reject request",
        dismissible: false
      }, _attrs), {
        body: withCtx(({ close }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-4"${_scopeId}><p${_scopeId}>Are you sure you want to proceed? This action cannot be undone</p><div class="flex items-center justify-end gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtButton, {
              color: "neutral",
              variant: "soft",
              label: "Cancel",
              onClick: ($event) => close()
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_NuxtButton, {
              label: "Proceed",
              "loading-auto": "",
              onClick: ($event) => update(close)
            }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-4" }, [
                createVNode("p", null, "Are you sure you want to proceed? This action cannot be undone"),
                createVNode("div", { class: "flex items-center justify-end gap-2" }, [
                  createVNode(_component_NuxtButton, {
                    color: "neutral",
                    variant: "soft",
                    label: "Cancel",
                    onClick: ($event) => close()
                  }, null, 8, ["onClick"]),
                  createVNode(_component_NuxtButton, {
                    label: "Proceed",
                    "loading-auto": "",
                    onClick: ($event) => update(close)
                  }, null, 8, ["onClick"])
                ])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtButton, {
              size: _ctx.buttonSize,
              color: _ctx.buttonColor,
              variant: _ctx.buttonVariant,
              label: _ctx.buttonLabel
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_NuxtButton, {
                size: _ctx.buttonSize,
                color: _ctx.buttonColor,
                variant: _ctx.buttonVariant,
                label: _ctx.buttonLabel
              }, null, 8, ["size", "color", "variant", "label"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/user/mod-request-status-updater.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_8 = Object.assign(_sfc_main$1, { __name: "UserModRequestStatusUpdater" });
function getModRequestStatusColor(status) {
  if (status === "pending") return "primary";
  else if (status === "accepted") return "success";
  else return "error";
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "requests",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const accountId = useRouteData().getParams("accountId");
    const { data, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `/api/user/financial-accounts/${accountId}/mod-requests`,
      { key: "account-mod-requests" },
      "$EyT6jpiZcO"
    )), __temp = await __temp, __restore(), __temp);
    const store = useAuthStore();
    function ownApproval(request) {
      const approval = request.approvals.find(
        (approval2) => approval2.approver.id === store.user.value?.id
      );
      return approval;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MyPage = __nuxt_component_0;
      const _component_NuxtCard = _sfc_main$2;
      const _component_NuxtAvatar = _sfc_main$a;
      const _component_NuxtCollapsible = _sfc_main$3;
      const _component_NuxtButton = _sfc_main$7;
      const _component_NuxtBadge = _sfc_main$4;
      const _component_EmptyIcon = __nuxt_component_6;
      const _component_NuxtSeparator = _sfc_main$5;
      const _component_UserModRequestStatusUpdater = __nuxt_component_8;
      _push(ssrRenderComponent(_component_MyPage, mergeProps({
        error: unref(error),
        onRefres: ($event) => unref(refresh)()
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(data)) {
              _push2(`<div class="mb-4 lg:grid lg:grid-cols-2 lg:gap-4"${_scopeId}><div class="space-y-2"${_scopeId}><p class="card-title"${_scopeId}>Your Requests</p>`);
              if (unref(data).ownRequests.length) {
                _push2(`<div class="space-y-4"${_scopeId}><!--[-->`);
                ssrRenderList(unref(data).ownRequests, (request) => {
                  _push2(ssrRenderComponent(_component_NuxtCard, {
                    key: request.id
                  }, {
                    header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`<div class="flex items-center gap-2"${_scopeId2}>`);
                        _push3(ssrRenderComponent(_component_NuxtAvatar, {
                          alt: request.creator.name,
                          src: request.creator.image ?? void 0
                        }, null, _parent3, _scopeId2));
                        _push3(`<p class="text-sm text-muted"${_scopeId2}>${ssrInterpolate(request.description ?? `${request.creator.name} initiated a ${("toCase" in _ctx ? _ctx.toCase : unref(toCase))(
                          request.type,
                          "lower"
                        )} request ${request.transaction ? `of ${("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(request.transaction.USDAmount)}` : ""}`)}</p></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            createVNode(_component_NuxtAvatar, {
                              alt: request.creator.name,
                              src: request.creator.image ?? void 0
                            }, null, 8, ["alt", "src"]),
                            createVNode("p", { class: "text-sm text-muted" }, toDisplayString(request.description ?? `${request.creator.name} initiated a ${("toCase" in _ctx ? _ctx.toCase : unref(toCase))(
                              request.type,
                              "lower"
                            )} request ${request.transaction ? `of ${("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(request.transaction.USDAmount)}` : ""}`), 1)
                          ])
                        ];
                      }
                    }),
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`<div${_scopeId2}><div${_scopeId2}>`);
                        _push3(ssrRenderComponent(_component_NuxtCollapsible, { class: "flex flex-col gap-2" }, {
                          content: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(`<div class="mt-2 ml-2 space-y-2"${_scopeId3}><!--[-->`);
                              ssrRenderList(request.approvals, (approval) => {
                                _push4(`<div${_scopeId3}><div class="flex items-center gap-3"${_scopeId3}>`);
                                _push4(ssrRenderComponent(_component_NuxtAvatar, {
                                  alt: approval.approver.name,
                                  src: approval.approver.image ?? void 0
                                }, null, _parent4, _scopeId3));
                                _push4(`<p class="text-sm"${_scopeId3}>${ssrInterpolate(approval.approver.name)}</p>`);
                                _push4(ssrRenderComponent(_component_NuxtBadge, {
                                  color: ("getModRequestStatusColor" in _ctx ? _ctx.getModRequestStatusColor : unref(getModRequestStatusColor))(approval.status),
                                  label: approval.status,
                                  size: "sm",
                                  variant: "subtle"
                                }, null, _parent4, _scopeId3));
                                _push4(`</div></div>`);
                              });
                              _push4(`<!--]--></div>`);
                            } else {
                              return [
                                createVNode("div", { class: "mt-2 ml-2 space-y-2" }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(request.approvals, (approval) => {
                                    return openBlock(), createBlock("div", {
                                      key: approval.id
                                    }, [
                                      createVNode("div", { class: "flex items-center gap-3" }, [
                                        createVNode(_component_NuxtAvatar, {
                                          alt: approval.approver.name,
                                          src: approval.approver.image ?? void 0
                                        }, null, 8, ["alt", "src"]),
                                        createVNode("p", { class: "text-sm" }, toDisplayString(approval.approver.name), 1),
                                        createVNode(_component_NuxtBadge, {
                                          color: ("getModRequestStatusColor" in _ctx ? _ctx.getModRequestStatusColor : unref(getModRequestStatusColor))(approval.status),
                                          label: approval.status,
                                          size: "sm",
                                          variant: "subtle"
                                        }, null, 8, ["color", "label"])
                                      ])
                                    ]);
                                  }), 128))
                                ])
                              ];
                            }
                          }),
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(ssrRenderComponent(_component_NuxtButton, {
                                label: "Approval Status",
                                color: "neutral",
                                variant: "soft",
                                "trailing-icon": "i-lucide-chevron-down",
                                block: ""
                              }, null, _parent4, _scopeId3));
                            } else {
                              return [
                                createVNode(_component_NuxtButton, {
                                  label: "Approval Status",
                                  color: "neutral",
                                  variant: "soft",
                                  "trailing-icon": "i-lucide-chevron-down",
                                  block: ""
                                })
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                        _push3(`</div><div class="mt-4 flex justify-end"${_scopeId2}><p class="text-xs"${_scopeId2}>${ssrInterpolate(unref(useDateFormat)(request.createdAt, "MMM DD, YYYY | hh:mm aa"))}</p></div></div>`);
                      } else {
                        return [
                          createVNode("div", null, [
                            createVNode("div", null, [
                              createVNode(_component_NuxtCollapsible, { class: "flex flex-col gap-2" }, {
                                content: withCtx(() => [
                                  createVNode("div", { class: "mt-2 ml-2 space-y-2" }, [
                                    (openBlock(true), createBlock(Fragment, null, renderList(request.approvals, (approval) => {
                                      return openBlock(), createBlock("div", {
                                        key: approval.id
                                      }, [
                                        createVNode("div", { class: "flex items-center gap-3" }, [
                                          createVNode(_component_NuxtAvatar, {
                                            alt: approval.approver.name,
                                            src: approval.approver.image ?? void 0
                                          }, null, 8, ["alt", "src"]),
                                          createVNode("p", { class: "text-sm" }, toDisplayString(approval.approver.name), 1),
                                          createVNode(_component_NuxtBadge, {
                                            color: ("getModRequestStatusColor" in _ctx ? _ctx.getModRequestStatusColor : unref(getModRequestStatusColor))(approval.status),
                                            label: approval.status,
                                            size: "sm",
                                            variant: "subtle"
                                          }, null, 8, ["color", "label"])
                                        ])
                                      ]);
                                    }), 128))
                                  ])
                                ]),
                                default: withCtx(() => [
                                  createVNode(_component_NuxtButton, {
                                    label: "Approval Status",
                                    color: "neutral",
                                    variant: "soft",
                                    "trailing-icon": "i-lucide-chevron-down",
                                    block: ""
                                  })
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            createVNode("div", { class: "mt-4 flex justify-end" }, [
                              createVNode("p", { class: "text-xs" }, toDisplayString(unref(useDateFormat)(request.createdAt, "MMM DD, YYYY | hh:mm aa")), 1)
                            ])
                          ])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<div${_scopeId}>`);
                _push2(ssrRenderComponent(_component_EmptyIcon, {
                  label: "No requests",
                  size: "4rem"
                }, null, _parent2, _scopeId));
                _push2(`</div>`);
              }
              _push2(`</div>`);
              _push2(ssrRenderComponent(_component_NuxtSeparator, { class: "lg:hidden my-8" }, null, _parent2, _scopeId));
              _push2(`<div class="space-y-2"${_scopeId}><p class="card-title"${_scopeId}>Other Requests</p>`);
              if (unref(data).otherRequests.length) {
                _push2(`<div class="space-y-4"${_scopeId}><!--[-->`);
                ssrRenderList(unref(data).otherRequests, (request) => {
                  _push2(ssrRenderComponent(_component_NuxtCard, {
                    key: request.id
                  }, {
                    header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`<div class="flex items-center gap-2"${_scopeId2}>`);
                        _push3(ssrRenderComponent(_component_NuxtAvatar, {
                          alt: request.creator.name,
                          src: request.creator.image ?? void 0
                        }, null, _parent3, _scopeId2));
                        _push3(`<p class="text-sm text-muted"${_scopeId2}>${ssrInterpolate(request.description ?? `${request.creator.name} initiated a ${("toCase" in _ctx ? _ctx.toCase : unref(toCase))(
                          request.type,
                          "lower"
                        )} request ${request.transaction ? `of ${("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(request.transaction.USDAmount)}` : ""}`)}</p></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            createVNode(_component_NuxtAvatar, {
                              alt: request.creator.name,
                              src: request.creator.image ?? void 0
                            }, null, 8, ["alt", "src"]),
                            createVNode("p", { class: "text-sm text-muted" }, toDisplayString(request.description ?? `${request.creator.name} initiated a ${("toCase" in _ctx ? _ctx.toCase : unref(toCase))(
                              request.type,
                              "lower"
                            )} request ${request.transaction ? `of ${("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(request.transaction.USDAmount)}` : ""}`), 1)
                          ])
                        ];
                      }
                    }),
                    footer: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`<div class="flex justify-between"${_scopeId2}><p class="text-xs"${_scopeId2}>${ssrInterpolate(unref(useDateFormat)(request.createdAt, "MMM DD, YYYY | hh:mm aa"))}</p>`);
                        if (ownApproval(request) && ownApproval(request)?.status === "pending") {
                          _push3(`<div class="flex items-center gap-2"${_scopeId2}>`);
                          _push3(ssrRenderComponent(_component_UserModRequestStatusUpdater, {
                            "approval-id": ownApproval(request).id,
                            "mod-request-id": request.id,
                            "account-id": unref(accountId),
                            status: "accepted",
                            "button-size": "sm",
                            "button-label": "Accept",
                            onDone: (success) => success && unref(refresh)()
                          }, null, _parent3, _scopeId2));
                          _push3(ssrRenderComponent(_component_UserModRequestStatusUpdater, {
                            "approval-id": ownApproval(request).id,
                            "mod-request-id": request.id,
                            "account-id": unref(accountId),
                            status: "rejected",
                            "button-size": "sm",
                            "button-label": "Reject",
                            "button-color": "error",
                            "button-variant": "subtle",
                            onDone: (success) => success && unref(refresh)()
                          }, null, _parent3, _scopeId2));
                          _push3(`</div>`);
                        } else {
                          _push3(`<!---->`);
                        }
                        _push3(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex justify-between" }, [
                            createVNode("p", { class: "text-xs" }, toDisplayString(unref(useDateFormat)(request.createdAt, "MMM DD, YYYY | hh:mm aa")), 1),
                            ownApproval(request) && ownApproval(request)?.status === "pending" ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "flex items-center gap-2"
                            }, [
                              createVNode(_component_UserModRequestStatusUpdater, {
                                "approval-id": ownApproval(request).id,
                                "mod-request-id": request.id,
                                "account-id": unref(accountId),
                                status: "accepted",
                                "button-size": "sm",
                                "button-label": "Accept",
                                onDone: (success) => success && unref(refresh)()
                              }, null, 8, ["approval-id", "mod-request-id", "account-id", "onDone"]),
                              createVNode(_component_UserModRequestStatusUpdater, {
                                "approval-id": ownApproval(request).id,
                                "mod-request-id": request.id,
                                "account-id": unref(accountId),
                                status: "rejected",
                                "button-size": "sm",
                                "button-label": "Reject",
                                "button-color": "error",
                                "button-variant": "subtle",
                                onDone: (success) => success && unref(refresh)()
                              }, null, 8, ["approval-id", "mod-request-id", "account-id", "onDone"])
                            ])) : createCommentVNode("", true)
                          ])
                        ];
                      }
                    }),
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`<div${_scopeId2}><div${_scopeId2}>`);
                        _push3(ssrRenderComponent(_component_NuxtCollapsible, { class: "flex flex-col gap-2" }, {
                          content: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(`<div class="mt-2 ml-2 space-y-2"${_scopeId3}><!--[-->`);
                              ssrRenderList(request.approvals, (approval) => {
                                _push4(`<div${_scopeId3}><div class="flex items-center gap-3"${_scopeId3}>`);
                                _push4(ssrRenderComponent(_component_NuxtAvatar, {
                                  alt: approval.approver.name,
                                  src: approval.approver.image ?? void 0
                                }, null, _parent4, _scopeId3));
                                _push4(`<p class="text-sm"${_scopeId3}>${ssrInterpolate(approval.approver.name)}</p>`);
                                _push4(ssrRenderComponent(_component_NuxtBadge, {
                                  color: ("getModRequestStatusColor" in _ctx ? _ctx.getModRequestStatusColor : unref(getModRequestStatusColor))(approval.status),
                                  label: approval.status,
                                  size: "sm",
                                  variant: "subtle"
                                }, null, _parent4, _scopeId3));
                                _push4(`</div></div>`);
                              });
                              _push4(`<!--]--></div>`);
                            } else {
                              return [
                                createVNode("div", { class: "mt-2 ml-2 space-y-2" }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(request.approvals, (approval) => {
                                    return openBlock(), createBlock("div", {
                                      key: approval.id
                                    }, [
                                      createVNode("div", { class: "flex items-center gap-3" }, [
                                        createVNode(_component_NuxtAvatar, {
                                          alt: approval.approver.name,
                                          src: approval.approver.image ?? void 0
                                        }, null, 8, ["alt", "src"]),
                                        createVNode("p", { class: "text-sm" }, toDisplayString(approval.approver.name), 1),
                                        createVNode(_component_NuxtBadge, {
                                          color: ("getModRequestStatusColor" in _ctx ? _ctx.getModRequestStatusColor : unref(getModRequestStatusColor))(approval.status),
                                          label: approval.status,
                                          size: "sm",
                                          variant: "subtle"
                                        }, null, 8, ["color", "label"])
                                      ])
                                    ]);
                                  }), 128))
                                ])
                              ];
                            }
                          }),
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(ssrRenderComponent(_component_NuxtButton, {
                                label: "Approval Status",
                                color: "neutral",
                                variant: "soft",
                                "trailing-icon": "i-lucide-chevron-down",
                                block: ""
                              }, null, _parent4, _scopeId3));
                            } else {
                              return [
                                createVNode(_component_NuxtButton, {
                                  label: "Approval Status",
                                  color: "neutral",
                                  variant: "soft",
                                  "trailing-icon": "i-lucide-chevron-down",
                                  block: ""
                                })
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                        _push3(`</div></div>`);
                      } else {
                        return [
                          createVNode("div", null, [
                            createVNode("div", null, [
                              createVNode(_component_NuxtCollapsible, { class: "flex flex-col gap-2" }, {
                                content: withCtx(() => [
                                  createVNode("div", { class: "mt-2 ml-2 space-y-2" }, [
                                    (openBlock(true), createBlock(Fragment, null, renderList(request.approvals, (approval) => {
                                      return openBlock(), createBlock("div", {
                                        key: approval.id
                                      }, [
                                        createVNode("div", { class: "flex items-center gap-3" }, [
                                          createVNode(_component_NuxtAvatar, {
                                            alt: approval.approver.name,
                                            src: approval.approver.image ?? void 0
                                          }, null, 8, ["alt", "src"]),
                                          createVNode("p", { class: "text-sm" }, toDisplayString(approval.approver.name), 1),
                                          createVNode(_component_NuxtBadge, {
                                            color: ("getModRequestStatusColor" in _ctx ? _ctx.getModRequestStatusColor : unref(getModRequestStatusColor))(approval.status),
                                            label: approval.status,
                                            size: "sm",
                                            variant: "subtle"
                                          }, null, 8, ["color", "label"])
                                        ])
                                      ]);
                                    }), 128))
                                  ])
                                ]),
                                default: withCtx(() => [
                                  createVNode(_component_NuxtButton, {
                                    label: "Approval Status",
                                    color: "neutral",
                                    variant: "soft",
                                    "trailing-icon": "i-lucide-chevron-down",
                                    block: ""
                                  })
                                ]),
                                _: 2
                              }, 1024)
                            ])
                          ])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<div${_scopeId}>`);
                _push2(ssrRenderComponent(_component_EmptyIcon, {
                  label: "No requests",
                  size: "4rem"
                }, null, _parent2, _scopeId));
                _push2(`</div>`);
              }
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(data) ? (openBlock(), createBlock("div", {
                key: 0,
                class: "mb-4 lg:grid lg:grid-cols-2 lg:gap-4"
              }, [
                createVNode("div", { class: "space-y-2" }, [
                  createVNode("p", { class: "card-title" }, "Your Requests"),
                  unref(data).ownRequests.length ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "space-y-4"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(data).ownRequests, (request) => {
                      return openBlock(), createBlock(_component_NuxtCard, {
                        key: request.id
                      }, {
                        header: withCtx(() => [
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            createVNode(_component_NuxtAvatar, {
                              alt: request.creator.name,
                              src: request.creator.image ?? void 0
                            }, null, 8, ["alt", "src"]),
                            createVNode("p", { class: "text-sm text-muted" }, toDisplayString(request.description ?? `${request.creator.name} initiated a ${("toCase" in _ctx ? _ctx.toCase : unref(toCase))(
                              request.type,
                              "lower"
                            )} request ${request.transaction ? `of ${("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(request.transaction.USDAmount)}` : ""}`), 1)
                          ])
                        ]),
                        default: withCtx(() => [
                          createVNode("div", null, [
                            createVNode("div", null, [
                              createVNode(_component_NuxtCollapsible, { class: "flex flex-col gap-2" }, {
                                content: withCtx(() => [
                                  createVNode("div", { class: "mt-2 ml-2 space-y-2" }, [
                                    (openBlock(true), createBlock(Fragment, null, renderList(request.approvals, (approval) => {
                                      return openBlock(), createBlock("div", {
                                        key: approval.id
                                      }, [
                                        createVNode("div", { class: "flex items-center gap-3" }, [
                                          createVNode(_component_NuxtAvatar, {
                                            alt: approval.approver.name,
                                            src: approval.approver.image ?? void 0
                                          }, null, 8, ["alt", "src"]),
                                          createVNode("p", { class: "text-sm" }, toDisplayString(approval.approver.name), 1),
                                          createVNode(_component_NuxtBadge, {
                                            color: ("getModRequestStatusColor" in _ctx ? _ctx.getModRequestStatusColor : unref(getModRequestStatusColor))(approval.status),
                                            label: approval.status,
                                            size: "sm",
                                            variant: "subtle"
                                          }, null, 8, ["color", "label"])
                                        ])
                                      ]);
                                    }), 128))
                                  ])
                                ]),
                                default: withCtx(() => [
                                  createVNode(_component_NuxtButton, {
                                    label: "Approval Status",
                                    color: "neutral",
                                    variant: "soft",
                                    "trailing-icon": "i-lucide-chevron-down",
                                    block: ""
                                  })
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            createVNode("div", { class: "mt-4 flex justify-end" }, [
                              createVNode("p", { class: "text-xs" }, toDisplayString(unref(useDateFormat)(request.createdAt, "MMM DD, YYYY | hh:mm aa")), 1)
                            ])
                          ])
                        ]),
                        _: 2
                      }, 1024);
                    }), 128))
                  ])) : (openBlock(), createBlock("div", { key: 1 }, [
                    createVNode(_component_EmptyIcon, {
                      label: "No requests",
                      size: "4rem"
                    })
                  ]))
                ]),
                createVNode(_component_NuxtSeparator, { class: "lg:hidden my-8" }),
                createVNode("div", { class: "space-y-2" }, [
                  createVNode("p", { class: "card-title" }, "Other Requests"),
                  unref(data).otherRequests.length ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "space-y-4"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(data).otherRequests, (request) => {
                      return openBlock(), createBlock(_component_NuxtCard, {
                        key: request.id
                      }, {
                        header: withCtx(() => [
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            createVNode(_component_NuxtAvatar, {
                              alt: request.creator.name,
                              src: request.creator.image ?? void 0
                            }, null, 8, ["alt", "src"]),
                            createVNode("p", { class: "text-sm text-muted" }, toDisplayString(request.description ?? `${request.creator.name} initiated a ${("toCase" in _ctx ? _ctx.toCase : unref(toCase))(
                              request.type,
                              "lower"
                            )} request ${request.transaction ? `of ${("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(request.transaction.USDAmount)}` : ""}`), 1)
                          ])
                        ]),
                        footer: withCtx(() => [
                          createVNode("div", { class: "flex justify-between" }, [
                            createVNode("p", { class: "text-xs" }, toDisplayString(unref(useDateFormat)(request.createdAt, "MMM DD, YYYY | hh:mm aa")), 1),
                            ownApproval(request) && ownApproval(request)?.status === "pending" ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "flex items-center gap-2"
                            }, [
                              createVNode(_component_UserModRequestStatusUpdater, {
                                "approval-id": ownApproval(request).id,
                                "mod-request-id": request.id,
                                "account-id": unref(accountId),
                                status: "accepted",
                                "button-size": "sm",
                                "button-label": "Accept",
                                onDone: (success) => success && unref(refresh)()
                              }, null, 8, ["approval-id", "mod-request-id", "account-id", "onDone"]),
                              createVNode(_component_UserModRequestStatusUpdater, {
                                "approval-id": ownApproval(request).id,
                                "mod-request-id": request.id,
                                "account-id": unref(accountId),
                                status: "rejected",
                                "button-size": "sm",
                                "button-label": "Reject",
                                "button-color": "error",
                                "button-variant": "subtle",
                                onDone: (success) => success && unref(refresh)()
                              }, null, 8, ["approval-id", "mod-request-id", "account-id", "onDone"])
                            ])) : createCommentVNode("", true)
                          ])
                        ]),
                        default: withCtx(() => [
                          createVNode("div", null, [
                            createVNode("div", null, [
                              createVNode(_component_NuxtCollapsible, { class: "flex flex-col gap-2" }, {
                                content: withCtx(() => [
                                  createVNode("div", { class: "mt-2 ml-2 space-y-2" }, [
                                    (openBlock(true), createBlock(Fragment, null, renderList(request.approvals, (approval) => {
                                      return openBlock(), createBlock("div", {
                                        key: approval.id
                                      }, [
                                        createVNode("div", { class: "flex items-center gap-3" }, [
                                          createVNode(_component_NuxtAvatar, {
                                            alt: approval.approver.name,
                                            src: approval.approver.image ?? void 0
                                          }, null, 8, ["alt", "src"]),
                                          createVNode("p", { class: "text-sm" }, toDisplayString(approval.approver.name), 1),
                                          createVNode(_component_NuxtBadge, {
                                            color: ("getModRequestStatusColor" in _ctx ? _ctx.getModRequestStatusColor : unref(getModRequestStatusColor))(approval.status),
                                            label: approval.status,
                                            size: "sm",
                                            variant: "subtle"
                                          }, null, 8, ["color", "label"])
                                        ])
                                      ]);
                                    }), 128))
                                  ])
                                ]),
                                default: withCtx(() => [
                                  createVNode(_component_NuxtButton, {
                                    label: "Approval Status",
                                    color: "neutral",
                                    variant: "soft",
                                    "trailing-icon": "i-lucide-chevron-down",
                                    block: ""
                                  })
                                ]),
                                _: 2
                              }, 1024)
                            ])
                          ])
                        ]),
                        _: 2
                      }, 1024);
                    }), 128))
                  ])) : (openBlock(), createBlock("div", { key: 1 }, [
                    createVNode(_component_EmptyIcon, {
                      label: "No requests",
                      size: "4rem"
                    })
                  ]))
                ])
              ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/user/accounts/[accountId]/requests.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=requests-DN_ICN8C.mjs.map
