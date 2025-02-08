import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import BudgetStack from './BudgetStack';
import TransactionStack from './TransactionStack';
import Income from './Income';
import Account from './Account';
import Report from './Report';

const Tab = createBottomTabNavigator();

export default function MainAppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const rootTabName = route.name;
          let iconName;

          switch (rootTabName) {
            case 'Budget':
              iconName = 'wallet';
              break;
            case 'Account':
              iconName = 'person';
              break;
            case 'Transaction':
              iconName = 'card';
              break;
            case 'Reports':
              iconName = 'bar-chart';
              break;
            case 'Strategy':
              iconName = 'trending-up';
              break;
            case 'Income':
              iconName = 'cash';
              break;
            case 'Transactions':
              iconName = 'list';
              break;
          }

          if (!focused) {
            iconName = `${iconName}-outline`;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen 
        name="Budget" 
        component={BudgetStack} 
        options={{
          headerShown: false,
          tabBarStyle: { display: 'flex' }
        }}
      />
      <Tab.Screen 
        name="Transactions" 
        component={TransactionStack}
        options={{
          headerShown: false,
          tabBarStyle: { display: 'flex' }
        }}
      />
      <Tab.Screen name="Reports" component={Report} />
      <Tab.Screen name="Income" component={Income} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
} 