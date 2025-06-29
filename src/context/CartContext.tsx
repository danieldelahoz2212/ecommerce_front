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
  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
