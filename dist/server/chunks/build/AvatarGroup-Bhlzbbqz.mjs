import { useSlots, computed, provide, unref, mergeProps, withCtx, createVNode, resolveDynamicComponent, createBlock, createCommentVNode, openBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrRenderVNode } from 'vue/server-renderer';
import { Primitive } from 'reka-ui';
import { g as useAppConfig, t as tv, L as avatarGroupInjectionKey, j as _sfc_main$a } from './server.mjs';

const theme = {
  "slots": {
    "root": "inline-flex flex-row-reverse justify-end",
    "base": "relative rounded-full ring-bg first:me-0"
  },
  "variants": {
    "size": {
      "3xs": {
        "base": "ring -me-0.5"
      },
      "2xs": {
        "base": "ring -me-0.5"
      },
      "xs": {
        "base": "ring -me-0.5"
      },
      "sm": {
        "base": "ring-2 -me-1.5"
      },
      "md": {
        "base": "ring-2 -me-1.5"
      },
      "lg": {
        "base": "ring-2 -me-1.5"
      },
      "xl": {
        "base": "ring-3 -me-2"
      },
      "2xl": {
        "base": "ring-3 -me-2"
      },
      "3xl": {
        "base": "ring-3 -me-2"
      }
    }
  },
  "defaultVariants": {
    "size": "md"
  }
};
const _sfc_main = {
  __name: "NuxtAvatarGroup",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    size: { type: null, required: false },
    max: { type: [Number, String], required: false },
    class: { type: null, required: false },
    ui: { type: null, required: false }
  },
  setup(__props) {
    const props = __props;
    const slots = useSlots();
    const appConfig = useAppConfig();
    const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.avatarGroup || {} })({
      size: props.size
    }));
    const max = computed(() => typeof props.max === "string" ? Number.parseInt(props.max, 10) : props.max);
    const children = computed(() => {
      let children2 = slots.default?.();
      if (children2?.length) {
        children2 = children2.flatMap((child) => {
          if (typeof child.type === "symbol") {
            if (typeof child.children === "string") {
              return;
            }
            return child.children;
          }
          return child;
        }).filter(Boolean);
      }
      return children2 || [];
    });
    const visibleAvatars = computed(() => {
      if (!children.value.length) {
        return [];
      }
      if (!max.value || max.value <= 0) {
        return [...children.value].reverse();
      }
      return [...children.value].slice(0, max.value).reverse();
    });
    const hiddenCount = computed(() => {
      if (!children.value.length) {
        return 0;
      }
      return children.value.length - visibleAvatars.value.length;
    });
    provide(avatarGroupInjectionKey, computed(() => ({
      size: props.size
    })));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        as: __props.as,
        class: ui.value.root({ class: [props.ui?.root, props.class] })
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (hiddenCount.value > 0) {
              _push2(ssrRenderComponent(_sfc_main$a, {
                text: `+${hiddenCount.value}`,
                class: ui.value.base({ class: props.ui?.base })
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--[-->`);
            ssrRenderList(visibleAvatars.value, (avatar, count) => {
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(avatar), {
                key: count,
                class: ui.value.base({ class: props.ui?.base })
              }, null), _parent2, _scopeId);
            });
            _push2(`<!--]-->`);
          } else {
            return [
              hiddenCount.value > 0 ? (openBlock(), createBlock(_sfc_main$a, {
                key: 0,
                text: `+${hiddenCount.value}`,
                class: ui.value.base({ class: props.ui?.base })
              }, null, 8, ["text", "class"])) : createCommentVNode("", true),
              (openBlock(true), createBlock(Fragment, null, renderList(visibleAvatars.value, (avatar, count) => {
                return openBlock(), createBlock(resolveDynamicComponent(avatar), {
                  key: count,
                  class: ui.value.base({ class: props.ui?.base })
                }, null, 8, ["class"]);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/AvatarGroup.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=AvatarGroup-Bhlzbbqz.mjs.map
