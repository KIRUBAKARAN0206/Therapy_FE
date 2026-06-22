import React from 'react';
import logoImg from '../assets/logo.webp';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const styles = {
    grid: {
      display: 'grid',
      gridTemplateColumns: '1.2fr 0.8fr 1fr',
      gap: '60px',
      marginBottom: '60px'
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '20px'
    },
    desc: {
      fontSize: '0.9rem',
      color: '#94a3b8',
      lineHeight: '1.7',
      marginBottom: '24px',
      maxWidth: '340px'
    },
    socials: {
      display: 'flex',
      gap: '12px'
    },
    sectionTitle: {
      fontSize: '1.1rem',
      color: '#fff',
      marginBottom: '24px',
      fontWeight: '700',
      letterSpacing: '0.03em',
      textTransform: 'uppercase'
    },
    links: {
      listStyle: 'none',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    },
    hoursItem: {
      fontSize: '0.9rem',
      color: '#94a3b8',
      marginBottom: '10px',
      lineHeight: '1.6'
    },
    bottom: {
      borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      paddingTop: '32px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '16px',
      fontSize: '0.85rem',
      color: '#64748b'
    }
  };
  const getIsTamil = () => {
    try {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; googtrans=`);
      if (parts.length === 2) {
        return parts.pop().split(';').shift().endsWith('/ta');
      }
    } catch (e) {}
    return false;
  };

  return (
    <footer className="footer-main">
      <div className="container">
        <div style={styles.grid} className="footer-grid">
          <div>
            <div 
              className="brand-logo-container" 
              onClick={() => window.location.hash = '#/'}
            >
              <img 
                src={logoImg} 
                alt="THE THERAPY UNIVERSE Logo" 
                className="brand-logo-img"
              />
              <span className="brand-logo-text notranslate">
                {getIsTamil() ? 'தி தெரபி யூனிவர்ஸ்' : 'THE THERAPY UNIVERSE'}
              </span>
            </div>
            <p style={styles.desc}>
              Evidence-based clinical rehabilitation helping patients restore physical functions, eliminate chronic muscle pain, and live an active, healthy life.
            </p>
            <div style={styles.socials}>
              <a 
                href="https://wa.me/918220952580" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon-btn"
                aria-label="WhatsApp"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.528 1.977 14.07 1.948 12.012 1.948c-5.435 0-9.865 4.371-9.87 9.8.001 1.737.478 3.427 1.38 4.931l-.989 3.61 3.733-.968zM16.8 13.91c-.26-.13-1.54-.76-1.78-.85-.24-.09-.41-.13-.58.13-.17.26-.66.83-.81.99-.15.17-.3.19-.56.06-.26-.13-1.1-.41-2.1-1.3-.78-.7-1.31-1.56-1.46-1.82-.15-.26-.02-.4.11-.53.12-.11.26-.3.39-.46.13-.15.17-.26.26-.43.09-.17.04-.32-.02-.45-.06-.13-.58-1.4-.79-1.92-.21-.52-.42-.45-.58-.45-.15 0-.33-.02-.52-.02-.19 0-.5.07-.76.36-.26.29-1 .98-1 2.38s1.02 2.76 1.16 2.96c.14.19 2 3.05 4.85 4.28.68.29 1.21.47 1.62.6.68.22 1.3.19 1.79.11.55-.08 1.54-.63 1.76-1.24.22-.61.22-1.13.15-1.24-.07-.12-.26-.18-.52-.31z" /></svg>
              </a>
              <a 
                href="https://www.instagram.com/balasurya_1610?utm_source=qr&igsh=bHZyYmNzZ2pwYng5" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon-btn"
                aria-label="Instagram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a 
                href="https://www.facebook.com/balasurya.balasurya.372" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon-btn" 
                aria-label="Facebook"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
            </div>
          </div>

          <div>
            <h4 style={styles.sectionTitle}>Quick Links</h4>
            <ul style={styles.links}>
              <li><a href="#/" className="footer-link">Home</a></li>
              <li><a href="#/about" className="footer-link">About Us</a></li>
              <li><a href="#/services" className="footer-link">Our Services</a></li>
              <li><a href="#/conditions" className="footer-link">Conditions We Treat</a></li>
              <li><a href="#/gallery" className="footer-link">Photo Gallery</a></li>
              <li><a href="#/contact" className="footer-link">Contact Details</a></li>
            </ul>
          </div>

          <div>
            <h4 style={styles.sectionTitle}>Operational Schedule</h4>
            <div style={styles.hoursItem}>
              <strong>Monday - Friday:</strong><br />
              Morning: 09:30 AM - 01:30 PM<br />
              Evening: 05:00 PM - 09:00 PM
            </div>
            <div style={styles.hoursItem}>
              <strong>Saturday, Sunday & Holidays:</strong><br />
              Closed for Clinical Sessions
            </div>
            <div style={{ ...styles.hoursItem, marginTop: '14px', color: 'var(--secondary)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '1.1rem' }}>🏠</span> House Visits Available
            </div>
          </div>
        </div>

        <div style={styles.bottom}>
          <div>&copy; {currentYear} <span className="notranslate">{getIsTamil() ? 'தி தெரபி யூனிவர்ஸ்' : 'THE THERAPY UNIVERSE'}</span> Clinic. All rights reserved. All clinical practices are conducted by certified medical therapists.</div>
          <div style={{ display: 'flex', gap: '24px' }}>
            <a href="#/privacy-policy" className="footer-link" style={{ fontSize: '0.85rem' }}>Privacy Policy</a>
            <a href="#/terms-of-service" className="footer-link" style={{ fontSize: '0.85rem' }}>Terms of Service</a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </footer>
  );
}

