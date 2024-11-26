import { FlatList, RefreshControl, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useAppwrite from "../../lib/useSupabase";
import { getBookmarkPosts } from "../../lib/supabase";
import { useState } from "react";

const Bookmark = () => {
  const { data: posts, refetch } = useAppwrite(getBookmarkPosts);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView
      className="bg-primary h-full"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
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
      />
    </SafeAreaView>
  );
};

export default Bookmark;
