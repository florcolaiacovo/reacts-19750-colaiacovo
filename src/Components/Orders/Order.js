import React from 'react';
import { FcOk } from 'react-icons/fc';
import './Orders.css';

export const Order = ({ date, id, items, total, buyer }) => {
  const newDate = new Date(date * 1000);

  return (
    <div className="order-main">
      <div className="order-flex">
        <p className="line">Fecha y hora: {newDate.toString()}</p>
        <p className="line">Email: {buyer.email}</p>
        <p className="line">Código de orden: {id}</p>

        {items.map((item) => (
          <div key={item.key} className="order-item">
            <p className="line">{`Producto: ${item.id}`}</p>
            <p className="line">{`Cantidad: ${item.quantity}`}</p>
            <p className="line">{`Precio: $${item.price}`}</p>
          </div>
        ))}

        <p className="line">Total: ${total}</p>
      </div>
      <div className="order-status-flex">
        <p className="success-text">
        Se ha enviado correctamente un correo electrónico con el enlace de descarga.
        </p>
        <FcOk className="success-icon" />
      </div>
    </div>
  );
};
