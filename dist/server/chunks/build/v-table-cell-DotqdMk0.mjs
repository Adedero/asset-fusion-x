import { defineComponent, provide, computed, mergeProps, unref, inject, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderSlot } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';

const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "v-table",
  __ssrInlineRender: true,
  props: {
    size: { default: "sm" },
    hover: { type: Boolean, default: false },
    stickyHeader: { type: Boolean, default: false }
  },
  setup(__props) {
    provide("v-table-props", {
      size: __props.size,
      hover: __props.hover,
      stickyHeader: __props.stickyHeader
    });
    const tableClass = computed(() => {
      const base = "w-full whitespace-nowrap";
      const sizeClass = {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg"
      }[__props.size];
      return `${base} ${sizeClass}`;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "overflow-auto relative" }, _attrs))}><table${ssrRenderAttrs(mergeProps({
        border: "collapse",
        class: unref(tableClass)
      }, _ctx.$attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</table></div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/v-table/v-table.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_5 = Object.assign(_sfc_main$5, { __name: "VTable" });
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "v-table-header",
  __ssrInlineRender: true,
  setup(__props) {
    const props = inject("v-table-props");
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(props)) {
        _push(`<thead${ssrRenderAttrs(mergeProps({
          class: ["border-b-2 border-b-default [&_th]:py-4 [&_th]:px-4", unref(props).stickyHeader ? "sticky top-0" : ""]
        }, _attrs))}>`);
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
        _push(`</thead>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/v-table/v-table-header.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_6 = Object.assign(_sfc_main$4, { __name: "VTableHeader" });
const _sfc_main$3 = {};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs) {
  _push(`<tr${ssrRenderAttrs(_attrs)}>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</tr>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/v-table/v-table-row.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_7 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$2]]), { __name: "VTableRow" });
const _sfc_main$2 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<th${ssrRenderAttrs(mergeProps({ class: "text-left" }, _attrs))}>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</th>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/v-table/v-table-head.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_8 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$1]]), { __name: "VTableHead" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "v-table-body",
  __ssrInlineRender: true,
  setup(__props) {
    const props = inject("v-table-props");
    return (_ctx, _push, _parent, _attrs) => {
      if (unref(props)) {
        _push(`<tbody${ssrRenderAttrs(mergeProps({
          class: [
            "[&_td]:py-4 [&_td]:px-4",
            "divide-y divide-default",
            "text-muted",
            unref(props).hover ? "[&_tr:hover]:bg-muted [&_tr]:cursor-pointer" : ""
          ]
        }, _attrs))}>`);
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
        _push(`</tbody>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/v-table/v-table-body.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_9 = Object.assign(_sfc_main$1, { __name: "VTableBody" });
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<td${ssrRenderAttrs(_attrs)}>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</td>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/v-table/v-table-cell.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_10 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]), { __name: "VTableCell" });

export { __nuxt_component_5 as _, __nuxt_component_6 as a, __nuxt_component_7 as b, __nuxt_component_8 as c, __nuxt_component_9 as d, __nuxt_component_10 as e };
//# sourceMappingURL=v-table-cell-DotqdMk0.mjs.map
