import React from 'react';

export default function Process() {
  const steps = [
    {
      num: "01",
      title: "Initial Consultation & Assessment",
      desc: "Our therapist conducts a comprehensive diagnostic physical assessment including mobility mapping, muscle strength checks, and posture analysis."
    },
    {
      num: "02",
      title: "Customized Recovery Roadmap",
      desc: "We formulate a recovery roadmap that outline targets, treatment modalities (electrotherapy, exercises), and a timeline for pain resolution."
    },
    {
      num: "03",
      title: "Hands-on Therapy & Exercise",
      desc: "We perform hands-on joint manipulation, manual adjustments, dry needling, and clinical exercise training during target sessions."
    },
    {
      num: "04",
      title: "Continuous Audit & Self-Care",
      desc: "We track muscle/joint recovery indexes weekly and supply home exercise sheets to prevent injuries from returning."
    }
  ];

  const styles = {
    section: {
      backgroundColor: 'var(--bg-main)',
      borderBottom: '1px solid var(--border-light)'
    },
    timeline: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: '40px',
      position: 'relative'
    },
    stepCard: {
      position: 'relative',
      zIndex: 2,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
    },
    circle: {
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      backgroundColor: 'var(--primary-bg)',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.75rem',
      fontWeight: '800',
      fontFamily: 'var(--font-heading)',
      marginBottom: '24px',
      boxShadow: '0 8px 20px rgba(13, 148, 136, 0.3)',
      transition: 'var(--transition-smooth)',
      border: '4px solid #fff'
    },
    title: {
      fontSize: '1.2rem',
      marginBottom: '12px',
      color: 'var(--bg-dark)'
    },
    desc: {
      fontSize: '0.875rem',
      color: 'var(--text-muted)',
      lineHeight: '1.6',
      maxWidth: '280px'
    }
  };

  return (
    <section id="process" className="section" style={styles.section}>
      <div className="container">
        <div className="text-center">
          <span className="section-tag">How We Work</span>
          <h2 className="section-title">Your Path to Recovery</h2>
          <p className="section-desc">
            We guide you step-by-step through a scientifically structured clinical process, keeping you informed and empowered at every milestone.
          </p>
        </div>

        <div style={styles.timeline} className="process-grid">
          {steps.map((step, index) => (
            <div key={index} style={styles.stepCard} className="process-card">
              <div 
                style={styles.circle}
                className="step-circle"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                  e.currentTarget.style.backgroundColor = 'var(--secondary-bg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.backgroundColor = 'var(--primary-bg)';
                }}
              >
                {step.num}
              </div>
              <h3 style={styles.title}>{step.title}</h3>
              <p style={styles.desc}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .process-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}
