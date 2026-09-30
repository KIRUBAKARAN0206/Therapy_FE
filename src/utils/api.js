// Helper to dynamically derive API Base URL and format image URLs for cross-device & mobile compatibility
export const getApiBase = () => {
  let envUrl = import.meta.env.VITE_API_URL || '';
  
  if (typeof window !== 'undefined' && window.location.hostname) {
    const currentHost = window.location.hostname;
    // If accessing from another device on LAN (e.g. 192.168.x.x) or remote domain, replace localhost with current host
    if (currentHost !== 'localhost' && currentHost !== '127.0.0.1') {
      if (envUrl && (envUrl.includes('localhost') || envUrl.includes('127.0.0.1'))) {
        return envUrl.replace(/localhost|127\.0\.0\.1/, currentHost);
      }
      if (!envUrl) {
        return `http://${currentHost}:5000`;
      }
    }
  }
  return envUrl || 'http://localhost:5000';
};

export const formatImageUrl = (url) => {
  if (!url) return '';
  const apiBase = getApiBase();
  // If image URL has hardcoded localhost:5000 or 127.0.0.1:5000 from previous saves, rewrite it to current apiBase
  if (url.startsWith('http://localhost:5000') || url.startsWith('http://127.0.0.1:5000')) {
    return url.replace(/^http:\/\/(localhost|127\.0\.0\.1):5000/, apiBase);
  }
  if (url.startsWith('/')) {
    return `${apiBase}${url}`;
  }
  return url;
};

// Cloud Sync Backup for Live Deployment (thetherapyuniverse.com)
const CLOUD_OBJECT_ID = 'ff808181a09d98f701a0ec3824f33d48';
const CLOUD_API_URL = `https://api.restful-api.dev/objects/${CLOUD_OBJECT_ID}`;

export const fetchCloudGallery = async () => {
  try {
    const res = await fetch(CLOUD_API_URL);
    if (res.ok) {
      const json = await res.json();
      if (json && json.data && Array.isArray(json.data.photos)) {
        return json.data.photos.map(p => ({
          ...p,
          url: formatImageUrl(p.url)
        }));
      }
    }
  } catch (e) {
    console.warn("Cloud gallery fetch error:", e);
  }
  return null;
};

export const saveCloudGallery = async (photos) => {
  try {
    if (!Array.isArray(photos) || photos.length === 0) return;
    // Keep top 15 photos formatted cleanly for cloud JSON sync
    const compactPhotos = photos.slice(0, 15).map(p => ({
      id: String(p.id),
      title: String(p.title || 'Untitled'),
      category: String(p.category || 'General'),
      url: String(p.url || '')
    }));

    const res = await fetch(CLOUD_API_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Therapy Universe Live Gallery',
        data: { photos: compactPhotos }
      })
    });
    if (res.ok) {
      console.log("✅ Live Cloud Gallery synced successfully.");
    } else {
      console.warn("Live Cloud Gallery sync HTTP error status:", res.status);
    }
  } catch (e) {
    console.warn("Cloud gallery save error:", e);
  }
};
