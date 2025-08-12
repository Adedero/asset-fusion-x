import type {
  FinancialAccount,
  Investment,
  Transaction,
} from "~~/server/generated/prisma/client";
import type { EventContextUser } from "~~/shared/types/user.types";

export interface EventData<T> {
  user: EventContextUser;
  data: T;
}
export type NotificationEvents = {
  error: [error: Error | unknown];

  // financial account notifications
  "financial-account:create": [EventData<{ account: FinancialAccount }>]; // done

  // transaction notifications
  "deposit:create": [
    EventData<{ transaction: Transaction; account: FinancialAccount }>,
  ]; // done
  "withdrawal:create": [
    EventData<{ transaction: Transaction; account: FinancialAccount }>,
  ]; // done
  "transaction-status:update": [
    EventData<{ transaction: Transaction; account: FinancialAccount }>,
  ];

  // investment notifications
  "investment:create": [
    EventData<{ investment: Investment; account: FinancialAccount }>,
  ]; // done
  "investment-status:update": [
    EventData<{ investment: Investment; account: FinancialAccount }>,
  ];
};
