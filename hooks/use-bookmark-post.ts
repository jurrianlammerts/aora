import { useMutation } from '@tanstack/react-query';

import { queryClient } from '@/lib/react-query';
import { bookmarkPost } from '@/lib/supabase';
import useAuthStore from '@/store/auth';

export const useBookmarkPost = (postId: string) => {
  const { user } = useAuthStore();

  return useMutation({
    mutationFn: () => bookmarkPost(postId, user?.id ?? ''),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmark-posts'] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};
