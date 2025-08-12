import { computed, ref, unref, mergeProps, withCtx, renderSlot, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderClass, ssrRenderSlot } from 'vue/server-renderer';
import { useForwardPropsEmits, NumberFieldRoot, NumberFieldInput, NumberFieldIncrement, NumberFieldDecrement } from 'reka-ui';
import { reactivePick } from '@vueuse/core';
import { f as useLocale, g as useAppConfig, s as useFormField, k as useButtonGroup, t as tv, c as _sfc_main$7 } from './server.mjs';

const theme = {
  "slots": {
    "root": "relative inline-flex items-center",
    "base": [
      "w-full rounded-md border-0 placeholder:text-dimmed focus:outline-none disabled:cursor-not-allowed disabled:opacity-75",
      "transition-colors"
    ],
    "increment": "absolute flex items-center",
    "decrement": "absolute flex items-center"
  },
  "variants": {
    "buttonGroup": {
      "horizontal": {
        "root": "group has-focus-visible:z-[1]",
        "base": "group-not-only:group-first:rounded-e-none group-not-only:group-last:rounded-s-none group-not-last:group-not-first:rounded-none"
      },
      "vertical": {
        "root": "group has-focus-visible:z-[1]",
        "base": "group-not-only:group-first:rounded-b-none group-not-only:group-last:rounded-t-none group-not-last:group-not-first:rounded-none"
      }
    },
    "color": {
      "primary": "",
      "secondary": "",
      "success": "",
      "info": "",
      "warning": "",
      "error": "",
      "neutral": ""
    },
    "size": {
      "xs": "px-2 py-1 text-xs gap-1",
      "sm": "px-2.5 py-1.5 text-xs gap-1.5",
      "md": "px-2.5 py-1.5 text-sm gap-1.5",
      "lg": "px-3 py-2 text-sm gap-2",
      "xl": "px-3 py-2 text-base gap-2"
    },
    "variant": {
      "outline": "text-highlighted bg-default ring ring-inset ring-accented",
      "soft": "text-highlighted bg-elevated/50 hover:bg-elevated focus:bg-elevated disabled:bg-elevated/50",
      "subtle": "text-highlighted bg-elevated ring ring-inset ring-accented",
      "ghost": "text-highlighted bg-transparent hover:bg-elevated focus:bg-elevated disabled:bg-transparent dark:disabled:bg-transparent",
      "none": "text-highlighted bg-transparent"
    },
    "disabled": {
      "true": {
        "increment": "opacity-75 cursor-not-allowed",
        "decrement": "opacity-75 cursor-not-allowed"
      }
    },
    "orientation": {
      "horizontal": {
        "base": "text-center",
        "increment": "inset-y-0 end-0 pe-1",
        "decrement": "inset-y-0 start-0 ps-1"
      },
      "vertical": {
        "increment": "top-0 end-0 pe-1 [&>button]:py-0 scale-80",
        "decrement": "bottom-0 end-0 pe-1 [&>button]:py-0 scale-80"
      }
    },
    "highlight": {
      "true": ""
    }
  },
  "compoundVariants": [
    {
      "color": "primary",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
    },
    {
      "color": "secondary",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary"
    },
    {
      "color": "success",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-success"
    },
    {
      "color": "info",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-info"
    },
    {
      "color": "warning",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-warning"
    },
    {
      "color": "error",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-error"
    },
    {
      "color": "primary",
      "highlight": true,
      "class": "ring ring-inset ring-primary"
    },
    {
      "color": "secondary",
      "highlight": true,
      "class": "ring ring-inset ring-secondary"
    },
    {
      "color": "success",
      "highlight": true,
      "class": "ring ring-inset ring-success"
    },
    {
      "color": "info",
      "highlight": true,
      "class": "ring ring-inset ring-info"
    },
    {
      "color": "warning",
      "highlight": true,
      "class": "ring ring-inset ring-warning"
    },
    {
      "color": "error",
      "highlight": true,
      "class": "ring ring-inset ring-error"
    },
    {
      "color": "neutral",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-inverted"
    },
    {
      "color": "neutral",
      "highlight": true,
      "class": "ring ring-inset ring-inverted"
    },
    {
      "orientation": "horizontal",
      "size": "xs",
      "class": "px-7"
    },
    {
      "orientation": "horizontal",
      "size": "sm",
      "class": "px-8"
    },
    {
      "orientation": "horizontal",
      "size": "md",
      "class": "px-9"
    },
    {
      "orientation": "horizontal",
      "size": "lg",
      "class": "px-10"
    },
    {
      "orientation": "horizontal",
      "size": "xl",
      "class": "px-11"
    },
    {
      "orientation": "vertical",
      "size": "xs",
      "class": "pe-7"
    },
    {
      "orientation": "vertical",
      "size": "sm",
      "class": "pe-8"
    },
    {
      "orientation": "vertical",
      "size": "md",
      "class": "pe-9"
    },
    {
      "orientation": "vertical",
      "size": "lg",
      "class": "pe-10"
    },
    {
      "orientation": "vertical",
      "size": "xl",
      "class": "pe-11"
    }
  ],
  "defaultVariants": {
    "size": "md",
    "color": "primary",
    "variant": "outline"
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign({ inheritAttrs: false }, {
  __name: "NuxtInputNumber",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    placeholder: { type: String, required: false },
    color: { type: null, required: false },
    variant: { type: null, required: false },
    size: { type: null, required: false },
    highlight: { type: Boolean, required: false },
    orientation: { type: String, required: false, default: "horizontal" },
    increment: { type: Object, required: false },
    incrementIcon: { type: String, required: false },
    incrementDisabled: { type: Boolean, required: false },
    decrement: { type: Object, required: false },
    decrementIcon: { type: String, required: false },
    decrementDisabled: { type: Boolean, required: false },
    autofocus: { type: Boolean, required: false },
    autofocusDelay: { type: Number, required: false },
    locale: { type: String, required: false },
    class: { type: null, required: false },
    ui: { type: null, required: false },
    modelValue: { type: [Number, null], required: false },
    defaultValue: { type: Number, required: false },
    min: { type: Number, required: false },
    max: { type: Number, required: false },
    step: { type: Number, required: false },
    stepSnapping: { type: Boolean, required: false },
    disabled: { type: Boolean, required: false },
    required: { type: Boolean, required: false },
    id: { type: String, required: false },
    name: { type: String, required: false },
    formatOptions: { type: null, required: false },
    disableWheelChange: { type: Boolean, required: false },
    invertWheelChange: { type: Boolean, required: false }
  },
  emits: ["update:modelValue", "blur", "change"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { t, code: codeLocale } = useLocale();
    const appConfig = useAppConfig();
    const rootProps = useForwardPropsEmits(reactivePick(props, "as", "modelValue", "defaultValue", "min", "max", "step", "stepSnapping", "formatOptions", "disableWheelChange", "invertWheelChange"), emits);
    const { emitFormBlur, emitFormFocus, emitFormChange, emitFormInput, id, color, size: formGroupSize, name, highlight, disabled, ariaAttrs } = useFormField(props);
    const { orientation, size: buttonGroupSize } = useButtonGroup(props);
    const locale = computed(() => props.locale || codeLocale.value);
    const inputSize = computed(() => buttonGroupSize.value || formGroupSize.value);
    const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.inputNumber || {} })({
      color: color.value,
      variant: props.variant,
      size: inputSize.value,
      highlight: highlight.value,
      orientation: props.orientation,
      buttonGroup: orientation.value
    }));
    const incrementIcon = computed(() => props.incrementIcon || (props.orientation === "horizontal" ? appConfig.ui.icons.plus : appConfig.ui.icons.chevronUp));
    const decrementIcon = computed(() => props.decrementIcon || (props.orientation === "horizontal" ? appConfig.ui.icons.minus : appConfig.ui.icons.chevronDown));
    const inputRef = ref(null);
    function onUpdate(value) {
      const event = new Event("change", { target: { value } });
      emits("change", event);
      emitFormChange();
      emitFormInput();
    }
    function onBlur(event) {
      emitFormBlur();
      emits("blur", event);
    }
    __expose({
      inputRef
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(NumberFieldRoot), mergeProps(unref(rootProps), {
        id: unref(id),
        class: ui.value.root({ class: [props.ui?.root, props.class] }),
        name: unref(name),
        disabled: unref(disabled),
        locale: locale.value,
        "onUpdate:modelValue": onUpdate
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(NumberFieldInput), mergeProps({ ..._ctx.$attrs, ...unref(ariaAttrs) }, {
              ref_key: "inputRef",
              ref: inputRef,
              placeholder: __props.placeholder,
              required: __props.required,
              class: ui.value.base({ class: props.ui?.base }),
              onBlur,
              onFocus: unref(emitFormFocus)
            }), null, _parent2, _scopeId));
            _push2(`<div class="${ssrRenderClass(ui.value.increment({ class: props.ui?.increment }))}"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(NumberFieldIncrement), {
              "as-child": "",
              disabled: unref(disabled) || __props.incrementDisabled
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  ssrRenderSlot(_ctx.$slots, "increment", {}, () => {
                    _push3(ssrRenderComponent(_sfc_main$7, mergeProps({
                      icon: incrementIcon.value,
                      color: unref(color),
                      size: __props.size,
                      variant: "link",
                      "aria-label": unref(t)("inputNumber.increment")
                    }, typeof __props.increment === "object" ? __props.increment : void 0), null, _parent3, _scopeId2));
                  }, _push3, _parent3, _scopeId2);
                } else {
                  return [
                    renderSlot(_ctx.$slots, "increment", {}, () => [
                      createVNode(_sfc_main$7, mergeProps({
                        icon: incrementIcon.value,
                        color: unref(color),
                        size: __props.size,
                        variant: "link",
                        "aria-label": unref(t)("inputNumber.increment")
                      }, typeof __props.increment === "object" ? __props.increment : void 0), null, 16, ["icon", "color", "size", "aria-label"])
                    ])
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
            _push2(`</div><div class="${ssrRenderClass(ui.value.decrement({ class: props.ui?.decrement }))}"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(NumberFieldDecrement), {
              "as-child": "",
              disabled: unref(disabled) || __props.decrementDisabled
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  ssrRenderSlot(_ctx.$slots, "decrement", {}, () => {
                    _push3(ssrRenderComponent(_sfc_main$7, mergeProps({
                      icon: decrementIcon.value,
                      color: unref(color),
                      size: __props.size,
                      variant: "link",
                      "aria-label": unref(t)("inputNumber.decrement")
                    }, typeof __props.decrement === "object" ? __props.decrement : void 0), null, _parent3, _scopeId2));
                  }, _push3, _parent3, _scopeId2);
                } else {
                  return [
                    renderSlot(_ctx.$slots, "decrement", {}, () => [
                      createVNode(_sfc_main$7, mergeProps({
                        icon: decrementIcon.value,
                        color: unref(color),
                        size: __props.size,
                        variant: "link",
                        "aria-label": unref(t)("inputNumber.decrement")
                      }, typeof __props.decrement === "object" ? __props.decrement : void 0), null, 16, ["icon", "color", "size", "aria-label"])
                    ])
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode(unref(NumberFieldInput), mergeProps({ ..._ctx.$attrs, ...unref(ariaAttrs) }, {
                ref_key: "inputRef",
                ref: inputRef,
                placeholder: __props.placeholder,
                required: __props.required,
                class: ui.value.base({ class: props.ui?.base }),
                onBlur,
                onFocus: unref(emitFormFocus)
              }), null, 16, ["placeholder", "required", "class", "onFocus"]),
              createVNode("div", {
                class: ui.value.increment({ class: props.ui?.increment })
              }, [
                createVNode(unref(NumberFieldIncrement), {
                  "as-child": "",
                  disabled: unref(disabled) || __props.incrementDisabled
                }, {
                  default: withCtx(() => [
                    renderSlot(_ctx.$slots, "increment", {}, () => [
                      createVNode(_sfc_main$7, mergeProps({
                        icon: incrementIcon.value,
                        color: unref(color),
                        size: __props.size,
                        variant: "link",
                        "aria-label": unref(t)("inputNumber.increment")
                      }, typeof __props.increment === "object" ? __props.increment : void 0), null, 16, ["icon", "color", "size", "aria-label"])
                    ])
                  ]),
                  _: 3
                }, 8, ["disabled"])
              ], 2),
              createVNode("div", {
                class: ui.value.decrement({ class: props.ui?.decrement })
              }, [
                createVNode(unref(NumberFieldDecrement), {
                  "as-child": "",
                  disabled: unref(disabled) || __props.decrementDisabled
                }, {
                  default: withCtx(() => [
                    renderSlot(_ctx.$slots, "decrement", {}, () => [
                      createVNode(_sfc_main$7, mergeProps({
                        icon: decrementIcon.value,
                        color: unref(color),
                        size: __props.size,
                        variant: "link",
                        "aria-label": unref(t)("inputNumber.decrement")
                      }, typeof __props.decrement === "object" ? __props.decrement : void 0), null, 16, ["icon", "color", "size", "aria-label"])
                    ])
                  ]),
                  _: 3
                }, 8, ["disabled"])
              ], 2)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/InputNumber.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=InputNumber-DfQ_yysT.mjs.map
