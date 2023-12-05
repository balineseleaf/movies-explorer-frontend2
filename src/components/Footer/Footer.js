import './Footer.css';
import React from 'react';
import Navigation from '../Navigation/Navigation';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer__container'>
        <p className='footer__description'>
          Учебный проект Яндекс.Практикум x BeatFilm.
        </p>
        <div className='footer__wrapper'>
          <Navigation className={'footer__navigation'}>
            <ul className='footer__list'>
              <li className='footer__item'>
                <Link
                  className='footer__link'
                  to='https://practicum.yandex.ru/'
                  target='_blank'
                >
                  Яндекс.Практикум
                </Link>
              </li>
              <li className='footer__item'>
                <Link
                  className='footer__link'
                  to='https://github.com/balineseleaf/movies-explorer-frontend'
                  target='_blank'
                >
                  Github
                </Link>
              </li>
            </ul>
          </Navigation>
          <p className='footer__copyright'>&copy; 2023</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
