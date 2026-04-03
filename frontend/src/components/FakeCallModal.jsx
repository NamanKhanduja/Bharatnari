import React from 'react';
import { Phone, PhoneOff, User } from 'lucide-react';

const FakeCallModal = ({ onClose }) => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: '#0a0a0a',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '60px 20px',
      zIndex: 9999
    }}>
      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <h2 style={{ fontSize: '32px', marginBottom: '10px', fontWeight: '400' }}>Dad</h2>
        <p style={{ color: '#aaa', fontSize: '18px' }}>Mobile +91 98765 43210</p>
      </div>

      <div style={{
        width: '120px',
        height: '120px',
        borderRadius: '50%',
        backgroundColor: '#333',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 'auto',
        marginTop: '60px'
      }}>
        <User size={64} color="#888" />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', maxWidth: '300px', marginBottom: '40px' }}>
        <button 
          onClick={onClose}
          style={{
            width: '70px',
            height: '70px',
            borderRadius: '50%',
            backgroundColor: '#ff3b30',
            border: 'none',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer'
          }}
        >
          <PhoneOff size={32} color="white" />
        </button>
        
        <button 
          onClick={onClose}
          style={{
            width: '70px',
            height: '70px',
            borderRadius: '50%',
            backgroundColor: '#34c759',
            border: 'none',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            animation: 'shake 1s infinite'
          }}
        >
          <Phone size={32} color="white" />
        </button>
      </div>
      <style>{`
        @keyframes shake {
          0% { transform: rotate(0deg); }
          25% { transform: rotate(10deg); }
          50% { transform: rotate(0deg); }
          75% { transform: rotate(-10deg); }
          100% { transform: rotate(0deg); }
        }
      `}</style>
    </div>
  );
};

export default FakeCallModal;
