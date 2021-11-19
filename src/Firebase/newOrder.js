import firebase from 'firebase';

import { getFirestore } from './config';
import 'firebase/firestore';

export const newOrder = (buyerData, cart, total) => {
  return new Promise(async (resolve, reject) => {
    const order = {
      buyer: buyerData,
      items: cart.map((item) => ({
        id: item.id,
        price: item.price,
        quantity: item.quantity
      })),
      total: total,
      date: firebase.firestore.Timestamp.fromDate(new Date())
    };
    const db = getFirestore();
    const orders = db.collection('orders');
    const itemsToUpdate = db.collection('products').where(
      firebase.firestore.FieldPath.documentId(),
      'in',
      cart.map((item) => item.id)
    );
    const query = await itemsToUpdate.get();
    const batch = db.batch();
    const outOfStock = [];

    query.docs.forEach((doc) => {
      const itemInCart = cart.find((prod) => prod.id === doc.id);

      if (doc.data().stock >= itemInCart.quantity) {
        batch.update(doc.ref, {
          stock: doc.data().stock - itemInCart.quantity
        });
      } else {
        outOfStock.push({ ...doc.data(), id: doc.id });
      }
    });

    if (outOfStock.length === 0) {
      orders.add(order).then((res) => {
        batch.commit();
        resolve(res.id);
      });
    } else {
      reject(outOfStock);
    }
  });
};
