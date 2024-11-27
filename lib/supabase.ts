import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { Buffer } from 'buffer';
import * as Crypto from 'expo-crypto';
import * as ImagePicker from 'expo-image-picker';
import { UserType, VideoPost } from 'types';

global.Buffer = global.Buffer || Buffer;

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Register user
export async function signUp(
  email: string,
  password: string,
  username: string
): Promise<UserType | null> {
  try {
    // Sign up the user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username } },
    });

    if (error) throw error;

    if (!data.user) throw new Error('User creation failed');

    // Create a user profile in the users table
    const { data: profileData, error: profileError } = await supabase
      .from('users')
      .insert({
        id: data.user.id,
        email,
        username,
        avatar: `https://ui-avatars.com/api/?name=${username}&background=random`,
      })
      .select()
      .returns<UserType[]>();

    if (profileError) throw profileError;

    return profileData[0];
  } catch (error) {
    throw new Error(`[createUser] ${error}`);
  }
}

// Sign In
export async function signIn(email: string, password: string): Promise<UserType | null> {
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    const user = await getCurrentUser();

    if (error) throw error;

    return user;
  } catch (error) {
    throw new Error(`[signIn] ${error}`);
  }
}

// Get Account
export async function getAccount() {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  } catch (error) {
    throw new Error(`[getAccount] ${error}`);
  }
}

// Get Current User
export async function getCurrentUser(): Promise<UserType | null> {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) throw new Error('No current user');

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .returns<UserType>()
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Sign Out
export async function signOut(): Promise<void> {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;
  } catch (error) {
    throw new Error(`[signOut] ${error}`);
  }
}

// Upload File
export async function uploadFile(
  file: ImagePicker.ImagePickerAsset,
  type: 'image' | 'video'
): Promise<string | undefined> {
  if (!file.uri) {
    console.log('[uploadFile] No URI found in file');
    return;
  }

  try {
    const extension = type === 'image' ? 'jpeg' : 'mp4';
    const mimeType = type === 'image' ? 'image/jpeg' : 'video/mp4';
    const filename = `${Date.now()}_${file.fileName || 'file'}.${extension}`;

    // Fetch the file data
    const response = await fetch(file.uri);
    const arrayBuffer = await response.arrayBuffer();

    const { error: uploadError } = await supabase.storage
      .from('videos')
      .upload(filename, arrayBuffer, {
        contentType: mimeType,
        cacheControl: '3600',
      });

    if (uploadError) {
      throw uploadError;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from('videos').getPublicUrl(filename);

    return publicUrl;
  } catch (error) {
    throw new Error(`[uploadFile] ${error}`);
  }
}

// Create Video Post
export async function createVideoPost(form: {
  title: string;
  thumbnailAsset: ImagePicker.ImagePickerAsset;
  videoAsset: ImagePicker.ImagePickerAsset;
  prompt: string;
  userId?: string;
}): Promise<VideoPost> {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnailAsset, 'image'),
      uploadFile(form.videoAsset, 'video'),
    ]);

    const UUID = Crypto.randomUUID();

    const { data, error } = await supabase
      .from('video_posts')
      .insert({
        id: UUID,
        title: form.title,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        prompt: form.prompt,
        creator: form.userId,
      })
      .select()
      .returns<VideoPost[]>();

    console.log({ error });

    if (error) throw error;

    return data[0];
  } catch (error) {
    throw new Error(`[createVideoPost] ${JSON.stringify(error)}`);
  }
}

// Get all video Posts
export async function getAllPosts(): Promise<VideoPost[]> {
  try {
    const { data, error } = await supabase
      .from('video_posts')
      .select('*, creator(*)')
      .returns<VideoPost[]>();

    if (error) throw error;

    return data;
  } catch (error) {
    throw new Error(`[getAllPosts] ${error}`);
  }
}

// Get video posts created by user
export async function getUserPosts(userId: string): Promise<VideoPost[]> {
  try {
    const { data, error } = await supabase
      .from('video_posts')
      .select('*, creator(*)')
      .eq('creator', userId)
      .returns<VideoPost[]>();

    if (error) throw error;

    return data;
  } catch (error) {
    throw new Error(`[getUserPosts] ${error}`);
  }
}

// Search video posts
export async function searchPosts(query: string): Promise<VideoPost[]> {
  try {
    const { data, error } = await supabase
      .from('video_posts')
      .select('*, creator(*)')
      .ilike('title', `%${query}%`)
      .returns<VideoPost[]>();

    if (error) throw error;

    return data;
  } catch (error) {
    throw new Error(`[searchPosts] ${error}`);
  }
}

// Get latest created video posts
export async function getLatestPosts(): Promise<VideoPost[]> {
  try {
    const { data, error } = await supabase
      .from('video_posts')
      .select('*, creator(*)')
      .order('created_at', { ascending: false })
      .limit(7)
      .returns<VideoPost[]>();

    if (error) throw error;

    return data;
  } catch (error) {
    throw new Error(`[getLatestPosts] ${error}`);
  }
}

// Get bookmark posts
export async function getBookmarkPosts(userId: string): Promise<VideoPost[]> {
  try {
    const { data, error } = await supabase
      .from('user_bookmarks')
      .select('post(*)')
      .eq('user', userId)
      .returns<{ post: VideoPost }[]>();

    if (error) throw error;

    // Extract posts from the returned data
    return data.map((bookmark) => bookmark.post);
  } catch (error) {
    throw new Error(`[getBookmarkPosts] ${error}`);
  }
}

// Bookmark a post
export async function bookmarkPost(postId: string, userId: string) {
  try {
    const { data, error } = await supabase
      .from('user_bookmarks')
      .insert({ post: postId, user: userId })
      .select();

    if (error) throw error;

    return data[0];
  } catch (error) {
    throw new Error(`[bookmarkPost] ${error}`);
  }
}
