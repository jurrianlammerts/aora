import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import Loader from "@/components/Loader";
import useAuthStore from "@/store/auth";

const AuthLayout = () => {
  const { loading } = useAuthStore();

  return (
    <>
      <Stack>
        <Stack.Screen name="sign-in" options={{ headerShown: false }} />
        <Stack.Screen name="sign-up" options={{ headerShown: false }} />
        <Stack.Screen name="confirm" options={{ headerShown: false }} />
      </Stack>
      <Loader isLoading={loading} />
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default AuthLayout;
