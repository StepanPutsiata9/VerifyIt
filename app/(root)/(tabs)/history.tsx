import { BiometricGuard, DocumentCard, useHistory } from '@/features/biometrics/';
import { AppLogo } from '@/features/shared';
import React, { useEffect } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProtectedContent = () => {
  const { loadHistory, historyData, historyLoading } = useHistory();
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
        <View>
          <FlatList
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<Text style={styles.title}>Журнал верификаций</Text>}
            data={historyData}
            keyExtractor={(item) => item.id + Math.random()}
            renderItem={({ item }) => <DocumentCard document={item} />}
            contentContainerStyle={styles.listContent}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </View>
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
    paddingHorizontal: 16,
    paddingBottom: 180,
  },
  separator: {
    height: 12,
  },
  loader: {
    flex: 1,
  },
});
