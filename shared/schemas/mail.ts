import z from "zod";

export const mailingSchema = z.object({
  firstName: z
    .string("First name is required")
    .nonempty("First name is required"),
  lastName: z.string("Last name is required").nonempty("Last name is required"),
  email: z.email("Invalid email"),
  phone: z
    .string("Phone number is required")
    .nonempty("Phone number is required")
    .refine((value) => {
      const phoneRegex = /^\+?[\d\s().-]{7,20}$/;
      return phoneRegex.test(value);
    }, "Invalid phone number"),
  location: z.string("Location is required").nonempty("Location is required"),
  field: z.string("Field is required").nonempty("Field is required"),
  subject: z.string("Subject is required").nonempty("Subject is required"),
  message: z.string("Message is required").nonempty("Message is required")
});

export type MailingSchema = z.infer<typeof mailingSchema>;
