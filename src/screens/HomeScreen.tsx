import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Screen from '../components/Screen';
import Card from '../components/Card';
import Avatar from '../components/Avatar';
import { ChipRow } from '../components/Chip';
import { useProfile } from '../storage/ProfileContext';
import { STUDENT } from '../data/portfolio';
import { colors, spacing } from '../theme/theme';

export default function HomeScreen() {
  const { profile, loading } = useProfile();

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loading}>Loading your portfolio...</Text>
      </View>
    );
  }

  return (
    <Screen>
      <View style={styles.hero}>
        <Text style={styles.intro} accessibilityRole="header">
          My name is {STUDENT.fullName}.
        </Text>
        <Avatar uri={profile.imageUri} initials="AN" />
        <Text style={styles.headline}>{profile.headline}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{profile.availability}</Text>
        </View>
      </View>

      <Card title="About me">
        <Text style={styles.body}>{profile.bio}</Text>
      </Card>

      <Card title="Primary skill">
        <ChipRow items={[profile.primarySkill]} />
      </Card>

      <Card title="Verification code">
        <Text style={styles.code} selectable>
          {STUDENT.verificationCode}
        </Text>
        <Text style={styles.muted}>
          {STUDENT.appName} · Reg. no. {STUDENT.registrationNumber}
        </Text>
      </Card>

      <Text style={styles.offline}>Works fully offline. No internet is needed for this portfolio.</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.md, backgroundColor: colors.background },
  loading: { color: colors.textMuted, fontSize: 16 },
  hero: { alignItems: 'center', gap: spacing.md },
  intro: { fontSize: 26, fontWeight: '800', color: colors.primaryDark, textAlign: 'center' },
  headline: { fontSize: 18, fontWeight: '600', color: colors.text, textAlign: 'center' },
  badge: { backgroundColor: colors.successSoft, borderRadius: 999, paddingHorizontal: spacing.lg, paddingVertical: spacing.xs + 2 },
  badgeText: { color: colors.success, fontWeight: '700', fontSize: 14 },
  body: { fontSize: 16, lineHeight: 24, color: colors.text },
  code: { fontSize: 24, fontWeight: '800', letterSpacing: 1, color: colors.primary },
  muted: { fontSize: 14, color: colors.textMuted },
  offline: { fontSize: 13, color: colors.textMuted, textAlign: 'center' },
});
