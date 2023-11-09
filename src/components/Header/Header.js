import React from 'react';
import './Header.css';
import logoMain from '../../images/MyLogo.svg';
import profileIcon from '../../images/profileIcon.svg';
import Navigation from '../Navigation/Navigation';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { PATHS } from '../../utils/constants';
import { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const Header = () => {
  const [menuActive, setMenuActive] = useState(false);

  const {
    registerPath,
    loginPath,
    mainPath,
    moviesPath,
    savedMoviesPath,
    profilePath,
  } = PATHS;

  const { pathname } = useLocation();
  const pathAuth = pathname === registerPath || pathname === loginPath;
  // const { isLoggedIn } = useContext(CurrentUserContext);
  const isLoggedIn = false;
  // const isLoggedIn = true;

  const classNameHeaderContainer = () => {
    let className = 'header__container';
    if (menuActive) {
      className = `${className} header__container_active`;
    }
    if (isLoggedIn) {
      className = `${className} header__container_login`;
    }
    if (pathAuth) {
      className = `${className} header__container_auth`;
    }
    return className;
  };

  function handleMenuClick() {
    setMenuActive(true);
  }

  function handleCloseClick() {
    setMenuActive(false);
  }

  useEffect(() => {
    setMenuActive(false);
  }, [pathname]);

  return (
    <header
      className={pathname === mainPath ? 'header header__cover' : 'header'}
    >
      <div className={classNameHeaderContainer()}>
        <Link className='header__link header__link_logo' to={mainPath}>
          <img className='header__logo' src={logoMain} alt='Logo' />
        </Link>
        {!pathAuth &&
          (!isLoggedIn ? (
            <Navigation>
              <Link className='header__link' to={registerPath}>
                Регистрация
              </Link>
              <Link className='header__button' to={loginPath}>
                Войти
              </Link>
            </Navigation>
          ) : (
            <>
              <div className='header__wrapper'>
                <Navigation>
                  <ul className='header__list'>
                    <li className='header__item'>
                      <NavLink className='header__link' to={mainPath}>
                        Главная
                      </NavLink>
                    </li>
                    <li className='header__item'>
                      <NavLink className='header__link' to={moviesPath}>
                        Фильмы
                      </NavLink>
                    </li>
                    <li className='header__item'>
                      <NavLink className='header__link' to={savedMoviesPath}>
                        Сохранённые фильмы
                      </NavLink>
                    </li>
                  </ul>
                </Navigation>
                <Navigation>
                  <NavLink
                    className='header__link header__link_profile'
                    to={profilePath}
                  >
                    Аккаунт
                    <div className='header__profileIcon'>
                      <img src={profileIcon} alt='profile icon' />
                    </div>
                  </NavLink>
                </Navigation>
                <button
                  className='header__button-close'
                  type='button'
                  aria-label='Закрыть меню'
                  onClick={handleCloseClick}
                />
              </div>
              <button
                className='header__button-menu'
                type='button'
                aria-label='Окрыть меню'
                onClick={handleMenuClick}
              />
            </>
          ))}
      </div>
    </header>
  );
};

export default Header;
