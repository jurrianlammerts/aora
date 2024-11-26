import { FlatList, RefreshControl, Text } from "react-native";
import { useState } from "react";

import useSupabase from "@/lib/useSupabase";
import { getBookmarkPosts } from "@/lib/supabase";
import Page from "@/components/Page";

const Bookmark = () => {
  const { data: posts, refetch } = useSupabase(getBookmarkPosts);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <Page>
      <FlatList
        className="px-4 my-6"
        ListHeaderComponent={() => (
          <Text className="text-2xl text-white font-psemibold">Bookmarks</Text>
        )}
        ListEmptyComponent={() => (
          <Text className="text-lg text-gray-100 font-pregular">
            No bookmarks found
          </Text>
        )}
        data={posts}
        renderItem={({ item }) => <Text>{item.title}</Text>}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </Page>
  );
};

export default Bookmark;
