import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const cardRefs = useRef([]);

  // Reset refs list on every render to ensure clean elements
  cardRefs.current = [];

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

  const contactDetails = [
    {
      icon: <MapPin size={24} />,
      title: "Clinic Location",
      info: "Appanaickenpatti, Tamil Nadu 641402",
      link: "https://share.google/ty9XYNl10t4h8uC24"
    },
    {
      icon: <Phone size={24} />,
      title: "Contact",
      info: "78128 64905",
      link: "tel:+917812864905"
    },
    {
      icon: <Mail size={24} />,
      title: "Official Email",
      info: "balasurya430809@gmail.com",
      link: "mailto:balasurya430809@gmail.com"
    },
    {
      icon: <Clock size={24} />,
      title: "Clinic Hours",
      info: (
        <>
          Mon - Fri: 09:30 AM - 01:30 PM &<br />
          05:00 PM - 09:00 PM<br />
          <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Saturday & Sunday: Closed
          </span><br />
          <span style={{ color: 'var(--secondary)', fontWeight: '700', display: 'inline-block', marginTop: '4px' }}>
            🏠 House Visits Available
          </span>
        </>
      )
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // 1. Store details in SQLite database via backend API
      const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiBase}/api/inquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to save message to database');
      }

      // 2. Construct WhatsApp message and redirect to WhatsApp
      const fullName = `${formData.firstName} ${formData.lastName}`.trim();
      const whatsappMessage = `*THE THERAPY UNIVERSE - New Inquiry*\n\n` +
        `*Name:* ${fullName}\n` +
        `*Email:* ${formData.email}\n` +
        `*Phone:* ${formData.phone || 'Not Provided'}\n` +
        `*Subject:* ${formData.subject}\n\n` +
        `*Message:* ${formData.message}`;

      const encodedText = encodeURIComponent(whatsappMessage);
      const whatsappUrl = `https://api.whatsapp.com/send?phone=917812864905&text=${encodedText}`;
      
      // Redirect to WhatsApp in a new tab
      window.open(whatsappUrl, '_blank');

      setIsSubmitted(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: 'General Inquiry',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      alert('Failed to send message. Please check if backend server is running and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <div className="text-center">
          <span className="section-tag">Reach Us</span>
          <h2 className="section-title">Contact & Clinic Location</h2>
          <p className="section-desc">
            We are centrally located and easily accessible. Get in touch with our reception desk or fill out the form below.
          </p>
        </div>

        <div className="contact-grid">
          {/* Details Column */}
          <div className="contact-details-col">
            {contactDetails.map((detail, idx) => (
              <div 
                key={idx} 
                ref={el => { if (el) cardRefs.current.push(el); }}
                style={{ 
                  transitionDelay: `${idx * 100}ms`,
                  cursor: detail.link ? 'pointer' : 'default'
                }}
                onClick={() => {
                  if (detail.link) {
                    window.open(detail.link, '_blank');
                  }
                }}
                className={`contact-card-premium reveal-card ${detail.link ? 'clickable-contact-card' : ''}`}
              >
                <div className="contact-icon-wrap">
                  {detail.icon}
                </div>
                <div className="contact-card-info">
                  <h3>{detail.title}</h3>
                  <p>{detail.info}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Inquiry Form Column */}
          <div className="contact-form-card">
            {isSubmitted ? (
              <div className="form-success-card">
                <div className="success-icon-wrap">
                  <CheckCircle2 size={48} />
                </div>
                <h3 className="contact-form-title">Thank You!</h3>
                <p className="contact-form-subtitle" style={{ marginBottom: 0 }}>
                  Your message has been sent successfully. Our team will review your inquiry and get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 className="contact-form-title">Send Us a Message</h3>
                <p className="contact-form-subtitle">
                  Have questions? Fill out the form and our reception desk will contact you.
                </p>

                <div className="form-grid-2">
                  <div className="form-group-premium">
                    <label htmlFor="firstName">First Name</label>
                    <input 
                      type="text" 
                      id="firstName" 
                      name="firstName" 
                      className="form-input-premium"
                      placeholder="John" 
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                  <div className="form-group-premium">
                    <label htmlFor="lastName">Last Name</label>
                    <input 
                      type="text" 
                      id="lastName" 
                      name="lastName" 
                      className="form-input-premium"
                      placeholder="Doe" 
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-group-premium">
                    <label htmlFor="email">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      className="form-input-premium"
                      placeholder="john.doe@example.com" 
                      value={formData.email}
                      onChange={handleInputChange}
                      required 
                    />
                  </div>
                  <div className="form-group-premium">
                    <label htmlFor="phone">Phone Number</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      className="form-input-premium"
                      placeholder="+1 (555) 000-0000" 
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-group-premium">
                  <label htmlFor="subject">Subject</label>
                  <select 
                    id="subject" 
                    name="subject" 
                    className="form-input-premium"
                    value={formData.subject}
                    onChange={handleInputChange}
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Billing Question">Billing & Insurance</option>
                    <option value="Feedback">Feedback</option>
                    <option value="Support">Other Support</option>
                  </select>
                </div>

                <div className="form-group-premium">
                  <label htmlFor="message">Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    className="form-input-premium form-textarea-premium"
                    placeholder="Describe how we can help you..." 
                    value={formData.message}
                    onChange={handleInputChange}
                    required 
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="btn-submit-premium"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      <style>{`
        .clickable-contact-card {
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .clickable-contact-card:hover .contact-card-info p {
          color: var(--primary);
          text-decoration: underline;
        }
      `}</style>
    </section>
  );
}
