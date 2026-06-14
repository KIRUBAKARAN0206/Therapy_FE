import React, { useState, useEffect, useRef } from 'react';
import { Target, Activity, ShieldAlert, Award, RefreshCw, Layers } from 'lucide-react';
import conditionsHeroImg from '../assets/conditions-hero-best.webp';

export default function ConditionsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const heroRef = useRef(null);
  const cardRefs = useRef([]);

  // Reset refs list on every render to prevent stale references when filtering
  cardRefs.current = [];

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    // Lazy load background when hero enters viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            hero.style.backgroundImage = `url("${conditionsHeroImg}")`;
            observer.unobserve(hero);
          }
        });
      },
      { rootMargin: '200px' }
    );
    observer.observe(hero);

    // Parallax scroll effect
    const handleScroll = () => {
      const scrolled = window.scrollY;
      hero.style.transform = `translateY(${scrolled * 0.2}px)`; // subtle parallax
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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

    // Observe active elements
    cardRefs.current.forEach((card) => {
      if (card) {
        card.classList.remove('active');
        observer.observe(card);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [activeCategory]);

  const conditions = [
    {
      title: "Back Pain",
      category: "Spine",
      desc: "Chronic lower back pain, muscle spasms, herniated discs, and facet joint pain.",
      focus: "Spinal decompression, core stabilization, and manual joint release."
    },
    {
      title: "Neck Pain",
      category: "Spine",
      desc: "Cervical strain, whiplash, text neck, and tension headaches.",
      focus: "Postural correction, neck adjustments, and ergonomic coaching."
    },
    {
      title: "Sciatica",
      category: "Spine",
      desc: "Radiating leg pain, numbness, and tingling caused by sciatic nerve compression.",
      focus: "Neural gliding, piriformis releases, and deep core strengthening."
    },
    {
      title: "Knee Pain",
      category: "Joints",
      desc: "Patellar tendonitis, meniscus tears, ACL/MCL strains, and IT band issues.",
      focus: "Quad/hamstring balance retraining, joint gliding, and patella tracking."
    },
    {
      title: "Shoulder Pain",
      category: "Joints",
      desc: "Rotator cuff tears, frozen shoulder, shoulder impingement, and bursitis.",
      focus: "Rotator cuff strengthening, scapular stabilization, and hands-on stretching."
    },
    {
      title: "Sports Injuries",
      category: "Sports",
      desc: "Sprains, muscle pulls, shin splints, tennis elbow, and Achilles tendonitis.",
      focus: "Biomechanical analysis, loaded tissue exercises, and sports return audits."
    },
    {
      title: "Arthritis",
      category: "Chronic",
      desc: "Osteoarthritis and rheumatoid arthritis causing joint stiffness, swelling, and pain.",
      focus: "Gentle joint mobility exercises, low-impact loading, and pain management."
    },
    {
      title: "Post-Surgery Rehabilitation",
      category: "Specialized",
      desc: "Post-operative recovery from knee/hip replacements, ACL surgery, and spinal fusion.",
      focus: "Scar tissue mobilization, progressive loading, and range of motion audits."
    },
    {
      title: "Neurological Rehabilitation",
      category: "Specialized",
      desc: "Balance issues, gait instability, stroke recovery, and Parkinson's support.",
      focus: "Neuromuscular coordination exercises, gait retraining, and balance tracks."
    },
    {
      title: "Pediatric Physiotherapy",
      category: "Specialized",
      desc: "Developmental delays, growth plate pain, and youth sports injuries.",
      focus: "Milestone movement games, pediatric-specific load management."
    },
    {
      title: "Geriatric Physiotherapy",
      category: "Chronic",
      desc: "Age-related balance loss, joint stiffness, and general weakness.",
      focus: "Fall prevention protocols, general strength building, and mobility checks."
    },
    {
      title: "Posture Correction",
      category: "Spine",
      desc: "Rounded shoulders, forward head posture, and scoliosis management.",
      focus: "Postural stretches, chest openers, and upper back strengthening."
    },
    {
      title: "Other Common Conditions",
      category: "Other",
      desc: "Hip pain, ankle instability, chronic fatigue pain, and custom complaints.",
      focus: "Detailed clinical diagnostics and customized pain-blocking protocols."
    }
  ];

  const categories = ['All', 'Spine', 'Joints', 'Sports', 'Chronic', 'Specialized', 'Other'];

  const filteredConditions = activeCategory === 'All' 
    ? conditions 
    : conditions.filter(c => c.category === activeCategory);

  return (
    <div className="fade-in">
      {/* Full-width hero background with parallax and lazy load */}
      <div
        className="hero-full-bg parallax"
        ref={heroRef}
      >
        <div className="hero-overlay" />
        <div className="hero-text">
          <h1 className="hero-title-gradient">Conditions We Treat</h1>
        </div>
      </div>

      <section className="conditions-section">
        <div className="conditions-container">
          {/* Category Filters */}
          <div className="conditions-filter-bar">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Conditions Grid */}
          <div className="conditions-grid">
            {filteredConditions.map((cond, index) => (
              <div 
                key={`${activeCategory}-${cond.title}`} 
                ref={el => { if (el) cardRefs.current.push(el); }}
                style={{ transitionDelay: `${(index % 3) * 80}ms` }}
                className="condition-card reveal-card"
              >
                <div>
                  <h3 className="service-card-title" style={{ fontSize: '1.3rem', marginBottom: '12px' }}>{cond.title}</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '20px' }}>{cond.desc}</p>
                </div>
                <div className="condition-focus-box">
                  <strong>Clinical Focus:</strong><br />
                  {cond.focus}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

