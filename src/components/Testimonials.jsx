import React from 'react';
import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    {
      name: "Marcus Aurelius",
      condition: "Treated for Chronic Herniated Disc",
      comment: "I had excruciating sciatica that prevented me from sitting for more than 10 minutes. Dr. Sarah designed a core stabilization program combined with manual joint releases. Today I am completely pain-free.",
      rating: 5
    },
    {
      name: "Sophia Martinez",
      condition: "Recovered from Shoulder Impingement",
      comment: "As a professional swimmer, shoulder pain threatened my career. The targeted rotator cuff strengthening sessions and dry needling here got me back in the water in record time. Phenomenal care!",
      rating: 5
    },
    {
      name: "David Jenkins",
      condition: "Post-ACL Surgery Rehabilitation",
      comment: "Exceptional clinical knowledge. The team mapped out a 6-month progress plan for my knee after surgery, auditing my gait index weekly. I can run and cut with confidence again.",
      rating: 5
    }
  ];

  const styles = {
    section: {
      backgroundColor: 'var(--bg-main)',
      borderBottom: '1px solid var(--border-light)'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: '32px'
    },
    card: {
      backgroundColor: 'var(--bg-card)',
      padding: '40px 32px',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-sm)',
      border: '1px solid var(--border-light)',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      transition: 'var(--transition-smooth)'
    },
    quoteIcon: {
      position: 'absolute',
      top: '32px',
      right: '32px',
      color: 'var(--primary-glow)',
      zIndex: 1
    },
    stars: {
      display: 'flex',
      gap: '4px',
      marginBottom: '20px',
      color: 'var(--accent)'
    },
    comment: {
      fontSize: '0.95rem',
      color: 'var(--text-muted)',
      lineHeight: '1.7',
      marginBottom: '24px',
      position: 'relative',
      zIndex: 2
    },
    clientInfo: {
      borderTop: '1px solid var(--border-light)',
      paddingTop: '20px',
      display: 'flex',
      flexDirection: 'column'
    },
    name: {
      fontSize: '1.1rem',
      fontWeight: '700',
      color: 'var(--bg-dark)'
    },
    condition: {
      fontSize: '0.8rem',
      color: 'var(--primary)',
      fontWeight: '600',
      marginTop: '2px'
    }
  };

  return (
    <section className="section" style={styles.section}>
      <div className="container">
        <div className="text-center">
          <span className="section-tag">Success Stories</span>
          <h2 className="section-title">What Our Patients Say</h2>
          <p className="section-desc">
            Discover how our evidence-based physical therapy methods have helped individuals restore movement, eliminate chronic pain, and return to an active lifestyle.
          </p>
        </div>

        <div style={styles.grid}>
          {reviews.map((rev, idx) => (
            <div 
              key={idx} 
              style={styles.card}
              className="testimonial-card"
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
              <Quote size={40} style={styles.quoteIcon} />
              <div>
                <div style={styles.stars}>
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" color="currentColor" />
                  ))}
                </div>
                <p style={styles.comment}>"{rev.comment}"</p>
              </div>
              <div style={styles.clientInfo}>
                <span style={styles.name}>{rev.name}</span>
                <span style={styles.condition}>{rev.condition}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
