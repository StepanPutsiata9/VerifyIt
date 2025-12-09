import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function AnswerScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const qrData = (params.qrData as string) || 'Данные не получены';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Результат сканирования</Text>
      <Text style={styles.data}>{qrData}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.navigate('/(root)/(tabs)/home')}
      >
        <Text style={styles.buttonText}>Назад</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 24,
    fontFamily: 'VelaSansBold',
    marginBottom: 20,
  },
  data: {
    fontSize: 18,
    fontFamily: 'VelaSansRegular',
    marginBottom: 30,
    textAlign: 'center',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '100%',
  },
  button: {
    backgroundColor: '#FF3737',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'VelaSansBold',
  },
});
