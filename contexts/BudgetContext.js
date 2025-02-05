import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BudgetContext = createContext(null);

export const BudgetProvider = ({ children }) => {
  const [budgets, setBudgets] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load data from storage
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const storedBudgets = await AsyncStorage.getItem('budgets');
      const storedTransactions = await AsyncStorage.getItem('transactions');
      console.log(storedTransactions)
      if (storedBudgets) setBudgets(JSON.parse(storedBudgets));
      if (storedTransactions) setTransactions(JSON.parse(storedTransactions));
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Save data whenever it changes
  useEffect(() => {
    if (!loading) {
      AsyncStorage.setItem('budgets', JSON.stringify(budgets));
      AsyncStorage.setItem('transactions', JSON.stringify(transactions));
    }
  }, [budgets, transactions, loading]);

  const addBudget = (name, amount) => {
    setBudgets(prev => [...prev, {
      id: Date.now().toString(),
      name,
      amount: parseFloat(amount),
    }]);
  };

  const addTransaction = (budgetId, { description, amount, date }) => {
    setTransactions(prev => [...prev, {
      id: Date.now().toString(),
      budgetId,
      description,
      amount: parseFloat(amount),
      date: date || new Date().toISOString(),
    }]);
  };

  const getBudgetTransactions = (budgetId) => {
    return transactions.filter(transaction => transaction.budgetId === budgetId);
  };

  const getBudgetTotal = (budgetId) => {
    return getBudgetTransactions(budgetId)
      .reduce((sum, transaction) => sum + transaction.amount, 0);
  };

  const deleteBudget = (budgetId) => {
    setBudgets(prev => prev.filter(budget => budget.id !== budgetId));
    setTransactions(prev => prev.filter(transaction => transaction.budgetId !== budgetId));
  };

  const deleteTransaction = (transactionId) => {
    setTransactions(prev => prev.filter(transaction => transaction.id !== transactionId));
  };

  return (
    <BudgetContext.Provider value={{
      budgets,
      transactions,
      loading,
      addBudget,
      addTransaction,
      getBudgetTransactions,
      getBudgetTotal,
      deleteBudget,
      deleteTransaction,
    }}>
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudget = () => {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error('useBudget must be used within a BudgetProvider');
  }
  return context;
}; 