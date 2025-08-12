/* eslint-disable @typescript-eslint/no-explicit-any */
import { EventEmitter } from "node:events";
import type { NotificationEvents } from "./types";
import { onFinancialAccountCreate } from "./handlers/on-financial-account-create";
import { onDepositCreate } from "./handlers/on-deposit-create";
import { onWithdrawalCreate } from "./handlers/on-withdrawal-create";
import { onInvestmentCreate } from "./handlers/on-investment-create";

class NotificationEmitter<TEvents extends Record<string, any>> {
  private emitter = new EventEmitter();

  emit<TEventName extends keyof TEvents & string>(
    eventName: TEventName,
    ...eventArg: TEvents[TEventName]
  ) {
    this.emitter.emit(eventName, ...(eventArg as []));
  }

  on<TEventName extends keyof TEvents & string>(
    eventName: TEventName,
    handler: (...eventArg: TEvents[TEventName]) => void,
  ) {
    this.emitter.on(eventName, handler as any);
  }

  off<TEventName extends keyof TEvents & string>(
    eventName: TEventName,
    handler: (...eventArg: TEvents[TEventName]) => void,
  ) {
    this.emitter.off(eventName, handler as any);
  }
}

export const notificationEmitter =
  new NotificationEmitter<NotificationEvents>();

notificationEmitter.on("error", (err) => {
  console.error("Notification Emitter Error", err as Error);
});

// Financial account
notificationEmitter.on("financial-account:create", onFinancialAccountCreate);

// Transactions
notificationEmitter.on("deposit:create", onDepositCreate);
notificationEmitter.on("withdrawal:create", onWithdrawalCreate);

// Investment
notificationEmitter.on("investment:create", onInvestmentCreate);
