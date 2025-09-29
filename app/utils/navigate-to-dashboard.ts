export default function navigateToDashboard(role?: string) {
  if (!role) {
    return;
  }
  if (role === "admin") {
    navigateTo("/admin");
    return;
  } else {
    navigateTo("/user");
    return;
  }
}
