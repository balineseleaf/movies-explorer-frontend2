export const BASE_URL = 'https://api.movies.balineseleaf.nomoredomainsrocks.ru';
export const REGEX_NAME = /^[a-zA-Zа-яА-Я\s-]+$/;
export const REGEX_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const BASE_URL_API_MOVIES = 'https://api.nomoreparties.co';
export const KEYWORD_SEARCH = 'search';
export const KEYWORD_ISLOGGEDIN = 'isLoggedIn';
export const TIME_OUT_PRELOADER = 500;
export const TIME_REGISTER = 2000;
export const TIME_DOWNLOAD = 1500;
export const TIME_SHORT_MOVIES = 40;
export const DATA_SAVE = 'search';

export const PATHS = {
  mainPath: '/',
  loginPath: '/signin',
  registerPath: '/signup',
  logoutPath: '/signout',
  otherPath: '*',
  moviesPath: '/movies',
  savedMoviesPath: '/saved-movies',
  profilePath: '/profile',
  userPath: '/users/me',
  beatfilm: 'beatfilm-movies',
};

export const TYPE_OF_INPUTS = {
  email: 'email',
  text: 'text',
  checkbox: 'checkbox',
  search: 'search',
};

export const INPUT_NAMES = {
  nameInput: 'name',
  emailInput: 'email',
  passwordInput: 'password',
  searchInput: 'search',
  shortInput: 'short',
};

export const METHODS_FETCH = {
  postFetch: 'POST',
  patchFetch: 'PATCH',
  deleteFetch: 'DELETE',
};

export const LANDING_LINKS = {
  abouteProject: '#about',
  techs: '#techs',
  abouteMe: '#about-me',
};

export const EXTERNAL_LINKS = {
  myGitHub: 'https://github.com/balineseleaf',
  staticSite: 'https://github.com/balineseleaf/how-to-learn',
  adaptiveSite: 'https://github.com/balineseleaf/russian-travel',
  SPA: 'https://github.com/balineseleaf/react-mesto-api-full-gha',
};

export const MESSAGE = {
  successfulRegistration:
    'Вы удачно зарегистрировалис. Перенаправление на страницу с фильмами.',
  beforeSearching: 'Для отображения фильмов начните поиск',
  noMovies: 'Нет фильмов для отображения',
  noEmail: 'Не верный формат электронной почты',
  noName: 'Имя содержит только латиницу, кириллицу, пробел или дефис.',
  profileUpdate: 'Данные успешно изменены',
  registred: 'Регистрация успешна. Перенаправление на страницу поиска фильмов',
  validation: 'Неверный формат данных: ',
  serverError:
    'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз',
};

export const DEVICE_SETTING = {
  mobile: {
    device: 'mobile',
    maxSize: 768,
    maxMovies: 5,
    moreMovies: 2,
  },
  tablet: {
    device: 'tablet',
    maxSize: 1024,
    maxMovies: 4,
    moreMovies: 3,
  },
  desktop: {
    device: 'desktop',
    maxMovies: 4,
    moreMovies: 4,
  },
};
