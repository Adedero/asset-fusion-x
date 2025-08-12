import type {
  FinancialAccount,
  Transaction,
} from "~~/server/generated/prisma/client";
import type { EmailTemplateParams } from "./types";
import conditional from "./utils/conditional";
import Layout from "./components/layout";

export default function depositCreateEmail(
  params: EmailTemplateParams<{
    transaction: Transaction;
    account: FinancialAccount;
  }>,
) {
  const { user, data, subject, role = "user" } = params ?? {};

  const body = `<section>
  <section>
    <p>
      Hello, <b>${conditional(role === "user", { if: user.name, else: "Admin" })}</b>
    </p>

    <p>
      You are receiving this email because 
      ${conditional(role === "user", {
        if: "you",
        else: user.name,
      })} opened a new withdrawal request
    </p>
  </section>

  <section>
    <p>Amount
      <b style="font-size: 2.5rem;">$${data.transaction.USDAmount.toLocaleString()}</b>
    </p>
    <p>Account: <b>${data.account.name}</b></p>
  </section>

  <section>
    <p>
      Thank your for using ${process.env.APP_NAME}. ${conditional(
        role === "user",
        {
          if: "If you did not initiate this withdrawal, please contact us immediately and reset your password.",
          else: "",
        },
      )} 
    </p>
  </section>
</section>`;

  return Layout(body, { subject });
}
