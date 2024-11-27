import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useTheme } from "@/context/ThemeContext"; // Import theme context
import { useRouter } from "expo-router"; // Import router for navigation

const PassengerMainHome = () => {
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [vehicleModalVisible, setVehicleModalVisible] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const { theme } = useTheme();
  const router = useRouter();

  const vehicles = [
    { id: "1", type: "Bike", rate: "$5", icon: "🚲", nearby: "7 nearbies" },
    { id: "2", type: "Car", rate: "$10", icon: "🚗", nearby: "9 nearbies" },
    { id: "3", type: "Van", rate: "$15", icon: "🚐", nearby: "4 nearbies" },
  ];

  const currentLocation = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Map */}
      <MapView
        style={styles.map}
        initialRegion={currentLocation}
        showsUserLocation={true}
      >
        <Marker
          coordinate={currentLocation}
          title="Your Location"
          description="You are here"
        />
      </MapView>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <TouchableOpacity
          onPress={() => setLocationModalVisible(true)}
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

            <View style={styles.inputRow}>
              <View style={styles.iconContainer}>
                <Text style={[styles.inputIcon, { color: theme.colors.text }]}>📍</Text>
              </View>
              <TextInput
                placeholder="Current location"
                placeholderTextColor={theme.colors.text}
                style={[styles.inputField, { color: theme.colors.text }]}
              />
              <TouchableOpacity>
                <Text style={[styles.locationIcon, { color: theme.colors.text }]}>🧭</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.inputRow}>
              <View style={styles.iconContainer}>
                <Text style={[styles.inputIcon, { color: theme.colors.text }]}>📍</Text>
              </View>
              <TextInput
                placeholder="Destination"
                placeholderTextColor={theme.colors.text}
                style={[styles.inputField, { color: theme.colors.text }]}
              />
              <TouchableOpacity>
                <Text style={[styles.locationIcon, { color: theme.colors.text }]}>📍</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.proceedButton, { backgroundColor: theme.colors.primary }]}
              onPress={() => {
                setLocationModalVisible(false);
                setVehicleModalVisible(true);
              }}
            >
              <Text style={[styles.proceedButtonText, { color: theme.colors.card }]}>
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
              style={[styles.confirmButton, { backgroundColor: theme.colors.primary }]}
              onPress={() => {
                router.push("/(passenger)/(home)/BookingScreens/Child2Screen");  // Navigate to booking screen is having  issues 
              }}
            >
              <Text style={[styles.confirmButtonText, { color: theme.colors.card }]}>
                Confirm Vehicle
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
  searchContainer: { position: "absolute", bottom: 120, width: "90%", alignSelf: "center" },
  inputContainer: { padding: 15, borderRadius: 10, borderWidth: 1, alignItems: "center" },
  placeholderText: { fontSize: 16 },
  modalContainer: { flex: 1, justifyContent: "flex-end" },
  modalContent: { borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, maxHeight: "80%" },
  dragIndicator: { width: 40, height: 5, alignSelf: "center", borderRadius: 2.5, marginBottom: 15 },
  modalTitle: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  modalSubtitle: { fontSize: 14, marginBottom: 20, textAlign: "center" },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  vehicleItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  vehicleInfo: { flexDirection: "row", alignItems: "center" },
  vehicleIconContainer: {
    backgroundColor: "#FFD700",
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  vehicleIcon: { fontSize: 24 },
  confirmButton: { padding: 15, borderRadius: 10, alignItems: "center", marginTop: 20 },
  confirmButtonText: { fontSize: 16, fontWeight: "bold" },
  proceedButton: { padding: 15, borderRadius: 10, alignItems: "center", marginTop: 20 },
  proceedButtonText: { fontSize: 16, fontWeight: "bold" },
});

export default PassengerMainHome;
