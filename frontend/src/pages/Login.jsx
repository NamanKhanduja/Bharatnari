import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [tab, setTab] = useState('password'); // 'password' | 'otp'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login-password', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setMsg(err.response?.data?.error || 'Invalid credentials');
    }
    setLoading(false);
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    try {
      await axios.post('http://localhost:5000/api/auth/send-otp', { email });
      setStep(2);
      setMsg(`OTP sent to your email!`);
    } catch (err) {
      setMsg(err.response?.data?.error || 'Failed to send OTP');
    }
    setLoading(false);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/verify-otp', { email, otp });
      if (res.data.isNewUser) {
        setStep(3); // Prompt for password creation
        setMsg('OTP Verified! Please explicitly set a secure password for future logins.');
      } else {
        localStorage.setItem('token', res.data.token);
        navigate('/dashboard');
      }
    } catch (err) {
      setMsg(err.response?.data?.error || 'Invalid OTP');
    }
    setLoading(false);
  };

  const handleSetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/set-password', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setMsg(err.response?.data?.error || 'Failed to secure password');
    }
    setLoading(false);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '80px', padding: '0 20px' }}>
      <div className="card" style={{ width: '100%', maxWidth: '450px', padding: '40px' }}>
        <h2 style={{ marginBottom: '20px', textAlign: 'center', fontSize: '1.8rem', color: 'var(--text-primary)' }}>Welcome Back</h2>
        
        {/* Tab Selection */}
        {step === 1 && (
          <div style={{ display: 'flex', marginBottom: '25px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #cbd5e1' }}>
            <button 
              onClick={() => { setTab('password'); setMsg(''); }}
              style={{ flex: 1, padding: '12px', outline: 'none', border: 'none', cursor: 'pointer', fontWeight: '600',
                       background: tab === 'password' ? 'var(--secondary-color)' : 'white',
                       color: tab === 'password' ? 'var(--primary-color)' : 'var(--text-secondary)',
                       transition: 'all 0.2s' }}
            >
              Password
            </button>
            <button 
              onClick={() => { setTab('otp'); setMsg(''); }}
              style={{ flex: 1, padding: '12px', outline: 'none', border: 'none', cursor: 'pointer', fontWeight: '600',
                       background: tab === 'otp' ? 'var(--secondary-color)' : 'white',
                       color: tab === 'otp' ? 'var(--primary-color)' : 'var(--text-secondary)',
                       transition: 'all 0.2s' }}
            >
              Email OTP
            </button>
          </div>
        )}

        {msg && <p style={{ color: msg.includes('sent') || msg.includes('Verified') ? 'var(--success-color)' : 'var(--danger-color)', marginBottom: '20px', textAlign: 'center', fontSize: '14px', background: 'rgba(0,0,0,0.02)', padding: '10px', borderRadius: '8px' }}>{msg}</p>}
        
        {tab === 'password' && step === 1 && (
          <form onSubmit={handlePasswordLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontWeight: '600', color: 'var(--text-primary)' }}>Email Address</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" style={{ padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontWeight: '600', color: 'var(--text-primary)' }}>Password</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" style={{ padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }} />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px', fontSize: '16px', background: 'var(--primary-color)' }} disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        )}

        {tab === 'otp' && step === 1 && (
          <form onSubmit={handleSendOtp} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontWeight: '600', color: 'var(--text-primary)' }}>Email Address</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" style={{ padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }} />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px', fontSize: '16px' }} disabled={loading}>
              {loading ? 'Sending...' : 'Send OTP'}
            </button>
          </form>
        )}

        {tab === 'otp' && step === 2 && (
          <form onSubmit={handleVerifyOtp} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontWeight: '600', color: 'var(--text-primary)' }}>Enter exactly 6-digit OTP</label>
              <input type="text" required value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="000000" style={{ padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', letterSpacing: '4px', textAlign: 'center', fontSize: '18px' }} />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px', fontSize: '16px' }} disabled={loading}>
              {loading ? 'Verifying...' : 'Verify Email'}
            </button>
            <button type="button" onClick={() => setStep(1)} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', marginTop: '-10px' }}>Cancel</button>
          </form>
        )}

        {tab === 'otp' && step === 3 && (
          <form onSubmit={handleSetPassword} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontWeight: '600', color: 'var(--text-primary)' }}>Create a Password</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Minimum 6 characters" style={{ padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }} />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px', fontSize: '16px', background: 'var(--success-color)' }} disabled={loading}>
              {loading ? 'Saving...' : 'Set Password & Login'}
            </button>
          </form>
        )}

      </div>
    </div>
  );
};

export default Login;
