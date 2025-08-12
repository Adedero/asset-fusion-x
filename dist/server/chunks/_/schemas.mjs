import { z } from 'zod';

const MIN_PASSWORD_LENGTH = 8;

const months = [
  { long: "January", short: "Jan", number: 0 },
  { long: "February", short: "Feb", number: 1 },
  { long: "March", short: "Mar", number: 2 },
  { long: "April", short: "Apr", number: 3 },
  { long: "May", short: "May", number: 4 },
  { long: "June", short: "Jun", number: 5 },
  { long: "July", short: "Jul", number: 6 },
  { long: "August", short: "Aug", number: 7 },
  { long: "September", short: "Sep", number: 8 },
  { long: "October", short: "Oct", number: 9 },
  { long: "November", short: "Nov", number: 10 },
  { long: "December", short: "Dec", number: 11 }
];

const accountRoles = [
  "owner",
  "co-owner",
  "manager",
  "admin",
  "accountant",
  "investor",
  "contributor",
  "legal guardian",
  "signatory"
];

var _a, _b;
const EmailSchema = z.email({ message: "Invalid email" });
const PasswordSchema = z.string().min(MIN_PASSWORD_LENGTH, {
  message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`
}).refine((val) => /[a-z]/.test(val), {
  message: "Password must contain at least one lowercase letter"
}).refine((val) => /[A-Z]/.test(val), {
  message: "Password must contain at least one uppercase letter"
}).refine((val) => /\d/.test(val), {
  message: "Password must contain at least one number"
}).refine((val) => /[!@#$%^&*()_\-+={}[\]|\\:;"'<>,.?/~`]/.test(val), {
  message: "Password must contain at least one special character"
});
const RegisterSchema = z.object({
  name: z.string({ message: "Invalid name" }).nonempty({ message: "Full name is required" }),
  email: EmailSchema,
  password: PasswordSchema,
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});
const LoginSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
  rememberMe: z.boolean().optional()
});
const ResetPasswordSchema = z.object({
  password: PasswordSchema,
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});
const ProfileSchema = z.object({
  address: z.string({ message: "Address is required" }).min(1, "Address cannot be empty"),
  country: z.string({ message: "Country is required" }).min(1, "Country cannot be empty"),
  state: z.string({ message: "State is required" }).min(1, "State cannot be empty"),
  city: z.string({ message: "City is required" }).min(1, "City cannot be empty"),
  postalCode: z.string({ message: "Postal code is required" }).min(1, "Postal code cannot be empty")
});
const BusinessProfileSchema = z.object({
  address: z.string({ message: "Business address is required" }).nonempty({ message: "Business address is required" }).optional(),
  creationMonth: z.enum(
    months.map((month) => month.long),
    { message: "Invalid month" }
  ).optional(),
  creationYear: z.number({ message: "Invalid year" }).min(1e3, { message: "Year cannot be earlier than 1000" }).max((/* @__PURE__ */ new Date()).getFullYear(), {
    message: `Year cannot be later than ${(/* @__PURE__ */ new Date()).getFullYear()}`
  }).optional(),
  proofOfAddress: z.string().optional(),
  proofOfAddressExt: z.string().optional(),
  certificate: z.string().optional(),
  certificateExt: z.string().optional()
});
const JointAccountRequestSchema = z.object({
  recipientName: z.string({ message: "Name is required" }).nonempty({ message: "Name is required" }),
  recipientEmail: z.email({ message: "Invalid email" }),
  role: z.enum(accountRoles, { message: "Invalid role" }),
  ownership: z.number({ message: "Ownership is required" }).min(0, { message: "Ownership cannot be less than 0%" }).max(100, { message: "Ownership cannot be more than 100%" }),
  description: z.string({ message: "Imvalid description" }).optional()
});
const MIN_DEPOSIT_AMOUNT = parseFloat((_a = process.env.MIN_DEPOSIT_AMOUNT) != null ? _a : "10");
const MAX_DEPOSIT_AMOUNT = parseFloat(
  (_b = process.env.MAX_dEPOSIT_AMOUNT) != null ? _b : "100000"
);
const TransactionInitSchema = z.object({
  symbol: z.string().min(2, { message: "Currency symbol is required" }).transform((val) => val.toUpperCase()),
  amount: z.coerce.number().min(MIN_DEPOSIT_AMOUNT, {
    message: `Amount must be at least $${MIN_DEPOSIT_AMOUNT}`
  }).max(MAX_DEPOSIT_AMOUNT, {
    message: `Amount must not be more than $${MAX_DEPOSIT_AMOUNT}`
  })
});
const paginationQuerySchema = z.object({
  page: z.coerce.number({ message: "Page query must be a number" }).optional(),
  limit: z.coerce.number({ message: "Limit must be a number" }).optional(),
  skip: z.coerce.number({ message: "Skip must be a number" }).optional()
});

export { BusinessProfileSchema as B, EmailSchema as E, JointAccountRequestSchema as J, LoginSchema as L, ProfileSchema as P, RegisterSchema as R, TransactionInitSchema as T, PasswordSchema as a, ResetPasswordSchema as b, paginationQuerySchema as p };
//# sourceMappingURL=schemas.mjs.map
