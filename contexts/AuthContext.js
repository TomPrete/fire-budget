import React, { createContext, useState, useContext } from 'react';
import ApiClient from '../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const storeToken = async (token) => {
    await AsyncStorage.setItem('token', token);
    ApiClient.setAuthToken(token);
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await ApiClient.post('/token/', { 
        email, 
        password 
      });

      if (!response.access) {
        throw new Error('No access token received');
      }

      await storeToken(response.access);
      
      if (response.user) {
        setUser(response.user);
        return response.user;
      }

      // If user data wasn't included in token response, fetch it
      const userData = await ApiClient.get('/users/me/');
      setUser(userData);
      return userData;
    } catch (error) {
      console.error('Login error:', error);
      throw new Error(error.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email, password, firstName = '', lastName = '') => {
    try {
      setLoading(true);
      const response = await ApiClient.post('/users/', { 
        email, 
        password,
        first_name: firstName,
        last_name: lastName
      });
      
      if (response.tokens?.access) {
        await storeToken(response.tokens.access);
        setUser(response.user);
      }
      
      return {
        success: true,
        message: response.message || 'Account created successfully!'
      };
    } catch (error) {
      console.error('Signup error:', error);
      throw new Error(error.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    ApiClient.setAuthToken(null);
    setUser(null);
  };

  // Initialize auth state
  React.useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        console.log('Token:', token);
        if (token) {
          ApiClient.setAuthToken(token);
          try {
            const userData = await ApiClient.get('/users/me/');
            setUser(userData);
          } catch (error) {
            console.error('Failed to get user data:', error);
            await AsyncStorage.removeItem('token');
            ApiClient.setAuthToken(null);
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        await AsyncStorage.removeItem('token');
        ApiClient.setAuthToken(null);
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      signup, 
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 