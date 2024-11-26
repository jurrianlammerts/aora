import { useState } from "react";
import { Link, router } from "expo-router";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Alert,
  KeyboardAvoidingView,
} from "react-native";

import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import Page from "@/components/Page";

const Confirm = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [code, setCode] = useState("");

  const submit = async () => {
    if (code === "") {
      Alert.alert("Error", "Please enter the confirmation code");
      return;
    }

    setSubmitting(true);
    try {
      // TODO: Add confirmation code verification logic here
      router.replace("/(tabs)/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Page>
      <KeyboardAvoidingView behavior="padding">
        <ScrollView>
          <View
            className="w-full flex justify-center h-full px-4 my-6"
            style={{
              minHeight: Dimensions.get("window").height - 100,
            }}
          >
            <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
              Confirm Your Email
            </Text>
            <Text className="text-gray-300 mt-4 font-pregular">
              Please enter the confirmation code we sent to your email address.
            </Text>
            <FormField
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
            <View className="flex justify-center pt-5 flex-row gap-2">
              <Text className="text-lg text-gray-100 font-pregular">
                Didn't receive the code?
              </Text>
              <Link href="#" className="text-lg font-psemibold text-secondary">
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
