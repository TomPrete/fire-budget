import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useBudget } from '../contexts/BudgetContext';
import COLORS from '../constants/colors';

const BudgetProgressBar = () => {
  const { budgets, transactions } = useBudget();

  const { totalBudget, totalSpent, progressPercentage } = useMemo(() => {
    // Calculate total budget amount
    const total = budgets?.budgets?.reduce((sum, budget) => sum + budget.amount, 0) || 0;
    
    // Calculate total spent from transactions
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    const spent = transactions?.transactions?.reduce((sum, transaction) => {
      const transactionDate = new Date(transaction.date);
      if (transactionDate.getMonth() === currentMonth && 
          transactionDate.getFullYear() === currentYear) {
        return sum + transaction.amount;
      }
      return sum;
    }, 0) || 0;

    // Calculate percentage (capped at 100)
    const percentage = Math.min(100, Math.abs((spent / total) * 100));

    return {
      totalBudget: total,
      totalSpent: Math.abs(spent),
      progressPercentage: percentage
    };
  }, [budgets, transactions]);

  // Determine progress bar color based on percentage
  const getProgressBarColor = (percentage) => {
    if (percentage > 90) return COLORS.accent; // Warm Flame Red for high usage
    if (percentage > 75) return COLORS.primary; // Sunset Orange for medium usage
    return COLORS.success; // Money Green for good standing
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Monthly Budget Overview</Text>
      <View style={styles.summaryContainer}>
        <Text style={styles.amount}>
          ${totalSpent.toFixed(0)} <Text style={styles.totalText}>/ ${totalBudget.toFixed(0)}</Text>
        </Text>
        <Text style={[
          styles.percentageText,
          { color: getProgressBarColor(progressPercentage) }
        ]}>
          {progressPercentage.toFixed(1)}%
        </Text>
      </View>
      <View style={styles.progressBarContainer}>
        <View 
          style={[
            styles.progressBar, 
            { 
              width: `${progressPercentage}%`,
              backgroundColor: getProgressBarColor(progressPercentage)
            }
          ]} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.primaryText,
    marginBottom: 12,
    textAlign: 'center',
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  amount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primaryText,
  },
  totalText: {
    color: COLORS.secondaryText,
    fontSize: 20,
  },
  percentageText: {
    fontSize: 20,
    fontWeight: '600',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
});

export default BudgetProgressBar; 