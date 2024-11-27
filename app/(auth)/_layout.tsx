import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import Loader from '@/components/Loader';
import { PRIMARY_COLOR } from '@/constants';
import useAuthStore from '@/store/auth';

const AuthLayout = () => {
  const { loading } = useAuthStore();

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="sign-in" />
        <Stack.Screen name="sign-up" />
        <Stack.Screen name="confirm" />
      </Stack>
      <Loader isLoading={loading} />
      <StatusBar backgroundColor={PRIMARY_COLOR} style="light" />
    </>
  );
};

export default AuthLayout;
