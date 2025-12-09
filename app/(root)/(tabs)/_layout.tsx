import { MyTabBar } from '@/features/shared';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }} tabBar={(props) => <MyTabBar {...props} />}>
      <Tabs.Screen name="home" />
      <Tabs.Screen name="history" />
    </Tabs>
  );
}
