import { c as _sfc_main$9 } from './server.mjs';
import { defineComponent, mergeModels, useModel, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "simple-paginator",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    allLoaded: { type: Boolean, default: false },
    totalPages: { default: () => void 0 },
    rows: { default: () => void 0 },
    length: { default: () => void 0 }
  }, {
    "page": { default: 0 },
    "pageModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["next", "prev"], ["update:page"]),
  setup(__props, { emit: __emit }) {
    const page = useModel(__props, "page");
    const emit = __emit;
    const prev = () => {
      if (page.value === 0) return;
      page.value -= 1;
      emit("prev", page.value);
    };
    const next = () => {
      if (__props.allLoaded || __props.totalPages !== void 0 && page.value >= __props.totalPages - 1)
        return;
      page.value += 1;
      emit("next", page.value);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtButton = _sfc_main$9;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full select-none" }, _attrs))}><div class="w-full flex items-center justify-center gap-2 bg-white p-2 rounded-lg">`);
      _push(ssrRenderComponent(_component_NuxtButton, {
        "aria-label": "Previous Page",
        disabled: page.value < 1,
        size: "sm",
        color: "neutral",
        variant: "outline",
        icon: "lucide:chevron-left",
        onClick: prev
      }, null, _parent));
      _push(`<div class="border border-default rounded-md flex p-1 items-center gap-2 flex-shrink-0 text-sm" aria-label="Current Page">`);
      if (_ctx.rows && _ctx.length) {
        _push(`<div class="text-center flex-shrink-0 py-1 px-2"><span class="font-medium">${ssrInterpolate(page.value * _ctx.rows + 1)}</span> to <span class="font-medium">${ssrInterpolate(Math.min((page.value + 1) * _ctx.rows, _ctx.length))}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<p class="border border-default text-center p-1 px-2 rounded-md"> page <span class="font-medium text-muted">${ssrInterpolate(page.value + 1)}</span></p></div>`);
      _push(ssrRenderComponent(_component_NuxtButton, {
        "aria-label": "Next Page",
        disabled: _ctx.allLoaded || _ctx.totalPages !== void 0 && page.value >= _ctx.totalPages - 1,
        size: "sm",
        color: "neutral",
        variant: "outline",
        "trailing-icon": "lucide:chevron-right",
        onClick: next
      }, null, _parent));
      _push(`</div>`);
      if (_ctx.allLoaded) {
        _push(`<div class="text-center mt-2 text-sm text-muted"> All data loaded </div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/nuxt/simple-paginator.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_11 = Object.assign(_sfc_main, { __name: "NuxtSimplePaginator" });

export { __nuxt_component_11 as _ };
//# sourceMappingURL=simple-paginator-CUjeetHH.mjs.map
