import * as Haptics from 'expo-haptics';
import * as LocalAuthentication from 'expo-local-authentication';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Global authentication cache
let authCache: { isAuthenticated: boolean; timestamp: number } | null = null;
const AUTH_CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

interface BiometricGuardProps {
  children: React.ReactNode;
}

export const BiometricGuard: React.FC<BiometricGuardProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);

  const authenticate = async () => {
    setIsLoading(true);
    setAuthError(null);
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
        // Cache successful authentication
        authCache = { isAuthenticated: true, timestamp: Date.now() };
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

  useEffect(() => {
    // Check if we have a valid cached authentication
    if (
      authCache &&
      Date.now() - authCache.timestamp < AUTH_CACHE_DURATION &&
      authCache.isAuthenticated
    ) {
      setIsAuthenticated(true);
      setIsLoading(false);
    } else {
      authenticate();
    }
  }, []);

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
          <Text style={styles.errorTitle}>Доступ ограничен</Text>
          <TouchableOpacity style={styles.retryButton} onPress={authenticate}>
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

// export { BiometricGuard };
// import * as Haptics from 'expo-haptics';
// import * as LocalAuthentication from 'expo-local-authentication';
// import React, { useEffect, useState } from 'react';
// import {
//   ActivityIndicator,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   Platform
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

// // Global authentication cache
// let authCache: { isAuthenticated: boolean; timestamp: number } | null = null;
// const AUTH_CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// interface BiometricGuardProps {
//   children: React.ReactNode;
// }

// const BiometricGuard: React.FC<BiometricGuardProps> = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [authError, setAuthError] = useState<string | null>(null);
//   const [biometricType, setBiometricType] = useState<string>('');

//   // Определяем тип биометрии
//   const getBiometricType = async (): Promise<string> => {
//     try {
//       const supportedTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();

//       if (supportedTypes.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)) {
//         return Platform.OS === 'ios' ? 'Face ID' : 'Facial Recognition';
//       }

//       if (supportedTypes.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
//         return Platform.OS === 'ios' ? 'Touch ID' : 'Fingerprint';
//       }

//       return 'Unknown';
//     } catch (error) {
//       console.error('Error getting biometric type:', error);
//       return 'Unknown';
//     }
//   };

//   const authenticate = async () => {
//     setIsLoading(true);
//     setAuthError(null);

//     try {
//       // ВАЖНО: Сначала проверяем, настроена ли биометрия
//       const enrolled = await LocalAuthentication.isEnrolledAsync();
//       console.log('Biometrics enrolled:', enrolled);

//       if (!enrolled) {
//         setAuthError('Биометрия не настроена. Настройте Face ID/Touch ID в настройках устройства.');
//         setIsLoading(false);
//         return;
//       }

//       // Затем проверяем наличие оборудования
//       const compatible = await LocalAuthentication.hasHardwareAsync();
//       console.log('Hardware compatible:', compatible);

//       if (!compatible) {
//         setAuthError('Устройство не поддерживает биометрическую аутентификацию.');
//         setIsLoading(false);
//         return;
//       }

//       // Получаем тип биометрии для отладки
//       const type = await getBiometricType();
//       setBiometricType(type);
//       console.log('Biometric type:', type);

//       // Пробуем аутентификацию
//       console.log('Starting authentication...');
//       const authResult = await LocalAuthentication.authenticateAsync({
//         promptMessage: 'Подтвердите свою личность',
//         fallbackLabel: 'Использовать пароль устройства', // Важно для iOS
//         disableDeviceFallback: false, // Разрешаем fallback к паролю
//         cancelLabel: 'Отмена', // Текст для кнопки отмены
//       });

//       console.log('Auth result:', authResult);

//       if (authResult.success) {
//         console.log('Authentication successful!');
//         await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
//         // Cache successful authentication
//         authCache = {
//           isAuthenticated: true,
//           timestamp: Date.now()
//         };
//         setIsAuthenticated(true);
//       } else {
//         console.log('Authentication failed:', authResult.error);
//         await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);

//         // Более понятные ошибки
//         let errorMessage = 'Аутентификация не удалась';
//         if (authResult.error === 'user_cancel') {
//           errorMessage = 'Аутентификация отменена пользователем';
//         } else if (authResult.error === 'app_cancel') {
//           errorMessage = 'Аутентификация отменена приложением';
//         } else if (authResult.error === 'system_cancel') {
//           errorMessage = 'Аутентификация отменена системой';
//         } else if (authResult.error === 'passcode_not_set') {
//           errorMessage = 'Не настроен код-пароль на устройстве';
//         } else if (authResult.error === 'lockout') {
//           errorMessage = 'Слишком много неудачных попыток. Разблокируйте устройство паролем';
//         }

//         setAuthError(errorMessage);
//       }
//     } catch (err: any) {
//       console.error('Auth error:', err);
//       await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
//       setAuthError(err.message || 'Ошибка при аутентификации');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const clearCacheAndRetry = () => {
//     // Очищаем кэш при ручном ретрае
//     authCache = null;
//     authenticate();
//   };

//   useEffect(() => {
//     // Для отладки: очищаем кэш при каждом запуске
//     // authCache = null;

//     // Проверяем кэш
//     if (authCache && Date.now() - authCache.timestamp < AUTH_CACHE_DURATION && authCache.isAuthenticated) {
//       console.log('Using cached authentication');
//       setIsAuthenticated(true);
//       setIsLoading(false);
//     } else {
//       console.log('Starting new authentication');
//       authenticate();
//     }
//   }, []);

//   // Добавим компонент для отладки
//   const DebugInfo = () => (
//     <View style={styles.debugContainer}>
//       <Text style={styles.debugText}>Platform: {Platform.OS}</Text>
//       <Text style={styles.debugText}>Biometric type: {biometricType}</Text>
//     </View>
//   );

//   if (isLoading) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <View style={styles.centered}>
//           <ActivityIndicator size="large" color="#FF3737" />
//           <Text style={styles.message}>
//             {biometricType
//               ? `Используйте ${biometricType}...`
//               : 'Проверка биометрии...'}
//           </Text>
//           {/* <DebugInfo /> */}
//         </View>
//       </SafeAreaView>
//     );
//   }

//   if (authError) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <View style={styles.centered}>
//           <Text style={styles.errorTitle}>Доступ ограничен</Text>
//           <Text style={styles.errorMessage}>{authError}</Text>
//           <TouchableOpacity style={styles.retryButton} onPress={clearCacheAndRetry}>
//             <Text style={styles.retryButtonText}>Повторить попытку</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[styles.retryButton, styles.secondaryButton]}
//             onPress={() => {
//               // Альтернативный метод: очистка всего
//               authCache = null;
//               authenticate();
//             }}
//           >
//             <Text style={styles.retryButtonText}>Полный сброс и повтор</Text>
//           </TouchableOpacity>
//           {/* <DebugInfo /> */}
//         </View>
//       </SafeAreaView>
//     );
//   }

//   if (isAuthenticated) {
//     return <>{children}</>;
//   }

//   return null;
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#121212',
//   },
//   centered: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//   },
//   message: {
//     color: 'white',
//     marginTop: 16,
//     fontSize: 16,
//     textAlign: 'center',
//   },
//   errorTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: 'white',
//     marginBottom: 12,
//     textAlign: 'center',
//   },
//   errorMessage: {
//     color: '#FF6B6B',
//     fontSize: 16,
//     textAlign: 'center',
//     marginBottom: 24,
//     paddingHorizontal: 20,
//   },
//   retryButton: {
//     backgroundColor: '#FF3737',
//     paddingHorizontal: 24,
//     paddingVertical: 12,
//     borderRadius: 8,
//     marginTop: 12,
//     minWidth: 200,
//     alignItems: 'center',
//   },
//   secondaryButton: {
//     backgroundColor: '#444',
//     marginTop: 8,
//   },
//   retryButtonText: {
//     color: 'white',
//     fontWeight: '600',
//     fontSize: 16,
//   },
//   debugContainer: {
//     position: 'absolute',
//     top: 50,
//     left: 20,
//     backgroundColor: 'rgba(0,0,0,0.7)',
//     padding: 10,
//     borderRadius: 5,
//   },
//   debugText: {
//     color: 'white',
//     fontSize: 12,
//   },
// });

// export { BiometricGuard };
