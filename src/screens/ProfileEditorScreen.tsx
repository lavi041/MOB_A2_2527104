import React, { useEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Linking,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Screen from '../components/Screen';
import Card from '../components/Card';
import Avatar from '../components/Avatar';
import AppButton from '../components/AppButton';
import FormField from '../components/FormField';
import { useProfile } from '../storage/ProfileContext';
import { FormErrors, ProfileForm, validateProfile } from '../utils/validation';
import { colors, spacing } from '../theme/theme';

type Notice = { kind: 'success' | 'error' | 'info'; text: string } | null;

export default function ProfileEditorScreen() {
  const { profile, update, reset } = useProfile();
  const [form, setForm] = useState<ProfileForm>({
    headline: profile.headline,
    bio: profile.bio,
    primarySkill: profile.primarySkill,
    availability: profile.availability,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [notice, setNotice] = useState<Notice>(null);
  const [mediaNotice, setMediaNotice] = useState<Notice>(null);

  // Keep the form in sync when the saved profile loads or is reset.
  useEffect(() => {
    setForm({
      headline: profile.headline,
      bio: profile.bio,
      primarySkill: profile.primarySkill,
      availability: profile.availability,
    });
    setErrors({});
    setSubmitted(false);
  }, [profile.headline, profile.bio, profile.primarySkill, profile.availability]);

  function change(field: keyof ProfileForm, value: string) {
    const next = { ...form, [field]: value };
    setForm(next);
    setNotice(null);
    if (submitted) setErrors(validateProfile(next));
  }

  async function onSave() {
    setSubmitted(true);
    const found = validateProfile(form);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setNotice({ kind: 'error', text: 'Please fix the highlighted fields. Nothing was saved.' });
      return;
    }
    try {
      await update({
        headline: form.headline.trim(),
        bio: form.bio.trim(),
        primarySkill: form.primarySkill.trim(),
        availability: form.availability.trim(),
      });
      setNotice({ kind: 'success', text: 'Profile saved on this phone.' });
    } catch {
      setNotice({ kind: 'error', text: 'Could not save. Please try again.' });
    }
  }

  function onReset() {
    Alert.alert('Reset profile', 'This restores the default profile and removes the saved picture.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Reset',
        style: 'destructive',
        onPress: async () => {
          await reset();
          setMediaNotice(null);
          setNotice({ kind: 'info', text: 'Profile reset to defaults.' });
        },
      },
    ]);
  }

  async function saveImage(uri: string) {
    try {
      await update({ imageUri: uri });
      setMediaNotice({ kind: 'success', text: 'Profile picture saved.' });
    } catch {
      setMediaNotice({ kind: 'error', text: 'Could not save the picture. Please try again.' });
    }
  }

  async function takePhoto() {
    try {
      const perm = await ImagePicker.requestCameraPermissionsAsync();
      if (!perm.granted) {
        setMediaNotice({
          kind: 'error',
          text: perm.canAskAgain
            ? 'Camera permission was denied. You can still choose a picture from the gallery.'
            : 'Camera permission is blocked. Enable it in phone Settings, or choose from the gallery.',
        });
        if (!perm.canAskAgain) {
          Alert.alert('Camera blocked', 'Open Settings to allow camera access?', [
            { text: 'Not now', style: 'cancel' },
            { text: 'Open Settings', onPress: () => Linking.openSettings() },
          ]);
        }
        return;
      }
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });
      if (result.canceled) {
        setMediaNotice({ kind: 'info', text: 'Capture cancelled. Your current picture is unchanged.' });
        return;
      }
      await saveImage(result.assets[0].uri);
    } catch {
      setMediaNotice({ kind: 'error', text: 'The camera could not be opened on this device.' });
    }
  }

  async function pickFromGallery() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });
      if (result.canceled) {
        setMediaNotice({ kind: 'info', text: 'Selection cancelled. Your current picture is unchanged.' });
        return;
      }
      await saveImage(result.assets[0].uri);
    } catch {
      setMediaNotice({ kind: 'error', text: 'The gallery could not be opened. Check permissions in Settings.' });
    }
  }

  async function removeImage() {
    try {
      await update({ imageUri: null });
      setMediaNotice({ kind: 'info', text: 'Profile picture removed. The avatar is shown instead.' });
    } catch {
      setMediaNotice({ kind: 'error', text: 'Could not remove the picture. Please try again.' });
    }
  }

  const hasImage = !!profile.imageUri;

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Screen>
        <Card title="Profile picture">
          <View style={styles.preview}>
            <Avatar uri={profile.imageUri} initials="AN" size={140} />
          </View>
          <Text style={styles.hint}>
            {hasImage ? 'Preview of your saved picture.' : 'No picture yet. An avatar with your initials is used.'}
          </Text>
          <AppButton label="Take a photo" onPress={takePhoto} />
          <AppButton label={hasImage ? 'Replace from gallery' : 'Choose from gallery'} variant="secondary" onPress={pickFromGallery} />
          {hasImage && <AppButton label="Remove picture" variant="danger" onPress={removeImage} />}
          {mediaNotice && <NoticeBox notice={mediaNotice} />}
        </Card>

        <Card title="Edit profile">
          <FormField
            label="Headline"
            value={form.headline}
            onChangeText={(t) => change('headline', t)}
            error={errors.headline}
            hint="5 to 60 characters."
            maxLength={80}
          />
          <FormField
            label="Short biography"
            value={form.bio}
            onChangeText={(t) => change('bio', t)}
            error={errors.bio}
            hint={`${form.bio.trim().length}/300 (minimum 30 characters)`}
            multiline
          />
          <FormField
            label="Primary skill"
            value={form.primarySkill}
            onChangeText={(t) => change('primarySkill', t)}
            error={errors.primarySkill}
            hint="Example: JavaScript"
          />
          <FormField
            label="Availability status"
            value={form.availability}
            onChangeText={(t) => change('availability', t)}
            error={errors.availability}
            hint="Example: Available for internship"
          />
          <AppButton label="Save profile" onPress={onSave} />
          {notice && <NoticeBox notice={notice} />}
          <AppButton label="Reset to defaults" variant="secondary" onPress={onReset} />
        </Card>
      </Screen>
    </KeyboardAvoidingView>
  );
}

function NoticeBox({ notice }: { notice: NonNullable<Notice> }) {
  const bg =
    notice.kind === 'success' ? colors.successSoft : notice.kind === 'error' ? colors.dangerSoft : colors.primarySoft;
  const fg =
    notice.kind === 'success' ? colors.success : notice.kind === 'error' ? colors.danger : colors.primaryDark;
  return (
    <View style={[styles.notice, { backgroundColor: bg }]} accessibilityLiveRegion="polite">
      <Text style={{ color: fg, fontSize: 14, fontWeight: '600' }}>{notice.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  preview: { alignItems: 'center', paddingVertical: spacing.sm },
  hint: { fontSize: 13, color: colors.textMuted, textAlign: 'center' },
  notice: { borderRadius: 10, padding: spacing.md },
});
