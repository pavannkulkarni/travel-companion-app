import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Platform, TouchableOpacity, FlatList } from 'react-native';
import { Theme } from '@/constants/theme';
import { Button } from '@/components/ui/Button';
import { TripGroup, User } from '@/types';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { Calendar, Search, Plus, X } from 'lucide-react-native';
import { mockUsers } from '@/data/mockData';

interface GroupFormProps {
  onSubmit: (group: Partial<TripGroup>) => void;
  onCancel: () => void;
  initialData?: TripGroup;
}

export function GroupForm({ onSubmit, onCancel, initialData }: GroupFormProps) {
  const [name, setName] = useState(initialData?.name || '');
  const [budget, setBudget] = useState(initialData?.budget?.toString() || '');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMembers, setSelectedMembers] = useState<User[]>(initialData?.members || []);

  const filteredUsers = mockUsers.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    !selectedMembers.some(member => member.id === user.id)
  );

  const handleStartDateChange = (event: any, selectedDate?: Date) => {
    setShowStartDatePicker(false);
    if (selectedDate) {
      setStartDate(selectedDate);
      if (selectedDate > endDate) {
        setEndDate(selectedDate);
      }
    }
  };

  const handleEndDateChange = (event: any, selectedDate?: Date) => {
    setShowEndDatePicker(false);
    if (selectedDate) {
      setEndDate(selectedDate);
    }
  };

  const handleAddMember = (user: User) => {
    setSelectedMembers([...selectedMembers, user]);
    setSearchQuery('');
  };

  const handleRemoveMember = (userId: string) => {
    setSelectedMembers(selectedMembers.filter(member => member.id !== userId));
  };

  const handleSubmit = () => {
    if (!name || !budget || selectedMembers.length === 0) {
      return;
    }

    const groupData: Partial<TripGroup> = {
      name,
      budget: parseFloat(budget),
      date: `${format(startDate, 'MMM d')} - ${format(endDate, 'MMM d, yyyy')}`,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      status: 'Upcoming',
      spent: 0,
      members: selectedMembers,
    };

    onSubmit(groupData);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        {initialData ? 'Edit Group' : 'Create New Group'}
      </Text>

      <View style={styles.form}>
        <View style={styles.field}>
          <Text style={styles.label}>Group Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter group name"
            placeholderTextColor={Theme.colors.neutral[400]}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Budget (₹)</Text>
          <TextInput
            style={styles.input}
            value={budget}
            onChangeText={setBudget}
            placeholder="Enter budget amount"
            placeholderTextColor={Theme.colors.neutral[400]}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Start Date</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowStartDatePicker(true)}
          >
            <Calendar size={20} color={Theme.colors.neutral[500]} />
            <Text style={styles.dateButtonText}>
              {format(startDate, 'MMM d, yyyy')}
            </Text>
          </TouchableOpacity>
          {showStartDatePicker && (
            <DateTimePicker
              value={startDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleStartDateChange}
              minimumDate={new Date()}
            />
          )}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>End Date</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowEndDatePicker(true)}
          >
            <Calendar size={20} color={Theme.colors.neutral[500]} />
            <Text style={styles.dateButtonText}>
              {format(endDate, 'MMM d, yyyy')}
            </Text>
          </TouchableOpacity>
          {showEndDatePicker && (
            <DateTimePicker
              value={endDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleEndDateChange}
              minimumDate={startDate}
            />
          )}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Add Members</Text>
          <View style={styles.searchContainer}>
            <Search size={20} color={Theme.colors.neutral[500]} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search members"
              placeholderTextColor={Theme.colors.neutral[400]}
            />
          </View>

          {searchQuery.length > 0 && (
            <View style={styles.searchResults}>
              {filteredUsers.map(user => (
                <TouchableOpacity
                  key={user.id}
                  style={styles.searchResultItem}
                  onPress={() => handleAddMember(user)}
                >
                  <View style={styles.userInfo}>
                    <Text style={styles.userName}>{user.name}</Text>
                  </View>
                  <Plus size={20} color={Theme.colors.primary[600]} />
                </TouchableOpacity>
              ))}
            </View>
          )}

          <View style={styles.selectedMembers}>
            {selectedMembers.map(member => (
              <View key={member.id} style={styles.memberChip}>
                <Text style={styles.memberName}>{member.name}</Text>
                <TouchableOpacity onPress={() => handleRemoveMember(member.id)}>
                  <X size={16} color={Theme.colors.neutral[500]} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.buttons}>
          <Button
            label="Cancel"
            onPress={onCancel}
            variant="outline"
            style={styles.button}
          />
          <Button
            label={initialData ? 'Save Changes' : 'Create Group'}
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
    backgroundColor: Theme.colors.white,
  },
  title: {
    fontFamily: Theme.fontFamily.bold,
    fontSize: Theme.fontSizes.xl,
    color: Theme.colors.neutral[800],
    marginBottom: Theme.spacing[4],
    paddingHorizontal: Theme.spacing[4],
    paddingTop: Theme.spacing[4],
  },
  form: {
    padding: Theme.spacing[4],
    gap: Theme.spacing[4],
  },
  field: {
    gap: Theme.spacing[2],
  },
  label: {
    fontFamily: Theme.fontFamily.medium,
    fontSize: Theme.fontSizes.sm,
    color: Theme.colors.neutral[700],
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
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Theme.colors.neutral[300],
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing[3],
    gap: Theme.spacing[2],
  },
  dateButtonText: {
    fontFamily: Theme.fontFamily.regular,
    fontSize: Theme.fontSizes.md,
    color: Theme.colors.neutral[800],
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Theme.colors.neutral[300],
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing[3],
  },
  searchIcon: {
    marginRight: Theme.spacing[2],
  },
  searchInput: {
    flex: 1,
    fontFamily: Theme.fontFamily.regular,
    fontSize: Theme.fontSizes.md,
    color: Theme.colors.neutral[800],
  },
  searchResults: {
    marginTop: Theme.spacing[2],
    backgroundColor: Theme.colors.white,
    borderRadius: Theme.borderRadius.md,
    borderWidth: 1,
    borderColor: Theme.colors.neutral[200],
  },
  searchResultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Theme.spacing[3],
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.neutral[200],
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontFamily: Theme.fontFamily.medium,
    fontSize: Theme.fontSizes.md,
    color: Theme.colors.neutral[800],
  },
  selectedMembers: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing[2],
    marginTop: Theme.spacing[2],
  },
  memberChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.primary[50],
    paddingVertical: Theme.spacing[1],
    paddingHorizontal: Theme.spacing[2],
    borderRadius: Theme.borderRadius.full,
    gap: Theme.spacing[1],
  },
  memberName: {
    fontFamily: Theme.fontFamily.medium,
    fontSize: Theme.fontSizes.sm,
    color: Theme.colors.primary[600],
  },
  buttons: {
    flexDirection: 'row',
    gap: Theme.spacing[3],
    marginTop: Theme.spacing[4],
  },
  button: {
    flex: 1,
  },
});