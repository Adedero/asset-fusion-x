import { _ as __nuxt_component_0 } from './my-page-Cgd-8gXO.mjs';
import { _ as _sfc_main$1 } from './Card-HL6icAYQ.mjs';
import { _ as _sfc_main$2 } from './Alert-CXdXSwrA.mjs';
import { _ as __nuxt_component_14 } from './fetch-error-alert-B3Gd_w4n.mjs';
import { _ as _sfc_main$3 } from './Select-CrSzJZds.mjs';
import { _ as _sfc_main$4 } from './Input-BtIiAvs7.mjs';
import { i as useToast, n as navigateTo, c as _sfc_main$7 } from './server.mjs';
import { defineComponent, withAsyncContext, reactive, ref, mergeProps, unref, withCtx, createVNode, createBlock, createCommentVNode, openBlock, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { a6 as normalizeException } from '../nitro/nitro.mjs';
import { u as useFetch } from './fetch-DztuJ_5C.mjs';
import 'reka-ui';
import '@vueuse/core';
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
  __name: "kyc",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const toast = useToast();
    const { data, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/user/profile", {
      key: "user-profile"
    }, "$WwVoRVSESA")), __temp = await __temp, __restore(), __temp);
    const idTypes = ["International passport", "National ID", "Driving license"];
    const state = reactive({
      governmentId: "",
      governmentIdType: "",
      governmentIdExt: ""
    });
    const uploadError = ref(null);
    const uploading = ref(false);
    async function updateKyc() {
      const emptyKey = Object.keys(state).find(
        (key) => !state[key]?.length
      );
      if (emptyKey) {
        uploadError.value = new Error(`Missing required field: ${emptyKey}`);
        return;
      }
      const governmentIdType = state.governmentIdType.toLowerCase().replace(/\s+/g, "_");
      uploading.value = true;
      uploadError.value = null;
      try {
        await $fetch("/api/user/profile/kyc", {
          method: "PUT",
          body: { ...state, governmentIdType },
          headers: {
            "Content-Type": "application/json"
          }
        });
        await refresh();
      } catch (err) {
        uploadError.value = normalizeException(err);
      } finally {
        uploading.value = false;
      }
    }
    function onFileChange(event) {
      const target = event.target;
      const file = target.files?.[0];
      if (!file) return;
      if (!file.type.startsWith("image/") && file.type !== "application/pdf") {
        toast.add({
          title: "Invalid file type",
          description: "Please select an image or a PDF file.",
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
      state.governmentIdExt = file.name.split(".").pop()?.toLowerCase() || "";
      const reader = new FileReader();
      reader.onload = () => {
        state.governmentId = reader.result;
      };
      reader.readAsDataURL(file);
    }
    function downloadDocument() {
      if (!data.value?.profile?.governmentId) return;
      const link = (void 0).createElement("a");
      link.style.display = "none";
      link.style.position = "absolute";
      link.href = data.value.profile.governmentId;
      link.download = `USER_ID.${data.value.profile.governmentIdExt}`;
      (void 0).body.appendChild(link);
      link.click();
      (void 0).body.removeChild(link);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MyPage = __nuxt_component_0;
      const _component_NuxtCard = _sfc_main$1;
      const _component_NuxtAlert = _sfc_main$2;
      const _component_FetchErrorAlert = __nuxt_component_14;
      const _component_NuxtSelect = _sfc_main$3;
      const _component_NuxtInput = _sfc_main$4;
      const _component_NuxtButton = _sfc_main$7;
      _push(ssrRenderComponent(_component_MyPage, mergeProps({
        error: unref(error),
        onRetry: ($event) => unref(refresh)()
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(data)) {
              _push2(`<div${_scopeId}>`);
              if (!unref(data).profile) {
                _push2(`<div class="fluid flex-center"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_NuxtCard, null, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_NuxtAlert, {
                        title: "KYC Verification",
                        description: "Please update your profile to continue",
                        icon: "i-lucide-alert-circle",
                        class: "md:w-[30rem]",
                        variant: "subtle",
                        ui: {
                          actions: "justify-end"
                        },
                        actions: [
                          {
                            label: "Proceed",
                            size: "md",
                            onClick: () => {
                              ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/user/profile");
                            }
                          }
                        ]
                      }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_NuxtAlert, {
                          title: "KYC Verification",
                          description: "Please update your profile to continue",
                          icon: "i-lucide-alert-circle",
                          class: "md:w-[30rem]",
                          variant: "subtle",
                          ui: {
                            actions: "justify-end"
                          },
                          actions: [
                            {
                              label: "Proceed",
                              size: "md",
                              onClick: () => {
                                ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/user/profile");
                              }
                            }
                          ]
                        }, null, 8, ["actions"])
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`</div>`);
              } else if (!unref(data).profile.kycStatus) {
                _push2(`<div class="fluid flex-center"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_NuxtCard, { class: "max-w-[30rem]" }, {
                  header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<p class="card-title"${_scopeId2}>Upload a valid government-issued ID</p>`);
                    } else {
                      return [
                        createVNode("p", { class: "card-title" }, "Upload a valid government-issued ID")
                      ];
                    }
                  }),
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div class="space-y-4"${_scopeId2}>`);
                      if (unref(uploadError)) {
                        _push3(ssrRenderComponent(_component_FetchErrorAlert, {
                          title: unref(uploadError).name,
                          message: unref(uploadError).message
                        }, null, _parent3, _scopeId2));
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`<div class="space-y-4"${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_NuxtSelect, {
                        modelValue: unref(state).governmentIdType,
                        "onUpdate:modelValue": ($event) => unref(state).governmentIdType = $event,
                        items: idTypes,
                        size: "lg",
                        placeholder: "Select ID type",
                        class: "w-full"
                      }, null, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_NuxtInput, {
                        type: "file",
                        size: "lg",
                        class: "w-full",
                        accept: "image/*,.pdf",
                        onChange: onFileChange
                      }, null, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_NuxtButton, {
                        size: "lg",
                        label: "Submit",
                        icon: "i-lucide-check-circle",
                        loading: unref(uploading),
                        onClick: updateKyc
                      }, null, _parent3, _scopeId2));
                      _push3(`</div><div${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_NuxtAlert, {
                        ui: { description: "text-xs" },
                        variant: "soft",
                        description: "Uploaded ID must be in image or PDF format and should not exceed 2MB"
                      }, null, _parent3, _scopeId2));
                      _push3(`</div></div>`);
                    } else {
                      return [
                        createVNode("div", { class: "space-y-4" }, [
                          unref(uploadError) ? (openBlock(), createBlock(_component_FetchErrorAlert, {
                            key: 0,
                            title: unref(uploadError).name,
                            message: unref(uploadError).message
                          }, null, 8, ["title", "message"])) : createCommentVNode("", true),
                          createVNode("div", { class: "space-y-4" }, [
                            createVNode(_component_NuxtSelect, {
                              modelValue: unref(state).governmentIdType,
                              "onUpdate:modelValue": ($event) => unref(state).governmentIdType = $event,
                              items: idTypes,
                              size: "lg",
                              placeholder: "Select ID type",
                              class: "w-full"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(_component_NuxtInput, {
                              type: "file",
                              size: "lg",
                              class: "w-full",
                              accept: "image/*,.pdf",
                              onChange: onFileChange
                            }),
                            createVNode(_component_NuxtButton, {
                              size: "lg",
                              label: "Submit",
                              icon: "i-lucide-check-circle",
                              loading: unref(uploading),
                              onClick: updateKyc
                            }, null, 8, ["loading"])
                          ]),
                          createVNode("div", null, [
                            createVNode(_component_NuxtAlert, {
                              ui: { description: "text-xs" },
                              variant: "soft",
                              description: "Uploaded ID must be in image or PDF format and should not exceed 2MB"
                            })
                          ])
                        ])
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`</div>`);
              } else if (unref(data).profile.kycStatus === "pending") {
                _push2(`<div class="fluid flex-center"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_NuxtCard, { class: "max-w-[30rem]" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_NuxtAlert, {
                        title: "KYC Verification",
                        description: "Your data is still being validated. Check again later.",
                        icon: "i-lucide-alert-circle",
                        variant: "subtle",
                        ui: {
                          actions: "justify-end"
                        },
                        actions: [
                          {
                            label: "Donwload",
                            size: "md",
                            onClick: () => {
                              downloadDocument();
                            }
                          }
                        ]
                      }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_NuxtAlert, {
                          title: "KYC Verification",
                          description: "Your data is still being validated. Check again later.",
                          icon: "i-lucide-alert-circle",
                          variant: "subtle",
                          ui: {
                            actions: "justify-end"
                          },
                          actions: [
                            {
                              label: "Donwload",
                              size: "md",
                              onClick: () => {
                                downloadDocument();
                              }
                            }
                          ]
                        }, null, 8, ["actions"])
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`</div>`);
              } else if (unref(data).profile.kycStatus === "rejected") {
                _push2(`<div class="fluid flex-center"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_NuxtCard, { class: "max-w-[30rem]" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_NuxtAlert, {
                        title: "KYC Verification",
                        description: "Your KYC data has been rejected. Please contact us for more information.",
                        icon: "i-lucide-alert-triangle",
                        color: "error",
                        variant: "subtle",
                        ui: {
                          actions: "justify-end"
                        },
                        actions: [
                          {
                            label: "Contact us",
                            size: "md",
                            color: "error",
                            onClick: () => {
                              ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/user/contact");
                            }
                          }
                        ]
                      }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_NuxtAlert, {
                          title: "KYC Verification",
                          description: "Your KYC data has been rejected. Please contact us for more information.",
                          icon: "i-lucide-alert-triangle",
                          color: "error",
                          variant: "subtle",
                          ui: {
                            actions: "justify-end"
                          },
                          actions: [
                            {
                              label: "Contact us",
                              size: "md",
                              color: "error",
                              onClick: () => {
                                ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/user/contact");
                              }
                            }
                          ]
                        }, null, 8, ["actions"])
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`</div>`);
              } else if (unref(data).profile.kycStatus === "resubmit") {
                _push2(`<div class="fluid flex-center"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_NuxtCard, { class: "max-w-[30rem]" }, {
                  header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<p class="card-title"${_scopeId2}>Upload a valid government-issued ID</p>`);
                    } else {
                      return [
                        createVNode("p", { class: "card-title" }, "Upload a valid government-issued ID")
                      ];
                    }
                  }),
                  footer: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_NuxtAlert, {
                        title: "KYC Verification",
                        description: "We could not complete your verification. Please resubmit your data.",
                        icon: "i-lucide-alert-circle",
                        variant: "subtle",
                        color: "error"
                      }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_NuxtAlert, {
                          title: "KYC Verification",
                          description: "We could not complete your verification. Please resubmit your data.",
                          icon: "i-lucide-alert-circle",
                          variant: "subtle",
                          color: "error"
                        })
                      ];
                    }
                  }),
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div class="space-y-4"${_scopeId2}>`);
                      if (unref(uploadError)) {
                        _push3(ssrRenderComponent(_component_FetchErrorAlert, {
                          title: unref(uploadError).name,
                          message: unref(uploadError).message
                        }, null, _parent3, _scopeId2));
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`<div class="space-y-4"${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_NuxtSelect, {
                        modelValue: unref(state).governmentIdType,
                        "onUpdate:modelValue": ($event) => unref(state).governmentIdType = $event,
                        items: idTypes,
                        size: "lg",
                        placeholder: "Select ID type",
                        class: "w-full"
                      }, null, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_NuxtInput, {
                        type: "file",
                        size: "lg",
                        class: "w-full",
                        accept: "image/*,.pdf",
                        onChange: onFileChange
                      }, null, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_NuxtButton, {
                        size: "lg",
                        label: "Submit",
                        icon: "i-lucide-check-circle",
                        loading: unref(uploading),
                        onClick: updateKyc
                      }, null, _parent3, _scopeId2));
                      _push3(`</div><div${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_NuxtAlert, {
                        ui: { description: "text-xs" },
                        variant: "soft",
                        description: "Uploaded ID must be in image or PDF format and should not exceed 2MB"
                      }, null, _parent3, _scopeId2));
                      _push3(`</div></div>`);
                    } else {
                      return [
                        createVNode("div", { class: "space-y-4" }, [
                          unref(uploadError) ? (openBlock(), createBlock(_component_FetchErrorAlert, {
                            key: 0,
                            title: unref(uploadError).name,
                            message: unref(uploadError).message
                          }, null, 8, ["title", "message"])) : createCommentVNode("", true),
                          createVNode("div", { class: "space-y-4" }, [
                            createVNode(_component_NuxtSelect, {
                              modelValue: unref(state).governmentIdType,
                              "onUpdate:modelValue": ($event) => unref(state).governmentIdType = $event,
                              items: idTypes,
                              size: "lg",
                              placeholder: "Select ID type",
                              class: "w-full"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(_component_NuxtInput, {
                              type: "file",
                              size: "lg",
                              class: "w-full",
                              accept: "image/*,.pdf",
                              onChange: onFileChange
                            }),
                            createVNode(_component_NuxtButton, {
                              size: "lg",
                              label: "Submit",
                              icon: "i-lucide-check-circle",
                              loading: unref(uploading),
                              onClick: updateKyc
                            }, null, 8, ["loading"])
                          ]),
                          createVNode("div", null, [
                            createVNode(_component_NuxtAlert, {
                              ui: { description: "text-xs" },
                              variant: "soft",
                              description: "Uploaded ID must be in image or PDF format and should not exceed 2MB"
                            })
                          ])
                        ])
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`</div>`);
              } else if (unref(data).profile.kycStatus === "verified") {
                _push2(`<div class="fluid flex-center"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_NuxtCard, { class: "md:w-[30rem]" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_NuxtAlert, {
                        title: "KYC Verification",
                        description: "Your data has been verified.",
                        icon: "i-lucide-alert-circle",
                        variant: "subtle",
                        ui: {
                          actions: "justify-end"
                        },
                        actions: [
                          {
                            label: "Donwload",
                            size: "md",
                            onClick: () => {
                              downloadDocument();
                            }
                          }
                        ]
                      }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_NuxtAlert, {
                          title: "KYC Verification",
                          description: "Your data has been verified.",
                          icon: "i-lucide-alert-circle",
                          variant: "subtle",
                          ui: {
                            actions: "justify-end"
                          },
                          actions: [
                            {
                              label: "Donwload",
                              size: "md",
                              onClick: () => {
                                downloadDocument();
                              }
                            }
                          ]
                        }, null, 8, ["actions"])
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(data) ? (openBlock(), createBlock("div", { key: 0 }, [
                !unref(data).profile ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "fluid flex-center"
                }, [
                  createVNode(_component_NuxtCard, null, {
                    default: withCtx(() => [
                      createVNode(_component_NuxtAlert, {
                        title: "KYC Verification",
                        description: "Please update your profile to continue",
                        icon: "i-lucide-alert-circle",
                        class: "md:w-[30rem]",
                        variant: "subtle",
                        ui: {
                          actions: "justify-end"
                        },
                        actions: [
                          {
                            label: "Proceed",
                            size: "md",
                            onClick: () => {
                              ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/user/profile");
                            }
                          }
                        ]
                      }, null, 8, ["actions"])
                    ]),
                    _: 1
                  })
                ])) : !unref(data).profile.kycStatus ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "fluid flex-center"
                }, [
                  createVNode(_component_NuxtCard, { class: "max-w-[30rem]" }, {
                    header: withCtx(() => [
                      createVNode("p", { class: "card-title" }, "Upload a valid government-issued ID")
                    ]),
                    default: withCtx(() => [
                      createVNode("div", { class: "space-y-4" }, [
                        unref(uploadError) ? (openBlock(), createBlock(_component_FetchErrorAlert, {
                          key: 0,
                          title: unref(uploadError).name,
                          message: unref(uploadError).message
                        }, null, 8, ["title", "message"])) : createCommentVNode("", true),
                        createVNode("div", { class: "space-y-4" }, [
                          createVNode(_component_NuxtSelect, {
                            modelValue: unref(state).governmentIdType,
                            "onUpdate:modelValue": ($event) => unref(state).governmentIdType = $event,
                            items: idTypes,
                            size: "lg",
                            placeholder: "Select ID type",
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_component_NuxtInput, {
                            type: "file",
                            size: "lg",
                            class: "w-full",
                            accept: "image/*,.pdf",
                            onChange: onFileChange
                          }),
                          createVNode(_component_NuxtButton, {
                            size: "lg",
                            label: "Submit",
                            icon: "i-lucide-check-circle",
                            loading: unref(uploading),
                            onClick: updateKyc
                          }, null, 8, ["loading"])
                        ]),
                        createVNode("div", null, [
                          createVNode(_component_NuxtAlert, {
                            ui: { description: "text-xs" },
                            variant: "soft",
                            description: "Uploaded ID must be in image or PDF format and should not exceed 2MB"
                          })
                        ])
                      ])
                    ]),
                    _: 1
                  })
                ])) : unref(data).profile.kycStatus === "pending" ? (openBlock(), createBlock("div", {
                  key: 2,
                  class: "fluid flex-center"
                }, [
                  createVNode(_component_NuxtCard, { class: "max-w-[30rem]" }, {
                    default: withCtx(() => [
                      createVNode(_component_NuxtAlert, {
                        title: "KYC Verification",
                        description: "Your data is still being validated. Check again later.",
                        icon: "i-lucide-alert-circle",
                        variant: "subtle",
                        ui: {
                          actions: "justify-end"
                        },
                        actions: [
                          {
                            label: "Donwload",
                            size: "md",
                            onClick: () => {
                              downloadDocument();
                            }
                          }
                        ]
                      }, null, 8, ["actions"])
                    ]),
                    _: 1
                  })
                ])) : unref(data).profile.kycStatus === "rejected" ? (openBlock(), createBlock("div", {
                  key: 3,
                  class: "fluid flex-center"
                }, [
                  createVNode(_component_NuxtCard, { class: "max-w-[30rem]" }, {
                    default: withCtx(() => [
                      createVNode(_component_NuxtAlert, {
                        title: "KYC Verification",
                        description: "Your KYC data has been rejected. Please contact us for more information.",
                        icon: "i-lucide-alert-triangle",
                        color: "error",
                        variant: "subtle",
                        ui: {
                          actions: "justify-end"
                        },
                        actions: [
                          {
                            label: "Contact us",
                            size: "md",
                            color: "error",
                            onClick: () => {
                              ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/user/contact");
                            }
                          }
                        ]
                      }, null, 8, ["actions"])
                    ]),
                    _: 1
                  })
                ])) : unref(data).profile.kycStatus === "resubmit" ? (openBlock(), createBlock("div", {
                  key: 4,
                  class: "fluid flex-center"
                }, [
                  createVNode(_component_NuxtCard, { class: "max-w-[30rem]" }, {
                    header: withCtx(() => [
                      createVNode("p", { class: "card-title" }, "Upload a valid government-issued ID")
                    ]),
                    footer: withCtx(() => [
                      createVNode(_component_NuxtAlert, {
                        title: "KYC Verification",
                        description: "We could not complete your verification. Please resubmit your data.",
                        icon: "i-lucide-alert-circle",
                        variant: "subtle",
                        color: "error"
                      })
                    ]),
                    default: withCtx(() => [
                      createVNode("div", { class: "space-y-4" }, [
                        unref(uploadError) ? (openBlock(), createBlock(_component_FetchErrorAlert, {
                          key: 0,
                          title: unref(uploadError).name,
                          message: unref(uploadError).message
                        }, null, 8, ["title", "message"])) : createCommentVNode("", true),
                        createVNode("div", { class: "space-y-4" }, [
                          createVNode(_component_NuxtSelect, {
                            modelValue: unref(state).governmentIdType,
                            "onUpdate:modelValue": ($event) => unref(state).governmentIdType = $event,
                            items: idTypes,
                            size: "lg",
                            placeholder: "Select ID type",
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(_component_NuxtInput, {
                            type: "file",
                            size: "lg",
                            class: "w-full",
                            accept: "image/*,.pdf",
                            onChange: onFileChange
                          }),
                          createVNode(_component_NuxtButton, {
                            size: "lg",
                            label: "Submit",
                            icon: "i-lucide-check-circle",
                            loading: unref(uploading),
                            onClick: updateKyc
                          }, null, 8, ["loading"])
                        ]),
                        createVNode("div", null, [
                          createVNode(_component_NuxtAlert, {
                            ui: { description: "text-xs" },
                            variant: "soft",
                            description: "Uploaded ID must be in image or PDF format and should not exceed 2MB"
                          })
                        ])
                      ])
                    ]),
                    _: 1
                  })
                ])) : unref(data).profile.kycStatus === "verified" ? (openBlock(), createBlock("div", {
                  key: 5,
                  class: "fluid flex-center"
                }, [
                  createVNode(_component_NuxtCard, { class: "md:w-[30rem]" }, {
                    default: withCtx(() => [
                      createVNode(_component_NuxtAlert, {
                        title: "KYC Verification",
                        description: "Your data has been verified.",
                        icon: "i-lucide-alert-circle",
                        variant: "subtle",
                        ui: {
                          actions: "justify-end"
                        },
                        actions: [
                          {
                            label: "Donwload",
                            size: "md",
                            onClick: () => {
                              downloadDocument();
                            }
                          }
                        ]
                      }, null, 8, ["actions"])
                    ]),
                    _: 1
                  })
                ])) : createCommentVNode("", true)
              ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/user/profile/index/kyc.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=kyc-Hsgn7Kbk.mjs.map
