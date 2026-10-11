import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Screen from '../components/Screen';
import Card from '../components/Card';
import { ChipRow } from '../components/Chip';
import EmptyState from '../components/EmptyState';
import { PROJECTS } from '../data/portfolio';
import { colors } from '../theme/theme';
import { ProjectsStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<ProjectsStackParamList, 'ProjectDetails'>;

export default function ProjectDetailsScreen({ route }: Props) {
  const project = PROJECTS.find((p) => p.id === route.params.projectId);

  if (!project) {
    return <EmptyState title="Project not found" message="Go back and choose a project from the list." />;
  }

  return (
    <Screen>
      <Text style={styles.title} accessibilityRole="header">
        {project.title}
      </Text>
      <Card title="Problem">
        <Text style={styles.text}>{project.problem}</Text>
      </Card>
      <Card title="My contribution">
        <Text style={styles.text}>{project.contribution}</Text>
      </Card>
      <Card title="Technology used">
        <ChipRow items={project.technology} />
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: '800', color: colors.primaryDark },
  text: { fontSize: 16, lineHeight: 24, color: colors.text },
});
