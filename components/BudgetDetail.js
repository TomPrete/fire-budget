import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useBudget } from '../contexts/BudgetContext';
import Transaction from './Transaction';

export default function BudgetDetail({ route, navigation }) {
  const { budgetId } = route.params;
  const { 
    budgets, 
    getBudgetTransactions, 
    getBudgetTotal, 
    deleteBudget,
    deleteTransaction 
  } = useBudget();

  const budget = budgets.find(b => b.id === budgetId);
  const transactions = getBudgetTransactions(budgetId);
  const total = getBudgetTotal(budgetId);
  const remaining = budget.amount + total;

  const handleDeleteBudget = () => {
    Alert.alert(
      "Delete Budget",
      "Are you sure you want to delete this budget and all its transactions?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive",
          onPress: () => {
            deleteBudget(budgetId);
            navigation.goBack();
          }
        }
      ]
    );
  };

  const renderTransaction = ({ item }) => (
    <Transaction 
      transaction={item}
      onDelete={deleteTransaction}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{budget.name}</Text>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDeleteBudget}
        >
          <Text style={styles.deleteButtonText}>Delete Budget</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.summary}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Budget</Text>
          <Text style={styles.summaryAmount}>${budget.amount.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Spent</Text>
          <Text style={styles.summaryAmount}>${Math.abs(total).toFixed(2)}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Remaining</Text>
          <Text style={[
            styles.summaryAmount,
            { color: remaining < 0 ? '#e74c3c' : '#2ecc71' }
          ]}>
            ${remaining.toFixed(2)}
          </Text>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => navigation.navigate('AddTransaction', { budgetId })}
      >
        <Text style={styles.addButtonText}>Add Transaction</Text>
      </TouchableOpacity>

      <FlatList
        data={transactions}
        renderItem={renderTransaction}
        keyExtractor={item => item.id}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    padding: 8,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: '#fff',
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#666',
  },
  summaryAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#2ecc71',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  transactionDescription: {
    fontSize: 16,
    fontWeight: '500',
  },
  transactionDate: {
    fontSize: 12,
    color: '#666',
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteText: {
    color: '#e74c3c',
    fontSize: 12,
  },
  list: {
    flex: 1,
  },
}); 