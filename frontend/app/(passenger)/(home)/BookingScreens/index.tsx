import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Child1Screen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is Child Screen 1</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 18, fontWeight: "bold" },
});
