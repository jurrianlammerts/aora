import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, type TextInputProps } from 'react-native';

interface InputFieldProps extends TextInputProps {
  title: string;
  value: string;
  placeholder?: string;
  handleChangeText: (text: string) => void;
  otherStyles?: string;
}

const InputField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}: InputFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="font-pmedium text-base text-gray-100">{title}</Text>
      <View
        className={`flex h-16 w-full flex-row items-center rounded-2xl border-2 ${isFocused ? 'border-secondary' : 'border-black-200'} bg-black-100 px-4`}>
        <TextInput
          className="h-16 flex-1 font-psemibold text-base text-white"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={title === 'Password' && !showPassword}
          {...props}
        />
        {title === 'Password' && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={
                !showPassword
                  ? require('@/assets/icons/eye.png')
                  : require('@/assets/icons/eye-hide.png')
              }
              className="h-6 w-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default InputField;
