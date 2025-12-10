import { IDocumentInfo } from '@/features/biometrics/types';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { clearScanningData, getQrInfo, setScanningData } from '../store/scanning.slice';
import { DocumentType } from '../types/';
export const useScan = () => {
  const router = useRouter();
  const { scanningLoading, scanningData, scanningError } = useAppSelector(
    (state) => state.scanning
  );
  const dispatch = useAppDispatch();

  const [isProcessing, setIsProcessing] = useState(false);
  const [cameraVisible, setCameraVisible] = useState(false);
  const hasNavigatedRef = useRef(false);
  const scannedDataRef = useRef<string | null>(null);

  const handleQRCodeScanned = async (data: string) => {
    if (isProcessing || hasNavigatedRef.current) {
      return;
    }

    setIsProcessing(true);
    scannedDataRef.current = data;
    hasNavigatedRef.current = true;

    try {
      await dispatch(getQrInfo(data));
      setCameraVisible(false);
      setTimeout(() => {
        router.push('/(root)/answer');
      }, 200);
    } catch (error) {
      console.error('Ошибка при получении данных:', error);

      setCameraVisible(false);

      setTimeout(() => {
        router.push('/(root)/answer');
      }, 200);
    } finally {
      setIsProcessing(false);
    }
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

  const clearAllData = () => {
    dispatch(clearScanningData());
  };
  const formatDate = (date: Date | undefined) => {
    if (!date) return 'Не указано';
    const dateObj = date instanceof Date ? date : new Date(date);

    return dateObj.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };
  const setDataScan = (doc: IDocumentInfo) => {
    dispatch(setScanningData(doc));
  };
  const typeMap: Record<DocumentType, string> = {
    CONTRACT: 'Договор',
    INNOVICE: 'Счёт-фактура',
    ACT: 'Акт',
    WAYBILL: 'Товарная накладная',
    STATEMENT: 'Выписка',
    ORDER: 'Заказ',
    PROTOCOL: 'Протокол',
    CHARTER: 'Устав',
    LETTER: 'Письмо',
    CV: 'Резюме (CV)',
    REPORT: 'Отчёт',
    REFERENCE: 'Справка',
  };

  const getDocumentTypeName = (type: DocumentType): string => {
    return typeMap[type];
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
    clearAllData: clearAllData,
    formatDate: formatDate,
    getDocumentTypeName: getDocumentTypeName,
    setDataScan: setDataScan,
  };
};
