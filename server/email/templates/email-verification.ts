import Button from "./components/button";
import Layout from "./components/layout";

export default function emailVerificationTemplate({
  user,
  url,
  subject
}: {
  user: EventContextUser;
  url: string;
  subject: string;
}) {
  const body = `
<section>
  <section>
    Hello, <b>${user.name}</b>
    <p>Thank you for signing up on AssetFusionX. To continue, you have to verify your email address.</p>
  </section>

  <section>
    ${Button({ label: "Verify email", href: url, centered: true })}
  </section>
</section>
`;

  return Layout(body, { subject });
}
/* <section>
    If clicking the button above doesn't work you can click this link or copy and paste it in your browser: ${url}
  </section> */
