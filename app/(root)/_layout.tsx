import { Stack } from 'expo-router';

export default function MainLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="answer" />
      <Stack.Screen name="scan" />
      <Stack.Screen name="notifications" />
    </Stack>
  );
}
