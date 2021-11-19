import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AiFillGoogleCircle } from 'react-icons/ai';

import { Toast } from '../../Helpers/swal2';
import { UserAuthContext } from '../../Context/UserAuthContext';
import '../Checkout/Checkout.css';
import { validateEmail } from '../../Helpers/validateEmail';

export const Login = () => {
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: ''
  });
  const { email, password } = userInfo;
  const { login, signInWithGoogle } = useContext(UserAuthContext);
  const { push } = useHistory();
  const handleUserInput = (e) => {
    e.preventDefault();
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.length < 3 || !validateEmail(email)) {
      Swal.fire({
        icon: 'error',
        title: 'Email',
        text: 'Ingresa un email valido'
      });
      return;
    }

    login(email, password)
      .then(() => {
        Toast.fire({
          icon: 'success',
          title: 'Ingreso exitoso!'
        });
        push('/');
      })
      .catch((err) =>
        Swal.fire({
          icon: 'error',
          title: 'Uppps! Algo salio mal:',
          text: err.message
        })
      );
  };
  const handleGoogleAuth = (e) => {
    e.preventDefault();
    signInWithGoogle()
      .then(() => {
        Toast.fire({
          icon: 'success',
          title: 'Ingreso exitoso!'
        });
        push('/');
      })
      .catch((err) =>
        Swal.fire({
          icon: 'error',
          title: 'Uppps! Algo salio mal:',
          text: err.message
        })
      );
  };

  return (
    <div className="form-main">
      <div className="form-card">
        <form action="" onSubmit={handleSubmit}>
          <input
            required
            className="form-input-text"
            name="email"
            placeholder="Ingresa tu email"
            type="email"
            value={email}
            onChange={handleUserInput}
          />
          <input
            required
            className="form-input-text"
            name="password"
            placeholder="Ingresa tu contraseña"
            type="password"
            value={password}
            onChange={handleUserInput}
          />
          <button className="form-submit-btn" type="submit">
            Ingresa a tu cuenta
          </button>
        </form>
        <div className="form-bottom-options">
          <button
            className="form-submit-btn --form-google"
            onClick={handleGoogleAuth}
          >
            <AiFillGoogleCircle />
            Ingresa con Google
          </button>

          <Link className="form-label" to="/signUp">
            {'¿No tienes una cuenta? Crea una!'}
          </Link>
        </div>
      </div>
    </div>
  );
};
