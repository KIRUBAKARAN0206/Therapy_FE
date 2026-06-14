import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { 
  Activity, ShieldAlert, Cpu, Sparkles, Heart, RefreshCw, ArrowRight, Check, X, Phone, Calendar,
  User, Zap, Flame, Dumbbell, Trophy, Shield, Target, ClipboardList, Smile, Award 
} from 'lucide-react';


// Import service banners (retained if needed for service cards, but banner image section is completely removed from the popup modal)
import sportsRehabImg from '../assets/physio_hero.png';
import orthopedicRehabImg from '../assets/clinical_rehab.png';
import postOpImg from '../assets/individualized_therapy.png';
import neuroImg from '../assets/dedicated_specialists.png';
import geriatricImg from '../assets/modern_techniques.png';
import pediatricImg from '../assets/about-clinic.png';

export default function Services() {
  const cardRefs = useRef([]);
  const [activeService, setActiveService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (service) => {
    setActiveService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Staggered reveal observer
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

  // Prevent background scrolling and layout shifting when modal is open
  useEffect(() => {
    if (isModalOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isModalOpen]);

  // ESC key listener to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const services = [
    {
      icon: <ShieldAlert size={28} color="var(--primary)" />,
      title: "Sports Injury Rehabilitation",
      image: sportsRehabImg,
      desc: "Comprehensive rehabilitation plans designed specifically for athletes. We treat muscle tears, ligament strains, sprains, and prepare you to return safely to peak performance.",
      conditions: ["ACL & Meniscus recovery", "Rotator cuff rehab", "Tennis/Golfer's elbow", "Shin splints"],
      details: [
        { text: "Personalized recovery programs", icon: <User size={16} /> },
        { text: "ACL & Meniscus rehabilitation", icon: <Activity size={16} /> },
        { text: "Rotator cuff rehabilitation", icon: <RefreshCw size={16} /> },
        { text: "Tennis/Golfer's elbow treatment", icon: <Zap size={16} /> },
        { text: "Shin splints management", icon: <Flame size={16} /> },
        { text: "Strength and conditioning", icon: <Dumbbell size={16} /> },
        { text: "Return-to-sport assessment", icon: <Trophy size={16} /> },
        { text: "Injury prevention strategies", icon: <Shield size={16} /> }
      ],
      benefits: [
        "Accelerate natural joint and tissue recovery",
        "Restore muscular balance and strength",
        "Minimize risk of re-injury during sports activity"
      ],
      features: [
        "Bio-mechanical movement screening",
        "Hands-on manual muscle release",
        "Custom progressive loading protocols"
      ]
    },
    {
      icon: <Activity size={28} color="var(--primary)" />,
      title: "Orthopedic Rehabilitation",
      image: orthopedicRehabImg,
      desc: "Therapy focusing on restoring functions of the musculoskeletal system, including joints, bones, ligaments, tendons, and muscles affected by orthopedic ailments.",
      conditions: ["Chronic lower back pain", "Sciatica management", "Osteoarthritis relief", "Spinal adjustments"],
      details: [
        { text: "Customized programs for joints, bones, ligaments, and tendons", icon: <Activity size={16} /> },
        { text: "Non-surgical management of osteoarthritis and osteoporosis", icon: <Heart size={16} /> },
        { text: "Advanced spine therapy for herniated discs, sciatica, and stenosis", icon: <Activity size={16} /> },
        { text: "Posture analysis and workstation ergonomics guidance", icon: <User size={16} /> },
        { text: "Joint mobilization and hands-on soft tissue release techniques", icon: <Sparkles size={16} /> },
        { text: "Progressive resistance training to resolve muscular imbalances", icon: <Dumbbell size={16} /> },
        { text: "Core stabilization and dynamic flexibility protocols", icon: <Target size={16} /> }
      ],
      benefits: [
        "Relieve chronic joint stiffness and pain",
        "Increase functional movement ranges and flexibility",
        "Enhance posture and spinal alignment"
      ],
      features: [
        "Spine decompression and adjustment",
        "Graston instrument-assisted mobilization",
        "Neuromuscular re-education"
      ]
    },
    {
      icon: <RefreshCw size={28} color="var(--primary)" />,
      title: "Post-Operative Recovery",
      image: postOpImg,
      desc: "Assisting patients in recovering full range of motion, muscle strength, and confidence after undergoing joint replacements, fracture repairs, or reconstructive surgeries.",
      conditions: ["Knee & Hip replacements", "Spinal fusion rehab", "Ligament repair recovery", "Scar tissue release"],
      details: [
        { text: "Structured phase-based protocols tailored to your specific surgery", icon: <ClipboardList size={16} /> },
        { text: "Scar tissue mobilization and advanced swelling management", icon: <Sparkles size={16} /> },
        { text: "Early stage range-of-motion recovery and gait retraining", icon: <Activity size={16} /> },
        { text: "Progressive loading to safely restore muscle bulk and joint stability", icon: <Dumbbell size={16} /> },
        { text: "Close coordination with orthopedic surgeons on milestones", icon: <User size={16} /> },
        { text: "Re-education of functional neuromuscular firing patterns", icon: <Cpu size={16} /> }
      ],
      benefits: [
        "Minimize scar tissue formation and stiffness",
        "Safely restore walking gait and independence",
        "Coordinate rehabilitation with surgical guidelines"
      ],
      features: [
        "Swelling reduction lymphatic drainage",
        "Passive and active range-of-motion therapy",
        "Progressive resistance training"
      ]
    },
    {
      icon: <Cpu size={28} color="var(--primary)" />,
      title: "Neurological Physiotherapy",
      image: neuroImg,
      desc: "Specialized rehabilitation for individuals with physical impairments arising from neurological or neuromuscular disorders to maximize motor function.",
      conditions: ["Stroke rehabilitation", "Parkinson's physical support", "Multiple Sclerosis therapy", "Balance & gait retraining"],
      details: [
        { text: "Intensive stroke rehabilitation and neuro-plasticity training", icon: <Cpu size={16} /> },
        { text: "Targeted balance, coordination, and fall prevention protocols", icon: <Target size={16} /> },
        { text: "Specialized physical therapy for Parkinson’s and Multiple Sclerosis", icon: <Activity size={16} /> },
        { text: "Gait retraining using specialized clinic-grade support aids", icon: <Activity size={16} /> },
        { text: "Sensory integration and developmental motor control exercises", icon: <Sparkles size={16} /> },
        { text: "Spasticity management, joint range maintenance, and stretching", icon: <RefreshCw size={16} /> }
      ],
      benefits: [
        "Enhance balance control and reduce fall frequency",
        "Stimulate neuro-pathway re-education",
        "Retain independent mobility and motor function"
      ],
      features: [
        "Proprioceptive neuromuscular facilitation",
        "Vestibular and balance coordination tasks",
        "Spasticity release stretching"
      ]
    },
    {
      icon: <Sparkles size={28} color="var(--primary)" />,
      title: "Geriatric Mobility & Strength",
      image: geriatricImg,
      desc: "Custom therapies aimed at seniors to help build strength, confidence, and maintain independent living while preventing falls and managing aging-related pain.",
      conditions: ["Fall risk assessment", "Joint stiffness reduction", "General strength building", "Osteoporosis management"],
      details: [
        { text: "Age-specific functional strength building and balance coaching", icon: <User size={16} /> },
        { text: "Low-impact conditioning to manage joint stiffness and arthritis", icon: <Activity size={16} /> },
        { text: "Comprehensive fall risk audit and environment safety retraining", icon: <ShieldAlert size={16} /> },
        { text: "Bone-density health exercises for osteoporosis management", icon: <Heart size={16} /> },
        { text: "Gentle cardiorespiratory endurance and general fitness", icon: <Dumbbell size={16} /> },
        { text: "Functional independence training for everyday activities", icon: <Smile size={16} /> }
      ],
      benefits: [
        "Retain daily independence and walking safety",
        "Relieve arthritis discomfort and stiffness",
        "Build bone density and dynamic balance"
      ],
      features: [
        "Low-impact resistance exercises",
        "Ergonomic daily activity guidance",
        "Fall safety movement training"
      ]
    },
    {
      icon: <Heart size={28} color="var(--primary)" />,
      title: "Pediatric Physical Therapy",
      image: pediatricImg,
      desc: "Developmental physical therapy for infants, toddlers, and adolescents to help them reach milestones, build strength, and restore movement patterns.",
      conditions: ["Developmental delay help", "Postural correction", "Juvenile arthritis support", "Congenital condition rehab"],
      details: [
        { text: "Developmental milestone tracking and play-based movement games", icon: <Trophy size={16} /> },
        { text: "Postural correction and congenital condition orthopedic support", icon: <Activity size={16} /> },
        { text: "Targeted strength and flexibility programs for growing teenagers", icon: <Dumbbell size={16} /> },
        { text: "Rehabilitation of youth sports strains and growth plate pain", icon: <Zap size={16} /> },
        { text: "Balance, motor planning, and coordination physical exercises", icon: <Target size={16} /> },
        { text: "Custom orthotics and adaptive movement equipment guidance", icon: <Shield size={16} /> }
      ],
      benefits: [
        "Direct support for correct milestone developmental steps",
        "Safe adolescent alignment and postural support",
        "Fun, kid-focused interactive exercise programs"
      ],
      features: [
        "Pediatric developmental movement patterns",
        "Growth plate pain management",
        "Orthotic evaluation and fit coordination"
      ]
    }
  ];

  return (
    <section id="services" className="services-section">
      <div className="container">
        <div className="text-center">
          <span className="section-tag">Clinical Treatments</span>
          <h2 className="section-title">Our Specialized Services</h2>
          <p className="section-desc">
            We deliver clinical-grade therapy services focused on pain management, physical rehabilitation, and muscle conditioning to restore optimal body performance.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div 
              key={index} 
              ref={el => cardRefs.current[index] = el}
              className="service-card reveal-card"
              style={{ transitionDelay: `${index * 80}ms` }}
              onClick={() => openModal(service)}
            >
              <div>
                <div className="service-icon-container">
                  {service.icon}
                </div>
                <h3 className="service-card-title">{service.title}</h3>
                <p className="service-card-desc">{service.desc}</p>
              </div>

              <div>
                <ul className="service-condition-list">
                  {service.conditions.map((condition, idx) => (
                    <li key={idx} className="service-condition-item">
                      <div className="service-checkmark">
                        <Check size={12} strokeWidth={3} />
                      </div>
                      {condition}
                    </li>
                  ))}
                </ul>

                <div 
                  className="service-card-action"
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal(service);
                  }}
                >
                  <span>Explore Program</span>
                  <ArrowRight size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reusable Modal Portal Popup */}
      {createPortal(
        <div 
          className={`modal-overlay ${isModalOpen ? 'open' : ''}`}
          onClick={closeModal}
        >
          {activeService && (
            <div 
              className="modal-wrapper"
              onClick={(e) => e.stopPropagation()}
            >
              <div 
                className="modal-close-btn"
                onClick={closeModal}
              >
                <X size={20} />
              </div>

              {/* Content-focused Clean Header (No banner images) */}
              <div className="modal-header-clean">
                <div className="modal-header-icon-wrap">
                  {activeService.icon}
                </div>
                <div className="modal-header-text-wrap">
                  <h3 className="modal-header-title">{activeService.title}</h3>
                  <p className="modal-header-desc">{activeService.desc}</p>
                </div>
              </div>

              <div className="modal-body">
                {/* Program Highlights */}
                <div>
                  <h4 className="modal-section-title">
                    <Check size={16} strokeWidth={3} />
                    Program Highlights
                  </h4>
                  <div className="modal-details-grid">
                    {activeService.details.map((detail, idx) => (
                      <div key={idx} className="modal-detail-item">
                        <div className="modal-detail-icon">
                          {detail.icon}
                        </div>
                        <span className="modal-detail-text">
                          {detail.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Split columns for Benefits and Treatment Features */}
                <div className="modal-split-grid">
                  {/* Benefits column */}
                  <div className="modal-split-column">
                    <h4 className="modal-split-title">
                      <Award size={16} strokeWidth={2.5} />
                      Key Benefits
                    </h4>
                    <ul className="modal-split-list">
                      {activeService.benefits.map((benefit, idx) => (
                        <li key={idx} className="modal-split-item">
                          <div className="modal-split-icon secondary">
                            <Check size={12} strokeWidth={3.5} />
                          </div>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Treatment Features column */}
                  <div className="modal-split-column">
                    <h4 className="modal-split-title">
                      <Sparkles size={16} strokeWidth={2.5} />
                      Treatment Features
                    </h4>
                    <ul className="modal-split-list">
                      {activeService.features.map((feature, idx) => (
                        <li key={idx} className="modal-split-item">
                          <div className="modal-split-icon">
                            <Sparkles size={11} strokeWidth={2.5} />
                          </div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <a 
                  href="#/booking" 
                  className="btn-primary"
                  onClick={closeModal}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <Calendar size={16} /> Book Appointment
                </a>
                <a 
                  href="tel:+917812864905" 
                  className="btn-secondary"
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <Phone size={16} /> Call Clinic
                </a>
              </div>
            </div>
          )}
        </div>,
        document.body
      )}
    </section>
  );
}
