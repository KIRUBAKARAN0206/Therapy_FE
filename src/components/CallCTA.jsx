import React from 'react';
import { Phone } from 'lucide-react';

export default function CallCTA() {
  const phoneNumber = "+918220952580"; // Clinic phone number

  const styles = {
    floatingBtn: {
      position: 'fixed',
      bottom: '104px',
      right: '32px',
      backgroundColor: 'var(--primary-bg)',
      color: '#fff',
      width: '56px',
      height: '56px',
      borderRadius: '50%',
      boxShadow: '0 8px 24px rgba(30, 64, 175, 0.3)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      cursor: 'pointer',
      transition: 'var(--transition-smooth)',
      animation: 'float 4s ease-in-out infinite',
      animationDelay: '1s',
      border: 'none',
    }
  };

  return (
    <a 
      href={`tel:${phoneNumber}`} 
      style={styles.floatingBtn}
      title="Call Clinic"
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.1) translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 12px 30px rgba(30, 64, 175, 0.4)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1) translateY(0)';
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(30, 64, 175, 0.3)';
      }}
    >
      <Phone size={22} fill="currentColor" />
    </a>
  );
}
