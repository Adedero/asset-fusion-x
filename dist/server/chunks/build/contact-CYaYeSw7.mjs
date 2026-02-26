import { g as useToast, b as _sfc_main$a, h as _sfc_main$4$1 } from './server.mjs';
import { _ as _sfc_main$7 } from './Alert-9mK7K0n2.mjs';
import { _ as _sfc_main$8 } from './Card-B81ZNWgd.mjs';
import { _ as _sfc_main$4 } from './Input-CFyDl-v5.mjs';
import { defineComponent, ref, unref, withCtx, createVNode, mergeProps, isRef, toDisplayString, openBlock, createBlock, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { _ as _sfc_main$2 } from './Form-BhNutJZb.mjs';
import { _ as _sfc_main$3 } from './FormField-DYdB-maE.mjs';
import { _ as _sfc_main$5 } from './Select-CTZfWeQw.mjs';
import { _ as _sfc_main$6 } from './Textarea-CmXluAOQ.mjs';
import { _ as __nuxt_component_0$1 } from './cta-banner-53MrbXjk.mjs';
import { _ as _imports_0 } from './virtual_public-DE_rLzXF.mjs';
import z from 'zod';
import { a8 as normalizeException } from '../_/nitro.mjs';
import 'vue-router';
import 'better-auth/vue';
import 'better-auth/client/plugins';
import 'tailwindcss/colors';
import '@iconify/vue';
import 'reka-ui';
import '@vueuse/core';
import 'tailwind-variants';
import '@iconify/utils/lib/css/icon';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'node:path';
import 'fs/promises';
import 'axios';
import 'path';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'cron';
import 'node:process';
import 'node:url';
import '@prisma/client/runtime/library';
import 'nodemailer';
import 'dotenv';
import 'node:fs';
import 'better-auth';
import 'better-auth/adapters/prisma';
import 'better-auth/plugins';
import '@iconify/utils';
import 'node:crypto';
import 'consola';
import './auth.store-VvkDhiyP.mjs';

const mailingSchema = z.object({
  firstName: z.string("First name is required").nonempty("First name is required"),
  lastName: z.string("Last name is required").nonempty("Last name is required"),
  email: z.email("Invalid email"),
  phone: z.string("Phone number is required").nonempty("Phone number is required").refine((value) => {
    const phoneRegex = /^\+?[\d\s().-]{7,20}$/;
    return phoneRegex.test(value);
  }, "Invalid phone number"),
  location: z.string("Location is required").nonempty("Location is required"),
  field: z.string("Field is required").nonempty("Field is required"),
  subject: z.string("Subject is required").nonempty("Subject is required"),
  message: z.string("Message is required").nonempty("Message is required")
});

const open = ref(false);
const config = ref(null);
function useCaptcha() {
  const require2 = (opts = {}) => {
    config.value = {
      acceptProps: {
        color: "primary",
        variant: "solid",
        label: "Proceed",
        ...opts.acceptProps
      },
      rejectProps: {
        color: "neutral",
        variant: "soft",
        label: "Cancel",
        ...opts.rejectProps
      },
      ...opts
    };
    open.value = true;
  };
  const close = () => {
    open.value = false;
  };
  const validate = async (opts) => {
    const { resolve, promise } = Promise.withResolvers();
    require2({
      ...opts,
      accept: () => {
        resolve(true);
        close();
      },
      reject: () => {
        resolve(false);
        close();
      }
    });
    return await promise;
  };
  return {
    open,
    config,
    require: require2,
    close,
    validate
  };
}
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "captcha",
  __ssrInlineRender: true,
  setup(__props) {
    const { open: open2, config: config2, close } = useCaptcha();
    const code = ref(generateCode());
    const state = ref();
    const hasError = ref(false);
    const handleSubmit = async () => {
      hasError.value = false;
      if (state.value === code.value) {
        await config2?.value?.accept?.();
        close();
      } else {
        hasError.value = true;
      }
    };
    function refresh() {
      hasError.value = false;
      code.value = generateCode();
    }
    function generateCode(length = 6) {
      try {
        const lower = "abcdefghijklmnopqrstuvwxyz";
        const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const digits = "0123456789";
        const all = lower + upper + digits;
        const required = [
          lower[Math.floor(
            crypto.getRandomValues(new Uint32Array(1))[0] / (4294967295 + 1) * lower.length
          )],
          upper[Math.floor(
            crypto.getRandomValues(new Uint32Array(1))[0] / (4294967295 + 1) * upper.length
          )],
          digits[Math.floor(
            crypto.getRandomValues(new Uint32Array(1))[0] / (4294967295 + 1) * digits.length
          )]
        ];
        const remainingLength = Math.max(0, length - required.length);
        const arr = [];
        const randomBuffer = new Uint32Array(remainingLength);
        crypto.getRandomValues(randomBuffer);
        for (let i = 0; i < remainingLength; i++) {
          const idx = Math.floor(
            randomBuffer[i] / (4294967295 + 1) * all.length
          );
          arr.push(all[idx]);
        }
        const combined = required.concat(arr);
        for (let i = combined.length - 1; i > 0; i--) {
          const j = Math.floor(
            crypto.getRandomValues(new Uint32Array(1))[0] / (4294967295 + 1) * (i + 1)
          );
          [combined[i], combined[j]] = [combined[j], combined[i]];
        }
        return combined.join("");
      } catch (error) {
        console.error(error);
        return Math.random().toString(36).slice(1, length + 1);
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtModal = _sfc_main$4$1;
      const _component_NuxtAlert = _sfc_main$7;
      const _component_NuxtCard = _sfc_main$8;
      const _component_NuxtInput = _sfc_main$4;
      const _component_NuxtButton = _sfc_main$a;
      _push(ssrRenderComponent(_component_NuxtModal, mergeProps({
        open: unref(open2),
        "onUpdate:open": [
          ($event) => isRef(open2) ? open2.value = $event : null,
          async (val) => {
            if (!val) await unref(config2)?.reject?.();
          }
        ],
        title: "CAPTCHA",
        description: "We need to verify you are not a robot.",
        dismissible: false
      }, _attrs), {
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="w-full flex flex-col items-center justify-center gap-2"${_scopeId}>`);
            if (unref(hasError)) {
              _push2(ssrRenderComponent(_component_NuxtAlert, {
                description: "Invalid code",
                color: "error",
                variant: "subtle"
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`<p class="text-center"${_scopeId}>Enter the code shown below:</p>`);
            _push2(ssrRenderComponent(_component_NuxtCard, { class: "w-full" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex flex-col items-center justify-center gap-2"${_scopeId2}><p class="tex-center text-3xl font-bold text-muted"${_scopeId2}>${ssrInterpolate(unref(code))}</p>`);
                  _push3(ssrRenderComponent(_component_NuxtInput, {
                    modelValue: unref(state),
                    "onUpdate:modelValue": ($event) => isRef(state) ? state.value = $event : null,
                    size: "lg",
                    class: "w-full"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex flex-col items-center justify-center gap-2" }, [
                      createVNode("p", { class: "tex-center text-3xl font-bold text-muted" }, toDisplayString(unref(code)), 1),
                      createVNode(_component_NuxtInput, {
                        modelValue: unref(state),
                        "onUpdate:modelValue": ($event) => isRef(state) ? state.value = $event : null,
                        size: "lg",
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="flex gap-2 mt-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtButton, {
              label: "Refresh",
              color: "neutral",
              variant: "soft",
              onClick: refresh
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_NuxtButton, {
              label: "Submit",
              onClick: handleSubmit
            }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "w-full flex flex-col items-center justify-center gap-2" }, [
                unref(hasError) ? (openBlock(), createBlock(_component_NuxtAlert, {
                  key: 0,
                  description: "Invalid code",
                  color: "error",
                  variant: "subtle"
                })) : createCommentVNode("", true),
                createVNode("p", { class: "text-center" }, "Enter the code shown below:"),
                createVNode(_component_NuxtCard, { class: "w-full" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "flex flex-col items-center justify-center gap-2" }, [
                      createVNode("p", { class: "tex-center text-3xl font-bold text-muted" }, toDisplayString(unref(code)), 1),
                      createVNode(_component_NuxtInput, {
                        modelValue: unref(state),
                        "onUpdate:modelValue": ($event) => isRef(state) ? state.value = $event : null,
                        size: "lg",
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ])
                  ]),
                  _: 1
                }),
                createVNode("div", { class: "flex gap-2 mt-2" }, [
                  createVNode(_component_NuxtButton, {
                    label: "Refresh",
                    color: "neutral",
                    variant: "soft",
                    onClick: refresh
                  }),
                  createVNode(_component_NuxtButton, {
                    label: "Submit",
                    onClick: handleSubmit
                  })
                ])
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/nuxt/captcha.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main$1, { __name: "NuxtCaptcha" });
function useMail() {
  return {
    sendMail: async (options) => {
      const { name, email, body, subject } = options;
      const res = await $fetch("/api/mail", {
        method: "POST",
        body: {
          name,
          email,
          subject,
          body
        }
      });
      return res;
    }
  };
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "contact",
  __ssrInlineRender: true,
  setup(__props) {
    const toast = useToast();
    const { validate } = useCaptcha();
    const { sendMail } = useMail();
    const state = ref({});
    const fields = [
      "Financial Advice",
      "Trades & Investments",
      "Customer Support",
      "Other"
    ];
    const reset = () => state.value = {};
    const handleSubmit = async (event) => {
      const {
        firstName,
        lastName,
        email,
        phone,
        location,
        field,
        subject,
        message
      } = event.data;
      const body = `
  <div>
    <p>Dear AssetFusionX Admin</p>
    <p>You have received a new message from ${firstName} ${lastName}.</p>

    <div>
      <p>Details</p>
      <ul>
        <li>First Name: ${firstName}</li>
        <li>Last Name: ${lastName}</li>
        <li>Email: ${email}</li>
        <li>Phone: ${phone}</li>
        <li>Location: ${location}</li>
        <li>Field: ${field}</li>
        <li>Subject: ${subject}</li>
      </ul>

      <div>
        <p>Message</p>
        <p style="white-space: pre-line">${message}</p>
      </div>
    </div>
  </div>
  `;
      try {
        const isValidated = await validate();
        if (!isValidated) {
          return;
        }
        const response = await sendMail({
          name: "AssetFusionX",
          email: "info@assetfusionx.com",
          subject: "Contact Form Submission",
          body
        });
        toast.add({
          title: "Success",
          description: response?.message || "Your message has been sent successfully.",
          color: "success"
        });
        reset();
      } catch (error) {
        toast.add({
          title: "Error",
          description: normalizeException(error).message,
          color: "error"
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtCaptcha = __nuxt_component_0;
      const _component_NuxtForm = _sfc_main$2;
      const _component_NuxtFormField = _sfc_main$3;
      const _component_NuxtInput = _sfc_main$4;
      const _component_NuxtSelect = _sfc_main$5;
      const _component_NuxtTextarea = _sfc_main$6;
      const _component_NuxtButton = _sfc_main$a;
      const _component_MainCtaBanner = __nuxt_component_0$1;
      _push(`<main${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_NuxtCaptcha, null, null, _parent));
      _push(`<header class="grid *:[grid-column:1/2] *:[grid-row:1/2]"><div class="flex flex-col items-center justify-center z-10"><div class="text-white max-w-[32rem] text-center p-4 bg-slate-700/30 border border-white/30 backdrop-blur-[5px] rounded-xl"><h1 class="text-6xl font-medium">Contact Us</h1><div class="mt-5"><p> Whether you&#39;re looking for an advisor or simply want to make inquiries, our team is here to help you every step of the way. </p></div></div></div><div class="h-96"><img${ssrRenderAttr("src", _imports_0)} class="h-full w-full object-cover"></div></header><div><div class="space-y-10 max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8"><p class="mt-4 text-lg text-center"> Have a question or need guidance? Fill out the form below or start a live chat using the button at the bottom right — we&#39;re ready to help. </p><div>`);
      _push(ssrRenderComponent(_component_NuxtForm, {
        state: unref(state),
        schema: unref(mailingSchema),
        onSubmit: handleSubmit
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="grid gap-x-2 gap-y-5 md:grid-cols-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtFormField, {
              name: "firstName",
              label: "First Name"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_NuxtInput, {
                    modelValue: unref(state).firstName,
                    "onUpdate:modelValue": ($event) => unref(state).firstName = $event,
                    size: "lg",
                    class: "w-full"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_NuxtInput, {
                      modelValue: unref(state).firstName,
                      "onUpdate:modelValue": ($event) => unref(state).firstName = $event,
                      size: "lg",
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_NuxtFormField, {
              name: "lastName",
              label: "Last Name"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_NuxtInput, {
                    modelValue: unref(state).lastName,
                    "onUpdate:modelValue": ($event) => unref(state).lastName = $event,
                    size: "lg",
                    class: "w-full"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_NuxtInput, {
                      modelValue: unref(state).lastName,
                      "onUpdate:modelValue": ($event) => unref(state).lastName = $event,
                      size: "lg",
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_NuxtFormField, {
              name: "email",
              label: "Email Address",
              class: "md:col-span-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_NuxtInput, {
                    modelValue: unref(state).email,
                    "onUpdate:modelValue": ($event) => unref(state).email = $event,
                    size: "lg",
                    class: "w-full"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_NuxtInput, {
                      modelValue: unref(state).email,
                      "onUpdate:modelValue": ($event) => unref(state).email = $event,
                      size: "lg",
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_NuxtFormField, {
              name: "phone",
              label: "Phone Number"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_NuxtInput, {
                    modelValue: unref(state).phone,
                    "onUpdate:modelValue": ($event) => unref(state).phone = $event,
                    size: "lg",
                    class: "w-full"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_NuxtInput, {
                      modelValue: unref(state).phone,
                      "onUpdate:modelValue": ($event) => unref(state).phone = $event,
                      size: "lg",
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_NuxtFormField, {
              name: "location",
              label: "Location"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_NuxtInput, {
                    modelValue: unref(state).location,
                    "onUpdate:modelValue": ($event) => unref(state).location = $event,
                    placeholder: "State or region, Country",
                    size: "lg",
                    class: "w-full"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_NuxtInput, {
                      modelValue: unref(state).location,
                      "onUpdate:modelValue": ($event) => unref(state).location = $event,
                      placeholder: "State or region, Country",
                      size: "lg",
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_NuxtFormField, {
              name: "field",
              label: "Request Field"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_NuxtSelect, {
                    modelValue: unref(state).field,
                    "onUpdate:modelValue": ($event) => unref(state).field = $event,
                    items: fields,
                    size: "lg",
                    class: "w-full"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_NuxtSelect, {
                      modelValue: unref(state).field,
                      "onUpdate:modelValue": ($event) => unref(state).field = $event,
                      items: fields,
                      size: "lg",
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_NuxtFormField, {
              name: "subject",
              label: "Email Subject"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_NuxtInput, {
                    modelValue: unref(state).subject,
                    "onUpdate:modelValue": ($event) => unref(state).subject = $event,
                    size: "lg",
                    class: "w-full"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_NuxtInput, {
                      modelValue: unref(state).subject,
                      "onUpdate:modelValue": ($event) => unref(state).subject = $event,
                      size: "lg",
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_NuxtFormField, {
              name: "message",
              label: "Message",
              class: "md:col-span-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_NuxtTextarea, {
                    modelValue: unref(state).message,
                    "onUpdate:modelValue": ($event) => unref(state).message = $event,
                    size: "lg",
                    class: "w-full",
                    autoresize: "",
                    maxrows: 6
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_NuxtTextarea, {
                      modelValue: unref(state).message,
                      "onUpdate:modelValue": ($event) => unref(state).message = $event,
                      size: "lg",
                      class: "w-full",
                      autoresize: "",
                      maxrows: 6
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="md:col-span-2 flex justify-end"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtButton, {
              type: "submit",
              label: "Submit",
              "trailing-icon": "lucide:send",
              size: "lg",
              "loading-auto": ""
            }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "grid gap-x-2 gap-y-5 md:grid-cols-2" }, [
                createVNode(_component_NuxtFormField, {
                  name: "firstName",
                  label: "First Name"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_NuxtInput, {
                      modelValue: unref(state).firstName,
                      "onUpdate:modelValue": ($event) => unref(state).firstName = $event,
                      size: "lg",
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 1
                }),
                createVNode(_component_NuxtFormField, {
                  name: "lastName",
                  label: "Last Name"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_NuxtInput, {
                      modelValue: unref(state).lastName,
                      "onUpdate:modelValue": ($event) => unref(state).lastName = $event,
                      size: "lg",
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 1
                }),
                createVNode(_component_NuxtFormField, {
                  name: "email",
                  label: "Email Address",
                  class: "md:col-span-2"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_NuxtInput, {
                      modelValue: unref(state).email,
                      "onUpdate:modelValue": ($event) => unref(state).email = $event,
                      size: "lg",
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 1
                }),
                createVNode(_component_NuxtFormField, {
                  name: "phone",
                  label: "Phone Number"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_NuxtInput, {
                      modelValue: unref(state).phone,
                      "onUpdate:modelValue": ($event) => unref(state).phone = $event,
                      size: "lg",
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 1
                }),
                createVNode(_component_NuxtFormField, {
                  name: "location",
                  label: "Location"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_NuxtInput, {
                      modelValue: unref(state).location,
                      "onUpdate:modelValue": ($event) => unref(state).location = $event,
                      placeholder: "State or region, Country",
                      size: "lg",
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 1
                }),
                createVNode(_component_NuxtFormField, {
                  name: "field",
                  label: "Request Field"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_NuxtSelect, {
                      modelValue: unref(state).field,
                      "onUpdate:modelValue": ($event) => unref(state).field = $event,
                      items: fields,
                      size: "lg",
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 1
                }),
                createVNode(_component_NuxtFormField, {
                  name: "subject",
                  label: "Email Subject"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_NuxtInput, {
                      modelValue: unref(state).subject,
                      "onUpdate:modelValue": ($event) => unref(state).subject = $event,
                      size: "lg",
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 1
                }),
                createVNode(_component_NuxtFormField, {
                  name: "message",
                  label: "Message",
                  class: "md:col-span-2"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_NuxtTextarea, {
                      modelValue: unref(state).message,
                      "onUpdate:modelValue": ($event) => unref(state).message = $event,
                      size: "lg",
                      class: "w-full",
                      autoresize: "",
                      maxrows: 6
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 1
                }),
                createVNode("div", { class: "md:col-span-2 flex justify-end" }, [
                  createVNode(_component_NuxtButton, {
                    type: "submit",
                    label: "Submit",
                    "trailing-icon": "lucide:send",
                    size: "lg",
                    "loading-auto": ""
                  })
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div><div><div aria-hidden="true" class="bg-primary size-12 rounded-full animate-ping fixed bottom-[1.8rem] right-[2.1rem]"></div>`);
      _push(ssrRenderComponent(_component_MainCtaBanner, { color: "neutral" }, null, _parent));
      _push(`</div></main>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/(main)/contact.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=contact-CYaYeSw7.mjs.map
