import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import { Upload } from 'lucide-react-native';
import React, { useState } from 'react';
import { View, Text, Alert, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import Page from '@/components/Page';
import { SECONDARY_COLOR_100 } from '@/constants';
import { createVideoPost } from '@/lib/supabase';
import useAuthStore from '@/store/auth';

const Create = () => {
  const { session } = useAuthStore();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState<{
    title: string;
    thumbnailAsset: ImagePicker.ImagePickerAsset | null;
    videoAsset: ImagePicker.ImagePickerAsset | null;
    prompt: string;
  }>({
    title: '',
    thumbnailAsset: null,
    videoAsset: null,
    prompt: '',
  });
  const player = useVideoPlayer(form.videoAsset?.uri ?? '', (player) => {
    player.loop = true;
    player.play();
  });

  const openPicker = async (selectType: 'image' | 'video') => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      base64: true,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      if (selectType === 'image') {
        setForm({
          ...form,
          thumbnailAsset: result.assets[0],
        });
      }

      if (selectType === 'video') {
        setForm({
          ...form,
          videoAsset: result.assets[0],
        });
      }
    }
  };

  const submit = async () => {
    if (form.prompt === '' || form.title === '' || !form.thumbnailAsset || !form.videoAsset) {
      return Alert.alert('Please provide all fields');
    }

    setUploading(true);
    try {
      if (!session?.user.id || !form.thumbnailAsset || !form.videoAsset) return;

      await createVideoPost({
        title: form.title,
        thumbnailAsset: form.thumbnailAsset,
        videoAsset: form.videoAsset,
        prompt: form.prompt,
        userId: session.user.id,
      });

      Alert.alert('Success', 'Post uploaded successfully');
      router.replace('/(tabs)/home');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setForm({
        title: '',
        videoAsset: null,
        thumbnailAsset: null,
        prompt: '',
      });

      setUploading(false);
    }
  };

  return (
    <Page>
      <ScrollView className="px-4 pt-6" contentContainerStyle={{ paddingBottom: 48 }}>
        <Text className="font-psemibold text-2xl text-white">Upload Video</Text>
        <InputField
          title="Video Title"
          value={form.title}
          placeholder="Give your video a catchy title..."
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles="mt-10"
        />
        <View className="mt-7 space-y-2">
          <Text className="font-pmedium text-base text-gray-100">Upload Video</Text>
          <TouchableOpacity onPress={() => openPicker('video')}>
            {form.videoAsset ? (
              <VideoView player={player} nativeControls contentFit="cover" style={styles.video} />
            ) : (
              <View className="flex h-40 w-full items-center justify-center rounded-2xl border border-black-200 bg-black-100 px-4">
                <View className="flex h-14 w-14 items-center justify-center border border-dashed border-secondary-100">
                  <Upload size={24} color={SECONDARY_COLOR_100} />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View className="mt-7 space-y-2">
          <Text className="font-pmedium text-base text-gray-100">Thumbnail Image</Text>
          <TouchableOpacity onPress={() => openPicker('image')}>
            {form.thumbnailAsset ? (
              <Image
                source={{ uri: form.thumbnailAsset.uri }}
                resizeMode="cover"
                className="h-64 w-full rounded-2xl"
              />
            ) : (
              <View className="flex h-16 w-full flex-row items-center justify-center gap-2 space-x-2 rounded-2xl border-2 border-black-200 bg-black-100 px-4">
                <Upload size={16} color={SECONDARY_COLOR_100} />
                <Text className="font-pmedium text-sm text-gray-100">Choose a file</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <InputField
          title="AI Prompt"
          value={form.prompt}
          placeholder="The AI prompt of your video...."
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          otherStyles="mt-7"
        />
        <CustomButton
          title="Submit & Publish"
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={uploading}
        />
      </ScrollView>
    </Page>
  );
};

export default Create;

const styles = StyleSheet.create({
  video: {
    height: 256,
    width: '100%',
    borderRadius: 24,
    overflow: 'hidden',
  },
});
