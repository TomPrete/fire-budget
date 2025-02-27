import React, { useMemo } from 'react';
import { View, SectionList, Text, StyleSheet } from 'react-native';
import { useBudget } from '../contexts/BudgetContext';
import Transaction from './Transaction';
import FloatingActionButton from './FloatingActionButton';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../constants/colors';

export default function TransactionList() {
  const { getAllTransactions, budgets } = useBudget();
  const navigation = useNavigation();
  
  // Group transactions by month
  const sections = useMemo(() => {
    const transactions = getAllTransactions();
    const grouped = transactions.reduce((acc, transaction) => {
      const date = new Date(transaction.date);
      const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' });
      
      if (!acc[monthYear]) {
        acc[monthYear] = [];
      }
      acc[monthYear].push(transaction);
      return acc;
    }, {});

    // Convert to array and sort sections by date
    return Object.entries(grouped)
      .map(([title, data]) => ({
        title,
        data: data.sort((a, b) => new Date(b.date) - new Date(a.date))
      }))
      .sort((a, b) => {
        const dateA = new Date(a.data[0].date);
        const dateB = new Date(b.data[0].date);
        return dateB - dateA;
      });
  }, [getAllTransactions]);

  const getBudgetName = (budgetId) => {
    const budget = budgets.find(b => b.id === budgetId);
    return budget ? budget.name : 'Unknown Budget';
  };

  const handleAddTransaction = () => {
    navigation.navigate('AddTransaction');
  };

  const renderTransaction = ({ item }) => (
    <Transaction 
      transaction={item}
      showBudgetName={true}
      budgetName={getBudgetName(item.budgetId)}
      onDelete={() => {}} // Add delete handler if needed
    />
  );

  const renderSectionHeader = ({ section: { title } }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <SectionList
        sections={sections}
        renderItem={renderTransaction}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No transactions yet</Text>
        }
        contentContainerStyle={styles.listContent}
        stickySectionHeadersEnabled={true}
      />
      <FloatingActionButton 
        onPress={handleAddTransaction}
        color={COLORS.primary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightBackground,
  },
  listContent: {
    padding: 16,
    paddingBottom: 80, // Add extra padding at bottom for FAB
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 24,
    color: COLORS.secondaryText,
    fontSize: 16,
  },
  sectionHeader: {
    backgroundColor: COLORS.whiteTransparent,
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primaryText,
  },
}); 