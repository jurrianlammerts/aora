import { ResizeMode, Video } from 'expo-av';
import { useState } from 'react';
import { FlatList, Image, ImageBackground, TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import { VideoPost } from 'types';

interface TrendingItemProps {
  activeItem: string;
  item: VideoPost;
}

const TrendingItem = ({ activeItem, item }: TrendingItemProps) => {
  const [play, setPlay] = useState(false);

  const animatedStyle = useAnimatedStyle(() => {
    const scale = withTiming(activeItem === item.id ? 1 : 0.9, {
      duration: 500,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });

    return { transform: [{ scale }] };
  });

  return (
    <Animated.View className="mr-5" style={animatedStyle}>
      {play ? (
        <Video
          source={{ uri: item.video }}
          className="mt-3 h-72 w-52 rounded-[33px] bg-white/10"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if ('isLoaded' in status && status.isLoaded && status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          className="relative flex items-center justify-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}>
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="my-5 h-72 w-52 overflow-hidden rounded-[33px] shadow-lg shadow-black/40"
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
  const [activeItem, setActiveItem] = useState(posts[0].id);

  const viewableItemsChanged = ({ viewableItems }: { viewableItems: any }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      data={posts}
      horizontal
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <TrendingItem activeItem={activeItem} item={item} />}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
      contentOffset={{ x: 170, y: 0 }}
    />
  );
};

export default Trending;
