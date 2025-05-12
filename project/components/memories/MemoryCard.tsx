import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Theme } from '@/constants/theme';
import { Card } from '@/components/ui/Card';
import { Heart, MessageCircle, CalendarDays, MapPin } from 'lucide-react-native';
import { Memory } from '@/types';

interface MemoryCardProps {
  memory: Memory;
}

export function MemoryCard({ memory }: MemoryCardProps) {
  return (
    <Card style={styles.card}>
      <Image source={{ uri: memory.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{memory.title}</Text>
        
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <CalendarDays size={16} color={Theme.colors.neutral[500]} />
            <Text style={styles.infoText}>{memory.date}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <MapPin size={16} color={Theme.colors.neutral[500]} />
            <Text style={styles.infoText}>{memory.location}</Text>
          </View>
        </View>
        
        <Text style={styles.description} numberOfLines={3}>
          {memory.description}
        </Text>
        
        <View style={styles.footer}>
          <View style={styles.avatarsRow}>
            {memory.people.slice(0, 3).map((person, index) => (
              <Image 
                key={index}
                source={{ uri: person.avatar }} 
                style={[
                  styles.avatar, 
                  { marginLeft: index > 0 ? -10 : 0 }
                ]} 
              />
            ))}
            
            {memory.people.length > 3 && (
              <View style={styles.moreAvatar}>
                <Text style={styles.moreAvatarText}>+{memory.people.length - 3}</Text>
              </View>
            )}
          </View>
          
          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.actionButton}>
              <Heart 
                size={18} 
                color={memory.isLiked ? Theme.colors.error[500] : Theme.colors.neutral[500]}
                fill={memory.isLiked ? Theme.colors.error[500] : 'transparent'}
              />
              <Text style={styles.actionText}>{memory.likes}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <MessageCircle size={18} color={Theme.colors.neutral[500]} />
              <Text style={styles.actionText}>{memory.comments}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 0,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: Theme.borderRadius.lg,
    borderTopRightRadius: Theme.borderRadius.lg,
  },
  content: {
    padding: Theme.spacing[4],
  },
  title: {
    fontFamily: Theme.fontFamily.bold,
    fontSize: Theme.fontSizes.xl,
    color: Theme.colors.neutral[800],
    marginBottom: Theme.spacing[3],
  },
  infoContainer: {
    gap: Theme.spacing[2],
    marginBottom: Theme.spacing[3],
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing[2],
  },
  infoText: {
    fontFamily: Theme.fontFamily.regular,
    fontSize: Theme.fontSizes.sm,
    color: Theme.colors.neutral[600],
  },
  description: {
    fontFamily: Theme.fontFamily.regular,
    fontSize: Theme.fontSizes.md,
    color: Theme.colors.neutral[700],
    marginBottom: Theme.spacing[3],
    lineHeight: 22,
  },
  footer: {
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
  actionsRow: {
    flexDirection: 'row',
    gap: Theme.spacing[3],
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing[1],
  },
  actionText: {
    fontFamily: Theme.fontFamily.regular,
    fontSize: Theme.fontSizes.sm,
    color: Theme.colors.neutral[600],
  },
});