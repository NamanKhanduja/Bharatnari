import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Shield, User, LogOut, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Re-evaluates on route change
  const token = localStorage.getItem('token');
  
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setDropdownOpen(false);
    navigate('/');
  };

  const handleScrollTo = (e, id) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="navbar" style={{ flexWrap: 'wrap', position: 'fixed', top: 0, width: '100%', zIndex: 10000 }}>
      <div className="logo cursor-pointer" onClick={() => navigate('/')}>
        <Shield color="var(--primary-color)" size={28} />
        <span>BharatNari</span>
      </div>
      <div className="nav-links" style={{ flexWrap: 'wrap', display: 'flex', alignItems: 'center', gap: '25px' }}>
        <a href="/" style={{ textDecoration: 'none', color: 'var(--text-secondary)' }} onClick={(e) => { e.preventDefault(); navigate('/'); window.scrollTo({top: 0, behavior: 'smooth'}); }}>Home</a>
        <a href="#tips" style={{ textDecoration: 'none', color: 'var(--text-secondary)' }} onClick={(e) => handleScrollTo(e, 'tips')}>Security Tips</a>
        <a href="#about" style={{ textDecoration: 'none', color: 'var(--text-secondary)' }} onClick={(e) => handleScrollTo(e, 'about')}>About</a>
        <a href="#contact" style={{ textDecoration: 'none', color: 'var(--text-secondary)' }} onClick={(e) => handleScrollTo(e, 'contact')}>Contact</a>
        
        {!token ? (
          <div style={{ display: 'flex', gap: '15px' }}>
            <button className="btn btn-outline" style={{ padding: '8px 20px' }} onClick={() => navigate('/login')}>Login</button>
            <button className="btn btn-primary" style={{ padding: '8px 20px' }} onClick={() => navigate('/login')}>Sign Up</button>
          </div>
        ) : (
          <div style={{ position: 'relative' }}>
            <div 
              onClick={() => setDropdownOpen(!dropdownOpen)} 
              style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--secondary-color)', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', border: '1px solid rgba(0,0,0,0.05)' }}
            >
              <User size={20} color="var(--primary-color)" />
            </div>
            
            {dropdownOpen && (
              <div 
                style={{ position: 'absolute', top: '120%', right: '0', width: '200px', background: 'white', borderRadius: '12px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)', overflow: 'hidden', display: 'flex', flexDirection: 'column', border: '1px solid rgba(0,0,0,0.05)', animation: 'slideIn 0.2s ease-out' }}
              >
                <div 
                  onClick={() => { setDropdownOpen(false); navigate('/dashboard'); }} 
                  style={{ padding: '15px 20px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', borderBottom: '1px solid rgba(0,0,0,0.05)', color: 'var(--text-primary)' }}
                >
                  <LayoutDashboard size={18} /> Dashboard
                </div>
                <div 
                  onClick={handleLogout} 
                  style={{ padding: '15px 20px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', color: 'var(--danger-color)' }}
                >
                  <LogOut size={18} /> Logout
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
