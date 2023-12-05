import { useEffect, useState } from 'react';
import {
  MESSAGE,
  TIME_DOWNLOAD,
  TIME_OUT_PRELOADER,
  TIME_SHORT_MOVIES,
  KEYWORD_MOVIES,
  KEYWORD_SEARCHED_MOVIES,
  KEYWORD_VALUES,
} from '../utils/constants';
// import { useLocation } from 'react-router-dom';

const useSearch = ({ movies, isSavedMoviesPage, getMovies }) => {
  const [filteredMovies, setFilteredMovies] = useState([]);

  const { beforeSearching, noMovies } = MESSAGE;

  const [savedSearch, setSavedSearch] = useState({
    search: '',
    short: false,
    savedMovies: [],
  });

  const [searchStatus, setSearchStatus] = useState({
    statusMessage: '',
    isLoading: false,
    isFirstSearch: false,
  });

  // const { pathname } = useLocation();

  // фильтрация в поиске
  const filterSearh = (value, moviesList) => {
    return moviesList.filter(
      (movie) =>
        movie.nameRU
          .trim()
          .toLowerCase()
          .includes(value.search.trim().toLowerCase()) ||
        movie.nameEN
          .trim()
          .toLowerCase()
          .includes(value.search.trim().toLowerCase())
    );
  };
  //фильтрация на короткометражки
  const filterShort = (moviesList) => {
    return moviesList.filter((movie) => movie.duration <= TIME_SHORT_MOVIES); // все фильмы меньше 40 мин
  };
  
  // фильтрация фильмов с использованием функций
  const filterMovies = (value, moviesList) => {
    if (value.short) {
      //if true
      return filterShort(filterSearh(value,moviesList)); // передаем значение отфильтрованного из поисковой строки
    } else {
      return filterSearh(value,moviesList);
    }
  };

  useEffect(() => {
    if (isSavedMoviesPage && !searchStatus.isLoading) {
      setFilteredMovies(filterMovies(savedSearch, movies)); // сетим в стейт отфльтрованных фильмов
    }
  }, [isSavedMoviesPage, savedSearch]);

  useEffect(() => {
    if (filteredMovies.length === 0) {
      setSearchStatus((searchStatus) => ({
        ...searchStatus,
        statusMessage: noMovies, // если пустая страница с фильмами, то вешаем сообщение о том, что нет фильмов для отображения
      }));
    } else {
      resetStatus();
    }
  }, [filteredMovies]);

  useEffect(() => {
    if (KEYWORD_MOVIES in localStorage && !isSavedMoviesPage) {
      const savedMovies = JSON.parse(localStorage.getItem(KEYWORD_SEARCHED_MOVIES));
      const savedSearch = JSON.parse(localStorage.getItem(KEYWORD_VALUES));
      setSavedSearch({
        search: savedSearch.search,
        short: savedSearch.short,
        savedMovies: savedMovies,
      });
      setFilteredMovies(savedMovies);
    }
    if (!(KEYWORD_MOVIES in localStorage) && !isSavedMoviesPage) {
      setSearchStatus(
        {
          ...searchStatus,
          isFirstSearch: true,
          statusMessage: beforeSearching,
        }
      );
    }
  }, [beforeSearching, isSavedMoviesPage]);

  useEffect(() => {
    if (isSavedMoviesPage) {
      setFilteredMovies(filterMovies(savedSearch, movies));
    };
  }, [isSavedMoviesPage, movies]);

  useEffect(() => {
    if (!isSavedMoviesPage && localStorage.getItem(KEYWORD_MOVIES)) {
      setFilteredMovies(savedSearch.savedMovies);
    }
  }, [isSavedMoviesPage, savedSearch]);

  const setLoader = (boolean) => {
    setSearchStatus((data) => {
      return {
        ...data,
        isLoading: boolean,
        isFirstSearch: false,
      };
    });
  };

  const resetStatus = () => {
    setSearchStatus({
      ...searchStatus,
      statusMessage: '',
      isLoading: false,
    });
  };

  const handleSubmitSearch = async (value) => {
    let allMovies;
    let data;
    if (searchStatus.isFirstSearch && !isSavedMoviesPage) {
      allMovies = await getMovies();
      data = filterMovies(value, allMovies);
    } else {
      data = filterMovies(value, movies);
    }

    resetStatus();
    setLoader(true);

    setTimeout(() => {
      if (data.length === 0) {
        setSearchStatus((data) => {
          return {
            ...data,
            statusMessage: noMovies,
          };
        });
      }
      setFilteredMovies(data);
      setLoader(false);
    }, searchStatus.isFirstSearch ? TIME_DOWNLOAD : TIME_OUT_PRELOADER);

    if (!isSavedMoviesPage && searchStatus.isFirstSearch) {
      localStorage.setItem(KEYWORD_MOVIES, JSON.stringify(allMovies));
      localStorage.setItem(KEYWORD_SEARCHED_MOVIES, JSON.stringify(data));
      localStorage.setItem(KEYWORD_VALUES, JSON.stringify({
        short: value.short,
        search: value.search,
      }));
    } else if (!isSavedMoviesPage) {
      localStorage.setItem(KEYWORD_SEARCHED_MOVIES, JSON.stringify(data));
      localStorage.setItem(KEYWORD_VALUES, JSON.stringify({
        short: value.short,
        search: value.search,
      }));
    }

  };
  return { filteredMovies, savedSearch, searchStatus, handleSubmitSearch, setSearchStatus, resetStatus }
}

export default useSearch;
