import React, { useState, useEffect, useRef } from 'react';
import { Video, ShieldCheck, Clock, Calendar, CheckCircle2, ChevronDown, HelpCircle, User, Phone, Mail, FileText, ArrowRight, Sparkles, Activity, MapPin, Wifi, Star, MessageCircle, Zap } from 'lucide-react';
import onlineHeroImg from '../assets/online_consult_clinic.png';

export default function OnlineTherapyPage({ onAddBooking }) {
  const heroRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    platform: 'Google Meet',
    date: '',
    timeSlot: '',
    message: ''
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [whatsappWarning, setWhatsappWarning] = useState('');
  const [faqOpen, setFaqOpen] = useState({});

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    // Lazy load background when hero enters viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            hero.style.backgroundImage = `url("${onlineHeroImg}")`;
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

  const getTodayDateString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const toggleFaq = (index) => {
    setFaqOpen(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[0-9\s-]{8,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please provide a valid phone number';
    }
    if (!formData.date) {
      newErrors.date = 'Preferred date is required';
    } else {
      const todayStr = getTodayDateString();
      if (formData.date < todayStr) {
        newErrors.date = 'Booking date cannot be in the past';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      setSubmitError('');
      setWhatsappWarning('');

      // Package booking data for online consultation endpoint
      const onlineBooking = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        platform: formData.platform,
        date: formData.date,
        timeSlot: formData.timeSlot,
        message: formData.message
      };

      try {
        const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await fetch(`${apiBase}/api/online-bookings`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(onlineBooking)
        });

        const data = await response.json();

        if (response.ok && data.success) {
          if (onAddBooking) {
            onAddBooking(data.booking);
          }
          if (data.whatsappFailed) {
            setWhatsappWarning('Booking saved, but WhatsApp notification alert could not be sent to receptionist.');
          }
          setSubmitted(true);
        } else {
          setSubmitError(data.error || 'Failed to submit booking request.');
        }
      } catch (err) {
        console.error('Booking submit error:', err);
        setSubmitError('Network error. Failed to reach server. Make sure backend is running.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const benefits = [
    {
      icon: <Clock size={28} color="var(--primary)" />,
      title: "No Travel Required",
      desc: "Save commute time and stress. Receive professional physiotherapy and clinical diagnosis right in your living room or office."
    },
    {
      icon: <Video size={28} color="var(--primary)" />,
      title: "1-on-1 Virtual Care",
      desc: "Get undivided, personalized attention from Dr. Balasurya PT with guided real-time movement analysis and custom corrections."
    },
    {
      icon: <ShieldCheck size={28} color="var(--primary)" />,
      title: "Evidence-Based Guidance",
      desc: "Our tele-rehab sessions match our clinical rigor, ensuring you perform rehabilitation patterns accurately and safely."
    },
    {
      icon: <Sparkles size={28} color="var(--primary)" />,
      title: "Custom Home Exercises",
      desc: "Receive a tailored exercise routine complete with video tutorials and direct text monitoring for continuous recovery."
    }
  ];

  const steps = [
    {
      num: "01",
      title: "Submit Session Request",
      desc: "Fill in your details, preferred date/time, and choose your preferred video call platform (Google Meet, Zoom, or WhatsApp Video)."
    },
    {
      num: "02",
      title: "Instant Confirmation",
      desc: "Our receptionist will verify the slot and send a secure appointment confirmation and digital payment invoice to your WhatsApp."
    },
    {
      num: "03",
      title: "Join the Video Session",
      desc: "Simply tap the video call link at your scheduled time. Dr. Balasurya will assess your range of motion and design your therapy program."
    },
    {
      num: "04",
      title: "Begin Your Recovery",
      desc: "Start your prescribed physical routines with our support. We provide weekly status check-ins to monitor pain relief and progress."
    }
  ];

  const faqs = [
    {
      q: "Is online physiotherapy actually effective?",
      a: "Yes, extensive clinical studies show that virtual physical therapy is highly effective for muscle rehabilitation, joint pain management, and post-surgery care. Since physical therapy relies heavily on guided movements, education, and posture adjustments, virtual correction works exceptionally well."
    },
    {
      q: "What equipment do I need for a virtual session?",
      a: "You only need a smartphone, tablet, or laptop with a working front camera and a stable internet connection. Ensure you have a small space where the camera can capture your full body or the joint area being examined."
    },
    {
      q: "How do I make the payment for my virtual consultation?",
      a: "Once we receive your booking request, our representative will send a UPI/GPay invoice link to your WhatsApp. The payment must be completed before the virtual meeting starts to secure the slot."
    },
    {
      q: "What happens if I need to reschedule my session?",
      a: "You can reschedule your online session up to 4 hours in advance by contacting us via WhatsApp. We will help you select a new date and time slot free of charge."
    }
  ];

  const styles = {
    section: {
      padding: '60px 24px 100px',
      position: 'relative'
    },
    benefitsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
      gap: '28px',
      marginTop: '40px'
    },
    benefitCard: {
      backgroundColor: '#fff',
      border: '1px solid var(--border-light)',
      borderRadius: 'var(--radius-md)',
      padding: '32px 24px',
      boxShadow: 'var(--shadow-sm)',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      transition: 'var(--transition-smooth)'
    },
    stepsContainer: {
      marginTop: '80px',
      padding: '80px 24px',
      background: 'var(--gradient-light-alt)',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--border-light)'
    },
    stepsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: '32px',
      marginTop: '48px',
      position: 'relative'
    },
    stepCard: {
      position: 'relative',
      backgroundColor: '#fff',
      border: '1px solid var(--border-light)',
      borderRadius: 'var(--radius-lg)',
      padding: '36px 28px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      boxShadow: 'var(--shadow-sm)',
      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      overflow: 'hidden'
    },
    stepNumber: {
      width: '44px',
      height: '44px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.25rem',
      fontWeight: '800',
      boxShadow: '0 8px 20px rgba(20, 184, 166, 0.2)',
      marginBottom: '8px',
      fontFamily: 'var(--font-heading)'
    },
    stepTitle: {
      fontSize: '1.2rem',
      fontWeight: '750',
      color: 'var(--bg-dark)'
    },
    stepDesc: {
      fontSize: '0.9rem',
      color: 'var(--text-muted)',
      lineHeight: '1.6'
    },
    bookingGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '50px',
      alignItems: 'center',
      marginTop: '80px'
    },
    bookingCard: {
      backgroundColor: 'var(--bg-card)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-premium)',
      border: '1px solid var(--border-light)',
      padding: '40px',
      position: 'relative',
      overflow: 'hidden'
    },
    inputBox: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      position: 'relative'
    },
    label: {
      fontSize: '0.85rem',
      fontWeight: '700',
      color: 'var(--text-main)',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    },
    iconWrapper: {
      position: 'absolute',
      left: '16px',
      top: '41px',
      color: 'var(--text-muted)'
    },
    input: {
      width: '100%',
      padding: '12px 16px 12px 44px',
      borderRadius: 'var(--radius-sm)',
      border: '1px solid var(--border-light)',
      backgroundColor: 'var(--bg-main)',
      fontSize: '0.95rem',
      color: 'var(--text-main)',
      transition: 'var(--transition-fast)',
      outline: 'none',
      height: '48px',
      boxSizing: 'border-box'
    },
    textarea: {
      width: '100%',
      padding: '12px 16px 12px 44px',
      borderRadius: 'var(--radius-sm)',
      border: '1px solid var(--border-light)',
      backgroundColor: 'var(--bg-main)',
      fontSize: '0.95rem',
      color: 'var(--text-main)',
      transition: 'var(--transition-fast)',
      outline: 'none',
      minHeight: '100px',
      resize: 'vertical'
    },
    errorText: {
      color: '#ef4444',
      fontSize: '0.75rem',
      marginTop: '4px'
    },
    faqContainer: {
      marginTop: '90px',
      maxWidth: '850px',
      margin: '90px auto 0'
    },
    faqItem: {
      backgroundColor: '#fff',
      border: '1px solid var(--border-light)',
      borderRadius: 'var(--radius-sm)',
      marginBottom: '16px',
      overflow: 'hidden',
      transition: 'var(--transition-fast)'
    },
    faqHeader: {
      padding: '20px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      cursor: 'pointer',
      userSelect: 'none'
    },
    faqQuestion: {
      fontSize: '1.05rem',
      fontWeight: '700',
      color: 'var(--bg-dark)',
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    faqBody: {
      padding: '0 24px 20px',
      fontSize: '0.95rem',
      color: 'var(--text-muted)',
      lineHeight: '1.6',
      borderTop: '1px solid rgba(79, 70, 229, 0.03)'
    }
  };

  return (
    <div className="fade-in">
      {/* Full-width hero background with parallax and lazy load */}
      <div
        className="hero-full-bg parallax"
        ref={heroRef}
      >
        <div className="hero-overlay" />
        <div className="hero-text">
          <h1 className="hero-title-gradient">Online Consultation</h1>
        </div>
      </div>

      <section style={styles.section} className="container">

        {/* ── BOOKING FORM (TOP) ── */}
        <div style={styles.bookingGrid} className="online-booking-grid">
          {/* Left: Attractive Info Panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <span className="section-tag">Direct Scheduling</span>
              <h2 className="section-title" style={{ fontSize: '2.2rem', textAlign: 'left' }}>Book Online Consultation</h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '0', fontSize: '1.05rem' }}>
                Schedule a virtual assessment for spinal discomfort, sports injury rehabilitation, or general joint pain.
              </p>
            </div>

            {/* Premium Session Card */}
            <div className="premium-glow-card" style={{
              borderRadius: 'var(--radius-lg)',
              padding: '32px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Glow orbs inside card */}
              <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '180px', height: '180px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(20, 184, 166, 0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', bottom: '-40px', left: '-20px', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(20, 184, 166, 0.15)', border: '1px solid rgba(20, 184, 166, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Video size={20} color="var(--primary)" />
                  </div>
                  <div>
                    <div style={{ color: '#fff', fontWeight: '800', fontSize: '1rem' }}>Virtual Session</div>
                    <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.78rem' }}>Live 1-on-1 with Dr. Balasurya PT</div>
                  </div>
                  <div style={{ marginLeft: 'auto', background: 'rgba(20, 184, 166, 0.2)', border: '1px solid var(--primary)', borderRadius: '20px', padding: '4px 12px', color: 'var(--primary)', fontSize: '0.75rem', fontWeight: '700' }}>LIVE</div>
                </div>

                {/* Session stats */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                  {[
                    { icon: <Clock size={16} color="var(--primary)" />, val: '45 min', lbl: 'Session' },
                    { icon: <Wifi size={16} color="#38bdf8" />, lbl: '3 Platforms', val: 'Meet·Zoom·WA' },
                    { icon: <MessageCircle size={16} color="var(--primary)" />, val: 'WhatsApp', lbl: 'Follow-ups' },
                    { icon: <Star size={16} color="#f59e0b" />, val: 'Custom Plan', lbl: 'Home Rehab' }
                  ].map((s, i) => (
                    <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      {s.icon}
                      <div>
                        <div style={{ color: '#fff', fontWeight: '700', fontSize: '0.85rem' }}>{s.val}</div>
                        <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.72rem' }}>{s.lbl}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '20px' }}>
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem', marginBottom: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Consultation covers</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {['Joint Pain', 'Sports Injury', 'Post-Surgery', 'Spine Issues', 'Posture Correction'].map((tag, i) => (
                      <span key={i} style={{ background: 'rgba(20, 184, 166, 0.15)', border: '1px solid rgba(20, 184, 166, 0.25)', borderRadius: '20px', padding: '4px 12px', color: 'rgba(255,255,255,0.85)', fontSize: '0.75rem', fontWeight: '600' }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Feature checklist */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { icon: <Zap size={16} color="var(--primary)" />, text: '45-Minute Dedicated Clinical Session' },
                { icon: <CheckCircle2 size={16} color="var(--primary)" />, text: 'Personalized Home Rehab Routine' },
                { icon: <MessageCircle size={16} color="#38bdf8" />, text: 'Weekly Follow-ups on WhatsApp' },
                { icon: <ShieldCheck size={16} color="var(--primary)" />, text: 'Evidence-Based Clinical Guidance' }
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', background: 'var(--bg-card)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ flexShrink: 0 }}>{item.icon}</div>
                  <span style={{ fontWeight: '700', color: 'var(--bg-dark)', fontSize: '0.9rem' }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Booking Form Card */}
          <div style={styles.bookingCard} className="booking-card premium-form-container">
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '20px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }} className="fade-in">
                <CheckCircle2 size={56} color="var(--success)" style={{ filter: 'drop-shadow(0 4px 10px rgba(16,185,129,0.3))' }} />
                <h3 style={{ fontSize: '1.4rem', color: 'var(--bg-dark)', fontWeight: '850', margin: 0 }}>Consultation Request Sent!</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
                  Thank you, <strong>{formData.name}</strong>. Your session for <strong>{formData.date}</strong> is request-logged. Pay the fee below to instantly confirm.
                </p>

                {/* QR Code and Payment Box */}
                <div style={{
                  background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                  border: '1px dashed var(--primary-glow)',
                  borderRadius: 'var(--radius-md)',
                  padding: '20px',
                  width: '100%',
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: '800', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Consultation Fee: ₹500
                  </div>
                  
                  {/* QR Image */}
                  <div style={{
                    backgroundColor: '#fff',
                    padding: '10px',
                    borderRadius: 'var(--radius-sm)',
                    boxShadow: 'var(--shadow-sm)',
                    border: '1px solid var(--border-light)'
                  }}>
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent('upi://pay?pa=8220952580@paytm&pn=Dr.Balasurya&am=500&cu=INR')}`}
                      alt="UPI QR Code"
                      style={{ width: '130px', height: '130px', display: 'block' }}
                    />
                  </div>

                  <div style={{ fontSize: '0.85rem', fontWeight: '750', color: 'var(--bg-dark)' }}>
                    UPI ID: <span style={{ color: 'var(--primary)', fontFamily: 'monospace' }}>8220952580@paytm</span>
                  </div>

                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0, lineHeight: '1.4' }}>
                    Scan the QR code or pay to the UPI ID. Once paid, send your payment screenshot via WhatsApp below to confirm your slot.
                  </p>
                </div>

                {whatsappWarning && (
                  <div style={{ color: '#b45309', backgroundColor: '#fef3c7', border: '1px solid #fcd34d', padding: '10px', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', fontWeight: '700' }}>
                    ⚠️ Note: {whatsappWarning}
                  </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
                  <a
                    href={`https://wa.me/918220952580?text=${encodeURIComponent(`Hi Dr. Balasurya, I have completed the payment of ₹500 for my Online Consultation request scheduled for ${formData.date} under the name ${formData.name}.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary"
                    style={{ justifyContent: 'center', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}
                  >
                    <MessageCircle size={16} /> Share Receipt on WhatsApp
                  </a>

                  <button 
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', location: '', platform: 'Google Meet', date: '', timeSlot: '', message: '' });
                      setWhatsappWarning('');
                      setSubmitError('');
                    }}
                    className="btn-primary"
                    style={{ marginTop: '12px' }}
                  >
                    Book Another Session
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  {/* Full Name */}
                  <div style={styles.inputBox}>
                    <label style={styles.label}><User size={15} /> Full Name</label>
                    <div style={styles.iconWrapper}><User size={16} /></div>
                    <input 
                      type="text" 
                      name="name" 
                      placeholder="John Doe" 
                      value={formData.name}
                      onChange={handleInputChange}
                      style={{ ...styles.input, borderColor: errors.name ? '#ef4444' : 'var(--border-light)' }} 
                    />
                    {errors.name && <span style={styles.errorText}>{errors.name}</span>}
                  </div>

                  {/* Phone & Email Row */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="online-form-row">
                    <div style={styles.inputBox}>
                      <label style={styles.label}><Phone size={15} /> Phone Number</label>
                      <div style={styles.iconWrapper}><Phone size={16} /></div>
                      <input 
                        type="tel" 
                        name="phone" 
                        placeholder="+91 XXXXX XXXXX" 
                        value={formData.phone}
                        onChange={handleInputChange}
                        style={{ ...styles.input, borderColor: errors.phone ? '#ef4444' : 'var(--border-light)' }} 
                      />
                      {errors.phone && <span style={styles.errorText}>{errors.phone}</span>}
                    </div>

                    <div style={styles.inputBox}>
                      <label style={styles.label}><Mail size={15} /> Email Address</label>
                      <div style={styles.iconWrapper}><Mail size={16} /></div>
                      <input 
                        type="email" 
                        name="email" 
                        placeholder="john@example.com" 
                        value={formData.email}
                        onChange={handleInputChange}
                        style={{ ...styles.input, borderColor: errors.email ? '#ef4444' : 'var(--border-light)' }} 
                      />
                      {errors.email && <span style={styles.errorText}>{errors.email}</span>}
                    </div>
                  </div>

                  {/* Location */}
                  <div style={styles.inputBox}>
                    <label style={styles.label}><MapPin size={15} /> Your Location / City</label>
                    <div style={styles.iconWrapper}><MapPin size={16} /></div>
                    <input
                      type="text"
                      name="location"
                      placeholder="e.g. Chennai, Tamil Nadu"
                      value={formData.location}
                      onChange={handleInputChange}
                      style={styles.input}
                    />
                  </div>

                  {/* Video Platform */}
                  <div style={styles.inputBox}>
                    <label style={styles.label}><Video size={15} /> Preferred Video Platform</label>
                    <div style={styles.iconWrapper}><Video size={16} /></div>
                    <select name="platform" value={formData.platform} onChange={handleInputChange} style={styles.input}>
                      <option value="Google Meet">Google Meet (Recommended)</option>
                      <option value="Zoom">Zoom Meeting</option>
                      <option value="WhatsApp Video">WhatsApp Video Call</option>
                    </select>
                  </div>

                  {/* Preferred Date */}
                  <div style={styles.inputBox}>
                    <label style={styles.label}><Calendar size={15} /> Preferred Date</label>
                    <div style={styles.iconWrapper}><Calendar size={16} /></div>
                    <input 
                      type="date" 
                      name="date" 
                      min={getTodayDateString()}
                      value={formData.date}
                      onChange={handleInputChange}
                      style={{ ...styles.input, borderColor: errors.date ? '#ef4444' : 'var(--border-light)' }} 
                    />
                    {errors.date && <span style={styles.errorText}>{errors.date}</span>}
                  </div>

                  {/* Message Symptoms */}
                  <div style={styles.inputBox}>
                    <label style={styles.label}><FileText size={15} /> Describe Symptoms / History</label>
                    <div style={{ ...styles.iconWrapper, top: '35px' }}><FileText size={16} /></div>
                    <textarea 
                      name="message" 
                      placeholder="Briefly explain your joint pain, injury, or operational history..." 
                      value={formData.message}
                      onChange={handleInputChange}
                      style={styles.textarea} 
                    />
                  </div>

                  {submitError && (
                    <div style={{ color: '#ef4444', fontSize: '0.85rem', fontWeight: '600', textAlign: 'center' }}>
                      ❌ {submitError}
                    </div>
                  )}

                  <button 
                    type="submit" 
                    className="btn-primary" 
                    disabled={isSubmitting}
                    style={{ width: '100%', justifyContent: 'center', height: '50px', opacity: isSubmitting ? 0.7 : 1 }}
                  >
                    {isSubmitting ? 'Submitting...' : 'Book Online Consultation'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* ── INTRO + BENEFITS (below form) ── */}
        <div className="text-center" style={{ maxWidth: '750px', margin: '80px auto 0' }}>
          <span className="section-tag">Direct Tele-Health</span>
          <h2 className="section-title">Professional Consultation, Anywhere</h2>
          <p className="section-desc" style={{ marginBottom: 0 }}>
            Unable to visit our physical facility? Receive the exact same clinical excellence and assessment online. Connect directly with Dr. Balasurya PT from the convenience of your own home.
          </p>
        </div>

        <div style={styles.benefitsGrid}>
          {benefits.map((b, i) => (
            <div 
              key={i} 
              className="benefit-card-hover"
              style={styles.benefitCard}
            >
              <div style={{
                width: '56px', height: '56px', borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--primary-glow)', display: 'flex',
                alignItems: 'center', justifyContent: 'center'
              }}>
                {b.icon}
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '750', color: 'var(--bg-dark)' }}>{b.title}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>{b.desc}</p>
            </div>
          ))}
        </div>

        {/* ── WORKFLOW STEPS ── */}
        <div style={styles.stepsContainer} className="online-steps-container">
          <div className="text-center">
            <span className="section-tag">The Process</span>
            <h2 className="section-title" style={{ fontSize: '2.2rem' }}>How Online Session Works</h2>
            <p className="section-desc" style={{ marginBottom: 0, maxWidth: '580px' }}>
              Four simple, hassle-free steps to get customized care and meet our specialist therapist online.
            </p>
          </div>

          <div style={styles.stepsGrid} className="online-steps-grid">
            {steps.map((s, i) => (
              <div 
                key={i} 
                className="step-card-hover"
                style={styles.stepCard}
              >
                <div style={styles.stepNumber}>{s.num}</div>
                <h3 style={styles.stepTitle}>{s.title}</h3>
                <p style={styles.stepDesc}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── FAQs ── */}
        <div style={styles.faqContainer} className="online-faq-container">
          <div className="text-center" style={{ marginBottom: '40px' }}>
            <span className="section-tag">Got Questions?</span>
            <h2 className="section-title" style={{ fontSize: '2.2rem' }}>Online Session FAQs</h2>
          </div>

          <div>
            {faqs.map((f, i) => {
              const isOpen = faqOpen[i];
              return (
                <div key={i} style={styles.faqItem} className="faq-item">
                  <div style={styles.faqHeader} onClick={() => toggleFaq(i)}>
                    <h3 style={styles.faqQuestion}>
                      <HelpCircle size={18} color="var(--primary)" />
                      {f.q}
                    </h3>
                    <div style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
                      transition: 'transform 0.3s ease',
                      color: 'var(--text-muted)'
                    }}>
                      <ChevronDown size={18} />
                    </div>
                  </div>
                  {isOpen && (
                    <div style={styles.faqBody} className="fade-in">
                      {f.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Embedded CSS overrides for layout responsiveness */}
      <style>{`
        .online-steps-container {
          box-shadow: var(--shadow-sm);
        }

        /* Premium Glow Card */
        .premium-glow-card {
          background: linear-gradient(135deg, #090d16 0%, #111827 50%, #030712 100%) !important;
          border: 1px solid rgba(20, 184, 166, 0.25) !important;
          box-shadow: 0 20px 40px rgba(20, 184, 166, 0.15) !important;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .premium-glow-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 24px 50px rgba(20, 184, 166, 0.25) !important;
          border-color: rgba(20, 184, 166, 0.45) !important;
        }

        /* Benefit Cards styling */
        .benefit-card-hover {
          border-top: 4px solid var(--primary) !important;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .benefit-card-hover:hover {
          transform: translateY(-8px) !important;
          box-shadow: var(--shadow-premium) !important;
          border-top-color: var(--secondary) !important;
          background: #ffffff !important;
        }

        /* Process Steps styling */
        .step-card-hover {
          border-left: 4px solid transparent !important;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .step-card-hover:hover {
          transform: translateY(-6px) !important;
          box-shadow: var(--shadow-premium) !important;
          border-left-color: var(--primary) !important;
          border-color: rgba(20, 184, 166, 0.2) !important;
        }

        /* Form styling */
        .premium-form-container {
          background: linear-gradient(to bottom, #ffffff, #fbfcfd) !important;
          box-shadow: 0 20px 45px rgba(15, 23, 42, 0.05) !important;
          border: 1px solid rgba(226, 232, 240, 0.8) !important;
        }
        
        /* Input fields premium interaction */
        .online-booking-grid input,
        .online-booking-grid select,
        .online-booking-grid textarea {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
          border-radius: var(--radius-md) !important;
        }

        .online-booking-grid input:focus,
        .online-booking-grid select:focus,
        .online-booking-grid textarea:focus {
          border-color: var(--primary) !important;
          box-shadow: 0 0 0 4px rgba(20, 184, 166, 0.15) !important;
          background-color: #ffffff !important;
        }

        /* FAQ Card hover glow */
        .faq-item {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .faq-item:hover {
          border-color: rgba(20, 184, 166, 0.3) !important;
          box-shadow: var(--shadow-md) !important;
        }

        @media (max-width: 992px) {
          .online-booking-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
        @media (max-width: 768px) {
          .online-steps-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .online-form-row {
            grid-template-columns: 1fr !important;
            gap: 18px !important;
          }
        }
      `}</style>
    </div>
  );
}