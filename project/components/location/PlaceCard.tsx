import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Theme } from '@/constants/theme';
import { MapPin, Star } from 'lucide-react-native';
import { Card } from '@/components/ui/Card';
import { Place } from '@/types';
import { ImageCarousel } from '@/components/ui/ImageCarousel';

interface PlaceCardProps {
  place: Place;
  onViewDetails: (place: Place) => void;
}

export function PlaceCard({ place, onViewDetails }: PlaceCardProps) {
  const formatDistance = (meters: number) => {
    if (meters < 1000) {
      return `${meters}m`;
    }
    return `${(meters / 1000).toFixed(1)}km`;
  };

  return (
    <Card style={styles.card}>
      {place.images && place.images.length > 0 ? (
        <ImageCarousel
          images={place.images}
          height={200}
          borderRadius={Theme.borderRadius.lg}
          enableFullscreen={true}
          autoplay={true}
        />
      ) : null}
      
      <View style={styles.content}>
        <Text style={styles.title}>{place.name}</Text>

        <View style={styles.locationRow}>
          <MapPin size={16} color={Theme.colors.neutral[500]} />
          <Text style={styles.location}>{place.location}</Text>
          {place.distance && (
            <Text style={styles.distance}>
              {formatDistance(place.distance)}
            </Text>
          )}
        </View>

        <View style={styles.ratingRow}>
          <View style={styles.ratingContainer}>
            <Star size={16} color={Theme.colors.accent[500]} fill={Theme.colors.accent[500]} />
            <Text style={styles.rating}>{place.rating} ({place.reviewCount})</Text>
          </View>

          {place.openNow !== undefined && (
            <Text style={[styles.status, { color: place.openNow ? Theme.colors.success[500] : Theme.colors.error[500] }]}>
              {place.openNow ? '● Open' : '● Closed'}
            </Text>
          )}
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => onViewDetails(place)}>
          <Text style={styles.buttonText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 0,
    overflow: 'hidden',
    marginBottom: Theme.spacing[4],
  },
  content: {
    padding: Theme.spacing[4],
  },
  title: {
    fontFamily: Theme.fontFamily.bold,
    fontSize: Theme.fontSizes.lg,
    color: Theme.colors.neutral[800],
    marginBottom: Theme.spacing[2],
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing[2],
  },
  location: {
    fontFamily: Theme.fontFamily.regular,
    fontSize: Theme.fontSizes.sm,
    color: Theme.colors.neutral[600],
    marginLeft: Theme.spacing[2],
    flex: 1,
  },
  distance: {
    fontFamily: Theme.fontFamily.medium,
    fontSize: Theme.fontSizes.sm,
    color: Theme.colors.primary[600],
    marginLeft: Theme.spacing[2],
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Theme.spacing[3],
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontFamily: Theme.fontFamily.medium,
    fontSize: Theme.fontSizes.sm,
    color: Theme.colors.neutral[700],
    marginLeft: Theme.spacing[1],
  },
  status: {
    fontFamily: Theme.fontFamily.medium,
    fontSize: Theme.fontSizes.sm,
  },
  button: {
    backgroundColor: Theme.colors.primary[600],
    paddingVertical: Theme.spacing[3],
    borderRadius: Theme.borderRadius.md,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: Theme.fontFamily.semiBold,
    fontSize: Theme.fontSizes.md,
    color: Theme.colors.white,
  },
});