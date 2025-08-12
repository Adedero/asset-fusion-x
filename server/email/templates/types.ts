import type { EventContextUser } from "~~/shared/types/user.types";

export interface EmailTemplateParams<T = unknown> {
  subject: string;
  data: T;
  role?: "admin" | "user";
  user: EventContextUser;
}
