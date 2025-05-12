import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Theme } from '@/constants/theme';
import { Card } from '@/components/ui/Card';
import { Users, Calendar } from 'lucide-react-native';
import { TripGroup } from '@/types';

interface TripGroupCardProps {
  group: TripGroup;
  onPress: (group: TripGroup) => void;
}

export function TripGroupCard({ group, onPress }: TripGroupCardProps) {
  return (
    <Card onPress={() => onPress(group)}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{group.name}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{group.status}</Text>
          </View>
        </View>
        
        <View style={styles.details}>
          <View style={styles.detailItem}>
            <Calendar size={16} color={Theme.colors.neutral[600]} />
            <Text style={styles.detailText}>{group.date}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Users size={16} color={Theme.colors.neutral[600]} />
            <Text style={styles.detailText}>{group.members.length} members</Text>
          </View>
        </View>
        
        <View style={styles.membersContainer}>
          <View style={styles.avatarsRow}>
            {group.members.slice(0, 3).map((member, index) => (
              <Image 
                key={index}
                source={{ uri: member.avatar }} 
                style={[
                  styles.avatar, 
                  { marginLeft: index > 0 ? -10 : 0 }
                ]} 
              />
            ))}
            
            {group.members.length > 3 && (
              <View style={styles.moreAvatar}>
                <Text style={styles.moreAvatarText}>+{group.members.length - 3}</Text>
              </View>
            )}
          </View>
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Total Budget</Text>
            <Text style={styles.statValue}>₹{group.budget}</Text>
          </View>
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Spent So Far</Text>
            <Text style={styles.statValue}>₹{group.spent}</Text>
          </View>
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Remaining</Text>
            <Text style={[
              styles.statValue, 
              { color: Theme.colors.success[500] }
            ]}>₹{group.budget - group.spent}</Text>
          </View>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Theme.spacing[3],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: Theme.fontFamily.bold,
    fontSize: Theme.fontSizes.lg,
    color: Theme.colors.neutral[800],
  },
  badge: {
    backgroundColor: Theme.colors.primary[50],
    paddingVertical: Theme.spacing[1],
    paddingHorizontal: Theme.spacing[2],
    borderRadius: Theme.borderRadius.full,
  },
  badgeText: {
    fontFamily: Theme.fontFamily.medium,
    fontSize: Theme.fontSizes.xs,
    color: Theme.colors.primary[600],
  },
  details: {
    flexDirection: 'row',
    gap: Theme.spacing[4],
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing[1],
  },
  detailText: {
    fontFamily: Theme.fontFamily.regular,
    fontSize: Theme.fontSizes.sm,
    color: Theme.colors.neutral[600],
  },
  membersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatarsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: Theme.colors.white,
  },
  moreAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Theme.colors.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -10,
    borderWidth: 2,
    borderColor: Theme.colors.white,
  },
  moreAvatarText: {
    fontFamily: Theme.fontFamily.medium,
    fontSize: Theme.fontSizes.xs,
    color: Theme.colors.primary[600],
  },
  statsContainer: {
    backgroundColor: Theme.colors.neutral[100],
    padding: Theme.spacing[3],
    borderRadius: Theme.borderRadius.md,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontFamily: Theme.fontFamily.regular,
    fontSize: Theme.fontSizes.xs,
    color: Theme.colors.neutral[600],
    marginBottom: Theme.spacing[1],
  },
  statValue: {
    fontFamily: Theme.fontFamily.bold,
    fontSize: Theme.fontSizes.md,
    color: Theme.colors.neutral[800],
  },
});