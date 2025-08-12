import { _ as __nuxt_component_14 } from './fetch-error-alert-B3Gd_w4n.mjs';
import { defineComponent, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
import { a5 as normalizeException } from '../nitro/nitro.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "my-page",
  __ssrInlineRender: true,
  props: {
    error: {}
  },
  emits: ["refresh"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const formattedError = computed(() => normalizeException(__props.error));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_FetchErrorAlert = __nuxt_component_14;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full h-full" }, _attrs))}>`);
      if (_ctx.error) {
        _push(`<div class="w-full h-full"><div class="w-full h-full flex-center">`);
        _push(ssrRenderComponent(_component_FetchErrorAlert, {
          class: "max-w-[28rem]",
          "show-retry": "",
          title: unref(formattedError).name,
          message: unref(formattedError).message,
          onRetry: () => emit("refresh")
        }, null, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<div>`);
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
        _push(`</div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/my-page.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main, { __name: "MyPage" });

export { __nuxt_component_0 as _ };
//# sourceMappingURL=my-page-Cgd-8gXO.mjs.map
