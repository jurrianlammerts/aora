import { useState } from 'react';
import { FlatList, RefreshControl, Text } from 'react-native';

import Page from '@/components/Page';
import useBookmarkPosts from '@/hooks/use-bookmark-posts';

const Bookmark = () => {
  const { data: posts, refetch } = useBookmarkPosts();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <Page>
      <FlatList
        className="my-6 px-4"
        ListHeaderComponent={() => (
          <Text className="font-psemibold text-2xl text-white">Bookmarks</Text>
        )}
        ListEmptyComponent={() => (
          <Text className="font-pregular text-lg text-gray-100">No bookmarks found</Text>
        )}
        data={posts}
        renderItem={({ item }) => <Text>{item.title}</Text>}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </Page>
  );
};

export default Bookmark;
