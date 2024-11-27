import { useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';

import EmptyState from '@/components/EmptyState';
import Page from '@/components/Page';
import SearchInput from '@/components/SearchInput';
import VideoCard from '@/components/VideoCard';
import { searchPosts } from '@/lib/supabase';
import useAppwrite from '@/lib/useSupabase';

const Search = () => {
  const { query } = useLocalSearchParams<{ query: string }>();
  const { data: posts, refetch } = useAppwrite(() => searchPosts(query));

  useEffect(() => {
    refetch();
  }, [query]);

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
        ListHeaderComponent={() => (
          <View className="my-6 flex px-4">
            <Text className="font-pmedium text-sm text-gray-100">Search Results</Text>
            <Text className="mt-1 font-psemibold text-2xl text-white">{query}</Text>
            <View className="mb-8 mt-6">
              <SearchInput initialQuery={query} refetch={refetch} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState title="No Videos Found" subtitle="No videos found for this search query" />
        )}
      />
    </Page>
  );
};

export default Search;
