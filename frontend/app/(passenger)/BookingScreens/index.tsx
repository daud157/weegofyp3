// PassengerMainHome.js
import 'react-native-get-random-values'; // Polyfill to fix the crypto issue
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  TextInput,
  Platform
} from "react-native";
import { useTheme } from "@/context/ThemeContext"; // Import theme context
import { useRouter } from "expo-router"; // Import router for navigation
import { useNavigation } from "@react-navigation/native"; // Import navigation hook
import * as Location from "expo-location"; // Import expo-location to get the current location
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapComponent from './MapComponent'; // Import the MapComponent

const PassengerMainHome = () => {
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [vehicleModalVisible, setVehicleModalVisible] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [originCoordinates, setOriginCoordinates] = useState(null);
  const [destinationCoordinates, setDestinationCoordinates] = useState(null);
  const [rideDetails, setRideDetails] = useState(null);
  const [isPressed, setIsPressed] = useState(false); // State to track if button is pressed
  const [isClicked, setIsClicked] = useState(false);
  const { theme } = useTheme();
  const router = useRouter();
  const Navigation = useNavigation(); // Navigation instance

  const GOOGLE_PLACES_API_KEY = 'AIzaSyD6Z0WUBBY6y5VmdfTGXjVE2qqTQjCxxu4'; // Replace with your API key
  const vehicles = [
    { id: "1", type: "Bike", rate: rideDetails ? `$${rideDetails.fares.bike}` : "$10", icon: "🚲", nearby: "7 nearbies" },
    { id: "2", type: "Economy", rate: rideDetails ? `$${rideDetails.fares.economy}` : "$10", icon: "🚗", nearby: "9 nearbies" },
    { id: "3", type: "Comfort", rate: rideDetails ? `$${rideDetails.fares.comfort}` : "$10", icon: "🚐", nearby: "4 nearbies" },
  ];

  // Get current location on component mount
  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords); // Set the current location in state
    };

    getLocation();
  }, []);

  if (!currentLocation) {
    // If location is not yet available, render loading indicator or fallback UI
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text style={{ color: theme.colors.text }}>Loading...</Text>
      </View>
    );
  }

  const calculateFare = async () => {
    try {
      // Send request to the backend API with origin and destination
      const response = await fetch('http://192.168.100.7:3000/api/calculateFares', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          origin: `${originCoordinates.latitude},${originCoordinates.longitude}`,
          destination: `${destinationCoordinates.latitude},${destinationCoordinates.longitude}`,
        }),
      });

      const data = await response.json();
      console.log(data);
      // Handle API response
      if (response.ok) {
        setRideDetails({
          distance: data.distance,
          duration: data.duration,
          fares: {
            bike: data.fares.bike,
            comfort: data.fares.comfort,
            economy: data.fares.economy,
          },
        });
      } else {
        alert('Error calculating fare: ' + data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to fetch fare information');
    }
  };

  const handleRideSharing = () => {
    setIsClicked(!isClicked); // Toggle state on button click
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Map */}
      <MapComponent currentLocation={currentLocation}
     
        originCoordinates={originCoordinates}
        destinationCoordinates={destinationCoordinates} />

      <View style={styles.searchContainer}>
        <TouchableOpacity
          onPress={() => setLocationModalVisible(true)}
         
          // onFail={(error) => console.error(error)}
          style={[
            styles.inputContainer,
            { backgroundColor: theme.colors.card, borderColor: theme.colors.border },
          ]}
        >
          <Text style={[styles.placeholderText, { color: theme.colors.text }]}>
            Where would you go?
          </Text>
        </TouchableOpacity>
      </View>

      {/* Location Modal */}
      <Modal
        visible={locationModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setLocationModalVisible(false)}
      >
        <View style={[styles.modalContainer, { backgroundColor: theme.colors.overlay }]}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.background }]}>
            <View style={[styles.dragIndicator, { backgroundColor: theme.colors.border }]} />
            <Text style={[styles.modalTitle, { color: theme.colors.text }]}>Select Address</Text>
            <Text style={[styles.modalSubtitle, { color: theme.colors.text }]}>
              Enter your current location and destination.
            </Text>

            {/* Google Places Autocomplete - Pickup */}
            <View style={styles.inputRow}>
              <View style={styles.iconContainer}>
                <Text style={[styles.inputIcon, { color: theme.colors.text }]}>📍</Text>
              </View>
              <GooglePlacesAutocomplete
                placeholder="Search Pickup Location"
                styles={{
                  container: {   flex: 1, 
                    zIndex: 10,  // Ensure input is at a lower level than the list view
                    position: "relative",  // Allow input to stay within the parent container
                    width: '90%'
                  }, // Ensure it's on top of other elements
                  listView: {
                    position: 'absolute',
                    top: 20,  // Adjust the position so that the list view appears below the input field
                    zIndex: 9999
                  },
                }}
                fetchDetails={true} // Fetch detailed information including coordinates
          onPress={(data, details = null) => {
            setLocationModalVisible(true)
            // console.log("data", data);
            console.log("details", details?.geometry?.location);
            setOriginCoordinates({
              latitude: details?.geometry?.location.lat,
              longitude: details?.geometry?.location.lng,
            });
            // console.log(${originCoordinates.latitude},${originCoordinates.longitude});////
            
          }}
                query={{
                  key: GOOGLE_PLACES_API_KEY,
                  language: 'en',
                }}
              />
            </View>

            {/* Google Places Autocomplete - Destination */}
            <View style={styles.inputRow}>
              <View style={styles.iconContainer}>
                <Text style={[styles.inputIcon, { color: theme.colors.text }]}>📍</Text>
              </View>
              <GooglePlacesAutocomplete
                placeholder="Search Destination"
                styles={{
                  container: { 
                    flex: 1, 
                    zIndex: 1,  // Ensure input is at a lower level than the list view
                    position: "relative",  // Allow input to stay within the parent container
                    width: '90%'}, // Ensure it's on top of other elements
                  listView: {
                    position: 'absolute',
                    top: 50,  // Adjust the position so that the list view appears below the input field
                    zIndex: 9999
                  },
                }}
                
                query={{
                  key: GOOGLE_PLACES_API_KEY,
                  language: 'en',
                }}
                fetchDetails={true} // Fetch detailed information including coordinates
                onPress={(data, details = null) => {
                  setLocationModalVisible(true)
                  // console.log("data", data);
                  console.log("details", details?.geometry?.location);
                  setDestinationCoordinates({
                    latitude: details?.geometry?.location.lat,
                    longitude: details?.geometry?.location.lng,
                  });}}
              />
            </View>

            <TouchableOpacity
              style={[styles.proceedButton, { backgroundColor: theme.colors.primary }]}
              onPress={() => {
                setLocationModalVisible(false);
                setVehicleModalVisible(true);
                calculateFare();
              }}
            >
              <Text style={[styles.proceedButtonText, { color: theme.colors.card }] }>
                Proceed to Vehicle Selection
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Vehicle Modal */}
      <Modal
        visible={vehicleModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setVehicleModalVisible(false)}
      >
        <View style={[styles.modalContainer, { backgroundColor: theme.colors.overlay }]}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.background }]}>
            <View style={[styles.dragIndicator, { backgroundColor: theme.colors.border }]} />
            <Text style={[styles.modalTitle, { color: theme.colors.text }]}>Select Vehicle</Text>
            <Text style={[styles.modalSubtitle, { color: theme.colors.text }]}>
              Choose the vehicle category you want to ride.
            </Text>

            <FlatList
              data={vehicles}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.vehicleItem,
                    selectedVehicle === item.id
                      ? { borderColor: theme.colors.primary, borderWidth: 2 }
                      : { borderColor: "transparent" },
                  ]}
                  onPress={() => setSelectedVehicle(item.id)}
                >
                  <View style={styles.vehicleInfo}>
                    <View style={styles.vehicleIconContainer}>
                      <Text style={styles.vehicleIcon}>{item.icon}</Text>
                    </View>
                    <View>
                      <Text style={[styles.vehicleType, { color: theme.colors.text }]}>
                        {item.type}
                      </Text>
                      <Text style={[styles.vehicleNearby, { color: theme.colors.text }]}>
                        {item.nearby}
                      </Text>
                    </View>
                  </View>
                  <Text style={[styles.vehicleRate, { color: theme.colors.text }]}>{item.rate}</Text>
                </TouchableOpacity>
              )}
            />
             <TouchableOpacity
                   style={[styles.confirmButton, { backgroundColor: isClicked ? "#007BFF":"#FFD700"  }]} // Toggle button color
                   onPress={handleRideSharing} // Handle button press
               >
                <Text style={styles.confirmButtonText}>{isClicked ? "Disable Ride Sharing" : "Enable Ride sharing"} </Text>
             </TouchableOpacity>

            <TouchableOpacity
              style={[styles.confirmButton, { backgroundColor: theme.colors.primary }]}
           
              onPress={() => {
                Navigation.navigate("Home", { screen: "Details" });
              }}
            >
              <Text style={[styles.confirmButtonText, { color: theme.colors.card }]}>
                Book Now
              </Text>
            </TouchableOpacity>
           
          </View>
        </View>
      </Modal>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { ...StyleSheet.absoluteFillObject },
  searchContainer: { position: "absolute", bottom: 120, width: "90%", alignSelf: "center" ,borderRadius:60},
  inputContainer: { padding: 15, borderRadius: 30, borderWidth: 1, alignItems: "center" },
  placeholderText: { fontSize: 16 },
  modalContainer: { flex: 1, justifyContent: "flex-end" },
  modalContent: { borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20 },
  dragIndicator: { width: 40, height: 5, borderRadius: 5, alignSelf: "center", marginBottom: 15 },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  modalSubtitle: { fontSize: 14, marginBottom: 20 },
  inputRow: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  iconContainer: { padding: 10 },
  inputIcon: { fontSize: 20 },
  locationIcon: { fontSize: 20 },
  inputField: { flex: 1, padding: 20 },
  proceedButton: { paddingVertical: 15, borderRadius: 25, alignItems: "center" },
  proceedButtonText: { fontSize: 16, fontWeight: "bold" },
  vehicleItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    borderWidth: 1,
  },
  vehicleInfo: { flexDirection: "row", alignItems: "center" },
  vehicleIconContainer: { marginRight: 10 },
  vehicleIcon: { fontSize: 30 },
  vehicleType: { fontSize: 16, fontWeight: "bold" },
  vehicleNearby: { fontSize: 12 },
  vehicleRate: { fontSize: 16, fontWeight: "bold" },
  confirmButton: { paddingVertical: 10, borderRadius: 50, alignItems: "center",marginBottom:10 },
  
  confirmButtonText: { fontSize: 16, fontWeight: "bold" },
});

export default PassengerMainHome;
  {/* Other UI components */}
      {/* Search Input, Modals, and Vehicle Selection */}
      {/* ... rest of the code remains unchanged */}
 

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   map: { ...StyleSheet.absoluteFillObject },
//   searchContainer: { position: "absolute", bottom: 120, width: "90%", alignSelf: "center" },
//   inputContainer: { padding: 15, borderRadius: 10, borderWidth: 1, alignItems: "center" },
//   placeholderText: { fontSize: 16 },
//   modalContainer: { flex: 1, justifyContent: "flex-end" },
//   modalContent: { borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20 },
//   dragIndicator: { width: 40, height: 5, borderRadius: 5, alignSelf: "center", marginBottom: 15 },
//   modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
//   modalSubtitle: { fontSize: 14, marginBottom: 20 },
//   inputRow: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
//   iconContainer: { padding: 10 },
//   inputIcon: { fontSize: 20 },
//   proceedButton: { paddingVertical: 10, borderRadius: 5, alignItems: "center" },
//   proceedButtonText: { fontSize: 16, fontWeight: "bold" },
//   vehicleItem: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     padding: 15,
//     marginBottom: 15,
//     borderRadius: 10,
//     borderWidth: 1,
//   },
//   confirmButton: { paddingVertical: 10, borderRadius: 50, alignItems: "center", marginBottom: 10 },
//   confirmButtonText: { fontSize: 16, fontWeight: "bold" },
// });

// export default PassengerMainHome;
