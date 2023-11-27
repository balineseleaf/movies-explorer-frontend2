import './MoviesCard.css';
//import movieExample from '../../../images/myMovieCard.jpg';
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
    isLiked && 'movies-card__like-active'
  }`;
  const { moviesPath, savedMoviesPath } = PATHS;

  const { pathname } = useLocation();
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
      <Link to={`${movie.trailerLink}`} target='_blank'>
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
      {/* // с лайком решить */}
      <div className='movies-card__caption'>
        <p className='movies-card__subtitle'>33 слова о дизайне</p>

        {pathname === moviesPath && (
          <button type='button' className={movieLikeButtonClassName}></button>
        )}

        {pathname === savedMoviesPath && (
          <button
            type='button'
            className={`movies-card__delete`}
            onClick={!isSavedMoviesPage ? handleLikeClick : handleDeleteClick}
          ></button>
        )}
      </div>

      <p className='movies-card__duration'>
        {' '}
        {(movie.duration / 60) | 0}ч {movie.duration % 60}м
      </p>
    </li>
  );
};

export default MoviesCard;
