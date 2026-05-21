import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import OnboardingOne from "../screens/auth/OnboardingOne";
import OnboardingTwo from "../screens/auth/OnboardingTwo";
import OnboardingThree from "../screens/auth/OnboardingThree";
import Login from "../screens/auth/Login";
import Register from "../screens/auth/Register";
import ForgotPassword from "../screens/auth/ForgotPassword";

import Home from "../screens/tabs/Home";
import Search from "../screens/tabs/Search";
import Orders from "../screens/tabs/Orders";
import Profile from "../screens/tabs/Profile";

import RestaurantScreen from "../screens/RestaurantScreen";
import CartScreen from "../screens/CartScreen";
import MenuItemScreen from "../screens/MenuItemScreen";
import OrderConfirmScreen from "../screens/OrderConfirmScreen";

import { useAuth } from "../context/AuthContext";
import { COLORS } from "../theme/colors";

// Auth routes
export type AuthStackParamList = {
  OnboardingOne: undefined;
  OnboardingTwo: undefined;
  OnboardingThree: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

// Routes logged-in user
export type AppStackParamList = {
  Main: undefined;
  Restaurant: { restaurantId: string };
  MenuItem: { restaurantId: string; itemId: string };
  Cart: undefined;
  OrderConfirm: { total: number; restaurantId: string };
};

export type RootStackParamList = AuthStackParamList & AppStackParamList;

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const AppStack = createNativeStackNavigator<AppStackParamList>();
const Tabs = createBottomTabNavigator();

type IoniconName = React.ComponentProps<typeof Ionicons>["name"];

function TabsNav() {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.accent,
        tabBarInactiveTintColor: COLORS.textMuted,
        tabBarStyle: {
          borderTopColor: COLORS.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: "600" },
        tabBarIcon: ({ color, focused, size }) => {
          const icons: Record<string, [IoniconName, IoniconName]> = {
            Home: ["home-outline", "home"],
            Search: ["search-outline", "search"],
            Orders: ["receipt-outline", "receipt"],
            Profile: ["person-outline", "person"],
          };
          const [outline, filled] = icons[route.name] ?? [
            "ellipse-outline",
            "ellipse",
          ];
          return (
            <Ionicons
              name={focused ? filled : outline}
              size={(size ?? 22) + 2}
              color={color}
            />
          );
        },
      })}
    >
      <Tabs.Screen name="Home" component={Home} />
      <Tabs.Screen name="Search" component={Search} />
      <Tabs.Screen name="Orders" component={Orders} />
      <Tabs.Screen name="Profile" component={Profile} />
    </Tabs.Navigator>
  );
}

function AuthNavigator() {
  return (
    <AuthStack.Navigator
      initialRouteName="OnboardingOne"
      screenOptions={{ headerShown: false }}
    >
      <AuthStack.Screen name="OnboardingOne" component={OnboardingOne} />
      <AuthStack.Screen name="OnboardingTwo" component={OnboardingTwo} />
      <AuthStack.Screen name="OnboardingThree" component={OnboardingThree} />
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Register" component={Register} />
      <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
    </AuthStack.Navigator>
  );
}

function AppNavigator() {
  return (
    <AppStack.Navigator
      initialRouteName="Main"
      screenOptions={{ headerShown: false }}
    >
      <AppStack.Screen name="Main" component={TabsNav} />
      <AppStack.Screen name="Restaurant" component={RestaurantScreen} />
      <AppStack.Screen name="MenuItem" component={MenuItemScreen} />
      <AppStack.Screen name="Cart" component={CartScreen} />
      <AppStack.Screen name="OrderConfirm" component={OrderConfirmScreen} />
    </AppStack.Navigator>
  );
}

export default function Navigation() {
  const { user } = useAuth();
  return (
    <NavigationContainer>
      {user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
