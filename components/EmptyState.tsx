import { router } from 'expo-router';
import { View, Text, Image } from 'react-native';

import CustomButton from '@/components/CustomButton';

interface EmptyStateProps {
  title: string;
  subtitle: string;
  href?: any;
  label?: string;
}

const EmptyState = ({ title, subtitle, href, label }: EmptyStateProps) => {
  return (
    <View className="flex items-center justify-center px-4">
      <Image
        source={require('@/assets/images/empty.png')}
        resizeMode="contain"
        className="h-[216px] w-[270px]"
      />
      <Text className="font-pmedium text-sm text-gray-100">{title}</Text>
      <Text className="mt-2 text-center font-psemibold text-xl text-white">{subtitle}</Text>
      <CustomButton
        title={label || 'Back to Explore'}
        handlePress={() => router.navigate(href || '/home')}
        containerStyles="w-full my-5"
      />
    </View>
  );
};

export default EmptyState;
