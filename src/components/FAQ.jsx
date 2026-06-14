import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQ() {
  const faqs = [
    {
      question: "What should I expect during my initial assessment?",
      answer: "During your first appointment, our specialist therapist will discuss your medical history, perform a physical audit of your joints, test muscle strength/flexibility, and review postural habits. We will then immediately formulate a personalized recovery plan."
    },
    {
      question: "Do I need a physician referral to book a session?",
      answer: "No, you do not need a doctor's referral to receive care at our clinic. You can book an appointment directly with us. However, if you plan to claim treatment costs via health insurance, some providers may require a physician's referral."
    },
    {
      question: "How long does each physiotherapy session last?",
      answer: "The initial assessment usually takes about 60 minutes. Standard treatment sessions typically last between 45 to 60 minutes, depending on the complexity of the treatment required."
    },
    {
      question: "What should I wear to my rehabilitation appointments?",
      answer: "We recommend wearing loose, comfortable athletic clothing that allows you to stretch and move easily. Providing easy access to the area under treatment (e.g., shorts for knee/hip issues, or a tank top for neck/shoulder issues) is highly helpful."
    },
    {
      question: "Do you accept health insurance providers?",
      answer: "Yes, we work directly with major health insurance plans. Please contact our reception desk with your policy details before your first session, and we will help you verify your benefits."
    }
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const styles = {
    section: {
      backgroundColor: 'var(--bg-card)',
      borderBottom: '1px solid var(--border-light)'
    },
    wrapper: {
      maxWidth: '800px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    },
    item: {
      border: '1px solid var(--border-light)',
      borderRadius: 'var(--radius-md)',
      backgroundColor: 'var(--bg-main)',
      overflow: 'hidden',
      transition: 'var(--transition-fast)'
    },
    header: {
      padding: '24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '1.05rem',
      color: 'var(--bg-dark)'
    },
    answer: {
      padding: '0 24px 24px',
      fontSize: '0.925rem',
      color: 'var(--text-muted)',
      lineHeight: '1.6',
      borderTop: '1px solid rgba(15, 23, 42, 0.04)'
    }
  };

  return (
    <section id="faq" className="section" style={styles.section}>
      <div className="container">
        <div className="text-center">
          <span className="section-tag">Common Queries</span>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-desc">
            Find answers to commonly asked questions about booking, treatments, insurance, and preparing for your physiotherapy sessions.
          </p>
        </div>

        <div style={styles.wrapper}>
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <div 
                key={index} 
                style={{
                  ...styles.item,
                  borderColor: isOpen ? 'var(--primary)' : 'var(--border-light)',
                  boxShadow: isOpen ? 'var(--shadow-sm)' : 'none'
                }}
              >
                <div style={styles.header} onClick={() => toggleFAQ(index)}>
                  <span>{faq.question}</span>
                  {isOpen ? <ChevronUp size={20} color="var(--primary)" /> : <ChevronDown size={20} />}
                </div>
                {isOpen && (
                  <div style={styles.answer}>
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
