import { B as Button, L as Layout } from '../nitro/nitro.mjs';

function jointAccountRequestEmail(params) {
  const { user, data, subject } = params != null ? params : {};
  const body = `
  <section>
    <section>
      <p>
        Hello, <b>${data.request.recipientName}</b>
      </p>
  
      <p>
        You have been invited to join a financial account on ${process.env.APP_NAME}. The details of the account are given below:
      </p>
    </section>

    <section>
      <p>Account Name: <b>${data.account.name}</b></p>
      <p>Invited By: <b>${user.name}</b></p>
      <p>Proposed Role: <b>${data.request.role}</b></p>
      <p>Percentage Ownership: <b>${data.request.ownership}%</b></p>
      <p>More Information: <b>${data.request.description}</b></p>
    </section>

    <section>
      <p>To accept or reject this invitation, please sign in to ${process.env.APP_NAME}.</p>

      ${Button({ label: "Sign in", href: `${process.env.BASE_URL}/sign-in` })}
    </section>

    <section>
      <p>If you do not have an account, you can register instead.</p>

      ${Button({ label: "Register", href: `${process.env.BASE_URL}/sign-up` })}
    </section>

    <section>
      <p>If you think, this is a mistake, please ignore this email</p>
    </section>
  </section>
  `;
  return Layout(body, { subject });
}

export { jointAccountRequestEmail as j };
//# sourceMappingURL=joint-account-request-email.mjs.map
