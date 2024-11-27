import { useState } from 'react';
import { FlatList, RefreshControl, Text, View } from 'react-native';

import EmptyState from '@/components/EmptyState';
import Page from '@/components/Page';
import VideoCard from '@/components/VideoCard';
import { useGetBookmarkPosts } from '@/hooks/use-get-bookmark-posts';

const Bookmark = () => {
  const { data: posts, refetch } = useGetBookmarkPosts();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <Page>
      <FlatList
        className="my-6"
        ListHeaderComponent={() => (
          <Text className=" mb-4 px-4 font-psemibold text-2xl text-white">Bookmarks</Text>
        )}
        ListEmptyComponent={() => (
          <View className="h-screen flex-1 justify-center px-4 pb-60">
            <EmptyState
              title="No Bookmarks Found"
              subtitle="No videos bookmarked yet"
              href="/home"
            />
          </View>
        )}
        data={posts}
        renderItem={({ item }) => (
          <VideoCard
            id={item.id}
            title={item.title}
            creator={item.creator.username}
            avatar={item.creator.avatar}
            thumbnail={item.thumbnail}
            video={item.video}
          />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </Page>
  );
};

export default Bookmark;
