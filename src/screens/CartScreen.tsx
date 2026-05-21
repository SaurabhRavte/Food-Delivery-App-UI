import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { COLORS } from "../theme/colors";
import { RESTAURANTS } from "../data/mockData";
import { useCart } from "../context/CartContext";
import type { AppStackParamList } from "../navigation";

type Nav = NativeStackNavigationProp<AppStackParamList, "Cart">;

export default function CartScreen() {
  const navigation = useNavigation<Nav>();
  const {
    cart,
    restaurantId,
    addToCart,
    removeFromCart,
    totalPrice,
    clearCart,
  } = useCart();

  const restaurant = restaurantId
    ? RESTAURANTS.find((r) => r.id === restaurantId)
    : null;

  const subtotal = totalPrice;
  const delivery = restaurant?.deliveryFee ?? 0;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + delivery + tax;

  const itemCount = cart.reduce((s, c) => s + c.qty, 0);

  const handleAddOne = (id: string) => {
    const existing = cart.find((c) => c.id === id);
    if (existing && restaurantId) addToCart(existing, restaurantId, 1);
  };

  const handlePlaceOrder = () => {
    if (!restaurantId) return;
    navigation.navigate("OrderConfirm", { total, restaurantId });

    setTimeout(clearCart, 100);
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Cart</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{itemCount}</Text>
        </View>
      </View>

      {cart.length === 0 || !restaurant ? (
        <View style={styles.emptyState}>
          <Text style={{ fontSize: 64 }}>🛒</Text>
          <Text style={styles.emptyText}>Your cart is empty</Text>
          <TouchableOpacity
            style={styles.browseBtn}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.browseBtnText}>Browse Menu</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Restaurant info */}
            <View style={styles.restaurantRow}>
              <Text style={{ fontSize: 28 }}>{restaurant.emoji}</Text>
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.restaurantName}>{restaurant.name}</Text>
                <Text style={styles.restaurantSub}>
                  {restaurant.deliveryTime}
                </Text>
              </View>
            </View>

            {/* Items */}
            <Text style={styles.sectionTitle}>Order Items</Text>
            {cart.map((item) => (
              <View key={item.id} style={styles.cartItem}>
                <Text style={{ fontSize: 32 }}>{item.emoji}</Text>
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>₹{item.price} each</Text>
                </View>
                <View style={styles.stepper}>
                  <TouchableOpacity
                    style={styles.stepBtn}
                    onPress={() => removeFromCart(item.id)}
                  >
                    <Text style={styles.stepText}>−</Text>
                  </TouchableOpacity>
                  <Text style={styles.qtyText}>{item.qty}</Text>
                  <TouchableOpacity
                    style={styles.stepBtn}
                    onPress={() => handleAddOne(item.id)}
                  >
                    <Text style={styles.stepText}>+</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.itemTotal}>₹{item.price * item.qty}</Text>
              </View>
            ))}

            {/* Coupon */}
            <View style={styles.couponBox}>
              <Text style={styles.couponIcon}>🏷️</Text>
              <Text style={styles.couponText}>Apply coupon code</Text>
              <TouchableOpacity style={styles.couponBtn}>
                <Text style={styles.couponBtnText}>APPLY</Text>
              </TouchableOpacity>
            </View>

            {/* Bill Summary */}
            <View style={styles.billCard}>
              <Text style={styles.billTitle}>Bill Summary</Text>
              <View style={styles.billRow}>
                <Text style={styles.billLabel}>Item Total</Text>
                <Text style={styles.billVal}>₹{subtotal}</Text>
              </View>
              <View style={styles.billRow}>
                <Text style={styles.billLabel}>Delivery Fee</Text>
                <Text
                  style={[
                    styles.billVal,
                    delivery === 0 && { color: COLORS.success },
                  ]}
                >
                  {delivery === 0 ? "FREE" : `₹${delivery}`}
                </Text>
              </View>
              <View style={styles.billRow}>
                <Text style={styles.billLabel}>GST & Charges</Text>
                <Text style={styles.billVal}>₹{tax}</Text>
              </View>
              <View style={styles.billDivider} />
              <View style={styles.billRow}>
                <Text style={styles.billTotalLabel}>To Pay</Text>
                <Text style={styles.billTotalVal}>₹{total}</Text>
              </View>
            </View>

            {/* Delivery Address */}
            <View style={styles.addressBox}>
              <Text style={styles.addressIcon}>📍</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.addressLabel}>Delivering to</Text>
                <Text style={styles.addressText}>Flat 3B, MG Road, Indore</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.changeText}>Change</Text>
              </TouchableOpacity>
            </View>

            <View style={{ height: 100 }} />
          </ScrollView>

          {/* Place Order */}
          <View style={styles.ctaBar}>
            <View>
              <Text style={styles.ctaLabel}>{itemCount} items</Text>
              <Text style={styles.ctaTotal}>₹{total}</Text>
            </View>
            <TouchableOpacity style={styles.ctaBtn} onPress={handlePlaceOrder}>
              <Text style={styles.ctaBtnText}>Place Order →</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: "row", alignItems: "center", padding: 16, gap: 12 },
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
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.accent,
  },
  badge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: { color: COLORS.white, fontSize: 13, fontWeight: "700" },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  emptyText: { fontSize: 18, fontWeight: "700", color: COLORS.accent },
  browseBtn: {
    backgroundColor: COLORS.accent,
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginTop: 8,
  },
  browseBtnText: { color: COLORS.white, fontWeight: "700", fontSize: 15 },
  restaurantRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    borderRadius: 14,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  restaurantName: { fontSize: 16, fontWeight: "700", color: COLORS.accent },
  restaurantSub: { fontSize: 13, color: COLORS.textSecondary },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.accent,
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 8,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 14,
    padding: 12,
    gap: 6,
  },
  itemName: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.accent,
    marginBottom: 3,
  },
  itemPrice: { fontSize: 12, color: COLORS.textSecondary },
  stepper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.accent,
    borderRadius: 10,
  },
  stepBtn: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  stepText: { color: COLORS.white, fontSize: 18, fontWeight: "700" },
  qtyText: {
    color: COLORS.white,
    fontWeight: "800",
    fontSize: 14,
    paddingHorizontal: 8,
  },
  itemTotal: {
    fontSize: 15,
    fontWeight: "800",
    color: COLORS.accent,
    minWidth: 48,
    textAlign: "right",
  },
  couponBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    borderRadius: 14,
    padding: 14,
    marginTop: 4,
    marginBottom: 12,
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: COLORS.accent,
  },
  couponIcon: { fontSize: 20, marginRight: 8 },
  couponText: { flex: 1, fontSize: 14, color: COLORS.textSecondary },
  couponBtn: {
    backgroundColor: COLORS.accent,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  couponBtnText: { color: COLORS.white, fontWeight: "700", fontSize: 12 },
  billCard: {
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  billTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.accent,
    marginBottom: 12,
  },
  billRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  billLabel: { fontSize: 14, color: COLORS.textSecondary },
  billVal: { fontSize: 14, color: COLORS.textPrimary, fontWeight: "600" },
  billDivider: { height: 1, backgroundColor: COLORS.border, marginVertical: 8 },
  billTotalLabel: { fontSize: 16, fontWeight: "700", color: COLORS.accent },
  billTotalVal: { fontSize: 18, fontWeight: "800", color: COLORS.accent },
  addressBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    borderRadius: 14,
    padding: 14,
    marginBottom: 8,
  },
  addressIcon: { fontSize: 20, marginRight: 10 },
  addressLabel: { fontSize: 12, color: COLORS.textSecondary, marginBottom: 2 },
  addressText: { fontSize: 14, fontWeight: "600", color: COLORS.accent },
  changeText: { color: COLORS.accent, fontWeight: "700", fontSize: 13 },
  ctaBar: {
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
  ctaLabel: { color: COLORS.secondary, fontSize: 12 },
  ctaTotal: { color: COLORS.white, fontSize: 18, fontWeight: "800" },
  ctaBtn: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  ctaBtnText: { color: COLORS.white, fontWeight: "700", fontSize: 14 },
});
