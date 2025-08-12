import { z } from "zod";
import { MIN_PASSWORD_LENGTH } from "./constants";
import months from "../app/data/months";
import { accountRoles } from "../app/data/account";

export const EmailSchema = z.email({ message: "Invalid email" });

export const PasswordSchema = z
  .string()
  .min(MIN_PASSWORD_LENGTH, {
    message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`,
  })
  .refine((val) => /[a-z]/.test(val), {
    message: "Password must contain at least one lowercase letter",
  })
  .refine((val) => /[A-Z]/.test(val), {
    message: "Password must contain at least one uppercase letter",
  })
  .refine((val) => /\d/.test(val), {
    message: "Password must contain at least one number",
  })
  .refine((val) => /[!@#$%^&*()_\-+={}[\]|\\:;"'<>,.?/~`]/.test(val), {
    message: "Password must contain at least one special character",
  });
export type PasswordSchemaType = z.infer<typeof PasswordSchema>;

export const RegisterSchema = z
  .object({
    name: z
      .string({ message: "Invalid name" })
      .nonempty({ message: "Full name is required" }),
    email: EmailSchema,
    password: PasswordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export type RegisterSchemaType = z.infer<typeof RegisterSchema>;

export const LoginSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
  rememberMe: z.boolean().optional(),
});
export type LoginSchemaType = z.infer<typeof LoginSchema>;

export const ResetPasswordSchema = z
  .object({
    password: PasswordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export type ResetPasswordSchemaType = z.infer<typeof ResetPasswordSchema>;

export const ProfileSchema = z.object({
  address: z
    .string({ message: "Address is required" })
    .min(1, "Address cannot be empty"),
  country: z
    .string({ message: "Country is required" })
    .min(1, "Country cannot be empty"),
  state: z
    .string({ message: "State is required" })
    .min(1, "State cannot be empty"),
  city: z
    .string({ message: "City is required" })
    .min(1, "City cannot be empty"),
  postalCode: z
    .string({ message: "Postal code is required" })
    .min(1, "Postal code cannot be empty"),
});

export type ProfileSchemaType = z.infer<typeof ProfileSchema>;

export const BusinessProfileSchema = z.object({
  address: z
    .string({ message: "Business address is required" })
    .nonempty({ message: "Business address is required" })
    .optional(),
  creationMonth: z
    .enum(
      months.map((month) => month.long),
      { message: "Invalid month" },
    )
    .optional(),
  creationYear: z
    .number({ message: "Invalid year" })
    .min(1000, { message: "Year cannot be earlier than 1000" })
    .max(new Date().getFullYear(), {
      message: `Year cannot be later than ${new Date().getFullYear()}`,
    })
    .optional(),
  proofOfAddress: z.string().optional(),
  proofOfAddressExt: z.string().optional(),
  certificate: z.string().optional(),
  certificateExt: z.string().optional(),
});

export type BusinessProfileSchemaType = z.infer<typeof BusinessProfileSchema>;

export const JointAccountRequestSchema = z.object({
  recipientName: z
    .string({ message: "Name is required" })
    .nonempty({ message: "Name is required" }),
  recipientEmail: z.email({ message: "Invalid email" }),
  role: z.enum(accountRoles, { message: "Invalid role" }),
  ownership: z
    .number({ message: "Ownership is required" })
    .min(0, { message: "Ownership cannot be less than 0%" })
    .max(100, { message: "Ownership cannot be more than 100%" }),
  description: z.string({ message: "Imvalid description" }).optional(),
});

export type JointAccountRequestSchemaType = z.infer<
  typeof JointAccountRequestSchema
>;

const MIN_DEPOSIT_AMOUNT = parseFloat(process.env.MIN_DEPOSIT_AMOUNT ?? "10");
const MAX_DEPOSIT_AMOUNT = parseFloat(
  process.env.MAX_dEPOSIT_AMOUNT ?? "100000",
);

export const TransactionInitSchema = z.object({
  symbol: z
    .string()
    .min(2, { message: "Currency symbol is required" })
    .transform((val) => val.toUpperCase()),
  amount: z.coerce
    .number()
    .min(MIN_DEPOSIT_AMOUNT, {
      message: `Amount must be at least $${MIN_DEPOSIT_AMOUNT}`,
    })
    .max(MAX_DEPOSIT_AMOUNT, {
      message: `Amount must not be more than $${MAX_DEPOSIT_AMOUNT}`,
    }),
});

export const paginationQuerySchema = z.object({
  page: z.coerce.number({ message: "Page query must be a number" }).optional(),
  limit: z.coerce.number({ message: "Limit must be a number" }).optional(),
  skip: z.coerce.number({ message: "Skip must be a number" }).optional(),
});
