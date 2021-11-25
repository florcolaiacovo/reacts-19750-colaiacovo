import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../Assets/Images/logo.png';
import './Hero.css';

export const Hero = () => {
  return (
    <section className="hero-main">
      <div className="hero-container">
        <div className="hero-grid">
          <div className="hero-info-container">
            <h1 className="hero-info-main-text">
              Somos más que una escuela de fitness, optimizá tu entrenamiento.
            </h1>
            <h2 className="hero-info-secondary-text">
              Estar cómod@ en el momento de entrenar no es un detalle menor, aquí encontrarás todo lo que necesitás para que tus ganas de entrenar se potencien!.
            </h2>
            <Link className="hero-info-btn --cta" to={'/products'}>
              Conocé nuestros productos
            </Link>
          </div>
          <img className="hero-image" src={logo} alt="logo de la imagen"></img>
        </div>
      </div>
    </section>
  );
};
