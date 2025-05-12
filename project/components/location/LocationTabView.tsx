import React from 'react';
import { View, StyleSheet, ActivityIndicator, Button } from 'react-native';
import { PlaceCard } from './PlaceCard';
import { Theme } from '@/constants/theme';
import { Place } from '@/types';

interface LocationTabViewProps {
  activeTab: 'places' | 'restaurants' | 'pubs';
  places: Place[];
  loading: boolean;
}

export function LocationTabView({ places, loading }: LocationTabViewProps) {
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Theme.colors.primary[600]} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {places.map((place, index) => (
        <View key={place.id || index} style={styles.placeCardContainer}>
          <PlaceCard place={place} />
          <Button 
            title="View Details"
            color={Theme.colors.primary[600]}
            onPress={() => handleViewDetails(place)}
          />
        </View>
      ))}
    </View>
  );
}

// This function will handle clicking the View Details button
function handleViewDetails(place: Place) {
  // You can navigate to another screen, or open a modal, etc.
  console.log('View details for:', place.name);
  // Example: navigation.navigate('PlaceDetails', { place });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: Theme.spacing[4],
    paddingBottom: Theme.spacing[10],
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Theme.spacing[4],
  },
  placeCardContainer: {
    gap: Theme.spacing[2], // Space between card and button
  },
});
