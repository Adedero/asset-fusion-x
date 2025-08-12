import { d as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';

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
      const _component_NuxtImg = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid *:[grid-column:1/2] *:[grid-row:1/2]" }, _attrs))}><div class="flex flex-col items-center justify-center z-10"><div class="max-w-[35rem] text-center p-4 bg-slate-700/30 border border-white/30 backdrop-blur-[5px] rounded-xl"><h1 class="text-6xl font-medium">${ssrInterpolate(_ctx.heading)}</h1><div class="mt-5"><p>${ssrInterpolate(_ctx.subheading)}</p></div></div></div><div class="h-96">`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        placeholder: "",
        src: _ctx.bgImage,
        class: "h-full w-full object-cover brightness-50"
      }, null, _parent));
      _push(`</div></div>`);
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
//# sourceMappingURL=page-hero-BhZk5D6b.mjs.map
