import { h as _sfc_main$4, c as _sfc_main$a, k as _sfc_main$d } from './server.mjs';
import { _ as _sfc_main$3 } from './Badge-DE6iRalv.mjs';
import { _ as __nuxt_component_0 } from './my-page-Cu0txfPp.mjs';
import { _ as _sfc_main$1 } from './Separator-BYgM1HCW.mjs';
import { _ as _sfc_main$2 } from './Table-CdgEzrWp.mjs';
import { _ as __nuxt_component_14 } from './fetch-error-alert-NIQ5BlkS.mjs';
import { t as toDollar } from './to-dollar-DdS_9tlH.mjs';
import { defineComponent, withAsyncContext, computed, ref, mergeProps, unref, withCtx, isRef, createBlock, createCommentVNode, openBlock, createVNode, createTextVNode, toDisplayString, h, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { k as round, a5 as normalizeException } from '../nitro/nitro.mjs';
import { u as useAuthStore } from './auth.store-VvkDhiyP.mjs';
import { u as useRouteData } from './use-route-data-zpNPSzN0.mjs';
import { u as useFetch } from './fetch-CGkSb6cH.mjs';
import { t as toCase } from './to-case-ChuH9uWD.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "current-users",
  __ssrInlineRender: true,
  props: {
    balance: {}
  },
  async setup(__props) {
    let __temp, __restore;
    const authStore = useAuthStore();
    const accountId = useRouteData().getParams("accountId");
    const { pending, data, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `/api/user/financial-accounts/${accountId}/account-users`,
      {
        key: "account-current-users"
      },
      "$I09Lj1pvkj"
    )), __temp = await __temp, __restore(), __temp);
    const items = computed(() => {
      return data.value?.map((item) => {
        return {
          image: item.user?.image,
          name: item.user?.name,
          email: item.user?.email,
          role: item.role,
          ownership: item.ownership,
          balance: round(__props.balance * (item.ownership / 100))
        };
      }) ?? [];
    });
    const Avatar = _sfc_main$d;
    const Badge = _sfc_main$3;
    const columns = [
      {
        accessorKey: "image",
        header: "",
        cell: ({ row }) => {
          const name = row.getValue("name");
          const image = row.getValue("image");
          return h(Avatar, { size: "lg", alt: name, src: image });
        }
      },
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
          const name = row.getValue("name");
          const isAuthUser = authStore.user?.value?.email === row.getValue("email");
          return h("div", { class: "flex items-center gap-2" }, [
            h("span", name),
            isAuthUser && h(Badge, { label: "You", variant: "subtle", color: "error", size: "sm" })
          ]);
        }
      },
      {
        accessorKey: "email",
        header: "Email"
      },
      {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => toCase(row.getValue("role"), "sentence")
      },
      {
        accessorKey: "ownership",
        header: "Ownership",
        cell: ({ row }) => `${row.getValue("ownership")}%`
      },
      {
        accessorKey: "balance",
        header: "Available Balance",
        cell: ({ row }) => toDollar(row.getValue("balance"))
      }
    ];
    const selectedUser = ref(null);
    const open = ref(false);
    const handleSelect = async (row) => {
      selectedUser.value = data.value?.find((item) => item.user.email === row.getValue("email")) ?? null;
      if (selectedUser.value) open.value = true;
    };
    const removeError = ref(null);
    const removeUser = async (accountUserId, close) => {
      removeError.value = null;
      try {
        await $fetch(
          `/api/user/financial-accounts/${accountId}/account-user/${accountUserId}`,
          { method: "delete" }
        );
        await refresh();
        close();
      } catch (e) {
        removeError.value = normalizeException(e);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MyPage = __nuxt_component_0;
      const _component_NuxtSeparator = _sfc_main$1;
      const _component_NuxtTable = _sfc_main$2;
      const _component_NuxtModal = _sfc_main$4;
      const _component_FetchErrorAlert = __nuxt_component_14;
      const _component_NuxtButton = _sfc_main$a;
      _push(ssrRenderComponent(_component_MyPage, mergeProps({
        error: unref(error),
        onRefresh: () => unref(refresh)()
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${_scopeId}><p class="font-semibold font-geist-mono"${_scopeId}> Total Account Balance: <b${_scopeId}>${ssrInterpolate(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(__props.balance))}</b></p></div>`);
            _push2(ssrRenderComponent(_component_NuxtSeparator, { class: "my-3" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_NuxtTable, {
              data: unref(items),
              columns,
              loading: unref(pending),
              style: { "min-width": "0" },
              onSelect: handleSelect
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_NuxtModal, {
              open: unref(open),
              "onUpdate:open": [
                ($event) => isRef(open) ? open.value = $event : null,
                (value) => value === false ? removeError.value = null : removeError.value = unref(removeError)
              ],
              title: "Remove User"
            }, {
              body: withCtx(({ close }, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (unref(selectedUser)) {
                    _push3(`<div class="space-y-4"${_scopeId2}><p${_scopeId2}>Do you want to remove this user from this account?</p>`);
                    if (unref(removeError)) {
                      _push3(ssrRenderComponent(_component_FetchErrorAlert, {
                        message: unref(removeError).message
                      }, null, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`<div class="flex items-center justify-end gap-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_NuxtButton, {
                      label: "Cancel",
                      color: "neutral",
                      variant: "soft",
                      onClick: ($event) => close()
                    }, null, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_NuxtButton, {
                      label: "Proceed",
                      color: "error",
                      "loading-auto": "",
                      onClick: ($event) => removeUser(unref(selectedUser).id, close)
                    }, null, _parent3, _scopeId2));
                    _push3(`</div></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    unref(selectedUser) ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "space-y-4"
                    }, [
                      createVNode("p", null, "Do you want to remove this user from this account?"),
                      unref(removeError) ? (openBlock(), createBlock(_component_FetchErrorAlert, {
                        key: 0,
                        message: unref(removeError).message
                      }, null, 8, ["message"])) : createCommentVNode("", true),
                      createVNode("div", { class: "flex items-center justify-end gap-2" }, [
                        createVNode(_component_NuxtButton, {
                          label: "Cancel",
                          color: "neutral",
                          variant: "soft",
                          onClick: ($event) => close()
                        }, null, 8, ["onClick"]),
                        createVNode(_component_NuxtButton, {
                          label: "Proceed",
                          color: "error",
                          "loading-auto": "",
                          onClick: ($event) => removeUser(unref(selectedUser).id, close)
                        }, null, 8, ["onClick"])
                      ])
                    ])) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", null, [
                createVNode("p", { class: "font-semibold font-geist-mono" }, [
                  createTextVNode(" Total Account Balance: "),
                  createVNode("b", null, toDisplayString(("toDollar" in _ctx ? _ctx.toDollar : unref(toDollar))(__props.balance)), 1)
                ])
              ]),
              createVNode(_component_NuxtSeparator, { class: "my-3" }),
              createVNode(_component_NuxtTable, {
                data: unref(items),
                columns,
                loading: unref(pending),
                style: { "min-width": "0" },
                onSelect: handleSelect
              }, null, 8, ["data", "loading"]),
              createVNode(_component_NuxtModal, {
                open: unref(open),
                "onUpdate:open": [
                  ($event) => isRef(open) ? open.value = $event : null,
                  (value) => value === false ? removeError.value = null : removeError.value = unref(removeError)
                ],
                title: "Remove User"
              }, {
                body: withCtx(({ close }) => [
                  unref(selectedUser) ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "space-y-4"
                  }, [
                    createVNode("p", null, "Do you want to remove this user from this account?"),
                    unref(removeError) ? (openBlock(), createBlock(_component_FetchErrorAlert, {
                      key: 0,
                      message: unref(removeError).message
                    }, null, 8, ["message"])) : createCommentVNode("", true),
                    createVNode("div", { class: "flex items-center justify-end gap-2" }, [
                      createVNode(_component_NuxtButton, {
                        label: "Cancel",
                        color: "neutral",
                        variant: "soft",
                        onClick: ($event) => close()
                      }, null, 8, ["onClick"]),
                      createVNode(_component_NuxtButton, {
                        label: "Proceed",
                        color: "error",
                        "loading-auto": "",
                        onClick: ($event) => removeUser(unref(selectedUser).id, close)
                      }, null, 8, ["onClick"])
                    ])
                  ])) : createCommentVNode("", true)
                ]),
                _: 1
              }, 8, ["open", "onUpdate:open"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/user/financial-account/current-users.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main, { __name: "UserFinancialAccountCurrentUsers" });

export { __nuxt_component_2 as _ };
//# sourceMappingURL=current-users-COw-E7_J.mjs.map
