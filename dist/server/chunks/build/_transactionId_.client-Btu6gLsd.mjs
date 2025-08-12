import { _ as __nuxt_component_0 } from './my-page-Cgd-8gXO.mjs';
import { _ as __nuxt_component_3 } from './app-logo-h2drnef0.mjs';
import { _ as _sfc_main$1 } from './Badge-q_8fq56_.mjs';
import { _ as _sfc_main$2 } from './Separator-C2D_H5pj.mjs';
import { b as useRuntimeConfig, c as _sfc_main$7 } from './server.mjs';
import { t as toDollar } from './to-dollar-DdS_9tlH.mjs';
import { defineComponent, withAsyncContext, useTemplateRef, mergeProps, unref, withCtx, createBlock, createCommentVNode, openBlock, createVNode, toDisplayString, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { useDateFormat } from '@vueuse/core';
import html2canvas from 'html2canvas-pro';
import { u as useRouteData } from './use-route-data-1tNFDvd7.mjs';
import { u as useFetch } from './fetch-DztuJ_5C.mjs';
import './fetch-error-alert-B3Gd_w4n.mjs';
import './Alert-CXdXSwrA.mjs';
import 'reka-ui';
import '../nitro/nitro.mjs';
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
import '@vue/shared';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[transactionId].client",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const runtimeConfig = useRuntimeConfig();
    const [accountId, transactionId] = useRouteData().getParams([
      "accountId",
      "transactionId"
    ]);
    const {
      data: transaction,
      error,
      refresh
    } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `/api/user/financial-accounts/${accountId}/transactions/${transactionId}`,
      {
        key: () => `transaction-${transactionId}`
      },
      "$ayGBqtBjXC"
    )), __temp = await __temp, __restore(), __temp);
    const receipt = useTemplateRef("receipt");
    async function download(type = "img") {
      if (!receipt.value) return;
      const canvas = await html2canvas(receipt.value, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const docName = `TXN-${transactionId?.toUpperCase()}`;
      if (type === "pdf") {
        const jsPDF = (await import('jspdf')).default;
        const pdf = new jsPDF("p", "pt", "a4", true);
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = imgProps.height * pdfWidth / imgProps.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${docName}.pdf`);
      } else {
        const link = (void 0).createElement("a");
        link.href = imgData;
        link.download = `${docName}.png`;
        (void 0).body.appendChild(link);
        link.click();
        (void 0).body.removeChild(link);
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MyPage = __nuxt_component_0;
      const _component_AppLogo = __nuxt_component_3;
      const _component_NuxtBadge = _sfc_main$1;
      const _component_NuxtSeparator = _sfc_main$2;
      const _component_NuxtButton = _sfc_main$7;
      _push(ssrRenderComponent(_component_MyPage, mergeProps({
        error: unref(error),
        onRefresh: ($event) => unref(refresh)()
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(transaction)) {
              _push2(`<div${_scopeId}><div class="flex flex-col items-center px-0 py-4 md:p-4 gap-4"${_scopeId}><div class="receipt border border-muted p-3 md:p-5 md:pb-8 w-full max-w-[28rem]"${_scopeId}><header class="flex justify-end"${_scopeId}><div class="text-right flex flex-col items-end"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_AppLogo, { size: "38" }, null, _parent2, _scopeId));
              _push2(`<p class="text-primary text-sm font-semibold"${_scopeId}>${ssrInterpolate(unref(runtimeConfig).public.appName)}</p></div></header><p class="my-4 font-semibold text-center"${_scopeId}>Transaction Receipt</p><div class="flex-col-center gap-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_NuxtBadge, {
                color: "neutral",
                variant: "soft",
                label: unref(transaction).status
              }, null, _parent2, _scopeId));
              _push2(`<p class="font-geist-mono font-semibold text-4xl"${_scopeId}>${ssrInterpolate(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(unref(transaction).USDAmount))}</p><p class="text-sm text-muted"${_scopeId}>${ssrInterpolate(unref(useDateFormat)(unref(transaction).createdAt, "MMM-DD-YYYY hh:mm aa"))}</p></div>`);
              _push2(ssrRenderComponent(_component_NuxtSeparator, { class: "my-4" }, null, _parent2, _scopeId));
              _push2(`<div class="space-y-2 *:p-1 text-[0.9rem]"${_scopeId}><div class="flex justify-between gap-4"${_scopeId}><span${_scopeId}>Name</span><span class="capitalize text-right"${_scopeId}>${ssrInterpolate(unref(transaction).initiator.user.name)}</span></div><div class="flex justify-between gap-4"${_scopeId}><span${_scopeId}>Type</span><span class="capitalize text-right"${_scopeId}>${ssrInterpolate(unref(transaction).type)}</span></div><div class="flex justify-between gap-4"${_scopeId}><span${_scopeId}>Currency</span><span class="text-right"${_scopeId}>${ssrInterpolate(unref(transaction).currency)}</span></div><div class="flex justify-between gap-4"${_scopeId}><span${_scopeId}>Amount</span><span class="text-right"${_scopeId}>${ssrInterpolate(unref(transaction).amount)} ${ssrInterpolate(unref(transaction).currency)}</span></div><div class="flex justify-between gap-4"${_scopeId}><span${_scopeId}>Rate</span><span class="text-right"${_scopeId}>${ssrInterpolate(unref(transaction).rate)}</span></div><div class="flex justify-between gap-4"${_scopeId}><span${_scopeId}>Charges</span><span class="text-right"${_scopeId}>${ssrInterpolate(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(unref(transaction).charges))}</span></div>`);
              if (unref(transaction).bank) {
                _push2(`<div class="flex justify-between gap-4"${_scopeId}><span${_scopeId}>Bank</span><span class="text-right"${_scopeId}>${ssrInterpolate(unref(transaction).bank)}</span></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (unref(transaction).bankAccount) {
                _push2(`<div class="flex justify-between gap-4"${_scopeId}><span${_scopeId}>Bank Account</span><span class="text-right"${_scopeId}>${ssrInterpolate(unref(transaction).bankAccount)}</span></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (unref(transaction).depositWalletAddress) {
                _push2(`<div class="flex justify-between gap-4"${_scopeId}><span${_scopeId}>Wallet Address</span><span class="text-right"${_scopeId}>${ssrInterpolate(unref(transaction).depositWalletAddress)}</span></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (unref(transaction).depositWalletAddressNetwork) {
                _push2(`<div class="flex justify-between gap-4"${_scopeId}><span${_scopeId}>Wallet Address Network</span><span class="text-right"${_scopeId}>${ssrInterpolate(unref(transaction).depositWalletAddressNetwork)}</span></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (unref(transaction).withdrawalWalletAddress) {
                _push2(`<div class="flex justify-between gap-4"${_scopeId}><span${_scopeId}>Wallet Address</span><span class="text-right"${_scopeId}>${ssrInterpolate(unref(transaction).withdrawalWalletAddress)}</span></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (unref(transaction).withdrawalWalletAddressNetwork) {
                _push2(`<div class="flex justify-between gap-4"${_scopeId}><span${_scopeId}>Wallet Address Network</span><span class="text-right"${_scopeId}>${ssrInterpolate(unref(transaction).withdrawalWalletAddressNetwork)}</span></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (unref(transaction).description) {
                _push2(`<div class="flex justify-between gap-4"${_scopeId}><span${_scopeId}>Description</span><span class="text-right"${_scopeId}>${ssrInterpolate(unref(transaction).description)}</span></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
              _push2(ssrRenderComponent(_component_NuxtSeparator, { class: "my-4" }, null, _parent2, _scopeId));
              _push2(`<div${_scopeId}><small${_scopeId}><b${_scopeId}>Disclaimer</b>: This receipt is provided for informational purposes only. ${ssrInterpolate(unref(runtimeConfig).public.appName)} is not responsible for errors, omissions, or discrepancies. Please refer to your official account statement for authoritative records. </small></div></div><div class="flex gap-2 w-full md:w-[28rem]"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_NuxtButton, {
                label: "Save as PDF",
                variant: "outline",
                block: "",
                "loading-auto": "",
                onClick: ($event) => download("pdf")
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_NuxtButton, {
                label: "Save as image",
                block: "",
                "loading-auto": "",
                onClick: ($event) => download("img")
              }, null, _parent2, _scopeId));
              _push2(`</div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(transaction) ? (openBlock(), createBlock("div", { key: 0 }, [
                createVNode("div", { class: "flex flex-col items-center px-0 py-4 md:p-4 gap-4" }, [
                  createVNode("div", {
                    ref_key: "receipt",
                    ref: receipt,
                    class: "receipt border border-muted p-3 md:p-5 md:pb-8 w-full max-w-[28rem]"
                  }, [
                    createVNode("header", { class: "flex justify-end" }, [
                      createVNode("div", { class: "text-right flex flex-col items-end" }, [
                        createVNode(_component_AppLogo, { size: "38" }),
                        createVNode("p", { class: "text-primary text-sm font-semibold" }, toDisplayString(unref(runtimeConfig).public.appName), 1)
                      ])
                    ]),
                    createVNode("p", { class: "my-4 font-semibold text-center" }, "Transaction Receipt"),
                    createVNode("div", { class: "flex-col-center gap-2" }, [
                      createVNode(_component_NuxtBadge, {
                        color: "neutral",
                        variant: "soft",
                        label: unref(transaction).status
                      }, null, 8, ["label"]),
                      createVNode("p", { class: "font-geist-mono font-semibold text-4xl" }, toDisplayString(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(unref(transaction).USDAmount)), 1),
                      createVNode("p", { class: "text-sm text-muted" }, toDisplayString(unref(useDateFormat)(unref(transaction).createdAt, "MMM-DD-YYYY hh:mm aa")), 1)
                    ]),
                    createVNode(_component_NuxtSeparator, { class: "my-4" }),
                    createVNode("div", { class: "space-y-2 *:p-1 text-[0.9rem]" }, [
                      createVNode("div", { class: "flex justify-between gap-4" }, [
                        createVNode("span", null, "Name"),
                        createVNode("span", { class: "capitalize text-right" }, toDisplayString(unref(transaction).initiator.user.name), 1)
                      ]),
                      createVNode("div", { class: "flex justify-between gap-4" }, [
                        createVNode("span", null, "Type"),
                        createVNode("span", { class: "capitalize text-right" }, toDisplayString(unref(transaction).type), 1)
                      ]),
                      createVNode("div", { class: "flex justify-between gap-4" }, [
                        createVNode("span", null, "Currency"),
                        createVNode("span", { class: "text-right" }, toDisplayString(unref(transaction).currency), 1)
                      ]),
                      createVNode("div", { class: "flex justify-between gap-4" }, [
                        createVNode("span", null, "Amount"),
                        createVNode("span", { class: "text-right" }, toDisplayString(unref(transaction).amount) + " " + toDisplayString(unref(transaction).currency), 1)
                      ]),
                      createVNode("div", { class: "flex justify-between gap-4" }, [
                        createVNode("span", null, "Rate"),
                        createVNode("span", { class: "text-right" }, toDisplayString(unref(transaction).rate), 1)
                      ]),
                      createVNode("div", { class: "flex justify-between gap-4" }, [
                        createVNode("span", null, "Charges"),
                        createVNode("span", { class: "text-right" }, toDisplayString(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(unref(transaction).charges)), 1)
                      ]),
                      unref(transaction).bank ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "flex justify-between gap-4"
                      }, [
                        createVNode("span", null, "Bank"),
                        createVNode("span", { class: "text-right" }, toDisplayString(unref(transaction).bank), 1)
                      ])) : createCommentVNode("", true),
                      unref(transaction).bankAccount ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "flex justify-between gap-4"
                      }, [
                        createVNode("span", null, "Bank Account"),
                        createVNode("span", { class: "text-right" }, toDisplayString(unref(transaction).bankAccount), 1)
                      ])) : createCommentVNode("", true),
                      unref(transaction).depositWalletAddress ? (openBlock(), createBlock("div", {
                        key: 2,
                        class: "flex justify-between gap-4"
                      }, [
                        createVNode("span", null, "Wallet Address"),
                        createVNode("span", { class: "text-right" }, toDisplayString(unref(transaction).depositWalletAddress), 1)
                      ])) : createCommentVNode("", true),
                      unref(transaction).depositWalletAddressNetwork ? (openBlock(), createBlock("div", {
                        key: 3,
                        class: "flex justify-between gap-4"
                      }, [
                        createVNode("span", null, "Wallet Address Network"),
                        createVNode("span", { class: "text-right" }, toDisplayString(unref(transaction).depositWalletAddressNetwork), 1)
                      ])) : createCommentVNode("", true),
                      unref(transaction).withdrawalWalletAddress ? (openBlock(), createBlock("div", {
                        key: 4,
                        class: "flex justify-between gap-4"
                      }, [
                        createVNode("span", null, "Wallet Address"),
                        createVNode("span", { class: "text-right" }, toDisplayString(unref(transaction).withdrawalWalletAddress), 1)
                      ])) : createCommentVNode("", true),
                      unref(transaction).withdrawalWalletAddressNetwork ? (openBlock(), createBlock("div", {
                        key: 5,
                        class: "flex justify-between gap-4"
                      }, [
                        createVNode("span", null, "Wallet Address Network"),
                        createVNode("span", { class: "text-right" }, toDisplayString(unref(transaction).withdrawalWalletAddressNetwork), 1)
                      ])) : createCommentVNode("", true),
                      unref(transaction).description ? (openBlock(), createBlock("div", {
                        key: 6,
                        class: "flex justify-between gap-4"
                      }, [
                        createVNode("span", null, "Description"),
                        createVNode("span", { class: "text-right" }, toDisplayString(unref(transaction).description), 1)
                      ])) : createCommentVNode("", true)
                    ]),
                    createVNode(_component_NuxtSeparator, { class: "my-4" }),
                    createVNode("div", null, [
                      createVNode("small", null, [
                        createVNode("b", null, "Disclaimer"),
                        createTextVNode(": This receipt is provided for informational purposes only. " + toDisplayString(unref(runtimeConfig).public.appName) + " is not responsible for errors, omissions, or discrepancies. Please refer to your official account statement for authoritative records. ", 1)
                      ])
                    ])
                  ], 512),
                  createVNode("div", { class: "flex gap-2 w-full md:w-[28rem]" }, [
                    createVNode(_component_NuxtButton, {
                      label: "Save as PDF",
                      variant: "outline",
                      block: "",
                      "loading-auto": "",
                      onClick: ($event) => download("pdf")
                    }, null, 8, ["onClick"]),
                    createVNode(_component_NuxtButton, {
                      label: "Save as image",
                      block: "",
                      "loading-auto": "",
                      onClick: ($event) => download("img")
                    }, null, 8, ["onClick"])
                  ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/user/accounts/[accountId]/transactions/[transactionId].client.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_transactionId_.client-Btu6gLsd.mjs.map
