import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Screen from '../components/Screen';
import Card from '../components/Card';
import { ChipRow } from '../components/Chip';
import EmptyState from '../components/EmptyState';
import { PROJECTS } from '../data/portfolio';
import { colors } from '../theme/theme';
import { ProjectsStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<ProjectsStackParamList, 'ProjectList'>;

export default function ProjectsScreen({ navigation }: Props) {
  if (PROJECTS.length === 0) {
    return <EmptyState title="No projects yet" message="Projects will appear here once they are added." />;
  }
  return (
    <Screen>
      {PROJECTS.map((p) => (
        <Pressable
          key={p.id}
          accessibilityRole="button"
          accessibilityLabel={`Open details of ${p.title}`}
          onPress={() => navigation.navigate('ProjectDetails', { projectId: p.id })}
        >
          <Card title={p.title}>
            <Text style={styles.text} numberOfLines={3}>
              {p.problem}
            </Text>
            <ChipRow items={p.technology} />
            <Text style={styles.link}>View details</Text>
          </Card>
        </Pressable>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  text: { fontSize: 15, color: colors.text, lineHeight: 22 },
  link: { fontSize: 15, fontWeight: '700', color: colors.primary },
});
