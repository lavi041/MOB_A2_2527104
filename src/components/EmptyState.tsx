import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../theme/theme';

export default function EmptyState({ title, message }: { title: string; message: string }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', padding: spacing.xl, gap: spacing.sm },
  title: { fontSize: 18, fontWeight: '700', color: colors.primaryDark, textAlign: 'center' },
  message: { fontSize: 15, color: colors.textMuted, textAlign: 'center' },
});
