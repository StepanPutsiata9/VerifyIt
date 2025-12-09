import { useAppSelector } from '@/store/hooks';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';

export const useScan = () => {
  const router = useRouter();
  const { scanningLoading, scanningData, scanningError } = useAppSelector(
    (state) => state.scanning
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [cameraVisible, setCameraVisible] = useState(false);
  const hasNavigatedRef = useRef(false);
  const scannedDataRef = useRef<string | null>(null);
  const handleQRCodeScanned = (data: string) => {
    if (isProcessing || hasNavigatedRef.current) {
      return;
    }

    console.log('QR-код отсканирован:', data);
    setIsProcessing(true);
    scannedDataRef.current = data;
    hasNavigatedRef.current = true;

    setCameraVisible(false);
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
    setCameraVisible(false);
    setTimeout(() => {
      router.back();
    }, 200);
  };
  return {
    handleClose: handleClose,
    handleQRCodeScanned: handleQRCodeScanned,
    cameraVisible: cameraVisible,
    isProcessing: isProcessing,
    setCameraVisible: setCameraVisible,
    scanningLoading: scanningLoading,
    scanningData: scanningData,
    scanningError: scanningError,
  };
};
