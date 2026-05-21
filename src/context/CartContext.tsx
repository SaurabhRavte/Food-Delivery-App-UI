import React, { createContext, useContext, useState, useMemo } from "react";
import type { MenuItem } from "../data/mockData";

export type CartItem = MenuItem & { qty: number };

type CartContextType = {
  cart: CartItem[];
  restaurantId: string | null;
  addToCart: (item: MenuItem, restaurantId: string, qty?: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getQty: (id: string) => number;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextType>({
  cart: [],
  restaurantId: null,
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  getQty: () => 0,
  totalItems: 0,
  totalPrice: 0,
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [restaurantId, setRestaurantId] = useState<string | null>(null);

  const addToCart = (item: MenuItem, rid: string, qty: number = 1) => {
    if (restaurantId && restaurantId !== rid) {
      setCart([{ ...item, qty }]);
      setRestaurantId(rid);
      return;
    }
    setRestaurantId(rid);
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) {
        return prev.map((c) =>
          c.id === item.id ? { ...c, qty: c.qty + qty } : c,
        );
      }
      return [...prev, { ...item, qty }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === id);
      if (!existing) return prev;
      if (existing.qty === 1) {
        const next = prev.filter((c) => c.id !== id);
        if (next.length === 0) setRestaurantId(null);
        return next;
      }
      return prev.map((c) => (c.id === id ? { ...c, qty: c.qty - 1 } : c));
    });
  };

  const clearCart = () => {
    setCart([]);
    setRestaurantId(null);
  };

  const getQty = (id: string) => cart.find((c) => c.id === id)?.qty ?? 0;

  const { totalItems, totalPrice } = useMemo(() => {
    return {
      totalItems: cart.reduce((s, c) => s + c.qty, 0),
      totalPrice: cart.reduce((s, c) => s + c.price * c.qty, 0),
    };
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        restaurantId,
        addToCart,
        removeFromCart,
        clearCart,
        getQty,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
