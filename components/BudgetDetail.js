import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, SectionList, TouchableOpacity, StyleSheet, Alert, Modal, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useBudget } from '../contexts/BudgetContext';
import Transaction from './Transaction';
import { Ionicons } from '@expo/vector-icons';

export default function BudgetDetail({ route, navigation }) {
  const { budgetId } = route.params;
  const { 
    budgets, 
    getBudgetTransactions, 
    getBudgetTotal,
    getBudget,
    deleteBudget,
    deleteTransaction,
    updateBudget 
  } = useBudget();

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedAmount, setEditedAmount] = useState('');
  
  // Add state for selected month
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [budget, setBudget] = useState(null);
  const [allTransactions, setAllTransactions] = useState([]);

  useEffect(() => {
    const fetchBudget = async () => {
      const fetchedBudget = await getBudget(budgetId);
      setBudget(fetchedBudget);
    };
    fetchBudget();
  }, [budgetId, getBudget]);

  // Get all available months between the first transaction and current date
  const { monthlyTransactions, monthlyTotal, availableMonths } = useMemo(() => {
    const today = new Date();
    let startDate = today;
    
    // Find earliest transaction date if exists
    if (allTransactions.length > 0) {
      startDate = new Date(Math.min(...allTransactions.map(t => new Date(t.date))));
    }
    
    // Generate array of all months between start date and now
    const months = [];
    const currentDate = new Date(today);
    const earliestDate = new Date(startDate);
    earliestDate.setDate(1); // Set to first of month
    
    while (currentDate >= earliestDate) {
      months.push(new Date(currentDate));
      currentDate.setMonth(currentDate.getMonth() - 1);
    }

    // Group transactions by month
    const grouped = allTransactions.reduce((acc, transaction) => {
      const date = new Date(transaction.date);
      const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' });
      
      if (!acc.transactions[monthYear]) {
        acc.transactions[monthYear] = [];
        acc.totals[monthYear] = 0;
      }
      
      acc.transactions[monthYear].push(transaction);
      acc.totals[monthYear] += transaction.amount;
      
      return acc;
    }, { transactions: {}, totals: {} });

    return {
      monthlyTransactions: grouped.transactions,
      monthlyTotal: grouped.totals,
      availableMonths: months
    };
  }, [allTransactions]);

  // Get current month's transactions
  const currentMonthYear = selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' });
  const currentMonthTransactions = monthlyTransactions[currentMonthYear] || [];
  const currentMonthTotal = monthlyTotal[currentMonthYear] || 0;
  const currentMonthRemaining = budget ? budget.amount - currentMonthTotal : 0;

  const navigateMonth = (direction) => {
    const currentIndex = availableMonths.findIndex(
      date => 
        date.getMonth() === selectedDate.getMonth() && 
        date.getFullYear() === selectedDate.getFullYear()
    );
    
    if (direction === 'next' && currentIndex > 0) {
      setSelectedDate(availableMonths[currentIndex - 1]);
    } else if (direction === 'prev' && currentIndex < availableMonths.length - 1) {
      setSelectedDate(availableMonths[currentIndex + 1]);
    }
  };

  // Determine if navigation buttons should be enabled
  const canNavigateNext = availableMonths.findIndex(
    date => 
      date.getMonth() === selectedDate.getMonth() && 
      date.getFullYear() === selectedDate.getFullYear()
  ) > 0;

  const canNavigatePrev = availableMonths.findIndex(
    date => 
      date.getMonth() === selectedDate.getMonth() && 
      date.getFullYear() === selectedDate.getFullYear()
  ) < availableMonths.length - 1;

  const handleEditPress = () => {
    setEditedName(budget.name);
    setEditedAmount(budget.amount.toString());
    setIsEditModalVisible(true);
  };

  const handleSaveEdit = () => {
    const amount = parseFloat(editedAmount);
    if (isNaN(amount) || amount <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid budget amount');
      return;
    }

    if (!editedName.trim()) {
      Alert.alert('Invalid Name', 'Please enter a budget name');
      return;
    }

    updateBudget(budgetId, {
      ...budget,
      name: editedName.trim(),
      amount: amount
    });
    setIsEditModalVisible(false);
  };

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

  if (!budget) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{budget.name}</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={handleEditPress}
          >
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDeleteBudget}
          >
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.monthSelector}>
        <TouchableOpacity 
          onPress={() => navigateMonth('prev')}
          style={[
            styles.monthButton,
            !canNavigatePrev && styles.monthButtonDisabled
          ]}
          disabled={!canNavigatePrev}
        >
          <Ionicons 
            name="chevron-back" 
            size={24} 
            color={canNavigatePrev ? '#666' : '#ccc'} 
          />
        </TouchableOpacity>
        
        <Text style={styles.monthText}>{currentMonthYear}</Text>
        
        <TouchableOpacity 
          onPress={() => navigateMonth('next')}
          style={[
            styles.monthButton,
            !canNavigateNext && styles.monthButtonDisabled
          ]}
          disabled={!canNavigateNext}
        >
          <Ionicons 
            name="chevron-forward" 
            size={24} 
            color={canNavigateNext ? '#666' : '#ccc'} 
          />
        </TouchableOpacity>
      </View>

      <View style={styles.summary}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Monthly Budget</Text>
          <Text style={styles.summaryAmount}>${budget.amount.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Spent</Text>
          <Text style={styles.summaryAmount}>${Math.abs(currentMonthTotal).toFixed(2)}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Remaining</Text>
          <Text style={[
            styles.summaryAmount,
            { color: currentMonthRemaining < 0 ? '#e74c3c' : '#2ecc71' }
          ]}>
            ${currentMonthRemaining.toFixed(2)}
          </Text>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => navigation.navigate('AddTransaction', { budgetId })}
      >
        <Text style={styles.addButtonText}>Add Transaction</Text>
      </TouchableOpacity>

      <SectionList
        sections={[{ 
          title: currentMonthYear, 
          data: currentMonthTransactions.sort((a, b) => new Date(b.date) - new Date(a.date))
        }]}
        renderItem={renderTransaction}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{title}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
        style={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No transactions for {currentMonthYear}</Text>
            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => navigation.navigate('AddTransaction', { budgetId })}
            >
              <Text style={styles.addButtonText}>Add First Transaction</Text>
            </TouchableOpacity>
          </View>
        }
      />

      <Modal
        visible={isEditModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsEditModalVisible(false)}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalContainer}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Budget</Text>
            
            <Text style={styles.inputLabel}>Name</Text>
            <TextInput
              style={styles.input}
              value={editedName}
              onChangeText={setEditedName}
              placeholder="Budget Name"
            />

            <Text style={styles.inputLabel}>Amount</Text>
            <TextInput
              style={styles.input}
              value={editedAmount}
              onChangeText={setEditedAmount}
              keyboardType="decimal-pad"
              placeholder="Budget Amount"
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setIsEditModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleSaveEdit}
              >
                <Text style={styles.modalButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
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
  headerButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  editButton: {
    backgroundColor: '#3498db',
    padding: 8,
    borderRadius: 8,
  },
  editButtonText: {
    color: '#fff',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 4,
    color: '#666',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 8,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#95a5a6',
  },
  saveButton: {
    backgroundColor: '#2ecc71',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  monthSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  monthButton: {
    padding: 8,
  },
  monthText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#34495e',
  },
  sectionHeader: {
    backgroundColor: '#f0f4f8',
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#34495e',
  },
  monthButtonDisabled: {
    opacity: 0.5,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    textAlign: 'center',
    marginBottom: 16,
    color: '#666',
    fontSize: 16,
  },
}); 