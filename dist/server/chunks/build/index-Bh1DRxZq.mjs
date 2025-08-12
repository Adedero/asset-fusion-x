import { _ as __nuxt_component_0 } from './my-page-Cgd-8gXO.mjs';
import { _ as _sfc_main$1 } from './Select-CrSzJZds.mjs';
import { _ as _sfc_main$2 } from './Card-HL6icAYQ.mjs';
import { _ as _sfc_main$3 } from './Badge-q_8fq56_.mjs';
import { i as useToast, e as _sfc_main$d, c as _sfc_main$7, n as navigateTo } from './server.mjs';
import { _ as __nuxt_component_6 } from './empty-icon-BnDpoaPH.mjs';
import { _ as _sfc_main$4 } from './Modal-DefLStPx.mjs';
import { _ as _sfc_main$5 } from './Alert-CXdXSwrA.mjs';
import { _ as __nuxt_component_14 } from './fetch-error-alert-B3Gd_w4n.mjs';
import { _ as _sfc_main$1$1, a as _sfc_main$6 } from './FormField-CzZJ1-Wb.mjs';
import { _ as _sfc_main$8 } from './InputNumber-DfQ_yysT.mjs';
import { t as toCase } from './to-case-ChuH9uWD.mjs';
import { t as toDollar } from './to-dollar-DdS_9tlH.mjs';
import { defineComponent, withAsyncContext, ref, computed, reactive, mergeProps, unref, withCtx, isRef, createVNode, toDisplayString, createBlock, createCommentVNode, openBlock, withModifiers, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import z from 'zod';
import { v4 } from 'uuid';
import { a6 as normalizeException } from '../nitro/nitro.mjs';
import { u as useFetch } from './fetch-DztuJ_5C.mjs';
import 'reka-ui';
import '@vueuse/core';
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

const getInvestmentPlanCategoryBadgeColor = (investmentPlanCategory) => {
  switch (investmentPlanCategory) {
    case "forex":
      return "primary";
    case "stocks":
      return "success";
    case "real_estate":
      return "error";
    case "bonds":
      return "warning";
    case "derivatives":
      return "warning";
    case "cryptocurrencies":
      return "success";
    default:
      return "error";
  }
};
function groupBy(items, key) {
  return items.reduce(
    (acc, item) => {
      const groupKey = item[key];
      if (!acc[groupKey]) acc[groupKey] = [];
      acc[groupKey].push(item);
      return acc;
    },
    {}
  );
}
function sortBy(items, key, order = "asc") {
  return [...items].sort((a, b) => {
    const aValue = a[key];
    const bValue = b[key];
    if (aValue === bValue) return 0;
    if (aValue === null || aValue === void 0) return 1;
    if (bValue === null || bValue === void 0) return -1;
    if (typeof aValue === "number" && typeof bValue === "number") {
      return order === "asc" ? aValue - bValue : bValue - aValue;
    }
    const aStr = String(aValue);
    const bStr = String(bValue);
    return order === "asc" ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr);
  });
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const toast = useToast();
    const { data, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/investment-plans", {
      key: "investment-plans"
    }, "$WNjXhrCBSh")), __temp = await __temp, __restore(), __temp);
    const groupByFields = [
      { label: "Category", value: "category" },
      { label: "Interest cycle", value: "profitDistribution" }
    ];
    const sortByFields = [
      { label: "Name", value: "name" },
      { label: "Duration", value: "duration" },
      { label: "Min. deposit", value: "minimumDeposit" },
      { label: "Max. deposit", value: "maximumDeposit" }
    ];
    const orders = ["asc", "desc"];
    const selectedGroupByField = ref("category");
    const selectedSortByField = ref("minimumDeposit");
    const selectedOrder = ref("asc");
    const formattedInvestmentPlans = computed(() => {
      if (!data.value) return [];
      const grouped = groupBy(data.value, selectedGroupByField.value);
      const sortedGroups = Object.entries(grouped).map(([groupName, plans]) => ({
        group: groupName,
        items: sortBy(plans, selectedSortByField.value, selectedOrder.value)
      }));
      return sortedGroups;
    });
    const {
      pending: loadingAccounts,
      data: accounts,
      error: accountsError,
      execute: getAccounts
    } = useFetch("/api/user/financial-accounts", {
      key: "user-financial-accounts-non-immediate",
      immediate: false
    }, "$TMJY-tKtqI");
    const financialAccounts = computed(
      () => accounts.value?.financialAccounts?.map((account) => ({
        label: account.name,
        value: account.id
      }))
    );
    const open = ref(false);
    const selectedPlan = ref(null);
    const selectPlan = (plan) => {
      selectedPlan.value = plan;
      open.value = true;
      getAccounts();
    };
    const schema = computed(() => {
      const min = selectedPlan.value?.minimumDeposit ?? 0;
      const max = selectedPlan.value?.maximumDeposit ?? 1e5;
      return z.object({
        accountId: z.string({ message: "Select an account" }).nonempty({ message: "Select an account" }),
        amount: z.number({ message: "Amount is required" }).min(min, { message: `Amount must be at least ${toDollar(min)}` }).max(max, {
          message: `Amount must be not be more than ${toDollar(max)}`
        })
      });
    });
    const state = reactive({
      accountId: "",
      amount: 0
    });
    const reset = () => {
      state.accountId = "";
      state.amount = 0;
    };
    const selectedAccount = computed(
      () => accounts.value?.financialAccounts?.find(
        (account) => state.accountId === account.id
      )
    );
    const handleModalClose = () => {
      selectedPlan.value = null;
      reset();
      open.value = false;
    };
    const investmentError = ref(null);
    const handleSubmit = async (event) => {
      const investorId = selectedAccount.value?.primaryUser?.accountUserId;
      if (!investorId || !selectedPlan.value) return;
      const { accountId, amount } = event.data;
      if (selectedAccount.value.balance < amount) return;
      const body = {
        id: v4(),
        financialAccountId: accountId,
        investorId,
        deposit: amount,
        investmentName: selectedPlan.value.name,
        totalProfit: 0,
        profitCount: 0,
        status: "open",
        category: selectedPlan.value.category,
        duration: selectedPlan.value.duration,
        daysCompleted: 0,
        totalReturn: selectedPlan.value.percentageTotalReturn,
        periodicReturn: selectedPlan.value.percentagePeriodicReturn,
        profitDistribution: selectedPlan.value.profitDistribution,
        terminationFee: selectedPlan.value.terminationFee,
        closedAt: null,
        closedReason: null,
        pausedAt: null,
        pausedReason: null,
        terminatedAt: null,
        terminatedReason: null,
        createdAt: /* @__PURE__ */ new Date(),
        updatedAt: /* @__PURE__ */ new Date()
      };
      try {
        const { investment, message } = await $fetch(
          `/api/user/financial-accounts/${accountId}/investments`,
          {
            method: "post",
            body
          }
        );
        toast.add({
          color: "success",
          title: "Success",
          description: message
        });
        await navigateTo(
          `/user/accounts/${investment.financialAccountId}/investments/${investment.id}`
        );
      } catch (error2) {
        investmentError.value = normalizeException(error2);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MyPage = __nuxt_component_0;
      const _component_NuxtSelect = _sfc_main$1;
      const _component_NuxtCard = _sfc_main$2;
      const _component_NuxtBadge = _sfc_main$3;
      const _component_NuxtIcon = _sfc_main$d;
      const _component_NuxtButton = _sfc_main$7;
      const _component_EmptyIcon = __nuxt_component_6;
      const _component_NuxtModal = _sfc_main$4;
      const _component_NuxtAlert = _sfc_main$5;
      const _component_FetchErrorAlert = __nuxt_component_14;
      const _component_NuxtForm = _sfc_main$1$1;
      const _component_NuxtFormField = _sfc_main$6;
      const _component_NuxtInputNumber = _sfc_main$8;
      _push(ssrRenderComponent(_component_MyPage, mergeProps({
        error: unref(error),
        onRefresh: ($event) => unref(refresh)()
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(data)) {
              _push2(`<div${_scopeId}><header class="flex items-center justify-end flex-wrap gap-x-4 gap-y-2"${_scopeId}><div class="space-y-1"${_scopeId}><p class="text-right md:text-left text-xs font-semibold"${_scopeId}>Group by</p>`);
              _push2(ssrRenderComponent(_component_NuxtSelect, {
                modelValue: unref(selectedGroupByField),
                "onUpdate:modelValue": ($event) => isRef(selectedGroupByField) ? selectedGroupByField.value = $event : null,
                items: groupByFields,
                size: "sm",
                class: "w-28 md:w-32"
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="space-y-1"${_scopeId}><p class="text-right md:text-left text-xs font-semibold"${_scopeId}>Sort by</p><div class="flex items-center gap-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_NuxtSelect, {
                modelValue: unref(selectedSortByField),
                "onUpdate:modelValue": ($event) => isRef(selectedSortByField) ? selectedSortByField.value = $event : null,
                items: sortByFields,
                size: "sm",
                class: "w-[7.5rem]"
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_NuxtSelect, {
                modelValue: unref(selectedOrder),
                "onUpdate:modelValue": ($event) => isRef(selectedOrder) ? selectedOrder.value = $event : null,
                items: orders,
                size: "sm",
                class: "w-[4.5rem]"
              }, null, _parent2, _scopeId));
              _push2(`</div></div></header>`);
              if (unref(data).length) {
                _push2(`<div class="mt-4 space-y-12"${_scopeId}><!--[-->`);
                ssrRenderList(unref(formattedInvestmentPlans), (group) => {
                  _push2(`<div${_scopeId}><header class="bg-muted py-1 px-2 rounded font-semibold text-primary mb-4"${_scopeId}>${ssrInterpolate(("toCase" in _ctx ? _ctx.toCase : unref(toCase))(group.group, "sentence"))}</header><div class="grid grid-cols-[repeat(auto-fill,minmax(18rem,1fr))] gap-4"${_scopeId}><!--[-->`);
                  ssrRenderList(group.items, (plan) => {
                    _push2(ssrRenderComponent(_component_NuxtCard, {
                      key: plan.id
                    }, {
                      header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                        if (_push3) {
                          _push3(`<div${_scopeId2}><div${_scopeId2}><p class="card-title"${_scopeId2}>${ssrInterpolate(plan.name)}</p>`);
                          _push3(ssrRenderComponent(_component_NuxtBadge, {
                            variant: "soft",
                            color: ("getInvestmentPlanCategoryBadgeColor" in _ctx ? _ctx.getInvestmentPlanCategoryBadgeColor : unref(getInvestmentPlanCategoryBadgeColor))(plan.category),
                            label: ("toCase" in _ctx ? _ctx.toCase : unref(toCase))(plan.category, "lower")
                          }, null, _parent3, _scopeId2));
                          _push3(`</div><div class="mt-2"${_scopeId2}><p class="font-geist-mono text-3xl font-semibold"${_scopeId2}>${ssrInterpolate(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(plan.minimumDeposit))}</p><p class="text-sm"${_scopeId2}>Minimum Deposit</p></div></div>`);
                        } else {
                          return [
                            createVNode("div", null, [
                              createVNode("div", null, [
                                createVNode("p", { class: "card-title" }, toDisplayString(plan.name), 1),
                                createVNode(_component_NuxtBadge, {
                                  variant: "soft",
                                  color: ("getInvestmentPlanCategoryBadgeColor" in _ctx ? _ctx.getInvestmentPlanCategoryBadgeColor : unref(getInvestmentPlanCategoryBadgeColor))(plan.category),
                                  label: ("toCase" in _ctx ? _ctx.toCase : unref(toCase))(plan.category, "lower")
                                }, null, 8, ["color", "label"])
                              ]),
                              createVNode("div", { class: "mt-2" }, [
                                createVNode("p", { class: "font-geist-mono text-3xl font-semibold" }, toDisplayString(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(plan.minimumDeposit)), 1),
                                createVNode("p", { class: "text-sm" }, "Minimum Deposit")
                              ])
                            ])
                          ];
                        }
                      }),
                      default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                        if (_push3) {
                          _push3(`<div${_scopeId2}><ul class="space-y-4 mb-4 text-[0.9rem]"${_scopeId2}><li class="flex items-center gap-2"${_scopeId2}>`);
                          _push3(ssrRenderComponent(_component_NuxtIcon, { name: "lucide-circle-check" }, null, _parent3, _scopeId2));
                          _push3(`<p class="font-semibold"${_scopeId2}>${ssrInterpolate(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(plan.maximumDeposit))}</p><p${_scopeId2}>maximum deposit</p></li><li class="flex items-center gap-2"${_scopeId2}>`);
                          _push3(ssrRenderComponent(_component_NuxtIcon, { name: "lucide-circle-check" }, null, _parent3, _scopeId2));
                          _push3(`<p class="font-semibold"${_scopeId2}>${ssrInterpolate(plan.duration)}</p><p${_scopeId2}>days term</p></li><li class="flex items-center gap-2"${_scopeId2}>`);
                          _push3(ssrRenderComponent(_component_NuxtIcon, { name: "lucide-circle-check" }, null, _parent3, _scopeId2));
                          _push3(`<p class="font-semibold"${_scopeId2}>${ssrInterpolate(plan.percentagePeriodicReturn)}% </p><p${_scopeId2}>${ssrInterpolate(("toCase" in _ctx ? _ctx.toCase : unref(toCase))(plan.profitDistribution, "lower"))} interest </p></li><li class="flex items-center gap-2"${_scopeId2}>`);
                          _push3(ssrRenderComponent(_component_NuxtIcon, { name: "lucide-circle-check" }, null, _parent3, _scopeId2));
                          _push3(`<p class="font-semibold"${_scopeId2}>${ssrInterpolate(plan.percentageTotalReturn - 100)}% </p><p${_scopeId2}>total return</p></li></ul>`);
                          _push3(ssrRenderComponent(_component_NuxtButton, {
                            label: "Invest now",
                            class: "w-full justify-center",
                            onClick: ($event) => selectPlan(plan)
                          }, null, _parent3, _scopeId2));
                          _push3(`</div>`);
                        } else {
                          return [
                            createVNode("div", null, [
                              createVNode("ul", { class: "space-y-4 mb-4 text-[0.9rem]" }, [
                                createVNode("li", { class: "flex items-center gap-2" }, [
                                  createVNode(_component_NuxtIcon, { name: "lucide-circle-check" }),
                                  createVNode("p", { class: "font-semibold" }, toDisplayString(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(plan.maximumDeposit)), 1),
                                  createVNode("p", null, "maximum deposit")
                                ]),
                                createVNode("li", { class: "flex items-center gap-2" }, [
                                  createVNode(_component_NuxtIcon, { name: "lucide-circle-check" }),
                                  createVNode("p", { class: "font-semibold" }, toDisplayString(plan.duration), 1),
                                  createVNode("p", null, "days term")
                                ]),
                                createVNode("li", { class: "flex items-center gap-2" }, [
                                  createVNode(_component_NuxtIcon, { name: "lucide-circle-check" }),
                                  createVNode("p", { class: "font-semibold" }, toDisplayString(plan.percentagePeriodicReturn) + "% ", 1),
                                  createVNode("p", null, toDisplayString(("toCase" in _ctx ? _ctx.toCase : unref(toCase))(plan.profitDistribution, "lower")) + " interest ", 1)
                                ]),
                                createVNode("li", { class: "flex items-center gap-2" }, [
                                  createVNode(_component_NuxtIcon, { name: "lucide-circle-check" }),
                                  createVNode("p", { class: "font-semibold" }, toDisplayString(plan.percentageTotalReturn - 100) + "% ", 1),
                                  createVNode("p", null, "total return")
                                ])
                              ]),
                              createVNode(_component_NuxtButton, {
                                label: "Invest now",
                                class: "w-full justify-center",
                                onClick: ($event) => selectPlan(plan)
                              }, null, 8, ["onClick"])
                            ])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent2, _scopeId));
                  });
                  _push2(`<!--]--></div></div>`);
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<div${_scopeId}>`);
                _push2(ssrRenderComponent(_component_EmptyIcon, { label: "No investment plans" }, null, _parent2, _scopeId));
                _push2(`</div>`);
              }
              _push2(ssrRenderComponent(_component_NuxtModal, {
                open: unref(open),
                "onUpdate:open": ($event) => isRef(open) ? open.value = $event : null,
                title: `${("toCase" in _ctx ? _ctx.toCase : unref(toCase))(unref(selectedPlan)?.category ?? "unknown", "sentence")}`,
                description: unref(selectedPlan)?.name,
                dismissible: false
              }, {
                body: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (unref(selectedPlan)) {
                      _push3(`<div class="space-y-4"${_scopeId2}><div class="text-center"${_scopeId2}><p class="text-sm"${_scopeId2}>Minimum deposit</p><p class="text-lg font-geist-mono font-semibold"${_scopeId2}>${ssrInterpolate(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(unref(selectedPlan).minimumDeposit))}</p></div>`);
                      if (unref(selectedAccount)) {
                        _push3(`<div class="flex-col-center gap-y-2"${_scopeId2}><p class="font-geist-mono text-4xl font-medium"${_scopeId2}>${ssrInterpolate(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(unref(selectedAccount).balance))}</p>`);
                        _push3(ssrRenderComponent(_component_NuxtBadge, {
                          color: "neutral",
                          variant: "outline",
                          label: "Account balance"
                        }, null, _parent3, _scopeId2));
                        if (unref(selectedAccount).balance < unref(selectedPlan).minimumDeposit) {
                          _push3(ssrRenderComponent(_component_NuxtAlert, {
                            color: "error",
                            variant: "soft",
                            description: "You do not have sufficient balance to complete this investment"
                          }, null, _parent3, _scopeId2));
                        } else {
                          _push3(`<!---->`);
                        }
                        _push3(`</div>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      if (unref(investmentError)) {
                        _push3(ssrRenderComponent(_component_FetchErrorAlert, {
                          message: unref(investmentError).message
                        }, null, _parent3, _scopeId2));
                      } else {
                        _push3(`<!---->`);
                      }
                      if (unref(loadingAccounts)) {
                        _push3(`<div class="flex-center"${_scopeId2}>`);
                        _push3(ssrRenderComponent(_component_NuxtIcon, {
                          name: "lucide-loader",
                          size: "2rem",
                          class: "animate animate-spin"
                        }, null, _parent3, _scopeId2));
                        _push3(`</div>`);
                      } else if (unref(accountsError)) {
                        _push3(`<div${_scopeId2}>`);
                        _push3(ssrRenderComponent(_component_FetchErrorAlert, {
                          message: "Failed to get accounts",
                          "show-retry": "",
                          onRetry: ($event) => unref(getAccounts)()
                        }, null, _parent3, _scopeId2));
                        _push3(`</div>`);
                      } else if (unref(accounts)) {
                        _push3(ssrRenderComponent(_component_NuxtForm, {
                          state: unref(state),
                          schema: unref(schema),
                          class: "space-y-4",
                          onSubmit: handleSubmit
                        }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(ssrRenderComponent(_component_NuxtFormField, {
                                name: "accountId",
                                label: "Your accounts",
                                description: "Select one of your accounts to continue with this investment",
                                class: "w-full"
                              }, {
                                default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                  if (_push5) {
                                    _push5(ssrRenderComponent(_component_NuxtSelect, {
                                      modelValue: unref(state).accountId,
                                      "onUpdate:modelValue": ($event) => unref(state).accountId = $event,
                                      items: unref(financialAccounts),
                                      placeholder: "Select account",
                                      class: "w-full"
                                    }, null, _parent5, _scopeId4));
                                  } else {
                                    return [
                                      createVNode(_component_NuxtSelect, {
                                        modelValue: unref(state).accountId,
                                        "onUpdate:modelValue": ($event) => unref(state).accountId = $event,
                                        items: unref(financialAccounts),
                                        placeholder: "Select account",
                                        class: "w-full"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent4, _scopeId3));
                              _push4(ssrRenderComponent(_component_NuxtFormField, {
                                name: "amount",
                                label: "Deposit amount",
                                class: "w-full"
                              }, {
                                default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                  if (_push5) {
                                    _push5(ssrRenderComponent(_component_NuxtInputNumber, {
                                      modelValue: unref(state).amount,
                                      "onUpdate:modelValue": ($event) => unref(state).amount = $event,
                                      "step-snapping": false,
                                      min: unref(selectedPlan).minimumDeposit,
                                      max: unref(selectedAccount)?.balance,
                                      "format-options": {
                                        style: "currency",
                                        currency: "USD",
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                      },
                                      class: "w-full"
                                    }, null, _parent5, _scopeId4));
                                  } else {
                                    return [
                                      createVNode(_component_NuxtInputNumber, {
                                        modelValue: unref(state).amount,
                                        "onUpdate:modelValue": ($event) => unref(state).amount = $event,
                                        "step-snapping": false,
                                        min: unref(selectedPlan).minimumDeposit,
                                        max: unref(selectedAccount)?.balance,
                                        "format-options": {
                                          style: "currency",
                                          currency: "USD",
                                          minimumFractionDigits: 2,
                                          maximumFractionDigits: 2
                                        },
                                        class: "w-full"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "min", "max"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent4, _scopeId3));
                              _push4(`<div class="flex items-center justify-end gap-2"${_scopeId3}>`);
                              _push4(ssrRenderComponent(_component_NuxtButton, {
                                label: "Cancel",
                                color: "neutral",
                                variant: "soft",
                                onClick: handleModalClose
                              }, null, _parent4, _scopeId3));
                              _push4(ssrRenderComponent(_component_NuxtButton, {
                                type: "submit",
                                "loading-auto": "",
                                label: "Invest"
                              }, null, _parent4, _scopeId3));
                              _push4(`</div>`);
                            } else {
                              return [
                                createVNode(_component_NuxtFormField, {
                                  name: "accountId",
                                  label: "Your accounts",
                                  description: "Select one of your accounts to continue with this investment",
                                  class: "w-full"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_NuxtSelect, {
                                      modelValue: unref(state).accountId,
                                      "onUpdate:modelValue": ($event) => unref(state).accountId = $event,
                                      items: unref(financialAccounts),
                                      placeholder: "Select account",
                                      class: "w-full"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_NuxtFormField, {
                                  name: "amount",
                                  label: "Deposit amount",
                                  class: "w-full"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_NuxtInputNumber, {
                                      modelValue: unref(state).amount,
                                      "onUpdate:modelValue": ($event) => unref(state).amount = $event,
                                      "step-snapping": false,
                                      min: unref(selectedPlan).minimumDeposit,
                                      max: unref(selectedAccount)?.balance,
                                      "format-options": {
                                        style: "currency",
                                        currency: "USD",
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                      },
                                      class: "w-full"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "min", "max"])
                                  ]),
                                  _: 1
                                }),
                                createVNode("div", { class: "flex items-center justify-end gap-2" }, [
                                  createVNode(_component_NuxtButton, {
                                    label: "Cancel",
                                    color: "neutral",
                                    variant: "soft",
                                    onClick: handleModalClose
                                  }),
                                  createVNode(_component_NuxtButton, {
                                    type: "submit",
                                    "loading-auto": "",
                                    label: "Invest"
                                  })
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent3, _scopeId2));
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`</div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                  } else {
                    return [
                      unref(selectedPlan) ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "space-y-4"
                      }, [
                        createVNode("div", { class: "text-center" }, [
                          createVNode("p", { class: "text-sm" }, "Minimum deposit"),
                          createVNode("p", { class: "text-lg font-geist-mono font-semibold" }, toDisplayString(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(unref(selectedPlan).minimumDeposit)), 1)
                        ]),
                        unref(selectedAccount) ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "flex-col-center gap-y-2"
                        }, [
                          createVNode("p", { class: "font-geist-mono text-4xl font-medium" }, toDisplayString(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(unref(selectedAccount).balance)), 1),
                          createVNode(_component_NuxtBadge, {
                            color: "neutral",
                            variant: "outline",
                            label: "Account balance"
                          }),
                          unref(selectedAccount).balance < unref(selectedPlan).minimumDeposit ? (openBlock(), createBlock(_component_NuxtAlert, {
                            key: 0,
                            color: "error",
                            variant: "soft",
                            description: "You do not have sufficient balance to complete this investment"
                          })) : createCommentVNode("", true)
                        ])) : createCommentVNode("", true),
                        unref(investmentError) ? (openBlock(), createBlock(_component_FetchErrorAlert, {
                          key: 1,
                          message: unref(investmentError).message
                        }, null, 8, ["message"])) : createCommentVNode("", true),
                        unref(loadingAccounts) ? (openBlock(), createBlock("div", {
                          key: 2,
                          class: "flex-center"
                        }, [
                          createVNode(_component_NuxtIcon, {
                            name: "lucide-loader",
                            size: "2rem",
                            class: "animate animate-spin"
                          })
                        ])) : unref(accountsError) ? (openBlock(), createBlock("div", { key: 3 }, [
                          createVNode(_component_FetchErrorAlert, {
                            message: "Failed to get accounts",
                            "show-retry": "",
                            onRetry: ($event) => unref(getAccounts)()
                          }, null, 8, ["onRetry"])
                        ])) : unref(accounts) ? (openBlock(), createBlock(_component_NuxtForm, {
                          key: 4,
                          state: unref(state),
                          schema: unref(schema),
                          class: "space-y-4",
                          onSubmit: withModifiers(handleSubmit, ["prevent"])
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_NuxtFormField, {
                              name: "accountId",
                              label: "Your accounts",
                              description: "Select one of your accounts to continue with this investment",
                              class: "w-full"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_NuxtSelect, {
                                  modelValue: unref(state).accountId,
                                  "onUpdate:modelValue": ($event) => unref(state).accountId = $event,
                                  items: unref(financialAccounts),
                                  placeholder: "Select account",
                                  class: "w-full"
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                              ]),
                              _: 1
                            }),
                            createVNode(_component_NuxtFormField, {
                              name: "amount",
                              label: "Deposit amount",
                              class: "w-full"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_NuxtInputNumber, {
                                  modelValue: unref(state).amount,
                                  "onUpdate:modelValue": ($event) => unref(state).amount = $event,
                                  "step-snapping": false,
                                  min: unref(selectedPlan).minimumDeposit,
                                  max: unref(selectedAccount)?.balance,
                                  "format-options": {
                                    style: "currency",
                                    currency: "USD",
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                  },
                                  class: "w-full"
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "min", "max"])
                              ]),
                              _: 1
                            }),
                            createVNode("div", { class: "flex items-center justify-end gap-2" }, [
                              createVNode(_component_NuxtButton, {
                                label: "Cancel",
                                color: "neutral",
                                variant: "soft",
                                onClick: handleModalClose
                              }),
                              createVNode(_component_NuxtButton, {
                                type: "submit",
                                "loading-auto": "",
                                label: "Invest"
                              })
                            ])
                          ]),
                          _: 1
                        }, 8, ["state", "schema"])) : createCommentVNode("", true)
                      ])) : createCommentVNode("", true)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(data) ? (openBlock(), createBlock("div", { key: 0 }, [
                createVNode("header", { class: "flex items-center justify-end flex-wrap gap-x-4 gap-y-2" }, [
                  createVNode("div", { class: "space-y-1" }, [
                    createVNode("p", { class: "text-right md:text-left text-xs font-semibold" }, "Group by"),
                    createVNode(_component_NuxtSelect, {
                      modelValue: unref(selectedGroupByField),
                      "onUpdate:modelValue": ($event) => isRef(selectedGroupByField) ? selectedGroupByField.value = $event : null,
                      items: groupByFields,
                      size: "sm",
                      class: "w-28 md:w-32"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode("div", { class: "space-y-1" }, [
                    createVNode("p", { class: "text-right md:text-left text-xs font-semibold" }, "Sort by"),
                    createVNode("div", { class: "flex items-center gap-2" }, [
                      createVNode(_component_NuxtSelect, {
                        modelValue: unref(selectedSortByField),
                        "onUpdate:modelValue": ($event) => isRef(selectedSortByField) ? selectedSortByField.value = $event : null,
                        items: sortByFields,
                        size: "sm",
                        class: "w-[7.5rem]"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_component_NuxtSelect, {
                        modelValue: unref(selectedOrder),
                        "onUpdate:modelValue": ($event) => isRef(selectedOrder) ? selectedOrder.value = $event : null,
                        items: orders,
                        size: "sm",
                        class: "w-[4.5rem]"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ])
                  ])
                ]),
                unref(data).length ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "mt-4 space-y-12"
                }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(formattedInvestmentPlans), (group) => {
                    return openBlock(), createBlock("div", {
                      key: group.group
                    }, [
                      createVNode("header", { class: "bg-muted py-1 px-2 rounded font-semibold text-primary mb-4" }, toDisplayString(("toCase" in _ctx ? _ctx.toCase : unref(toCase))(group.group, "sentence")), 1),
                      createVNode("div", { class: "grid grid-cols-[repeat(auto-fill,minmax(18rem,1fr))] gap-4" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(group.items, (plan) => {
                          return openBlock(), createBlock(_component_NuxtCard, {
                            key: plan.id
                          }, {
                            header: withCtx(() => [
                              createVNode("div", null, [
                                createVNode("div", null, [
                                  createVNode("p", { class: "card-title" }, toDisplayString(plan.name), 1),
                                  createVNode(_component_NuxtBadge, {
                                    variant: "soft",
                                    color: ("getInvestmentPlanCategoryBadgeColor" in _ctx ? _ctx.getInvestmentPlanCategoryBadgeColor : unref(getInvestmentPlanCategoryBadgeColor))(plan.category),
                                    label: ("toCase" in _ctx ? _ctx.toCase : unref(toCase))(plan.category, "lower")
                                  }, null, 8, ["color", "label"])
                                ]),
                                createVNode("div", { class: "mt-2" }, [
                                  createVNode("p", { class: "font-geist-mono text-3xl font-semibold" }, toDisplayString(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(plan.minimumDeposit)), 1),
                                  createVNode("p", { class: "text-sm" }, "Minimum Deposit")
                                ])
                              ])
                            ]),
                            default: withCtx(() => [
                              createVNode("div", null, [
                                createVNode("ul", { class: "space-y-4 mb-4 text-[0.9rem]" }, [
                                  createVNode("li", { class: "flex items-center gap-2" }, [
                                    createVNode(_component_NuxtIcon, { name: "lucide-circle-check" }),
                                    createVNode("p", { class: "font-semibold" }, toDisplayString(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(plan.maximumDeposit)), 1),
                                    createVNode("p", null, "maximum deposit")
                                  ]),
                                  createVNode("li", { class: "flex items-center gap-2" }, [
                                    createVNode(_component_NuxtIcon, { name: "lucide-circle-check" }),
                                    createVNode("p", { class: "font-semibold" }, toDisplayString(plan.duration), 1),
                                    createVNode("p", null, "days term")
                                  ]),
                                  createVNode("li", { class: "flex items-center gap-2" }, [
                                    createVNode(_component_NuxtIcon, { name: "lucide-circle-check" }),
                                    createVNode("p", { class: "font-semibold" }, toDisplayString(plan.percentagePeriodicReturn) + "% ", 1),
                                    createVNode("p", null, toDisplayString(("toCase" in _ctx ? _ctx.toCase : unref(toCase))(plan.profitDistribution, "lower")) + " interest ", 1)
                                  ]),
                                  createVNode("li", { class: "flex items-center gap-2" }, [
                                    createVNode(_component_NuxtIcon, { name: "lucide-circle-check" }),
                                    createVNode("p", { class: "font-semibold" }, toDisplayString(plan.percentageTotalReturn - 100) + "% ", 1),
                                    createVNode("p", null, "total return")
                                  ])
                                ]),
                                createVNode(_component_NuxtButton, {
                                  label: "Invest now",
                                  class: "w-full justify-center",
                                  onClick: ($event) => selectPlan(plan)
                                }, null, 8, ["onClick"])
                              ])
                            ]),
                            _: 2
                          }, 1024);
                        }), 128))
                      ])
                    ]);
                  }), 128))
                ])) : (openBlock(), createBlock("div", { key: 1 }, [
                  createVNode(_component_EmptyIcon, { label: "No investment plans" })
                ])),
                createVNode(_component_NuxtModal, {
                  open: unref(open),
                  "onUpdate:open": ($event) => isRef(open) ? open.value = $event : null,
                  title: `${("toCase" in _ctx ? _ctx.toCase : unref(toCase))(unref(selectedPlan)?.category ?? "unknown", "sentence")}`,
                  description: unref(selectedPlan)?.name,
                  dismissible: false
                }, {
                  body: withCtx(() => [
                    unref(selectedPlan) ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "space-y-4"
                    }, [
                      createVNode("div", { class: "text-center" }, [
                        createVNode("p", { class: "text-sm" }, "Minimum deposit"),
                        createVNode("p", { class: "text-lg font-geist-mono font-semibold" }, toDisplayString(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(unref(selectedPlan).minimumDeposit)), 1)
                      ]),
                      unref(selectedAccount) ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "flex-col-center gap-y-2"
                      }, [
                        createVNode("p", { class: "font-geist-mono text-4xl font-medium" }, toDisplayString(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(unref(selectedAccount).balance)), 1),
                        createVNode(_component_NuxtBadge, {
                          color: "neutral",
                          variant: "outline",
                          label: "Account balance"
                        }),
                        unref(selectedAccount).balance < unref(selectedPlan).minimumDeposit ? (openBlock(), createBlock(_component_NuxtAlert, {
                          key: 0,
                          color: "error",
                          variant: "soft",
                          description: "You do not have sufficient balance to complete this investment"
                        })) : createCommentVNode("", true)
                      ])) : createCommentVNode("", true),
                      unref(investmentError) ? (openBlock(), createBlock(_component_FetchErrorAlert, {
                        key: 1,
                        message: unref(investmentError).message
                      }, null, 8, ["message"])) : createCommentVNode("", true),
                      unref(loadingAccounts) ? (openBlock(), createBlock("div", {
                        key: 2,
                        class: "flex-center"
                      }, [
                        createVNode(_component_NuxtIcon, {
                          name: "lucide-loader",
                          size: "2rem",
                          class: "animate animate-spin"
                        })
                      ])) : unref(accountsError) ? (openBlock(), createBlock("div", { key: 3 }, [
                        createVNode(_component_FetchErrorAlert, {
                          message: "Failed to get accounts",
                          "show-retry": "",
                          onRetry: ($event) => unref(getAccounts)()
                        }, null, 8, ["onRetry"])
                      ])) : unref(accounts) ? (openBlock(), createBlock(_component_NuxtForm, {
                        key: 4,
                        state: unref(state),
                        schema: unref(schema),
                        class: "space-y-4",
                        onSubmit: withModifiers(handleSubmit, ["prevent"])
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_NuxtFormField, {
                            name: "accountId",
                            label: "Your accounts",
                            description: "Select one of your accounts to continue with this investment",
                            class: "w-full"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_NuxtSelect, {
                                modelValue: unref(state).accountId,
                                "onUpdate:modelValue": ($event) => unref(state).accountId = $event,
                                items: unref(financialAccounts),
                                placeholder: "Select account",
                                class: "w-full"
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_NuxtFormField, {
                            name: "amount",
                            label: "Deposit amount",
                            class: "w-full"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_NuxtInputNumber, {
                                modelValue: unref(state).amount,
                                "onUpdate:modelValue": ($event) => unref(state).amount = $event,
                                "step-snapping": false,
                                min: unref(selectedPlan).minimumDeposit,
                                max: unref(selectedAccount)?.balance,
                                "format-options": {
                                  style: "currency",
                                  currency: "USD",
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2
                                },
                                class: "w-full"
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "min", "max"])
                            ]),
                            _: 1
                          }),
                          createVNode("div", { class: "flex items-center justify-end gap-2" }, [
                            createVNode(_component_NuxtButton, {
                              label: "Cancel",
                              color: "neutral",
                              variant: "soft",
                              onClick: handleModalClose
                            }),
                            createVNode(_component_NuxtButton, {
                              type: "submit",
                              "loading-auto": "",
                              label: "Invest"
                            })
                          ])
                        ]),
                        _: 1
                      }, 8, ["state", "schema"])) : createCommentVNode("", true)
                    ])) : createCommentVNode("", true)
                  ]),
                  _: 1
                }, 8, ["open", "onUpdate:open", "title", "description"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/user/investment-plans/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-Bh1DRxZq.mjs.map
