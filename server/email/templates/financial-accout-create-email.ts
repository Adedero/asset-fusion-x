import type { FinancialAccount } from "~~/server/generated/prisma/client";
import Layout from "./components/layout";
import type { EmailTemplateParams } from "./types";
import conditional from "./utils/conditional";
import Button from "./components/button";

export default function financialAccountCreateEmail(
  params: EmailTemplateParams<{ account: FinancialAccount }>,
) {
  const { user, data, subject, role = "user" } = params ?? {};

  const accountLink = conditional(role === "user", {
    if: `${process.env.BASE_URL}/user/accounts/${data.account.id}`,
    else: `${process.env.BASE_URL}/users/${user.id}/accounts/${data.account.id}`,
  });
  const body = `<section>
  <section>
    <p>
      Hello,
      <b>${conditional(role === "user", { if: user.name, else: "Admin" })}</b>
    </p>
    <p>
      You are receiving this email because  
      ${conditional(role === "user", {
        if: "you",
        else: user.name,
      })} opened a new account.
    </p>
  </section>

  <section>
    <p>Account name: <b>${data.account.name}</b></p>
    <p>Type: <b>${data.account.type}</b></p>
    <p>Ownership Type: <b>${data.account.ownership}</b></p>
  </section>

  <section>
    ${Button({ label: "View account details", href: accountLink })}
  </section>

  <section>
    <p>
      Thank your for using ${process.env.APP_NAME}. ${conditional(
        role === "user",
        {
          if: "If you did not open an account, please contact us immediately and reset your password.",
          else: "",
        },
      )} 
    </p>
  </section>
</section>`;

  return Layout(body, { subject });
}
