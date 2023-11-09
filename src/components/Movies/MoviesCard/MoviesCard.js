import './MoviesCard.css';
import movieExample from '../../../images/movieExample.svg';

import { Link } from 'react-router-dom';

const MoviesCard = () => {
  return (
    <li className='movies__item'>
      <Link className='movies__link' to='' target='_blank'>
        <div className='movies__info'>
          <h2 className='movies__title'>33 слова о дизайне</h2>
          <p className='movies__duration'>1ч 42м</p>
        </div>
        <img className='movies__photo' src={movieExample} alt='Фильм' />
      </Link>
      <button className={'movies__button movies__button_like'} type='button' />
    </li>
  );
};

export default MoviesCard;
