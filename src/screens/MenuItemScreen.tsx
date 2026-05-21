import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../theme/colors";
import { RESTAURANTS } from "../data/mockData";
import { useCart } from "../context/CartContext";
import type { AppStackParamList } from "../navigation";

type Nav = NativeStackNavigationProp<AppStackParamList, "MenuItem">;
type Route = RouteProp<AppStackParamList, "MenuItem">;

export default function MenuItemScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const { restaurantId, itemId } = route.params;

  const restaurant = RESTAURANTS.find((r) => r.id === restaurantId);
  const item = restaurant?.menu.find((m) => m.id === itemId);
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  if (!restaurant || !item) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={{ padding: 24 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={COLORS.accent} />
          </TouchableOpacity>
          <Text style={{ marginTop: 24, fontSize: 18 }}>Item not found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const total = item.price * qty;

  const handleAddToCart = () => {
    addToCart(item, restaurant.id, qty);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safe} edges={["bottom"]}>
      {/* Back */}
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={22} color={COLORS.accent} />
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero image */}
        <View style={styles.hero}>
          <Image
            source={{ uri: item.image }}
            style={styles.heroImage}
            resizeMode="cover"
          />
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
              <Ionicons name="star" size={14} color={COLORS.star} />
              <Text style={styles.ratingVal}>{item.rating}</Text>
            </View>
          </View>

          <Text style={styles.description}>{item.description}</Text>

          {/* Tags */}
          <View style={styles.tagsRow}>
            <View style={styles.tag}>
              <Ionicons
                name="pricetag-outline"
                size={13}
                color={COLORS.textSecondary}
              />
              <Text style={styles.tagText}>{item.category}</Text>
            </View>
            <View style={styles.tag}>
              <Ionicons
                name="storefront-outline"
                size={13}
                color={COLORS.textSecondary}
              />
              <Text style={styles.tagText} numberOfLines={1}>
                {restaurant.name}
              </Text>
            </View>
          </View>

          {/* Nutritional Note */}
          <View style={styles.noteBox}>
            <View style={styles.noteHeader}>
              <Ionicons name="restaurant" size={16} color={COLORS.accent} />
              <Text style={styles.noteTitle}>Chef's Note</Text>
            </View>
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
                <Ionicons name="remove" size={22} color={COLORS.white} />
              </TouchableOpacity>
              <Text style={styles.qtyText}>{qty}</Text>
              <TouchableOpacity
                style={styles.stepBtn}
                onPress={() => setQty((q) => q + 1)}
              >
                <Ionicons name="add" size={22} color={COLORS.white} />
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
        <TouchableOpacity style={styles.ctaBtn} onPress={handleAddToCart}>
          <Ionicons name="cart" size={18} color={COLORS.white} />
          <Text style={styles.ctaBtnText}>Add to Cart • ₹{total}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  backBtn: {
    position: "absolute",
    top: 48,
    left: 16,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  hero: { height: 280, backgroundColor: COLORS.background },
  heroImage: { width: "100%", height: "100%" },

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
  ratingVal: { fontSize: 16, fontWeight: "800", color: "#e6a800" },

  description: {
    fontSize: 15,
    color: COLORS.textSecondary,
    lineHeight: 22,
    marginBottom: 14,
  },

  tagsRow: { flexDirection: "row", gap: 8, marginBottom: 16, flexWrap: "wrap" },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    maxWidth: "60%",
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
  noteHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 6,
  },
  noteTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.accent,
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: COLORS.accent,
    borderRadius: 16,
    padding: 16,
    shadowColor: COLORS.accent,
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  ctaBtnText: { color: COLORS.white, fontSize: 16, fontWeight: "700" },
});
