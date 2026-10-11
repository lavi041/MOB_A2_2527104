import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { colors, radius, spacing } from '../theme/theme';

type Props = TextInputProps & {
  label: string;
  error?: string;
  hint?: string;
};

export default function FormField({ label, error, hint, multiline, ...rest }: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        {...rest}
        multiline={multiline}
        accessibilityLabel={label}
        placeholderTextColor="#8A7A86"
        style={[
          styles.input,
          multiline && styles.multiline,
          !!error && styles.inputError,
        ]}
      />
      {error ? (
        <Text style={styles.error} accessibilityLiveRegion="polite">
          {error}
        </Text>
      ) : hint ? (
        <Text style={styles.hint}>{hint}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: spacing.xs },
  label: { fontSize: 15, fontWeight: '700', color: colors.text },
  input: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: 16,
    color: colors.text,
  },
  multiline: { minHeight: 110, textAlignVertical: 'top' },
  inputError: { borderColor: colors.danger, borderWidth: 2 },
  error: { color: colors.danger, fontSize: 14 },
  hint: { color: colors.textMuted, fontSize: 13 },
});
