import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity, Modal } from 'react-native';
import { Theme } from '@/constants/theme';
import { User } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export function Header() {
  const router = useRouter();
  const [showProfileModal, setShowProfileModal] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.logo}>RoamWiser</Text>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => router.push('/profile')}
        >
          <User size={24} color={Theme.colors.primary[600]} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.neutral[200],
    paddingTop: Platform.OS === 'ios' ? 44 : 0,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Theme.spacing[0],
    paddingVertical: Theme.spacing[3],
  },
  logo: {
    fontFamily: Theme.fontFamily.bold,
    fontSize: Theme.fontSizes.xl,
    color: Theme.colors.primary[600],
  },
  profileButton: {
    padding: Theme.spacing[2],
    borderRadius: Theme.borderRadius.full,
    backgroundColor: Theme.colors.primary[50],
  },
});