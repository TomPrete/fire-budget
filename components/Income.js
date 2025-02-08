import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import { useIncome } from '../contexts/IncomeContext';

const Income = () => {
  const [newIncome, setNewIncome] = useState({ source: '', amount: '' });
  const { incomeStreams, addIncomeStream, deleteIncomeStream } = useIncome();

  const handleAddIncome = () => {
    if (!newIncome.source || !newIncome.amount) {
      Alert.alert('Error', 'Please fill in both source and amount');
      return;
    }

    addIncomeStream(newIncome.source, newIncome.amount);
    setNewIncome({ source: '', amount: '' });
  };

  const renderIncomeItem = ({ item }) => (
    <View style={styles.incomeItem}>
      <View style={styles.incomeDetails}>
        <Text style={styles.sourceText}>{item.source}</Text>
        <Text style={styles.amountText}>${item.amount}</Text>
      </View>
      <TouchableOpacity 
        onPress={() => deleteIncomeStream(item.id)}
        style={styles.deleteButton}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Monthly Income</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Income Source"
          value={newIncome.source}
          onChangeText={(text) => setNewIncome(prev => ({ ...prev, source: text }))}
        />
        <TextInput
          style={styles.input}
          placeholder="Amount"
          value={newIncome.amount}
          onChangeText={(text) => setNewIncome(prev => ({ ...prev, amount: text }))}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddIncome}>
          <Text style={styles.addButtonText}>Add Income</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={incomeStreams}
        renderItem={renderIncomeItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  list: {
    flex: 1,
  },
  incomeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  incomeDetails: {
    flex: 1,
  },
  sourceText: {
    fontSize: 16,
    fontWeight: '500',
  },
  amountText: {
    fontSize: 14,
    color: '#666',
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    padding: 8,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
  },
});

export default Income;