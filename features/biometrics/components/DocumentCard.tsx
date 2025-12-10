import { useScan } from '@/features/scanning';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useHistory } from '../hooks';
import { IDocumentInfo } from '../types';

interface DocumentCardProps {
  document: IDocumentInfo;
}
export const DocumentCard = ({ document }: DocumentCardProps) => {
  const { formatDate, getDocumentTypeName } = useHistory();
  const { setDataScan } = useScan();
  const router = useRouter();
  const handlePress = () => {
    setDataScan(document);
    router.push('/(root)/answer');
  };
  return (
    <TouchableOpacity
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
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#242424',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderLeftWidth: 6,
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
});
