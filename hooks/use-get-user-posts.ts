import { useQuery } from '@tanstack/react-query';

import { getUserPosts } from '@/lib/supabase';

export const useGetUserPosts = (userId?: string) => {
  return useQuery({
    queryKey: ['user-posts', userId],
    queryFn: () => getUserPosts(userId ?? ''),
    enabled: !!userId,
  });
};
