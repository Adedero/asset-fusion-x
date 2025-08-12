import { _ as _sfc_main$1 } from './DropdownMenu-j3t5Akwl.mjs';
import { _ as _sfc_main$2 } from './Modal-DefLStPx.mjs';
import { _ as _sfc_main$3 } from './ButtonGroup-BGlqjy3A.mjs';
import { _ as _sfc_main$4 } from './Input-BtIiAvs7.mjs';
import { i as useToast, c as _sfc_main$7 } from './server.mjs';
import { i as initials } from './initials-LMkSR82P.mjs';
import { defineComponent, ref, computed, unref, withCtx, createVNode, createBlock, openBlock, toDisplayString, isRef, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderSlot, ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { u as useAuthStore } from './auth.store-VvkDhiyP.mjs';
import { a6 as normalizeException } from '../nitro/nitro.mjs';
import { u as useFetch } from './fetch-DztuJ_5C.mjs';
import 'reka-ui';
import '@vueuse/core';
import 'reka-ui/namespaced';
import './Kbd-B4jx-Km7.mjs';
import 'vue-router';
import 'tailwindcss/colors';
import '@iconify/vue';
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
import '@vue/shared';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "image-changer",
  __ssrInlineRender: true,
  props: {
    size: { default: "10rem" },
    fontSize: { default: "3rem" }
  },
  setup(__props) {
    const authStore = useAuthStore();
    const toast = useToast();
    const open = ref(false);
    const user = computed(() => authStore.user.value);
    const items = computed(() => {
      const dropdownItems = [[]];
      if (user.value?.image) {
        dropdownItems[0].push({ label: "Remove image", onSelect: removeImage });
        dropdownItems[0].push({
          label: "Change image",
          onSelect: () => open.value = true
        });
      } else {
        dropdownItems[0].push({
          label: "Add image",
          onSelect: () => open.value = true
        });
      }
      return dropdownItems;
    });
    const newImage = ref(null);
    const pending = ref(false);
    const error = ref(null);
    async function addImage() {
      pending.value = true;
      error.value = null;
      try {
        const data = await $fetch("/api/user", {
          method: "PUT",
          body: JSON.stringify({ image: newImage.value }),
          headers: {
            "Content-Type": "application/json"
          }
        });
        authStore.setUser({ ...authStore.user.value, image: data.image });
        newImage.value = null;
        open.value = false;
      } catch (err) {
        error.value = normalizeException(err);
        toast.add({
          title: "Error",
          description: "Failed to update image",
          color: "error"
        });
      } finally {
        pending.value = false;
      }
    }
    async function onFileChange(event) {
      const target = event.target;
      if (!target.files || target.files.length === 0) return;
      const file = target.files[0];
      if (!file) {
        return;
      }
      if (!file.type.startsWith("image/")) {
        toast.add({
          title: "Invalid file type",
          description: "Please select an image file.",
          color: "error"
        });
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        toast.add({
          title: "File too large",
          description: "Please select an image file smaller than 2MB.",
          color: "error"
        });
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        newImage.value = reader.result;
        open.value = true;
      };
      reader.readAsDataURL(file);
    }
    const res = useFetch("/api/user", {
      body: { image: null },
      method: "PUT",
      immediate: false
    }, "$fkBgTSXf_J");
    async function removeImage() {
      await res.execute();
      if (res.error.value || !res.data.value) {
        console.log(res.error.value);
        toast.add({
          title: "Error",
          description: "Failed to remove image",
          color: "error"
        });
        return;
      }
      authStore.setUser({ ...authStore.user.value, image: null });
      toast.add({
        title: "Success",
        description: "Image removed successfully",
        color: "success"
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtDropdownMenu = _sfc_main$1;
      const _component_NuxtModal = _sfc_main$2;
      const _component_NuxtButtonGroup = _sfc_main$3;
      const _component_NuxtInput = _sfc_main$4;
      const _component_NuxtButton = _sfc_main$7;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      if (unref(user)) {
        _push(`<div>`);
        ssrRenderSlot(_ctx.$slots, "default", { user: unref(user) }, () => {
          _push(`<div class="flex-col-center">`);
          _push(ssrRenderComponent(_component_NuxtDropdownMenu, {
            items: unref(items),
            ui: { content: "w-48" }
          }, {
            content: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div${_scopeId}>Content sd sd sdsdsdsdsdsds</div>`);
              } else {
                return [
                  createVNode("div", null, "Content sd sd sdsdsdsdsdsds")
                ];
              }
            }),
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="cursor-pointer rounded-full bg-accented text-muted overflow-hidden *:transition-transform hover:*:scale-120" style="${ssrRenderStyle({ width: _ctx.size, height: _ctx.size })}"${_scopeId}>`);
                if (!unref(user).image) {
                  _push2(`<div class="w-full h-full flex-center text-2xl p-4 font-semibold uppercase" style="${ssrRenderStyle({ fontSize: _ctx.fontSize })}"${_scopeId}>${ssrInterpolate(("initials" in _ctx ? _ctx.initials : unref(initials))(unref(user).name ?? ""))}</div>`);
                } else {
                  _push2(`<img${ssrRenderAttr("src", unref(user).image)} class="w-full h-full object-cover rounded-full"${_scopeId}>`);
                }
                _push2(`</div>`);
              } else {
                return [
                  createVNode("div", {
                    class: "cursor-pointer rounded-full bg-accented text-muted overflow-hidden *:transition-transform hover:*:scale-120",
                    style: { width: _ctx.size, height: _ctx.size }
                  }, [
                    !unref(user).image ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "w-full h-full flex-center text-2xl p-4 font-semibold uppercase",
                      style: { fontSize: _ctx.fontSize }
                    }, toDisplayString(("initials" in _ctx ? _ctx.initials : unref(initials))(unref(user).name ?? "")), 5)) : (openBlock(), createBlock("img", {
                      key: 1,
                      src: unref(user).image,
                      class: "w-full h-full object-cover rounded-full"
                    }, null, 8, ["src"]))
                  ], 4)
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div>`);
        }, _push, _parent);
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_NuxtModal, {
        open: unref(open),
        "onUpdate:open": ($event) => isRef(open) ? open.value = $event : null,
        title: "Profile image editor"
      }, {
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex-col-center gap-4"${_scopeId}><div class="w-40 h-40 rounded-full overflow-hidden bg-muted"${_scopeId}>`);
            if (unref(newImage) || unref(user)?.image) {
              _push2(`<img${ssrRenderAttr("src", unref(newImage) || unref(user)?.image || void 0)} class="w-full h-full object-cover"${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtButtonGroup, { class: "w-full" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_NuxtInput, {
                    type: "file",
                    accept: "image/*",
                    class: "w-full",
                    loading: unref(pending),
                    disabled: unref(pending),
                    onChange: onFileChange
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_NuxtButton, {
                    disabled: !unref(newImage),
                    icon: "i-lucide-x",
                    color: "neutral",
                    variant: "outline",
                    onClick: ($event) => newImage.value = null
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_NuxtButton, {
                    icon: "i-lucide-check",
                    disabled: !unref(newImage) || unref(pending),
                    loading: unref(pending),
                    onClick: addImage
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_NuxtInput, {
                      type: "file",
                      accept: "image/*",
                      class: "w-full",
                      loading: unref(pending),
                      disabled: unref(pending),
                      onChange: onFileChange
                    }, null, 8, ["loading", "disabled"]),
                    createVNode(_component_NuxtButton, {
                      disabled: !unref(newImage),
                      icon: "i-lucide-x",
                      color: "neutral",
                      variant: "outline",
                      onClick: ($event) => newImage.value = null
                    }, null, 8, ["disabled", "onClick"]),
                    createVNode(_component_NuxtButton, {
                      icon: "i-lucide-check",
                      disabled: !unref(newImage) || unref(pending),
                      loading: unref(pending),
                      onClick: addImage
                    }, null, 8, ["disabled", "loading"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex-col-center gap-4" }, [
                createVNode("div", { class: "w-40 h-40 rounded-full overflow-hidden bg-muted" }, [
                  unref(newImage) || unref(user)?.image ? (openBlock(), createBlock("img", {
                    key: 0,
                    src: unref(newImage) || unref(user)?.image || void 0,
                    class: "w-full h-full object-cover"
                  }, null, 8, ["src"])) : createCommentVNode("", true)
                ]),
                createVNode("div", null, [
                  createVNode(_component_NuxtButtonGroup, { class: "w-full" }, {
                    default: withCtx(() => [
                      createVNode(_component_NuxtInput, {
                        type: "file",
                        accept: "image/*",
                        class: "w-full",
                        loading: unref(pending),
                        disabled: unref(pending),
                        onChange: onFileChange
                      }, null, 8, ["loading", "disabled"]),
                      createVNode(_component_NuxtButton, {
                        disabled: !unref(newImage),
                        icon: "i-lucide-x",
                        color: "neutral",
                        variant: "outline",
                        onClick: ($event) => newImage.value = null
                      }, null, 8, ["disabled", "onClick"]),
                      createVNode(_component_NuxtButton, {
                        icon: "i-lucide-check",
                        disabled: !unref(newImage) || unref(pending),
                        loading: unref(pending),
                        onClick: addImage
                      }, null, 8, ["disabled", "loading"])
                    ]),
                    _: 1
                  })
                ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/user/profile/components/image-changer.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=image-changer-IPm2ICaU.mjs.map
