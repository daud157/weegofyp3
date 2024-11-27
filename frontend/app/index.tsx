import { View, Text, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { useUser } from "@/context/userContext";
import { Redirect } from "expo-router";
const Index = () => {
  const { user, loading, isLoggedIn } = useUser();
  console.log("user", user, "loading", loading, "isLoggedIn", isLoggedIn);

  const handlePress = () => {
    router.push("/signin");
  };

  if (loading) {
    return (
      <Text className="text-3xl font-bold mt-36 text-center">Loading...</Text>
    );
  }
  if (!loading && isLoggedIn) {
    if (user?.currentProfileStatus === "driver") {
      return <Redirect href="/driver" />;
    }
    return <Redirect href="/home" />;
  }
  return (
    <SafeAreaView className=" ">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full items-center justify-center h-full p-5">
          <Text className="text-3xl font-bold">weeGo</Text>
          <Text className="text-xl">Sharing Rides, Saving Miles</Text>
          <TouchableOpacity
            onPress={handlePress}
            className="bg-blue-600 my-7 items-center justify-center p-4 w-full rounded-lg"
          >
            <Text className="text-white text-lg font-semibold tracking-wide capitalize">
              Let's Get Started
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
