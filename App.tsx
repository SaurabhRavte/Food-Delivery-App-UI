import React from "react";
import Navigation from "./src/navigation";
import { AuthProvider } from "./src/context/AuthContext";
import { CartProvider } from "./src/context/CartContext";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <CartProvider>
          <Navigation />
        </CartProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
