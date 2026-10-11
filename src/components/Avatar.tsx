import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/theme';

type Props = { uri: string | null; initials: string; size?: number };

export default function Avatar({ uri, initials, size = 112 }: Props) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [uri]);

  if (uri && !failed) {
    return (
      <Image
        source={{ uri }}
        onError={() => setFailed(true)}
        style={{ width: size, height: size, borderRadius: size / 2 }}
        accessibilityLabel="Profile picture"
      />
    );
  }
  return (
    <View
      style={[styles.avatar, { width: size, height: size, borderRadius: size / 2 }]}
      accessibilityLabel={`Avatar with initials ${initials}`}
    >
      <Text style={[styles.initials, { fontSize: size / 3 }]}>{initials}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: { backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  initials: { color: '#FFFFFF', fontWeight: '800' },
});
