import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Child2Screen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text} className=" px-5 text-center mb-4 ">
        This is Child Screen bro donot use the layout here as its not gonna work
        becase the parent has already a layout
      </Text>
      <Text style={styles.text} className=" px-5 text-center ">
        agr bookings k liy layout chahiye toh parent (home) sy bahar
        (BookingScreens) use kro. baqi good work, inshAllah qiyamat tk bn jyga
        fyp
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 18, fontWeight: "bold" },
});
