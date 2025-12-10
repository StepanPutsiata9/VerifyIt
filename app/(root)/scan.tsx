import { Camera, useScan } from '@/features/scanning';
import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';

export default function ScanScreen() {
  const { cameraVisible, handleClose, handleQRCodeScanned, isProcessing, setCameraVisible } =
    useScan();
  useFocusEffect(
    useCallback(() => {
      setCameraVisible(true);

      return () => {
        setCameraVisible(false);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  );

  return (
    <View style={styles.container}>
      <Camera
        visible={cameraVisible}
        onClose={handleClose}
        onQRCodeScanned={!isProcessing ? handleQRCodeScanned : undefined}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
});
