import LottieView from 'lottie-react-native';
import { Modal, StyleSheet, View } from 'react-native';
export function LoadingModal({ visible }: { visible: boolean }) {
  return (
    <Modal visible={visible} transparent={true} animationType="fade" statusBarTranslucent={true}>
      <View style={styles.modalContainer}>
        <LottieView
          autoPlay
          style={styles.animation}
          source={require('@/assets/animations/loader.json')}
        />
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  animation: {
    width: 75,
    height: 75,
  },
});
