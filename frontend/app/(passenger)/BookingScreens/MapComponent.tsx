import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import axios from 'axios';
import { useTheme } from '@/context/ThemeContext'; // Import theme context
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // For floating button

const MapComponent = ({ currentLocation, originCoordinates, destinationCoordinates }) => {
  const [routeCoordinates, setRouteCoordinates] = useState(null);
  const [mapRegion, setMapRegion] = useState(null); // Track map's region for centering
  const [selectedMarker, setSelectedMarker] = useState(null); // Track selected marker for info
  const [delayedCurrentLocation, setDelayedCurrentLocation] = useState(null); // New state for delayed current location
  const { theme } = useTheme(); // Get the current theme (light/dark)

  const GOOGLE_MAPS_API_KEY = 'AIzaSyD6Z0WUBBY6y5VmdfTGXjVE2qqTQjCxxu4'; // Replace with your API key

  // Default values for props if not provided
  const defaultRegion = {
    latitude: 37.7749, // Default to San Francisco
    longitude: -122.4194,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  // Fetch directions using Google Maps Directions API
  const getDirections = async (origin, destination) => {
    try {
      const originString = `${origin.latitude},${origin.longitude}`;
      const destinationString = `${destination.latitude},${destination.longitude}`;

      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${originString}&destination=${destinationString}&key=${GOOGLE_MAPS_API_KEY}`
      );

      if (response.data.status === 'OK') {
        const points = decodePolyline(response.data.routes[0].overview_polyline.points);
        setRouteCoordinates(points); // Set new route coordinates
        // After route is fetched, calculate and set the region to fit both origin and destination
        setMapRegion(getRegionForCoordinates([origin, destination]));
      }
    } catch (error) {
      console.error('Error fetching directions:', error);
    }
  };

  // Decode polyline data into coordinates
  const decodePolyline = (encoded) => {
    let points = [];
    let index = 0;
    let lat = 0;
    let lng = 0;

    while (index < encoded.length) {
      let byte;
      let shift = 0;
      let result = 0;

      do {
        byte = encoded.charCodeAt(index++) - 63;
        result |= (byte & 0x1f) << shift;
        shift += 5;
      } while (byte >= 0x20);

      const deltaLat = (result & 0x01) ? ~(result >> 1) : (result >> 1);
      lat += deltaLat;
      shift = 0;
      result = 0;

      do {
        byte = encoded.charCodeAt(index++) - 63;
        result |= (byte & 0x1f) << shift;
        shift += 5;
      } while (byte >= 0x20);

      const deltaLng = (result & 0x01) ? ~(result >> 1) : (result >> 1);
      lng += deltaLng;

      points.push({ latitude: lat / 1E5, longitude: lng / 1E5 });
    }

    return points;
  };

  // Calculate the bounding region to include both origin and destination
  const getRegionForCoordinates = (coordinates) => {
    const latitudes = coordinates.map(coord => coord.latitude);
    const longitudes = coordinates.map(coord => coord.longitude);

    const minLat = Math.min(...latitudes);
    const maxLat = Math.max(...latitudes);
    const minLng = Math.min(...longitudes);
    const maxLng = Math.max(...longitudes);

    // Calculate the region with a little padding
    const padding = 0.01;
    return {
      latitude: (minLat + maxLat) / 2,
      longitude: (minLng + maxLng) / 2,
      latitudeDelta: (maxLat - minLat) + padding,
      longitudeDelta: (maxLng - minLng) + padding,
    };
  };

  // Trigger getDirections when origin or destination coordinates change
  useEffect(() => {
    if (originCoordinates && destinationCoordinates) {
      setRouteCoordinates(null); // Clear previous route before adding new one
      getDirections(originCoordinates, destinationCoordinates);
    }
  }, [originCoordinates, destinationCoordinates]);

  // Trigger mapRegion update when currentLocation changes (only once)
  useEffect(() => {
    if (currentLocation && !delayedCurrentLocation) {
      const timer = setTimeout(() => {
        setDelayedCurrentLocation(currentLocation); // Update the delayed current location after 5 seconds
      }, 5000); // 5 seconds delay

      return () => clearTimeout(timer); // Cleanup the timer when the component unmounts
    }
  }, [currentLocation, delayedCurrentLocation]);

  // Show a loading state if region or required data isn't available yet
  if (!mapRegion) {
    return <Text>Loading map...</Text>;
  }

  // Define map style based on the theme
  const mapStyle = theme.dark
    ? [
        {
          elementType: 'geometry',
          stylers: [{ color: '#212121' }],
        },
        {
          elementType: 'labels.icon',
          stylers: [{ visibility: 'off' }],
        },
        {
          elementType: 'labels.text.fill',
          stylers: [{ color: '#757575' }],
        },
        {
          elementType: 'labels.text.stroke',
          stylers: [{ color: '#212121' }],
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#9e9e9e' }],
        },
        {
          featureType: 'road',
          elementType: 'geometry.fill',
          stylers: [{ color: '#2c2c2c' }],
        },
      ]
    : []; // Default style for light mode

  // Handle marker press to set the selected marker
  const handleMarkerPress = (marker) => {
    setSelectedMarker(marker); // Set the selected marker to show additional info
  };

  return (
    <View style={[styles.mapContainer, { backgroundColor: theme.colors.background }]}>
      <MapView
        style={styles.map}
        region={mapRegion} // Set region state to move map to show both locations
        onRegionChangeComplete={setMapRegion} // Track map region changes
        showsUserLocation={true}
        zoomEnabled={true}
        scrollEnabled={true}
        customMapStyle={mapStyle} // Apply dark/light mode style
      >
        {/* Current Location Marker (Delayed) */}
        {delayedCurrentLocation && (
          <Marker
            coordinate={delayedCurrentLocation}
            title="Current Location"
            onPress={() => handleMarkerPress('currentLocation')}
          />
        )}

        {/* Origin Marker */}
        {originCoordinates && (
          <Marker
            coordinate={originCoordinates}
            title="Origin"
            pinColor="green"
            onPress={() => handleMarkerPress('origin')}
          />
        )}

        {/* Destination Marker */}
        {destinationCoordinates && (
          <Marker
            coordinate={destinationCoordinates}
            title="Destination"
            pinColor="#FFA500"
            onPress={() => handleMarkerPress('destination')}
          />
        )}

        {/* Polyline for route */}
        {routeCoordinates && (
          <>
            {/* Route Polyline */}
            <Polyline
              coordinates={routeCoordinates}
              strokeColor="#FFA500"
              strokeWidth={4}
              strokeDashPattern={[10, 5]}  // Dotted line pattern
            />
          </>
        )}
      </MapView>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => alert('FAB Pressed')}
      >
        <MaterialCommunityIcons name="plus" size={30} color="#fff" />
      </TouchableOpacity>

      {/* Info Panel for Selected Marker */}
      {selectedMarker && (
        <View style={styles.infoContainer}>
          <Text>{selectedMarker} Info</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#6200ea',
    padding: 15,
    borderRadius: 50,
    elevation: 5,
  },
  infoContainer: {
    position: 'absolute',
    bottom: 80,
    left: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    elevation: 5,
  },
});

export default MapComponent;
