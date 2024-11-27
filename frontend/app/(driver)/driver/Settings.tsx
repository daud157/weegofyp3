import React from "react";
import { View, Text, TouchableOpacity, Switch, ScrollView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons"; // For icons
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";
import { useUser } from "@/context/userContext"; // Import the user context

const SettingsScreen = () => {
  const router = useRouter();
  const { setUser, setIsLoggedIn } = useUser(); // Get user context data
  const [isNotificationsEnabled, setIsNotificationsEnabled] = React.useState(false);
  const [isOnline, setIsOnline] = React.useState(true);

  // Logout function
  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync("token");
      await SecureStore.deleteItemAsync("isLoggedIn");
      setUser(null); // Clear the user context
      setIsLoggedIn(false);
      router.replace("signin"); // Redirect to sign-in page
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ paddingVertical: 40, paddingHorizontal: 16, backgroundColor: "#F9FAFB" }}>
      {/* Header */}
      <View className="flex-row items-center justify-between mt-16 mb-8">
        <Text className="text-2xl font-bold text-black ml-4">Settings</Text>
        <Ionicons name="settings-outline" size={28} color="gray" />
      </View>

      {/* Online Status Toggle */}
      <View className="bg-white rounded-2xl p-6 shadow-lg w-full mb-6 flex-row items-center justify-between">
        <View className="flex-row items-center">
          <Ionicons name="cloud-done-outline" size={30} color={isOnline ? "green" : "gray"} />
          <Text className="ml-2 text-lg font-bold text-gray-600">{isOnline ? "You are online" : "You are offline"}</Text>
        </View>
        <Switch value={isOnline} onValueChange={setIsOnline} trackColor={{ false: "#767577", true: "#81b0ff" }} />
      </View>

      {/* Notification Settings */}
      <View className="bg-white rounded-2xl p-6 shadow-lg w-full mb-6 flex-row items-center justify-between">
        <View className="flex-row items-center">
          <Ionicons name="notifications-outline" size={30} color={isNotificationsEnabled ? "yellow" : "gray"} />
          <Text className="ml-2 text-lg font-bold text-gray-600">Notifications</Text>
        </View>
        <Switch value={isNotificationsEnabled} onValueChange={setIsNotificationsEnabled} trackColor={{ false: "#767577", true: "#81b0ff" }} />
      </View>

      {/* Account Info */}
      <TouchableOpacity className="bg-white rounded-2xl p-6 shadow-lg w-full mb-6 flex-row items-center">
        <Ionicons name="person-outline" size={30} color="gray" />
        <Text className="ml-2 text-lg font-bold text-gray-600">Account Information</Text>
        <Ionicons name="chevron-forward-outline" size={24} color="gray" className="ml-auto" />
      </TouchableOpacity>

      {/* Payment Methods */}
      <TouchableOpacity className="bg-white rounded-2xl p-6 shadow-lg w-full mb-6 flex-row items-center">
        <Ionicons name="card-outline" size={30} color="gray" />
        <Text className="ml-2 text-lg font-bold text-gray-600">Payment Methods</Text>
        <Ionicons name="chevron-forward-outline" size={24} color="gray" className="ml-auto" />
      </TouchableOpacity>

      {/* Privacy Policy */}
      <TouchableOpacity className="bg-white rounded-2xl p-6 shadow-lg w-full mb-6 flex-row items-center">
        <Ionicons name="shield-checkmark-outline" size={30} color="gray" />
        <Text className="ml-2 text-lg font-bold text-gray-600">Privacy Policy</Text>
        <Ionicons name="chevron-forward-outline" size={24} color="gray" className="ml-auto" />
      </TouchableOpacity>

      {/* Support */}
      <TouchableOpacity className="bg-white rounded-2xl p-6 shadow-lg w-full mb-6 flex-row items-center">
        <Ionicons name="help-circle-outline" size={30} color="gray" />
        <Text className="ml-2 text-lg font-bold text-gray-600">Help & Support</Text>
        <Ionicons name="chevron-forward-outline" size={24} color="gray" className="ml-auto" />
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity className="bg-red-500 py-4 px-9 rounded-full mt-6 shadow-lg flex-row justify-center items-center" onPress={handleLogout}>
        <Ionicons name="exit-outline" size={24} color="white" />
        <Text className="text-lg font-bold text-white text-center ml-2">Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SettingsScreen;
