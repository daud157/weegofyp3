import React from "react";
import { Stack } from "expo-router"; // This imports the Stack navigator from expo-router

export default function BookingScreensLayout() {
  return (
    <Stack>
      {/* Booking Home (Index Screen) */}
      <Stack.Screen
        name="index" // Default route for Booking Screens
        options={{
          title: "Booking Home",
          headerShown: false, // Hide header for the index screen
        }}
      />

      {/* Child Screen 1 */}
      <Stack.Screen
        name="Child2Screen" // Automatically maps to 'Child1Screen.tsx'
        options={{
          title: "Child Screen 1",
        }}
      />

      {/* Child Screen 2 */}
      <Stack.Screen
        name="Child2Screen" // Automatically maps to 'Child2Screen.tsx'
        options={{
          title: "Child Screen 2",
        }}
      />
    </Stack>
  );
}
