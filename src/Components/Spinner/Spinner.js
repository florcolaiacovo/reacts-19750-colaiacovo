import React from 'react';
import './Spinner.css';

export const Spinner = () => {
  return (
    <div className="spinner-main">
      <div className="spinner-flex">
        <h2 className="spinner-text">Loading...</h2>
        <div className="spin"></div>
      </div>
    </div>
  );
};
