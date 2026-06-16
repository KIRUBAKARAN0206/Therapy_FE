import React, { useState, useEffect } from 'react';
import { Calendar, User, Phone, Mail, Activity, Clock, FileText, CheckCircle2 } from 'lucide-react';

export default function BookingForm({ onAddBooking }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    customService: '',
    date: '',
    timeSlot: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [whatsappWarning, setWhatsappWarning] = useState('');
  const [bookedSlots, setBookedSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const getTodayDateString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const allTimeSlots = [
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "01:00 PM",
    "05:00 PM",
    "05:30 PM",
    "06:00 PM",
    "06:30 PM",
    "07:00 PM",
    "07:30 PM",
    "08:00 PM",
    "08:30 PM"
  ];

  useEffect(() => {
    if (!formData.date) {
      setBookedSlots([]);
      return;
    }

    const fetchBookedSlots = async () => {
      setLoadingSlots(true);
      try {
        const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await fetch(`${apiBase}/api/bookings/booked-slots?date=${formData.date}`);
        if (response.ok) {
          const data = await response.json();
          setBookedSlots(data);
          
          // Reset selected timeSlot if it is already booked
          if (formData.timeSlot && data.includes(formData.timeSlot)) {
            setFormData(prev => ({ ...prev, timeSlot: '' }));
          }
        }
      } catch (err) {
        console.error('Error fetching booked slots:', err);
      } finally {
        setLoadingSlots(false);
      }
    };

    fetchBookedSlots();
  }, [formData.date]);

  const services = [
    "Sports Injury Rehabilitation",
    "Orthopedic Physical Therapy",
    "Post-Operative Recovery",
    "Neurological Physiotherapy",
    "Geriatric Mobility & Strength",
    "Pediatric Physical Therapy",
    "Other"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
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
    if (!formData.service) newErrors.service = 'Please select a treatment service';
    if (formData.service === 'Other' && !formData.customService.trim()) {
      newErrors.customService = 'Please specify the service you require';
    }
    if (!formData.date) {
      newErrors.date = 'Preferred date is required';
    } else {
      const todayStr = getTodayDateString();
      if (formData.date < todayStr) {
        newErrors.date = 'Booking date cannot be in the past';
      }
    }
    if (!formData.timeSlot.trim()) newErrors.timeSlot = 'Preferred time slot is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      setSubmitError('');
      setWhatsappWarning('');

      const selectedService = formData.service === 'Other' ? formData.customService : formData.service;
      const newBooking = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: selectedService,
        date: formData.date,
        timeSlot: formData.timeSlot,
        message: formData.message,
        status: 'Pending'
      };
      
      try {
        const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await fetch(`${apiBase}/api/bookings`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newBooking)
        });

        const data = await response.json();

        if (response.ok && data.success) {
          onAddBooking(data.booking);
          if (data.whatsappFailed) {
            setWhatsappWarning('Booking saved, but WhatsApp notification alert could not be sent to receptionist.');
          }
          setSubmitted(true);
        } else {
          setSubmitError(data.error || 'Failed to submit appointment request.');
        }
      } catch (err) {
        console.error('Booking submit error:', err);
        setSubmitError('Network error. Failed to reach server. Make sure backend is running.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const styles = {
    section: {
      backgroundColor: 'var(--bg-main)',
      padding: '80px 24px 120px'
    },
    card: {
      maxWidth: '850px',
      margin: '0 auto',
      backgroundColor: 'var(--bg-card)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-premium)',
      border: '1px solid var(--border-light)',
      padding: '48px',
      position: 'relative',
      overflow: 'hidden'
    },
    formGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '24px',
      marginBottom: '24px'
    },
    inputBox: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      position: 'relative'
    },
    label: {
      fontSize: '0.875rem',
      fontWeight: '600',
      color: 'var(--text-main)',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    },
    iconWrapper: {
      position: 'absolute',
      left: '16px',
      top: '45px',
      color: 'var(--text-muted)'
    },
    input: {
      width: '100%',
      padding: '14px 16px 14px 44px',
      borderRadius: 'var(--radius-sm)',
      border: '1px solid var(--border-light)',
      backgroundColor: 'var(--bg-main)',
      fontSize: '0.95rem',
      color: 'var(--text-main)',
      transition: 'var(--transition-fast)',
      outline: 'none',
      height: '52px',
      boxSizing: 'border-box'
    },
    textarea: {
      width: '100%',
      padding: '14px 16px 14px 44px',
      borderRadius: 'var(--radius-sm)',
      border: '1px solid var(--border-light)',
      backgroundColor: 'var(--bg-main)',
      fontSize: '0.95rem',
      color: 'var(--text-main)',
      transition: 'var(--transition-fast)',
      outline: 'none',
      minHeight: '120px',
      resize: 'vertical'
    },
    errorText: {
      color: '#ef4444',
      fontSize: '0.75rem',
      marginTop: '4px'
    },
    successBox: {
      textAlign: 'center',
      padding: '40px 0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '20px'
    },
    successTitle: {
      fontSize: '1.75rem',
      color: 'var(--bg-dark)'
    },
    successText: {
      fontSize: '1.05rem',
      color: 'var(--text-muted)',
      maxWidth: '460px',
      lineHeight: '1.6'
    }
  };

  return (
    <section id="booking" style={styles.section}>
      <div className="container">
        <div className="text-center">
          <span className="section-tag">Direct Scheduling</span>
          <h2 className="section-title">Book an Appointment</h2>
          <p className="section-desc">
            Take the first step toward restoring your strength and movement. Fill out the booking form below, and we will confirm your schedule within 2 hours.
          </p>
        </div>

        <div style={styles.card} className="booking-card">
          {submitted ? (
            <div style={styles.successBox}>
              <CheckCircle2 size={64} color="var(--success)" />
              <h3 style={styles.successTitle}>Request Submitted Successfully!</h3>
              <p style={styles.successText}>
                Thank you, <strong>{formData.name}</strong>. Your appointment request for <strong>{formData.date}</strong> at <strong>{formData.timeSlot}</strong> has been logged. Our reception specialist will contact you shortly to finalize details.
              </p>
              {whatsappWarning && (
                <div style={{ color: '#b45309', backgroundColor: '#fef3c7', border: '1px solid #fcd34d', padding: '12px 16px', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', fontWeight: '700', maxWidth: '500px', marginTop: '8px', textAlign: 'center' }}>
                  ⚠️ Note: {whatsappWarning}
                </div>
              )}
              <button 
                onClick={() => { setSubmitted(false); setFormData({ name:'', email:'', phone:'', service:'', customService: '', date:'', timeSlot:'', message:'' }); setWhatsappWarning(''); setSubmitError(''); }}
                className="btn-primary"
                style={{ marginTop: '16px' }}
              >
                Schedule Another Appointment
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={styles.formGrid} className="booking-form-grid">
                
                {/* Full Name */}
                <div style={styles.inputBox}>
                  <label style={styles.label}><User size={16} /> Full Name</label>
                  <div style={styles.iconWrapper}><User size={18} /></div>
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="John Doe" 
                    value={formData.name}
                    onChange={handleInputChange}
                    style={{
                      ...styles.input,
                      borderColor: errors.name ? '#ef4444' : 'var(--border-light)'
                    }} 
                  />
                  {errors.name && <span style={styles.errorText}>{errors.name}</span>}
                </div>

                {/* Email Address */}
                <div style={styles.inputBox}>
                  <label style={styles.label}><Mail size={16} /> Email Address</label>
                  <div style={styles.iconWrapper}><Mail size={18} /></div>
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="john@example.com" 
                    value={formData.email}
                    onChange={handleInputChange}
                    style={{
                      ...styles.input,
                      borderColor: errors.email ? '#ef4444' : 'var(--border-light)'
                    }} 
                  />
                  {errors.email && <span style={styles.errorText}>{errors.email}</span>}
                </div>

                {/* Phone Number */}
                <div style={styles.inputBox}>
                  <label style={styles.label}><Phone size={16} /> Phone Number</label>
                  <div style={styles.iconWrapper}><Phone size={18} /></div>
                  <input 
                    type="tel" 
                    name="phone" 
                    placeholder="+1 234 567 890" 
                    value={formData.phone}
                    onChange={handleInputChange}
                    style={{
                      ...styles.input,
                      borderColor: errors.phone ? '#ef4444' : 'var(--border-light)'
                    }} 
                  />
                  {errors.phone && <span style={styles.errorText}>{errors.phone}</span>}
                </div>

                {/* Treatment Service */}
                <div style={styles.inputBox}>
                  <label style={styles.label}><Activity size={16} /> Select Service</label>
                  <div style={styles.iconWrapper}><Activity size={18} /></div>
                  <select 
                    name="service" 
                    value={formData.service}
                    onChange={handleInputChange}
                    style={{
                      ...styles.input,
                      borderColor: errors.service ? '#ef4444' : 'var(--border-light)'
                    }}
                  >
                    <option value="">Choose program</option>
                    {services.map((s, i) => <option key={i} value={s}>{s}</option>)}
                  </select>
                  {errors.service && <span style={styles.errorText}>{errors.service}</span>}
                </div>

                {/* Custom Service Input (Displayed when "Other" is selected) */}
                {formData.service === 'Other' && (
                  <div style={{ ...styles.inputBox, gridColumn: 'span 2' }} className="booking-message-span">
                    <label style={styles.label}><Activity size={16} /> Specify Service Required</label>
                    <div style={styles.iconWrapper}><Activity size={18} /></div>
                    <input 
                      type="text" 
                      name="customService" 
                      placeholder="Please specify the treatment type or condition..." 
                      value={formData.customService}
                      onChange={handleInputChange}
                      style={{
                        ...styles.input,
                        borderColor: errors.customService ? '#ef4444' : 'var(--border-light)'
                      }} 
                    />
                    {errors.customService && <span style={styles.errorText}>{errors.customService}</span>}
                  </div>
                )}

                {/* Preferred Date */}
                <div style={styles.inputBox}>
                  <label style={styles.label}><Calendar size={16} /> Preferred Date</label>
                  <div style={styles.iconWrapper}><Calendar size={18} /></div>
                  <input 
                    type="date" 
                    name="date" 
                    min={getTodayDateString()}
                    value={formData.date}
                    onChange={handleInputChange}
                    style={{
                      ...styles.input,
                      borderColor: errors.date ? '#ef4444' : 'var(--border-light)'
                    }} 
                  />
                  {errors.date && <span style={styles.errorText}>{errors.date}</span>}
                </div>

                {/* Preferred Time Slot (Dropdown) */}
                <div style={styles.inputBox}>
                  <label style={styles.label}><Clock size={16} /> Preferred Time Slot</label>
                  <div style={styles.iconWrapper}><Clock size={18} /></div>
                  <select 
                    name="timeSlot" 
                    value={formData.timeSlot}
                    onChange={handleInputChange}
                    disabled={!formData.date || loadingSlots}
                    style={{
                      ...styles.input,
                      borderColor: errors.timeSlot ? '#ef4444' : 'var(--border-light)',
                      cursor: (!formData.date || loadingSlots) ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {!formData.date ? (
                      <option value="">Select date first</option>
                    ) : loadingSlots ? (
                      <option value="">Loading slots...</option>
                    ) : (
                      <>
                        <option value="">Select slot</option>
                        {allTimeSlots.map((slot, index) => {
                          const isBooked = bookedSlots.includes(slot);
                          return (
                            <option key={index} value={slot} disabled={isBooked}>
                              {slot} {isBooked ? '(Booked)' : ''}
                            </option>
                          );
                        })}
                      </>
                    )}
                  </select>
                  {errors.timeSlot && <span style={styles.errorText}>{errors.timeSlot}</span>}
                </div>

                {/* Brief Message */}
                <div style={{ ...styles.inputBox, gridColumn: 'span 2' }} className="booking-message-span">
                  <label style={styles.label}><FileText size={16} /> Message / Describe Symptoms</label>
                  <div style={{ ...styles.iconWrapper, top: '39px' }}><FileText size={18} /></div>
                  <textarea 
                    name="message" 
                    placeholder="Describe any pain points or injury history..." 
                    value={formData.message}
                    onChange={handleInputChange}
                    style={styles.textarea} 
                  />
                </div>
              </div>

              {submitError && (
                <div style={{ color: '#ef4444', fontSize: '0.85rem', fontWeight: '600', marginBottom: '16px', textAlign: 'center' }}>
                  ❌ {submitError}
                </div>
              )}

              <div className="text-center">
                <button 
                  type="submit" 
                  className="btn-primary" 
                  disabled={isSubmitting}
                  style={{ width: '100%', justifyContent: 'center', padding: '16px', opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
                >
                  {isSubmitting ? 'Submitting Appointment Request...' : 'Submit Appointment Request'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .booking-card {
            padding: 24px !important;
          }
          .booking-form-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .booking-message-span {
            grid-column: span 1 !important;
          }
        }
      `}</style>
    </section>
  );
}
