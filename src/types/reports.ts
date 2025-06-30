
export interface Report {
  id: string;
  title: string;
  description: string;
  department: string;
  segment: string;
  proformaId: string;
  fields: ReportField[];
  data: ReportData[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  updatedBy: string;
}

export interface ReportField {
  id: string;
  name: string;
  type: 'text' | 'number' | 'date' | 'select';
  required: boolean;
  options?: string[];
}

export interface ReportData {
  id: string;
  [key: string]: any;
}

export interface AnalyticsConfig {
  id: string;
  name: string;
  reportIds: string[];
  selectedFields: AnalyticsField[];
  timeframe: 'weekly' | 'monthly' | 'quarterly' | 'half-yearly' | 'yearly';
  chartType: 'bar' | 'line' | 'pie' | 'area' | 'scatter';
}

export interface AnalyticsField {
  reportId: string;
  fieldId: string;
  columnName: string;
  rowNumber?: number;
}

export interface ISOCertificate {
  id: string;
  name: string;
  uploadDate: string;
  expiryDate: string;
  department: string;
  uploadedBy: string;
  fileUrl: string;
  status: 'active' | 'expiring' | 'expired';
}
