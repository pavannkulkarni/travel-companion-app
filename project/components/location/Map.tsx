import React from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import { Place } from '@/types';
import { WebMap } from './WebMap';

interface MapProps {
  latitude: number;
  longitude: number;
  places: Place[];
}

export function Map({ latitude, longitude, places }: MapProps) {
  if (Platform.OS === 'web') {
    return (
      <WebMap
        latitude={latitude}
        longitude={longitude}
        places={places}
      />
    );
  }

  return (
    <View style={styles.map}>
      <Text>Maps are only available on web platform</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});