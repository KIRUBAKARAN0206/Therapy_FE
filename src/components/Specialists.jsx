import React, { useEffect, useRef } from 'react';
import { ShieldCheck } from 'lucide-react';

export default function Specialists() {
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

  const team = [
    {
      name: "Dr. BALASURYA PT",
      role: "Clinical Director & Consultant Physiotherapist",
      desc: "Dedicated Clinical Specialist specializing in personalized physical rehabilitation, advanced pain relief therapies, and customized recovery plans to restore optimal function.",
      creds: "Clinical Director & Consultant Physiotherapist"
    }
  ];

  const styles = {
    section: {
      backgroundColor: 'var(--bg-card)',
      borderBottom: '1px solid var(--border-light)'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '40px',
      justifyContent: 'center',
      maxWidth: '480px',
      margin: '0 auto'
    },
    card: {
      backgroundColor: 'var(--bg-main)',
      padding: '40px 32px',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--border-light)',
      transition: 'var(--transition-smooth)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center'
    },
    avatarPlaceholder: {
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      backgroundColor: 'var(--primary-glow)',
      color: 'var(--primary)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: '700',
      fontSize: '2rem',
      fontFamily: 'var(--font-heading)',
      marginBottom: '24px',
      border: '4px solid #fff',
      boxShadow: 'var(--shadow-sm)'
    },
    name: {
      fontSize: '1.35rem',
      color: 'var(--bg-dark)',
      marginBottom: '8px'
    },
    role: {
      fontSize: '0.9rem',
      fontWeight: '700',
      color: 'var(--primary)',
      marginBottom: '16px',
      letterSpacing: '0.02em'
    },
    desc: {
      fontSize: '0.9rem',
      color: 'var(--text-muted)',
      lineHeight: '1.6',
      marginBottom: '24px'
    },
    credsBox: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '0.8rem',
      color: 'var(--text-main)',
      padding: '8px 12px',
      backgroundColor: '#fff',
      borderRadius: 'var(--radius-sm)',
      border: '1px solid var(--border-light)',
      marginTop: 'auto'
    }
  };

  return (
    <section id="specialists" className="section" style={styles.section}>
      <div className="container">
        <div className="text-center">
          <span className="section-tag">Clinical Specialists</span>
          <h2 className="section-title">Meet Our Medical Team</h2>
          <p className="section-desc">
            Our board-certified physical therapists are dedicated clinical specialists focused on restoring your movement and improving your recovery index.
          </p>
        </div>

        <div style={styles.grid}>
          {team.map((doc, idx) => {
            const initials = doc.name.split(' ')[1].substring(0, 2).toUpperCase();
            return (
              <div 
                key={idx} 
                ref={el => cardRefs.current[idx] = el}
                style={{ ...styles.card, transitionDelay: `${idx * 80}ms` }}
                className="specialist-card reveal-card"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-premium)';
                  e.currentTarget.style.borderColor = 'rgba(13, 148, 136, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                  e.currentTarget.style.borderColor = 'var(--border-light)';
                }}
              >
                <div className="specialist-avatar-wrap">
                  <div style={{ ...styles.avatarPlaceholder, marginBottom: 0, border: 'none', boxShadow: 'none' }}>
                    {initials}
                  </div>
                </div>
                <h3 style={styles.name}>{doc.name}</h3>
                <div style={styles.role}>{doc.role}</div>
                <p style={styles.desc}>{doc.desc}</p>
                <div style={styles.credsBox}>
                  <ShieldCheck size={14} color="var(--primary)" />
                  <span>{doc.creds}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

