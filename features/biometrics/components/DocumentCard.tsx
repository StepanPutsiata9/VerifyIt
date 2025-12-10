import { useScan } from '@/features/scanning';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, { SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { useHistory } from '../hooks';
import { IDocumentInfo } from '../types';
interface DocumentCardProps {
  document: IDocumentInfo;
}
export const DocumentCard = ({ document }: DocumentCardProps) => {
  const { formatDate, getDocumentTypeName, handleDeleteDocument } = useHistory();
  const { setDataScan } = useScan();

  const router = useRouter();
  if (!document) {
    return null;
  }
  const handlePress = () => {
    setDataScan(document);
    router.push('/(root)/answer');
  };
  return (
    <ReanimatedSwipeable
      friction={2}
      overshootRight={false}
      enableTrackpadTwoFingerGesture
      rightThreshold={0}
      renderRightActions={(drag) =>
        RightAction(drag, () => handleDeleteDocument(document.historyId))
      }
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={handlePress}
        style={[
          styles.container,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            borderLeftColor:
              document.valid && !document.expiresSoon
                ? '#00FF00'
                : document.valid && document.expiresSoon
                ? '#E6E33B'
                : '#E63B3B',
          },
        ]}
      >
        <View style={styles.firstLine}>
          <Text style={styles.name}>{document.name}</Text>
          <Text style={styles.date}>{formatDate(document.createdAt)}</Text>
        </View>
        <View style={styles.lastLine}>
          <Text style={styles.field}>Тип: {getDocumentTypeName(document.type)}</Text>
          <Text style={styles.field}>Автор: {document.author}</Text>
        </View>
      </TouchableOpacity>
    </ReanimatedSwipeable>
  );
};

function RightAction(drag: SharedValue<number>, onPress: () => void) {
  const styleAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: drag.value }],
    };
  });
  return (
    <Reanimated.View style={[styleAnimation, styles.deleteButton]}>
      <TouchableOpacity style={styles.deleteContent} onPress={onPress} activeOpacity={0.7}>
        <FontAwesome name="trash-o" size={32} color="white" />
        <Text style={styles.deleteText}>Удалить</Text>
      </TouchableOpacity>
    </Reanimated.View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginHorizontal: 'auto',
    backgroundColor: '#242424',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderLeftWidth: 6,
    height: 125,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center',
    width: 130,
    height: 125,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    marginRight: 16,
    marginLeft: -35,
    elevation: 3,
  },
  firstLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontFamily: 'VelaSans',
    color: '#fff',
  },
  date: {
    fontFamily: 'VelaSans',
    color: '#B3B3B3',
    fontSize: 14,
  },
  lastLine: {
    flexDirection: 'column',
    gap: 12,
  },
  field: {
    fontFamily: 'VelaSans',
    color: '#ffffff',
    fontSize: 14,
  },
  deleteContent: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  deleteText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontFamily: 'Montserrat',
    textAlign: 'center',
  },
});
