import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { setAuthError } from '../store/auth.slice';

export const useAuthValidation = () => {
  const { authError } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  const validateInputs = (loginText: string, passwordText: string): string | null => {
    if (loginText.trim().length === 0 || passwordText.trim().length === 0) {
      return 'Все поля должны быть заполненными';
    }
    if (loginText.trim().length < 8 || passwordText.trim().length < 8) {
      return 'Логин и пароль должны состоять минимум из 8 символов';
    }
    return null;
  };

  const clearError = () => dispatch(setAuthError(null));

  const fadeAnim = useRef(new Animated.Value(0)).current;

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
  }, [fadeAnim, authError]);

  return {
    authError,
    validateInputs,
    clearError,
    fadeAnim,
  };
};
