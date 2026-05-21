import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { COLORS } from "../theme/colors";
import { RESTAURANTS, CATEGORIES } from "../data/mockData";
import { useAuth } from "../context/AuthContext";
import type { RootStackParamList } from "../navigation";

type Nav = NativeStackNavigationProp<RootStackParamList, "Home">;

export default function HomeScreen() {
  const navigation = useNavigation<Nav>();
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = RESTAURANTS.filter((r) => {
    const matchSearch =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.cuisine.toLowerCase().includes(search.toLowerCase());
    const matchCat =
      activeCategory === "All" ||
      r.cuisine.toLowerCase().includes(activeCategory.toLowerCase()) ||
      r.menu.some((m) =>
        m.category.toLowerCase().includes(activeCategory.toLowerCase()),
      );
    return matchSearch && matchCat;
  });

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>
              Hey, {user?.name.split(" ")[0]} 👋
            </Text>
            <View style={styles.locationRow}>
              <Text style={styles.locationIcon}>📍</Text>
              <Text style={styles.location}>Indore, MP</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.avatar}
            onPress={() => navigation.navigate("Profile")}
          >
            <Text style={styles.avatarText}>{user?.avatar}</Text>
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View style={styles.searchRow}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search restaurants or dishes..."
            placeholderTextColor={COLORS.textMuted}
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch("")}>
              <Text style={{ fontSize: 18, color: COLORS.textMuted }}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Banner */}
        <View style={styles.banner}>
          <View style={styles.bannerContent}>
            <Text style={styles.bannerLabel}>TODAY'S SPECIAL</Text>
            <Text style={styles.bannerTitle}>
              Get 30% off{"\n"}your first order
            </Text>
            <TouchableOpacity style={styles.bannerBtn}>
              <Text style={styles.bannerBtnText}>Order Now</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.bannerEmoji}>🍜</Text>
        </View>

        {/* Categories */}
        <Text style={styles.sectionTitle}>Categories</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.catScroll}
        >
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.catChip,
                activeCategory === cat && styles.catChipActive,
              ]}
              onPress={() => setActiveCategory(cat)}
            >
              <Text
                style={[
                  styles.catText,
                  activeCategory === cat && styles.catTextActive,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Restaurants */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Nearby Restaurants</Text>
          <Text style={styles.seeAll}>{filtered.length} found</Text>
        </View>

        {filtered.map((restaurant) => (
          <TouchableOpacity
            key={restaurant.id}
            style={styles.card}
            onPress={() =>
              navigation.navigate("Restaurant", { restaurantId: restaurant.id })
            }
            activeOpacity={0.85}
          >
            {/* Card Image Area */}
            <View
              style={[
                styles.cardImage,
                { backgroundColor: restaurant.bgColor },
              ]}
            >
              <Text style={styles.cardEmoji}>{restaurant.emoji}</Text>
              {restaurant.offer && (
                <View style={styles.offerBadge}>
                  <Text style={styles.offerText}>{restaurant.offer}</Text>
                </View>
              )}
            </View>
            {/* Card Info */}
            <View style={styles.cardInfo}>
              <View style={styles.cardTopRow}>
                <Text style={styles.cardName}>{restaurant.name}</Text>
                <View style={styles.ratingChip}>
                  <Text style={styles.starText}>⭐</Text>
                  <Text style={styles.ratingText}>{restaurant.rating}</Text>
                </View>
              </View>
              <Text style={styles.cardCuisine}>{restaurant.cuisine}</Text>
              <View style={styles.cardMeta}>
                <View style={styles.metaItem}>
                  <Text style={styles.metaIcon}>⏱</Text>
                  <Text style={styles.metaText}>{restaurant.deliveryTime}</Text>
                </View>
                <View style={styles.metaDot} />
                <View style={styles.metaItem}>
                  <Text style={styles.metaIcon}>📍</Text>
                  <Text style={styles.metaText}>{restaurant.distance}</Text>
                </View>
                <View style={styles.metaDot} />
                <View style={styles.metaItem}>
                  <Text style={styles.metaIcon}>🛵</Text>
                  <Text style={styles.metaText}>
                    {restaurant.deliveryFee === 0
                      ? "Free"
                      : `₹${restaurant.deliveryFee}`}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {filtered.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={{ fontSize: 48 }}>🍽️</Text>
            <Text style={styles.emptyText}>No restaurants found</Text>
            <Text style={styles.emptySubText}>
              Try a different search or category
            </Text>
          </View>
        )}

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  greeting: { fontSize: 22, fontWeight: "800", color: COLORS.accent },
  locationRow: { flexDirection: "row", alignItems: "center", marginTop: 4 },
  locationIcon: { fontSize: 12 },
  location: { fontSize: 13, color: COLORS.textSecondary, marginLeft: 2 },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { color: COLORS.white, fontWeight: "700", fontSize: 14 },

  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    marginVertical: 12,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 2,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  searchIcon: { fontSize: 16, marginRight: 8 },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textPrimary,
    paddingVertical: 12,
  },

  banner: {
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: COLORS.accent,
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: COLORS.accent,
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  bannerContent: { flex: 1 },
  bannerLabel: {
    fontSize: 11,
    color: COLORS.secondary,
    letterSpacing: 1.5,
    fontWeight: "700",
    marginBottom: 6,
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.white,
    lineHeight: 26,
    marginBottom: 14,
  },
  bannerBtn: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: "flex-start",
  },
  bannerBtnText: { color: COLORS.accent, fontWeight: "700", fontSize: 13 },
  bannerEmoji: { fontSize: 64 },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.accent,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 20,
  },
  seeAll: { fontSize: 13, color: COLORS.textSecondary },

  catScroll: { paddingLeft: 20, marginBottom: 20 },
  catChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    marginRight: 10,
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  catChipActive: { backgroundColor: COLORS.accent, borderColor: COLORS.accent },
  catText: { fontSize: 13, color: COLORS.textSecondary, fontWeight: "600" },
  catTextActive: { color: COLORS.white },

  card: {
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 18,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 3,
  },
  cardImage: {
    height: 140,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  cardEmoji: { fontSize: 72 },
  offerBadge: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: COLORS.accent,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  offerText: { color: COLORS.white, fontSize: 11, fontWeight: "700" },
  cardInfo: { padding: 14 },
  cardTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  cardName: { fontSize: 17, fontWeight: "700", color: COLORS.accent, flex: 1 },
  ratingChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff8e1",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    gap: 3,
  },
  starText: { fontSize: 12 },
  ratingText: { fontSize: 13, fontWeight: "700", color: "#e6a800" },
  cardCuisine: { fontSize: 13, color: COLORS.textSecondary, marginBottom: 10 },
  cardMeta: { flexDirection: "row", alignItems: "center" },
  metaItem: { flexDirection: "row", alignItems: "center", gap: 3 },
  metaIcon: { fontSize: 12 },
  metaText: { fontSize: 12, color: COLORS.textSecondary },
  metaDot: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: COLORS.secondary,
    marginHorizontal: 8,
  },

  emptyState: { alignItems: "center", paddingVertical: 48 },
  emptyText: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.accent,
    marginTop: 12,
  },
  emptySubText: { fontSize: 14, color: COLORS.textSecondary, marginTop: 4 },
});
