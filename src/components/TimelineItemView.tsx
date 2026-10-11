import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../theme/theme';
import { TimelineItem } from '../data/portfolio';

export default function TimelineItemView({ item, last }: { item: TimelineItem; last: boolean }) {
  return (
    <View style={styles.row}>
      <View style={styles.rail}>
        <View style={styles.dot} />
        {!last && <View style={styles.line} />}
      </View>
      <View style={styles.body}>
        <Text style={styles.period}>{item.period}</Text>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.place}>{item.place}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: spacing.md },
  rail: { alignItems: 'center', width: 16 },
  dot: { width: 14, height: 14, borderRadius: 7, backgroundColor: colors.primary, marginTop: 4 },
  line: { flex: 1, width: 2, backgroundColor: colors.border, marginTop: 4 },
  body: { flex: 1, paddingBottom: spacing.lg, gap: 2 },
  period: { fontSize: 13, color: colors.primary, fontWeight: '700' },
  title: { fontSize: 16, color: colors.text, fontWeight: '700' },
  place: { fontSize: 14, color: colors.textMuted },
});
