export interface IDocumentInfo {
  id: string;
  name: string;
  valid: boolean;
  expiresSoon: boolean;
  type: DocumentType;
  author: string;
  expirationDate: Date;
  createdAt: Date;
  historyId: string;
}

export type DocumentType =
  | 'CONTRACT'
  | 'INNOVICE'
  | 'ACT'
  | 'WAYBILL'
  | 'STATEMENT'
  | 'ORDER'
  | 'PROTOCOL'
  | 'CHARTER'
  | 'LETTER'
  | 'CV'
  | 'REPORT'
  | 'REFERENCE';
export interface HistoryState {
  historyData: IDocumentInfo[] | null;
  historyLoading: boolean;
  historyError: string | null;
}
