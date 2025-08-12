import { _ as _sfc_main$1 } from './Card-HL6icAYQ.mjs';
import { _ as _sfc_main$2 } from './Checkbox-CDtcWyCq.mjs';
import { _ as _sfc_main$3 } from './Badge-q_8fq56_.mjs';
import { i as useToast, e as _sfc_main$d, c as _sfc_main$7 } from './server.mjs';
import { _ as _sfc_main$4 } from './Modal-DefLStPx.mjs';
import { defineComponent, ref, watch, useTemplateRef, mergeProps, unref, withCtx, isRef, createVNode, createBlock, createCommentVNode, openBlock, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { useIntersectionObserver, useDateFormat } from '@vueuse/core';
import { a5 as normalizeException } from '../nitro/nitro.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "notification-item",
  __ssrInlineRender: true,
  props: {
    notification: {}
  },
  emits: ["deleted", "visible", "updated"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const toast = useToast();
    const open = ref(false);
    const checked = ref(false);
    watch(
      () => props.notification,
      () => checked.value = props.notification.checked ?? false
    );
    const handleUpdate = (value) => {
      if (typeof value === "boolean") {
        emit("updated", props.notification.id, value);
      }
    };
    const target = useTemplateRef("target");
    const { stop } = useIntersectionObserver(
      target,
      ([entry], observerElement) => {
        if (entry?.isIntersecting) {
          emit("visible", props.notification.id);
          observerElement.disconnect();
        }
      },
      {
        threshold: 0.5
      }
    );
    const deleting = ref(false);
    async function deleteNotification() {
      deleting.value = true;
      try {
        await $fetch(`/api/user/notifications/${props.notification.id}`, {
          method: "delete"
        });
        emit("deleted", props.notification.id);
        toast.add({
          color: "success",
          title: "Done",
          description: "Notification deleted successfully"
        });
      } catch (error) {
        toast.add({
          color: "error",
          title: "Error",
          description: normalizeException(error).message
        });
      } finally {
        deleting.value = false;
        open.value = false;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtCard = _sfc_main$1;
      const _component_NuxtCheckbox = _sfc_main$2;
      const _component_NuxtBadge = _sfc_main$3;
      const _component_NuxtIcon = _sfc_main$d;
      const _component_NuxtButton = _sfc_main$7;
      const _component_NuxtModal = _sfc_main$4;
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "target",
        ref: target
      }, _attrs))}>`);
      _push(ssrRenderComponent(_component_NuxtCard, {
        class: unref(checked) ? "bg-muted" : ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex gap-2 md:gap-4"${_scopeId}><div class="flex-shrink-0"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtCheckbox, {
              modelValue: unref(checked),
              "onUpdate:modelValue": [($event) => isRef(checked) ? checked.value = $event : null, handleUpdate]
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex-grow"${_scopeId}><div class="text-sm"${_scopeId}>`);
            if (!_ctx.notification.isRead) {
              _push2(`<div class="flex items-center gap-4 justify-between mb-1"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_NuxtBadge, {
                size: "sm",
                color: "success",
                variant: "soft",
                label: "New"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<p class="font-semibold"${_scopeId}>${ssrInterpolate(_ctx.notification.title)}</p>`);
            if (_ctx.notification.bodyType === "string") {
              _push2(`<p${_scopeId}>${ssrInterpolate(_ctx.notification.body)}</p>`);
            } else {
              _push2(`<div${_scopeId}>${_ctx.notification.body ?? ""}</div>`);
            }
            _push2(`<footer class="mt-2 flex items-center gap-4 justify-between"${_scopeId}><div class="flex items-center gap-1"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtIcon, {
              name: "lucide:clock",
              class: "text-muted"
            }, null, _parent2, _scopeId));
            _push2(`<p class="text-xs text-muted"${_scopeId}>${ssrInterpolate(unref(useDateFormat)(_ctx.notification.createdAt, "MMM DD, YYYY"))} at ${ssrInterpolate(unref(useDateFormat)(_ctx.notification.createdAt, "hh:mm aa"))}</p></div>`);
            if (!unref(checked)) {
              _push2(ssrRenderComponent(_component_NuxtButton, {
                icon: "lucide-x",
                size: "sm",
                color: "error",
                variant: "soft",
                loading: unref(deleting),
                onClick: ($event) => open.value = true
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</footer></div></div>`);
            _push2(ssrRenderComponent(_component_NuxtModal, {
              open: unref(open),
              "onUpdate:open": ($event) => isRef(open) ? open.value = $event : null,
              title: "Delete notification"
            }, {
              body: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="space-y-4"${_scopeId2}><p${_scopeId2}>Are you sure you want to delete this notification?</p><div class="flex items-center gap-2 justify-end"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_NuxtButton, {
                    label: "Cancel",
                    color: "neutral",
                    variant: "soft",
                    onClick: ($event) => open.value = false
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_NuxtButton, {
                    label: "Delete",
                    color: "error",
                    onClick: deleteNotification
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "space-y-4" }, [
                      createVNode("p", null, "Are you sure you want to delete this notification?"),
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
                          onClick: deleteNotification
                        })
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex gap-2 md:gap-4" }, [
                createVNode("div", { class: "flex-shrink-0" }, [
                  createVNode(_component_NuxtCheckbox, {
                    modelValue: unref(checked),
                    "onUpdate:modelValue": [($event) => isRef(checked) ? checked.value = $event : null, handleUpdate]
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "flex-grow" }, [
                  createVNode("div", { class: "text-sm" }, [
                    !_ctx.notification.isRead ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "flex items-center gap-4 justify-between mb-1"
                    }, [
                      createVNode(_component_NuxtBadge, {
                        size: "sm",
                        color: "success",
                        variant: "soft",
                        label: "New"
                      })
                    ])) : createCommentVNode("", true),
                    createVNode("p", { class: "font-semibold" }, toDisplayString(_ctx.notification.title), 1),
                    _ctx.notification.bodyType === "string" ? (openBlock(), createBlock("p", { key: 1 }, toDisplayString(_ctx.notification.body), 1)) : (openBlock(), createBlock("div", {
                      key: 2,
                      innerHTML: _ctx.notification.body
                    }, null, 8, ["innerHTML"])),
                    createVNode("footer", { class: "mt-2 flex items-center gap-4 justify-between" }, [
                      createVNode("div", { class: "flex items-center gap-1" }, [
                        createVNode(_component_NuxtIcon, {
                          name: "lucide:clock",
                          class: "text-muted"
                        }),
                        createVNode("p", { class: "text-xs text-muted" }, toDisplayString(unref(useDateFormat)(_ctx.notification.createdAt, "MMM DD, YYYY")) + " at " + toDisplayString(unref(useDateFormat)(_ctx.notification.createdAt, "hh:mm aa")), 1)
                      ]),
                      !unref(checked) ? (openBlock(), createBlock(_component_NuxtButton, {
                        key: 0,
                        icon: "lucide-x",
                        size: "sm",
                        color: "error",
                        variant: "soft",
                        loading: unref(deleting),
                        onClick: ($event) => open.value = true
                      }, null, 8, ["loading", "onClick"])) : createCommentVNode("", true)
                    ])
                  ])
                ]),
                createVNode(_component_NuxtModal, {
                  open: unref(open),
                  "onUpdate:open": ($event) => isRef(open) ? open.value = $event : null,
                  title: "Delete notification"
                }, {
                  body: withCtx(() => [
                    createVNode("div", { class: "space-y-4" }, [
                      createVNode("p", null, "Are you sure you want to delete this notification?"),
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
                          onClick: deleteNotification
                        })
                      ])
                    ])
                  ]),
                  _: 1
                }, 8, ["open", "onUpdate:open"])
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/notification-item.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_5 = Object.assign(_sfc_main, { __name: "NotificationItem" });

export { __nuxt_component_5 as _ };
//# sourceMappingURL=notification-item-KVhOgX4q.mjs.map
