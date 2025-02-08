import React from 'react';
import { View, Dimensions, StyleSheet, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const Graph = ({ expenses = [] }) => {
  // Process expenses data to get daily totals for current month
  const getCurrentMonthData = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    console.log('Expenses', expenses)
    // Filter expenses for current month and group by date
    const monthlyExpenses = expenses
      .filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate.getMonth() === currentMonth && 
               expenseDate.getFullYear() === currentYear;
      })
      .reduce((acc, expense) => {
        const date = new Date(expense.date).getDate();
        acc[date] = (acc[date] || 0) + Number(expense.amount);
        return acc;
      }, {});
    console.log(monthlyExpenses);
    // Create data array for all days of month
    const daysInMonth = new Date().getDate();
    console.log("Days in month", daysInMonth);
    const labels = [];
    const data = [];
    let runningTotal = 0;

    for (let i = 1; i <= daysInMonth; i++) {
      labels.push(i.toString());
      runningTotal += monthlyExpenses[i] || 0;
      data.push(runningTotal);
    }
    console.log("Data", data);
    console.log("Labels", labels);
    return { labels, data };
  };

  const { labels, data } = getCurrentMonthData();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{new Date().toLocaleString('default', { month: 'long' })}</Text>
      <LineChart
        data={{
          labels,
          datasets: [{
            data: data.length ? data : [0]
          }]
        }}
        width={Dimensions.get('window').width - 32} // -32 for padding
        height={220}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(46, 204, 113, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForLabels: {
            fontWeight: 'bold'
          }
        }}
        bezier
        style={styles.chart}
        yAxisLabel="$"
        fromZero={true}
        withVerticalLabels={true}
        withHorizontalLabels={true}
        // withInnerLines={true}
        // withOuterLines={true}
        withDots={false}
        withShadow={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    marginBottom: 16,
    paddingTop: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  chart: {
    marginVertical: 8,
    marginBottom: 8,
    borderRadius: 16
  }
});

export default Graph;
