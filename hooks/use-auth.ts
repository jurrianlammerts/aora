import { supabase } from "@/lib/supabase";
import useAuthStore from "@/store/auth";
import { useEffect } from "react";

export default function useAuth() {
  const { setSession, setLoggedIn, getUser, setLoading } = useAuthStore();

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      const user = await getUser();
      if (session?.user && user) {
        setLoggedIn(true);
        setLoading(false);
      }
    });

    supabase.auth.onAuthStateChange(async (_event, session) => {
      setLoading(true);
      setSession(session);
      const user = await getUser();
      if (session?.user && user) {
        setLoggedIn(true);
        setLoading(false);
      } else {
        setLoggedIn(false);
        setLoading(false);
      }
    });
  }, []);
}
