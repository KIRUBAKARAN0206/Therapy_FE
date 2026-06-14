import React, { useState, useEffect } from 'react';
import { Users, CheckCircle, Award, Calendar } from 'lucide-react';

export default function Stats() {
  // Target values for counters
  const targets = {
    patients: 15000,
    recoveries: 99,
    therapists: 12,
    experience: 15
  };

  const [counts, setCounts] = useState({
    patients: 0,
    recoveries: 0,
    therapists: 0,
    experience: 0
  });

  useEffect(() => {
    const duration = 1500; // Animation duration in milliseconds
    const frameRate = 1000 / 60; // 60 fps
    const totalFrames = Math.round(duration / frameRate);
    
    let frame = 0;
    
    const counterInterval = setInterval(() => {
      frame++;
      
      const progress = frame / totalFrames;
      // Simple ease-out quad transition
      const easeProgress = progress * (2 - progress);

      setCounts({
        patients: Math.floor(easeProgress * targets.patients),
        recoveries: Math.floor(easeProgress * targets.recoveries),
        therapists: Math.floor(easeProgress * targets.therapists),
        experience: Math.floor(easeProgress * targets.experience)
      });

      if (frame >= totalFrames) {
        clearInterval(counterInterval);
        // Ensure exact final numbers
        setCounts(targets);
      }
    }, frameRate);

    return () => clearInterval(counterInterval);
  }, []);

  const statsList = [
    {
      icon: <Users size={28} color="var(--primary)" />,
      value: counts.patients.toLocaleString() + "+",
      label: "Patients Treated",
      desc: "Recovered physical mobility"
    },
    {
      icon: <CheckCircle size={28} color="var(--primary)" />,
      value: counts.recoveries + "%",
      label: "Successful Recoveries",
      desc: "Proven clinical recovery index"
    },
    {
      icon: <Award size={28} color="var(--primary)" />,
      value: counts.therapists + "+",
      label: "Expert Therapists",
      desc: "Board-certified specialists"
    },
    {
      icon: <Calendar size={28} color="var(--primary)" />,
      value: counts.experience + "+",
      label: "Years of Experience",
      desc: "Combined clinical practice"
    }
  ];

  const styles = {
    section: {
      padding: '40px 24px 80px',
      position: 'relative',
      overflow: 'hidden'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: '24px',
      maxWidth: '1200px',
      margin: '0 auto',
      position: 'relative',
      zIndex: 2
    },
    card: {
      background: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      border: '1px solid rgba(30, 64, 175, 0.05)',
      padding: '32px 24px',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-md)',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '12px',
      transition: 'var(--transition-smooth)'
    },
    iconBox: {
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      backgroundColor: 'var(--primary-glow)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '8px'
    },
    num: {
      fontFamily: 'var(--font-heading)',
      fontSize: '2.5rem',
      fontWeight: '800',
      background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      lineHeight: '1'
    },
    label: {
      fontSize: '1.05rem',
      fontWeight: '700',
      color: 'var(--bg-dark)'
    },
    desc: {
      fontSize: '0.8rem',
      color: 'var(--text-muted)',
      lineHeight: '1.4'
    }
  };

  return (
    <section style={styles.section}>
      <div style={styles.grid}>
        {statsList.map((stat, idx) => (
          <div 
            key={idx} 
            className="glass-card stats-glass-card"
            style={{ 
              ...styles.card, 
              transitionDelay: `${idx * 60}ms` 
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-premium)';
              e.currentTarget.style.borderColor = 'var(--primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              e.currentTarget.style.borderColor = 'rgba(30, 64, 175, 0.05)';
            }}
          >
            <div style={styles.iconBox}>{stat.icon}</div>
            <div style={styles.num}>{stat.value}</div>
            <div style={styles.label}>{stat.label}</div>
            <div style={styles.desc}>{stat.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
