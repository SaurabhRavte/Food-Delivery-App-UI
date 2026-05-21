import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  useNavigation,
  CompositeNavigationProp,
} from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../theme/colors";
import {
  RESTAURANTS,
  TRENDING_SEARCHES,
  type MenuItem,
  type Restaurant,
} from "../../data/mockData";
import type { AppStackParamList } from "../../navigation";

type TabParamList = {
  Home: undefined;
  Search: undefined;
  Orders: undefined;
  Profile: undefined;
};

type TabNav = BottomTabNavigationProp<TabParamList, "Search">;
type AppNav = NativeStackNavigationProp<AppStackParamList>;
type Nav = CompositeNavigationProp<TabNav, AppNav>;

type DishHit = MenuItem & {
  restaurantId: string;
  restaurantName: string;
  restaurantImage: string;
};

export default function Search() {
  const navigation = useNavigation<Nav>();
  const [query, setQuery] = useState("");
  const [recent, setRecent] = useState<string[]>([
    "Paneer",
    "Pizza",
    "Filter Coffee",
  ]);

  const q = query.trim().toLowerCase();

  // Filter restaurants
  const restaurantHits: Restaurant[] = useMemo(() => {
    if (!q) return [];
    return RESTAURANTS.filter(
      (r) =>
        r.name.toLowerCase().includes(q) || r.cuisine.toLowerCase().includes(q),
    );
  }, [q]);

  // Filter dishes across all restaurants
  const dishHits: DishHit[] = useMemo(() => {
    if (!q) return [];
    const hits: DishHit[] = [];
    for (const r of RESTAURANTS) {
      for (const m of r.menu) {
        if (
          m.name.toLowerCase().includes(q) ||
          m.description.toLowerCase().includes(q) ||
          m.category.toLowerCase().includes(q)
        ) {
          hits.push({
            ...m,
            restaurantId: r.id,
            restaurantName: r.name,
            restaurantImage: r.image,
          });
        }
      }
    }
    return hits;
  }, [q]);

  const totalHits = restaurantHits.length + dishHits.length;

  const commitRecent = (term: string) => {
    if (!term.trim()) return;
    setRecent((prev) => {
      const next = [
        term,
        ...prev.filter((t) => t.toLowerCase() !== term.toLowerCase()),
      ];
      return next.slice(0, 6);
    });
  };

  const handleSubmit = () => {
    if (query.trim()) commitRecent(query.trim());
    Keyboard.dismiss();
  };

  const useTerm = (term: string) => {
    setQuery(term);
    commitRecent(term);
  };

  const clearRecent = () => setRecent([]);

  const goToRestaurant = (id: string) => {
    if (query.trim()) commitRecent(query.trim());
    navigation.navigate("Restaurant", { restaurantId: id });
  };

  const goToDish = (d: DishHit) => {
    if (query.trim()) commitRecent(query.trim());
    navigation.navigate("MenuItem", {
      restaurantId: d.restaurantId,
      itemId: d.id,
    });
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Header / search input */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Search</Text>
        <View style={styles.searchRow}>
          <Ionicons name="search" size={18} color={COLORS.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for restaurants or dishes..."
            placeholderTextColor={COLORS.textMuted}
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={handleSubmit}
            returnKeyType="search"
            autoFocus={false}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery("")}>
              <Ionicons
                name="close-circle"
                size={20}
                color={COLORS.textMuted}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {/* Idle state - no query yet */}
        {!q && (
          <>
            {recent.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Recent searches</Text>
                  <TouchableOpacity onPress={clearRecent}>
                    <Text style={styles.clearLink}>Clear</Text>
                  </TouchableOpacity>
                </View>
                {recent.map((term) => (
                  <TouchableOpacity
                    key={term}
                    style={styles.recentRow}
                    onPress={() => useTerm(term)}
                  >
                    <Ionicons
                      name="time-outline"
                      size={18}
                      color={COLORS.textMuted}
                    />
                    <Text style={styles.recentText}>{term}</Text>
                    <Ionicons
                      name="arrow-up-outline"
                      size={16}
                      color={COLORS.textMuted}
                      style={{ transform: [{ rotate: "-45deg" }] }}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Trending now</Text>
              <View style={styles.chipsWrap}>
                {TRENDING_SEARCHES.map((term) => (
                  <TouchableOpacity
                    key={term}
                    style={styles.trendChip}
                    onPress={() => useTerm(term)}
                  >
                    <Ionicons
                      name="flame"
                      size={13}
                      color={COLORS.error}
                      style={{ marginRight: 4 }}
                    />
                    <Text style={styles.trendChipText}>{term}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Popular near you</Text>
              {RESTAURANTS.slice(0, 3).map((r) => (
                <TouchableOpacity
                  key={r.id}
                  style={styles.popularRow}
                  onPress={() => goToRestaurant(r.id)}
                >
                  <Image
                    source={{ uri: r.image }}
                    style={styles.popularImage}
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.popularName}>{r.name}</Text>
                    <Text style={styles.popularCuisine} numberOfLines={1}>
                      {r.cuisine}
                    </Text>
                    <View style={styles.popularMeta}>
                      <Ionicons name="star" size={11} color={COLORS.star} />
                      <Text style={styles.popularMetaText}>{r.rating}</Text>
                      <Text style={styles.popularDot}>•</Text>
                      <Text style={styles.popularMetaText}>
                        {r.deliveryTime}
                      </Text>
                    </View>
                  </View>
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={COLORS.textMuted}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

        {/* Active query - show results */}
        {!!q && (
          <>
            <Text style={styles.resultsHeader}>
              {totalHits} result{totalHits === 1 ? "" : "s"} for "{query.trim()}
              "
            </Text>

            {totalHits === 0 && (
              <View style={styles.emptyState}>
                <Ionicons
                  name="sad-outline"
                  size={56}
                  color={COLORS.textMuted}
                />
                <Text style={styles.emptyTitle}>No matches</Text>
                <Text style={styles.emptySub}>
                  We couldn't find anything for "{query.trim()}".{"\n"}
                  Try a different keyword.
                </Text>
              </View>
            )}

            {/* Restaurants */}
            {restaurantHits.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  Restaurants ({restaurantHits.length})
                </Text>
                {restaurantHits.map((r) => (
                  <TouchableOpacity
                    key={r.id}
                    style={styles.resultRow}
                    onPress={() => goToRestaurant(r.id)}
                    activeOpacity={0.85}
                  >
                    <Image
                      source={{ uri: r.image }}
                      style={styles.resultImage}
                    />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.resultName} numberOfLines={1}>
                        {r.name}
                      </Text>
                      <Text style={styles.resultSub} numberOfLines={1}>
                        {r.cuisine}
                      </Text>
                      <View style={styles.resultMeta}>
                        <Ionicons name="star" size={11} color={COLORS.star} />
                        <Text style={styles.resultMetaText}>{r.rating}</Text>
                        <Text style={styles.popularDot}>•</Text>
                        <Ionicons
                          name="time-outline"
                          size={11}
                          color={COLORS.textSecondary}
                        />
                        <Text style={styles.resultMetaText}>
                          {r.deliveryTime}
                        </Text>
                      </View>
                    </View>
                    <Ionicons
                      name="chevron-forward"
                      size={20}
                      color={COLORS.textMuted}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Dishes */}
            {dishHits.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  Dishes ({dishHits.length})
                </Text>
                {dishHits.map((d) => (
                  <TouchableOpacity
                    key={`${d.restaurantId}-${d.id}`}
                    style={styles.resultRow}
                    onPress={() => goToDish(d)}
                    activeOpacity={0.85}
                  >
                    <View style={styles.dishImageWrap}>
                      <Image
                        source={{ uri: d.image }}
                        style={styles.resultImage}
                      />
                      <View
                        style={[
                          styles.vegDot,
                          {
                            backgroundColor: d.isVeg
                              ? COLORS.success
                              : COLORS.error,
                          },
                        ]}
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.resultName} numberOfLines={1}>
                        {d.name}
                      </Text>
                      <Text style={styles.resultSub} numberOfLines={1}>
                        from {d.restaurantName}
                      </Text>
                      <View style={styles.resultMeta}>
                        <Text style={styles.dishPrice}>₹{d.price}</Text>
                        <Text style={styles.popularDot}>•</Text>
                        <Ionicons name="star" size={11} color={COLORS.star} />
                        <Text style={styles.resultMetaText}>{d.rating}</Text>
                      </View>
                    </View>
                    <Ionicons
                      name="chevron-forward"
                      size={20}
                      color={COLORS.textMuted}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: COLORS.accent,
    marginBottom: 12,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 2,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    gap: 8,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textPrimary,
    paddingVertical: 12,
  },

  section: { paddingHorizontal: 20, marginTop: 20 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.accent,
    marginBottom: 10,
  },
  clearLink: { fontSize: 13, color: COLORS.error, fontWeight: "600" },

  recentRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  recentText: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textPrimary,
    fontWeight: "500",
  },

  chipsWrap: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  trendChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  trendChipText: {
    fontSize: 13,
    color: COLORS.textPrimary,
    fontWeight: "600",
  },

  popularRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 10,
    marginBottom: 10,
    gap: 12,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  popularImage: { width: 56, height: 56, borderRadius: 10 },
  popularName: { fontSize: 15, fontWeight: "700", color: COLORS.accent },
  popularCuisine: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  popularMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },
  popularMetaText: { fontSize: 12, color: COLORS.textSecondary },
  popularDot: { color: COLORS.textMuted, marginHorizontal: 2 },

  resultsHeader: {
    paddingHorizontal: 20,
    paddingTop: 14,
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: "600",
  },
  resultRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: 10,
    marginBottom: 10,
    gap: 12,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  resultImage: { width: 60, height: 60, borderRadius: 10 },
  dishImageWrap: { position: "relative" },
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
  resultName: { fontSize: 15, fontWeight: "700", color: COLORS.accent },
  resultSub: { fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
  resultMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },
  resultMetaText: { fontSize: 12, color: COLORS.textSecondary },
  dishPrice: { fontSize: 13, fontWeight: "800", color: COLORS.accent },

  emptyState: { alignItems: "center", paddingVertical: 56, gap: 8 },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.accent,
    marginTop: 12,
  },
  emptySub: {
    fontSize: 13,
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: 20,
  },
});
