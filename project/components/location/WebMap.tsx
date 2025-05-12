import React, { useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { Loader } from '@googlemaps/js-api-loader';
import Constants from 'expo-constants';
import { Theme } from '@/constants/theme';
import { Place } from '@/types';

interface WebMapProps {
  latitude: number;
  longitude: number;
  places: Place[];
}

export function WebMap({ latitude, longitude, places }: WebMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const apiKey = Constants.expoConfig?.extra?.googleMapsApiKey;

  useEffect(() => {
    if (!mapRef.current || !apiKey) return;

    const loader = new Loader({
      apiKey,
      version: 'weekly',
    });

    loader.load().then(() => {
      const map = new google.maps.Map(mapRef.current!, {
        center: { lat: latitude, lng: longitude },
        zoom: 13,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }],
          },
        ],
      });

      // Add markers for each place
      places.forEach((place) => {
        const marker = new google.maps.Marker({
          position: { lat: place.latitude, lng: place.longitude },
          map,
          title: place.name,
        });

        // Add info window
        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div style="padding: 8px;">
              <h3 style="margin: 0 0 8px 0; font-family: sans-serif;">${place.name}</h3>
              <p style="margin: 0; font-family: sans-serif;">Rating: ${place.rating} ⭐️</p>
            </div>
          `,
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });
      });
    });
  }, [latitude, longitude, places, apiKey]);

  return <View style={styles.container} ref={mapRef as any} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: Theme.colors.neutral[100],
  },
});