import React, { useEffect, useRef } from 'react';
import { Award, Target, Sparkles } from 'lucide-react';
import doctorImg from '../assets/balasurya_avatar.png';

export default function Specialists() {
  const containerRef = useRef(null);

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

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const specialities = [
    { title: "Manual Therapy", desc: "Joint mobilization & manipulations" },
    { title: "Sports Rehab", desc: "Injury recovery & athletic performance" },
    { title: "Orthopedics", desc: "Bone, muscle & joint conditions" },
    { title: "Pain Management", desc: "Chronic pain relief therapies" },
    { title: "Post-Surgical Care", desc: "Post-op function restoration" },
    { title: "Myofascial Release", desc: "Trigger point & muscle tension relief" },
    { title: "Pediatric Therapy", desc: "Child development & pediatric rehab" }
  ];

  return (
    <section id="specialists" className="specialists-section-premium">
      {/* Brand color ambient background glows */}
      <div className="section-glow-1" />
      <div className="section-glow-2" />

      <div className="container">
        <div ref={containerRef} className="reveal-card">
          <div className="text-center-premium">
            <span className="section-tag-premium">
              <Sparkles size={14} className="sparkle-icon" style={{ marginRight: '6px' }} />
              Clinical Leadership
            </span>
            <h2 className="section-title-premium">Meet Our Clinical Director</h2>
            <p className="section-desc-premium">
              Evidence-based physical rehabilitation and recovery care driven by professional clinical expertise.
            </p>
          </div>

          <div className="specialist-showcase-card">
            {/* Decorative background gradients */}
            <div className="card-bg-gradient-1" />
            <div className="card-bg-gradient-2" />

            <div className="specialist-grid">
              {/* Image Column */}
              <div className="specialist-image-column">
                <div className="specialist-image-container-wrap">
                  <div className="specialist-image-ring" />
                  <div className="specialist-image-holder">
                    <img 
                      src={doctorImg} 
                      alt="Dr. BALASURYA PT" 
                      className="doctor-main-img"
                    />
                    <div className="doctor-badge-premium">
                      <Award size={14} style={{ marginRight: '4px' }} />
                      <span>Clinical Director</span>
                    </div>
                  </div>
                </div>

                {/* Doctor Stats inside card */}
                <div className="doctor-stats-grid">
                  <div className="doctor-stat-item">
                    <span className="doctor-stat-num">99%</span>
                    <span className="doctor-stat-label">Success Rate</span>
                  </div>
                  <div className="doctor-stat-item">
                    <span className="doctor-stat-num">100%</span>
                    <span className="doctor-stat-label">Personalized Care</span>
                  </div>
                </div>
              </div>

              {/* Content Column */}
              <div className="specialist-details-column">
                <div className="doctor-header-area">
                  <span className="doctor-role-tag">Clinical Physiotherapist</span>
                  <h3 className="doctor-name-title">Dr. BALASURYA PT</h3>
                  <div className="doctor-subtitle">Consultant & Specialist in Physical Rehabilitation</div>
                </div>

                <p className="doctor-bio-text">
                  Dedicated Clinical Specialist specializing in personalized physical rehabilitation, advanced pain relief therapies, and customized recovery plans to restore optimal function. Employs advanced techniques to accelerate clinical outcomes.
                </p>

                <div className="speciality-section">
                  <h4 className="speciality-heading">
                    <Target size={16} style={{ color: '#9ecc14', marginRight: '8px' }} />
                    Core Areas of Expertise
                  </h4>
                  <div className="speciality-badges-grid">
                    {specialities.map((spec, idx) => (
                      <div className="speciality-badge-item" key={idx}>
                        <span className="speciality-dot" />
                        <div className="speciality-badge-content">
                          <span className="speciality-title-text">{spec.title}</span>
                          <span className="speciality-desc-text">{spec.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="doctor-quote-box">
                  <div className="quote-icon-bg">“</div>
                  <p className="doctor-quote-text">
                    "Rehabilitation is not just about physical exercises; it is about restoring confidence, eliminating pain, and helping you reclaim your active life."
                  </p>
                </div>

                <div className="doctor-social-connect">
                  <span className="connect-text">Connect Directly:</span>
                  <div className="connect-buttons">
                    <a href="https://wa.me/918220952580" target="_blank" rel="noopener noreferrer" className="connect-btn-item wa" aria-label="WhatsApp">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.528 1.977 14.07 1.948 12.012 1.948c-5.435 0-9.865 4.371-9.87 9.8.001 1.737.478 3.427 1.38 4.931l-.989 3.61 3.733-.968zM16.8 13.91c-.26-.13-1.54-.76-1.78-.85-.24-.09-.41-.13-.58.13-.17.26-.66.83-.81.99-.15.17-.3.19-.56.06-.26-.13-1.1-.41-2.1-1.3-.78-.7-1.31-1.56-1.46-1.82-.15-.26-.02-.4.11-.53.12-.11.26-.3.39-.46.13-.15.17-.26.26-.43.09-.17.04-.32-.02-.45-.06-.13-.58-1.4-.79-1.92-.21-.52-.42-.45-.58-.45-.15 0-.33-.02-.52-.02-.19 0-.5.07-.76.36-.26.29-1 .98-1 2.38s1.02 2.76 1.16 2.96c.14.19 2 3.05 4.85 4.28.68.29 1.21.47 1.62.6.68.22 1.3.19 1.79.11.55-.08 1.54-.63 1.76-1.24.22-.61.22-1.13.15-1.24-.07-.12-.26-.18-.52-.31z" /></svg>
                    </a>
                    <a href="https://www.instagram.com/balasurya_1610?utm_source=qr&igsh=bHZyYmNzZ2pwYng5" target="_blank" rel="noopener noreferrer" className="connect-btn-item ig" aria-label="Instagram">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                    </a>
                    <a href="https://www.facebook.com/balasurya.balasurya.372" target="_blank" rel="noopener noreferrer" className="connect-btn-item fb" aria-label="Facebook">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .specialists-section-premium {
          padding: 100px 24px;
          background: linear-gradient(135deg, #053b41 0%, #086972 50%, #064f56 100%); /* Gorgeous Medical Teal Gradient background */
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          position: relative;
          overflow: hidden;
        }

        .section-glow-1 {
          position: absolute;
          top: -10%;
          left: 5%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(158, 204, 20, 0.08) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .section-glow-2 {
          position: absolute;
          bottom: -10%;
          right: 5%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(20, 184, 166, 0.12) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .text-center-premium {
          text-align: center;
          margin-bottom: 60px;
          position: relative;
          z-index: 1;
        }

        .section-tag-premium {
          display: inline-flex;
          align-items: center;
          padding: 8px 18px;
          border-radius: 50px;
          background-color: rgba(158, 204, 20, 0.15);
          color: #9ecc14;
          font-weight: 700;
          font-size: 0.85rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          border: 1px solid rgba(158, 204, 20, 0.25);
          margin-bottom: 20px;
          box-shadow: 0 4px 12px rgba(158, 204, 20, 0.05);
        }

        .sparkle-icon {
          animation: spin-pulse 3s linear infinite;
        }

        @keyframes spin-pulse {
          0% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.2) rotate(180deg); }
          100% { transform: scale(1) rotate(360deg); }
        }

        .section-title-premium {
          font-size: 2.5rem;
          font-weight: 850;
          color: #ffffff;
          margin-bottom: 16px;
          letter-spacing: -0.02em;
          text-shadow: 0 2px 12px rgba(0,0,0,0.15);
        }

        .section-desc-premium {
          max-width: 600px;
          margin: 0 auto;
          font-size: 1.05rem;
          color: #bde3de;
          line-height: 1.6;
        }

        /* Showcase Card - Rich Glassmorphism Box */
        .specialist-showcase-card {
          position: relative;
          background: linear-gradient(135deg, rgba(10, 48, 55, 0.95) 0%, rgba(3, 25, 29, 0.98) 100%); /* Rich distinct card background box */
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-radius: var(--radius-lg);
          border: 1px solid rgba(158, 204, 20, 0.35); /* Glowing Lime Border */
          box-shadow: 0 40px 100px -25px rgba(2, 20, 22, 0.85), 0 0 25px rgba(158, 204, 20, 0.08);
          max-width: 980px;
          margin: 0 auto;
          padding: 48px;
          overflow: hidden;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), 
                      box-shadow 0.6s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.4s ease;
        }

        .specialist-showcase-card:hover {
          transform: translateY(-8px);
          border-color: #9ecc14;
          box-shadow: 0 50px 110px -25px rgba(2, 20, 22, 0.95), 0 0 35px rgba(158, 204, 20, 0.25);
        }

        .card-bg-gradient-1 {
          position: absolute;
          top: -20%;
          left: -20%;
          width: 50%;
          height: 50%;
          background: radial-gradient(circle, rgba(158, 204, 20, 0.1) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .card-bg-gradient-2 {
          position: absolute;
          bottom: -20%;
          right: -20%;
          width: 50%;
          height: 50%;
          background: radial-gradient(circle, rgba(20, 184, 166, 0.1) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .specialist-grid {
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 48px;
          position: relative;
          z-index: 1;
        }

        /* Image Column */
        .specialist-image-column {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 32px;
        }

        .specialist-image-container-wrap {
          position: relative;
          width: 250px;
          height: 250px;
        }

        .specialist-image-ring {
          position: absolute;
          inset: -6px;
          border-radius: 50%;
          background: linear-gradient(135deg, #086972 0%, #9ecc14 100%);
          z-index: 0;
          opacity: 0.85;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .specialist-showcase-card:hover .specialist-image-ring {
          transform: rotate(180deg) scale(1.03);
        }

        .specialist-image-holder {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: #064047;
          padding: 6px;
          z-index: 1;
          overflow: hidden;
          box-shadow: var(--shadow-md);
        }

        .doctor-main-img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .specialist-showcase-card:hover .doctor-main-img {
          transform: scale(1.06);
        }

        .doctor-badge-premium {
          position: absolute;
          bottom: 12px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(135deg, #086972 0%, #9ecc14 100%);
          color: #ffffff;
          padding: 6px 14px;
          border-radius: 50px;
          font-size: 0.75rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          white-space: nowrap;
          box-shadow: 0 8px 16px rgba(4, 53, 58, 0.3);
          border: 2px solid #064047;
        }

        .doctor-stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          width: 100%;
        }

        .doctor-stat-item {
          background: rgba(158, 204, 20, 0.05); /* Tinted with brand lime */
          border: 1px solid rgba(158, 204, 20, 0.2); /* Soft glowing lime border */
          padding: 16px 10px;
          border-radius: var(--radius-md);
          text-align: center;
          transition: background-color 0.3s ease, border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
        }

        .specialist-showcase-card:hover .doctor-stat-item {
          background: rgba(158, 204, 20, 0.12);
          border-color: #9ecc14;
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(158, 204, 20, 0.12);
        }

        .doctor-stat-num {
          display: block;
          font-size: 1.6rem;
          font-weight: 850;
          color: #9ecc14;
          font-family: var(--font-heading);
          margin-bottom: 2px;
        }

        .doctor-stat-label {
          font-size: 0.75rem;
          font-weight: 650;
          color: #bde3de;
        }

        /* Content Column */
        .specialist-details-column {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .doctor-header-area {
          margin-bottom: 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding-bottom: 20px;
        }

        .doctor-role-tag {
          font-size: 0.85rem;
          font-weight: 750;
          color: #9ecc14;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          display: block;
          margin-bottom: 6px;
        }

        .doctor-name-title {
          font-size: 2.2rem;
          font-weight: 850;
          color: #ffffff;
          margin-bottom: 8px;
        }

        .doctor-subtitle {
          font-size: 1.05rem;
          font-weight: 600;
          color: #e2f1f0;
        }

        .doctor-bio-text {
          font-size: 0.98rem;
          color: #cbd5e1;
          line-height: 1.7;
          margin-bottom: 28px;
        }

        /* Specialities Grid */
        .speciality-section {
          margin-bottom: 28px;
        }

        .speciality-heading {
          font-size: 1.05rem;
          font-weight: 750;
          color: #ffffff;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
        }

        .speciality-badges-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .speciality-badge-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 10px;
          border-radius: var(--radius-sm);
          transition: transform 0.2s ease;
        }

        .speciality-badge-item:hover {
          transform: translateX(4px);
        }

        .speciality-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #9ecc14;
          margin-top: 6px;
          flex-shrink: 0;
          box-shadow: 0 0 10px #9ecc14;
        }

        .speciality-title-text {
          display: block;
          font-size: 0.9rem;
          font-weight: 700;
          color: #e2f1f0;
        }

        .speciality-desc-text {
          font-size: 0.78rem;
          color: #a5c7c4;
          display: block;
          margin-top: 2px;
        }

        /* Quote box */
        .doctor-quote-box {
          position: relative;
          background: rgba(158, 204, 20, 0.04); /* Tinted with brand lime */
          border-left: 4px solid #9ecc14;
          padding: 20px 24px;
          border-radius: 0 var(--radius-md) var(--radius-md) 0;
          margin-bottom: 32px;
          overflow: hidden;
          border-top: 1px solid rgba(158, 204, 20, 0.1);
          border-right: 1px solid rgba(158, 204, 20, 0.1);
          border-bottom: 1px solid rgba(158, 204, 20, 0.1);
        }

        .quote-icon-bg {
          position: absolute;
          right: 12px;
          bottom: -15px;
          font-size: 6rem;
          font-weight: 900;
          color: rgba(255, 255, 255, 0.02);
          font-family: Georgia, serif;
          line-height: 1;
          user-select: none;
        }

        .doctor-quote-text {
          font-style: italic;
          font-size: 0.95rem;
          color: #cbd5e1;
          line-height: 1.6;
          position: relative;
          z-index: 1;
        }

        /* Social Connect */
        .doctor-social-connect {
          display: flex;
          align-items: center;
          gap: 16px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: 24px;
        }

        .connect-text {
          font-size: 0.9rem;
          font-weight: 700;
          color: #a5c7c4;
        }

        .connect-buttons {
          display: flex;
          gap: 12px;
        }

        .connect-btn-item {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #cbd5e1;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), 
                      background-color 0.3s ease, 
                      color 0.3s ease,
                      border-color 0.3s ease;
        }

        .connect-btn-item:hover {
          transform: translateY(-4px) scale(1.08);
          color: #ffffff;
        }

        .connect-btn-item.wa:hover {
          background-color: #25D366;
          border-color: #25D366;
          box-shadow: 0 6px 14px rgba(37, 211, 102, 0.3);
        }

        .connect-btn-item.ig:hover {
          background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
          border-color: transparent;
          box-shadow: 0 6px 14px rgba(220, 39, 67, 0.3);
        }

        .connect-btn-item.fb:hover {
          background-color: #1877F2;
          border-color: #1877F2;
          box-shadow: 0 6px 14px rgba(24, 119, 242, 0.3);
        }

        /* Responsive Layouts */
        @media (max-width: 992px) {
          .specialist-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .specialist-image-column {
            max-width: 400px;
            margin: 0 auto;
            width: 100%;
          }
          .specialist-showcase-card {
            padding: 32px 24px;
          }
        }

        @media (max-width: 576px) {
          .speciality-badges-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }
          .doctor-name-title {
            font-size: 1.8rem;
          }
          .doctor-stats-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }
        }
      `}</style>
    </section>
  );
}
