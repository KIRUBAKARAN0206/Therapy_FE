import React, { useEffect, useRef } from 'react';
import About from './About';
import Specialists from './Specialists';
import aboutClinicImg from '../assets/physio-about-best.webp'; // Best high-quality 4K optimized WebP hero image

export default function AboutPage() {
  const heroRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    // Lazy load background when hero enters viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            hero.style.backgroundImage = `url("${aboutClinicImg}")`;
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

  return (
    <div className="fade-in">
      {/* Full‑width hero background with parallax and lazy load */}
      <div
        className="hero-full-bg parallax"
        ref={heroRef}
      >
        <div className="hero-overlay" />
        <div className="hero-text">
          <h1 className="hero-title-gradient">About <span className="notranslate">{getIsTamil() ? 'தி தெரபி யூனிவர்ஸ்' : 'THE THERAPY UNIVERSE'}</span></h1>
        </div>
      </div>
      <About />
      <Specialists />
    </div>
  );
}



