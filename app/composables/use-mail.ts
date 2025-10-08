interface SendMailOptions {
  name: string;
  email: string;
  subject: string;
  body: string;
}

export default function useMail() {
  return {
    sendMail: async (options: SendMailOptions) => {
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
