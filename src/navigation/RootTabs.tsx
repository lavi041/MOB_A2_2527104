import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import SkillsScreen from '../screens/SkillsScreen';
import ProfileEditorScreen from '../screens/ProfileEditorScreen';
import AboutScreen from '../screens/AboutScreen';
import ProjectsStack from './ProjectsStack';
import { RootTabParamList } from './types';
import { colors } from '../theme/theme';

const Tab = createBottomTabNavigator<RootTabParamList>();

type IconName = React.ComponentProps<typeof Ionicons>['name'];
const ICONS: Record<keyof RootTabParamList, IconName> = {
  Home: 'home',
  Skills: 'ribbon',
  Projects: 'briefcase',
  Edit: 'create',
  About: 'information-circle',
};

export default function RootTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: { fontWeight: '700' },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: '#6B5B67',
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
        tabBarIcon: ({ color, size }) => <Ionicons name={ICONS[route.name]} size={size} color={color} />,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'LaviPortfolio' }} />
      <Tab.Screen name="Skills" component={SkillsScreen} options={{ title: 'Skills and education' }} />
      <Tab.Screen name="Projects" component={ProjectsStack} options={{ headerShown: false }} />
      <Tab.Screen name="Edit" component={ProfileEditorScreen} options={{ title: 'Edit profile' }} />
      <Tab.Screen name="About" component={AboutScreen} options={{ title: 'About' }} />
    </Tab.Navigator>
  );
}
