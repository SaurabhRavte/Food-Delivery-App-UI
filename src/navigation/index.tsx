import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";

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
import ProfileScreen from "../screens/ProfileScreen";

import { MenuItem } from "../data/mockData";

export type RootStackParamList = {
  OnboardingOne: undefined;
  OnboardingTwo: undefined;
  OnboardingThree: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  Main: undefined;
  Home: undefined;
  Restaurant: { restaurantId: string };
  MenuItem: { restaurantId: string; itemId: string };
  Cart: { cart: (MenuItem & { qty: number })[]; restaurantId: string };
  OrderConfirm: { total: number; restaurantId: string };
  Profile: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator();

function TabsNav() {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          const icons: Record<string, string> = {
            Home: "🏠",
            Search: "🔍",
            Orders: "📦",
            Profile: "👤",
          };
          return (
            <Text style={{ fontSize: size - 4 }}>{icons[route.name]}</Text>
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

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="OnboardingOne"
        screenOptions={{ headerShown: false }}
      >
        <RootStack.Screen name="OnboardingOne" component={OnboardingOne} />
        <RootStack.Screen name="OnboardingTwo" component={OnboardingTwo} />
        <RootStack.Screen name="OnboardingThree" component={OnboardingThree} />
        <RootStack.Screen name="Login" component={Login} />
        <RootStack.Screen name="Register" component={Register} />
        <RootStack.Screen name="ForgotPassword" component={ForgotPassword} />
        <RootStack.Screen name="Main" component={TabsNav} />
        <RootStack.Screen name="Home" component={TabsNav} />
        <RootStack.Screen name="Restaurant" component={RestaurantScreen} />
        <RootStack.Screen name="MenuItem" component={MenuItemScreen} />
        <RootStack.Screen name="Cart" component={CartScreen} />
        <RootStack.Screen name="OrderConfirm" component={OrderConfirmScreen} />
        <RootStack.Screen name="Profile" component={ProfileScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
