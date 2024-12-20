import { Session } from '@supabase/supabase-js';
import { useEffect } from 'react';

import { supabase } from '@/lib/supabase';
import useAuthStore from '@/store/auth';

export default function useAuth() {
  const { setSession, setLoggedIn, getUser, setUser, setLoading } = useAuthStore();

  useEffect(() => {
    // Handle initial session check
    const checkSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setSession(session);
        await updateAuthState(session);

        // if no session, clear the user
        if (!session) {
          setUser(null);
          setLoggedIn(false);
        }
      } catch (error) {
        console.error('Error checking session:', error);
        setLoading(false);
      }
    };

    // Handle auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setLoading(true);
      setSession(session);
      await updateAuthState(session);
    });

    // Helper function to update auth state based on session
    const updateAuthState = async (session: Session | null) => {
      try {
        let user = null;
        if (session?.user) {
          user = await getUser();
        }
        setLoggedIn(!!user);
        setLoading(false);
      } catch (error) {
        console.error('Error updating auth state:', error);
        setLoading(false);
      }
    };

    checkSession();

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);
}
