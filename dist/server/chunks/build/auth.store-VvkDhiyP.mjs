import { q as useState } from './server.mjs';

const useAuthStore = () => {
  const user = useState("auth-user", () => null);
  const session = useState(
    "auth-session",
    () => null
  );
  const setUser = (value) => {
    user.value = value;
  };
  const setSession = (value) => {
    session.value = value;
  };
  return {
    user,
    setUser,
    session,
    setSession
  };
};

export { useAuthStore as u };
//# sourceMappingURL=auth.store-VvkDhiyP.mjs.map
