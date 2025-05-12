import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Theme } from '@/constants/theme';
import { MapPin, Star, X } from 'lucide-react-native';
import { Place } from '@/types';
import { ImageCarousel } from '@/components/ui/ImageCarousel';
import { Button } from '@/components/ui/Button';

interface PlaceDetailsProps {
  place: Place;
  onClose: () => void;
  onOpenMaps: () => void;
}

export function PlaceDetails({ place, onClose, onOpenMaps }: PlaceDetailsProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <X size={24} color={Theme.colors.neutral[500]} />
      </TouchableOpacity>

      {place.images && place.images.length > 0 && (
        <ImageCarousel
          images={place.images}
          height={250}
          borderRadius={Theme.borderRadius.xl}
          showArrows={true}
          enableFullscreen={true}
          autoplay={true}
        />
      )}

      <ScrollView style={styles.content}>
        <Text style={styles.title}>{place.name}</Text>

        <View style={styles.ratingContainer}>
          <Star size={20} color={Theme.colors.accent[500]} fill={Theme.colors.accent[500]} />
          <Text style={styles.rating}>
            {place.rating} ({place.reviewCount} reviews)
          </Text>
        </View>

        <View style={styles.addressContainer}>
          <MapPin size={20} color={Theme.colors.neutral[500]} />
          <Text style={styles.address}>{place.fullAddress}</Text>
        </View>

        {place.reviews && place.reviews.length > 0 && (
          <View style={styles.reviewsSection}>
            <Text style={styles.reviewsTitle}>Reviews</Text>
            {place.reviews.map((review, index) => (
              <View key={index} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  {review.profile_photo_url && (
                    <Image
                      source={{ uri: review.profile_photo_url }}
                      style={styles.reviewerImage}
                    />
                  )}
                  <View style={styles.reviewerInfo}>
                    <Text style={styles.reviewerName}>{review.author_name}</Text>
                    <Text style={styles.reviewTime}>{review.relative_time_description}</Text>
                  </View>
                  <View style={styles.reviewRating}>
                    <Star size={16} color={Theme.colors.accent[500]} fill={Theme.colors.accent[500]} />
                    <Text style={styles.reviewRatingText}>{review.rating}</Text>
                  </View>
                </View>
                <Text style={styles.reviewText}>{review.text}</Text>
              </View>
            ))}
          </View>
        )}

        <Button
          label="Open in Maps"
          onPress={onOpenMaps}
          style={styles.mapsButton}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.white,
  },
  closeButton: {
    position: 'absolute',
    right: Theme.spacing[4],
    top: Theme.spacing[4],
    zIndex: 1,
    backgroundColor: Theme.colors.white,
    borderRadius: Theme.borderRadius.full,
    padding: Theme.spacing[2],
  },
  content: {
    flex: 1,
    padding: Theme.spacing[4],
  },
  title: {
    fontFamily: Theme.fontFamily.bold,
    fontSize: Theme.fontSizes['2xl'],
    color: Theme.colors.neutral[800],
    marginBottom: Theme.spacing[3],
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing[3],
  },
  rating: {
    fontFamily: Theme.fontFamily.medium,
    fontSize: Theme.fontSizes.md,
    color: Theme.colors.neutral[700],
    marginLeft: Theme.spacing[2],
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Theme.spacing[4],
  },
  address: {
    fontFamily: Theme.fontFamily.regular,
    fontSize: Theme.fontSizes.md,
    color: Theme.colors.neutral[600],
    marginLeft: Theme.spacing[2],
    flex: 1,
  },
  reviewsSection: {
    marginBottom: Theme.spacing[4],
  },
  reviewsTitle: {
    fontFamily: Theme.fontFamily.bold,
    fontSize: Theme.fontSizes.xl,
    color: Theme.colors.neutral[800],
    marginBottom: Theme.spacing[3],
  },
  reviewCard: {
    backgroundColor: Theme.colors.neutral[50],
    padding: Theme.spacing[4],
    borderRadius: Theme.borderRadius.lg,
    marginBottom: Theme.spacing[3],
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing[2],
  },
  reviewerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: Theme.spacing[2],
  },
  reviewerInfo: {
    flex: 1,
  },
  reviewerName: {
    fontFamily: Theme.fontFamily.semiBold,
    fontSize: Theme.fontSizes.md,
    color: Theme.colors.neutral[800],
  },
  reviewTime: {
    fontFamily: Theme.fontFamily.regular,
    fontSize: Theme.fontSizes.sm,
    color: Theme.colors.neutral[500],
  },
  reviewRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewRatingText: {
    fontFamily: Theme.fontFamily.semiBold,
    fontSize: Theme.fontSizes.md,
    color: Theme.colors.neutral[800],
    marginLeft: Theme.spacing[1],
  },
  reviewText: {
    fontFamily: Theme.fontFamily.regular,
    fontSize: Theme.fontSizes.md,
    color: Theme.colors.neutral[700],
    lineHeight: 24,
  },
  mapsButton: {
    marginTop: Theme.spacing[4],
  },
});