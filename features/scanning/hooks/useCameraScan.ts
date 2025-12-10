import { useCameraPermissions } from 'expo-camera';
import { useCallback, useEffect, useState } from 'react';
import { UseCameraScanReturn } from '../types';

export const useCameraScan = (): UseCameraScanReturn => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const init = async () => {
      if (!permission?.granted) {
        await requestPermission();
      }
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBarCodeScanned = useCallback(
    (data: string, type?: string) => {
      if (!scanned && !isLoading) {
        console.log(`QR-код типа ${type || 'unknown'} отсканирован: ${data}`);
        setScanned(true);
        setIsLoading(true);

        setTimeout(() => {
          setScanned(false);
          setIsLoading(false);
        }, 1500);
      }
    },
    [scanned, isLoading]
  );

  const resetScan = useCallback(() => {
    setScanned(false);
    setIsLoading(false);
  }, []);

  return {
    permission,
    scanned,
    isLoading,
    requestPermission: async () => {
      await requestPermission();
    },
    handleBarCodeScanned,
    resetScan,
    setScanned,
  };
};
