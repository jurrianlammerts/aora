import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';

import { PRIMARY_COLOR } from '@/constants';

interface CustomButtonProps {
  title: string;
  handlePress?: () => void;
  containerStyles?: string;
  textStyles?: string;
  isLoading?: boolean;
}

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`flex min-h-[62px] flex-row items-center justify-center rounded-xl bg-secondary ${containerStyles} ${
        isLoading ? 'opacity-50' : ''
      }`}
      disabled={isLoading}>
      <Text className={`font-psemibold text-lg text-primary ${textStyles}`}>{title}</Text>
      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color={PRIMARY_COLOR}
          size="small"
          className="ml-2"
        />
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
