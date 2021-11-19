import React, { useContext, useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { BiUserCircle } from 'react-icons/bi';

import navLogo from '../../Assets/Images/nav-logo.png';
import { CartContext } from '../../Context/CartContext';
import { UserAuthContext } from '../../Context/UserAuthContext';

import './NavBar.css';
import { CartWidget } from './CartWidget';
import { UserWidget } from './UserWidget';

export const NavBar = () => {
  const location = useLocation().pathname;
  const { cart } = useContext(CartContext);
  const [showCart, setShowCart] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    setShowCart(cart.length !== 0);
  }, [cart]);

  const handleShowUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };
  const { isAuthenticated } = useContext(UserAuthContext);

  return (
    <header>
      <nav className={`nav-menu ${location === '/' && '--home'}`}>
        <Link className="nav-logo-link" to="/">
          <img alt="sample bucket logo" className="nav-logo" src={navLogo} />
        </Link>
        <NavLink
          activeClassName="nav-active-link"
          className="nav-link"
          to="/home"
        >
          Inicio
        </NavLink>

        <div>
          <NavLink
            activeClassName="nav-active-link"
            className="nav-link"
            to="/products"
          >
            Productos
          </NavLink>
        </div>

        {isAuthenticated && (
          <NavLink
            activeClassName={'nav-active-link'}
            className="nav-link"
            to="/orders"
          >
            Carrito
          </NavLink>
        )}

        {!isAuthenticated && (
          <NavLink
            activeClassName={'nav-active-link'}
            className={`nav-link ${showCart ? '' : '--margin-rigth'}`}
            to="/login"
          >
            Ingresa con tu cuenta
          </NavLink>
        )}

        {showCart && (
          <NavLink
            className={`nav-link ${isAuthenticated ? '' : '--margin-rigth'}`}
            to="/cart"
          >
            <CartWidget />
          </NavLink>
        )}
        {isAuthenticated && (
          <>
            <BiUserCircle
              alt="user panel"
              className={'nav-icon  --margin-rigth --user'}
              onClick={handleShowUserMenu}
            />
            <UserWidget showUserMenu={showUserMenu} />
          </>
        )}
      </nav>
    </header>
  );
};
