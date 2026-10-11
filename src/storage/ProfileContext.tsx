import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  Profile,
  defaultProfile,
  loadProfile,
  resetProfile,
  saveProfile,
} from './profileStorage';

type ProfileContextValue = {
  profile: Profile;
  loading: boolean;
  update: (changes: Partial<Profile>) => Promise<void>;
  reset: () => Promise<void>;
};

const ProfileContext = createContext<ProfileContextValue | undefined>(undefined);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    loadProfile().then((p) => {
      if (active) {
        setProfile(p);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const update = useCallback(
    async (changes: Partial<Profile>) => {
      const next = { ...profile, ...changes };
      await saveProfile(next);
      setProfile(next);
    },
    [profile]
  );

  const reset = useCallback(async () => {
    const fresh = await resetProfile();
    setProfile(fresh);
  }, []);

  const value = useMemo(() => ({ profile, loading, update, reset }), [profile, loading, update, reset]);
  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

export function useProfile(): ProfileContextValue {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error('useProfile must be used inside ProfileProvider');
  return ctx;
}
