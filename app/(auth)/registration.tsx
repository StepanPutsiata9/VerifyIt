import { useAuth, useRegistrationValidation } from '@/features/auth';
import { AppLogo, PrimaryButton, RegistrationBanner } from '@/features/shared';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Animated, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegistrationScreen() {
  const router = useRouter();
  const [loginText, setLoginText] = useState<string>('');
  const [passwordText, setPasswordText] = useState<string>('');
  const [repeatPasswordText, setRepeatPasswordText] = useState<string>('');

  const { authError, fadeAnim, clearError } = useRegistrationValidation();
  const { handleRegistration } = useAuth();

  const handleInputChange = () => {
    if (authError) {
      clearError();
    }
  };

  const handleRegisterPress = () => {
    handleRegistration(loginText, passwordText, repeatPasswordText);
  };

  const navigateToLogin = () => {
    router.push('/(auth)/login');
    clearError();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        bottomOffset={75}
      >
        <View style={styles.logoView}>
          <AppLogo />
          <Text style={styles.appTitle}>VerifyIt</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.greetText}>Регистрация</Text>

          <View style={styles.bannerContainer}>
            <RegistrationBanner />
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputsContainer}>
              <TextInput
                value={loginText}
                placeholder="Логин"
                style={[styles.textInput, styles.loginInput, authError && styles.errorInput]}
                onChangeText={(text: string) => {
                  setLoginText(text);
                  handleInputChange();
                }}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                placeholderTextColor="#9E9B9B"
                returnKeyType="next"
              />

              <TextInput
                value={passwordText}
                placeholder="Пароль"
                style={[styles.textInput, styles.passwordInput, authError && styles.errorInput]}
                onChangeText={(text: string) => {
                  setPasswordText(text);
                  handleInputChange();
                }}
                placeholderTextColor="#9E9B9B"
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
              />

              <TextInput
                value={repeatPasswordText}
                placeholder="Повторите пароль"
                style={[styles.textInput, authError && styles.errorInput]}
                onChangeText={(text: string) => {
                  setRepeatPasswordText(text);
                  handleInputChange();
                }}
                placeholderTextColor="#9E9B9B"
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="done"
                onSubmitEditing={handleRegisterPress}
              />
            </View>

            {authError && (
              <Animated.View style={[styles.errorContainer, { opacity: fadeAnim }]}>
                <Text style={styles.errorText}>{authError}</Text>
              </Animated.View>
            )}

            <TouchableOpacity onPress={navigateToLogin} style={styles.loginLink}>
              <View style={styles.authLink}>
                <Text style={styles.loginText}>Есть аккаунт? </Text>
                <Text style={styles.accentText}>Войти</Text>
              </View>
            </TouchableOpacity>
            <View>
              <PrimaryButton title="Зарегистрироваться" onPress={handleRegisterPress} />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loginLink: {
    marginBottom: 20,
  },
  loginText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'VelaSans',
  },
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 15,
  },
  scrollContent: {
    flexGrow: 1,
  },
  logoView: {
    alignItems: 'center',
    marginBottom: 20,
  },
  appTitle: {
    fontSize: 28,
    color: '#FF3737',
    fontFamily: 'VelaSansBold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },
  greetText: {
    color: '#FF2424',
    fontSize: 24,
    fontFamily: 'VelaSansBold',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  bannerContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  inputsContainer: {
    width: '100%',
    marginBottom: 16,
  },
  textInput: {
    height: 56,
    borderRadius: 16,
    paddingHorizontal: 20,
    fontSize: 16,
    backgroundColor: '#242424',
    fontFamily: 'VelaSans',
    color: '#6B6B6B',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  loginInput: {
    marginBottom: 16,
  },
  passwordInput: {
    marginBottom: 12,
  },
  errorInput: {
    borderColor: '#FF1B44',
    borderWidth: 1,
  },
  errorContainer: {
    width: '100%',
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  errorText: {
    color: '#FF1B44',
    fontSize: 14,
    fontFamily: 'VelaSans',
    textAlign: 'left',
  },
  authLink: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accentText: {
    color: '#FF2424',
    fontSize: 14,
    fontFamily: 'VelaSans',
  },
});
