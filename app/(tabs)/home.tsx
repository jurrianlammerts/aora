import { useState } from 'react';
import { FlatList, RefreshControl, Text, View } from 'react-native';

import EmptyState from '@/components/EmptyState';
import Page from '@/components/Page';
import SearchInput from '@/components/SearchInput';
import Trending from '@/components/Trending';
import VideoCard from '@/components/VideoCard';
import { getAllPosts, getLatestPosts } from '@/lib/supabase';
import useSupabase from '@/lib/useSupabase';
import useAuthStore from '@/store/auth';

const Home = () => {
  const { user } = useAuthStore();
  const { data: posts, refetch } = useSupabase(getAllPosts);
  const { data: latestPosts } = useSupabase(getLatestPosts);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <Page>
      <FlatList
        data={posts ?? []}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}
          />
        )}
        ListHeaderComponent={() => (
          <View className="my-6 flex space-y-6 px-4">
            <View className="mb-6 flex flex-row items-start justify-between">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">Welcome Back</Text>
                <Text className="font-psemibold text-2xl text-white">{user?.username ?? ' '}</Text>
              </View>
            </View>
            <SearchInput />
            <View className="w-full flex-1 pb-8 pt-5">
              <Text className="mb-3 font-pregular text-lg text-gray-100">Latest Videos</Text>
              <Trending posts={latestPosts ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState title="No Videos Found" subtitle="No videos created yet" />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </Page>
  );
};

export default Home;
