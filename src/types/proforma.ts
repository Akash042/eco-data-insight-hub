
export interface ProformaField {
  id: string;
  name: string;
  type: 'text' | 'number' | 'date' | 'select';
  required: boolean;
  options?: string[];
}

export interface ProformaData {
  id: string;
  [key: string]: any;
}

export interface ProformaRow {
  id: string;
  data: ProformaData;
  comments: ProformaComment[];
  status: 'draft' | 'submitted' | 'reviewed' | 'approved';
  submittedBy?: string;
  submittedAt?: string;
  reviewedBy?: string;
  reviewedAt?: string;
}

export interface ProformaComment {
  id: string;
  rowId: string;
  fieldId: string;
  comment: string;
  author: string;
  createdAt: string;
}

export interface Proforma {
  id: string;
  title: string;
  description: string;
  department: string;
  segment: string;
  fields: ProformaField[];
  rows: ProformaRow[];
  assignedTo: string[];
  createdBy: string;
  createdAt: string;
  deadline: string;
  status: 'draft' | 'active' | 'submitted' | 'closed' | 'reopened';
  submittedAt?: string;
  reopenedBy?: string;
  reopenedAt?: string;
}

export type UserRole = 'Concern Staff' | 'SSE' | 'BO' | 'WPO';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
}
