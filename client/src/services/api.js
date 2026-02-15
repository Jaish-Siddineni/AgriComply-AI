import axios from 'axios';

// Create the axios instance
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Make sure this matches your backend port
});

// Add a Request Interceptor
// This runs BEFORE every request is sent
api.interceptors.request.use(
  (config) => {
    // 1. Get the token from LocalStorage
    const token = localStorage.getItem('token');
    
    // 2. If token exists, attach it to the Headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;