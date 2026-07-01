import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { 
  ArrowLeft, ArrowRight, X, Image as ImageIcon, Heart, Play, Pause, 
  ZoomIn, ZoomOut, RotateCcw, ShieldCheck, 
  Eye, Award, Activity, Users, Folder, FolderOpen, Zap, Smile
} from 'lucide-react';

// Local WebP Assets
import clinicalRehabImg from '../assets/clinical_rehab.webp';
import dedicatedSpecialistsImg from '../assets/dedicated_specialists.webp';
import individualizedTherapyImg from '../assets/individualized_therapy.webp';
import modernTechniquesImg from '../assets/modern_techniques.webp';
import physioAboutBestImg from '../assets/physio-about-best.webp';
import recoveryBannerImg from '../assets/recovery_banner.webp';

// Premium Image with Loading Skeleton component
function ImageWithLoader({ src, alt, className, style }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      {!loaded && !error && (
        <div className="skeleton-loader" style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.5s infinite linear',
          zIndex: 1
        }} />
      )}
      {error ? (
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f8fafc',
          color: 'var(--text-muted)',
          fontSize: '0.8rem',
          gap: '8px'
        }}>
          <ImageIcon size={24} style={{ opacity: 0.5 }} />
          <span>Failed to load image</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className={className}
          style={{
            ...style,
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
        />
      )}
    </div>
  );
}

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [customPhotos, setCustomPhotos] = useState([]);
  const [selectedPhotoIdx, setSelectedPhotoIdx] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [viewMode, setViewMode] = useState('folders'); // 'folders' or 'all'
  
  // Interactive features states
  const [likedPhotos, setLikedPhotos] = useState([]);
  const [isSlideshowPlaying, setIsSlideshowPlaying] = useState(false);
  const [lightboxZoom, setLightboxZoom] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  // Refs for tracking layout elements
  const heroRef = useRef(null);
  const lightboxImgRef = useRef(null);
  const slideshowTimerRef = useRef(null);
  const progressTimerRef = useRef(null);
  const [slideshowProgress, setSlideshowProgress] = useState(0);

  const defaultPhotos = [
    {
      id: "local_3",
      title: "Individualized Spinal Mobilization",
      category: "Treatment Sessions",
      url: individualizedTherapyImg,
      description: "Hands-on spinal mobilization and manual therapy tailored specifically to target lower back pain and stiffness.",
      baseLikes: 0
    },
    {
      id: "local_4",
      title: "Modern Electrotherapy & Modalities",
      category: "Therapy Programs",
      url: modernTechniquesImg,
      description: "Application of advanced healing technologies including ultrasound and laser therapy for deep tissue recovery.",
      baseLikes: 0
    },
    {
      id: "unsplash_3",
      title: "Manual Joint Adjustment",
      category: "Treatment Sessions",
      url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&auto=format&fit=crop&q=80",
      description: "Targeted skeletal adjustments to restore natural range of motion and relieve muscle strain in the shoulder and neck.",
      baseLikes: 0
    },
    {
      id: "unsplash_5",
      title: "Guided Balance & Core Rehabilitation",
      category: "Therapy Programs",
      url: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&auto=format&fit=crop&q=80",
      description: "Group balance, stabilization, and core programs designed for fall prevention and athletic conditioning.",
      baseLikes: 0
    },
  ];

  const defaultCategories = [
    'Rehabilitation Therapy',
    'Treatment Sessions',
    'Patient Recovery',
    'Therapy Programs',
    'Electro Therapy',
    'Pediatric Therapy'
  ];

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (selectedPhotoIdx !== null) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '15px';
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [selectedPhotoIdx]);

  // Load custom photos and likes
  useEffect(() => {
    const savedPhotos = localStorage.getItem('clinic_gallery_photos');
    if (savedPhotos) {
      try {
        setCustomPhotos(JSON.parse(savedPhotos));
      } catch (e) {
        console.error("Failed to parse gallery photos", e);
      }
    }

    const savedLikes = localStorage.getItem('clinic_gallery_likes');
    if (savedLikes) {
      try {
        setLikedPhotos(JSON.parse(savedLikes));
      } catch (e) {
        console.error("Failed to parse gallery likes", e);
      }
    }

    // Lazy load / Parallax Hero Banner
    const hero = heroRef.current;
    if (!hero) return;
    hero.style.backgroundImage = `url("${recoveryBannerImg}")`;

    const handleScroll = () => {
      const scrolled = window.scrollY;
      hero.style.backgroundPositionY = `${50 + scrolled * 0.1}%`;
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const allPhotos = [...customPhotos, ...defaultPhotos];

  const uniqueFolders = Array.from(new Set([
    ...defaultCategories,
    ...allPhotos.map(p => p.category).filter(Boolean)
  ]));

  const categories = [
    'All',
    ...uniqueFolders
  ];

  const filteredPhotos = viewMode === 'folders'
    ? (selectedFolder ? allPhotos.filter(p => p.category === selectedFolder) : allPhotos)
    : allPhotos.filter(photo => activeFilter === 'All' || photo.category === activeFilter);

  // Keyboard navigation & Slideshow progress timer
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedPhotoIdx === null) return;
      if (e.key === 'ArrowRight') {
        setSelectedPhotoIdx((prev) => (prev + 1) % filteredPhotos.length);
        resetZoom();
      } else if (e.key === 'ArrowLeft') {
        setSelectedPhotoIdx((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length);
        resetZoom();
      } else if (e.key === 'Escape') {
        closeLightbox();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIdx, filteredPhotos]);

  // Handle slideshow autoplay
  useEffect(() => {
    if (isSlideshowPlaying && selectedPhotoIdx !== null) {
      setSlideshowProgress(0);
      
      // Progress bar animation ticker (smooth 100ms updates)
      const duration = 3500; // 3.5s per slide
      const interval = 100;
      let elapsed = 0;
      
      progressTimerRef.current = setInterval(() => {
        elapsed += interval;
        setSlideshowProgress((elapsed / duration) * 100);
      }, interval);

      slideshowTimerRef.current = setTimeout(() => {
        setSelectedPhotoIdx((prev) => (prev + 1) % filteredPhotos.length);
        resetZoom();
      }, duration);
    } else {
      clearInterval(progressTimerRef.current);
      clearTimeout(slideshowTimerRef.current);
      setSlideshowProgress(0);
    }

    return () => {
      clearInterval(progressTimerRef.current);
      clearTimeout(slideshowTimerRef.current);
    };
  }, [isSlideshowPlaying, selectedPhotoIdx, filteredPhotos.length]);

  const openLightbox = (photoId) => {
    const idx = filteredPhotos.findIndex((p) => p.id === photoId);
    if (idx !== -1) {
      setSelectedPhotoIdx(idx);
      resetZoom();
      setIsSlideshowPlaying(false);
    }
  };

  const closeLightbox = () => {
    setSelectedPhotoIdx(null);
    setIsSlideshowPlaying(false);
    resetZoom();
  };

  const handleLike = (e, photoId) => {
    e.stopPropagation();
    let updatedLikes;
    if (likedPhotos.includes(photoId)) {
      updatedLikes = likedPhotos.filter(id => id !== photoId);
    } else {
      updatedLikes = [...likedPhotos, photoId];
    }
    setLikedPhotos(updatedLikes);
    localStorage.setItem('clinic_gallery_likes', JSON.stringify(updatedLikes));
  };

  const getLikesCount = (photo) => {
    return photo.baseLikes + (likedPhotos.includes(photo.id) ? 1 : 0);
  };

  const getFolderIcon = (folderName) => {
    switch (folderName) {
      case 'Rehabilitation Therapy':
        return <Activity size={20} />;
      case 'Treatment Sessions':
        return <Heart size={20} />;
      case 'Patient Recovery':
        return <ShieldCheck size={20} />;
      case 'Therapy Programs':
        return <Award size={20} />;
      case 'Electro Therapy':
        return <Zap size={20} />;
      case 'Pediatric Therapy':
        return <Smile size={20} />;
      default:
        return <FolderOpen size={20} />;
    }
  };

  const getFolderDescription = (folderName) => {
    switch (folderName) {
      case 'Rehabilitation Therapy':
        return 'Restoring strength, mobility, and physical function through targeted plans.';
      case 'Treatment Sessions':
        return 'Hands-on clinical manual adjustments and sessions to relieve pain.';
      case 'Patient Recovery':
        return 'Tracking progression and milestones in patient healing and rehabilitation.';
      case 'Therapy Programs':
        return 'Specialized health, core strength, and stabilization programs.';
      case 'Electro Therapy':
        return 'Advanced electric stimulation modalities and ultrasound treatment.';
      case 'Pediatric Therapy':
        return "Specialized pediatric physical therapy tailored for children's development.";
      default:
        return 'Browse through uploaded visual records, snapshots and clinic activities.';
    }
  };

  const getFolderFallback = (folderName) => {
    switch (folderName) {
      case 'Rehabilitation Therapy':
        return 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop&q=80';
      case 'Treatment Sessions':
        return 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&auto=format&fit=crop&q=80';
      case 'Patient Recovery':
        return 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&auto=format&fit=crop&q=80';
      case 'Therapy Programs':
        return 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&auto=format&fit=crop&q=80';
      case 'Electro Therapy':
        return 'https://images.unsplash.com/photo-1519824145371-296894a0daa9?w=800&auto=format&fit=crop&q=80';
      case 'Pediatric Therapy':
        return 'https://images.unsplash.com/photo-1594824813573-246434e33963?w=800&auto=format&fit=crop&q=80';
      default:
        return 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop&q=80';
    }
  };

  const resetZoom = () => {
    setLightboxZoom(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const zoomIn = (e) => {
    e.stopPropagation();
    setLightboxZoom(prev => Math.min(prev + 0.3, 3));
  };

  const zoomOut = (e) => {
    e.stopPropagation();
    setLightboxZoom(prev => {
      const next = Math.max(prev - 0.3, 1);
      if (next === 1) setPanOffset({ x: 0, y: 0 });
      return next;
    });
  };

  const handleMouseMoveFolder = (e) => {
    const card = e.currentTarget.querySelector('.folder-card');
    if (!card) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation (-10 to 10 deg)
    const rotateX = -((y / rect.height) - 0.5) * 16;
    const rotateY = ((x / rect.width) - 0.5) * 16;
    
    card.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    card.style.boxShadow = `0 30px 60px rgba(20, 184, 166, 0.25), 0 0 35px rgba(20, 184, 166, 0.15)`;
    card.style.borderColor = `rgba(20, 184, 166, 0.7)`;
    card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
    card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
  };

  const handleMouseLeaveFolder = (e) => {
    const card = e.currentTarget.querySelector('.folder-card');
    if (!card) return;
    card.style.transform = '';
    card.style.boxShadow = '';
    card.style.borderColor = '';
  };

  // Image panning logic inside Lightbox
  const handleMouseDown = (e) => {
    if (lightboxZoom === 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging || lightboxZoom === 1) return;
    setPanOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // No custom uploader/delete methods (managed on Admin Panel)

  return (
    <div className="gallery-page fade-in">
      
      {/* 1. Cinematic Hero Header */}
      <div className="gallery-hero-banner" ref={heroRef}>
        <div className="gallery-hero-overlay" />
        <div className="gallery-hero-content container">
          <div className="section-tag" style={{ color: 'var(--secondary)', backgroundColor: 'rgba(20, 184, 166, 0.12)', border: '1px solid rgba(20, 184, 166, 0.2)' }}>
            VISUAL PORTFOLIO
          </div>
          <h1 className="hero-title-gradient">Our Healing Spaces</h1>
          <p className="gallery-hero-subtitle">
            Take a virtual tour of The Therapy Universe. Explore our modern clinical rooms, advanced rehabilitation equipment, and live treatment sessions.
          </p>

          {/* Clinical Stat Badges */}
          <div className="gallery-stats-grid">
            <div className="gallery-stat-item">
              <Activity className="stat-icon" size={20} />
              <div className="stat-info-txt">
                <h4>50+</h4>
                <span>Modern Modalities</span>
              </div>
            </div>
            <div className="gallery-stat-item">
              <Users className="stat-icon" size={20} />
              <div className="stat-info-txt">
                <h4>15+</h4>
                <span>Expert Specialists</span>
              </div>
            </div>
            <div className="gallery-stat-item">
              <Award className="stat-icon" size={20} />
              <div className="stat-info-txt">
                <h4>100%</h4>
                <span>Sanitized Rooms</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '0 24px', position: 'relative', zIndex: 5 }}>
        
        {/* 2. Glassmorphic Filter & View Mode Toolbar */}
        <div className="gallery-toolbar-card glass-card">
          <div className="gallery-filters-container">
            {viewMode === 'all' ? (
              categories.map((filter) => {
                const count = allPhotos.filter(p => filter === 'All' || p.category === filter).length;
                return (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`gallery-filter-btn ${activeFilter === filter ? 'active' : ''}`}
                  >
                    {filter}
                    <span className="filter-count-badge">{count}</span>
                  </button>
                );
              })
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '700' }}>
                <Folder size={18} color="var(--primary)" /> 
                {selectedFolder ? `Folder: ${selectedFolder}` : 'All Clinic Folders'}
              </div>
            )}
          </div>

          {/* View Mode Switcher */}
          <div className="view-mode-toggle">
            <button 
              className={`toggle-btn ${viewMode === 'folders' ? 'active' : ''}`}
              onClick={() => {
                setViewMode('folders');
                setSelectedFolder(null);
              }}
            >
              Folder View
            </button>
            <button 
              className={`toggle-btn ${viewMode === 'all' ? 'active' : ''}`}
              onClick={() => {
                setViewMode('all');
                setSelectedFolder(null);
              }}
            >
              All Photos
            </button>
          </div>
        </div>

        {/* 4. Elegant Cards / Folders Grid */}
        {viewMode === 'folders' && selectedFolder === null ? (
          uniqueFolders.length === 0 ? (
            <div className="gallery-empty-state glass-card">
              <Folder size={48} className="empty-icon" />
              <h3>No Folders Created Yet</h3>
              <p>Go to Admin Panel to upload images into folders.</p>
            </div>
          ) : (
            <div className="gallery-folders-grid">
              {uniqueFolders.map((folderName, idx) => {
                const folderPhotos = allPhotos.filter(p => p.category === folderName);
                const count = folderPhotos.length;
                
                // Get custom photos for this folder
                const customFolderPhotos = customPhotos.filter(p => p.category === folderName);
                // The first uploaded photo is the oldest, which is at the end of customFolderPhotos
                const coverPhoto = customFolderPhotos.length > 0
                  ? customFolderPhotos[customFolderPhotos.length - 1]?.url
                  : defaultPhotos.filter(p => p.category === folderName)[0]?.url;
                return (
                  <div 
                    key={folderName}
                    className="folder-card-wrapper fade-in"
                    style={{ animationDelay: `${idx * 40}ms` }}
                    onClick={() => setSelectedFolder(folderName)}
                    onMouseMove={handleMouseMoveFolder}
                    onMouseLeave={handleMouseLeaveFolder}
                  >
                    <div className="folder-card">
                      <div className="folder-cover-img-container">
                        <img 
                          src={coverPhoto || getFolderFallback(folderName)} 
                          alt={folderName} 
                          className="folder-cover-img" 
                          onError={(e) => {
                            e.target.src = getFolderFallback(folderName);
                          }}
                        />
                      </div>
                      
                      <div className="folder-details">
                        {/* Title and Icon row */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                          <span style={{ color: 'var(--primary)', display: 'inline-flex' }}>
                            {getFolderIcon(folderName)}
                          </span>
                          <h3 style={{ margin: 0 }}>{folderName}</h3>
                        </div>

                        {/* 2-line Description */}
                        <p style={{ 
                          fontSize: '0.82rem', 
                          color: 'var(--text-muted)', 
                          margin: '0 0 16px 0', 
                          lineHeight: '1.45', 
                          display: '-webkit-box',
                          WebkitLineClamp: '2',
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          fontWeight: '500'
                        }}>
                          {getFolderDescription(folderName)}
                        </p>

                        {/* Count Pill */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                          <span className="filter-count-badge" style={{ background: 'var(--bg-main)', color: 'var(--text-muted)', border: '1px solid var(--border-light)', padding: '4px 10px', fontSize: '0.75rem', fontWeight: '800' }}>
                            {count} {count === 1 ? 'item' : 'items'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )
        ) : (
          <div>
            {viewMode === 'folders' && selectedFolder && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setSelectedFolder(null)}
                  className="gallery-filter-btn"
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 18px', borderRadius: '30px' }}
                >
                  <ArrowLeft size={16} /> Back to Folders
                </button>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--bg-dark)', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                  <FolderOpen size={22} color="var(--primary)" /> {selectedFolder}
                </h2>
              </div>
            )}

            {filteredPhotos.length === 0 ? (
              <div className="gallery-empty-state glass-card">
                <ImageIcon size={48} className="empty-icon" />
                <h3>No Visual Assets Found</h3>
                <p>There are currently no clinical photos inside this view.</p>
                {viewMode === 'all' && (
                  <button 
                    className="btn-primary" 
                    style={{ marginTop: '20px' }} 
                    onClick={() => setActiveFilter('All')}
                  >
                    Reset Filters
                  </button>
                )}
              </div>
            ) : (
              <div className="gallery-cards-grid" key={selectedFolder || activeFilter}>
                {filteredPhotos.map((photo, idx) => {
                  const isLiked = likedPhotos.includes(photo.id);
                  return (
                    <div
                      key={photo.id}
                      onClick={() => openLightbox(photo.id)}
                      className="gallery-interactive-card"
                      style={{ animationDelay: `${idx * 40}ms` }}
                    >
                      <div className="card-media-wrapper">
                        <span className="card-category-tag">{photo.category}</span>
                        
                        {photo.url && (photo.url.endsWith('.mp4') || photo.url.endsWith('.webm') || photo.url.endsWith('.ogg') || photo.url.startsWith('data:video/')) ? (
                          <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
                            <video
                              src={photo.url}
                              className="card-media-img"
                              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                              muted
                              playsInline
                            />
                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: '50%', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <Play size={20} color="#fff" fill="#fff" />
                            </div>
                          </div>
                        ) : (
                          <ImageWithLoader
                            src={photo.url}
                            alt={photo.title}
                            className="card-media-img"
                          />
                        )}

                        {/* Interactive Overlay */}
                        <div className="card-action-overlay">
                          <div className="card-actions-wrapper">
                            <button 
                              className={`card-interaction-btn like-btn ${isLiked ? 'liked' : ''}`}
                              onClick={(e) => handleLike(e, photo.id)}
                              title={isLiked ? "Unlike" : "Like"}
                            >
                              <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
                              <span>{getLikesCount(photo)}</span>
                            </button>

                            <div className="zoom-circle-indicator">
                              {photo.url && (photo.url.endsWith('.mp4') || photo.url.endsWith('.webm') || photo.url.endsWith('.ogg') || photo.url.startsWith('data:video/')) ? <Play size={20} /> : <Eye size={20} />}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="card-info-pane">
                        <div className="info-title-row">
                          <h4>{photo.title}</h4>
                          <div className="certified-badge">
                            <ShieldCheck size={15} />
                          </div>
                        </div>
                        <p>{photo.description || 'Professional therapy environment offering patient recovery.'}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* 5. Immersive Lightbox Modal */}
      {selectedPhotoIdx !== null && createPortal(
        <div className="lightbox-cinematic-overlay" onClick={closeLightbox}>
          
          {/* Autoplay Slideshow Progress Bar */}
          {isSlideshowPlaying && (
            <div 
              className="slideshow-progress-indicator" 
              style={{ width: `${slideshowProgress}%` }}
            />
          )}

          {/* Lightbox Controls Toolbar */}
          <div className="lightbox-top-toolbar" onClick={(e) => e.stopPropagation()}>
            <div className="toolbar-left">
              <span className="category-indicator">
                {filteredPhotos[selectedPhotoIdx].category}
              </span>
              <span className="divider">/</span>
              <span className="title-indicator">
                {filteredPhotos[selectedPhotoIdx].title}
              </span>
            </div>

            <div className="toolbar-actions">
              <button 
                onClick={(e) => handleLike(e, filteredPhotos[selectedPhotoIdx].id)}
                className={`toolbar-btn like ${likedPhotos.includes(filteredPhotos[selectedPhotoIdx].id) ? 'liked' : ''}`}
                title="Like Photo"
              >
                <Heart size={18} fill={likedPhotos.includes(filteredPhotos[selectedPhotoIdx].id) ? "currentColor" : "none"} />
                <span>{getLikesCount(filteredPhotos[selectedPhotoIdx])}</span>
              </button>

              <button 
                onClick={(e) => { e.stopPropagation(); setIsSlideshowPlaying(!isSlideshowPlaying); }}
                className={`toolbar-btn ${isSlideshowPlaying ? 'active-slideshow' : ''}`}
                title={isSlideshowPlaying ? "Pause Autoplay" : "Start Slideshow"}
              >
                {isSlideshowPlaying ? <Pause size={18} /> : <Play size={18} />}
              </button>

              <button onClick={zoomIn} className="toolbar-btn" title="Zoom In">
                <ZoomIn size={18} />
              </button>
              <button onClick={zoomOut} className="toolbar-btn" title="Zoom Out" disabled={lightboxZoom === 1}>
                <ZoomOut size={18} />
              </button>
              {lightboxZoom > 1 && (
                <button onClick={resetZoom} className="toolbar-btn" title="Reset Zoom">
                  <RotateCcw size={18} />
                </button>
              )}

              <button onClick={closeLightbox} className="toolbar-btn close-btn" title="Close Overlay">
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Main Photo viewport */}
          <div className="lightbox-viewer-area">
            
            {/* Left navigation arrow */}
            {filteredPhotos.length > 1 && (
              <button 
                className="lightbox-arrow-btn left"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPhotoIdx((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length);
                  resetZoom();
                }}
              >
                <ArrowLeft size={24} />
              </button>
            )}

            {/* Displaying Image container with support for panning */}
            <div 
              className="lightbox-image-stage"
              onClick={(e) => e.stopPropagation()}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              style={{ cursor: lightboxZoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
            >
              {filteredPhotos[selectedPhotoIdx].url && (filteredPhotos[selectedPhotoIdx].url.endsWith('.mp4') || filteredPhotos[selectedPhotoIdx].url.endsWith('.webm') || filteredPhotos[selectedPhotoIdx].url.endsWith('.ogg') || filteredPhotos[selectedPhotoIdx].url.startsWith('data:video/')) ? (
                <video
                  src={filteredPhotos[selectedPhotoIdx].url}
                  controls
                  autoPlay
                  className="lightbox-main-img"
                  style={{ maxHeight: '80vh', maxWidth: '100%', objectFit: 'contain' }}
                />
              ) : (
                <img
                  ref={lightboxImgRef}
                  src={filteredPhotos[selectedPhotoIdx].url}
                  alt={filteredPhotos[selectedPhotoIdx].title}
                  className="lightbox-main-img"
                  style={{
                    transform: `scale(${lightboxZoom}) translate(${panOffset.x / lightboxZoom}px, ${panOffset.y / lightboxZoom}px)`,
                    transition: isDragging ? 'none' : 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  draggable="false"
                />
              )}
            </div>

            {/* Right navigation arrow */}
            {filteredPhotos.length > 1 && (
              <button 
                className="lightbox-arrow-btn right"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPhotoIdx((prev) => (prev + 1) % filteredPhotos.length);
                  resetZoom();
                }}
              >
                <ArrowRight size={24} />
              </button>
            )}

          </div>

          {/* Dynamic Lightbox Bottom Panel */}
          <div className="lightbox-bottom-panel" onClick={(e) => e.stopPropagation()}>
            <p className="photo-full-desc">
              {filteredPhotos[selectedPhotoIdx].description}
            </p>

            {/* 6. Bottom Thumbnail strip */}
            {filteredPhotos.length > 1 && (
              <div className="lightbox-thumbnail-scroller">
                {filteredPhotos.map((photo, idx) => (
                  <div
                    key={photo.id}
                    onClick={() => { setSelectedPhotoIdx(idx); resetZoom(); }}
                    className={`lightbox-thumb-container ${selectedPhotoIdx === idx ? 'active' : ''}`}
                  >
                    {photo.url && (photo.url.endsWith('.mp4') || photo.url.endsWith('.webm') || photo.url.endsWith('.ogg') || photo.url.startsWith('data:video/')) ? (
                      <div style={{ width: '100%', height: '100%', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Play size={14} color="#fff" />
                      </div>
                    ) : (
                      <img src={photo.url} alt={photo.title} className="lightbox-thumb-img" />
                    )}
                  </div>
                ))}
              </div>
            )}
            
            <div className="photo-counter-tag">
              IMAGE {selectedPhotoIdx + 1} OF {filteredPhotos.length}
            </div>
          </div>

        </div>,
        document.body
      )}

      {/* Embedded Highly Attractive CSS Override Rules */}
      <style>{`
        /* Folder View styling */
        .gallery-folders-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 32px;
          margin-bottom: 80px;
        }

        .folder-card-wrapper {
          perspective: 1000px;
          cursor: pointer;
        }

        .folder-card {
          position: relative;
          background: #ffffff;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-lg);
          height: 350px;
          display: flex;
          flex-direction: column;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: var(--shadow-sm);
          overflow: hidden;
        }

        /* Folder tabs */
        .folder-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 20px;
          width: 80px;
          height: 15px;
          background: #f8fafc;
          border-radius: 10px 10px 0 0;
          border: 1px solid var(--border-light);
          border-bottom: none;
          transform: translateY(-100%);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 1;
        }

        .folder-card:hover {
          transform: translateY(-8px) rotateX(2deg);
          box-shadow: var(--shadow-premium);
          border-color: rgba(20, 184, 166, 0.4);
        }

        .folder-card:hover::before {
          background: #ffffff;
          border-color: rgba(20, 184, 166, 0.4);
        }

        .folder-cover-img-container {
          position: relative;
          width: 100%;
          height: 170px;
          overflow: hidden;
          background-color: #f1f5f9;
        }

        .folder-cover-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .folder-card:hover .folder-cover-img {
          transform: scale(1.08) rotate(0.5deg);
        }

        .folder-details {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          flex-grow: 1;
          background: #ffffff;
        }

        .folder-details h3 {
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--bg-dark);
          margin: 0;
          letter-spacing: -0.01em;
        }

        .folder-details span {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        /* Toggle switches */
        .view-mode-toggle {
          display: flex;
          background: rgba(15, 23, 42, 0.05);
          padding: 4px;
          border-radius: 30px;
          border: 1px solid var(--border-light);
        }

        .toggle-btn {
          border: none;
          background: none;
          padding: 6px 16px;
          font-size: 0.8rem;
          font-weight: 700;
          border-radius: 30px;
          cursor: pointer;
          color: var(--text-muted);
          transition: all 0.3s ease;
        }

        .toggle-btn.active {
          background: #ffffff;
          color: var(--primary);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
        }

        /* 1. Gallery Hero Design */
        .gallery-hero-banner {
          position: relative;
          width: 100%;
          min-height: 420px;
          display: flex;
          align-items: center;
          background-size: cover;
          background-position: center 50%;
          background-repeat: no-repeat;
          overflow: hidden;
          margin-top: -64px; /* Account for navbar */
          padding: 120px 0 80px;
        }

        .gallery-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom, 
            rgba(15, 23, 42, 0.8) 0%, 
            rgba(15, 23, 42, 0.6) 60%, 
            rgba(8, 105, 114, 0.35) 100%
          );
          z-index: 1;
        }

        .gallery-hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          color: #ffffff;
          max-width: 800px !important;
          margin: 0 auto;
          padding: 0 24px;
        }

        .gallery-hero-content h1 {
          color: #ffffff;
          font-size: 3.5rem;
          font-weight: 850;
          letter-spacing: -0.03em;
          text-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
          margin-top: 16px;
          margin-bottom: 16px;
          animation: slideDown 1s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .gallery-hero-subtitle {
          color: rgba(248, 250, 252, 0.9);
          font-size: 1.125rem;
          line-height: 1.6;
          margin-bottom: 36px;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          font-family: var(--font-body);
          animation: slideDown 1.1s cubic-bezier(0.16, 1, 0.3, 1) both;
          animation-delay: 0.1s;
        }

        /* Hero Stats Grid */
        .gallery-stats-grid {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 40px;
          flex-wrap: wrap;
          margin-top: 12px;
          animation: slideDown 1.2s cubic-bezier(0.16, 1, 0.3, 1) both;
          animation-delay: 0.2s;
        }

        .gallery-stat-item {
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          padding: 10px 20px;
          border-radius: var(--radius-md);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          transition: all 0.3s ease;
        }
        
        .gallery-stat-item:hover {
          transform: translateY(-3px);
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(20, 184, 166, 0.4);
        }

        .stat-icon {
          color: var(--secondary);
          filter: drop-shadow(0 0 8px rgba(20, 184, 166, 0.5));
        }

        .stat-info-txt {
          text-align: left;
        }

        .stat-info-txt h4 {
          font-size: 1.25rem;
          font-weight: 800;
          color: #ffffff;
          line-height: 1.1;
        }

        .stat-info-txt span {
          font-size: 0.75rem;
          color: rgba(248, 250, 252, 0.7);
          font-weight: 600;
          letter-spacing: 0.02em;
        }

        /* 2. Glassmorphic Toolbar & Navigation */
        .gallery-toolbar-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 24px;
          margin: -36px auto 40px;
          border-radius: var(--radius-lg);
          gap: 20px;
          flex-wrap: wrap;
          box-shadow: var(--shadow-lg) !important;
        }

        .gallery-filters-container {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          align-items: center;
        }

        .gallery-filter-btn {
          padding: 8px 18px;
          border-radius: 30px;
          font-size: 0.82rem;
          font-weight: 700;
          border: 1px solid var(--border-light);
          background: #ffffff;
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .gallery-filter-btn:hover {
          color: var(--primary);
          border-color: var(--primary-glow);
          transform: translateY(-1px);
        }

        .gallery-filter-btn.active {
          background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
          color: #ffffff;
          border-color: transparent;
          box-shadow: 0 8px 20px rgba(79, 70, 229, 0.2);
        }

        .filter-count-badge {
          background: rgba(15, 23, 42, 0.05);
          color: var(--text-muted);
          font-size: 0.72rem;
          padding: 2px 7px;
          border-radius: 20px;
          font-weight: 800;
          transition: all 0.35s ease;
        }

        .gallery-filter-btn.active .filter-count-badge {
          background: rgba(255, 255, 255, 0.25);
          color: #ffffff;
        }

        .gallery-add-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background-color: var(--primary-bg);
          color: #ffffff;
          border: none;
          padding: 10px 20px;
          border-radius: 30px;
          font-weight: 700;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 12px rgba(8, 105, 114, 0.2);
        }

        .gallery-add-btn:hover {
          background-color: var(--primary-bg-hover);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(8, 105, 114, 0.35);
        }

        /* 3. Drag-and-Drop Image Uploader Panel */
        .upload-section-panel {
          padding: 28px;
          border-radius: var(--radius-lg);
          margin-bottom: 40px;
          border: 1px dashed rgba(79, 70, 229, 0.25) !important;
          animation: slideDown 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .upload-header {
          margin-bottom: 24px;
        }

        .upload-header h3 {
          font-size: 1.35rem;
          font-weight: 800;
          color: var(--bg-dark);
        }

        .upload-header p {
          font-size: 0.875rem;
          color: var(--text-muted);
          margin-top: 4px;
        }

        .upload-form-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 32px;
        }

        .drag-drop-zone {
          border: 2px dashed rgba(15, 23, 42, 0.1);
          border-radius: var(--radius-md);
          background: rgba(255, 255, 255, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          min-height: 250px;
          padding: 20px;
          text-align: center;
          overflow: hidden;
          position: relative;
          transition: all 0.3s ease;
        }

        .drag-drop-zone:hover {
          border-color: var(--primary);
          background: rgba(79, 70, 229, 0.02);
        }

        .drop-zone-cta {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .upload-cloud-icon {
          color: var(--text-muted);
          opacity: 0.7;
          margin-bottom: 8px;
          transition: transform 0.3s ease;
        }

        .drag-drop-zone:hover .upload-cloud-icon {
          transform: translateY(-4px) scale(1.05);
          color: var(--primary);
        }

        .drop-zone-cta h4 {
          font-size: 1rem;
          font-weight: 750;
          color: var(--bg-dark);
        }

        .drop-zone-cta p {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .drop-zone-cta span {
          font-size: 0.7rem;
          color: var(--text-muted);
          opacity: 0.8;
          margin-top: 8px;
        }

        .zone-preview-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          position: absolute;
          inset: 0;
          border-radius: calc(var(--radius-md) - 2px);
        }

        .upload-fields {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-group label {
          font-size: 0.82rem;
          font-weight: 800;
          color: var(--bg-dark);
          text-transform: uppercase;
          letter-spacing: 0.02em;
        }

        .form-group input, 
        .form-group select, 
        .form-group textarea {
          padding: 10px 14px;
          border-radius: var(--radius-sm);
          border: 1px solid rgba(15, 23, 42, 0.1);
          background: #ffffff;
          font-size: 0.9rem;
          outline: none;
          transition: border-color 0.3s ease;
        }

        .form-group input:focus, 
        .form-group select:focus, 
        .form-group textarea:focus {
          border-color: var(--primary);
        }

        .upload-action-buttons {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 10px;
        }

        .btn-cancel {
          background: transparent;
          border: 1px solid rgba(15, 23, 42, 0.15);
          color: var(--text-main);
          font-weight: 700;
          font-size: 0.85rem;
          padding: 10px 20px;
          border-radius: 30px;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .btn-cancel:hover {
          background: rgba(15, 23, 42, 0.05);
        }

        .btn-upload-submit {
          background: var(--primary-bg);
          border: none;
          color: #ffffff;
          font-weight: 700;
          font-size: 0.85rem;
          padding: 10px 22px;
          border-radius: 30px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.25s ease;
        }

        .btn-upload-submit:hover:not(:disabled) {
          background: var(--primary-bg-hover);
          transform: translateY(-1px);
        }

        .btn-upload-submit:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .spin-animate {
          animation: spin 1s linear infinite;
        }

        /* 4. Elegant Cards Grid */
        .gallery-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 30px;
          margin-bottom: 100px;
        }

        .gallery-interactive-card {
          background: var(--bg-card);
          border: 1px solid var(--border-light);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          cursor: pointer;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          animation: cardEntrance 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
          display: flex;
          flex-direction: column;
        }

        .gallery-interactive-card:hover {
          transform: translateY(-8px) scale(1.015);
          box-shadow: var(--shadow-premium);
          border-color: rgba(79, 70, 229, 0.15);
        }

        .card-media-wrapper {
          position: relative;
          height: 220px;
          overflow: hidden;
          background-color: #f1f5f9;
        }

        .card-media-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .gallery-interactive-card:hover .card-media-img {
          transform: scale(1.08) rotate(0.5deg);
        }

        .card-category-tag {
          position: absolute;
          top: 14px;
          left: 14px;
          background: rgba(15, 23, 42, 0.75);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #ffffff;
          font-size: 0.72rem;
          font-weight: 800;
          padding: 4px 12px;
          border-radius: 20px;
          z-index: 10;
          letter-spacing: 0.02em;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
        }

        .card-delete-btn {
          position: absolute;
          top: 14px;
          right: -40px; /* Hidden offscreen, slide in on hover */
          background: rgba(239, 68, 68, 0.9);
          border: none;
          color: #ffffff;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 10;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
        }

        .gallery-interactive-card:hover .card-delete-btn {
          right: 14px;
        }

        .card-delete-btn:hover {
          background: #dc2626;
          transform: scale(1.1);
        }

        /* Hover Actions Overlay */
        .card-action-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top, 
            rgba(15, 23, 42, 0.75) 0%, 
            rgba(15, 23, 42, 0.1) 100%
          );
          opacity: 0;
          display: flex;
          align-items: flex-end;
          padding: 16px;
          transition: all 0.4s ease;
          z-index: 5;
          backdrop-filter: blur(2px);
          -webkit-backdrop-filter: blur(2px);
        }

        .gallery-interactive-card:hover .card-action-overlay {
          opacity: 1;
        }

        .card-actions-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          transform: translateY(12px);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .gallery-interactive-card:hover .card-actions-wrapper {
          transform: translateY(0);
        }

        .card-interaction-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          border: 1px solid rgba(255, 255, 255, 0.25);
          color: #ffffff;
          padding: 6px 12px;
          border-radius: 20px;
          font-weight: 700;
          font-size: 0.78rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .card-interaction-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: scale(1.05);
        }

        .card-interaction-btn.like-btn.liked {
          background: #ef4444;
          border-color: transparent;
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
        }

        .zoom-circle-indicator {
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: #ffffff;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.35s ease;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        .zoom-circle-indicator:hover {
          transform: scale(1.1);
          background: rgba(255, 255, 255, 0.35);
        }

        /* Card Info Pane */
        .card-info-pane {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex-grow: 1;
          background: #ffffff;
          border-top: 1px solid var(--border-light);
        }

        .info-title-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
        }

        .card-info-pane h4 {
          font-size: 1.05rem;
          font-weight: 800;
          color: var(--bg-dark);
          line-height: 1.2;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: text-ellipsis;
          flex-grow: 1;
        }

        .certified-badge {
          color: var(--primary);
          opacity: 0.85;
          flex-shrink: 0;
          display: flex;
        }

        .card-info-pane p {
          font-size: 0.84rem;
          color: var(--text-muted);
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* 5. Immersive Lightbox Modal */
        .lightbox-cinematic-overlay {
          position: fixed;
          inset: 0;
          background-color: rgba(11, 15, 25, 0.96);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          z-index: 2999;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          animation: lightboxFadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .slideshow-progress-indicator {
          position: absolute;
          top: 0;
          left: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%);
          z-index: 3010;
          transition: width 0.1s linear;
        }

        .lightbox-top-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 24px;
          background: linear-gradient(to bottom, rgba(15, 23, 42, 0.6) 0%, transparent 100%);
          z-index: 3005;
        }

        .toolbar-left {
          display: flex;
          align-items: center;
          gap: 12px;
          color: #ffffff;
        }

        .category-indicator {
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--secondary);
          background: rgba(20, 184, 166, 0.1);
          padding: 4px 10px;
          border-radius: 4px;
          border: 1px solid rgba(20, 184, 166, 0.2);
        }

        .divider {
          color: rgba(255, 255, 255, 0.2);
          font-size: 0.85rem;
        }

        .title-indicator {
          font-size: 0.95rem;
          font-weight: 700;
          font-family: var(--font-heading);
          max-width: 320px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .toolbar-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .toolbar-btn {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #ffffff;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .toolbar-btn:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.15);
          transform: scale(1.05);
        }

        .toolbar-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .toolbar-btn.like {
          width: auto;
          padding: 0 14px;
          border-radius: 20px;
          gap: 6px;
          font-weight: 700;
          font-size: 0.78rem;
        }

        .toolbar-btn.like.liked {
          background: #ef4444;
          border-color: transparent;
        }

        .toolbar-btn.active-slideshow {
          background: var(--secondary);
          border-color: transparent;
          color: #ffffff;
          box-shadow: 0 0 15px rgba(20, 184, 166, 0.4);
          animation: pulsateGlow 2s infinite ease-in-out;
        }

        .toolbar-btn.close-btn {
          background: rgba(239, 68, 68, 0.1);
          border-color: rgba(239, 68, 68, 0.25);
          color: #ef4444;
        }

        .toolbar-btn.close-btn:hover {
          background: rgba(239, 68, 68, 0.2);
          color: #f87171;
          transform: scale(1.05) rotate(90deg);
        }

        /* Lightbox Viewer Area */
        .lightbox-viewer-area {
          display: flex;
          flex-grow: 1;
          align-items: center;
          justify-content: space-between;
          padding: 10px 48px;
          position: relative;
          z-index: 3000;
        }

        .lightbox-arrow-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #ffffff;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          flex-shrink: 0;
          backdrop-filter: blur(4px);
        }

        .lightbox-arrow-btn:hover {
          background: rgba(255, 255, 255, 0.18);
          border-color: rgba(20, 184, 166, 0.4);
          color: var(--secondary);
          transform: scale(1.1);
        }

        .lightbox-arrow-btn:active {
          transform: scale(0.95);
        }

        .lightbox-image-stage {
          width: 80%;
          height: 60vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          position: relative;
          user-select: none;
        }

        .lightbox-main-img {
          max-width: 100%;
          max-height: 100%;
          border-radius: var(--radius-md);
          box-shadow: 0 30px 70px rgba(0, 0, 0, 0.8);
          border: 2px solid rgba(255, 255, 255, 0.08);
          object-fit: contain;
          will-change: transform;
        }

        /* Bottom Panel */
        .lightbox-bottom-panel {
          padding: 24px;
          background: linear-gradient(to top, rgba(15, 23, 42, 0.8) 0%, transparent 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          z-index: 3005;
        }

        .photo-full-desc {
          color: rgba(248, 250, 252, 0.85);
          font-size: 0.9rem;
          line-height: 1.5;
          text-align: center;
          max-width: 640px;
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
        }

        /* 6. Thumbnail strip */
        .lightbox-thumbnail-scroller {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
          overflow-x: auto;
          max-width: 100%;
          padding: 6px 16px;
        }

        .lightbox-thumbnail-scroller::-webkit-scrollbar {
          height: 4px;
        }

        .lightbox-thumbnail-scroller::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
        }

        .lightbox-thumb-container {
          width: 60px;
          height: 42px;
          border-radius: 4px;
          overflow: hidden;
          cursor: pointer;
          opacity: 0.4;
          border: 2px solid transparent;
          transition: all 0.3s ease;
          flex-shrink: 0;
        }

        .lightbox-thumb-container:hover {
          opacity: 0.8;
          transform: scale(1.05);
        }

        .lightbox-thumb-container.active {
          opacity: 1;
          border-color: var(--secondary);
          transform: scale(1.1);
          box-shadow: 0 0 10px rgba(20, 184, 166, 0.5);
        }

        .lightbox-thumb-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .photo-counter-tag {
          color: rgba(255, 255, 255, 0.4);
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.05em;
        }

        /* Empty State */
        .gallery-empty-state {
          padding: 80px 24px;
          text-align: center;
          border-radius: var(--radius-lg);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin-bottom: 100px;
        }

        .empty-icon {
          color: var(--text-muted);
          opacity: 0.4;
          margin-bottom: 16px;
        }

        .gallery-empty-state h3 {
          font-size: 1.25rem;
          color: var(--bg-dark);
          margin-bottom: 6px;
        }

        .gallery-empty-state p {
          font-size: 0.9rem;
          color: var(--text-muted);
          max-width: 400px;
        }

        /* Keyframes */
        @keyframes shimmer {
          100% { background-position: 200% 0; }
        }

        @keyframes cardEntrance {
          from {
            opacity: 0;
            transform: translateY(28px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes lightboxFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes pulsateGlow {
          0%, 100% {
            box-shadow: 0 0 15px rgba(20, 184, 166, 0.4);
          }
          50% {
            box-shadow: 0 0 25px rgba(20, 184, 166, 0.7);
          }
        }

        /* Responsive Styles */
        @media (max-width: 1024px) {
          .gallery-hero-banner {
            min-height: 360px;
            padding: 100px 0 60px;
          }
          .gallery-hero-content h1 {
            font-size: 2.8rem;
          }
          .gallery-toolbar-card {
            margin: -24px auto 30px;
            padding: 14px 20px;
          }
        }

        @media (max-width: 768px) {
          .gallery-hero-banner {
            min-height: 320px;
            padding: 90px 0 50px;
          }
          .gallery-hero-content h1 {
            font-size: 2.2rem;
          }
          .gallery-hero-subtitle {
            font-size: 0.95rem;
            margin-bottom: 24px;
          }
          .gallery-stats-grid {
            gap: 16px;
          }
          .gallery-stat-item {
            padding: 8px 14px;
          }
          .gallery-stat-item h4 {
            font-size: 1.1rem;
          }
          .gallery-toolbar-card {
            flex-direction: column;
            align-items: stretch;
            gap: 16px;
          }
          .gallery-filters-container {
            justify-content: center;
          }
          .gallery-add-btn {
            justify-content: center;
          }
          .upload-form-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .drag-drop-zone {
            min-height: 200px;
          }
          .lightbox-viewer-area {
            padding: 10px 16px;
          }
          .lightbox-arrow-btn {
            width: 44px;
            height: 44px;
          }
          .lightbox-image-stage {
            width: 100%;
            height: 50vh;
          }
          .photo-full-desc {
            font-size: 0.82rem;
            padding: 0 12px;
          }
          .title-indicator {
            max-width: 160px;
            font-size: 0.85rem;
          }
        }

        @media (max-width: 480px) {
          .gallery-hero-banner {
            min-height: 280px;
          }
          .gallery-hero-content h1 {
            font-size: 1.85rem;
          }
          .gallery-stats-grid {
            display: none; /* Hide stats on small mobile to save space */
          }
          .gallery-cards-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .lightbox-top-toolbar {
            padding: 12px;
          }
          .toolbar-left {
            display: none; /* Hide photo details in top bar on mobile */
          }
          .lightbox-bottom-panel {
            padding: 12px;
          }
          .lightbox-thumb-container {
            width: 50px;
            height: 36px;
          }
        }
      `}</style>
    </div>
  );
}
