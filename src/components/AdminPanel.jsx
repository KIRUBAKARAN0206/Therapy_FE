import React, { useState, useEffect } from 'react';
import { Lock, LogOut, CheckCircle, XCircle, Trash2, Calendar, Phone, Mail, Clock, ShieldAlert, CheckSquare, Image, Upload, Plus, MessageSquare, Eye, EyeOff, Key, HelpCircle, ShieldCheck } from 'lucide-react';
import logoImg from '../assets/logo.webp';

import { getApiBase, formatImageUrl, fetchCloudGallery, saveCloudGallery } from '../utils/api';

export default function AdminPanel({ bookings, onUpdateBookings }) {
  const getIsTamil = () => {
    try {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; googtrans=`);
      if (parts.length === 2) {
        return parts.pop().split(';').shift().endsWith('/ta');
      }
    } catch (e) { }
    return false;
  };

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Forgot password & Change password state
  const [isForgotMode, setIsForgotMode] = useState(false);
  const [forgotPhone, setForgotPhone] = useState('');
  const [forgotNewPass, setForgotNewPass] = useState('');
  const [forgotConfirmPass, setForgotConfirmPass] = useState('');
  const [forgotMsg, setForgotMsg] = useState(null);

  const [changeCurrentPass, setChangeCurrentPass] = useState('');
  const [changeNewPass, setChangeNewPass] = useState('');
  const [changeConfirmPass, setChangeConfirmPass] = useState('');
  const [changeMsg, setChangeMsg] = useState(null);

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Gallery management state
  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings' or 'gallery'
  const [galleryPhotos, setGalleryPhotos] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('gallery_photos') || '[]');
      return saved.map(p => ({ ...p, url: formatImageUrl(p.url) }));
    } catch (e) {
      return [];
    }
  });
  const [newPhotoTitle, setNewPhotoTitle] = useState('');
  const [newPhotoCategory, setNewPhotoCategory] = useState('Rehabilitation Therapy');
  const [customCategoryName, setCustomCategoryName] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const defaultCategories = [
    'Rehabilitation Therapy',
    'Treatment Sessions',
    'Patient Recovery',
    'Therapy Programs',
    'Electro Therapy',
    'Pediatric Therapy'
  ];

  const uniqueCategories = Array.from(new Set([
    ...defaultCategories,
    ...galleryPhotos.map(p => p.category).filter(Boolean)
  ]));

  // Load VITE env credentials
  const ADMIN_USER = import.meta.env.VITE_ADMIN_USER || 'The Therapy Universe';
  const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASS || 'Balasurya PT';
  const API_BASE = getApiBase();

  // WhatsApp Bot state
  const [whatsappStatus, setWhatsappStatus] = useState({ isConnected: false, qrCode: null });
  const [loadingWhatsapp, setLoadingWhatsapp] = useState(false);

  const fetchWhatsappStatus = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/admin/whatsapp-status`);
      if (response.ok) {
        const data = await response.json();
        setWhatsappStatus(data);
      }
    } catch (e) {
      console.error('Error fetching WhatsApp status:', e);
    }
  };

  const handleWhatsappReconnect = async () => {
    setLoadingWhatsapp(true);
    try {
      const response = await fetch(`${API_BASE}/api/admin/whatsapp-reconnect`, {
        method: 'POST'
      });
      if (response.ok) {
        alert('WhatsApp bot reconnection sequence initiated.');
        await fetchWhatsappStatus();
      } else {
        alert('Failed to trigger reconnection sequence.');
      }
    } catch (e) {
      console.error('Error reconnecting WhatsApp bot:', e);
      alert('Error connecting to backend server.');
    } finally {
      setLoadingWhatsapp(false);
    }
  };

  const handleWhatsappReset = async () => {
    if (window.confirm("⚠️ WARNING: Resetting the WhatsApp session will delete your current credentials and force a logout. You will need to scan a new QR code to reconnect. Are you sure you want to proceed?")) {
      setLoadingWhatsapp(true);
      try {
        const response = await fetch(`${API_BASE}/api/admin/whatsapp-reset`, {
          method: 'POST'
        });
        if (response.ok) {
          alert('WhatsApp bot session reset. A new QR code is being generated.');
          await fetchWhatsappStatus();
        } else {
          alert('Failed to trigger session reset.');
        }
      } catch (e) {
        console.error('Error resetting WhatsApp bot:', e);
        alert('Error connecting to backend server.');
      } finally {
        setLoadingWhatsapp(false);
      }
    }
  };

  // Poll WhatsApp status every 5 seconds when tab is active and authenticated
  useEffect(() => {
    let interval;
    if (isAuthenticated && activeTab === 'whatsapp') {
      fetchWhatsappStatus();
      interval = setInterval(fetchWhatsappStatus, 5000);
    }
    return () => clearInterval(interval);
  }, [isAuthenticated, activeTab]);

  // Inactivity timeout (10 min)
  useEffect(() => {
    if (!isAuthenticated) return;

    const INACTIVITY_TIMEOUT = 10 * 60 * 1000; // 10 minutes session expiry
    let timeoutId;

    const resetTimer = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsAuthenticated(false);
        setPassword('');
        alert('Session expired due to inactivity. Please log in again.');
      }, INACTIVITY_TIMEOUT);
    };

    // User activity listeners
    const activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    activityEvents.forEach(evt => window.addEventListener(evt, resetTimer));

    resetTimer();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      activityEvents.forEach(evt => window.removeEventListener(evt, resetTimer));
    };
  }, [isAuthenticated]);

  const getEffectiveAdminPass = () => {
    return localStorage.getItem('admin_custom_password') || ADMIN_PASS;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const activePass = getEffectiveAdminPass();
    if (password === activePass) {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid admin password');
    }
  };

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    setForgotMsg(null);

    const cleanPhone = forgotPhone.replace(/[^0-9]/g, '');
    const isOfficial = cleanPhone.endsWith('8220952580');

    if (!isOfficial) {
      setForgotMsg({
        text: '❌ Invalid contact number',
        isError: true
      });
      return;
    }

    if (!forgotNewPass || forgotNewPass.length < 4) {
      setForgotMsg({
        text: '❌ New password must be at least 4 characters long.',
        isError: true
      });
      return;
    }

    if (forgotNewPass !== forgotConfirmPass) {
      setForgotMsg({
        text: '❌ Passwords do not match.',
        isError: true
      });
      return;
    }

    localStorage.setItem('admin_custom_password', forgotNewPass);
    setForgotMsg({
      text: '✅ Password reset successful! Redirecting to login...',
      isError: false
    });

    setTimeout(() => {
      setIsForgotMode(false);
      setPassword(forgotNewPass);
      setForgotPhone('');
      setForgotNewPass('');
      setForgotConfirmPass('');
      setForgotMsg(null);
    }, 1800);
  };

  const handleChangePasswordSubmit = (e) => {
    e.preventDefault();
    setChangeMsg(null);

    const activePass = getEffectiveAdminPass();
    if (changeCurrentPass !== activePass) {
      setChangeMsg({ text: '❌ Current password is incorrect.', isError: true });
      return;
    }

    if (!changeNewPass || changeNewPass.length < 4) {
      setChangeMsg({ text: '❌ New password must be at least 4 characters long.', isError: true });
      return;
    }

    if (changeNewPass !== changeConfirmPass) {
      setChangeMsg({ text: '❌ New passwords do not match.', isError: true });
      return;
    }

    localStorage.setItem('admin_custom_password', changeNewPass);
    setChangeMsg({ text: '✅ Admin password changed successfully!', isError: false });

    setChangeCurrentPass('');
    setChangeNewPass('');
    setChangeConfirmPass('');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`${API_BASE}/api/bookings/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (response.ok) {
        const updated = bookings.map(b => b.id === id ? { ...b, status: newStatus } : b);
        onUpdateBookings(updated);
      } else {
        alert('Failed to update appointment status on server.');
      }
    } catch (e) {
      console.error('Error updating status:', e);
      alert('Network error connecting to backend.');
    }
  };

  const deleteBooking = async (id) => {
    if (window.confirm("Are you sure you want to delete this booking record?")) {
      try {
        const response = await fetch(`${API_BASE}/api/bookings/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          const updated = bookings.filter(b => b.id !== id);
          onUpdateBookings(updated);
        } else {
          alert('Failed to delete booking from database.');
        }
      } catch (e) {
        console.error('Error deleting booking:', e);
        alert('Error connecting to backend.');
      }
    }
  };

  // Inquiries functionality removed from Admin Panel as requested

  // Gallery Photos useEffect & Handlers
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        let backendData = [];
        let fetchedFromBackend = false;
        try {
          const response = await fetch(`${API_BASE}/api/gallery`);
          if (response.ok) {
            backendData = await response.json();
            backendData = backendData.map(p => ({
              ...p,
              url: formatImageUrl(p.url)
            }));
            fetchedFromBackend = true;
          }
        } catch (apiError) {
          console.error("Backend fetch failed, relying on local storage", apiError);
        }

        if (fetchedFromBackend && backendData.length > 0) {
          // Local backend returned data
        } else {
          // Fall back to Cloud Store for live site
          const cloudData = await fetchCloudGallery();
          if (cloudData && cloudData.length > 0) {
            backendData = cloudData;
            fetchedFromBackend = true;
          }
        }

        if (fetchedFromBackend) {
          setGalleryPhotos(backendData);
          try {
            localStorage.setItem('gallery_photos', JSON.stringify(backendData));
          } catch(e) {}
        } else {
          // Restore legacy photos from localStorage if backend is offline
          const localData = JSON.parse(localStorage.getItem('gallery_photos') || '[]');
          setGalleryPhotos(localData.map(p => ({ ...p, url: formatImageUrl(p.url) })));
        }
      } catch (e) {
        console.error("Failed to parse gallery photos", e);
      }
    };
    fetchGallery();
  }, []);

  // Smart automatic image compression helper (downscales & compresses high-res/large images to ~200-300KB)
  const compressImageFile = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Data = event.target.result;
        const img = new window.Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxDim = 1200; // max resolution preserving crisp clarity
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxDim) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            }
          } else {
            if (height > maxDim) {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, width, height);

          // Iterative WebP quality compression targeting optimal file size (~250-350KB max)
          let quality = 0.82;
          let resultUrl = canvas.toDataURL('image/webp', quality);

          while (resultUrl.length > 350 * 1024 && quality > 0.3) {
            quality -= 0.12;
            resultUrl = canvas.toDataURL('image/webp', quality);
          }

          if (!resultUrl || !resultUrl.startsWith('data:image/webp')) {
            resultUrl = canvas.toDataURL('image/jpeg', 0.8);
          }

          resolve(resultUrl);
        };
        img.onerror = () => resolve(base64Data);
        img.src = base64Data;
      };
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(file);
    });
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');

    if (!isImage && !isVideo) {
      setUploadError('Please select a valid image or video file.');
      return;
    }

    const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
    const isConfirmed = window.confirm(`Upload file: "${file.name}" (${fileSizeMB} MB)?\nLarge images will be automatically compressed for optimal speed.`);
    if (!isConfirmed) {
      e.target.value = null; // Reset selection
      return;
    }

    const resolvedCategory = newPhotoCategory === '--new--'
      ? (customCategoryName.trim() || 'General')
      : newPhotoCategory;

    setIsUploading(true);
    setUploadError('');

    try {
      let finalDataUrl;
      if (isImage) {
        // Auto compress high-res/large images seamlessly
        finalDataUrl = await compressImageFile(file);
      } else {
        // Videos read as Data URL
        finalDataUrl = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (evt) => resolve(evt.target.result);
          reader.readAsDataURL(file);
        });
      }

      if (!finalDataUrl) {
        setUploadError("Failed to process file.");
        setIsUploading(false);
        return;
      }

      const newPhoto = {
        id: Date.now().toString(),
        title: newPhotoTitle.trim() || file.name.split('.')[0],
        category: resolvedCategory,
        url: finalDataUrl
      };

      let savedPhoto = newPhoto;
      try {
        const response = await fetch(`${API_BASE}/api/gallery`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newPhoto)
        });

        if (response.ok) {
          const data = await response.json();
          savedPhoto = data.photo || newPhoto;
          if (savedPhoto.url && savedPhoto.url.startsWith('/')) {
            savedPhoto.url = `${API_BASE}${savedPhoto.url}`;
          }
        }
      } catch (apiErr) {
        console.warn("Backend upload network error, saving to local & cloud gallery storage", apiErr);
      }

      // Always update State, LocalStorage & Cloud Store so uploaded images are NEVER lost!
      setGalleryPhotos(prev => {
        const updated = [savedPhoto, ...prev.filter(p => p.id !== savedPhoto.id)];
        try {
          localStorage.setItem('gallery_photos', JSON.stringify(updated));
          saveCloudGallery(updated);
        } catch (lsErr) {
          console.warn("Failed to update localStorage gallery photos", lsErr);
        }
        return updated;
      });

      setNewPhotoTitle('');
      setCustomCategoryName('');
      if (newPhotoCategory === '--new--') {
        setNewPhotoCategory(resolvedCategory);
      }
    } catch (err) {
      console.error("Upload process error", err);
      setUploadError("Error compressing/uploading image file.");
    } finally {
      setIsUploading(false);
      e.target.value = null; // Clear file input selection
    }
  };

  const deletePhoto = async (id) => {
    if (window.confirm("Are you sure you want to delete this photo from the gallery?")) {
      try {
        const response = await fetch(`${API_BASE}/api/gallery/${id}`, {
          method: 'DELETE'
        });
        
        const updated = galleryPhotos.filter(p => p.id !== id);
        setGalleryPhotos(updated);

        try {
          localStorage.setItem('gallery_photos', JSON.stringify(updated));
          saveCloudGallery(updated);
        } catch(e) {}
      } catch (err) {
        console.error("Delete failed", err);
        alert("Network error. Could not delete.");
      }
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Confirmed':
        return { backgroundColor: '#d1fae5', color: '#065f46', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: '700' };
      case 'Completed':
        return { backgroundColor: '#dbeafe', color: '#1e40af', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: '700' };
      case 'Cancelled':
        return { backgroundColor: '#fee2e2', color: '#991b1b', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: '700' };
      default:
        return { backgroundColor: '#fef3c7', color: '#92400e', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: '700' };
    }
  };

  // Filter & Search Logic
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch =
      booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'All' || booking.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const styles = {
    loginContainer: {
      maxWidth: '400px',
      margin: '120px auto',
      padding: '40px',
      backgroundColor: '#fff',
      border: '1px solid var(--border-light)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-premium)',
      textAlign: 'center'
    },
    input: {
      width: '100%',
      padding: '12px 16px',
      borderRadius: 'var(--radius-sm)',
      border: '1px solid var(--border-light)',
      backgroundColor: 'var(--bg-main)',
      fontSize: '0.95rem',
      marginBottom: '16px',
      outline: 'none',
      color: 'var(--text-main)'
    },
    dashboard: {
      maxWidth: '1200px',
      margin: '40px auto 100px',
      padding: '0 24px'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '1px solid var(--border-light)',
      paddingBottom: '20px',
      marginBottom: '32px',
      flexWrap: 'wrap',
      gap: '16px'
    },
    filtersBox: {
      display: 'flex',
      gap: '16px',
      marginBottom: '24px',
      flexWrap: 'wrap',
      alignItems: 'center'
    },
    filterInput: {
      padding: '10px 16px',
      borderRadius: 'var(--radius-sm)',
      border: '1px solid var(--border-light)',
      backgroundColor: '#fff',
      fontSize: '0.9rem',
      outline: 'none',
      color: 'var(--text-main)',
      minWidth: '240px'
    },
    filterSelect: {
      padding: '10px 16px',
      borderRadius: 'var(--radius-sm)',
      border: '1px solid var(--border-light)',
      backgroundColor: '#fff',
      fontSize: '0.9rem',
      outline: 'none',
      color: 'var(--text-main)',
      cursor: 'pointer'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      backgroundColor: '#fff',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-sm)',
      border: '1px solid var(--border-light)'
    },
    th: {
      backgroundColor: 'var(--bg-main)',
      color: 'var(--bg-dark)',
      textAlign: 'left',
      padding: '16px',
      fontWeight: '700',
      fontSize: '0.875rem',
      borderBottom: '1px solid var(--border-light)'
    },
    td: {
      padding: '16px',
      borderBottom: '1px solid var(--border-light)',
      fontSize: '0.9rem',
      color: 'var(--text-main)',
      verticalAlign: 'middle'
    },
    actions: {
      display: 'flex',
      gap: '6px'
    },
    actionBtn: (bgColor) => ({
      border: 'none',
      backgroundColor: bgColor,
      color: '#fff',
      padding: '6px 10px',
      borderRadius: 'var(--radius-sm)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'var(--transition-fast)',
      fontSize: '0.75rem',
      fontWeight: '700',
      gap: '4px'
    })
  };

  if (!isAuthenticated) {
    if (isForgotMode) {
      return (
        <div style={styles.loginContainer} className="admin-login-box fade-in">
          <div
            className="brand-logo-container"
            style={{ justifyContent: 'center', marginBottom: '24px' }}
          >
            <img
              src={logoImg}
              alt="THE THERAPY UNIVERSE Logo"
              className="brand-logo-img"
              style={{ height: '44px' }}
            />
            <span className="brand-logo-text notranslate" style={{ fontSize: '1.3rem' }}>
              {getIsTamil() ? 'தி தெரபி யூனிவர்ஸ்' : 'THE THERAPY UNIVERSE'}
            </span>
          </div>

          <h2 style={{ fontSize: '1.35rem', marginBottom: '8px', color: 'var(--bg-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <Key size={20} color="var(--primary)" /> Reset Admin Password
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px', lineHeight: '1.4' }}>
            Enter official contact phone number to verify ownership and reset password.
          </p>

          {forgotMsg && (
            <div style={{
              color: forgotMsg.isError ? '#ef4444' : '#10b981',
              backgroundColor: forgotMsg.isError ? '#fee2e2' : '#d1fae5',
              padding: '10px 14px',
              borderRadius: '6px',
              fontSize: '0.82rem',
              marginBottom: '16px',
              fontWeight: '600',
              lineHeight: '1.4'
            }}>
              {forgotMsg.text}
            </div>
          )}

          <form onSubmit={handleForgotPasswordSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'left' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Official Contact Phone Number</label>
              <input
                type="text"
                placeholder="Enter phone number"
                value={forgotPhone}
                onChange={(e) => setForgotPhone(e.target.value)}
                style={{ ...styles.input, marginBottom: 0 }}
                required
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'left' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase' }}>New Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                value={forgotNewPass}
                onChange={(e) => setForgotNewPass(e.target.value)}
                style={{ ...styles.input, marginBottom: 0 }}
                required
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'left' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Confirm New Password</label>
              <input
                type="password"
                placeholder="Re-enter new password"
                value={forgotConfirmPass}
                onChange={(e) => setForgotConfirmPass(e.target.value)}
                style={{ ...styles.input, marginBottom: 0 }}
                required
              />
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}>
              <ShieldCheck size={18} /> Reset Password
            </button>

            <button
              type="button"
              onClick={() => { setIsForgotMode(false); setForgotMsg(null); }}
              style={{ border: 'none', background: 'none', color: 'var(--text-muted)', fontSize: '0.85rem', cursor: 'pointer', marginTop: '8px' }}
            >
              ← Back to Login
            </button>
          </form>
        </div>
      );
    }

    return (
      <div style={styles.loginContainer} className="admin-login-box fade-in">
        <div
          className="brand-logo-container"
          style={{ justifyContent: 'center', marginBottom: '24px' }}
        >
          <img
            src={logoImg}
            alt="THE THERAPY UNIVERSE Logo"
            className="brand-logo-img"
            style={{ height: '44px' }}
          />
          <span className="brand-logo-text notranslate" style={{ fontSize: '1.3rem' }}>
            {getIsTamil() ? 'தி தெரபி யூனிவர்ஸ்' : 'THE THERAPY UNIVERSE'}
          </span>
        </div>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '8px', color: 'var(--bg-dark)' }}>Admin Login</h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '24px' }}><span className="notranslate">{getIsTamil() ? 'தி தெரபி யூனிவர்ஸ்' : 'THE THERAPY UNIVERSE'}</span> management console</p>

        {loginError && <div style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '16px', fontWeight: '600' }}>{loginError}</div>}

        <style>{`
          .admin-pass-input {
            -webkit-text-security: disc !important;
            text-security: disc !important;
          }
          @media (max-width: 768px) {
            .admin-login-box {
              margin: 40px 16px !important;
              padding: 24px 16px !important;
              max-width: 100% !important;
            }
            .admin-dashboard-layout {
              margin: 20px auto 60px !important;
              padding: 0 12px !important;
            }
            .admin-header-box {
              flex-direction: column !important;
              align-items: flex-start !important;
              gap: 12px !important;
            }
            .admin-tabs-scroll {
              overflow-x: auto !important;
              display: flex !important;
              width: 100% !important;
              padding-bottom: 6px !important;
              margin-bottom: 24px !important;
              border-bottom: 1px solid var(--border-light);
              -webkit-overflow-scrolling: touch;
              white-space: nowrap;
            }
            .admin-tabs-scroll button {
              flex-shrink: 0 !important;
              font-size: 0.9rem !important;
              padding: 10px 12px !important;
            }
            .gallery-admin-grid {
              grid-template-columns: 1fr !important;
              gap: 24px !important;
            }
            .admin-filters-flex {
              flex-direction: column !important;
              align-items: stretch !important;
            }
            .admin-filter-input, .admin-filter-select {
              width: 100% !important;
              min-width: auto !important;
            }
            .admin-table-container {
              overflow-x: auto !important;
              -webkit-overflow-scrolling: touch;
            }
          }
        `}</style>
        <form onSubmit={handleLogin} autoComplete="new-password">
          {/* Prevent browser autofill by redirecting it to hidden dummy fields */}
          <input type="text" name="prevent_autofill_username" style={{ display: 'none' }} tabIndex="-1" readOnly />
          <input type="password" name="prevent_autofill_password" style={{ display: 'none' }} tabIndex="-1" readOnly />

          <div style={{ position: 'relative', marginBottom: '20px' }}>
            <input
              type={showPassword ? "text" : "password"}
              name="admin_secret_entry"
              placeholder="Enter Admin Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={showPassword ? "" : "admin-pass-input"}
              autoComplete="new-password"
              style={{ ...styles.input, paddingRight: '44px', marginBottom: 0 }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '6px'
              }}
              title={showPassword ? "Hide Password" : "Show Password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '16px' }}>
            <Lock size={18} /> Access Dashboard
          </button>

          <button
            type="button"
            onClick={() => { setIsForgotMode(true); setForgotMsg(null); }}
            style={{ border: 'none', background: 'none', color: 'var(--primary)', fontSize: '0.8rem', fontWeight: '700', cursor: 'pointer', marginTop: '16px' }}
          >
            Forgot Password?
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={styles.dashboard} className="fade-in admin-dashboard-layout">
      <style>{`
        .admin-pass-input {
          -webkit-text-security: disc !important;
          text-security: disc !important;
        }
        @media (max-width: 768px) {
          .admin-login-box {
            margin: 30px 12px !important;
            padding: 24px 16px !important;
            max-width: 100% !important;
            box-sizing: border-box !important;
          }
          .admin-dashboard-layout {
            margin: 16px auto 60px !important;
            padding: 0 12px !important;
            max-width: 100% !important;
            box-sizing: border-box !important;
            overflow-x: hidden !important;
          }
          .admin-header-box {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 12px !important;
          }
          .admin-tabs-scroll {
            overflow-x: auto !important;
            display: flex !important;
            width: 100% !important;
            max-width: 100% !important;
            padding-bottom: 8px !important;
            margin-bottom: 20px !important;
            border-bottom: 1px solid var(--border-light);
            -webkit-overflow-scrolling: touch !important;
            white-space: nowrap !important;
            scrollbar-width: thin;
          }
          .admin-tabs-scroll button {
            flex-shrink: 0 !important;
            font-size: 0.85rem !important;
            padding: 8px 12px !important;
          }
          .gallery-admin-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
            width: 100% !important;
          }
          .whatsapp-admin-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
            width: 100% !important;
          }
          .whatsapp-status-flex {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 14px !important;
            padding: 14px !important;
            width: 100% !important;
            box-sizing: border-box !important;
          }
          .whatsapp-actions-flex {
            width: 100% !important;
            display: flex !important;
            flex-wrap: wrap !important;
            gap: 8px !important;
          }
          .whatsapp-actions-flex button {
            flex: 1 1 calc(50% - 6px) !important;
            text-align: center !important;
            justify-content: center !important;
            padding: 10px 8px !important;
            font-size: 0.78rem !important;
          }
          .admin-card-box {
            padding: 20px 16px !important;
            box-sizing: border-box !important;
            width: 100% !important;
            max-width: 100% !important;
            overflow: hidden !important;
          }
          .admin-filters-flex {
            flex-direction: column !important;
            align-items: stretch !important;
            width: 100% !important;
          }
          .admin-filter-input, .admin-filter-select {
            width: 100% !important;
            min-width: auto !important;
            box-sizing: border-box !important;
          }
          .admin-table-container {
            overflow-x: auto !important;
            -webkit-overflow-scrolling: touch !important;
            width: 100% !important;
          }
        }
      `}</style>
      <div style={styles.header} className="admin-header-box">
        <div>
          <h1 style={{ fontSize: '2rem', color: 'var(--bg-dark)' }}>Admin Console</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}><span className="notranslate">{getIsTamil() ? 'தி தெரபி யூனிவர்ஸ்' : 'THE THERAPY UNIVERSE'}</span> management and control</p>
        </div>
        <button onClick={handleLogout} className="btn-secondary" style={{ padding: '10px 20px', gap: '6px' }}>
          <LogOut size={16} /> Logout
        </button>
      </div>

      {/* Dashboard Tabs */}
      <div style={{ display: 'flex', gap: '16px', borderBottom: '1px solid var(--border-light)', paddingBottom: '1px', marginBottom: '32px' }} className="admin-tabs-scroll">
        <button
          onClick={() => setActiveTab('bookings')}
          style={{
            border: 'none',
            background: 'none',
            fontSize: '1rem',
            fontWeight: '700',
            color: activeTab === 'bookings' ? 'var(--primary)' : 'var(--text-muted)',
            padding: '12px 16px',
            borderBottom: activeTab === 'bookings' ? '3px solid var(--primary)' : '3px solid transparent',
            cursor: 'pointer',
            fontFamily: 'var(--font-heading)',
            transition: 'var(--transition-fast)'
          }}
        >
          Appointments
        </button>

        <button
          onClick={() => setActiveTab('gallery')}
          style={{
            border: 'none',
            background: 'none',
            fontSize: '1rem',
            fontWeight: '700',
            color: activeTab === 'gallery' ? 'var(--primary)' : 'var(--text-muted)',
            padding: '12px 16px',
            borderBottom: activeTab === 'gallery' ? '3px solid var(--primary)' : '3px solid transparent',
            cursor: 'pointer',
            fontFamily: 'var(--font-heading)',
            transition: 'var(--transition-fast)'
          }}
        >
          Gallery Manager
        </button>

        <button
          onClick={() => {
            setActiveTab('whatsapp');
            fetchWhatsappStatus();
          }}
          style={{
            border: 'none',
            background: 'none',
            fontSize: '1rem',
            fontWeight: '700',
            color: activeTab === 'whatsapp' ? 'var(--primary)' : 'var(--text-muted)',
            padding: '12px 16px',
            borderBottom: activeTab === 'whatsapp' ? '3px solid var(--primary)' : '3px solid transparent',
            cursor: 'pointer',
            fontFamily: 'var(--font-heading)',
            transition: 'var(--transition-fast)'
          }}
        >
          WhatsApp Bot
        </button>

        <button
          onClick={() => setActiveTab('security')}
          style={{
            border: 'none',
            background: 'none',
            fontSize: '1rem',
            fontWeight: '700',
            color: activeTab === 'security' ? 'var(--primary)' : 'var(--text-muted)',
            padding: '12px 16px',
            borderBottom: activeTab === 'security' ? '3px solid var(--primary)' : '3px solid transparent',
            cursor: 'pointer',
            fontFamily: 'var(--font-heading)',
            transition: 'var(--transition-fast)'
          }}
        >
          Security & Password
        </button>
      </div>

      {activeTab === 'gallery' && (
        <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '40px', alignItems: 'start' }} className="gallery-admin-grid">
          {/* Upload Form Card */}
          <div style={{ backgroundColor: '#fff', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-lg)', padding: '24px', boxShadow: 'var(--shadow-md)' }} className="admin-card-box">
            <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--bg-dark)' }}>
              <Upload size={18} color="var(--primary)" /> Add New Photo
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: '750', color: 'var(--text-main)', textTransform: 'uppercase' }}>Photo Title</label>
                <input
                  type="text"
                  placeholder="e.g. Spine Treatment"
                  value={newPhotoTitle}
                  onChange={(e) => setNewPhotoTitle(e.target.value)}
                  style={{ ...styles.filterInput, width: '100%', minWidth: 'auto', backgroundColor: 'var(--bg-main)' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: '750', color: 'var(--text-main)', textTransform: 'uppercase' }}>Folder / Category</label>
                <select
                  value={newPhotoCategory}
                  onChange={(e) => setNewPhotoCategory(e.target.value)}
                  style={{ ...styles.filterSelect, width: '100%', backgroundColor: 'var(--bg-main)' }}
                >
                  {uniqueCategories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                  <option value="--new--">+ Create New Folder...</option>
                </select>
              </div>

              {newPhotoCategory === '--new--' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }} className="fade-in">
                  <label style={{ fontSize: '0.8rem', fontWeight: '750', color: 'var(--text-main)', textTransform: 'uppercase' }}>New Folder Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Rehabilitation Therapy"
                    value={customCategoryName}
                    onChange={(e) => setCustomCategoryName(e.target.value)}
                    style={{ ...styles.filterInput, width: '100%', minWidth: 'auto', backgroundColor: 'var(--bg-main)' }}
                  />
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: '750', color: 'var(--text-main)', textTransform: 'uppercase' }}>Select Photo / Video File</label>
                <div style={{ position: 'relative', width: '100%' }}>
                  <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={handlePhotoUpload}
                    disabled={isUploading}
                    style={{
                      opacity: 0,
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      cursor: 'pointer',
                      zIndex: 10
                    }}
                  />
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    border: '2px dashed var(--border-focus)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '24px 16px',
                    textAlign: 'center',
                    backgroundColor: 'var(--bg-main)',
                    color: 'var(--primary)',
                    fontWeight: '700',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    transition: 'var(--transition-fast)'
                  }}>
                    <Plus size={18} /> {isUploading ? 'Compressing...' : 'Browse & Upload'}
                  </div>
                </div>
              </div>

              {uploadError && <div style={{ color: '#ef4444', fontSize: '0.85rem', fontWeight: '600', marginTop: '4px' }}>{uploadError}</div>}
            </div>
          </div>

          {/* Photos list */}
          <div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--bg-dark)' }}>
              <Image size={18} color="var(--primary)" /> Gallery Photos ({galleryPhotos.length})
            </h3>

            {galleryPhotos.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px', backgroundColor: '#fff', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                <Image size={40} color="var(--text-muted)" style={{ marginBottom: '12px', opacity: 0.7 }} />
                <h4 style={{ fontSize: '1.1rem', color: 'var(--bg-dark)' }}>No Custom Photos Uploaded</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>Uploaded clinic images will be saved here and shown in the public Gallery.</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '24px' }}>
                {galleryPhotos.map((photo) => (
                  <div
                    key={photo.id}
                    style={{
                      backgroundColor: '#fff',
                      border: '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-md)',
                      overflow: 'hidden',
                      boxShadow: 'var(--shadow-sm)',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative'
                    }}
                  >
                    <div style={{ height: '120px', overflow: 'hidden', position: 'relative' }}>
                      {photo.url && (photo.url.endsWith('.mp4') || photo.url.endsWith('.webm') || photo.url.endsWith('.ogg') || photo.url.startsWith('data:video/')) ? (
                        <video
                          src={photo.url}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          muted
                        />
                      ) : (
                        <img
                          src={photo.url}
                          alt={photo.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      )}
                      <span style={{
                        position: 'absolute',
                        top: '8px',
                        left: '8px',
                        backgroundColor: 'var(--primary-glow)',
                        color: 'var(--primary)',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '0.7rem',
                        fontWeight: '700',
                        backdropFilter: 'blur(4px)'
                      }}>
                        {photo.category}
                      </span>
                    </div>
                    <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1, justifyContent: 'space-between' }}>
                      <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--bg-dark)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{photo.title}</h4>
                      <button
                        onClick={() => deletePhoto(photo.id)}
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          border: 'none',
                          backgroundColor: '#fee2e2',
                          color: '#b91c1c',
                          padding: '6px 10px',
                          borderRadius: 'var(--radius-sm)',
                          cursor: 'pointer',
                          fontSize: '0.75rem',
                          fontWeight: '700',
                          transition: 'var(--transition-fast)'
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#fca5a5' }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#fee2e2' }}
                      >
                        <Trash2 size={12} /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'bookings' && (
        <>
          {/* Filters Area */}
          <div style={styles.filtersBox} className="admin-filters-flex">
            <input
              type="text"
              placeholder="Search by name, service or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.filterInput}
              className="admin-filter-input"
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={styles.filterSelect}
              className="admin-filter-select"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Found: <strong>{filteredBookings.length}</strong> records
            </span>
          </div>

          {filteredBookings.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px', backgroundColor: '#fff', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
              <Calendar size={48} color="var(--text-muted)" style={{ marginBottom: '16px' }} />
              <h3 style={{ fontSize: '1.25rem', color: 'var(--bg-dark)' }}>No Matching Appointments</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>Adjust your filters or search keywords.</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }} className="admin-table-container">
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Patient</th>
                    <th style={styles.th}>Contact</th>
                    <th style={styles.th}>Requested Service</th>
                    <th style={styles.th}>Schedule Date/Time</th>
                    <th style={styles.th}>Status</th>
                    <th style={styles.th}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((booking) => (
                    <tr key={booking.id}>
                      <td style={styles.td}>
                        <strong>{booking.name}</strong>
                        {booking.message && <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px', maxWidth: '240px' }}><em>Msg: {booking.message}</em></div>}
                      </td>
                      <td style={styles.td}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Phone size={12} /> {booking.phone}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}><Mail size={12} /> {booking.email}</div>
                      </td>
                      <td style={styles.td}>
                        <div>{booking.service}</div>
                      </td>
                      <td style={styles.td}>
                        <div>{booking.date}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>{booking.timeSlot}</div>
                      </td>
                      <td style={styles.td}>
                        <span style={getStatusStyle(booking.status)}>{booking.status}</span>
                      </td>
                      <td style={styles.td}>
                        <div style={styles.actions}>
                          {booking.status !== 'Confirmed' && booking.status !== 'Completed' && (
                            <button
                              onClick={() => updateStatus(booking.id, 'Confirmed')}
                              style={styles.actionBtn('var(--success)')}
                              title="Confirm Appointment"
                            >
                              <CheckCircle size={14} /> Conf
                            </button>
                          )}
                          {booking.status === 'Confirmed' && (
                            <button
                              onClick={() => updateStatus(booking.id, 'Completed')}
                              style={styles.actionBtn('var(--primary)')}
                              title="Complete Session"
                            >
                              <CheckSquare size={14} /> Comp
                            </button>
                          )}
                          {booking.status !== 'Cancelled' && booking.status !== 'Completed' && (
                            <button
                              onClick={() => updateStatus(booking.id, 'Cancelled')}
                              style={styles.actionBtn('#ef4444')}
                              title="Cancel Session"
                            >
                              <XCircle size={14} /> Canc
                            </button>
                          )}
                          <button
                            onClick={() => deleteBooking(booking.id)}
                            style={{ ...styles.actionBtn('var(--text-muted)'), padding: '6px' }}
                            title="Delete Record"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}



      {activeTab === 'whatsapp' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', alignItems: 'start' }} className="whatsapp-admin-grid">
          {/* WhatsApp Status Card */}
          <div style={{ backgroundColor: '#fff', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-lg)', padding: '32px', boxShadow: 'var(--shadow-md)' }} className="admin-card-box">
            <h3 style={{ fontSize: '1.25rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--bg-dark)' }}>
              ⚡ WhatsApp Notification Bot Status
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'var(--bg-main)', padding: '16px 20px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }} className="whatsapp-status-flex">
                <div>
                  <p style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Bot Status</p>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.85rem',
                    fontWeight: '700',
                    color: whatsappStatus.isConnected ? '#065f46' : '#991b1b',
                    backgroundColor: whatsappStatus.isConnected ? '#d1fae5' : '#fee2e2',
                    padding: '6px 12px',
                    borderRadius: '50px'
                  }}>
                    <span style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: whatsappStatus.isConnected ? '#10b981' : '#ef4444',
                      animation: whatsappStatus.isConnected ? 'pulse 2s infinite' : 'none'
                    }}></span>
                    {whatsappStatus.isConnected ? 'CONNECTED' : 'DISCONNECTED'}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }} className="whatsapp-actions-flex">
                  <button
                    onClick={handleWhatsappReconnect}
                    disabled={loadingWhatsapp}
                    style={{
                      backgroundColor: '#fff',
                      border: '1px solid var(--border-light)',
                      padding: '8px 16px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.8rem',
                      fontWeight: '700',
                      cursor: loadingWhatsapp ? 'not-allowed' : 'pointer',
                      opacity: loadingWhatsapp ? 0.6 : 1,
                      transition: 'var(--transition-fast)'
                    }}
                  >
                    {loadingWhatsapp ? 'Reconnecting...' : 'Reconnect Bot'}
                  </button>
                  <button
                    onClick={handleWhatsappReset}
                    disabled={loadingWhatsapp}
                    style={{
                      backgroundColor: '#fee2e2',
                      border: '1px solid #fca5a5',
                      color: '#b91c1c',
                      padding: '8px 16px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.8rem',
                      fontWeight: '700',
                      cursor: loadingWhatsapp ? 'not-allowed' : 'pointer',
                      opacity: loadingWhatsapp ? 0.6 : 1,
                      transition: 'var(--transition-fast)'
                    }}
                  >
                    Reset Session
                  </button>
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '16px' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--bg-dark)', marginBottom: '8px' }}>Active Configurations:</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Target Phone Number: <strong>+{import.meta.env.VITE_WHATSAPP_PHONE || '918220952580'}</strong>
                </p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px', lineHeight: '1.4' }}>
                  *All client appointment request alerts are dispatched directly to this WhatsApp number.*
                </p>
              </div>
            </div>
          </div>

          {/* QR Code Scan Card */}
          <div style={{ backgroundColor: '#fff', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-lg)', padding: '32px', boxShadow: 'var(--shadow-md)', textAlign: 'center' }} className="admin-card-box">
            <h3 style={{ fontSize: '1.25rem', marginBottom: '20px', color: 'var(--bg-dark)' }}>
              Scan QR Code to Link Bot
            </h3>

            {whatsappStatus.isConnected ? (
              <div style={{ padding: '40px 0' }}>
                <CheckCircle color="var(--success)" size={64} style={{ marginBottom: '16px' }} />
                <h4 style={{ color: 'var(--bg-dark)', fontSize: '1.1rem', marginBottom: '8px' }}>Bot Link Active</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', maxWidth: '300px', margin: '0 auto', lineHeight: '1.5' }}>
                  The Baileys WhatsApp bot is connected. You will receive real-time appointment request notifications.
                </p>
              </div>
            ) : whatsappStatus.qrCode ? (
              <div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.4' }}>
                  Open WhatsApp on your phone, go to Linked Devices - Link a Device, and scan the QR code below:
                </p>
                <div style={{
                  display: 'inline-block',
                  backgroundColor: '#fff',
                  padding: '12px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-light)',
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(whatsappStatus.qrCode)}`}
                    alt="WhatsApp Connection QR Code"
                    style={{ width: '220px', height: '220px', display: 'block' }}
                  />
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '12px' }}>
                  QR code refreshes automatically. Scan within 20 seconds of display.
                </p>
              </div>
            ) : (
              <div style={{ padding: '60px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'conic-gradient(from 0deg, var(--primary) 30%, var(--secondary) 100%)',
                  mask: 'radial-gradient(farthest-side, transparent 65%, black 66%)',
                  WebkitMask: 'radial-gradient(farthest-side, transparent 65%, black 66%)',
                  animation: 'spin 1s linear infinite'
                }}></div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Waiting for server session initialization...</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'security' && (
        <div style={{ maxWidth: '500px', margin: '0 auto', backgroundColor: '#fff', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-lg)', padding: '32px', boxShadow: 'var(--shadow-md)' }} className="admin-card-box">
          <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', color: 'var(--bg-dark)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Key size={20} color="var(--primary)" /> Change Admin Password
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '24px', lineHeight: '1.4' }}>
            Update your admin console login password. The new password will take effect immediately.
          </p>

          {changeMsg && (
            <div style={{
              color: changeMsg.isError ? '#ef4444' : '#10b981',
              backgroundColor: changeMsg.isError ? '#fee2e2' : '#d1fae5',
              padding: '12px 16px',
              borderRadius: '6px',
              fontSize: '0.85rem',
              marginBottom: '20px',
              fontWeight: '600'
            }}>
              {changeMsg.text}
            </div>
          )}

          <form onSubmit={handleChangePasswordSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Current Password</label>
              <input
                type="password"
                placeholder="Enter current admin password"
                value={changeCurrentPass}
                onChange={(e) => setChangeCurrentPass(e.target.value)}
                style={{ ...styles.input, marginBottom: 0 }}
                required
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase' }}>New Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                value={changeNewPass}
                onChange={(e) => setChangeNewPass(e.target.value)}
                style={{ ...styles.input, marginBottom: 0 }}
                required
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Confirm New Password</label>
              <input
                type="password"
                placeholder="Re-enter new password"
                value={changeConfirmPass}
                onChange={(e) => setChangeConfirmPass(e.target.value)}
                style={{ ...styles.input, marginBottom: 0 }}
                required
              />
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}>
              <ShieldCheck size={18} /> Update Password
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
