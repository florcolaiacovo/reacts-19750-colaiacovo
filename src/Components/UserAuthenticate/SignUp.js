import React, { useContext, useRef } from 'react';
import { useHistory } from 'react-router';
import Swal from 'sweetalert2';

import { UserAuthContext } from '../../Context/UserAuthContext';
import { Toast } from '../../Helpers/swal2';
import { validateEmail } from '../../Helpers/validateEmail';

export const SignUp = () => {
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const { signUp } = useContext(UserAuthContext);
  const { push } = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    if (email.current.value.length < 3 || !validateEmail(email.current.value)) {
      Swal.fire({
        icon: 'error',
        title: 'Email',
        text: 'Ingresa un email valido'
      });
      return;
    }
    if (confirmPassword.current.value !== password.current.value) {
      Swal.fire({
        icon: 'error',
        title: 'Password',
        text: 'Las contraseñas no coinciden'
      });
      return;
    }
    signUp(
      email.current.value,
      password.current.value,
      confirmPassword.current.value
    )
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
          title: 'Oops...',
          text: err.message
        })
      );
  };

  return (
    <div className="form-main">
      <div className="form-card">
        <form action="" onSubmit={handleSubmit}>
          <input
            ref={email}
            required
            className="form-input-text"
            name="email"
            placeholder="Ingresa tu email"
            type="email"
          />
          <input
            ref={password}
            required
            className="form-input-text"
            name="password"
            placeholder="Ingresa tu contraseña"
            type="password"
          />
          <input
            ref={confirmPassword}
            required
            className="form-input-text"
            name="confirmPassword"
            placeholder="Reingresa tu contraseña"
            type="password"
          />
          <button className="form-submit-btn " type="submit">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};
