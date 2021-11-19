import React from 'react';

import { Item } from './Item';

export const ItemList = ({ products = [] }) => {
  return (
    <div className="item-card-container">
      {products.map((item) => (
        <Item {...item} key={item.id} />
      ))}
    </div>
  );
};
