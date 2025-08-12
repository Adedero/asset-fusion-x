import { a as __nuxt_component_4 } from './server.mjs';
import 'vue';
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
import 'vue/server-renderer';
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

// @__NO_SIDE_EFFECTS__
async function createClientPage(loader) {
  const m = await loader();
  m.default || m;
  return pageToClientOnly();
}
function pageToClientOnly(component) {
  {
    return __nuxt_component_4;
  }
}

export { createClientPage };
//# sourceMappingURL=client-component-BXNJ0a6p.mjs.map
