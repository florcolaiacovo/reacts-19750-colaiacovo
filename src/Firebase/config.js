import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCjnvKYpHsPZnxOnbAF9li3yoi7VG0Ws5I',
  authDomain: 'instrumental-shop.firebaseapp.com',
  projectId: 'instrumental-shop',
  storageBucket: 'instrumental-shop.appspot.com',
  messagingSenderId: '86852023897',
  appId: '1:86852023897:web:88f39b07325881d33ea348'
};
const app = firebase.initializeApp(firebaseConfig);

export const getFirestore = () => {
  return firebase.firestore(app);
};

export const getAuth = () => {
  return firebase.auth(app);
};

export const provider = new firebase.auth.GoogleAuthProvider();
