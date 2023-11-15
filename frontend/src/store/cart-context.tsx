import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useMemo, useState } from "react";
import { ItemType } from "../types/types";

type CartItem = {
  item: ItemType;
  quantity: number;
};

type CartContextProps = {
  cartItems: CartItem[];
  setCartItems: Dispatch<SetStateAction<CartItem[]>>;
  addToCart: (item: ItemType) => void;
  increaseQuantity: (item: ItemType) => void;
  decreaseQuantity: (item: ItemType) => void;
};

export const CartContext = createContext<CartContextProps>({
  cartItems: [],
  setCartItems: () => {},
  addToCart: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  const fetchCart = () => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  };

  const addToCart = (item: ItemType) => {
    const itemIndex = cartItems.findIndex((cartItem: any) => cartItem.item.id === item.id);

    if (itemIndex !== -1) {
      const updatedCart = [...cartItems];
      updatedCart.splice(itemIndex, 1);
      setCartItems(updatedCart);
    } else {
      const updatedCart = [...cartItems, { item, quantity: 1 }];
      setCartItems(updatedCart);
    }
  };

	const increaseQuantity = (item: ItemType) => {
    const updatedCart = cartItems.map((cartItem) =>
      cartItem.item.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
    );
    setCartItems(updatedCart);
  };

  const decreaseQuantity = (item: ItemType) => {
    const updatedCart = cartItems.map((cartItem) =>
      cartItem.item.id === item.id && cartItem.quantity > 1
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
    setCartItems(updatedCart);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const values = useMemo(() => {
    return { cartItems, setCartItems, addToCart, increaseQuantity, decreaseQuantity };
  }, [cartItems]);

  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};
