import { useAuth } from '@/features/auth';
import { LoadingModal } from '@/features/shared';
import { store } from '@/store';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { Provider } from 'react-redux';
function AppNavigationStack() {
  const {
    // user,
    isLoading,
    loadApp,
  } = useAuth();
  useEffect(() => {
    loadApp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <StatusBar style="light" />
      <LoadingModal visible={isLoading} />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'fade',
        }}
      >
        <Stack.Protected guard={!!false}>
          <Stack.Screen name="(root)" />
        </Stack.Protected>
        <Stack.Protected guard={!false}>
          <Stack.Screen name="(auth)" />
        </Stack.Protected>
      </Stack>
    </>
  );
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    VelaSans: require('@/assets/fonts/VelaSansMedium.ttf'),
    VelaSansBold: require('@/assets/fonts/VelaSansBold.ttf'),
    VelaSansRegular: require('@/assets/fonts/VelaSansRegular.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  return (
    <Provider store={store}>
      <KeyboardProvider>
        <AppNavigationStack />
      </KeyboardProvider>
    </Provider>
  );
}
