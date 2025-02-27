import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useBudget } from '../contexts/BudgetContext';
import COLORS from '../constants/colors';

export default function AddTransaction({ route, navigation }) {
  const { budgets } = useBudget();
  const defaultBudgetId = budgets[0]?.id;
  const { budgetId = defaultBudgetId } = route?.params || {};
  
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedBudgetId, setSelectedBudgetId] = useState(budgetId);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { addTransaction } = useBudget();

  const handleSubmit = () => {
    if (description.trim() && amount) {
      addTransaction(selectedBudgetId, {
        description: description.trim(),
        amount: parseFloat(amount), // Negative amount for spending
        date: date.toISOString(),
      });
      navigation.goBack();
    }
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Ex: In-and-Out, Amazon, etc."
        placeholderTextColor={COLORS.secondaryText}
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Ex: $10, $50, etc."
        placeholderTextColor={COLORS.secondaryText}
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <TouchableOpacity 
        style={styles.input}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={styles.dateText}>{date.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          onChange={onDateChange}
        />
      )}
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
  dateText: {
    color: COLORS.primaryText,
    fontSize: 16,
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
  pickerContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    marginBottom: 16
  },
  picker: {
    padding: 2,
    color: COLORS.primaryText,
  },
}); 