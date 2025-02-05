import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useBudget } from '../contexts/BudgetContext';

export default function AddTransaction({ route, navigation }) {
  const { budgetId } = route.params;
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedBudgetId, setSelectedBudgetId] = useState(budgetId);
  const { addTransaction, budgets } = useBudget();

  const handleSubmit = () => {
    if (description.trim() && amount) {
      addTransaction(selectedBudgetId, {
        description: description.trim(),
        amount: parseFloat(amount) * -1, // Negative amount for spending
        date: new Date().toISOString(),
      });
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedBudgetId}
          onValueChange={(itemValue) => setSelectedBudgetId(itemValue)} 
          style={styles.picker}
        >
          {budgets.map((budget) => (
            <Picker.Item 
              key={budget.id} 
              label={budget.name} 
              value={budget.id} 
            />
          ))}
        </Picker>
      </View>
      <TouchableOpacity 
        style={styles.button}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>Add Transaction</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#2ecc71',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16
  },
  picker: {
    padding: 2,
  },
}); 