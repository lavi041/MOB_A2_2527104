import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '../theme/theme';

export default function Chip({ label }: { label: string }) {
  return (
    <View style={styles.chip}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

export function ChipRow({ items }: { items: string[] }) {
  return (
    <View style={styles.row}>
      {items.map((item) => (
        <Chip key={item} label={item} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  chip: {
    backgroundColor: colors.primarySoft,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
  },
  text: { color: colors.primaryDark, fontSize: 14, fontWeight: '600' },
});
