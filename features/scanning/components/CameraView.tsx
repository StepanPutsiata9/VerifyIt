import { AntDesign } from '@expo/vector-icons';
import { CameraView as ExpoCameraView } from 'expo-camera';
import React, { useEffect } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCameraScan } from '../hooks';

interface CameraViewProps {
  visible: boolean;
  onClose: () => void;
  onQRCodeScanned?: (data: string) => void;
  scanFrameColor?: string;
  instructionText?: string;
  showCloseButton?: boolean;
}

export const Camera: React.FC<CameraViewProps> = ({
  visible,
  onClose,
  onQRCodeScanned,
  scanFrameColor = '#FF3737',
  instructionText = 'Наведите камеру на QR-код',
  showCloseButton = true,
}) => {
  const {
    permission,
    scanned,
    isLoading,
    requestPermission,
    handleBarCodeScanned: handleScan,
    resetScan,
  } = useCameraScan();

  const handleBarCodeScanned = React.useCallback(
    ({ type, data }: { type: string; data: string }) => {
      handleScan(data, type);

      if (onQRCodeScanned) {
        onQRCodeScanned(data);
      }
    },
    [handleScan, onQRCodeScanned]
  );

  useEffect(() => {
    if (visible) {
      resetScan();
    }
  }, [visible, resetScan]);

  if (!permission) {
    return null;
  }

  if (!permission.granted) {
    return (
      <PermissionScreen
        visible={visible}
        onRequestPermission={requestPermission}
        onClose={onClose}
      />
    );
  }

  return (
    <Modal visible={visible} animationType="fade" statusBarTranslucent onRequestClose={onClose}>
      <View style={styles.container}>
        <ExpoCameraView
          style={StyleSheet.absoluteFillObject}
          zoom={0}
          autofocus="on"
          onBarcodeScanned={scanned || isLoading ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ['qr', 'pdf417'],
          }}
        />

        <View style={styles.overlay}>
          <ScanFrame color={scanFrameColor} />
          <Text style={styles.instructionText}>{instructionText}</Text>

          {(scanned || isLoading) && (
            <View style={styles.scannedIndicator}>
              <Text style={styles.scannedText}>
                {isLoading ? 'Обработка...' : 'QR-код распознан!'}
              </Text>
            </View>
          )}
        </View>

        {showCloseButton && (
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <AntDesign name="close" size={30} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </Modal>
  );
};

const ScanFrame: React.FC<{ color: string }> = ({ color }) => (
  <View style={styles.scanFrame}>
    <View style={[styles.corner, styles.topLeft, { borderColor: color }]} />
    <View style={[styles.corner, styles.topRight, { borderColor: color }]} />
    <View style={[styles.corner, styles.bottomLeft, { borderColor: color }]} />
    <View style={[styles.corner, styles.bottomRight, { borderColor: color }]} />
  </View>
);

const PermissionScreen: React.FC<{
  visible: boolean;
  onRequestPermission: () => void;
  onClose: () => void;
}> = ({ visible, onRequestPermission, onClose }) => (
  <Modal visible={visible} animationType="fade">
    <View style={styles.permissionContainer}>
      <Text style={styles.permissionText}>Для сканирования QR-кодов нужен доступ к камере</Text>
      <TouchableOpacity style={styles.permissionButton} onPress={onRequestPermission}>
        <Text style={styles.permissionButtonText}>Разрешить доступ</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.closePermissionButton} onPress={onClose}>
        <Text style={styles.closePermissionButtonText}>Закрыть</Text>
      </TouchableOpacity>
    </View>
  </Modal>
);

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
