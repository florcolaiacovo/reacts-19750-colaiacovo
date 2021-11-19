import React, { useContext } from 'react';
import { HiOutlineShoppingCart } from 'react-icons/hi';

import { CartContext } from '../../Context/CartContext';

export const CartWidget = () => {
  const { getQuantity } = useContext(CartContext);

  return (
    <div className="shopping-cart-combo">
      <HiOutlineShoppingCart alt="shopping cart" className="nav-icon" />
      <p className="items-in-cart">{getQuantity()}</p>
    </div>
  );
};
