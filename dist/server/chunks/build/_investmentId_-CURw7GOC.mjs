import { _ as __nuxt_component_0 } from './my-page-D-1fCn2X.mjs';
import { _ as _sfc_main$2 } from './Badge-Cc8D9XvB.mjs';
import { e as useToast, f as _sfc_main$4, a as _sfc_main$a, i as _sfc_main$d, Q as useRoute, S as useRouter, b as _sfc_main$f, n as navigateTo } from './server.mjs';
import { _ as _sfc_main$3 } from './Alert-Dos-p4_r.mjs';
import { _ as _sfc_main$5 } from './Form-bNvz49n8.mjs';
import { _ as _sfc_main$6 } from './FormField-BuvMUjfY.mjs';
import { _ as _sfc_main$7 } from './Textarea-DNKj0TkT.mjs';
import { _ as _sfc_main$8 } from './Card-CQrSn9c-.mjs';
import { _ as __nuxt_component_14 } from './fetch-error-alert-3QlR-5z-.mjs';
import { _ as _sfc_main$9 } from './Table-exspLtB-.mjs';
import { _ as _sfc_main$b } from './Pagination-DSFKFBOo.mjs';
import { defineComponent, withAsyncContext, computed, reactive, ref, mergeProps, unref, withCtx, isRef, createSlots, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode, withModifiers, createTextVNode, Fragment, renderList, h, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { useDateFormat } from '@vueuse/core';
import { a8 as normalizeException } from '../_/nitro.mjs';
import { u as useRouteData } from './use-route-data-BkNqHoWD.mjs';
import { u as useFetch } from './fetch-CSk15cWP.mjs';
import { t as toDollar } from './to-dollar-DdS_9tlH.mjs';
import { a as getTransactionBadgeColor } from './transaction-BkPO0uYy.mjs';
import { t as toCase } from './to-case-ChuH9uWD.mjs';
import { a as getInvestmentStatusIcon, g as getInvestmentStatusBadgeColor } from './investment-CJjcSFHl.mjs';
import z from 'zod';
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
import '@tanstack/vue-table';
import '@vue/shared';
import './ssr-CXDHmH_F.mjs';

const limit = 20;
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "investment-profits",
  __ssrInlineRender: true,
  props: {
    investmentId: {},
    profitCount: {}
  },
  setup(__props) {
    const accountId = useRouteData().getParams("accountId");
    const route = useRoute();
    const router = useRouter();
    const page = computed({
      get: () => Number(route.query.page || 1),
      set: (val) => {
        router.replace({ query: { ...route.query, page: val } });
      }
    });
    const query = computed(() => ({ page: page.value, limit }));
    const { pending, data, error, refresh } = useFetch(
      `/api/user/financial-accounts/${accountId}/investments/${__props.investmentId}/profits`,
      {
        query
      },
      "$jjJ4ab_tf6"
      /* nuxt-injected */
    );
    const profits = computed(() => {
      return data.value?.map((txn) => {
        return {
          id: txn.id,
          amount: txn.USDAmount,
          status: txn.status,
          date: txn.createdAt
        };
      }) ?? [];
    });
    const Badge = _sfc_main$2;
    const columns = [
      {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }) => {
          const id = row.getValue("id") || "";
          return id.length > 12 ? id.slice(0, 12).toUpperCase() + "..." : id;
        }
      },
      {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }) => toDollar(row.getValue("amount"))
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const color = getTransactionBadgeColor(row.getValue("status"));
          return h(
            Badge,
            { variant: "subtle", color },
            () => row.getValue("status")
          );
        }
      },
      {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => useDateFormat(row.getValue("date"), "MMM DD, YYYY").value
      }
    ];
    async function onSelect(row) {
      const transactionId = row.getValue("id");
      await navigateTo(`/user/accounts/${accountId}/transactions/${transactionId}`);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtCard = _sfc_main$8;
      const _component_NuxtIcon = _sfc_main$f;
      const _component_FetchErrorAlert = __nuxt_component_14;
      const _component_NuxtTable = _sfc_main$9;
      const _component_NuxtPagination = _sfc_main$b;
      _push(ssrRenderComponent(_component_NuxtCard, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<header${_scopeId}><p class="card-title"${_scopeId}>Profits</p></header><div class="mt-4 flex overflow-auto"${_scopeId}>`);
            if (unref(pending)) {
              _push2(`<div class="flex-center"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_NuxtIcon, {
                name: "lucide:loader",
                size: "2rem",
                class: "animate animate-spin"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else if (unref(error)) {
              _push2(ssrRenderComponent(_component_FetchErrorAlert, {
                message: unref(normalizeException)(unref(error)).message,
                "show-retry": "",
                onRetry: ($event) => unref(refresh)()
              }, null, _parent2, _scopeId));
            } else if (unref(data)) {
              _push2(ssrRenderComponent(_component_NuxtTable, {
                data: unref(profits),
                columns,
                loading: unref(pending),
                class: "w-full",
                onSelect
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="flex justify-center border-t border-default pt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtPagination, {
              page: unref(page),
              "onUpdate:page": ($event) => isRef(page) ? page.value = $event : null,
              total: __props.profitCount,
              "items-per-page": limit,
              "show-edges": ""
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("header", null, [
                createVNode("p", { class: "card-title" }, "Profits")
              ]),
              createVNode("div", { class: "mt-4 flex overflow-auto" }, [
                unref(pending) ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "flex-center"
                }, [
                  createVNode(_component_NuxtIcon, {
                    name: "lucide:loader",
                    size: "2rem",
                    class: "animate animate-spin"
                  })
                ])) : unref(error) ? (openBlock(), createBlock(_component_FetchErrorAlert, {
                  key: 1,
                  message: unref(normalizeException)(unref(error)).message,
                  "show-retry": "",
                  onRetry: ($event) => unref(refresh)()
                }, null, 8, ["message", "onRetry"])) : unref(data) ? (openBlock(), createBlock(_component_NuxtTable, {
                  key: 2,
                  data: unref(profits),
                  columns,
                  loading: unref(pending),
                  class: "w-full",
                  onSelect
                }, null, 8, ["data", "loading"])) : createCommentVNode("", true)
              ]),
              createVNode("div", { class: "flex justify-center border-t border-default pt-4" }, [
                createVNode(_component_NuxtPagination, {
                  page: unref(page),
                  "onUpdate:page": ($event) => isRef(page) ? page.value = $event : null,
                  total: __props.profitCount,
                  "items-per-page": limit,
                  "show-edges": ""
                }, null, 8, ["page", "onUpdate:page", "total"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/user/investment-profits.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_10 = Object.assign(_sfc_main$1, { __name: "UserInvestmentProfits" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[investmentId]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const toast = useToast();
    const [accountId, investmentId] = useRouteData().getParams([
      "accountId",
      "investmentId"
    ]);
    const { data, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `/api/user/financial-accounts/${accountId}/investments/${investmentId}`,
      "$XTwfnijIFY"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const investment = computed(() => {
      return {
        ...data.value?.investment,
        lastProfit: data.value?.investment.transactions[0]
      };
    });
    const estimatedReturn = computed(
      () => data.value?.investment?.profits?.reduce(
        (acc, curr) => acc + curr.actualAmount,
        0
      ) ?? 0
    );
    const cards = computed(() => {
      if (!investment.value) return [];
      let statusDescription = "";
      const noData = "No data available";
      switch (investment.value.status) {
        case "open":
          statusDescription = investment.value.createdAt ? `Opened at ${date(investment.value.createdAt)}` : noData;
          break;
        case "closed":
          statusDescription = investment.value.closedAt ? `Closed at ${date(investment.value.closedAt)}` : noData;
          break;
        case "paused":
          statusDescription = investment.value.pausedAt ? `Paused at ${date(investment.value.pausedAt)}` : noData;
          break;
        case "terminated":
          statusDescription = investment.value.terminatedAt ? `Terminated at ${date(investment.value.terminatedAt)}` : noData;
          break;
        default:
          statusDescription = noData;
          break;
      }
      function date(value) {
        return useDateFormat(value, "MMM-DD-YYYY hh:mm aa").value;
      }
      return [
        {
          label: "Deposit Amount",
          value: toDollar(investment.value.deposit ?? 0),
          description: "Investment capital",
          icon: "lucide:coins",
          badgeColor: "neutral",
          class: "bg-primary-500 text-white"
        },
        {
          label: "Total Returns: Initial Estimate",
          value: toDollar(
            (investment.value.totalReturn ?? 0) / 100 * (investment.value.deposit ?? 0)
          ),
          description: `${investment.value.totalReturn ?? 0}% of deposit`,
          icon: "lucide:coins",
          badgeColor: "primary"
        },
        {
          label: "Total Returns: Current Estimate",
          value: toDollar(estimatedReturn.value),
          description: "Based on profits and losses",
          icon: estimatedReturn.value < (investment.value.totalReturn ?? 0) ? "lucide:trending-down" : "lucide:trending-up",
          badgeColor: estimatedReturn.value < (investment.value.totalReturn ?? 0) ? "error" : "success"
        },
        {
          label: "Investment Health",
          value: estimatedReturn.value < (investment.value.deposit ?? 0) ? "Loss" : "Profit",
          description: estimatedReturn.value < (investment.value.deposit ?? 0) ? "Est. return less than deposit" : "Est. return higher than deposit",
          icon: "lucide:pie-chart",
          badgeColor: estimatedReturn.value < (investment.value.deposit ?? 0) ? "error" : "success"
        },
        {
          label: "Current Total Returns",
          value: toDollar(investment.value.totalProfit ?? 0),
          description: `Distributed ${toCase(
            investment.value.profitDistribution ?? "",
            "lower"
          )}`,
          icon: "lucide:flower",
          badgeColor: "success"
        },
        {
          label: "Last Trade",
          value: toDollar(investment.value.lastProfit?.USDAmount ?? 0),
          description: investment.value.lastProfit?.createdAt ? useDateFormat(
            investment.value.lastProfit?.createdAt,
            "MMM-DD-YYYY, hh:mm aa"
          ).value : `No profit yet`,
          icon: "lucide:hand-coins",
          badgeColor: "error"
        },
        {
          label: "Duration",
          value: `${investment.value.daysCompleted}/${investment.value.duration}`,
          suffix: "days",
          description: "Days completed",
          icon: "lucide:clock",
          badgeColor: "primary"
        },
        {
          label: "Status",
          value: toCase(investment.value.status ?? "", "sentence"),
          description: statusDescription,
          icon: "lucide:info",
          badgeColor: "warning"
        }
      ];
    });
    const schema = z.object({
      terminatedReason: z.string("Reason is required").nonempty("Reason is required.").trim()
    });
    const state = reactive({ terminatedReason: "" });
    const open = ref(false);
    const handleSubmit = async (event) => {
      try {
        const res = await $fetch(
          `/api/user/financial-accounts/${accountId}/investments/${investmentId}/terminate`,
          {
            method: "put",
            body: event.data
          }
        );
        toast.add({
          color: "success",
          title: "Success",
          description: res.message
        });
        refresh();
        open.value = false;
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
      const _component_NuxtBadge = _sfc_main$2;
      const _component_NuxtModal = _sfc_main$4;
      const _component_NuxtButton = _sfc_main$a;
      const _component_NuxtAlert = _sfc_main$3;
      const _component_NuxtForm = _sfc_main$5;
      const _component_NuxtFormField = _sfc_main$6;
      const _component_NuxtTextarea = _sfc_main$7;
      const _component_NuxtAvatar = _sfc_main$d;
      const _component_NuxtCard = _sfc_main$8;
      const _component_UserInvestmentProfits = __nuxt_component_10;
      _push(ssrRenderComponent(_component_MyPage, mergeProps({
        error: unref(error),
        onRefresh: () => unref(refresh)()
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(investment)) {
              _push2(`<div class="mb-4"${_scopeId}><header class="flex items-center gap-4 justify-between"${_scopeId}><div class="space-y-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_NuxtBadge, {
                label: ("toCase" in _ctx ? _ctx.toCase : unref(toCase))(unref(investment).category ?? "", "sentence"),
                color: "neutral",
                variant: "outline"
              }, null, _parent2, _scopeId));
              _push2(`<div class="flex flex-wrap gap-2"${_scopeId}><h1 class="text-2xl font-semibold"${_scopeId}>${ssrInterpolate(unref(investment).investmentName)}</h1>`);
              _push2(ssrRenderComponent(_component_NuxtBadge, {
                label: unref(investment).status,
                color: ("getInvestmentStatusBadgeColor" in _ctx ? _ctx.getInvestmentStatusBadgeColor : unref(getInvestmentStatusBadgeColor))(unref(investment).status ?? ""),
                icon: ("getInvestmentStatusIcon" in _ctx ? _ctx.getInvestmentStatusIcon : unref(getInvestmentStatusIcon))(unref(investment).status ?? ""),
                variant: "subtle"
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_NuxtModal, {
                open: unref(open),
                "onUpdate:open": ($event) => isRef(open) ? open.value = $event : null,
                title: "Investment Details",
                description: unref(investment).investmentName,
                dismissible: false
              }, createSlots({
                body: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="space-y-4"${_scopeId2}><header class="flex-col-center gap-1"${_scopeId2}><p class="text-2xl font-semibold"${_scopeId2}>${ssrInterpolate(unref(investment).investmentName)}</p><p class="capitalize card-title"${_scopeId2}>${ssrInterpolate(("toCase" in _ctx ? _ctx.toCase : unref(toCase))(unref(investment).category ?? "", "sentence"))}</p>`);
                    _push3(ssrRenderComponent(_component_NuxtBadge, {
                      label: ("toCase" in _ctx ? _ctx.toCase : unref(toCase))(unref(investment).status ?? "", "lower"),
                      color: ("getInvestmentStatusBadgeColor" in _ctx ? _ctx.getInvestmentStatusBadgeColor : unref(getInvestmentStatusBadgeColor))(unref(investment).status ?? ""),
                      icon: ("getInvestmentStatusIcon" in _ctx ? _ctx.getInvestmentStatusIcon : unref(getInvestmentStatusIcon))(unref(investment).status ?? ""),
                      variant: "subtle"
                    }, null, _parent3, _scopeId2));
                    _push3(`<p class="text-xs mt-2"${_scopeId2}> Opened ${ssrInterpolate(unref(useDateFormat)(
                      unref(investment).createdAt,
                      "MMM-DD-YYYY, hh:mm aa"
                    ))}</p></header><div${_scopeId2}>`);
                    if (unref(investment).pausedAt) {
                      _push3(`<div${_scopeId2}><p class="card-title"${_scopeId2}>Paused on</p><p${_scopeId2}>${ssrInterpolate(unref(useDateFormat)(
                        unref(investment).pausedAt,
                        "MMM-DD-YYYY, hh:mm aa"
                      ))}</p></div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    if (unref(investment).pausedReason) {
                      _push3(`<div${_scopeId2}><p class="card-title"${_scopeId2}>Reason for pause</p><p${_scopeId2}>${ssrInterpolate(unref(investment).pausedReason)}</p></div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    if (unref(investment).closedAt) {
                      _push3(`<div${_scopeId2}><p class="card-title"${_scopeId2}>Closed on</p><p${_scopeId2}>${ssrInterpolate(unref(useDateFormat)(
                        unref(investment).closedAt,
                        "MMM-DD-YYYY, hh:mm aa"
                      ))}</p></div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    if (unref(investment).closedReason) {
                      _push3(`<div${_scopeId2}><p class="card-title"${_scopeId2}>Reason for closure</p><p${_scopeId2}>${ssrInterpolate(unref(investment).closedReason)}</p></div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    if (unref(investment).terminatedAt) {
                      _push3(`<div${_scopeId2}><p class="card-title"${_scopeId2}>Terminated on</p><p${_scopeId2}>${ssrInterpolate(unref(useDateFormat)(
                        unref(investment).terminatedAt,
                        "MMM-DD-YYYY, hh:mm aa"
                      ))}</p></div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    if (unref(investment).terminatedReason) {
                      _push3(`<div${_scopeId2}><p class="card-title"${_scopeId2}>Reason for termination</p><p${_scopeId2}>${ssrInterpolate(unref(investment).terminatedReason)}</p></div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "space-y-4" }, [
                        createVNode("header", { class: "flex-col-center gap-1" }, [
                          createVNode("p", { class: "text-2xl font-semibold" }, toDisplayString(unref(investment).investmentName), 1),
                          createVNode("p", { class: "capitalize card-title" }, toDisplayString(("toCase" in _ctx ? _ctx.toCase : unref(toCase))(unref(investment).category ?? "", "sentence")), 1),
                          createVNode(_component_NuxtBadge, {
                            label: ("toCase" in _ctx ? _ctx.toCase : unref(toCase))(unref(investment).status ?? "", "lower"),
                            color: ("getInvestmentStatusBadgeColor" in _ctx ? _ctx.getInvestmentStatusBadgeColor : unref(getInvestmentStatusBadgeColor))(unref(investment).status ?? ""),
                            icon: ("getInvestmentStatusIcon" in _ctx ? _ctx.getInvestmentStatusIcon : unref(getInvestmentStatusIcon))(unref(investment).status ?? ""),
                            variant: "subtle"
                          }, null, 8, ["label", "color", "icon"]),
                          createVNode("p", { class: "text-xs mt-2" }, " Opened " + toDisplayString(unref(useDateFormat)(
                            unref(investment).createdAt,
                            "MMM-DD-YYYY, hh:mm aa"
                          )), 1)
                        ]),
                        createVNode("div", null, [
                          unref(investment).pausedAt ? (openBlock(), createBlock("div", { key: 0 }, [
                            createVNode("p", { class: "card-title" }, "Paused on"),
                            createVNode("p", null, toDisplayString(unref(useDateFormat)(
                              unref(investment).pausedAt,
                              "MMM-DD-YYYY, hh:mm aa"
                            )), 1)
                          ])) : createCommentVNode("", true),
                          unref(investment).pausedReason ? (openBlock(), createBlock("div", { key: 1 }, [
                            createVNode("p", { class: "card-title" }, "Reason for pause"),
                            createVNode("p", null, toDisplayString(unref(investment).pausedReason), 1)
                          ])) : createCommentVNode("", true),
                          unref(investment).closedAt ? (openBlock(), createBlock("div", { key: 2 }, [
                            createVNode("p", { class: "card-title" }, "Closed on"),
                            createVNode("p", null, toDisplayString(unref(useDateFormat)(
                              unref(investment).closedAt,
                              "MMM-DD-YYYY, hh:mm aa"
                            )), 1)
                          ])) : createCommentVNode("", true),
                          unref(investment).closedReason ? (openBlock(), createBlock("div", { key: 3 }, [
                            createVNode("p", { class: "card-title" }, "Reason for closure"),
                            createVNode("p", null, toDisplayString(unref(investment).closedReason), 1)
                          ])) : createCommentVNode("", true),
                          unref(investment).terminatedAt ? (openBlock(), createBlock("div", { key: 4 }, [
                            createVNode("p", { class: "card-title" }, "Terminated on"),
                            createVNode("p", null, toDisplayString(unref(useDateFormat)(
                              unref(investment).terminatedAt,
                              "MMM-DD-YYYY, hh:mm aa"
                            )), 1)
                          ])) : createCommentVNode("", true),
                          unref(investment).terminatedReason ? (openBlock(), createBlock("div", { key: 5 }, [
                            createVNode("p", { class: "card-title" }, "Reason for termination"),
                            createVNode("p", null, toDisplayString(unref(investment).terminatedReason), 1)
                          ])) : createCommentVNode("", true)
                        ])
                      ])
                    ];
                  }
                }),
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_NuxtButton, {
                      label: "More",
                      size: "sm",
                      variant: "subtle",
                      "trailing-icon": "lucide:ellipsis"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_NuxtButton, {
                        label: "More",
                        size: "sm",
                        variant: "subtle",
                        "trailing-icon": "lucide:ellipsis"
                      })
                    ];
                  }
                }),
                _: 2
              }, [
                unref(investment).status === "open" || unref(investment).status === "paused" ? {
                  name: "footer",
                  fn: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div class="space-y-2 w-full"${_scopeId2}><p class="text-error-500"${_scopeId2}>Terminate Investment</p>`);
                      _push3(ssrRenderComponent(_component_NuxtAlert, {
                        description: `Terminating this investment incurs a termination fee of ${("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(
                          unref(investment)?.terminationFee ?? 0
                        )}, and cannot be undone. Be sure you want to proceed.`,
                        icon: "lucide:circle-x",
                        color: "error",
                        variant: "subtle"
                      }, null, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_NuxtForm, {
                        state: unref(state),
                        schema: unref(schema),
                        class: "space-y-2",
                        onSubmit: handleSubmit
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_component_NuxtFormField, {
                              name: "terminatedReason",
                              label: "Reason for terminating the investment",
                              required: ""
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(_component_NuxtTextarea, {
                                    modelValue: unref(state).terminatedReason,
                                    "onUpdate:modelValue": ($event) => unref(state).terminatedReason = $event,
                                    autoresize: "",
                                    maxrows: 3,
                                    class: "w-full"
                                  }, null, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode(_component_NuxtTextarea, {
                                      modelValue: unref(state).terminatedReason,
                                      "onUpdate:modelValue": ($event) => unref(state).terminatedReason = $event,
                                      autoresize: "",
                                      maxrows: 3,
                                      class: "w-full"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ];
                                }
                              }),
                              _: 1
                            }, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(_component_NuxtButton, {
                              type: "submit",
                              label: "Terminate",
                              color: "error",
                              "loading-auto": ""
                            }, null, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(_component_NuxtFormField, {
                                name: "terminatedReason",
                                label: "Reason for terminating the investment",
                                required: ""
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_NuxtTextarea, {
                                    modelValue: unref(state).terminatedReason,
                                    "onUpdate:modelValue": ($event) => unref(state).terminatedReason = $event,
                                    autoresize: "",
                                    maxrows: 3,
                                    class: "w-full"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              }),
                              createVNode(_component_NuxtButton, {
                                type: "submit",
                                label: "Terminate",
                                color: "error",
                                "loading-auto": ""
                              })
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(`</div>`);
                    } else {
                      return [
                        createVNode("div", { class: "space-y-2 w-full" }, [
                          createVNode("p", { class: "text-error-500" }, "Terminate Investment"),
                          createVNode(_component_NuxtAlert, {
                            description: `Terminating this investment incurs a termination fee of ${("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(
                              unref(investment)?.terminationFee ?? 0
                            )}, and cannot be undone. Be sure you want to proceed.`,
                            icon: "lucide:circle-x",
                            color: "error",
                            variant: "subtle"
                          }, null, 8, ["description"]),
                          createVNode(_component_NuxtForm, {
                            state: unref(state),
                            schema: unref(schema),
                            class: "space-y-2",
                            onSubmit: withModifiers(handleSubmit, ["prevent"])
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_NuxtFormField, {
                                name: "terminatedReason",
                                label: "Reason for terminating the investment",
                                required: ""
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_NuxtTextarea, {
                                    modelValue: unref(state).terminatedReason,
                                    "onUpdate:modelValue": ($event) => unref(state).terminatedReason = $event,
                                    autoresize: "",
                                    maxrows: 3,
                                    class: "w-full"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              }),
                              createVNode(_component_NuxtButton, {
                                type: "submit",
                                label: "Terminate",
                                color: "error",
                                "loading-auto": ""
                              })
                            ]),
                            _: 1
                          }, 8, ["state", "schema"])
                        ])
                      ];
                    }
                  }),
                  key: "0"
                } : void 0
              ]), _parent2, _scopeId));
              _push2(`</div><div class="flex items-center gap-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_NuxtAvatar, {
                src: unref(investment).investor?.user?.image ?? void 0,
                alt: unref(investment).investor?.user?.name,
                size: "lg"
              }, null, _parent2, _scopeId));
              _push2(`<div${_scopeId}><p class="text-xs text-muted"${_scopeId}>Created by</p><p class="card-title"${_scopeId}>${ssrInterpolate(unref(investment).investor?.user?.name)}</p></div></div></div></header><div class="mt-6 space-y-4"${_scopeId}><div class="grid gap-4 md:grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] xl:grid-cols-4"${_scopeId}><!--[-->`);
              ssrRenderList(unref(cards), (card) => {
                _push2(ssrRenderComponent(_component_NuxtCard, {
                  key: card.label,
                  class: card.class
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<header${_scopeId2}><p class="${ssrRenderClass([card.class ? "text-white" : "", "card-title"])}"${_scopeId2}>${ssrInterpolate(card.label)}</p></header><div class="mt-2 text-2xl font-semibold font-geist-mono"${_scopeId2}>${ssrInterpolate(card.value)} `);
                      if (card.suffix) {
                        _push3(`<span class="text-sm"${_scopeId2}>${ssrInterpolate(card.suffix)}</span>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`</div><footer class="mt-2"${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_NuxtBadge, {
                        color: card.badgeColor,
                        variant: "soft",
                        class: "mr-2 dark:bg-white dark:text-primary",
                        icon: card.icon
                      }, null, _parent3, _scopeId2));
                      _push3(`<small${_scopeId2}>${ssrInterpolate(card.description)}</small></footer>`);
                    } else {
                      return [
                        createVNode("header", null, [
                          createVNode("p", {
                            class: ["card-title", card.class ? "text-white" : ""]
                          }, toDisplayString(card.label), 3)
                        ]),
                        createVNode("div", { class: "mt-2 text-2xl font-semibold font-geist-mono" }, [
                          createTextVNode(toDisplayString(card.value) + " ", 1),
                          card.suffix ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "text-sm"
                          }, toDisplayString(card.suffix), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("footer", { class: "mt-2" }, [
                          createVNode(_component_NuxtBadge, {
                            color: card.badgeColor,
                            variant: "soft",
                            class: "mr-2 dark:bg-white dark:text-primary",
                            icon: card.icon
                          }, null, 8, ["color", "icon"]),
                          createVNode("small", null, toDisplayString(card.description), 1)
                        ])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]--></div>`);
              if (unref(investmentId)) {
                _push2(ssrRenderComponent(_component_UserInvestmentProfits, {
                  "investment-id": unref(investmentId),
                  "profit-count": unref(investment).profitCount ?? 1e4
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(investment) ? (openBlock(), createBlock("div", {
                key: 0,
                class: "mb-4"
              }, [
                createVNode("header", { class: "flex items-center gap-4 justify-between" }, [
                  createVNode("div", { class: "space-y-2" }, [
                    createVNode(_component_NuxtBadge, {
                      label: ("toCase" in _ctx ? _ctx.toCase : unref(toCase))(unref(investment).category ?? "", "sentence"),
                      color: "neutral",
                      variant: "outline"
                    }, null, 8, ["label"]),
                    createVNode("div", { class: "flex flex-wrap gap-2" }, [
                      createVNode("h1", { class: "text-2xl font-semibold" }, toDisplayString(unref(investment).investmentName), 1),
                      createVNode(_component_NuxtBadge, {
                        label: unref(investment).status,
                        color: ("getInvestmentStatusBadgeColor" in _ctx ? _ctx.getInvestmentStatusBadgeColor : unref(getInvestmentStatusBadgeColor))(unref(investment).status ?? ""),
                        icon: ("getInvestmentStatusIcon" in _ctx ? _ctx.getInvestmentStatusIcon : unref(getInvestmentStatusIcon))(unref(investment).status ?? ""),
                        variant: "subtle"
                      }, null, 8, ["label", "color", "icon"]),
                      createVNode(_component_NuxtModal, {
                        open: unref(open),
                        "onUpdate:open": ($event) => isRef(open) ? open.value = $event : null,
                        title: "Investment Details",
                        description: unref(investment).investmentName,
                        dismissible: false
                      }, createSlots({
                        body: withCtx(() => [
                          createVNode("div", { class: "space-y-4" }, [
                            createVNode("header", { class: "flex-col-center gap-1" }, [
                              createVNode("p", { class: "text-2xl font-semibold" }, toDisplayString(unref(investment).investmentName), 1),
                              createVNode("p", { class: "capitalize card-title" }, toDisplayString(("toCase" in _ctx ? _ctx.toCase : unref(toCase))(unref(investment).category ?? "", "sentence")), 1),
                              createVNode(_component_NuxtBadge, {
                                label: ("toCase" in _ctx ? _ctx.toCase : unref(toCase))(unref(investment).status ?? "", "lower"),
                                color: ("getInvestmentStatusBadgeColor" in _ctx ? _ctx.getInvestmentStatusBadgeColor : unref(getInvestmentStatusBadgeColor))(unref(investment).status ?? ""),
                                icon: ("getInvestmentStatusIcon" in _ctx ? _ctx.getInvestmentStatusIcon : unref(getInvestmentStatusIcon))(unref(investment).status ?? ""),
                                variant: "subtle"
                              }, null, 8, ["label", "color", "icon"]),
                              createVNode("p", { class: "text-xs mt-2" }, " Opened " + toDisplayString(unref(useDateFormat)(
                                unref(investment).createdAt,
                                "MMM-DD-YYYY, hh:mm aa"
                              )), 1)
                            ]),
                            createVNode("div", null, [
                              unref(investment).pausedAt ? (openBlock(), createBlock("div", { key: 0 }, [
                                createVNode("p", { class: "card-title" }, "Paused on"),
                                createVNode("p", null, toDisplayString(unref(useDateFormat)(
                                  unref(investment).pausedAt,
                                  "MMM-DD-YYYY, hh:mm aa"
                                )), 1)
                              ])) : createCommentVNode("", true),
                              unref(investment).pausedReason ? (openBlock(), createBlock("div", { key: 1 }, [
                                createVNode("p", { class: "card-title" }, "Reason for pause"),
                                createVNode("p", null, toDisplayString(unref(investment).pausedReason), 1)
                              ])) : createCommentVNode("", true),
                              unref(investment).closedAt ? (openBlock(), createBlock("div", { key: 2 }, [
                                createVNode("p", { class: "card-title" }, "Closed on"),
                                createVNode("p", null, toDisplayString(unref(useDateFormat)(
                                  unref(investment).closedAt,
                                  "MMM-DD-YYYY, hh:mm aa"
                                )), 1)
                              ])) : createCommentVNode("", true),
                              unref(investment).closedReason ? (openBlock(), createBlock("div", { key: 3 }, [
                                createVNode("p", { class: "card-title" }, "Reason for closure"),
                                createVNode("p", null, toDisplayString(unref(investment).closedReason), 1)
                              ])) : createCommentVNode("", true),
                              unref(investment).terminatedAt ? (openBlock(), createBlock("div", { key: 4 }, [
                                createVNode("p", { class: "card-title" }, "Terminated on"),
                                createVNode("p", null, toDisplayString(unref(useDateFormat)(
                                  unref(investment).terminatedAt,
                                  "MMM-DD-YYYY, hh:mm aa"
                                )), 1)
                              ])) : createCommentVNode("", true),
                              unref(investment).terminatedReason ? (openBlock(), createBlock("div", { key: 5 }, [
                                createVNode("p", { class: "card-title" }, "Reason for termination"),
                                createVNode("p", null, toDisplayString(unref(investment).terminatedReason), 1)
                              ])) : createCommentVNode("", true)
                            ])
                          ])
                        ]),
                        default: withCtx(() => [
                          createVNode(_component_NuxtButton, {
                            label: "More",
                            size: "sm",
                            variant: "subtle",
                            "trailing-icon": "lucide:ellipsis"
                          })
                        ]),
                        _: 2
                      }, [
                        unref(investment).status === "open" || unref(investment).status === "paused" ? {
                          name: "footer",
                          fn: withCtx(() => [
                            createVNode("div", { class: "space-y-2 w-full" }, [
                              createVNode("p", { class: "text-error-500" }, "Terminate Investment"),
                              createVNode(_component_NuxtAlert, {
                                description: `Terminating this investment incurs a termination fee of ${("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(
                                  unref(investment)?.terminationFee ?? 0
                                )}, and cannot be undone. Be sure you want to proceed.`,
                                icon: "lucide:circle-x",
                                color: "error",
                                variant: "subtle"
                              }, null, 8, ["description"]),
                              createVNode(_component_NuxtForm, {
                                state: unref(state),
                                schema: unref(schema),
                                class: "space-y-2",
                                onSubmit: withModifiers(handleSubmit, ["prevent"])
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_NuxtFormField, {
                                    name: "terminatedReason",
                                    label: "Reason for terminating the investment",
                                    required: ""
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_NuxtTextarea, {
                                        modelValue: unref(state).terminatedReason,
                                        "onUpdate:modelValue": ($event) => unref(state).terminatedReason = $event,
                                        autoresize: "",
                                        maxrows: 3,
                                        class: "w-full"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_NuxtButton, {
                                    type: "submit",
                                    label: "Terminate",
                                    color: "error",
                                    "loading-auto": ""
                                  })
                                ]),
                                _: 1
                              }, 8, ["state", "schema"])
                            ])
                          ]),
                          key: "0"
                        } : void 0
                      ]), 1032, ["open", "onUpdate:open", "description"])
                    ]),
                    createVNode("div", { class: "flex items-center gap-2" }, [
                      createVNode(_component_NuxtAvatar, {
                        src: unref(investment).investor?.user?.image ?? void 0,
                        alt: unref(investment).investor?.user?.name,
                        size: "lg"
                      }, null, 8, ["src", "alt"]),
                      createVNode("div", null, [
                        createVNode("p", { class: "text-xs text-muted" }, "Created by"),
                        createVNode("p", { class: "card-title" }, toDisplayString(unref(investment).investor?.user?.name), 1)
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "mt-6 space-y-4" }, [
                  createVNode("div", { class: "grid gap-4 md:grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] xl:grid-cols-4" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(cards), (card) => {
                      return openBlock(), createBlock(_component_NuxtCard, {
                        key: card.label,
                        class: card.class
                      }, {
                        default: withCtx(() => [
                          createVNode("header", null, [
                            createVNode("p", {
                              class: ["card-title", card.class ? "text-white" : ""]
                            }, toDisplayString(card.label), 3)
                          ]),
                          createVNode("div", { class: "mt-2 text-2xl font-semibold font-geist-mono" }, [
                            createTextVNode(toDisplayString(card.value) + " ", 1),
                            card.suffix ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "text-sm"
                            }, toDisplayString(card.suffix), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("footer", { class: "mt-2" }, [
                            createVNode(_component_NuxtBadge, {
                              color: card.badgeColor,
                              variant: "soft",
                              class: "mr-2 dark:bg-white dark:text-primary",
                              icon: card.icon
                            }, null, 8, ["color", "icon"]),
                            createVNode("small", null, toDisplayString(card.description), 1)
                          ])
                        ]),
                        _: 2
                      }, 1032, ["class"]);
                    }), 128))
                  ]),
                  unref(investmentId) ? (openBlock(), createBlock(_component_UserInvestmentProfits, {
                    key: 0,
                    "investment-id": unref(investmentId),
                    "profit-count": unref(investment).profitCount ?? 1e4
                  }, null, 8, ["investment-id", "profit-count"])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/user/accounts/[accountId]/investments/[investmentId].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_investmentId_-CURw7GOC.mjs.map
