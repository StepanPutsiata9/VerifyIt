import { setOnLogoutCallback } from '@/api';
import authReducer, { logout } from '@/features/auth/store/auth.slice';
import scanningReducer from '@/features/scanning/store/scanning.slice';
import { configureStore } from '@reduxjs/toolkit';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    scanning: scanningReducer,
  },
});
setOnLogoutCallback(() => {
  store.dispatch(logout());
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
