import { Header } from '@/components/ui/Header';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Linking,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { Theme } from '@/constants/theme';
import { MapPin, Info } from 'lucide-react-native';
import * as Location from 'expo-location';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Place } from '@/types';
import { fetchNearbyPlaces } from '@/utils/googlePlaces';
import { PlaceCard } from '@/components/location/PlaceCard';
import { PlaceDetails } from '@/components/location/PlaceDetails';

export default function ExploreScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [places, setPlaces] = useState<Place[]>([]);
  const [loadingPlaces, setLoadingPlaces] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    checkLocationPermission();
  }, []);

  useEffect(() => {
    if (location) {
      loadPlaces();
    }
  }, [location]);

  const checkLocationPermission = async () => {
    try {
      setIsLoading(true);
      const { status } = await Location.getForegroundPermissionsAsync();
      
      if (status === 'granted') {
        getCurrentLocation();
      } else {
        setErrorMsg('Location permission not granted');
        setIsLoading(false);
      }
    } catch (error) {
      setErrorMsg('Error checking location permission');
      setIsLoading(false);
    }
  };

  const requestLocationPermission = async () => {
    try {
      setIsLoading(true);
      setErrorMsg(null);
      
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status === 'granted') {
        getCurrentLocation();
      } else {
        setErrorMsg('Permission to access location was denied');
        setIsLoading(false);
      }
    } catch (error) {
      setErrorMsg('Error requesting location permission');
      setIsLoading(false);
    }
  };

  const getCurrentLocation = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setErrorMsg(null);
    } catch (error) {
      setErrorMsg('Error getting current location');
    } finally {
      setIsLoading(false);
    }
  };

  const loadPlaces = async () => {
    if (!location) return;

    setLoadingPlaces(true);
    try {
      const attractions = await fetchNearbyPlaces({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        type: 'tourist_attraction',
        minRating: 4.0,
      });

      setPlaces(attractions);
    } catch (error) {
      console.error('Error loading places:', error);
      setErrorMsg('Failed to load places');
    } finally {
      setLoadingPlaces(false);
    }
  };

  const openSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    } else if (Platform.OS === 'android') {
      Linking.openSettings();
    } else {
      window.open('about:blank').close();
    }
  };

  const handleViewDetails = (place: Place) => {
    setSelectedPlace(place);
    setModalVisible(true);
  };

  const handleOpenInMaps = () => {
    if (selectedPlace) {
      const url = `https://www.google.com/maps/place/?q=place_id:${selectedPlace.id}`;
      Linking.openURL(url);
      setModalVisible(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Card style={styles.messageCard}>
          <MapPin size={48} color={Theme.colors.primary[600]} />
          <Text style={styles.loadingText}>Getting your location...</Text>
        </Card>
      </View>
    );
  }

  if (errorMsg) {
    return (
      <View style={styles.container}>
        <Card style={styles.messageCard}>
          <MapPin size={48} color={Theme.colors.error[500]} />
          <Text style={styles.errorTitle}>Location Access Required</Text>
          <Text style={styles.errorText}>{errorMsg}</Text>
          <View style={styles.buttonContainer}>
            <Button
              label="Grant Permission"
              onPress={requestLocationPermission}
              style={styles.button}
            />
            <Button
              label="Open Settings"
              variant="outline"
              onPress={openSettings}
              style={styles.button}
            />
          </View>
        </Card>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />
        <Text style={styles.title}>Attractions</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {loadingPlaces ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Theme.colors.primary[600]} />
            <Text style={styles.loadingText}>Loading places...</Text>
          </View>
        ) : places.length === 0 ? (
          <Card style={styles.messageCard}>
            <Info size={48} color={Theme.colors.neutral[400]} />
            <Text style={styles.noPlacesText}>
              No highly-rated attractions found nearby. Try again later.
            </Text>
          </Card>
        ) : (
          places
            .filter(place => place.images && place.images.length > 0)
            .sort((a, b) => b.reviewCount - a.reviewCount)
            .map((place) => (
              <PlaceCard
                key={place.id}
                place={place}
                onViewDetails={handleViewDetails}
              />
            ))
        )}
      </ScrollView>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        {selectedPlace && (
          <PlaceDetails
            place={selectedPlace}
            onClose={() => setModalVisible(false)}
            onOpenMaps={handleOpenInMaps}
          />
        )}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.neutral[50],
  },
  header: {
    paddingHorizontal: Theme.spacing[2],
    paddingTop: Theme.spacing[2],
    paddingBottom: Theme.spacing[1],
    backgroundColor: Theme.colors.white,
  },
  title: {
    fontFamily: Theme.fontFamily.bold,
    fontSize: Theme.fontSizes['2xl'],
    color: Theme.colors.neutral[800],
    marginTop:Theme.spacing[2],
    marginBottom: Theme.spacing[1],
  },
  subtitle: {
    fontFamily: Theme.fontFamily.regular,
    fontSize: Theme.fontSizes.md,
    color: Theme.colors.neutral[600],
  },
  content: {
    flex: 1,
    padding: Theme.spacing[4],
  },
  messageCard: {
    margin: Theme.spacing[4],
    alignItems: 'center',
    justifyContent: 'center',
    padding: Theme.spacing[6],
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Theme.spacing[8],
  },
  loadingText: {
    fontFamily: Theme.fontFamily.medium,
    fontSize: Theme.fontSizes.lg,
    color: Theme.colors.neutral[600],
    marginTop: Theme.spacing[4],
    textAlign: 'center',
  },
  noPlacesText: {
    fontFamily: Theme.fontFamily.medium,
    fontSize: Theme.fontSizes.md,
    color: Theme.colors.neutral[600],
    marginTop: Theme.spacing[4],
    textAlign: 'center',
  },
  errorTitle: {
    fontFamily: Theme.fontFamily.bold,
    fontSize: Theme.fontSizes.xl,
    color: Theme.colors.neutral[800],
    marginTop: Theme.spacing[4],
    marginBottom: Theme.spacing[2],
    textAlign: 'center',
  },
  errorText: {
    fontFamily: Theme.fontFamily.regular,
    fontSize: Theme.fontSizes.md,
    color: Theme.colors.neutral[600],
    marginBottom: Theme.spacing[4],
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    gap: Theme.spacing[2],
  },
  button: {
    width: '100%',
  },
});