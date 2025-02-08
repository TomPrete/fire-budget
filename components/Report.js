import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useIncome } from '../contexts/IncomeContext';
import { useBudget } from '../contexts/BudgetContext';

const Report = () => {
  const { getTotalIncome } = useIncome();
  const { budgets, getTotalTransactions } = useBudget();

  const totalIncome = getTotalIncome();

  const calculateTotalExpenses = () => {
    return getTotalTransactions();
  };

  const totalExpenses = calculateTotalExpenses();
  const projectedSavings = totalIncome + totalExpenses;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>F.I.R.E. Report</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Monthly Income</Text>
          <Text style={[styles.amount, { color: '#2ecc71' }]}>
            ${totalIncome.toFixed(2)}
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Total Expenses</Text>
          <Text style={[styles.amount, { color: '#e74c3c' }]}>
            ${Math.abs(totalExpenses).toFixed(2)}
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Projected Monthly Savings</Text>
          <Text style={[styles.amount, { 
            color: projectedSavings >= 0 ? '#2ecc71' : '#e74c3c' 
          }]}>
            ${Math.abs(projectedSavings).toFixed(2)}
            {projectedSavings < 0 && ' (Deficit)'}
          </Text>
        </View>

        <View style={styles.summaryContainer}>
          <Text style={styles.summaryText}>
            {projectedSavings >= 0 
              ? "You're on track with your savings! Keep it up!" 
              : "You're currently spending more than your income. Consider reviewing your budget."}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#2c3e50',
  },
  section: {
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 8,
  },
  amount: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  divider: {
    height: 1,
    backgroundColor: '#ecf0f1',
    marginVertical: 15,
  },
  summaryContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
  },
  summaryText: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default Report;
