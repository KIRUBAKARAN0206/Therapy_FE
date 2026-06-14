import React, { useEffect, useRef } from 'react';
import { HeartPulse, GraduationCap, Award, CalendarClock } from 'lucide-react';

export default function About() {
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

  const values = [
    {
      icon: <HeartPulse size={24} color="var(--primary)" />,
      title: "Patient-Centered Care",
      desc: "Every rehabilitation program is uniquely structured around your personal recovery goals, physical limits, and lifestyle."
    },
    {
      icon: <GraduationCap size={24} color="var(--primary)" />,
      title: "Evidence-Based Science",
      desc: "Our therapists utilize clinical research and proven medical protocols to assure effective and safe healing journeys."
    },
    {
      icon: <Award size={24} color="var(--primary)" />,
      title: "Certified Practitioners",
      desc: "Our board-certified experts continuously train in advanced therapeutic disciplines to bring you the best treatments."
    },
    {
      icon: <CalendarClock size={24} color="var(--primary)" />,
      title: "Flexible Sessions",
      desc: "We adapt to your schedule with morning, evening, and weekend booking windows to guarantee continuous recovery."
    }
  ];

  const styles = {
    section: {
      background: 'var(--gradient-light)',
      borderBottom: '1px solid var(--border-light)'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: '1.2fr 0.8fr',
      gap: '60px',
      alignItems: 'center'
    },
    subText: {
      fontSize: '1.1rem',
      color: 'var(--text-muted)',
      lineHeight: '1.7',
      marginBottom: '32px'
    },
    valuesGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '24px'
    },
    valueCard: {
      padding: '24px',
      borderRadius: 'var(--radius-md)',
      background: 'var(--bg-main)',
      border: '1px solid var(--border-light)',
      transition: 'var(--transition-smooth)'
    },
    valueTitle: {
      fontSize: '1.15rem',
      margin: '16px 0 8px',
      color: 'var(--bg-dark)'
    },
    valueDesc: {
      fontSize: '0.9rem',
      color: 'var(--text-muted)',
      lineHeight: '1.6'
    },
    rightSide: {
      padding: '40px',
      background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
      borderRadius: 'var(--radius-lg)',
      color: '#fff',
      boxShadow: 'var(--shadow-lg)'
    },
    highlightBox: {
      display: 'flex',
      flexDirection: 'column',
      gap: '24px'
    },
    highlightItem: {
      borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
      paddingBottom: '20px'
    },
    highlightNum: {
      fontFamily: 'var(--font-heading)',
      fontSize: '2.5rem',
      fontWeight: '800',
      marginBottom: '4px'
    },
    highlightTitle: {
      fontWeight: '600',
      fontSize: '1.1rem',
      opacity: 0.9
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
    <section id="about" className="section" style={styles.section}>
      <div className="container">
        <div style={styles.grid} className="about-grid">
          <div>
            <span className="section-tag">About Our Clinic</span>
            <h2 className="section-title">Restoring Your Function, Movement, and Quality of Life</h2>
            <p style={styles.subText}>
              At <span className="notranslate">{getIsTamil() ? 'தி தெரபி யூனிவர்ஸ்' : 'THE THERAPY UNIVERSE'}</span>, we believe that physical therapy is not just about relieving pain—it is about restoring your independence and performance. Whether you are recovering from a sports injury, managing chronic conditions, or healing post-surgery, our modern clinic is equipped to support you.
            </p>
            <div style={styles.valuesGrid} className="values-grid">
              {values.map((v, idx) => (
                <div 
                  key={idx} 
                  ref={el => cardRefs.current[idx] = el}
                  style={{ ...styles.valueCard, transitionDelay: `${idx * 80}ms` }}
                  className="about-value-card reveal-card"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                    e.currentTarget.style.borderColor = 'var(--primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                    e.currentTarget.style.borderColor = 'var(--border-light)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', borderRadius: '50%', background: 'var(--primary-glow)', marginBottom: '16px' }}>
                    {v.icon}
                  </div>
                  <h3 style={styles.valueTitle}>{v.title}</h3>
                  <p style={styles.valueDesc}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div style={styles.rightSide} className="about-highlight-box">
            <div style={styles.highlightBox}>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '8px', color: '#fff' }}>Why We Stand Out</h3>
              <div style={styles.highlightItem}>
                <div style={styles.highlightNum}>15+</div>
                <div style={styles.highlightTitle}>Years of Combined Experience</div>
              </div>
              <div style={styles.highlightItem}>
                <div style={styles.highlightNum}>100%</div>
                <div style={styles.highlightTitle}>Customized Treatment Plans</div>
              </div>
              <div style={{ ...styles.highlightItem, border: 'none', paddingBottom: 0 }}>
                <div style={styles.highlightNum}>24/7</div>
                <div style={styles.highlightTitle}>Support & Rehabilitation Care</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .about-highlight-box {
            max-width: 500px;
            margin: 0 auto;
            width: 100%;
          }
        }
        @media (max-width: 576px) {
          .values-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
