import { i as useToast, c as _sfc_main$7, e as _sfc_main$d } from './server.mjs';
import { _ as _sfc_main$1 } from './Checkbox-CDtcWyCq.mjs';
import { _ as _sfc_main$2 } from './DropdownMenu-j3t5Akwl.mjs';
import { _ as _sfc_main$3 } from './Tooltip-Cj7zweOg.mjs';
import { _ as _sfc_main$4 } from './Modal-DefLStPx.mjs';
import { _ as __nuxt_component_5 } from './notification-item-KVhOgX4q.mjs';
import { _ as __nuxt_component_6 } from './empty-icon-BnDpoaPH.mjs';
import { _ as __nuxt_component_14 } from './fetch-error-alert-B3Gd_w4n.mjs';
import { defineComponent, ref, computed, useTemplateRef, watch, unref, withCtx, isRef, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { useInfiniteScroll } from '@vueuse/core';
import { a6 as normalizeException } from '../nitro/nitro.mjs';
import { u as useRouteData } from './use-route-data-1tNFDvd7.mjs';
import 'vue-router';
import 'tailwindcss/colors';
import '@iconify/vue';
import 'reka-ui';
import 'tailwind-variants';
import '@iconify/utils/lib/css/icon';
import 'perfect-debounce';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'node:path';
import 'fs/promises';
import 'path';
import 'fs';
import 'winston';
import 'axios';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:crypto';
import 'node:url';
import 'better-auth';
import 'better-auth/adapters/prisma';
import 'node:process';
import '@prisma/client/runtime/library';
import 'better-auth/plugins';
import 'nodemailer';
import '@iconify/utils';
import 'consola';
import 'ipx';
import 'reka-ui/namespaced';
import './Kbd-B4jx-Km7.mjs';
import './Card-HL6icAYQ.mjs';
import './Badge-q_8fq56_.mjs';
import './Alert-CXdXSwrA.mjs';

const limit = 20;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "notifications",
  __ssrInlineRender: true,
  setup(__props) {
    const toast = useToast();
    const accountId = useRouteData().getParams("accountId");
    const items = ref([
      [
        {
          label: "All",
          onSelect: () => selectItems("All")
        },
        {
          label: "Read",
          onSelect: () => selectItems("Read")
        },
        {
          label: "Unread",
          onSelect: () => selectItems("Unread")
        }
      ]
    ]);
    const notifications = ref(
      []
    );
    const checkedNotificationIds = computed(() => {
      return notifications.value.filter((n) => n.checked === true).map((n) => n.id);
    });
    const readNotificationIds = ref([]);
    const hasFinished = ref(false);
    const skip = computed(() => notifications.value.length);
    const loading = ref(false);
    const error = ref(null);
    async function getNotifications() {
      if (loading.value || hasFinished.value) return;
      error.value = null;
      loading.value = true;
      try {
        const data = await $fetch(
          `/api/user/financial-accounts/${accountId}/notifications`,
          {
            params: { skip: skip.value, limit }
          }
        );
        notifications.value = [...notifications.value, ...data];
        if (data.length < limit) {
          hasFinished.value = true;
        }
      } catch (err) {
        error.value = normalizeException(err);
      } finally {
        loading.value = false;
      }
    }
    const el = useTemplateRef("srcollDiv");
    const { reset: resetScroll } = useInfiniteScroll(
      el,
      async () => {
        await getNotifications();
      },
      {
        distance: 20,
        canLoadMore: () => hasFinished.value
      }
    );
    async function refresh() {
      notifications.value = [];
      hasFinished.value = false;
      resetScroll();
      await getNotifications();
    }
    const hasSelected = ref(false);
    watch(
      checkedNotificationIds,
      () => hasSelected.value = checkedNotificationIds.value.length > 0
    );
    function selectItems(value) {
      if (value === "All") {
        notifications.value = notifications.value.map((n) => ({
          ...n,
          checked: true
        }));
      }
      if (value === "Read") {
        notifications.value = notifications.value.map((n) => ({
          ...n,
          checked: n.isRead
        }));
      }
      if (value === "Unread") {
        notifications.value = notifications.value.map((n) => ({
          ...n,
          checked: !n.isRead
        }));
      }
    }
    const handleUpdated = (id, value) => {
      notifications.value = notifications.value.map((n) => {
        return {
          ...n,
          checked: n.id === id ? value : n.checked
        };
      });
    };
    function deselectItems() {
      hasSelected.value = false;
      notifications.value = notifications.value.map((n) => ({
        ...n,
        checked: false
      }));
    }
    function handleClick(event) {
      const target = event.target;
      const state = target.getAttribute("data-state");
      if (state === "unchecked") {
        hasSelected.value = true;
        selectItems("All");
      } else {
        hasSelected.value = false;
        deselectItems();
      }
    }
    function handleDeleted(id) {
      notifications.value = notifications.value.filter((n) => n.id !== id);
    }
    function handleVisible(id) {
      const notification = notifications.value.find((n) => n.id === id);
      if (notification && !notification.isRead) {
        readNotificationIds.value = [...readNotificationIds.value, notification.id];
      }
    }
    const open = ref(false);
    const deleting = ref(false);
    async function deleteCheckedNotifications() {
      if (!checkedNotificationIds.value.length) {
        open.value = false;
        return;
      }
      deleting.value = true;
      try {
        await $fetch("/api/user/notifications", {
          method: "patch",
          body: { notifications: checkedNotificationIds.value }
        });
        notifications.value = notifications.value.filter(
          (n) => !checkedNotificationIds.value.includes(n.id)
        );
        refresh();
      } catch (error2) {
        toast.add({
          color: "error",
          title: "Error",
          description: normalizeException(error2).message
        });
      } finally {
        deleting.value = false;
        open.value = false;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtButton = _sfc_main$7;
      const _component_NuxtCheckbox = _sfc_main$1;
      const _component_NuxtDropdownMenu = _sfc_main$2;
      const _component_NuxtTooltip = _sfc_main$3;
      const _component_NuxtModal = _sfc_main$4;
      const _component_NotificationItem = __nuxt_component_5;
      const _component_EmptyIcon = __nuxt_component_6;
      const _component_NuxtIcon = _sfc_main$d;
      const _component_FetchErrorAlert = __nuxt_component_14;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="space-y-4"><header class="flex items-center gap-4 justify-end">`);
      if (unref(notifications).length) {
        _push(`<div class="flex items-center">`);
        _push(ssrRenderComponent(_component_NuxtButton, {
          color: "neutral",
          variant: unref(hasSelected) ? "soft" : "link",
          class: ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_NuxtCheckbox, {
                modelValue: unref(hasSelected),
                "onUpdate:modelValue": ($event) => isRef(hasSelected) ? hasSelected.value = $event : null,
                onClick: handleClick
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_NuxtDropdownMenu, { items: unref(items) }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_NuxtButton, {
                      size: "sm",
                      color: "neutral",
                      variant: "link",
                      icon: "lucide:chevron-down"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_NuxtButton, {
                        size: "sm",
                        color: "neutral",
                        variant: "link",
                        icon: "lucide:chevron-down"
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_NuxtCheckbox, {
                  modelValue: unref(hasSelected),
                  "onUpdate:modelValue": ($event) => isRef(hasSelected) ? hasSelected.value = $event : null,
                  onClick: handleClick
                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode(_component_NuxtDropdownMenu, { items: unref(items) }, {
                  default: withCtx(() => [
                    createVNode(_component_NuxtButton, {
                      size: "sm",
                      color: "neutral",
                      variant: "link",
                      icon: "lucide:chevron-down"
                    })
                  ]),
                  _: 1
                }, 8, ["items"])
              ];
            }
          }),
          _: 1
        }, _parent));
        if (unref(hasSelected)) {
          _push(`<div>`);
          _push(ssrRenderComponent(_component_NuxtTooltip, { text: "Delete selected" }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_NuxtButton, {
                  icon: "lucide:trash",
                  color: "neutral",
                  variant: "link",
                  loading: unref(deleting),
                  onClick: ($event) => open.value = true
                }, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_NuxtButton, {
                    icon: "lucide:trash",
                    color: "neutral",
                    variant: "link",
                    loading: unref(deleting),
                    onClick: ($event) => open.value = true
                  }, null, 8, ["loading", "onClick"])
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(ssrRenderComponent(_component_NuxtModal, {
            open: unref(open),
            "onUpdate:open": ($event) => isRef(open) ? open.value = $event : null,
            title: "Delete notifications"
          }, {
            body: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="space-y-4"${_scopeId}><p${_scopeId}> Are you sure you want to delete these ${ssrInterpolate(unref(checkedNotificationIds).length)} notification(s)? </p><div class="flex items-center gap-2 justify-end"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_NuxtButton, {
                  label: "Cancel",
                  color: "neutral",
                  variant: "soft",
                  onClick: ($event) => open.value = false
                }, null, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_NuxtButton, {
                  label: "Delete",
                  color: "error",
                  "loading-auto": "",
                  onClick: deleteCheckedNotifications
                }, null, _parent2, _scopeId));
                _push2(`</div></div>`);
              } else {
                return [
                  createVNode("div", { class: "space-y-4" }, [
                    createVNode("p", null, " Are you sure you want to delete these " + toDisplayString(unref(checkedNotificationIds).length) + " notification(s)? ", 1),
                    createVNode("div", { class: "flex items-center gap-2 justify-end" }, [
                      createVNode(_component_NuxtButton, {
                        label: "Cancel",
                        color: "neutral",
                        variant: "soft",
                        onClick: ($event) => open.value = false
                      }, null, 8, ["onClick"]),
                      createVNode(_component_NuxtButton, {
                        label: "Delete",
                        color: "error",
                        "loading-auto": "",
                        onClick: deleteCheckedNotifications
                      })
                    ])
                  ])
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div>`);
        } else {
          _push(`<div>`);
          _push(ssrRenderComponent(_component_NuxtTooltip, { text: "Refresh" }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_NuxtButton, {
                  icon: "lucide:rotate-cw",
                  color: "neutral",
                  variant: "link",
                  loading: unref(loading),
                  onClick: refresh
                }, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_NuxtButton, {
                    icon: "lucide:rotate-cw",
                    color: "neutral",
                    variant: "link",
                    loading: unref(loading),
                    onClick: refresh
                  }, null, 8, ["loading"])
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div>`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</header><div class="max-h-[calc(100dvh-15rem)] overlow-y-auto space-y-4">`);
      if (unref(notifications).length > 0) {
        _push(`<div class="space-y-4"><!--[-->`);
        ssrRenderList(unref(notifications), (notification) => {
          _push(ssrRenderComponent(_component_NotificationItem, {
            key: notification.id,
            notification,
            onUpdated: handleUpdated,
            onDeleted: handleDeleted,
            onVisible: handleVisible
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!unref(loading) && !unref(error) && unref(notifications).length === 0) {
        _push(`<div>`);
        _push(ssrRenderComponent(_component_EmptyIcon, { label: "No notifications" }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(loading)) {
        _push(`<div class="flex-center">`);
        _push(ssrRenderComponent(_component_NuxtIcon, {
          name: "lucide:loader",
          size: "2rem",
          class: "animate animate-spin"
        }, null, _parent));
        _push(`</div>`);
      } else if (unref(error)) {
        _push(`<div>`);
        _push(ssrRenderComponent(_component_FetchErrorAlert, {
          message: unref(error).message,
          "show-retry": "",
          onRetry: getNotifications
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/user/accounts/[accountId]/notifications.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=notifications-BkzWlwWB.mjs.map
