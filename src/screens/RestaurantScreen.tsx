import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { COLORS } from "../theme/colors";
import { RESTAURANTS, MenuItem } from "../data/mockData";
import type { RootStackParamList } from "../navigation";

type Nav = NativeStackNavigationProp<RootStackParamList, "Restaurant">;
type Route = RouteProp<RootStackParamList, "Restaurant">;

type CartItem = MenuItem & { qty: number };

export default function RestaurantScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const { restaurantId } = route.params;

  const restaurant = RESTAURANTS.find((r) => r.id === restaurantId)!;
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeTab, setActiveTab] = useState<string>("All");

  const categories = [
    "All",
    ...Array.from(new Set(restaurant.menu.map((m) => m.category))),
  ];
  const filteredMenu =
    activeTab === "All"
      ? restaurant.menu
      : restaurant.menu.filter((m) => m.category === activeTab);

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing)
        return prev.map((c) =>
          c.id === item.id ? { ...c, qty: c.qty + 1 } : c,
        );
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeFromCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (!existing) return prev;
      if (existing.qty === 1) return prev.filter((c) => c.id !== item.id);
      return prev.map((c) => (c.id === item.id ? { ...c, qty: c.qty - 1 } : c));
    });
  };

  const getQty = (id: string) => cart.find((c) => c.id === id)?.qty ?? 0;
  const totalItems = cart.reduce((s, c) => s + c.qty, 0);
  const totalPrice = cart.reduce((s, c) => s + c.price * c.qty, 0);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.headerTitle}>{restaurant.name}</Text>
          <Text style={styles.headerSub}>{restaurant.cuisine}</Text>
        </View>
        <View style={styles.ratingBadge}>
          <Text>⭐ {restaurant.rating}</Text>
        </View>
      </View>

      {/* Info Banner */}
      <View
        style={[styles.infoBanner, { backgroundColor: restaurant.bgColor }]}
      >
        <Text style={styles.bannerEmoji}>{restaurant.emoji}</Text>
        <View style={styles.infoGrid}>
          <View style={styles.infoItem}>
            <Text style={styles.infoVal}>{restaurant.deliveryTime}</Text>
            <Text style={styles.infoLabel}>Delivery</Text>
          </View>
          <View style={styles.infoDiv} />
          <View style={styles.infoItem}>
            <Text style={styles.infoVal}>
              {restaurant.deliveryFee === 0
                ? "FREE"
                : `₹${restaurant.deliveryFee}`}
            </Text>
            <Text style={styles.infoLabel}>Delivery Fee</Text>
          </View>
          <View style={styles.infoDiv} />
          <View style={styles.infoItem}>
            <Text style={styles.infoVal}>₹{restaurant.minOrder}</Text>
            <Text style={styles.infoLabel}>Min Order</Text>
          </View>
        </View>
      </View>

      {/* Category Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabScroll}
      >
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.tab, activeTab === cat && styles.tabActive]}
            onPress={() => setActiveTab(cat)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === cat && styles.tabTextActive,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Menu */}
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <Text style={styles.menuHeading}>
          {activeTab === "All" ? "Full Menu" : activeTab}
          <Text style={styles.menuCount}> ({filteredMenu.length} items)</Text>
        </Text>
        {filteredMenu.map((item) => {
          const qty = getQty(item.id);
          return (
            <TouchableOpacity
              key={item.id}
              style={styles.menuCard}
              onPress={() =>
                navigation.navigate("MenuItem", {
                  restaurantId,
                  itemId: item.id,
                })
              }
              activeOpacity={0.88}
            >
              <View style={styles.menuItemEmoji}>
                <Text style={{ fontSize: 40 }}>{item.emoji}</Text>
                <View
                  style={[
                    styles.vegDot,
                    {
                      backgroundColor: item.isVeg
                        ? COLORS.success
                        : COLORS.error,
                    },
                  ]}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDesc} numberOfLines={2}>
                  {item.description}
                </Text>
                <View style={styles.itemBottom}>
                  <Text style={styles.itemPrice}>₹{item.price}</Text>
                  <View style={styles.itemRating}>
                    <Text style={{ fontSize: 11 }}>⭐ </Text>
                    <Text style={styles.itemRatingText}>{item.rating}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.qtyControl}>
                {qty === 0 ? (
                  <TouchableOpacity
                    style={styles.addBtn}
                    onPress={() => addToCart(item)}
                  >
                    <Text style={styles.addBtnText}>+ ADD</Text>
                  </TouchableOpacity>
                ) : (
                  <View style={styles.stepper}>
                    <TouchableOpacity
                      style={styles.stepBtn}
                      onPress={() => removeFromCart(item)}
                    >
                      <Text style={styles.stepText}>−</Text>
                    </TouchableOpacity>
                    <Text style={styles.stepQty}>{qty}</Text>
                    <TouchableOpacity
                      style={styles.stepBtn}
                      onPress={() => addToCart(item)}
                    >
                      <Text style={styles.stepText}>+</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
        <View style={{ height: totalItems > 0 ? 100 : 32 }} />
      </ScrollView>

      {/* Cart Bar */}
      {totalItems > 0 && (
        <View style={styles.cartBar}>
          <View>
            <Text style={styles.cartItemCount}>
              {totalItems} item{totalItems > 1 ? "s" : ""} added
            </Text>
            <Text style={styles.cartTotal}>₹{totalPrice}</Text>
          </View>
          <TouchableOpacity
            style={styles.viewCartBtn}
            onPress={() => navigation.navigate("Cart", { cart, restaurantId })}
          >
            <Text style={styles.viewCartText}>View Cart →</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    paddingBottom: 8,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  backIcon: { fontSize: 20, color: COLORS.accent },
  headerTitle: { fontSize: 18, fontWeight: "700", color: COLORS.accent },
  headerSub: { fontSize: 12, color: COLORS.textSecondary },
  ratingBadge: {
    backgroundColor: "#fff8e1",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  infoBanner: {
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  bannerEmoji: { fontSize: 56, marginRight: 16 },
  infoGrid: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  infoItem: { alignItems: "center" },
  infoVal: { fontSize: 15, fontWeight: "700", color: COLORS.accent },
  infoLabel: { fontSize: 11, color: COLORS.textSecondary, marginTop: 2 },
  infoDiv: { width: 1, height: 32, backgroundColor: COLORS.border },

  tabScroll: { paddingLeft: 16, marginBottom: 8, flexGrow: 0 },
  tab: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  tabActive: { backgroundColor: COLORS.accent, borderColor: COLORS.accent },
  tabText: { fontSize: 13, color: COLORS.textSecondary, fontWeight: "600" },
  tabTextActive: { color: COLORS.white },

  menuHeading: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.accent,
    paddingHorizontal: 16,
    marginBottom: 8,
    marginTop: 4,
  },
  menuCount: { fontSize: 14, fontWeight: "400", color: COLORS.textSecondary },

  menuCard: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 14,
    padding: 12,
    alignItems: "center",
    gap: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  menuItemEmoji: {
    width: 64,
    height: 64,
    backgroundColor: COLORS.background,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  vegDot: {
    position: "absolute",
    bottom: 4,
    right: 4,
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: COLORS.white,
  },
  itemName: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.accent,
    marginBottom: 3,
  },
  itemDesc: {
    fontSize: 12,
    color: COLORS.textSecondary,
    lineHeight: 16,
    marginBottom: 6,
  },
  itemBottom: { flexDirection: "row", alignItems: "center", gap: 10 },
  itemPrice: { fontSize: 15, fontWeight: "800", color: COLORS.accent },
  itemRating: { flexDirection: "row", alignItems: "center" },
  itemRatingText: { fontSize: 12, color: "#e6a800", fontWeight: "700" },

  qtyControl: { alignItems: "center" },
  addBtn: {
    backgroundColor: COLORS.accent,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  addBtnText: { color: COLORS.white, fontWeight: "700", fontSize: 13 },
  stepper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.accent,
    borderRadius: 10,
  },
  stepBtn: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  stepText: { color: COLORS.white, fontSize: 18, fontWeight: "700" },
  stepQty: {
    color: COLORS.white,
    fontWeight: "800",
    fontSize: 14,
    paddingHorizontal: 6,
  },

  cartBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.accent,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: COLORS.accent,
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },
  cartItemCount: { color: COLORS.secondary, fontSize: 12 },
  cartTotal: { color: COLORS.white, fontSize: 18, fontWeight: "800" },
  viewCartBtn: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  viewCartText: { color: COLORS.white, fontWeight: "700", fontSize: 14 },
});
