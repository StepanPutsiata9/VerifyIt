import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INotification } from '../types';

interface NotificationsState {
  notifications: INotification[];
  isConnected: boolean;
}

const initialState: NotificationsState = {
  notifications: [],
  isConnected: false,
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<INotification>) => {
      state.notifications.unshift(action.payload);
    },
    setConnectionStatus: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find((n) => n.id === action.payload);
      if (notification) {
        notification.isRead = true;
      }
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
  },
});

export const { addNotification, setConnectionStatus, markAsRead, clearNotifications } =
  notificationsSlice.actions;
export default notificationsSlice.reducer;
