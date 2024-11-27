import { Link, router } from 'expo-router';
import { useState } from 'react';
import { View, Text, ScrollView, Dimensions, Alert, KeyboardAvoidingView } from 'react-native';

import CustomButton from '@/components/CustomButton';
import FormField from '@/components/FormField';
import Page from '@/components/Page';
import useAuthStore from '@/store/auth';

const SignUp = () => {
  const { signUp } = useAuthStore();

  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });

  const submit = async () => {
    if (form.username === '' || form.email === '' || form.password === '') {
      Alert.alert('Error', 'Please fill in all fields');
    }

    setSubmitting(true);
    try {
      await signUp(form.email, form.password, form.username);

      router.replace('/home');
      // TODO: Add confirmation code logic here
      // router.replace("/confirm");
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Page>
      <KeyboardAvoidingView behavior="padding">
        <ScrollView>
          <View
            className="my-6 flex h-full w-full justify-center px-4"
            style={{
              minHeight: Dimensions.get('window').height - 100,
            }}>
            <Text className="mt-10 font-psemibold text-2xl font-semibold text-white">
              Sign Up to Aora
            </Text>
            <FormField
              title="Username"
              value={form.username}
              handleChangeText={(e) => setForm({ ...form, username: e })}
              otherStyles="mt-10"
            />
            <FormField
              title="Email"
              value={form.email}
              handleChangeText={(e) => setForm({ ...form, email: e })}
              otherStyles="mt-7"
              keyboardType="email-address"
            />
            <FormField
              title="Password"
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e })}
              otherStyles="mt-7"
            />
            <CustomButton
              title="Sign Up"
              handlePress={submit}
              containerStyles="mt-7"
              isLoading={isSubmitting}
            />
            <View className="flex flex-row justify-center gap-2 pt-5">
              <Text className="font-pregular text-lg text-gray-100">Have an account already?</Text>
              <Link href="/sign-in" className="font-psemibold text-lg text-secondary">
                Login
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Page>
  );
};

export default SignUp;
