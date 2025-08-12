import { _ as __nuxt_component_0 } from './my-page-Cgd-8gXO.mjs';
import { _ as _sfc_main$1, a as _sfc_main$2 } from './FormField-CzZJ1-Wb.mjs';
import { _ as _sfc_main$3 } from './Input-BtIiAvs7.mjs';
import { _ as _sfc_main$4 } from './SelectMenu-7R98CtYf.mjs';
import { i as useToast, c as _sfc_main$7 } from './server.mjs';
import { _ as _sfc_main$5 } from './Modal-DefLStPx.mjs';
import { defineComponent, ref, withAsyncContext, reactive, computed, mergeProps, unref, withCtx, createVNode, createTextVNode, isRef, withModifiers, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { P as ProfileSchema } from '../_/schemas.mjs';
import { a6 as normalizeException } from '../nitro/nitro.mjs';
import { u as useFetch } from './fetch-DztuJ_5C.mjs';
import './fetch-error-alert-B3Gd_w4n.mjs';
import './Alert-CXdXSwrA.mjs';
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

const countries = [
  {
    name: "Afghanistan",
    code: "AF"
  },
  {
    name: "Albania",
    code: "AL"
  },
  {
    name: "Algeria",
    code: "DZ"
  },
  {
    name: "American Samoa",
    code: "AS"
  },
  {
    name: "Andorra",
    code: "AD"
  },
  {
    name: "Angola",
    code: "AO"
  },
  {
    name: "Anguilla",
    code: "AI"
  },
  {
    name: "Antarctica",
    code: "AQ"
  },
  {
    name: "Antigua and Barbuda",
    code: "AG"
  },
  {
    name: "Argentina",
    code: "AR"
  },
  {
    name: "Armenia",
    code: "AM"
  },
  {
    name: "Aruba",
    code: "AW"
  },
  {
    name: "Asia/Pacific Region",
    code: "AP"
  },
  {
    name: "Australia",
    code: "AU"
  },
  {
    name: "Austria",
    code: "AT"
  },
  {
    name: "Azerbaijan",
    code: "AZ"
  },
  {
    name: "Bahamas",
    code: "BS"
  },
  {
    name: "Bahrain",
    code: "BH"
  },
  {
    name: "Bangladesh",
    code: "BD"
  },
  {
    name: "Barbados",
    code: "BB"
  },
  {
    name: "Belarus",
    code: "BY"
  },
  {
    name: "Belgium",
    code: "BE"
  },
  {
    name: "Belize",
    code: "BZ"
  },
  {
    name: "Benin",
    code: "BJ"
  },
  {
    name: "Bermuda",
    code: "BM"
  },
  {
    name: "Bhutan",
    code: "BT"
  },
  {
    name: "Bolivia",
    code: "BO"
  },
  {
    name: "Bonaire, Sint Eustatius and Saba",
    code: "BQ"
  },
  {
    name: "Bosnia and Herzegovina",
    code: "BA"
  },
  {
    name: "Botswana",
    code: "BW"
  },
  {
    name: "Bouvet Island",
    code: "BV"
  },
  {
    name: "Brazil",
    code: "BR"
  },
  {
    name: "British Indian Ocean Territory",
    code: "IO"
  },
  {
    name: "Brunei Darussalam",
    code: "BN"
  },
  {
    name: "Bulgaria",
    code: "BG"
  },
  {
    name: "Burkina Faso",
    code: "BF"
  },
  {
    name: "Burundi",
    code: "BI"
  },
  {
    name: "Cambodia",
    code: "KH"
  },
  {
    name: "Cameroon",
    code: "CM"
  },
  {
    name: "Canada",
    code: "CA"
  },
  {
    name: "Cape Verde",
    code: "CV"
  },
  {
    name: "Cayman Islands",
    code: "KY"
  },
  {
    name: "Central African Republic",
    code: "CF"
  },
  {
    name: "Chad",
    code: "TD"
  },
  {
    name: "Chile",
    code: "CL"
  },
  {
    name: "China",
    code: "CN"
  },
  {
    name: "Christmas Island",
    code: "CX"
  },
  {
    name: "Cocos (Keeling) Islands",
    code: "CC"
  },
  {
    name: "Colombia",
    code: "CO"
  },
  {
    name: "Comoros",
    code: "KM"
  },
  {
    name: "Congo",
    code: "CG"
  },
  {
    name: "Congo, The Democratic Republic of the",
    code: "CD"
  },
  {
    name: "Cook Islands",
    code: "CK"
  },
  {
    name: "Costa Rica",
    code: "CR"
  },
  {
    name: "Croatia",
    code: "HR"
  },
  {
    name: "Cuba",
    code: "CU"
  },
  {
    name: "Curaçao",
    code: "CW"
  },
  {
    name: "Cyprus",
    code: "CY"
  },
  {
    name: "Czech Republic",
    code: "CZ"
  },
  {
    name: "Côte d'Ivoire",
    code: "CI"
  },
  {
    name: "Denmark",
    code: "DK"
  },
  {
    name: "Djibouti",
    code: "DJ"
  },
  {
    name: "Dominica",
    code: "DM"
  },
  {
    name: "Dominican Republic",
    code: "DO"
  },
  {
    name: "Ecuador",
    code: "EC"
  },
  {
    name: "Egypt",
    code: "EG"
  },
  {
    name: "El Salvador",
    code: "SV"
  },
  {
    name: "Equatorial Guinea",
    code: "GQ"
  },
  {
    name: "Eritrea",
    code: "ER"
  },
  {
    name: "Estonia",
    code: "EE"
  },
  {
    name: "Ethiopia",
    code: "ET"
  },
  {
    name: "Falkland Islands (Malvinas)",
    code: "FK"
  },
  {
    name: "Faroe Islands",
    code: "FO"
  },
  {
    name: "Fiji",
    code: "FJ"
  },
  {
    name: "Finland",
    code: "FI"
  },
  {
    name: "France",
    code: "FR"
  },
  {
    name: "French Guiana",
    code: "GF"
  },
  {
    name: "French Polynesia",
    code: "PF"
  },
  {
    name: "French Southern Territories",
    code: "TF"
  },
  {
    name: "Gabon",
    code: "GA"
  },
  {
    name: "Gambia",
    code: "GM"
  },
  {
    name: "Georgia",
    code: "GE"
  },
  {
    name: "Germany",
    code: "DE"
  },
  {
    name: "Ghana",
    code: "GH"
  },
  {
    name: "Gibraltar",
    code: "GI"
  },
  {
    name: "Greece",
    code: "GR"
  },
  {
    name: "Greenland",
    code: "GL"
  },
  {
    name: "Grenada",
    code: "GD"
  },
  {
    name: "Guadeloupe",
    code: "GP"
  },
  {
    name: "Guam",
    code: "GU"
  },
  {
    name: "Guatemala",
    code: "GT"
  },
  {
    name: "Guernsey",
    code: "GG"
  },
  {
    name: "Guinea",
    code: "GN"
  },
  {
    name: "Guinea-Bissau",
    code: "GW"
  },
  {
    name: "Guyana",
    code: "GY"
  },
  {
    name: "Haiti",
    code: "HT"
  },
  {
    name: "Heard Island and Mcdonald Islands",
    code: "HM"
  },
  {
    name: "Holy See (Vatican City State)",
    code: "VA"
  },
  {
    name: "Honduras",
    code: "HN"
  },
  {
    name: "Hong Kong",
    code: "HK"
  },
  {
    name: "Hungary",
    code: "HU"
  },
  {
    name: "Iceland",
    code: "IS"
  },
  {
    name: "India",
    code: "IN"
  },
  {
    name: "Indonesia",
    code: "ID"
  },
  {
    name: "Iran, Islamic Republic Of",
    code: "IR"
  },
  {
    name: "Iraq",
    code: "IQ"
  },
  {
    name: "Ireland",
    code: "IE"
  },
  {
    name: "Isle of Man",
    code: "IM"
  },
  {
    name: "Israel",
    code: "IL"
  },
  {
    name: "Italy",
    code: "IT"
  },
  {
    name: "Jamaica",
    code: "JM"
  },
  {
    name: "Japan",
    code: "JP"
  },
  {
    name: "Jersey",
    code: "JE"
  },
  {
    name: "Jordan",
    code: "JO"
  },
  {
    name: "Kazakhstan",
    code: "KZ"
  },
  {
    name: "Kenya",
    code: "KE"
  },
  {
    name: "Kiribati",
    code: "KI"
  },
  {
    name: "Korea, Republic of",
    code: "KR"
  },
  {
    name: "Kuwait",
    code: "KW"
  },
  {
    name: "Kyrgyzstan",
    code: "KG"
  },
  {
    name: "Laos",
    code: "LA"
  },
  {
    name: "Latvia",
    code: "LV"
  },
  {
    name: "Lebanon",
    code: "LB"
  },
  {
    name: "Lesotho",
    code: "LS"
  },
  {
    name: "Liberia",
    code: "LR"
  },
  {
    name: "Libyan Arab Jamahiriya",
    code: "LY"
  },
  {
    name: "Liechtenstein",
    code: "LI"
  },
  {
    name: "Lithuania",
    code: "LT"
  },
  {
    name: "Luxembourg",
    code: "LU"
  },
  {
    name: "Macao",
    code: "MO"
  },
  {
    name: "Madagascar",
    code: "MG"
  },
  {
    name: "Malawi",
    code: "MW"
  },
  {
    name: "Malaysia",
    code: "MY"
  },
  {
    name: "Maldives",
    code: "MV"
  },
  {
    name: "Mali",
    code: "ML"
  },
  {
    name: "Malta",
    code: "MT"
  },
  {
    name: "Marshall Islands",
    code: "MH"
  },
  {
    name: "Martinique",
    code: "MQ"
  },
  {
    name: "Mauritania",
    code: "MR"
  },
  {
    name: "Mauritius",
    code: "MU"
  },
  {
    name: "Mayotte",
    code: "YT"
  },
  {
    name: "Mexico",
    code: "MX"
  },
  {
    name: "Micronesia, Federated States of",
    code: "FM"
  },
  {
    name: "Moldova, Republic of",
    code: "MD"
  },
  {
    name: "Monaco",
    code: "MC"
  },
  {
    name: "Mongolia",
    code: "MN"
  },
  {
    name: "Montenegro",
    code: "ME"
  },
  {
    name: "Montserrat",
    code: "MS"
  },
  {
    name: "Morocco",
    code: "MA"
  },
  {
    name: "Mozambique",
    code: "MZ"
  },
  {
    name: "Myanmar",
    code: "MM"
  },
  {
    name: "Namibia",
    code: "NA"
  },
  {
    name: "Nauru",
    code: "NR"
  },
  {
    name: "Nepal",
    code: "NP"
  },
  {
    name: "Netherlands",
    code: "NL"
  },
  {
    name: "Netherlands Antilles",
    code: "AN"
  },
  {
    name: "New Caledonia",
    code: "NC"
  },
  {
    name: "New Zealand",
    code: "NZ"
  },
  {
    name: "Nicaragua",
    code: "NI"
  },
  {
    name: "Niger",
    code: "NE"
  },
  {
    name: "Nigeria",
    code: "NG"
  },
  {
    name: "Niue",
    code: "NU"
  },
  {
    name: "Norfolk Island",
    code: "NF"
  },
  {
    name: "North Korea",
    code: "KP"
  },
  {
    name: "North Macedonia",
    code: "MK"
  },
  {
    name: "Northern Mariana Islands",
    code: "MP"
  },
  {
    name: "Norway",
    code: "NO"
  },
  {
    name: "Oman",
    code: "OM"
  },
  {
    name: "Pakistan",
    code: "PK"
  },
  {
    name: "Palau",
    code: "PW"
  },
  {
    name: "Palestinian Territory, Occupied",
    code: "PS"
  },
  {
    name: "Panama",
    code: "PA"
  },
  {
    name: "Papua New Guinea",
    code: "PG"
  },
  {
    name: "Paraguay",
    code: "PY"
  },
  {
    name: "Peru",
    code: "PE"
  },
  {
    name: "Philippines",
    code: "PH"
  },
  {
    name: "Pitcairn Islands",
    code: "PN"
  },
  {
    name: "Poland",
    code: "PL"
  },
  {
    name: "Portugal",
    code: "PT"
  },
  {
    name: "Puerto Rico",
    code: "PR"
  },
  {
    name: "Qatar",
    code: "QA"
  },
  {
    name: "Reunion",
    code: "RE"
  },
  {
    name: "Romania",
    code: "RO"
  },
  {
    name: "Russian Federation",
    code: "RU"
  },
  {
    name: "Rwanda",
    code: "RW"
  },
  {
    name: "Saint Barthélemy",
    code: "BL"
  },
  {
    name: "Saint Helena",
    code: "SH"
  },
  {
    name: "Saint Kitts and Nevis",
    code: "KN"
  },
  {
    name: "Saint Lucia",
    code: "LC"
  },
  {
    name: "Saint Martin",
    code: "MF"
  },
  {
    name: "Saint Martin",
    code: "MF"
  },
  {
    name: "Saint Pierre and Miquelon",
    code: "PM"
  },
  {
    name: "Saint Vincent and the Grenadines",
    code: "VC"
  },
  {
    name: "Samoa",
    code: "WS"
  },
  {
    name: "San Marino",
    code: "SM"
  },
  {
    name: "Sao Tome and Principe",
    code: "ST"
  },
  {
    name: "Saudi Arabia",
    code: "SA"
  },
  {
    name: "Senegal",
    code: "SN"
  },
  {
    name: "Serbia",
    code: "RS"
  },
  {
    name: "Serbia and Montenegro",
    code: "CS"
  },
  {
    name: "Seychelles",
    code: "SC"
  },
  {
    name: "Sierra Leone",
    code: "SL"
  },
  {
    name: "Singapore",
    code: "SG"
  },
  {
    name: "Sint Maarten",
    code: "SX"
  },
  {
    name: "Slovakia",
    code: "SK"
  },
  {
    name: "Slovenia",
    code: "SI"
  },
  {
    name: "Solomon Islands",
    code: "SB"
  },
  {
    name: "Somalia",
    code: "SO"
  },
  {
    name: "South Africa",
    code: "ZA"
  },
  {
    name: "South Georgia and the South Sandwich Islands",
    code: "GS"
  },
  {
    name: "South Sudan",
    code: "SS"
  },
  {
    name: "Spain",
    code: "ES"
  },
  {
    name: "Sri Lanka",
    code: "LK"
  },
  {
    name: "Sudan",
    code: "SD"
  },
  {
    name: "Suriname",
    code: "SR"
  },
  {
    name: "Svalbard and Jan Mayen",
    code: "SJ"
  },
  {
    name: "Swaziland",
    code: "SZ"
  },
  {
    name: "Sweden",
    code: "SE"
  },
  {
    name: "Switzerland",
    code: "CH"
  },
  {
    name: "Syrian Arab Republic",
    code: "SY"
  },
  {
    name: "Taiwan",
    code: "TW"
  },
  {
    name: "Tajikistan",
    code: "TJ"
  },
  {
    name: "Tanzania, United Republic of",
    code: "TZ"
  },
  {
    name: "Thailand",
    code: "TH"
  },
  {
    name: "Timor-Leste",
    code: "TL"
  },
  {
    name: "Togo",
    code: "TG"
  },
  {
    name: "Tokelau",
    code: "TK"
  },
  {
    name: "Tonga",
    code: "TO"
  },
  {
    name: "Trinidad and Tobago",
    code: "TT"
  },
  {
    name: "Tunisia",
    code: "TN"
  },
  {
    name: "Turkey",
    code: "TR"
  },
  {
    name: "Turkmenistan",
    code: "TM"
  },
  {
    name: "Turks and Caicos Islands",
    code: "TC"
  },
  {
    name: "Tuvalu",
    code: "TV"
  },
  {
    name: "Uganda",
    code: "UG"
  },
  {
    name: "Ukraine",
    code: "UA"
  },
  {
    name: "United Arab Emirates",
    code: "AE"
  },
  {
    name: "United Kingdom",
    code: "GB"
  },
  {
    name: "United States",
    code: "US"
  },
  {
    name: "United States Minor Outlying Islands",
    code: "UM"
  },
  {
    name: "Uruguay",
    code: "UY"
  },
  {
    name: "Uzbekistan",
    code: "UZ"
  },
  {
    name: "Vanuatu",
    code: "VU"
  },
  {
    name: "Venezuela",
    code: "VE"
  },
  {
    name: "Vietnam",
    code: "VN"
  },
  {
    name: "Virgin Islands, British",
    code: "VG"
  },
  {
    name: "Virgin Islands, U.S.",
    code: "VI"
  },
  {
    name: "Wallis and Futuna",
    code: "WF"
  },
  {
    name: "Western Sahara",
    code: "EH"
  },
  {
    name: "Yemen",
    code: "YE"
  },
  {
    name: "Zambia",
    code: "ZM"
  },
  {
    name: "Zimbabwe",
    code: "ZW"
  },
  {
    name: "Åland Islands",
    code: "AX"
  }
];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "profile-editor",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const toast = useToast();
    const open = ref(false);
    const { data, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/user/profile", {
      key: "user-profile"
    }, "$rFoSrIvo56")), __temp = await __temp, __restore(), __temp);
    const state = reactive({
      address: data.value?.profile?.address || "",
      postalCode: data.value?.profile?.postalCode || "",
      city: data.value?.profile?.city || "",
      state: data.value?.profile?.state || "",
      country: data.value?.profile?.country || "United States"
    });
    const initialState = ref(JSON.stringify(state));
    const disabled = computed(() => initialState.value === JSON.stringify(state));
    const formattedCountries = countries.map((country) => country.name);
    async function onSubmit(event) {
      try {
        const data2 = await $fetch("/api/user/profile", {
          method: "PUT",
          body: event.data,
          headers: {
            "Content-Type": "application/json"
          }
        });
        state.address = data2.profile.address ?? "";
        state.postalCode = data2.profile.postalCode ?? "";
        state.city = data2.profile.city ?? "";
        state.state = data2.profile.state ?? "";
        state.country = data2.profile.country ?? "";
        initialState.value = JSON.stringify(state);
        if (!data2.profile.kycStatus) {
          open.value = true;
        }
        refresh();
      } catch (err) {
        error.value = normalizeException(err);
        toast.add({
          title: "Error",
          description: error.value.message || "Failed to update profile",
          color: "error"
        });
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MyPage = __nuxt_component_0;
      const _component_NuxtForm = _sfc_main$1;
      const _component_NuxtFormField = _sfc_main$2;
      const _component_NuxtInput = _sfc_main$3;
      const _component_NuxtSelectMenu = _sfc_main$4;
      const _component_NuxtButton = _sfc_main$7;
      const _component_NuxtModal = _sfc_main$5;
      _push(ssrRenderComponent(_component_MyPage, mergeProps({
        error: unref(error),
        onRetry: ($event) => unref(refresh)()
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtForm, {
              schema: unref(ProfileSchema),
              state: unref(state),
              class: "grid gap-3 md:grid-cols-2 w-full",
              onSubmit
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_NuxtFormField, {
                    label: "Address",
                    name: "address",
                    class: "col-span-2"
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
                    label: "Post code",
                    name: "postalCode"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_NuxtInput, {
                          modelValue: unref(state).postalCode,
                          "onUpdate:modelValue": ($event) => unref(state).postalCode = $event,
                          size: "lg",
                          class: "w-full"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_NuxtInput, {
                            modelValue: unref(state).postalCode,
                            "onUpdate:modelValue": ($event) => unref(state).postalCode = $event,
                            size: "lg",
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_NuxtFormField, {
                    label: "City",
                    name: "city"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_NuxtInput, {
                          modelValue: unref(state).city,
                          "onUpdate:modelValue": ($event) => unref(state).city = $event,
                          size: "lg",
                          class: "w-full"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_NuxtInput, {
                            modelValue: unref(state).city,
                            "onUpdate:modelValue": ($event) => unref(state).city = $event,
                            size: "lg",
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_NuxtFormField, {
                    label: "State/Region",
                    name: "state"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_NuxtInput, {
                          modelValue: unref(state).state,
                          "onUpdate:modelValue": ($event) => unref(state).state = $event,
                          size: "lg",
                          class: "w-full"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_NuxtInput, {
                            modelValue: unref(state).state,
                            "onUpdate:modelValue": ($event) => unref(state).state = $event,
                            size: "lg",
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_NuxtFormField, {
                    label: "Country",
                    name: "country"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_NuxtSelectMenu, {
                          modelValue: unref(state).country,
                          "onUpdate:modelValue": ($event) => unref(state).country = $event,
                          items: unref(formattedCountries),
                          size: "lg",
                          class: "w-full"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_NuxtSelectMenu, {
                            modelValue: unref(state).country,
                            "onUpdate:modelValue": ($event) => unref(state).country = $event,
                            items: unref(formattedCountries),
                            size: "lg",
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_NuxtButton, {
                    type: "submit",
                    class: "mt-2 w-full flex-center",
                    size: "lg",
                    icon: "i-lucide-check-circle",
                    disabled: unref(disabled),
                    "loading-auto": ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Submit `);
                      } else {
                        return [
                          createTextVNode(" Submit ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_NuxtFormField, {
                      label: "Address",
                      name: "address",
                      class: "col-span-2"
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
                      label: "Post code",
                      name: "postalCode"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_NuxtInput, {
                          modelValue: unref(state).postalCode,
                          "onUpdate:modelValue": ($event) => unref(state).postalCode = $event,
                          size: "lg",
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_NuxtFormField, {
                      label: "City",
                      name: "city"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_NuxtInput, {
                          modelValue: unref(state).city,
                          "onUpdate:modelValue": ($event) => unref(state).city = $event,
                          size: "lg",
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_NuxtFormField, {
                      label: "State/Region",
                      name: "state"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_NuxtInput, {
                          modelValue: unref(state).state,
                          "onUpdate:modelValue": ($event) => unref(state).state = $event,
                          size: "lg",
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_NuxtFormField, {
                      label: "Country",
                      name: "country"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_NuxtSelectMenu, {
                          modelValue: unref(state).country,
                          "onUpdate:modelValue": ($event) => unref(state).country = $event,
                          items: unref(formattedCountries),
                          size: "lg",
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_NuxtButton, {
                      type: "submit",
                      class: "mt-2 w-full flex-center",
                      size: "lg",
                      icon: "i-lucide-check-circle",
                      disabled: unref(disabled),
                      "loading-auto": ""
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Submit ")
                      ]),
                      _: 1
                    }, 8, ["disabled"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_NuxtModal, {
              open: unref(open),
              "onUpdate:open": ($event) => isRef(open) ? open.value = $event : null,
              title: "KYC Verification",
              class: "max-w-[32rem]"
            }, {
              body: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div${_scopeId2}><p${_scopeId2}>Your profile has been updated.</p><p${_scopeId2}> Do you want to proceed with the KYC verification? You need to complete this step to open an account </p></div>`);
                } else {
                  return [
                    createVNode("div", null, [
                      createVNode("p", null, "Your profile has been updated."),
                      createVNode("p", null, " Do you want to proceed with the KYC verification? You need to complete this step to open an account ")
                    ])
                  ];
                }
              }),
              footer: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="w-full flex items-center justify-end gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_NuxtButton, {
                    label: "Cancel",
                    color: "neutral",
                    variant: "outline",
                    onClick: ($event) => open.value = false
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_NuxtButton, {
                    label: "Proceed",
                    to: "/user/profile/kyc"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "w-full flex items-center justify-end gap-2" }, [
                      createVNode(_component_NuxtButton, {
                        label: "Cancel",
                        color: "neutral",
                        variant: "outline",
                        onClick: ($event) => open.value = false
                      }, null, 8, ["onClick"]),
                      createVNode(_component_NuxtButton, {
                        label: "Proceed",
                        to: "/user/profile/kyc"
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_NuxtForm, {
                schema: unref(ProfileSchema),
                state: unref(state),
                class: "grid gap-3 md:grid-cols-2 w-full",
                onSubmit: withModifiers(onSubmit, ["prevent"])
              }, {
                default: withCtx(() => [
                  createVNode(_component_NuxtFormField, {
                    label: "Address",
                    name: "address",
                    class: "col-span-2"
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
                    label: "Post code",
                    name: "postalCode"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_NuxtInput, {
                        modelValue: unref(state).postalCode,
                        "onUpdate:modelValue": ($event) => unref(state).postalCode = $event,
                        size: "lg",
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_NuxtFormField, {
                    label: "City",
                    name: "city"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_NuxtInput, {
                        modelValue: unref(state).city,
                        "onUpdate:modelValue": ($event) => unref(state).city = $event,
                        size: "lg",
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_NuxtFormField, {
                    label: "State/Region",
                    name: "state"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_NuxtInput, {
                        modelValue: unref(state).state,
                        "onUpdate:modelValue": ($event) => unref(state).state = $event,
                        size: "lg",
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_NuxtFormField, {
                    label: "Country",
                    name: "country"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_NuxtSelectMenu, {
                        modelValue: unref(state).country,
                        "onUpdate:modelValue": ($event) => unref(state).country = $event,
                        items: unref(formattedCountries),
                        size: "lg",
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_NuxtButton, {
                    type: "submit",
                    class: "mt-2 w-full flex-center",
                    size: "lg",
                    icon: "i-lucide-check-circle",
                    disabled: unref(disabled),
                    "loading-auto": ""
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Submit ")
                    ]),
                    _: 1
                  }, 8, ["disabled"])
                ]),
                _: 1
              }, 8, ["schema", "state"]),
              createVNode(_component_NuxtModal, {
                open: unref(open),
                "onUpdate:open": ($event) => isRef(open) ? open.value = $event : null,
                title: "KYC Verification",
                class: "max-w-[32rem]"
              }, {
                body: withCtx(() => [
                  createVNode("div", null, [
                    createVNode("p", null, "Your profile has been updated."),
                    createVNode("p", null, " Do you want to proceed with the KYC verification? You need to complete this step to open an account ")
                  ])
                ]),
                footer: withCtx(() => [
                  createVNode("div", { class: "w-full flex items-center justify-end gap-2" }, [
                    createVNode(_component_NuxtButton, {
                      label: "Cancel",
                      color: "neutral",
                      variant: "outline",
                      onClick: ($event) => open.value = false
                    }, null, 8, ["onClick"]),
                    createVNode(_component_NuxtButton, {
                      label: "Proceed",
                      to: "/user/profile/kyc"
                    })
                  ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/user/profile/components/profile-editor.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=profile-editor-DKO0mc0p.mjs.map
