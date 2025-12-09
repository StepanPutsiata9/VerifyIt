/* eslint-disable react-native/no-inline-styles */
import { useScan } from '@/features/scanning';
import { AppLogo, Cross, ExpirationBanner, GoodBanner, WarningBanner } from '@/features/shared';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.appBar}>
          <View></View>
          <View style={styles.logoView}>
            <AppLogo />
            <Text style={styles.appTitle}>VerifyIt</Text>
          </View>

          <TouchableOpacity
            style={styles.backBtn}
            hitSlop={{ top: 5, left: 5, right: 5, bottom: 5 }}
            onPress={() => router.navigate('/(root)/(tabs)/home')}
          >
            <Cross />
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Информация о документе</Text>

        <View style={styles.content}>
          {scanningData ? (
            <>
              <View>
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
              </View>
            </>
          ) : (
            <Text style={styles.noDataText}>
              Данные документа не загружены или QR-код не распознан
            </Text>
          )}
        </View>

        <View style={styles.markContainer}>
          {scanningData && (
            <>
              {scanningData.valid && !scanningData.expiresSoon && (
                <View style={styles.bannerWrapper}>
                  <View style={[styles.markView, { backgroundColor: 'rgba(22, 255, 35, 0.3)' }]}>
                    <Text style={[styles.markText, { color: '#72FF7C' }]}>Документ актуален!</Text>
                  </View>
                  <View style={styles.bannerContainer}>
                    <GoodBanner />
                  </View>
                </View>
              )}
              {scanningData.valid && scanningData.expiresSoon && (
                <View style={styles.bannerWrapper}>
                  <View style={[styles.markView, { backgroundColor: 'rgba(255, 255, 0, 0.3)' }]}>
                    <Text style={[styles.markText, { color: '#FFFFA3' }]}>
                      Срок действия документа скоро истечет!
                    </Text>
                  </View>
                  <View style={styles.bannerContainer}>
                    <WarningBanner />
                  </View>
                </View>
              )}
              {!scanningData.valid && (
                <View style={styles.bannerWrapper}>
                  <View style={[styles.markView, { backgroundColor: 'rgba(255, 0, 0, 0.3)' }]}>
                    <Text style={[styles.markText, { color: '#FF9E9E' }]}>
                      Срок действия документа истек!
                    </Text>
                  </View>
                  <View style={styles.bannerContainer}>
                    <ExpirationBanner />
                  </View>
                </View>
              )}
            </>
          )}
        </View>
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 15,
    paddingBottom: 40,
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
    paddingTop: 15,
    backgroundColor: '#121212',
    zIndex: 10,
  },
  content: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: '#333333',
    marginBottom: 30,
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
  noDataText: {
    color: '#888888',
    fontFamily: 'VelaSansRegular',
    fontSize: 16,
    textAlign: 'center',
    paddingVertical: 20,
  },
  markContainer: {
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  bannerWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  markView: {
    paddingVertical: 14,
    borderRadius: 15,
    marginBottom: 20,
    width: '100%',
  },
  markText: {
    fontSize: 14,
    fontFamily: 'VelaSansRegular',
    textAlign: 'center',
  },
  bannerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  bottomSpacing: {
    height: 50,
  },
});
