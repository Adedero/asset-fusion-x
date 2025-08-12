import { _ as __nuxt_component_0 } from './my-page-Cgd-8gXO.mjs';
import { _ as _sfc_main$1 } from './Card-HL6icAYQ.mjs';
import { i as useToast, c as _sfc_main$7, j as _sfc_main$a } from './server.mjs';
import { _ as _sfc_main$2 } from './Badge-q_8fq56_.mjs';
import { _ as _sfc_main$3 } from './Modal-DefLStPx.mjs';
import { _ as __nuxt_component_14 } from './fetch-error-alert-B3Gd_w4n.mjs';
import { _ as __nuxt_component_6 } from './empty-icon-BnDpoaPH.mjs';
import { t as toCase } from './to-case-ChuH9uWD.mjs';
import { defineComponent, withAsyncContext, computed, ref, mergeProps, unref, withCtx, createVNode, createBlock, createCommentVNode, toDisplayString, createTextVNode, openBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { useDateFormat } from '@vueuse/core';
import { a6 as normalizeException } from '../nitro/nitro.mjs';
import { u as useFetch } from './fetch-DztuJ_5C.mjs';
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
import './Alert-CXdXSwrA.mjs';
import '@vue/shared';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "join-requests",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const toast = useToast();
    const { data, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/user/join-requests", {
      key: "user-join-requests"
    }, "$IYoQR3Tu0J")), __temp = await __temp, __restore(), __temp);
    const joinRequests = computed(
      () => data.value?.map((item) => ({ ...item, loading: false })) ?? []
    );
    const acceptError = ref(null);
    async function acceptRequest(item, close) {
      try {
        await $fetch(`/api/user/join-requests/${item.id}/accept`, {
          method: "post"
        });
        toast.add({
          color: "success",
          title: "Success",
          description: "You are now an account member."
        });
        await refresh();
        close();
      } catch (e) {
        acceptError.value = normalizeException(e);
      }
    }
    const rejectError = ref(null);
    async function rejectRequest(item, close) {
      try {
        await $fetch(`/api/user/join-requests/${item.id}`, {
          method: "delete"
        });
        await refresh();
        close();
      } catch (e) {
        rejectError.value = normalizeException(e);
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MyPage = __nuxt_component_0;
      const _component_NuxtCard = _sfc_main$1;
      const _component_NuxtAvatar = _sfc_main$a;
      const _component_NuxtBadge = _sfc_main$2;
      const _component_NuxtModal = _sfc_main$3;
      const _component_NuxtButton = _sfc_main$7;
      const _component_FetchErrorAlert = __nuxt_component_14;
      const _component_EmptyIcon = __nuxt_component_6;
      _push(ssrRenderComponent(_component_MyPage, mergeProps({
        error: unref(error),
        onRefresh: ($event) => unref(refresh)()
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(data)) {
              _push2(`<div${_scopeId}>`);
              if (unref(joinRequests).length > 0) {
                _push2(`<div class="grid gap-4 md:grid-cols-[repeat(auto-fill,minmax(24rem,1fr))]"${_scopeId}><!--[-->`);
                ssrRenderList(unref(joinRequests), (item) => {
                  _push2(ssrRenderComponent(_component_NuxtCard, {
                    key: item.id
                  }, {
                    header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`<div class="flex items-center gap-2"${_scopeId2}>`);
                        _push3(ssrRenderComponent(_component_NuxtAvatar, {
                          src: item.creator.image ?? void 0,
                          alt: item.creator.name,
                          size: "lg"
                        }, null, _parent3, _scopeId2));
                        _push3(`<div${_scopeId2}><p class="text-sm text-muted"${_scopeId2}> Invited by <b${_scopeId2}>${ssrInterpolate(item.creator.name)}</b></p><p class="text-xs text-muted"${_scopeId2}>${ssrInterpolate(item.creator.email)}</p></div></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            createVNode(_component_NuxtAvatar, {
                              src: item.creator.image ?? void 0,
                              alt: item.creator.name,
                              size: "lg"
                            }, null, 8, ["src", "alt"]),
                            createVNode("div", null, [
                              createVNode("p", { class: "text-sm text-muted" }, [
                                createTextVNode(" Invited by "),
                                createVNode("b", null, toDisplayString(item.creator.name), 1)
                              ]),
                              createVNode("p", { class: "text-xs text-muted" }, toDisplayString(item.creator.email), 1)
                            ])
                          ])
                        ];
                      }
                    }),
                    footer: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`<div${_scopeId2}><div class="flex items-center gap-2 justify-end"${_scopeId2}>`);
                        _push3(ssrRenderComponent(_component_NuxtModal, { title: "Account Request" }, {
                          body: withCtx(({ close }, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(`<div class="space-y-4"${_scopeId3}><p${_scopeId3}>Are you sure you want to reject this request?</p>`);
                              if (unref(rejectError)) {
                                _push4(ssrRenderComponent(_component_FetchErrorAlert, {
                                  message: unref(rejectError).message
                                }, null, _parent4, _scopeId3));
                              } else {
                                _push4(`<!---->`);
                              }
                              _push4(`<div class="flex items-center justify-end gap-2"${_scopeId3}>`);
                              _push4(ssrRenderComponent(_component_NuxtButton, {
                                color: "neutral",
                                variant: "soft",
                                label: "Cancel",
                                onClick: ($event) => close()
                              }, null, _parent4, _scopeId3));
                              _push4(ssrRenderComponent(_component_NuxtButton, {
                                color: "error",
                                label: "Proceed",
                                "loading-auto": "",
                                onClick: ($event) => rejectRequest(item, close)
                              }, null, _parent4, _scopeId3));
                              _push4(`</div></div>`);
                            } else {
                              return [
                                createVNode("div", { class: "space-y-4" }, [
                                  createVNode("p", null, "Are you sure you want to reject this request?"),
                                  unref(rejectError) ? (openBlock(), createBlock(_component_FetchErrorAlert, {
                                    key: 0,
                                    message: unref(rejectError).message
                                  }, null, 8, ["message"])) : createCommentVNode("", true),
                                  createVNode("div", { class: "flex items-center justify-end gap-2" }, [
                                    createVNode(_component_NuxtButton, {
                                      color: "neutral",
                                      variant: "soft",
                                      label: "Cancel",
                                      onClick: ($event) => close()
                                    }, null, 8, ["onClick"]),
                                    createVNode(_component_NuxtButton, {
                                      color: "error",
                                      label: "Proceed",
                                      "loading-auto": "",
                                      onClick: ($event) => rejectRequest(item, close)
                                    }, null, 8, ["onClick"])
                                  ])
                                ])
                              ];
                            }
                          }),
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(ssrRenderComponent(_component_NuxtButton, {
                                color: "error",
                                variant: "soft",
                                icon: "lucide-circle-x",
                                size: "sm",
                                label: "Reject"
                              }, null, _parent4, _scopeId3));
                            } else {
                              return [
                                createVNode(_component_NuxtButton, {
                                  color: "error",
                                  variant: "soft",
                                  icon: "lucide-circle-x",
                                  size: "sm",
                                  label: "Reject"
                                })
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                        _push3(ssrRenderComponent(_component_NuxtModal, { title: "Account Request" }, {
                          body: withCtx(({ close }, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(`<div class="space-y-4"${_scopeId3}><p${_scopeId3}>Are you sure you want to accept this request?</p>`);
                              if (unref(acceptError)) {
                                _push4(ssrRenderComponent(_component_FetchErrorAlert, {
                                  message: unref(acceptError).message
                                }, null, _parent4, _scopeId3));
                              } else {
                                _push4(`<!---->`);
                              }
                              _push4(`<div class="flex items-center justify-end gap-2"${_scopeId3}>`);
                              _push4(ssrRenderComponent(_component_NuxtButton, {
                                color: "neutral",
                                variant: "soft",
                                label: "Cancel",
                                onClick: ($event) => close()
                              }, null, _parent4, _scopeId3));
                              _push4(ssrRenderComponent(_component_NuxtButton, {
                                label: "Proceed",
                                "loading-auto": "",
                                onClick: ($event) => acceptRequest(item, close)
                              }, null, _parent4, _scopeId3));
                              _push4(`</div></div>`);
                            } else {
                              return [
                                createVNode("div", { class: "space-y-4" }, [
                                  createVNode("p", null, "Are you sure you want to accept this request?"),
                                  unref(acceptError) ? (openBlock(), createBlock(_component_FetchErrorAlert, {
                                    key: 0,
                                    message: unref(acceptError).message
                                  }, null, 8, ["message"])) : createCommentVNode("", true),
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
                                      onClick: ($event) => acceptRequest(item, close)
                                    }, null, 8, ["onClick"])
                                  ])
                                ])
                              ];
                            }
                          }),
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(ssrRenderComponent(_component_NuxtButton, {
                                label: "Accept",
                                size: "sm",
                                icon: "lucide-circle-check"
                              }, null, _parent4, _scopeId3));
                            } else {
                              return [
                                createVNode(_component_NuxtButton, {
                                  label: "Accept",
                                  size: "sm",
                                  icon: "lucide-circle-check"
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
                            createVNode("div", { class: "flex items-center gap-2 justify-end" }, [
                              createVNode(_component_NuxtModal, { title: "Account Request" }, {
                                body: withCtx(({ close }) => [
                                  createVNode("div", { class: "space-y-4" }, [
                                    createVNode("p", null, "Are you sure you want to reject this request?"),
                                    unref(rejectError) ? (openBlock(), createBlock(_component_FetchErrorAlert, {
                                      key: 0,
                                      message: unref(rejectError).message
                                    }, null, 8, ["message"])) : createCommentVNode("", true),
                                    createVNode("div", { class: "flex items-center justify-end gap-2" }, [
                                      createVNode(_component_NuxtButton, {
                                        color: "neutral",
                                        variant: "soft",
                                        label: "Cancel",
                                        onClick: ($event) => close()
                                      }, null, 8, ["onClick"]),
                                      createVNode(_component_NuxtButton, {
                                        color: "error",
                                        label: "Proceed",
                                        "loading-auto": "",
                                        onClick: ($event) => rejectRequest(item, close)
                                      }, null, 8, ["onClick"])
                                    ])
                                  ])
                                ]),
                                default: withCtx(() => [
                                  createVNode(_component_NuxtButton, {
                                    color: "error",
                                    variant: "soft",
                                    icon: "lucide-circle-x",
                                    size: "sm",
                                    label: "Reject"
                                  })
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(_component_NuxtModal, { title: "Account Request" }, {
                                body: withCtx(({ close }) => [
                                  createVNode("div", { class: "space-y-4" }, [
                                    createVNode("p", null, "Are you sure you want to accept this request?"),
                                    unref(acceptError) ? (openBlock(), createBlock(_component_FetchErrorAlert, {
                                      key: 0,
                                      message: unref(acceptError).message
                                    }, null, 8, ["message"])) : createCommentVNode("", true),
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
                                        onClick: ($event) => acceptRequest(item, close)
                                      }, null, 8, ["onClick"])
                                    ])
                                  ])
                                ]),
                                default: withCtx(() => [
                                  createVNode(_component_NuxtButton, {
                                    label: "Accept",
                                    size: "sm",
                                    icon: "lucide-circle-check"
                                  })
                                ]),
                                _: 2
                              }, 1024)
                            ])
                          ])
                        ];
                      }
                    }),
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`<div class="space-y-2"${_scopeId2}><header${_scopeId2}><h3 class="text-3xl font-medium"${_scopeId2}>${ssrInterpolate(item.financialAccount.name)}</h3><p class="text-xs"${_scopeId2}> Created <b${_scopeId2}>${ssrInterpolate(unref(useDateFormat)(
                          item.financialAccount.createdAt,
                          "MMM DD, YYYY"
                        ))}</b></p></header><div${_scopeId2}>`);
                        _push3(ssrRenderComponent(_component_NuxtBadge, {
                          variant: "soft",
                          label: ("toCase" in _ctx ? _ctx.toCase : unref(toCase))(item.role, "sentence")
                        }, null, _parent3, _scopeId2));
                        _push3(ssrRenderComponent(_component_NuxtBadge, {
                          color: "success",
                          variant: "soft",
                          label: item.ownership + "% ownership",
                          class: "ml-2"
                        }, null, _parent3, _scopeId2));
                        _push3(`</div>`);
                        if (item.description) {
                          _push3(`<div class="text-xs"${_scopeId2}><p class="underline"${_scopeId2}>Added note</p><p class="text-muted"${_scopeId2}>${ssrInterpolate(item.description)}</p></div>`);
                        } else {
                          _push3(`<!---->`);
                        }
                        _push3(`<div class="flex justify-end"${_scopeId2}><p class="text-muted text-xs"${_scopeId2}> Request sent on ${ssrInterpolate(unref(useDateFormat)(item.createdAt, "MMM DD, YYYY hh:mm aa"))}</p></div></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode("header", null, [
                              createVNode("h3", { class: "text-3xl font-medium" }, toDisplayString(item.financialAccount.name), 1),
                              createVNode("p", { class: "text-xs" }, [
                                createTextVNode(" Created "),
                                createVNode("b", null, toDisplayString(unref(useDateFormat)(
                                  item.financialAccount.createdAt,
                                  "MMM DD, YYYY"
                                )), 1)
                              ])
                            ]),
                            createVNode("div", null, [
                              createVNode(_component_NuxtBadge, {
                                variant: "soft",
                                label: ("toCase" in _ctx ? _ctx.toCase : unref(toCase))(item.role, "sentence")
                              }, null, 8, ["label"]),
                              createVNode(_component_NuxtBadge, {
                                color: "success",
                                variant: "soft",
                                label: item.ownership + "% ownership",
                                class: "ml-2"
                              }, null, 8, ["label"])
                            ]),
                            item.description ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "text-xs"
                            }, [
                              createVNode("p", { class: "underline" }, "Added note"),
                              createVNode("p", { class: "text-muted" }, toDisplayString(item.description), 1)
                            ])) : createCommentVNode("", true),
                            createVNode("div", { class: "flex justify-end" }, [
                              createVNode("p", { class: "text-muted text-xs" }, " Request sent on " + toDisplayString(unref(useDateFormat)(item.createdAt, "MMM DD, YYYY hh:mm aa")), 1)
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
                _push2(`<div class="h-60 fluid flex-col-center gap-4 text-muted"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_EmptyIcon, {
                  label: "No requests",
                  size: "100px"
                }, null, _parent2, _scopeId));
                _push2(`</div>`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(data) ? (openBlock(), createBlock("div", { key: 0 }, [
                unref(joinRequests).length > 0 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "grid gap-4 md:grid-cols-[repeat(auto-fill,minmax(24rem,1fr))]"
                }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(joinRequests), (item) => {
                    return openBlock(), createBlock(_component_NuxtCard, {
                      key: item.id
                    }, {
                      header: withCtx(() => [
                        createVNode("div", { class: "flex items-center gap-2" }, [
                          createVNode(_component_NuxtAvatar, {
                            src: item.creator.image ?? void 0,
                            alt: item.creator.name,
                            size: "lg"
                          }, null, 8, ["src", "alt"]),
                          createVNode("div", null, [
                            createVNode("p", { class: "text-sm text-muted" }, [
                              createTextVNode(" Invited by "),
                              createVNode("b", null, toDisplayString(item.creator.name), 1)
                            ]),
                            createVNode("p", { class: "text-xs text-muted" }, toDisplayString(item.creator.email), 1)
                          ])
                        ])
                      ]),
                      footer: withCtx(() => [
                        createVNode("div", null, [
                          createVNode("div", { class: "flex items-center gap-2 justify-end" }, [
                            createVNode(_component_NuxtModal, { title: "Account Request" }, {
                              body: withCtx(({ close }) => [
                                createVNode("div", { class: "space-y-4" }, [
                                  createVNode("p", null, "Are you sure you want to reject this request?"),
                                  unref(rejectError) ? (openBlock(), createBlock(_component_FetchErrorAlert, {
                                    key: 0,
                                    message: unref(rejectError).message
                                  }, null, 8, ["message"])) : createCommentVNode("", true),
                                  createVNode("div", { class: "flex items-center justify-end gap-2" }, [
                                    createVNode(_component_NuxtButton, {
                                      color: "neutral",
                                      variant: "soft",
                                      label: "Cancel",
                                      onClick: ($event) => close()
                                    }, null, 8, ["onClick"]),
                                    createVNode(_component_NuxtButton, {
                                      color: "error",
                                      label: "Proceed",
                                      "loading-auto": "",
                                      onClick: ($event) => rejectRequest(item, close)
                                    }, null, 8, ["onClick"])
                                  ])
                                ])
                              ]),
                              default: withCtx(() => [
                                createVNode(_component_NuxtButton, {
                                  color: "error",
                                  variant: "soft",
                                  icon: "lucide-circle-x",
                                  size: "sm",
                                  label: "Reject"
                                })
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(_component_NuxtModal, { title: "Account Request" }, {
                              body: withCtx(({ close }) => [
                                createVNode("div", { class: "space-y-4" }, [
                                  createVNode("p", null, "Are you sure you want to accept this request?"),
                                  unref(acceptError) ? (openBlock(), createBlock(_component_FetchErrorAlert, {
                                    key: 0,
                                    message: unref(acceptError).message
                                  }, null, 8, ["message"])) : createCommentVNode("", true),
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
                                      onClick: ($event) => acceptRequest(item, close)
                                    }, null, 8, ["onClick"])
                                  ])
                                ])
                              ]),
                              default: withCtx(() => [
                                createVNode(_component_NuxtButton, {
                                  label: "Accept",
                                  size: "sm",
                                  icon: "lucide-circle-check"
                                })
                              ]),
                              _: 2
                            }, 1024)
                          ])
                        ])
                      ]),
                      default: withCtx(() => [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode("header", null, [
                            createVNode("h3", { class: "text-3xl font-medium" }, toDisplayString(item.financialAccount.name), 1),
                            createVNode("p", { class: "text-xs" }, [
                              createTextVNode(" Created "),
                              createVNode("b", null, toDisplayString(unref(useDateFormat)(
                                item.financialAccount.createdAt,
                                "MMM DD, YYYY"
                              )), 1)
                            ])
                          ]),
                          createVNode("div", null, [
                            createVNode(_component_NuxtBadge, {
                              variant: "soft",
                              label: ("toCase" in _ctx ? _ctx.toCase : unref(toCase))(item.role, "sentence")
                            }, null, 8, ["label"]),
                            createVNode(_component_NuxtBadge, {
                              color: "success",
                              variant: "soft",
                              label: item.ownership + "% ownership",
                              class: "ml-2"
                            }, null, 8, ["label"])
                          ]),
                          item.description ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "text-xs"
                          }, [
                            createVNode("p", { class: "underline" }, "Added note"),
                            createVNode("p", { class: "text-muted" }, toDisplayString(item.description), 1)
                          ])) : createCommentVNode("", true),
                          createVNode("div", { class: "flex justify-end" }, [
                            createVNode("p", { class: "text-muted text-xs" }, " Request sent on " + toDisplayString(unref(useDateFormat)(item.createdAt, "MMM DD, YYYY hh:mm aa")), 1)
                          ])
                        ])
                      ]),
                      _: 2
                    }, 1024);
                  }), 128))
                ])) : (openBlock(), createBlock("div", {
                  key: 1,
                  class: "h-60 fluid flex-col-center gap-4 text-muted"
                }, [
                  createVNode(_component_EmptyIcon, {
                    label: "No requests",
                    size: "100px"
                  })
                ]))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/user/accounts/index/join-requests.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=join-requests-UebrdbbT.mjs.map
