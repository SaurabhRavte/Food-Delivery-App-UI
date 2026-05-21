import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

import OnboardingOne from "../screens/auth/OnboardingOne";
import OnboardingTwo from "../screens/auth/OnboardingTwo";
import OnboardingThree from "../screens/auth/OnboardingThree";
import Login from "../screens/auth/Login";
import Register from "../screens/auth/Register";
import ForgotPassword from "../screens/auth/ForgotPassword";

// Tab screens
import Home from "../screens/tabs/Home";
import Search from "../screens/tabs/Search";
import Orders from "../screens/tabs/Orders";
import Profile from "../screens/tabs/Profile";

import RestaurantDetails from "../screens/RestaurantDetails";
import Cart from "../screens/Cart";

const RootStack = createStackNavigator();
const HomeStack = createStackNavigator();
const Tabs = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// Home tab
function HomeStackNav() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeMain" component={Home} />
      <HomeStack.Screen
        name="RestaurantDetails"
        component={RestaurantDetails}
      />
    </HomeStack.Navigator>
  );
}

// Bottom tabs
function TabsNav() {
  return (
    <Tabs.Navigator screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="Home" component={HomeStackNav} />
      <Tabs.Screen name="Search" component={Search} />
      <Tabs.Screen name="Orders" component={Orders} />
      <Tabs.Screen name="Profile" component={Profile} />
    </Tabs.Navigator>
  );
}

// Drawer tabs
function DrawerNav() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="TabsGroup" component={TabsNav} />
    </Drawer.Navigator>
  );
}

// Root stack
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

        <RootStack.Screen name="Main" component={DrawerNav} />
        <RootStack.Screen name="Cart" component={Cart} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
