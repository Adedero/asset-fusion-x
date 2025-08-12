import { d as defineEventHandler, f as getRouterParams, p as prisma } from '../../../../nitro/nitro.mjs';
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

const _notificationId__delete = defineEventHandler(async (event) => {
  const { notificationId } = getRouterParams(event);
  const deleted = await prisma.notification.delete({
    where: {
      id: notificationId
    }
  });
  return {
    notification: deleted
  };
});

export { _notificationId__delete as default };
//# sourceMappingURL=_notificationId_.delete.mjs.map
