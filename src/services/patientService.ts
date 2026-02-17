import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  type QueryDocumentSnapshot
} from 'firebase/firestore';
import { db } from './firebase';
import type { Patient, PatientInput } from '../types/patient';

function toPatient(snapshot: QueryDocumentSnapshot): Patient {
  return {
    id: snapshot.id,
    ...(snapshot.data() as Omit<Patient, 'id'>)
  };
}

function patientCollection(userId: string) {
  return collection(db, 'patients', userId, 'records');
}

export async function createPatient(userId: string, input: PatientInput): Promise<string> {
  const payload: Omit<Patient, 'id'> = {
    ...input,
    createdAt: Timestamp.now()
  };

  const created = await addDoc(patientCollection(userId), payload);
  return created.id;
}

export async function listPatients(userId: string): Promise<Patient[]> {
  const q = query(patientCollection(userId), orderBy('createdAt', 'desc'));
  const snapshots = await getDocs(q);
  return snapshots.docs.map(toPatient);
}

export async function getPatientById(userId: string, patientId: string): Promise<Patient | null> {
  const reference = doc(db, 'patients', userId, 'records', patientId);
  const snapshot = await getDoc(reference);
  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...(snapshot.data() as Omit<Patient, 'id'>)
  };
}
