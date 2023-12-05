import MoviesCardList from './MoviesCardList/MoviesCardList';
import FormSearch from '../Main/Form/FormSearch';
import { useEffect, useState } from 'react';
import Main from '../Main/Main';
import useSearch from '../../hooks/useSearch';
import Preloader from '../Preloader/Preloader';
import { deviceSettings } from '../../utils/data-list';
import { KEYWORD_VALUES } from '../../utils/constants';

const Movies = ({
  movies,
  onMovieLike,
  savedMovies,
  device,
  setMessage,
  getMovies,
}) => {
  const { filteredMovies, savedSearch, searchStatus, handleSubmitSearch } =
    useSearch({
      movies: movies,
      isSavedMoviesPage: false,
      getMovies: getMovies,
    });
  //console.log('in Movie.js', movies, savedMovies); // movies 100 штук

  const [valueSearch, setValueSearch] = useState({
    search: savedSearch.search ?? '',
    short: savedMovies.short ?? false,
  });

  console.log('1004', valueSearch);

  const [moreMovies, setMoreMovies] = useState(0);
  const [isShowMoreButton, setShowMoreButton] = useState(false);
  const [maxShowMovies, setMaxShowMovies] = useState(0);

  const handleClickMore = () => {
    setMaxShowMovies((maxMovies) => maxMovies + moreMovies);
  };

  useEffect(() => {
    if (KEYWORD_VALUES in localStorage) {
      const { search, short } = JSON.parse(
        localStorage.getItem(KEYWORD_VALUES)
      );
      setValueSearch({
        search: search,
        short: short,
      });
    }
  }, []);

  useEffect(() => {
    setMaxShowMovies(deviceSettings[device].maxMovies);
    setMoreMovies(deviceSettings[device].moreMovies);
  }, [device, movies]);

  useEffect(() => {
    if (!!filteredMovies) {
      if (!(filteredMovies.length <= maxShowMovies)) {
        setShowMoreButton(true);
      } else {
        setShowMoreButton(false);
      }
    }
  }, [filteredMovies, maxShowMovies]);

  return (
    <Main className='main__movies'>
      <FormSearch
        onSubmitSearch={handleSubmitSearch}
        isSavedMoviesPage={false}
        valueSearch={valueSearch}
        setValueSearch={setValueSearch}
        searchStatus={searchStatus}
        savedSearch={savedSearch}
        setMaxShowMovies={setMaxShowMovies}
        device={device}
        setMessage={setMessage}
        isFormActivated={!searchStatus.isLoading}
      />
      {searchStatus.isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList
          isSavedMoviesPage={false}
          moviesList={filteredMovies.slice(0, maxShowMovies)}
          searchStatus={searchStatus}
          onMovieLike={onMovieLike}
          savedMovies={savedMovies}
          isShowMoreButton={isShowMoreButton}
          onSubmitMoreButton={handleClickMore}
          showMoreButton={isShowMoreButton}
        />
      )}
    </Main>
  );
};

export default Movies;
