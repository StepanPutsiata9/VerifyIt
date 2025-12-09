import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useRouter } from 'expo-router';
import { Alert } from 'react-native';
import { loginApi, logoutApi, registrationApi } from '../services';
import { isFirstLaunch, setAppLaunched } from '../storage';
import {
  loadUser,
  login,
  logout,
  setAuthError,
  setIsFirstLaunch,
  setLoading,
} from '../store/auth.slice';
import { useAuthValidation } from './useAuthValidation';
import { useRegistrationValidation } from './useRegistrationValidation';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, isLoading, isFirstLaunch: firstLaunch } = useAppSelector(state => state.auth);
  const { validateInputs: validateRegisterInputs } = useRegistrationValidation();
  const { validateInputs: validateAuthInputs } = useAuthValidation();
  const router = useRouter();

  const handleLogin = async (loginText: string, passwordText: string) => {
    const validationError = validateAuthInputs(loginText, passwordText);
    if (validationError) {
      dispatch(setAuthError(validationError));
      return;
    }
    dispatch(setLoading(true));
    dispatch(setAuthError(null));
    try {
      const response = await loginApi(loginText, passwordText);

      if (response === null) {
        dispatch(setAuthError('Неверный логин или пароль'));
        dispatch(setLoading(false));
        return;
      }

      const { accessToken, refreshToken } = response;
      if (accessToken && refreshToken) {
        await dispatch(login({ accessToken, refreshToken }));
      }
      dispatch(setLoading(false));
    } catch {
      dispatch(setAuthError('Произошла ошибка при входе'));
      router.push('/(auth)/login');
      dispatch(setLoading(false));
    }
  };
  const handleRegistration = async (
    loginText: string,
    passwordText: string,
    repitPasswordText: string
  ) => {
    const validationError = validateRegisterInputs(loginText, passwordText, repitPasswordText);
    if (validationError) {
      dispatch(setAuthError(validationError));
      return;
    }
    dispatch(setLoading(true));
    dispatch(setAuthError(null));
    try {
      const response = await registrationApi(loginText, passwordText);
      const { accessToken, refreshToken } = response;
      if (accessToken && refreshToken) {
        await dispatch(login({ accessToken, refreshToken }));
      }
      dispatch(setLoading(false));
    } catch {
      dispatch(setAuthError('Произошла ошибка при регистрации'));
      router.push('/(auth)/registration');
      dispatch(setLoading(false));
    }
  };

  const handleLogout = async () => {
    dispatch(setLoading(true));
    dispatch(setAuthError(null));
    try {
      const response = await logoutApi();
      if (response) {
        dispatch(logout());
      }
    } catch {
      dispatch(setAuthError('Произошла ошибка при выходе с аккаунта'));
      dispatch(setLoading(false));
    }
  };
  const handleLogoutPress = () => {
    Alert.alert(
      'Выход',
      'Вы уверены, что хотите выйти?',
      [
        {
          text: 'Отмена',
          style: 'cancel',
        },
        {
          text: 'Выйти',
          style: 'destructive',
          onPress: async () => {
            try {
              await handleLogout();
              router.replace('/(auth)/login');
            } catch (error) {
              console.error('Logout error:', error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };
  const checkFirstLaunch = async () => {
    const launch = await isFirstLaunch();
    dispatch(setIsFirstLaunch(launch));

    if (launch) {
      await setAppLaunched();
      return true;
    }
    return false;
  };
  const loadApp = () => {
    dispatch(loadUser());
    checkFirstLaunch();
  };

  return {
    user,
    handleLogin,
    handleRegistration,
    isLoading,
    loadApp,
    checkFirstLaunch,
    firstLaunch,
    handleLogoutPress,
  };
};
