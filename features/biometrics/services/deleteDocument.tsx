import { api } from '@/api';
export const deleteDocument = async (id: string) => {
  const { data } = await api.delete(`documents/${id}`);
  const isDelete = data as boolean;
  return isDelete;
};
