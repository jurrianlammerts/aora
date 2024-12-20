import { router } from 'expo-router';
import { View, Text } from 'react-native';

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
      <Text className="font-pmedium text-sm text-gray-100">{title}</Text>
      <Text className="mt-2 text-center font-psemibold text-xl text-white">{subtitle}</Text>
      <CustomButton
        title={label || 'Back to Explore'}
        handlePress={() => (href ? router.navigate(href) : router.dismissTo('/home'))}
        containerStyles="w-full my-5"
      />
    </View>
  );
};

export default EmptyState;
