import { useAuth, useAuthValidation } from '@/features/auth';
import { AppLogo, AuthBanner, PrimaryButton } from '@/features/shared';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Animated, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const router = useRouter();
  const [loginText, setLoginText] = useState<string>('');
  const [passwordText, setPasswordText] = useState<string>('');

  const { authError, fadeAnim, clearError } = useAuthValidation();
  const { handleLogin } = useAuth();

  const handleInputChange = () => {
    if (authError) {
      clearError();
    }
  };

  const handleLoginPress = () => {
    handleLogin(loginText, passwordText);
  };

  const navigateToRegistration = () => {
    router.push('/(auth)/registration');
    clearError();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContent}
        bottomOffset={75}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoView}>
          <AppLogo />
          <Text style={styles.appTitle}>VerifyIt</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.greetText}>Вход в аккаунт</Text>

          <View style={styles.bannerContainer}>
            <AuthBanner />
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
                placeholderTextColor={'#9E9B9B'}
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
                placeholderTextColor={'#9E9B9B'}
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="done"
                onSubmitEditing={handleLoginPress}
              />
            </View>

            {authError && (
              <Animated.View style={[styles.errorContainer, { opacity: fadeAnim }]}>
                <Text style={styles.errorText}>{authError}</Text>
              </Animated.View>
            )}

            <TouchableOpacity onPress={navigateToRegistration} style={styles.registrationLink}>
              <View style={styles.registrationLinkView}>
                <Text style={styles.questionText}>Нет аккаунта? </Text>
                <Text style={styles.accentText}>Зарегистрироваться</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push('/(auth)/greeting')}
              style={styles.forgetPasswordLink}
            >
              <View style={styles.forgetPasswordLinkView}>
                <Text style={styles.questionText}>Забыли пароль? </Text>
                <Text style={styles.accentText}>Восстановить</Text>
              </View>
            </TouchableOpacity>
            <View>
              <PrimaryButton title="Войти" onPress={handleLoginPress} />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    color: '#ffffff',
    fontSize: 24,
    fontFamily: 'VelaSansBold',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  appTitle: {
    fontSize: 28,
    color: '#FF3737',
    fontFamily: 'VelaSansBold',
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
    marginBottom: 0,
  },
  questionText: {
    color: '#fff',
    fontFamily: 'VelaSans',
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
  registrationLink: {
    marginBottom: 10,
  },
  registrationLinkView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  forgetPasswordLink: {
    marginBottom: 24,
  },
  forgetPasswordLinkView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accentText: {
    color: '#FF2424',
    fontSize: 14,
    fontFamily: 'VelaSansRegular',
  },
});
