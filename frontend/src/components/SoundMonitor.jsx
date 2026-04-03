import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Mic, MicOff, AlertCircle } from 'lucide-react';

const SoundMonitor = () => {
  const [isListening, setIsListening] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [volume, setVolume] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const streamRef = useRef(null);
  const animationFrameRef = useRef(null);

  const THRESHOLD = 60; // Standard threshold

  const startListening = async () => {
    setErrorMsg('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaStreamSource(stream);

      analyser.fftSize = 256;
      source.connect(analyser);

      audioContextRef.current = audioContext;
      analyserRef.current = analyser;

      setIsListening(true);
      checkVolume();
    } catch (err) {
      console.error(err);
      setErrorMsg('Microphone access is required');
      setIsListening(false);
    }
  };

  const stopListening = () => {
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    if (streamRef.current) streamRef.current.getTracks().forEach(track => track.stop());
    if (audioContextRef.current) audioContextRef.current.close().catch(console.error);
    
    setIsListening(false);
    setVolume(0);
  };

  const checkVolume = () => {
    if (!analyserRef.current) return;
    
    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(dataArray);

    let sum = 0;
    for (let i = 0; i < dataArray.length; i++) sum += dataArray[i];
    const avgVolume = sum / dataArray.length;

    setVolume(avgVolume);

    if (avgVolume > THRESHOLD) {
      // Threshold breached -> Stop listening and show modal
      stopListening();
      setShowModal(true);
      return; 
    }

    animationFrameRef.current = requestAnimationFrame(checkVolume);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopListening();
    };
  }, []);

  const handleTriggerSOS = () => {
    // Basic SOS trigger without audio explicitly for Sound Detection
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const token = localStorage.getItem('token');
          await axios.post('http://localhost:5000/api/alerts', {
            latitude, longitude, status: 'active'
          }, {
            headers: { Authorization: `Bearer ${token}` }
          });
          alert("SOS Alert triggered successfully based on high sound.");
        } catch (e) {
          console.error(e);
          alert("Failed to send alert via sound trigger.");
        }
      },
      (error) => {
        alert("Location access is required to send SOS alert.");
      }
    );
    setShowModal(false);
  };

  return (
    <>
      <div className="card" style={{ padding: '25px', marginBottom: '20px', transition: 'all 0.3s ease' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', color: 'var(--text-primary)' }}>
          {isListening ? <Mic color="var(--success-color)" size={24} /> : <MicOff color="var(--text-secondary)" size={24} />}
          Sound Detection
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '20px' }}>
          Detects loud sounds and instantly suggests triggering SOS.
        </p>

        {errorMsg && <p style={{ color: 'var(--danger-color)', fontSize: '0.85rem', marginBottom: '15px' }}>{errorMsg}</p>}

        {/* Visual Bar */}
        <div style={{ background: 'rgba(0,0,0,0.05)', borderRadius: '8px', height: '12px', marginBottom: '20px', overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            width: Math.min(volume, 100) + '%',
            background: isListening ? 'var(--primary-color)' : 'transparent',
            transition: 'width 0.1s linear'
          }}></div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.9rem', color: isListening ? 'var(--primary-color)' : 'var(--text-secondary)', fontWeight: '600' }}>
            {isListening ? 'Listening...' : 'Inactive'}
          </span>
          
          <button 
            onClick={isListening ? stopListening : startListening}
            className="btn"
            style={{
              padding: '10px 20px', 
              fontSize: '0.95rem',
              background: isListening ? "transparent" : "var(--success-color)",
              border: isListening ? '1px solid var(--danger-color)' : 'none',
              color: isListening ? 'var(--danger-color)' : 'white'
            }}
          >
            {isListening ? 'Stop Listening' : 'Start Listening'}
          </button>
        </div>
      </div>

      {/* Modal Popup */}
      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          zIndex: 10000, padding: '20px'
        }}>
          <div style={{
            background: 'var(--surface-color)', padding: '30px', borderRadius: '16px',
            maxWidth: '400px', width: '100%', textAlign: 'center',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)', animation: 'slideIn 0.3s ease-out'
          }}>
            <AlertCircle size={50} color="var(--danger-color)" style={{ marginBottom: '15px' }} />
            <h3 style={{ marginBottom: '15px', color: 'var(--text-primary)', fontSize: '1.4rem' }}>High Sound Detected!</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '30px', lineHeight: '1.5' }}>
              We detected a sudden spike in ambient sound volume. Do you want to trigger SOS immediately?
            </p>
            
            <div style={{ display: 'flex', gap: '15px' }}>
              <button 
                onClick={() => setShowModal(false)}
                className="btn btn-outline"
                style={{ flex: 1, padding: '12px' }}
              >
                NO
              </button>
              <button 
                onClick={handleTriggerSOS}
                className="btn btn-primary"
                style={{ flex: 1, padding: '12px', background: 'var(--danger-color)' }}
              >
                YES, SOS
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SoundMonitor;
