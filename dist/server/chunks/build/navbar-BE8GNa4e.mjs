import { _ as __nuxt_component_0 } from './server.mjs';
import { defineComponent, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "navbar",
  __ssrInlineRender: true,
  props: {
    items: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="p-1.5 w-fit bg-elevated/70 rounded-md flex flex-wrap items-center gap-x-2 gap-y-1"><!--[-->`);
      ssrRenderList(_ctx.items, (item) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: item.label,
          to: item.default ? _ctx.$route.fullPath : item.to,
          class: "px-2 py-1.5 rounded-md text-sm font-semibold text-muted/70 transition-colors min-w-0",
          "exact-active-class": "bg-default shadow-sm text-muted!"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(item.label)}`);
            } else {
              return [
                createTextVNode(toDisplayString(item.label), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/nuxt/navbar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main, { __name: "NuxtNavbar" });

export { __nuxt_component_2 as _ };
//# sourceMappingURL=navbar-BE8GNa4e.mjs.map
