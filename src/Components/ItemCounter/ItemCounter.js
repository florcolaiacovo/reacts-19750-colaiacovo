import React from 'react';
import '../ItemDetailContainer/ItemDetailContainer.css';

export const ItemCounter = ({ quantity, setQuantity, stock, outOfStock }) => {
  const cartBtnClasses = [
    'item-details-btn',
    '--quantity',
    outOfStock && '--disabled'
  ];

  return (
    <div className="item-counter-flex">
      <button
        className={cartBtnClasses.join(' ')}
        disabled={outOfStock}
        onClick={() => quantity > 1 && setQuantity(quantity - 1)}
      >
        -
      </button>
      <p className="item-details-counter">{quantity}</p>
      <button
        className={cartBtnClasses.join(' ')}
        disabled={outOfStock}
        onClick={() => quantity < stock && setQuantity(quantity + 1)}
      >
        +
      </button>
    </div>
  );
};
