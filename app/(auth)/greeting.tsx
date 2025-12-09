import { useAuthValidation, useRegistrationValidation } from '@/features/auth';
import { AppLogo, GreetingBanner, PrimaryButton, SecondaryButton } from '@/features/shared';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function GrettingScreen() {
  const router = useRouter();
  const { clearError: clearErorrAuth } = useAuthValidation();
  const { clearError: clearErorrRegistration } = useRegistrationValidation();
  const navigateToLogin = () => {
    router.push('/(auth)/login');
    clearErorrAuth();
  };
  const navigateToRegistration = () => {
    router.push('/(auth)/registration');
    clearErorrRegistration();
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoView}>
        <AppLogo />
        <Text style={styles.appTitle}>VerifyIt</Text>
      </View>
      <View style={styles.greetingView}>
        <Text style={styles.greetingText}>Добро пожаловать!</Text>
      </View>
      <View style={styles.bannerView}>
        <GreetingBanner />
      </View>
      <View style={styles.buttonsContainer}>
        <PrimaryButton title="Войти" onPress={navigateToLogin} />
        <SecondaryButton title="Зарегистрироваться" onPress={navigateToRegistration} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
  },
  greetingView: {
    marginBottom: 12,
  },
  greetingText: {
    color: '#ffffff',
    fontSize: 24,
    fontFamily: 'VelaSansRegular',
    textAlign: 'center',
    letterSpacing: 1,
  },
  appTitle: {
    fontSize: 28,
    color: '#FF3737',
    fontFamily: 'VelaSansBold',
  },
  buttonsContainer: {
    flexDirection: 'column',
    gap: 16,
    width: '80%',
  },
  logoView: {
    alignItems: 'center',
    marginBottom: 20,
  },

  bannerView: {
    marginBottom: 40,
  },
});
