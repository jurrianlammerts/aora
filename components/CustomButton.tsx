import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';

interface CustomButtonProps {
  title: string;
  href?: string;
  handlePress?: () => void;
  containerStyles?: string;
  textStyles?: string;
  isLoading?: boolean;
}

const CustomButton = ({
  title,
  href,
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
        <ActivityIndicator animating={isLoading} color="#fff" size="small" className="ml-2" />
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
