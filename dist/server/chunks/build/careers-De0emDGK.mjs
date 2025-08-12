import { b as useRuntimeConfig, d as __nuxt_component_0$1, e as _sfc_main$d, c as _sfc_main$7 } from './server.mjs';
import { _ as _sfc_main$1 } from './Alert-CXdXSwrA.mjs';
import { _ as _sfc_main$2 } from './Card-HL6icAYQ.mjs';
import { _ as _sfc_main$3 } from './Badge-q_8fq56_.mjs';
import { _ as __nuxt_component_1 } from './cta-banner-DdIrk4Vz.mjs';
import { defineComponent, unref, withCtx, createVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList } from 'vue/server-renderer';
import '../nitro/nitro.mjs';
import 'node:path';
import 'fs/promises';
import 'axios';
import 'path';
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
import 'vue-router';
import 'tailwindcss/colors';
import '@iconify/vue';
import 'reka-ui';
import '@vueuse/core';
import 'tailwind-variants';
import '@iconify/utils/lib/css/icon';
import 'perfect-debounce';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';

const careers = {
  whyWork: [
    {
      icon: "lucide:rocket",
      color: "text-blue-500",
      title: "Innovation at Scale",
      description: "Work with cutting-edge AI and machine learning technologies to solve real financial challenges for thousands of investors."
    },
    {
      icon: "lucide:trending-up",
      color: "text-green-500",
      title: "Rapid Growth",
      description: "Join a fast-growing fintech company with unlimited potential for career advancement and professional development."
    },
    {
      icon: "lucide:heart",
      color: "text-red-500",
      title: "Meaningful Impact",
      description: "Help democratize wealth building and make financial success accessible to everyone, not just the privileged few."
    },
    {
      icon: "lucide:users",
      color: "text-purple-500",
      title: "Collaborative Culture",
      description: "Work alongside brilliant minds in a supportive environment that values diverse perspectives and creative problem-solving."
    },
    {
      icon: "lucide:dollar-sign",
      color: "text-yellow-500",
      title: "Competitive Rewards",
      description: "Enjoy competitive salaries, equity participation, comprehensive benefits, and performance bonuses that reward excellence."
    },
    {
      icon: "lucide:globe",
      color: "text-indigo-500",
      title: "Remote-First",
      description: "Work from anywhere with flexible schedules, modern tools, and a culture built around results, not hours logged."
    }
  ],
  openPositions: [
    {
      title: "Senior Software Engineer - Backend",
      description: "Build scalable APIs and infrastructure for our investment platform. Work with Python, PostgreSQL, and cloud technologies.",
      href: "#careers/senior-software-engineer-backend",
      tags: [
        {
          label: "Engineering",
          bg: "bg-blue-100",
          text: "text-blue-800"
        },
        {
          label: "Full-time",
          bg: "bg-green-100",
          text: "text-green-800"
        },
        {
          label: "Remote",
          bg: "bg-purple-100",
          text: "text-purple-800"
        }
      ]
    },
    {
      title: "Senior Data Scientist - ML/AI",
      description: "Develop predictive models and algorithms for investment strategies. Experience with TensorFlow, Python, and financial markets required.",
      href: "#careers/senior-data-scientist",
      tags: [
        {
          label: "Data Science",
          bg: "bg-orange-100",
          text: "text-orange-800"
        },
        {
          label: "Full-time",
          bg: "bg-green-100",
          text: "text-green-800"
        },
        {
          label: "Remote",
          bg: "bg-purple-100",
          text: "text-purple-800"
        }
      ]
    },
    {
      title: "Senior Product Manager",
      description: "Lead product strategy and execution for our investment platform. Drive user experience improvements and feature development.",
      href: "#careers/senior-product-manager",
      tags: [
        {
          label: "Product",
          bg: "bg-pink-100",
          text: "text-pink-800"
        },
        {
          label: "Full-time",
          bg: "bg-green-100",
          text: "text-green-800"
        },
        {
          label: "Remote",
          bg: "bg-purple-100",
          text: "text-purple-800"
        }
      ]
    },
    {
      title: "DevOps Engineer",
      description: "Design and maintain scalable infrastructure and CI/CD pipelines to support high-availability applications in production.",
      href: "#careers/devops-engineer",
      tags: [
        {
          label: "Infrastructure",
          bg: "bg-teal-100",
          text: "text-teal-800"
        },
        {
          label: "Full-time",
          bg: "bg-green-100",
          text: "text-green-800"
        },
        {
          label: "Remote",
          bg: "bg-purple-100",
          text: "text-purple-800"
        }
      ]
    }
  ],
  perksList_1: [
    "Competitive salary + equity package",
    "Comprehensive health, dental & vision insurance",
    "Unlimited PTO policy",
    "$5,000 annual learning & development budget"
  ],
  perksList_2: [
    "401(k) with company matching",
    "Remote work stipend for home office setup",
    "Flexible working hours across time zones"
  ]
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "careers",
  __ssrInlineRender: true,
  setup(__props) {
    const { appName } = useRuntimeConfig().public;
    const randomColor = () => {
      const colors = ["primary", "error", "warning", "success"];
      const randomIndex = Math.floor(Math.random() * colors.length);
      return colors[randomIndex];
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtImg = __nuxt_component_0$1;
      const _component_NuxtAlert = _sfc_main$1;
      const _component_NuxtIcon = _sfc_main$d;
      const _component_NuxtCard = _sfc_main$2;
      const _component_NuxtBadge = _sfc_main$3;
      const _component_NuxtButton = _sfc_main$7;
      const _component_MainCtaBanner = __nuxt_component_1;
      _push(`<main${ssrRenderAttrs(_attrs)}><div class="grid *:[grid-column:1/2] *:[grid-row:1/2]"><div class="flex flex-col items-center justify-center z-10"><div class="max-w-[32rem] text-center p-4 bg-slate-700/30 border border-white/30 backdrop-blur-[5px] rounded-xl"><h1 class="text-6xl font-medium">Careers</h1><div class="mt-5"><p>There is a place for everyone of value at ${ssrInterpolate(unref(appName))}.</p></div></div></div><div class="h-96">`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        placeholder: "",
        src: "/img/pages/about/careers.jpg",
        class: "h-full w-full object-cover"
      }, null, _parent));
      _push(`</div></div><div class="py-12 flex items-center justify-center"><div class="max-w-[30rem]">`);
      _push(ssrRenderComponent(_component_NuxtAlert, {
        color: "warning",
        variant: "subtle",
        icon: "lucide:triangle-alert",
        title: "Important",
        description: `Please, be advised that ${unref(appName)} is not taking any applications
            at this time. Do check back later, as this page is regularly
            updated. Thank you.`
      }, null, _parent));
      _push(`</div></div><div><div class="space-y-12 max-w-6xl mx-auto pt-8 pb-16 px-4 sm:px-6 lg:px-8"><div class="text-center space-y-8"><h1 class="text-2xl font-bold sm:text-6xl">Join Our Team</h1><p class="text-slate-300 max-w-3xl mx-auto leading-relaxed"> Help us revolutionize investing at ${ssrInterpolate(unref(appName))}. We&#39;re building the future of wealth management and looking for passionate individuals to join our mission. </p><div class="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div></div><div class="bg-slate-800 rounded-2xl p-8"><h2 class="text-2xl font-bold text-center mb-8"> Why Work at ${ssrInterpolate(unref(appName))}? </h2><div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`);
      ssrRenderList(unref(careers).whyWork, (item) => {
        _push(`<div class="bg-gradient-to-b from-primary-500/10 border border-white/20 p-6 rounded-xl shadow-sm">`);
        _push(ssrRenderComponent(_component_NuxtIcon, {
          name: item.icon,
          class: `text-4xl ${item.color} mb-4`
        }, null, _parent));
        _push(`<h3 class="text-xl font-semibold mb-3">${ssrInterpolate(item.title)}</h3><p class="text-slate-300">${ssrInterpolate(item.description)}</p></div>`);
      });
      _push(`<!--]--></div></div><div class="space-y-8"><h2 class="text-2xl font-bold text-tertiary-500 text-center"> Open Positions </h2><div class="space-y-4"><!--[-->`);
      ssrRenderList(unref(careers).openPositions, (item) => {
        _push(ssrRenderComponent(_component_NuxtCard, {
          key: item.title,
          variant: "solid"
        }, {
          footer: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex items-center gap-4 justify-between"${_scopeId}><div class="flex flex-wrap gap-2"${_scopeId}><!--[-->`);
              ssrRenderList(item.tags, (tag) => {
                _push2(ssrRenderComponent(_component_NuxtBadge, {
                  key: tag.label,
                  label: tag.label,
                  color: randomColor(),
                  variant: "subtle"
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]--></div>`);
              _push2(ssrRenderComponent(_component_NuxtButton, {
                to: item.href,
                label: "Apply Now",
                class: "text-white"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", { class: "flex items-center gap-4 justify-between" }, [
                  createVNode("div", { class: "flex flex-wrap gap-2" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(item.tags, (tag) => {
                      return openBlock(), createBlock(_component_NuxtBadge, {
                        key: tag.label,
                        label: tag.label,
                        color: randomColor(),
                        variant: "subtle"
                      }, null, 8, ["label", "color"]);
                    }), 128))
                  ]),
                  createVNode(_component_NuxtButton, {
                    to: item.href,
                    label: "Apply Now",
                    class: "text-white"
                  }, null, 8, ["to"])
                ])
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div${_scopeId}><p class="text-lg font-semibold"${_scopeId}>${ssrInterpolate(item.title)}</p><p class="text-muted"${_scopeId}>${ssrInterpolate(item.description)}</p></div>`);
            } else {
              return [
                createVNode("div", null, [
                  createVNode("p", { class: "text-lg font-semibold" }, toDisplayString(item.title), 1),
                  createVNode("p", { class: "text-muted" }, toDisplayString(item.description), 1)
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></div><div class="bg-slate-900 rounded-2xl p-8 text-white"><h2 class="text-3xl font-bold text-center mb-8"> Benefits &amp; Perks </h2><div class="grid md:grid-cols-2 gap-6"><ul class="space-y-3"><!--[-->`);
      ssrRenderList(unref(careers).perksList_1, (item) => {
        _push(`<li class="flex items-center gap-3">`);
        _push(ssrRenderComponent(_component_NuxtIcon, {
          name: "lucide:check-circle",
          class: "text-green-400"
        }, null, _parent));
        _push(`<p>${ssrInterpolate(item)}</p></li>`);
      });
      _push(`<!--]--></ul><ul class="space-y-3"><!--[-->`);
      ssrRenderList(unref(careers).perksList_2, (item) => {
        _push(`<li class="flex items-center gap-3">`);
        _push(ssrRenderComponent(_component_NuxtIcon, {
          name: "lucide:check-circle",
          class: "text-green-400"
        }, null, _parent));
        _push(`<p>${ssrInterpolate(item)}</p></li>`);
      });
      _push(`<!--]--></ul></div></div></div></div><div>`);
      _push(ssrRenderComponent(_component_MainCtaBanner, null, null, _parent));
      _push(`</div></main>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/(main)/about/careers.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=careers-De0emDGK.mjs.map
