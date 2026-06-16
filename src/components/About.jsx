import React, { useEffect, useRef } from 'react';
import { HeartPulse, GraduationCap, Award, CalendarClock, Play } from 'lucide-react';
import therapyVideo from '../assets/Therapy Video.mp4';

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
      icon: <HeartPulse size={22} color="var(--primary-bg)" />,
      title: "Patient-Centered Care",
      desc: "Every rehabilitation program is uniquely structured around your personal recovery goals, physical limits, and lifestyle."
    },
    {
      icon: <GraduationCap size={22} color="var(--primary-bg)" />,
      title: "Evidence-Based Science",
      desc: "Our therapists utilize clinical research and proven medical protocols to assure effective and safe healing journeys."
    },
    {
      icon: <Award size={22} color="var(--primary-bg)" />,
      title: "Certified Practitioners",
      desc: "Our board-certified experts continuously train in advanced therapeutic disciplines to bring you the best treatments."
    },
    {
      icon: <CalendarClock size={22} color="var(--primary-bg)" />,
      title: "Flexible Sessions",
      desc: "We adapt to your schedule with morning, evening, and weekend booking windows to guarantee continuous recovery."
    }
  ];

  const styles = {
    section: {
      background: 'var(--gradient-light)',
      borderBottom: '1px solid var(--border-light)',
      padding: '100px 24px',
      position: 'relative',
      overflow: 'hidden'
    },
    introGrid: {
      display: 'grid',
      gridTemplateColumns: '1.25fr 0.75fr',
      gap: '56px',
      alignItems: 'center',
      position: 'relative',
      zIndex: 1
    },
    subText: {
      fontSize: '1.05rem',
      color: 'var(--text-muted)',
      lineHeight: '1.7',
      marginBottom: '16px'
    },
    valuesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '24px'
    },
    valueCard: {
      padding: '30px 24px',
      borderRadius: 'var(--radius-lg)',
      background: 'rgba(255, 255, 255, 0.75)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      border: '1px solid rgba(255, 255, 255, 0.6)',
      boxShadow: 'var(--shadow-sm)',
      transition: 'var(--transition-smooth)',
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    },
    valueTitle: {
      fontSize: '1.1rem',
      margin: '14px 0 8px',
      color: 'var(--bg-dark)',
      fontWeight: '700'
    },
    valueDesc: {
      fontSize: '0.88rem',
      color: 'var(--text-muted)',
      lineHeight: '1.6'
    },
    rightSide: {
      padding: '28px',
      background: 'rgba(255, 255, 255, 0.75)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid rgba(255, 255, 255, 0.9)',
      boxShadow: 'var(--shadow-premium)',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
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
      {/* Visual background elements */}
      <div className="about-glow-orb" />

      <div className="container">
        {/* Top Row: Intro Grid */}
        <div style={styles.introGrid} className="about-intro-grid">
          {/* Left Column (Content & Brand Intro) */}
          <div className="about-intro-text">
            <span className="section-tag">About Our Clinic</span>
            <h2 className="section-title">Restoring Your Function, Movement, and Quality of Life</h2>
            <p style={styles.subText}>
              At <span className="notranslate">{getIsTamil() ? 'தி தெரபி யூனிவர்ஸ்' : 'THE THERAPY UNIVERSE'}</span>, we believe that physical therapy is not just about relieving pain—it is about restoring your independence and performance. Whether you are recovering from a sports injury, managing chronic conditions, or healing post-surgery, our modern clinic is equipped to support you.
            </p>
            {/* Dynamic mini badges to highlight clinic features */}
            <div className="intro-badges">
              <div className="intro-badge">
                <span className="badge-dot" />
                <span>Personalized Recovery Plans</span>
              </div>
              <div className="intro-badge">
                <span className="badge-dot" />
                <span>Expert Certified Therapists</span>
              </div>
              <div className="intro-badge">
                <span className="badge-dot" />
                <span>State-of-the-Art Clinic</span>
              </div>
            </div>
          </div>
          
          {/* Right Column (Video Showcase) */}
          <div style={styles.rightSide} className="about-highlight-box">
            <div className="video-tour-header">
              <div className="video-tour-tag">
                <Play size={10} fill="currentColor" />
                <span>Video Tour</span>
              </div>
              <h3 className="video-tour-title">Clinical Rehabilitation in Action</h3>
              <p className="video-tour-subtitle">Take a visual tour of our modern clinical therapy procedures.</p>
            </div>

            <div className="video-player-container-premium">
              <video 
                src={therapyVideo} 
                controls 
                playsInline
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 'var(--radius-md)',
                  objectFit: 'contain', /* CRITICAL: Ensures the video is fully visible with ZERO cropping */
                  display: 'block',
                  backgroundColor: '#041618', /* Deep clinical teal dark shade instead of harsh black */
                  boxShadow: 'inset 0 0 20px rgba(0,0,0,0.6)'
                }}
              />
            </div>
          </div>
        </div>

        {/* Bottom Row: Values Pillars Grid */}
        <div className="values-section-wrapper">
          <div className="values-header">
            <span className="values-tag-line">Our Core Values</span>
            <h3 className="values-section-title">The Pillars of Our Therapeutic Excellence</h3>
          </div>

          <div style={styles.valuesGrid} className="values-grid">
            {values.map((v, idx) => (
              <div 
                key={idx} 
                ref={el => cardRefs.current[idx] = el}
                style={{ ...styles.valueCard, transitionDelay: `${idx * 60}ms` }}
                className="about-value-card reveal-card"
              >
                <div className="value-icon-container">
                  {v.icon}
                </div>
                <h3 style={styles.valueTitle}>{v.title}</h3>
                <p style={styles.valueDesc}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .about-glow-orb {
          position: absolute;
          top: -10%;
          right: -10%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(158, 204, 20, 0.04) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .about-intro-grid {
          display: grid;
          grid-template-columns: 1.25fr 0.75fr;
          gap: 56px;
          align-items: center;
          margin-bottom: 70px;
        }

        .intro-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          margin-top: 24px;
        }

        .intro-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: rgba(255, 255, 255, 0.6);
          border: 1px solid var(--border-light);
          border-radius: var(--radius-sm);
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--primary-bg);
          box-shadow: var(--shadow-sm);
        }

        .badge-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: var(--secondary-bg);
        }

        .video-tour-header {
          border-bottom: 1px solid var(--border-light);
          padding-bottom: 16px;
        }

        .video-tour-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          background: rgba(8, 105, 114, 0.08);
          color: var(--primary-bg);
          border-radius: 50px;
          font-size: 0.75rem;
          font-weight: 750;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 10px;
        }

        .video-tour-title {
          font-size: 1.35rem;
          font-weight: 800;
          color: var(--primary-bg);
          margin-bottom: 4px;
        }

        .video-tour-subtitle {
          font-size: 0.82rem;
          color: var(--text-muted);
          line-height: 1.4;
        }

        .video-player-container-premium {
          position: relative;
          background: linear-gradient(135deg, #053b41 0%, #032528 100%);
          padding: 8px;
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-md);
          border: 1px solid rgba(8, 105, 114, 0.15);
        }

        .values-section-wrapper {
          border-top: 1px solid rgba(8, 105, 114, 0.08);
          padding-top: 60px;
          width: 100%;
        }

        .values-header {
          text-align: center;
          margin-bottom: 44px;
        }

        .values-tag-line {
          font-size: 0.85rem;
          font-weight: 750;
          color: var(--primary-bg);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          display: inline-block;
          margin-bottom: 8px;
        }

        .values-section-title {
          font-size: 2.1rem;
          font-weight: 850;
          color: var(--bg-dark);
          letter-spacing: -0.02em;
        }

        .values-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          width: 100%;
        }

        .about-value-card {
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                      background-color 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }

        .about-value-card:hover {
          transform: translateY(-8px) !important;
          box-shadow: var(--shadow-premium) !important;
          border-color: rgba(8, 105, 114, 0.35) !important;
          background-color: #ffffff !important;
        }

        .value-icon-container {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 46px;
          height: 46px;
          border-radius: 50%;
          background-color: rgba(8, 105, 114, 0.08);
          margin-bottom: 16px;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                      background-color 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .about-value-card:hover .value-icon-container {
          transform: scale(1.1) rotate(8deg);
          background-color: var(--primary-bg) !important;
        }

        .about-value-card:hover .value-icon-container svg {
          stroke: #ffffff !important;
        }

        @media (max-width: 1100px) {
          .values-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 24px !important;
          }
        }

        @media (max-width: 992px) {
          .about-intro-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .about-highlight-box {
            max-width: 650px !important;
            margin: 0 auto;
            width: 100%;
          }
        }

        @media (max-width: 640px) {
          .values-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .values-section-title {
            font-size: 1.65rem;
          }
          .intro-badges {
            flex-direction: column;
            gap: 10px;
          }
          .intro-badge {
            width: 100%;
          }
        }

        @media (max-width: 576px) {
          .video-tour-title {
            font-size: 1.15rem;
          }
        }
      `}</style>
    </section>
  );
}
