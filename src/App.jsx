import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import AboutPage from './components/AboutPage';
import ServicesPage from './components/ServicesPage';
import ConditionsPage from './components/ConditionsPage';
import Gallery from './components/Gallery';
import ContactPage from './components/ContactPage';
import BookingForm from './components/BookingForm';
import AdminPanel from './components/AdminPanel';
import CallCTA from './components/CallCTA';
import WhatsAppCTA from './components/WhatsAppCTA';
import Footer from './components/Footer';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import TermsOfServicePage from './components/TermsOfServicePage';
import './App.css';

export default function App() {
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

  const [currentHash, setCurrentHash] = useState(window.location.hash || '#/');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const [transitionActive, setTransitionActive] = useState(false);

  // Load bookings from database on mount (fallback to localStorage if server is offline)
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await fetch(`${apiBase}/api/bookings`);
        if (response.ok) {
          const data = await response.json();
          setBookings(data);
        }
      } catch (e) {
        console.error("Failed to fetch bookings from server", e);
        const saved = localStorage.getItem('apex_bookings');
        if (saved) {
          try {
            setBookings(JSON.parse(saved));
          } catch (err) {
            console.error("Failed to parse local bookings", err);
          }
        }
      }
    };
    fetchBookings();
  }, []);

  // Update hash state on changes
  useEffect(() => {
    const handleHashChange = () => {
      setLoading(true);
      setTransitionActive(false);
      setCurrentHash(window.location.hash || '#/');
      
      // Simulate quick premium loading transitions
      const timer = setTimeout(() => {
        setLoading(false);
        window.scrollTo(0, 0);
      }, 300);

      return () => clearTimeout(timer);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Activate page transition animation after load completes
  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setTransitionActive(true);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setTransitionActive(false);
    }
  }, [loading, currentHash]);

  const handleAddBooking = (newBooking) => {
    setBookings(prev => [newBooking, ...prev]);
  };

  const handleUpdateBookings = (updatedList) => {
    setBookings(updatedList);
  };

  const handleNavigate = (path) => {
    window.location.hash = `#/${path}`;
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '65vh', gap: '20px' }}>
          <div style={{ 
            width: '56px', 
            height: '56px', 
            borderRadius: '50%',
            background: 'conic-gradient(from 0deg, var(--primary) 30%, var(--secondary) 100%)',
            mask: 'radial-gradient(farthest-side, transparent 65%, black 66%)',
            WebkitMask: 'radial-gradient(farthest-side, transparent 65%, black 66%)',
            animation: 'spin 1s linear infinite'
          }}></div>
          <span style={{ fontSize: '1rem', color: 'var(--primary)', fontWeight: '700', letterSpacing: '0.05em', fontFamily: 'var(--font-heading)' }}>Loading <span className="notranslate">{getIsTamil() ? 'தி தெரபி யூனிவர்ஸ்' : 'THE THERAPY UNIVERSE'}</span>...</span>
        </div>
      );
    }

    switch (currentHash) {
      case '#/':
      case '#home':
        return <Home onNavigate={handleNavigate} />;
      case '#/about':
        return <AboutPage />;
      case '#/services':
        return <ServicesPage />;
      case '#/conditions':
        return <ConditionsPage />;
      case '#/gallery':
        return <Gallery />;
      case '#/contact':
        return <ContactPage />;
      case '#/booking':
        return <BookingForm onAddBooking={handleAddBooking} />;
      case '#/privacy-policy':
        return <PrivacyPolicyPage />;
      case '#/terms-of-service':
        return <TermsOfServicePage />;
      case '#/admin':
        return <AdminPanel bookings={bookings} onUpdateBookings={handleUpdateBookings} />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <>
      <Navbar />
      <main style={{ marginTop: '64px', minHeight: 'calc(100svh - 400px)' }} className={`route-transition ${transitionActive ? 'active' : ''}`}>
        {renderContent()}
      </main>
      <Footer />
      <CallCTA />
      <WhatsAppCTA />
    </>
  );
}
