import React from 'react';
import { ScrollView, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing } from '../theme/theme';

type Props = { children: React.ReactNode; contentStyle?: ViewStyle };

export default function Screen({ children, contentStyle }: Props) {
  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={[styles.content, contentStyle]}
      keyboardShouldPersistTaps="handled"
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: spacing.xl * 2, gap: spacing.lg },
});
