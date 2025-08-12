export default function maskEmail(email: string, asterisks: number = 5) {
  if (!email) {
    return "";
  }
  const [user, domain] = email.split("@");
  if (!user || !domain) {
    return email;
  }
  const visible = user.slice(0, 3);
  return `${visible}${"*".repeat(asterisks)}@${domain}`;
}
