import { d as _sfc_main$f } from './server.mjs';
import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';

const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NuxtIcon = _sfc_main$f;
  _push(ssrRenderComponent(_component_NuxtIcon, mergeProps({
    name: "lucide:loader",
    size: "2rem",
    class: "animate animate-spin"
  }, _attrs), null, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/nuxt/loader.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]), { __name: "NuxtLoader" });

export { __nuxt_component_0 as _ };
//# sourceMappingURL=loader-CegSv3fP.mjs.map
