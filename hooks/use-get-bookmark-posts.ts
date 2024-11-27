import { useQuery } from '@tanstack/react-query';

import { getBookmarkPosts } from '@/lib/supabase';
import useAuthStore from '@/store/auth';

export const useGetBookmarkPosts = () => {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ['bookmark-posts'],
    queryFn: () => getBookmarkPosts(user?.id ?? ''),
    enabled: !!user,
  });
};
