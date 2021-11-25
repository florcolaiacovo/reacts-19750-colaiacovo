import React, { createContext, useEffect, useState } from 'react';

export const CartContext = createContext();

const init = JSON.parse(localStorage.getItem('cart')) || [];

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(init);
  const addToCart = (item) => {
    setCart([...cart, item]);
  };
  const removeItem = (id) => {
    const newCart = cart.filter((item) => item.id !== id);

    setCart(newCart);
  };
  const getQuantity = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };
  const getTotal = () => {
    return cart.reduce((acc, item) => acc + item.quantity * item.price, 0);
  };
  const isInCart = (id) => {
    return cart.some((item) => item.id === id);
  };
  const emptyCart = () => {
    setCart([]);
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        removeItem,
        getQuantity,
        getTotal,
        isInCart,
        emptyCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
