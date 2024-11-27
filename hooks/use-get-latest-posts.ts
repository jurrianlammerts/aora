import { useQuery } from '@tanstack/react-query';

import { getLatestPosts } from '@/lib/supabase';

export const useGetLatestPosts = () => {
  return useQuery({
    queryKey: ['latest-posts'],
    queryFn: getLatestPosts,
  });
};
