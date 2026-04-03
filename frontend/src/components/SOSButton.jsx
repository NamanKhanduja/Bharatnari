import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { cacheAlert } from '../utils/offlineSync';

const SOSButton = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const handleSOS = async () => {
    setStatusMsg('Gathering location...');
    
    // 1. Get Location
    if (!navigator.geolocation) {
      setStatusMsg('Geolocation is not supported by your browser.');
      sendAlert(null, null, null);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setStatusMsg('Location acquired. Recording audio (10s max)...');
        startAudioRecording(latitude, longitude);
      },
      (error) => {
        setStatusMsg('Location access is required to send SOS alert');
      }
    );
  };

  const startAudioRecording = async (lat, lng) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        sendAlert(lat, lng, audioBlob);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);

      // Stop recording automatically after 10 seconds
      setTimeout(() => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
          mediaRecorderRef.current.stop();
          stream.getTracks().forEach(track => track.stop()); // stop microphone
          setIsRecording(false);
        }
      }, 10000);

    } catch (err) {
      console.error('Microphone access denied', err);
      setStatusMsg('Microphone blocked. Sending alert without audio.');
      sendAlert(lat, lng, null);
    }
  };

  const sendAlert = async (lat, lng, audioBlob) => {
    setStatusMsg('Sending alert...');
    try {
      const token = localStorage.getItem('token');
      
      if (!navigator.onLine) {
        // Offline mode
        cacheAlert({ latitude: lat, longitude: lng, timestamp: new Date().toISOString() });
        setStatusMsg('You are offline. Alert saved and will be sent automatically when internet returns.');
        return;
      }

      const formData = new FormData();
      if (lat && lng) {
        formData.append('latitude', lat);
        formData.append('longitude', lng);
      }
      if (audioBlob) {
        formData.append('audio', audioBlob, 'sos-audio.webm');
      }

      await axios.post('http://localhost:5000/api/alerts', formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setStatusMsg('Alert sent to trusted contacts');
      setTimeout(() => setStatusMsg(''), 5000);
      
    } catch (error) {
      console.error(error);
      setStatusMsg('Failed to send alert. Try again');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <button 
        className="sos-btn" 
        onClick={handleSOS}
        disabled={isRecording}
      >
        {isRecording ? 'RECORDING' : 'SOS'}
      </button>
      {statusMsg && <p style={{ marginTop: '20px', color: 'var(--primary-color)', fontWeight: 'bold' }}>{statusMsg}</p>}
    </div>
  );
};

export default SOSButton;
