import React from 'react';
import logoImg from '../assets/logo.webp';
import codeThriveLogo from '../assets/codethrive_logo.png';

export default function Footer() {
  const currentYear = new Date().getFullYear();

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
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Main Grid Section */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr 1fr',
            gap: '36px',
            marginBottom: '32px'
          }} 
          className="footer-grid"
        >
          {/* Column 1: Brand Info & Socials */}
          <div>
            <div 
              className="brand-logo-container" 
              onClick={() => window.location.hash = '#/'}
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}
            >
              <img 
                src={logoImg} 
                alt="THE THERAPY UNIVERSE Logo" 
                className="brand-logo-img"
                style={{ width: '42px', height: '42px', borderRadius: '50%' }}
              />
              <span className="brand-logo-text notranslate" style={{ fontSize: '1.15rem', fontWeight: '800', color: '#fff' }}>
                {getIsTamil() ? 'தி தெரபி யூனிவர்ஸ்' : 'THE THERAPY UNIVERSE'}
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: '1.6', marginBottom: '16px', maxWidth: '320px' }}>
              Evidence-based clinical rehabilitation helping patients restore physical functions, eliminate chronic muscle pain, and live an active, healthy life.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <a 
                href="https://wa.me/918220952580" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon-btn"
                aria-label="WhatsApp"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.528 1.977 14.07 1.948 12.012 1.948c-5.435 0-9.865 4.371-9.87 9.8.001 1.737.478 3.427 1.38 4.931l-.989 3.61 3.733-.968zM16.8 13.91c-.26-.13-1.54-.76-1.78-.85-.24-.09-.41-.13-.58.13-.17.26-.66.83-.81.99-.15.17-.3.19-.56.06-.26-.13-1.1-.41-2.1-1.3-.78-.7-1.31-1.56-1.46-1.82-.15-.26-.02-.4.11-.53.12-.11.26-.3.39-.46.13-.15.17-.26.26-.43.09-.17.04-.32-.02-.45-.06-.13-.58-1.4-.79-1.92-.21-.52-.42-.45-.58-.45-.15 0-.33-.02-.52-.02-.19 0-.5.07-.76.36-.26.29-1 .98-1 2.38s1.02 2.76 1.16 2.96c.14.19 2 3.05 4.85 4.28.68.29 1.21.47 1.62.6.68.22 1.3.19 1.79.11.55-.08 1.54-.63 1.76-1.24.22-.61.22-1.13.15-1.24-.07-.12-.26-.18-.52-.31z" /></svg>
              </a>
              <a 
                href="https://www.instagram.com/balasurya_1610?utm_source=qr&igsh=bHZyYmNzZ2pwYng5" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon-btn"
                aria-label="Instagram"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a 
                href="https://www.facebook.com/balasurya.balasurya.372" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon-btn" 
                aria-label="Facebook"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 style={{ fontSize: '0.95rem', color: '#fff', marginBottom: '16px', fontWeight: '700', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              Quick Links
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 16px' }}>
              <a href="#/" className="footer-link">Home</a>
              <a href="#/about" className="footer-link">About Us</a>
              <a href="#/services" className="footer-link">Our Services</a>
              <a href="#/conditions" className="footer-link">Conditions</a>
              <a href="#/online-therapy" className="footer-link">Online Consult</a>
              <a href="#/gallery" className="footer-link">Photo Gallery</a>
              <a href="#/contact" className="footer-link">Contact Us</a>
              <a href="#/booking" className="footer-link">Book Visit</a>
            </div>
          </div>

          {/* Column 3: Operational Schedule & House Visits */}
          <div>
            <h4 style={{ fontSize: '0.95rem', color: '#fff', marginBottom: '16px', fontWeight: '700', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              Schedule & Visits
            </h4>
            <div style={{ fontSize: '0.84rem', color: '#94a3b8', lineHeight: '1.5', marginBottom: '8px' }}>
              <strong style={{ color: '#cbd5e1' }}>Mon – Fri:</strong> 09:30 AM – 01:30 PM & 05:00 PM – 09:00 PM
            </div>
            <div style={{ fontSize: '0.84rem', color: '#94a3b8', lineHeight: '1.5', marginBottom: '12px' }}>
              <strong style={{ color: '#cbd5e1' }}>Sat, Sun & Holidays:</strong> Closed for Clinical Sessions
            </div>
            <div style={{ fontSize: '0.82rem', color: '#a3e635', fontWeight: '700', display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 10px', background: 'rgba(132, 204, 22, 0.1)', borderRadius: '6px', border: '1px solid rgba(132, 204, 22, 0.2)' }}>
              <span>🏠</span> House Visits Available
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar (Justified & Centered Layout) */}
        <div className="footer-bottom-bar">
          {/* Left: Copyright */}
          <div className="footer-bottom-copyright">
            &copy; {currentYear} <span className="notranslate">{getIsTamil() ? 'தி தெரபி யூனிவர்ஸ்' : 'THE THERAPY UNIVERSE'}</span>. All rights reserved.
          </div>

          {/* Center: CodeThrive Infotech Credit Badge with Official Uploaded Logo */}
          <div className="codethrive-credit-badge">
            <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Designed & Developed by</span>
            <div className="codethrive-logo-box">
              <img src={codeThriveLogo} alt="CodeThrive Infotech Logo" className="codethrive-logo-img" />
              <span className="codethrive-company-name">CodeThrive Infotech</span>
            </div>
          </div>

          {/* Right: Privacy Policy & Terms of Service */}
          <div className="footer-bottom-links">
            <a href="#/privacy-policy" className="footer-link">Privacy Policy</a>
            <span className="footer-link-divider">•</span>
            <a href="#/terms-of-service" className="footer-link">Terms of Service</a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
        }
      `}</style>
    </footer>
  );
}



