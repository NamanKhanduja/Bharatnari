import axios from 'axios';

// Cache an alert locally
export const cacheAlert = (alertData) => {
  const existing = JSON.parse(localStorage.getItem('offline_alerts') || '[]');
  existing.push(alertData);
  localStorage.setItem('offline_alerts', JSON.stringify(existing));
  console.log('Alert cached offline.');
};

// Attempt to sync all cached alerts
export const syncOfflineAlerts = async () => {
  const existing = JSON.parse(localStorage.getItem('offline_alerts') || '[]');
  if (existing.length === 0) return;

  const token = localStorage.getItem('token');
  if (!token) return;

  console.log(`Attempting to sync ${existing.length} offline alerts...`);
  
  const failedAlerts = [];
  
  for (const alertData of existing) {
    try {
      // alertData contains { latitude, longitude, timestamp }
      await axios.post('http://localhost:5000/api/alerts', alertData, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (err) {
      console.error('Failed to sync alert', err);
      failedAlerts.push(alertData);
    }
  }

  localStorage.setItem('offline_alerts', JSON.stringify(failedAlerts));
  if (failedAlerts.length === 0) {
    console.log('All offline alerts synced successfully!');
  }
};
