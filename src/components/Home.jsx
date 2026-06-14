import React, { useEffect, useRef } from 'react';
import Hero from './Hero';
import Stats from './Stats';
import { ArrowRight, Phone, CheckCircle2 } from 'lucide-react';
import therapyImg from '../assets/individualized_therapy.png';
import techniquesImg from '../assets/modern_techniques.png';
import specialistsImg from '../assets/dedicated_specialists.png';
import clinicalRehabImg from '../assets/clinical_rehab.png';

export default function Home({ onNavigate }) {
  const cardRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -50px 0px' }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const styles = {
    overviewSection: {
      background: 'var(--gradient-light-alt)',
      padding: '80px 24px',
      borderBottom: '1px solid var(--border-light)',
      position: 'relative'
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: '32px',
      marginTop: '48px'
    },
    featureCard: {
      position: 'relative',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      height: '460px',
      boxShadow: 'var(--shadow-premium)',
      border: '1px solid var(--border-light)',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      transition: 'var(--transition-smooth)'
    },
    cardImage: (bgImage) => ({
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundImage: `url(${bgImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      filter: 'brightness(1.05) contrast(1.02)',
      transition: 'var(--transition-smooth)',
      zIndex: 1
    }),
    glassPanel: {
      position: 'relative',
      zIndex: 2,
      margin: '16px',
      padding: '24px',
      borderRadius: 'var(--radius-md)',
      background: 'rgba(255, 255, 255, 0.88)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.6)',
      boxShadow: '0 8px 32px 0 rgba(30, 64, 175, 0.08)',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      transition: 'var(--transition-smooth)'
    },
    iconBadge: {
      position: 'absolute',
      top: '-32px',
      right: '24px',
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
      border: '4px solid rgba(255, 255, 255, 0.95)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 8px 20px rgba(30, 64, 175, 0.2)',
      transition: 'var(--transition-smooth)',
      color: '#fff'
    },
    title: {
      fontSize: '1.25rem',
      color: 'var(--bg-dark)',
      fontWeight: '700',
      fontFamily: 'var(--font-heading)',
      paddingRight: '48px'
    },
    desc: {
      fontSize: '0.875rem',
      color: 'var(--text-muted)',
      lineHeight: '1.6',
      fontWeight: '500'
    },
    
    // Redesigned Full Width CTA Section
    ctaSection: {
      background: 'var(--gradient-light-alt)',
      padding: '90px 24px',
      borderTop: '1px solid var(--border-light)',
      borderBottom: '1px solid var(--border-light)',
      position: 'relative'
    },
    ctaCard: {
      background: 'var(--gradient-dark)',
      padding: '56px 60px',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      boxShadow: '0 24px 60px rgba(15, 23, 42, 0.3)',
      display: 'grid',
      gridTemplateColumns: '1.2fr 0.8fr',
      gap: '50px',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    bannerTitle: {
      fontSize: '2.5rem',
      lineHeight: '1.2',
      letterSpacing: '-0.02em',
      background: 'linear-gradient(135deg, #ffffff 0%, #a5b4fc 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '16px',
      fontWeight: '800'
    },
    bannerDesc: {
      fontSize: '1rem',
      color: '#cbd5e1',
      lineHeight: '1.65',
      fontWeight: '500',
      marginBottom: '28px'
    },
    highlightsGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '16px',
      marginBottom: '32px'
    },
    highlightItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      color: '#e2e8f0',
      fontSize: '0.92rem',
      fontWeight: '600'
    },
    highlightIcon: {
      color: 'var(--secondary)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    btnGroup: {
      display: 'flex',
      gap: '16px',
      flexWrap: 'wrap'
    },
    ctaImage: {
      width: '100%',
      height: '340px',
      objectFit: 'cover',
      borderRadius: 'var(--radius-md)',
      boxShadow: '0 12px 30px rgba(0, 0, 0, 0.25)',
      border: '4px solid rgba(255, 255, 255, 0.08)',
      transition: 'var(--transition-smooth)'
    }
  };

  return (
    <div className="fade-in">
      <Hero />
      <Stats />
      
      {/* Quick Overview Section */}
      <section style={styles.overviewSection}>
        <div className="container">
          <div className="text-center">
            <span className="section-tag">Clinical Excellence</span>
            <h2 className="section-title">Evidence-Based Recovery Care</h2>
            <p className="section-desc">
              We provide professional diagnosis and treatment protocols to resolve muscular pain, joint issues, and post-surgery mobility constraints.
            </p>
          </div>

          <div style={styles.featuresGrid}>
            
            {/* Card 1: Individualized Therapy */}
            <div 
              ref={el => cardRefs.current[0] = el}
              style={{ ...styles.featureCard, transitionDelay: '0ms' }}
              className="premium-feature-card reveal-card"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-premium)';
                e.currentTarget.querySelector('.card-image-div').style.transform = 'scale(1.06)';
                e.currentTarget.querySelector('.glass-panel-div').style.background = 'rgba(255, 255, 255, 0.95)';
                e.currentTarget.querySelector('.icon-badge-div').style.transform = 'scale(1.1) rotate(5deg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                e.currentTarget.querySelector('.card-image-div').style.transform = 'scale(1)';
                e.currentTarget.querySelector('.glass-panel-div').style.background = 'rgba(255, 255, 255, 0.88)';
                e.currentTarget.querySelector('.icon-badge-div').style.transform = 'scale(1) rotate(0deg)';
              }}
            >
              <div className="card-image-div" style={styles.cardImage(therapyImg)}></div>
              <div className="glass-panel-div" style={styles.glassPanel}>
                <div className="icon-badge-div floating-badge" style={styles.iconBadge}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2V22" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
                    <circle cx="12" cy="6" r="2.5" fill="#fff" />
                    <circle cx="12" cy="12" r="3" fill="#fff" />
                    <circle cx="12" cy="18" r="2.5" fill="#fff" />
                    <path d="M8 12H16" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>
                <h3 style={styles.title}>Individualized Therapy</h3>
                <p style={styles.desc}>We avoid template-based solutions. Every rehabilitation roadmap is fully customized to your joint angles and recovery pace.</p>
              </div>
            </div>

            {/* Card 2: Modern Techniques */}
            <div 
              ref={el => cardRefs.current[1] = el}
              style={{ ...styles.featureCard, transitionDelay: '100ms' }}
              className="premium-feature-card reveal-card"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-premium)';
                e.currentTarget.querySelector('.card-image-div').style.transform = 'scale(1.06)';
                e.currentTarget.querySelector('.glass-panel-div').style.background = 'rgba(255, 255, 255, 0.95)';
                e.currentTarget.querySelector('.icon-badge-div').style.transform = 'scale(1.1) rotate(5deg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                e.currentTarget.querySelector('.card-image-div').style.transform = 'scale(1)';
                e.currentTarget.querySelector('.glass-panel-div').style.background = 'rgba(255, 255, 255, 0.88)';
                e.currentTarget.querySelector('.icon-badge-div').style.transform = 'scale(1) rotate(0deg)';
              }}
            >
              <div className="card-image-div" style={styles.cardImage(techniquesImg)}></div>
              <div className="glass-panel-div" style={styles.glassPanel}>
                <div className="icon-badge-div floating-badge" style={styles.iconBadge}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="5" y="5" width="14" height="14" rx="2" stroke="#fff" strokeWidth="2.5" />
                    <line x1="5" y1="12" x2="19" y2="12" stroke="#fff" strokeWidth="2.5" />
                    <path d="M8 16L10 14L12 16L16 12" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 style={styles.title}>Modern Techniques</h3>
                <p style={styles.desc}>Our therapists utilize clinically proven techniques including joint manipulation, dry needling, and therapeutic exercise.</p>
              </div>
            </div>

            {/* Card 3: Dedicated Specialists */}
            <div 
              ref={el => cardRefs.current[2] = el}
              style={{ ...styles.featureCard, transitionDelay: '200ms' }}
              className="premium-feature-card reveal-card"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-premium)';
                e.currentTarget.querySelector('.card-image-div').style.transform = 'scale(1.06)';
                e.currentTarget.querySelector('.glass-panel-div').style.background = 'rgba(255, 255, 255, 0.95)';
                e.currentTarget.querySelector('.icon-badge-div').style.transform = 'scale(1.1) rotate(5deg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                e.currentTarget.querySelector('.card-image-div').style.transform = 'scale(1)';
                e.currentTarget.querySelector('.glass-panel-div').style.background = 'rgba(255, 255, 255, 0.88)';
                e.currentTarget.querySelector('.icon-badge-div').style.transform = 'scale(1) rotate(0deg)';
              }}
            >
              <div className="card-image-div" style={styles.cardImage(specialistsImg)}></div>
              <div className="glass-panel-div" style={styles.glassPanel}>
                <div className="icon-badge-div floating-badge" style={styles.iconBadge}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 4L19 7V13C19 17.5 16 20.5 12 21.5C8 20.5 5 17.5 5 13V7L12 4Z" stroke="#fff" strokeWidth="2.5" strokeLinejoin="round" />
                    <path d="M12 8V16" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M9 12H15" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </div>
                <h3 style={styles.title}>Dedicated Specialist</h3>
                <p style={styles.desc}>Our clinic is led by Dr. BALASURYA PT, a certified clinical physiotherapist offering personalized rehabilitation and recovery care.</p>
              </div>
            </div>

          </div>
          
        </div>
      </section>

      {/* Redesigned Full Width CTA Banner with Header */}
      <section style={styles.ctaSection} className="cta-full-section">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '50px' }}>
            <span className="section-tag">Direct Access</span>
            <h2 className="section-title">Schedule Your Evaluation</h2>
            <p className="section-desc" style={{ marginBottom: 0 }}>
              Start your journey toward optimal health and mobility today with certified, evidence-based therapy sessions tailored to your needs.
            </p>
          </div>

          <div style={styles.ctaCard} className="compact-cta-card">
            <div>
              <h3 style={styles.bannerTitle}>Start Your Recovery Journey Today</h3>
              <p style={styles.bannerDesc}>
                Book a comprehensive assessment with our clinical physiotherapist to diagnose movement restrictions and customize a direct therapy plan.
              </p>
              
              <div style={styles.highlightsGrid}>
                <div style={styles.highlightItem}>
                  <span style={styles.highlightIcon}><CheckCircle2 size={16} color="var(--secondary)" /></span>
                  <span>1-on-1 Assessment</span>
                </div>
                <div style={styles.highlightItem}>
                  <span style={styles.highlightIcon}><CheckCircle2 size={16} color="var(--secondary)" /></span>
                  <span>Personalized Therapy</span>
                </div>
                <div style={styles.highlightItem}>
                  <span style={styles.highlightIcon}><CheckCircle2 size={16} color="var(--secondary)" /></span>
                  <span>Expert Physiotherapist</span>
                </div>
                <div style={styles.highlightItem}>
                  <span style={styles.highlightIcon}><CheckCircle2 size={16} color="var(--secondary)" /></span>
                  <span>House Visits Available</span>
                </div>
              </div>

              <div style={styles.btnGroup}>
                <button onClick={() => onNavigate('booking')} className="btn-primary">
                  Book Appointment <ArrowRight size={18} />
                </button>
                <a 
                  href="tel:+918220952580" 
                  className="btn-secondary"
                  style={{ 
                    color: '#fff', 
                    borderColor: 'rgba(255, 255, 255, 0.3)', 
                    background: 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#fff';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <Phone size={16} /> Call Clinic
                </a>
              </div>
            </div>
            <div className="cta-image-wrapper" style={{ overflow: 'hidden', borderRadius: 'var(--radius-md)' }}>
              <img 
                src={clinicalRehabImg} 
                alt="Physiotherapy treatment session" 
                style={styles.ctaImage}
                className="cta-image-hover"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.04)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 992px) {
          .compact-cta-card {
            grid-template-columns: 1fr !important;
            padding: 36px 28px !important;
            gap: 36px !important;
          }
          .cta-image-wrapper {
            max-width: 480px;
            margin: 0 auto;
            width: 100%;
          }
          .cta-image-wrapper img {
            height: 240px !important;
          }
        }
        @media (max-width: 576px) {
          .compact-cta-card {
            padding: 28px 20px !important;
          }
        }
      `}</style>
    </div>
  );
}
