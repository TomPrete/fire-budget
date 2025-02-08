import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BudgetList from './BudgetList';
import BudgetDetail from './BudgetDetail';
import AddBudget from './AddBudget';
import AddTransaction from './AddTransaction';
import getHeaderTitle from '../helpers/header_title';
const Stack = createNativeStackNavigator();

export default function BudgetStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: '600',
        },
      }}
    >
      <Stack.Screen 
        name="Budgets" 
        component={BudgetList} 
        options={{ 
          title: 'My Budgets'
        }}
      />
      <Stack.Screen 
        name="BudgetDetail" 
        component={BudgetDetail} 
        options={{ 
          title: 'Budget Detail'
        }} 
      />
      <Stack.Screen 
        name="AddBudget" 
        component={AddBudget} 
        options={{ 
          title: 'Add Budget'
        }} 
      />
      <Stack.Screen 
        name="AddTransaction" 
        component={AddTransaction} 
        options={{ 
          title: 'Add Transaction'
        }} 
      />
    </Stack.Navigator>
  );
}