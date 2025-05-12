import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { getDistance } from 'geolib';

interface FetchNearbyPlacesParams {
  latitude: number;
  longitude: number;
  type: string;
  minRating: number;
}

export async function fetchNearbyPlaces({
  latitude,
  longitude,
  type,
  minRating,
}: FetchNearbyPlacesParams) {
  if (!latitude || !longitude) {
    throw new Error('Invalid coordinates provided');
  }

  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    type: type,
    minRating: minRating.toString(),
  });

  const url = `${process.env.EXPO_PUBLIC_SUPABASE_URL}/functions/v1/places?${params}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY}`,
      },
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Response:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }
    
    const places = await response.json();

    if (Array.isArray(places)) {
      return places.map(place => {
        // Calculate distance from current location
        const distance = getDistance(
          { latitude, longitude },
          { latitude: place.latitude, longitude: place.longitude }
        );

        return {
          ...place,
          distance, // Distance in meters
          reviews: place.reviews || [],
          fullAddress: place.fullAddress || place.location,
        };
      });
    } else if (places.error) {
      throw new Error(places.error);
    } else {
      throw new Error('Invalid response format from places API');
    }
  } catch (error) {
    console.error('Full error object:', error);
    
    const errorMessage = error instanceof Error 
      ? `Error fetching nearby places: ${error.message}`
      : 'An unknown error occurred while fetching nearby places';
    
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error('Network error: Unable to connect to Places API. Please check your internet connection and try again.');
    }
    
    throw new Error(errorMessage);
  }
}