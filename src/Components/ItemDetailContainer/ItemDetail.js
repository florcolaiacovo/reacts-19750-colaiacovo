import React from 'react';
import { HiTag, HiInformationCircle } from 'react-icons/hi';
import './ItemDetail.css';

export const ItemDetail = ({
  name,
  description,
  category,
  price,
  img,
  details
}) => {
  return (
    <>
      <div>
        <div className="item-card --detail ">
          <img
            alt={`${name} ${description}`}
            className="item-card-img --img"
            src={img}
          ></img>

          <p className={`item-card-category --${category}`}>{category} </p>

          <p className="item-card-product-name">{name}</p>

          <p className="item-card-description --light">{details}</p>

          <p className="item-card-description">
            <HiInformationCircle className="item-card-icon" /> {description}
          </p>

          <p className="item-card-price --last">
            <HiTag className="item-card-icon" /> ${price}
          </p>
        </div>
      </div>
    </>
  );
};
