import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TransactionList from './TransactionList';
import AddTransaction from './AddTransaction';

const Stack = createNativeStackNavigator();

export default function TransactionStack() {
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
        name="TransactionList" 
        component={TransactionList}
        options={{ title: 'Transactions' }}
      />
      <Stack.Screen 
        name="AddTransaction" 
        component={AddTransaction}
        options={{ title: 'Add Transaction' }}
      />
    </Stack.Navigator>
  );
} 