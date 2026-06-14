import React, { useEffect, useRef } from 'react';
import Services from './Services';
import servicesHeroImg from '../assets/services-hero-best.webp';

export default function ServicesPage() {
  const heroRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    // Lazy load background when hero enters viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            hero.style.backgroundImage = `url("${servicesHeroImg}")`;
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

  return (
    <div className="fade-in">
      {/* Full-width hero background with parallax and lazy load */}
      <div
        className="hero-full-bg parallax"
        ref={heroRef}
      >
        <div className="hero-overlay" />
        <div className="hero-text">
          <h1 className="hero-title-gradient">Clinical Services</h1>
        </div>
      </div>
      <Services />
    </div>
  );
}

