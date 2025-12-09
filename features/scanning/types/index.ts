import { useCameraPermissions } from 'expo-camera';

export interface UseCameraScanReturn {
  permission: ReturnType<typeof useCameraPermissions>[0];
  scanned: boolean;
  isLoading: boolean;

  // Методы
  requestPermission: () => Promise<void>;
  handleBarCodeScanned: (data: string, type?: string) => void;
  resetScan: () => void;
  setScanned: (value: boolean) => void;
}
