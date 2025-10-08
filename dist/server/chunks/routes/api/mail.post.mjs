import { d as defineEventHandler, r as readValidatedBody, c as createError, s as sendEmail } from '../../nitro/nitro.mjs';
import z from 'zod';
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
import 'cron';
import 'node:process';
import 'node:url';
import '@prisma/client/runtime/library';
import 'nodemailer';
import 'dotenv';
import 'better-auth';
import 'better-auth/adapters/prisma';
import 'better-auth/plugins';
import '@iconify/utils';
import 'consola';

const schema = z.object({
  name: z.string("Name is required").nonempty("Name is required"),
  email: z.email("Invalid email"),
  subject: z.string("Subject is required").nonempty("Subject is required"),
  body: z.string("body is required").nonempty("body is required")
});
const mail_post = defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, schema.safeParse);
  if (!body.success) {
    throw createError({
      statusCode: 400,
      statusMessage: body.error.issues[0].message
    });
  }
  const { name, email, subject, body: html } = body.data;
  const { error } = await sendEmail({
    to: {
      name,
      address: email
    },
    subject,
    html
  });
  if (error) {
    throw createError({
      status: 500,
      message: error.message
    });
  }
  return {
    message: "Email sent successfully."
  };
});

export { mail_post as default };
//# sourceMappingURL=mail.post.mjs.map
