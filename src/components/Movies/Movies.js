import MoviesCardList from './MoviesCardList/MoviesCardList';
import SearchForm from './SearchForm/SearchForm';
import Main from '../Main/Main';
//import Preloader from '../Preloader/Preloader';

const Movies = () => {
  return (
    <Main className='main__movies'>
      <SearchForm />
      {/* <Preloader /> */}
      <MoviesCardList />
    </Main>
  );
};

export default Movies;
