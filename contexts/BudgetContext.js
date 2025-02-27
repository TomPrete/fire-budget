import React, { createContext, useState, useContext, useEffect } from 'react';
import ApiClient from '../utils/api';
import { useAuth } from './AuthContext';

const BudgetContext = createContext(null);

export const BudgetProvider = ({ children }) => {
  const [budgets, setBudgets] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Load data from API
  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [budgetsData, transactionsData] = await Promise.all([
        ApiClient.get('/budgets/'),
        ApiClient.get('/transactions/')
      ]);
      setBudgets(budgetsData);
      setTransactions(transactionsData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const addBudget = async (name, amount) => {
    try {
      const newBudget = await ApiClient.post('/budgets/', {
        name,
        amount: parseFloat(amount)
      });
      console.log('newBudget', newBudget);
      // Check if newBudget.budgets exists (in case API returns { budgets: [...] })
      const budgetToAdd = newBudget.budget;
      setBudgets(prev => {
        const prevBudgets = Array.isArray(prev.budgets) ? prev.budgets : prev;
        return {budgets: Array.isArray(prevBudgets) ? [...prevBudgets, budgetToAdd] : [budgetToAdd]};
      });
      return newBudget;
    } catch (error) {
      throw error;
    }
  };

  const addTransaction = async (budgetId, { description, amount, date }) => {
    try {
      const newTransaction = await ApiClient.post('/transactions/', {
        budget: budgetId,
        description,
        amount: parseFloat(amount),
        date: date || new Date().toISOString().split('T')[0],
        transaction_type: amount < 0 ? 'EXPENSE' : 'INCOME'
      });
      setTransactions(prev => [...prev, newTransaction]);
      return newTransaction;
    } catch (error) {
      throw error;
    }
  };

  const getBudgetTransactions = (budgetId) => {
    console.log('transactions', transactions)
    return transactions?.transactions?.filter(transaction => transaction.budget === budgetId).sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const getBudgetTotal = async (budgetId, month, year) => {
    try {
      const response = await ApiClient.get(
        `/budgets/${budgetId}/monthly_total/?month=${month}&year=${year}`
      );
      return response.total;
    } catch (error) {
      console.error('Error getting budget total:', error);
      return 0;
    }
  };

  const deleteBudget = async (budgetId) => {
    try {
      await ApiClient.delete(`/budgets/${budgetId}/`);
      setBudgets(prev => prev.filter(budget => budget.id !== budgetId));
      setTransactions(prev => 
        prev.filter(transaction => transaction.budget !== budgetId)
      );
    } catch (error) {
      throw error;
    }
  };

  const deleteTransaction = async (transactionId) => {
    try {
      await ApiClient.delete(`/transactions/${transactionId}/`);
      setTransactions(prev => 
        prev.filter(transaction => transaction.id !== transactionId)
      );
    } catch (error) {
      throw error;
    }
  };

  const updateBudget = async (budgetId, updatedData) => {
    try {
      const updated = await ApiClient.put(`/budgets/${budgetId}/`, updatedData);
      setBudgets(prev => 
        prev.map(budget => budget.id === budgetId ? updated : budget)
      );
      return updated;
    } catch (error) {
      throw error;
    }
  };

  const getBudget = async (budgetId) => {
    try {
      const response = await ApiClient.get(`/budgets/${budgetId}/`);
      return response.budget;
    } catch (error) {
      throw error;
    }
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
      updateBudget,
      getBudget
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