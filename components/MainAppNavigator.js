import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import AddTransaction from './AddTransaction';
import BudgetList from './BudgetList';
import Income from './Income';
import Account from './Account';
import Report from './Report';
import Strategy from './Strategy';
import BudgetStack from './BudgetStack';
import getHeaderTitle from '../helpers/header_title';
import TransactionList from './TransactionList';

const Tab = createBottomTabNavigator();

export default function MainAppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Budget':
              iconName = focused ? 'wallet' : 'wallet-outline';
              break;
            case 'Account':
              iconName = focused ? 'person' : 'person-outline';
              break;
            case 'Transaction':
              iconName = focused ? 'card' : 'card-outline';
              break;
            case 'Reports':
              iconName = focused ? 'bar-chart' : 'bar-chart-outline';
              break;
            case 'Strategy':
              iconName = focused ? 'trending-up' : 'trending-up-outline';
              break;
            case 'Income':
              iconName = focused ? 'cash' : 'cash-outline';
              break;
            case 'Transactions':
              iconName = focused ? 'list' : 'list-outline';
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Budget" component={BudgetStack} options={({ route }) => ({ title: getHeaderTitle(route)})}/>
      <Tab.Screen name="Transactions" component={TransactionList} />
      {/* <Tab.Screen name="Strategy" component={Strategy} /> */}
      <Tab.Screen name="Reports" component={Report} />
      <Tab.Screen name="Income" component={Income} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
} 