import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, Clock, Edit3, Bell, CheckCircle, Circle } from 'lucide-react';

const PlannerWidget = () => {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const token = localStorage.getItem('token');

  const fetchEvents = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/planner', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEvents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isOpen) fetchEvents();
  }, [isOpen]);

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 6000);
  };

  const addEvent = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/planner', { title, date, time }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTitle('');
      setDate('');
      setTime('');
      fetchEvents();
    } catch (err) {
      console.error(err);
    }
  };

  const toggleEventStatus = async (eventObj) => {
    try {
      const newStatus = eventObj.status === 'completed' ? 'pending' : 'completed';
      await axios.patch(`http://localhost:5000/api/planner/${eventObj._id}`, 
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` }}
      );
      fetchEvents();
    } catch (err) {
      console.error(err);
    }
  };

  // The simplified Google Calendar UI wrapper component
  if (!isOpen) return (
    <button 
      className="btn btn-outline" 
      style={{ width: '100%', borderColor: 'var(--primary-color)' }} 
      onClick={() => setIsOpen(true)}
    >
      Open Planner
    </button>
  );

  return (
    <div style={{ position: 'relative', marginTop: '10px' }}>
      
      {/* Toast Notification */}
      {toastMsg && (
        <div style={{
          position: 'fixed', top: '20px', right: '20px', background: 'var(--surface-color)', 
          boxShadow: '0 10px 40px rgba(37,99,235,0.2)', padding: '15px 25px', borderRadius: '12px',
          display: 'flex', alignItems: 'center', gap: '15px', zIndex: 10000,
          borderLeft: '4px solid var(--primary-color)', animation: 'slideIn 0.3s ease-out'
        }}>
          <Bell color="var(--primary-color)" size={24} className="ring-animation" />
          <p style={{ fontWeight: '600', color: 'var(--text-primary)', margin: 0 }}>{toastMsg}</p>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(false)}
        style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', marginBottom: '15px', fontSize: '14px', fontWeight: '500' }}
      >
        ← Back to Dashboard
      </button>

      {/* Add Event Form Box */}
      <form onSubmit={addEvent} style={{ 
        display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px', 
        background: 'rgba(37, 99, 235, 0.03)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(37, 99, 235, 0.1)'
      }}>
        <div className="input-group-modern" style={{ display: 'flex', alignItems: 'center', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '0 12px' }}>
          <Edit3 size={18} color="var(--text-secondary)" />
          <input 
            type="text" placeholder="Event Title" value={title} onChange={(e)=>setTitle(e.target.value)} required 
            style={{ padding: '12px', border: 'none', background: 'transparent', width: '100%', outline: 'none', color: 'var(--text-primary)' }}
          />
        </div>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <div className="input-group-modern" style={{ flex: 1, display: 'flex', alignItems: 'center', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '0 12px' }}>
            <Calendar size={18} color="var(--text-secondary)" />
            <input 
              type="date" value={date} onChange={(e)=>setDate(e.target.value)} required 
              style={{ padding: '12px', border: 'none', background: 'transparent', width: '100%', outline: 'none', color: 'var(--text-secondary)' }}
            />
          </div>
          <div className="input-group-modern" style={{ flex: 1, display: 'flex', alignItems: 'center', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '0 12px' }}>
            <Clock size={18} color="var(--text-secondary)" />
            <input 
              type="time" value={time} onChange={(e)=>setTime(e.target.value)} required 
              style={{ padding: '12px', border: 'none', background: 'transparent', width: '100%', outline: 'none', color: 'var(--text-secondary)' }}
            />
          </div>
        </div>
        
        <button type="submit" className="btn btn-primary" style={{ width: '100%', background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))', marginTop: '5px' }}>
          Add Event
        </button>
      </form>

      {/* Events List */}
      <div>
        {events.length === 0 ? <p style={{fontSize:'14px', color:'var(--text-secondary)', textAlign: 'center'}}>No events scheduled.</p> : null}
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {events.map(e => {
            const isDone = e.status === 'completed';
            return (
              <div key={e._id} style={{ 
                display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', 
                background: isDone ? 'rgba(0,0,0,0.02)' : 'var(--surface-color)', 
                borderRadius: '10px',
                border: '1px solid rgba(0,0,0,0.05)',
                boxShadow: isDone ? 'none' : '0 4px 12px rgba(0, 0, 0, 0.02)',
                opacity: isDone ? 0.6 : 1, transition: 'all 0.3s ease'
              }}>
                <div onClick={() => toggleEventStatus(e)} style={{ cursor: 'pointer', flexShrink: 0, marginTop: '2px' }}>
                  {isDone ? <CheckCircle size={22} color="var(--success-color)" /> : <Circle size={22} color="#cbd5e1" />}
                </div>
                
                <div style={{ flex: 1 }}>
                  <p style={{
                    margin: 0, fontWeight: '600', color: 'var(--text-primary)', fontSize: '1.05rem',
                    textDecoration: isDone ? 'line-through' : 'none'
                  }}>
                    {e.title}
                  </p>
                  <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Calendar size={12} /> {e.date}
                    <Clock size={12} style={{ marginLeft: '5px' }}/> {e.time}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
{/* Added inline styles for animations */}
<style>{`
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes ring {
    0% { transform: rotate(0); }
    10% { transform: rotate(15deg); }
    20% { transform: rotate(-15deg); }
    30% { transform: rotate(10deg); }
    40% { transform: rotate(-10deg); }
    50% { transform: rotate(5deg); }
    60% { transform: rotate(-5deg); }
    70% { transform: rotate(0); }
    100% { transform: rotate(0); }
  }
  .ring-animation {
    animation: ring 2s infinite;
    transform-origin: top center;
  }
`}</style>
    </div>
  );
};

export default PlannerWidget;
