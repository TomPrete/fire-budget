import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

export default function Transaction({ transaction, onDelete, showBudgetName, budgetName }) {
  const handleDelete = () => {
    Alert.alert(
      "Delete Transaction",
      "Are you sure you want to delete this transaction?",
      [
        {
          text: "Cancel"
        },
        {
          text: "Delete",
          onPress: () => onDelete(transaction.id)
        }
      ]
    );
  };

  const renderRightActions = () => {
    return (
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDelete}
      >
        <Text style={styles.deleteButtonText}>Remove</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable
      renderRightActions={renderRightActions}
    >
      <View style={styles.transactionItem}>
        <View>
          <Text style={styles.transactionDescription}>{transaction.description}</Text>
          <Text style={styles.transactionDate}>
            {new Date(transaction.date).toLocaleDateString()}
          </Text>
          {showBudgetName && budgetName && (
            <Text style={styles.budgetName}>Budget: {budgetName}</Text>
          )}
        </View>
        <View style={styles.transactionRight}>
          <Text style={[
            styles.transactionAmount,
            { color: '#e74c3c' }
          ]}>
            ${Math.abs(transaction.amount).toFixed(2)}
          </Text>
        </View>
      </View>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
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
  budgetName: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  deleteButton: {
    alignItems: 'center',
    backgroundColor: '#ff3b30',
    borderRadius: 8,
    height: '90%',
    justifyContent: 'center',
    paddingBottom: 8,
    width: 100
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
}); 