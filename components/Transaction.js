import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import COLORS from '../constants/colors';

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
            { color: COLORS.accent }
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
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  transactionDescription: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.primaryText,
  },
  transactionDate: {
    fontSize: 12,
    color: COLORS.secondaryText,
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
    color: COLORS.secondaryText,
    marginTop: 2,
  },
  deleteButton: {
    alignItems: 'center',
    backgroundColor: COLORS.accent,
    borderRadius: 8,
    height: '90%',
    justifyContent: 'center',
    paddingBottom: 8,
    width: 100
  },
  deleteButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
}); 