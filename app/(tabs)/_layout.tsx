import { Redirect, Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image, View } from 'react-native';

import Loader from '@/components/Loader';
import { BLACK_COLOR_200, GRAY_COLOR, PRIMARY_COLOR, SECONDARY_COLOR_100 } from '@/constants';
import useAuthStore from '@/store/auth';

export const unstable_settings = {
  initialRouteName: 'home',
};

interface TabIconProps {
  icon: any;
  color: string;
}

const TabIcon = ({ icon, color }: TabIconProps) => {
  return (
    <View className="items-center justify-center gap-2 py-2">
      <Image source={icon} resizeMode="contain" tintColor={color} className="h-5 w-5" />
    </View>
  );
};

const TabLayout = () => {
  const { loading, isLoggedIn } = useAuthStore();

  if (!loading && !isLoggedIn) return <Redirect href="/" />;

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: SECONDARY_COLOR_100,
          tabBarInactiveTintColor: GRAY_COLOR,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: PRIMARY_COLOR,
            borderTopWidth: 1,
            borderTopColor: BLACK_COLOR_200,
            height: 100,
          },
        }}>
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => (
              <TabIcon icon={require('@/assets/icons/home.png')} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="bookmark"
          options={{
            title: 'Bookmark',
            tabBarIcon: ({ color }) => (
              <TabIcon icon={require('@/assets/icons/bookmark.png')} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="create"
          options={{
            title: 'Create',
            tabBarIcon: ({ color }) => (
              <TabIcon icon={require('@/assets/icons/plus.png')} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color }) => (
              <TabIcon icon={require('@/assets/icons/profile.png')} color={color} />
            ),
          }}
        />
      </Tabs>

      <Loader isLoading={loading} />
      <StatusBar backgroundColor={PRIMARY_COLOR} style="light" />
    </>
  );
};

export default TabLayout;
