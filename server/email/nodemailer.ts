import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import normalizeException from "~~/shared/helpers/normalize-exception";

const nodemailerConfig: SMTPTransport.Options = {
  host: process.env.EMAIL_HOST,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  service: process.env.EMAIL_SERVICE,
};

export const transporter = nodemailer.createTransport(nodemailerConfig);

export type SendEmailReturnType = {
  data: SMTPTransport.SentMessageInfo | null;
  error: Error | null;
};

export const sendEmail = async (
  mailOptions: nodemailer.SendMailOptions,
): Promise<SendEmailReturnType> => {
  try {
    const info = await transporter.sendMail({
      from: { name: "AssetFusionX", address: process.env.USER_EMAIL ?? "" },
      ...mailOptions,
    });
    return { data: info, error: null };
  } catch (error) {
    return { data: null, error: normalizeException(error) };
  }
};
