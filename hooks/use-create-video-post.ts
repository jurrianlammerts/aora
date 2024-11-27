import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';
import { Alert } from 'react-native';
import { VideoPost, VideoPostForm } from 'types';

import { queryClient } from '@/lib/react-query';
import { createVideoPost } from '@/lib/supabase';
import useAuthStore from '@/store/auth';

export default function useCreateVideoPost(form: VideoPostForm) {
  const { session } = useAuthStore();

  return useMutation<VideoPost, Error, VideoPostForm>({
    mutationFn: () =>
      createVideoPost({
        ...form,
        userId: session?.user.id,
      }),
    onSuccess: () => {
      Alert.alert('Success', 'Post uploaded successfully');
      router.navigate('/(tabs)/home');
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
    onError: (error) => {
      Alert.alert('Create Post Failed', error.message);
    },
  });
}
