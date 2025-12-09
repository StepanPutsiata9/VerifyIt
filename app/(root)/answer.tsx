import { useScan } from '@/features/scanning';
import { AppLogo, Cross } from '@/features/shared';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Answer() {
  const router = useRouter();
  const { scanningData, clearAllData, formatDate, getDocumentTypeName } = useScan();

  useFocusEffect(
    useCallback(() => {
      return () => {
        clearAllData();
      };
    }, [clearAllData])
  );

  console.log('scanData', scanningData);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.appBar}>
        <View></View>
        <View style={styles.logoView}>
          <AppLogo />
          <Text style={styles.appTitle}>VerifyIt</Text>
        </View>

        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.navigate('/(root)/(tabs)/home')}
        >
          <Cross />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Информация о документе</Text>

      <View style={styles.content}>
        {scanningData ? (
          <>
            <Text style={styles.fieldText}>
              <Text style={styles.fieldLabel}>Название: </Text>
              {scanningData.name}
            </Text>

            <Text style={styles.fieldText}>
              <Text style={styles.fieldLabel}>Тип документа: </Text>
              {getDocumentTypeName(scanningData.type)}
            </Text>

            <Text style={styles.fieldText}>
              <Text style={styles.fieldLabel}>Автор: </Text>
              {scanningData.author}
            </Text>

            <Text style={styles.fieldText}>
              <Text style={styles.fieldLabel}>Создан: </Text>
              {formatDate(scanningData.createdAt)}
            </Text>

            <Text style={styles.fieldText}>
              <Text style={styles.fieldLabel}>Истекает: </Text>
              {formatDate(scanningData.expirationDate)}
            </Text>

            <View
              style={[
                styles.statusBadge,
                // eslint-disable-next-line react-native/no-inline-styles
                {
                  backgroundColor: scanningData.valid
                    ? 'rgba(76, 175, 80, 0.2)'
                    : 'rgba(244, 67, 54, 0.2)',
                  borderColor: scanningData.valid ? '#4CAF50' : '#F44336',
                },
              ]}
            >
              <Text
                // eslint-disable-next-line react-native/no-inline-styles
                style={[styles.statusText, { color: scanningData.valid ? '#4CAF50' : '#F44336' }]}
              >
                {scanningData.valid ? 'Документ валиден' : 'Документ невалиден'}
              </Text>
            </View>

            {scanningData.expiresSoon && (
              <View style={styles.warningBadge}>
                <Text style={styles.warningText}>⚠️ Истекает скоро</Text>
              </View>
            )}
          </>
        ) : (
          <Text style={styles.noDataText}>
            Данные документа не загружены или QR-код не распознан
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 16,
    paddingTop: 15,
  },
  appTitle: {
    fontSize: 32,
    color: '#FF3737',
    fontFamily: 'VelaSansBold',
  },
  logoView: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 12,
    marginBottom: 10,
  },
  title: {
    fontFamily: 'VelaSansBold',
    fontSize: 22,
    textAlign: 'center',
    color: 'white',
    marginBottom: 24,
  },
  backBtn: {
    marginBottom: 6,
  },
  appBar: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  content: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: '#333333',
  },
  fieldText: {
    fontSize: 16,
    fontFamily: 'VelaSansRegular',
    color: '#E0E0E0',
    marginBottom: 12,
    lineHeight: 24,
  },
  fieldLabel: {
    fontFamily: 'VelaSans',
    color: '#B0B0B0',
  },
  statusBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    alignSelf: 'flex-start',
    marginTop: 16,
  },
  statusText: {
    fontFamily: 'VelaSansBold',
    fontSize: 14,
  },
  warningBadge: {
    backgroundColor: 'rgba(255, 152, 0, 0.2)',
    borderWidth: 1,
    borderColor: '#FF9800',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  warningText: {
    color: '#FF9800',
    fontFamily: 'VelaSansBold',
    fontSize: 14,
  },
  noDataText: {
    color: '#888888',
    fontFamily: 'VelaSansRegular',
    fontSize: 16,
    textAlign: 'center',
    paddingVertical: 20,
  },
});
