import { useEffect, useState } from 'react';
import {
  KEYWORD_SEARCH,
  MESSAGE,
  TIME_DOWNLOAD,
  TIME_OUT_PRELOADER,
  TIME_SHORT_MOVIES,
} from '../utils/constants';
import { useLocation } from 'react-router-dom';

const useSearch = ({ movies, isSavedMoviesPage }) => {
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
    isFirstSearch: true,
  });

  const { pathname } = useLocation();

  // фильтрация в поиске
  const filterSearh = (value) => {
    return movies.filter(
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
  const filterMovies = (value) => {
    if (value.short) {
      //if true
      return filterShort(filterSearh(value)); // передаем значение отфильтрованного из поисковой строки
    } else {
      return filterSearh(value);
    }
  };

  useEffect(() => {
    if (isSavedMoviesPage && !searchStatus.isLoading) {
      setFilteredMovies(filterMovies(savedSearch)); // сетим в стейт отфльтрованных фильмов
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
    if (KEYWORD_SEARCH in localStorage && !isSavedMoviesPage) {
      const savedSearch = JSON.parse(localStorage.getItem(KEYWORD_SEARCH)); //достаем из стораджа сохр фильмы
      setSavedSearch({
        search: savedSearch.search,
        short: savedSearch.short,
        savedMovies: savedSearch.savedMovies,
      }); // сетим все значения в  этот стейт
      setFilteredMovies(savedSearch.savedMovies);
    }

    if (!localStorage.getItem(KEYWORD_SEARCH) && !isSavedMoviesPage) {
      setSearchStatus((data) => {
        return {
          ...data,
          isFirstSearch: true,
          statusMessage: beforeSearching,
        };
      });
    }
  }, [beforeSearching, isSavedMoviesPage]);

  useEffect(() => {
    if (isSavedMoviesPage) setFilteredMovies(filterMovies(savedSearch));
  }, [isSavedMoviesPage, movies]);

  useEffect(() => {
    if (!isSavedMoviesPage && localStorage.getItem(KEYWORD_SEARCH)) {
      setFilteredMovies(savedSearch.savedMovies);
    }
  }, [isSavedMoviesPage, savedSearch]); // если мы на странице с фильмами, то добавляем фильм на страницу Сохранненых

  const setLoader = (boolean) => {
    setSearchStatus((data) => {
      return {
        ...data,
        isLoading: boolean,
        isFirstSearch: false,
      };
    });
  };

  useEffect(() => {
    resetStatus();
  }, [pathname]); //изменяем статус в зависимости от текущего роута

  const resetStatus = () => {
    setSearchStatus({
      ...searchStatus,
      statusMessage: '',
      isLoading: false,
    });
  }; // сброс статуса

  const handleSubmitSearch = (value) => {
    if (isSavedMoviesPage) {
      setSavedSearch({
        search: value.search,
        short: value.short,
      }); // на сабмите берем значения и сетим в стейт с сохр поиском
    }

    resetStatus();
    setLoader(true);
    const data = filterMovies(value);
    setTimeout(
      () => {
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
      },
      searchStatus.isFirstSearch ? TIME_DOWNLOAD : TIME_OUT_PRELOADER
    );

    if (!isSavedMoviesPage) {
      localStorage.setItem(
        KEYWORD_SEARCH,
        JSON.stringify({
          savedMovies: data,
          short: value.short,
          search: value.search,
        })
      );
    }
  };
  return {
    filteredMovies,
    savedSearch,
    searchStatus,
    handleSubmitSearch,
    setSearchStatus,
    resetStatus,
  };
};

export default useSearch;
