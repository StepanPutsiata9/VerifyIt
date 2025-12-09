import { Camera } from '@/features/scanning';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';

export default function ScanScreen() {
  const router = useRouter();

  const [isProcessing, setIsProcessing] = useState(false);
  const [cameraVisible, setCameraVisible] = useState(false); // Начинаем с false
  const hasNavigatedRef = useRef(false);
  const scannedDataRef = useRef<string | null>(null);

  // Показываем камеру когда экран в фокусе
  useFocusEffect(
    useCallback(() => {
      console.log('ScanScreen в фокусе, показываем камеру');
      setCameraVisible(true);

      return () => {
        console.log('ScanScreen теряет фокус, скрываем камеру');
        setCameraVisible(false);
      };
    }, [])
  );

  const handleQRCodeScanned = (data: string) => {
    if (isProcessing || hasNavigatedRef.current) {
      return;
    }

    console.log('QR-код отсканирован:', data);
    setIsProcessing(true);
    scannedDataRef.current = data;
    hasNavigatedRef.current = true;

    // Сразу скрываем камеру
    setCameraVisible(false);

    // Переходим на answer
    setTimeout(() => {
      router.push({
        pathname: '/(root)/answer',
        params: { qrData: data },
      });
    }, 200);
  };

  const handleClose = () => {
    if (hasNavigatedRef.current) {
      return;
    }

    // Скрываем камеру
    setCameraVisible(false);

    // Возвращаемся назад
    setTimeout(() => {
      router.back();
    }, 200);
  };

  return (
    <View style={styles.container}>
      <Camera
        visible={cameraVisible}
        onClose={handleClose}
        onQRCodeScanned={!isProcessing ? handleQRCodeScanned : undefined}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
});
