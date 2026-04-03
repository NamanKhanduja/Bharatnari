import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FakeCallModal from '../components/FakeCallModal';
import SOSButton from '../components/SOSButton';
import ContactsManager from '../components/ContactsManager';
import LocationShareButton from '../components/LocationShareButton';
import PlannerWidget from '../components/PlannerWidget';
import SoundMonitor from '../components/SoundMonitor';
import { syncOfflineAlerts } from '../utils/offlineSync';

const Dashboard = () => {
  const navigate = useNavigate();
  const [showFakeCall, setShowFakeCall] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    } else {
      // Whenever dashboard mounts and user is logged in, try to sync any offline alerts
      window.addEventListener('online', syncOfflineAlerts);
      syncOfflineAlerts(); // attempt once on mount

      return () => {
        window.removeEventListener('online', syncOfflineAlerts);
      };
    }
  }, [navigate]);

  return (
    <div style={{ paddingTop: '40px' }}>
      <h2 style={{ marginBottom: '20px' }}>Dashboard</h2>
      
      <div className="sos-button-container">
        <SOSButton />
      </div>
      <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>Press in case of emergency</p>

      <LocationShareButton />

      <div className="dashboard-grid">
        <div className="card">
          <h3>Fake Call</h3>
          <p style={{ marginBottom: '15px' }}>Simulate an incoming call.</p>
          <button 
            className="btn btn-outline" 
            style={{ width: '100%' }}
            onClick={() => setShowFakeCall(true)}
          >
            Trigger Fake Call
          </button>
        </div>
        <div className="card">
          <h3>Trusted Contacts</h3>
          <p style={{ marginBottom: '15px' }}>Manage who receives your SOS.</p>
          <ContactsManager />
        </div>
        <div className="card">
          <h3>Daily Planner</h3>
          <p style={{ marginBottom: '15px' }}>Manage your schedules securely.</p>
          <PlannerWidget />
        </div>
      </div>

      <SoundMonitor />

      {showFakeCall && <FakeCallModal onClose={() => setShowFakeCall(false)} />}
    </div>
  );
};

export default Dashboard;
