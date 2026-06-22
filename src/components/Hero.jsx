import React from 'react';
import { ArrowRight, Star, ShieldCheck, Activity, Users } from 'lucide-react';
import heroImage from '../assets/physio_hero.png';

export default function Hero() {
  const styles = {
    section: {
      padding: '40px 24px 60px',
      background: 'var(--gradient-light)',
      position: 'relative',
      overflow: 'hidden'
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '1.1fr 0.9fr',
      gap: '60px',
      alignItems: 'center',
      position: 'relative',
      zIndex: 2
    },
    content: {
      animation: 'fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards'
    },
    trustBadge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 16px',
      background: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(30, 64, 175, 0.1)',
      borderRadius: 'var(--radius-full)',
      fontSize: '0.875rem',
      fontWeight: '600',
      color: 'var(--primary)',
      marginBottom: '24px'
    },
    title: {
      fontSize: '3.75rem',
      lineHeight: '1.15',
      letterSpacing: '-0.03em',
      color: 'var(--bg-dark)',
      marginBottom: '24px'
    },
    span: {
      background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },
    description: {
      fontSize: '1.2rem',
      color: 'var(--text-muted)',
      lineHeight: '1.7',
      marginBottom: '40px',
      maxWidth: '540px'
    },
    btnGroup: {
      display: 'flex',
      gap: '16px',
      flexWrap: 'wrap',
      marginBottom: '48px'
    },
    trustGrid: {
      display: 'flex',
      gap: '32px',
      borderTop: '1px solid rgba(15, 23, 42, 0.08)',
      paddingTop: '32px'
    },
    trustItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    trustText: {
      fontSize: '0.9rem',
      fontWeight: '600',
      color: 'var(--text-main)'
    },
    imgWrapper: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      animation: 'fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards'
    },
    image: {
      width: '100%',
      maxWidth: '480px',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-premium)',
      border: '8px solid rgba(255, 255, 255, 0.5)',
      transform: 'rotate(1deg)',
      transition: 'var(--transition-smooth)',
    },
    bgDecoration: {
      position: 'absolute',
      width: '400px',
      height: '400px',
      background: 'radial-gradient(circle, rgba(30, 64, 175, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%)',
      borderRadius: '50%',
      top: '-50px',
      right: '-50px',
      zIndex: 1,
      filter: 'blur(40px)'
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
    <section id="home" style={styles.section}>
      <div style={styles.bgDecoration}></div>
      <div style={styles.container} className="hero-grid">
        <div style={styles.content}>
          <h1 style={styles.title}>
            Restore Your Movement. <br />
            <span style={styles.span}>Reclaim Your Active Life.</span>
          </h1>
          <p style={styles.description}>
            Experience premium physical therapy tailored to your body's unique requirements at <span className="notranslate">{getIsTamil() ? 'தி தெரபி யூனிவர்ஸ்' : 'THE THERAPY UNIVERSE'}</span>. Our certified specialists use evidence-based rehabilitation protocols to deliver lasting pain relief and mobility recovery.
          </p>
          <div style={styles.btnGroup}>
            <a href="#/booking" className="btn-primary">
              Book Appointment <ArrowRight size={18} />
            </a>
            <a href="#/services" className="btn-secondary">
              Explore Our Services
            </a>
          </div>
          <div style={styles.trustGrid}>
            <div style={styles.trustItem}>
              <ShieldCheck size={20} color="var(--primary)" />
              <span style={styles.trustText}>Certified Professionals</span>
            </div>
            <div style={styles.trustItem}>
              <Activity size={20} color="var(--primary)" />
              <span style={styles.trustText}>Custom Therapy Plans</span>
            </div>
            <div style={styles.trustItem}>
              <Users size={20} color="var(--primary)" />
              <span style={styles.trustText}>5,000+ Happy Patients</span>
            </div>
          </div>
        </div>
        <div style={styles.imgWrapper} className="hero-img-container">
          <img 
            src={heroImage} 
            alt="Physical therapy session" 
            style={styles.image}
            className="hero-image"
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.03) rotate(0deg)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1) rotate(1deg)';
            }}
          />
        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
            text-align: center;
          }
          .hero-grid h1 {
            font-size: 2.75rem !important;
          }
          .hero-grid p {
            margin: 0 auto 32px !important;
          }
          .hero-grid div {
            justify-content: center !important;
          }
          .hero-img-container {
            order: -1;
          }
        }
      `}</style>
    </section>
  );
}
