import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { createPatient } from '../services/patientService';

export default function PatientForm() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [address, setAddress] = useState('');
  const [mobile, setMobile] = useState('');
  const [complaint, setComplaint] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError('');

    if (!user) {
      setError('Please login again.');
      return;
    }

    try {
      const id = await createPatient(user.uid, { name, fatherName, address, mobile, complaint });
      navigate(`/preview/${id}`);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  return (
    <div className="page-wrap">
      <form className="card form" onSubmit={handleSubmit}>
        <h1>Register New Patient</h1>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Patient Name" required />
        <input value={fatherName} onChange={(e) => setFatherName(e.target.value)} placeholder="Father/Guardian Name" required />
        <textarea value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" required rows={3} />
        <input value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="Mobile Number" required />
        <textarea value={complaint} onChange={(e) => setComplaint(e.target.value)} placeholder="Chief Complaint" required rows={3} />
        {error && <p className="error">{error}</p>}
        <button type="submit">Save & Preview</button>
      </form>
    </div>
  );
}
