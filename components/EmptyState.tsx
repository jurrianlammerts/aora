import { router } from "expo-router";
import { View, Text, Image } from "react-native";

import CustomButton from "@/components/CustomButton";

interface EmptyStateProps {
  title: string;
  subtitle: string;
}

const EmptyState = ({ title, subtitle }: EmptyStateProps) => {
  return (
    <View className="flex justify-center items-center px-4">
      <Image
        source={require("@/assets/images/empty.png")}
        resizeMode="contain"
        className="w-[270px] h-[216px]"
      />

      <Text className="text-sm font-pmedium text-gray-100">{title}</Text>
      <Text className="text-xl text-center font-psemibold text-white mt-2">
        {subtitle}
      </Text>

      <CustomButton
        title="Back to Explore"
        handlePress={() => router.navigate("/home")}
        containerStyles="w-full my-5"
      />
    </View>
  );
};

export default EmptyState;
