import { GalleryLogo } from '@/features/shared';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const UploadFromGalleryButton = () => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => {}}>
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
// import { BarCodeScanner } from 'expo-barcode-scanner';
// import * as ImageManipulator from 'expo-image-manipulator';
// import * as ImagePicker from 'expo-image-picker';
// import React, { useState } from 'react';
// import { Alert, Button, Image, StyleSheet, View } from 'react-native';

// const PhotoUploader = () => {
//   const [image, setImage] = useState<string | null>(null);
//   const [scanning, setScanning] = useState(false);

//   const pickImage = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//       await scanQRFromImage(result.assets[0].uri);
//     }
//   };

//   const takePhoto = async () => {
//     const { status } = await ImagePicker.requestCameraPermissionsAsync();
//     if (status !== 'granted') {
//       Alert.alert('Нужно разрешение на камеру');
//       return;
//     }

//     const result = await ImagePicker.launchCameraAsync({
//       allowsEditing: true,
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//       await scanQRFromImage(result.assets[0].uri);
//     }
//   };

//   const scanQRFromImage = async (imageUri: string) => {
//     try {
//       const manipResult = await ImageManipulator.manipulateAsync(
//         imageUri,
//         [{ resize: { width: 800 } }],
//         { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
//       );

//       // Используем BarCodeScanner для сканирования из изображения
//       const scannedData = await BarCodeScanner.scanFromURLAsync(manipResult.uri);

//       if (scannedData.length > 0) {
//         const qrData = scannedData[0].data;
//         await sendToEndpoint(qrData);
//       } else {
//         Alert.alert('QR/Barcode не найден', 'Попробуйте другое изображение');
//       }
//       // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     } catch (error) {
//       Alert.alert('Ошибка сканирования', 'Не удалось отсканировать код');
//     }
//   };

//   const startLiveScanning = async () => {
//     const { status } = await BarCodeScanner.requestPermissionsAsync();
//     if (status !== 'granted') {
//       Alert.alert('Нужно разрешение на камеру');
//       return;
//     }
//     setScanning(true);
//   };

//   const handleBarCodeScanned = async ({ data }: { data: string }) => {
//     setScanning(false);
//     await sendToEndpoint(data);
//   };

//   const sendToEndpoint = async (qrData: string) => {
//     try {
//       const response = await fetch(`YOUR_API_URL/documents/${qrData}`, {
//         method: 'GET', // или POST если нужно
//         headers: {
//           'Content-Type': 'application/json',
//           // Добавьте авторизацию если нужно
//           // 'Authorization': `Bearer ${token}`
//         },
//       });

//       if (response.ok) {
//         const result = await response.json();
//         Alert.alert('Успешно', 'Документ найден и обработан');
//         // Обработайте результат
//         console.log(result);
//       } else {
//         Alert.alert('Ошибка', 'Документ не найден');
//       }
//       // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     } catch (error) {
//       Alert.alert('Ошибка сети', 'Не удалось отправить запрос');
//     }
//   };

//   if (scanning) {
//     return (
//       <View style={styles.container}>
//         <BarCodeScanner
//           onBarCodeScanned={handleBarCodeScanned}
//           style={StyleSheet.absoluteFillObject}
//         />
//         <Button title="Отмена" onPress={() => setScanning(false)} />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       {image && <Image source={{ uri: image }} style={styles.image} />}

//       <Button title="Выбрать из галереи" onPress={pickImage} />
//       <Button title="Сделать фото" onPress={takePhoto} />
//       <Button title="Сканировать QR в реальном времени" onPress={startLiveScanning} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//   },
//   image: {
//     width: 200,
//     height: 200,
//     marginBottom: 20,
//   },
// });

// export default PhotoUploader;
