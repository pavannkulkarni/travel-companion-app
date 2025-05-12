import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Theme } from '@/constants/theme';
import { Card } from '@/components/ui/Card';
import { mockExpenses } from '@/data/mockData';
import { Users, Calendar, Receipt } from 'lucide-react-native';

export default function ExpenseDetailsScreen() {
  const { id } = useLocalSearchParams();
  const expense = mockExpenses.find(e => e.id === id);

  if (!expense) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Expense not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Expense Details</Text>
        <Text style={styles.subtitle}>{expense.description}</Text>
      </View>

      <View style={styles.content}>
        <Card>
          <View style={styles.amountContainer}>
            <Text style={styles.amountLabel}>Total Amount</Text>
            <Text style={styles.amount}>₹{expense.amount.toFixed(2)}</Text>
          </View>

          <View style={styles.infoRow}>
            <Receipt size={20} color={Theme.colors.neutral[500]} />
            <Text style={styles.infoText}>
              Category: {expense.category.charAt(0).toUpperCase() + expense.category.slice(1)}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Calendar size={20} color={Theme.colors.neutral[500]} />
            <Text style={styles.infoText}>Date: {expense.date}</Text>
          </View>

          <View style={styles.infoRow}>
            <Users size={20} color={Theme.colors.neutral[500]} />
            <Text style={styles.infoText}>
              Split between {expense.splitBetween} people
            </Text>
          </View>
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>Payment Details</Text>
          <View style={styles.paymentDetails}>
            <Text style={styles.paymentText}>
              Paid by: <Text style={styles.highlight}>{expense.paidBy.name}</Text>
            </Text>
            <Text style={styles.paymentText}>
              Each person pays:{' '}
              <Text style={styles.highlight}>
                ₹{(expense.amount / expense.splitBetween).toFixed(2)}
              </Text>
            </Text>
          </View>
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>Group Information</Text>
          <Text style={styles.groupName}>{expense.groupName}</Text>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.neutral[50],
  },
  header: {
    padding: Theme.spacing[4],
    backgroundColor: Theme.colors.white,
  },
  title: {
    fontFamily: Theme.fontFamily.bold,
    fontSize: Theme.fontSizes['2xl'],
    color: Theme.colors.neutral[800],
    marginBottom: Theme.spacing[1],
  },
  subtitle: {
    fontFamily: Theme.fontFamily.regular,
    fontSize: Theme.fontSizes.md,
    color: Theme.colors.neutral[600],
  },
  content: {
    padding: Theme.spacing[4],
    gap: Theme.spacing[4],
  },
  errorText: {
    fontFamily: Theme.fontFamily.medium,
    fontSize: Theme.fontSizes.lg,
    color: Theme.colors.error[500],
    textAlign: 'center',
    marginTop: Theme.spacing[8],
  },
  amountContainer: {
    alignItems: 'center',
    marginBottom: Theme.spacing[4],
  },
  amountLabel: {
    fontFamily: Theme.fontFamily.medium,
    fontSize: Theme.fontSizes.md,
    color: Theme.colors.neutral[600],
    marginBottom: Theme.spacing[1],
  },
  amount: {
    fontFamily: Theme.fontFamily.bold,
    fontSize: Theme.fontSizes['3xl'],
    color: Theme.colors.primary[600],
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing[2],
    gap: Theme.spacing[2],
  },
  infoText: {
    fontFamily: Theme.fontFamily.regular,
    fontSize: Theme.fontSizes.md,
    color: Theme.colors.neutral[700],
  },
  sectionTitle: {
    fontFamily: Theme.fontFamily.semiBold,
    fontSize: Theme.fontSizes.lg,
    color: Theme.colors.neutral[800],
    marginBottom: Theme.spacing[3],
  },
  paymentDetails: {
    gap: Theme.spacing[2],
  },
  paymentText: {
    fontFamily: Theme.fontFamily.regular,
    fontSize: Theme.fontSizes.md,
    color: Theme.colors.neutral[700],
  },
  highlight: {
    fontFamily: Theme.fontFamily.semiBold,
    color: Theme.colors.primary[600],
  },
  groupName: {
    fontFamily: Theme.fontFamily.medium,
    fontSize: Theme.fontSizes.md,
    color: Theme.colors.primary[600],
  },
});