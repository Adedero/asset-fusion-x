import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "page-hero",
  __ssrInlineRender: true,
  props: {
    heading: {},
    subheading: {},
    bgImage: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid *:[grid-column:1/2] *:[grid-row:1/2]" }, _attrs))}><div class="flex flex-col items-center justify-center z-10"><div class="max-w-[35rem] text-center p-4 bg-slate-700/30 border border-white/30 backdrop-blur-[5px] rounded-xl"><h1 class="text-6xl font-medium">${ssrInterpolate(__props.heading)}</h1><div class="mt-5"><p>${ssrInterpolate(__props.subheading)}</p></div></div></div><div class="h-96"><img${ssrRenderAttr("src", __props.bgImage)} class="h-full w-full object-cover brightness-50"></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/main/page-hero.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main, { __name: "MainPageHero" });

export { __nuxt_component_0 as _ };
//# sourceMappingURL=page-hero-C4Q3F2YP.mjs.map
