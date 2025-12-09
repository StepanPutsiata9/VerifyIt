import { useCameraPermissions } from 'expo-camera';

export interface UseCameraScanReturn {
  permission: ReturnType<typeof useCameraPermissions>[0];
  scanned: boolean;
  isLoading: boolean;
  requestPermission: () => Promise<void>;
  handleBarCodeScanned: (data: string, type?: string) => void;
  resetScan: () => void;
  setScanned: (value: boolean) => void;
}
export type DocumentType =
  | 'CONTRACT'
  | 'INNOVICE'
  | 'ACT'
  | 'WAYBILL'
  | 'STATEMENT'
  | 'ORDER'
  | 'PROTOCOL'
  | 'CHARTER'
  | 'LETTER'
  | 'CV'
  | 'REPORT'
  | 'REFERENCE';
export interface IDocumentInfo {
  id: string;
  name: string;
  valid: boolean;
  expiresSoon: boolean;
  type: DocumentType;
  author: string;
  expirationDate: Date;
}

export interface ScanState {
  scanningData: IDocumentInfo | null;
  scanningLoading: boolean;
  scanningError: string | null;
}
