import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Theme } from '@/constants/theme';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useRouter } from 'expo-router';
import { mockTripGroups } from '@/data/mockData';
import { ShoppingBag, Coffee, Utensils, Film, Landmark, Car, Check } from 'lucide-react-native';
import { Expense, User } from '@/types';

const categories = [
  { id: 'food', icon: Utensils, label: 'Food' },
  { id: 'coffee', icon: Coffee, label: 'Coffee' },
  { id: 'shopping', icon: ShoppingBag, label: 'Shopping' },
  { id: 'entertainment', icon: Film, label: 'Entertainment' },
  { id: 'sightseeing', icon: Landmark, label: 'Sightseeing' },
  { id: 'transport', icon: Car, label: 'Transport' },
] as const;

export default function NewExpenseScreen() {
  const router = useRouter();
  const [selectedGroup, setSelectedGroup] = useState(mockTripGroups[0]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<typeof categories[number]['id']>('food');
  const [excludedMembers, setExcludedMembers] = useState<string[]>([]);

  const handleExcludeMember = (memberId: string) => {
    setExcludedMembers(prev =>
      prev.includes(memberId)
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    );
  };

  const handleSubmit = () => {
    if (!description || !amount || !category) return;

    const includedMembers = selectedGroup.members.filter(
      member => !excludedMembers.includes(member.id)
    );

    const newExpense: Expense = {
      id: Date.now().toString(),
      groupId: selectedGroup.id,
      groupName: selectedGroup.name,
      description,
      amount: parseFloat(amount),
      category,
      date: new Date().toLocaleDateString(),
      paidBy: selectedGroup.members[0],
      splitBetween: includedMembers.length,
    };

    // Here you would typically save the expense
    console.log('New expense:', newExpense);
    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Add New Expense</Text>
        <Text style={styles.subtitle}>Track your spending with your group</Text>
      </View>

      <View style={styles.content}>
        <Card>
          <Text style={styles.sectionTitle}>Trip Group</Text>
          <Text style={styles.groupName}>{selectedGroup.name}</Text>
        </Card>

        <Card>
          <View style={styles.field}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={styles.input}
              value={description}
              onChangeText={setDescription}
              placeholder="What did you spend on?"
              placeholderTextColor={Theme.colors.neutral[400]}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Amount (₹)</Text>
            <TextInput
              style={styles.input}
              value={amount}
              onChangeText={setAmount}
              placeholder="0.00"
              keyboardType="numeric"
              placeholderTextColor={Theme.colors.neutral[400]}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Category</Text>
            <View style={styles.categories}>
              {categories.map(cat => (
                <TouchableOpacity
                  key={cat.id}
                  style={[
                    styles.categoryButton,
                    category === cat.id && styles.categoryButtonActive,
                  ]}
                  onPress={() => setCategory(cat.id)}>
                  <cat.icon
                    size={24}
                    color={
                      category === cat.id
                        ? Theme.colors.white
                        : Theme.colors.neutral[600]
                    }
                  />
                  <Text
                    style={[
                      styles.categoryLabel,
                      category === cat.id && styles.categoryLabelActive,
                    ]}>
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>Split Between</Text>
          <Text style={styles.subtitle}>
            Tap to exclude members from this expense
          </Text>

          <View style={styles.membersList}>
            {selectedGroup.members.map(member => (
              <TouchableOpacity
                key={member.id}
                style={[
                  styles.memberItem,
                  excludedMembers.includes(member.id) && styles.memberItemExcluded,
                ]}
                onPress={() => handleExcludeMember(member.id)}>
                <Text
                  style={[
                    styles.memberName,
                    excludedMembers.includes(member.id) &&
                      styles.memberNameExcluded,
                  ]}>
                  {member.name}
                </Text>
                {!excludedMembers.includes(member.id) && (
                  <Check size={16} color={Theme.colors.success[500]} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        <View style={styles.buttonContainer}>
          <Button
            label="Cancel"
            variant="outline"
            onPress={() => router.back()}
            style={styles.button}
          />
          <Button
            label="Add Expense"
            onPress={handleSubmit}
            style={styles.button}
          />
        </View>
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
  sectionTitle: {
    fontFamily: Theme.fontFamily.semiBold,
    fontSize: Theme.fontSizes.lg,
    color: Theme.colors.neutral[800],
    marginBottom: Theme.spacing[2],
  },
  groupName: {
    fontFamily: Theme.fontFamily.medium,
    fontSize: Theme.fontSizes.md,
    color: Theme.colors.primary[600],
  },
  field: {
    marginBottom: Theme.spacing[4],
  },
  label: {
    fontFamily: Theme.fontFamily.medium,
    fontSize: Theme.fontSizes.sm,
    color: Theme.colors.neutral[700],
    marginBottom: Theme.spacing[2],
  },
  input: {
    borderWidth: 1,
    borderColor: Theme.colors.neutral[300],
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing[3],
    fontFamily: Theme.fontFamily.regular,
    fontSize: Theme.fontSizes.md,
    color: Theme.colors.neutral[800],
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing[2],
  },
  categoryButton: {
    flex: 1,
    minWidth: '30%',
    alignItems: 'center',
    padding: Theme.spacing[3],
    borderRadius: Theme.borderRadius.md,
    backgroundColor: Theme.colors.neutral[100],
  },
  categoryButtonActive: {
    backgroundColor: Theme.colors.primary[600],
  },
  categoryLabel: {
    fontFamily: Theme.fontFamily.medium,
    fontSize: Theme.fontSizes.sm,
    color: Theme.colors.neutral[700],
    marginTop: Theme.spacing[1],
  },
  categoryLabelActive: {
    color: Theme.colors.white,
  },
  membersList: {
    marginTop: Theme.spacing[2],
    gap: Theme.spacing[2],
  },
  memberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Theme.spacing[3],
    backgroundColor: Theme.colors.neutral[100],
    borderRadius: Theme.borderRadius.md,
  },
  memberItemExcluded: {
    backgroundColor: Theme.colors.neutral[200],
    opacity: 0.6,
  },
  memberName: {
    fontFamily: Theme.fontFamily.medium,
    fontSize: Theme.fontSizes.md,
    color: Theme.colors.neutral[800],
  },
  memberNameExcluded: {
    color: Theme.colors.neutral[500],
    textDecorationLine: 'line-through',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: Theme.spacing[3],
    marginTop: Theme.spacing[4],
  },
  button: {
    flex: 1,
  },
});