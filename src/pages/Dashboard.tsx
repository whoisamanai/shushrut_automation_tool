import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { listPatients } from '../services/patientService';
import type { Patient } from '../types/patient';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!user) return;
      const rows = await listPatients(user.uid);
      setPatients(rows);
      setLoading(false);
    }

    void load();
  }, [user]);

  async function handleLogout() {
    await logout();
    navigate('/login');
  }

  return (
    <div className="page-wrap">
      <header className="header">
        <h1>Dashboard</h1>
        <div className="actions">
          <Link to="/new-patient" className="button-link">+ New Patient</Link>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <section className="card">
        <h2>Recent Patients</h2>
        {loading ? (
          <p>Loading records...</p>
        ) : patients.length === 0 ? (
          <p>No patient record yet.</p>
        ) : (
          <ul className="patient-list">
            {patients.map((patient) => (
              <li key={patient.id}>
                <strong>{patient.name}</strong> - {patient.mobile}
                <Link to={`/preview/${patient.id}`}>Preview</Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
