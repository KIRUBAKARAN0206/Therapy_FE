import React, { useState } from 'react';
import { Target, Activity, Flame, ShieldCheck } from 'lucide-react';

export default function ProgramsPage() {
  const [activeTab, setActiveTab] = useState(0);

  const programs = [
    {
      title: "Spine & Posture Recovery Program",
      icon: <Activity size={24} />,
      subtitle: "Targeting chronic back pain, herniated discs, and posture correction",
      desc: "An intensive clinical pathway designed to decompress spinal columns, activate core stabilizers, and correct alignment. We utilize hands-on mobilization alongside mechanical therapy.",
      duration: "6 - 12 Weeks",
      frequency: "2 Sessions / Week",
      benefits: [
        "Relieves pressure on sciatic nerves",
        "Re-aligns structural muscle imbalances",
        "Increases spinal flex and core integrity",
        "Improves daily sitting/standing endurance"
      ]
    },
    {
      title: "Sports Performance Rehab Program",
      icon: <Target size={24} />,
      subtitle: "For athletes recovering from tendon, ligament, or muscle injuries",
      desc: "Focuses on biomechanical analysis, high-grade loading protocols, and speed/agility retraining to guarantee athletes return to their sports at 100% capacity safely.",
      duration: "4 - 8 Weeks",
      frequency: "3 Sessions / Week",
      benefits: [
        "Restores explosive muscle force and torque",
        "Accelerates ACL/MCL ligament healing",
        "Corrects athletic movement patterns",
        "Minimizes risks of recurrent strain"
      ]
    },
    {
      title: "Neurological & Gait Restoration Program",
      icon: <Flame size={24} />,
      subtitle: "Stroke recovery, Parkinson's coordination, and balance retraining",
      desc: "Custom neuro-rehab pathways aiming to trigger brain plasticity, restore gait balance index, and build physical confidence for daily activities.",
      duration: "12 - 24 Weeks",
      frequency: "2 Sessions / Week",
      benefits: [
        "Re-trains neuromuscular motor control",
        "Enhances general walking balance and pace",
        "Promotes independent living skills",
        "Decreases fall risks significantly"
      ]
    },
    {
      title: "Post-Operative Strength Program",
      icon: <ShieldCheck size={24} />,
      subtitle: "Knee, hip, and shoulder joint replacement recovery",
      desc: "Strict evidence-based protocols that manage post-op inflammation, release scar tissue, rebuild supporting muscle structures, and restore functional ranges.",
      duration: "8 - 16 Weeks",
      frequency: "2 Sessions / Week",
      benefits: [
        "Accelerates joint recovery parameters",
        "Restores natural joint range of motion",
        "Strengthens surrounding bone stability",
        "Eliminates chronic surgical swelling"
      ]
    }
  ];

  const styles = {
    heroBanner: {
      background: 'linear-gradient(135deg, #f0fdfa 0%, #e0f2fe 100%)',
      padding: '80px 24px',
      textAlign: 'center',
      borderBottom: '1px solid var(--border-light)'
    },
    title: {
      fontSize: '2.5rem',
      color: 'var(--bg-dark)',
      marginBottom: '12px'
    },
    breadcrumb: {
      fontSize: '0.9rem',
      color: 'var(--text-muted)',
      fontWeight: '600',
      marginBottom: '40px'
    },
    container: {
      maxWidth: '1000px',
      margin: '0 auto 100px',
      padding: '0 24px'
    },
    tabsContainer: {
      display: 'flex',
      gap: '12px',
      overflowX: 'auto',
      paddingBottom: '16px',
      borderBottom: '2px solid var(--border-light)',
      marginBottom: '40px'
    },
    tabBtn: (isActive) => ({
      padding: '12px 24px',
      borderRadius: 'var(--radius-sm)',
      border: 'none',
      backgroundColor: isActive ? 'var(--primary-bg)' : 'rgba(255,255,255,0.8)',
      color: isActive ? '#fff' : 'var(--text-main)',
      fontWeight: '700',
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      transition: 'var(--transition-fast)',
      boxShadow: isActive ? 'var(--shadow-sm)' : 'none'
    }),
    panel: {
      display: 'grid',
      gridTemplateColumns: '1.2fr 0.8fr',
      gap: '48px',
      backgroundColor: 'var(--bg-card)',
      padding: '48px',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--border-light)',
      boxShadow: 'var(--shadow-premium)'
    },
    panelTitle: {
      fontSize: '1.8rem',
      marginBottom: '8px',
      color: 'var(--bg-dark)'
    },
    panelSub: {
      fontSize: '1rem',
      fontWeight: '600',
      color: 'var(--secondary)',
      marginBottom: '24px'
    },
    panelDesc: {
      fontSize: '0.975rem',
      color: 'var(--text-muted)',
      lineHeight: '1.7',
      marginBottom: '24px'
    },
    infoGrid: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      padding: '24px',
      backgroundColor: 'var(--bg-main)',
      borderRadius: 'var(--radius-md)',
      border: '1px solid var(--border-light)'
    },
    infoItem: {
      fontSize: '0.9rem',
      color: 'var(--text-main)',
      lineHeight: '1.5'
    },
    benefitItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      fontSize: '0.9rem',
      color: 'var(--text-main)',
      marginBottom: '8px'
    },
    dot: {
      width: '6px',
      height: '6px',
      backgroundColor: 'var(--secondary-bg)',
      borderRadius: '50%'
    }
  };

  return (
    <div className="fade-in">
      <div style={styles.heroBanner}>
        <h1 style={styles.title}>Recovery Programs</h1>
        <div style={styles.breadcrumb}>
          <a href="#/">Home</a> &nbsp;/&nbsp; <span style={{ color: 'var(--primary)' }}>Recovery Programs</span>
        </div>
      </div>

      <div style={styles.container}>
        {/* Tabs Headers */}
        <div style={styles.tabsContainer}>
          {programs.map((p, idx) => (
            <button
              key={idx}
              style={styles.tabBtn(activeTab === idx)}
              onClick={() => setActiveTab(idx)}
            >
              {p.title}
            </button>
          ))}
        </div>

        {/* Tab Panel Content */}
        <div style={styles.panel} className="treatment-panel">
          <div>
            <h2 style={styles.panelTitle}>{programs[activeTab].title}</h2>
            <div style={styles.panelSub}>{programs[activeTab].subtitle}</div>
            <p style={styles.panelDesc}>{programs[activeTab].desc}</p>
            
            <div style={{ marginTop: '24px' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', color: 'var(--bg-dark)' }}>Program Target Outcomes:</h3>
              <div>
                {programs[activeTab].benefits.map((b, i) => (
                  <div key={i} style={styles.benefitItem}>
                    <div style={styles.dot}></div>
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={styles.infoGrid}>
            <h3 style={{ fontSize: '1.15rem', color: 'var(--bg-dark)', marginBottom: '8px', borderBottom: '1px solid var(--border-light)', paddingBottom: '8px' }}>Program Index</h3>
            <div style={styles.infoItem}>
              <strong>Standard Duration:</strong><br />
              {programs[activeTab].duration}
            </div>
            <div style={styles.infoItem}>
              <strong>Session Frequency:</strong><br />
              {programs[activeTab].frequency}
            </div>
            <div style={styles.infoItem}>
              <strong>Clinical Assessment:</strong><br />
              Required prior to enrollment.
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .treatment-panel {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
            padding: 24px !important;
          }
        }
      `}</style>
    </div>
  );
}
