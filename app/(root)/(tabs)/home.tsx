import { useAuth } from '@/features/auth';
import { ScanningButton, UploadFromGalleryButton } from '@/features/scanning';
import { AppLogo } from '@/features/shared';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const HomeScreen = () => {
  const { handleLogoutPress } = useAuth();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.appBar}>
        {/* <View></View> */}
        <View style={styles.logoView}>
          <AppLogo />
          <Text style={styles.appTitle}>VerifyIt</Text>
        </View>
        <TouchableOpacity style={styles.logout} onPress={handleLogoutPress}>
          <MaterialIcons name="logout" size={32} color="#FF3737" />
        </TouchableOpacity>
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
  appBar: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  logout: {
    position: 'absolute',
    right: 16,
  },
});
export default HomeScreen;
