import { ScannerLogo } from '@/features/shared';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const ScanningButton = () => {
  const router = useRouter();

  const handlePress = () => {
    router.push('/(root)/scan');
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress} activeOpacity={0.8}>
      <View style={styles.content}>
        <ScannerLogo />
        <Text style={styles.title}>Сканер</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: '#FF3737',
    borderRadius: 20,
    backgroundColor: '#FF3737',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 15,
  },
  title: {
    fontSize: 24,
    fontFamily: 'VelaSansBold',
    color: '#ffffff',
  },
});
