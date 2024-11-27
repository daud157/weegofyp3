import React from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useTheme } from "@/context/ThemeContext"; // Import the useTheme hook

const ProfileScreen = () => {
  const { theme, isDarkMode, toggleTheme } = useTheme(); // Get theme and toggle function
  const [profileImage, setProfileImage] = React.useState(
    "https://randomuser.me/api/portraits/men/10.jpg"
  );

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access media library is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const settingsOptions = [
    { label: "Edit Profile", icon: "person-outline", onPress: () => console.log("Edit Profile") },
    { label: "Address", icon: "location-outline", onPress: () => console.log("Address") },
    { label: "Notification", icon: "notifications-outline", onPress: () => console.log("Notification") },
    { label: "Payment", icon: "card-outline", onPress: () => console.log("Payment") },
    { label: "Security", icon: "shield-checkmark-outline", onPress: () => console.log("Security") },
    { label: "Language", icon: "language-outline", extra: "English (US)", onPress: () => console.log("Language") },
    { label: "Dark Mode", icon: "moon-outline", isSwitch: true },
    { label: "Privacy Policy", icon: "document-text-outline", onPress: () => console.log("Privacy Policy") },
    { label: "Help Center", icon: "help-circle-outline", onPress: () => console.log("Help Center") },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.profileImageContainer}>
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
          <TouchableOpacity style={[styles.editIcon, { backgroundColor: theme.colors.primary }]} onPress={pickImage}>
            <Ionicons name="pencil-outline" size={16} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
        <Text style={[styles.profileName, { color: theme.colors.text }]}>Andrew Ainsley</Text>
        <Text style={[styles.profilePhone, { color: theme.colors.text }]}>+1 111 467 378 399</Text>
      </View>

      {/* Settings List */}
      <View style={styles.settingsList}>
        {settingsOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.settingsItem, { borderBottomColor: theme.colors.border }]}
            onPress={option.onPress}
            disabled={option.isSwitch}
          >
            <View style={styles.settingsItemLeft}>
              <Ionicons name={option.icon} size={20} color={theme.colors.text} />
              <Text style={[styles.settingsItemText, { color: theme.colors.text }]}>{option.label}</Text>
            </View>
            {option.isSwitch ? (
              <Switch
                value={isDarkMode}
                onValueChange={toggleTheme} // Use the toggleTheme function from context
                trackColor={{ false: "#ccc", true: theme.colors.primary }}
                thumbColor={isDarkMode ? theme.colors.primary : "#fff"}
              />
            ) : option.extra ? (
              <Text style={[styles.extraText, { color: theme.colors.text }]}>{option.extra}</Text>
            ) : (
              <Ionicons name="chevron-forward-outline" size={20} color={theme.colors.border} />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    marginTop: 90,
  },
  profileImageContainer: { position: "relative" },
  profileImage: { width: 100, height: 100, borderRadius: 50 },
  editIcon: {
    position: "absolute",
    bottom: 5,
    right: 5,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  profilePhone: { fontSize: 14, marginTop: 5 },
  settingsList: { marginVertical: 10, borderTopWidth: 1 },
  settingsItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  settingsItemLeft: { flexDirection: "row", alignItems: "center" },
  settingsItemText: { marginLeft: 10, fontSize: 16 },
  extraText: { fontSize: 14 },
});
