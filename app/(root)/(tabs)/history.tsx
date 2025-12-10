import { BiometricGuard, DocumentCard, useHistory } from '@/features/biometrics/';
import { AppLogo } from '@/features/shared';
import React, { useEffect } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
const ProtectedContent = () => {
  const { loadHistory, forceRefresh, historyData, historyLoading } = useHistory();
  useEffect(() => {
    loadHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoView}>
        <AppLogo />
        <Text style={styles.appTitle}>VerifyIt</Text>
      </View>

      {historyLoading ? (
        <ActivityIndicator size="large" color="#FF3737" style={styles.loader} />
      ) : (
        <GestureHandlerRootView>
          <View style={styles.gestureContainer}>
            <FlatList
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={<Text style={styles.title}>Журнал верификаций</Text>}
              data={historyData}
              keyExtractor={(item) => item.id + Math.random()}
              renderItem={({ item }) => <DocumentCard document={item} />}
              contentContainerStyle={styles.listContent}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              refreshControl={
                <RefreshControl
                  refreshing={historyLoading}
                  onRefresh={forceRefresh}
                  tintColor="#FF3737"
                  colors={['#FF3737']}
                />
              }
            />
          </View>
        </GestureHandlerRootView>
      )}
    </SafeAreaView>
  );
};

export default function HistoryTab() {
  return (
    <BiometricGuard>
      <ProtectedContent />
    </BiometricGuard>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 15,
  },
  gestureContainer: {
    flex: 1,
  },
  logoView: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  appTitle: {
    fontSize: 32,
    color: '#FF3737',
    fontFamily: 'VelaSansBold',
  },
  title: {
    fontFamily: 'VelaSansBold',
    fontSize: 22,
    textAlign: 'center',
    color: 'white',
    marginBottom: 16,
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: 180,
  },
  separator: {
    height: 12,
  },
  loader: {
    flex: 1,
  },
});
