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
    <Stack.Navigator>
        <Stack.Screen name="Budgets" component={BudgetList} options={{ headerShown: false, title: 'Budget Detail' }}/>
        <Stack.Screen name="BudgetDetail" component={BudgetDetail} options={{ headerShown: false, title: 'Budget Detail' }} />
        <Stack.Screen name="AddBudget" component={AddBudget} options={{ headerShown: false, title: 'Add Budget' }} />
        <Stack.Screen name="AddTransaction" component={AddTransaction} options={{ headerShown: false, title: 'Add Transaction' }} />
    </Stack.Navigator>
  );
}