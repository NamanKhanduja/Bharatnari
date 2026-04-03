import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, MapPin, AlertTriangle, Users, Info, Phone, Eye, Navigation, MessageCircle } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      {/* Hero Section */}
      <div className="hero">
        <div className="hero-icon-wrapper">
          <Shield size={40} color="var(--primary-color)" />
        </div>
        <h1>
          Your Personal <span className="hero-highlight">Safety Companion</span>
        </h1>
        <p>
          Empowering women with real-time safety features, emergency alerts, and trusted contacts. Stay protected, stay connected, stay safe with BharatNari.
        </p>
        
        <div className="hero-buttons">
          <button className="btn btn-primary" onClick={() => navigate('/login')}>
            Get Started Now
          </button>
          <button className="btn btn-outline" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
            Learn More
          </button>
        </div>
      </div>

      {/* Features Grid Section */}
      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">
             <MapPin size={48} color="var(--primary-color)" />
          </div>
          <h3>Real-time Location</h3>
          <p>Share your location with trusted contacts in real-time</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
             <AlertTriangle size={48} color="var(--danger-color)" />
          </div>
          <h3>Emergency Alerts</h3>
          <p>Send instant alerts to your emergency contacts</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
             <Users size={48} color="var(--primary-color)" />
          </div>
          <h3>Trusted Network</h3>
          <p>Build your network of trusted emergency contacts</p>
        </div>
      </div>

      {/* Security Tips Section */}
      <section id="tips" style={{ padding: '80px 0', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '50px' }}>Safety Tips</h2>
        <div className="features-grid" style={{ paddingBottom: '0' }}>
          <div className="feature-card" style={{ padding: '30px' }}>
             <Eye size={32} color="var(--primary-color)" style={{ marginBottom: '15px' }} />
             <h4 style={{ fontSize: '1.1rem', marginBottom: '10px' }}>Stay Aware</h4>
             <p style={{ fontSize: '0.95rem' }}>Stay aware of your surroundings. Put down your phone and pay attention to people around you.</p>
          </div>
          <div className="feature-card" style={{ padding: '30px' }}>
             <Navigation size={32} color="var(--primary-color)" style={{ marginBottom: '15px' }} />
             <h4 style={{ fontSize: '1.1rem', marginBottom: '10px' }}>Avoid Isolated Areas</h4>
             <p style={{ fontSize: '0.95rem' }}>Avoid empty and isolated areas at night. Stick to well-lit matching pathways and crowded regions.</p>
          </div>
          <div className="feature-card" style={{ padding: '30px' }}>
             <MessageCircle size={32} color="var(--primary-color)" style={{ marginBottom: '15px' }} />
             <h4 style={{ fontSize: '1.1rem', marginBottom: '10px' }}>Share Live Location</h4>
             <p style={{ fontSize: '0.95rem' }}>Share your live location constantly with trusted contacts whenever commuting alone.</p>
          </div>
          <div className="feature-card" style={{ padding: '30px' }}>
             <Info size={32} color="var(--primary-color)" style={{ marginBottom: '15px' }} />
             <h4 style={{ fontSize: '1.1rem', marginBottom: '10px' }}>Trust Your Instincts</h4>
             <p style={{ fontSize: '0.95rem' }}>If a situation or a person feels wrong, your instinct is usually correct. Leave the area immediately.</p>
          </div>
          <div className="feature-card" style={{ padding: '30px' }}>
             <AlertTriangle size={32} color="var(--danger-color)" style={{ marginBottom: '15px' }} />
             <h4 style={{ fontSize: '1.1rem', marginBottom: '10px' }}>Use the SOS Feature</h4>
             <p style={{ fontSize: '0.95rem' }}>Don't hesitate to press the SOS button when feeling unsafe. Precaution is better than reaction.</p>
          </div>
          <div className="feature-card" style={{ padding: '30px' }}>
             <Phone size={32} color="var(--primary-color)" style={{ marginBottom: '15px' }} />
             <h4 style={{ fontSize: '1.1rem', marginBottom: '10px' }}>Emergency Contacts</h4>
             <p style={{ fontSize: '0.95rem' }}>Memorize or keep National Emergency Numbers (112, 1091) fully accessible on your phone lock screen.</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" style={{ padding: '80px 0', borderTop: '1px solid rgba(0,0,0,0.05)', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '30px' }}>About BharatNari</h2>
        <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          BharatNari is a safety-focused platform designed to empower women with quick access to emergency tools. It provides crucial features like SOS immediate alerts, trusted contact SMS notifications, and offline fallback support to ensure maximum safety even in critical network-less situations.
        </p>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{ padding: '80px 0', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '50px' }}>Contact Us</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '50px', justifyContent: 'center' }}>
          
          <div style={{ flex: '1', minWidth: '300px', maxWidth: '400px' }}>
            <h3 style={{ marginBottom: '20px', color: 'var(--text-primary)' }}>Get in Touch</h3>
            <p style={{ marginBottom: '10px', color: 'var(--text-secondary)' }}><strong>Email:</strong> <a href="mailto:support@bharatnari.com" style={{ color: 'var(--primary-color)', textDecoration: 'none' }}>support@bharatnari.com</a></p>
            <p style={{ marginBottom: '30px', color: 'var(--text-secondary)' }}><strong>Phone:</strong> +91-XXXXXXXXXX</p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>We are dedicated to improving user safety. Let us know if you have any questions or feedback regarding the platform!</p>
          </div>
          
          <div style={{ flex: '1', minWidth: '300px', maxWidth: '500px', background: 'var(--surface-color)', padding: '30px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
            <h3 style={{ marginBottom: '20px', color: 'var(--text-primary)' }}>Send a Message</h3>
            <form onSubmit={(e) => { e.preventDefault(); alert('Message sent successfully!'); }}>
              <input type="text" placeholder="Your Name" required style={{ width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }} />
              <input type="email" placeholder="Your Email" required style={{ width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }} />
              <textarea placeholder="Your Message" rows="4" required style={{ width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '8px', border: '1px solid #cbd5e1', resize: 'none', outline: 'none' }}></textarea>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Submit</button>
            </form>
          </div>
          
        </div>
      </section>

    </div>
  );
};

export default Home;
