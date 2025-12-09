import { AntDesign } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface CameraProps {
  visible: boolean;
  onClose: () => void;
  onQRCodeScanned?: (data: string) => void;
}

export const Camera: React.FC<CameraProps> = ({ visible, onClose, onQRCodeScanned }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    if (visible) {
      requestPermission();
      setScanned(false);
    }
  }, [visible]);

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    if (!scanned && onQRCodeScanned) {
      setScanned(true);
      console.log(`QR-код типа ${type} отсканирован: ${data}`);

      if (onQRCodeScanned) {
        onQRCodeScanned(data);
      }
    }
  };

  if (!permission) {
    return null;
  }

  if (!permission.granted) {
    return (
      <Modal visible={visible} animationType="fade" statusBarTranslucent={true}>
        <View style={styles.permissionContainer}>
          <Text style={styles.permissionText}>Для сканирования QR-кодов нужен доступ к камере</Text>
          <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
            <Text style={styles.permissionButtonText}>Разрешить доступ</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closePermissionButton} onPress={onClose}>
            <Text style={styles.closePermissionButtonText}>Закрыть</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }

  return (
    <Modal
      visible={visible}
      animationType="fade"
      statusBarTranslucent={true}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <CameraView
          style={StyleSheet.absoluteFillObject}
          zoom={0}
          autofocus="on"
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ['qr', 'pdf417'],
          }}
        />

        <View style={styles.overlay}>
          <View style={styles.scanFrame}>
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />
          </View>

          <Text style={styles.instructionText}>Наведите камеру на QR-код</Text>

          {scanned && (
            <View style={styles.scannedIndicator}>
              <Text style={styles.scannedText}>QR-код распознан! Переходим...</Text>
            </View>
          )}
        </View>
        <TouchableOpacity style={styles.closeBtn} onPress={onClose} activeOpacity={0.7}>
          <AntDesign name="close" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    position: 'relative',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanFrame: {
    width: 250,
    height: 250,
    position: 'relative',
    backgroundColor: 'transparent',
  },
  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: '#FF3737',
  },
  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 4,
    borderRightWidth: 4,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
  },
  instructionText: {
    color: 'white',
    fontSize: 16,
    marginTop: 30,
    textAlign: 'center',
    fontFamily: 'VelaSansRegular',
  },
  scannedIndicator: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'rgba(255, 55, 55, 0.8)',
    borderRadius: 20,
  },
  scannedText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'VelaSansSemiBold',
  },
  closeBtn: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  permissionText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: 'VelaSansRegular',
    lineHeight: 24,
  },
  permissionButton: {
    backgroundColor: '#FF3737',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 15,
    minWidth: 200,
    alignItems: 'center',
  },
  permissionButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'VelaSansBold',
  },
  closePermissionButton: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FF3737',
    minWidth: 200,
    alignItems: 'center',
  },
  closePermissionButtonText: {
    color: '#FF3737',
    fontSize: 16,
    fontFamily: 'VelaSansBold',
  },
});
