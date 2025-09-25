import type {
  FinancialAccount,
  Transaction
} from "~~/server/generated/prisma/client";
import type { EmailTemplateParams } from "./types";
import conditional from "./utils/conditional";
import Layout from "./components/layout";

export default function transactionStatusUpdateEmail(
  params: EmailTemplateParams<{
    transaction: Transaction;
    account: FinancialAccount;
  }>
) {
  const { user, data, subject, role = "user" } = params ?? {};

  const body = `<section>
  <section>
    <p>
      Hello, <b>${conditional(role === "user", {
        if: user.name,
        else: "Admin"
      })}</b>
    </p>

    <p>
      You are receiving this email because 
      ${conditional(role === "user", {
        if: "your",
        else: `${user.name}'s`
      })} ${data.transaction.type} request on the account ${
    data.account.name
  } has been marked as ${data.transaction.status}.
    </p>
    <p>
      ${
        data.transaction.type === "deposit" &&
        data.transaction.status === "successfull"
          ? "Your account has been credited with $" +
            data.transaction.USDAmount.toLocaleString()
          : ""
      }
      ${
        data.transaction.type === "withdrawal" &&
        data.transaction.status === "failed"
          ? "The withdrawal amount of $" +
            (
              data.transaction.USDAmount + data.transaction.charges
            ).toLocaleString() +
            " has been reversed"
          : ""
      }
    </p>
  </section>

  <section>
    <p>
      Thank your for using ${process.env.APP_NAME}.
    </p>
  </section>
</section>`;

  return Layout(body, { subject });
}
