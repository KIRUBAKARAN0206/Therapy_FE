import React from 'react';

export default function WhatsAppCTA() {
  const phoneNumber = "918220952580"; // Clinic phone number
  const message = encodeURIComponent("Hello! I would like to inquire about booking a physical therapy session.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  const styles = {
    floatingBtn: {
      position: 'fixed',
      bottom: '32px',
      right: '32px',
      backgroundColor: '#25D366',
      color: '#fff',
      width: '56px',
      height: '56px',
      borderRadius: '50%',
      boxShadow: '0 8px 24px rgba(37, 211, 102, 0.4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      cursor: 'pointer',
      transition: 'var(--transition-smooth)',
      animation: 'float 4s ease-in-out infinite',
      border: 'none',
    },
    badge: {
      position: 'absolute',
      top: '2px',
      right: '2px',
      width: '10px',
      height: '10px',
      backgroundColor: '#ef4444',
      borderRadius: '50%',
      border: '2px solid #fff',
      animation: 'pulseGlow 2s infinite',
    }
  };

  return (
    <a 
      href={whatsappUrl} 
      target="_blank" 
      rel="noopener noreferrer" 
      style={styles.floatingBtn}
      title="Chat with Us"
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.1) translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 12px 30px rgba(37, 211, 102, 0.5)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1) translateY(0)';
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(37, 211, 102, 0.4)';
      }}
    >
      <div style={styles.badge}></div>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.528 1.977 14.07 1.948 12.012 1.948c-5.435 0-9.865 4.371-9.87 9.8.001 1.737.478 3.427 1.38 4.931l-.989 3.61 3.733-.968zM16.8 13.91c-.26-.13-1.54-.76-1.78-.85-.24-.09-.41-.13-.58.13-.17.26-.66.83-.81.99-.15.17-.3.19-.56.06-.26-.13-1.1-.41-2.1-1.3-.78-.7-1.31-1.56-1.46-1.82-.15-.26-.02-.4.11-.53.12-.11.26-.3.39-.46.13-.15.17-.26.26-.43.09-.17.04-.32-.02-.45-.06-.13-.58-1.4-.79-1.92-.21-.52-.42-.45-.58-.45-.15 0-.33-.02-.52-.02-.19 0-.5.07-.76.36-.26.29-1 .98-1 2.38s1.02 2.76 1.16 2.96c.14.19 2 3.05 4.85 4.28.68.29 1.21.47 1.62.6.68.22 1.3.19 1.79.11.55-.08 1.54-.63 1.76-1.24.22-.61.22-1.13.15-1.24-.07-.12-.26-.18-.52-.31z" />
      </svg>
    </a>
  );
}
