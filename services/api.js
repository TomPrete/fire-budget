import axios from 'axios';

const api = axios.create({
  baseURL: 'YOUR_API_BASE_URL',
  headers: {
    'Content-Type': 'application/json',
  }
});

export const authAPI = {
  login: (email, password) => 
    api.post('/login', { email, password }),
  
  signup: (email, password) => 
    api.post('/signup', { email, password }),
};

export default api; 