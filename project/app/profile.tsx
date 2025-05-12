import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Theme } from '@/constants/theme';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Map, Calendar, User, LogIn, UserPlus, X } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  const userStats = {
    tripCount: 12,
    placesVisited: 48,
    upcomingTrips: 3,
  };

  const HeaderWithClose = () => (
    <View style={styles.modalHeader}>
      <Text style={styles.title}>Welcome to RoamWiser</Text>
      <Pressable onPress={() => router.back()}>
        <X size={24} color={Theme.colors.neutral[600]} />
      </Pressable>
    </View>
  );

  if (!isAuthenticated) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <HeaderWithClose />
          <Text style={styles.subtitle}>
            
          </Text>
        </View>

        <View style={styles.authContainer}>
          <Button
            label="Sign In"
            variant="outline"
            leftIcon={<LogIn size={20} color={Theme.colors.primary[600]} />}
            onPress={() => setIsAuthenticated(true)}
            style={styles.authButton}
          />
          <Button
            label="Create Account"
            leftIcon={<UserPlus size={20} color={Theme.colors.white} />}
            onPress={() => setIsAuthenticated(true)}
            style={styles.authButton}
          />
        </View>

        <View style={styles.featuresContainer}>
          <Text style={styles.featuresTitle}>What you'll get</Text>
          <View style={styles.featuresList}>
            <Card style={styles.featureCard}>
              <Map size={24} color={Theme.colors.primary[600]} />
              <Text style={styles.featureTitle}>Track Your Journeys</Text>
              <Text style={styles.featureDescription}>
                Keep a record of all your travels and visited places
              </Text>
            </Card>
            <Card style={styles.featureCard}>
              <Calendar size={24} color={Theme.colors.primary[600]} />
              <Text style={styles.featureTitle}>Trip Planning</Text>
              <Text style={styles.featureDescription}>
                Plan and organize your upcoming adventures
              </Text>
            </Card>
            <Card style={styles.featureCard}>
              <User size={24} color={Theme.colors.primary[600]} />
              <Text style={styles.featureTitle}>Travel Community</Text>
              <Text style={styles.featureDescription}>
                Connect with other travelers and share experiences
              </Text>
            </Card>
          </View>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.modalHeader}>
          <Text style={styles.title}>Your Travel Dashboard</Text>
          <Pressable onPress={() => router.back()}>
            <X size={24} color={Theme.colors.neutral[600]} />
          </Pressable>
        </View>
        <Text style={styles.subtitle}>Track your adventures and plan new ones</Text>
      </View>

      <Card style={styles.statsCard}>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Map size={24} color={Theme.colors.primary[600]} />
            <Text style={styles.statValue}>{userStats.tripCount}</Text>
            <Text style={styles.statLabel}>Total Trips</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <Calendar size={24} color={Theme.colors.primary[600]} />
            <Text style={styles.statValue}>{userStats.upcomingTrips}</Text>
            <Text style={styles.statLabel}>Upcoming</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statItem}>
            <User size={24} color={Theme.colors.primary[600]} />
            <Text style={styles.statValue}>{userStats.placesVisited}</Text>
            <Text style={styles.statLabel}>Places Visited</Text>
          </View>
        </View>
      </Card>

      <Button
        label="Sign Out"
        variant="outline"
        onPress={() => setIsAuthenticated(false)}
        style={styles.signOutButton}
      />
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
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  authContainer: {
    padding: Theme.spacing[4],
    gap: Theme.spacing[3],
  },
  authButton: {
    width: '100%',
  },
  featuresContainer: {
    padding: Theme.spacing[4],
  },
  featuresTitle: {
    fontFamily: Theme.fontFamily.semiBold,
    fontSize: Theme.fontSizes.lg,
    color: Theme.colors.neutral[800],
    marginBottom: Theme.spacing[3],
  },
  featuresList: {
    gap: Theme.spacing[3],
  },
  featureCard: {
    gap: Theme.spacing[2],
  },
  featureTitle: {
    fontFamily: Theme.fontFamily.semiBold,
    fontSize: Theme.fontSizes.md,
    color: Theme.colors.neutral[800],
  },
  featureDescription: {
    fontFamily: Theme.fontFamily.regular,
    fontSize: Theme.fontSizes.sm,
    color: Theme.colors.neutral[600],
  },
  statsCard: {
    margin: Theme.spacing[4],
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: Theme.spacing[2],
  },
  statItem: {
    alignItems: 'center',
    gap: Theme.spacing[2],
  },
  statValue: {
    fontFamily: Theme.fontFamily.bold,
    fontSize: Theme.fontSizes.xl,
    color: Theme.colors.neutral[800],
  },
  statLabel: {
    fontFamily: Theme.fontFamily.regular,
    fontSize: Theme.fontSizes.sm,
    color: Theme.colors.neutral[600],
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: Theme.colors.neutral[200],
  },
  signOutButton: {
    margin: Theme.spacing[4],
  },
});
