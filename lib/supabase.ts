import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import * as Crypto from "expo-crypto";
import { Buffer } from "buffer";

import { UserType } from "types";

global.Buffer = global.Buffer || Buffer;

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

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
      email: email,
      password: password,
      options: { data: { username: username } },
    });

    if (error) throw error;

    if (!data.user) throw new Error("User creation failed");

    // Create a user profile in the users table
    const { data: profileData, error: profileError } = await supabase
      .from("users")
      .insert({
        id: data.user.id,
        email: email,
        username: username,
        avatar: `https://ui-avatars.com/api/?name=${username}&background=random`,
      })
      .select();

    if (profileError) throw profileError;

    return profileData[0];
  } catch (error) {
    throw new Error(`[createUser] ${error}`);
  }
}

// Sign In
export async function signIn(
  email: string,
  password: string
): Promise<UserType | null> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
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
export async function getCurrentUser() {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) throw new Error("No current user");

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Sign Out
export async function signOut() {
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
  type: "image" | "video"
) {
  // console.log("[uploadFile] Starting upload with file:", file);
  console.log("[uploadFile] Upload type:", type);

  if (!file.uri) {
    console.log("[uploadFile] No URI found in file");
    return;
  }

  try {
    const extension = type === "image" ? "jpeg" : "mp4";
    const mimeType = type === "image" ? "image/jpeg" : "video/mp4";
    const filename = `${Date.now()}_${file.fileName || "file"}.${extension}`;
    console.log("[uploadFile] Generated filename:", filename);

    // Fetch the file data
    const response = await fetch(file.uri);
    const arrayBuffer = await response.arrayBuffer();

    console.log("[uploadFile] ArrayBuffer:", arrayBuffer);

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("videos")
      .upload(filename, arrayBuffer, {
        contentType: mimeType,
        cacheControl: "3600",
      });

    if (uploadError) {
      console.error("[uploadFile] Upload error:", uploadError);
      throw uploadError;
    }

    console.log("[uploadFile] Upload successful:", uploadData);

    // Get public URL
    console.log("[uploadFile] Getting public URL...");
    const {
      data: { publicUrl },
    } = supabase.storage.from("videos").getPublicUrl(filename);

    console.log("[uploadFile] Public URL generated:", publicUrl);
    return publicUrl;
  } catch (error) {
    console.error("[uploadFile] Error:", error);
    throw new Error(`[uploadFile] ${error}`);
  }
}

// Create Video Post
export async function createVideoPost(form: {
  title: string;
  thumbnailAsset: ImagePicker.ImagePickerAsset;
  videoAsset: ImagePicker.ImagePickerAsset;
  prompt: string;
  userId: string;
}) {
  console.log("[createVideoPost] Starting post creation...", {});
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnailAsset, "image"),
      uploadFile(form.videoAsset, "video"),
    ]);

    const UUID = Crypto.randomUUID();

    const { data, error } = await supabase
      .from("video_posts")
      .insert({
        id: UUID,
        title: form.title,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        prompt: form.prompt,
        creator: form.userId,
      })
      .select();

    console.log({ error });

    if (error) throw error;

    return data[0];
  } catch (error) {
    throw new Error(`[createVideoPost] ${JSON.stringify(error)}`);
  }
}

// Get all video Posts
export async function getAllPosts() {
  try {
    const { data, error } = await supabase.from("video_posts").select("*");

    if (error) throw error;

    return data;
  } catch (error) {
    throw new Error(`[getAllPosts] ${error}`);
  }
}

// Get video posts created by user
export async function getUserPosts(userId: string) {
  try {
    const { data, error } = await supabase
      .from("video_posts")
      .select("*")
      .eq("creator", userId);

    if (error) throw error;

    return data;
  } catch (error) {
    throw new Error(`[getUserPosts] ${error}`);
  }
}

// Search video posts
export async function searchPosts(query: string) {
  try {
    const { data, error } = await supabase
      .from("video_posts")
      .select("*")
      .ilike("title", `%${query}%`);

    if (error) throw error;

    return data;
  } catch (error) {
    throw new Error(`[searchPosts] ${error}`);
  }
}

// Get latest created video posts
export async function getLatestPosts() {
  try {
    const { data, error } = await supabase
      .from("video_posts")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(7);

    if (error) throw error;

    return data;
  } catch (error) {
    throw new Error(`[getLatestPosts] ${error}`);
  }
}

// Get bookmark posts
export async function getBookmarkPosts(userId: string) {
  try {
    const { data, error } = await supabase
      .from("user_bookmarks")
      .select("post(*)")
      .eq("user", userId);

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
      .from("user_bookmarks")
      .insert({
        post: postId,
        user: userId,
      })
      .select();

    if (error) throw error;

    return data[0];
  } catch (error) {
    throw new Error(`[bookmarkPost] ${error}`);
  }
}
