import { signIn, signUp, signOut } from "@/lib/supabase";
import { AuthError, Session, User } from "@supabase/supabase-js";
import { UserType } from "types";
import { create } from "zustand";

interface AuthState {
  loading: boolean;
  isLoggedIn: boolean;
  session: Session | null;
  user: UserType | null;
  setUser: (user: UserType | null) => void;
  setLoggedIn: (isLoggedIn: boolean) => void;
  setSession: (session: Session | null) => void;
  signIn: (email: string, password: string) => Promise<UserType | null>;
  signUp: (
    email: string,
    password: string,
    username: string
  ) => Promise<UserType | null>;
  signOut: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
  loading: false,
  session: null,
  isLoggedIn: false,
  user: null,
  setUser: (user) => set({ user }),
  setLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
  setSession: (session) => set({ session }),
  signIn: async (email, password) => {
    set({ loading: true });
    const user = await signIn(email, password);
    set({ loading: false, isLoggedIn: true, user });
    return user;
  },
  signUp: async (email, password, username) => {
    set({ loading: true });
    const user = await signUp(email, password, username);
    set({ loading: false, isLoggedIn: true, user });
    return user;
  },
  signOut: async () => {
    set({ loading: true });
    await signOut();
    set({ loading: false, isLoggedIn: false });
  },
}));

export default useAuthStore;
