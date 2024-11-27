import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext"; // Access theme context

const BookingsScreen = () => {
  const [activeTab, setActiveTab] = useState("Active Now");
  const { theme } = useTheme(); // Get theme from context

  const renderContent = () => {
    const hasActiveBooking = false; // Replace with actual logic

    if (!hasActiveBooking) {
      return (
        <View style={styles.emptyContainer}>
          <Image
            source={require("../../../assets/images/Logo.png")}
            style={styles.emptyImage}
          />
          <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>
            You have no active taxi booking
          </Text>
          <Text style={[styles.emptySubtitle, { color: theme.colors.text }]}>
            You don't have an active taxi booking at this time
          </Text>
        </View>
      );
    }
    return null; // Add content for other tabs if needed
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View
        style={[
          styles.header,
          { borderBottomColor: theme.colors.border, backgroundColor: theme.colors.card },
        ]}
      >
        <View style={styles.titleContainer}>
          <Image
            source={require("../../../assets/images/Logo.png")}
            style={styles.titleImage}
          />
          <Text style={[styles.title, { color: theme.colors.text }]}>My Bookings</Text>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <Ionicons name="search-outline" size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="ellipsis-horizontal-outline" size={24} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <View
        style={[
          styles.tabsContainer,
          { borderBottomColor: theme.colors.border, backgroundColor: theme.colors.card },
        ]}
      >
        {["Active Now", "Completed", "Cancelled"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={styles.tab}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                { color: theme.colors.text },
                activeTab === tab && { color: theme.colors.primary, fontWeight: "bold" },
              ]}
            >
              {tab}
            </Text>
            {activeTab === tab && (
              <View style={[styles.activeTabIndicator, { backgroundColor: theme.colors.primary }]} />
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      <View style={styles.contentContainer}>{renderContent()}</View>
    </View>
  );
};

export default BookingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    marginTop: 100, // Margin from the top
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center", // Align image and text horizontally
  },
  titleImage: {
    width: 30,
    height: 30,
    marginRight: 10, // Spacing between the image and text
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  headerIcons: {
    flexDirection: "row",
    gap: 15,
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  tab: {
    alignItems: "center",
  },
  tabText: {
    fontSize: 16,
  },
  activeTabIndicator: {
    height: 2,
    width: 30,
    marginTop: 5,
    borderRadius: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyImage: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
  },
});
