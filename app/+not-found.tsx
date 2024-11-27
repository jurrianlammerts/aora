import { Link, Stack } from 'expo-router';
import { Text, View } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View className="flex-1 items-center justify-center p-5">
        <Text className="font-pmedium text-xl">This screen doesn't exist.</Text>
        <Link href="/" className="mt-4 pt-4">
          <Text className="font-psemibold text-base text-secondary">Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}
