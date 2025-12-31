import api from '../api/axios';

export const authService = {
  // Login user
  login: async (credentials) => {
    const { data } = await api.post('/auth/login', credentials);
    return data;
  },

  // Register new user
  register: async (userData) => {
    const { data } = await api.post('/auth/register', userData);
    return data;
  },
};

