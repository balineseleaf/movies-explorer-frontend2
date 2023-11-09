import Main from '../../Main/Main';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

const SavedMovies = () => {
  return (
    <Main className='main__movies'>
      <SearchForm />
      <MoviesCardList />
    </Main>
  );
};

export default SavedMovies;
