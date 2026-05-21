import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../theme/colors";

export default function Orders() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.emoji}>📦</Text>
        <Text style={styles.title}>Your Orders</Text>
        <Text style={styles.subtitle}>
          You haven't placed any orders yet.{"\n"}
          Browse restaurants from the Home tab to get started!
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  emoji: { fontSize: 64, marginBottom: 12 },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.accent,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: 20,
  },
});
