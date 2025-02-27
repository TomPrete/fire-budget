import React, { createContext, useState, useContext, useEffect } from 'react';
import ApiClient from '../utils/api';
import { useAuth } from './AuthContext';

const IncomeContext = createContext(null);

export const IncomeProvider = ({ children }) => {
  const [incomeStreams, setIncomeStreams] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const loadData = async () => {
    try {
      setLoading(true);
      // Using the categories endpoint with is_expense=false to get income categories
      const response = await ApiClient.get('/categories/?is_expense=false');
      setIncomeStreams(response);
    } catch (error) {
      console.error('Error loading income data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const addIncomeStream = async (source, amount) => {
    try {
      const newIncome = await ApiClient.post('/categories/', {
        name: source,
        amount: parseFloat(amount),
        is_expense: false
      });
      setIncomeStreams(prev => [...prev, newIncome]);
      return newIncome;
    } catch (error) {
      throw error;
    }
  };

  const deleteIncomeStream = async (incomeId) => {
    try {
      await ApiClient.delete(`/categories/${incomeId}/`);
      setIncomeStreams(prev => prev.filter(income => income.id !== incomeId));
    } catch (error) {
      throw error;
    }
  };

  const getTotalIncome = () => {
    return incomeStreams.reduce((sum, income) => sum + income.amount, 0);
  };

  return (
    <IncomeContext.Provider value={{
      incomeStreams,
      loading,
      addIncomeStream,
      deleteIncomeStream,
      getTotalIncome
    }}>
      {children}
    </IncomeContext.Provider>
  );
};

export const useIncome = () => {
  const context = useContext(IncomeContext);
  if (!context) {
    throw new Error('useIncome must be used within an IncomeProvider');
  }
  return context;
};
