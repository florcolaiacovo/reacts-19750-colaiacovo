/* eslint space-before-function-paren: "off" */
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import { NavBar } from './Components/NavBar/NavBar';
import { ItemListContainer } from './Components/ItemListContainer/ItemListContainer';
import { ItemDetailContainer } from './Components/ItemDetailContainer/ItemDetailContainer';
import { HomeContainer } from './Components/Home/HomeContainer';
import { Footer } from './Components/Footer/Footer';
import { Cart } from './Components/Cart/Cart';
import { CartProvider } from './Context/CartContext';
import { Checkout } from './Components/Checkout/Checkout';
import './App.css';
import { UserAuthProvider } from './Context/UserAuthContext';
import { Login } from './Components/UserAuthenticate/Login';
import { SignUp } from './Components/UserAuthenticate/SignUp';
import { Orders } from './Components/Orders/Orders';

function App() {
  return (
    <UserAuthProvider>
      <CartProvider>
        <Router>
          <NavBar />
          <Switch>
            <Route exact path="/">
              <HomeContainer />
              <Footer />
            </Route>

            <Route exact path="/products">
              <ItemListContainer />
              <Footer />
            </Route>

            <Route exact path="/products/:categoryId">
              <ItemListContainer />
              <Footer />
            </Route>

            <Route exact path="/productDetails/:itemId">
              <ItemDetailContainer />
              <Footer />
            </Route>

            <Route path="/login">
              <Login />
              <Footer />
            </Route>

            <Route path="/signUp">
              <SignUp />
              <Footer />
            </Route>

            <Route path="/cart">
              <Cart />
              <Footer />
            </Route>

            <Route exact path="/checkout">
              <Checkout />
            </Route>

            <Route exact path="/orders">
              <Orders />
            </Route>

            <Route path="*">
              <Redirect to="/"></Redirect>
            </Route>
          </Switch>
        </Router>
      </CartProvider>
    </UserAuthProvider>
  );
}

export default App;
