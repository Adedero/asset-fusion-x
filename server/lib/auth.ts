import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { admin } from "better-auth/plugins";
import { sendEmail } from "../email/nodemailer";
import emailVerificationTemplate from "../email/templates/email-verification";
import resetPasswordTemplate from "../email/templates/reset-password";
import emailChangeTemplate from "../email/templates/email-change";

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),

  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },

  user: {
    changeEmail: {
      enabled: true,
      sendChangeEmailVerification: async ({
        user,
        /* newEmail, */ url /* token */,
      }) => {
        const subject = "Approve email change";

        await sendEmail({
          to: user.email,
          subject,
          html: emailChangeTemplate({ user, url, subject }),
        });
      },
    },
  },

  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: false,
    sendResetPassword: async ({ user, url /* token */ } /* request */) => {
      const subject = "Reset your password";
      const { error } = await sendEmail({
        to: user.email,
        subject,
        html: resetPasswordTemplate({ user, url, subject }),
      });

      if (error) throw error;
    },
  },

  emailVerification: {
    sendVerificationEmail: async ({ user, url /* token */ } /* request */) => {
      const subject = "Verify your email address";
      const { error } = await sendEmail({
        to: user.email,
        subject,
        html: emailVerificationTemplate({ user, url, subject }),
      });

      if (error) throw error;
    },
  },

  plugins: [admin()],
});
