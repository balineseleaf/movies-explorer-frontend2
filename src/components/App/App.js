import { Route, Navigate, Routes, useLocation } from 'react-router-dom';
import './App.css';
import { useState, useEffect, useRef } from 'react';
import Header from '../Header/Header';
import Landing from '../Main/Landing/Landing';
import Footer from '../Footer/Footer';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { MessageContext } from '../../contexts/MessageContext';
import {
  MESSAGE,
  PATHS,
  TIME_OUT_PRELOADER,
  DEVICE_SETTING,
  TIME_REGISTER,
  KEYWORD_MOVIES,
} from '../../utils/constants';
import SavedMovies from '../Movies/SavedMovies/SavedMovies';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import Auth from '../Main/Auth/Auth';
import Error from '../Main/Error/Error';
import { useNavigate } from 'react-router-dom';
import { api } from '../../utils/MainApi';
import { apiMovies } from '../../utils/MoviesApi';
import { selectErrorMessage } from '../../utils/utils';
import Preloader from '../Preloader/Preloader';
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute';

const App = () => {
  const {
    mainPath,
    loginPath,
    registerPath,
    moviesPath,
    savedMoviesPath,
    profilePath,
    otherPath,
  } = PATHS;

  const { pathname } = useLocation();
  const [isErrorPage, setErrorPage] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    isLoggedIn: localStorage.getItem('isLoggedIn'),
  });
  const [message, setMessage] = useState({
    isMessageShow: false,
    isError: false,
    text: '',
  });
  const navigate = useNavigate();
  const [isSendRequest, setSendRequest] = useState(false);
  const [isLoadingContent, setLoadingContent] = useState(true);
  const [savedMovies, setSavedMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [requestError, setRequestError] = useState({});
  const resizeCooldown = useRef(null);
  const [device, setDevice] = useState(DEVICE_SETTING.desktop.device);
  const [isFormActivated, setFormActivated] = useState(true);

  const checktoken = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      api
        .checkToken(jwt)
        .then((user) => {
          setCurrentUser({
            name: user.name,
            email: user.email,
            isLoggedIn: true,
          });
        })
        .catch((err) => {
          setCurrentUser({ isLoggedIn: false });
          console.log(err);
        });
    }
  };
  // useEffect(() => {
  //   const jwt = localStorage.getItem('jwt');
  //   if (jwt) {
  //     api
  //       .checkToken(jwt)
  //       .then((user) => {
  //         setCurrentUser({
  //           name: user.name,
  //           email: user.email,
  //           isLoggedIn: true,
  //         });
  //       })
  //       .catch((err) => {
  //         setCurrentUser({ isLoggedIn: false });
  //         console.log(err);
  //       });
  //   }
  // }, []);

  // useEffect(() => {
  //   const jwt = localStorage.getItem('jwt');
  //   if (jwt) {
  //     if (currentUser.isLoggedIn) {
  //       Promise.all([
  //         api.checkToken(jwt),
  //         apiMovies.getMovies(),
  //         api.getUserMovies(),
  //       ])
  //         .then(([user, movies, savedMovies]) => {
  //           setAllMovies(movies);
  //           setSavedMovies(savedMovies);
  //           setCurrentUser({
  //             name: user.name,
  //             email: user.email,
  //             isLoggedIn: true,
  //           });
  //         })
  //         .catch((err) => {
  //           setMessage({
  //             isMessageShow: true,
  //             isError: true,
  //             text: MESSAGE.serverError,
  //           });
  //           setCurrentUser({ isLoggedIn: false });
  //           setRequestError(err);
  //           console.log(err);
  //         });
  //     }
  //   }
  // }, [currentUser.isLoggedIn]);

  // Получение фильмов

  const getMovies = async () => {
    try {
      const movies = await apiMovies.getMovies();
      setAllMovies(movies);
      return movies;
    } catch (err) {
      setMessage({
        isMessageShow: true,
        isError: true,
        text: MESSAGE.serverError,
      });
    }
  };

  // Получение сохраненных фильмов пользователя
  const getSavedMovies = () => {
    api
      .getUserMovies()
      .then((movies) => {
        setSavedMovies(movies);
      })
      .catch((err) => {
        setRequestError(err);
        console.log(err);
      });
  };

  useEffect(() => {
    if (currentUser.isLoggedIn) {
      checktoken();
      getSavedMovies();
    }
    if (KEYWORD_MOVIES in localStorage) {
      setAllMovies(JSON.parse(localStorage.getItem(KEYWORD_MOVIES)));
    }
    setTimeout(() => {
      setLoadingContent(false);
    }, TIME_OUT_PRELOADER);
  }, [currentUser.isLoggedIn]);

  // // Рисуем фильмы при авторизации
  // useEffect(() => {
  //   if (currentUser.isLoggedIn) {
  //     getMovies();
  //     setTimeout(() => {
  //       setLoadingContent(false);
  //     }, TIME_OUT_PRELOADER);
  //   }
  // }, [currentUser.isLoggedIn]);

  // Изменение кол-ва карточек с кнопкой "Еще"
  useEffect(() => {
    const handleChangeDevice = () => {
      clearTimeout(resizeCooldown.current);
      resizeCooldown.current = setTimeout(() => {
        if (window.innerWidth < DEVICE_SETTING.mobile.maxSize) {
          setDevice(DEVICE_SETTING.mobile.device);
        } else if (window.innerWidth < DEVICE_SETTING.tablet.maxSize) {
          setDevice(DEVICE_SETTING.tablet.device);
        } else {
          setDevice(DEVICE_SETTING.desktop.device);
        }
      }, TIME_OUT_PRELOADER);
    };
    // вызываем функцию и вешаем слушатель события
    handleChangeDevice();
    window.addEventListener('resize', handleChangeDevice);
    // снимаем слушатель
    return () => {
      clearTimeout(resizeCooldown.current);
      window.removeEventListener('resize', handleChangeDevice);
    };
  }, [device]); // в зависимости от аппарата

  // функция регистрации
  const handleRegister = (value) => {
    console.log('register', value);
    setMessage({ isMessageShow: false, isError: false, text: '' });
    setSendRequest(true);
    api
      .register(value)
      .then(() => {
        setMessage({
          isMessageShow: true,
          isError: false,
          text: MESSAGE.registred,
        });
        setTimeout(() => {
          handleLogin(value);
          setMessage({
            isMessageShow: false,
            isError: false,
            text: '',
          });
        }, TIME_REGISTER);
      })
      .catch((err) => {
        setFormActivated(true);
        setTimeout(() => {
          setMessage({
            isMessageShow: true,
            isError: true,
            text: selectErrorMessage(err),
          });
        }, TIME_OUT_PRELOADER);
      })
      .finally(
        setTimeout(() => {
          setSendRequest(false);
        }, TIME_OUT_PRELOADER)
      );
  };

  // Функция логина
  const handleLogin = (value) => {
    setMessage({ isMessageShow: false, isError: false, text: '' });
    setSendRequest(true);
    return api
      .login(value)
      .then((res) => {
        if (res.JWT) {
          navigate(moviesPath, { replace: true }); // сразу на страницу с фильмами перенаправляем
          setCurrentUser({ ...currentUser, isLoggedIn: true });
          console.log('in login function', currentUser);
          localStorage.setItem('jwt', res.JWT);
          localStorage.setItem('isLoggedIn', true);
        }
      })
      .catch((err) => {
        setFormActivated(true);
        setTimeout(() => {
          setMessage({
            isMessageShow: true,
            isError: true,
            text: selectErrorMessage(err),
          });
        }, TIME_OUT_PRELOADER);
      })
      .finally(
        setTimeout(() => {
          setSendRequest(false);
        }, TIME_OUT_PRELOADER)
      );
  };
  // лайки фильмов
  const handleMovieLike = (movie) => {
    const isLiked = savedMovies.some((item) => item.movieId === movie.movieId);
    console.log('внутри функции handleMovieLike', isLiked);
    if (!isLiked) {
      api
        .addSavedMovies(movie)
        .then((newMovie) => {
          setSavedMovies([...savedMovies, newMovie]);
        })
        .catch((err) => console.log(err));
    } else {
      const id = savedMovies.find((item) => item.movieId === movie.movieId)._id;
      api
        .deleteMovies(id)
        .then(() => {
          setSavedMovies((movies) => movies.filter((item) => item._id !== id));
        })
        .catch((err) => console.log(err));
    }
  };
  // удаление фильмов
  const handleMovieDelete = (movie) => {
    api
      .deleteMovies(movie._id)
      .then(() => {
        setSavedMovies((movies) =>
          movies.filter((item) => item._id !== movie._id)
        );
      })
      .catch((err) => console.log(err));
  };
  // Управление профилем
  const handleChangeProfile = (value) => {
    setMessage({ isMessageShow: false, isError: false, text: '' });
    setSendRequest(true);
    api
      .setUserInfoApi(value)
      .then(({ name, email }) => {
        setCurrentUser({ ...currentUser, name, email });
        setFormActivated(false);
        setTimeout(() => {
          setMessage({
            isMessageShow: true,
            isError: false,
            text: MESSAGE.profileUpdate,
          });
        }, TIME_OUT_PRELOADER);
      })
      .catch((err) => {
        setFormActivated(true);
        setTimeout(() => {
          setMessage({
            isMessageShow: true,
            isError: true,
            text: selectErrorMessage(err),
          });
        }, TIME_OUT_PRELOADER);
      })
      .finally(
        setTimeout(() => {
          setSendRequest(false);
        }, TIME_OUT_PRELOADER)
      );
  };
  // Выход из аккаунта пользователя
  function handleSignout() {
    localStorage.clear();
    navigate(mainPath, { replace: true });
    setCurrentUser({ name: '', email: '', isLoggedIn: false });
    setSavedMovies([]);
    setRequestError({});
    setMessage({
      isMessageShow: false,
      isError: false,
      text: '',
    });
    setFormActivated(true);
    setAllMovies([]);
  }

  useEffect(() => {
    setMessage((message) => ({ ...message, text: '' }));
  }, [pathname]);

  return isLoadingContent ? (
    <Preloader />
  ) : (
    <MessageContext.Provider value={message}>
      <CurrentUserContext.Provider value={currentUser}>
        {!isErrorPage && <Header />}
        <Routes>
          <Route
            path={mainPath}
            element={<Landing isLoadingContent={isLoadingContent} />}
          />
          <Route
            path={moviesPath}
            element={
              <ProtectedRouteElement
                element={Movies}
                isLoggedIn={currentUser.isLoggedIn}
                movies={allMovies}
                onMovieLike={handleMovieLike}
                savedMovies={savedMovies}
                device={device}
                isFormActivated={isFormActivated}
                getMovies={getMovies}
              />
            }
            savedMovies={savedMovies}
          />
          <Route
            path={savedMoviesPath}
            element={
              <ProtectedRouteElement
                element={SavedMovies}
                onMoviedDelete={handleMovieDelete}
                savedMovies={savedMovies}
                isLoggedIn={currentUser.isLoggedIn}
              />
            }
          />
          <Route
            path={profilePath}
            element={
              <ProtectedRouteElement
                element={Profile}
                onSubmit={handleChangeProfile}
                isLoggedIn={currentUser.isLoggedIn}
                onSignout={handleSignout}
                isLoadingContent={isLoadingContent}
                setRequestError={setRequestError}
                requestError={requestError}
                isFormActivated={isFormActivated}
                setFormActivated={setFormActivated}
                isSendRequest={isSendRequest}
                setMessage={setMessage}
              />
            }
          />
          <Route
            path={registerPath}
            element={
              currentUser.isLoggedIn ? (
                <Navigate to={mainPath} replace />
              ) : (
                <Auth
                  onRegister={handleRegister}
                  requestError={requestError}
                  setRequestError={setRequestError}
                  isLoadingContent={isLoadingContent}
                  message={message}
                  setMessage={setMessage}
                  setFormActivated={setFormActivated}
                  isFormActivated={isFormActivated}
                  isSendRequest={isSendRequest}
                />
              )
            }
          />
          <Route
            path={loginPath}
            element={
              currentUser.isLoggedIn ? (
                <Navigate to={moviesPath} replace />
              ) : (
                <Auth
                  onLogin={handleLogin}
                  requestError={requestError}
                  setRequestError={setRequestError}
                  isLoadingContent={isLoadingContent}
                  message={message}
                  setMessage={setMessage}
                  setFormActivated={setFormActivated}
                  isFormActivated={isFormActivated}
                  isSendRequest={isSendRequest}
                />
              )
            }
          />
          <Route
            path={otherPath}
            element={<Error setIsErrorPage={setErrorPage} />}
          />
        </Routes>
        {isErrorPage ||
        pathname === loginPath ||
        pathname === registerPath ||
        pathname === profilePath ? (
          ''
        ) : (
          <Footer />
        )}
      </CurrentUserContext.Provider>
    </MessageContext.Provider>
  );
};

export default App;
