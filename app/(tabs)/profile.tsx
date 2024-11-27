import { View, Image, FlatList, TouchableOpacity } from 'react-native';

import EmptyState from '@/components/EmptyState';
import InfoBox from '@/components/InfoBox';
import Page from '@/components/Page';
import VideoCard from '@/components/VideoCard';
import { getUserPosts } from '@/lib/supabase';
import useSupabase from '@/lib/useSupabase';
import useAuthStore from '@/store/auth';

const Profile = () => {
  const { user, signOut } = useAuthStore();
  const { data: posts } = useSupabase(() => getUserPosts(user?.id));

  const logout = async () => {
    await signOut();
  };

  return (
    <Page>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}
          />
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this profile"
            href="/create"
            label="Create Video"
          />
        )}
        ListHeaderComponent={() => (
          <View className="mb-12 mt-6 flex w-full items-center justify-center px-4">
            <TouchableOpacity onPress={logout} className="mb-10 flex w-full items-end">
              <Image
                source={require('@/assets/icons/logout.png')}
                resizeMode="contain"
                className="h-6 w-6"
              />
            </TouchableOpacity>
            <View className="flex h-16 w-16 items-center justify-center rounded-lg border border-secondary">
              <Image
                source={{ uri: user?.avatar }}
                className="h-[90%] w-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>
            <InfoBox title={user?.username} containerStyles="mt-5" titleStyles="text-lg" />
            <View className="mt-5 flex flex-row">
              <InfoBox
                title={posts.length || 0}
                subtitle="Posts"
                titleStyles="text-xl"
                containerStyles="mr-10"
              />
              <InfoBox title="1.2k" subtitle="Followers" titleStyles="text-xl" />
            </View>
          </View>
        )}
      />
    </Page>
  );
};

export default Profile;
