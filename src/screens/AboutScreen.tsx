import React from 'react';
import { Alert, Linking, StyleSheet, Text, View } from 'react-native';
import Screen from '../components/Screen';
import Card from '../components/Card';
import AppButton from '../components/AppButton';
import { STUDENT } from '../data/portfolio';
import { colors, spacing } from '../theme/theme';

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

export default function AboutScreen() {
  async function openGithub() {
    try {
      await Linking.openURL(`https://github.com/${STUDENT.github}`);
    } catch {
      Alert.alert('No connection', 'The link could not be opened. Check your internet connection.');
    }
  }

  return (
    <Screen>
      <Card title="Application">
        <Row label="App name" value={STUDENT.appName} />
        <Row label="Version" value={STUDENT.version} />
        <Row label="Institution" value={STUDENT.institution} />
      </Card>
      <Card title="Student">
        <Row label="Student name" value={STUDENT.fullName} />
        <Row label="Registration number" value={STUDENT.registrationNumber} />
        <Row label="Verification code" value={STUDENT.verificationCode} />
      </Card>
      <Card title="Data use">
        <Text style={styles.text}>
          This app stores only your editable profile (headline, biography, primary skill, availability) and
          the location of your chosen profile picture, using local storage on this phone. No passwords,
          tokens or sensitive records are stored, and nothing is sent to any server.
        </Text>
      </Card>
      <Card title="Optional link (needs internet)">
        <Text style={styles.text}>All portfolio features work offline. Only the link below needs a connection.</Text>
        <AppButton label="Open GitHub profile (needs internet)" variant="secondary" onPress={openGithub} />
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: { gap: 2, paddingVertical: spacing.xs },
  label: { fontSize: 13, color: colors.textMuted, fontWeight: '600' },
  value: { fontSize: 17, color: colors.text, fontWeight: '700' },
  text: { fontSize: 15, lineHeight: 22, color: colors.text },
});
