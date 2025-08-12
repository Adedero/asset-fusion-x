import { _ as __nuxt_component_0 } from './my-page-Cgd-8gXO.mjs';
import { _ as _sfc_main$2 } from './Card-HL6icAYQ.mjs';
import { _ as _sfc_main$3 } from './Badge-q_8fq56_.mjs';
import { _ as __nuxt_component_6 } from './empty-icon-BnDpoaPH.mjs';
import { _ as _sfc_main$4 } from './Table-Bs0dxICt.mjs';
import { defineComponent, withAsyncContext, mergeProps, unref, withCtx, createVNode, toDisplayString, createBlock, openBlock, createCommentVNode, Fragment, renderList, computed, renderSlot, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderSlot, ssrRenderClass } from 'vue/server-renderer';
import { useForwardPropsEmits } from 'reka-ui';
import { RangeCalendar, Calendar } from 'reka-ui/namespaced';
import { useDateFormat, reactiveOmit } from '@vueuse/core';
import { e as _sfc_main$d, c as _sfc_main$7, f as useLocale, g as useAppConfig, t as tv } from './server.mjs';
import { g as getTransactionIcon, a as getTransactionBadgeColor } from './transaction-BkPO0uYy.mjs';
import { today, getLocalTimeZone } from '@internationalized/date';
import { t as toDollar } from './to-dollar-DdS_9tlH.mjs';
import { u as useFetch } from './fetch-DztuJ_5C.mjs';
import './fetch-error-alert-B3Gd_w4n.mjs';
import './Alert-CXdXSwrA.mjs';
import '../nitro/nitro.mjs';
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
import '@tanstack/vue-table';
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
import '@vue/shared';

const theme = {
  "slots": {
    "root": "",
    "header": "flex items-center justify-between",
    "body": "flex flex-col space-y-4 pt-4 sm:flex-row sm:space-x-4 sm:space-y-0",
    "heading": "text-center font-medium truncate mx-auto",
    "grid": "w-full border-collapse select-none space-y-1 focus:outline-none",
    "gridRow": "grid grid-cols-7 place-items-center",
    "gridWeekDaysRow": "mb-1 grid w-full grid-cols-7",
    "gridBody": "grid",
    "headCell": "rounded-md",
    "cell": "relative text-center",
    "cellTrigger": [
      "m-0.5 relative flex items-center justify-center rounded-full whitespace-nowrap focus-visible:ring-2 focus:outline-none data-disabled:text-muted data-unavailable:line-through data-unavailable:text-muted data-unavailable:pointer-events-none data-[selected]:text-inverted data-today:font-semibold data-[outside-view]:text-muted",
      "transition"
    ]
  },
  "variants": {
    "color": {
      "primary": {
        "headCell": "text-primary",
        "cellTrigger": "focus-visible:ring-primary data-[selected]:bg-primary data-today:not-data-[selected]:text-primary data-[highlighted]:bg-primary/20 hover:not-data-[selected]:bg-primary/20"
      },
      "secondary": {
        "headCell": "text-secondary",
        "cellTrigger": "focus-visible:ring-secondary data-[selected]:bg-secondary data-today:not-data-[selected]:text-secondary data-[highlighted]:bg-secondary/20 hover:not-data-[selected]:bg-secondary/20"
      },
      "success": {
        "headCell": "text-success",
        "cellTrigger": "focus-visible:ring-success data-[selected]:bg-success data-today:not-data-[selected]:text-success data-[highlighted]:bg-success/20 hover:not-data-[selected]:bg-success/20"
      },
      "info": {
        "headCell": "text-info",
        "cellTrigger": "focus-visible:ring-info data-[selected]:bg-info data-today:not-data-[selected]:text-info data-[highlighted]:bg-info/20 hover:not-data-[selected]:bg-info/20"
      },
      "warning": {
        "headCell": "text-warning",
        "cellTrigger": "focus-visible:ring-warning data-[selected]:bg-warning data-today:not-data-[selected]:text-warning data-[highlighted]:bg-warning/20 hover:not-data-[selected]:bg-warning/20"
      },
      "error": {
        "headCell": "text-error",
        "cellTrigger": "focus-visible:ring-error data-[selected]:bg-error data-today:not-data-[selected]:text-error data-[highlighted]:bg-error/20 hover:not-data-[selected]:bg-error/20"
      },
      "neutral": {
        "headCell": "text-highlighted",
        "cellTrigger": "focus-visible:ring-inverted data-[selected]:bg-inverted data-today:not-data-[selected]:text-highlighted data-[highlighted]:bg-inverted/20 hover:not-data-[selected]:bg-inverted/10"
      }
    },
    "size": {
      "xs": {
        "heading": "text-xs",
        "cell": "text-xs",
        "headCell": "text-[10px]",
        "cellTrigger": "size-7",
        "body": "space-y-2 pt-2"
      },
      "sm": {
        "heading": "text-xs",
        "headCell": "text-xs",
        "cell": "text-xs",
        "cellTrigger": "size-7"
      },
      "md": {
        "heading": "text-sm",
        "headCell": "text-xs",
        "cell": "text-sm",
        "cellTrigger": "size-8"
      },
      "lg": {
        "heading": "text-md",
        "headCell": "text-md",
        "cellTrigger": "size-9 text-md"
      },
      "xl": {
        "heading": "text-lg",
        "headCell": "text-lg",
        "cellTrigger": "size-10 text-lg"
      }
    }
  },
  "defaultVariants": {
    "size": "md",
    "color": "primary"
  }
};
const _sfc_main$1 = {
  __name: "NuxtCalendar",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    nextYearIcon: { type: String, required: false },
    nextYear: { type: Object, required: false },
    nextMonthIcon: { type: String, required: false },
    nextMonth: { type: Object, required: false },
    prevYearIcon: { type: String, required: false },
    prevYear: { type: Object, required: false },
    prevMonthIcon: { type: String, required: false },
    prevMonth: { type: Object, required: false },
    color: { type: null, required: false },
    size: { type: null, required: false },
    range: { type: Boolean, required: false },
    multiple: { type: Boolean, required: false },
    monthControls: { type: Boolean, required: false, default: true },
    yearControls: { type: Boolean, required: false, default: true },
    defaultValue: { type: null, required: false },
    modelValue: { type: null, required: false },
    class: { type: null, required: false },
    ui: { type: null, required: false },
    defaultPlaceholder: { type: null, required: false },
    placeholder: { type: null, required: false },
    allowNonContiguousRanges: { type: Boolean, required: false },
    pagedNavigation: { type: Boolean, required: false },
    preventDeselect: { type: Boolean, required: false },
    maximumDays: { type: Number, required: false },
    weekStartsOn: { type: Number, required: false },
    weekdayFormat: { type: String, required: false },
    fixedWeeks: { type: Boolean, required: false, default: true },
    maxValue: { type: null, required: false },
    minValue: { type: null, required: false },
    numberOfMonths: { type: Number, required: false },
    disabled: { type: Boolean, required: false },
    readonly: { type: Boolean, required: false },
    initialFocus: { type: Boolean, required: false },
    isDateDisabled: { type: Function, required: false },
    isDateUnavailable: { type: Function, required: false },
    isDateHighlightable: { type: Function, required: false },
    nextPage: { type: Function, required: false },
    prevPage: { type: Function, required: false },
    disableDaysOutsideCurrentView: { type: Boolean, required: false },
    fixedDate: { type: String, required: false }
  },
  emits: ["update:modelValue", "update:placeholder", "update:startValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const { code: locale, dir, t } = useLocale();
    const appConfig = useAppConfig();
    const rootProps = useForwardPropsEmits(reactiveOmit(props, "range", "modelValue", "defaultValue", "color", "size", "monthControls", "yearControls", "class", "ui"), emits);
    const nextYearIcon = computed(() => props.nextYearIcon || (dir.value === "rtl" ? appConfig.ui.icons.chevronDoubleLeft : appConfig.ui.icons.chevronDoubleRight));
    const nextMonthIcon = computed(() => props.nextMonthIcon || (dir.value === "rtl" ? appConfig.ui.icons.chevronLeft : appConfig.ui.icons.chevronRight));
    const prevYearIcon = computed(() => props.prevYearIcon || (dir.value === "rtl" ? appConfig.ui.icons.chevronDoubleRight : appConfig.ui.icons.chevronDoubleLeft));
    const prevMonthIcon = computed(() => props.prevMonthIcon || (dir.value === "rtl" ? appConfig.ui.icons.chevronRight : appConfig.ui.icons.chevronLeft));
    const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.calendar || {} })({
      color: props.color,
      size: props.size
    }));
    function paginateYear(date, sign) {
      if (sign === -1) {
        return date.subtract({ years: 1 });
      }
      return date.add({ years: 1 });
    }
    const Calendar$1 = computed(() => props.range ? RangeCalendar : Calendar);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Calendar$1).Root, mergeProps(unref(rootProps), {
        "model-value": __props.modelValue,
        "default-value": __props.defaultValue,
        locale: unref(locale),
        dir: unref(dir),
        class: ui.value.root({ class: [props.ui?.root, props.class] })
      }, _attrs), {
        default: withCtx(({ weekDays, grid }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Calendar$1).Header, {
              class: ui.value.header({ class: props.ui?.header })
            }, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (props.yearControls) {
                    _push3(ssrRenderComponent(unref(Calendar$1).Prev, {
                      "prev-page": (date) => paginateYear(date, -1),
                      "aria-label": unref(t)("calendar.prevYear"),
                      "as-child": ""
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_sfc_main$7, mergeProps({
                            icon: prevYearIcon.value,
                            size: props.size,
                            color: "neutral",
                            variant: "ghost"
                          }, props.prevYear), null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_sfc_main$7, mergeProps({
                              icon: prevYearIcon.value,
                              size: props.size,
                              color: "neutral",
                              variant: "ghost"
                            }, props.prevYear), null, 16, ["icon", "size"])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (props.monthControls) {
                    _push3(ssrRenderComponent(unref(Calendar$1).Prev, {
                      "aria-label": unref(t)("calendar.prevMonth"),
                      "as-child": ""
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_sfc_main$7, mergeProps({
                            icon: prevMonthIcon.value,
                            size: props.size,
                            color: "neutral",
                            variant: "ghost"
                          }, props.prevMonth), null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_sfc_main$7, mergeProps({
                              icon: prevMonthIcon.value,
                              size: props.size,
                              color: "neutral",
                              variant: "ghost"
                            }, props.prevMonth), null, 16, ["icon", "size"])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(ssrRenderComponent(unref(Calendar$1).Heading, {
                    class: ui.value.heading({ class: props.ui?.heading })
                  }, {
                    default: withCtx(({ headingValue }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        ssrRenderSlot(_ctx.$slots, "heading", { value: headingValue }, () => {
                          _push4(`${ssrInterpolate(headingValue)}`);
                        }, _push4, _parent4, _scopeId3);
                      } else {
                        return [
                          renderSlot(_ctx.$slots, "heading", { value: headingValue }, () => [
                            createTextVNode(toDisplayString(headingValue), 1)
                          ])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  if (props.monthControls) {
                    _push3(ssrRenderComponent(unref(Calendar$1).Next, {
                      "aria-label": unref(t)("calendar.nextMonth"),
                      "as-child": ""
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_sfc_main$7, mergeProps({
                            icon: nextMonthIcon.value,
                            size: props.size,
                            color: "neutral",
                            variant: "ghost"
                          }, props.nextMonth), null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_sfc_main$7, mergeProps({
                              icon: nextMonthIcon.value,
                              size: props.size,
                              color: "neutral",
                              variant: "ghost"
                            }, props.nextMonth), null, 16, ["icon", "size"])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (props.yearControls) {
                    _push3(ssrRenderComponent(unref(Calendar$1).Next, {
                      "next-page": (date) => paginateYear(date, 1),
                      "aria-label": unref(t)("calendar.nextYear"),
                      "as-child": ""
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_sfc_main$7, mergeProps({
                            icon: nextYearIcon.value,
                            size: props.size,
                            color: "neutral",
                            variant: "ghost"
                          }, props.nextYear), null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_sfc_main$7, mergeProps({
                              icon: nextYearIcon.value,
                              size: props.size,
                              color: "neutral",
                              variant: "ghost"
                            }, props.nextYear), null, 16, ["icon", "size"])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    props.yearControls ? (openBlock(), createBlock(unref(Calendar$1).Prev, {
                      key: 0,
                      "prev-page": (date) => paginateYear(date, -1),
                      "aria-label": unref(t)("calendar.prevYear"),
                      "as-child": ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$7, mergeProps({
                          icon: prevYearIcon.value,
                          size: props.size,
                          color: "neutral",
                          variant: "ghost"
                        }, props.prevYear), null, 16, ["icon", "size"])
                      ]),
                      _: 1
                    }, 8, ["prev-page", "aria-label"])) : createCommentVNode("", true),
                    props.monthControls ? (openBlock(), createBlock(unref(Calendar$1).Prev, {
                      key: 1,
                      "aria-label": unref(t)("calendar.prevMonth"),
                      "as-child": ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$7, mergeProps({
                          icon: prevMonthIcon.value,
                          size: props.size,
                          color: "neutral",
                          variant: "ghost"
                        }, props.prevMonth), null, 16, ["icon", "size"])
                      ]),
                      _: 1
                    }, 8, ["aria-label"])) : createCommentVNode("", true),
                    createVNode(unref(Calendar$1).Heading, {
                      class: ui.value.heading({ class: props.ui?.heading })
                    }, {
                      default: withCtx(({ headingValue }) => [
                        renderSlot(_ctx.$slots, "heading", { value: headingValue }, () => [
                          createTextVNode(toDisplayString(headingValue), 1)
                        ])
                      ]),
                      _: 3
                    }, 8, ["class"]),
                    props.monthControls ? (openBlock(), createBlock(unref(Calendar$1).Next, {
                      key: 2,
                      "aria-label": unref(t)("calendar.nextMonth"),
                      "as-child": ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$7, mergeProps({
                          icon: nextMonthIcon.value,
                          size: props.size,
                          color: "neutral",
                          variant: "ghost"
                        }, props.nextMonth), null, 16, ["icon", "size"])
                      ]),
                      _: 1
                    }, 8, ["aria-label"])) : createCommentVNode("", true),
                    props.yearControls ? (openBlock(), createBlock(unref(Calendar$1).Next, {
                      key: 3,
                      "next-page": (date) => paginateYear(date, 1),
                      "aria-label": unref(t)("calendar.nextYear"),
                      "as-child": ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$7, mergeProps({
                          icon: nextYearIcon.value,
                          size: props.size,
                          color: "neutral",
                          variant: "ghost"
                        }, props.nextYear), null, 16, ["icon", "size"])
                      ]),
                      _: 1
                    }, 8, ["next-page", "aria-label"])) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(`<div class="${ssrRenderClass(ui.value.body({ class: props.ui?.body }))}"${_scopeId}><!--[-->`);
            ssrRenderList(grid, (month) => {
              _push2(ssrRenderComponent(unref(Calendar$1).Grid, {
                key: month.value.toString(),
                class: ui.value.grid({ class: props.ui?.grid })
              }, {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Calendar$1).GridHead, null, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(Calendar$1).GridRow, {
                            class: ui.value.gridWeekDaysRow({ class: props.ui?.gridWeekDaysRow })
                          }, {
                            default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<!--[-->`);
                                ssrRenderList(weekDays, (day) => {
                                  _push5(ssrRenderComponent(unref(Calendar$1).HeadCell, {
                                    key: day,
                                    class: ui.value.headCell({ class: props.ui?.headCell })
                                  }, {
                                    default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        ssrRenderSlot(_ctx.$slots, "week-day", { day }, () => {
                                          _push6(`${ssrInterpolate(day)}`);
                                        }, _push6, _parent6, _scopeId5);
                                      } else {
                                        return [
                                          renderSlot(_ctx.$slots, "week-day", { day }, () => [
                                            createTextVNode(toDisplayString(day), 1)
                                          ])
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                });
                                _push5(`<!--]-->`);
                              } else {
                                return [
                                  (openBlock(true), createBlock(Fragment, null, renderList(weekDays, (day) => {
                                    return openBlock(), createBlock(unref(Calendar$1).HeadCell, {
                                      key: day,
                                      class: ui.value.headCell({ class: props.ui?.headCell })
                                    }, {
                                      default: withCtx(() => [
                                        renderSlot(_ctx.$slots, "week-day", { day }, () => [
                                          createTextVNode(toDisplayString(day), 1)
                                        ])
                                      ]),
                                      _: 2
                                    }, 1032, ["class"]);
                                  }), 128))
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(Calendar$1).GridRow, {
                              class: ui.value.gridWeekDaysRow({ class: props.ui?.gridWeekDaysRow })
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(weekDays, (day) => {
                                  return openBlock(), createBlock(unref(Calendar$1).HeadCell, {
                                    key: day,
                                    class: ui.value.headCell({ class: props.ui?.headCell })
                                  }, {
                                    default: withCtx(() => [
                                      renderSlot(_ctx.$slots, "week-day", { day }, () => [
                                        createTextVNode(toDisplayString(day), 1)
                                      ])
                                    ]),
                                    _: 2
                                  }, 1032, ["class"]);
                                }), 128))
                              ]),
                              _: 2
                            }, 1032, ["class"])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(Calendar$1).GridBody, {
                      class: ui.value.gridBody({ class: props.ui?.gridBody })
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<!--[-->`);
                          ssrRenderList(month.rows, (weekDates, index) => {
                            _push4(ssrRenderComponent(unref(Calendar$1).GridRow, {
                              key: `weekDate-${index}`,
                              class: ui.value.gridRow({ class: props.ui?.gridRow })
                            }, {
                              default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<!--[-->`);
                                  ssrRenderList(weekDates, (weekDate) => {
                                    _push5(ssrRenderComponent(unref(Calendar$1).Cell, {
                                      key: weekDate.toString(),
                                      date: weekDate,
                                      class: ui.value.cell({ class: props.ui?.cell })
                                    }, {
                                      default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                        if (_push6) {
                                          _push6(ssrRenderComponent(unref(Calendar$1).CellTrigger, {
                                            day: weekDate,
                                            month: month.value,
                                            class: ui.value.cellTrigger({ class: props.ui?.cellTrigger })
                                          }, {
                                            default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                              if (_push7) {
                                                ssrRenderSlot(_ctx.$slots, "day", { day: weekDate }, () => {
                                                  _push7(`${ssrInterpolate(weekDate.day)}`);
                                                }, _push7, _parent7, _scopeId6);
                                              } else {
                                                return [
                                                  renderSlot(_ctx.$slots, "day", { day: weekDate }, () => [
                                                    createTextVNode(toDisplayString(weekDate.day), 1)
                                                  ])
                                                ];
                                              }
                                            }),
                                            _: 2
                                          }, _parent6, _scopeId5));
                                        } else {
                                          return [
                                            createVNode(unref(Calendar$1).CellTrigger, {
                                              day: weekDate,
                                              month: month.value,
                                              class: ui.value.cellTrigger({ class: props.ui?.cellTrigger })
                                            }, {
                                              default: withCtx(() => [
                                                renderSlot(_ctx.$slots, "day", { day: weekDate }, () => [
                                                  createTextVNode(toDisplayString(weekDate.day), 1)
                                                ])
                                              ]),
                                              _: 2
                                            }, 1032, ["day", "month", "class"])
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent5, _scopeId4));
                                  });
                                  _push5(`<!--]-->`);
                                } else {
                                  return [
                                    (openBlock(true), createBlock(Fragment, null, renderList(weekDates, (weekDate) => {
                                      return openBlock(), createBlock(unref(Calendar$1).Cell, {
                                        key: weekDate.toString(),
                                        date: weekDate,
                                        class: ui.value.cell({ class: props.ui?.cell })
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(unref(Calendar$1).CellTrigger, {
                                            day: weekDate,
                                            month: month.value,
                                            class: ui.value.cellTrigger({ class: props.ui?.cellTrigger })
                                          }, {
                                            default: withCtx(() => [
                                              renderSlot(_ctx.$slots, "day", { day: weekDate }, () => [
                                                createTextVNode(toDisplayString(weekDate.day), 1)
                                              ])
                                            ]),
                                            _: 2
                                          }, 1032, ["day", "month", "class"])
                                        ]),
                                        _: 2
                                      }, 1032, ["date", "class"]);
                                    }), 128))
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          });
                          _push4(`<!--]-->`);
                        } else {
                          return [
                            (openBlock(true), createBlock(Fragment, null, renderList(month.rows, (weekDates, index) => {
                              return openBlock(), createBlock(unref(Calendar$1).GridRow, {
                                key: `weekDate-${index}`,
                                class: ui.value.gridRow({ class: props.ui?.gridRow })
                              }, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(weekDates, (weekDate) => {
                                    return openBlock(), createBlock(unref(Calendar$1).Cell, {
                                      key: weekDate.toString(),
                                      date: weekDate,
                                      class: ui.value.cell({ class: props.ui?.cell })
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(Calendar$1).CellTrigger, {
                                          day: weekDate,
                                          month: month.value,
                                          class: ui.value.cellTrigger({ class: props.ui?.cellTrigger })
                                        }, {
                                          default: withCtx(() => [
                                            renderSlot(_ctx.$slots, "day", { day: weekDate }, () => [
                                              createTextVNode(toDisplayString(weekDate.day), 1)
                                            ])
                                          ]),
                                          _: 2
                                        }, 1032, ["day", "month", "class"])
                                      ]),
                                      _: 2
                                    }, 1032, ["date", "class"]);
                                  }), 128))
                                ]),
                                _: 2
                              }, 1032, ["class"]);
                            }), 128))
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(Calendar$1).GridHead, null, {
                        default: withCtx(() => [
                          createVNode(unref(Calendar$1).GridRow, {
                            class: ui.value.gridWeekDaysRow({ class: props.ui?.gridWeekDaysRow })
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(weekDays, (day) => {
                                return openBlock(), createBlock(unref(Calendar$1).HeadCell, {
                                  key: day,
                                  class: ui.value.headCell({ class: props.ui?.headCell })
                                }, {
                                  default: withCtx(() => [
                                    renderSlot(_ctx.$slots, "week-day", { day }, () => [
                                      createTextVNode(toDisplayString(day), 1)
                                    ])
                                  ]),
                                  _: 2
                                }, 1032, ["class"]);
                              }), 128))
                            ]),
                            _: 2
                          }, 1032, ["class"])
                        ]),
                        _: 2
                      }, 1024),
                      createVNode(unref(Calendar$1).GridBody, {
                        class: ui.value.gridBody({ class: props.ui?.gridBody })
                      }, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(month.rows, (weekDates, index) => {
                            return openBlock(), createBlock(unref(Calendar$1).GridRow, {
                              key: `weekDate-${index}`,
                              class: ui.value.gridRow({ class: props.ui?.gridRow })
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(weekDates, (weekDate) => {
                                  return openBlock(), createBlock(unref(Calendar$1).Cell, {
                                    key: weekDate.toString(),
                                    date: weekDate,
                                    class: ui.value.cell({ class: props.ui?.cell })
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(Calendar$1).CellTrigger, {
                                        day: weekDate,
                                        month: month.value,
                                        class: ui.value.cellTrigger({ class: props.ui?.cellTrigger })
                                      }, {
                                        default: withCtx(() => [
                                          renderSlot(_ctx.$slots, "day", { day: weekDate }, () => [
                                            createTextVNode(toDisplayString(weekDate.day), 1)
                                          ])
                                        ]),
                                        _: 2
                                      }, 1032, ["day", "month", "class"])
                                    ]),
                                    _: 2
                                  }, 1032, ["date", "class"]);
                                }), 128))
                              ]),
                              _: 2
                            }, 1032, ["class"]);
                          }), 128))
                        ]),
                        _: 2
                      }, 1032, ["class"])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode(unref(Calendar$1).Header, {
                class: ui.value.header({ class: props.ui?.header })
              }, {
                default: withCtx(() => [
                  props.yearControls ? (openBlock(), createBlock(unref(Calendar$1).Prev, {
                    key: 0,
                    "prev-page": (date) => paginateYear(date, -1),
                    "aria-label": unref(t)("calendar.prevYear"),
                    "as-child": ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_sfc_main$7, mergeProps({
                        icon: prevYearIcon.value,
                        size: props.size,
                        color: "neutral",
                        variant: "ghost"
                      }, props.prevYear), null, 16, ["icon", "size"])
                    ]),
                    _: 1
                  }, 8, ["prev-page", "aria-label"])) : createCommentVNode("", true),
                  props.monthControls ? (openBlock(), createBlock(unref(Calendar$1).Prev, {
                    key: 1,
                    "aria-label": unref(t)("calendar.prevMonth"),
                    "as-child": ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_sfc_main$7, mergeProps({
                        icon: prevMonthIcon.value,
                        size: props.size,
                        color: "neutral",
                        variant: "ghost"
                      }, props.prevMonth), null, 16, ["icon", "size"])
                    ]),
                    _: 1
                  }, 8, ["aria-label"])) : createCommentVNode("", true),
                  createVNode(unref(Calendar$1).Heading, {
                    class: ui.value.heading({ class: props.ui?.heading })
                  }, {
                    default: withCtx(({ headingValue }) => [
                      renderSlot(_ctx.$slots, "heading", { value: headingValue }, () => [
                        createTextVNode(toDisplayString(headingValue), 1)
                      ])
                    ]),
                    _: 3
                  }, 8, ["class"]),
                  props.monthControls ? (openBlock(), createBlock(unref(Calendar$1).Next, {
                    key: 2,
                    "aria-label": unref(t)("calendar.nextMonth"),
                    "as-child": ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_sfc_main$7, mergeProps({
                        icon: nextMonthIcon.value,
                        size: props.size,
                        color: "neutral",
                        variant: "ghost"
                      }, props.nextMonth), null, 16, ["icon", "size"])
                    ]),
                    _: 1
                  }, 8, ["aria-label"])) : createCommentVNode("", true),
                  props.yearControls ? (openBlock(), createBlock(unref(Calendar$1).Next, {
                    key: 3,
                    "next-page": (date) => paginateYear(date, 1),
                    "aria-label": unref(t)("calendar.nextYear"),
                    "as-child": ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_sfc_main$7, mergeProps({
                        icon: nextYearIcon.value,
                        size: props.size,
                        color: "neutral",
                        variant: "ghost"
                      }, props.nextYear), null, 16, ["icon", "size"])
                    ]),
                    _: 1
                  }, 8, ["next-page", "aria-label"])) : createCommentVNode("", true)
                ]),
                _: 3
              }, 8, ["class"]),
              createVNode("div", {
                class: ui.value.body({ class: props.ui?.body })
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(grid, (month) => {
                  return openBlock(), createBlock(unref(Calendar$1).Grid, {
                    key: month.value.toString(),
                    class: ui.value.grid({ class: props.ui?.grid })
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(Calendar$1).GridHead, null, {
                        default: withCtx(() => [
                          createVNode(unref(Calendar$1).GridRow, {
                            class: ui.value.gridWeekDaysRow({ class: props.ui?.gridWeekDaysRow })
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(weekDays, (day) => {
                                return openBlock(), createBlock(unref(Calendar$1).HeadCell, {
                                  key: day,
                                  class: ui.value.headCell({ class: props.ui?.headCell })
                                }, {
                                  default: withCtx(() => [
                                    renderSlot(_ctx.$slots, "week-day", { day }, () => [
                                      createTextVNode(toDisplayString(day), 1)
                                    ])
                                  ]),
                                  _: 2
                                }, 1032, ["class"]);
                              }), 128))
                            ]),
                            _: 2
                          }, 1032, ["class"])
                        ]),
                        _: 2
                      }, 1024),
                      createVNode(unref(Calendar$1).GridBody, {
                        class: ui.value.gridBody({ class: props.ui?.gridBody })
                      }, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(month.rows, (weekDates, index) => {
                            return openBlock(), createBlock(unref(Calendar$1).GridRow, {
                              key: `weekDate-${index}`,
                              class: ui.value.gridRow({ class: props.ui?.gridRow })
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(weekDates, (weekDate) => {
                                  return openBlock(), createBlock(unref(Calendar$1).Cell, {
                                    key: weekDate.toString(),
                                    date: weekDate,
                                    class: ui.value.cell({ class: props.ui?.cell })
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(Calendar$1).CellTrigger, {
                                        day: weekDate,
                                        month: month.value,
                                        class: ui.value.cellTrigger({ class: props.ui?.cellTrigger })
                                      }, {
                                        default: withCtx(() => [
                                          renderSlot(_ctx.$slots, "day", { day: weekDate }, () => [
                                            createTextVNode(toDisplayString(weekDate.day), 1)
                                          ])
                                        ]),
                                        _: 2
                                      }, 1032, ["day", "month", "class"])
                                    ]),
                                    _: 2
                                  }, 1032, ["date", "class"]);
                                }), 128))
                              ]),
                              _: 2
                            }, 1032, ["class"]);
                          }), 128))
                        ]),
                        _: 2
                      }, 1032, ["class"])
                    ]),
                    _: 2
                  }, 1032, ["class"]);
                }), 128))
              ], 2)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/Calendar.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const localDate = today(getLocalTimeZone());
    const { data, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/user/pages/dashboard", {
      key: "user-dashboard"
    }, "$ZFj1pjJ4hi")), __temp = await __temp, __restore(), __temp);
    const transactionColumns = [
      {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }) => {
          const id = row.getValue("id") || "";
          return id.length > 5 ? id.slice(0, 5) + "..." : id;
        }
      },
      {
        accessorKey: "type",
        header: "Type"
      },
      {
        accessorKey: "currency",
        header: "Currency"
      },
      {
        accessorKey: "USDAmount",
        header: "USD Amount",
        cell: ({ row }) => toDollar(row.getValue("USDAmount"))
      },
      {
        accessorKey: "status",
        header: "Status"
      },
      {
        accessorKey: "createdAt",
        header: "Date",
        cell: ({ row }) => useDateFormat(row.getValue("createdAt"), "MMM/DD/YYYY hh:mm aa").value
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MyPage = __nuxt_component_0;
      const _component_NuxtCard = _sfc_main$2;
      const _component_NuxtBadge = _sfc_main$3;
      const _component_EmptyIcon = __nuxt_component_6;
      const _component_NuxtTable = _sfc_main$4;
      const _component_NuxtCalendar = _sfc_main$1;
      const _component_NuxtButton = _sfc_main$7;
      const _component_NuxtIcon = _sfc_main$d;
      _push(ssrRenderComponent(_component_MyPage, mergeProps({
        error: unref(error),
        onRefresh: ($event) => unref(refresh)()
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(data)) {
              _push2(`<div class="w-full lg:h-full gap-4 lg:flex pb-4"${_scopeId}><div class="w-full lg:min-w-0 lg:h-full lg:overflow-y-auto lg:flex-grow"${_scopeId}><div class="w-full max-h-full space-y-4 p-0.5"${_scopeId}><div class="grid gap-4 md:grid-cols-[repeat(auto-fit,minmax(250px,1fr))]"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_NuxtCard, { class: "bg-primary text-white" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<header${_scopeId2}><p class="card-title text-white"${_scopeId2}>Account Balance</p></header><div class="mt-2 text-2xl font-semibold font-geist-mono"${_scopeId2}>${ssrInterpolate(unref(toDollar)(unref(data).totalBalance))}</div><footer class="mt-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_NuxtBadge, {
                      color: "neutral",
                      variant: "soft",
                      class: "mr-2 dark:bg-white dark:text-primary",
                      icon: "lucide-wallet"
                    }, null, _parent3, _scopeId2));
                    _push3(`<small${_scopeId2}>From ${ssrInterpolate(unref(data).activeAccounts)} accounts</small></footer>`);
                  } else {
                    return [
                      createVNode("header", null, [
                        createVNode("p", { class: "card-title text-white" }, "Account Balance")
                      ]),
                      createVNode("div", { class: "mt-2 text-2xl font-semibold font-geist-mono" }, toDisplayString(unref(toDollar)(unref(data).totalBalance)), 1),
                      createVNode("footer", { class: "mt-2" }, [
                        createVNode(_component_NuxtBadge, {
                          color: "neutral",
                          variant: "soft",
                          class: "mr-2 dark:bg-white dark:text-primary",
                          icon: "lucide-wallet"
                        }),
                        createVNode("small", null, "From " + toDisplayString(unref(data).activeAccounts) + " accounts", 1)
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_NuxtCard, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<header${_scopeId2}><p class="card-title"${_scopeId2}>Profit</p></header><div class="mt-2 text-2xl font-semibold font-geist-mono"${_scopeId2}>${ssrInterpolate(unref(toDollar)(unref(data).totalProfit))}</div><footer class="mt-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_NuxtBadge, {
                      color: "success",
                      variant: "soft",
                      class: "mr-2",
                      icon: "lucide-flower-2"
                    }, null, _parent3, _scopeId2));
                    _push3(`<small class="text-muted"${_scopeId2}>From ${ssrInterpolate(unref(data).activeInvestments)} investments</small></footer>`);
                  } else {
                    return [
                      createVNode("header", null, [
                        createVNode("p", { class: "card-title" }, "Profit")
                      ]),
                      createVNode("div", { class: "mt-2 text-2xl font-semibold font-geist-mono" }, toDisplayString(unref(toDollar)(unref(data).totalProfit)), 1),
                      createVNode("footer", { class: "mt-2" }, [
                        createVNode(_component_NuxtBadge, {
                          color: "success",
                          variant: "soft",
                          class: "mr-2",
                          icon: "lucide-flower-2"
                        }),
                        createVNode("small", { class: "text-muted" }, "From " + toDisplayString(unref(data).activeInvestments) + " investments", 1)
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_NuxtCard, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<header${_scopeId2}><p class="card-title"${_scopeId2}>Last Transaction</p></header><div class="mt-2 text-2xl font-semibold font-geist-mono"${_scopeId2}>${ssrInterpolate(unref(toDollar)(unref(data).lastTransaction?.USDAmount ?? 0))}</div><footer class="mt-2"${_scopeId2}>`);
                    if (unref(data).lastTransaction) {
                      _push3(`<div${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_NuxtBadge, {
                        color: ("getTransactionBadgeColor" in _ctx ? _ctx.getTransactionBadgeColor : unref(getTransactionBadgeColor))(unref(data).lastTransaction.type),
                        variant: "soft",
                        class: "mr-2",
                        icon: ("getTransactionIcon" in _ctx ? _ctx.getTransactionIcon : unref(getTransactionIcon))(unref(data).lastTransaction.type)
                      }, null, _parent3, _scopeId2));
                      _push3(`<small class="text-muted"${_scopeId2}>${ssrInterpolate(unref(data).lastTransaction.status)} ${ssrInterpolate(unref(data).lastTransaction.type)}</small></div>`);
                    } else {
                      _push3(`<div${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_NuxtBadge, {
                        color: "neutral",
                        variant: "soft",
                        class: "mr-2",
                        icon: "lucide-alert-triangle"
                      }, null, _parent3, _scopeId2));
                      _push3(`<small class="text-muted"${_scopeId2}>Not available</small></div>`);
                    }
                    _push3(`</footer>`);
                  } else {
                    return [
                      createVNode("header", null, [
                        createVNode("p", { class: "card-title" }, "Last Transaction")
                      ]),
                      createVNode("div", { class: "mt-2 text-2xl font-semibold font-geist-mono" }, toDisplayString(unref(toDollar)(unref(data).lastTransaction?.USDAmount ?? 0)), 1),
                      createVNode("footer", { class: "mt-2" }, [
                        unref(data).lastTransaction ? (openBlock(), createBlock("div", { key: 0 }, [
                          createVNode(_component_NuxtBadge, {
                            color: ("getTransactionBadgeColor" in _ctx ? _ctx.getTransactionBadgeColor : unref(getTransactionBadgeColor))(unref(data).lastTransaction.type),
                            variant: "soft",
                            class: "mr-2",
                            icon: ("getTransactionIcon" in _ctx ? _ctx.getTransactionIcon : unref(getTransactionIcon))(unref(data).lastTransaction.type)
                          }, null, 8, ["color", "icon"]),
                          createVNode("small", { class: "text-muted" }, toDisplayString(unref(data).lastTransaction.status) + " " + toDisplayString(unref(data).lastTransaction.type), 1)
                        ])) : (openBlock(), createBlock("div", { key: 1 }, [
                          createVNode(_component_NuxtBadge, {
                            color: "neutral",
                            variant: "soft",
                            class: "mr-2",
                            icon: "lucide-alert-triangle"
                          }),
                          createVNode("small", { class: "text-muted" }, "Not available")
                        ]))
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div><div class="w-full py-0.5"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_NuxtCard, { class: "w-full" }, {
                header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div${_scopeId2}><p class="card-title"${_scopeId2}>Recent Transactions</p></div>`);
                  } else {
                    return [
                      createVNode("div", null, [
                        createVNode("p", { class: "card-title" }, "Recent Transactions")
                      ])
                    ];
                  }
                }),
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (unref(data).recentTransactions.length < 1) {
                      _push3(`<div class="fluid flex-center text-muted"${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_EmptyIcon, {
                        label: "No transactions",
                        size: "100px"
                      }, null, _parent3, _scopeId2));
                      _push3(`</div>`);
                    } else {
                      _push3(ssrRenderComponent(_component_NuxtTable, {
                        data: unref(data).recentTransactions,
                        columns: transactionColumns,
                        style: { "min-width": "0" }
                      }, null, _parent3, _scopeId2));
                    }
                  } else {
                    return [
                      unref(data).recentTransactions.length < 1 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "fluid flex-center text-muted"
                      }, [
                        createVNode(_component_EmptyIcon, {
                          label: "No transactions",
                          size: "100px"
                        })
                      ])) : (openBlock(), createBlock(_component_NuxtTable, {
                        key: 1,
                        data: unref(data).recentTransactions,
                        columns: transactionColumns,
                        style: { "min-width": "0" }
                      }, null, 8, ["data"]))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div></div></div><div class="lg:h-full lg:overflow-y-auto lg:flex-shrink-0 lg:w-96"${_scopeId}><div class="mt-3 space-y-4 lg:mt-0 w-full p-0.5"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_NuxtCard, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_NuxtCalendar, { "default-value": unref(localDate) }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_NuxtCalendar, { "default-value": unref(localDate) }, null, 8, ["default-value"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_NuxtCard, null, {
                header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="flex items-center gap-2 justify-between"${_scopeId2}><p class="card-title"${_scopeId2}>Recent Notifications</p>`);
                    _push3(ssrRenderComponent(_component_NuxtButton, {
                      to: "/user/notifications",
                      size: "sm",
                      variant: "outline",
                      color: "neutral",
                      label: "More",
                      "trailing-icon": "lucide-arrow-up-right"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "flex items-center gap-2 justify-between" }, [
                        createVNode("p", { class: "card-title" }, "Recent Notifications"),
                        createVNode(_component_NuxtButton, {
                          to: "/user/notifications",
                          size: "sm",
                          variant: "outline",
                          color: "neutral",
                          label: "More",
                          "trailing-icon": "lucide-arrow-up-right"
                        })
                      ])
                    ];
                  }
                }),
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (unref(data).notifications.length < 1) {
                      _push3(`<div class="fluid flex-center text-muted"${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_EmptyIcon, {
                        label: "No notifications",
                        size: "100px"
                      }, null, _parent3, _scopeId2));
                      _push3(`</div>`);
                    } else {
                      _push3(`<div class="space-y-2"${_scopeId2}><!--[-->`);
                      ssrRenderList(unref(data).notifications, (notification) => {
                        _push3(ssrRenderComponent(_component_NuxtCard, {
                          key: notification.id
                        }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              _push4(`<div class="flex gap-2 md:gap-4"${_scopeId3}><div class="flex-grow"${_scopeId3}><div class="text-sm"${_scopeId3}>`);
                              if (!notification.isRead) {
                                _push4(`<div class="flex items-center gap-4 justify-between mb-1"${_scopeId3}>`);
                                _push4(ssrRenderComponent(_component_NuxtBadge, {
                                  size: "sm",
                                  color: "success",
                                  variant: "soft",
                                  label: "New"
                                }, null, _parent4, _scopeId3));
                                _push4(`</div>`);
                              } else {
                                _push4(`<!---->`);
                              }
                              _push4(`<p class="font-semibold"${_scopeId3}>${ssrInterpolate(notification.title)}</p>`);
                              if (notification.bodyType === "string") {
                                _push4(`<p${_scopeId3}>${ssrInterpolate(notification.body)}</p>`);
                              } else {
                                _push4(`<div${_scopeId3}>${notification.body ?? ""}</div>`);
                              }
                              _push4(`<footer class="mt-2 flex items-center gap-4 justify-between"${_scopeId3}><div class="flex items-center gap-1"${_scopeId3}>`);
                              _push4(ssrRenderComponent(_component_NuxtIcon, {
                                name: "lucide:clock",
                                class: "text-muted"
                              }, null, _parent4, _scopeId3));
                              _push4(`<p class="text-xs text-muted"${_scopeId3}>${ssrInterpolate(unref(useDateFormat)(
                                notification.createdAt,
                                "MMM DD, YYYY"
                              ))} at ${ssrInterpolate(unref(useDateFormat)(notification.createdAt, "hh:mm aa"))}</p></div></footer></div></div></div>`);
                            } else {
                              return [
                                createVNode("div", { class: "flex gap-2 md:gap-4" }, [
                                  createVNode("div", { class: "flex-grow" }, [
                                    createVNode("div", { class: "text-sm" }, [
                                      !notification.isRead ? (openBlock(), createBlock("div", {
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
                                      createVNode("p", { class: "font-semibold" }, toDisplayString(notification.title), 1),
                                      notification.bodyType === "string" ? (openBlock(), createBlock("p", { key: 1 }, toDisplayString(notification.body), 1)) : (openBlock(), createBlock("div", {
                                        key: 2,
                                        innerHTML: notification.body
                                      }, null, 8, ["innerHTML"])),
                                      createVNode("footer", { class: "mt-2 flex items-center gap-4 justify-between" }, [
                                        createVNode("div", { class: "flex items-center gap-1" }, [
                                          createVNode(_component_NuxtIcon, {
                                            name: "lucide:clock",
                                            class: "text-muted"
                                          }),
                                          createVNode("p", { class: "text-xs text-muted" }, toDisplayString(unref(useDateFormat)(
                                            notification.createdAt,
                                            "MMM DD, YYYY"
                                          )) + " at " + toDisplayString(unref(useDateFormat)(notification.createdAt, "hh:mm aa")), 1)
                                        ])
                                      ])
                                    ])
                                  ])
                                ])
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                      });
                      _push3(`<!--]--></div>`);
                    }
                  } else {
                    return [
                      unref(data).notifications.length < 1 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "fluid flex-center text-muted"
                      }, [
                        createVNode(_component_EmptyIcon, {
                          label: "No notifications",
                          size: "100px"
                        })
                      ])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "space-y-2"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(data).notifications, (notification) => {
                          return openBlock(), createBlock(_component_NuxtCard, {
                            key: notification.id
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex gap-2 md:gap-4" }, [
                                createVNode("div", { class: "flex-grow" }, [
                                  createVNode("div", { class: "text-sm" }, [
                                    !notification.isRead ? (openBlock(), createBlock("div", {
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
                                    createVNode("p", { class: "font-semibold" }, toDisplayString(notification.title), 1),
                                    notification.bodyType === "string" ? (openBlock(), createBlock("p", { key: 1 }, toDisplayString(notification.body), 1)) : (openBlock(), createBlock("div", {
                                      key: 2,
                                      innerHTML: notification.body
                                    }, null, 8, ["innerHTML"])),
                                    createVNode("footer", { class: "mt-2 flex items-center gap-4 justify-between" }, [
                                      createVNode("div", { class: "flex items-center gap-1" }, [
                                        createVNode(_component_NuxtIcon, {
                                          name: "lucide:clock",
                                          class: "text-muted"
                                        }),
                                        createVNode("p", { class: "text-xs text-muted" }, toDisplayString(unref(useDateFormat)(
                                          notification.createdAt,
                                          "MMM DD, YYYY"
                                        )) + " at " + toDisplayString(unref(useDateFormat)(notification.createdAt, "hh:mm aa")), 1)
                                      ])
                                    ])
                                  ])
                                ])
                              ])
                            ]),
                            _: 2
                          }, 1024);
                        }), 128))
                      ]))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(data) ? (openBlock(), createBlock("div", {
                key: 0,
                class: "w-full lg:h-full gap-4 lg:flex pb-4"
              }, [
                createVNode("div", { class: "w-full lg:min-w-0 lg:h-full lg:overflow-y-auto lg:flex-grow" }, [
                  createVNode("div", { class: "w-full max-h-full space-y-4 p-0.5" }, [
                    createVNode("div", { class: "grid gap-4 md:grid-cols-[repeat(auto-fit,minmax(250px,1fr))]" }, [
                      createVNode(_component_NuxtCard, { class: "bg-primary text-white" }, {
                        default: withCtx(() => [
                          createVNode("header", null, [
                            createVNode("p", { class: "card-title text-white" }, "Account Balance")
                          ]),
                          createVNode("div", { class: "mt-2 text-2xl font-semibold font-geist-mono" }, toDisplayString(unref(toDollar)(unref(data).totalBalance)), 1),
                          createVNode("footer", { class: "mt-2" }, [
                            createVNode(_component_NuxtBadge, {
                              color: "neutral",
                              variant: "soft",
                              class: "mr-2 dark:bg-white dark:text-primary",
                              icon: "lucide-wallet"
                            }),
                            createVNode("small", null, "From " + toDisplayString(unref(data).activeAccounts) + " accounts", 1)
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_NuxtCard, null, {
                        default: withCtx(() => [
                          createVNode("header", null, [
                            createVNode("p", { class: "card-title" }, "Profit")
                          ]),
                          createVNode("div", { class: "mt-2 text-2xl font-semibold font-geist-mono" }, toDisplayString(unref(toDollar)(unref(data).totalProfit)), 1),
                          createVNode("footer", { class: "mt-2" }, [
                            createVNode(_component_NuxtBadge, {
                              color: "success",
                              variant: "soft",
                              class: "mr-2",
                              icon: "lucide-flower-2"
                            }),
                            createVNode("small", { class: "text-muted" }, "From " + toDisplayString(unref(data).activeInvestments) + " investments", 1)
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_NuxtCard, null, {
                        default: withCtx(() => [
                          createVNode("header", null, [
                            createVNode("p", { class: "card-title" }, "Last Transaction")
                          ]),
                          createVNode("div", { class: "mt-2 text-2xl font-semibold font-geist-mono" }, toDisplayString(unref(toDollar)(unref(data).lastTransaction?.USDAmount ?? 0)), 1),
                          createVNode("footer", { class: "mt-2" }, [
                            unref(data).lastTransaction ? (openBlock(), createBlock("div", { key: 0 }, [
                              createVNode(_component_NuxtBadge, {
                                color: ("getTransactionBadgeColor" in _ctx ? _ctx.getTransactionBadgeColor : unref(getTransactionBadgeColor))(unref(data).lastTransaction.type),
                                variant: "soft",
                                class: "mr-2",
                                icon: ("getTransactionIcon" in _ctx ? _ctx.getTransactionIcon : unref(getTransactionIcon))(unref(data).lastTransaction.type)
                              }, null, 8, ["color", "icon"]),
                              createVNode("small", { class: "text-muted" }, toDisplayString(unref(data).lastTransaction.status) + " " + toDisplayString(unref(data).lastTransaction.type), 1)
                            ])) : (openBlock(), createBlock("div", { key: 1 }, [
                              createVNode(_component_NuxtBadge, {
                                color: "neutral",
                                variant: "soft",
                                class: "mr-2",
                                icon: "lucide-alert-triangle"
                              }),
                              createVNode("small", { class: "text-muted" }, "Not available")
                            ]))
                          ])
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode("div", { class: "w-full py-0.5" }, [
                      createVNode(_component_NuxtCard, { class: "w-full" }, {
                        header: withCtx(() => [
                          createVNode("div", null, [
                            createVNode("p", { class: "card-title" }, "Recent Transactions")
                          ])
                        ]),
                        default: withCtx(() => [
                          unref(data).recentTransactions.length < 1 ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "fluid flex-center text-muted"
                          }, [
                            createVNode(_component_EmptyIcon, {
                              label: "No transactions",
                              size: "100px"
                            })
                          ])) : (openBlock(), createBlock(_component_NuxtTable, {
                            key: 1,
                            data: unref(data).recentTransactions,
                            columns: transactionColumns,
                            style: { "min-width": "0" }
                          }, null, 8, ["data"]))
                        ]),
                        _: 1
                      })
                    ])
                  ])
                ]),
                createVNode("div", { class: "lg:h-full lg:overflow-y-auto lg:flex-shrink-0 lg:w-96" }, [
                  createVNode("div", { class: "mt-3 space-y-4 lg:mt-0 w-full p-0.5" }, [
                    createVNode(_component_NuxtCard, null, {
                      default: withCtx(() => [
                        createVNode(_component_NuxtCalendar, { "default-value": unref(localDate) }, null, 8, ["default-value"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_NuxtCard, null, {
                      header: withCtx(() => [
                        createVNode("div", { class: "flex items-center gap-2 justify-between" }, [
                          createVNode("p", { class: "card-title" }, "Recent Notifications"),
                          createVNode(_component_NuxtButton, {
                            to: "/user/notifications",
                            size: "sm",
                            variant: "outline",
                            color: "neutral",
                            label: "More",
                            "trailing-icon": "lucide-arrow-up-right"
                          })
                        ])
                      ]),
                      default: withCtx(() => [
                        unref(data).notifications.length < 1 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "fluid flex-center text-muted"
                        }, [
                          createVNode(_component_EmptyIcon, {
                            label: "No notifications",
                            size: "100px"
                          })
                        ])) : (openBlock(), createBlock("div", {
                          key: 1,
                          class: "space-y-2"
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(data).notifications, (notification) => {
                            return openBlock(), createBlock(_component_NuxtCard, {
                              key: notification.id
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "flex gap-2 md:gap-4" }, [
                                  createVNode("div", { class: "flex-grow" }, [
                                    createVNode("div", { class: "text-sm" }, [
                                      !notification.isRead ? (openBlock(), createBlock("div", {
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
                                      createVNode("p", { class: "font-semibold" }, toDisplayString(notification.title), 1),
                                      notification.bodyType === "string" ? (openBlock(), createBlock("p", { key: 1 }, toDisplayString(notification.body), 1)) : (openBlock(), createBlock("div", {
                                        key: 2,
                                        innerHTML: notification.body
                                      }, null, 8, ["innerHTML"])),
                                      createVNode("footer", { class: "mt-2 flex items-center gap-4 justify-between" }, [
                                        createVNode("div", { class: "flex items-center gap-1" }, [
                                          createVNode(_component_NuxtIcon, {
                                            name: "lucide:clock",
                                            class: "text-muted"
                                          }),
                                          createVNode("p", { class: "text-xs text-muted" }, toDisplayString(unref(useDateFormat)(
                                            notification.createdAt,
                                            "MMM DD, YYYY"
                                          )) + " at " + toDisplayString(unref(useDateFormat)(notification.createdAt, "hh:mm aa")), 1)
                                        ])
                                      ])
                                    ])
                                  ])
                                ])
                              ]),
                              _: 2
                            }, 1024);
                          }), 128))
                        ]))
                      ]),
                      _: 1
                    })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/user/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DwFiNxxR.mjs.map
