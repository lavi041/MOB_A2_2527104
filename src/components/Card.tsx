import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { colors, radius, spacing } from '../theme/theme';

type Props = { title?: string; children: React.ReactNode; style?: ViewStyle };

export default function Card({ title, children, style }: Props) {
  return (
    <View style={[styles.card, style]}>
      {title ? (
        <Text style={styles.title} accessibilityRole="header">
          {title}
        </Text>
      ) : null}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  title: { fontSize: 18, fontWeight: '700', color: colors.primaryDark },
});
