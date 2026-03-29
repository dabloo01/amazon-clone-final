import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const API_CART = "http://localhost:5000/api/products/cart";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from backend on mount
  const fetchCart = async () => {
    try {
      const res = await axios.get(API_CART);
      setCartItems(res.data);
    } catch (err) {
      console.log("Error fetching cart:", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Add to cart (updates backend and context)
  const addToCart = async (product) => {
    try {
      // POST to backend
      await axios.post(API_CART, {
        product_id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      });

      // Update context locally
      setCartItems((prev) => {
        const existing = prev.find((item) => item.product_id === product.id);
        if (existing) {
          return prev.map((item) =>
            item.product_id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prev, { ...product, product_id: product.id, quantity: 1 }];
      });
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Failed to add to cart!");
    }
  };

  const removeFromCart = async (id) => {
    try {
      await axios.delete(`${API_CART}/${id}`);
      setCartItems((prev) => prev.filter((item) => item.product_id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const decreaseQuantity = async (id) => {
    const item = cartItems.find((i) => i.product_id === id);
    if (!item) return;

    try {
      const newQty = item.quantity - 1;
      if (newQty <= 0) {
        await removeFromCart(id);
      } else {
        await axios.put(`${API_CART}/${id}`, { quantity: newQty });
        setCartItems((prev) =>
          prev.map((i) =>
            i.product_id === id ? { ...i, quantity: newQty } : i
          )
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, decreaseQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);