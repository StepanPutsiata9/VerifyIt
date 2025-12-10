import { api } from '@/api';
import { IDocumentInfo } from '../types';
export const getHistory = async () => {
  const { data } = await api.get(`documents/history/all`);
  console.log('history ====================================');
  console.log(data);
  console.log('====================================');
  const documents = data as IDocumentInfo[];
  return documents;
};
