import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "@/context/ThemeContext";
import PassengerMainHome from "./index";
import ProfileScreen from "./ProfileScreen";
import WalletScreen from "./WalletScreen";
import BookingHistory from "./BookingHistory"; 
import BookingScreensLayout from "./BookingScreens/_layout"; // Correct import for nested layout

const Tab = createBottomTabNavigator();

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const { theme, isDarkMode, toggleDarkMode } = useTheme(); 

  const drawerAction = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.drawerButton, { backgroundColor: theme.colors.card }]}>
        <TouchableOpacity onPress={drawerAction}>
          <Ionicons name="menu" size={28} color={theme.colors.text} />
        </TouchableOpacity>
      </View>

      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName = "home";
            if (route.name === "Bookings") iconName = "calendar";
            if (route.name === "Profile") iconName = "chatbubble-ellipses";
            if (route.name === "Wallet") iconName = "wallet";

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarStyle: { backgroundColor: theme.colors.card },
          tabBarActiveTintColor: theme.colors.text,
          tabBarInactiveTintColor: theme.colors.text,
          headerShown: false,
        })}
      >
        {/* Main Home */}
        <Tab.Screen
          name="Home"
          component={PassengerMainHome} // Directly use the component instead of passing it as a child
        />

        {/* Booking Screens */}
        <Tab.Screen
          name="Bookings"
          component={BookingScreensLayout} // Correct use of component
        />

        {/* Wallet */}
        <Tab.Screen
          name="Wallet"
          component={WalletScreen}
        />

        {/* Profile */}
        <Tab.Screen
          name="Profile"
          options={{
            title: "Profile",
          }}
        >
          {() => (
            <ProfileScreen
              isDarkMode={isDarkMode}
              toggleDarkMode={toggleDarkMode} // Use global toggle
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>

      <StatusBar style={isDarkMode ? "light" : "dark"} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  drawerButton: {
    position: "absolute",
    top: 60,
    left: 8,
    padding: 8,
    borderRadius: 20,
    zIndex: 10,
  },
});
