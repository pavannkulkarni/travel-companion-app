import { Header } from '@/components/ui/Header';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Modal, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Theme } from '@/constants/theme';
import { Plus, Users, FileText, Wallet, ChevronRight } from 'lucide-react-native';
import { Card } from '@/components/ui/Card';
import { ExpenseCard } from '@/components/expenses/ExpenseCard';
import { TripGroupCard } from '@/components/expenses/TripGroupCard';
import { GroupForm } from '@/components/expenses/GroupForm';
import { mockExpenses } from '@/data/mockData';
import { TripGroup } from '@/types';
import { useRouter } from 'expo-router';

const STORAGE_KEY = '@trip_groups';

export default function ExpensesScreen() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<'groups' | 'expenses' | 'wallet'>('groups');
  const [showGroupForm, setShowGroupForm] = useState(false);
  const [groups, setGroups] = useState<TripGroup[]>([]);

  useEffect(() => {
    loadGroups();
  }, []);

  const loadGroups = async () => {
    try {
      const storedGroups = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedGroups) {
        setGroups(JSON.parse(storedGroups));
      }
    } catch (error) {
      console.error('Error loading groups:', error);
    }
  };

  const handleCreateGroup = async (groupData: Partial<TripGroup>) => {
    try {
      const newGroup = {
        ...groupData,
        id: Date.now().toString(),
      } as TripGroup;

      const updatedGroups = [newGroup, ...groups];
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedGroups));
      setGroups(updatedGroups);
      setShowGroupForm(false);
    } catch (error) {
      console.error('Error saving group:', error);
    }
  };

  const handleGroupPress = (group: TripGroup) => {
    router.push(`/group/${group.id}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Header />
        <Text style={styles.title}>Expenses</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabsContainer}
        contentContainerStyle={styles.tabs}
      >
        <TouchableOpacity 
          style={[styles.tabItem, activeSection === 'groups' && styles.activeTabItem]}
          onPress={() => setActiveSection('groups')}
        >
          <Users size={16} color={activeSection === 'groups' ? Theme.colors.primary[600] : Theme.colors.neutral[500]} />
          <Text style={[styles.tabText, activeSection === 'groups' && styles.activeTabText]}>
            Groups
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tabItem, activeSection === 'expenses' && styles.activeTabItem]}
          onPress={() => setActiveSection('expenses')}
        >
          <FileText size={16} color={activeSection === 'expenses' ? Theme.colors.primary[600] : Theme.colors.neutral[500]} />
          <Text style={[styles.tabText, activeSection === 'expenses' && styles.activeTabText]}>
            Expenses
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tabItem, activeSection === 'wallet' && styles.activeTabItem]}
          onPress={() => setActiveSection('wallet')}
        >
          <Wallet size={16} color={activeSection === 'wallet' ? Theme.colors.primary[600] : Theme.colors.neutral[500]} />
          <Text style={[styles.tabText, activeSection === 'wallet' && styles.activeTabText]}>
            Wallet
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeSection === 'groups' && (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Trip Groups</Text>
              <TouchableOpacity 
                style={styles.addButton}
                onPress={() => setShowGroupForm(true)}
              >
                <Plus size={30} color={Theme.colors.white} />
              </TouchableOpacity>
            </View>
            <View style={styles.groupsList}>
              {groups.map((group) => (
                <TripGroupCard 
                  key={group.id} 
                  group={group}
                  onPress={handleGroupPress}
                />
              ))}
            </View>
          </>
        )}

        {activeSection === 'expenses' && (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Expenses</Text>
              <TouchableOpacity 
                style={styles.addButton}
                onPress={() => router.push('/expenses/new')}
              >
                <Plus size={20} color={Theme.colors.white} />
              </TouchableOpacity>
            </View>
            <View style={styles.expensesList}>
              {mockExpenses.map((expense) => (
                <ExpenseCard 
                  key={expense.id} 
                  expense={expense}
                  onPress={() => router.push(`/expenses/${expense.id}`)}
                />
              ))}
            </View>
          </>
        )}

        {activeSection === 'wallet' && (
          <>
            <Card style={styles.walletCard}>
              <Text style={styles.walletTitle}>Trip Wallet</Text>
              <Text style={styles.walletBalance}>₹1,250.00</Text>
              <View style={styles.walletActions}>
                <TouchableOpacity
                  style={[styles.walletButton, styles.walletButtonOutline]}
                  onPress={() => router.push('/wallet/add-money')}
                >
                  <Text style={styles.walletButtonOutlineText}>Add Money</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.walletButton, styles.walletButtonPrimary]}
                  onPress={() => router.push('/wallet/transfer')}
                >
                  <Text style={styles.walletButtonPrimaryText}>Transfer</Text>
                </TouchableOpacity>
              </View>
            </Card>

            <View style={styles.transactionsHeader}>
              <Text style={styles.transactionsTitle}>Recent Transactions</Text>
              <TouchableOpacity 
                style={styles.viewAllButton}
                onPress={() => router.push('/wallet/transactions')}
              >
                <Text style={styles.viewAllText}>View All</Text>
                <ChevronRight size={16} color={Theme.colors.primary[600]} />
              </TouchableOpacity>
            </View>

            <Card>
              <Text style={styles.transactionItem}>
                <Text style={[styles.transactionAmount, styles.positiveAmount]}>+ ₹200.00</Text> from John for Europe Trip
              </Text>
              <Text style={styles.transactionDate}>June 15, 2025</Text>
            </Card>
            <Card>
              <Text style={styles.transactionItem}>
                <Text style={[styles.transactionAmount, styles.negativeAmount]}>- ₹45.60</Text> to Restaurant Bill Split
              </Text>
              <Text style={styles.transactionDate}>June 12, 2025</Text>
            </Card>
          </>
        )}
      </ScrollView>

      <Modal
        visible={showGroupForm}
        animationType="slide"
        onRequestClose={() => setShowGroupForm(false)}
      >
        <GroupForm
          onSubmit={handleCreateGroup}
          onCancel={() => setShowGroupForm(false)}
        />
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.neutral[50],
  },
  header: {
    paddingHorizontal: Theme.spacing[2],
    paddingTop: Platform.OS === 'ios' ? Theme.spacing[2] : Theme.spacing[2],
    paddingBottom: Theme.spacing[1],
    backgroundColor: Theme.colors.white,
  },
  title: {
    fontFamily: Theme.fontFamily.bold,
    fontSize: Theme.fontSizes['2xl'],
    color: Theme.colors.neutral[800],
    marginBottom: Theme.spacing[1],
    marginTop: Theme.spacing[2]
  },
  subtitle: {
    fontFamily: Theme.fontFamily.regular,
    fontSize: Theme.fontSizes.md,
    color: Theme.colors.neutral[600],
  },
  tabsContainer: {
    backgroundColor: Theme.colors.white,
    maxHeight: 40,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: Theme.spacing[1],
    paddingVertical: Theme.spacing[1],
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.neutral[200],
  },
  tabItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Theme.spacing[1],
    paddingHorizontal: Theme.spacing[5],
    marginRight: Theme.spacing[2],
    borderRadius: Theme.borderRadius.full,
    backgroundColor: Theme.colors.neutral[100],
  },
  activeTabItem: {
    backgroundColor: Theme.colors.primary[50],
  },
  tabText: {
    fontFamily: Theme.fontFamily.medium,
    fontSize: Theme.fontSizes.xs,
    marginLeft: Theme.spacing[1],
    color: Theme.colors.neutral[600],
  },
  activeTabText: {
    color: Theme.colors.primary[600],
  },
  content: {
    flex: 1,
    padding: Theme.spacing[4],
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing[4],
  },
  sectionTitle: {
    fontFamily: Theme.fontFamily.semiBold,
    fontSize: Theme.fontSizes.lg,
    color: Theme.colors.neutral[800],
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Theme.colors.primary[600],
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: Theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  groupsList: {
    gap: Theme.spacing[3],
    marginBottom: Theme.spacing[10],
  },
  expensesList: {
    gap: Theme.spacing[3],
    marginBottom: Theme.spacing[10],
  },
  walletCard: {
    marginBottom: Theme.spacing[4],
  },
  walletTitle: {
    fontFamily: Theme.fontFamily.semiBold,
    fontSize: Theme.fontSizes.lg,
    color: Theme.colors.neutral[800],
    marginBottom: Theme.spacing[2],
  },
  walletBalance: {
    fontFamily: Theme.fontFamily.bold,
    fontSize: Theme.fontSizes['3xl'],
    color: Theme.colors.primary[600],
    marginBottom: Theme.spacing[4],
  },
  walletActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Theme.spacing[3],
  },
  walletButton: {
    flex: 1,
    paddingVertical: Theme.spacing[2],
    borderRadius: Theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  walletButtonOutline: {
    backgroundColor: Theme.colors.white,
    borderWidth: 1,
    borderColor: Theme.colors.primary[600],
  },
  walletButtonPrimary: {
    backgroundColor: Theme.colors.primary[600],
  },
  walletButtonOutlineText: {
    fontFamily: Theme.fontFamily.medium,
    fontSize: Theme.fontSizes.sm,
    color: Theme.colors.primary[600],
  },
  walletButtonPrimaryText: {
    fontFamily: Theme.fontFamily.medium,
    fontSize: Theme.fontSizes.sm,
    color: Theme.colors.white,
  },
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing[3],
  },
  transactionsTitle: {
    fontFamily: Theme.fontFamily.semiBold,
    fontSize: Theme.fontSizes.lg,
    color: Theme.colors.neutral[800],
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing[1],
  },
  viewAllText: {
    fontFamily: Theme.fontFamily.medium,
    fontSize: Theme.fontSizes.sm,
    color: Theme.colors.primary[600],
  },
  transactionItem: {
    fontFamily: Theme.fontFamily.medium,
    fontSize: Theme.fontSizes.md,
    color: Theme.colors.neutral[800],
    marginBottom: Theme.spacing[1],
  },
  transactionAmount: {
    fontFamily: Theme.fontFamily.semiBold,
  },
  positiveAmount: {
    color: Theme.colors.success[500],
  },
  negativeAmount: {
    color: Theme.colors.error[500],
  },
  transactionDate: {
    fontFamily: Theme.fontFamily.regular,
    fontSize: Theme.fontSizes.sm,
    color: Theme.colors.neutral[500],
  },
});