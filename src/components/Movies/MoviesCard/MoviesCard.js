import './MoviesCard.css';
import { Link, useLocation } from 'react-router-dom';
import { PATHS } from '../../../utils/constants';
import { BASE_URL_API_MOVIES } from '../../../utils/constants';

const MoviesCard = ({
  isSavedMoviesPage,
  movie,
  onMovieLike,
  onMoviedDelete,
  savedMovies,
}) => {
  const isLiked =
    !isSavedMoviesPage && savedMovies.some((item) => item.movieId === movie.id);
  const movieLikeButtonClassName = `movies-card__like ${
    isLiked && 'movies-card__like_active'
  }`;
  const { moviesPath, savedMoviesPath } = PATHS;

  const { pathname } = useLocation();

  // console.log('isliked', isLiked);
  // console.log('isSavedMvies', isSavedMoviesPage);
  // console.log('savedMovies', savedMovies);

  function handleLikeClick() {
    onMovieLike({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: BASE_URL_API_MOVIES + movie.image.url,
      trailerLink: movie.trailerLink,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
      thumbnail: BASE_URL_API_MOVIES + movie.image.formats.thumbnail.url,
      movieId: movie.id,
    });
  }

  function handleDeleteClick() {
    onMoviedDelete(movie);
  }

  return (
    <li className='movies-card'>
      <Link
        class='movies__inner-container'
        to={`${movie.trailerLink}`}
        target='_blank'
      >
        <img
          className='movies__card-image'
          src={
            isSavedMoviesPage
              ? movie.image
              : BASE_URL_API_MOVIES + movie.image.url
          }
          alt={movie.nameRU}
        />
      </Link>

      <div className='movies-card__caption'>
        <p className='movies-card__subtitle'>{movie.nameRU || movie.nameEN}</p>

        {/* {pathname === moviesPath && <button type='button' className={movieLikeButtonClassName} onClick={handleLikeClick}></button>}

        {pathname === savedMoviesPath && <button
            type='button'
            className={`${isSavedMoviesPage ? 'movies-card__delete' : movieLikeButtonClassName}`}
            onClick={handleDeleteClick}
          ></button>
        } */}
        <button
          className={`movies-card__like ${
            isSavedMoviesPage ? 'movies-card__delete' : movieLikeButtonClassName
          }`}
          type='button'
          onClick={!isSavedMoviesPage ? handleLikeClick : handleDeleteClick}
        />
      </div>

      <p className='movies-card__duration'>
        {(movie.duration / 60) | 0}ч {movie.duration % 60}м
      </p>
    </li>
  );
};

export default MoviesCard;
