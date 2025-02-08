import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import { AuthProvider } from './contexts/AuthContext';
import { BudgetProvider } from './contexts/BudgetContext';
import { IncomeProvider } from './contexts/IncomeContext'; 
import BudgetList from './components/BudgetList';
import AddBudget from './components/AddBudget';
import BudgetDetail from './components/BudgetDetail';
import AddTransaction from './components/AddTransaction';
import Report from './components/Report';
import MainAppNavigator from './components/MainAppNavigator';
import BudgetStack from './components/BudgetStack';
import getHeaderTitle from './helpers/header_title';
import TransactionList from './components/TransactionList';
const RootStack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <IncomeProvider>
        <BudgetProvider>
          <NavigationContainer>
            <RootStack.Navigator screenOptions={{ headerShown: false }}>
              <RootStack.Screen name="Home" component={Home} />
              <RootStack.Screen name="Login" component={Login} />
              <RootStack.Screen name="Signup" component={Signup} />
              <RootStack.Screen name="BudgetList" component={BudgetList} />
              <RootStack.Screen name="AddBudget" component={AddBudget} />
              <RootStack.Screen name="BudgetDetail" component={BudgetDetail} />
              <RootStack.Screen name="AddTransaction" component={AddTransaction} />
              <RootStack.Screen name="Report" component={Report} />
              <RootStack.Screen name="MainApp" component={MainAppNavigator} />
              <RootStack.Screen name="TransactionList" component={TransactionList} />
              <RootStack.Screen name="BudgetRootStack" component={BudgetStack} />
            </RootStack.Navigator>
          </NavigationContainer>
        </BudgetProvider>
      </IncomeProvider>
    </AuthProvider>
  );
}