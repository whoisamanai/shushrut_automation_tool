import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getPatientById } from '../services/patientService';
import type { Patient } from '../types/patient';

export default function Preview() {
  const { id } = useParams();
  const { user } = useAuth();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPatient() {
      if (!user || !id) return;
      const data = await getPatientById(user.uid, id);
      setPatient(data);
      setLoading(false);
    }

    void fetchPatient();
  }, [user, id]);

  if (loading) return <p className="centered">Loading preview...</p>;
  if (!patient) return <p className="centered">Record not found.</p>;

  return (
    <div className="page-wrap">
      <div className="card print-area">
        <h1>OPD Slip</h1>
        <p><strong>Name:</strong> {patient.name}</p>
        <p><strong>Father Name:</strong> {patient.fatherName}</p>
        <p><strong>Address:</strong> {patient.address}</p>
        <p><strong>Mobile:</strong> {patient.mobile}</p>
        <p><strong>Complaint:</strong> {patient.complaint}</p>
        <p><strong>Date:</strong> {patient.createdAt.toDate().toLocaleString()}</p>
      </div>

      <div className="actions">
        <button onClick={() => window.print()}>Print</button>
        <Link className="button-link" to="/dashboard">Back to Dashboard</Link>
      </div>
    </div>
  );
}
