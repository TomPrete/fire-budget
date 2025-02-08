import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useBudget } from '../contexts/BudgetContext';

export default function TransactionList() {
  const { getAllTransactions } = useBudget();
  const { budgets } = useBudget();
  const transactions = getAllTransactions().sort((a, b) => new Date(b.date) - new Date(a.date));
  console.log(budgets);

  const getBudgetName = (budgetId) => {
    const budget = budgets.find(b => b.id === budgetId);
    return budget ? budget.name : 'Unknown Budget';
  };

  const renderTransaction = ({ item }) => (
    <View style={styles.transactionItem}>
      <View style={styles.transactionHeader}>
        <Text style={styles.transactionName}>{item.description}</Text>
        <Text style={[styles.amount, { color: '#e74c3c' }]}>
          ${Math.abs(item.amount).toFixed(2)}
        </Text>
      </View>
      <Text style={styles.date}>{new Date(item.date).toLocaleDateString()}</Text>
      <Text style={styles.budgetName}>Budget: {getBudgetName(item.budgetId)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={transactions}
        renderItem={renderTransaction}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No transactions yet</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  transactionItem: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 2,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  transactionName: {
    fontSize: 16,
    fontWeight: '600',
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
  },
  date: {
    color: '#666',
    fontSize: 14,
    marginBottom: 4,
  },
  budgetName: {
    color: '#666',
    fontSize: 14,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 24,
    color: '#666',
    fontSize: 16,
  },
}); 