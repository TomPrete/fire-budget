import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { useBudget } from '../contexts/BudgetContext';
import BudgetCard from './BudgetCard';
import BudgetProgressBar from './BudgetProgressBar';
import { ActivityIndicator } from 'react-native';
import COLORS from '../constants/colors';

export default function BudgetList({ navigation }) {
  const { budgets, deleteBudget, transactions, loading } = useBudget();
  // console.log(bugets)
  const handleDelete = (budget) => {
    Alert.alert(
      "Delete Budget",
      `Are you sure you want to delete the "${budget.name}" budget and all its transactions?`,
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
    console.log('budget', budget)
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
        <View style={styles.graphContainer}>
          <BudgetProgressBar />
        </View>

        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => navigation.navigate('AddBudget')}
        >
          <Text style={styles.addButtonText}>Add New Budget</Text>
        </TouchableOpacity>
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : (
          <FlatList
            data={budgets.budgets}
            renderItem={renderBudgetItem}
            keyExtractor={item => item.id}
          />
        )}
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.lightBackground,
  },
  graphContainer: {
    marginBottom: 16,
  },
  budgetItem: {
    padding: 16,
    backgroundColor: COLORS.white,
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
    color: COLORS.primaryText,
  },
  budgetAmount: {
    fontSize: 16,
    color: COLORS.success,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
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
  addButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
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