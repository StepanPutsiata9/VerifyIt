import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useCallback } from 'react';
import { Alert } from 'react-native';
import { deleteDocumentItem, getHistoryArray } from '../store/history.slice';
import { DocumentType } from '../types';
export const useHistory = () => {
  const dispatch = useAppDispatch();
  const { historyData, historyLoading } = useAppSelector((state) => state.history);
  const loadHistory = useCallback(async () => {
    try {
      dispatch(getHistoryArray());
    } catch (error) {
      console.error('Error loading history:', error);
    }
  }, [dispatch]);

  const forceRefresh = useCallback(async () => {
    try {
      await dispatch(getHistoryArray()).unwrap();
    } catch (error) {
      console.error('Error refreshing history:', error);
      Alert.alert('Ошибка', 'Не удалось обновить данные');
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

  const handleDeleteDocument = async (ticketId: string) => {
    Alert.alert(
      'Удаление',
      'Вы уверены, что хотите удалить верификацию? Это действие невозможно отменить.',
      [
        {
          text: 'Нет',
          style: 'cancel',
        },
        {
          text: 'Да',
          style: 'destructive',
          onPress: () => confirmDelete(ticketId),
        },
      ]
    );
  };

  const confirmDelete = async (docId: string) => {
    try {
      await dispatch(deleteDocumentItem(docId)).unwrap();
      // После успешного удаления можно перезагрузить данные
      await dispatch(getHistoryArray());
    } catch (error) {
      console.error('Ошибка при удалении:', error);
      Alert.alert('Ошибка', 'Произошла ошибка при удалении. Пожалуйста, попробуйте еще раз.');
    }
  };
  return {
    loadHistory: loadHistory,
    forceRefresh: forceRefresh,
    historyData: historyData,
    historyLoading: historyLoading,
    formatDate: formatDate,
    getDocumentTypeName: getDocumentTypeName,
    handleDeleteDocument: handleDeleteDocument,
  };
};

export default useHistory;
