import { defineComponent, ref, useModel, useAttrs, unref, mergeProps, createSlots, withCtx, renderSlot, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
import { c as _sfc_main$7 } from './server.mjs';
import { _ as _sfc_main$1 } from './Input-BtIiAvs7.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "password",
  __ssrInlineRender: true,
  props: {
    "modelValue": {},
    "modelModifiers": {}
  },
  emits: ["update:modelValue"],
  setup(__props) {
    const show = ref(false);
    const modelValue = useModel(__props, "modelValue");
    const attrs = useAttrs();
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$1), mergeProps(unref(attrs), {
        modelValue: modelValue.value,
        "onUpdate:modelValue": ($event) => modelValue.value = $event,
        type: show.value ? "text" : "password",
        ui: { ...unref(attrs).ui ?? {}, trailing: "pe-1" }
      }, _attrs), createSlots({
        trailing: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "trailing", {}, () => {
              _push2(ssrRenderComponent(unref(_sfc_main$7), {
                color: "neutral",
                variant: "link",
                size: "sm",
                icon: show.value ? "i-lucide-eye-off" : "i-lucide-eye",
                "aria-label": show.value ? "Hide password" : "Show password",
                "aria-pressed": show.value,
                "aria-controls": "password",
                onClick: ($event) => show.value = !show.value
              }, null, _parent2, _scopeId));
            }, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "trailing", {}, () => [
                createVNode(unref(_sfc_main$7), {
                  color: "neutral",
                  variant: "link",
                  size: "sm",
                  icon: show.value ? "i-lucide-eye-off" : "i-lucide-eye",
                  "aria-label": show.value ? "Hide password" : "Show password",
                  "aria-pressed": show.value,
                  "aria-controls": "password",
                  onClick: ($event) => show.value = !show.value
                }, null, 8, ["icon", "aria-label", "aria-pressed", "onClick"])
              ])
            ];
          }
        }),
        _: 2
      }, [
        _ctx.$slots.leading ? {
          name: "leading",
          fn: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "leading", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "leading")
              ];
            }
          }),
          key: "0"
        } : void 0
      ]), _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/nuxt/password.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_3 = Object.assign(_sfc_main, { __name: "NuxtPassword" });

export { __nuxt_component_3 as _ };
//# sourceMappingURL=password-DSn7MFs0.mjs.map
