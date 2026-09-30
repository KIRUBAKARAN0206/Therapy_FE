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

// No-op stubs to prevent breaking existing imports while relying 100% on Backend Database data
export const fetchCloudGallery = async () => [];
export const saveCloudGallery = async () => {};

