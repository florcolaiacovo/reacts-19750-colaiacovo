import React, { useRef } from 'react';
import { Hero } from './Hero';
import './HomeContainer.css';

export const HomeContainer = () => {
  const heroRef = useRef();

  return (
    <div>
      <Hero ref={heroRef} />
      </div>
  );
};
