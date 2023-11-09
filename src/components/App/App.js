import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import { useState } from 'react';
import Header from '../Header/Header';
import Landing from '../Main/Landing/Landing';
import Footer from '../Footer/Footer';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { MessageContext } from '../../contexts/MessageContext';
import { PATHS } from '../../utils/constants';
import SavedMovies from '../Movies/SavedMovies/SavedMovies';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import Auth from '../Main/Auth/Auth';
import Error from '../Main/Error/Error';

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

  const [isErrorPage, setErrorPage] = useState(false);
  const [currentUser, setCurrentUser] = useState({ isLoggedIn: true });
  const [message, setMessage] = useState({
    isMessageShow: false,
    isError: false,
    text: '',
  });

  const [isProfileEdit, setIsProfileEdit] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);

  function handleEditProfile() {
    setIsProfileEdit(true);
  }
  const { pathname } = useLocation();

  return (
    <MessageContext.Provider value={message}>
      <CurrentUserContext.Provider value={currentUser}>
        {!isErrorPage && <Header />}
        <Routes>
          <Route path={mainPath} element={<Landing />} />
          <Route
            path={moviesPath}
            element={<Movies />}
            savedMovies={savedMovies}
          />
          <Route
            path={savedMoviesPath}
            element={<SavedMovies />}
            savedMovies={savedMovies}
          />
          <Route
            path={profilePath}
            element={
              <Profile
                isEdit={isProfileEdit}
                onEditProfile={handleEditProfile}
              />
            }
          />
          <Route path={registerPath} element={<Auth />} />
          <Route path={loginPath} element={<Auth />} />
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
