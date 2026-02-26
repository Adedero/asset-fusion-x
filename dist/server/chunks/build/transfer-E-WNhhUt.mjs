import { defineComponent, ref, useSSRContext } from 'vue';
import { ssrRenderAttrs } from 'vue/server-renderer';
import { d as definePageMeta } from './composables-DTjBnO3_.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "transfer",
  __ssrInlineRender: true,
  setup(__props) {
    const accountId = ref("0021351082");
    const accountName = ref("Eli and Lulu");
    definePageMeta({
      breadcrumb: [
        {
          label: "Accounts",
          to: "/user/accounts"
        },
        {
          label: accountName,
          to: `/user/accounts/${accountId.value}`
        },
        {
          label: "Transfer"
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}>Transfer</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/user/accounts/[accountId]/transfer.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=transfer-E-WNhhUt.mjs.map
