import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../theme/colors";
import { useAuth } from "../context/AuthContext";

type IoniconName = React.ComponentProps<typeof Ionicons>["name"];

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { user, logout } = useAuth();

  const menuItems: {
    icon: IoniconName;
    label: string;
    sub: string;
  }[] = [
    { icon: "receipt-outline", label: "My Orders", sub: "3 past orders" },
    {
      icon: "location-outline",
      label: "Saved Addresses",
      sub: "Flat 27, 3rd Floor, West",
    },
    {
      icon: "card-outline",
      label: "Payment Methods",
      sub: "Cash on Delivery",
    },
    {
      icon: "gift-outline",
      label: "Offers & Coupons",
      sub: "2 active coupons",
    },
    { icon: "star-outline", label: "Rate Us", sub: "Love Cravely? Tell us!" },
    { icon: "notifications-outline", label: "Notifications", sub: "Enabled" },
    { icon: "shield-checkmark-outline", label: "Privacy Policy", sub: "" },
    { icon: "help-circle-outline", label: "Help & Support", sub: "" },
  ];

  const canGoBack = navigation.canGoBack();

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        {canGoBack ? (
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={20} color={COLORS.accent} />
          </TouchableOpacity>
        ) : (
          <View style={{ width: 40 }} />
        )}
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>{user?.avatar}</Text>
          </View>
          <View style={{ marginLeft: 14, flex: 1 }}>
            <Text style={styles.userName}>{user?.name}</Text>
            <Text style={styles.userEmail}>{user?.email}</Text>
            <Text style={styles.userPhone}>{user?.phone}</Text>
          </View>
          <TouchableOpacity style={styles.editBtn}>
            <Ionicons name="create-outline" size={14} color={COLORS.accent} />
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statVal}>3</Text>
            <Text style={styles.statLabel}>Orders</Text>
          </View>
          <View style={styles.statDiv} />
          <View style={styles.statItem}>
            <Text style={styles.statVal}>₹1,240</Text>
            <Text style={styles.statLabel}>Spent</Text>
          </View>
          <View style={styles.statDiv} />
          <View style={styles.statItem}>
            <Text style={styles.statVal}>4</Text>
            <Text style={styles.statLabel}>Saved</Text>
          </View>
        </View>

        {/* Menu */}
        <View style={styles.menuCard}>
          {menuItems.map((item, i) => (
            <TouchableOpacity
              key={i}
              style={[
                styles.menuRow,
                i < menuItems.length - 1 && styles.menuRowBorder,
              ]}
            >
              <View style={styles.menuIcon}>
                <Ionicons name={item.icon} size={20} color={COLORS.accent} />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.menuLabel}>{item.label}</Text>
                {item.sub ? (
                  <Text style={styles.menuSub}>{item.sub}</Text>
                ) : null}
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={COLORS.textMuted}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <Ionicons name="log-out-outline" size={18} color={COLORS.error} />
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>

        <Text style={styles.version}>Cravely v1.0.0</Text>
        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
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
  headerTitle: { fontSize: 20, fontWeight: "800", color: COLORS.accent },

  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 3,
  },
  avatarCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { color: COLORS.white, fontSize: 20, fontWeight: "800" },
  userName: { fontSize: 18, fontWeight: "700", color: COLORS.accent },
  userEmail: { fontSize: 13, color: COLORS.textSecondary, marginTop: 2 },
  userPhone: { fontSize: 13, color: COLORS.textSecondary },
  editBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: COLORS.background,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  editText: { color: COLORS.accent, fontWeight: "700", fontSize: 13 },

  statsRow: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    justifyContent: "space-around",
    alignItems: "center",
  },
  statItem: { alignItems: "center" },
  statVal: { fontSize: 18, fontWeight: "800", color: COLORS.accent },
  statLabel: { fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
  statDiv: { width: 1, height: 32, backgroundColor: COLORS.border },

  menuCard: {
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 12,
  },
  menuRow: { flexDirection: "row", alignItems: "center", padding: 14 },
  menuRowBorder: { borderBottomWidth: 1, borderBottomColor: COLORS.border },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
  },
  menuLabel: { fontSize: 15, fontWeight: "600", color: COLORS.accent },
  menuSub: { fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },

  logoutBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginHorizontal: 16,
    backgroundColor: "#fff0f0",
    borderRadius: 14,
    padding: 16,
    borderWidth: 1.5,
    borderColor: "#ffc5c5",
    marginBottom: 12,
  },
  logoutText: { color: COLORS.error, fontWeight: "700", fontSize: 15 },

  version: { textAlign: "center", color: COLORS.textMuted, fontSize: 12 },
});
