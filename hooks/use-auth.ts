import { supabase } from "@/lib/supabase";
import useAuthStore from "@/store/auth";
import { useEffect } from "react";

export default function useAuth() {
  const { setSession, setLoggedIn } = useAuthStore();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoggedIn(!!session?.user);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoggedIn(!!session?.user);
    });
  }, []);
}
