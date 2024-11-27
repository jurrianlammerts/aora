import { ResizeMode, Video } from 'expo-av';
import { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

interface VideoCardProps {
  title: string;
  creator: string;
  avatar: string;
  thumbnail: string;
  video: string;
}

const VideoCard = ({ title, creator, avatar, thumbnail, video }: VideoCardProps) => {
  const [play, setPlay] = useState(false);

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
        <View className="pt-2">
          <Image
            source={require('@/assets/icons/menu.png')}
            className="h-5 w-5"
            resizeMode="contain"
          />
        </View>
      </View>
      {play ? (
        <Video
          source={{ uri: video }}
          className="mt-3 h-60 w-full rounded-xl"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if ('didJustFinish' in status && status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="relative mt-3 flex h-60 w-full items-center justify-center rounded-xl">
          <Image
            source={{ uri: thumbnail }}
            className="mt-3 h-full w-full rounded-xl"
            resizeMode="cover"
          />
          <Image
            source={require('@/assets/icons/play.png')}
            className="absolute h-12 w-12"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
