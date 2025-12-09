import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useCallback } from 'react';
import { getHistoryArray } from '../store/history.slice';

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
  return {
    loadHistory: loadHistory,
    historyData: historyData,
    historyLoading: historyLoading,
  };
};

export default useHistory;
