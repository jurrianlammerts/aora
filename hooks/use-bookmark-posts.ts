import { useQuery } from '@tanstack/react-query';

import { getBookmarkPosts } from '@/lib/supabase';
import useAuthStore from '@/store/auth';

export default function useBookmarkPosts() {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ['bookmark-posts'],
    queryFn: () => getBookmarkPosts(user?.id ?? ''),
    enabled: !!user,
  });
}
