import React from 'react';
import {
  TiSocialFacebook,
  TiSocialTwitter,
  TiSocialYoutube
} from 'react-icons/ti';
import { AiFillInstagram } from 'react-icons/ai';

import FooterLogo from '../../Assets/Images/nav-logo.png';
import './Footer.css';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-grid-container">
          <div className="footer-first-column">
            <img
              alt="sample bucket logo"
              className="footer-logo"
              src={FooterLogo}
            ></img>
            <div className="footer-socials-flex">
               <a href='https://www.facebook.com/lainstrumental.fitness'>
                   <TiSocialFacebook className="footer-socials-logo"/>
               </a>
               <a href='https://www.instagram.com/lainstrumental.fitness.shop/' >
                    <TiSocialTwitter className="footer-socials-logo" />
               </a>
               <a href='https://www.instagram.com/lainstrumental.fitness.shop/' >
                    <TiSocialYoutube className="footer-socials-logo" />
              </a>
                <a href='https://www.instagram.com/lainstrumental.fitness.shop/' >
                  <AiFillInstagram className="footer-socials-logo" />
                </a>
            </div>
          </div>
          <div className="footer-column">
            <p className="footer-title">Contactanos</p>
            <a className="footer-text" translate="no"
                href='https://www.google.com/maps/place/Flores,+CABA/@-34.6353622,-58.4751244,14z/data=!3m1!4b1!4m5!3m4!1s0x95bcc9801c92ef47:0xc93f0b1dc41d41ee!8m2!3d-34.6374837!4d-58.4601452'>
             Flores, C.A.B.A.
            </a>
            <a className="footer-text"
                href='https://api.whatsapp.com/send?phone=5491135225845&text=Hola!%20Quisiera%20contactarme%20con%20un%20representante%20de%20La%20Instrumental%20Fitness%20Shop'>
                  +54 9 (011) 3522 5845
            </a>
            <a className="footer-text" translate="no"
                href='mailto:laintrumentalfitness@gmail.com'>
              lainstrumentalfitness@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
