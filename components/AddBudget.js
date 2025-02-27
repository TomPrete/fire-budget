import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useBudget } from '../contexts/BudgetContext';
import COLORS from '../constants/colors';

export default function AddBudget({ navigation }) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const { addBudget } = useBudget();

  const handleSubmit = () => {
    if (name.trim() && amount) {
      addBudget(name.trim(), parseFloat(amount));
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Ex: Groceries, Rent, etc."
        placeholderTextColor={COLORS.secondaryText}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Ex: $100, $500, etc."
        placeholderTextColor={COLORS.secondaryText}
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <TouchableOpacity 
        style={styles.button}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>Create Budget</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.lightBackground,
  },
  input: {
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
    color: COLORS.primaryText,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 