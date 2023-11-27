import Main from '../../Main/Main';
import FormSearch from '../../Main/Form/FormSearch';
import useSearch from '../../../hooks/useSearch';
import { useEffect, useState } from 'react';
import Preloader from '../../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

const SavedMovies = ({ savedMovies, onMoviedDelete }) => {
  const [valueSearch, setValueSearch] = useState({ search: '', short: false });
  const [isMessageShow, setMessageShow] = useState(false);
  const { filteredMovies, searchStatus, handleSubmitSearch } = useSearch({
    movies: savedMovies,
    isSavedMoviesPage: true,
  });

  useEffect(() => {
    if (!!filteredMovies) {
      if (filteredMovies.length === 0) {
        setMessageShow(true);
      } else {
        setMessageShow(false);
      }
    }
  }, [filteredMovies]);

  return (
    <Main className='main__movies'>
      <FormSearch
        isSavedMoviesPage={true}
        valueSerch={valueSearch}
        setValueSerch={setValueSearch}
        onSubmitSearch={handleSubmitSearch}
        searchStatus={searchStatus}
        isMessageShow={isMessageShow}
        isFormActivated={!searchStatus.isLoading}
      />
      {searchStatus.isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList
          isSavedMoviesPage={true}
          moviesList={filteredMovies}
          onMoviedDelete={onMoviedDelete}
        />
      )}
    </Main>
  );
};

export default SavedMovies;
