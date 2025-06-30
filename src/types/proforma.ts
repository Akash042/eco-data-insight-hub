
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
  calculations?: MathCalculation[];
}

export interface MathCalculation {
  id: string;
  formula: string;
  result: number;
  appliedBy: string;
  appliedAt: string;
  description: string;
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
  status: 'not_assigned' | 'assigned' | 'in_progress' | 'sent_for_review' | 'submitted' | 'reopened';
  submittedAt?: string;
  reopenedBy?: string;
  reopenedAt?: string;
  lastModifiedAt?: string;
  lastModifiedBy?: string;
}

export type UserRole = 'Concern Staff' | 'SSE' | 'BO' | 'WPO';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  permissions: UserPermissions;
}

export interface UserPermissions {
  fillProforma: boolean;
  reviewEditComment: boolean;
  submitFinalProforma: boolean;
  reopenProforma: boolean;
  generateSegmentReport: boolean;
  generateDeptReport: boolean;
  generateEnvConsolidated: boolean;
  viewAllDashboards: boolean | 'dept';
  uploadISOCertificate: boolean;
  receiveISORenewalAlert: boolean;
}

export interface Department {
  id: string;
  name: string;
  color: string;
}

export interface MasterData {
  departments: Department[];
  roles: UserRole[];
  segments: string[];
}
