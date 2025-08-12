import Button from "./components/button";
import Layout from "./components/layout";

export default function resetPasswordTemplate({
  user,
  url,
  subject,
}: {
  user: EventContextUser;
  url: string;
  subject: string;
}) {
  const body = `
<section>
  <section>
    Hello, <b>${user.name}</b>
    <p>You have initiated a password reset on your account. Click the button below to continue.</p>
  </section>

  <section>
    ${Button({ label: "Reset password", href: url, centered: true })}
  </section>

  <section>
    If clicking the button above doesn't work you can click this link or copy and paste it in your browser: ${url}
  </section>
</section>
`;

  return Layout(body, { subject });
}
