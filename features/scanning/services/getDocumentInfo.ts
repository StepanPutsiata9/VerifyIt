import { api } from '@/api';
import { IDocumentInfo } from '../types';
export const getDocumentInfo = async (qrInfo: string) => {
  const { data } = await api.get(`movies/${qrInfo}`);
  console.log('====================================');
  console.log('document info ', data);
  console.log('====================================');
  const document = data as IDocumentInfo;
  return document;
};
