import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen';
import { initializeFirebase } from '../services/firebase/config';
import { useAuthStore } from '../store/authStore';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { initializeAuth, isLoading } = useAuthStore();

  useEffect(() => {
    async function prepare() {
      try {
        // Initialize Firebase
        await initializeFirebase();
        
        // Initialize auth state
        await initializeAuth();
        
        // Hide splash screen
        await SplashScreen.hideAsync();
      } catch (error) {
        console.error('Error during app initialization:', error);
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#000000' },
          animation: 'fade',
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen 
          name="fake-call" 
          options={{ 
            presentation: 'fullScreenModal',
            animation: 'none',
          }} 
        />
        <Stack.Screen 
          name="sos" 
          options={{ 
            presentation: 'modal',
          }} 
        />
        <Stack.Screen 
          name="subscription" 
          options={{ 
            presentation: 'modal',
          }} 
        />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack>
    </GestureHandlerRootView>
  );
}
