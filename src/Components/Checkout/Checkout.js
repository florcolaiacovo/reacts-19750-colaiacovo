import React, { useContext, useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router';
import Swal from 'sweetalert2';

import { CartContext } from '../../Context/CartContext';
import { Spinner } from '../Spinner/Spinner';
import { newOrder } from '../../Firebase/newOrder';
import { UserAuthContext } from '../../Context/UserAuthContext';
import './Checkout.css';
import { validateEmail } from '../../Helpers/validateEmail';

export const Checkout = () => {
  const { push } = useHistory();
  const [loading, setLoading] = useState(false);
  const [useAccountEmail, setUseAccountEmail] = useState(true);
  const buttonText = useAccountEmail
    ? 'Usa un email diferente'
    : 'Usa el email de tu cuenta';
  const { cart, getTotal, emptyCart } = useContext(CartContext);
  const { currentUser } = useContext(UserAuthContext);
  const [userInputData, setuserInputData] = useState({
    id: currentUser ? currentUser.uid : '',
    name: '',
    lastName: '',
    email: '',
    emailConfirmation: '',
    phone: ''
  });

  useEffect(() => {
    if (currentUser) {
      const newUserInputData = userInputData;

      newUserInputData.email = useAccountEmail
        ? currentUser.email
        : userInputData.email;
      newUserInputData.emailConfirmation = useAccountEmail
        ? currentUser.email
        : userInputData.emailConfirmation;
      setuserInputData(newUserInputData);
    }
  }, [useAccountEmail, userInputData]);

  const handleUserNotLogedIn = () => {
    push('/login');
    Swal.fire({
      icon: 'error',
      title: 'Algo salió mal:',
      text: 'Tienes que registrarte primero'
    });
  };
  const handleInputChange = (e) => {
    setuserInputData({
      ...userInputData,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (userInputData.name.length < 3) {
      Swal.fire({
        icon: 'error',
        title: 'Nombre',
        text: 'Debe agregar al menos 3 caracteres'
      });
      return;
    }
    if (userInputData.lastName.length < 3) {
      Swal.fire({
        icon: 'error',
        title: 'Apellido',
        text: 'Debe agregar al menos 3 caracteres'
      });
      return;
    }
    if (!useAccountEmail) {
      if (
        userInputData.email.length < 3 ||
        !validateEmail(userInputData.email)
      ) {
        Swal.fire({
          icon: 'error',
          title: 'Email',
          text: 'Ingrese un email válido'
        });
        return;
      }

      if (userInputData.email !== userInputData.emailConfirmation) {
        Swal.fire({
          icon: 'error',
          title: 'Email',
          text: 'Los emails no coinciden'
        });
        return;
      }
    }
    if (userInputData.phone.length < 7) {
      Swal.fire({
        icon: 'error',
        title: 'Celular',
        text: 'Ingrese un celular válido'
      });
      return;
    }
    setLoading(true);

    newOrder(userInputData, cart, getTotal())
      .then((res) => {
        Swal.fire({
          icon: 'success',
          title: 'Tu pedido se ha realizado con éxito!',
          text: `Tu código de compra: ${res}`,
          footer: 'Recibirás un email con el detalle de compra',
          willClose: () => {
            emptyCart();
          }
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Producto fuera de stock :(',
          text: `Producto: ${err.map((item) => item.name).join(', ')}`
        });
      })
      .finally(() => {
        setLoading(false);
        push('/orders');
      });
  };
  const handleDifferentEmail = (e) => {
    e.preventDefault();
    setUseAccountEmail(!useAccountEmail);
  };

  return (
    <>
      {cart.length === 0 && <Redirect to="/" />}
      {!currentUser ? (
        handleUserNotLogedIn()
      ) : (
        <div className="form-main">
          {loading ? (
            <Spinner />
          ) : (
            <div className="form-card">
              <form onSubmit={handleSubmit}>
                <span className="form-title">Formulario</span>

                <div>
                  <p>{`Email: ${currentUser.email}`}</p>
                  <button className="form-link" onClick={handleDifferentEmail}>
                    {buttonText}
                  </button>
                </div>

                <div>
                  <label className="form-label">Nombre</label>
                  <input
                    required
                    className="form-input-text"
                    name="name"
                    placeholder="Nombre"
                    type="text"
                    value={userInputData.name}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label className="form-label">Apellido</label>
                  <input
                    required
                    className="form-input-text"
                    name="lastName"
                    placeholder="Apellido"
                    type="text"
                    value={userInputData.lastName}
                    onChange={handleInputChange}
                  />
                </div>

                {!useAccountEmail && (
                  <>
                    <div>
                      <label className="form-label">Email</label>
                      <input
                        required
                        className="form-input-text"
                        name="email"
                        placeholder="Email"
                        type="email"
                        value={userInputData.email}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <label className="form-label">Confirmar email</label>
                      <input
                        required
                        className="form-input-text"
                        name="emailConfirmation"
                        placeholder="Email"
                        type="email"
                        value={userInputData.emailConfirmation}
                        onChange={handleInputChange}
                      />
                    </div>
                  </>
                )}
                <div>
                  <label className="form-label">Celular</label>
                  <input
                    required
                    className="form-input-text"
                    name="phone"
                    placeholder="Celular"
                    type="tel"
                    value={userInputData.phone}
                    onChange={handleInputChange}
                  />
                </div>

                <button
                  className="form-submit-btn"
                  disabled={loading}
                  type="submit"
                >
                  Confirmar orden
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </>
  );
};
