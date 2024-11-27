import * as ImagePicker from 'expo-image-picker';
export type UserType = {
  id: string;
  username: string;
  email: string;
  avatar: string;
};

export type VideoPost = {
  id: string;
  title: string;
  video: string;
  thumbnail: string;
  creator: UserType;
};

export type VideoPostForm = {
  title: string;
  thumbnailAsset: ImagePicker.ImagePickerAsset | null;
  videoAsset: ImagePicker.ImagePickerAsset | null;
  prompt: string;
  userId?: string;
};

export type BookmarkPost = {
  id: string;
  post_id: string;
  user_id: string;
};
