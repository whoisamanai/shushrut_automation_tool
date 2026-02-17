import type { Timestamp } from 'firebase/firestore';

export interface Patient {
  id?: string;
  name: string;
  fatherName: string;
  address: string;
  mobile: string;
  complaint: string;
  createdAt: Timestamp;
}

export interface PatientInput {
  name: string;
  fatherName: string;
  address: string;
  mobile: string;
  complaint: string;
}
