import React, { useContext } from 'react';
import { HiInformationCircle, HiTag } from 'react-icons/hi';
import { ImArrowDown2, ImArrowUp2 } from 'react-icons/im';
import { Link } from 'react-router-dom';

import { CartContext } from '../../Context/CartContext';
import './Cart.css';

export const Cart = () => {
  const { cart, setCart, emptyCart, removeItem, getTotal } =
    useContext(CartContext);
  const handleQuantityMinus = (id) => {
    const newCart = [...cart];

    newCart.map((item) => {
      if (item.quantity > 1) {
        item.id === id && (item.quantity -= 1);
      }
      return true;
    });
    setCart(newCart);
  };
  const handleQuantityPlus = (id) => {
    const newCart = [...cart];

    newCart.map((item) => {
      if (item.quantity < item.stock) {
        item.id === id && (item.quantity += 1);
      }
      return true;
    });
    setCart(newCart);
  };

  return cart.length === 0 ? (
    <div className="cart-empty-flex">
      <h2 className="cart-empty-title">Tu carrito está vacío</h2>
      <Link className="btn-item-cart-delete --center" to="/products">
        Ver productos
      </Link>
    </div>
  ) : (
    <div className="item-cart-main">
      {cart.map((item, key) => (
        <div key={key}>
          <div className="item-cart-flex">
            <Link className="nav-link" to={`/productDetails/${item.id}`}>
              <img
                alt={`${item.name} ${item.description}`}
                className="item-card-img --cart"
                src={item.img}
              ></img>
            </Link>
            <Link
              className="nav-link --underline"
              to={`/productDetails/${item.id}`}
            >
              <p className="item-card-product-name">{item.name}</p>
            </Link>
            <p className="item-card-description">
              <HiInformationCircle className="item-card-icon" />
              {item.description}
            </p>
            <p className="item-card-price ">
              <HiTag className="item-card-icon" /> ${item.price}
            </p>

            <div className="quantity">
              <button className="quantity-btn">
                <ImArrowDown2
                  className="qty-icon"
                  onClick={() => handleQuantityMinus(item.id)}
                />
              </button>
              <p className="item-card-price --qty">{`Cantidad: ${item.quantity}`}</p>

              <button className="quantity-btn">
                <ImArrowUp2
                  className="qty-icon"
                  onClick={() => handleQuantityPlus(item.id)}
                />
              </button>
            </div>

            <p className="item-card-price">{`Subtotal: $${
              item.quantity * item.price
            }`}</p>
            <button
              className="btn-item-cart-delete"
              onClick={() => removeItem(item.id)}
            >
              Borrar
            </button>
          </div>
        </div>
      ))}
      <div className="cart-total">
        <p className="cart-total-text">{`Total: $${getTotal()}`}</p>
        <button className="btn-item-cart-delete" onClick={emptyCart}>
          Vaciar carrito
        </button>
        <Link className="nav-link btn-item-cart-delete" to={'/checkout'}>
          Pagar
        </Link>
      </div>
    </div>
  );
};
