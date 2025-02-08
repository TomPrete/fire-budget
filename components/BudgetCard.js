import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useBudget } from '../contexts/BudgetContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function BudgetCard({ budget, onPress, onAddTransaction }) {
  const { getBudgetTransactions } = useBudget();
  const transactions = getBudgetTransactions(budget.id) || 0;
  const totalTransactions = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
  const progressPercentage = Math.min(100, (totalTransactions / budget.amount) * 100);

  return (
    <TouchableOpacity style={styles.budgetItem} onPress={onPress}>
      <View style={styles.contentContainer}>
        <Text style={styles.budgetName}>{budget.name}</Text>
        <View style={styles.rightContainer}>
          <Text style={styles.budgetAmount}>
            ${(budget.amount - totalTransactions).toFixed(0)} / ${budget.amount}
          </Text>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={onAddTransaction}
          >
            <Ionicons name="add-circle-outline" size={24} color="#2ecc71" />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.progressBarContainer}>
        <View 
          style={[
            styles.progressBar, 
            { 
              width: `${progressPercentage}%`,
              backgroundColor: progressPercentage > 90 ? '#e74c3c' : '#2ecc71'
            }
          ]} 
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  budgetItem: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
    elevation: 2,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  budgetName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  budgetAmount: {
    fontSize: 16,
    color: '#2ecc71',
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: '#f0f0f0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 2,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  addButton: {
    padding: 4,
  },
}); 