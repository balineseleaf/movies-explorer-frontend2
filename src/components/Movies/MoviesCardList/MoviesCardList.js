import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

const MoviesCardList = ({ onSubmitMoreButton }) => {
  return (
    <section className='movies'>
      <ul className='movies__card-list'>
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
      </ul>
      <button className='movies__button-more' onClick={onSubmitMoreButton}>
        Ещё
      </button>
    </section>
  );
};

export default MoviesCardList;
