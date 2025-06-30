/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, ReactNode } from "react";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  increaseQty: (id: number) => void;
  decreaseQty: (id: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);
  const addToCart = (product: Product) => setCart((prev) => [...prev, product]);
  const removeFromCart = (id: number) => setCart((prev) => prev.filter((p) => p.id !== id));
  const increaseQty = (id: number) => {
    const prod = cart.find((p) => p.id === id);
    if (prod) setCart((prev) => [...prev, prod]);
  };
  const decreaseQty = (id: number) => {
    const idx = cart.findIndex((p) => p.id === id);
    if (idx !== -1) setCart((prev) => prev.filter((_, i) => i !== idx));
  };
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, increaseQty, decreaseQty }}>
      {children}
    </CartContext.Provider>
  );
};
