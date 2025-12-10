import { useNotifications } from '@/features/notifications';
import { AppLogo } from '@/features/shared';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const NotificationsScreen = () => {
  const router = useRouter();
  const { notifications, formatTime } = useNotifications();

  const renderNotification = ({ item }: { item: any }) => (
    <View style={[styles.notificationCard, !item.isRead && styles.unreadCard]}>
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationMessage}>{item.message}</Text>
        <Text style={styles.notificationTime}>{formatTime(item.createdAt)}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={32} color="#FF3737" />
        </TouchableOpacity>
        <View style={styles.logoView}>
          <AppLogo />
          <Text style={styles.appTitle}>VerifyIt</Text>
        </View>
        <View style={styles.placeholder} />
      </View>

      <Text style={styles.title}>Уведомления</Text>

      <FlatList
        data={notifications}
        keyExtractor={(item, index) => item.id || `notification-${index}`}
        renderItem={renderNotification}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  backButton: {
    width: 32,
  },
  logoView: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 12,
  },
  appTitle: {
    fontSize: 32,
    color: '#FF3737',
    fontFamily: 'VelaSansBold',
  },
  placeholder: {
    width: 32,
  },
  title: {
    fontFamily: 'VelaSansBold',
    fontSize: 22,
    textAlign: 'center',
    color: 'white',
    marginBottom: 16,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 160,
  },
  notificationCard: {
    backgroundColor: '#242424',
    borderRadius: 10,
    padding: 16,
  },
  unreadCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#FF3737',
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontFamily: 'VelaSansBold',
    color: '#fff',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    fontFamily: 'VelaSans',
    color: '#B3B3B3',
    marginBottom: 8,
  },
  notificationTime: {
    fontSize: 12,
    fontFamily: 'VelaSans',
    color: '#666',
  },
  separator: {
    height: 12,
  },
});

export default NotificationsScreen;
