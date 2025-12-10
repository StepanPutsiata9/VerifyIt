import { GalleryLogo } from '@/features/shared';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as ImagePicker from 'expo-image-picker';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const UploadFromGalleryButton = () => {
  const pickImageAndScanQR = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Ошибка', 'Необходимо разрешение для доступа к галерее');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled && result.assets[0]) {
      try {
        const scannedData = await BarCodeScanner.scanFromURLAsync(result.assets[0].uri);
        if (scannedData.length > 0) {
          Alert.alert('QR-код найден', scannedData[0].data);
        } else {
          Alert.alert('QR-код не найден', 'На изображении не обнаружен QR-код');
        }
      } catch (error) {
        Alert.alert('Ошибка', 'Не удалось проанализировать изображение');
      }
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={pickImageAndScanQR}>
      <View style={styles.content}>
        <GalleryLogo />
        <Text style={styles.title}>Галерея</Text>
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
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 15,
  },
  title: {
    fontSize: 24,
    fontFamily: 'VelaSansBold',
    color: '#FF3737',
  },
});