// RootLayout.tsx

import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { StatusBar } from "expo-status-bar";
import { UserProvider } from "@/context/userContext";
import { ThemeProvider, useTheme } from "@/context/ThemeContext"; // Import ThemeContext

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    Poppins: require("../assets/fonts/poppins.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <UserProvider>
      <ThemeProvider>
        <ThemedApp />
      </ThemeProvider>
    </UserProvider>
  );
}

// Separate component to use the theme context
function ThemedApp() {
  const { isDarkMode } = useTheme();

  return (
    <NavigationThemeProvider
      value={isDarkMode ? NavigationDarkTheme : NavigationDefaultTheme}
    >
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(passenger)" options={{ headerShown: false }} />
        <Stack.Screen
          name="(driver)/driver"
          options={{ headerShown: false }}
        />
      </Stack>
      <StatusBar style={isDarkMode ? "light" : "dark"} />
    </NavigationThemeProvider>
  );
}
