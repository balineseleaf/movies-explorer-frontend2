import './MoviesCard.css';
import movieExample from '../../../images/movieExample.svg';
import { Link, useLocation } from 'react-router-dom';
import { PATHS } from '../../../utils/constants';

const MoviesCard = () => {
  const { moviesPath, savedMoviesPath } = PATHS;

  const { pathname } = useLocation();

  return (
    <li className='movies-card'>
      <Link to='' target='_blank'>
        <img className='movies-card__image' src={movieExample} alt='Фильм' />
      </Link>

      <div className='movies-card__caption'>
        <p className='movies-card__subtitle'>33 слова о дизайне</p>

        {pathname === moviesPath && (
          <button className={`movies-card__like`}></button>
        )}

        {pathname === savedMoviesPath && (
          <button className={`movies-card__delete`}></button>
        )}
      </div>

      <p className='movies-card__duration'>1ч 47м</p>
    </li>
  );
};

export default MoviesCard;
