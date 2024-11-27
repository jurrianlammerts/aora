import { useEvent } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useCallback, useState } from 'react';
import { StyleSheet, FlatList, Image, ImageBackground, TouchableOpacity } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
  Easing,
  FadeOut,
  FadeIn,
} from 'react-native-reanimated';
import { VideoPost } from 'types';

interface TrendingItemProps {
  activeItem: string | null;
  item: VideoPost;
}

const TrendingItem = ({ activeItem, item }: TrendingItemProps) => {
  const player = useVideoPlayer(item.video, (player) => {
    if (activeItem === item.id) {
      player.play();
    } else {
      player.pause();
    }
  });

  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

  const animatedStyle = useAnimatedStyle(() => {
    const scale = withTiming(activeItem === item.id ? 1 : 0.9, {
      duration: 500,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });

    return { transform: [{ scale }] };
  });

  return (
    <Animated.View className="mr-5" style={animatedStyle}>
      {isPlaying ? (
        <Animated.View entering={FadeIn.duration(300)} exiting={FadeOut.duration(300)}>
          <VideoView
            player={player}
            style={styles.video}
            contentFit="cover"
            nativeControls={false}
          />
        </Animated.View>
      ) : (
        <TouchableOpacity
          className="relative flex items-center justify-center"
          activeOpacity={0.7}
          onPress={() => player.play()}>
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="my-5 overflow-hidden rounded-[33px] bg-black-100 shadow-lg shadow-black/40"
            style={styles.image}
            resizeMode="cover"
          />
          <Image
            source={require('@/assets/icons/play.png')}
            className="absolute h-12 w-12"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

const Trending = ({ posts }: { posts: VideoPost[] }) => {
  const [activeItem, setActiveItem] = useState<string | null>(posts[0]?.id);

  const viewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: { item: VideoPost }[] }) => {
      if (viewableItems.length > 0) {
        setActiveItem(viewableItems[0].item.id);
      }
    },
    []
  );

  return (
    <FlatList
      data={posts}
      horizontal
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <TrendingItem activeItem={activeItem} item={item} />}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
      contentOffset={{ x: 170, y: 0 }}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default Trending;

const styles = StyleSheet.create({
  video: {
    marginTop: 17,
    height: 250,
    width: 180,
    flex: 1,
    borderRadius: 33,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 18,
    overflow: 'hidden',
  },
  image: {
    height: 250,
    width: 180,
  },
});
