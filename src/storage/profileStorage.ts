import AsyncStorage from '@react-native-async-storage/async-storage';
import { DEFAULT_PROFILE } from '../data/portfolio';

const KEY = 'laviportfolio:profile:v1';

export type Profile = {
  headline: string;
  bio: string;
  primarySkill: string;
  availability: string;
  imageUri: string | null;
};

export const defaultProfile: Profile = { ...DEFAULT_PROFILE, imageUri: null };

export async function loadProfile(): Promise<Profile> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    if (!raw) return defaultProfile;
    const parsed = JSON.parse(raw) as Partial<Profile>;
    return { ...defaultProfile, ...parsed };
  } catch {
    return defaultProfile;
  }
}

export async function saveProfile(profile: Profile): Promise<void> {
  await AsyncStorage.setItem(KEY, JSON.stringify(profile));
}

export async function resetProfile(): Promise<Profile> {
  await AsyncStorage.removeItem(KEY);
  return defaultProfile;
}
