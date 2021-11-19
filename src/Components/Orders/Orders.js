import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

import { getFirestore } from '../../Firebase/config';
import { Spinner } from '../Spinner/Spinner';
import { Footer } from '../Footer/Footer';
import { UserAuthContext } from '../../Context/UserAuthContext';

import { Order } from './Order';

export const Orders = () => {
  const [loading, setLoading] = useState(true);
  const [userOrders, setUserOrders] = useState([]);
  const { currentUser } = useContext(UserAuthContext);
  const { push } = useHistory();

  if (!currentUser) {
    push('/');
  }
  useEffect(() => {
    setLoading(true);
    const db = getFirestore();
    const orders = db.collection('orders').orderBy('date', 'desc');

    orders
      .get()
      .then((res) => {
        const newUserOrders = res.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        const filteredUserOrders = newUserOrders.filter(
          (order) => order.buyer.id === currentUser.uid
        );

        setUserOrders(filteredUserOrders);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setLoading(false);
      });
  }, [setLoading]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {userOrders.length === 0 ? (
            <div className="cart-empty-flex">
              <h2 className="cart-empty-title">Carrito vacío</h2>
              <Link className="btn-item-cart-delete --center" to="/products">
                Ver productos
              </Link>
            </div>
          ) : (
            <div>
              {userOrders.map((order) => (
                <Order {...order} key={order.id} />
              ))}
            </div>
          )}
        </>
      )}
      <Footer />
    </>
  );
};
