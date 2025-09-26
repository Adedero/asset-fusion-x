import type {
  FinancialAccount,
  Investment
} from "~~/server/generated/prisma/client";
import type { EmailTemplateParams } from "./types";
import conditional from "./utils/conditional";
import Layout from "./components/layout";

export default function investmentStatusUpdateEmail(
  params: EmailTemplateParams<{
    investment: Investment;
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
      You are receiving this email because there is an update on the status of 
      ${conditional(role === "user", {
        if: "your",
        else: user.name + "'s"
      })} investment.
    </p>
  </section>

  <section>
    <p>Investment Name: <b>${data.investment.investmentName}</b></p>
    <p>Duration: <b>${data.investment.duration} days</b></p>
    <p>Account: <b>${data.account.name}</b></p>
    <p>The investment status is: <b>${data.investment.status}</b></p>
  </section>

    <section>
      <p>
        Thank your for using ${process.env.APP_NAME}. ${conditional(
          role === "user",
          {
            if: "If this is not your investment, please contact us immediately and reset your password.",
            else: ""
          }
        )} 
      </p>
    </section>
</section>`;

  return Layout(body, { subject });
}
