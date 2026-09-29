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
