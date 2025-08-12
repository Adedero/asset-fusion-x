import { _ as __nuxt_component_0 } from './my-page-Cgd-8gXO.mjs';
import { _ as __nuxt_component_6 } from './empty-icon-BnDpoaPH.mjs';
import { n as navigateTo, e as _sfc_main$d, j as _sfc_main$a, c as _sfc_main$7 } from './server.mjs';
import { _ as _sfc_main$5 } from './Modal-DefLStPx.mjs';
import { _ as __nuxt_component_14 } from './fetch-error-alert-B3Gd_w4n.mjs';
import { defineComponent, withAsyncContext, mergeProps, unref, withCtx, createVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, createCommentVNode, ref, isRef, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderAttrs, ssrRenderSlot } from 'vue/server-renderer';
import { u as useFetch } from './fetch-DztuJ_5C.mjs';
import { _ as _sfc_main$2 } from './Card-HL6icAYQ.mjs';
import { _ as _sfc_main$3 } from './Badge-q_8fq56_.mjs';
import { _ as _sfc_main$4 } from './AvatarGroup-Bhlzbbqz.mjs';
import { t as toDollar } from './to-dollar-DdS_9tlH.mjs';
import '../nitro/nitro.mjs';
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
import 'vue-router';
import 'tailwindcss/colors';
import '@iconify/vue';
import 'reka-ui';
import '@vueuse/core';
import 'tailwind-variants';
import '@iconify/utils/lib/css/icon';
import 'perfect-debounce';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import './Alert-CXdXSwrA.mjs';
import '@vue/shared';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "open-account-widget",
  __ssrInlineRender: true,
  props: {
    accountCount: { default: 0 }
  },
  setup(__props) {
    const open = ref(false);
    const { data, error, pending, execute } = useFetch("/api/user/profile", {
      key: "user-profile",
      immediate: false
    }, "$oqoo_H3-nf");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtButton = _sfc_main$7;
      const _component_NuxtModal = _sfc_main$5;
      const _component_FetchErrorAlert = __nuxt_component_14;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="w-fit cursor-pointer">`);
      ssrRenderSlot(_ctx.$slots, "default", { loading: unref(pending) }, () => {
        _push(ssrRenderComponent(_component_NuxtButton, {
          label: "Open an account",
          icon: "i-lucide-plus",
          color: "neutral",
          variant: "outline",
          loading: unref(pending)
        }, null, _parent));
      }, _push, _parent);
      _push(`</div>`);
      _push(ssrRenderComponent(_component_NuxtModal, {
        open: unref(open),
        "onUpdate:open": ($event) => isRef(open) ? open.value = $event : null,
        title: "Account Opening Request",
        class: "max-w-[28rem]"
      }, {
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}>`);
            if (unref(error)) {
              _push2(`<div${_scopeId}>`);
              _push2(ssrRenderComponent(_component_FetchErrorAlert, {
                title: unref(error)?.name,
                message: unref(error)?.message,
                "should-retry": "",
                onRetry: ($event) => unref(execute)()
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else if (!unref(data)?.profile) {
              _push2(`<div class="space-y-4"${_scopeId}><p${_scopeId}>To create an account, you need to update your profile.</p><div class="flex justify-end"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_NuxtButton, {
                to: "/user/profile",
                label: "Update profile",
                color: "neutral",
                variant: "outline"
              }, null, _parent2, _scopeId));
              _push2(`</div></div>`);
            } else {
              _push2(`<div${_scopeId}>`);
              if (!unref(data).profile.kycStatus) {
                _push2(`<div class="space-y-4"${_scopeId}><p${_scopeId}> Sorry, you cannot open an account at this time because your KYC data has not been submitted. </p><div class="flex justify-end"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_NuxtButton, {
                  to: "/user/profile/kyc",
                  label: "Submit KYC data",
                  color: "neutral",
                  variant: "outline"
                }, null, _parent2, _scopeId));
                _push2(`</div></div>`);
              } else if (unref(data).profile.kycStatus === "pending") {
                _push2(`<div${_scopeId}> Sorry, you cannot open an account at this time because your KYC document is still being verified. Try again later </div>`);
              } else if (unref(data).profile.kycStatus === "rejected") {
                _push2(`<div class="space-y-4"${_scopeId}><p${_scopeId}> Sorry, you cannot open an account at this time because your KYC data has been rejected. Please contact us to know more. </p><div class="flex justify-end"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_NuxtButton, {
                  to: "/user/contact",
                  label: "Contact us",
                  color: "neutral",
                  variant: "outline"
                }, null, _parent2, _scopeId));
                _push2(`</div></div>`);
              } else if (unref(data).profile.kycStatus === "resubmit") {
                _push2(`<div class="space-y-4"${_scopeId}><p${_scopeId}> Sorry, you cannot open an account at this time because your KYC data needs to be resubmitted. </p><div class="flex justify-end"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_NuxtButton, {
                  to: "/user/profile/kyc",
                  label: "Resubmit KYC data",
                  color: "neutral",
                  variant: "outline"
                }, null, _parent2, _scopeId));
                _push2(`</div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", null, [
                unref(error) ? (openBlock(), createBlock("div", { key: 0 }, [
                  createVNode(_component_FetchErrorAlert, {
                    title: unref(error)?.name,
                    message: unref(error)?.message,
                    "should-retry": "",
                    onRetry: ($event) => unref(execute)()
                  }, null, 8, ["title", "message", "onRetry"])
                ])) : !unref(data)?.profile ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "space-y-4"
                }, [
                  createVNode("p", null, "To create an account, you need to update your profile."),
                  createVNode("div", { class: "flex justify-end" }, [
                    createVNode(_component_NuxtButton, {
                      to: "/user/profile",
                      label: "Update profile",
                      color: "neutral",
                      variant: "outline"
                    })
                  ])
                ])) : (openBlock(), createBlock("div", { key: 2 }, [
                  !unref(data).profile.kycStatus ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "space-y-4"
                  }, [
                    createVNode("p", null, " Sorry, you cannot open an account at this time because your KYC data has not been submitted. "),
                    createVNode("div", { class: "flex justify-end" }, [
                      createVNode(_component_NuxtButton, {
                        to: "/user/profile/kyc",
                        label: "Submit KYC data",
                        color: "neutral",
                        variant: "outline"
                      })
                    ])
                  ])) : unref(data).profile.kycStatus === "pending" ? (openBlock(), createBlock("div", { key: 1 }, " Sorry, you cannot open an account at this time because your KYC document is still being verified. Try again later ")) : unref(data).profile.kycStatus === "rejected" ? (openBlock(), createBlock("div", {
                    key: 2,
                    class: "space-y-4"
                  }, [
                    createVNode("p", null, " Sorry, you cannot open an account at this time because your KYC data has been rejected. Please contact us to know more. "),
                    createVNode("div", { class: "flex justify-end" }, [
                      createVNode(_component_NuxtButton, {
                        to: "/user/contact",
                        label: "Contact us",
                        color: "neutral",
                        variant: "outline"
                      })
                    ])
                  ])) : unref(data).profile.kycStatus === "resubmit" ? (openBlock(), createBlock("div", {
                    key: 3,
                    class: "space-y-4"
                  }, [
                    createVNode("p", null, " Sorry, you cannot open an account at this time because your KYC data needs to be resubmitted. "),
                    createVNode("div", { class: "flex justify-end" }, [
                      createVNode(_component_NuxtButton, {
                        to: "/user/profile/kyc",
                        label: "Resubmit KYC data",
                        color: "neutral",
                        variant: "outline"
                      })
                    ])
                  ])) : createCommentVNode("", true)
                ]))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/user/open-account-widget.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main$1, { __name: "UserOpenAccountWidget" });
const maxAvatarGroup = 3;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/user/financial-accounts",
      {
        key: "user-financial-accounts"
      },
      "$KNFfQeeoyo"
    )), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MyPage = __nuxt_component_0;
      const _component_EmptyIcon = __nuxt_component_6;
      const _component_UserOpenAccountWidget = __nuxt_component_2;
      const _component_NuxtCard = _sfc_main$2;
      const _component_NuxtBadge = _sfc_main$3;
      const _component_NuxtIcon = _sfc_main$d;
      const _component_NuxtAvatarGroup = _sfc_main$4;
      const _component_NuxtAvatar = _sfc_main$a;
      _push(ssrRenderComponent(_component_MyPage, mergeProps({
        error: unref(error),
        onRetry: ($event) => unref(refresh)()
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(data)) {
              _push2(`<div${_scopeId}>`);
              if (!unref(data).financialAccounts.length) {
                _push2(`<div class="h-96"${_scopeId}><div class="fluid flex-col-center gap-4 text-muted"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_EmptyIcon, {
                  label: "No accounts",
                  size: "100px"
                }, null, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_UserOpenAccountWidget, null, null, _parent2, _scopeId));
                _push2(`</div></div>`);
              } else {
                _push2(`<div${_scopeId}><header class="flex justify-end mb-4"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UserOpenAccountWidget, {
                  "account-count": unref(data).financialAccounts.length
                }, null, _parent2, _scopeId));
                _push2(`</header><div class="grid gap-4 md:grid-cols-[repeat(auto-fill,minmax(28rem,1fr))]"${_scopeId}><!--[-->`);
                ssrRenderList(unref(data).financialAccounts, (account) => {
                  _push2(ssrRenderComponent(_component_NuxtCard, {
                    key: account.id,
                    class: "cursor-context-menu transition-colors hover:bg-muted/70! group",
                    onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))(`/user/accounts/${account.id}`)
                  }, {
                    footer: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        if (account.primaryUser) {
                          _push3(`<footer${_scopeId2}><div class="flex items-center gap-1"${_scopeId2}>`);
                          _push3(ssrRenderComponent(_component_NuxtAvatarGroup, { size: "xl" }, {
                            default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                              if (_push4) {
                                _push4(`<!--[-->`);
                                ssrRenderList([account.primaryUser, ...account.users], (user) => {
                                  _push4(ssrRenderComponent(_component_NuxtAvatar, {
                                    key: user.id,
                                    alt: user.name,
                                    src: user.image ?? void 0
                                  }, null, _parent4, _scopeId3));
                                });
                                _push4(`<!--]-->`);
                              } else {
                                return [
                                  (openBlock(true), createBlock(Fragment, null, renderList([account.primaryUser, ...account.users], (user) => {
                                    return openBlock(), createBlock(_component_NuxtAvatar, {
                                      key: user.id,
                                      alt: user.name,
                                      src: user.image ?? void 0
                                    }, null, 8, ["alt", "src"]);
                                  }), 128))
                                ];
                              }
                            }),
                            _: 2
                          }, _parent3, _scopeId2));
                          if (account.userCount === 1) {
                            _push3(`<span class="text-sm text-muted ml-2"${_scopeId2}>You</span>`);
                          } else if (account.userCount - maxAvatarGroup > 0) {
                            _push3(`<span class="text-sm text-muted ml-2"${_scopeId2}> +${ssrInterpolate(`${account.userCount - maxAvatarGroup} ${account.userCount - maxAvatarGroup === 1 ? "other" : "others"}`)}</span>`);
                          } else {
                            _push3(`<!---->`);
                          }
                          _push3(`</div></footer>`);
                        } else {
                          _push3(`<!---->`);
                        }
                      } else {
                        return [
                          account.primaryUser ? (openBlock(), createBlock("footer", { key: 0 }, [
                            createVNode("div", { class: "flex items-center gap-1" }, [
                              createVNode(_component_NuxtAvatarGroup, { size: "xl" }, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList([account.primaryUser, ...account.users], (user) => {
                                    return openBlock(), createBlock(_component_NuxtAvatar, {
                                      key: user.id,
                                      alt: user.name,
                                      src: user.image ?? void 0
                                    }, null, 8, ["alt", "src"]);
                                  }), 128))
                                ]),
                                _: 2
                              }, 1024),
                              account.userCount === 1 ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "text-sm text-muted ml-2"
                              }, "You")) : account.userCount - maxAvatarGroup > 0 ? (openBlock(), createBlock("span", {
                                key: 1,
                                class: "text-sm text-muted ml-2"
                              }, " +" + toDisplayString(`${account.userCount - maxAvatarGroup} ${account.userCount - maxAvatarGroup === 1 ? "other" : "others"}`), 1)) : createCommentVNode("", true)
                            ])
                          ])) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`<div${_scopeId2}><header class="mb-2 flex items-start gap-2 justify-between"${_scopeId2}><div${_scopeId2}><div class="border-2 border-accented rounded-md py-1 px-2 flex items-center gap-2"${_scopeId2}><div class="w-2 h-2 bg-success rounded-full"${_scopeId2}></div><p class="card-title"${_scopeId2}>${ssrInterpolate(account.name)}</p></div></div><div class="flex flex-wrap items-end justify-end gap-x-2 gap-y-1 md:hidden"${_scopeId2}>`);
                        _push3(ssrRenderComponent(_component_NuxtBadge, {
                          size: "sm",
                          variant: "soft",
                          label: account.ownership
                        }, null, _parent3, _scopeId2));
                        _push3(ssrRenderComponent(_component_NuxtBadge, {
                          size: "sm",
                          variant: "soft",
                          color: "error",
                          label: account.type
                        }, null, _parent3, _scopeId2));
                        _push3(`</div><div class="space-x-2 hidden md:block"${_scopeId2}>`);
                        _push3(ssrRenderComponent(_component_NuxtBadge, {
                          variant: "soft",
                          label: account.ownership
                        }, null, _parent3, _scopeId2));
                        _push3(ssrRenderComponent(_component_NuxtBadge, {
                          variant: "soft",
                          color: "error",
                          label: account.type
                        }, null, _parent3, _scopeId2));
                        _push3(`</div></header><div class="flex items-center gap-2 justify-between"${_scopeId2}><div${_scopeId2}><p class="font-geist-mono text-muted text-[0.9rem]"${_scopeId2}>${ssrInterpolate(account.number)}</p><div class="flex gap-x-2 flex-wrap items-baseline"${_scopeId2}><p class="font-geist-mono text-4xl font-semibold"${_scopeId2}>${ssrInterpolate(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(account.balance))}</p><p class="font-geist-mono font-semibold text-muted"${_scopeId2}> +${ssrInterpolate(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(account.totalProfit))}</p></div></div><div class="text-primary/50 transition-all translate-y-10 opacity-0 group-hover:opacity-100 group-hover:translate-y-0"${_scopeId2}>`);
                        _push3(ssrRenderComponent(_component_NuxtIcon, {
                          size: "3rem",
                          name: "lucide-circle-arrow-right"
                        }, null, _parent3, _scopeId2));
                        _push3(`</div></div></div>`);
                      } else {
                        return [
                          createVNode("div", null, [
                            createVNode("header", { class: "mb-2 flex items-start gap-2 justify-between" }, [
                              createVNode("div", null, [
                                createVNode("div", { class: "border-2 border-accented rounded-md py-1 px-2 flex items-center gap-2" }, [
                                  createVNode("div", { class: "w-2 h-2 bg-success rounded-full" }),
                                  createVNode("p", { class: "card-title" }, toDisplayString(account.name), 1)
                                ])
                              ]),
                              createVNode("div", { class: "flex flex-wrap items-end justify-end gap-x-2 gap-y-1 md:hidden" }, [
                                createVNode(_component_NuxtBadge, {
                                  size: "sm",
                                  variant: "soft",
                                  label: account.ownership
                                }, null, 8, ["label"]),
                                createVNode(_component_NuxtBadge, {
                                  size: "sm",
                                  variant: "soft",
                                  color: "error",
                                  label: account.type
                                }, null, 8, ["label"])
                              ]),
                              createVNode("div", { class: "space-x-2 hidden md:block" }, [
                                createVNode(_component_NuxtBadge, {
                                  variant: "soft",
                                  label: account.ownership
                                }, null, 8, ["label"]),
                                createVNode(_component_NuxtBadge, {
                                  variant: "soft",
                                  color: "error",
                                  label: account.type
                                }, null, 8, ["label"])
                              ])
                            ]),
                            createVNode("div", { class: "flex items-center gap-2 justify-between" }, [
                              createVNode("div", null, [
                                createVNode("p", { class: "font-geist-mono text-muted text-[0.9rem]" }, toDisplayString(account.number), 1),
                                createVNode("div", { class: "flex gap-x-2 flex-wrap items-baseline" }, [
                                  createVNode("p", { class: "font-geist-mono text-4xl font-semibold" }, toDisplayString(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(account.balance)), 1),
                                  createVNode("p", { class: "font-geist-mono font-semibold text-muted" }, " +" + toDisplayString(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(account.totalProfit)), 1)
                                ])
                              ]),
                              createVNode("div", { class: "text-primary/50 transition-all translate-y-10 opacity-0 group-hover:opacity-100 group-hover:translate-y-0" }, [
                                createVNode(_component_NuxtIcon, {
                                  size: "3rem",
                                  name: "lucide-circle-arrow-right"
                                })
                              ])
                            ])
                          ])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                });
                _push2(`<!--]--></div></div>`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(data) ? (openBlock(), createBlock("div", { key: 0 }, [
                !unref(data).financialAccounts.length ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "h-96"
                }, [
                  createVNode("div", { class: "fluid flex-col-center gap-4 text-muted" }, [
                    createVNode(_component_EmptyIcon, {
                      label: "No accounts",
                      size: "100px"
                    }),
                    createVNode(_component_UserOpenAccountWidget)
                  ])
                ])) : (openBlock(), createBlock("div", { key: 1 }, [
                  createVNode("header", { class: "flex justify-end mb-4" }, [
                    createVNode(_component_UserOpenAccountWidget, {
                      "account-count": unref(data).financialAccounts.length
                    }, null, 8, ["account-count"])
                  ]),
                  createVNode("div", { class: "grid gap-4 md:grid-cols-[repeat(auto-fill,minmax(28rem,1fr))]" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(data).financialAccounts, (account) => {
                      return openBlock(), createBlock(_component_NuxtCard, {
                        key: account.id,
                        class: "cursor-context-menu transition-colors hover:bg-muted/70! group",
                        onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))(`/user/accounts/${account.id}`)
                      }, {
                        footer: withCtx(() => [
                          account.primaryUser ? (openBlock(), createBlock("footer", { key: 0 }, [
                            createVNode("div", { class: "flex items-center gap-1" }, [
                              createVNode(_component_NuxtAvatarGroup, { size: "xl" }, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList([account.primaryUser, ...account.users], (user) => {
                                    return openBlock(), createBlock(_component_NuxtAvatar, {
                                      key: user.id,
                                      alt: user.name,
                                      src: user.image ?? void 0
                                    }, null, 8, ["alt", "src"]);
                                  }), 128))
                                ]),
                                _: 2
                              }, 1024),
                              account.userCount === 1 ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "text-sm text-muted ml-2"
                              }, "You")) : account.userCount - maxAvatarGroup > 0 ? (openBlock(), createBlock("span", {
                                key: 1,
                                class: "text-sm text-muted ml-2"
                              }, " +" + toDisplayString(`${account.userCount - maxAvatarGroup} ${account.userCount - maxAvatarGroup === 1 ? "other" : "others"}`), 1)) : createCommentVNode("", true)
                            ])
                          ])) : createCommentVNode("", true)
                        ]),
                        default: withCtx(() => [
                          createVNode("div", null, [
                            createVNode("header", { class: "mb-2 flex items-start gap-2 justify-between" }, [
                              createVNode("div", null, [
                                createVNode("div", { class: "border-2 border-accented rounded-md py-1 px-2 flex items-center gap-2" }, [
                                  createVNode("div", { class: "w-2 h-2 bg-success rounded-full" }),
                                  createVNode("p", { class: "card-title" }, toDisplayString(account.name), 1)
                                ])
                              ]),
                              createVNode("div", { class: "flex flex-wrap items-end justify-end gap-x-2 gap-y-1 md:hidden" }, [
                                createVNode(_component_NuxtBadge, {
                                  size: "sm",
                                  variant: "soft",
                                  label: account.ownership
                                }, null, 8, ["label"]),
                                createVNode(_component_NuxtBadge, {
                                  size: "sm",
                                  variant: "soft",
                                  color: "error",
                                  label: account.type
                                }, null, 8, ["label"])
                              ]),
                              createVNode("div", { class: "space-x-2 hidden md:block" }, [
                                createVNode(_component_NuxtBadge, {
                                  variant: "soft",
                                  label: account.ownership
                                }, null, 8, ["label"]),
                                createVNode(_component_NuxtBadge, {
                                  variant: "soft",
                                  color: "error",
                                  label: account.type
                                }, null, 8, ["label"])
                              ])
                            ]),
                            createVNode("div", { class: "flex items-center gap-2 justify-between" }, [
                              createVNode("div", null, [
                                createVNode("p", { class: "font-geist-mono text-muted text-[0.9rem]" }, toDisplayString(account.number), 1),
                                createVNode("div", { class: "flex gap-x-2 flex-wrap items-baseline" }, [
                                  createVNode("p", { class: "font-geist-mono text-4xl font-semibold" }, toDisplayString(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(account.balance)), 1),
                                  createVNode("p", { class: "font-geist-mono font-semibold text-muted" }, " +" + toDisplayString(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(account.totalProfit)), 1)
                                ])
                              ]),
                              createVNode("div", { class: "text-primary/50 transition-all translate-y-10 opacity-0 group-hover:opacity-100 group-hover:translate-y-0" }, [
                                createVNode(_component_NuxtIcon, {
                                  size: "3rem",
                                  name: "lucide-circle-arrow-right"
                                })
                              ])
                            ])
                          ])
                        ]),
                        _: 2
                      }, 1032, ["onClick"]);
                    }), 128))
                  ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/user/accounts/index/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-lAP5Ii7U.mjs.map
