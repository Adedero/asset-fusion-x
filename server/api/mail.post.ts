import z from "zod";
import { sendEmail } from "../email/nodemailer";

const schema = z.object({
  name: z.string("Name is required").nonempty("Name is required"),
  email: z.email("Invalid email"),
  subject: z.string("Subject is required").nonempty("Subject is required"),
  body: z.string("body is required").nonempty("body is required")
})

export default defineEventHandler(async (event) => {
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
    })
  }

  return {
    message: "Email sent successfully."
  }
})