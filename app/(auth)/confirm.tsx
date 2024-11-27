import { Link, router } from 'expo-router';
import { useState } from 'react';
import { View, Text, ScrollView, Dimensions, Alert, KeyboardAvoidingView } from 'react-native';

import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import Page from '@/components/Page';

const Confirm = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [code, setCode] = useState('');

  const submit = async () => {
    if (code === '') {
      Alert.alert('Error', 'Please enter the confirmation code');
      return;
    }

    setSubmitting(true);
    try {
      // TODO: Add confirmation code verification logic here
      router.replace('/(tabs)/home');
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
              Confirm Your Email
            </Text>
            <Text className="mt-4 font-pregular text-gray-300">
              Please enter the confirmation code we sent to your email address.
            </Text>
            <InputField
              title="Confirmation Code"
              value={code}
              handleChangeText={(e) => setCode(e)}
              otherStyles="mt-10"
              keyboardType="number-pad"
            />
            <CustomButton
              title="Verify Email"
              handlePress={submit}
              containerStyles="mt-7"
              isLoading={isSubmitting}
            />
            <View className="flex flex-row justify-center gap-2 pt-5">
              <Text className="font-pregular text-lg text-gray-100">Didn't receive the code?</Text>
              <Link href="/" className="font-psemibold text-lg text-secondary">
                Resend
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Page>
  );
};

export default Confirm;
