import React from 'react';
import { HiTag, HiInformationCircle } from 'react-icons/hi';
import { Link } from 'react-router-dom';

import './ItemListContainer.css';

export const Item = ({
  id,
  name,
  description,
  category,
  price,
  stock,
  img
}) => {
  return (
    <div className="item-card --scale">
      <Link to={`/productDetails/${id}`}>
        <img
          alt={`${name} ${description}`}
          className="item-card-img"
          src={img}
        ></img>
      </Link>
      <p className={`item-card-category --${category}`}>
        {category.toUpperCase()}
      </p>
      <p className="item-card-product-name">{name}</p>
      <p className="item-card-description">
        <HiInformationCircle className="item-card-icon" /> {description}
      </p>
      <p className="item-card-price">
        <HiTag className="item-card-icon" /> ${price}
      </p>
      <p className="stock-details --left-margin">
        {stock ? `Stock: ${stock}` : 'Out of stock'}
      </p>
      <Link className="item-card-btn" to={`/productDetails/${id}`}>
        COMPRAR
      </Link>
    </div>
  );
};
