import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { setAuthError } from '../store/auth.slice';

export const useRegistrationValidation = () => {
  const { authError } = useAppSelector(state => state.auth);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (authError) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      fadeAnim.setValue(0);
    }
  }, [authError, fadeAnim]);

  const validateInputs = (
    loginText: string,
    passwordText: string,
    repitPasswordText: string
  ): string | null => {
    if (
      loginText.trim().length === 0 ||
      passwordText.trim().length === 0 ||
      repitPasswordText.trim().length === 0
    ) {
      return 'Все поля должны быть заполненными';
    }

    if (loginText.trim().length < 8 || passwordText.trim().length < 8) {
      return 'Логин и пароль должны состоять минимум из 8 символов';
    }

    if (passwordText.trim() !== repitPasswordText.trim()) {
      return 'Пароли должны совпадать';
    }

    return null;
  };
  const clearError = () => dispatch(setAuthError(null));
  const clearInputs = (
    setLoginText: (str: string) => void,
    setPasswordText: (str: string) => void,
    setRepitPasswordText: (str: string) => void
  ) => {
    setLoginText('');
    setPasswordText('');
    setRepitPasswordText('');
  };

  return {
    authError,
    fadeAnim,
    validateInputs,
    clearInputs,
    clearError,
  };
};
