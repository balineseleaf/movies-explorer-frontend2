import { BASE_URL, BASE_URL_API_MOVIES, MESSAGE, PATHS } from './constants';

// Данные для запроса на сервер
const apiConfig = {
  baseUrl: {
    mainApi: BASE_URL,
    moviesApi: BASE_URL_API_MOVIES + '/' + PATHS.beatfilm,
  },
  credentials: 'include',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

const selectErrorMessage = (err) => {
  if (err.message === 'Validation failed') {
    return MESSAGE.validation + err.validation.body.keys[0];
  }
  return err.message;
};

export { apiConfig, selectErrorMessage };
