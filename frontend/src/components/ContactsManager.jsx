import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContactsManager = () => {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const token = localStorage.getItem('token');

  const fetchContacts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/contacts', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setContacts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isOpen) fetchContacts();
  }, [isOpen]);

  const addContact = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/contacts', { name, phone }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setName('');
      setPhone('');
      fetchContacts();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteContact = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/contacts/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchContacts();
    } catch (err) {
      console.error(err);
    }
  };

  if (!isOpen) return <button className="btn btn-outline" style={{width: '100%'}} onClick={() => setIsOpen(true)}>Manage Contacts</button>;

  return (
    <div style={{ marginTop: '10px' }}>
      <button className="btn btn-outline" style={{marginBottom: '15px'}} onClick={() => setIsOpen(false)}>Close Contacts</button>
      
      <form onSubmit={addContact} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Contact Name" 
          value={name} 
          onChange={(e)=>setName(e.target.value)} 
          required 
          style={{ padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)', color: 'white', width: '100%', outline: 'none' }}
        />
        <input 
          type="tel" 
          placeholder="Phone Number" 
          value={phone} 
          onChange={(e)=>setPhone(e.target.value)} 
          required 
          style={{ padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)', color: 'white', width: '100%', outline: 'none' }}
        />
        <button type="submit" className="btn btn-primary" style={{ padding: '10px', borderRadius: '8px', marginTop: '5px' }}>Add Contact</button>
      </form>

      <div>
        {contacts.length === 0 ? <p style={{fontSize:'14px', color:'#888'}}>No contacts added yet.</p> : null}
        {contacts.map(c => (
          <div key={c._id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #333' }}>
            <div>
              <p style={{margin: 0, fontWeight: 'bold'}}>{c.name}</p>
              <p style={{margin: 0, fontSize: '12px', color: '#888'}}>{c.phone}</p>
            </div>
            <button 
              onClick={() => deleteContact(c._id)}
              style={{ background: 'transparent', border: 'none', color: 'var(--danger-color)', cursor: 'pointer' }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactsManager;
