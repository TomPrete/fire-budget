import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { useBudget } from '../contexts/BudgetContext';
import BudgetCard from './BudgetCard';

export default function BudgetList({ navigation }) {
  const { budgets, deleteBudget } = useBudget();

  const handleDelete = (budget) => {
    Alert.alert(
      "Delete Budget",
      `Are you sure you want to delete "${budget.name}"?`,
      [
        {
          text: "Cancel"
        },
        {
          text: "Delete",
          onPress: () => deleteBudget(budget.id)
        }
      ]
    );
  };

  const renderRightActions = (budget) => {
    return (
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(budget)}
      >
        <Text style={styles.deleteButtonText}>Remove</Text>
      </TouchableOpacity>
    );
  };

  const renderBudgetItem = ({ item }) => {
    return (
      <Swipeable
        renderRightActions={() => renderRightActions(item)}
      >
        <BudgetCard
          budget={item}
          onPress={() => navigation.navigate('BudgetDetail', { budgetId: item.id })}
          onAddTransaction={() => navigation.navigate('AddTransaction', { 
            budgetId: item.id,
            budgetName: item.name 
          })}
        />
      </Swipeable>
    );
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => navigation.navigate('AddBudget')}
        >
          <Text style={styles.addButtonText}>Add New Budget</Text>
        </TouchableOpacity>

        <FlatList
          data={budgets}
          renderItem={renderBudgetItem}
          keyExtractor={item => item.id}
        />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  budgetItem: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },
  budgetName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  budgetAmount: {
    fontSize: 16,
    color: '#2ecc71',
  },
  addButton: {
    backgroundColor: '#2ecc71',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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