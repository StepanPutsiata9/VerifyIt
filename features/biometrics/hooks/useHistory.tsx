import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useCallback } from 'react';
import { getHistoryArray } from '../store/history.slice';
import { DocumentType } from '../types';
export const useHistory = () => {
  const dispatch = useAppDispatch();
  const { historyData, historyLoading } = useAppSelector((state) => state.history);
  const loadHistory = useCallback(async () => {
    try {
      dispatch(getHistoryArray());
    } catch (error) {
      console.error('Error loading movies list:', error);
    }
  }, [dispatch]);
  const formatDate = (date: Date | undefined) => {
    if (!date) return 'Не указано';
    const dateObj = date instanceof Date ? date : new Date(date);

    return dateObj.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
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
    loadHistory: loadHistory,
    historyData: historyData,
    historyLoading: historyLoading,
    formatDate: formatDate,
    getDocumentTypeName: getDocumentTypeName,
  };
};

export default useHistory;
