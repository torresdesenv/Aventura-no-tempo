import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';
import { UploadVideoScreen } from '../screens/UploadVideoScreen';
import { RealtimeCameraScreen } from '../screens/RealtimeCameraScreen';
import { SettingsScreen } from '../screens/SettingsScreen';

const Stack = createStackNavigator();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#ffffff' },
          animationEnabled: true,
          gestureEnabled: true,
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'LipRead Translator',
          }}
        />

        <Stack.Screen
          name="UploadVideo"
          component={UploadVideoScreen}
          options={{
            title: 'Carregar Vídeo',
            gestureDirection: 'horizontal',
          }}
        />

        <Stack.Screen
          name="RealtimeCamera"
          component={RealtimeCameraScreen}
          options={{
            title: 'Câmera ao Vivo',
            gestureDirection: 'horizontal',
          }}
        />

        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: 'Configurações',
            presentation: 'modal',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
