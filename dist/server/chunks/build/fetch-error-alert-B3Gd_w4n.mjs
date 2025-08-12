import { _ as _sfc_main$1 } from './Alert-CXdXSwrA.mjs';
import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "fetch-error-alert",
  __ssrInlineRender: true,
  props: {
    title: { default: "Error" },
    message: { default: "" },
    showRetry: { type: Boolean, default: false }
  },
  emits: ["retry"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtAlert = _sfc_main$1;
      _push(ssrRenderComponent(_component_NuxtAlert, mergeProps({
        color: "error",
        variant: "subtle",
        icon: "lucide-circle-x",
        title: _ctx.title,
        description: _ctx.message,
        orientation: _ctx.showRetry ? "horizontal" : "vertical",
        actions: !_ctx.showRetry ? [] : [
          {
            label: "Retry",
            icon: "lucide-refresh-cw",
            onClick: () => emit("retry"),
            color: "error",
            class: "py-2"
          }
        ]
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/fetch-error-alert.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_14 = Object.assign(_sfc_main, { __name: "FetchErrorAlert" });

export { __nuxt_component_14 as _ };
//# sourceMappingURL=fetch-error-alert-B3Gd_w4n.mjs.map
