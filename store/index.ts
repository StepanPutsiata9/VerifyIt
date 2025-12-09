import { setOnLogoutCallback } from '@/api';
import authReducer, { logout } from '@/features/auth/store/auth.slice';
import historyReducer from '@/features/biometrics/store/history.slice';
import scanningReducer from '@/features/scanning/store/scanning.slice';
import { configureStore } from '@reduxjs/toolkit';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    scanning: scanningReducer,
    history: historyReducer,
  },
});
setOnLogoutCallback(() => {
  store.dispatch(logout());
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
