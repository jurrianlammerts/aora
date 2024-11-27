import { router, usePathname } from 'expo-router';
import { useState } from 'react';
import { View, TouchableOpacity, Image, TextInput, Alert } from 'react-native';

import { GRAY_COLOR } from '@/constants';

interface SearchInputProps {
  initialQuery?: string;
  refetch?: () => void;
}

const SearchInput = ({ initialQuery, refetch }: SearchInputProps) => {
  const pathname = usePathname();
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState(initialQuery || '');

  return (
    <View
      className={`flex h-16 w-full flex-row items-center space-x-4 rounded-2xl border-2 ${
        isFocused ? 'border-secondary' : 'border-black-200'
      } bg-black-100 px-4`}>
      <TextInput
        className="mt-0.5 h-16 flex-1 font-pregular text-base text-white"
        value={query}
        placeholder="Search a video topic"
        placeholderTextColor={GRAY_COLOR}
        onChangeText={(e) => setQuery(e)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <TouchableOpacity
        onPress={() => {
          if (query === '')
            return Alert.alert(
              'Missing Query',
              'Please input something to search results across database'
            );

          if (pathname.startsWith('/search')) router.setParams({ query });
          else router.push(`/search/${query}`);
          refetch?.();
        }}>
        <Image
          source={require('@/assets/icons/search.png')}
          className="h-5 w-5"
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
