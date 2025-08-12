import Button from "./components/button";
import Layout from "./components/layout";

export default function emailChangeTemplate({
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
    <p>
      You are trying to change the email associated with your AssetFusionX account. 
    </p>
  </section>

  <section>
    ${Button({ label: "Change email", href: url, centered: true })}
  </section>

  <section>
    If clicking the button above doesn't work you can click this link or copy and paste it in your browser: ${url}
  </section>
</section>
`;

  return Layout(body, { subject });
}
