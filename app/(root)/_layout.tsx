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
      <Stack.Screen
        name="scan"
        options={{
          headerShown: false,
          presentation: 'modal', // Важно!
          contentStyle: { backgroundColor: '#121212' },
          animation: 'fade',
        }}
      />
    </Stack>
  );
}
