import { defineComponent, mergeProps, withCtx, unref, createBlock, openBlock, Fragment, renderList, createVNode, computed, renderSlot, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrRenderSlot } from 'vue/server-renderer';
import { Primitive } from 'reka-ui';
import { f as useAppConfig, t as tv } from './server.mjs';

const theme = {
  "slots": {
    "root": "group relative flex items-center overflow-hidden gap-(--gap) [--gap:--spacing(16)] [--duration:20s]",
    "content": "flex items-center shrink-0 justify-around gap-(--gap) min-w-max"
  },
  "variants": {
    "orientation": {
      "horizontal": {
        "content": "w-full"
      },
      "vertical": {
        "content": "h-full"
      }
    },
    "pauseOnHover": {
      "true": {
        "content": "group-hover:[animation-play-state:paused]"
      }
    },
    "reverse": {
      "true": {
        "content": "![animation-direction:reverse]"
      }
    },
    "overlay": {
      "true": {
        "root": 'before:absolute before:pointer-events-none before:content-[""] before:z-2 before:from-default before:to-transparent after:absolute after:pointer-events-none after:content-[""] after:z-2 after:from-default after:to-transparent'
      }
    }
  },
  "compoundVariants": [
    {
      "orientation": "horizontal",
      "class": {
        "root": "flex-row",
        "content": "flex-row animate-[marquee_var(--duration)_linear_infinite] rtl:animate-[marquee-rtl_var(--duration)_linear_infinite] backface-hidden"
      }
    },
    {
      "orientation": "horizontal",
      "overlay": true,
      "class": {
        "root": "before:inset-y-0 before:left-0 before:h-full before:w-1/3 before:bg-gradient-to-r after:inset-y-0 after:right-0 after:h-full after:w-1/3 after:bg-gradient-to-l backface-hidden"
      }
    },
    {
      "orientation": "vertical",
      "class": {
        "root": "flex-col",
        "content": "flex-col animate-[marquee-vertical_var(--duration)_linear_infinite] rtl:animate-[marquee-vertical-rtl_var(--duration)_linear_infinite] h-[fit-content] backface-hidden"
      }
    },
    {
      "orientation": "vertical",
      "overlay": true,
      "class": {
        "root": "before:inset-x-0 before:top-0 before:w-full before:h-1/3 before:bg-gradient-to-b after:inset-x-0 after:bottom-0 after:w-full after:h-1/3 after:bg-gradient-to-t backface-hidden"
      }
    }
  ]
};
const _sfc_main$1 = {
  __name: "NuxtMarquee",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    pauseOnHover: { type: Boolean, required: false },
    reverse: { type: Boolean, required: false },
    orientation: { type: null, required: false, default: "horizontal" },
    repeat: { type: Number, required: false, default: 4 },
    overlay: { type: Boolean, required: false, default: true },
    class: { type: null, required: false },
    ui: { type: null, required: false }
  },
  setup(__props) {
    const props = __props;
    const appConfig = useAppConfig();
    const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.marquee || {} })({
      pauseOnHover: props.pauseOnHover,
      orientation: props.orientation,
      reverse: props.reverse,
      overlay: props.overlay
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        as: __props.as,
        class: ui.value.root({ class: [props.ui?.root, props.class] })
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(__props.repeat, (i) => {
              _push2(`<div class="${ssrRenderClass(ui.value.content({ class: [props.ui?.content] }))}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(__props.repeat, (i) => {
                return openBlock(), createBlock("div", {
                  key: i,
                  class: ui.value.content({ class: [props.ui?.content] })
                }, [
                  renderSlot(_ctx.$slots, "default")
                ], 2);
              }), 128))
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/Marquee.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const partners = [
  {
    name: "Avaloq",
    image: "/img/partners/avaloq.svg"
  },
  {
    name: "Metaco",
    image: "/img/partners/metaco.png"
  },
  {
    name: "Sygnum",
    image: "/img/partners/sygnum.png"
  },
  {
    name: "OTransfer",
    image: "/img/partners/otransfer.png"
  },
  {
    name: "Monarch",
    image: "/img/partners/monarch.png"
  },
  {
    name: "Holded",
    image: "/img/partners/holded.png"
  },
  {
    name: "AlphaSense",
    image: "/img/partners/alphasense.png"
  }
];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "partner-list",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtMarquee = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "my-16 py-8 bg-white" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_NuxtMarquee, {
        "auto-fill": "",
        "pause-on-hover": ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(unref(partners), (partner) => {
              _push2(`<div class="flex items-center gap-2 brightness-150 transition-transform saturate-0 hover:saturate-100 hover:scale-110 hover:brightness-100 mx-10"${_scopeId}><img${ssrRenderAttr("src", partner.image)}${ssrRenderAttr("alt", partner.name)} width="100"${_scopeId}></div>`);
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(unref(partners), (partner) => {
                return openBlock(), createBlock("div", {
                  key: partner.name,
                  class: "flex items-center gap-2 brightness-150 transition-transform saturate-0 hover:saturate-100 hover:scale-110 hover:brightness-100 mx-10"
                }, [
                  createVNode("img", {
                    src: partner.image,
                    alt: partner.name,
                    width: "100"
                  }, null, 8, ["src", "alt"])
                ]);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/main/partner-list.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main, { __name: "MainPartnerList" });

export { __nuxt_component_0 as _ };
//# sourceMappingURL=partner-list-DRCK5DJT.mjs.map
