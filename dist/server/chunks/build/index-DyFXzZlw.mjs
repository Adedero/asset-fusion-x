import { _ as _sfc_main$3 } from './Badge-Cc8D9XvB.mjs';
import { _ as __nuxt_component_0 } from './my-page-D-1fCn2X.mjs';
import { _ as _sfc_main$1 } from './Table-exspLtB-.mjs';
import { _ as _sfc_main$2 } from './Pagination-DSFKFBOo.mjs';
import { defineComponent, computed, withAsyncContext, mergeProps, unref, withCtx, isRef, openBlock, createBlock, createVNode, createCommentVNode, h, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { useDateFormat } from '@vueuse/core';
import { u as useRouteData } from './use-route-data-BkNqHoWD.mjs';
import { Q as useRoute, S as useRouter, n as navigateTo } from './server.mjs';
import { u as useFetch } from './fetch-CSk15cWP.mjs';
import { t as toDollar } from './to-dollar-DdS_9tlH.mjs';
import { t as toCase } from './to-case-ChuH9uWD.mjs';
import { g as getInvestmentStatusBadgeColor } from './investment-CJjcSFHl.mjs';
import 'reka-ui';
import './fetch-error-alert-3QlR-5z-.mjs';
import './Alert-Dos-p4_r.mjs';
import '../_/nitro.mjs';
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
import '@vue/shared';
import './ssr-CXDHmH_F.mjs';

const limit = 20;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
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
    const { data: account, error: accountError } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `/api/user/financial-accounts/${accountId}`,
      {
        pick: ["totalInvestments"]
      },
      "$v0I0aquzlE"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const { pending, data, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `/api/user/financial-accounts/${accountId}/investments`,
      {
        query
      },
      "$CUa3N0G6K5"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const investments = computed(() => {
      return data.value?.map((investment) => {
        return {
          id: investment.id,
          deposit: investment.deposit,
          name: investment.investmentName,
          category: investment.category,
          status: investment.status,
          date: investment.createdAt
        };
      });
    });
    const Badge = _sfc_main$3;
    const columns = [
      {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }) => {
          const id = row.getValue("id") || "";
          const value = id.length > 8 ? id.slice(0, 8).toUpperCase() + "..." : id;
          return h("div", { title: id }, value);
        }
      },
      {
        accessorKey: "deposit",
        header: "Deposit",
        cell: ({ row }) => toDollar(row.getValue("deposit"))
      },
      {
        accessorKey: "name",
        header: "Name"
      },
      {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => {
          return h(
            "div",
            { class: "capitalize" },
            toCase(row.getValue("category"), "sentence")
          );
        }
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const color = getInvestmentStatusBadgeColor(row.getValue("status"));
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
        cell: ({ row }) => useDateFormat(row.getValue("date"), "MMM-DD-YYYY, hh:mm aa").value
      }
    ];
    async function onSelect(row) {
      const investmentId = row.getValue("id");
      await navigateTo(`/user/accounts/${accountId}/investments/${investmentId}`);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MyPage = __nuxt_component_0;
      const _component_NuxtTable = _sfc_main$1;
      const _component_NuxtPagination = _sfc_main$2;
      _push(ssrRenderComponent(_component_MyPage, mergeProps({
        error: unref(error) || unref(accountError),
        onRefresh: () => unref(refresh)()
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(account) && unref(data)) {
              _push2(`<div class="flex w-full flex-1 gap-1 overflow-auto"${_scopeId}><div class="flex-1"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_NuxtTable, {
                data: unref(investments),
                columns,
                sticky: "",
                loading: unref(pending),
                onSelect
              }, null, _parent2, _scopeId));
              _push2(`<div class="flex justify-center border-t border-default pt-4"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_NuxtPagination, {
                page: unref(page),
                "onUpdate:page": ($event) => isRef(page) ? page.value = $event : null,
                total: unref(account)?.totalInvestments,
                "items-per-page": limit,
                "show-edges": ""
              }, null, _parent2, _scopeId));
              _push2(`</div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(account) && unref(data) ? (openBlock(), createBlock("div", {
                key: 0,
                class: "flex w-full flex-1 gap-1 overflow-auto"
              }, [
                createVNode("div", { class: "flex-1" }, [
                  createVNode(_component_NuxtTable, {
                    data: unref(investments),
                    columns,
                    sticky: "",
                    loading: unref(pending),
                    onSelect
                  }, null, 8, ["data", "loading"]),
                  createVNode("div", { class: "flex justify-center border-t border-default pt-4" }, [
                    createVNode(_component_NuxtPagination, {
                      page: unref(page),
                      "onUpdate:page": ($event) => isRef(page) ? page.value = $event : null,
                      total: unref(account)?.totalInvestments,
                      "items-per-page": limit,
                      "show-edges": ""
                    }, null, 8, ["page", "onUpdate:page", "total"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/user/accounts/[accountId]/investments/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DyFXzZlw.mjs.map
