import { useEvent } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { GRAY_COLOR, SECONDARY_COLOR_100 } from '@/constants';
import { useBookmarkPost } from '@/hooks/use-bookmark-post';
import { useGetBookmarkPosts } from '@/hooks/use-get-bookmark-posts';

interface VideoCardProps {
  id: string;
  title: string;
  creator: string;
  avatar: string;
  thumbnail: string;
  video: string;
}

const VideoCard = ({ id, title, creator, avatar, thumbnail, video }: VideoCardProps) => {
  const player = useVideoPlayer(video);
  const { mutate: bookmarkPost } = useBookmarkPost(id);
  const { data: bookmarkPosts } = useGetBookmarkPosts();
  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

  const isBookmarked = bookmarkPosts?.some((bookmark) => bookmark.id === id);

  return (
    <View className="mb-14 flex flex-col items-center px-4">
      <View className="flex flex-row items-start gap-3">
        <View className="flex flex-1 flex-row items-center justify-center">
          <View className="flex h-[46px] w-[46px] items-center justify-center rounded-lg border border-secondary p-0.5">
            <Image
              source={{ uri: avatar }}
              className="h-full w-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View className="ml-3 flex flex-1 justify-center gap-y-1">
            <Text className="font-psemibold text-sm text-white" numberOfLines={1}>
              {title}
            </Text>
            <Text className="font-pregular text-xs text-gray-100" numberOfLines={1}>
              {creator}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          className="pt-2"
          onPress={() => bookmarkPost()}
          activeOpacity={0.7}
          hitSlop={12}>
          <Image
            source={require('@/assets/icons/bookmark.png')}
            className="h-5 w-5"
            resizeMode="contain"
            tintColor={isBookmarked ? SECONDARY_COLOR_100 : GRAY_COLOR}
          />
        </TouchableOpacity>
      </View>
      <View className="relative mt-3 h-60 w-full">
        {isPlaying ? (
          <Animated.View entering={FadeIn.duration(300)} exiting={FadeOut.duration(300)}>
            <VideoView player={player} contentFit="cover" style={styles.video} />
          </Animated.View>
        ) : (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => player.play()}
            className="h-full w-full">
            <Image
              source={{ uri: thumbnail }}
              className="h-full w-full rounded-xl bg-black-100"
              resizeMode="cover"
            />
            <Image
              source={require('@/assets/icons/play.png')}
              className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default VideoCard;

const styles = StyleSheet.create({
  video: {
    height: '100%',
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
  },
});
