import { Camera } from '@/features/scanning';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';

export default function ScanScreen() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const hasNavigatedRef = useRef(false);
  const scannedDataRef = useRef<string | null>(null);

  const handleQRCodeScanned = (data: string) => {
    // Защита от повторных срабатываний
    if (isProcessing || hasNavigatedRef.current) {
      console.log('Уже обрабатывается или навигация выполнена');
      return;
    }

    console.log('QR-код отсканирован:', data);
    setIsProcessing(true);
    scannedDataRef.current = data;
    hasNavigatedRef.current = true;
    setTimeout(() => {
      console.log('Выполняем переход на answer с данными:', data);
      router.replace({
        pathname: '/(root)/answer',
        params: { qrData: data },
      });
    }, 0);
  };

  const handleClose = () => {
    if (hasNavigatedRef.current) {
      return;
    }
    router.back();
  };

  return (
    <View style={styles.container}>
      <Camera
        visible={true}
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
