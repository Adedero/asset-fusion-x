import { _ as __nuxt_component_0, e as _sfc_main$d } from './server.mjs';
import { defineComponent, computed, mergeProps, unref, withCtx, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "cta-banner",
  __ssrInlineRender: true,
  props: {
    color: { default: "primary" },
    title: { default: "" },
    description: { default: "" },
    buttonHref: { default: "" },
    buttonLabel: { default: "" },
    buttonIcon: { default: "" }
  },
  setup(__props) {
    const classes = computed(() => {
      const map = {
        primary: {
          card: "bg-gradient-to-br from-tertiary-400 to-primary-700",
          text: "",
          button: "bg-white text-primary-500 hover:bg-slate-100"
        },
        neutral: {
          card: "bg-slate-800/50 border border-slate-700 bg-gradient-t-b from-primary/50",
          text: "text-muted",
          button: "bg-primary-500 hover:bg-primary-600"
        }
      };
      return map[__props.color];
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_NuxtIcon = _sfc_main$d;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "px-12 pt-4 pb-12" }, _attrs))}><div class="${ssrRenderClass([unref(classes).card, "py-10 px-40 rounded-2xl text-center"])}"><h4 class="text-3xl font-semibold">${ssrInterpolate(_ctx.title || "Ready To Take Control of Your Financial Future?")}</h4><p class="${ssrRenderClass([unref(classes).text, "mt-5"])}">${ssrInterpolate(_ctx.description || "Let us help you achieve your financial goals with personalized strategies and expert advice. Schedule a free consultation today to start your journey toward financial freedom.")}</p><div class="mt-5 grid place-content-center">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: _ctx.buttonHref || "/sign-up"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button class="${ssrRenderClass([unref(classes).button, "cursor-pointer pointer-events-none rounded-full font-medium px-6 py-3 flex items-center gap-2 transition-colors"])}"${_scopeId}><p${_scopeId}>${ssrInterpolate(_ctx.buttonLabel || "Create Account")}</p>`);
            _push2(ssrRenderComponent(_component_NuxtIcon, {
              name: _ctx.buttonIcon || "lucide:circle-arrow-right",
              size: "1.2rem"
            }, null, _parent2, _scopeId));
            _push2(`</button>`);
          } else {
            return [
              createVNode("button", {
                class: ["cursor-pointer pointer-events-none rounded-full font-medium px-6 py-3 flex items-center gap-2 transition-colors", unref(classes).button]
              }, [
                createVNode("p", null, toDisplayString(_ctx.buttonLabel || "Create Account"), 1),
                createVNode(_component_NuxtIcon, {
                  name: _ctx.buttonIcon || "lucide:circle-arrow-right",
                  size: "1.2rem"
                }, null, 8, ["name"])
              ], 2)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/main/cta-banner.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main, { __name: "MainCtaBanner" });

export { __nuxt_component_1 as _ };
//# sourceMappingURL=cta-banner-DdIrk4Vz.mjs.map
