import React, { useState, useEffect } from 'react';
import { Menu, X, Lock } from 'lucide-react';
import logoImg from '../assets/logo.webp';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentHash, setCurrentHash] = useState(window.location.hash || '#/');
  const [lang, setLang] = useState(() => {
    try {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; googtrans=`);
      if (parts.length === 2) {
        return parts.pop().split(';').shift().endsWith('/ta') ? 'ta' : 'en';
      }
    } catch (e) {}
    return 'en';
  });

  useEffect(() => {
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
      return null;
    };
    const transCookie = getCookie('googtrans');
    if (transCookie && transCookie.endsWith('/ta')) {
      setLang('ta');
    } else {
      setLang('en');
    }
  }, []);

  const handleLangChange = (e) => {
    const newLang = e.target.value;
    setLang(newLang);
    document.cookie = `googtrans=/en/${newLang}; path=/`;
    document.cookie = `googtrans=/en/${newLang}; path=/; domain=.localhost`;
    document.cookie = `googtrans=/en/${newLang}; path=/; domain=${window.location.hostname}`;
    window.location.reload();
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    const handleHashChange = () => {
      setCurrentHash(window.location.hash || '#/');
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const navLinks = [
    { name: 'Home', href: '#/' },
    { name: 'About Us', href: '#/about' },
    { name: 'Services', href: '#/services' },
    { name: 'Conditions', href: '#/conditions' },
    { name: 'Online Consult', href: '#/online-therapy' },
    { name: 'Gallery', href: '#/gallery' },
    { name: 'Contact', href: '#/contact' }
  ];

  const styles = {
    header: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 999,
      transition: 'var(--transition-smooth)',
      padding: scrolled ? '8px 24px' : '12px 24px',
      background: scrolled ? 'rgba(255, 255, 255, 0.92)' : 'rgba(255, 255, 255, 0.75)',
      backdropFilter: scrolled ? 'blur(18px)' : 'blur(14px)',
      borderBottom: scrolled ? '1px solid rgba(30, 64, 175, 0.08)' : '1px solid rgba(255, 255, 255, 0.25)',
      boxShadow: scrolled ? 'var(--shadow-sm)' : '0 2px 10px rgba(30, 64, 175, 0.01)'
    },
    nav: {
      maxWidth: '1400px',
      margin: '0 auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      fontWeight: 800,
      fontSize: '1.4rem',
      color: 'var(--primary)',
      fontFamily: 'var(--font-heading)',
      cursor: 'pointer',
      letterSpacing: '-0.02em'
    },
    linksContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    },
    link: (isActive) => ({
      color: isActive ? 'var(--primary)' : (scrolled ? 'var(--text-main)' : '#0f172a'),
      opacity: isActive ? 1 : 0.85
    }),
    adminIcon: (isActive) => ({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: isActive ? 'var(--primary)' : 'var(--text-muted)',
      cursor: 'pointer',
      transition: 'var(--transition-fast)'
    }),
    menuBtn: {
      display: 'none',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: 'var(--text-main)'
    },
    mobileMenu: {
      position: 'absolute',
      top: '100%',
      left: 0,
      width: '100%',
      background: 'var(--bg-card)',
      borderBottom: '1px solid var(--border-light)',
      padding: '24px',
      display: isOpen ? 'flex' : 'none',
      flexDirection: 'column',
      gap: '12px',
      boxShadow: 'var(--shadow-lg)'
    }
  };

  return (
    <header className={`header-glass ${scrolled ? 'scrolled' : ''}`}>
      <nav style={styles.nav}>
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
            {lang === 'ta' ? 'தி தெரபி யூனிவர்ஸ்' : 'THE THERAPY UNIVERSE'}
          </span>
        </div>

        {/* Desktop Nav Links */}
        <div className="desktop-nav" style={styles.linksContainer}>
          {navLinks.map((link) => {
            const isActive = currentHash === link.href;
            return (
              <a 
                key={link.name} 
                href={link.href} 
                className={`nav-link ${isActive ? 'active' : ''}`}
                style={styles.link(isActive)}
                onMouseEnter={(e) => {
                  e.target.style.color = 'var(--primary)';
                  e.target.style.opacity = 1;
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.target.style.color = scrolled ? 'var(--text-main)' : '#0f172a';
                    e.target.style.opacity = 0.85;
                  }
                }}
              >
                {link.name}
              </a>
            );
          })}
          
          <a href="#/booking" className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.85rem', borderRadius: 'var(--radius-sm)' }}>
            Book Appointment
          </a>

          <select 
            value={lang} 
            onChange={handleLangChange} 
            className="lang-selector"
            title="Select Language"
          >
            <option value="en">English</option>
            <option value="ta">தமிழ் (Tamil)</option>
          </select>

          {/* Admin Lock Icon */}
          <a 
            href="#/admin" 
            style={styles.adminIcon(currentHash === '#/admin')}
            title="Admin Login"
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'}
            onMouseLeave={(e) => { if(currentHash !== '#/admin') e.currentTarget.style.color = 'var(--text-muted)' }}
          >
            <Lock size={18} />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          className="mobile-toggle"
          onClick={() => setIsOpen(!isOpen)}
          style={styles.menuBtn}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        <div style={styles.mobileMenu}>
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsOpen(false)}
              style={{
                fontWeight: '700',
                fontSize: '1.05rem',
                color: currentHash === link.href ? 'var(--primary)' : 'var(--text-main)',
                padding: '6px 0'
              }}
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#/booking" 
            onClick={() => setIsOpen(false)}
            className="btn-primary" 
            style={{ width: '100%', justifyContent: 'center' }}
          >
            Book Appointment
          </a>
          <a 
            href="#/admin"
            onClick={() => setIsOpen(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 0',
              fontWeight: '700',
              color: currentHash === '#/admin' ? 'var(--primary)' : 'var(--text-muted)'
            }}
          >
            <Lock size={18} /> Admin Dashboard
          </a>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '8px', borderTop: '1px solid var(--border-light)', paddingTop: '16px' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-muted)' }}>Language:</span>
            <select 
              value={lang} 
              onChange={handleLangChange} 
              className="lang-selector"
              style={{ flex: 1 }}
              title="Select Language"
            >
              <option value="en">English</option>
              <option value="ta">தமிழ் (Tamil)</option>
            </select>
          </div>
        </div>
      </nav>

      {/* CSS overrides for desktop/mobile toggle display */}
      <style>{`
        @media (max-width: 1400px) {
          .desktop-nav {
            gap: 12px !important;
          }
          .nav-link {
            font-size: 0.84rem !important;
          }
          .brand-logo-text {
            font-size: 1.1rem !important;
          }
        }
        @media (max-width: 1200px) {
          .desktop-nav {
            gap: 8px !important;
          }
          .nav-link {
            font-size: 0.78rem !important;
          }
          .brand-logo-text {
            font-size: 1rem !important;
          }
          .lang-selector {
            padding: 4px 6px !important;
            font-size: 0.78rem !important;
          }
        }
        @media (max-width: 1100px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
}
