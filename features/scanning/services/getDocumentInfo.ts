import { api } from '@/api';
import { IDocumentInfo } from '../types';
export const getDocumentInfo = async (qrInfo: string) => {
  const { data } = await api.get(`documents/${qrInfo}`);
  const document = data as IDocumentInfo;
  return document;
};
