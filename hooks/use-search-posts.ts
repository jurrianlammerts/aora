import { useQuery } from '@tanstack/react-query';

import { searchPosts } from '@/lib/supabase';

export const useSearchPosts = (query: string) => {
  return useQuery({
    queryKey: ['search-posts', query],
    queryFn: () => searchPosts(query),
    enabled: !!query,
  });
};
