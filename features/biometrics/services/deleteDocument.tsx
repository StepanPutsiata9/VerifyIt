import { api } from '@/api';
export const deleteDocument = async (id: string) => {
  console.log('====================================');
  console.log('id ', id);
  console.log('====================================');
  const { data } = await api.delete(`documents/${id}`);
  const isDelete = data as boolean;
  return isDelete;
};
