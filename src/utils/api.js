// Helper to dynamically derive API Base URL and format image URLs for cross-device & mobile compatibility
export const getApiBase = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  const hostname = typeof window !== 'undefined' ? (window.location.hostname || 'localhost') : 'localhost';
  return `http://${hostname}:5000`;
};

export const formatImageUrl = (url) => {
  if (!url) return '';
  const apiBase = getApiBase();
  // If image URL has hardcoded localhost:5000 from previous saves, rewrite it to current device network host
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
    await fetch(CLOUD_API_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Therapy Universe Gallery',
        data: { photos }
      })
    });
  } catch (e) {
    console.warn("Cloud gallery save error:", e);
  }
};
