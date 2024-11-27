import { useQuery } from '@tanstack/react-query';

import { getAllPosts } from '@/lib/supabase';

export const useGetAllPosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: getAllPosts,
  });
};
