import React from 'react';
import { Target, Award, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function WhyChooseUs() {
  const differentiators = [
    {
      icon: <Target size={32} color="var(--primary)" />,
      title: "Individualized Therapy",
      desc: "No template-based programs. We analyze your precise posture, muscle imbalances, and joint ranges to construct customized protocols."
    },
    {
      icon: <Award size={32} color="var(--primary)" />,
      title: "Modern Rehab Equipment",
      desc: "Our clinic houses state-of-the-art diagnostic, mechanical, and electrotherapy technologies to optimize the effectiveness of your sessions."
    },
    {
      icon: <ShieldCheck size={32} color="var(--primary)" />,
      title: "Accredited Therapists",
      desc: "Our clinicians undergo continuous postgraduate training in manual adjustments, dry needling, and therapeutic exercise protocols."
    },
    {
      icon: <HeartHandshake size={32} color="var(--primary)" />,
      title: "Holistic Health Support",
      desc: "We look beyond local pain zones to target postural habits, nutrition, and home exercises, ensuring your pain stays gone forever."
    }
  ];

  const styles = {
    section: {
      backgroundColor: 'var(--bg-card)',
      borderBottom: '1px solid var(--border-light)'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
      gap: '32px'
    },
    card: {
      padding: '40px 24px',
      borderRadius: 'var(--radius-lg)',
      backgroundColor: 'var(--bg-main)',
      border: '1px solid var(--border-light)',
      textAlign: 'center',
      transition: 'var(--transition-smooth)'
    },
    iconBox: {
      width: '72px',
      height: '72px',
      borderRadius: '50%',
      backgroundColor: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 24px',
      boxShadow: 'var(--shadow-sm)'
    },
    title: {
      fontSize: '1.25rem',
      marginBottom: '12px',
      color: 'var(--bg-dark)'
    },
    desc: {
      fontSize: '0.9rem',
      color: 'var(--text-muted)',
      lineHeight: '1.6'
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
    <section className="section" style={styles.section}>
      <div className="container">
        <div className="text-center">
          <span className="section-tag">Our Strengths</span>
          <h2 className="section-title">Why Choose <span className="notranslate">{getIsTamil() ? 'தி தெரபி யூனிவர்ஸ்' : 'THE THERAPY UNIVERSE'}</span></h2>
          <p className="section-desc">
            We are dedicated to providing the highest quality clinical care so that you can return to what you love with strength, balance, and freedom from pain.
          </p>
        </div>

        <div style={styles.grid}>
          {differentiators.map((diff, index) => (
            <div 
              key={index} 
              style={styles.card}
              className="why-card"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                e.currentTarget.style.borderColor = 'var(--primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'var(--border-light)';
              }}
            >
              <div style={styles.iconBox}>{diff.icon}</div>
              <h3 style={styles.title}>{diff.title}</h3>
              <p style={styles.desc}>{diff.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
