import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://fly247-backend.onrender.com', // Your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add an interceptor to automatically include the JWT token
api.interceptors.request.use((config) => {
  const user = localStorage.getItem('user');
  if (user) {
    const { token } = JSON.parse(user);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
