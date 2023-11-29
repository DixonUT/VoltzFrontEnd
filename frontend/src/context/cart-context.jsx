import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "./auth-content";

const CART_STORAGE_KEY = "cartItems";

const CartContext = createContext();
const serverhost = import.meta.env.VITE_SERVERHOST;

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || []
  );
  const { isAuthenticated } = useAuth();

  // Save cart to local storage whenever cartItems change
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (cartItems.length == 0) {
      if (!isAuthenticated) {
        setCartItems(JSON.parse(localStorage.getItem(CART_STORAGE_KEY)));
      } else {
        fetchSavedCart();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const addToCart = (product) => {
    setCartItems((currentItems) => {
      // Check if the item is already in the cart
      const itemExists = currentItems.find(
        (item) => item.productId === product.id
      );
      let items;
      if (itemExists) {
        itemExists.quantity = itemExists.quantity + 1;
        items = [...currentItems];
      } else {
        items = [
          ...currentItems,
          { ...product, productId: product.id, quantity: 1 },
        ];
      }
      updateSavedCart(items);
      return items;
    });
  };

  const checkout = async () => {
    try { 
      console.log(JSON.stringify(cartItems))

      const response = await fetch(`${serverhost}/api/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("token") || "",
        },
        body: JSON.stringify({cartItems}),
      });
const datathing = await response.json();
console.log(datathing)
      if (response.ok) {
        setCartItems([]);
        toast("Purchase successful!", { type: "success" });
      } else {
        const errorData = await response.json();
        toast(errorData.message, { type: "error" });
      }
    } catch (error) {
      toast(error.toString(), { type: "error" });
      console.error(
        "An error occurred during checkout. Please try again.",
        error
      );
    }
  };

  const removeFromCart = (productId) => {
    setCartItems((currentItems) => {
      const items = currentItems.filter((item) => item.productId !== productId);
      updateSavedCart(items);
      return items;
    });
  };

  const updateQuantity = (productId, quantity) => {
    setCartItems((currentItems) => {
      const items = currentItems.map((item) =>
        item.productId === productId ? { ...item, quantity: quantity } : item
      );
      updateSavedCart(items);
      return items;
    });
  };

  const updateSavedCart = async (updatedCart) => {
    if (!isAuthenticated) {
      return;
    }
    try {
      const response = await fetch(`${serverhost}/api/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token") || "",
        },
        body: JSON.stringify(updatedCart),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error updating cart on the backend:", errorData);
      }
    } catch (error) {
      console.error("Error updating cart on the backend:", error);
    }
  };
  const fetchSavedCart = async () => {
    try {
      const response = await fetch(`${serverhost}/api/cart`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token") || "",
        },
      });

      if (response.ok) {
        const cartData = await response.json();
        setCartItems(cartData);
      }
    } catch (error) {
      console.error("Error fetching cart from the backend:", error);
    }
  };
  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, checkout }}
    >
      {children}
    </CartContext.Provider>
  );
};
