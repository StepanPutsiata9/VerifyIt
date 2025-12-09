import { StyleSheet, View } from 'react-native';

export const Header = () => {
  return (
    <View style={styles.header}>
      <View style={styles.block}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 16,
  },
  block: {
    width: 100,
    height: 50,
    backgroundColor: '#000',
  },
});
