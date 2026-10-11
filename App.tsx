import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootTabs from './src/navigation/RootTabs';
import { ProfileProvider } from './src/storage/ProfileContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <ProfileProvider>
        <NavigationContainer>
          <RootTabs />
        </NavigationContainer>
      </ProfileProvider>
      <StatusBar style="light" />
    </SafeAreaProvider>
  );
}
