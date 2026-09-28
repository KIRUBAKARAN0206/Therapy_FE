import React, { useState, useEffect, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import CallCTA from './components/CallCTA';
import WhatsAppCTA from './components/WhatsAppCTA';
import Footer from './components/Footer';
import logoImg from './assets/logo.webp';
import './App.css';

// Lazy loaded page components
const AboutPage = lazy(() => import('./components/AboutPage'));
const ServicesPage = lazy(() => import('./components/ServicesPage'));
const ConditionsPage = lazy(() => import('./components/ConditionsPage'));
const Gallery = lazy(() => import('./components/Gallery'));
const ContactPage = lazy(() => import('./components/ContactPage'));
const BookingForm = lazy(() => import('./components/BookingForm'));
const AdminPanel = lazy(() => import('./components/AdminPanel'));
const PrivacyPolicyPage = lazy(() => import('./components/PrivacyPolicyPage'));
const TermsOfServicePage = lazy(() => import('./components/TermsOfServicePage'));
const OnlineTherapyPage = lazy(() => import('./components/OnlineTherapyPage'));

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
  const [initialLoading, setInitialLoading] = useState(true);
  const [preloaderFading, setPreloaderFading] = useState(false);

  const [transitionActive, setTransitionActive] = useState(false);

  // Initial site load preloader timer
  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setPreloaderFading(true);
    }, 1200);

    const hideTimer = setTimeout(() => {
      setInitialLoading(false);
    }, 1700);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

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

  const LoadingLogoSpinner = () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '65vh', gap: '20px' }}>
      <div className="preloader-logo-container" style={{ width: '100px', height: '100px', marginBottom: 0 }}>
        <div className="preloader-ring-outer" style={{ inset: '-8px' }}></div>
        <div className="preloader-ring-glow"></div>
        <img src={logoImg} alt="THE THERAPY UNIVERSE Logo" className="preloader-logo-img" style={{ width: '84px', height: '84px' }} />
      </div>
      <span style={{ fontSize: '0.95rem', color: 'var(--primary)', fontWeight: '700', letterSpacing: '0.06em', fontFamily: 'var(--font-heading)' }}>
        Loading <span className="notranslate">{getIsTamil() ? 'தி தெரபி யூனிவர்ஸ்' : 'THE THERAPY UNIVERSE'}</span>...
      </span>
    </div>
  );

  const renderContent = () => {
    if (loading) {
      return <LoadingLogoSpinner />;
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
      case '#/online-therapy':
        return <OnlineTherapyPage onAddBooking={handleAddBooking} />;
      case '#/admin':
        return <AdminPanel bookings={bookings} onUpdateBookings={handleUpdateBookings} />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <>
      {/* Website Opening Splash Preloader with Official Clinic Logo */}
      {initialLoading && (
        <div className={`initial-preloader-overlay ${preloaderFading ? 'fade-out' : ''}`}>
          <div className="preloader-logo-container">
            <div className="preloader-ring-outer"></div>
            <div className="preloader-ring-glow"></div>
            <img src={logoImg} alt="THE THERAPY UNIVERSE Logo" className="preloader-logo-img" />
          </div>
          <h1 className="preloader-title notranslate">
            {getIsTamil() ? 'தி தெரபி யூனிவர்ஸ்' : 'THE THERAPY UNIVERSE'}
          </h1>
          <p className="preloader-subtitle">PHYSIO HEALTH CENTRE</p>
        </div>
      )}

      <Navbar />
      <main style={{ marginTop: '64px', minHeight: 'calc(100svh - 400px)' }} className={`route-transition ${transitionActive ? 'active' : ''}`}>
        <Suspense fallback={<LoadingLogoSpinner />}>
          {renderContent()}
        </Suspense>
      </main>
      <Footer />
      <CallCTA />
      <WhatsAppCTA />
    </>
  );
}

