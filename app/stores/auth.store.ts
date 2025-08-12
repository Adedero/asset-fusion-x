import type { BetterAuthSession, BetterAuthUser } from "~/lib/auth";

export const useAuthStore = () => {
  const user = useState<BetterAuthUser | null>("auth-user", () => null);
  const session = useState<BetterAuthSession | null>(
    "auth-session",
    () => null,
  );

  // Load from sessionStorage on client only
  if (import.meta.client) {
    const savedUser = sessionStorage.getItem("auth-user");
    if (savedUser) user.value = JSON.parse(savedUser);

    const savedSession = sessionStorage.getItem("auth-session");
    if (savedSession) session.value = JSON.parse(savedSession);
  }

  const setUser = (value: BetterAuthUser | null) => {
    user.value = value;
    if (import.meta.client) {
      if (value !== null) {
        sessionStorage.setItem("auth-user", JSON.stringify(value));
      } else {
        sessionStorage.removeItem("auth-user");
      }
    }
  };

  const setSession = (value: BetterAuthSession | null) => {
    session.value = value;
    if (import.meta.client) {
      if (value) {
        sessionStorage.setItem("auth-session", JSON.stringify(value));
      } else {
        sessionStorage.removeItem("auth-session");
      }
    }
  };

  return {
    user,
    setUser,
    session,
    setSession,
  };
};
