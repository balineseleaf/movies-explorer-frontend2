import './MoviesCard.css';
import movieExample from '../../../images/myMovieCard.jpg';
import { Link, useLocation } from 'react-router-dom';
import { PATHS } from '../../../utils/constants';

const MoviesCard = () => {
  const { moviesPath, savedMoviesPath } = PATHS;

  const { pathname } = useLocation();

  return (
    <li className='movies-card'>
      <Link to='' target='_blank'>
        <img
          className='movies-card__image'
          src={movieExample}
          alt={movieExample.name}
        />
      </Link>

      <div className='movies-card__caption'>
        <p className='movies-card__subtitle'>33 слова о дизайне</p>

        {pathname === moviesPath && (
          <button type='button' className={`movies-card__like`}></button>
        )}

        {pathname === savedMoviesPath && (
          <button type='button' className={`movies-card__delete`}></button>
        )}
      </div>

      <p className='movies-card__duration'>1ч 47м</p>
    </li>
  );
};

export default MoviesCard;
