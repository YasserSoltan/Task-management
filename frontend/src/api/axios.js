import axios from 'axios';

// For Vercel deployment: use relative URL for same-domain API calls
// For local development: use full URL or environment variable
const getBaseURL = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  // If deployed on Vercel, API is on same domain at /api
  if (import.meta.env.PROD && window.location.origin) {
    return '/api';
  }
  // Local development default
  return 'http://localhost:5000/api';
};

const api = axios.create({
  baseURL: getBaseURL(),
});

// Attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
