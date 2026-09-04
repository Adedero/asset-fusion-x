import { a as _sfc_main$a } from './server.mjs';
import { defineComponent, ref, unref, useSSRContext } from 'vue';
import { ssrRenderSlot, ssrRenderComponent } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "text-copy-button",
  __ssrInlineRender: true,
  props: {
    text: { default: "" },
    resetAfter: { default: 3e3 },
    color: { default: "neutral" },
    variant: { default: "soft" },
    size: { default: "lg" },
    icon: { default: "lucide:clipboard" },
    label: { default: () => void 0 }
  },
  setup(__props) {
    const buttonIcon = ref(__props.icon);
    const copy = async () => {
      return;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtButton = _sfc_main$a;
      ssrRenderSlot(_ctx.$slots, "default", { copy }, () => {
        _push(ssrRenderComponent(_component_NuxtButton, {
          color: __props.color,
          size: __props.size,
          variant: __props.variant,
          label: __props.label,
          icon: unref(buttonIcon),
          onClick: copy
        }, null, _parent));
      }, _push, _parent);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/text-copy-button.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_11 = Object.assign(_sfc_main, { __name: "TextCopyButton" });

export { __nuxt_component_11 as _ };
//# sourceMappingURL=text-copy-button-D8zQ88_8.mjs.map
