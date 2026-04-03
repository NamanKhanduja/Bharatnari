import React, { useState } from 'react';
import axios from 'axios';
import { MapPin } from 'lucide-react';
import { cacheAlert } from '../utils/offlineSync';

const LocationShareButton = () => {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const shareLocation = async () => {
    setLoading(true);
    setMsg('Acquiring location...');
    
    if (!navigator.geolocation) {
      setMsg('Location access is required');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setMsg('Sending precaution alert...');
        
        try {
          const token = localStorage.getItem('token');
          if (!navigator.onLine) {
            cacheAlert({ latitude, longitude, status: 'precaution', timestamp: new Date().toISOString() });
            setMsg('Saved offline.');
            setLoading(false);
            return;
          }

          const formData = new FormData();
          formData.append('latitude', latitude);
          formData.append('longitude', longitude);
          formData.append('status', 'precaution');

          await axios.post('http://localhost:5000/api/alerts', formData, {
            headers: { 
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
            }
          });
          
          setMsg('Location shared successfully (Precaution)!');
          setTimeout(() => setMsg(''), 5000);
        } catch (error) {
          console.error(error);
          setMsg('Failed to share location. Try again');
        }
        setLoading(false);
      },
      (error) => {
        setMsg('Location access is required');
        setLoading(false);
      }
    );
  };

  return (
    <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <button 
        className="btn btn-outline" 
        onClick={shareLocation}
        disabled={loading}
        style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderColor: 'var(--success-color)', color: 'var(--success-color)' }}
      >
        <MapPin size={20} />
        {loading ? 'Sharing...' : 'Share Location as Precaution'}
      </button>
      {msg && <p style={{ fontSize: '14px', marginTop: '10px', color: 'var(--success-color)' }}>{msg}</p>}
    </div>
  );
};

export default LocationShareButton;
