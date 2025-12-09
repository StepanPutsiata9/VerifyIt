import * as Haptics from 'expo-haptics';
import * as LocalAuthentication from 'expo-local-authentication';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface BiometricGuardProps {
  children: React.ReactNode;
}

const BiometricGuard: React.FC<BiometricGuardProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);

  // Проверяем поддержку и наличие биометрии
  useEffect(() => {
    const authenticate = async () => {
      try {
        const compatible = await LocalAuthentication.hasHardwareAsync();
        if (!compatible) {
          setAuthError('Устройство не поддерживает биометрическую аутентификацию.');
          setIsLoading(false);
          return;
        }

        const enrolled = await LocalAuthentication.isEnrolledAsync();
        if (!enrolled) {
          setAuthError('Не настроены биометрические данные (отпечаток/лицо).');
          setIsLoading(false);
          return;
        }

        const authResult = await LocalAuthentication.authenticateAsync({
          promptMessage: 'Подтвердите свою личность',
          fallbackLabel: 'Использовать PIN/пароль',
          disableDeviceFallback: false,
        });

        if (authResult.success) {
          await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          setIsAuthenticated(true);
        } else {
          await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
          setAuthError(authResult.error ?? 'Неизвестная ошибка аутентификации');
        }
      } catch (err: any) {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        setAuthError(err.message || 'Ошибка при аутентификации');
      } finally {
        setIsLoading(false);
      }
    };

    authenticate();
  }, []);

  const retryAuthentication = () => {
    setIsLoading(true);
    setAuthError(null);
    setTimeout(() => {
      setIsLoading(false);
      setAuthError('Повторная попытка недоступна в текущей реализации. Перезагрузите экран.');
    }, 100);
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#FF3737" />
          <Text style={styles.message}>Проверка биометрии...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (authError) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <Text style={styles.errorTitle}>🔒 Доступ ограничен</Text>
          <Text style={styles.errorMessage}>{authError}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={retryAuthentication}>
            <Text style={styles.retryButtonText}>Повторить</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  message: {
    color: 'white',
    marginTop: 16,
    fontSize: 16,
    textAlign: 'center',
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 12,
    textAlign: 'center',
  },
  errorMessage: {
    fontSize: 16,
    color: '#FF6B6B',
    textAlign: 'center',
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: '#FF3737',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});

export { BiometricGuard };
