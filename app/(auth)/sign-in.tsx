import { Link, router } from 'expo-router';
import { useState } from 'react';
import { View, Text, ScrollView, Dimensions, Alert, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import { getCurrentUser, signIn } from '@/lib/supabase';
import useAuthStore from '@/store/auth';

const SignIn = () => {
  const { setUser } = useAuthStore();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: 'jurrian@lammerts.net',
    password: 'Test#123',
  });

  const submit = async () => {
    if (form.email === '' || form.password === '') {
      Alert.alert('Error', 'Please fill in all fields');
    }

    setSubmitting(true);

    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);

      router.replace('/home');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="h-full bg-primary">
      <KeyboardAvoidingView behavior="padding">
        <ScrollView>
          <View
            className="my-6 flex h-full w-full justify-center px-4"
            style={{ minHeight: Dimensions.get('window').height - 100 }}>
            <Text className="mt-10 font-psemibold text-2xl font-semibold text-white">
              Log in to Aora
            </Text>
            <InputField
              title="Email"
              value={form.email}
              handleChangeText={(e) => setForm({ ...form, email: e })}
              otherStyles="mt-7"
              keyboardType="email-address"
            />
            <InputField
              title="Password"
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e })}
              otherStyles="mt-7"
            />
            <CustomButton
              title="Sign In"
              handlePress={submit}
              containerStyles="mt-7"
              isLoading={isSubmitting}
            />
            <View className="flex flex-row justify-center gap-2 pt-5">
              <Text className="font-pregular text-lg text-gray-100">Don't have an account?</Text>
              <Link href="/sign-up" className="font-psemibold text-lg text-secondary">
                Signup
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;
