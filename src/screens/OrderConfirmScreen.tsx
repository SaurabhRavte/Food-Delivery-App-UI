import React, { useEffect, useMemo, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  useNavigation,
  useRoute,
  RouteProp,
  CommonActions,
} from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../theme/colors";
import { RESTAURANTS } from "../data/mockData";
import type { AppStackParamList } from "../navigation";

type Nav = NativeStackNavigationProp<AppStackParamList, "OrderConfirm">;
type Route = RouteProp<AppStackParamList, "OrderConfirm">;

type IoniconName = React.ComponentProps<typeof Ionicons>["name"];

export default function OrderConfirmScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const { total, restaurantId } = route.params;
  const restaurant = RESTAURANTS.find((r) => r.id === restaurantId);

  const orderId = useMemo(
    () => `#FG${Math.floor(100000 + Math.random() * 900000)}`,
    [],
  );

  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 60,
        friction: 8,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const goHome = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Main" }],
      }),
    );
  };

  const steps: { icon: IoniconName; label: string; done: boolean }[] = [
    { icon: "checkmark-circle", label: "Order Confirmed", done: true },
    { icon: "restaurant", label: "Being Prepared", done: true },
    { icon: "bicycle", label: "Out for Delivery", done: false },
    { icon: "home", label: "Delivered", done: false },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Success Animation */}
        <Animated.View
          style={[styles.successCircle, { transform: [{ scale: scaleAnim }] }]}
        >
          <Ionicons name="checkmark" size={56} color={COLORS.white} />
        </Animated.View>

        <Animated.View style={{ opacity: fadeAnim, alignItems: "center" }}>
          <Text style={styles.title}>Order Placed!</Text>
          <Text style={styles.orderId}>{orderId}</Text>
          <Text style={styles.subtitle}>
            Your food from {restaurant?.name ?? "the restaurant"} is being
            prepared.{"\n"}
            Estimated delivery: {restaurant?.deliveryTime ?? "30-40 min"}
          </Text>
        </Animated.View>

        {/* Order Steps */}
        <View style={styles.stepsCard}>
          {steps.map((step, i) => (
            <View key={i} style={styles.stepRow}>
              <View
                style={[
                  styles.stepIconBox,
                  {
                    backgroundColor: step.done ? COLORS.accent : COLORS.border,
                  },
                ]}
              >
                <Ionicons
                  name={step.icon}
                  size={18}
                  color={step.done ? COLORS.white : COLORS.textMuted}
                />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text
                  style={[
                    styles.stepLabel,
                    { color: step.done ? COLORS.accent : COLORS.textMuted },
                  ]}
                >
                  {step.label}
                </Text>
              </View>
              {step.done && (
                <Ionicons name="checkmark" size={18} color={COLORS.success} />
              )}
            </View>
          ))}
        </View>

        {/* Total & Summary */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Paid</Text>
            <Text style={styles.summaryVal}>₹{total}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Payment</Text>
            <Text style={styles.summaryVal}>Cash on Delivery</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivering to</Text>
            <Text style={styles.summaryVal}>Flat 27,3rd Floor, West</Text>
          </View>
        </View>

        {/* Back to Home */}
        <TouchableOpacity style={styles.homeBtn} onPress={goHome}>
          <Text style={styles.homeBtnText}>Back to Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.trackBtn} onPress={goHome}>
          <Ionicons name="map-outline" size={18} color={COLORS.accent} />
          <Text style={styles.trackBtnText}>Track Order</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  container: { flex: 1, alignItems: "center", padding: 24, paddingTop: 40 },
  successCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.success,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    shadowColor: COLORS.success,
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: COLORS.accent,
    marginBottom: 4,
  },
  orderId: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: "600",
    backgroundColor: COLORS.border,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 24,
  },
  stepsCard: {
    width: "100%",
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  stepRow: { flexDirection: "row", alignItems: "center", paddingVertical: 8 },
  stepIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  stepLabel: { fontSize: 14, fontWeight: "600" },
  summaryCard: {
    width: "100%",
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  summaryLabel: { fontSize: 14, color: COLORS.textSecondary },
  summaryVal: { fontSize: 14, fontWeight: "700", color: COLORS.accent },
  homeBtn: {
    width: "100%",
    backgroundColor: COLORS.accent,
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    marginBottom: 10,
    shadowColor: COLORS.accent,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  homeBtnText: { color: COLORS.white, fontSize: 16, fontWeight: "700" },
  trackBtn: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  trackBtnText: { color: COLORS.accent, fontSize: 16, fontWeight: "700" },
});
