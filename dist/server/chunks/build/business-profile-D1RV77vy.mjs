import { _ as __nuxt_component_0 } from './my-page-Cgd-8gXO.mjs';
import { _ as _sfc_main$2 } from './Alert-CXdXSwrA.mjs';
import { _ as __nuxt_component_14 } from './fetch-error-alert-B3Gd_w4n.mjs';
import { _ as _sfc_main$1$1, a as _sfc_main$3 } from './FormField-CzZJ1-Wb.mjs';
import { _ as _sfc_main$4 } from './Input-BtIiAvs7.mjs';
import { _ as _sfc_main$5 } from './SelectMenu-7R98CtYf.mjs';
import { _ as _sfc_main$6 } from './InputNumber-DfQ_yysT.mjs';
import { i as useToast, c as _sfc_main$7 } from './server.mjs';
import { _ as _sfc_main$8 } from './Separator-C2D_H5pj.mjs';
import { defineComponent, withAsyncContext, reactive, ref, mergeProps, unref, withCtx, createVNode, createBlock, createCommentVNode, openBlock, withModifiers, mergeModels, useModel, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
import { v7 } from 'uuid';
import { B as BusinessProfileSchema } from '../_/schemas.mjs';
import { a6 as normalizeException } from '../nitro/nitro.mjs';
import { u as useRouteData } from './use-route-data-1tNFDvd7.mjs';
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
import 'zod';
import '@vue/shared';

async function createDataURL(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
}
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "simple-file-input",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    label: { default: () => void 0 },
    description: { default: () => void 0 },
    accept: { default: () => void 0 },
    size: { default: "lg" },
    maxFileSize: { default: () => void 0 },
    multiple: { type: [Boolean, Number], default: false },
    inputClass: { default: () => void 0 },
    forceConstraints: { type: Boolean, default: false }
  }, {
    "modelValue": { default: [] },
    "modelModifiers": {}
  }),
  emits: ["update:modelValue"],
  setup(__props) {
    const files = useModel(__props, "modelValue");
    const error = ref(void 0);
    const handleInputChange = async (event) => {
      const target = event.target;
      const selectedFiles = Array.from(target.files ?? []);
      const acceptedTypes = normalizeAccept(__props.accept);
      const limit = typeof __props.multiple === "number" ? __props.multiple : Infinity;
      const validFiles = [];
      const errorMessages = [];
      for await (const file of selectedFiles) {
        const fileErrors = [];
        if (!isFileTypeAccepted(file, acceptedTypes)) {
          fileErrors.push(`"${file.name}" is not an accepted file type.`);
        }
        if (__props.maxFileSize && file.size > __props.maxFileSize) {
          fileErrors.push(
            `"${file.name}" exceeds max size of ${formatBytes(__props.maxFileSize)}.`
          );
        }
        if (fileErrors.length > 0) {
          if (__props.forceConstraints) {
            error.value = fileErrors[0];
            break;
          } else {
            errorMessages.push(...fileErrors);
            continue;
          }
        }
        if (validFiles.length >= limit) {
          if (__props.forceConstraints) {
            error.value = `Upload limit of ${limit} exceeded.`;
            break;
          } else {
            break;
          }
        }
        const extensionMatch = file.name.match(/\.([a-zA-Z0-9]+)$/);
        const fileExtension = extensionMatch ? extensionMatch[1]?.toLowerCase() ?? "unknown" : "";
        validFiles.push({
          id: v7(),
          url: await createDataURL(file),
          blob: file,
          ext: fileExtension
        });
      }
      if (!__props.forceConstraints && errorMessages.length > 0) {
        error.value = errorMessages[0];
      }
      if (__props.multiple) {
        files.value = [...files.value, ...validFiles].slice(0, limit);
      } else {
        files.value = validFiles.slice(0, 1);
      }
    };
    function normalizeAccept(accept) {
      if (!accept) return [];
      return Array.isArray(accept) ? accept : accept.split(",").map((s) => s.trim());
    }
    function isFileTypeAccepted(file, acceptedTypes) {
      if (acceptedTypes.length === 0) return true;
      return acceptedTypes.some((type) => {
        if (type.startsWith(".")) {
          return file.name.toLowerCase().endsWith(type.toLowerCase());
        }
        if (type.includes("/*")) {
          const [acceptedMainType] = type.split("/");
          const [fileMainType] = file.type.split("/");
          return acceptedMainType === fileMainType;
        }
        return file.type === type;
      });
    }
    function formatBytes(bytes, decimals = 2) {
      if (bytes === 0) return "0 B";
      const k = 1024;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ["B", "KB", "MB", "GB", "TB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      const formatted = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));
      return `${formatted} ${sizes[i]}`;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtFormField = _sfc_main$3;
      const _component_NuxtInput = _sfc_main$4;
      _push(ssrRenderComponent(_component_NuxtFormField, mergeProps({
        label: _ctx.label,
        description: _ctx.description,
        error: unref(error)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtInput, {
              type: "file",
              size: _ctx.size,
              accept: Array.isArray(_ctx.accept) ? _ctx.accept.join(",") : _ctx.accept,
              multiple: !!_ctx.multiple,
              class: _ctx.inputClass,
              onChange: handleInputChange
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_NuxtInput, {
                type: "file",
                size: _ctx.size,
                accept: Array.isArray(_ctx.accept) ? _ctx.accept.join(",") : _ctx.accept,
                multiple: !!_ctx.multiple,
                class: _ctx.inputClass,
                onChange: handleInputChange
              }, null, 8, ["size", "accept", "multiple", "class"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/nuxt/simple-file-input.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_10 = Object.assign(_sfc_main$1, { __name: "NuxtSimpleFileInput" });
const months = [
  { long: "January", short: "Jan", number: 0 },
  { long: "February", short: "Feb", number: 1 },
  { long: "March", short: "Mar", number: 2 },
  { long: "April", short: "Apr", number: 3 },
  { long: "May", short: "May", number: 4 },
  { long: "June", short: "Jun", number: 5 },
  { long: "July", short: "Jul", number: 6 },
  { long: "August", short: "Aug", number: 7 },
  { long: "September", short: "Sep", number: 8 },
  { long: "October", short: "Oct", number: 9 },
  { long: "November", short: "Nov", number: 10 },
  { long: "December", short: "Dec", number: 11 }
];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "business-profile",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const accountId = useRouteData().getParams("accountId");
    const toast = useToast();
    const { data, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `/api/user/financial-accounts/${accountId}/business-profile`,
      {
        key: "financial-account-business-profile"
      },
      "$4uXZiAGaiR"
    )), __temp = await __temp, __restore(), __temp);
    const state = reactive({
      address: data.value?.profile?.address ?? "",
      creationMonth: data.value?.profile?.creationMonth ?? "January",
      creationYear: data.value?.profile?.creationYear ?? (/* @__PURE__ */ new Date()).getFullYear()
    });
    const documents = reactive({
      proofOfAddress: [],
      certificate: []
    });
    const handleSubmit = async (event) => {
      await upload(event.data);
    };
    const uploading = ref(false);
    const uploadError = ref(null);
    async function upload(validatedData) {
      const payload = {
        ...validatedData,
        proofOfAddress: data.value?.profile?.proofOfAddress || documents.proofOfAddress[0]?.url,
        proofOfAddressExt: data.value?.profile?.proofOfAddressExt || documents.proofOfAddress[0]?.ext,
        certificate: data.value?.profile?.certificate || documents.certificate[0]?.url,
        certificateExt: data.value?.profile?.certificateExt || documents.certificate[0]?.ext
      };
      uploadError.value = null;
      uploading.value = true;
      try {
        await $fetch(`/api/user/financial-accounts/${accountId}/business-profile`, {
          method: "PUT",
          body: payload
        });
        refresh();
        documents.proofOfAddress = [];
        documents.certificate = [];
        toast.add({
          color: "success",
          title: "Success",
          description: "Business profile updated successfully."
        });
      } catch (err) {
        uploadError.value = normalizeException(err);
      } finally {
        uploading.value = false;
      }
    }
    async function uploadDocuments() {
      await upload();
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MyPage = __nuxt_component_0;
      const _component_NuxtAlert = _sfc_main$2;
      const _component_FetchErrorAlert = __nuxt_component_14;
      const _component_NuxtForm = _sfc_main$1$1;
      const _component_NuxtFormField = _sfc_main$3;
      const _component_NuxtInput = _sfc_main$4;
      const _component_NuxtSelectMenu = _sfc_main$5;
      const _component_NuxtInputNumber = _sfc_main$6;
      const _component_NuxtButton = _sfc_main$7;
      const _component_NuxtSeparator = _sfc_main$8;
      const _component_NuxtSimpleFileInput = __nuxt_component_10;
      _push(ssrRenderComponent(_component_MyPage, mergeProps({
        error: unref(error),
        onRetry: ($event) => unref(refresh)()
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(data)) {
              _push2(`<div class="flex justify-center fluid pb-4"${_scopeId}><div class="md:w-96"${_scopeId}>`);
              if (unref(data).profile && !unref(data).profile.approved) {
                _push2(ssrRenderComponent(_component_NuxtAlert, {
                  class: "mb-4",
                  variant: "subtle",
                  title: "Approval status",
                  description: "Your business profile is awaiting approval."
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              if (unref(data).profile && unref(data).profile.approved) {
                _push2(ssrRenderComponent(_component_NuxtAlert, {
                  class: "mb-4",
                  variant: "subtle",
                  title: "Approval status",
                  description: "Your business profile has been approved."
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              if (unref(uploadError)) {
                _push2(ssrRenderComponent(_component_FetchErrorAlert, {
                  title: unref(uploadError).name,
                  message: unref(uploadError).message,
                  class: "mb-4"
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(ssrRenderComponent(_component_NuxtForm, {
                state: unref(state),
                schema: unref(BusinessProfileSchema),
                class: "grid gap-4 md:grid-cols-2",
                onSubmit: handleSubmit
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<h3 class="text-2xl font-medium"${_scopeId2}>Business Info</h3>`);
                    _push3(ssrRenderComponent(_component_NuxtFormField, {
                      name: "address",
                      label: "Business address",
                      class: "w-full md:col-span-2"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_NuxtInput, {
                            modelValue: unref(state).address,
                            "onUpdate:modelValue": ($event) => unref(state).address = $event,
                            size: "lg",
                            class: "w-full"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_NuxtInput, {
                              modelValue: unref(state).address,
                              "onUpdate:modelValue": ($event) => unref(state).address = $event,
                              size: "lg",
                              class: "w-full"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_NuxtFormField, {
                      name: "creationMonth",
                      label: "Month of creation",
                      class: "w-full"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_NuxtSelectMenu, {
                            modelValue: unref(state).creationMonth,
                            "onUpdate:modelValue": ($event) => unref(state).creationMonth = $event,
                            items: unref(months).map((month) => month.long),
                            size: "lg",
                            class: "w-full"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_NuxtSelectMenu, {
                              modelValue: unref(state).creationMonth,
                              "onUpdate:modelValue": ($event) => unref(state).creationMonth = $event,
                              items: unref(months).map((month) => month.long),
                              size: "lg",
                              class: "w-full"
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_NuxtFormField, {
                      name: "creationYear",
                      label: "Year of creation",
                      class: "w-full"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_NuxtInputNumber, {
                            modelValue: unref(state).creationYear,
                            "onUpdate:modelValue": ($event) => unref(state).creationYear = $event,
                            min: 1e3,
                            max: (/* @__PURE__ */ new Date()).getFullYear(),
                            "format-options": {
                              useGrouping: false
                            },
                            size: "lg",
                            class: "w-full"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_NuxtInputNumber, {
                              modelValue: unref(state).creationYear,
                              "onUpdate:modelValue": ($event) => unref(state).creationYear = $event,
                              min: 1e3,
                              max: (/* @__PURE__ */ new Date()).getFullYear(),
                              "format-options": {
                                useGrouping: false
                              },
                              size: "lg",
                              class: "w-full"
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "max"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`<div${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_NuxtButton, {
                      type: "submit",
                      size: "lg",
                      icon: "lucide-circle-check",
                      label: "Submit",
                      "loading-auto": ""
                    }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    return [
                      createVNode("h3", { class: "text-2xl font-medium" }, "Business Info"),
                      createVNode(_component_NuxtFormField, {
                        name: "address",
                        label: "Business address",
                        class: "w-full md:col-span-2"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_NuxtInput, {
                            modelValue: unref(state).address,
                            "onUpdate:modelValue": ($event) => unref(state).address = $event,
                            size: "lg",
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_NuxtFormField, {
                        name: "creationMonth",
                        label: "Month of creation",
                        class: "w-full"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_NuxtSelectMenu, {
                            modelValue: unref(state).creationMonth,
                            "onUpdate:modelValue": ($event) => unref(state).creationMonth = $event,
                            items: unref(months).map((month) => month.long),
                            size: "lg",
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_NuxtFormField, {
                        name: "creationYear",
                        label: "Year of creation",
                        class: "w-full"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_NuxtInputNumber, {
                            modelValue: unref(state).creationYear,
                            "onUpdate:modelValue": ($event) => unref(state).creationYear = $event,
                            min: 1e3,
                            max: (/* @__PURE__ */ new Date()).getFullYear(),
                            "format-options": {
                              useGrouping: false
                            },
                            size: "lg",
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "max"])
                        ]),
                        _: 1
                      }),
                      createVNode("div", null, [
                        createVNode(_component_NuxtButton, {
                          type: "submit",
                          size: "lg",
                          icon: "lucide-circle-check",
                          label: "Submit",
                          "loading-auto": ""
                        })
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_NuxtSeparator, { class: "my-8" }, null, _parent2, _scopeId));
              _push2(`<div class="grid gap-4"${_scopeId}><h3 class="text-2xl font-medium"${_scopeId}>Documents</h3>`);
              if (unref(data).profile?.proofOfAddress || unref(data).profile?.certificate) {
                _push2(`<div class="flex flex-wrap gap-2 justify-end"${_scopeId}>`);
                if (unref(data).profile?.proofOfAddress) {
                  _push2(`<a${ssrRenderAttr("href", unref(data).profile.proofOfAddress)}${ssrRenderAttr("download", `${unref(accountId)}-PROOF_OF_ADDRESS.${unref(data).profile?.proofOfAddressExt}`)}${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_NuxtButton, {
                    label: "Proof of address",
                    icon: "lucide-download",
                    size: "sm",
                    color: "neutral",
                    variant: "outline"
                  }, null, _parent2, _scopeId));
                  _push2(`</a>`);
                } else {
                  _push2(`<!---->`);
                }
                if (unref(data).profile?.certificate) {
                  _push2(`<a${ssrRenderAttr("href", unref(data).profile.certificate)}${ssrRenderAttr("download", `${unref(accountId)}-BUSINESS_CERTIFICATE.${unref(data).profile?.certificateExt}`)}${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_NuxtButton, {
                    label: "Certificate",
                    icon: "lucide-download",
                    size: "sm",
                    color: "neutral",
                    variant: "outline"
                  }, null, _parent2, _scopeId));
                  _push2(`</a>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              } else {
                _push2(`<div${_scopeId}>`);
                _push2(ssrRenderComponent(_component_NuxtAlert, {
                  class: "mb-4",
                  color: "warning",
                  variant: "subtle",
                  description: "No documents submitted yet. Upload your documents to complete your business profile."
                }, null, _parent2, _scopeId));
                _push2(`</div>`);
              }
              _push2(ssrRenderComponent(_component_NuxtSimpleFileInput, {
                modelValue: unref(documents).proofOfAddress,
                "onUpdate:modelValue": ($event) => unref(documents).proofOfAddress = $event,
                label: "Proof of address",
                description: "Image or PDF files not more than 2MB",
                class: "w-full",
                "input-class": "w-full",
                accept: ["image/*", "application/pdf"],
                "max-file-size": 2 * 1024 * 1024,
                "force-constraints": true
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_NuxtSimpleFileInput, {
                modelValue: unref(documents).certificate,
                "onUpdate:modelValue": ($event) => unref(documents).certificate = $event,
                label: "Business certificate",
                description: "Image or PDF files not more than 2MB",
                class: "w-full",
                "input-class": "w-full",
                accept: ["image/*", "application/pdf"],
                "max-file-size": 2 * 1024 * 1024,
                "force-constraints": true
              }, null, _parent2, _scopeId));
              _push2(`<div${_scopeId}>`);
              _push2(ssrRenderComponent(_component_NuxtButton, {
                type: "submit",
                size: "lg",
                icon: "lucide-circle-check",
                label: "Submit",
                loading: unref(uploading),
                disabled: !unref(documents).proofOfAddress.length && !unref(documents).certificate.length,
                onClick: uploadDocuments
              }, null, _parent2, _scopeId));
              _push2(`</div></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(data) ? (openBlock(), createBlock("div", {
                key: 0,
                class: "flex justify-center fluid pb-4"
              }, [
                createVNode("div", { class: "md:w-96" }, [
                  unref(data).profile && !unref(data).profile.approved ? (openBlock(), createBlock(_component_NuxtAlert, {
                    key: 0,
                    class: "mb-4",
                    variant: "subtle",
                    title: "Approval status",
                    description: "Your business profile is awaiting approval."
                  })) : createCommentVNode("", true),
                  unref(data).profile && unref(data).profile.approved ? (openBlock(), createBlock(_component_NuxtAlert, {
                    key: 1,
                    class: "mb-4",
                    variant: "subtle",
                    title: "Approval status",
                    description: "Your business profile has been approved."
                  })) : createCommentVNode("", true),
                  unref(uploadError) ? (openBlock(), createBlock(_component_FetchErrorAlert, {
                    key: 2,
                    title: unref(uploadError).name,
                    message: unref(uploadError).message,
                    class: "mb-4"
                  }, null, 8, ["title", "message"])) : createCommentVNode("", true),
                  createVNode(_component_NuxtForm, {
                    state: unref(state),
                    schema: unref(BusinessProfileSchema),
                    class: "grid gap-4 md:grid-cols-2",
                    onSubmit: withModifiers(handleSubmit, ["prevent"])
                  }, {
                    default: withCtx(() => [
                      createVNode("h3", { class: "text-2xl font-medium" }, "Business Info"),
                      createVNode(_component_NuxtFormField, {
                        name: "address",
                        label: "Business address",
                        class: "w-full md:col-span-2"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_NuxtInput, {
                            modelValue: unref(state).address,
                            "onUpdate:modelValue": ($event) => unref(state).address = $event,
                            size: "lg",
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_NuxtFormField, {
                        name: "creationMonth",
                        label: "Month of creation",
                        class: "w-full"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_NuxtSelectMenu, {
                            modelValue: unref(state).creationMonth,
                            "onUpdate:modelValue": ($event) => unref(state).creationMonth = $event,
                            items: unref(months).map((month) => month.long),
                            size: "lg",
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_NuxtFormField, {
                        name: "creationYear",
                        label: "Year of creation",
                        class: "w-full"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_NuxtInputNumber, {
                            modelValue: unref(state).creationYear,
                            "onUpdate:modelValue": ($event) => unref(state).creationYear = $event,
                            min: 1e3,
                            max: (/* @__PURE__ */ new Date()).getFullYear(),
                            "format-options": {
                              useGrouping: false
                            },
                            size: "lg",
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "max"])
                        ]),
                        _: 1
                      }),
                      createVNode("div", null, [
                        createVNode(_component_NuxtButton, {
                          type: "submit",
                          size: "lg",
                          icon: "lucide-circle-check",
                          label: "Submit",
                          "loading-auto": ""
                        })
                      ])
                    ]),
                    _: 1
                  }, 8, ["state", "schema"]),
                  createVNode(_component_NuxtSeparator, { class: "my-8" }),
                  createVNode("div", { class: "grid gap-4" }, [
                    createVNode("h3", { class: "text-2xl font-medium" }, "Documents"),
                    unref(data).profile?.proofOfAddress || unref(data).profile?.certificate ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "flex flex-wrap gap-2 justify-end"
                    }, [
                      unref(data).profile?.proofOfAddress ? (openBlock(), createBlock("a", {
                        key: 0,
                        href: unref(data).profile.proofOfAddress,
                        download: `${unref(accountId)}-PROOF_OF_ADDRESS.${unref(data).profile?.proofOfAddressExt}`
                      }, [
                        createVNode(_component_NuxtButton, {
                          label: "Proof of address",
                          icon: "lucide-download",
                          size: "sm",
                          color: "neutral",
                          variant: "outline"
                        })
                      ], 8, ["href", "download"])) : createCommentVNode("", true),
                      unref(data).profile?.certificate ? (openBlock(), createBlock("a", {
                        key: 1,
                        href: unref(data).profile.certificate,
                        download: `${unref(accountId)}-BUSINESS_CERTIFICATE.${unref(data).profile?.certificateExt}`
                      }, [
                        createVNode(_component_NuxtButton, {
                          label: "Certificate",
                          icon: "lucide-download",
                          size: "sm",
                          color: "neutral",
                          variant: "outline"
                        })
                      ], 8, ["href", "download"])) : createCommentVNode("", true)
                    ])) : (openBlock(), createBlock("div", { key: 1 }, [
                      createVNode(_component_NuxtAlert, {
                        class: "mb-4",
                        color: "warning",
                        variant: "subtle",
                        description: "No documents submitted yet. Upload your documents to complete your business profile."
                      })
                    ])),
                    createVNode(_component_NuxtSimpleFileInput, {
                      modelValue: unref(documents).proofOfAddress,
                      "onUpdate:modelValue": ($event) => unref(documents).proofOfAddress = $event,
                      label: "Proof of address",
                      description: "Image or PDF files not more than 2MB",
                      class: "w-full",
                      "input-class": "w-full",
                      accept: ["image/*", "application/pdf"],
                      "max-file-size": 2 * 1024 * 1024,
                      "force-constraints": true
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_NuxtSimpleFileInput, {
                      modelValue: unref(documents).certificate,
                      "onUpdate:modelValue": ($event) => unref(documents).certificate = $event,
                      label: "Business certificate",
                      description: "Image or PDF files not more than 2MB",
                      class: "w-full",
                      "input-class": "w-full",
                      accept: ["image/*", "application/pdf"],
                      "max-file-size": 2 * 1024 * 1024,
                      "force-constraints": true
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode("div", null, [
                      createVNode(_component_NuxtButton, {
                        type: "submit",
                        size: "lg",
                        icon: "lucide-circle-check",
                        label: "Submit",
                        loading: unref(uploading),
                        disabled: !unref(documents).proofOfAddress.length && !unref(documents).certificate.length,
                        onClick: uploadDocuments
                      }, null, 8, ["loading", "disabled"])
                    ])
                  ])
                ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/user/accounts/[accountId]/business-profile.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=business-profile-D1RV77vy.mjs.map
