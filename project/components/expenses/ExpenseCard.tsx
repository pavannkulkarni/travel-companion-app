import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Theme } from '@/constants/theme';
import { Card } from '@/components/ui/Card';
import { ShoppingBag, Coffee, Utensils, Film, Landmark, Car } from 'lucide-react-native';
import { Expense } from '@/types';

interface ExpenseCardProps {
  expense: Expense;
}

export function ExpenseCard({ expense }: ExpenseCardProps) {
  const getExpenseIcon = () => {
    switch (expense.category) {
      case 'food':
        return <Utensils size={24} color={Theme.colors.primary[600]} />;
      case 'coffee':
        return <Coffee size={24} color={Theme.colors.accent[600]} />;
      case 'shopping':
        return <ShoppingBag size={24} color={Theme.colors.secondary[600]} />;
      case 'entertainment':
        return <Film size={24} color={Theme.colors.accent[700]} />;
      case 'sightseeing':
        return <Landmark size={24} color={Theme.colors.primary[700]} />;
      case 'transport':
        return <Car size={24} color={Theme.colors.secondary[700]} />;
      default:
        return <ShoppingBag size={24} color={Theme.colors.neutral[600]} />;
    }
  };

  return (
    <Card>
      <View style={styles.container}>
        <View style={styles.iconContainer}>{getExpenseIcon()}</View>
        <View style={styles.content}>
          <Text style={styles.title}>{expense.description}</Text>
          <Text style={styles.details}>
            {expense.groupName} • {expense.date}
          </Text>
          <View style={styles.paidByContainer}>
            <Text style={styles.paidBy}>
              Paid by {expense.paidBy.name}
            </Text>
          </View>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>₹{expense.amount.toFixed(2)}</Text>
          <Text style={styles.yourShare}>
            Your share: ₹{(expense.amount / expense.splitBetween).toFixed(2)}
          </Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 50,
    height: 50,
    backgroundColor: Theme.colors.neutral[100],
    borderRadius: Theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Theme.spacing[3],
  },
  content: {
    flex: 1,
  },
  title: {
    fontFamily: Theme.fontFamily.semiBold,
    fontSize: Theme.fontSizes.md,
    color: Theme.colors.neutral[800],
    marginBottom: Theme.spacing[1],
  },
  details: {
    fontFamily: Theme.fontFamily.regular,
    fontSize: Theme.fontSizes.sm,
    color: Theme.colors.neutral[600],
    marginBottom: Theme.spacing[1],
  },
  paidByContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paidBy: {
    fontFamily: Theme.fontFamily.medium,
    fontSize: Theme.fontSizes.sm,
    color: Theme.colors.primary[600],
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    fontFamily: Theme.fontFamily.bold,
    fontSize: Theme.fontSizes.lg,
    color: Theme.colors.neutral[800],
    marginBottom: Theme.spacing[1],
  },
  yourShare: {
    fontFamily: Theme.fontFamily.regular,
    fontSize: Theme.fontSizes.xs,
    color: Theme.colors.neutral[600],
  },
});