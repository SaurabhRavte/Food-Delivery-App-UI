import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { COLORS } from "../theme/colors";
import { RESTAURANTS } from "../data/mockData";
import type { RootStackParamList } from "../navigation";

type Nav = NativeStackNavigationProp<RootStackParamList, "MenuItem">;
type Route = RouteProp<RootStackParamList, "MenuItem">;

export default function MenuItemScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const { restaurantId, itemId } = route.params;

  const restaurant = RESTAURANTS.find((r) => r.id === restaurantId)!;
  const item = restaurant.menu.find((m) => m.id === itemId)!;
  const [qty, setQty] = useState(1);

  const total = item.price * qty;

  return (
    <SafeAreaView style={styles.safe}>
      {/* Back */}
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backIcon}>←</Text>
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={[styles.hero, { backgroundColor: restaurant.bgColor }]}>
          <Text style={styles.heroEmoji}>{item.emoji}</Text>
        </View>

        <View style={styles.body}>
          {/* Title Row */}
          <View style={styles.titleRow}>
            <View style={{ flex: 1 }}>
              <View style={styles.vegRow}>
                <View
                  style={[
                    styles.vegIndicator,
                    {
                      backgroundColor: item.isVeg
                        ? COLORS.success
                        : COLORS.error,
                    },
                  ]}
                />
                <Text style={styles.vegLabel}>
                  {item.isVeg ? "Veg" : "Non-Veg"}
                </Text>
              </View>
              <Text style={styles.itemName}>{item.name}</Text>
            </View>
            <View style={styles.ratingBox}>
              <Text style={styles.ratingEmoji}>⭐</Text>
              <Text style={styles.ratingVal}>{item.rating}</Text>
            </View>
          </View>

          <Text style={styles.description}>{item.description}</Text>

          {/* Tags */}
          <View style={styles.tagsRow}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>🍽️ {item.category}</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>🏪 {restaurant.name}</Text>
            </View>
          </View>

          {/* Nutritional Note */}
          <View style={styles.noteBox}>
            <Text style={styles.noteTitle}>Chef's Note</Text>
            <Text style={styles.noteText}>
              Made fresh to order with quality ingredients. Allergen info
              available on request. Spice level can be customised — just mention
              in the order notes.
            </Text>
          </View>

          {/* Price & Qty */}
          <View style={styles.priceRow}>
            <View>
              <Text style={styles.priceLabel}>Price per item</Text>
              <Text style={styles.priceVal}>₹{item.price}</Text>
            </View>
            <View style={styles.stepper}>
              <TouchableOpacity
                style={styles.stepBtn}
                onPress={() => setQty((q) => Math.max(1, q - 1))}
              >
                <Text style={styles.stepText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.qtyText}>{qty}</Text>
              <TouchableOpacity
                style={styles.stepBtn}
                onPress={() => setQty((q) => q + 1)}
              >
                <Text style={styles.stepText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Total */}
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalVal}>₹{total}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Add to Cart CTA */}
      <View style={styles.ctaBar}>
        <TouchableOpacity
          style={styles.ctaBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.ctaBtnText}>+ Add to Cart • ₹{total}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  backBtn: {
    position: "absolute",
    top: 16,
    left: 16,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: COLORS.border,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  backIcon: { fontSize: 20, color: COLORS.accent },
  hero: { height: 240, alignItems: "center", justifyContent: "center" },
  heroEmoji: { fontSize: 110 },

  body: { padding: 20 },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  vegRow: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  vegIndicator: { width: 12, height: 12, borderRadius: 3, marginRight: 6 },
  vegLabel: { fontSize: 12, color: COLORS.textSecondary, fontWeight: "600" },
  itemName: {
    fontSize: 24,
    fontWeight: "800",
    color: COLORS.accent,
    lineHeight: 30,
  },
  ratingBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff8e1",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 4,
  },
  ratingEmoji: { fontSize: 14 },
  ratingVal: { fontSize: 16, fontWeight: "800", color: "#e6a800" },

  description: {
    fontSize: 15,
    color: COLORS.textSecondary,
    lineHeight: 22,
    marginBottom: 14,
  },

  tagsRow: { flexDirection: "row", gap: 8, marginBottom: 16 },
  tag: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  tagText: { fontSize: 13, color: COLORS.textSecondary, fontWeight: "600" },

  noteBox: {
    backgroundColor: "#f8f7fa",
    borderRadius: 14,
    padding: 14,
    marginBottom: 20,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.accent,
  },
  noteTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.accent,
    marginBottom: 6,
  },
  noteText: { fontSize: 13, color: COLORS.textSecondary, lineHeight: 20 },

  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  priceLabel: { fontSize: 12, color: COLORS.textSecondary, marginBottom: 2 },
  priceVal: { fontSize: 20, fontWeight: "800", color: COLORS.accent },
  stepper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.accent,
    borderRadius: 12,
    overflow: "hidden",
  },
  stepBtn: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  stepText: { color: COLORS.white, fontSize: 22, fontWeight: "700" },
  qtyText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "800",
    paddingHorizontal: 12,
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  totalLabel: { fontSize: 16, color: COLORS.textSecondary, fontWeight: "600" },
  totalVal: { fontSize: 24, fontWeight: "800", color: COLORS.accent },

  ctaBar: {
    padding: 16,
    paddingBottom: 24,
    backgroundColor: COLORS.background,
  },
  ctaBtn: {
    backgroundColor: COLORS.accent,
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    shadowColor: COLORS.accent,
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  ctaBtnText: { color: COLORS.white, fontSize: 16, fontWeight: "700" },
});
