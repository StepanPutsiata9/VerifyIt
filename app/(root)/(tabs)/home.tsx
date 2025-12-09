import { ScanningButton, UploadFromGalleryButton } from '@/features/scanning';
import { AppLogo } from '@/features/shared';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoView}>
        <AppLogo />
        <Text style={styles.appTitle}>VerifyIt</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <ScanningButton />
        <UploadFromGalleryButton />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 15,
  },
  logoView: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 12,
  },
  appTitle: {
    fontSize: 32,
    color: '#FF3737',
    fontFamily: 'VelaSansBold',
  },
  buttonsContainer: {
    flex: 1,
    marginBottom: 100,
    flexDirection: 'column',
    gap: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default HomeScreen;
