import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import { AuthProvider } from './contexts/AuthContext';
import { BudgetProvider } from './contexts/BudgetContext';
import BudgetList from './components/BudgetList';
import AddBudget from './components/AddBudget';
import BudgetDetail from './components/BudgetDetail';
import AddTransaction from './components/AddTransaction';

const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <BudgetProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="BudgetList" component={BudgetList} />
            <Stack.Screen name="AddBudget" component={AddBudget} />
            <Stack.Screen name="BudgetDetail" component={BudgetDetail} />
            <Stack.Screen name="AddTransaction" component={AddTransaction} />
          </Stack.Navigator>
        </NavigationContainer>
      </BudgetProvider>
    </AuthProvider>
  );
}