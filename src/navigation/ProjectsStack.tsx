import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProjectsScreen from '../screens/ProjectsScreen';
import ProjectDetailsScreen from '../screens/ProjectDetailsScreen';
import { ProjectsStackParamList } from './types';
import { colors } from '../theme/theme';

const Stack = createNativeStackNavigator<ProjectsStackParamList>();

export default function ProjectsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: { fontWeight: '700' },
      }}
    >
      <Stack.Screen name="ProjectList" component={ProjectsScreen} options={{ title: 'Projects' }} />
      <Stack.Screen name="ProjectDetails" component={ProjectDetailsScreen} options={{ title: 'Project details' }} />
    </Stack.Navigator>
  );
}
