import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem("cf_cart")) || []; } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem("cf_cart", JSON.stringify(items));
  }, [items]);

  const addItem = (product) => {
    setItems((prev) => {
      const found = prev.find((i) => i.slug === product.slug);
      if (found) return prev.map((i) => (i.slug === product.slug ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { slug: product.slug, name: product.name, price: product.price, image: product.image, qty: 1 }];
    });
  };
  const removeItem = (slug) => setItems((prev) => prev.filter((i) => i.slug !== slug));
  const updateQty = (slug, qty) => setItems((prev) => prev.map((i) => (i.slug === slug ? { ...i, qty: Math.min(99, Math.max(1, qty)) } : i)));
  const clear = () => setItems([]);
  const count = items.reduce((n, i) => n + i.qty, 0);
  const subtotal = items.reduce((n, i) => n + (i.price || 0) * i.qty, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clear, count, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
