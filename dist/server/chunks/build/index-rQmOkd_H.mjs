import { _ as __nuxt_component_0 } from './loader-CegSv3fP.mjs';
import { _ as __nuxt_component_14 } from './fetch-error-alert-NIQ5BlkS.mjs';
import { _ as _sfc_main$1 } from './Badge-DE6iRalv.mjs';
import { _ as _sfc_main$2 } from './Separator-BYgM1HCW.mjs';
import { k as _sfc_main$d } from './server.mjs';
import { g as getInvestmentStatusBadgeColor } from './investment-CJjcSFHl.mjs';
import { t as toDollar } from './to-dollar-DdS_9tlH.mjs';
import { defineComponent, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { useDateFormat } from '@vueuse/core';
import { a5 as normalizeException } from '../nitro/nitro.mjs';
import { u as useRouteData } from './use-route-data-zpNPSzN0.mjs';
import { u as useFetch } from './fetch-CGkSb6cH.mjs';
import './_plugin-vue_export-helper-1tPrXgE0.mjs';
import './Alert-CKjxjhE_.mjs';
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
import '@vue/shared';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const investmentId = useRouteData().getParams("investmentId");
    const { data, error, pending, refresh } = useFetch(
      `/api/admin/investments/${investmentId}`,
      "$rn3XMskXVT"
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLoader = __nuxt_component_0;
      const _component_FetchErrorAlert = __nuxt_component_14;
      const _component_NuxtBadge = _sfc_main$1;
      const _component_NuxtSeparator = _sfc_main$2;
      const _component_NuxtAvatar = _sfc_main$d;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      if (unref(pending)) {
        _push(`<div class="flex-center p-5">`);
        _push(ssrRenderComponent(_component_NuxtLoader, null, null, _parent));
        _push(`</div>`);
      } else if (unref(error)) {
        _push(`<div class="w-full">`);
        _push(ssrRenderComponent(_component_FetchErrorAlert, {
          message: unref(normalizeException)(unref(error)).message,
          "show-retry": "",
          onRetry: () => unref(refresh)()
        }, null, _parent));
        _push(`</div>`);
      } else if (unref(data)) {
        _push(`<div><header><p class="text-xs font-semibold text-muted"> Investment ID: ${ssrInterpolate(unref(data).id)}</p><div class="flex items-center gap-2"><h1 class="text-3xl">${ssrInterpolate(unref(data).investmentName)}</h1>`);
        _push(ssrRenderComponent(_component_NuxtBadge, {
          label: unref(data).status,
          color: ("getInvestmentStatusBadgeColor" in _ctx ? _ctx.getInvestmentStatusBadgeColor : unref(getInvestmentStatusBadgeColor))(unref(data).status),
          variant: "subtle"
        }, null, _parent));
        _push(`</div><p class="text-sm text-primary-500">${ssrInterpolate(unref(data).category)}</p></header><div class="mt-8 space-y-10"><section><h3 class="text-xl">Investor</h3>`);
        _push(ssrRenderComponent(_component_NuxtSeparator, { class: "my-2" }, null, _parent));
        _push(`<div class="mt-4 flex items-center gap-5">`);
        _push(ssrRenderComponent(_component_NuxtAvatar, {
          src: unref(data).investor.user.image ?? void 0,
          alt: unref(data).investor.user.name,
          size: "3xl",
          ui: { root: "size-16" }
        }, null, _parent));
        _push(`<div><p class="text-xl">${ssrInterpolate(unref(data).investor.user.name)}</p><p class="text-muted">${ssrInterpolate(unref(data).investor.user.email)}</p></div></div></section><section><h3 class="text-xl">Financial Account</h3>`);
        _push(ssrRenderComponent(_component_NuxtSeparator, { class: "my-2" }, null, _parent));
        _push(`<div class="section-grid"><div><p class="section-grid-label">Name</p><p>${ssrInterpolate(unref(data).financialAccount.name)}</p></div><div><p class="section-grid-label">Type</p><p>${ssrInterpolate(`${unref(data).financialAccount.type}, ${unref(data).financialAccount.ownership}`)}</p></div></div></section><section><h3 class="text-xl">Information</h3>`);
        _push(ssrRenderComponent(_component_NuxtSeparator, { class: "my-2" }, null, _parent));
        _push(`<div class="section-grid"><div><p class="section-grid-label">Deposit</p><p>${ssrInterpolate(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(unref(data).deposit))}</p></div><div><p class="section-grid-label">Percentage Profit</p><p>${ssrInterpolate(unref(data).totalReturn)}%</p></div><div><p class="section-grid-label">Expected Returns</p><p>${ssrInterpolate(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(unref(data).deposit * (unref(data).totalReturn / 100)))}</p></div><div><p class="section-grid-label">Current Returns</p><p>${ssrInterpolate(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(unref(data).totalProfit))}</p></div><div><p class="section-grid-label">Termination Fee</p><p>${ssrInterpolate(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(unref(data).terminationFee))}</p></div><div><p class="section-grid-label">Profit Distribution</p><p>${ssrInterpolate(unref(data).profitDistribution)}</p></div><div><p class="section-grid-label">Duration</p><p>${ssrInterpolate(unref(data).duration)}</p></div><div><p class="section-grid-label">Days Completed</p><p>${ssrInterpolate(unref(data).daysCompleted)}</p></div></div></section><section><h3 class="text-xl">Status : ${ssrInterpolate(unref(data).status)}</h3>`);
        _push(ssrRenderComponent(_component_NuxtSeparator, { class: "my-2" }, null, _parent));
        if (unref(data).status === "closed") {
          _push(`<div class="space-y-8">\\ `);
          if (unref(data).closedAt) {
            _push(`<div><p class="section-grid-label">Closure date</p><p>${ssrInterpolate(unref(useDateFormat)(unref(data).closedAt, "MMM DD, YYYY hh:mm aa"))}</p></div>`);
          } else {
            _push(`<!---->`);
          }
          if (unref(data).closedReason) {
            _push(`<div><p class="section-grid-label">Reason for closure</p><p>${ssrInterpolate(unref(data).closedReason)}</p></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(data).status === "paused") {
          _push(`<div class="space-y-8">`);
          if (unref(data).pausedAt) {
            _push(`<div><p class="section-grid-label">Pause date</p><p>${ssrInterpolate(unref(useDateFormat)(unref(data).pausedAt, "MMM DD, YYYY hh:mm aa"))}</p></div>`);
          } else {
            _push(`<!---->`);
          }
          if (unref(data).pausedReason) {
            _push(`<div><p class="section-grid-label">Reason for pause</p><p>${ssrInterpolate(unref(data).pausedReason)}</p></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(data).status === "terminated") {
          _push(`<div class="space-y-8">`);
          if (unref(data).terminatedAt) {
            _push(`<div><p class="section-grid-label">Termination date</p><p>${ssrInterpolate(unref(useDateFormat)(unref(data).terminatedAt, "MMM DD, YYYY hh:mm aa"))}</p></div>`);
          } else {
            _push(`<!---->`);
          }
          if (unref(data).terminatedReason) {
            _push(`<div><p class="section-grid-label">Reason for termination</p><p>${ssrInterpolate(unref(data).terminatedReason)}</p></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</section><section><h3 class="text-xl">Meta Data</h3>`);
        _push(ssrRenderComponent(_component_NuxtSeparator, { class: "my-2" }, null, _parent));
        _push(`<div class="section-grid"><div><p class="section-grid-label">Created</p><p>${ssrInterpolate(unref(useDateFormat)(unref(data).createdAt, "MMM DD, YYYY hh:mm aa"))}</p></div><div><p class="section-grid-label">Last Updated</p><p>${ssrInterpolate(unref(useDateFormat)(unref(data).updatedAt, "MMM DD, YYYY hh:mm aa"))}</p></div></div></section></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/investments/[investmentId]/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-rQmOkd_H.mjs.map
