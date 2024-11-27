import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { useTheme } from "@/context/ThemeContext";

const DriverMainHome = () => {
  const { theme, isDarkMode } = useTheme(); // Get theme and dark mode state

  const darkMapStyle = [
    {
      "elementType": "geometry",
      "stylers": [{ "color": "#212121" }]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [{ "color": "#757575" }]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [{ "color": "#212121" }]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [{ "color": "#757575" }]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [{ "color": "#303030" }]
    }
  ];

  const defaultMapStyle = []; // No custom styling for light mode

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.header, { color: theme.colors.text }]}>Driver Main Home</Text>
      <MapView
        style={styles.map}
        customMapStyle={isDarkMode ? darkMapStyle : defaultMapStyle} // Apply styles based on theme
        initialRegion={{
          latitude: 33.6844,
          longitude: 73.0479,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/* Markers, Polyline, etc. */}
        <Marker
          coordinate={{ latitude: 33.6844, longitude: 73.0479 }}
          title="Current Location"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { fontSize: 24, fontWeight: "bold", margin: 16 },
  map: { flex: 1 },
});

export default DriverMainHome;
