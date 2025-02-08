import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Transaction({ transaction, onDelete }) {
  return (
    <View style={styles.transactionItem}>
      <View>
        <Text style={styles.transactionDescription}>{transaction.description}</Text>
        <Text style={styles.transactionDate}>
          {new Date(transaction.date).toLocaleDateString()}
        </Text>
      </View>
      <View style={styles.transactionRight}>
        <Text style={[
          styles.transactionAmount,
          { color: (transaction.amount * -1) < 0 ? '#e74c3c' : '#2ecc71' }
        ]}>
          ${Math.abs(transaction.amount).toFixed(2)}
        </Text>
        <TouchableOpacity onPress={() => onDelete(transaction.id)}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  deleteText: {
    color: '#e74c3c',
    fontSize: 12,
  },
}); 