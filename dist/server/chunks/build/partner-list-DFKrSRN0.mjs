import { defineComponent, mergeProps, withCtx, unref, createBlock, openBlock, Fragment, renderList, createVNode, h, useSSRContext } from 'vue';
import { Marquee } from 'vue-fast-marquee';
import { d as __nuxt_component_0$1 } from './server.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList } from 'vue/server-renderer';

const _sfc_main$1 = {
  name: "NuxtMarquee",
  emits: ["finish", "cycleComplete"],
  props: [
    "style",
    "class",
    "autoFill",
    "play",
    "pauseOnHover",
    "pauseOnClick",
    "direction",
    "speed",
    "delay",
    "loop",
    "gradient",
    "gradientColor",
    "gradientWidth"
  ],
  setup(props, { slots, emit }) {
    return () => h(
      Marquee,
      {
        ...props,
        onCycleComplete: () => emit("cycleComplete"),
        onFinish: () => emit("finish")
      },
      slots
    );
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/nuxt-marquee/dist/runtime/components/NuxtMarquee.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main$1, { __name: "NuxtMarquee" });
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
      const _component_NuxtMarquee = __nuxt_component_0;
      const _component_NuxtImg = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "my-16 py-8 bg-white" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_NuxtMarquee, {
        "auto-fill": "",
        "pause-on-hover": ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(unref(partners), (partner) => {
              _push2(`<div class="flex items-center gap-2 brightness-150 transition-transform saturate-0 hover:saturate-100 hover:scale-110 hover:brightness-100 mx-10"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_NuxtImg, {
                src: partner.image,
                alt: partner.name,
                width: "100"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(unref(partners), (partner) => {
                return openBlock(), createBlock("div", {
                  key: partner.name,
                  class: "flex items-center gap-2 brightness-150 transition-transform saturate-0 hover:saturate-100 hover:scale-110 hover:brightness-100 mx-10"
                }, [
                  createVNode(_component_NuxtImg, {
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
const __nuxt_component_1 = Object.assign(_sfc_main, { __name: "MainPartnerList" });

export { __nuxt_component_1 as _ };
//# sourceMappingURL=partner-list-DFKrSRN0.mjs.map
