import { Redirect, router } from 'expo-router';
import { View, Text, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CustomButton from '@/components/CustomButton';
import Loader from '@/components/Loader';
import useAuth from '@/hooks/use-auth';
import useAuthStore from '@/store/auth';

const Welcome = () => {
  const { loading, isLoggedIn } = useAuthStore();
  useAuth();

  if (!loading && isLoggedIn) return <Redirect href="/home" />;

  return (
    <SafeAreaView className="h-full bg-primary">
      <Loader isLoading={loading} />
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className="flex h-full w-full items-center justify-center px-4">
          <Image
            source={require('@/assets/images/cards.png')}
            className="h-[298px] w-full max-w-[380px]"
            resizeMode="contain"
          />

          <View className="relative mt-5">
            <Text className="text-center text-3xl font-bold text-white">
              Discover Endless{'\n'}
              Possibilities with <Text className="text-secondary-100">Aora</Text>
            </Text>

            <Image
              source={require('@/assets/images/path.png')}
              className="absolute -bottom-2 -right-8 h-[15px] w-[136px]"
              resizeMode="contain"
            />
          </View>

          <Text className="mt-7 text-center font-pregular text-sm text-gray-100">
            Where Creativity Meets Innovation: Embark on a Journey of Limitless Exploration with
            Aora
          </Text>

          <CustomButton
            title="Continue with Email"
            handlePress={() => router.navigate('/sign-in')}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Welcome;
