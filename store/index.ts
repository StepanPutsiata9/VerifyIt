import authReducer from '@/features/auth/store/auth.slice';
import { configureStore } from '@reduxjs/toolkit';
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
// setOnLogoutCallback(() => {
//   store.dispatch(logout());
// });
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
