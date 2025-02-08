import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const IncomeContext = createContext(null);

export const IncomeProvider = ({ children }) => {
  const [incomeStreams, setIncomeStreams] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const storedIncomeStreams = await AsyncStorage.getItem('incomeStreams');
      if (storedIncomeStreams) setIncomeStreams(JSON.parse(storedIncomeStreams));
    } catch (error) {
      console.error('Error loading income data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load data on mount
  useEffect(() => {
    loadData();
  }, []);

  // Save data whenever it changes
  useEffect(() => {
    if (!loading) {
      AsyncStorage.setItem('incomeStreams', JSON.stringify(incomeStreams));
    }
  }, [incomeStreams, loading]);

  const addIncomeStream = (source, amount) => {
    setIncomeStreams(prev => [...prev, {
      id: Date.now().toString(),
      source,
      amount: parseFloat(amount),
      createdAt: new Date().toISOString()
    }]);
  };

  const deleteIncomeStream = (incomeId) => {
    setIncomeStreams(prev => prev.filter(income => income.id !== incomeId));
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
