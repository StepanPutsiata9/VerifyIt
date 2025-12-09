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
