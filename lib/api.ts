import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://fly247-backend.onrender.com', // Your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add an interceptor to automatically include the JWT token
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const { token } = JSON.parse(user);
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (e) {
        console.error('Failed to parse user session from localStorage', e);
      }
    }
  }
  return config;
});

// --- Flight & Payment API Helper Functions ---

// 1. Search Flights (automatically applies your 5% markup on the backend)
export const searchFlights = async (searchData: Record<string, any>) => {
  const response = await api.post('/api/flights/search', searchData);
  return response.data;
};

// 2. Re-validate pricing right before checkout
export const verifyFlightPricing = async (pricingPayload: Record<string, any>) => {
  const response = await api.post('/api/flights/pricing', pricingPayload);
  return response.data;
};

// 3. Verify Paystack payment on your backend
export const verifyPaymentTransaction = async (reference: string) => {
  const response = await api.get(`/api/payments/verify/${reference}`);
  return response.data;
};

// 4. Reserve flight and generate PNR (requires verified payment reference)
export const reserveFlightBooking = async (reservationData: Record<string, any>) => {
  const response = await api.post('/api/flights/reserve', reservationData);
  return response.data;
};

export default api;
