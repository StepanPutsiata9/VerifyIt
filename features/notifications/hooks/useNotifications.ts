import { getTokens } from '@/features/auth/storage';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useCallback, useEffect, useRef } from 'react';
import EventSource from 'react-native-sse';
import { addNotification, setConnectionStatus } from '../store/notifications.slice';
import { INotification } from '../types';

export const useNotifications = () => {
  const dispatch = useAppDispatch();
  const { notifications, isConnected } = useAppSelector((state) => state.notifications);
  const { user } = useAppSelector((state) => state.auth);
  const eventSourceRef = useRef<EventSource | null>(null);
  const getAccessToken = async () => {
    const tokens = await getTokens();
    return tokens?.accessToken;
  };

  const connectSSE = useCallback(async () => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    const token = await getAccessToken();
    console.log('====================================');
    console.log(token);
    console.log('====================================');

    const eventSource = new EventSource(
      `https://verifyit-backend-frhc.onrender.com/notifications/stream?token=${token}`
    );
    eventSourceRef.current = eventSource;

    eventSource.addEventListener('open', () => {
      console.log('====================================');
      console.log('open');
      console.log('====================================');
      dispatch(setConnectionStatus(true));
    });

    eventSource.addEventListener('message', (event) => {
      try {
        const rawData = JSON.parse(event.data || '');
        
        // Игнорируем KEEP_ALIVE сообщения
        if (rawData.type === 'KEEP_ALIVE') return;
        
        const notification: INotification = {
          id: rawData.id || `${Date.now()}-${Math.random()}`,
          title: rawData.type === 'EXPIRED' ? 'Документ истек' : rawData.type,
          message: rawData.message || '',
          createdAt: rawData.timestamp,
          isRead: false,
        };
        
        dispatch(addNotification(notification));
      } catch (error) {
        console.error('Error parsing notification:', error);
      }
    });

    eventSource.addEventListener('error', () => {
      dispatch(setConnectionStatus(false));
      eventSource.close();
    });
  }, [dispatch]);

  const disconnectSSE = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
      dispatch(setConnectionStatus(false));
    }
  }, [dispatch]);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'неизвестно';

    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'только что';
    if (minutes < 60) return `${minutes} мин назад`;
    if (hours < 24) return `${hours} час${hours > 1 ? 'а' : ''} назад`;
    return `${days} дн${days > 1 ? 'я' : 'ь'} назад`;
  };

  useEffect(() => {
    if (user && user !== null) {
      connectSSE();
    } else {
      disconnectSSE();
    }
    return () => disconnectSSE();
  }, [user, connectSSE, disconnectSSE]);

  return {
    notifications,
    isConnected,
    connectSSE,
    disconnectSSE,
    formatTime,
  };
};
